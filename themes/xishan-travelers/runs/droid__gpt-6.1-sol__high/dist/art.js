import { clamp, smooth } from './story.js';

const W = 1000, H = 2000;
const INK = [42, 46, 37];
const SILK = [189, 170, 132];
let seed = 781923;
function random() {
  seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5;
  return (seed >>> 0) / 4294967296;
}
function rnd(a = 1, b) { return b === undefined ? random() * a : a + random() * (b - a); }
function rgba(color, alpha = 1) { return `rgba(${color.join(',')},${alpha})`; }
function canvas() {
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  return { canvas: c, ctx: c.getContext('2d') };
}
function path(ctx, points, close = false) {
  ctx.beginPath(); ctx.moveTo(...points[0]);
  points.slice(1).forEach(p => ctx.lineTo(...p));
  if (close) ctx.closePath();
}
function softLine(ctx, points, width = 1, alpha = .5, color = INK) {
  ctx.strokeStyle = rgba(color, alpha);
  ctx.lineWidth = width; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  path(ctx, points); ctx.stroke();
}
function ragged(points, amount = 2.5, step = 7) {
  const out = [];
  for (let i = 0; i < points.length - 1; i++) {
    const [x, y] = points[i], [nx, ny] = points[i + 1];
    const count = Math.max(1, Math.ceil(Math.hypot(nx - x, ny - y) / step));
    for (let j = 0; j < count; j++) {
      const p = j / count;
      const wave = Math.sin(p * Math.PI);
      out.push([x + (nx - x) * p + rnd(-amount, amount) * wave, y + (ny - y) * p + rnd(-amount, amount) * wave]);
    }
  }
  out.push(points.at(-1));
  return out;
}
function bounds(points) {
  const xs = points.map(p => p[0]), ys = points.map(p => p[1]);
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
}

// A wash follows the rock rather than using a flat graphic fill. All texture
// marks are seeded and painted once; only the story layers redraw each frame.
function rock(ctx, original, { shade = .36, strokes = 2800, direction = 0, edge = 1.8, moss = true } = {}) {
  const points = ragged([...original, original[0]], 3.8, 8);
  const [left, top, right, bottom] = bounds(original);
  const width = right - left, height = bottom - top;
  ctx.save();
  path(ctx, points, true); ctx.clip();
  const wash = ctx.createLinearGradient(left, top, right, bottom);
  wash.addColorStop(0, rgba([80, 81, 65], shade + .15));
  wash.addColorStop(.3, rgba([106, 104, 79], shade));
  wash.addColorStop(.6, rgba([116, 111, 82], shade * .55));
  wash.addColorStop(1, rgba([49, 53, 43], shade + .12));
  ctx.fillStyle = wash; ctx.fillRect(left - 5, top - 5, width + 10, height + 10);
  // Uneven wet ink pools, left translucent to show the silk underneath.
  for (let i = 0; i < 30; i++) {
    const x = rnd(left, right), y = rnd(top, bottom);
    const r = rnd(20, Math.min(width, height) * .45 + 20);
    const pool = ctx.createRadialGradient(x, y, 0, x, y, r);
    pool.addColorStop(0, rgba(INK, rnd(.03, .2)));
    pool.addColorStop(1, rgba(INK, 0));
    ctx.fillStyle = pool; ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  // Rain-dot texture, short split hairs and long dry vertical strokes.
  for (let i = 0; i < strokes; i++) {
    const x = rnd(left, right), y = rnd(top, bottom);
    const isLong = random() < .16;
    const length = isLong ? rnd(17, 58) : rnd(2.2, 13);
    const tilt = direction + Math.sin(x * .011 + y * .007) * .23;
    const alpha = rnd(.07, .4) * (isLong ? .75 : 1);
    const dx = Math.sin(tilt) * length;
    softLine(ctx, [[x, y], [x + dx * .5 + rnd(-1.5, 1.5), y + length * .48], [x + dx, y + length]], rnd(.6, 2.1), alpha);
    if (random() < .07) {
      softLine(ctx, [[x - 1, y], [x + dx * .3, y + 4]], rnd(2.1, 4), alpha * 1.2);
    }
    if (random() < .3) softLine(ctx, [[x + 1.9, y], [x + dx + 2.5, y + length * .8]], .6, alpha * .35);
    if (random() < .15) softLine(ctx, [[x - 1, y], [x + dx - 2, y + length * 1.3]], .8, rnd(.08, .22), SILK);
  }
  for (let i = 0; i < strokes / 2; i++) {
    const x = rnd(left, right), y = rnd(top, bottom);
    ctx.fillStyle = rgba(INK, rnd(.04, .23));
    ctx.fillRect(x, y, rnd(.8, 2.7), rnd(.8, 2.4));
  }
  // Broken strata: wandering lines with little branches, not regular hatching.
  for (let i = 0; i < Math.max(7, width / 26); i++) {
    let x = rnd(left, right), y = rnd(top, bottom);
    const track = [[x, y]];
    const n = rnd(5, 16);
    for (let j = 0; j < n; j++) {
      x += direction * rnd(6, 18) + rnd(-9, 9);
      y += rnd(9, 22);
      track.push([x, y]);
    }
    softLine(ctx, ragged(track, 1.3, 7), rnd(.8, 2.3), rnd(.13, .4));
    softLine(ctx, track.map(([a, b]) => [a - 2.3, b]), .7, .25, SILK);
  }
  ctx.restore();
  softLine(ctx, points, edge, .54);
  softLine(ctx, points.map(([x, y]) => [x + .8, y]), edge * .35, .3);
  if (moss) {
    for (let i = 0; i < 100; i++) {
      const idx = Math.floor(rnd(points.length * .65));
      const [x, y] = points[idx];
      ctx.fillStyle = rgba(INK, rnd(.15, .48));
      ctx.beginPath(); ctx.ellipse(x + rnd(-5, 5), y + rnd(-5, 5), rnd(1, 3.1), rnd(.5, 2), rnd(6), 0, Math.PI * 2); ctx.fill();
    }
  }
}

function silk(ctx) {
  ctx.fillStyle = '#bdaa83'; ctx.fillRect(0, 0, W, H);
  const background = ctx.createLinearGradient(0, 0, W, H);
  background.addColorStop(0, '#b6a17b'); background.addColorStop(.38, '#c4b08a');
  background.addColorStop(.68, '#c2ad85'); background.addColorStop(1, '#ad9873');
  ctx.fillStyle = background; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 110; i++) {
    const x = rnd(W), y = rnd(H), r = rnd(30, 200);
    const stain = ctx.createRadialGradient(x, y, 0, x, y, r);
    stain.addColorStop(0, `rgba(90,68,41,${rnd(.01, .045)})`); stain.addColorStop(1, 'rgba(90,68,41,0)');
    ctx.fillStyle = stain; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
  }
  for (let i = 0; i < 1150; i++) {
    const x = rnd(W);
    softLine(ctx, [[x, 0], [x + rnd(-1, 1), H]], rnd(.3, .7), rnd(.018, .045), [59, 53, 39]);
  }
  for (let y = 0; y < H; y += 2.5) softLine(ctx, [[0, y], [W, y + rnd(-.5, .5)]], .5, rnd(.015, .045), [75, 60, 41]);
}

