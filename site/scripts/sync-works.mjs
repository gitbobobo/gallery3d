#!/usr/bin/env node
// sync-works.mjs — mirror run artifacts into site/public/works/
//
// Source layout (themes dir):
//   themes/<themeId>/runs/<runId>/dist/**            built page, served verbatim
//   themes/<themeId>/runs/<runId>/thumb.webp         1440x900 desktop cover
//   themes/<themeId>/runs/<runId>/thumb-mobile.webp  390x844 mobile cover
//   themes/<themeId>/reference/**                     optional reference images
//
// Output layout (served at `${BASE_URL}works/<themeId>/<runId>/`):
//   public/works/<themeId>/<runId>/**          <- contents of dist/ (verbatim)
//   public/works/<themeId>/<runId>/cover.<ext>        <- thumb.webp|png, renamed
//   public/works/<themeId>/<runId>/cover-mobile.<ext> <- thumb-mobile.webp|png
//   public/works/<themeId>/reference/**        <- reference/ (runIds always
//   contain `__`, so this never collides with a run dir)
//   to avoid collisions with files inside dist/. (.png is tolerated because the
//   importer may emit png instead of webp.)
//
// The themes directory defaults to <repo>/themes (i.e. site/../themes) and can
// be overridden with the GALLERY3D_THEMES_DIR env var (used for fixtures/tests).
// The whole public/works tree is rebuilt from scratch each run, so deleted
// source runs disappear from the site.

import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const themesDir = process.env.GALLERY3D_THEMES_DIR
  ? resolve(process.env.GALLERY3D_THEMES_DIR)
  : resolve(siteRoot, '../themes');
const outRoot = join(siteRoot, 'public', 'works');

if (!existsSync(themesDir)) {
  console.log(`[sync-works] themes dir not found: ${themesDir} — nothing to sync`);
  rmSync(outRoot, { recursive: true, force: true });
  process.exit(0);
}

rmSync(outRoot, { recursive: true, force: true });
mkdirSync(outRoot, { recursive: true });

let themeCount = 0;
let runCount = 0;

for (const themeId of readdirSync(themesDir)) {
  const themeDir = join(themesDir, themeId);
  if (!statSync(themeDir).isDirectory() || !existsSync(join(themeDir, 'theme.json'))) continue;
  themeCount++;
  const refDir = join(themeDir, 'reference');
  if (existsSync(refDir)) cpSync(refDir, join(outRoot, themeId, 'reference'), { recursive: true });
  const runsDir = join(themeDir, 'runs');
  if (!existsSync(runsDir)) continue;
  for (const runId of readdirSync(runsDir)) {
    const runDir = join(runsDir, runId);
    if (!statSync(runDir).isDirectory()) continue;
    const dest = join(outRoot, themeId, runId);
    const dist = join(runDir, 'dist');
    let copied = false;
    if (existsSync(dist)) {
      cpSync(dist, dest, { recursive: true });
      copied = true;
    }
    for (const [src, dst] of [
      ['thumb.webp', 'cover.webp'],
      ['thumb.png', 'cover.png'],
      ['thumb-mobile.webp', 'cover-mobile.webp'],
      ['thumb-mobile.png', 'cover-mobile.png'],
    ]) {
      const p = join(runDir, src);
      if (existsSync(p)) {
        mkdirSync(dest, { recursive: true });
        cpSync(p, join(dest, dst));
        copied = true;
      }
    }
    if (copied) runCount++;
  }
}

console.log(`[sync-works] ${themesDir} -> public/works : ${runCount} run(s) across ${themeCount} theme(s)`);
