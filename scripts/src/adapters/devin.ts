import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Adapter, AdapterContext, RunAttempt, RunStats } from './types.ts';

// devin -p 输出纯文本；费用/用量尝试从 --export 的 ATIF transcript 里抠
function extractStatsFromTranscript(ws: string): RunStats {
  const path = join(ws, 'transcript.json');
  if (!existsSync(path)) return {};
  try {
    const raw = JSON.parse(readFileSync(path, 'utf8')) as unknown;
    // ATIF transcript：final_metrics 里是累计值
    const fm = (raw as Record<string, unknown>).final_metrics as Record<string, unknown> | undefined;
    if (fm) {
      const ti = fm.total_prompt_tokens;
      const to = fm.total_completion_tokens;
      return {
        tokensIn: typeof ti === 'number' ? ti : undefined,
        tokensOut: typeof to === 'number' ? to : undefined,
      };
    }
    let tokensIn: number | undefined;
    let tokensOut: number | undefined;
    let costUsd: number | undefined;
    const walk = (v: unknown): void => {
      if (!v || typeof v !== 'object') return;
      if (Array.isArray(v)) { for (const x of v) walk(x); return; }
      const o = v as Record<string, unknown>;
      const usage = o.usage;
      if (usage && typeof usage === 'object') {
        const u = usage as Record<string, unknown>;
        if (typeof u.input_tokens === 'number') tokensIn = (tokensIn ?? 0) + u.input_tokens;
        if (typeof u.output_tokens === 'number') tokensOut = (tokensOut ?? 0) + u.output_tokens;
        if (typeof u.prompt_tokens === 'number') tokensIn = (tokensIn ?? 0) + u.prompt_tokens;
        if (typeof u.completion_tokens === 'number') tokensOut = (tokensOut ?? 0) + u.completion_tokens;
      }
      if (typeof o.cost_usd === 'number') costUsd = (costUsd ?? 0) + o.cost_usd;
      if (typeof o.total_cost_usd === 'number') costUsd = (costUsd ?? 0) + o.total_cost_usd;
      for (const x of Object.values(o)) walk(x);
    };
    walk(raw);
    return { tokensIn, tokensOut, costUsd };
  } catch {
    return {};
  }
}

function effortFromModelArg(modelArg: string | null): string | null {
  if (!modelArg) return null;
  const m = /-(none|low|medium|high|xhigh|max)(?:-|$)/.exec(modelArg);
  return m ? m[1]! : null;
}

export const devin: Adapter = {
  label: 'Devin CLI',
  // effort 编码在模型 UID 后缀（swe-2-high）里
  deriveEffort: (modelArg) => effortFromModelArg(modelArg),
  effortOptions: ['none', 'low', 'medium', 'high', 'xhigh', 'max'],
  defaultEffort: 'high',
  recordModel: (model, modelArg) => modelArg ?? model,
  plan(ctx: AdapterContext): RunAttempt[] {
    // 实测：--sandbox 会强制 autonomous 权限（警告 "ignoring --permission-mode"），
    // 而 autonomous 在非交互模式下拒绝写文件工具 → 无产物。只能 dangerous、不带沙箱。
    const argv = [
      'devin', '-p',
      '--permission-mode', 'dangerous',
      '--respect-workspace-trust', 'false',
      '--model', ctx.combo.modelArg ?? ctx.combo.model,
      '--export', join(ctx.ws, 'transcript.json'),
      '--', ctx.prompt,
    ];
    return [{ argv, format: 'text' }];
  },
  // devin stdout 是纯文本，用量从 transcript.json 补
  postRunStats: extractStatsFromTranscript,
};
