/* 溪山行旅图 —— 程序化水墨 + 四幕动画
 * 全部画面由代码生成，无外部素材。
 * 静态画一次渲染进离屏画布；雾、瀑、驮队、飞鸟、钟声、落款为每帧动态层。
 */
(() => {
'use strict';

/* ---------------- 基本工具 ---------------- */

const PW = 1080, PH = 2160;                 // 画心尺寸（约 1:2，同原画）
const INK   = a => `rgba(36,31,25,${a})`;   // 墨
const INKW  = a => `rgba(58,50,40,${a})`;   // 暖墨
const SILK_L= a => `rgba(214,194,158,${a})`;// 绢色提亮
const MISTC = a => `rgba(228,218,196,${a})`;// 雾
const FALLC = a => `rgba(235,228,210,${a})`;// 水

let rng = mulberry32(20261003);
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const rr = (a,b)=>a+rng()*(b-a);
const clamp=(v,a,b)=>v<a?a:v>b?b:v;
const lerp=(a,b,t)=>a+(b-a)*t;
const smooth=(t)=>{t=clamp(t,0,1);return t*t*(3-2*t)};

/* Catmull-Rom 平滑闭合/开放多边形 */
function polyPath(pts, closed=true, jitter=0){
  const P = pts.map(p=>[p[0]+(jitter?rr(-jitter,jitter):0), p[1]+(jitter?rr(-jitter,jitter):0)]);
  const path = new Path2D();
  const n = P.length;
  if(closed){
    for(let i=0;i<n;i++){
      const p0=P[(i-1+n)%n],p1=P[i],p2=P[(i+1)%n],p3=P[(i+2)%n];
      if(i===0) path.moveTo(p1[0],p1[1]);
      path.bezierCurveTo(
        p1[0]+(p2[0]-p0[0])/6, p1[1]+(p2[1]-p0[1])/6,
        p2[0]-(p3[0]-p1[0])/6, p2[1]-(p3[1]-p1[1])/6,
        p2[0],p2[1]);
    }
    path.closePath();
  } else {
    path.moveTo(P[0][0],P[0][1]);
    for(let i=0;i<n-1;i++){
      const p0=P[Math.max(0,i-1)],p1=P[i],p2=P[i+1],p3=P[Math.min(n-1,i+2)];
      path.bezierCurveTo(
        p1[0]+(p2[0]-p0[0])/6, p1[1]+(p2[1]-p0[1])/6,
        p2[0]-(p3[0]-p1[0])/6, p2[1]-(p3[1]-p1[1])/6,
        p2[0],p2[1]);
    }
  }
  return {path, pts:P};
}

/* 圆头叠印成有提按的笔触（树干、轮廓、枝干用） */
function strokeTaper(ctx, pts, w, col, a){
  const res=[];
  for(let i=0;i<pts.length-1;i++){
    const [x1,y1]=pts[i],[x2,y2]=pts[i+1];
    const d=Math.hypot(x2-x1,y2-y1), n=Math.max(1,Math.ceil(d/3.5));
    for(let j=0;j<n;j++){const t=j/n;res.push([x1+(x2-x1)*t,y1+(y2-y1)*t]);}
  }
  res.push(pts[pts.length-1]);
  ctx.fillStyle=col;
  const n=res.length;
  for(let i=0;i<n;i++){
    const t=i/(n-1), f=Math.sin(Math.PI*clamp(t,0,1));
    const r=Math.max(0.5, w*0.5*(0.3+0.75*f));
    ctx.globalAlpha=a*(0.75+0.25*rng());
    ctx.beginPath(); ctx.arc(res[i][0],res[i][1],r,0,6.284); ctx.fill();
  }
  ctx.globalAlpha=1;
}

/* 短皴/点：一笔 */
function dab(ctx,x,y,ang,len,w,col,a){
  ctx.globalAlpha=a; ctx.strokeStyle=col; ctx.lineWidth=w;
  ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(x,y);
  ctx.lineTo(x+Math.cos(ang)*len, y+Math.sin(ang)*len); ctx.stroke();
}

/* 在 Path2D 内随机布皴（雨点皴为主，兼拖笔） */
function cunField(ctx, path, bbox, n, opt={}){
  const {angBase=Math.PI/2, angVar=0.85, lenMin=2.5, lenMax=9,
         wMin=0.8, wMax=2.2, aMin=0.04, aMax=0.26, col=INK(1), shade=null} = opt;
  ctx.strokeStyle=col;
  let placed=0, guard=n*4;
  while(placed<n && guard-->0){
    const x=rr(bbox.x0,bbox.x1), y=rr(bbox.y0,bbox.y1);
    if(!ctx.isPointInPath(path,x,y)) continue;
    placed++;
    let a=rr(aMin,aMax);
    if(shade) a*=shade(x,y);
    const r=rng();
    if(r<0.72){ // 豆瓣/雨点短皴
      dab(ctx,x,y, angBase+rr(-angVar,angVar), rr(lenMin,lenMax), rr(wMin,wMax), col, a);
    } else if(r<0.88){ // 较长拖笔
      dab(ctx,x,y, angBase+rr(-angVar*0.7,angVar*0.7), rr(lenMax,lenMax*2.1), rr(wMin,wMin+0.8), col, a*0.8);
    } else { // 点
      ctx.globalAlpha=a*1.3; ctx.fillStyle=col;
      ctx.beginPath(); ctx.arc(x,y,rr(0.8,2.4),0,6.284); ctx.fill();
    }
  }
  ctx.globalAlpha=1;
}

/* 山头点苔/灌木丛 */
function mossClump(ctx,x,y,r,dark=0.65,n=null){
  n=n||Math.floor(r*r*0.55);
  for(let i=0;i<n;i++){
    const t=rng()*6.284, d=Math.pow(rng(),0.55)*r;
    const px=x+Math.cos(t)*d*1.25, py=y+Math.sin(t)*d*0.75;
    const edge = 1 - d/r;
    ctx.globalAlpha = clamp(dark*(0.35+0.65*edge)*rr(0.6,1.15),0,0.9);
    ctx.fillStyle=INK(1);
    if(rng()<0.7){ ctx.beginPath(); ctx.arc(px,py,rr(1,3),0,6.284); ctx.fill(); }
    else dab(ctx,px,py, rr(0,6.28), rr(2,5), rr(0.8,1.6), INK(1), ctx.globalAlpha);
  }
  ctx.globalAlpha=1;
}

/* 山体：轮廓 + 积墨 + 分面 + 皴 + 点苔 */
function mountain(ctx, spec){
  const {pts, toneTop, toneBot, cun, shade, moss=[], contourA=0.55, bbox,
         facets=[], caps=[]} = spec;
  const {path, pts:jp} = polyPath(pts, true, 7);

  // 积墨：自上而下的渐变打底
  const g=ctx.createLinearGradient(0,bbox.y0,0,bbox.y1);
  g.addColorStop(0, INK(toneTop)); g.addColorStop(0.55, INK(toneTop*0.62)); g.addColorStop(1, INK(toneBot));
  ctx.fillStyle=g; ctx.fill(path);

  ctx.save(); ctx.clip(path);

  // 山头积墨深块（矾头暗影）
  for(const c of caps){
    const {path:cp}=polyPath(c,true,8);
    ctx.fillStyle=INK(0.26); ctx.fill(cp);
  }
  // 分面：脊线一侧的阴影带 + 脊线勾勒，造出竖向岩壁结构
  for(const f of facets){
    const {line, w=70, side=1, a=0.1}=f;
    const {path:fp}=polyPath(line,false,6);
    ctx.strokeStyle=INK(1); ctx.lineCap='round';
    // 阴影带（偏向一侧）
    ctx.globalAlpha=a; ctx.lineWidth=w;
    ctx.save(); ctx.translate(w*0.45*side,0); ctx.stroke(fp); ctx.restore();
    // 背光面淡擦
    ctx.globalAlpha=a*0.5; ctx.lineWidth=w*0.8;
    ctx.save(); ctx.translate(-w*0.4*side,0); ctx.stroke(fp); ctx.restore();
    // 脊线（断续焦墨）
    ctx.setLineDash([rr(30,80),rr(8,30)]);
    ctx.globalAlpha=Math.min(0.55,a*3.4); ctx.lineWidth=rr(2.2,3.6);
    ctx.stroke(fp);
    ctx.setLineDash([]);
    // 横向层理：破开竖条
    for(const p of line){
      if(rng()<0.6) dab(ctx,p[0]+rr(-30,30),p[1]+rr(-40,40), rr(-0.35,0.35), rr(24,70), rr(1.4,2.6), INK(1), a*2.2);
    }
  }
  // 大笔淡墨侧锋刷染（带飞白）
  for(let i=0;i<7;i++){
    ctx.globalAlpha=0.05;
    ctx.strokeStyle=INK(1); ctx.lineWidth=rr(40,110); ctx.lineCap='round';
    ctx.setLineDash([rr(60,160), rr(30,90)]);
    ctx.beginPath();
    const y=rr(bbox.y0,bbox.y1);
    ctx.moveTo(bbox.x0-30, y+rr(-30,30));
    ctx.bezierCurveTo(lerp(bbox.x0,bbox.x1,0.33), y+rr(-90,90),
                      lerp(bbox.x0,bbox.x1,0.66), y+rr(-90,90),
                      bbox.x1+30, y+rr(-30,30));
    ctx.stroke();
  }
  ctx.setLineDash([]);
  cunField(ctx, path, bbox, cun, {shade});
  ctx.restore();

  // 轮廓（勾勒）：两遍，一淡一浓，略错位
  ctx.strokeStyle=INK(1);
  ctx.globalAlpha=contourA*0.55; ctx.lineWidth=5; ctx.lineJoin='round';
  ctx.stroke(path);
  ctx.globalAlpha=contourA; ctx.lineWidth=2.2;
  ctx.stroke(path);
  ctx.globalAlpha=1;

  // 边缘墨渗：沿轮廓外散碎点
  for(let i=0;i<jp.length;i++){
    const p0=jp[i], p1=jp[(i+1)%jp.length];
    const d=Math.hypot(p1[0]-p0[0],p1[1]-p0[1]), nn=Math.ceil(d/14);
    for(let j=0;j<nn;j++){
      const t=j/nn;
      const x=lerp(p0[0],p1[0],t)+rr(-5,5), y=lerp(p0[1],p1[1],t)+rr(-5,5);
      ctx.globalAlpha=rr(0.05,0.14); ctx.fillStyle=INK(1);
      ctx.beginPath(); ctx.arc(x,y,rr(0.7,2.4),0,6.284); ctx.fill();
    }
  }
  ctx.globalAlpha=1;

  for(const m of moss) mossClump(ctx, m[0],m[1],m[2], m[3]!==undefined?m[3]:0.65);
}

/* ---------------- 绢底 ---------------- */

function silkGround(ctx){
  const g=ctx.createLinearGradient(0,0,0,PH);
  g.addColorStop(0,'#a8895f'); g.addColorStop(0.5,'#9c7f56'); g.addColorStop(1,'#8a6f4b');
  ctx.fillStyle=g; ctx.fillRect(0,0,PW,PH);

  // 大面积斑驳
  for(let i=0;i<260;i++){
    const x=rr(0,PW), y=rr(0,PH), r=rr(30,160);
    const gr=ctx.createRadialGradient(x,y,0,x,y,r);
    const dark=rng()<0.6;
    gr.addColorStop(0, dark?`rgba(70,52,30,${rr(0.015,0.05)})`:`rgba(226,205,165,${rr(0.015,0.045)})`);
    gr.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=gr; ctx.fillRect(x-r,y-r,r*2,r*2);
  }
  // 经纬丝线
  for(let i=0;i<90;i++){
    ctx.globalAlpha=rr(0.008,0.022);
    ctx.strokeStyle=rng()<0.5?'#6d573a':'#c4a97e';
    ctx.lineWidth=rr(0.5,1.1);
    const x=rr(0,PW);
    ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x+rr(-30,30),PH); ctx.stroke();
  }
  for(let i=0;i<50;i++){
    ctx.globalAlpha=rr(0.01,0.03);
    ctx.strokeStyle='#6d573a'; ctx.lineWidth=rr(0.5,1.2);
    const y=rr(0,PH);
    ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(PW,y+rr(-15,15)); ctx.stroke();
  }
  ctx.globalAlpha=1;
  // 折痕（绢本横折）
  for(const y of [430, 1180, 1830]){
    ctx.globalAlpha=0.045; ctx.fillStyle='#5d492f';
    ctx.fillRect(0,y+rr(-3,3),PW,rr(4,9));
    ctx.globalAlpha=0.03; ctx.fillStyle='#e2cfa8';
    ctx.fillRect(0,y+rr(6,10),PW,rr(3,6));
  }
  ctx.globalAlpha=1;
}

/* 污渍 + 霉点 + 四角暗沉（最后叠加） */
function aging(ctx){
  for(let i=0;i<2400;i++){
    ctx.globalAlpha=rr(0.02,0.07);
    ctx.fillStyle=rng()<0.7?'#4e3d27':'#d8c096';
    ctx.beginPath(); ctx.arc(rr(0,PW),rr(0,PH),rr(0.4,1.4),0,6.284); ctx.fill();
  }
  // 水渍
  for(let i=0;i<7;i++){
    const x=rr(0,PW),y=rr(0,PH),r=rr(40,140);
    const g=ctx.createRadialGradient(x,y,r*0.7,x,y,r);
    g.addColorStop(0,'rgba(0,0,0,0)'); g.addColorStop(1,`rgba(80,60,35,${rr(0.03,0.07)})`);
    ctx.fillStyle=g; ctx.fillRect(x-r,y-r,r*2,r*2);
  }
  // 四边暗角
  const v=ctx.createRadialGradient(PW/2,PH/2,PH*0.32,PW/2,PH/2,PH*0.62);
  v.addColorStop(0,'rgba(0,0,0,0)'); v.addColorStop(1,'rgba(40,28,15,0.28)');
  ctx.fillStyle=v; ctx.fillRect(0,0,PW,PH);
  ctx.globalAlpha=1;
}

/* 朱色旧印 */
function seal(ctx,x,y,s,a=0.5){
  ctx.globalAlpha=a;
  ctx.fillStyle='#8d3a28';
  ctx.beginPath();
  if(ctx.roundRect) ctx.roundRect(x,y,s,s,s*0.12);
  else ctx.rect(x,y,s,s);
  ctx.fill();
  // 印文（白文，随机短画模拟篆意）
  ctx.fillStyle='#a8895f';
  for(let i=0;i<7;i++){
    const w=rr(0.08,0.16)*s, h=rr(0.25,0.6)*s;
    if(rng()<0.5) ctx.fillRect(x+rr(0.12,0.75)*s, y+rr(0.12,0.75)*s, w, h);
    else ctx.fillRect(x+rr(0.12,0.75)*s, y+rr(0.12,0.75)*s, h*0.7, w);
  }
  ctx.globalAlpha=1;
}

/* ---------------- 树 ---------------- */
/* s: 树高(px)。style: 0 夹叶密林, 1 松, 2 枯枝 */
function tree(ctx, x, y, s, style, dense=1){
  const col=INK(1);
  // 干：短、多半被叶遮
  const lean=rr(-0.16,0.16);
  const x1=x+lean*s*0.4, y1=y-s*0.5;
  const x2=x+lean*s*0.7+rr(-4,4), y2=y-s*0.85;
  strokeTaper(ctx,[[x,y],[x1,y1],[x2,y2]], s*0.075, col, 0.65);

  if(style===2){ // 鹿角枯枝
    for(let i=0;i<5;i++){
      const bx=lerp(x,x2,rr(0.4,0.9)), by=lerp(y,y2,rr(0.4,0.9));
      const ang=-Math.PI/2+rr(-0.9,0.9);
      const bl=s*rr(0.2,0.42);
      const ex=bx+Math.cos(ang)*bl, ey=by+Math.sin(ang)*bl;
      strokeTaper(ctx,[[bx,by],[ex,ey]], s*0.03, col, 0.7);
      for(const sg of [-0.5,0.5]){
        const mx=lerp(bx,ex,0.6), my=lerp(by,ey,0.6);
        strokeTaper(ctx,[[mx,my],[mx+Math.cos(ang+sg)*bl*0.5,my+Math.sin(ang+sg)*bl*0.5]], s*0.016, col, 0.65);
      }
    }
    return;
  }
  // 叶团位置：干的上段 + 顶，形成整体伞盖
  const tips=[[x2,y2]];
  for(let i=0;i<4;i++){
    const tt=rr(0.45,0.95);
    tips.push([lerp(x,x2,tt)+rr(-0.2,0.2)*s, lerp(y,y2,tt)+rr(-0.06,0.06)*s]);
  }
  for(const [tx,ty] of tips){
    if(style===1){ // 松针放射
      const n=16;
      for(let i=0;i<n;i++){
        const a=Math.PI+ (i/(n-1))*Math.PI + rr(-0.12,0.12);
        dab(ctx,tx,ty,a, s*rr(0.1,0.16), 1.1, col, rr(0.4,0.65));
      }
      mossClump(ctx,tx,ty,s*0.12,0.5,14);
    } else { // 点叶团
      mossClump(ctx,tx,ty, s*rr(0.3,0.42), 0.7*dense);
    }
  }
  // 根脚点叶
  mossClump(ctx,x,y-s*0.14,s*0.16,0.5*dense,18);
}

/* ---------------- 建筑 ---------------- */
function temple(ctx,x,y,s){ // s≈宽
  const col=INK(1);
  ctx.save(); ctx.translate(x,y);
  // 台基与墙
  ctx.globalAlpha=0.5; ctx.fillStyle=col;
  ctx.fillRect(-s*0.42,-s*0.3,s*0.84,s*0.3);
  // 柱间留白
  ctx.globalAlpha=0.8; ctx.fillStyle='#a8895f';
  for(let i=-1;i<=1;i++) ctx.fillRect(i*s*0.24-s*0.07,-s*0.26,s*0.14,s*0.2);
  // 两重檐
  ctx.fillStyle=col;
  for(const [ry,rw,rh] of [[-s*0.42,s*0.62,s*0.16],[-s*0.62,s*0.42,s*0.13]]){
    ctx.globalAlpha=0.85;
    ctx.beginPath();
    ctx.moveTo(-rw,ry+rh);
    ctx.quadraticCurveTo(-rw*0.55,ry-rh*0.4,0,ry);
    ctx.quadraticCurveTo(rw*0.55,ry-rh*0.4,rw,ry+rh);
    ctx.quadraticCurveTo(rw*0.6,ry+rh*0.55,0,ry+rh*0.9);
    ctx.quadraticCurveTo(-rw*0.6,ry+rh*0.55,-rw,ry+rh);
    ctx.fill();
  }
  // 脊
  ctx.globalAlpha=0.9; ctx.lineWidth=s*0.03; ctx.strokeStyle=col;
  ctx.beginPath(); ctx.moveTo(-s*0.2,-s*0.66); ctx.lineTo(s*0.2,-s*0.66); ctx.stroke();
  ctx.restore(); ctx.globalAlpha=1;
}

/* ---------------- 静态画 ---------------- */

const paint = document.createElement('canvas');
paint.width=PW; paint.height=PH;
const pctx = paint.getContext('2d');

function renderPainting(){
  const ctx=pctx;
  rng = mulberry32(20261003); // 固定种子

  silkGround(ctx);

  /* 远山（左，淡墨） */
  mountain(ctx,{pts:[[-20,700],[80,672],[160,712],[214,792],[188,900],[60,886],[-20,852]],
    toneTop:0.22,toneBot:0.08,cun:900,bbox:{x0:-20,y0:660,x1:230,y1:910},contourA:0.32,
    moss:[[70,678,26,0.5],[150,720,20,0.5]]});
  mountain(ctx,{pts:[[-20,872],[60,818],[140,846],[204,924],[244,1056],[250,1220],[236,1356],[0,1400],[-20,1240]],
    toneTop:0.24,toneBot:0.1,cun:1000,bbox:{x0:-20,y0:810,x1:255,y1:1405},contourA:0.22,
    moss:[[50,826,22,0.5],[130,852,18,0.45]]});

  /* 主峰（巨大、上浓下淡、竖向岩壁分面） */
  mountain(ctx,{
    pts:[[252,182],[268,150],[300,120],[322,110],[360,95],[390,86],[420,70],[455,64],
         [500,55],[540,58],[575,60],[615,72],[645,80],[672,98],[700,115],[718,142],
         [735,170],[748,205],[758,240],[762,275],[778,320],[786,365],[793,400],
         [800,445],[808,480],[814,525],[820,560],[824,610],[828,650],[832,705],
         [836,760],[838,820],[841,880],[843,940],[844,1000],[844,1065],[842,1130],
         [840,1195],[836,1260],[824,1315],[813,1360],[760,1400],[330,1400],[300,1388],
         [270,1370],[250,1340],[235,1300],[224,1250],[218,1200],[212,1140],[208,1080],
         [210,1015],[212,950],[208,875],[205,800],[201,730],[198,660],[194,595],
         [190,540],[188,485],[186,430],[190,378],[196,330],[205,290],[216,250],[232,215]],
    toneTop:0.78,toneBot:0.16,cun:7200,
    bbox:{x0:185,y0:50,x1:850,y1:1405},
    caps:[ // 山头浓荫
      [[300,118],[420,68],[575,60],[700,112],[740,178],[660,238],[510,214],[390,224],[288,196]],
      [[430,230],[560,222],[640,268],[560,320],[430,300]]],
    facets:[ // 竖向脊线分面
      {line:[[430,78],[452,300],[470,560],[490,860],[505,1180],[510,1380]],w:110,side:1,a:0.16},
      {line:[[610,75],[645,320],[680,600],[706,880],[720,1150],[724,1360]],w:95,side:1,a:0.18},
      {line:[[330,105],[310,380],[292,700],[280,1000],[272,1280]],w:85,side:-1,a:0.15},
      {line:[[735,180],[762,420],[792,700],[818,1000],[830,1280]],w:80,side:1,a:0.2},
      {line:[[520,60],[540,340],[560,700],[575,1050],[582,1350]],w:70,side:-1,a:0.11}],
    shade:(x,y)=>{
      let s=0.85;
      s += clamp((y-60)/1340,0,1)*-0.2 + 0.3;
      const edge=clamp(Math.abs(x-510)/330,0,1);
      s += edge*0.4;
      if(y<560) s*=1.5;
      // 皴的聚散：团块起伏
      s *= 0.7+0.6*Math.abs(Math.sin(x*0.011+y*0.004));
      return clamp(s,0.35,1.8);
    },
    moss:[[268,152,30],[335,112,32],[405,86,36],[470,68,38],[545,64,40],[615,82,34],[672,112,30],[712,167,24],
          [300,190,26],[380,140,24],[480,110,26],[560,108,24],[640,140,22],
          [420,210,30],[540,200,28],[640,220,24],[350,240,26]],
    contourA:0.62});

  /* 右峰（峰顶低于主峰，与主峰之间留出深谷） */
  mountain(ctx,{
    pts:[[892,205],[910,178],[928,155],[952,146],[975,140],[1000,148],[1022,158],[1042,182],
         [1058,212],[1068,250],[1078,290],[1085,340],[1090,390],[1093,450],[1095,510],
         [1091,590],[1088,660],[1090,740],[1092,820],[1088,900],[1085,980],[1082,1060],
         [1078,1140],[1066,1230],[1055,1310],[1020,1360],[980,1395],[905,1400],[890,1340],
         [878,1280],[872,1200],[868,1130],[865,1040],[864,950],[862,865],[860,780],
         [857,700],[856,620],[854,545],[852,470],[854,405],[858,340],[864,300],[872,260]],
    toneTop:0.6,toneBot:0.16,cun:3200,
    bbox:{x0:850,y0:135,x1:1095,y1:1405},
    caps:[[[928,160],[975,142],[1022,160],[1055,215],[1000,258],[940,240]]],
    facets:[
      {line:[[975,145],[960,400],[945,700],[930,1050],[918,1330]],w:70,side:-1,a:0.11},
      {line:[[1055,215],[1070,500],[1072,800],[1062,1150]],w:65,side:1,a:0.12}],
    shade:(x,y)=>{let s=0.8+clamp(Math.abs(x-972)/135,0,1)*0.4; if(y<450)s*=1.35;
      s*=0.8+0.4*Math.abs(Math.sin(x*0.013+y*0.005)); return clamp(s,0.4,1.6);},
    moss:[[930,160,26],[975,144,30],[1022,160,26],[1058,215,22],[1078,295,20],[898,240,22],[950,340,28],[1030,360,26]],
    contourA:0.58});

  /* 山缝（两峰之间深谷，瀑布挂其中） */
  {
    const g=ctx.createLinearGradient(0,220,0,1320);
    g.addColorStop(0,INK(0.8)); g.addColorStop(1,INK(0.45));
    ctx.fillStyle=g;
    const {path}=polyPath([[742,220],[852,330],[862,470],[866,650],[868,880],[866,1120],[860,1300],
                           [842,1300],[838,1100],[834,880],[826,650],[812,480],[786,350]],true,5);
    ctx.fill(path);
    // 缝内碎岩
    for(let i=0;i<110;i++){
      const y=rr(280,1280);
      dab(ctx, rr(806,864),y, Math.PI/2+rr(-0.5,0.5), rr(4,18), rr(0.8,2), INK(1), rr(0.15,0.45));
    }
  }

  /* 瀑布（静态底：留出亮线，动画叠加流光） */
  FALL_STATIC.forEach(seg=>{
    ctx.globalAlpha=seg[2]; ctx.strokeStyle=FALLC(1); ctx.lineWidth=seg[3];
    ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(seg[0],seg[1]); ctx.lineTo(seg[0]+seg[4],seg[1]+seg[5]); ctx.stroke();
  });
  ctx.globalAlpha=1;

  /* 山腰云根（把峰脚埋进雾里，不规则云带） */
  {
    const top=[];
    for(let x=-40;x<=1120;x+=60) top.push([x, 1300+Math.sin(x*0.01)*36+rr(-14,14)]);
    const band=[...top,[1120,1560],[-40,1560]];
    const {path}=polyPath(band,true,8);
    const g=ctx.createLinearGradient(0,1240,0,1520);
    g.addColorStop(0,'rgba(216,199,164,0.55)'); g.addColorStop(0.55,'rgba(216,199,164,0.75)'); g.addColorStop(1,'rgba(216,199,164,0.3)');
    ctx.fillStyle=g; ctx.fill(path);
    // 云带内浓淡
    for(let i=0;i<18;i++){
      const x=rr(80,1050), y=rr(1300,1520), r=rr(80,200);
      const rg=ctx.createRadialGradient(x,y,0,x,y,r);
      const light=rng()<0.6;
      rg.addColorStop(0,light?'rgba(226,208,172,0.3)':'rgba(120,100,72,0.12)');
      rg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=rg; ctx.fillRect(x-r,y-r,r*2,r*2);
    }
  }

  /* 中景台地（坡面） */
  mountain(ctx,{
    pts:[[300,1430],[380,1410],[460,1390],[540,1376],[620,1352],[710,1368],[800,1382],[880,1360],
         [950,1352],[1020,1372],[1090,1394],[1090,1640],[1000,1655],[880,1680],[760,1660],
         [640,1672],[520,1660],[400,1690],[330,1675],[300,1655]],
    toneTop:0.3,toneBot:0.16,cun:1700,
    bbox:{x0:295,y0:1348,x1:1090,y1:1705},contourA:0.3,
    shade:(x,y)=>0.65+clamp((y-1340)/360,0,1)*0.3,
    moss:[]});
  /* 左下缓坡 */
  mountain(ctx,{
    pts:[[0,1500],[160,1448],[300,1488],[360,1600],[300,1730],[120,1760],[0,1730]],
    toneTop:0.22,toneBot:0.13,cun:800,
    bbox:{x0:-5,y0:1440,x1:365,y1:1765},contourA:0.24,moss:[]});

  /* 台地边坡脚碎石带 */
  for(let i=0;i<40;i++){
    rock(ctx, rr(180,1080), rr(1640,1760), rr(14,40), 0.5);
  }

  /* 中景密林：先铺连绵树冠底层 */
  {
    const canopy=[];
    for(let x=330;x<=1100;x+=46){
      canopy.push([x, 1505+Math.sin(x*0.011)*38+rr(-16,16)]);
    }
    canopy.push([1090,1660],[980,1685],[860,1665],[740,1690],[620,1670],[500,1695],[400,1670],[330,1640]);
    const {path}=polyPath(canopy,true,8);
    ctx.fillStyle=INK(0.32); ctx.fill(path);
    ctx.save(); ctx.clip(path);
    for(let i=0;i<1600;i++){
      const x=rr(320,1100), y=rr(1460,1700);
      if(!ctx.isPointInPath(path,x,y)) continue;
      if(rng()<0.7){ctx.globalAlpha=rr(0.2,0.55);ctx.fillStyle=INK(1);
        ctx.beginPath();ctx.arc(x,y,rr(1,3.2),0,6.284);ctx.fill();}
      else dab(ctx,x,y,rr(0,6.28),rr(2,6),rr(0.8,1.6),INK(1),rr(0.2,0.5));
    }
    ctx.restore(); ctx.globalAlpha=1;
  }
  /* 寺院藏在林中（树隙露出两重檐） */
  temple(ctx, 872, 1452, 96);
  temple(ctx, 952, 1480, 64);
  const forest=[[430,1560],[520,1530],[600,1550],[680,1510],[760,1540],[840,1520],[930,1550],
                [1010,1530],[1060,1580],[470,1610],[560,1600],[650,1620],[730,1600],[820,1620],
                [900,1600],[980,1620],[1050,1650],[380,1620],[500,1680],[620,1690],[740,1690],
                [860,1680],[990,1690],[1080,1620],[340,1560],[460,1505],[580,1490],[700,1478],
                [790,1500],[890,1495],[1000,1490],[1070,1520]];
  for(const [tx,ty] of forest){
    const st = rng()<0.18?1:(rng()<0.12?2:0);
    tree(ctx, tx+rr(-26,26), ty+rr(-14,14), rr(85,150), st);
  }
  /* 近景大树（左下、路右） */
  for(const [tx,ty,ts,st] of [[330,1740,190,0],[420,1780,170,0],[505,1760,150,1],
                              [260,1690,140,2],[980,1760,150,0],[1050,1720,170,0],
                              [920,1700,120,1]]){
    tree(ctx,tx,ty,ts,st,1.15);
  }
  /* 林下暗脚 + 土坡皴 */
  {
    ctx.globalAlpha=0.22; ctx.strokeStyle=INK(1); ctx.lineWidth=26; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(300,1705);
    ctx.bezierCurveTo(500,1725,800,1700,1090,1710); ctx.stroke();
    ctx.globalAlpha=1;
    for(let i=0;i<160;i++){
      const x=rr(200,1090), y=rr(1710,1840);
      dab(ctx,x,y, Math.PI/2+rr(-1,1)*0.8, rr(4,14), rr(0.8,1.6), INK(1), rr(0.06,0.2));
    }
    // 坡脚零星灌木
    for(const [bx,by] of [[560,1790],[680,1810],[800,1795],[460,1820],[930,1830],[300,1800]]){
      mossClump(ctx,bx,by,rr(10,20),0.55,26);
      dab(ctx,bx,by+6,-Math.PI/2+rr(-0.3,0.3),rr(8,16),1.2,INK(1),0.5);
    }
  }

  /* 溪 */
  drawStream(ctx);

  /* 山径（驼队走的） */
  drawPath(ctx);

  /* 前景巨石（左右两丛，溪穿其间） */
  for(const [rx,ry,rs,rd] of [[70,2050,190,0.85],[250,2090,160,0.8],[400,2110,140,0.78],
                              [160,1960,110,0.75],[-20,1980,90,0.72],[330,1995,80,0.7],
                              [760,2120,150,0.8],[920,2090,140,0.78],[1050,2110,130,0.78],
                              [990,1995,95,0.72],[860,2020,70,0.68],[600,2150,120,0.75]]){
    rock(ctx,rx,ry,rs,rd);
  }
  /* 石隙草木 */
  for(let i=0;i<40;i++){
    const x=rr(0,1090), y=rr(1900,2160);
    dab(ctx,x,y,-Math.PI/2+rr(-0.5,0.5),rr(4,14),rr(0.7,1.4),INK(1),rr(0.2,0.5));
  }

  aging(ctx);
  seal(ctx, 26, 40, 34, 0.42);
  seal(ctx, 26, 130, 28, 0.34);
  seal(ctx, 1036, 1560, 30, 0.4);
}

/* 瀑布静态段 [x,y,a,w,dx,dy]（亮线分段，带断续） */
const FALL_STATIC=[];
{
  // 连续淡底
  FALL_STATIC.push([838,305,0.35,2.6,0,985]);
  let y=310;
  const fx=(yy)=>838+Math.sin(yy*0.008)*4;
  while(y<1290){
    const len=rr(60,150);
    FALL_STATIC.push([fx(y),y,rr(0.5,0.8),rr(2.6,4), (fx(y+len)-fx(y)), len]);
    y+=len+rr(2,10);
  }
  // 底部溅落短笔
  for(let i=0;i<16;i++){
    FALL_STATIC.push([rr(822,858),rr(1290,1340),rr(0.3,0.6),rr(1,2),rr(-4,4),rr(6,16)]);
  }
}

function drawStream(ctx){
  // 路侧小水面（右上）
  const w1=[[640,1905],[1080,1915],[1080,2005],[700,2000]];
  // 底部横溪（穿过前景石间）
  const w2=[[0,2110],[280,2095],[520,2105],[760,2085],[1080,2100],[1080,2160],[0,2160]];
  for(const poly of [w2,w1]){
    const {path}=polyPath(poly,true,4);
    const g=ctx.createLinearGradient(0,poly[0][1],0,2160);
    g.addColorStop(0,'#b2986e'); g.addColorStop(1,'#9c805a');
    ctx.fillStyle=g; ctx.globalAlpha=0.9; ctx.fill(path); ctx.globalAlpha=1;
    ctx.save(); ctx.clip(path);
    const top=Math.min(...poly.map(p=>p[1]));
    for(let i=0;i<200;i++){
      const y=rr(top+6,2160);
      const x=rr(poly[0][0]-10,1090);
      dab(ctx,x,y, rr(-0.05,0.05), rr(10,52), rr(0.7,1.6), INK(1), rr(0.06,0.22));
      if(rng()<0.22) dab(ctx,x,y+rr(3,10),0,rr(6,22),1,SILK_L(1),rr(0.15,0.32));
    }
    ctx.restore();
    // 岸线浓墨
    ctx.globalAlpha=0.45; ctx.strokeStyle=INK(1); ctx.lineWidth=2;
    ctx.stroke(polyPath([poly[0],poly[1],poly[2]],false,2).path); ctx.globalAlpha=1;
  }
  // 石间跌水（w1 泻入 w2）
  {
    const {path}=polyPath([[596,1998],[664,1994],[650,2100],[570,2090]],true,4);
    ctx.save(); ctx.clip(path);
    for(let i=0;i<24;i++){
      const x=rr(572,660);
      dab(ctx,x,rr(1996,2030),Math.PI/2+rr(-0.18,0.18),rr(24,70),rr(1,2.2),FALLC(1),rr(0.4,0.7));
    }
    ctx.restore();
    ctx.globalAlpha=0.45; ctx.strokeStyle=INK(1); ctx.lineWidth=2; ctx.stroke(path); ctx.globalAlpha=1;
  }
  // 水中汀石
  for(let i=0;i<12;i++) rock(ctx, rr(60,1060), rr(2090,2150), rr(10,26), 0.55);
}

/* 山径 polyline（也用于驮队行走） */
const PATH_PTS=[[1120,1865],[980,1880],[860,1872],[740,1890],[600,1906],[470,1922],
                [340,1942],[220,1978],[120,2018],[20,2072],[-60,2126]];
const PATH_LENS=[]; let PATH_LEN=0;
{
  for(let i=0;i<PATH_PTS.length-1;i++){
    const d=Math.hypot(PATH_PTS[i+1][0]-PATH_PTS[i][0],PATH_PTS[i+1][1]-PATH_PTS[i][1]);
    PATH_LENS.push(d); PATH_LEN+=d;
  }
}
function pathPos(s){
  s=clamp(s,0,PATH_LEN-0.01);
  let i=0; while(s>PATH_LENS[i]){s-=PATH_LENS[i];i++;}
  const t=s/PATH_LENS[i];
  return [lerp(PATH_PTS[i][0],PATH_PTS[i+1][0],t), lerp(PATH_PTS[i][1],PATH_PTS[i+1][1],t),
          Math.atan2(PATH_PTS[i+1][1]-PATH_PTS[i][1], PATH_PTS[i+1][0]-PATH_PTS[i][0])];
}

function drawPath(ctx){
  // 路面：绢色提亮宽带
  const {path}=polyPath(PATH_PTS,false,3);
  ctx.save();
  ctx.strokeStyle=SILK_L(1); ctx.lineCap='round'; ctx.lineJoin='round';
  ctx.globalAlpha=0.34; ctx.lineWidth=34; ctx.stroke(path);
  ctx.globalAlpha=0.4; ctx.lineWidth=20; ctx.stroke(path);
  ctx.restore();
  // 路缘草丛碎笔
  for(let i=0;i<PATH_LEN;i+=9){
    const [x,y]=pathPos(i);
    if(rng()<0.55) dab(ctx,x+rr(-4,4),y+rr(8,16),-Math.PI/2+rr(-0.5,0.5),rr(3,9),rr(0.6,1.2),INK(1),rr(0.15,0.4));
    if(rng()<0.3)  dab(ctx,x+rr(-4,4),y-rr(10,18),-Math.PI/2+rr(-0.5,0.5),rr(3,8),rr(0.6,1.2),INK(1),rr(0.12,0.3));
  }
}

/* 皴擦巨石 */
function rock(ctx,x,y,r,dark){
  const pts=[];
  const n=13;
  for(let i=0;i<n;i++){
    const a=i/n*6.284;
    const rad=r*(0.88+0.14*Math.sin(a*3+rr(0,2))+rr(-0.06,0.06));
    pts.push([x+Math.cos(a)*rad, y+Math.sin(a)*rad*0.58]);
  }
  const {path}=polyPath(pts,true,5);
  const g=ctx.createLinearGradient(0,y-r*0.6,0,y+r*0.6);
  g.addColorStop(0,INK(dark*0.8)); g.addColorStop(0.55,INK(Math.min(1,dark*1.02))); g.addColorStop(1,INK(Math.min(1,dark*1.2)));
  ctx.fillStyle=g; ctx.fill(path);
  ctx.save(); ctx.clip(path);
  // 顶面亮笔
  ctx.globalAlpha=0.07; ctx.fillStyle=SILK_L(1);
  ctx.fillRect(x-r,y-r*0.62,r*2,r*0.45);
  // 弧面皴（沿石的轮廓方向）
  for(let i=0;i<r*1.4;i++){
    const a=rr(0,6.284), d=Math.pow(rng(),0.6)*r*0.9;
    const px=x+Math.cos(a)*d, py=y+Math.sin(a)*d*0.6;
    dab(ctx,px,py, a+Math.PI/2+rr(-0.5,0.5), rr(4,r*0.26), rr(0.8,2), INK(1), rr(0.12,0.32));
  }
  // 石面裂隙（焦墨一两笔）
  for(let i=0;i<2;i++){
    const a=rr(0,6.284);
    const px=x+Math.cos(a)*r*rr(0.2,0.5), py=y+Math.sin(a)*r*0.4;
    dab(ctx,px,py, a+Math.PI/2+rr(-0.4,0.4), r*rr(0.4,0.75), rr(1.6,2.6), INK(1), rr(0.3,0.5));
  }
  ctx.restore();
  ctx.globalAlpha=0.65; ctx.strokeStyle=INK(1); ctx.lineWidth=2.8; ctx.stroke(path);
  ctx.globalAlpha=1;
  if(rng()<0.8) mossClump(ctx,x+rr(-r*0.3,r*0.3),y-r*0.5,r*0.2,0.55);
}

renderPainting();

/* ================= 动态层 ================= */

const cv=document.getElementById('cv');
const ctx=cv.getContext('2d');
const capEl=document.getElementById('cap');

/* --- 雾 --- */
const mistBand=[], mistFoot=[];
for(let i=0;i<16;i++) mistBand.push({x:rr(-80,PW+80),y:rr(1080,1470),r:rr(140,300),sp:rr(0.05,0.14),ph:rr(0,6.28),amp:rr(50,120)});
for(let i=0;i<34;i++) mistFoot.push({x:rr(-60,PW+60),y:rr(1560,2220),r:rr(150,380),sp:rr(0.04,0.1),ph:rr(0,6.28),amp:rr(40,110)});

function drawMistSet(ctx,set,d,t){
  if(d<=0.005) return;
  for(const b of set){
    const x=b.x+Math.sin(t*b.sp+b.ph)*b.amp + Math.sin(t*0.05+b.ph*2)*30;
    const y=b.y+Math.cos(t*b.sp*0.7+b.ph)*18;
    const g=ctx.createRadialGradient(x,y,0,x,y,b.r);
    g.addColorStop(0,MISTC(d*0.42)); g.addColorStop(0.55,MISTC(d*0.2)); g.addColorStop(1,MISTC(0));
    ctx.fillStyle=g; ctx.fillRect(x-b.r,y-b.r,b.r*2,b.r*2);
  }
}

/* --- 瀑布流光 --- */
function drawFallFlow(ctx,t,flow){
  if(flow<=0.02) return;
  ctx.save();
  ctx.beginPath(); ctx.rect(814,280,52,1030); ctx.clip();
  for(let i=0;i<7;i++){
    const y=300+((t*130+i*150) % 1010);
    const x=838+Math.sin(y*0.008)*4;
    ctx.globalAlpha=flow*rr(0.4,0.8);
    ctx.strokeStyle=FALLC(1); ctx.lineWidth=rr(1.4,2.6); ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+Math.sin((y+52)*0.008)*5-x+2, y+52); ctx.stroke();
  }
  ctx.restore();
  // 瀑脚水雾
  const g=ctx.createRadialGradient(838,1300,0,838,1300,60);
  g.addColorStop(0,MISTC(0.3*flow)); g.addColorStop(1,MISTC(0));
  ctx.fillStyle=g; ctx.fillRect(778,1240,120,120);
  ctx.globalAlpha=1;
}

