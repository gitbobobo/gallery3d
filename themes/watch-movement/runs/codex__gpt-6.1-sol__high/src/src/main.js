import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './style.css';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101316);
const camera = new THREE.PerspectiveCamera(30, 1, .1, 100);
camera.position.set(0, 0.6, 28);
const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.querySelector('#viewport').appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; controls.dampingFactor=.08; controls.minDistance=5; controls.maxDistance=12; controls.target.set(0,0,0);

const root = new THREE.Group(); root.rotation.x = -0.22; root.rotation.z = -0.06; root.scale.setScalar(.78); root.position.x=-.75; root.position.y=.15; scene.add(root);
const brass = new THREE.MeshStandardMaterial({color:0xb78b4a, metalness:.88, roughness:.25});
const brassDark = new THREE.MeshStandardMaterial({color:0x6e4d27, metalness:.85, roughness:.3});
const steel = new THREE.MeshStandardMaterial({color:0x87929a, metalness:.95, roughness:.18});
const steelDark = new THREE.MeshStandardMaterial({color:0x3e4a50, metalness:.9, roughness:.22});
const ruby = new THREE.MeshStandardMaterial({color:0xa92343, metalness:.35, roughness:.18, emissive:0x260611});
const plateMat = new THREE.MeshStandardMaterial({color:0x1a2225, metalness:.72, roughness:.37});
const highlight = new THREE.MeshStandardMaterial({color:0xffc56c, metalness:.88, roughness:.2, emissive:0x39210a});
const parts=[];
const info={
 barrel:['发条盒','储存能量的圆筒。内置主发条缓慢释放扭矩，带动整列轮系。'], center:['中心轮 · 80齿','轮系的第一只传动轮，转速来自发条盒，负责把动力送入三轮小齿轴。'], third:['三轮 · 75齿','与中心轮小齿轴啮合，再以自己的小齿轴驱动四轮。'], fourth:['四轮 · 80齿','每分钟转一圈。它的轴心通常连接秒针，因此是机芯的时间基准。'], escape:['擒纵轮 · 15齿','每个摆动释放一个齿。它把连续的轮系动力切成清晰的滴答节奏。'], pallet:['擒纵叉','两颗叉瓦交替锁住和释放擒纵轮，同时接收摆轮的冲量。'], balance:['摆轮与游丝','调速器以 5 Hz 来回摆动。它每次过零点都给擒纵叉一个释放时刻。'], plate:['主夹板','承托所有轴榫与红宝石轴承的底板，确保齿轮中心距稳定。']
};
function mark(obj,id){obj.userData.part=id; parts.push(obj); return obj;}
function cyl(r,d,mat,z=0){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,d,64),mat);m.rotation.x=Math.PI/2;m.position.z=z;return m;}
function gearShape(radius, teeth, toothDepth=.10){const s=new THREE.Shape(); const n=teeth*4; for(let i=0;i<=n;i++){const a=i/n*Math.PI*2; const phase=i%4; const rr=radius + (phase===1||phase===2?toothDepth:0); const x=Math.cos(a)*rr,y=Math.sin(a)*rr; if(i===0)s.moveTo(x,y);else s.lineTo(x,y);} return s;}
function gear(id,x,y,r,teeth,mat,rot=0){const sh=gearShape(r,teeth,r*.14); const g=new THREE.ExtrudeGeometry(sh,{depth:.13,bevelEnabled:true,bevelSegments:2,bevelSize:.025,bevelThickness:.018});const mesh=mark(new THREE.Mesh(g,mat),id);mesh.position.set(x,y,.22);mesh.rotation.z=rot;root.add(mesh); const hub=mark(cyl(r*.2,.2,ruby,.31),id);hub.position.set(x,y,0);root.add(hub); return mesh;}
function pinion(id,x,y,r,teeth,mat,z=.42){const sh=gearShape(r,teeth,r*.18);const g=new THREE.ExtrudeGeometry(sh,{depth:.09,bevelEnabled:true,bevelSegments:1,bevelSize:.015});const m=mark(new THREE.Mesh(g,mat),id);m.position.set(x,y,z);root.add(m);return m;}
// plate
const plate=mark(new THREE.Mesh(new THREE.CylinderGeometry(3.35,3.35,.28,96),plateMat),'plate');plate.rotation.x=Math.PI/2;plate.position.z=-.16;root.add(plate);
const rim= new THREE.Mesh(new THREE.TorusGeometry(3.2,.07,12,96),brassDark);rim.rotation.x=Math.PI/2;rim.position.z=.02;root.add(rim);
// screws
[[-2.65,-1.75],[2.5,-1.75],[-2.65,1.75],[2.5,1.75],[0,2.55]].forEach(([x,y])=>{const s=mark(cyl(.11,.10,steel,.04),'plate');s.position.set(x,y,0);root.add(s);});
// bridges
function bridge(x,y,r,rot=0){const b=new THREE.Mesh(new THREE.BoxGeometry(r*1.9,.25,.12),brassDark);b.position.set(x,y,.02);b.rotation.z=rot;root.add(b);}
bridge(-.8,.95,1.15,-.18);bridge(.85,.3,1.0,.52);bridge(.9,-1.05,.85,-.8);
const data={barrel:[-2.15,1.05,.78,72],center:[-.78,.86,.58,80],third:[.45,.40,.48,75],fourth:[1.43,-.62,.40,80],escape:[.42,-1.58,.27,15],balance:[1.88,1.10,.72,32]};
const meshes={};
meshes.barrel=gear('barrel',...data.barrel,brass,.2); meshes.center=gear('center',...data.center,highlight,.1); meshes.third=gear('third',...data.third,brass,.2); meshes.fourth=gear('fourth',...data.fourth,brass,.0); meshes.escape=gear('escape',...data.escape,steel,.12); meshes.balance=gear('balance',...data.balance,steel,.0);
// pinions on axles (visible through teeth)
meshes.centerPin=pinion('center',-.78,.86,.18,10,brassDark,.48);meshes.thirdPin=pinion('third',.45,.40,.16,10,brassDark,.48);meshes.fourthPin=pinion('fourth',1.43,-.62,.13,8,steelDark,.48);
// mainspring barrel cap
const barrelCap=mark(new THREE.Mesh(new THREE.TorusGeometry(.62,.045,12,64),highlight),'barrel');barrelCap.rotation.x=Math.PI/2;barrelCap.position.set(-2.15,1.05,.39);root.add(barrelCap);
// escapement pallet lever
const lever=new THREE.Group(); lever.userData.part='pallet'; root.add(lever); const arm=new THREE.Mesh(new THREE.BoxGeometry(1.25,.12,.10),steel);arm.position.set(.88,-1.25,.55);arm.rotation.z=.08;lever.add(arm); const fork=mark(new THREE.Mesh(new THREE.BoxGeometry(.28,.35,.13),steelDark),'pallet');fork.position.set(.27,-1.54,.56);fork.rotation.z=-.15;lever.add(fork); const jewel1=mark(cyl(.095,.12,ruby,.64),'pallet');jewel1.position.set(.18,-1.42,0);lever.add(jewel1);const jewel2=mark(cyl(.095,.12,ruby,.64),'pallet');jewel2.position.set(.33,-1.61,0);lever.add(jewel2);
// balance cock and hairspring
const cock=new THREE.Mesh(new THREE.BoxGeometry(.16,1.15,.12),brassDark);cock.position.set(1.88,.38,.53);cock.rotation.z=-.18;root.add(cock);
const spring=new THREE.Mesh(new THREE.TorusGeometry(.49,.018,8,96),steel);spring.rotation.x=Math.PI/2; spring.scale.set(1,1.08,1);spring.position.set(1.88,1.10,.55);root.add(spring);
// ruby bearings
[['center',-.78,.86],['third',.45,.40],['fourth',1.43,-.62],['escape',.42,-1.58],['balance',1.88,1.10]].forEach(([id,x,y])=>{const j=mark(cyl(.095,.14,ruby,.62),id);j.position.set(x,y,0);root.add(j);});
// labels as sprite-like canvas textures
function label(text,x,y,color='#d4a45f'){const c=document.createElement('canvas');c.width=256;c.height=64;const ctx=c.getContext('2d');ctx.font='600 24px Arial';ctx.fillStyle=color;ctx.letterSpacing='2px';ctx.fillText(text,8,38);const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthTest:false}));sp.scale.set(.8,.2,1);sp.position.set(x,y,.7);root.add(sp);}
label('BARREL',-2.75,2.0);label('CENTER WHEEL',-1.35,.12);label('3RD',.05,.95);label('4TH',1.65,.02);label('ESCAPE',-.15,-2.0,'#b0c5cc');label('BALANCE',2.25,1.95,'#b0c5cc');
// lights
scene.add(new THREE.HemisphereLight(0xa9c8d4,0x141516,2.0));const key=new THREE.DirectionalLight(0xffd9a3,2.0);key.position.set(-4,5,7);key.castShadow=true;scene.add(key);const fill=new THREE.PointLight(0x8fa8ff,12,15);fill.position.set(4,-3,4);scene.add(fill);
// interaction
const ray=new THREE.Raycaster(), mouse=new THREE.Vector2(); let selected=null;
function select(id){selected=id; const [name,desc]=info[id]||['整枚机芯','拖动旋转视角，滚轮调整距离。点击任意零件查看它在轮系中的工作。'];document.querySelector('#selectedName').textContent=name;document.querySelector('#selectedDesc').textContent=desc;parts.forEach(p=>p.material?.emissive?.setHex((p.userData.part===id && id!=='plate')?0x6a3a0c: (p.material===ruby?0x260611:0x000000)));}
renderer.domElement.addEventListener('pointerdown',e=>{const r=renderer.domElement.getBoundingClientRect();mouse.x=(e.clientX-r.left)/r.width*2-1;mouse.y=-(e.clientY-r.top)/r.height*2+1;ray.setFromCamera(mouse,camera);const hit=ray.intersectObjects(parts,true)[0];if(hit){let o=hit.object;while(o&&!o.userData.part)o=o.parent;if(o)select(o.userData.part);}});
document.querySelectorAll('.chips button').forEach(b=>b.addEventListener('click',()=>select(b.dataset.focus)));
function resize(){const el=document.querySelector('#viewport');const w=el.clientWidth,h=el.clientHeight;camera.aspect=w/h;camera.position.z=w<600?42:28;camera.updateProjectionMatrix();renderer.setSize(w,h,false);} addEventListener('resize',resize);resize();select('plate');
let last=performance.now();function tick(now){const dt=Math.min(.05,(now-last)/1000);last=now;const t=now/1000;const drive=t*.06;meshes.barrel.rotation.z=drive*.22;meshes.center.rotation.z=drive;meshes.centerPin.rotation.z=drive;meshes.third.rotation.z=-drive*8;meshes.thirdPin.rotation.z=-drive*8;meshes.fourth.rotation.z=drive*60;meshes.fourthPin.rotation.z=drive*60;meshes.escape.rotation.z=-drive*600; // escapement
lever.rotation.z=Math.sin(t*Math.PI*10)*.12; const bal=Math.sin(t*Math.PI*10); meshes.balance.rotation.z=bal*.24; spring.rotation.z=bal*.24; controls.update();renderer.render(scene,camera);requestAnimationFrame(tick);} requestAnimationFrame(tick);
