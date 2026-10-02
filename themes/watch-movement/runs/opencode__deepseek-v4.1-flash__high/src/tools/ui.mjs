import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, '..', 'dist');
const outDir = '/tmp/watch-ui';
fs.mkdirSync(outDir, { recursive: true });

const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };
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
await new Promise((r) => server.listen(4176, r));

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox', '--enable-webgl', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--hide-scrollbars'],
});

const page = await browser.newPage();
page.on('pageerror', (e) => console.log('PAGEERROR', e.message));
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto('http://localhost:4176/', { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 2600));

// project the balance wheel centre to screen space and click it
const pt = await page.evaluate(() => {
  const w = window.__watch;
  w.controls.autoRotate = false;
  const v = w.movement.parts.get('balanceWheel').group.getWorldPosition(w.THREE ? new w.THREE.Vector3() : {});
  return { x: v.x, y: v.y, z: v.z };
});
const screen = await page.evaluate((p) => {
  const w = window.__watch;
  const v = new w.THREE.Vector3(p.x, p.y, p.z);
  v.project(w.camera);
  return { x: ((v.x + 1) / 2) * window.innerWidth, y: ((1 - v.y) / 2) * window.innerHeight };
}, pt);

await page.mouse.click(screen.x, screen.y);
await new Promise((r) => setTimeout(r, 400));
const state1 = await page.evaluate(() => ({
  visible: !document.getElementById('panel').classList.contains('hidden'),
  name: document.getElementById('panel-name').textContent,
  active: document.querySelectorAll('.legend-item.active').length,
}));
await page.screenshot({ path: path.join(outDir, 'clicked.png') });

// click empty space to dismiss
await page.mouse.click(60, 700);
await new Promise((r) => setTimeout(r, 400));
const state2 = await page.evaluate(() => ({
  visible: !document.getElementById('panel').classList.contains('hidden'),
}));

console.log('after click:', state1);
console.log('after empty click panel visible:', state2.visible);

// drag to orbit
const before = await page.evaluate(() => window.__watch.camera.position.toArray());
await page.mouse.move(720, 450);
await page.mouse.down();
await page.mouse.move(980, 560, { steps: 12 });
await page.mouse.up();
await new Promise((r) => setTimeout(r, 300));
const after = await page.evaluate(() => window.__watch.camera.position.toArray());
await page.screenshot({ path: path.join(outDir, 'dragged.png') });

// wheel zoom
await page.mouse.move(720, 450);
await page.mouse.wheel({ deltaY: -400 });
await new Promise((r) => setTimeout(r, 300));
const zoomed = await page.evaluate(() => window.__watch.camera.position.toArray());
await page.screenshot({ path: path.join(outDir, 'zoomed.png') });

const d = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
console.log('orbit moved:', d(before, after).toFixed(2), 'zoom moved:', d(after, zoomed).toFixed(2));

await page.evaluate(() => window.__watch.select('fourthWheel'));
await new Promise((r) => setTimeout(r, 500));
await page.screenshot({ path: path.join(outDir, 'selected-fourth.png') });

const phone = await browser.newPage();
phone.on('pageerror', (e) => console.log('PHONE ERROR', e.message));
await phone.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await phone.goto('http://localhost:4176/', { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 2500));
await phone.evaluate(() => window.__watch.select('escapeWheel'));
await new Promise((r) => setTimeout(r, 500));
await phone.screenshot({ path: path.join(outDir, 'phone-panel.png') });

await browser.close();
server.close();
