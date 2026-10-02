// data.ts — build-time scanner for the themes/ data contract.
//
// Directory layout (read-only inputs):
//   themes/<themeId>/theme.json   theme metadata
//   themes/<themeId>/prompt.md    verbatim prompt text (Chinese)
//   themes/<themeId>/runs/<runId>/run.json
//   themes/<themeId>/runs/<runId>/dist/index.html ...
//   themes/<themeId>/runs/<runId>/thumb.webp / thumb-mobile.webp / NOTES.md
//
// Themes dir resolution: GALLERY3D_THEMES_DIR env var, else <site>/../themes.
// Malformed entries are skipped defensively — a bad run/theme must never
// break the build.

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

// NOTE: do not anchor on import.meta.url here — data.ts is bundled by vite
// during `astro build` and the resulting URL no longer points at src/.
// Astro/pnpm always invoke dev/build with cwd = site/, so cwd is the root.
export const SITE_ROOT = process.cwd();

export const THEMES_DIR = process.env.GALLERY3D_THEMES_DIR
  ? resolve(process.env.GALLERY3D_THEMES_DIR)
  : resolve(SITE_ROOT, '../themes');

/** Base path (always ends with '/'); join with a leading-free path. */
export const BASE: string = import.meta.env.BASE_URL ?? '/';
export const baseUrl = (p = ''): string => BASE + p.replace(/^\/+/, '');

/** URL of a synced run directory, e.g. `${BASE}works/watch-movement/r1/` */
export const workUrl = (themeId: string, runId: string): string =>
  baseUrl(`works/${themeId}/${runId}/`);

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
  effort: string;
  modelArg?: string;
  harnessVersion?: string;
  manual: boolean;
  promptSha256?: string;
  /** 评级：等级 id 与同等级内名次（0 起）；未评级为 undefined */
  tierId?: string;
  rank?: number;
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

export interface Tier {
  id: string;
  label: string;
  color: string;
}

/** themes/<id>/ratings.json — rows 的数组顺序就是同等级内的名次 */
export interface Ratings {
  tiers: Tier[];
  rows: Record<string, string[]>;
}

export interface Theme {
  /** filesystem directory name — canonical id used in URLs */
  id: string;
  meta: ThemeMeta;
  prompt: string;
  runs: Run[];
  ratings: Ratings;
}

/** 默认等级表（无 ratings.json 时使用），meme 式自上而下 */
export const DEFAULT_TIERS: Tier[] = [
  { id: 'agi', label: 'AGI', color: '#e4554f' },
  { id: 's-plus', label: 'S+', color: '#f0a03c' },
  { id: 's', label: 'S', color: '#efe04b' },
  { id: 'a', label: 'A', color: '#f3ead3' },
  { id: 'b', label: 'B', color: '#e4e0d4' },
  { id: 'c', label: 'C', color: '#d9dde3' },
];

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

const readRun = (themeId: string, runDir: string, dirName: string): Run | null => {
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
  return {
    id: dirName,
    runId: str(j.runId) ?? dirName,
    themeId,
    harness,
    model,
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

const readRatings = (themeDir: string): Ratings => {
  const j = readJson(join(themeDir, 'ratings.json'));
  const tiers: Tier[] = [];
  if (isObj(j) && Array.isArray(j.tiers)) {
    for (const t of j.tiers) {
      if (!isObj(t)) continue;
      const id = str(t.id);
      const label = str(t.label);
      if (id && label) tiers.push({ id, label, color: str(t.color) ?? '#d9dde3' });
    }
  }
  const rows: Record<string, string[]> = {};
  if (isObj(j) && isObj(j.rows)) {
    for (const [k, v] of Object.entries(j.rows)) rows[k] = strArr(v);
  }
  return { tiers: tiers.length ? tiers : DEFAULT_TIERS, rows };
};

const readTheme = (dirName: string): Theme | null => {
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
  const ratings = readRatings(themeDir);
  const runsDir = join(themeDir, 'runs');
  const runs: Run[] = [];
  if (existsSync(runsDir)) {
    for (const runId of readdirSync(runsDir)) {
      const rd = join(runsDir, runId);
      try {
        if (!statSync(rd).isDirectory()) continue;
        const run = readRun(dirName, rd, runId);
        if (run) runs.push(run);
      } catch {
        /* skip malformed run */
      }
    }
  }
  // 标注等级/名次；丢弃指向不存在 run 的脏数据
  const validIds = new Set(runs.map((r) => r.id));
  for (const [tierId, ids] of Object.entries(ratings.rows)) {
    const clean = ids.filter((id) => validIds.has(id));
    if (clean.length !== ids.length) ratings.rows[tierId] = clean;
    clean.forEach((id, i) => {
      const r = runs.find((x) => x.id === id);
      if (r) { r.tierId = tierId; r.rank = i; }
    });
  }
  // 已评级在前，按等级顺序+行内名次；未评级按完成时间排在后
  const tierOrder = new Map(ratings.tiers.map((t, i) => [t.id, i]));
  runs.sort((a, b) => {
    const ta = a.tierId !== undefined ? (tierOrder.get(a.tierId) ?? 999) : 999;
    const tb = b.tierId !== undefined ? (tierOrder.get(b.tierId) ?? 999) : 999;
    if (ta !== tb) return ta - tb;
    if (a.tierId !== undefined && b.tierId !== undefined) return (a.rank ?? 0) - (b.rank ?? 0);
    return runSortKey(a).localeCompare(runSortKey(b)) || a.id.localeCompare(b.id);
  });
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
    runs,
    ratings,
  };
};

/** Scan the themes dir once; safe on missing dir/malformed entries. */
export const loadThemes = (): Theme[] => {
  if (!existsSync(THEMES_DIR)) return [];
  const out: Theme[] = [];
  for (const dirName of readdirSync(THEMES_DIR)) {
    try {
      if (!statSync(join(THEMES_DIR, dirName)).isDirectory()) continue;
      const t = readTheme(dirName);
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

/** Distinct facet values preserving a sensible order for filter rows. */
export const facetValues = (runs: Run[], key: 'harness' | 'model' | 'effort'): string[] => {
  const seen = new Map<string, number>();
  for (const r of runs) seen.set(r[key], (seen.get(r[key]) ?? 0) + 1);
  const effortOrder = ['high', 'medium', 'low', 'minimal'];
  return [...seen.keys()].sort((a, b) =>
    key === 'effort'
      ? (effortOrder.indexOf(a) + 1 || 99) - (effortOrder.indexOf(b) + 1 || 99) ||
        a.localeCompare(b)
      : seen.get(b)! - seen.get(a)! || a.localeCompare(b),
  );
};