function leafCloud(ctx, x, y, rx, ry, density = 220, shade = 1) {
  const wash = ctx.createRadialGradient(x, y, 1, x, y, rx);
  wash.addColorStop(0, rgba([39, 47, 36], .12 * shade));
  wash.addColorStop(.65, rgba([39, 47, 36], .08 * shade)); wash.addColorStop(1, rgba(INK, 0));
  ctx.save(); ctx.translate(x, y); ctx.scale(1, ry / rx);
  ctx.fillStyle = wash; ctx.fillRect(-rx, -rx, rx * 2, rx * 2); ctx.restore();
  for (let i = 0; i < density; i++) {
    const theta = rnd(Math.PI * 2), radius = Math.sqrt(random());
    const lx = x + Math.cos(theta) * rx * radius, ly = y + Math.sin(theta) * ry * radius;
    ctx.strokeStyle = rgba(INK, rnd(.22, .61) * shade);
    ctx.lineWidth = rnd(.55, 1.2);
    ctx.beginPath();
    if (random() < .5) {
      ctx.ellipse(lx, ly, rnd(1, 2.5), rnd(1.2, 3), rnd(3), 0, Math.PI * 2); ctx.stroke();
    } else {
      ctx.moveTo(lx - 2, ly + 1); ctx.lineTo(lx, ly - 2.1); ctx.lineTo(lx + 2.5, ly + .5); ctx.stroke();
    }
    if (random() < .27) {
      ctx.fillStyle = rgba(INK, rnd(.17, .6) * shade);
      ctx.fillRect(lx, ly, rnd(1.2, 3), rnd(.8, 2));
    }
  }
}

function tree(ctx, x, y, size = 1, variety = 'leaf') {
  ctx.save(); ctx.translate(x, y); ctx.scale(size, size);
  const lean = rnd(-12, 12);
  // Outlined pale trunks and fine diverging branches.
  const trunk = [[0, 0], [-4, -22], [lean - 2, -51], [lean + 2, -82], [lean, -116]];
  softLine(ctx, trunk, 8.5, .75);
  softLine(ctx, trunk.map(([a, b]) => [a + 1.2, b]), 4.3, .82, SILK);
  softLine(ctx, [[-8, 2], [-1, -8], [9, 0]], 2.3, .6);
  for (let j = 0; j < 7; j++) {
    const yy = -30 - j * rnd(9, 14);
    const xx = lean * (-yy / 116);
    const side = j % 2 === 0 ? -1 : 1;
    const endx = xx + side * rnd(19, 45), endy = yy - rnd(15, 31);
    const branch = [[xx, yy], [xx + side * 12, yy - 5], [endx, endy]];
    softLine(ctx, branch, 3.1 - j * .23, .7);
    softLine(ctx, branch.map(([a, b]) => [a, b + 1]), 1.1, .55, SILK);
    for (let k = 0; k < 3; k++) {
      const bx = endx + rnd(-16, 16), by = endy - rnd(2, 19);
      softLine(ctx, [[endx, endy], [bx, by]], .8, .58);
      if (variety === 'leaf') leafCloud(ctx, bx, by - 4, rnd(13, 24), rnd(10, 21), 110);
    }
    if (variety === 'pine') {
      for (let k = 0; k < 29; k++) {
        const p = k / 29, bx = xx + (endx - xx) * p, by = yy + (endy - yy) * p;
        softLine(ctx, [[bx - 7, by - rnd(1, 4)], [bx, by], [bx + 5, by - rnd(1, 5)]], .8, rnd(.3, .75));
      }
    }
  }
  if (variety === 'leaf') leafCloud(ctx, lean, -124, 26, 20, 200);
  else {
    for (let i = 0; i < 16; i++) {
      const yy = -117 + i * 4, width = 2 + i * 1.6;
      softLine(ctx, [[lean - width, yy + 3], [lean, yy - 2], [lean + width, yy + 4]], .9, .55);
    }
  }
  ctx.restore();
}

