// data.ts — build-time scanner for the themes/ data contract.
//
// Directory layout (read-only inputs):
//   themes/<themeId>/theme.json   theme metadata
//   themes/<themeId>/prompt.md    verbatim prompt text (Chinese)
//   themes/<themeId>/reference/*  optional reference images handed to agents
//   themes/<themeId>/runs/<runId>/run.json
//   themes/<themeId>/runs/<runId>/dist/index.html ...
//   themes/<themeId>/runs/<runId>/thumb.webp / thumb-mobile.webp / NOTES.md
//
// Themes dir resolution: GALLERY3D_THEMES_DIR env var, else <site>/../themes.
// Malformed entries are skipped defensively — a bad run/theme must never
// break the build.

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { normalizeRatings, type Ratings, type Tier } from './ratings';

// Tier/Ratings/DEFAULT_TIERS 住在 ratings.ts（rate API 也 import 它），
// 这里 re-export 保持既有 `from './data'` / `from '../data'` 的引用不断。
export { DEFAULT_TIERS } from './ratings';
export type { Ratings, Tier } from './ratings';

// NOTE: do not anchor on import.meta.url here — data.ts is bundled by vite
// during `astro build` and the resulting URL no longer points at src/.
// Astro/pnpm always invoke dev/build with cwd = site/, so cwd is the root.
export const SITE_ROOT = process.cwd();

export const THEMES_DIR = process.env.GALLERY3D_THEMES_DIR
  ? resolve(process.env.GALLERY3D_THEMES_DIR)
  : resolve(SITE_ROOT, '../themes');

// <repo>/data/*.json — shared id → display-name tables (optional inputs)
export const DATA_DIR = resolve(SITE_ROOT, '../data');

/** Base path (always ends with '/'); join with a leading-free path. */
export const BASE: string = import.meta.env.BASE_URL ?? '/';
export const baseUrl = (p = ''): string => BASE + p.replace(/^\/+/, '');

/** URL of a synced run directory, e.g. `${BASE}works/watch-movement/r1/` */
export const workUrl = (themeId: string, runId: string): string =>
  baseUrl(`works/${themeId}/${runId}/`);

/** URL of a theme reference file synced from themes/<id>/reference/ */
export const referenceUrl = (themeId: string, file: string): string =>
  baseUrl(`works/${themeId}/reference/${encodeURIComponent(file)}`);

/** Explicit index.html entry — directory URLs 404 under astro dev. */
export const workEntry = (themeId: string, runId: string): string =>
  `${workUrl(themeId, runId)}index.html`;

export interface ThemeMeta {
  id: string;
  title: string;
  category: 'web' | '3d' | string;
  tags: string[];
  lang?: string;
  allowExternalAssets?: boolean;
  promptSha256?: string;
  createdAt?: string;
}

export interface RunStats {
  durationMs?: number;
  costUsd?: number;
  tokensIn?: number;
  tokensOut?: number;
  consoleErrors?: number;
  externalDomains?: string[];
  distBytes?: number;
}

export interface Run {
  /** filesystem directory name — canonical id used in URLs */
  id: string;
  /** runId field from run.json (display) */
  runId: string;
  themeId: string;
  harness: string;
  model: string;
  /** models.json 的 id：非空 run.json.modelId 优先；旧记录回退目录名 `__` 中段，再回退 model */
  modelKey: string;
  /** models.json 的 display，缺省回退 model */
  modelName: string;
  /** harnesses.json 的 displayName，缺省回退 harness */
  harnessName: string;
  effort: string;
  modelArg?: string;
  harnessVersion?: string;
  manual: boolean;
  promptSha256?: string;
  /** 评级：等级 id 与同等级内名次（0 起）；未评级为 undefined */
  tierId?: string;
  rank?: number;
  /** 全局名次（1 起），只给已评级的 run */
  place?: number;
  preparedAt?: string;
  launchedAt?: string;
  finishedAt?: string;
  importedAt?: string;
  status: 'ok' | 'incomplete';
  reasons: string[];
  stats: RunStats;
  notes: boolean;
  /** NOTES.md raw markdown, when present */
  notesMd?: string;
  hasDist: boolean;
  /** synced cover filename inside the run dir, e.g. 'cover.webp' | 'cover.png' */
  coverDesktop?: string;
  coverMobile?: string;
}

