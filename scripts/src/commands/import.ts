import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { runImport } from '../lib/importer.ts';
import { requireThemeDir } from '../lib/paths.ts';
import { pick } from '../lib/ui.ts';
import { findWorkspaceByRunId, scanWorkspaces } from '../lib/workspace.ts';

export async function cmdImport(args: string[]): Promise<void> {
  const { positionals, values } = parseArgs({
    args,
    allowPositionals: true,
    options: {
      workspace: { type: 'string', short: 'w' },
      'no-probe': { type: 'boolean' },
      help: { type: 'boolean', short: 'h' },
    },
  });
  if (values.help) {
    console.log(`用法：pnpm g import <theme> [runId] [--workspace <路径>] [--no-probe]

  不给 runId 时，列出该主题还没导入的工作区供选择。
  --workspace  直接指定工作区目录（跳过按 runId 扫描）
  --no-probe   跳过浏览器探测和截图（只复制文件写 run.json）`);
    return;
  }
  const themeId = positionals[0];
  const runId = positionals[1];
  if (!themeId) throw new Error('缺少主题 id：pnpm g import <theme> [runId]');
  requireThemeDir(themeId);

  let ws = values.workspace ? resolve(values.workspace) : undefined;
  if (!ws) {
    if (runId) {
      const found = findWorkspaceByRunId(themeId, runId);
      if (!found) throw new Error(`在 ~/gallery3d-workspaces 找不到 ${themeId}/${runId} 的工作区；用 --workspace 指定路径`);
      ws = found.ws;
    } else {
      const candidates = scanWorkspaces().filter((w) => w.marker.theme === themeId && !w.marker.imported);
      if (!candidates.length) throw new Error(`没有可导入的 ${themeId} 工作区`);
      const picked = await pick(
        '选择要导入的工作区',
        candidates.map((c) => ({
          value: c.ws,
          label: `${c.marker.runId}  ${c.ws.split('/').pop()}`,
          hint: `${c.marker.mode}${c.marker.imported ? '（已导入）' : ''}`,
        })),
      );
      ws = picked;
    }
  }
  if (!existsSync(ws)) throw new Error(`工作区不存在：${ws}`);

  console.log(`导入 ${ws} …`);
  const result = await runImport({
    themeId,
    ws,
    runIdOverride: runId,
    probe: !values['no-probe'],
  });
  if (result.probeErrors.length) console.log(`探测问题：${result.probeErrors.join('；')}`);
  console.log(`完成：${result.run.status} → runId=${result.run.runId}`);
}
