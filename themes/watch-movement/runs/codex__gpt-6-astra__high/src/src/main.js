import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const $ = s => document.querySelector(s);
const TAU = Math.PI * 2;
const mobile = () => innerWidth <= 720;
const materials = {
  gold: new THREE.MeshStandardMaterial({color:0xc8a458,metalness:0.88,roughness:0.26}),
  goldLight: new THREE.MeshStandardMaterial({color:0xd4b975,metalness:0.9,roughness:0.24}),
  goldDark: new THREE.MeshStandardMaterial({color:0x846b3c,metalness:0.9,roughness:0.33}),
  steel: new THREE.MeshStandardMaterial({color:0xaabac0,metalness:0.95,roughness:0.24}),
  steelDark: new THREE.MeshStandardMaterial({color:0x53666b,metalness:0.86,roughness:0.35}),
  blue: new THREE.MeshStandardMaterial({color:0x153e60,metalness:0.86,roughness:0.23}),
  jewel: new THREE.MeshPhysicalMaterial({color:0x9b2548,metalness:0.3,roughness:0.17,clearcoat:1,clearcoatRoughness:0.08}),
  black: new THREE.MeshStandardMaterial({color:0x162229,metalness:0.75,roughness:0.34}),
};
const definitions = [
  {id:'barrel',name:'发条盒',en:'MAINSPRING BARREL',desc:'上链时，盘绕的发条储存能量；释放时推动发条盒外缘的齿轮，将扭矩送入整个传动轮系。',label1:'齿数',value1:'80',unit1:'齿',label2:'转动周期',value2:'8',unit2:'小时 / 圈',note:'动力的起点 · 驱动中心轮的 10 齿小齿轴'},
  {id:'center',name:'中心轮',en:'CENTER WHEEL',desc:'每小时转动一圈。下层的 10 齿小齿轴接收发条盒的动力，同轴的 80 齿大轮再驱动第三轮。',label1:'轮 / 小齿轴',value1:'80 / 10',unit1:'齿',label2:'转动周期',value2:'1',unit2:'小时 / 圈',note:'第一段传动 · 发条盒与中心轮转速比 1 : 8'},
  {id:'third',name:'第三轮',en:'THIRD WHEEL',desc:'承接中心轮的动力。75 齿大轮与第四轮的 10 齿小齿轴咬合，把轮系的转速再提高 7.5 倍。',label1:'轮 / 小齿轴',value1:'75 / 10',unit1:'齿',label2:'转动周期',value2:'7.5',unit2:'分钟 / 圈',note:'第二段传动 · 中心轮与第三轮转速比 1 : 8'},
  {id:'fourth',name:'第四轮',en:'FOURTH WHEEL',desc:'每分钟转动一圈，可在轴上安装秒针。80 齿大轮驱动擒纵轮的 8 齿小齿轴，把动力送入擒纵机构。',label1:'轮 / 小齿轴',value1:'80 / 10',unit1:'齿',label2:'转动周期',value2:'60',unit2:'秒 / 圈',note:'第三段传动 · 第三轮与第四轮转速比 1 : 7.5'},
  {id:'escape',name:'擒纵轮',en:'ESCAPE WHEEL',desc:'15 枚轮齿与红宝石叉瓦交替锁定、释放。每次半摆推进半个齿距，把轮系的能量传给擒纵叉。',label1:'轮 / 小齿轴',value1:'15 / 8',unit1:'齿',label2:'转动周期',value2:'6',unit2:'秒 / 圈',note:'第四段传动 · 第四轮与擒纵轮转速比 1 : 10'},
  {id:'pallet',name:'擒纵叉',en:'PALLET FORK',desc:'两片红宝石叉瓦交替挡住擒纵轮。摆轮经过中位时拨动叉口，释放一小步，并接收维持摆动的冲量。',label1:'释放频率',value1:'5',unit1:'次 / 秒',label2:'叉瓦',value2:'2',unit2:'片',note:'锁住、释放、传递冲量 · 与摆轮半摆同步'},
  {id:'balance',name:'摆轮',en:'BALANCE & HAIRSPRING',desc:'摆轮与游丝组成振荡系统。游丝随摆动收紧、舒展，回复力让摆轮每秒完成 2.5 次完整往返。',label1:'摆动频率',value1:'2.5',unit1:'Hz',label2:'摆幅',value2:'±270',unit2:'°',note:'走时的节拍源 · 每小时 18,000 次半摆'},
];