/* --- 溪水微光 --- */
function drawStreamFlow(ctx,t){
  ctx.save(); ctx.globalAlpha=0.5;
  for(let i=0;i<10;i++){
    const y=2005+((t*8+i*17)%150);
    const x=320+((i*173+t*22)%760);
    ctx.globalAlpha=0.10+0.06*Math.sin(t*2+i);
    ctx.strokeStyle=FALLC(1); ctx.lineWidth=1.4; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+30,y+1); ctx.stroke();
  }
  ctx.restore(); ctx.globalAlpha=1;
}

/* --- 驮队 --- */
// 成员：[类型, 距领队距离]
const CARAVAN=[
  ['person',0],['mule',72],['mule',134],['person',188],['mule',248],['mule',308],['rear',368]
];

function drawMule(ctx,x,y,s,ph,a){
  ctx.save(); ctx.translate(x,y); ctx.scale(-s,s); // 面朝左
  ctx.globalAlpha=a;
  const col='#241f18';
  ctx.fillStyle=col; ctx.strokeStyle=col;
  // 腿
  ctx.lineWidth=0.09; ctx.lineCap='round';
  const lp=[-0.32,-0.1,0.12,0.34];
  for(let i=0;i<4;i++){
    const sw=Math.sin(ph*2+i*1.6)*0.09;
    ctx.beginPath(); ctx.moveTo(lp[i],-0.32);
    ctx.lineTo(lp[i]+sw,-0.02); ctx.stroke();
  }
  // 身
  ctx.beginPath(); ctx.ellipse(0,-0.44,0.46,0.24,0,0,6.284); ctx.fill();
  // 颈+头
  ctx.beginPath(); ctx.moveTo(0.34,-0.5); ctx.lineTo(0.62,-0.62); ctx.lineWidth=0.13; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0.68,-0.64,0.12,0.09,0.3,0,6.284); ctx.fill();
  // 耳
  ctx.lineWidth=0.045;
  ctx.beginPath(); ctx.moveTo(0.66,-0.7); ctx.lineTo(0.62,-0.84); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0.72,-0.71); ctx.lineTo(0.72,-0.85); ctx.stroke();
  // 尾
  ctx.beginPath(); ctx.moveTo(-0.44,-0.5); ctx.quadraticCurveTo(-0.6,-0.42,-0.58,-0.24); ctx.lineWidth=0.05; ctx.stroke();
  // 驮架货
  ctx.globalAlpha=a*0.9;
  ctx.fillStyle='#3a2f22';
  ctx.fillRect(-0.24,-0.86,0.5,0.3);
  ctx.strokeStyle='#241f18'; ctx.lineWidth=0.04;
  ctx.beginPath(); ctx.moveTo(-0.24,-0.62); ctx.lineTo(-0.2,-0.4); ctx.moveTo(0.26,-0.62); ctx.lineTo(0.24,-0.4); ctx.stroke();
  ctx.restore();
}