export interface Theme {
  /** filesystem directory name — canonical id used in URLs */
  id: string;
  meta: ThemeMeta;
  prompt: string;
  /** themes/<id>/reference/ 里的参考图文件名（下发给答题 agent 的同一批图） */
  references: string[];
  runs: Run[];
  ratings: Ratings;
}

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;

const readReferences = (themeDir: string): string[] => {
  const dir = join(themeDir, 'reference');
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => IMAGE_EXT.test(f)).sort();
};

const readJson = (p: string): unknown => {
  try {
    return JSON.parse(readFileSync(p, 'utf-8'));
  } catch {
    return undefined;
  }
};

const isObj = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null;

const str = (v: unknown): string | undefined =>
  typeof v === 'string' && v.length > 0 ? v : undefined;

const strArr = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];

interface DisplayMaps {
  harnesses: Map<string, string>;
  models: Map<string, string>;
}

// data/harnesses.json: [{id, displayName}], data/models.json: [{id, display}]
const readDisplayMaps = (): DisplayMaps => {
  const harnesses = new Map<string, string>();
  const models = new Map<string, string>();
  const hj = readJson(join(DATA_DIR, 'harnesses.json'));
  if (isObj(hj) && Array.isArray(hj.harnesses)) {
    for (const x of hj.harnesses) {
      if (!isObj(x)) continue;
      const id = str(x.id);
      const name = str(x.displayName);
      if (id && name) harnesses.set(id, name);
    }
  }
  const mj = readJson(join(DATA_DIR, 'models.json'));
  if (isObj(mj) && Array.isArray(mj.models)) {
    for (const x of mj.models) {
      if (!isObj(x)) continue;
      const id = str(x.id);
      const name = str(x.display);
      if (id && name) models.set(id, name);
    }
  }
  return { harnesses, models };
};

const readRun = (
  themeId: string,
  runDir: string,
  dirName: string,
  names: DisplayMaps,
): Run | null => {
  const j = readJson(join(runDir, 'run.json'));
  if (!isObj(j)) return null;
  const harness = str(j.harness);
  const model = str(j.model);
  const effort = str(j.effort);
  if (!harness || !model || !effort) return null; // malformed: missing identity
  const stats = isObj(j.stats) ? (j.stats as RunStats) : {};
  const status = j.status === 'ok' ? 'ok' : 'incomplete';
  const distIndex = join(runDir, 'dist', 'index.html');
  const notesPath = join(runDir, 'NOTES.md');
  // importer emits .webp per contract, but tolerate .png too
  const pickCover = (base: 'thumb' | 'thumb-mobile') =>
    (['webp', 'png'] as const).find((ext) => existsSync(join(runDir, `${base}.${ext}`)));
  const coverDesktop = pickCover('thumb');
  const coverMobile = pickCover('thumb-mobile');
  let notesMd: string | undefined;
  try {
    notesMd = existsSync(notesPath) ? readFileSync(notesPath, 'utf-8') : undefined;
  } catch {
    notesMd = undefined;
  }
  const parts = dirName.split('__');
  // 非空 modelId 优先（新导入记录）；旧记录回退目录名 `__` 中段，再回退 model
  const modelKey = str(j.modelId) ?? (parts.length === 3 ? str(parts[1]) : undefined) ?? model;
  return {
    id: dirName,
    runId: str(j.runId) ?? dirName,
    themeId,
    harness,
    model,
    modelKey,
    modelName: names.models.get(modelKey) ?? model,
    harnessName: names.harnesses.get(harness) ?? harness,
    effort,
    modelArg: str(j.modelArg),
    harnessVersion: str(j.harnessVersion),
    manual: j.manual === true,
    promptSha256: str(j.promptSha256),
    preparedAt: str(j.preparedAt),
    launchedAt: str(j.launchedAt),
    finishedAt: str(j.finishedAt),
    importedAt: str(j.importedAt),
    status,
    reasons: strArr(j.reasons),
    stats: {
      durationMs: typeof stats.durationMs === 'number' ? stats.durationMs : undefined,
      costUsd: typeof stats.costUsd === 'number' ? stats.costUsd : undefined,
      tokensIn: typeof stats.tokensIn === 'number' ? stats.tokensIn : undefined,
      tokensOut: typeof stats.tokensOut === 'number' ? stats.tokensOut : undefined,
      consoleErrors:
        typeof stats.consoleErrors === 'number' ? stats.consoleErrors : undefined,
      externalDomains: strArr(stats.externalDomains),
      distBytes: typeof stats.distBytes === 'number' ? stats.distBytes : undefined,
    },
    notes: j.notes === true || notesMd !== undefined,
    notesMd,
    hasDist: existsSync(distIndex),
    coverDesktop: coverDesktop ? `cover.${coverDesktop}` : undefined,
    coverMobile: coverMobile ? `cover-mobile.${coverMobile}` : undefined,
  };
};

