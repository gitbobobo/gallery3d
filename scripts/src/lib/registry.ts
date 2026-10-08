import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { getAdapter } from '../adapters/index.ts';
import type { Adapter } from '../adapters/types.ts';
import { dataDir } from './paths.ts';
import { harnessSchema, modelsFileSchema, themeSchema } from './schemas.ts';
import type { Harness, ModelEntry, Theme } from './schemas.ts';
import { readJson, writeJson } from './util.ts';

export function loadHarnesses(): Harness[] {
  const path = join(dataDir, 'harnesses.json');
  if (!existsSync(path)) throw new Error(`缺少 ${path}`);
  const raw = readJson<{ harnesses: unknown[] }>(path);
  return raw.harnesses.map((h) => harnessSchema.parse(h));
}

export function getHarness(id: string): Harness {
  const h = loadHarnesses().find((x) => x.id === id);
  if (!h) throw new Error(`未知 harness：${id}（见 data/harnesses.json）`);
  return h;
}

/** harness id → adapter 两跳解析：marker/runId 里存的是 harness id，adapter 才是代码里的键 */
export function adapterForHarness(harnessId: string): Adapter {
  const harness = getHarness(harnessId);
  try {
    return getAdapter(harness.adapter);
  } catch {
    throw new Error(`未知 adapter：${harness.adapter}（harness ${harnessId} 的 adapter 字段，见 data/harnesses.json）`);
  }
}

export function loadModels(): ModelEntry[] {
  const path = join(dataDir, 'models.json');
  if (!existsSync(path)) return [];
  return modelsFileSchema.parse(readJson(path)).models;
}

export function modelsForHarness(harnessId: string): ModelEntry[] {
  return loadModels().filter((m) => harnessId in m.perHarness);
}

export function loadTheme(themeDirPath: string): Theme {
  return themeSchema.parse(readJson(join(themeDirPath, 'theme.json')));
}

export function saveTheme(themeDirPath: string, theme: Theme): void {
  writeJson(join(themeDirPath, 'theme.json'), theme);
}

/** 往 models.json 里给某个 harness 追加一个模型映射 */
export function addModelMapping(harnessId: string, modelId: string, display: string, modelArg: string | null): void {
  const path = join(dataDir, 'models.json');
  const file = existsSync(path) ? modelsFileSchema.parse(readJson(path)) : { models: [] };
  const existing = file.models.find((m) => m.id === modelId);
  if (existing) {
    existing.perHarness[harnessId] = modelArg;
  } else {
    file.models.push({ id: modelId, display, perHarness: { [harnessId]: modelArg } });
  }
  writeJson(path, file);
}