const canvas = $('#scene');
let renderer;
try { renderer = new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance'}); }
catch(error) { $('#loading').innerHTML='<span>当前浏览器无法启用 3D，请启用 WebGL 后重新打开。</span>'; throw error; }
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.setSize(innerWidth,innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.35;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(32,innerWidth/innerHeight,.1,100);
const controls = new OrbitControls(camera,canvas);
controls.enableDamping=true;controls.dampingFactor=.065;controls.enablePan=false;
controls.minDistance=8;controls.maxDistance=23;
controls.minPolarAngle=.05;controls.maxPolarAngle=Math.PI*.69;
controls.rotateSpeed=.65;controls.zoomSpeed=.7;
const pmrem = new THREE.PMREMGenerator(renderer);
const room = new RoomEnvironment();
const environment = pmrem.fromScene(room,.04);
scene.environment=environment.texture;
room.dispose();pmrem.dispose();
scene.add(new THREE.HemisphereLight(0xcfebef,0x222013,1.25));
const keyLight = new THREE.DirectionalLight(0xffe6b5,3.4);
keyLight.position.set(-4,5,10);keyLight.castShadow=true;
keyLight.shadow.mapSize.set(2048,2048);keyLight.shadow.camera.left=-5;keyLight.shadow.camera.right=5;keyLight.shadow.camera.top=5;keyLight.shadow.camera.bottom=-5;keyLight.shadow.normalBias=.025;keyLight.shadow.bias=-.0001;
scene.add(keyLight);
const coolLight = new THREE.DirectionalLight(0x8dbbd3,2.2);coolLight.position.set(5,-1,5);scene.add(coolLight);
const rimLight = new THREE.DirectionalLight(0xffffff,1.5);rimLight.position.set(0,6,-1);scene.add(rimLight);
const model = new THREE.Group();scene.add(model);
const shadowPlane = new THREE.Mesh(new THREE.PlaneGeometry(80,80),new THREE.ShadowMaterial({opacity:.25}));
shadowPlane.position.z=-.46;shadowPlane.receiveShadow=true;scene.add(shadowPlane);
const interactive=[];
const assemblies={};
function tag(object,id){object.userData.part=id;object.traverse(o=>{if(o.isMesh){o.userData.part=id;interactive.push(o);}});return object;}
function mesh(geometry,material,parent=model){const obj=new THREE.Mesh(geometry,material);obj.castShadow=true;obj.receiveShadow=true;parent.add(obj);return obj;}
function disk(r,h,mat,x=0,y=0,z=0,parent=model){const obj=mesh(new THREE.CylinderGeometry(r,r,h,72),mat,parent);obj.rotation.x=Math.PI/2;obj.position.set(x,y,z);return obj;}
function ring(r,tube,mat,x=0,y=0,z=0,parent=model){const obj=mesh(new THREE.TorusGeometry(r,tube,10,112),mat,parent);obj.position.set(x,y,z);return obj;}
function bar(x1,y1,x2,y2,width,z,thick,mat,parent=model){const obj=mesh(new THREE.BoxGeometry(Math.hypot(x2-x1,y2-y1),width,thick),mat,parent);obj.position.set((x1+x2)/2,(y1+y2)/2,z);obj.rotation.z=Math.atan2(y2-y1,x2-x1);return obj;}
function screw(x,y,z,r=.1,parent=model){disk(r*1.38,.025,materials.black,x,y,z-.01,parent);disk(r,.065,materials.blue,x,y,z+.025,parent);ring(r*.84,.007,materials.steelDark,x,y,z+.06,parent);bar(x-r*.65,y,x+r*.65,y,.016,z+.062,.008,materials.black,parent);}
function bearing(x,y,z,parent=model,size=.11){disk(size*1.48,.06,materials.goldLight,x,y,z,parent);disk(size,.065,materials.jewel,x,y,z+.036,parent);ring(size*.88,.012,materials.goldDark,x,y,z+.066,parent);disk(size*.29,.035,materials.steel,x,y,z+.078,parent);}

// Generated perlage finish and engraved chapter ring. No external textures.
const finishCanvas=document.createElement('canvas');finishCanvas.width=finishCanvas.height=1024;
const fc=finishCanvas.getContext('2d');fc.fillStyle='#53666b';fc.fillRect(0,0,1024,1024);
for(let y=-10;y<1050;y+=41){for(let x=-10;x<1050;x+=42){const cx=x+(Math.floor(y/41)%2)*21;for(let r=2;r<33;r+=1.8){fc.strokeStyle=`rgba(${r%4<2?'202,215,216':'27,40,47'},.1)`;fc.lineWidth=.75;fc.beginPath();fc.arc(cx,y,r,0,TAU);fc.stroke();}}}
const finish=new THREE.CanvasTexture(finishCanvas);finish.colorSpace=THREE.SRGBColorSpace;
const plateMat=new THREE.MeshStandardMaterial({color:0x7d8c8f,map:finish,roughness:.43,metalness:.82});
disk(3.33,.29,materials.steelDark,0,0,-.19);
disk(3.32,.045,plateMat,0,0,-.018);
ring(3.36,.085,materials.steel,0,0,-.07);
ring(3.19,.023,materials.goldDark,0,0,.03);
ring(3.08,.014,materials.steelDark,0,0,.031);
for(let i=0;i<120;i++){let a=TAU*i/120;let r=3.23;const tick=mesh(new THREE.BoxGeometry(i%5===0?.075:.033,.009,.01),i%5===0?materials.goldLight:materials.steelDark);tick.position.set(Math.cos(a)*r,Math.sin(a)*r,.04);tick.rotation.z=a;}
const engravingCanvas=document.createElement('canvas');engravingCanvas.width=engravingCanvas.height=1024;const ec=engravingCanvas.getContext('2d');
ec.textAlign='center';ec.fillStyle='#ced3c8';ec.font='24px Georgia';ec.fillText('C A L I B R E  0 1',512,128);ec.fillStyle='#c5bca2';ec.font='10px monospace';ec.fillText('M A N U A L   W I N D I N G',512,151);ec.fillStyle='#c8cdca';ec.font='12px monospace';ec.fillText('18 000 A/h',512,914);ec.font='9px monospace';ec.fillText('A T E L I E R   •   N O .  0 0 1',512,933);
const engraveTex=new THREE.CanvasTexture(engravingCanvas);engraveTex.colorSpace=THREE.SRGBColorSpace;
const engraving=mesh(new THREE.PlaneGeometry(6.6,6.6),new THREE.MeshBasicMaterial({map:engraveTex,transparent:true,depthWrite:false}));engraving.position.z=.045;engraving.castShadow=false;

// Every pair shares a module; the arbor spacing equals the sum of pitch radii.
const train=[
  {id:'barrel',n:80,r:1.27,z:.26,x:-1.19,y:1.07,factor:1/4800,pinion:0},
  {id:'center',n:80,r:.91,z:.44,pinion:10,factor:-1/600},
  {id:'third',n:75,r:.79,z:.62,pinion:10,factor:1/75},
  {id:'fourth',n:80,r:.66,z:.80,pinion:10,factor:-1/10},
  {id:'escape',n:15,r:.48,z:.98,pinion:8,factor:1},
];
const directions=[.07,-.58,-1.16,-2.01];
train[0].phase=.04;
for(let i=1;i<train.length;i++){
 const prev=train[i-1],current=train[i],a=directions[i-1];
 current.pinionR=prev.r/prev.n*current.pinion;
 const distance=prev.r+current.pinionR;
 current.x=prev.x+Math.cos(a)*distance;current.y=prev.y+Math.sin(a)*distance;
 current.pinionZ=prev.z;
 current.phase=((prev.n+current.pinion)*a+current.pinion*Math.PI-Math.PI-prev.n*prev.phase)/current.pinion;
}
function gearShape(n,r,open=true,escape=false){
 const shape=new THREE.Shape();
 const module=2*r/n;const root=r-1.18*module;const outer=r+module;const base=r*Math.cos(20*Math.PI/180);
 let first=true;
 function point(rad,angle){const x=rad*Math.cos(angle),y=rad*Math.sin(angle);if(first){shape.moveTo(x,y);first=false;}else shape.lineTo(x,y);}
 const inv=rr=>rr<=base?0:Math.sqrt((rr/base)**2-1)-Math.acos(base/rr);
 const invPitch=inv(r),half=Math.PI/(2*n);
 for(let i=0;i<n;i++){
   const a=i*TAU/n;
   if(escape){point(root,a-.45*TAU/n);point(outer,a-.07*TAU/n);point(outer,a+.055*TAU/n);point(root,a+.11*TAU/n);continue;}
   const start=Math.max(root,base);
   point(root,a-TAU/n*.49);point(root,a-half-invPitch);
   for(let s=0;s<=5;s++){const rr=start+(outer-start)*s/5;point(rr,a-half-invPitch+inv(rr));}
   for(let s=5;s>=0;s--){const rr=start+(outer-start)*s/5;point(rr,a+half+invPitch-inv(rr));}
   point(root,a+half+invPitch);point(root,a+TAU/n*.49);
 }
 shape.closePath();
 if(open){const count=5;for(let i=0;i<count;i++){const a=i*TAU/count+.11;const b=(i+1)*TAU/count-.11;const hole=new THREE.Path();const r1=r*.26,r2=root*.84;hole.moveTo(r1*Math.cos(a),r1*Math.sin(a));hole.lineTo(r2*Math.cos(a),r2*Math.sin(a));hole.absarc(0,0,r2,a,b,false);hole.lineTo(r1*Math.cos(b),r1*Math.sin(b));hole.absarc(0,0,r1,b,a,true);hole.closePath();shape.holes.push(hole);}}
 return shape;
}
function addGear(n,r,z,parent,mat,open=true,escape=false){const geometry=new THREE.ExtrudeGeometry(gearShape(n,r,open,escape),{depth:.075,bevelEnabled:true,bevelSegments:1,steps:1,bevelSize:.005,bevelThickness:.007,curveSegments:10});geometry.translate(0,0,-.0375);const gear=mesh(geometry,mat,parent);gear.position.z=z;return gear;}
for(const item of train){
 const assembly=new THREE.Group();assembly.position.set(item.x,item.y,0);assembly.rotation.z=item.phase;model.add(assembly);item.group=assembly;assemblies[item.id]=assembly;
 // Machined well below each rotating assembly.
 disk(item.r*.89,.025,materials.black,item.x,item.y,.052);
 ring(item.r*.89,.018,materials.steelDark,item.x,item.y,.073);
 addGear(item.n,item.r,item.z,assembly,item.id==='escape'?materials.steel:materials.goldLight,item.id!=='barrel',item.id==='escape');
 if(item.pinion){addGear(item.pinion,item.pinionR,item.pinionZ,assembly,materials.steel,false);disk(item.pinionR*.55,item.z-item.pinionZ,materials.steel,0,0,(item.z+item.pinionZ)/2,assembly);}
 disk(item.id==='barrel'?.115:.075,item.z+.17,materials.steel,0,0,item.z/2+.04,assembly);
 disk(item.id==='barrel'?.19:.14,.07,materials.gold,0,0,item.z+.047,assembly);
 ring(item.r*.91,.009,item.id==='escape'?materials.steelDark:materials.goldDark,0,0,item.z+.047,assembly);
 bearing(0,0,item.z+.1,assembly,.075);
 tag(assembly,item.id);
}
// Open barrel with a flat mainspring inside its drum.
const barrel=train[0].group;
disk(1.1,.09,materials.goldDark,0,0,.33,barrel);disk(.97,.016,materials.black,0,0,.383,barrel);
ring(1.035,.046,materials.goldLight,0,0,.393,barrel);
const springPoints=[];for(let i=0;i<=540;i++){const a=i/540*TAU*6.4;const r=.19+i/540*.73;springPoints.push(new THREE.Vector3(r*Math.cos(a),r*Math.sin(a),.413));}
const mainspring=mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(springPoints),540,.012,5,false),materials.steel,barrel);
for(let i=0;i<3;i++){let a=i*TAU/3;bar(Math.cos(a)*.14,Math.sin(a)*.14,Math.cos(a)*.985,Math.sin(a)*.985,.075,.467,.046,materials.gold,barrel);}
disk(.16,.09,materials.steel,0,0,.474,barrel);screw(0,0,.523,.072,barrel);tag(barrel,'barrel');