function ridgeTrees(ctx, points, count, size = 13, shade = 1) {
  for (let i = 0; i < count; i++) {
    const p = i / (count - 1) * (points.length - 1);
    const j = Math.min(Math.floor(p), points.length - 2), f = p - j;
    const x = points[j][0] * (1 - f) + points[j + 1][0] * f + rnd(-5, 5);
    const y = points[j][1] * (1 - f) + points[j + 1][1] * f + rnd(-11, 14);
    const cluster = .6 + .7 * Math.sin(p * 6.1) ** 2;
    if (Math.sin(p * 5.3 + 1) > .78 && random() < .63) continue;
    leafCloud(ctx, x, y - rnd(0, size * .5), rnd(size * .55, size * 1.5) * cluster, rnd(size * .5, size * 1.5), 150, shade);
    softLine(ctx, [[x, y + size], [x + rnd(-3, 3), y - size * .4]], .7, .4 * shade);
    if (random() < .17) {
      const h = rnd(size, size * 2.6);
      softLine(ctx, [[x, y], [x - 1, y - h]], .85, .65 * shade);
      for (let k = 0; k < 5; k++) {
        const yy = y - h + k * h / 5, spread = 2 + k * 1.7;
        softLine(ctx, [[x - spread, yy + 3], [x - 1, yy], [x + spread, yy + 2]], .8, .6 * shade);
      }
    }
  }
}

function brushFold(ctx, spine, width, alpha = .26) {
  const shadow = [...spine, ...spine.slice().reverse().map(([x,y],i) => [x - width * (.5 + .5 * Math.sin(i * 1.7) ** 2), y + 7])];
  path(ctx, ragged(shadow,2,7),true);
  ctx.fillStyle=rgba(INK,alpha);ctx.fill();
  softLine(ctx,ragged(spine,2.1,6),rnd(1.8,3.1),.58);
  softLine(ctx,spine.map(([x,y])=>[x+3,y]),1.4,.29,SILK);
  for(let i=0;i<spine.length-1;i++){
    const [x,y]=spine[i],[nx,ny]=spine[i+1];
    for(let j=0;j<7;j++){
      const p=j/7, px=x+(nx-x)*p,py=y+(ny-y)*p;
      const offset=rnd(4,width);
      softLine(ctx,[[px-offset,py],[px-offset+rnd(-2,3),py+rnd(5,18)]],rnd(.7,1.8),rnd(.12,.34));
    }
  }
}

function scrubPatch(ctx,x,y,rx,ry,count=1500,shade=1) {
  ctx.save();
  const outline=[],phase=rnd(6);
  const edge=a=>.81+Math.sin(a*3+phase)*.1+Math.sin(a*7+phase)*.09;
  for(let i=0;i<=32;i++){
    const a=i/32*Math.PI*2,r=edge(a)+rnd(-.04,.07);
    outline.push([x+Math.cos(a)*rx*r,y+Math.sin(a)*ry*r]);
  }
  path(ctx,outline,true);ctx.fillStyle=rgba([39,46,35],.12*shade);ctx.fill();
  for(let i=0;i<count;i++){
    const a=rnd(Math.PI*2),r=Math.sqrt(random())*edge(a);
    const px=x+Math.cos(a)*rx*r,py=y+Math.sin(a)*ry*r;
    const dark=.2+Math.sin(px*.05+py*.033)**2*.45;
    ctx.lineWidth=rnd(.7,1.6);ctx.strokeStyle=rgba(INK,dark*shade);
    ctx.beginPath();ctx.moveTo(px-2,py+1.5);ctx.lineTo(px,py-rnd(1,3));ctx.lineTo(px+rnd(1,3),py+1);ctx.stroke();
    if(random()<.2){ctx.fillStyle=rgba(INK,.4*shade);ctx.fillRect(px,py,2,3);}
  }
  ctx.restore();
}

