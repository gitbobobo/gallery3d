import { claudeCodeGlm, claudeCodeMinimax } from './claude-code.ts';
import { codex } from './codex.ts';
import { cursor } from './cursor.ts';
import { devin } from './devin.ts';
import { droid } from './droid.ts';
import { opencode } from './opencode.ts';
import type { Adapter } from './types.ts';

const registry: Record<string, Adapter> = {
  'claude-code-glm': claudeCodeGlm,
  'claude-code-minimax': claudeCodeMinimax,
  codex,
  cursor,
  devin,
  droid,
  opencode,
};

export function getAdapter(key: string): Adapter {
  const a = registry[key];
  if (!a) throw new Error(`未知 adapter：${key}`);
  return a;
}

export type { Adapter, AdapterContext, RunAttempt, RunStats } from './types.ts';
