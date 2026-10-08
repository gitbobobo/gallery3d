import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import type { RunStats } from '../adapters/types.ts';
import { runDir, themeDir } from './paths.ts';
import { probeDist } from './probe.ts';
import { adapterForHarness, loadTheme } from './registry.ts';
import type { Marker, RunJson } from './schemas.ts';
import { copyDir, copySourceSnapshot, dirSizeBytes, isTextFile, sha256File, walkFiles, writeJson } from './util.ts';
import { readMarker, writeMarker } from './workspace.ts';

// 绝对路径引用：(src|href)="/…"、url(/…)、fetch("/…")、import("/…")；排除 // 开头的协议相对路径
const ABS_REF = /(?:src|href)\s*=\s*["'`]\/(?!\/)[^\s"'`]*|url\(\s*["'`]?\/(?!\/)[^)]*|(?:fetch|import)\s*\(\s*["'`]\/(?!\/)/g;

export interface ImportResult {
  run: RunJson;
  skippedSecrets: string[];
  absPathHits: { file: string; sample: string }[];
  probeErrors: string[];
}

function scanAbsolutePaths(distDir: string): { file: string; sample: string }[] {
  const hits: { file: string; sample: string }[] = [];
  for (const f of walkFiles(distDir)) {
    if (!isTextFile(f)) continue;
    let text: string;
    try { text = readFileSync(f, 'utf8'); } catch { continue; }
    const rel = f.slice(distDir.length + 1);
    for (const line of text.split('\n')) {
      ABS_REF.lastIndex = 0;
      const m = ABS_REF.exec(line);
      if (m) {
        hits.push({ file: rel, sample: m[0].slice(0, 120) });
        if (hits.length >= 50) return hits;
      }
    }
  }
  return hits;
}

function readHarnessVersionFile(ws: string): string | null {
  try {
    return readFileSync(join(ws, '.gallery3d-harness-version'), 'utf8').trim() || null;
  } catch {
    return null;
  }
}