function mountain(ctx) {
  const silhouette = [[89,1270],[111,945],[146,713],[165,524],[184,420],[171,310],[186,250],[233,219],[282,209],[319,237],[371,205],[392,148],[414,104],[458,82],[489,58],[536,58],[574,65],[609,98],[661,80],[697,72],[737,105],[761,153],[784,180],[799,234],[805,291],[855,267],[890,261],[935,286],[962,307],[1008,317],[1025,1320],[906,1380],[774,1362],[677,1329],[523,1379],[367,1350],[222,1410],[104,1350]];
  rock(ctx, silhouette, {shade:.35, strokes:22000, edge:2.2});
  // The central massif is a single immense, near-vertical plane.
  rock(ctx, [[424,127],[497,95],[551,113],[585,183],[597,294],[630,351],[613,447],[650,519],[637,652],[678,728],[656,812],[697,918],[702,1104],[679,1324],[481,1382],[300,1340],[278,1150],[308,934],[325,753],[354,649],[332,559],[371,477],[360,381],[407,296]], {shade:.2, strokes:14000, edge:1.1});
  const folds=[
    {w:36,a:.26,p:[[382,272],[356,332],[365,399],[330,452],[345,514],[316,586],[329,650],[294,702],[309,781],[283,842],[295,916],[276,1025],[294,1147],[284,1311]]},
    {w:23,a:.24,p:[[447,196],[430,242],[452,288],[432,341],[451,387],[426,448],[438,518],[420,591],[427,669],[407,738],[420,825],[401,926],[410,1063],[394,1192]]},
    {w:31,a:.28,p:[[559,144],[568,208],[555,263],[591,336],[576,379],[612,439],[604,504],[631,565],[619,631],[652,707],[640,781],[671,860],[659,926],[685,1030],[671,1181],[694,1270]]},
    {w:39,a:.31,p:[[681,197],[697,261],[687,305],[729,371],[716,423],[749,493],[743,552],[775,616],[762,692],[789,765],[780,848],[800,960],[784,1102],[792,1240]]},
    {w:17,a:.2,p:[[493,599],[478,650],[492,721],[473,792],[484,851],[466,927],[475,1001],[457,1130],[469,1295]]},
    {w:28,a:.28,p:[[961,367],[943,434],[955,503],[924,584],[939,650],[918,741],[927,811],[902,902],[919,982],[906,1106],[926,1257]]},
    {w:20,a:.23,p:[[221,319],[216,394],[204,451],[211,501],[189,572],[203,660],[182,753],[189,841],[169,975],[173,1110]]},
  ];
  folds.forEach(f=>brushFold(ctx,f.p,f.w,f.a));
  // Great folding seams, broken so the brush never looks mechanically smooth.
  const seams = [
    [[602,125],[620,188],[639,235],[643,290],[670,348],[661,398],[697,463],[706,529],[736,593],[728,672],[756,752],[743,824],[758,930],[756,1118],[730,1279]],
    [[512,242],[538,306],[527,367],[568,424],[577,479],[607,541],[591,602],[617,693],[625,780],[652,856],[635,954],[668,1042],[660,1201],[677,1328]],
    [[364,267],[330,341],[346,401],[302,470],[307,530],[271,603],[284,664],[249,731],[243,795],[218,853],[228,904],[205,984],[220,1070],[210,1238]],
    [[714,118],[730,187],[757,240],[752,322],[786,378],[773,427],[800,496],[795,582],[816,672]],
    [[914,406],[903,475],[873,544],[896,605],[864,676],[889,753],[863,861],[899,955],[880,1110],[906,1298]],
    [[463,573],[437,620],[439,702],[410,779],[423,844],[401,932],[417,1013],[399,1129],[416,1273]],
  ];
  seams.forEach(line => {
    softLine(ctx, ragged(line, 3, 9), 3.1, .6);
    softLine(ctx, line.map(([x,y])=>[x-4,y]), 1.1, .34, SILK);
    for (let i = 1; i < line.length; i += 2) {
      const [x,y] = line[i]; softLine(ctx, ragged([[x,y],[x-12,y+15],[x-17,y+37]],2),1.4,.34);
    }
  });
  // The waterfall's dark cleft is cut between the main face and eastern cliff.
  const cleft = [[804,485],[829,460],[851,445],[866,421],[884,404],[881,486],[869,548],[856,617],[843,699],[835,755],[842,826],[829,899],[841,974],[838,1056],[830,1140],[842,1192],[837,1280],[801,1308],[802,1202],[794,1138],[803,1065],[798,998],[804,939],[810,853],[806,781],[809,725],[816,667],[817,609],[808,566]];
  ctx.save(); path(ctx, ragged(cleft, 2.4), true);
  ctx.fillStyle = rgba([38,43,34], .49); ctx.fill();
  ctx.strokeStyle = rgba(INK,.35); ctx.lineWidth=2; ctx.stroke(); ctx.restore();
  // Contours of scrub woods, clustered on shelves instead of sprayed everywhere.
  scrubPatch(ctx,494,139,81,63,3400,1.04);
  scrubPatch(ctx,611,174,66,51,2000,.95);
  scrubPatch(ctx,698,139,51,43,1800,1);
  scrubPatch(ctx,277,279,78,69,2800,.93);
  scrubPatch(ctx,367,265,48,68,1700,.86);
  scrubPatch(ctx,497,401,103,51,2700,.78);
  scrubPatch(ctx,651,337,77,43,2100,.87);
  scrubPatch(ctx,335,517,61,66,2000,.8);
  scrubPatch(ctx,464,617,74,55,2300,.72);
  scrubPatch(ctx,938,393,80,77,2700,.92);
  scrubPatch(ctx,972,592,55,45,1300,.8);
  ridgeTrees(ctx, [[184,245],[234,211],[278,210],[311,230],[363,215],[397,182]], 75, 15, 1);
  ridgeTrees(ctx, [[420,111],[467,84],[501,62],[547,69],[576,73],[614,108],[659,87],[699,84],[741,112]], 110, 17, 1.1);
  ridgeTrees(ctx, [[810,288],[853,270],[892,267],[947,295],[1000,326]], 65, 15);
  ridgeTrees(ctx, [[290,460],[338,449],[377,482],[422,438],[470,445],[506,393],[562,398],[604,369],[644,347],[700,350],[754,382]], 54, 18,.72);
  ridgeTrees(ctx, [[207,616],[242,594],[284,615],[321,661],[374,618],[429,647],[459,597],[501,568],[545,572]], 45, 17,.66);
  ridgeTrees(ctx, [[881,568],[934,545],[974,584],[1010,535]], 45, 17,.85);
  // A separate western promontory disappears into the middle cloud.
  rock(ctx, [[-20,854],[39,853],[91,871],[132,940],[154,1091],[185,1212],[202,1375],[119,1430],[-10,1421]], {shade:.29,strokes:3700});
  ridgeTrees(ctx, [[-12,848],[27,839],[63,853],[99,872]], 48, 16);
  // Empty lower edge: diluted ink dissolves the mountains into mist.
  ctx.save(); ctx.globalCompositeOperation='destination-out';
  const fade=ctx.createLinearGradient(0,1160,0,1430);
  fade.addColorStop(0,'rgba(0,0,0,0)');fade.addColorStop(.48,'rgba(0,0,0,.16)');fade.addColorStop(1,'rgba(0,0,0,1)');
  ctx.fillStyle=fade;ctx.fillRect(0,1160,W,300);ctx.restore();
}

