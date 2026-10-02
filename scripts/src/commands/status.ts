import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { listThemeIds, runsDir } from '../lib/paths.ts';
import type { RunJson } from '../lib/schemas.ts';
import { readJson } from '../lib/util.ts';
import { scanWorkspaces } from '../lib/workspace.ts';

export async function cmdStatus(): Promise<void> {
  const wsList = scanWorkspaces();
  console.log('== 工作区（~/gallery3d-workspaces）==');
  if (!wsList.length) {
    console.log('  （空）');
  } else {
    for (const { ws, marker } of wsList) {
      const state = marker.imported
        ? '已导入'
        : marker.finishedAt
          ? `已结束 exit=${marker.exitCode}，待导入`
          : marker.launchedAt
            ? '运行中'
            : '已准备（未启动）';
      console.log(`  ${ws.split('/').pop()}  ${marker.theme}  ${marker.runId}  [${marker.mode}] ${state}`);
    }
  }

  console.log('\n== 主题 / 运行记录 ==');
  const themes = listThemeIds();
  if (!themes.length) {
    console.log('  （无主题）');
    return;
  }
  for (const t of themes) {
    const rd = runsDir(t);
    const runs: RunJson[] = [];
    if (existsSync(rd)) {
      for (const name of readdirSync(rd)) {
        const rp = join(rd, name, 'run.json');
        if (existsSync(rp)) {
          try { runs.push(readJson<RunJson>(rp)); } catch { /* 跳过坏的 */ }
        }
      }
    }
    console.log(`  ${t}${runs.length ? '' : '  （无运行记录）'}`);
    for (const r of runs.sort((a, b) => a.runId.localeCompare(b.runId))) {
      const mark = r.status === 'ok' ? '✓' : '✗';
      const extra = r.reasons.length ? `（${r.reasons.join('、')}）` : '';
      console.log(`    ${mark} ${r.runId}  ${r.status}${extra}${r.manual ? '  [手动]' : ''}`);
    }
  }
}
