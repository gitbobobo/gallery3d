import type { Adapter, AdapterContext, RunAttempt, RunStats } from './types.ts';

// droid exec -o stream-json 每行一个事件；尽力渲染文本/工具事件
function renderLine(line: string, obj: unknown | null): string | null {
  if (!obj || typeof obj !== 'object') return null;
  const ev = obj as Record<string, unknown>;
  const type = String(ev.type ?? '');
  if (type === 'message' || type === 'assistant_message' || type === 'text') {
    const txt = typeof ev.text === 'string' ? ev.text : typeof ev.message === 'string' ? ev.message : null;
    if (txt) return txt;
  }
  if (type === 'tool_call' || type === 'tool_use' || type === 'tool_start') {
    const params = ev.parameters as Record<string, unknown> | undefined;
    const name = ev.toolName ?? ev.toolId ?? ev.name ?? ev.tool ?? '?';
    const summary = typeof params?.summary === 'string' ? params.summary : null;
    return `\n[tool] ${String(name)}${summary ? ` — ${summary}` : ''}`;
  }
  if (type === 'result' || type === 'done' || type === 'complete') {
    return `\n[done] ${JSON.stringify(ev).slice(0, 200)}`;
  }
  return null;
}

function extractStats(logText: string): RunStats {
  // 倒序找最后一个带 usage 的 JSON 对象（result / done 事件）
  for (const line of logText.split('\n').reverse()) {
    const t = line.trim();
    if (!t.startsWith('{')) continue;
    try {
      const ev = JSON.parse(t) as Record<string, unknown>;
      const usage = (ev.usage ?? ev.token_usage) as Record<string, unknown> | undefined;
      if (usage && typeof usage === 'object') {
        return {
          tokensIn: num(usage.input_tokens) ?? num(usage.prompt_tokens) ?? num(usage.tokens_in),
          tokensOut: num(usage.output_tokens) ?? num(usage.completion_tokens) ?? num(usage.tokens_out),
          costUsd: num(ev.cost_usd) ?? num(ev.total_cost_usd),
          durationMs: num(ev.duration_ms),
        };
      }
    } catch { /* 非 JSON 行 */ }
  }
  return {};
}

function num(v: unknown): number | undefined {
  return typeof v === 'number' ? v : undefined;
}

export const droid: Adapter = {
  label: 'Factory Droid',
  effortOptions: ['none', 'low', 'medium', 'high', 'xhigh', 'max'],
  defaultEffort: 'high',
  recordModel: (model, modelArg) => modelArg ?? model,
  plan(ctx: AdapterContext): RunAttempt[] {
    const base = [
      'droid', 'exec',
      '--cwd', ctx.ws,
      '-m', ctx.combo.modelArg ?? ctx.combo.model,
      '-r', ctx.combo.effort,
      '--auto', 'high',
    ];
    // stream-json 起步报错 → 依次降级 json、text
    return [
      { argv: [...base, '-o', 'stream-json', ctx.prompt], format: 'stream-json' },
      { argv: [...base, '-o', 'json', ctx.prompt], format: 'jsonl' },
      { argv: [...base, '-o', 'text', ctx.prompt], format: 'text' },
    ];
  },
  shouldRetry: (attemptIndex, logTail, exitCode) => {
    if (attemptIndex >= 2 || exitCode === 0) return false;
    // 只在前 2KB 内出现输出格式相关错误时才降级
    const head = logTail.slice(0, 2048);
    return /(unknown|invalid|unsupported|unexpected).{0,40}(format|output|value)|(--?o|output-format)/i.test(head);
  },
  renderLine,
  extractStats,
};