function temple(ctx, x, y, scale = 1) {
  ctx.save(); ctx.translate(x,y); ctx.scale(scale,scale);
  ctx.fillStyle=rgba(SILK,.65); ctx.fillRect(-27,-37,57,35);
  for (let i=-24;i<=30;i+=8) softLine(ctx,[[i,-34],[i,-2]],1.5,.7);
  softLine(ctx,[[-27,-6],[30,-6]],2,.6);
  const roof=[[-43,-36],[-34,-38],[-15,-49],[0,-58],[15,-49],[34,-40],[44,-38],[38,-34],[19,-32],[-17,-32],[-43,-36]];
  path(ctx,ragged(roof,.8,5),true);ctx.fillStyle=rgba(INK,.78);ctx.fill();
  softLine(ctx,[[-43,-36],[-28,-33],[0,-35],[28,-33],[44,-38]],1,.66,SILK);
  for(let i=-25;i<30;i+=4) softLine(ctx,[[i*.7,-48+Math.abs(i)*.28],[i,-35]],.6,.4,SILK);
  softLine(ctx,[[0,-57],[0,-65],[-3,-62]],1.5,.7);
  ctx.fillStyle=rgba(INK,.5);ctx.fillRect(-4,-24,12,18);
  ctx.restore();
}

function middle(ctx) {
  // Forested island at the right, temple screened by the treetops.
  rock(ctx,[[448,1390],[473,1325],[507,1304],[554,1321],[593,1320],[623,1343],[688,1358],[739,1381],[813,1400],[887,1421],[944,1423],[1011,1476],[1020,1770],[914,1734],[851,1718],[752,1737],[658,1682],[543,1662],[505,1624],[454,1614],[418,1554],[428,1493]],{shade:.34,strokes:6500,edge:2.4,direction:.3});
  temple(ctx, 846, 1424, 1.05); temple(ctx, 897, 1463, .73);
  softLine(ctx,[[814,1417],[806,1438],[870,1471],[917,1472]],1.3,.65);
  for(let i=0;i<12;i++) softLine(ctx,[[814+i*5,1417+i*2],[814+i*5,1442+i*1.7]],.8,.5);
  rock(ctx,[[463,1482],[507,1467],[548,1499],[594,1526],[602,1591],[566,1644],[505,1621],[469,1588],[440,1559]],{shade:.24,strokes:1000,direction:-.4});
  rock(ctx,[[613,1605],[668,1548],[727,1543],[771,1595],[748,1659],[688,1700],[610,1703],[547,1663]],{shade:.28,strokes:1000,direction:-.85});
  rock(ctx,[[733,1645],[780,1599],[821,1614],[858,1685],[831,1721],[757,1742],[690,1730]],{shade:.33,strokes:900,direction:.4});
  for(let i=0;i<20;i++) {
    const x=rnd(468,999), y=1360+(x-470)*.23+rnd(-8,75);
    tree(ctx,x,y,rnd(.35,.66),i%3===0?'pine':'leaf');
  }
  tree(ctx, 536,1458,.85,'pine'); tree(ctx,489,1389,.65,'pine');
  tree(ctx,610,1410,.85,'pine'); tree(ctx,577,1479,.87,'leaf');
  tree(ctx,707,1500,1.06,'leaf');tree(ctx,791,1606,1.21,'leaf');
  tree(ctx,883,1640,1.13,'leaf');tree(ctx,953,1634,1.34,'leaf');
  tree(ctx,858,1722,1.2,'leaf');tree(ctx,999,1750,1.5,'leaf');
  for(const [x,y,s] of [[543,1555,.73],[615,1537,.9],[689,1593,.78],[746,1666,.91],[919,1716,.93],[965,1588,.94],[826,1479,.64],[582,1633,.63],[660,1652,.7]]){
    tree(ctx,x,y,s,'leaf');
  }
  brushFold(ctx,[[461,1440],[451,1484],[467,1527],[452,1571],[488,1610]],16,.29);
  brushFold(ctx,[[672,1561],[653,1583],[626,1600],[602,1627],[568,1644]],16,.25);
  scrubPatch(ctx,543,1367,41,34,850,.85);
  scrubPatch(ctx,643,1418,40,29,760,.78);
  scrubPatch(ctx,744,1402,38,28,800,.84);
  scrubPatch(ctx,832,1522,46,36,1050,.82);
  scrubPatch(ctx,972,1659,48,36,950,.85);
  // Left riverbank and the smaller, gnarled foreground woods.
  rock(ctx,[[-16,1418],[50,1444],[92,1473],[152,1470],[206,1493],[245,1533],[278,1560],[302,1628],[350,1662],[398,1739],[417,1792],[295,1810],[185,1800],[68,1851],[-20,1838]],{shade:.27,strokes:4700,direction:.85});
  rock(ctx,[[9,1643],[53,1604],[109,1587],[163,1612],[171,1659],[224,1678],[286,1746],[272,1779],[161,1758],[109,1798],[30,1777],[-10,1750]],{shade:.18,strokes:1800,direction:1});
  tree(ctx,99,1600,1.05);tree(ctx,179,1631,.79);tree(ctx,46,1662,.82);
  tree(ctx,263,1685,.55);tree(ctx,348,1707,.5);
  ridgeTrees(ctx,[[10,1606],[43,1595],[74,1617],[110,1634],[150,1640]],30,14,.8);
  // The water comes down over ledges into the open stream.
  for(let i=0;i<35;i++){
    const x=439+rnd(-18,23),y=1606+rnd(-12,20);
    softLine(ctx,[[x,y],[x+4,y+25],[x+9,y+43]],rnd(.55,1.6),rnd(.15,.45),[221,206,166]);
  }
  softLine(ctx,[[360,1668],[393,1670],[422,1662],[451,1659]],3,.5,INK);
  softLine(ctx,[[359,1666],[387,1667],[425,1659],[450,1658]],1.2,.7,SILK);
  for(let i=0;i<80;i++){
    const x=rnd(290,650),y=rnd(1722,1854);
    softLine(ctx,[[x,y],[x+rnd(7,31),y+rnd(-2,2)]],rnd(.4,1),rnd(.08,.24));
  }
  // Road: an unpainted ribbon, bounded by broken bank lines.
  softLine(ctx,[[993,1749],[906,1756],[816,1769],[716,1780],[624,1797],[543,1809],[480,1812],[421,1801],[365,1783],[326,1757],[304,1737]],1.8,.3);
  softLine(ctx,[[990,1782],[904,1790],[817,1801],[719,1816],[627,1832],[527,1845],[444,1840],[374,1818]],1.1,.28);
  for(let i=0;i<24;i++){
    const x=rnd(365,989),y=1796-(x-480)*.066+rnd(-8,22);
    softLine(ctx,[[x,y],[x+rnd(3,14),y+1]],.65,.16);
  }
}