function drawPerson(ctx,x,y,s,ph,a,gaze=false,staff=false){
  ctx.save(); ctx.translate(x,y); ctx.scale(-s,s);
  ctx.globalAlpha=a;
  const col='#241f18';
  ctx.fillStyle=col; ctx.strokeStyle=col;
  // 腿（行走摆动 / 伫立并拢）
  ctx.lineWidth=0.075; ctx.lineCap='round';
  const sw=gaze?0.02:Math.sin(ph*2)*0.12;
  ctx.beginPath(); ctx.moveTo(-0.03,-0.42); ctx.lineTo(-0.03-sw,-0.02); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0.03,-0.42); ctx.lineTo(0.03+sw,-0.02); ctx.stroke();
  // 袍
  ctx.beginPath();
  ctx.moveTo(-0.16,-0.4);
  ctx.quadraticCurveTo(-0.2,-0.72,-0.08,-0.82);
  ctx.lineTo(0.1,-0.82); ctx.quadraticCurveTo(0.2,-0.7,0.16,-0.4);
  ctx.closePath(); ctx.fill();
  // 头 + 笠
  const hy=gaze?-1.02:-0.95, tilt=gaze?0.1:0;
  ctx.beginPath(); ctx.arc(0.02+tilt,hy,0.09,0,6.284); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-0.12+tilt,hy-0.03); ctx.lineTo(0.16+tilt,hy-0.03); ctx.lineTo(0.02+tilt,hy-0.16); ctx.closePath(); ctx.fill();
  if(staff){
    ctx.lineWidth=0.04;
    ctx.beginPath(); ctx.moveTo(0.22,-0.9); ctx.lineTo(0.3,-0.02); ctx.stroke();
  }
  ctx.restore();
}

