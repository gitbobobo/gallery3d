import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, '..', 'dist');
const outDir = '/tmp/watch-mesh';
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
await new Promise((r) => server.listen(4175, r));

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox', '--enable-webgl', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--hide-scrollbars'],
});
const page = await browser.newPage();
page.on('pageerror', (e) => console.log('PAGEERROR', e.message));
await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 1 });
await page.goto('http://localhost:4175/', { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 2200));

const pairs = [
  ['barrel', 'centerWheel'],
  ['centerWheel', 'thirdWheel'],
  ['thirdWheel', 'fourthWheel'],
  ['fourthWheel', 'escapeWheel'],
];

for (const [a, b] of pairs) {
  await page.evaluate(
    ([a, b]) => {
      const w = window.__watch;
      w.controls.autoRotate = false;
      const THREE = w.THREE;
      const ga = w.movement.parts.get(a).group;
      const gb = w.movement.parts.get(b).group;
      const A = ga.getWorldPosition(new THREE.Vector3());
      const B = gb.getWorldPosition(new THREE.Vector3());

      // hide every mesh except the two that actually mesh (driver wheel + driven pinion)
      w.scene.traverse((o) => {
        if (o.isMesh) o.visible = true;
      });
      const keep = new Set();
      // driver wheel = highest z mesh in group a; driven pinion = lowest z mesh in group b
      const sortZ = (g) =>
        g.children.filter((c) => c.isMesh).sort((m, n) => m.position.z - n.position.z);
      const aWheel = sortZ(ga).slice(-1)[0];
      const bPinion = sortZ(gb).slice(0)[0];
      keep.add(aWheel);
      keep.add(bPinion);
      w.scene.traverse((o) => {
        if (o.isMesh && !keep.has(o)) o.visible = false;
      });

      // contact point on the line of centres, one driver pitch-radius out
      const dir = B.clone().sub(A).normalize();
      const mid = A.clone().addScaledVector(dir, A.distanceTo(B) * 0.45);
      const target = mid;
      const off = new THREE.Vector3(1.2, 1.6, 3.4);
      w.camera.position.copy(target).add(off);
      w.controls.target.copy(target);
      w.controls.update();
    },
    [a, b]
  );
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(outDir, `${a}-${b}.png`) });
}

await browser.close();
server.close();
console.log('done', outDir);