function foreground(ctx) {
  // The close boulders press against the bottom edge, as in the original scroll.
  rock(ctx,[[-20,1887],[20,1866],[65,1885],[113,1872],[158,1909],[227,1942],[263,2005],[-18,2015]],{shade:.41,strokes:1700,direction:1});
  rock(ctx,[[220,1874],[233,1819],[270,1798],[314,1814],[364,1818],[391,1844],[427,1845],[458,1888],[429,1938],[367,1973],[302,1957],[252,1931]],{shade:.34,strokes:2000,direction:.8,edge:3});
  rock(ctx,[[425,1837],[454,1777],[508,1767],[538,1776],[566,1763],[608,1778],[644,1787],[662,1822],[701,1827],[734,1861],[771,1855],[802,1898],[836,1908],[857,1958],[868,2008],[633,2022],[538,1996],[510,1940],[468,1900]],{shade:.31,strokes:5300,direction:.72,edge:3.4});
  rock(ctx,[[304,1973],[339,1931],[403,1910],[454,1918],[498,1952],[527,2008],[326,2022]],{shade:.35,strokes:1600,direction:-.8,edge:2.9});
  rock(ctx,[[525,2009],[566,1934],[604,1883],[636,1885],[663,1919],[683,1974],[736,2007]],{shade:.4,strokes:1500,direction:.48,edge:3});
  rock(ctx,[[824,1940],[855,1884],[891,1839],[941,1819],[993,1788],[1020,1800],[1020,2015],[899,2010]],{shade:.4,strokes:2400,direction:.3,edge:2.8});
  for(let i=0;i<1000;i++){
    const x=rnd(190,965), y=rnd(1870,2000);
    if(random()<.4) {
      ctx.fillStyle=rgba(INK,rnd(.08,.23));
      ctx.fillRect(x,y,rnd(1,2),rnd(1,3));
    }
  }
  // Little dark bank stones place the travelling figures in a vast landscape.
  for(const [x,y,s] of [[600,1741,10],[661,1751,9],[691,1756,6],[477,1761,9],[513,1738,6],[347,1752,5],[866,1744,5]]){
    const stone=[[x-s,y],[x-s*.6,y-s*.65],[x,y-s],[x+s*.7,y-s*.55],[x+s,y],[x,y+s*.2]];
    path(ctx,ragged(stone,1,3),true);ctx.fillStyle=rgba(INK,.67);ctx.fill();
    softLine(ctx,[[x-s*.7,y-s*.3],[x,y-s*.7],[x+s*.7,y-s*.2]],.8,.45,SILK);
  }
}

function grain(ctx) {
  const image = ctx.createImageData(W,H);
  for(let i=0;i<image.data.length;i+=4){
    const light=random()>.51, amount=rnd(2,18);
    image.data[i]=light?227:45;image.data[i+1]=light?215:45;image.data[i+2]=light?178:32;
    image.data[i+3]=amount;
  }
  ctx.putImageData(image,0,0);
  for(let i=0;i<1600;i++){
    const x=rnd(W), y=rnd(H);
    softLine(ctx,[[x,y],[x+rnd(-.3,.3),y+rnd(3,22)]],.4,rnd(.02,.1),SILK);
  }
}

