import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { getAdapter } from '../adapters/index.ts';
import { runImport } from '../lib/importer.ts';
import { requireThemeDir, runDir } from '../lib/paths.ts';
import { getHarness, loadHarnesses, loadTheme, modelsForHarness, saveTheme, addModelMapping } from '../lib/registry.ts';
import { harnessVersion, runAdapter } from '../lib/runner.ts';
import type { RunOutcome } from '../lib/runner.ts';
import { readMarker, writeMarker } from '../lib/workspace.ts';
import type { Combo } from '../lib/schemas.ts';
import { ask, pick, yesNo } from '../lib/ui.ts';
import { sanitizeRunId, sha256File } from '../lib/util.ts';
import { prepareWorkspace } from '../lib/workspace.ts';

const OTHER = '__other__';

export async function cmdRun(args: string[]): Promise<void> {
  const { positionals, values } = parseArgs({
    args,
    allowPositionals: true,
    options: {
      harness: { type: 'string' },
      model: { type: 'string' },
      effort: { type: 'string' },
      manual: { type: 'boolean' },
      yes: { type: 'boolean', short: 'y' },
      'print-argv': { type: 'boolean' },
      help: { type: 'boolean', short: 'h' },
    },
  });
  if (values.help) {
    console.log(`用法：pnpm g run <theme> [--harness H] [--model M] [--effort E] [--manual] [--yes] [--print-argv]

  --harness    见 data/harnesses.json 的 id
  --model      models.json 里的模型 id，或直接给该 harness 的 modelArg
  --effort     推理强度（各 harness 取值不同）
  --manual     只准备工作区，不启动 agent
  --yes        跳过确认（覆盖已存在的 run 目录）
  --print-argv 只打印将执行的命令，不真正运行（调试用）`);
    return;
  }
  const themeId = positionals[0];
  if (!themeId) throw new Error('缺少主题 id：pnpm g run <theme> …');
  const tDir = requireThemeDir(themeId);
  const theme = loadTheme(tDir);
  const promptPath = join(tDir, 'prompt.md');
  if (!existsSync(promptPath)) throw new Error(`缺少 ${promptPath}`);
  const prompt = readFileSync(promptPath, 'utf8').trim();
  if (!prompt) throw new Error(`${promptPath} 是空的，先写任务提示词`);

  // prompt.md 可能手改过 → 以文件为准回写 theme.json；
  // 但如果已有运行结果，改 prompt 等于换了一道题，要先确认
  const promptSha = sha256File(promptPath);
  if (theme.promptSha256 !== promptSha) {
    const runsDir = join(tDir, 'runs');
    const existing = existsSync(runsDir) ? readdirSync(runsDir).filter((d) => existsSync(join(runsDir, d, 'run.json'))) : [];
    if (existing.length && !values.yes) {
      const ok = await yesNo(
        `prompt.md 被改过，但主题已有 ${existing.length} 个结果（${existing.slice(0, 5).join('、')}）。` +
          '按约定提示词一旦有结果就应锁定；继续会用新提示词再跑。确定继续？',
        false,
      );
      if (!ok) throw new Error('已中止（提示词已锁定，如需修改请新建主题）');
    }
    theme.promptSha256 = promptSha;
    saveTheme(tDir, theme);
    console.log('prompt.md 有改动，已更新 theme.json 里的 promptSha256');
  }

  // 1. harness
  let harnessId = values.harness;
  if (!harnessId) {
    const hs = loadHarnesses();
    harnessId = await pick('选择 harness', hs.map((h) => ({ value: h.id, label: h.displayName, hint: h.notes })));
  }
  const harness = getHarness(harnessId);
  const adapter = getAdapter(harness.adapter);

  // 2. model
  let modelId: string | undefined;
  let modelArg: string | null | undefined;
  if (values.model) {
    const hit = modelsForHarness(harness.id).find((m) => m.id === values.model);
    if (hit) {
      modelId = hit.id;
      modelArg = hit.perHarness[harness.id] ?? null;
    } else {
      // 直接当 modelArg 用
      modelId = values.model;
      modelArg = values.model;
    }
  } else {
    const candidates = modelsForHarness(harness.id);
    const choice = await pick('选择模型', [
      ...candidates.map((m) => ({
        value: m.id,
        label: m.display,
        hint: m.perHarness[harness.id] == null ? '由 settings 决定' : `参数：${m.perHarness[harness.id]}`,
      })),
      { value: OTHER, label: '其他…', hint: '手动输入 modelArg' },
    ]);
    if (choice === OTHER) {
      modelArg = await ask('输入传给 harness 的模型参数（modelArg）', { placeholder: '如 gpt-6.1-sol' });
      const wantAdd = await yesNo('把这个模型登记到 data/models.json？', true);
      if (wantAdd) {
        const nid = await ask('模型 id（用于 models.json / runId）', { placeholder: modelArg.replaceAll('/', '-') });
        const ndisplay = await ask('显示名', { placeholder: nid });
        addModelMapping(harness.id, nid, ndisplay || nid, modelArg);
        modelId = nid;
        console.log(`已写入 models.json：${nid} → ${harness.id}: ${modelArg}`);
      } else {
        modelId = modelArg;
      }
    } else {
      const m = candidates.find((x) => x.id === choice)!;
      modelId = m.id;
      modelArg = m.perHarness[harness.id] ?? null;
    }
  }

  // 3. effort
  let effort = values.effort;
  if (!effort && adapter.deriveEffort) {
    effort = adapter.deriveEffort(modelArg ?? null) ?? undefined;
    if (effort) console.log(`effort 由 modelArg 推得：${effort}`);
  }
  if (!effort) {
    const opts = adapter.effortOptions ?? ['low', 'medium', 'high'];
    const def = adapter.defaultEffort ?? 'high';
    effort = await pick(
      '选择 effort',
      opts.map((o) => ({ value: o, label: o === def ? `${o}（默认）` : o })),
    );
  }

  const combo: Combo = { harness: harness.id, model: modelId!, effort, modelArg: modelArg ?? null };
  const runId = sanitizeRunId(`${harness.id}__${modelId}__${effort}`);
  const outDir = runDir(themeId, runId);
  if (existsSync(outDir)) {
    if (values.yes) {
      rmSync(outDir, { recursive: true, force: true });
    } else {
      const ok = await yesNo(`run 目录已存在：${outDir}\n覆盖并重新跑？`, false);
      if (!ok) throw new Error('已中止（run 目录已存在）');
      rmSync(outDir, { recursive: true, force: true });
    }
  }

  // 4. 准备工作区
  const mode = values.manual ? 'manual' : 'headless';
  const { ws, logFile } = prepareWorkspace({
    themeId, runId, combo, promptSha256: promptSha,
    allowExternalAssets: theme.allowExternalAssets, mode, adapter,
  });
  console.log(`\n工作区：${ws}`);
  console.log(`runId：${runId}`);

  // harness 版本在准备时就记录，手动模式也能拿到
  const version = await harnessVersion(harness.bin);
  if (version) writeFileSync(join(ws, '.gallery3d-harness-version'), version + '\n');

  if (mode === 'manual') {
    try {
      execFileSync('pbcopy', [], { input: prompt });
      console.log('prompt 已复制到剪贴板');
    } catch {
      console.log('（pbcopy 失败，请手动复制 prompt.md 内容）');
    }
    console.log(`\n手动模式：到工作区里启动你的 agent，把 prompt 发给它。完成后运行：`);
    console.log(`  pnpm g import ${themeId} ${runId}`);
    return;
  }

  // 5. headless：构造 argv
  const ctx = { ws, runId, prompt, combo, logFile };
  const attempts = adapter.plan(ctx);

  if (values['print-argv']) {
    console.log('\n将执行（dry-run，未运行）：');
    for (const [i, a] of attempts.entries()) {
      console.log(`  attempt ${i + 1}: ${a.argv.map((s) => (s.includes(' ') || s === '' ? JSON.stringify(s) : s)).join(' ')}`);
      if (a.env) console.log(`    env: ${JSON.stringify(a.env)}`);
    }
    return;
  }

  console.log(`\n启动 ${harness.displayName}（${version ?? '版本未知'}）…`);
  let outcome: RunOutcome;
  try {
    outcome = await runAdapter(ctx, adapter);
  } catch (e) {
    // 二进制不存在 / spawn 失败：记为启动失败，仍然走导入留下记录
    console.log(`\nagent 启动失败：${e instanceof Error ? e.message : String(e)}`);
    const m = readMarker(ws);
    m.finishedAt = new Date().toISOString();
    m.exitCode = 127;
    writeMarker(ws, m);
    outcome = { exitCode: 127, stats: {}, attemptsUsed: 0 };
  }
  console.log(`\nagent 退出：exitCode=${outcome.exitCode}`);

  // 6. 自动导入
  console.log('\n开始导入…');
  const result = await runImport({
    themeId, ws,
    extraStats: outcome.stats,
    harnessVersion: version,
  });
  if (result.probeErrors.length) {
    console.log(`探测问题：${result.probeErrors.join('；')}`);
  }
  console.log(`\n完成：${result.run.status} → ${outDir}`);
}