/* --- 鸟 --- */
const birds=[];
function spawnBirds(x,y,n,spread){
  for(let i=0;i<n;i++){
    birds.push({
      x:x+rr(-30,30), y:y+rr(-14,14),
      vx:rr(-spread,spread), vy:rr(-78,-48),
      ph:rr(0,6.28), fl:rr(7,11), life:0, max:rr(6,10), s:rr(7,11)
    });
  }
}
function drawBird(ctx,b){
  const w=Math.sin(b.life*b.fl+b.ph)*b.s*0.42;
  ctx.strokeStyle=INK(1); ctx.lineWidth=b.s*0.2; ctx.lineCap='round';
  ctx.globalAlpha=clamp(1.2-b.life/b.max,0,1)*0.85;
  ctx.beginPath();
  ctx.moveTo(b.x-b.s,b.y+w*0.4);
  ctx.quadraticCurveTo(b.x-b.s*0.4,b.y-w,b.x,b.y);
  ctx.quadraticCurveTo(b.x+b.s*0.4,b.y-w,b.x+b.s,b.y+w*0.4);
  ctx.stroke();
}

/* --- 钟声涟漪 --- */
const rings=[];
function bellRing(x,y){ rings.push({x,y,r:8,a:0.5}); }

/* --- 落款 --- */
function drawSignature(ctx,a){
  ctx.save();
  ctx.globalAlpha=a*0.6;
  ctx.fillStyle='#2b2419';
  ctx.font='42px "Kaiti SC","STKaiti","KaiTi","DFKai-SB",serif';
  ctx.textAlign='center'; ctx.textBaseline='middle';
  // 微微倾斜如藏叶间
  ctx.translate(990,1692); ctx.rotate(-0.06);
  ctx.fillText('范',0,0); ctx.fillText('宽',2,52);
  ctx.restore();
}