const runSortKey = (r: Run): string =>
  r.finishedAt ?? r.importedAt ?? r.preparedAt ?? '';

const readRatings = (themeDir: string, validRunIds: ReadonlySet<string>): Ratings =>
  normalizeRatings(readJson(join(themeDir, 'ratings.json')), validRunIds);

const readTheme = (dirName: string, names: DisplayMaps): Theme | null => {
  const themeDir = join(THEMES_DIR, dirName);
  const j = readJson(join(themeDir, 'theme.json'));
  if (!isObj(j)) return null;
  const title = str(j.title) ?? str(j.id) ?? dirName;
  let prompt = '';
  try {
    const p = join(themeDir, 'prompt.md');
    if (existsSync(p)) prompt = readFileSync(p, 'utf-8').trim();
  } catch {
    /* keep empty */
  }
  const runsDir = join(themeDir, 'runs');
  const runs: Run[] = [];
  if (existsSync(runsDir)) {
    for (const runId of readdirSync(runsDir)) {
      const rd = join(runsDir, runId);
      try {
        if (!statSync(rd).isDirectory()) continue;
        const run = readRun(dirName, rd, runId, names);
        if (run) runs.push(run);
      } catch {
        /* skip malformed run */
      }
    }
  }
  // rows 已规范化：失效引用/未知等级/重复 runId 都已清掉，直接标注名次
  const ratings = readRatings(themeDir, new Set(runs.map((r) => r.id)));
  const tierOrder = new Map(ratings.tiers.map((t, i) => [t.id, i]));
  for (const [tierId, ids] of Object.entries(ratings.rows)) {
    ids.forEach((id, i) => {
      const r = runs.find((x) => x.id === id);
      if (r) { r.tierId = tierId; r.rank = i; }
    });
  }
  // 已评级在前，按等级顺序+行内名次；未评级按完成时间排在后
  runs.sort((a, b) => {
    const ta = a.tierId !== undefined ? (tierOrder.get(a.tierId) ?? 999) : 999;
    const tb = b.tierId !== undefined ? (tierOrder.get(b.tierId) ?? 999) : 999;
    if (ta !== tb) return ta - tb;
    if (a.tierId !== undefined && b.tierId !== undefined) return (a.rank ?? 0) - (b.rank ?? 0);
    return runSortKey(a).localeCompare(runSortKey(b)) || a.id.localeCompare(b.id);
  });
  // 全局名次：排序完成后按顺序给已评级的 run 编号（1 起）
  let place = 0;
  for (const r of runs) if (r.tierId !== undefined) r.place = ++place;
  return {
    id: dirName,
    meta: {
      id: str(j.id) ?? dirName,
      title,
      category: str(j.category) ?? 'web',
      tags: strArr(j.tags),
      lang: str(j.lang),
      allowExternalAssets: j.allowExternalAssets === true,
      promptSha256: str(j.promptSha256),
      createdAt: str(j.createdAt),
    },
    prompt,
    references: readReferences(themeDir),
    runs,
    ratings,
  };
};

