import { defineConfig } from 'astro/config';
import { existsSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

// BASE_URL controls the base path when the site is deployed under a
// sub-path (e.g. GitHub Pages). Defaults to '/'.
const BASE = process.env.BASE_URL ?? '/';
const themesDir = process.env.GALLERY3D_THEMES_DIR
  ? resolve(process.env.GALLERY3D_THEMES_DIR)
  : resolve(process.cwd(), '../themes');

/** dev-only API: POST /__api/rate  {theme, tiers, rows} → 写 themes/<id>/ratings.json */
const rateApi = {
  name: 'gallery3d-rate-api',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (!req.url || !req.url.includes('__api/rate')) return next();
      if (req.method !== 'POST') {
        res.statusCode = 405;
        return res.end('{"ok":false}');
      }
      let body = '';
      req.on('data', (c) => (body += c));
      req.on('end', () => {
        try {
          const { theme, tiers, rows } = JSON.parse(body);
          if (typeof theme !== 'string' || /[^\w.-]/.test(theme)) throw new Error('bad theme');
          const dir = join(themesDir, theme);
          if (!existsSync(join(dir, 'theme.json'))) throw new Error('no theme');
          // 只允许登记真实存在的 runId
          const runsDir = join(dir, 'runs');
          const valid = new Set(
            existsSync(runsDir)
              ? readdirSync(runsDir).filter((d) => statSync(join(runsDir, d)).isDirectory())
              : [],
          );
          const cleanRows = {};
          for (const [k, v] of Object.entries(rows ?? {})) {
            cleanRows[k] = Array.isArray(v) ? v.filter((id) => valid.has(id)) : [];
          }
          const cleanTiers = Array.isArray(tiers)
            ? tiers
                .filter((t) => t && typeof t.id === 'string' && typeof t.label === 'string')
                .map((t) => ({ id: t.id, label: t.label, color: String(t.color ?? '#d9dde3') }))
            : [];
          writeFileSync(
            join(dir, 'ratings.json'),
            JSON.stringify({ tiers: cleanTiers, rows: cleanRows }, null, 2) + '\n',
          );
          res.setHeader('content-type', 'application/json');
          res.end('{"ok":true}');
        } catch {
          res.statusCode = 400;
          res.end('{"ok":false}');
        }
      });
    });
  },
};

export default defineConfig({
  output: 'static',
  base: BASE,
  trailingSlash: 'ignore',
  vite: {
    plugins: [rateApi],
    server: {
      // allow reading ../scripts (agents-md template) and ../themes in dev
      fs: { allow: ['..', '../..'] },
    },
  },
});