export async function runImport(opts: {
  themeId: string;
  ws: string;
  runIdOverride?: string;
  extraStats?: RunStats;
  harnessVersion?: string | null;
  /** 探测/截图总开关（默认开） */
  probe?: boolean;
  log?: (msg: string) => void;
}): Promise<ImportResult> {
  const log = opts.log ?? console.log;
  const marker: Marker = readMarker(opts.ws);
  const runId = opts.runIdOverride ?? marker.runId;
  if (marker.theme !== opts.themeId) {
    throw new Error(`工作区 marker 的主题是 ${marker.theme}，不是 ${opts.themeId}`);
  }

  // prompt 一致性校验：marker 里的 sha 必须等于当前 prompt.md 的 sha
  const tDir = themeDir(opts.themeId);
  const theme = loadTheme(tDir);
  const promptPath = join(tDir, 'prompt.md');
  const currentSha = existsSync(promptPath) ? sha256File(promptPath) : theme.promptSha256;
  if (marker.promptSha256 !== currentSha) {
    throw new Error(
      `prompt 已变更：marker 记录 ${marker.promptSha256.slice(0, 12)}…，当前 ${currentSha.slice(0, 12)}…。` +
      '为避免混淆拒绝导入；如需强导请先让 prompt.md 回到当时的内容。',
    );
  }

  // 先按 marker 的 harness id 解析 adapter：配置已失效时在动旧 run 目录之前就报错
  const adapter = adapterForHarness(marker.combo.harness);

  const outDir = runDir(opts.themeId, runId);
  if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });

  // 1. dist 原样复制
  const wsDist = join(opts.ws, 'dist');
  const hasDist = existsSync(join(wsDist, 'index.html'));
  if (existsSync(wsDist)) copyDir(wsDist, join(outDir, 'dist'));

  // 2. 源码快照（排除依赖/产物/密钥）
  const skippedSecrets = copySourceSnapshot(opts.ws, join(outDir, 'src'));
  if (skippedSecrets.length) {
    log(`  \x1b[33m已跳过疑似密钥文件 ${skippedSecrets.length} 个：${skippedSecrets.slice(0, 5).join(', ')}${skippedSecrets.length > 5 ? ' …' : ''}\x1b[0m`);
  }

  // 3. NOTES.md → run 根目录
  const notesPath = join(opts.ws, 'NOTES.md');
  if (existsSync(notesPath)) copyFileSync(notesPath, join(outDir, 'NOTES.md'));

  const reasons: string[] = [];

  // 4. dist 校验：绝对路径扫描（信息性，不改变 status）
  let absPathHits: { file: string; sample: string }[] = [];
  if (hasDist) {
    absPathHits = scanAbsolutePaths(join(outDir, 'dist'));
    if (absPathHits.length) {
      reasons.push('绝对路径');
      log(`  \x1b[33m发现 ${absPathHits.length} 处疑似绝对路径引用（信息性，不改变状态）：\x1b[0m`);
      for (const h of absPathHits.slice(0, 5)) log(`    ${h.file}: ${h.sample}`);
    }
  }

  // 5. serve + probe + 截图
  const probeErrors: string[] = [];
  let consoleErrors = 0;
  let externalDomains: string[] = [];
  let pageOk = false;
  if (hasDist && (opts.probe ?? true)) {
    log('  启动静态服务并用 Chromium 探测…');
    try {
      const probe = await probeDist(join(outDir, 'dist'), outDir);
      consoleErrors = probe.consoleErrors;
      externalDomains = probe.externalDomains;
      pageOk = probe.loaded;
      probeErrors.push(...probe.pageErrors.slice(0, 5), ...probe.errors);
      if (!probe.loaded) reasons.push('页面打不开');
    } catch (e) {
      probeErrors.push(String(e).slice(0, 300));
      reasons.push('页面打不开');
    }
  }
  if (!hasDist) {
    reasons.push('没有产物');
    if (marker.exitCode != null && marker.exitCode !== 0) reasons.push('启动失败');
  }
  if (marker.exitCode != null && marker.exitCode !== 0 && hasDist) reasons.push('提前停止');

  const status: RunJson['status'] =
    hasDist && pageOk && (marker.exitCode == null || marker.exitCode === 0) ? 'ok' : 'incomplete';
  // 绝对路径是信息性 reason，即使 status=ok 也保留
  const finalReasons = reasons;

  // 6. 统计：日志解析 + 适配器补充 + 外部传入
  let stats: RunStats = {};
  try {
    const logText = marker.logFile && existsSync(marker.logFile) ? readFileSync(marker.logFile, 'utf8') : '';
    if (logText) stats = adapter.extractStats?.(logText) ?? {};
  } catch { /* ignore */ }
  stats = { ...stats, ...adapter.postRunStats?.(opts.ws), ...opts.extraStats };

  const launched = marker.launchedAt ? Date.parse(marker.launchedAt) : NaN;
  const finished = marker.finishedAt ? Date.parse(marker.finishedAt) : NaN;
  const durationMs =
    !Number.isNaN(launched) && !Number.isNaN(finished) ? finished - launched : (stats.durationMs ?? null);

  const run: RunJson = {
    runId,
    theme: opts.themeId,
    harness: marker.combo.harness,
    model: adapter.recordModel(marker.combo.model, marker.combo.modelArg),
    effort: marker.combo.effort,
    modelArg: marker.combo.modelArg,
    harnessVersion: opts.harnessVersion ?? readHarnessVersionFile(opts.ws),
    manual: marker.mode === 'manual',
    promptSha256: marker.promptSha256,
    preparedAt: marker.preparedAt ?? null,
    launchedAt: marker.launchedAt ?? null,
    finishedAt: marker.finishedAt ?? null,
    importedAt: new Date().toISOString(),
    status,
    reasons: finalReasons,
    stats: {
      durationMs,
      costUsd: stats.costUsd ?? null,
      tokensIn: stats.tokensIn ?? null,
      tokensOut: stats.tokensOut ?? null,
      consoleErrors,
      externalDomains,
      distBytes: dirSizeBytes(join(outDir, 'dist')),
    },
    notes: existsSync(join(outDir, 'NOTES.md')),
  };
  writeJson(join(outDir, 'run.json'), run);

  // 7. 标记已导入
  marker.imported = true;
  writeMarker(opts.ws, marker);

  log(`  run.json 已写入 ${outDir}/run.json（status=${status}${finalReasons.length ? '，原因：' + finalReasons.join('、') : ''}）`);
  return { run, skippedSecrets, absPathHits, probeErrors };
}
