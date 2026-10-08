import { spawn } from 'node:child_process';
import { appendFileSync, createWriteStream, existsSync, readFileSync } from 'node:fs';
import type { Adapter, AdapterContext, RunAttempt, RunStats } from '../adapters/types.ts';
import { readMarker, writeMarker } from './workspace.ts';

export interface RunOutcome {
  exitCode: number | null;
  stats: RunStats;
  attemptsUsed: number;
}

function tryJson(line: string): unknown | null {
  const t = line.trim();
  if (!t.startsWith('{') && !t.startsWith('[')) return null;
  try { return JSON.parse(t); } catch { return null; }
}

/** 跑一个 attempt，把 stdout/stderr 原样写进 run.log，同时按格式实时渲染到终端 */
function runAttempt(
  argv: string[],
  cwd: string,
  env: NodeJS.ProcessEnv,
  logPath: string,
  adapter: Adapter,
  format: string,
): Promise<number | null> {
  return new Promise((resolve, reject) => {
    const [bin, ...args] = argv;
    const child = spawn(bin!, args, { cwd, env, stdio: ['ignore', 'pipe', 'pipe'] });
    const log = createWriteStream(logPath, { flags: 'a' });
    // 日志写失败不致命；常驻监听防 unhandled error
    log.on('error', () => {});
    let stdoutBuf = '';
    let stderrBuf = '';

    const flushLines = (final: boolean) => {
      let idx: number;
      while ((idx = stdoutBuf.indexOf('\n')) >= 0) {
        const line = stdoutBuf.slice(0, idx);
        stdoutBuf = stdoutBuf.slice(idx + 1);
        render(line);
      }
      if (final && stdoutBuf.length) { render(stdoutBuf); stdoutBuf = ''; }
    };
    const render = (line: string) => {
      const obj = format === 'text' ? null : tryJson(line);
      const shown = adapter.renderLine?.(line, obj) ?? (format === 'text' ? line : null);
      if (shown != null && shown !== '') process.stdout.write(shown.endsWith('\n') ? shown : shown + '\n');
    };

    child.stdout!.on('data', (d: Buffer) => { log.write(d); stdoutBuf += d.toString('utf8'); flushLines(false); });
    child.stderr!.on('data', (d: Buffer) => {
      log.write(d);
      stderrBuf += d.toString('utf8');
      // stderr 直接透传，保持滚动可见
      process.stderr.write(d);
    });
    // 等写流落盘再 settle：统计行在日志尾部，缺尾会永久丢统计；flush 途中出错也兜底 settle
    let settled = false;
    const settle = (fn: () => void) => {
      if (settled) return;
      settled = true;
      log.once('error', fn);
      log.end(fn);
    };
    child.on('error', (e) => settle(() => reject(e)));
    child.on('close', (code) => { flushLines(true); settle(() => resolve(code)); });
  });
}

/** 收集一次运行的统计：日志存在且非空才调 extractStats（读取/解析失败降级 {}），postRunStats 结果覆盖同名键 */
export function collectRunStats(adapter: Adapter, ws: string, logFile: string | null): RunStats {
  let stats: RunStats = {};
  try {
    const logText = logFile && existsSync(logFile) ? readFileSync(logFile, 'utf8') : '';
    if (logText) stats = adapter.extractStats?.(logText) ?? {};
  } catch { /* 日志读取/解析失败就算了 */ }
  return { ...stats, ...adapter.postRunStats?.(ws) };
}

export async function runAdapter(ctx: AdapterContext, adapter: Adapter, attempts: RunAttempt[]): Promise<RunOutcome> {
  const marker = readMarker(ctx.ws);
  marker.launchedAt = new Date().toISOString();
  writeMarker(ctx.ws, marker);

  let exitCode: number | null = null;
  let used = 0;
  for (let i = 0; i < attempts.length; i++) {
    const att = attempts[i]!;
    used = i + 1;
    appendFileSync(ctx.logFile, `\n===== attempt ${i + 1}/${attempts.length} =====\n$ ${att.argv.map((a) => (a.includes(' ') ? JSON.stringify(a) : a)).join(' ')}\n`);
    console.log(`\n\x1b[2m$ ${att.argv.map((a) => (a.length > 80 ? a.slice(0, 77) + '…' : a)).join(' ')}\x1b[0m`);
    exitCode = await runAttempt(att.argv, ctx.ws, { ...process.env, ...att.env }, ctx.logFile, adapter, att.format);
    if (exitCode === 0) break;
    const tail = (() => {
      try { return readFileSync(ctx.logFile, 'utf8').slice(-8192); } catch { return ''; }
    })();
    if (i + 1 < attempts.length && adapter.shouldRetry?.(i, tail, exitCode)) {
      console.log(`\n\x1b[33m第 ${i + 1} 次尝试失败（exit=${exitCode}），按适配器策略降级重试…\x1b[0m`);
      appendFileSync(ctx.logFile, `\n===== retry: attempt ${i + 1} failed with exit=${exitCode} =====\n`);
      const patch = adapter.retryMarkerPatch?.(i);
      if (patch) {
        const m = readMarker(ctx.ws);
        writeMarker(ctx.ws, { ...m, ...patch });
      }
      continue;
    }
    break;
  }

  const m2 = readMarker(ctx.ws);
  m2.finishedAt = new Date().toISOString();
  m2.exitCode = exitCode;
  writeMarker(ctx.ws, m2);

  return { exitCode, stats: collectRunStats(adapter, ctx.ws, ctx.logFile), attemptsUsed: used };
}

/** 拿 harness 版本号（<bin> --version），失败返回 null */
export async function harnessVersion(bin: string): Promise<string | null> {
  return new Promise((resolve) => {
    const child = spawn(bin, ['--version'], { stdio: ['ignore', 'pipe', 'ignore'] });
    let out = '';
    const timer = setTimeout(() => { child.kill(); resolve(null); }, 10_000);
    child.stdout!.on('data', (d: Buffer) => { out += d.toString('utf8'); });
    child.on('error', () => { clearTimeout(timer); resolve(null); });
    child.on('close', () => { clearTimeout(timer); resolve(out.trim().split('\n')[0] || null); });
  });
}
