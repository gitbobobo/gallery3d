import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, '..', 'dist');
const outDir = '/tmp/watch-motion';
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
await new Promise((r) => server.listen(4177, r));
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox', '--enable-webgl', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--hide-scrollbars'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1000, height: 800, deviceScaleFactor: 1 });
await page.goto('http://localhost:4177/', { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 2200));

await page.evaluate(() => {
  const w = window.__watch;
  w.controls.autoRotate = false;
  const THREE = w.THREE;
  const g = w.movement.parts.get('escapeWheel').group;
  const t = g.getWorldPosition(new THREE.Vector3());
  w.camera.position.copy(t).add(new THREE.Vector3(3.5, 4.5, 8));
  w.controls.target.copy(t);
  w.controls.update();
});

// sample actual part angles over time to prove motion + gearing
const samples = [];
for (let i = 0; i < 6; i++) {
  const s = await page.evaluate(() => {
    const w = window.__watch;
    const g = (id) => w.movement.parts.get(id).group;
    const cz = (id) => {
      const grp = g(id);
      const meshes = [];
      grp.traverse((o) => o.isMesh && meshes.push(o.rotation.z));
      return meshes;
    };
    return {
      t: w.movement ? performance.now() : 0,
      balance: g('balanceWheel').rotation.z,
      pallet: g('palletFork').rotation.z,
      escape: g('escapeWheel').children.map((c) => c.rotation.z),
      fourth: g('fourthWheel').children.map((c) => c.rotation.z),
      center: g('centerWheel').children.map((c) => c.rotation.z),
    };
  });
  samples.push(s);
  await page.screenshot({ path: path.join(outDir, `f${i}.png`) });
  await new Promise((r) => setTimeout(r, 180));
}
console.log('balance:', samples.map((s) => s.balance.toFixed(3)).join(' '));
console.log('pallet :', samples.map((s) => s.pallet.toFixed(3)).join(' '));
console.log('escape0:', samples.map((s) => s.escape[0].toFixed(3)).join(' '));
console.log('fourth0:', samples.map((s) => s.fourth[0].toFixed(3)).join(' '));
console.log('center0:', samples.map((s) => s.center[0].toFixed(3)).join(' '));
await browser.close();
server.close();