// Fixed sculpted bridges sit above the arbors, leaving the tooth engagements visible.
function makeBridge(points,z,mat,width=.22){const g=new THREE.Group();for(let i=1;i<points.length;i++){bar(...points[i-1],...points[i],width,z,.14,mat,g);}for(const [x,y]of points)disk(width/2,.14,mat,x,y,z,g);model.add(g);return g;}
const c=train[1],t=train[2],f=train[3],e=train[4];
const bridgeA=makeBridge([[c.x,c.y],[.69,2.05],[1.82,1.75],[t.x,t.y]],.92,materials.steelDark,.29);
// Côtes-inspired fine grooves cut visually across the upper bridge surface.
for(let i=0;i<9;i++){bar(.79+i*.084,1.98-i*.022,.88+i*.084,1.9-i*.022,.004,1.0,.004,materials.steel,bridgeA);}
screw(.70,2.04,1.015,.105);screw(1.80,1.75,1.015,.105);bearing(c.x,c.y,1.015,model,.1);bearing(t.x,t.y,1.015,model,.095);
const bridgeB=makeBridge([[f.x,f.y],[2.16,-.72],[1.77,-1.5],[e.x,e.y]],1.2,materials.steelDark,.22);
screw(2.13,-.72,1.29,.085);bearing(f.x,f.y,1.29,model,.085);bearing(e.x,e.y,1.29,model,.08);
// Mounts and blued screws around the perimeter.
for(const [x,y,z]of [[-2.42,1.75,.14],[-2.74,-.6,.14],[-1.65,-2.5,.14],[.78,-2.73,.14],[2.68,.89,.14],[1.22,2.66,.14]]){
 disk(.23,.07,materials.steelDark,x,y,z-.04);screw(x,y,z,.115);
}
// Crown and winding shaft, entirely generated geometry.
const stem=disk(.105,.72,materials.steel,3.42,.14,-.12);stem.rotation.z=Math.PI/2;
const crown=disk(.34,.27,materials.steel,3.83,.14,-.12);crown.rotation.z=Math.PI/2;
for(let i=0;i<36;i++){const a=i/36*TAU;const ridge=mesh(new THREE.BoxGeometry(.26,.025,.033),materials.steelDark);ridge.position.set(3.83,.14+Math.cos(a)*.33,-.12+Math.sin(a)*.33);ridge.rotation.x=a;}

