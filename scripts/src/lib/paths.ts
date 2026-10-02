import { existsSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// scripts/src/lib/paths.ts → scripts/ → repo root
const here = dirname(fileURLToPath(import.meta.url));
export const repoRoot = resolve(here, '..', '..', '..');
export const themesDir = join(repoRoot, 'themes');
export const dataDir = join(repoRoot, 'data');
export const workspacesRoot = join(homedir(), 'gallery3d-workspaces');

export function themeDir(themeId: string): string {
  return join(themesDir, themeId);
}

export function runsDir(themeId: string): string {
  return join(themeDir(themeId), 'runs');
}

export function runDir(themeId: string, runId: string): string {
  return join(runsDir(themeId), runId);
}

export function requireThemeDir(themeId: string): string {
  const dir = themeDir(themeId);
  if (!existsSync(join(dir, 'theme.json'))) {
    throw new Error(`主题不存在：${themeId}（缺少 ${dir}/theme.json）`);
  }
  return dir;
}

export function listThemeIds(): string[] {
  if (!existsSync(themesDir)) return [];
  return readdirSync(themesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(themesDir, d.name, 'theme.json')))
    .map((d) => d.name)
    .sort();
}
