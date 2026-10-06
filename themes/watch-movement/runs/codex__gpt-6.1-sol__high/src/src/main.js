import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import './style.css';

const TAU = Math.PI * 2;
const canvas = document.querySelector('#scene');
const viewport = document.querySelector('#viewport');
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setClearColor(0xf2f0e9, 0);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = .95;
const environment = new THREE.PMREMGenerator(renderer);
const room = new RoomEnvironment();
const env = environment.fromScene(room, .04);
scene.environment = env.texture;
scene.environmentIntensity = .85;
room.dispose();
environment.dispose();
const camera = new THREE.PerspectiveCamera(32, 1, .1, 100);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = .065;
controls.minDistance = 8;
controls.maxDistance = 28;
controls.maxPolarAngle = Math.PI * .8;
controls.enablePan = false;
controls.rotateSpeed = .65;
controls.zoomSpeed = .7;
controls.target.set(0, 0, .5);
camera.up.set(0, 0, 1);
const defaultDirection = new THREE.Vector3(.18, -.51, 1).normalize();
let cameraTween = null;
let lastAspect = 1;
function frameCamera(top = false, animated = false) {
  const aspect = viewport.clientWidth / viewport.clientHeight;
  const distance = Math.max(18.5, 18.5 / Math.max(.63, aspect));
  const target = new THREE.Vector3(0, 0, .5);
  const position = target.clone().add((top ? new THREE.Vector3(0, -.001, 1) : defaultDirection).clone().multiplyScalar(distance));
  if (animated) cameraTween = { start: camera.position.clone(), end: position, targetStart: controls.target.clone(), targetEnd: target, t: 0 };
  else { camera.position.copy(position); controls.target.copy(target); controls.update(); }
}
const ambient = new THREE.HemisphereLight(0xffffff, 0x6d6d53, .75);
scene.add(ambient);
const key = new THREE.DirectionalLight(0xfff4db, 2.8);
key.position.set(-5, 6, 12); key.castShadow = true;
key.shadow.mapSize.set(2048,2048);
Object.assign(key.shadow.camera,{left:-8,right:8,top:8,bottom:-8,near:1,far:30});
key.shadow.normalBias = .025; key.shadow.bias = -.0002;
scene.add(key);
const fill = new THREE.DirectionalLight(0xc9d7de, 1.3); fill.position.set(7,-4,8);scene.add(fill);
const gold = new THREE.MeshStandardMaterial({color:0xad8b43,metalness:.86,roughness:.30});
const goldEdge = new THREE.MeshStandardMaterial({color:0xcab47c,metalness:.92,roughness:.22});
const steel = new THREE.MeshStandardMaterial({color:0xa9b0a7,metalness:.91,roughness:.26});
const darkSteel = new THREE.MeshStandardMaterial({color:0x373d36,metalness:.8,roughness:.4});
const blue = new THREE.MeshStandardMaterial({color:0x153755,metalness:.86,roughness:.23});
const ruby = new THREE.MeshPhysicalMaterial({color:0x8a1941,metalness:.25,roughness:.13,clearcoat:1});
const plateMat = new THREE.MeshStandardMaterial({color:0x39483e,metalness:.65,roughness:.48});
const model = new THREE.Group();scene.add(model);
const floor = new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.ShadowMaterial({opacity:.1}));floor.position.z=-.35;floor.receiveShadow=true;scene.add(floor);
function mesh(geo,mat,parent=model,x=0,y=0,z=0){const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
function cylinder(r,h,mat,parent,x=0,y=0,z=0,r2=r){const m=mesh(new THREE.CylinderGeometry(r,r2,h,64),mat,parent,x,y,z);m.rotation.x=Math.PI/2;return m;}
function annulus(outer,inner,h,mat,parent=model,x=0,y=0,z=0){const shape=new THREE.Shape();shape.absarc(0,0,outer,0,TAU,false);const hole=new THREE.Path();hole.absarc(0,0,inner,0,TAU,true);shape.holes.push(hole);return mesh(new THREE.ExtrudeGeometry(shape,{depth:h,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.025,bevelThickness:.018,curveSegments:96}),mat,parent,x,y,z);}
function tube(points,r,mat,parent=model){return mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),Math.max(30,points.length*2),r,6,false),mat,parent);}
function screw(x,y,z,parent=model,size=.105){cylinder(size,.085,steel,parent,x,y,z);const head=cylinder(size*.8,.045,blue,parent,x,y,z+.046);const slot=mesh(new THREE.BoxGeometry(size*1.35,.024,.009),darkSteel,parent,x,y,z+.074);slot.rotation.z=.6;return head;}
function bearing(x,y,z,parent=model){annulus(.16,.105,.047,goldEdge,parent,x,y,z);cylinder(.103,.055,ruby,parent,x,y,z+.03);cylinder(.032,.075,steel,parent,x,y,z+.06);}
// All geometry and surface detail are generated here, without downloaded visual assets.
cylinder(4.5,.26,plateMat,model,0,0,-.07);
annulus(4.62,4.38,.20,steel,model,0,0,-.10);
annulus(4.56,4.49,.035,darkSteel,model,0,0,.15);
annulus(4.39,4.35,.026,goldEdge,model,0,0,.075);
for(let i=0;i<120;i++){const a=i*TAU/120;const mark=mesh(new THREE.BoxGeometry(.023,i%5===0?.16:.07,.009),i%5===0?goldEdge:darkSteel,model,4.26*Math.cos(a),4.26*Math.sin(a),.07);mark.rotation.z=a-Math.PI/2;}
// Fine concentric engine-turned engraving on the exposed main plate.
for(let i=0;i<34;i++){const r=.18+i*.118;const g=new THREE.BufferGeometry().setFromPoints(Array.from({length:161},(_,j)=>new THREE.Vector3(r*Math.cos(j*TAU/160),r*Math.sin(j*TAU/160),.069)));model.add(new THREE.LineLoop(g,new THREE.LineBasicMaterial({color:0x9ca68e,transparent:true,opacity:.12})));}
for(let i=0;i<8;i++){const a=(i+.3)*TAU/8;screw(4.04*Math.cos(a),4.04*Math.sin(a),.18);annulus(.23,.15,.025,darkSteel,model,4.04*Math.cos(a),4.04*Math.sin(a),.12);}
function engraving(text,x,y,width){const c=document.createElement('canvas');c.width=1024;c.height=128;const ctx=c.getContext('2d');ctx.font='36px Georgia';ctx.textAlign='center';ctx.fillStyle='#d2ceb3';ctx.fillText(text,512,74);const tx=new THREE.CanvasTexture(c);tx.colorSpace=THREE.SRGBColorSpace;const m=mesh(new THREE.PlaneGeometry(width,width/8),new THREE.MeshBasicMaterial({map:tx,transparent:true,depthWrite:false}),model,x,y,.11);return m;}
engraving('A T E L I E R   ·   C A L I B R E   0 1',0,3.25,3.5);
engraving('2.5 Hz  ·  18 000 A/h',2.35,-2.6,1.55);
// Cut-out bridge, leaving the entire transmission visible.
const bridgeShape=new THREE.Shape();bridgeShape.moveTo(-1.2,3.35);bridgeShape.bezierCurveTo(.3,4.05,2.9,3.65,3.6,2.1);bridgeShape.lineTo(3.25,1.85);bridgeShape.bezierCurveTo(2.4,3.12,.6,3.5,-1.25,3.02);bridgeShape.closePath();
const bridge=mesh(new THREE.ExtrudeGeometry(bridgeShape,{depth:.18,bevelEnabled:true,bevelSize:.055,bevelThickness:.045,bevelSegments:3}),steel,model,0,0,.42);
screw(-.95,3.27,.7);screw(3.24,2.19,.7);
// Involute teeth share the same module at each meshing pair; axis separation is the sum of pitch radii.
function gearGeometry(teeth,r,depth=.10,spokes=5,solid=false){
  const module=2*r/teeth,root=r-1.25*module,base=r*Math.cos(Math.PI/9),outer=r+module;
  const inv=q=>{const a=Math.acos(Math.min(1,base/q));return Math.tan(a)-a;};
  const invPitch=inv(r),half=q=>Math.PI/(2*teeth)+invPitch-(q>base?inv(q):0);
  const shape=new THREE.Shape();
  const point=(q,a,first=false)=>{if(first)shape.moveTo(q*Math.cos(a),q*Math.sin(a));else shape.lineTo(q*Math.cos(a),q*Math.sin(a));};
  for(let n=0;n<teeth;n++){
    const a=n*TAU/teeth;
    point(root,a-half(base),n===0);
    for(let j=0;j<=5;j++){const q=Math.max(root,base)+(outer-Math.max(root,base))*j/5;point(q,a-half(q));}
    for(let j=5;j>=0;j--){const q=Math.max(root,base)+(outer-Math.max(root,base))*j/5;point(q,a+half(q));}
    point(root,a+half(base));
  }
  shape.closePath();
  if(solid){const hole=new THREE.Path();hole.absarc(0,0,r*.86,0,TAU,true);shape.holes.push(hole);}
  else if(spokes>0){for(let i=0;i<spokes;i++){const a=i*TAU/spokes+.12,b=(i+1)*TAU/spokes-.12,ri=r*.24,ro=root*.84;const h=new THREE.Path();h.moveTo(ri*Math.cos(a),ri*Math.sin(a));h.lineTo(ro*Math.cos(a),ro*Math.sin(a));h.absarc(0,0,ro,a,b,false);h.lineTo(ri*Math.cos(b),ri*Math.sin(b));h.absarc(0,0,ri,b,a,true);shape.holes.push(h);}}
  if(!solid){const h=new THREE.Path();h.absarc(0,0,Math.min(r*.1,.055),0,TAU,true);shape.holes.push(h);}
  return new THREE.ExtrudeGeometry(shape,{depth,bevelEnabled:true,bevelThickness:.009,bevelSize:.008,bevelSegments:1,curveSegments:20});
}
const specs=[{id:'barrel',n:80,r:1.8,z:.62,x:-2.2,y:1.45,ratio:1/4800},{id:'center',n:75,r:1.5,z:.96,ratio:-1/600,p:10},{id:'third',n:80,r:1.35,z:1.30,ratio:1/80,p:10},{id:'fourth',n:80,r:1.25,z:1.64,ratio:-1/10,p:10},{id:'escape',n:15,r:.66,z:1.98,ratio:1,p:8}];
const angles=[0,-.4,-1.65,-2.2];
const components={};
const selectable=[];
function register(group,id){group.userData.part=id;group.traverse(o=>{if(o.isMesh){o.userData.part=id;selectable.push(o);}});components[id]=group;}
specs.forEach((s,i)=>{
  let pinionPhase=0;
  if(i){const prev=specs[i-1],pinionR=prev.r*s.p/prev.n,d=prev.r+pinionR,a=angles[i-1];s.x=prev.x+d*Math.cos(a);s.y=prev.y+d*Math.sin(a);s.pinionR=pinionR;s.pinionZ=prev.z;pinionPhase=(prev.n*a+s.p*(a+Math.PI)-Math.PI)/s.p;}
  const g=new THREE.Group();g.position.set(s.x,s.y,0);model.add(g);s.group=g;
  if(i<4)mesh(gearGeometry(s.n,s.r,.105,i===0?0:5,i===0),gold.clone(),g,0,0,s.z);
  if(i===0){annulus(s.r*.91,s.r*.86,.34,gold,g,0,0,s.z-.34);cylinder(s.r*.86,.05,darkSteel,g,0,0,s.z-.27);const pts=[];for(let j=0;j<=540;j++){const a=j/540*TAU*8,r=.19+(s.r*.81-.19)*j/540;pts.push(new THREE.Vector3(r*Math.cos(a),r*Math.sin(a),s.z-.12));}tube(pts,.021,steel,g);cylinder(.21,.36,goldEdge,g,0,0,s.z-.1);}
  if(i){const p=mesh(gearGeometry(s.p,s.pinionR,.21,0),steel,g,0,0,s.pinionZ-.06);p.rotation.z=pinionPhase;}
  cylinder(.08,s.z+.35,steel,g,0,0,(s.z+.25)/2);
  if(i&&i<4){annulus(s.r*.91,s.r*.85,.015,goldEdge,g,0,0,s.z+.113);cylinder(.205,.085,goldEdge,g,0,0,s.z+.145);annulus(.145,.08,.025,steel,g,0,0,s.z+.19);}
  if(i===4){const shape=new THREE.Shape();for(let n=0;n<15;n++){const a=n*TAU/15;const vertices=[[.57,a-.095],[.72,a+.035],[.74,a+.075],[.57,a+.105]];vertices.forEach(([r,t],j)=>{const x=r*Math.cos(t),y=r*Math.sin(t);if(n===0&&j===0)shape.moveTo(x,y);else shape.lineTo(x,y);});}shape.closePath();for(let i=0;i<5;i++){const a=i*TAU/5+.17,b=(i+1)*TAU/5-.17;const h=new THREE.Path();h.moveTo(.17*Math.cos(a),.17*Math.sin(a));h.lineTo(.47*Math.cos(a),.47*Math.sin(a));h.absarc(0,0,.47,a,b,false);h.lineTo(.17*Math.cos(b),.17*Math.sin(b));h.absarc(0,0,.17,b,a,true);shape.holes.push(h);}mesh(new THREE.ExtrudeGeometry(shape,{depth:.065,bevelEnabled:true,bevelSize:.009,bevelThickness:.01,bevelSegments:1}),gold.clone(),g,0,0,s.z);cylinder(.14,.10,steel,g,0,0,s.z+.085);}
  bearing(s.x,s.y,s.z+.26);
  register(g,s.id);
});
// Ruby pallet stones, two banking positions and a fork aimed at the balance roller.
const escape=specs[4];
const forkPivot=new THREE.Vector2(escape.x-.98,escape.y+.03);
const fork=new THREE.Group();fork.position.set(forkPivot.x,forkPivot.y,1.98);model.add(fork);
const forkShape=new THREE.Shape();forkShape.moveTo(-.05,-.085);forkShape.lineTo(.27,-.44);forkShape.lineTo(.53,-.48);forkShape.lineTo(.53,-.37);forkShape.lineTo(.33,-.34);forkShape.lineTo(.09,0);forkShape.lineTo(.34,.33);forkShape.lineTo(.54,.40);forkShape.lineTo(.52,.51);forkShape.lineTo(.27,.43);forkShape.lineTo(-.05,.085);forkShape.lineTo(-1.40,.075);forkShape.lineTo(-1.62,.20);forkShape.lineTo(-1.71,.16);forkShape.lineTo(-1.51,0);forkShape.lineTo(-1.71,-.16);forkShape.lineTo(-1.62,-.20);forkShape.lineTo(-1.40,-.075);forkShape.closePath();
mesh(new THREE.ExtrudeGeometry(forkShape,{depth:.055,bevelEnabled:true,bevelThickness:.012,bevelSize:.012,bevelSegments:2}),steel.clone(),fork);
for(const sign of [-1,1]){const stone=mesh(new THREE.BoxGeometry(.18,.09,.085),ruby,fork,.52,sign*.43,.05);stone.rotation.z=-sign*.6;cylinder(.045,.18,blue,model,forkPivot.x-.35,forkPivot.y+sign*.17,2.02);}
cylinder(.11,.15,blue,fork,0,0,.07);bearing(forkPivot.x,forkPivot.y,2.17);register(fork,'fork');
const balance=new THREE.Group();balance.position.set(-2.25,-2.0,2.04);model.add(balance);
annulus(1.46,1.34,.15,gold.clone(),balance);
for(let i=0;i<3;i++){const a=i*TAU/3;const bar=mesh(new THREE.BoxGeometry(1.32,.105,.095),goldEdge,balance,.67*Math.cos(a),.67*Math.sin(a),.06);bar.rotation.z=a;}
for(let i=0;i<16;i++){const a=i*TAU/16;cylinder(.062,.11,goldEdge,balance,1.44*Math.cos(a),1.44*Math.sin(a),.19);}
cylinder(.22,.15,steel,balance,0,0,.10);cylinder(.11,.18,blue,balance,0,0,.20);cylinder(.025,.09,ruby,balance,.24,0,-.15);register(balance,'balance');
// A flat spiral with its outer end fixed; inner end rotates with the balance.
const hairspringGeometry=new THREE.BufferGeometry();const springPositions=new Float32Array(601*3);hairspringGeometry.setAttribute('position',new THREE.BufferAttribute(springPositions,3));const hairspring=new THREE.Line(hairspringGeometry,new THREE.LineBasicMaterial({color:0x244860}));hairspring.position.set(-2.25,-2,2.37);model.add(hairspring);
const cockShape=new THREE.Shape();cockShape.moveTo(-3.65,-2.85);cockShape.lineTo(-3.32,-3.17);cockShape.lineTo(-2.16,-2.20);cockShape.quadraticCurveTo(-1.97,-1.98,-2.15,-1.83);cockShape.quadraticCurveTo(-2.32,-1.72,-2.49,-1.93);cockShape.closePath();
const cock=mesh(new THREE.ExtrudeGeometry(cockShape,{depth:.13,bevelEnabled:true,bevelThickness:.035,bevelSize:.035,bevelSegments:2}),steel,model,0,0,2.45);bearing(-2.25,-2,2.62);screw(-3.39,-2.93,2.68);screw(-2.65,-2.28,2.68,model,.07);
// Crown, stem and hand-winding detail.
cylinder(.11,.8,steel,model,4.5,.1,.0).rotation.z=Math.PI/2;
const crown=new THREE.Group();crown.position.set(4.85,.1,.1);crown.rotation.y=Math.PI/2;model.add(crown);cylinder(.4,.32,steel,crown);
for(let i=0;i<32;i++){const a=i*TAU/32;const tooth=mesh(new THREE.BoxGeometry(.055,.035,.35),steel,crown,.38*Math.cos(a),.38*Math.sin(a),0);tooth.rotation.z=a;}
// Subtle fixed barrel support and exposed ruby bearings.
for(const [x,y] of [[-3.5,.35],[2.75,.1],[.6,-3.65]]){cylinder(.25,.14,steel,model,x,y,.18);screw(x,y,.30,model,.12);}
const selectionRing=annulus(1.94,1.92,.003,new THREE.MeshBasicMaterial({color:0xa6b77f,transparent:true,opacity:.60,depthWrite:false}),model,specs[0].x,specs[0].y,.76);
selectionRing.castShadow=false;
const descriptions={
barrel:{index:'01',name:'发条盒',en:'MAINSPRING BARREL',desc:'机芯的能量起点。盘绕在盒内的发条在上链时收紧，再缓缓释放弹性势能，推动整个轮系运转。',aLabel:'轮齿数量',a:'80 <small>齿</small>',bLabel:'旋转周期',b:'8 <small>小时 / 圈</small>',tab:'barrel',spec:0},
center:{index:'02',name:'中心轮',en:'CENTER WHEEL',desc:'传动轮系的第一站。10 齿小齿轮接受发条盒的驱动，与同轴的 75 齿大轮一起旋转，每小时转一圈，对应分针的节奏。',aLabel:'大轮 / 小齿轮',a:'75 <small>/ 10 齿</small>',bLabel:'旋转周期',b:'1 <small>小时 / 圈</small>',tab:'center',spec:1},
third:{index:'03',name:'三轮',en:'THIRD WHEEL',desc:'连接中心轮与秒轮的中间传动轴。大轮与小齿轮固定在同一根轴上，将转速继续提高，把发条的能量传向擒纵机构。',aLabel:'大轮 / 小齿轮',a:'80 <small>/ 10 齿</small>',bLabel:'旋转周期',b:'8 <small>分钟 / 圈</small>',tab:'center',spec:2},
fourth:{index:'04',name:'秒轮',en:'FOURTH WHEEL',desc:'每分钟旋转一圈，因此也叫秒轮。80 齿大轮驱动擒纵轮轴上的 8 齿小齿轮，将转速再提高 10 倍。',aLabel:'大轮 / 小齿轮',a:'80 <small>/ 10 齿</small>',bLabel:'旋转周期',b:'60 <small>秒 / 圈</small>',tab:'center',spec:3},
escape:{index:'05',name:'擒纵轮',en:'ESCAPE WHEEL',desc:'把连续的动力变成规律的节拍。15 枚特殊轮齿被擒纵叉交替锁住、释放，每次半摆前进半个齿距，并向摆轮补充能量。',aLabel:'擒纵轮齿',a:'15 <small>齿</small>',bLabel:'旋转周期',b:'6 <small>秒 / 圈</small>',tab:'escape',spec:4},
fork:{index:'06',name:'擒纵叉',en:'PALLET FORK',desc:'节拍与动力之间的桥梁。两端的红宝石叉瓦交替锁住擒纵轮，叉口与摆轮的冲击圆盘配合，在摆轮经过中位时传递冲量。',aLabel:'红宝石叉瓦',a:'2 <small>枚</small>',bLabel:'释放频率',b:'5 <small>次 / 秒</small>',tab:'escape'},
balance:{index:'07',name:'摆轮与游丝',en:'BALANCE & HAIRSPRING',desc:'机芯的调速心脏。摆轮在游丝的回复力下往复摆动，每秒完成 2.5 次振荡；擒纵机构按这一节奏释放轮系，让时间稳定前行。',aLabel:'振荡频率',a:'2.5 <small>Hz</small>',bLabel:'摆动幅度',b:'±250 <small>°</small>',tab:'balance'}
};
let selected='barrel',showPrinciple=false;
function selectPart(id){const d=descriptions[id];if(!d)return;selected=id;setPrinciple(false);document.querySelector('#part-index').textContent=d.index;document.querySelector('#part-name').textContent=d.name;document.querySelector('#part-en').textContent=d.en;document.querySelector('#part-desc').textContent=d.desc;document.querySelector('#fact-label-a').textContent=d.aLabel;document.querySelector('#fact-label-b').textContent=d.bLabel;document.querySelector('#fact-a').innerHTML=d.a;document.querySelector('#fact-b').innerHTML=d.b;document.querySelectorAll('[data-part]').forEach(b=>{const active=b.dataset.part===d.tab;b.classList.toggle('selected',active);b.setAttribute('aria-selected',active);});
 const s=d.spec!==undefined?specs[d.spec]:null;const r=s?s.r+.14:id==='balance'?1.59:.70;
 selectionRing.geometry.dispose();const sh=new THREE.Shape();sh.absarc(0,0,r,0,TAU);const h=new THREE.Path();h.absarc(0,0,r-.015,0,TAU,true);sh.holes.push(h);selectionRing.geometry=new THREE.ShapeGeometry(sh,96);selectionRing.position.set(s?s.x:id==='balance'?-2.25:forkPivot.x,s?s.y:id==='balance'?-2:forkPivot.y,s?s.z+.15:id==='balance'?2.3:2.12);
 Object.entries(components).forEach(([part,g])=>g.traverse(o=>{if(o.isMesh&&o.material.emissive&&o.material!==steel&&o.material!==goldEdge&&o.material!==ruby&&o.material!==blue&&o.material!==darkSteel&&o.material!==gold){o.material.emissive.set(part===id?0x2b250c:0x000000);o.material.emissiveIntensity=.16;}}));
}
function setPrinciple(value){showPrinciple=value;document.querySelector('#detail').hidden=value;document.querySelector('#principle').hidden=!value;document.querySelector('#principle-tab').classList.toggle('active',value);document.querySelector('#explore-tab').classList.toggle('active',!value);}
document.querySelector('#principle-tab').onclick=()=>setPrinciple(true);document.querySelector('#explore-tab').onclick=()=>setPrinciple(false);
document.querySelector('.brand').onclick=e=>{e.preventDefault();setPrinciple(false);frameCamera(false,true);};
document.querySelectorAll('[data-part]').forEach(b=>b.onclick=()=>selectPart(b.dataset.part));
let playing=true,speed=1,simTime=0,exploded=false,explosion=0,topView=false;
function togglePlay(){playing=!playing;document.querySelector('#play').setAttribute('aria-label',playing?'暂停机芯':'继续运行');document.querySelector('#play-icon').innerHTML=playing?'<path d="M6 4v12M14 4v12"/>':'<path d="m6 4 10 6-10 6Z"/>';document.querySelector('#running-text').textContent=playing?'机芯运行中':'机芯已暂停';document.querySelector('.live').style.opacity=playing?'1':'.45';}
document.querySelector('#play').onclick=togglePlay;
document.querySelectorAll('[data-speed]').forEach(b=>b.onclick=()=>{speed=Number(b.dataset.speed);document.querySelectorAll('[data-speed]').forEach(el=>el.classList.toggle('selected',el===b));});
document.querySelector('#explode').onclick=()=>{exploded=!exploded;document.querySelector('#explode').classList.toggle('active',exploded);document.querySelector('#explode').setAttribute('aria-pressed',exploded);};
document.querySelector('#top-view').onclick=()=>{topView=!topView;document.querySelector('#top-view').classList.toggle('active',topView);document.querySelector('#top-view span').textContent=topView?'透视':'俯视';frameCamera(topView,true);};
document.querySelector('#reset').onclick=()=>{topView=false;document.querySelector('#top-view').classList.remove('active');document.querySelector('#top-view span').textContent='俯视';frameCamera(false,true);};
const raycaster=new THREE.Raycaster();let pointerStart=null;
canvas.addEventListener('pointerdown',e=>{pointerStart={x:e.clientX,y:e.clientY,t:performance.now()};cameraTween=null;});
canvas.addEventListener('pointerup',e=>{if(!pointerStart||Math.hypot(e.clientX-pointerStart.x,e.clientY-pointerStart.y)>6||performance.now()-pointerStart.t>600)return;const rect=canvas.getBoundingClientRect();raycaster.setFromCamera(new THREE.Vector2((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1),camera);const hit=raycaster.intersectObjects(selectable,false)[0];if(hit)selectPart(hit.object.userData.part);pointerStart=null;});
canvas.addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();togglePlay();}if(e.key.toLowerCase()==='r')frameCamera(false,true);if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();const offset=camera.position.clone().sub(controls.target);if(e.key==='ArrowLeft'||e.key==='ArrowRight')offset.applyAxisAngle(new THREE.Vector3(0,0,1),e.key==='ArrowLeft'?.10:-.10);else offset.applyAxisAngle(new THREE.Vector3(1,0,0),e.key==='ArrowUp'?.08:-.08);camera.position.copy(controls.target).add(offset);}if(e.key==='+'||e.key==='=')camera.position.lerp(controls.target,.07);if(e.key==='-')camera.position.sub(controls.target).multiplyScalar(1.07).add(controls.target);});
const labelItems=[{text:'发条盒',position:new THREE.Vector3(-3.1,2.5,.8),offset:[-90,-22]},{text:'传动轮系',position:new THREE.Vector3(2.15,1.3,1.6),offset:[35,-20]},{text:'擒纵机构',position:new THREE.Vector3(.8,-2.2,2.1),offset:[48,5]},{text:'摆轮与游丝',position:new THREE.Vector3(-2.5,-3.1,2.3),offset:[-85,24]}];
labelItems.forEach(l=>{l.el=document.createElement('span');l.el.className='scene-label';l.el.textContent=l.text;document.querySelector('#labels').append(l.el);});
function resize(){const w=viewport.clientWidth,h=viewport.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();if(Math.abs(camera.aspect-lastAspect)>.08){frameCamera(topView);lastAspect=camera.aspect;}}
new ResizeObserver(resize).observe(viewport);resize();frameCamera();selectPart('barrel');
let previous=performance.now();
function smooth(x){x=THREE.MathUtils.clamp(x,0,1);return x*x*(3-2*x);}
function animate(now){requestAnimationFrame(animate);const dt=Math.min((now-previous)/1000,.05);previous=now;if(playing)simTime+=dt*speed;
 // Each 0.2 s half-swing releases exactly half an escape tooth; lock occupies most of the beat.
 const beats=simTime*5,beatIndex=Math.floor(beats),fraction=beats-beatIndex;
 const advance=beatIndex+smooth((fraction-.02)/.22),escapeAngle=advance*TAU/30;
 const balanceAngle=Math.sin(simTime*TAU*2.5)*THREE.MathUtils.degToRad(250);
 explosion=THREE.MathUtils.damp(explosion,exploded?1:0,5,dt);
 specs.forEach((s,i)=>{s.group.rotation.z=escapeAngle*s.ratio;s.group.position.z=explosion*(i+1)*.45;});
 const halfBeat=beatIndex%2===0?1:-1;fork.rotation.z=halfBeat*(-.10+.20*smooth((fraction-.02)/.22));fork.position.z=1.98+explosion*2.85;
 balance.rotation.z=balanceAngle;balance.position.z=2.04+explosion*3.65;
 hairspring.position.z=2.37+explosion*3.65;
 for(let i=0;i<=600;i++){const u=i/600,a=u*TAU*6+balanceAngle*(1-u),r=.19+u*1.02;springPositions[i*3]=r*Math.cos(a);springPositions[i*3+1]=r*Math.sin(a);springPositions[i*3+2]=0;}hairspringGeometry.attributes.position.needsUpdate=true;
 selectionRing.position.z=(descriptions[selected].spec!==undefined?specs[descriptions[selected].spec].z+.16:selected==='balance'?2.3:2.12)+explosion*(descriptions[selected].spec!==undefined?(descriptions[selected].spec+1)*.45:selected==='balance'?3.65:2.85);
 if(cameraTween){cameraTween.t+=dt*2;const t=smooth(cameraTween.t);camera.position.lerpVectors(cameraTween.start,cameraTween.end,t);controls.target.lerpVectors(cameraTween.targetStart,cameraTween.targetEnd,t);if(t>=1)cameraTween=null;}
 controls.update();
 const w=viewport.clientWidth,h=viewport.clientHeight;
 labelItems.forEach(l=>{const p=l.position.clone();if(explosion>.1)p.z+=explosion*1.5;p.project(camera);let x=(p.x+1)*w/2+l.offset[0],y=(-p.y+1)*h/2+l.offset[1];x=THREE.MathUtils.clamp(x,25,w-95);y=THREE.MathUtils.clamp(y,95,h-55);l.el.style.left=x+'px';l.el.style.top=y+'px';l.el.style.opacity=controls.getDistance()<12?'0':'.9';});
 renderer.render(scene,camera);
}
requestAnimationFrame(animate);
requestAnimationFrame(()=>{document.querySelector('#loading').style.opacity='0';setTimeout(()=>document.querySelector('#loading').remove(),550);});
// Read-only diagnostics used to verify geometry and the model's time ratios.
window.movement={get state(){return {playing,speed,simTime,selected,exploded,cameraPosition:camera.position.toArray(),cameraDistance:controls.getDistance(),escapeAngle:specs[4].group.rotation.z,balanceAngle:balance.rotation.z};},gearPairs:specs.slice(1).map((s,i)=>({driver:specs[i].id,driven:s.id,driverTeeth:specs[i].n,pinionTeeth:s.p,pitchRadius:specs[i].r,pinionRadius:s.pinionR,distance:Math.hypot(s.x-specs[i].x,s.y-specs[i].y),ratio:s.ratio/specs[i].ratio})),projectPart(id){const g=components[id];if(!g)return null;const p=new THREE.Vector3().setFromMatrixPosition(g.matrixWorld);const s=specs.find(s=>s.id===id);p.z+=(s?s.z:.12);p.project(camera);const r=canvas.getBoundingClientRect();return {x:r.left+(p.x+1)*r.width/2,y:r.top+(-p.y+1)*r.height/2};}};
