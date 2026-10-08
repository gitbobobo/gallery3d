import { defineConfig } from 'astro/config';
import { existsSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { normalizeRatings } from './src/ratings.ts';

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
          // 与读路径同一份清洗：只允许真实存在的 runId，全局去重，
          // 未知等级 key 丢弃（其中 runId 回到未评级池）
          const runsDir = join(dir, 'runs');
          const valid = new Set(
            existsSync(runsDir)
              ? readdirSync(runsDir).filter((d) => statSync(join(runsDir, d)).isDirectory())
              : [],
          );
          const clean = normalizeRatings({ tiers, rows }, valid);
          writeFileSync(
            join(dir, 'ratings.json'),
            JSON.stringify(clean, null, 2) + '\n',
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