/* ================= 时间线 ================= */

const LOOP=46;
const BELLT=23;
const ACTS=[
  {a:0,  b:10, text:'晨雾未散，溪山初醒。'},
  {a:10, b:22, text:'铃铎轻响，商旅沿溪西行。'},
  {a:22, b:33, text:'山寺钟鸣，惊起一林飞鸟。'},
  {a:33, b:46, text:'驮队入山，雾合苍茫。'},
];
const SPD=56;                 // 驮队 px/s
const S_ENTER=10;             // 领队入画时刻

const urlT=parseFloat(new URLSearchParams(location.search).get('t')||'0');
let t0=performance.now()/1000 - urlT;
let bellFired=false, ring2=false, ring3=false;
let rearHold=null, rearStart=0;
let curAct=-1;

function frame(){
  const now=performance.now()/1000;
  const t=(now-t0)%LOOP;
  window.__dbg={t,curAct,cap:capEl.style.opacity};

  /* 各幕参数 */
  let footD, bandD, flow;
  if(t<1){ footD=0.62; bandD=0.5; flow=0; }
  else if(t<9){ const k=smooth((t-1)/8); footD=lerp(0.62,0.15,k); bandD=lerp(0.5,0.24,k); flow=smooth((t-3)/5); }
  else if(t<38){ footD=0.15+0.03*Math.sin(t*0.4); bandD=0.24+0.04*Math.sin(t*0.23); flow=1; }
  else if(t<44.5){ const k=smooth((t-38)/6.5); footD=lerp(0.15,0.8,k); bandD=lerp(0.24,0.5,k); flow=1; }
  else { footD=lerp(0.8,0.62,(t-44.5)/1.5); bandD=0.5; flow=1; }

  /* 画心缩放定位 */
  ctx.setTransform(1,0,0,1,0,0);
  ctx.fillStyle='#14100c'; ctx.fillRect(0,0,cv.width,cv.height);
  const k=view.scale;
  ctx.setTransform(k,0,0,k,view.x,view.y);

  ctx.drawImage(paint,0,0);
  ctx.save();
  ctx.beginPath(); ctx.rect(0,0,PW,PH); ctx.clip();

  /* 瀑 */
  drawFallFlow(ctx,t,flow);
  drawStreamFlow(ctx,t);

  /* 驮队 */
  const sL=(t-S_ENTER)*SPD;
  if(sL>-60 && sL<PATH_LEN+420){
    // 押后人的停顿与追赶
    const target=sL-368;
    if(t<BELLT){ rearHold=target; rearStart=target; }
    else if(t<BELLT+4.6){ /* hold：伫立望山 */ }
    else { rearHold=Math.min(target, rearStart+110*(t-(BELLT+4.6))); }
    if(rearHold===null) rearHold=target;
    const gazing=(t>=BELLT&&t<BELLT+4.6);

    for(const [ty,off] of CARAVAN){
      const s=(ty==='rear')?rearHold:sL-off;
      if(s<0||s>PATH_LEN) continue;
      const [x,y,ang]=pathPos(s);
      // 将没入山：末端渐隐
      const fade=clamp((PATH_LEN-s)/70,0,1);
      const a=clamp(s/40,0,1)*fade*0.92;
      if(a<=0.02) continue;
      const ph=now*3+off;
      const bob=Math.sin(now*6+off)*1.2;
      if(ty==='mule') drawMule(ctx,x,y+bob*0.5,40,ph,a);
      else drawPerson(ctx,x,y+bob*0.5,36,ph,a, ty==='rear'&&gazing, ty==='person'&&off===0);
    }
  }

  /* 钟 */
  if(t>=BELLT&&!bellFired){ bellFired=true; spawnBirds(872,1420,14,70); bellRing(872,1440); }
  if(t>=BELLT+1.1&&!ring2){ ring2=true; bellRing(872,1440); }
  if(t>=BELLT+2.2&&!ring3){ ring3=true; spawnBirds(720,1390,7,45); bellRing(872,1440); }
  if(t<BELLT-1){ bellFired=ring2=ring3=false; }

  const dt=1/60;
  for(const r of rings){ r.r+=170*dt; r.a*=Math.pow(0.94,1); }
  for(let i=rings.length-1;i>=0;i--){
    const r=rings[i];
    if(r.a<0.02||r.r>340){rings.splice(i,1);continue;}
    ctx.globalAlpha=r.a;
    ctx.strokeStyle=INK(1); ctx.lineWidth=1.6;
    ctx.beginPath(); ctx.ellipse(r.x,r.y,r.r*1.5,r.r*0.55,0,0,6.284); ctx.stroke();
  }
  ctx.globalAlpha=1;

  /* 鸟 */
  for(let i=birds.length-1;i>=0;i--){
    const b=birds[i]; b.life+=dt;
    if(b.life>b.max){birds.splice(i,1);continue;}
    b.vx+=Math.sin(b.life*1.3+b.ph)*8*dt;
    b.vy-=6*dt;
    b.x+=b.vx*dt; b.y+=b.vy*dt;
    drawBird(ctx,b);
  }
  ctx.globalAlpha=1;

  /* 雾（盖在人物之上） */
  drawMistSet(ctx,mistBand,bandD,t);
  drawMistSet(ctx,mistFoot,footD,t);

  /* 落款 */
  const sigA= t>41? smooth((t-41)/3.2) : 0;
  if(sigA>0) drawSignature(ctx,sigA);
  ctx.restore();

  /* 装裱细边 */
  ctx.globalAlpha=0.85; ctx.strokeStyle='#241c12'; ctx.lineWidth=3;
  ctx.strokeRect(1.5,1.5,PW-3,PH-3);
  ctx.globalAlpha=0.3; ctx.lineWidth=1;
  ctx.strokeRect(8,8,PW-16,PH-16);
  ctx.globalAlpha=1;

  /* 字幕 */
  let ai=-1;
  for(let i=0;i<ACTS.length;i++) if(t>=ACTS[i].a&&t<ACTS[i].b){ai=i;break;}
  if(ai!==curAct){
    curAct=ai;
    if(ai>=0){ capEl.textContent=ACTS[ai].text; }
  }
  if(ai>=0){
    const A=ACTS[ai];
    const fade=Math.min(smooth((t-A.a)/1.2), smooth((A.b-t)/1.2));
    capEl.style.opacity=clamp(fade,0,1)*0.95;
  } else capEl.style.opacity=0;

  requestAnimationFrame(frame);
}

/* ================= 视口 ================= */
const view={x:0,y:0,scale:1};
function resize(){
  const dpr=Math.min(window.devicePixelRatio||1,2);
  const w=window.innerWidth,h=window.innerHeight;
  cv.width=w*dpr; cv.height=h*dpr;
  cv.style.width=w+'px'; cv.style.height=h+'px';
  const s=Math.min(cv.width/PW, cv.height/PH);
  view.scale=s;
  view.x=(cv.width-PW*s)/2;
  view.y=(cv.height-PH*s)/2;
}
window.addEventListener('resize',resize);
resize();
requestAnimationFrame(frame);
})();