function mistTexture(ctx) {
  for(let i=0;i<36;i++){
    const x=rnd(-150,1150),y=rnd(1190,1390),rx=rnd(150,310),ry=rnd(30,75);
    ctx.save();ctx.translate(x,y);ctx.scale(1,ry/rx);
    const cloud=ctx.createRadialGradient(0,0,0,0,0,rx);
    cloud.addColorStop(0,'rgba(207,191,157,.28)');cloud.addColorStop(.45,'rgba(204,188,152,.16)');cloud.addColorStop(1,'rgba(204,188,152,0)');
    ctx.fillStyle=cloud;ctx.fillRect(-rx,-rx,rx*2,rx*2);ctx.restore();
  }
}

export function createArtwork() {
  seed=781923;
  const layers={paper:canvas(),mountain:canvas(),middle:canvas(),foreground:canvas(),grain:canvas(),mist:canvas()};
  silk(layers.paper.ctx);mountain(layers.mountain.ctx);middle(layers.middle.ctx);
  foreground(layers.foreground.ctx);grain(layers.grain.ctx);mistTexture(layers.mist.ctx);
  return layers;
}

function drawWaterfall(ctx,time,strength,reduced) {
  const phase=reduced?2:time;
  ctx.save();
  const flow=[[849,621],[838,675],[833,731],[831,793],[825,859],[826,936],[819,1003],[821,1085],[815,1165],[819,1247],[819,1302]];
  softLine(ctx,flow,4,.1*strength,[232,218,183]);
  softLine(ctx,flow,1.55,.66*strength,[222,208,171]);
  softLine(ctx,flow.map(([x,y])=>[x+2.7,y]),.8,.21*strength,SILK);
  for(let i=0;i<26;i++){
    const y=640+((i*29+phase*46)%650);
    const x=849-(y-621)*.048+Math.sin(y*.02)*2;
    const size=7+Math.sin(i*14)*4;
    softLine(ctx,[[x,y],[x-.7,y+size]],.8,.42*strength,[238,225,191]);
  }
  // Small horizontal ledges interrupt the line of water.
  softLine(ctx,[[824,718],[834,715],[844,720]],1,.46*strength,SILK);
  softLine(ctx,[[820,738],[831,736],[840,742]],1,.35*strength,SILK);
  for(let i=0;i<10;i++){
    const p=(i/10+phase*.035)%1;
    const x=819+Math.sin(i*2.4)*p*15;
    softLine(ctx,[[x,1286+p*30],[x+3,1288+p*30]],.6,(1-p)*.16*strength,[233,218,183]);
  }
  ctx.restore();
}

function mule(ctx,x,y,phase,index) {
  ctx.save();ctx.translate(x,y);
  const bob=Math.sin(phase*4+index)*.45;
  ctx.translate(0,bob);
  // Heads face left; the packs, ropes, fine legs and long ears remain legible.
  ctx.fillStyle=rgba([40,44,34],.88);
  ctx.beginPath();ctx.ellipse(0,-10,10,4.4,-.04,0,Math.PI*2);ctx.fill();
  path(ctx,[[-8,-10],[-12,-15],[-15,-16],[-18,-13],[-18,-10],[-14,-9],[-10,-6]],true);ctx.fill();
  softLine(ctx,[[-15,-15],[-16,-20]],1.35,.9);
  softLine(ctx,[[-13,-15],[-12,-20]],1.15,.9);
  softLine(ctx,[[9,-10],[14,-5],[14,-2]],1.15,.8);
  const stride=Math.sin(phase*5+index*.9)*2;
  for(let j=0;j<4;j++) {
    const anchor=-6+j*4,sign=j%2?1:-1;
    softLine(ctx,[[anchor,-8],[anchor+stride*sign,-3],[anchor-stride*sign,3]],j%2?1.1:1.5,.86);
  }
  const packs=[[-7,-17],[-1,-20],[7,-18],[10,-11],[-8,-11]];
  path(ctx,packs,true);ctx.fillStyle=rgba([73,72,52],.95);ctx.fill();
  softLine(ctx,[[-7,-17],[-1,-20],[7,-18]],1.2,.65,SILK);
  softLine(ctx,[[0,-19],[1,-10]],1.3,.8,INK);
  softLine(ctx,[[-7,-14],[8,-14]],.65,.6,SILK);
  softLine(ctx,[[-18,-11],[-24,-8]],.6,.55);
  ctx.restore();
}

function person(ctx,x,y,phase,looking=false) {
  ctx.save();ctx.translate(x,y);
  const stride=looking?0:Math.sin(phase*5)*2.1;
  const headX=looking?1:-1;
  ctx.fillStyle=rgba(INK,.91);
  ctx.beginPath();ctx.arc(headX,-20,2.3,0,Math.PI*2);ctx.fill();
  softLine(ctx,[[headX-3,-21],[headX+3,-21]],1,.8);
  path(ctx,[[-2,-17],[2,-17],[5,-7],[-5,-7]],true);ctx.fill();
  softLine(ctx,[[-2,-8],[-3-stride,1]],1.5,.86);
  softLine(ctx,[[2,-8],[3+stride,1]],1.4,.86);
  softLine(ctx,[[-2,-14],[-7,-9],[-9,-8]],1.1,.86);
  softLine(ctx,[[3,-15],[6,-11],[8,-12]],1,.7);
  softLine(ctx,[[-9,-9],[-11,2]],.8,.75);
  // A lifted chin and the still robe make the pause distinct.
  if(looking)softLine(ctx,[[headX+1,-22],[headX+3,-23]],.8,.8);
  ctx.restore();
}

