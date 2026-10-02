import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, '..', 'dist');
const outDir = process.argv[2] || '/tmp/watch-shots';
fs.mkdirSync(outDir, { recursive: true });

const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const file = path.join(dist, p);
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
});

await new Promise((r) => server.listen(4173, r));

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: [
    '--no-sandbox',
    '--enable-webgl',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--ignore-gpu-blocklist',
    '--hide-scrollbars',
  ],
});

const viewports = [
  { name: 'desktop', w: 1440, h: 900 },
  { name: 'half', w: 800, h: 900 },
  { name: 'phone', w: 390, h: 844 },
];

const errors = [];
for (const v of viewports) {
  const page = await browser.newPage();
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`[${v.name}] ${m.text()}`);
  });
  page.on('pageerror', (e) => errors.push(`[${v.name}] ${e.message}`));
  await page.setViewport({ width: v.w, height: v.h, deviceScaleFactor: 1 });
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 3200));
  await page.screenshot({ path: path.join(outDir, `${v.name}.png`) });
  await page.close();
}

await browser.close();
server.close();
console.log('errors:', errors.length ? errors : 'none');
console.log('shots ->', outDir);
