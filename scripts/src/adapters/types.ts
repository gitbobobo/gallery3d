import type { Combo } from '../lib/schemas.ts';

export interface AdapterContext {
  /** 工作区绝对路径 */
  ws: string;
  runId: string;
  /** 传给 agent 的完整 prompt 文本 */
  prompt: string;
  combo: Combo;
  /** run.log 绝对路径 */
  logFile: string;
}

export interface RunAttempt {
  argv: string[];
  /** stdout 的流式格式：决定逐行渲染方式 */
  format: 'stream-json' | 'jsonl' | 'text';
  env?: Record<string, string>;
  /** 标记工作区该 attempt 用的沙箱状态（如 cursor） */
  sandboxUsed?: boolean;
}

export interface RunStats {
  costUsd?: number;
  tokensIn?: number;
  tokensOut?: number;
  durationMs?: number;
}

export interface Adapter {
  /** 展示名 */
  label: string;
  /** 可选择的 effort 列表；deriveEffort 存在时忽略此项 */
  effortOptions?: string[];
  defaultEffort?: string;
  /** 从 modelArg 推导 effort（如 grok-4.7-high → high）；返回 null 表示需要询问 */
  deriveEffort?: (modelArg: string | null) => string | null;
  /** 写入 run.json 的 model 字段（可从 modelArg 换算） */
  recordModel: (model: string, modelArg: string | null) => string;
  /** 需要额外写进工作区的说明文件（如 CLAUDE.md） */
  extraFiles?: (ws: string) => { path: string; content: string }[];
  /** 构造执行计划：按顺序尝试的 argv 列表。每次运行只调用一次（可能有工作区外副作用，如 opencode 写 OPENCODE_CONFIG），由调用方把 attempts 传给 runAdapter */
  plan: (ctx: AdapterContext) => RunAttempt[];
  /** 某次 attempt 失败后判断是否继续下一个（返回 true 继续） */
  shouldRetry?: (attemptIndex: number, logTail: string, exitCode: number | null) => boolean;
  /** attempt 失败重试时写入 marker 的补丁（如 sandboxUsed:false） */
  retryMarkerPatch?: (attemptIndex: number) => Record<string, unknown>;
  /** 把一行 stdout/jsonl 渲染成给用户看的文本；null = 不显示 */
  renderLine?: (line: string, obj: unknown | null) => string | null;
  /** 从完整日志文本里解析用量/费用 */
  extractStats?: (logText: string) => RunStats;
  /** 进程结束后从工作区产物（如 devin transcript.json）里补充统计 */
  postRunStats?: (ws: string) => RunStats;
}