// Balance wheel: full ±270° oscillation, with a fixed outer hairspring attachment.
const bx=-.96,by=-1.38,bz=.81;
const balance=new THREE.Group();balance.position.set(bx,by,bz);model.add(balance);assemblies.balance=balance;
disk(1.2,.045,materials.black,bx,by,.082);ring(1.22,.025,materials.steelDark,bx,by,.108);
ring(1.075,.072,materials.gold,0,0,0,balance);ring(1.087,.025,materials.goldLight,0,0,.058,balance);
for(let i=0;i<3;i++){const a=TAU*i/3;bar(.12*Math.cos(a),.12*Math.sin(a),1.055*Math.cos(a),1.055*Math.sin(a),.08,0,.09,materials.gold,balance);}
for(let i=0;i<16;i++){const a=TAU*i/16;const r=1.112;disk(.048,.045,materials.goldDark,r*Math.cos(a),r*Math.sin(a),.04,balance);bar(r*Math.cos(a)-.022,r*Math.sin(a),r*Math.cos(a)+.022,r*Math.sin(a),.009,.064,.009,materials.black,balance);}
disk(.185,.12,materials.steel,0,0,.01,balance);bearing(0,0,.1,balance,.085);
const impulse=mesh(new THREE.BoxGeometry(.08,.05,.07),materials.jewel,balance);impulse.position.set(.22,0,-.09);
tag(balance,'balance');
const hairspringPositions=new Float32Array(401*3);
const hairspringGeometry=new THREE.BufferGeometry();hairspringGeometry.setAttribute('position',new THREE.BufferAttribute(hairspringPositions,3));
const hairspring=new THREE.Line(hairspringGeometry,new THREE.LineBasicMaterial({color:0x719ab7}));hairspring.position.set(bx,by,bz+.12);model.add(hairspring);
const balanceCock=makeBridge([[bx,by],[-1.62,-.81],[-2.4,-1.22]],1.1,materials.steelDark,.21);
bearing(bx,by,1.19,model,.12);screw(-2.39,-1.22,1.19,.105);screw(-1.62,-.81,1.19,.068);
const springAnchor=mesh(new THREE.BoxGeometry(.11,.1,.18),materials.blue);springAnchor.position.set(bx+.77,by,bz+.1);

