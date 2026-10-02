import { homedir } from 'node:os';
import { join } from 'node:path';
import type { Adapter, AdapterContext, RunAttempt, RunStats } from './types.ts';

const pnpmStore = '/Users/godbobo/Library/pnpm/store/v10';
const npmCache = join(homedir(), '.npm');

function renderLine(line: string, obj: unknown | null): string | null {
  if (!obj || typeof obj !== 'object') return null;
  const ev = obj as Record<string, unknown>;
  const type = String(ev.type ?? '');
  if (type === 'item.completed' || type === 'item.started') {
    const item = ev.item as Record<string, unknown> | undefined;
    if (item && typeof item === 'object') {
      if (item.type === 'agent_message' && typeof item.text === 'string') return item.text;
      if (item.type === 'command_execution' && typeof item.command === 'string' && type === 'item.started')
        return `\n[cmd] ${item.command}`;
      if (item.type === 'file_change' && type === 'item.started') return `\n[file] ${JSON.stringify(item.changes ?? item.path ?? '')}`;
    }
    return null;
  }
  if (type === 'turn.completed') {
    const usage = (ev.usage ?? {}) as Record<string, unknown>;
    return `\n[done] tokens in=${String(usage.input_tokens ?? '?')} out=${String(usage.output_tokens ?? '?')}`;
  }
  return null;
}

function extractStats(logText: string): RunStats {
  for (const line of logText.split('\n').reverse()) {
    const t = line.trim();
    if (!t.startsWith('{')) continue;
    try {
      const ev = JSON.parse(t) as Record<string, unknown>;
      if (ev.type === 'turn.completed') {
        const usage = (ev.usage ?? {}) as Record<string, unknown>;
        return {
          tokensIn: typeof usage.input_tokens === 'number' ? usage.input_tokens : undefined,
          tokensOut: typeof usage.output_tokens === 'number' ? usage.output_tokens : undefined,
        };
      }
    } catch { /* 非 JSON 行 */ }
  }
  return {};
}

export const codex: Adapter = {
  label: 'Codex CLI',
  effortOptions: ['low', 'medium', 'high', 'xhigh', 'max', 'ultra'],
  defaultEffort: 'high',
  recordModel: (model, modelArg) => modelArg ?? model,
  plan(ctx: AdapterContext): RunAttempt[] {
    const argv = [
      'codex', 'exec',
      '-C', ctx.ws,
      '-m', ctx.combo.modelArg ?? ctx.combo.model,
      '-c', `model_reasoning_effort="${ctx.combo.effort}"`,
      // 0.159 起 exec 没有 -a/--ask-for-approval；--approve-for-me 自带
      // workspace-write 沙箱并自动审查审批请求（与 -s 互斥）
      '--approve-for-me',
      '-c', 'sandbox_workspace_write.network_access=true',
      // 放行包管理器缓存目录（TOML 数组语法）
      '-c', `sandbox_workspace_write.writable_roots=["${pnpmStore}","${npmCache}"]`,
      '--json',
      '-o', join(ctx.ws, '.last-message.txt'),
      ctx.prompt,
    ];
    return [{ argv, format: 'jsonl' }];
  },
  renderLine,
  extractStats,
};
