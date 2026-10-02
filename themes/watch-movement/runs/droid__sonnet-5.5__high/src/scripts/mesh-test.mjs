import { gearOutline, meshInterference } from '../src/gearMath.js';
import { SPEC, PHASE, POS } from '../src/layout.js';
const pairs = [
  ['ePinion','fWheel','E','F'],
  ['fPinion','tWheel','F','T'],
  ['tPinion','cWheel','T','C'],
  ['cPinion','barrel','C','B'],
];
const opt = JSON.parse(process.argv[2] || '{}');
for (const [a,b,ka,kb] of pairs) {
  const A = { ...gearOutline(SPEC[a].z, SPEC[a].m, { ...SPEC[a], ...opt }), z: SPEC[a].z };
  const B = { ...gearOutline(SPEC[b].z, SPEC[b].m, { ...SPEC[b], ...opt }), z: SPEC[b].z };
  const phi = Math.atan2(POS[kb].y-POS[ka].y, POS[kb].x-POS[ka].x);
  const d = Math.hypot(POS[kb].x-POS[ka].x, POS[kb].y-POS[ka].y);
  const hits = meshInterference(A,B,phi,PHASE[ka],PHASE[kb],SPEC[a].z/SPEC[b].z, 240, 2);
  console.log(a,b,'centre dist',d.toFixed(3),'expected',(A.rp+B.rp).toFixed(3),'interference vertices',hits);
}