// The pallet has two stone-tipped arms surrounding the escape wheel's left edge.
const pallet=new THREE.Group();const px=e.x-.71,py=e.y-.04;
pallet.position.set(px,py,e.z+.09);model.add(pallet);assemblies.pallet=pallet;
bar(-.53,-.15,0,0,.076,0,.07,materials.steel,pallet);
bar(0,0,.34,.29,.073,0,.07,materials.steel,pallet);
bar(0,0,.38,-.31,.073,0,.07,materials.steel,pallet);
bar(-.53,-.15,-.67,-.07,.035,0,.065,materials.steel,pallet);
bar(-.53,-.15,-.60,-.28,.035,0,.065,materials.steel,pallet);
for(const [x,y,a]of [[.34,.28,-.50],[.38,-.31,.6]]){const stone=mesh(new THREE.BoxGeometry(.17,.075,.085),materials.jewel,pallet);stone.position.set(x,y,.018);stone.rotation.z=a;}
bearing(0,0,.08,pallet,.058);tag(pallet,'pallet');

// A subtle selected-part ring stays on the plate instead of tinting metal surfaces.
const selection=new THREE.Group();model.add(selection);
const selectionMat=new THREE.MeshBasicMaterial({color:0xdbbf81,transparent:true,opacity:.7,depthWrite:false});
for(let i=0;i<4;i++){const arc=mesh(new THREE.TorusGeometry(1,.007,4,20,.34),selectionMat,selection);arc.rotation.z=i*Math.PI/2+.25;arc.castShadow=false;}
const selectionTargets={...Object.fromEntries(train.map(g=>[g.id,{x:g.x,y:g.y,z:g.z+.12,r:g.r+.14}])),balance:{x:bx,y:by,z:bz+.17,r:1.25},pallet:{x:px,y:py,z:e.z+.2,r:.63}};
let selected='barrel';
function select(id){const data=definitions.find(d=>d.id===id);if(!data)return;selected=id;
 const index=definitions.indexOf(data)+1;
 $('#partIndex').textContent=`0${index} / 07`;$('#partEnglish').textContent=data.en;$('#partName').textContent=data.name;$('#partDesc').textContent=data.desc;
 for(const n of [1,2]){$(`#statLabel${n}`).textContent=data[`label${n}`];$(`#statValue${n}`).innerHTML=`${data[`value${n}`]} <small>${data[`unit${n}`]}</small>`;}
 $('#partNote').textContent=data.note;
 document.querySelectorAll('.parts-nav button').forEach(b=>{const active=b.dataset.part===id;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active);});
 const target=selectionTargets[id];selection.position.set(target.x,target.y,target.z);selection.scale.set(target.r,target.r,1);
 $('#stageLabel').innerHTML=`<span>0${index}</span><b>${data.name}</b><i></i>`;
}
for(const item of definitions){const button=document.createElement('button');button.textContent=item.name;button.dataset.part=item.id;button.addEventListener('click',()=>select(item.id));$('#partsNav').append(button);}
select('barrel');
// The perspective offset reserves a clear area for the inspector at every width.
let view='angle';
function composition(){
 let cx,cy,scale;
 if(mobile()){
  const top=162, bottom=$('.inspector').getBoundingClientRect().top-8;
  cx=innerWidth*.5;cy=(top+bottom)/2;
  scale=Math.min((innerWidth-24)/7.4,(bottom-top)/6.1);
 }else{
  const reserved=$('.inspector').getBoundingClientRect().left;
  cx=reserved*.52;cy=innerHeight*.53;
  scale=Math.min((reserved-70)/7.7,(innerHeight-230)/6.5);
 }
 const distance=innerHeight/(2*Math.tan(THREE.MathUtils.degToRad(16))*Math.max(scale,24));
 camera.aspect=innerWidth/innerHeight;
 camera.setViewOffset(innerWidth,innerHeight,innerWidth/2-cx,innerHeight/2-cy,innerWidth,innerHeight);
 camera.updateProjectionMatrix();return distance;
}
function resetView(mode='angle'){
 view=mode;controls.target.set(0,0,.2);camera.up.set(0,1,0);
 const dist=composition();
 camera.position.set(0,mode==='top'?0:-dist*.43,mode==='top'?dist:dist*.903+.2);
 controls.minDistance=dist*.52;controls.maxDistance=dist*1.8;
 controls.update();$('#viewAngle').classList.toggle('active',mode==='angle');$('#viewTop').classList.toggle('active',mode==='top');
}
$('#resetView').addEventListener('click',()=>resetView());$('#viewAngle').addEventListener('click',()=>resetView('angle'));$('#viewTop').addEventListener('click',()=>resetView('top'));
canvas.addEventListener('dblclick',()=>resetView());
const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let down=null,dragged=false;
function hitTest(event){const rect=canvas.getBoundingClientRect();pointer.set((event.clientX-rect.left)/rect.width*2-1,1-(event.clientY-rect.top)/rect.height*2);raycaster.setFromCamera(pointer,camera);return raycaster.intersectObjects(interactive,false)[0];}
canvas.addEventListener('pointerdown',event=>{down={x:event.clientX,y:event.clientY};dragged=false;});
canvas.addEventListener('pointermove',event=>{if(down&&Math.hypot(event.clientX-down.x,event.clientY-down.y)>6)dragged=true;if(event.pointerType!=='touch')canvas.style.cursor=down?'grabbing':hitTest(event)?'pointer':'grab';});
canvas.addEventListener('pointerup',event=>{if(down&&!dragged){const hit=hitTest(event);if(hit)select(hit.object.userData.part);}down=null;canvas.style.cursor='grab';});
canvas.addEventListener('pointercancel',()=>{down=null;});
let playing=true,speed=1,simTime=0;
function togglePlay(){playing=!playing;$('#playPause').setAttribute('aria-label',playing?'暂停运转':'继续运转');$('#playPause').title=playing?'暂停运转':'继续运转';$('#playIcon').innerHTML=playing?'<path d="M7 5v10M13 5v10"/>':'<path d="m7 4 9 6-9 6Z"/>';$('#runLabel').textContent=playing?'机芯运转中':'机芯已暂停';$('.wave').style.animationPlayState=playing?'running':'paused';$('.live-dot').style.opacity=playing?'1':'.35';}
$('#playPause').addEventListener('click',togglePlay);
for(const button of document.querySelectorAll('[data-speed]')){button.addEventListener('click',()=>{speed=Number(button.dataset.speed);document.querySelectorAll('[data-speed]').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',b===button);});$('.wave').style.animationDuration=`${1.2/speed}s`;});}
canvas.addEventListener('keydown',event=>{const offset=camera.position.clone().sub(controls.target);if(event.code==='Space'){event.preventDefault();togglePlay();return;}if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-','0'].includes(event.key)){event.preventDefault();if(event.key==='0'){resetView();return;}if(event.key==='+'||event.key==='='||event.key==='-'){offset.multiplyScalar(event.key==='-'?1.08:.92);offset.clampLength(controls.minDistance,controls.maxDistance);}else{const axis=event.key==='ArrowLeft'||event.key==='ArrowRight'?new THREE.Vector3(0,1,0):new THREE.Vector3(1,0,0);offset.applyAxisAngle(axis,['ArrowLeft','ArrowUp'].includes(event.key)?-.09:.09);}camera.position.copy(controls.target).add(offset);controls.update();}});
const dialog=$('#principleDialog');$('#principleBtn').addEventListener('click',()=>dialog.showModal());$('#closeDialog').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
addEventListener('resize',()=>{renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,2));resetView(view);});

let lastTime=performance.now(),frame=0;
const labelVector=new THREE.Vector3();
function animate(now){
 requestAnimationFrame(animate);
 const dt=Math.min((now-lastTime)/1000,.05);lastTime=now;
 if(playing&&!document.hidden)simTime+=dt*speed;
 // Five releases per second, each advancing half a tooth of the 15-tooth escape wheel.
 const beats=simTime*5;const integer=Math.floor(beats);const fraction=beats-integer;
 const release=THREE.MathUtils.smoothstep(fraction,0,.19);
 const escapeAngle=(integer+release)*TAU/30;
 for(const wheel of train)wheel.group.rotation.z=wheel.phase+escapeAngle*wheel.factor;
 const balanceAngle=Math.sin(simTime*TAU*2.5)*Math.PI*1.5;
 balance.rotation.z=balanceAngle;
 pallet.rotation.z=Math.tanh(Math.sin(simTime*TAU*2.5)*16)*.13;
 const arr=hairspringGeometry.attributes.position.array;
 for(let i=0;i<=400;i++){const s=i/400;const radius=.16+s*.61;const angle=s*TAU*5+balanceAngle*(1-s);arr[i*3]=radius*Math.cos(angle);arr[i*3+1]=radius*Math.sin(angle);arr[i*3+2]=0;}
 hairspringGeometry.attributes.position.needsUpdate=true;
 if(frame++%6===0){const minutes=Math.floor(simTime/60),seconds=Math.floor(simTime%60),tenths=Math.floor(simTime%1*10);$('#elapsed').textContent=`${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}.${tenths}`;}
 controls.update();
 const target=selectionTargets[selected];
 labelVector.set(target.x-target.r*.72,target.y+target.r*.9,target.z).project(camera);
 const lx=(labelVector.x*.5+.5)*innerWidth,ly=(-labelVector.y*.5+.5)*innerHeight;
 const label=$('#stageLabel');label.style.left=`${Math.max(12,lx-90)}px`;label.style.top=`${ly-16}px`;label.style.opacity=ly>185&&ly<innerHeight-120&&lx<$('.inspector').getBoundingClientRect().left-20?'1':mobile()&&ly>173&&ly<$('.inspector').getBoundingClientRect().top-15?'1':'0';
 renderer.render(scene,camera);
}
resetView();
renderer.render(scene,camera);
$('#loading').classList.add('done');
requestAnimationFrame(animate);
// Read-only measurements are useful for verifying the educational model.
window.__movement={get time(){return simTime;},get playing(){return playing;},get speed(){return speed;},get selected(){return selected;},train:train.map(({id,n,r,pinion,pinionR,x,y,z,pinionZ,factor,phase})=>({id,n,r,pinion,pinionR,x,y,z,pinionZ,factor,phase})),get angles(){return train.map(w=>w.group.rotation.z);},get balanceAngle(){return balance.rotation.z;},project(id){const q=selectionTargets[id];const p=new THREE.Vector3(q.x,q.y,q.z).project(camera);return{x:(p.x*.5+.5)*innerWidth,y:(-.5*p.y+.5)*innerHeight};}};
