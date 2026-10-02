import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, '..', 'dist');
const outDir = process.argv[2] || '/tmp/watch-close';
fs.mkdirSync(outDir, { recursive: true });

const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  fs.readFile(path.join(dist, p), (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end();
      return;
    }
    res.writeHead(200, { 'Content-Type': types[path.extname(p)] || 'application/octet-stream' });
    res.end(data);
  });
});
await new Promise((r) => server.listen(4174, r));

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox', '--enable-webgl', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--hide-scrollbars'],
});
const page = await browser.newPage();
page.on('pageerror', (e) => console.log('PAGEERROR', e.message));
await page.setViewport({ width: 1300, height: 1000, deviceScaleFactor: 1 });
await page.goto('http://localhost:4174/', { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 2500));

const targets = process.argv[3]
  ? process.argv[3].split(',')
  : ['barrel', 'centerWheel', 'thirdWheel', 'fourthWheel', 'escapeWheel', 'palletFork', 'balanceWheel', 'top'];

for (const id of targets) {
  await page.evaluate((id) => {
    const w = window.__watch;
    w.controls.autoRotate = false;
    const THREE = w.THREE;
    let target;
    let dist;
    if (id === 'top') {
      target = w.movement.focus.clone();
      dist = w.movement.radius * 2.4;
      w.camera.position.copy(target).add(new THREE.Vector3(0.001, 0.001, dist));
    } else if (id.startsWith('pair:')) {
      const [, a, b] = id.split(':');
      const pa = w.movement.parts.get(a).group.getWorldPosition(new THREE.Vector3());
      const pb = w.movement.parts.get(b).group.getWorldPosition(new THREE.Vector3());
      target = pa.clone().lerp(pb, 0.5);
      w.camera.position.copy(target).add(new THREE.Vector3(0.001, 0.001, 5.5));
    } else {
      const g = w.movement.parts.get(id).group;
      target = g.getWorldPosition(new THREE.Vector3());
      dist = id === 'barrel' ? 13 : 7;
      const R = w.movement.radius;
      w.camera.position.copy(target).add(new THREE.Vector3(R * 0.28, R * 0.3, R * 0.62));
    }
    w.controls.target.copy(target);
    w.controls.update();
  }, id);
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outDir, `${id}.png`) });
}

await browser.close();
server.close();
console.log('done ->', outDir);
