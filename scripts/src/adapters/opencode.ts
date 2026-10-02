import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { workspacesRoot } from '../lib/paths.ts';
import type { Adapter, AdapterContext, RunAttempt, RunStats } from './types.ts';

// opencode --format json 输出 JSONL 事件：part.delta / message / step_finish 等，尽力渲染
function renderLine(line: string, obj: unknown | null): string | null {
  if (!obj || typeof obj !== 'object') return null;
  const ev = obj as Record<string, unknown>;
  const type = String(ev.type ?? '');
  if (type === 'text' || type === 'part.delta' || type === 'message.part.delta') {
    const part = ev.part as Record<string, unknown> | undefined;
    const txt =
      (typeof ev.text === 'string' && ev.text) ||
      (part && typeof part.text === 'string' && part.text) ||
      (typeof ev.delta === 'string' && ev.delta) ||
      (part && part.delta && typeof (part.delta as Record<string, unknown>).text === 'string'
        ? String((part.delta as Record<string, unknown>).text)
        : null);
    if (txt) return txt;
  }
  if (type === 'tool_use' || type === 'tool_call' || type === 'part.updated') {
    const part = ev.part as Record<string, unknown> | undefined;
    const tool = part?.tool ?? ev.tool ?? ev.name;
    if (tool) return `\n[tool] ${String(tool)}`;
  }
  if (type === 'step_finish' || type === 'result' || type === 'done') {
    return `\n[done] ${type}`;
  }
  return null;
}

// opencode 的 step_finish 事件携带的是该 step 的用量（input 不含 cache，
// output 与 reasoning 分开），需要跨 step 求和；cost 同为单步值。
function extractStats(logText: string): RunStats {
  let tokensIn = 0;
  let tokensOut = 0;
  let costUsd = 0;
  let seen = false;
  for (const line of logText.split('\n')) {
    const t = line.trim();
    if (!t.startsWith('{')) continue;
    try {
      const ev = JSON.parse(t) as Record<string, unknown>;
      const tokens = (ev.tokens ?? (ev.part as Record<string, unknown> | undefined)?.tokens ?? ev.usage) as
        | Record<string, unknown>
        | undefined;
      if (tokens && typeof tokens === 'object') {
        seen = true;
        const cache = tokens.cache as Record<string, unknown> | undefined;
        tokensIn += num(tokens.input) ?? num(tokens.input_tokens) ?? num(tokens.prompt) ?? 0;
        tokensIn += num(cache?.write) ?? 0;
        tokensOut += num(tokens.output) ?? num(tokens.output_tokens) ?? num(tokens.completion) ?? 0;
        tokensOut += num(tokens.reasoning) ?? 0;
      }
      const c = num(ev.cost) ?? num(ev.cost_usd) ?? num((ev.part as Record<string, unknown> | undefined)?.cost);
      if (c != null) { seen = true; costUsd += c; }
    } catch { /* 非 JSON 行 */ }
  }
  if (!seen) return {};
  return {
    tokensIn: tokensIn || undefined,
    tokensOut: tokensOut || undefined,
    costUsd: costUsd || undefined,
  };
}

function num(v: unknown): number | undefined {
  return typeof v === 'number' ? v : undefined;
}

/**
 * 二进制里确认存在 OPENCODE_CONFIG / OPENCODE_CONFIG_CONTENT，
 * 但 CONTENT 是否覆盖 agent 模型配置无法静态验证 → 用 OPENCODE_CONFIG
 * 指向生成在工作区之外的配置文件（不含任何密钥）。
 * 子任务/后台 agent（general、explore、compaction 等）也锁定为同一模型，
 * 否则用户全局配置里指定的其他模型会混进本次结果。
 */
function writeConfigFile(runId: string, model: string): string {
  const path = join(workspacesRoot, `.opencode-config-${runId}.json`);
  const agents: Record<string, unknown> = {};
  for (const name of ['compaction', 'build', 'general', 'explore', 'title', 'summary']) {
    agents[name] = { model };
  }
  writeFileSync(path, JSON.stringify({ agent: agents, mcp: {} }, null, 2) + '\n');
  return path;
}

export const opencode: Adapter = {
  label: 'opencode',
  // --variant 的取值由 models.dev 元数据决定，deepseek-v4.1-flash 是 low|high|max
  effortOptions: ['low', 'high', 'max'],
  defaultEffort: 'high',
  recordModel: (model, modelArg) => modelArg ?? model,
  plan(ctx: AdapterContext): RunAttempt[] {
    const modelArg = ctx.combo.modelArg ?? ctx.combo.model;
    const configPath = writeConfigFile(ctx.runId, modelArg);
    const argv = [
      'opencode', 'run',
      '--dir', ctx.ws,
      '-m', modelArg,
      '--variant', ctx.combo.effort,
      '--auto',
      '--format', 'json',
      ctx.prompt,
    ];
    return [{ argv, format: 'jsonl', env: { OPENCODE_CONFIG: configPath } }];
  },
  renderLine,
  extractStats,
};
