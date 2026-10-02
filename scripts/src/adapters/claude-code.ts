import type { Adapter, AdapterContext, RunAttempt, RunStats } from './types.ts';

// claude --output-format stream-json 的 JSONL 事件渲染
function renderLine(line: string, obj: unknown | null): string | null {
  if (!obj || typeof obj !== 'object') return null;
  const ev = obj as Record<string, unknown>;
  if (ev.type === 'assistant' && ev.message && typeof ev.message === 'object') {
    const content = (ev.message as Record<string, unknown>).content;
    if (Array.isArray(content)) {
      const parts: string[] = [];
      for (const c of content) {
        if (c && typeof c === 'object') {
          const cc = c as Record<string, unknown>;
          if (cc.type === 'text' && typeof cc.text === 'string') parts.push(cc.text);
          else if (cc.type === 'tool_use') parts.push(`\n[tool] ${String(cc.name ?? '?')}`);
        }
      }
      if (parts.length) return parts.join('');
    }
    return null;
  }
  if (ev.type === 'result') {
    return `\n[done] subtype=${String(ev.subtype ?? '')} cost=${ev.total_cost_usd != null ? '$' + String(ev.total_cost_usd) : '?'} duration=${ev.duration_ms != null ? String(ev.duration_ms) + 'ms' : '?'}`;
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
        const usage = (ev.usage ?? {}) as Record<string, unknown>;
        return {
          costUsd: typeof ev.total_cost_usd === 'number' ? ev.total_cost_usd : undefined,
          tokensIn: typeof usage.input_tokens === 'number' ? usage.input_tokens : undefined,
          tokensOut: typeof usage.output_tokens === 'number' ? usage.output_tokens : undefined,
          durationMs: typeof ev.duration_ms === 'number' ? ev.duration_ms : undefined,
        };
      }
    } catch { /* 非 JSON 行 */ }
  }
  return {};
}

export function makeClaudeAdapter(opts: {
  label: string;
  settingsFile?: string;
  recordedModel: string;
}): Adapter {
  return {
    label: opts.label,
    effortOptions: ['low', 'medium', 'high', 'xhigh', 'max'],
    defaultEffort: 'xhigh',
    recordModel: () => opts.recordedModel,
    extraFiles: () => [{ path: 'CLAUDE.md', content: '@AGENTS.md\n' }],
    plan(ctx: AdapterContext): RunAttempt[] {
      const argv = [
        'claude', '-p', ctx.prompt,
        '--permission-mode', 'bypassPermissions',
        '--effort', ctx.combo.effort,
        '--output-format', 'stream-json',
        '--verbose',
      ];
      if (opts.settingsFile) argv.push('--settings', opts.settingsFile);
      return [{ argv, format: 'stream-json' }];
    },
    renderLine,
    extractStats,
  };
}

export const claudeCodeGlm = makeClaudeAdapter({
  label: 'Claude Code (GLM)',
  recordedModel: 'glm-5.3-flash[1m]',
});

export const claudeCodeMinimax = makeClaudeAdapter({
  label: 'Claude Code (MiniMax)',
  settingsFile: '/Users/godbobo/.claude/settings.minimax.json',
  recordedModel: 'minimax-m3',
});