/** Scan the themes dir once; safe on missing dir/malformed entries. */
export const loadThemes = (): Theme[] => {
  if (!existsSync(THEMES_DIR)) return [];
  const names = readDisplayMaps();
  const out: Theme[] = [];
  for (const dirName of readdirSync(THEMES_DIR)) {
    try {
      if (!statSync(join(THEMES_DIR, dirName)).isDirectory()) continue;
      const t = readTheme(dirName, names);
      if (t) out.push(t);
    } catch {
      /* skip malformed theme */
    }
  }
  out.sort(
    (a, b) =>
      (a.meta.createdAt ?? '').localeCompare(b.meta.createdAt ?? '') ||
      a.id.localeCompare(b.id),
  );
  return out;
};

/** Runs grouped by tier for the salon wall; tier=null is the unrated tail. */
export interface TierGroup {
  tier: Tier | null;
  runs: Run[];
}

/** Groups in tier order with the unrated group appended; empty groups included. */
export const tierGroups = (theme: Theme): TierGroup[] => {
  const groups: TierGroup[] = theme.ratings.tiers.map((tier) => ({
    tier,
    runs: theme.runs.filter((r) => r.tierId === tier.id),
  }));
  groups.push({ tier: null, runs: theme.runs.filter((r) => r.tierId === undefined) });
  return groups;
};

export interface FacetValue {
  value: string;
  label: string;
  count: number;
}

/** Distinct facet values (with display label + count) for filter selects. */
export const facetValues = (
  runs: Run[],
  key: 'harness' | 'modelKey' | 'effort',
): FacetValue[] => {
  const seen = new Map<string, { label: string; count: number }>();
  for (const r of runs) {
    const value = r[key];
    const label =
      key === 'harness' ? r.harnessName : key === 'modelKey' ? r.modelName : value;
    const cur = seen.get(value);
    if (cur) cur.count += 1;
    else seen.set(value, { label, count: 1 });
  }
  const effortOrder = ['xhigh', 'high', 'medium', 'low', 'minimal'];
  return [...seen.entries()]
    .map(([value, x]) => ({ value, label: x.label, count: x.count }))
    .sort((a, b) =>
      key === 'effort'
        ? (effortOrder.indexOf(a.value) + 1 || 99) -
            (effortOrder.indexOf(b.value) + 1 || 99) || a.value.localeCompare(b.value)
        : b.count - a.count || a.label.localeCompare(b.label),
    );
};

export interface ThemeSummary {
  total: number;
  /** status=incomplete；可能有产物（探测失败、提前停止等），不等于没交卷 */
  incomplete: number;
  /** 没有 dist 产物，即"没交" */
  noDist: number;
  harnesses: number;
  models: number;
  minMs?: number;
  maxMs?: number;
}

/** Counts used by the home/theme headers; min/max over runs with durationMs. */
export const themeSummary = (theme: Theme): ThemeSummary => {
  const durations = theme.runs
    .map((r) => r.stats.durationMs)
    .filter((n): n is number => Number.isFinite(n));
  return {
    total: theme.runs.length,
    incomplete: theme.runs.filter((r) => r.status === 'incomplete').length,
    noDist: theme.runs.filter((r) => !r.hasDist).length,
    harnesses: new Set(theme.runs.map((r) => r.harness)).size,
    models: new Set(theme.runs.map((r) => r.modelKey)).size,
    minMs: durations.length ? Math.min(...durations) : undefined,
    maxMs: durations.length ? Math.max(...durations) : undefined,
  };
};