export function travellerPositions(state) {
  const frontX=1038-state.route*760;
  const roadY=x=>1798-(x-590)*.072+Math.sin((x-300)/110)*3;
  const animals=Array.from({length:4},(_,i)=>({x:frontX+24+i*36,y:roadY(frontX+24+i*36),index:i}));
  const lastX=frontX+183+state.lastOffset;
  return {guide:{x:frontX,y:roadY(frontX)},animals,last:{x:lastX,y:roadY(lastX)}};
}

function travellers(ctx,state,reduced) {
  if(state.travellerVisibility<=0)return;
  const positions=travellerPositions(state);
  ctx.save();ctx.globalAlpha=state.travellerVisibility;
  // Hide each figure independently behind the woods and the left rock face.
  const drawVisible=(figure,draw)=>{
    const visible=smooth(288,362,figure.x)*(1-smooth(956,1038,figure.x));
    ctx.save();ctx.globalAlpha=state.travellerVisibility*visible;draw();ctx.restore();
  };
  let previous=positions.guide;
  positions.animals.forEach((a,i)=>{
    softLine(ctx,[[previous.x+5,previous.y-10],[a.x-17,a.y-12]],.45,.42);
    drawVisible(a,()=>mule(ctx,a.x,a.y,reduced?1:state.time,i));previous=a;
  });
  drawVisible(positions.guide,()=>person(ctx,positions.guide.x,positions.guide.y,reduced?1:state.time));
  drawVisible(positions.last,()=>person(ctx,positions.last.x,positions.last.y,(reduced||state.lastStopped)?1:state.time*(state.lastOffset>0?1.6:1),state.lastStopped));
  ctx.restore();
}

function birds(ctx,state,reduced) {
  if(!state.birdsVisible)return;
  const p=state.birdFlight;
  ctx.save();ctx.globalAlpha=(1-smooth(.74,1,p))*.9;
  for(let i=0;i<11;i++){
    const delay=i*.014,q=clamp(p-delay);
    const x=721-q*(390+i*17)+Math.sin(q*8+i)*12;
    const y=1340-q*(325+i*17)+Math.sin(q*6+i)*17;
    const wing=reduced?3:Math.sin(state.time*7+i*1.6)*3.5;
    const size=4.4-q*1.5;
    softLine(ctx,[[x-size,y-wing],[x,y],[x+size,y-wing*.7]],.95,.9);
  }
  ctx.restore();
}

function mist(ctx,layers,state,reduced) {
  const drift=reduced?0:Math.sin(state.time*Math.PI/40)*30;
  ctx.save();ctx.globalAlpha=.74+state.mist*.65;
  ctx.drawImage(layers.mist.canvas,drift,reduced?0:Math.sin(state.time*Math.PI/20)*8);
  ctx.drawImage(layers.mist.canvas,drift-W,0);
  ctx.restore();
  const veil=ctx.createLinearGradient(0,1040,0,1510);
  veil.addColorStop(0,'rgba(207,192,159,0)');
  veil.addColorStop(.4,`rgba(205,188,152,${state.mist*.31})`);
  veil.addColorStop(.67,`rgba(208,192,158,${state.mist*.6})`);
  veil.addColorStop(1,'rgba(208,192,158,0)');
  ctx.fillStyle=veil;ctx.fillRect(0,1040,W,470);
}

export function renderArtwork(ctx,layers,state,{reduced=false}={}) {
  ctx.clearRect(0,0,W,H);
  ctx.drawImage(layers.paper.canvas,0,0);
  ctx.drawImage(layers.mountain.canvas,0,0);
  drawWaterfall(ctx,state.time,state.waterfall,reduced);
  // Initial cloud never hides the silhouette. It lifts in the first 12 seconds.
  const atmosphericVeil = Math.max(state.dawn, state.closing);
  if(atmosphericVeil>0) {
    const wash=ctx.createLinearGradient(0,130,0,1460);
    wash.addColorStop(0,'rgba(202,186,151,0)');
    wash.addColorStop(.62,`rgba(202,186,151,${atmosphericVeil*.19})`);
    wash.addColorStop(1,`rgba(202,186,151,${atmosphericVeil*.42})`);
    ctx.fillStyle=wash;ctx.fillRect(0,130,W,1330);
  }
  mist(ctx,layers,state,reduced);
  ctx.drawImage(layers.middle.canvas,0,0);
  travellers(ctx,state,reduced);
  birds(ctx,state,reduced);
  // A thin current animates the creek without turning it into a bright ribbon.
  for(let i=0;i<14;i++){
    const p=(i/14+(reduced?0:state.time*.025))%1;
    const x=256+p*250,y=1847+Math.sin(i*2.1)*17;
    softLine(ctx,[[x,y],[x+11,y-1]],.65,.17,[227,211,174]);
  }
  ctx.drawImage(layers.foreground.canvas,0,0);
  if(state.dawn>0||state.closing>0){
    const density=(state.dawn+state.closing)*.22;
    const cloud=ctx.createLinearGradient(0,1490,0,1890);
    cloud.addColorStop(0,'rgba(211,196,164,0)');cloud.addColorStop(.45,`rgba(211,196,164,${density})`);cloud.addColorStop(1,'rgba(211,196,164,0)');
    ctx.fillStyle=cloud;ctx.fillRect(0,1490,W,400);
  }
  ctx.drawImage(layers.grain.canvas,0,0);
}
