import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { REFERENCE_DIR, themeDir, workspacesRoot } from './paths.ts';
import { markerSchema } from './schemas.ts';
import type { Combo, Marker } from './schemas.ts';
import { copyDir, newWorkspaceId, readJson, writeJson } from './util.ts';
import type { Adapter } from '../adapters/types.ts';

const templatePath = join(dirname(fileURLToPath(import.meta.url)), '..', 'templates', 'agents-md.md');
const FORBIDDEN_ASSETS_BULLET = '- 不要使用从网上下载的现成 3D 模型、图片、贴图或 HDRI。几何体和材质用代码生成，或者自己写模型文件\n';

/** allowExternalAssets=true 时去掉“禁止外部素材”那条，其余原样 */
export function renderAgentsMd(allowExternalAssets: boolean): string {
  const tpl = readFileSync(templatePath, 'utf8');
  return allowExternalAssets ? tpl.replace(FORBIDDEN_ASSETS_BULLET, '') : tpl;
}

export interface PreparedWorkspace {
  ws: string;
  markerPath: string;
  logFile: string;
}

export function prepareWorkspace(opts: {
  themeId: string;
  runId: string;
  combo: Combo;
  promptSha256: string;
  allowExternalAssets: boolean;
  mode: 'manual' | 'headless';
  adapter: Adapter;
}): PreparedWorkspace {
  mkdirSync(workspacesRoot, { recursive: true });
  const ws = join(workspacesRoot, newWorkspaceId());
  mkdirSync(ws, { recursive: true });

  execFileSync('git', ['init', '-q'], { cwd: ws });

  writeFileSync(join(ws, 'AGENTS.md'), renderAgentsMd(opts.allowExternalAssets));
  const refDir = join(themeDir(opts.themeId), REFERENCE_DIR);
  if (existsSync(refDir)) copyDir(refDir, join(ws, REFERENCE_DIR));
  for (const f of opts.adapter.extraFiles?.(ws) ?? []) {
    writeFileSync(join(ws, f.path), f.content);
  }

  const logFile = join(ws, 'run.log');
  const marker: Marker = {
    theme: opts.themeId,
    runId: opts.runId,
    combo: opts.combo,
    promptSha256: opts.promptSha256,
    preparedAt: new Date().toISOString(),
    mode: opts.mode,
    logFile,
    launchedAt: null,
    finishedAt: null,
    exitCode: null,
    imported: false,
  };
  const markerPath = join(ws, '.gallery3d-workspace.json');
  writeJson(markerPath, marker);
  return { ws, markerPath, logFile };
}

export function readMarker(ws: string): Marker {
  return markerSchema.parse(readJson(join(ws, '.gallery3d-workspace.json')));
}

export function writeMarker(ws: string, marker: Marker): void {
  writeJson(join(ws, '.gallery3d-workspace.json'), marker);
}

export interface WorkspaceEntry {
  ws: string;
  marker: Marker;
}

/** 扫描 ~/gallery3d-workspaces 下所有带 marker 的工作区 */
export function scanWorkspaces(): WorkspaceEntry[] {
  if (!existsSync(workspacesRoot)) return [];
  const out: WorkspaceEntry[] = [];
  for (const name of readdirSync(workspacesRoot)) {
    const ws = join(workspacesRoot, name);
    const mp = join(ws, '.gallery3d-workspace.json');
    if (!existsSync(mp)) continue;
    try {
      out.push({ ws, marker: markerSchema.parse(readJson(mp)) });
    } catch { /* marker 坏了就跳过 */ }
  }
  return out;
}

export function findWorkspaceByRunId(runId: string): WorkspaceEntry | null {
  return scanWorkspaces().find((w) => w.marker.runId === runId) ?? null;
}
