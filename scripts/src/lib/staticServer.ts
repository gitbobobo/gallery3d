import { createReadStream, existsSync, realpathSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import type { Server } from 'node:http';
import { extname, join, normalize, resolve, sep } from 'node:path';

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.cjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.wasm': 'application/wasm',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.bin': 'application/octet-stream',
  '.hdr': 'application/octet-stream',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

export interface StaticServer {
  url: string;
  close: () => Promise<void>;
}

/** 简单静态服务器，绑 127.0.0.1 随机端口，防目录穿越和符号链接逃逸 */
export function serveDir(root: string): Promise<StaticServer> {
  const rootReal = realpathSync(resolve(root));
  const server: Server = createServer((req, res) => {
    try {
      const url = new URL(req.url ?? '/', 'http://127.0.0.1');
      let pathname = decodeURIComponent(url.pathname);
      if (pathname.endsWith('/')) pathname += 'index.html';
      const target = normalize(join(rootReal, pathname));
      if (!target.startsWith(rootReal + sep) && target !== rootReal) {
        res.writeHead(403); res.end('forbidden'); return;
      }
      const real = existsSync(target) ? realpathSync(target) : target;
      if (!real.startsWith(rootReal)) { res.writeHead(403); res.end('forbidden'); return; }
      if (!existsSync(real) || !statSync(real).isFile()) {
        res.writeHead(404); res.end('not found'); return;
      }
      res.writeHead(200, { 'content-type': MIME[extname(real).toLowerCase()] ?? 'application/octet-stream' });
      createReadStream(real).pipe(res);
    } catch {
      res.writeHead(500); res.end('error');
    }
  });
  return new Promise((resolvePromise, rejectPromise) => {
    server.once('error', rejectPromise);
    server.listen(0, '127.0.0.1', () => {
      const addr = server.address();
      const port = typeof addr === 'object' && addr ? addr.port : 0;
      resolvePromise({
        url: `http://127.0.0.1:${port}`,
        close: () => new Promise((r) => server.close(() => r())),
      });
    });
  });
}
