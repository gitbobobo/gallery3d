import type { Adapter, AdapterContext, RunAttempt, RunStats } from './types.ts';

// cursor-agent stream-json：system / assistant(部分增量) / tool_call / result
function renderLine(line: string, obj: unknown | null): string | null {
  if (!obj || typeof obj !== 'object') return null;
  const ev = obj as Record<string, unknown>;
  const type = String(ev.type ?? '');
  if (type === 'assistant') {
    // --stream-partial-output 时 delta 里带文本增量；完整事件在 message.content
    const msg = ev.message as Record<string, unknown> | undefined;
    const content = msg?.content;
    if (Array.isArray(content)) {
      const txt = content
        .filter((c) => c && typeof c === 'object' && (c as Record<string, unknown>).type === 'text')
        .map((c) => String((c as Record<string, unknown>).text ?? ''))
        .join('');
      if (txt) return txt;
    }
    return null;
  }
  if (type === 'tool_call') {
    const call = (ev.tool_call ?? ev.call ?? {}) as Record<string, unknown>;
    const name = call.function && typeof call.function === 'object'
      ? (call.function as Record<string, unknown>).name
      : (call.name ?? ev.subtype);
    return `\n[tool] ${String(name ?? '?')}`;
  }
  if (type === 'result') {
    return `\n[done] is_error=${String(ev.is_error ?? '')} duration=${ev.duration_ms != null ? String(ev.duration_ms) + 'ms' : '?'}`;
  }
  return null;
}

function extractStats(logText: string): RunStats {
  for (const line of logText.split('\n').reverse()) {
    const t = line.trim();
    if (!t.startsWith('{')) continue;
    try {
      const ev = JSON.parse(t) as Record<string, unknown>;
      if (ev.type === 'result') {
        return {
          durationMs: typeof ev.duration_ms === 'number' ? ev.duration_ms : undefined,
        };
      }
    } catch { /* 非 JSON 行 */ }
  }
  return {};
}

function effortFromModelArg(modelArg: string | null): string | null {
  if (!modelArg) return null;
  const m = /-(low|medium|high|xhigh|max)(?:-|$|\[)/.exec(modelArg);
  if (m) return m[1]!;
  const b = /effort\s*=\s*(low|medium|high|xhigh|max)/.exec(modelArg);
  return b ? b[1]! : null;
}

export const cursor: Adapter = {
  label: 'Cursor Agent',
  // effort 编码在模型名后缀（grok-4.7-high）里；解析不出时再问
  deriveEffort: (modelArg) => effortFromModelArg(modelArg),
  effortOptions: ['low', 'medium', 'high', 'xhigh', 'max'],
  defaultEffort: 'high',
  recordModel: (model, modelArg) => modelArg ?? model,
  plan(ctx: AdapterContext): RunAttempt[] {
    const mk = (sandbox: 'enabled' | 'disabled'): RunAttempt => ({
      argv: [
        'cursor-agent', '-p', '--force',
        '--sandbox', sandbox,
        '--workspace', ctx.ws,
        '--model', ctx.combo.modelArg ?? ctx.combo.model,
        '--output-format', 'stream-json',
        '--stream-partial-output',
        ctx.prompt,
      ],
      format: 'stream-json',
      sandboxUsed: sandbox === 'enabled',
    });
    return [mk('enabled'), mk('disabled')];
  },
  // 沙箱把 pnpm install 之类弄坏时退到 --sandbox disabled 重试一次
  shouldRetry: (attemptIndex, logTail, exitCode) => {
    if (attemptIndex !== 0 || exitCode === 0) return false;
    return /sandbox|seatbelt|operation not permitted|eperm|spawn .*enoent/i.test(logTail);
  },
  retryMarkerPatch: (attemptIndex) => (attemptIndex === 0 ? { sandboxUsed: false } : {}),
  renderLine,
  extractStats,
};
