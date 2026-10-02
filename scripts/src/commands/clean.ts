import { existsSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { workspacesRoot } from '../lib/paths.ts';
import { yesNo } from '../lib/ui.ts';
import { fmtBytes, dirSizeBytes } from '../lib/util.ts';
import { scanWorkspaces } from '../lib/workspace.ts';

export async function cmdClean(args: string[]): Promise<void> {
  const { values } = parseArgs({
    args,
    allowPositionals: true,
    options: {
      all: { type: 'boolean' },
      yes: { type: 'boolean', short: 'y' },
      help: { type: 'boolean', short: 'h' },
    },
  });
  if (values.help) {
    console.log(`用法：pnpm g clean [--all] [--yes]

  默认只删除已导入（imported=true）的工作区；--all 删除全部。
  同时清理 ~/gallery3d-workspaces 下的 opencode 临时配置文件。`);
    return;
  }
  const entries = scanWorkspaces();
  const targets = entries.filter((e) => values.all || e.marker.imported);
  if (!targets.length) {
    console.log(values.all ? '没有工作区。' : '没有已导入的工作区可清理。');
    return;
  }
  if (!values.yes) {
    const ok = await yesNo(
      `将删除 ${targets.length} 个工作区${values.all ? '（含未导入的）' : '（均已导入）'}，共 ${fmtBytes(targets.reduce((s, t) => s + dirSizeBytes(t.ws), 0))}。继续？`,
      false,
    );
    if (!ok) { console.log('已取消'); return; }
  }
  let freed = 0;
  for (const t of targets) {
    freed += dirSizeBytes(t.ws);
    rmSync(t.ws, { recursive: true, force: true });
    console.log(`  删除 ${t.ws}（${t.marker.runId}${t.marker.imported ? '' : '，未导入'}）`);
  }
  // 顺带清理 opencode 配置临时文件
  let orphans = 0;
  if (existsSync(workspacesRoot)) {
    for (const name of readdirSync(workspacesRoot)) {
      if (name.startsWith('.opencode-config-') && name.endsWith('.json')) {
        rmSync(join(workspacesRoot, name), { force: true });
        orphans++;
      }
    }
  }
  console.log(`清理完成：删除 ${targets.length} 个工作区，释放 ${fmtBytes(freed)}${orphans ? `，另清理 ${orphans} 个 opencode 临时配置` : ''}`);
}
