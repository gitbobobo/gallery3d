/* The entire landscape is painted with Canvas paths. No source photographs or textures are used. */
(()=>{
'use strict';
const W=640,H=1280,S=1.65, canvas=document.getElementById('painting'), ctx=canvas.getContext('2d');
let seed=7027;
const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296},r=(a,b)=>a+(b-a)*rand(),pick=a=>a[Math.floor(rand()*a.length)];
const ink=(a=.3)=>`rgba(35,40,32,${a})`,silk=(a=.3)=>`rgba(202,181,137,${a})`;
function layer(){const c=document.createElement('canvas');c.width=W*S;c.height=H*S;const g=c.getContext('2d');g.scale(S,S);return[c,g]}
const [paper,p]=layer(),[mountain,m]=layer(),[middle,d]=layer(),[front,f]=layer(),[grain,q]=layer();
function path(points,close=true,rough=1.4){const p=new Path2D();p.moveTo(...points[0]);for(let k=1;k<points.length;k++){const a=points[k-1],b=points[k],len=Math.hypot(b[0]-a[0],b[1]-a[1]),n=Math.max(1,Math.floor(len/5));for(let j=1;j<=n;j++){const t=j/n,off=Math.sin(t*Math.PI)*r(-rough,rough);p.lineTo(a[0]+(b[0]-a[0])*t+off,a[1]+(b[1]-a[1])*t+r(-rough*.4,rough*.4))}}if(close)p.closePath();return p}
function organicPath(points){
 const p=new Path2D(),n=points.length;
 for(let i=0;i<n;i++){
 const a=points[(i+n-1)%n],b=points[i],c=points[(i+1)%n],d=points[(i+2)%n];
 const count=Math.max(3,Math.floor(Math.hypot(c[0]-b[0],c[1]-b[1])/4));
 for(let j=0;j<count;j++){
 const t=j/count,t2=t*t,t3=t2*t;
 const x=.5*((2*b[0])+(-a[0]+c[0])*t+(2*a[0]-5*b[0]+4*c[0]-d[0])*t2+(-a[0]+3*b[0]-3*c[0]+d[0])*t3);
 const y=.5*((2*b[1])+(-a[1]+c[1])*t+(2*a[1]-5*b[1]+4*c[1]-d[1])*t2+(-a[1]+3*b[1]-3*c[1]+d[1])*t3);
 if(i===0&&j===0)p.moveTo(x,y);else p.lineTo(x+r(-1.7,1.7),y+r(-1.3,1.3));
 }
 }p.closePath();return p;
}
function stroke(g,pts,width=.7,alpha=.35){g.lineCap='round';g.lineJoin='round';g.lineWidth=width;g.strokeStyle=ink(alpha);g.stroke(path(pts,false,width>.9?1.1:.4))}
function soft(g,x,y,rx,ry,alpha=.15,color='32,39,30'){g.save();g.translate(x,y);g.scale(rx,ry);const gr=g.createRadialGradient(0,0,0,0,0,1);gr.addColorStop(0,`rgba(${color},${alpha})`);gr.addColorStop(.48,`rgba(${color},${alpha*.65})`);gr.addColorStop(1,`rgba(${color},0)`);g.fillStyle=gr;g.fillRect(-1,-1,2,2);g.restore()}
function dab(g,x,y,size=1,alpha=.4){g.fillStyle=ink(alpha);g.beginPath();g.ellipse(x,y,size*r(.55,1.2),size*r(.45,.95),r(0,Math.PI),0,Math.PI*2);g.fill()}
function foliage(g,x,y,rx,ry,density=1,dark=.48){soft(g,x,y,rx*1.05,ry*1.2,dark*.56);const n=Math.floor(rx*ry*density*.75);for(let k=0;k<n;k++){const t=r(0,6.28),v=Math.sqrt(rand()),xx=x+Math.cos(t)*rx*v,yy=y+Math.sin(t)*ry*v;const a=dark*r(.4,1.3)*(1-.18*v);if(rand()<.58){g.strokeStyle=ink(a);g.lineWidth=r(.35,.8);g.beginPath();g.moveTo(xx-r(.8,1.9),yy);g.quadraticCurveTo(xx+r(-1,1),yy-r(1,2.7),xx+r(1,2),yy-r(.1,1.1));g.stroke()}else dab(g,xx,yy,r(.4,1.3),a)}}
function tree(g,x,y,height,spread=height*.45,variant='oak',dark=.55){
 const crowns=[];
 function branch(x,y,len,ang,depth,width){const nx=x+Math.cos(ang)*len,ny=y+Math.sin(ang)*len;const bend=r(-len*.14,len*.14);g.lineCap='round';g.strokeStyle=ink(dark*.95);g.lineWidth=width;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo((x+nx)/2+bend,(y+ny)/2,nx,ny);g.stroke();if(width>1.7){g.strokeStyle=silk(.55);g.lineWidth=width*.42;g.stroke()}if(depth===1&&rand()<.75)crowns.push([nx,ny+len*.15]);if(depth===2&&rand()<.45)crowns.push([nx,ny]);if(depth>0){branch(nx,ny,len*r(.53,.7),ang-r(.35,.76),depth-1,width*.58);branch(nx,ny,len*r(.5,.72),ang+r(.32,.69),depth-1,width*.57);if(depth===2&&rand()<.6)branch(nx,ny,len*.55,ang+r(-.25,.25),depth-1,width*.45)}else crowns.push([nx,ny])}
 if(variant==='pine'){
 stroke(g,[[x,y],[x+r(-3,3),y-height]],height*.035,dark);
 for(let t=.1;t<.95;t+=.1){const yy=y-height*t,wide=spread*(1-t)*r(.8,1.3);for(const sign of[-1,1]){stroke(g,[[x,yy+3],[x+sign*wide*.6,yy-3],[x+sign*wide,yy-5]],.6,dark);for(let k=0;k<wide*4;k++){let xx=x+sign*r(0,wide),y1=yy-r(1,8);stroke(g,[[xx-sign*2,y1+2],[xx,y1-4],[xx+sign*2,y1+1]],r(.4,.7),dark*r(.5,1))}}}
 }else{
 branch(x,y,height*.47,-Math.PI/2+r(-.14,.14),3,Math.max(1.2,height*.07));
 for(const [cx,cy]of crowns)foliage(g,cx,cy,spread*r(.2,.42),height*r(.1,.17),1.2,dark);
 }
 stroke(g,[[x-3,y+1],[x+2,y-2],[x+5,y+1]],.5,dark*.65);
}
function crag(g,points,{tone=.24,count=2000,flow=.25,edge=.62}={}){
 const shape=organicPath(points);let minX=Math.min(...points.map(p=>p[0])),maxX=Math.max(...points.map(p=>p[0])),minY=Math.min(...points.map(p=>p[1])),maxY=Math.max(...points.map(p=>p[1]));
 g.save();g.clip(shape);const gr=g.createLinearGradient(minX,minY,maxX,maxY);gr.addColorStop(0,`rgba(51,55,41,${tone*.75})`);gr.addColorStop(.43,`rgba(48,53,39,${tone})`);gr.addColorStop(1,`rgba(90,85,57,${tone*.4})`);g.fillStyle=gr;g.fillRect(minX,minY,maxX-minX,maxY-minY);
 soft(g,minX+(maxX-minX)*.34,minY+(maxY-minY)*.33,(maxX-minX)*.45,(maxY-minY)*.54,.16,'215,194,143');
 for(let k=0;k<55;k++)soft(g,r(minX,maxX),r(minY,maxY),r(9,38),r(12,55),r(.035,.13));
 // Wash gathers in deep crevices, while raised faces catch dry, light brushwork.
 for(let j=0;j<3;j++){
 let x=minX+(maxX-minX)*(j+.55)/3,y=minY+r(0,(maxY-minY)*.16),pts=[[x,y]];
 for(let k=0;k<7;k++){x+=r(-9,12);y+=(maxY-minY)/8;pts.push([x,y])}
 stroke(g,pts,r(5,12),.075);stroke(g,pts,r(1,2.8),.34);
 }

 for(let k=0;k<count;k++){let x=r(minX,maxX),y=r(minY,maxY);const len=r(1,9),a=r(.09,.31);stroke(g,[[x,y],[x+len*flow+r(-1,1),y+len]],r(.3,.8),a);if(k%8===0){g.strokeStyle=silk(.17);g.lineWidth=.5;g.beginPath();g.moveTo(x+1.5,y);g.lineTo(x+1.5+len*flow,y+len*.8);g.stroke();}}
 // Broken, tapering striations rather than flat polygon facets.
 for(let k=0;k<(maxX-minX)/7;k++){let x=r(minX,maxX),y=r(minY,maxY),pts=[[x,y]];for(let j=0;j<r(3,10);j++){x+=r(-3,4)+flow*6;y+=r(4,12);pts.push([x,y])}stroke(g,pts,r(.4,1.1),r(.14,.38));}
 // Angular folds and flaking dry strokes describe the rocks from within.
 for(let k=0;k<(maxX-minX)*(maxY-minY)/150;k++){
 let x=r(minX,maxX),y=r(minY,maxY),points=[[x,y]];
 for(let z=0;z<r(3,7);z++){x+=r(-4,7);y+=r(-5,3);points.push([x,y])}
 stroke(g,points,r(.35,1.05),r(.11,.34));
 }
 g.restore();g.strokeStyle=ink(edge);g.lineWidth=1.2;g.stroke(shape);return shape;
}
// Warm, uneven, centuries-old silk, with no photographic texture.
p.fillStyle='#c6b182';p.fillRect(0,0,W,H);for(let k=0;k<100;k++)soft(p,r(0,W),r(0,H),r(25,190),r(35,250),r(.01,.045),pick(['90,66,34','226,209,161','77,71,47']));
const paperGlow=p.createLinearGradient(0,0,W,0);paperGlow.addColorStop(0,'rgba(83,62,32,.1)');paperGlow.addColorStop(.15,'rgba(245,226,173,.05)');paperGlow.addColorStop(.85,'rgba(245,226,173,.02)');paperGlow.addColorStop(1,'rgba(77,61,33,.13)');p.fillStyle=paperGlow;p.fillRect(0,0,W,H);
// Distant side ridges.
crag(m,[[0,427],[24,412],[59,378],[83,388],[105,354],[126,389],[136,547],[149,714],[99,806],[0,838]],{tone:.1,count:3500,edge:.19});
for(let k=0;k<13;k++)foliage(m,r(0,95),r(394,426),r(9,21),r(7,15),1,.24);
const mainPoints=[[78,865],[89,770],[84,661],[97,597],[108,542],[107,494],[98,466],[107,417],[106,363],[120,337],[115,298],[127,263],[112,226],[117,179],[147,138],[181,124],[207,135],[231,117],[258,119],[268,88],[275,53],[300,39],[331,28],[355,31],[377,56],[400,50],[428,35],[456,44],[473,66],[490,84],[493,116],[505,136],[512,181],[518,215],[530,267],[535,321],[548,374],[547,443],[535,482],[546,548],[528,626],[524,729],[511,843],[490,873],[248,899]];
const mainPath=path(mainPoints,true,2.8);
m.save();m.clip(mainPath);let mg=m.createLinearGradient(0,24,0,918);mg.addColorStop(0,'rgba(47,50,38,.63)');mg.addColorStop(.22,'rgba(65,67,47,.53)');mg.addColorStop(.55,'rgba(91,85,56,.33)');mg.addColorStop(.85,'rgba(114,100,64,.19)');mg.addColorStop(1,'rgba(154,133,89,0)');m.fillStyle=mg;m.fillRect(0,0,W,H);
for(let k=0;k<170;k++)soft(m,r(85,550),r(40,890),r(15,70),r(25,115),r(.025,.115));
// Overlapping, wet ink washes model rounded geological buttresses.
for(let j=0;j<8;j++){
 const bx=135+j*52;
 for(let k=0;k<24;k++){
 const yy=130+k*29,xx=bx+Math.sin(yy/107+j*1.7)*19+yy*.035;
 soft(m,xx,yy,17+r(0,20),48+r(0,30),r(.035,.095));
 soft(m,xx-23,yy-10,18+r(0,12),50+r(0,30),r(.012,.043),'218,197,147');
 }
}
// Dry, slightly diagonal strokes contour the ridges, without solid facets.
for(let k=0;k<17000;k++){
 const yy=r(110,849),column=Math.floor(r(0,8)),xx=124+column*53+Math.sin(yy/107+column*1.7)*19+yy*.035+r(-21,17),l=r(3,17);
 stroke(m,[[xx,yy],[xx+l*.27,yy+l*.48],[xx+l*.46,yy+l]],r(.35,1.1),r(.09,.29));
}

// Monumental folds. The dark fissures follow the downward weight of the mountain.
const ridges=[[[309,47],[298,103],[311,151],[308,227],[331,279],[317,325],[333,405],[329,462],[345,539],[335,637],[346,716],[341,830]],[[443,75],[428,132],[450,190],[442,241],[460,284],[459,332],[485,385],[477,421],[493,487],[478,548],[495,616],[481,718],[477,819]],[[382,102],[391,157],[408,184],[412,242],[397,289],[417,341],[409,397],[439,462],[428,535],[454,588],[445,669],[460,761]],[[176,170],[188,210],[174,273],[190,312],[171,388],[174,452],[159,511],[170,580],[157,676],[172,772]],[[249,144],[231,199],[243,249],[229,299],[247,358],[225,409],[236,476],[214,534],[227,615],[209,711],[218,829]],[[130,304],[144,361],[128,398],[142,430],[125,505],[137,563],[117,662],[128,729],[113,825]],[[359,279],[380,312],[365,365],[391,429],[375,504],[399,565],[385,631],[414,697],[406,780]]];
for(const pts of ridges){stroke(m,pts,16,.045);stroke(m,pts,7,.08);stroke(m,pts,2,.28);stroke(m,pts,.75,.57);for(let k=0;k<25;k++){let i=Math.floor(r(0,pts.length-1)),a=pts[i],b=pts[i+1],t=rand(),x=a[0]+(b[0]-a[0])*t,y=a[1]+(b[1]-a[1])*t;stroke(m,[[x,y],[x+r(-17,13),y+r(4,22)],[x+r(-17,17),y+r(23,42)]],r(.45,.9),r(.11,.28))}}
// Rain-dot cun: interrupted narrow brush marks, interspersed with pale dry-brush gaps.
for(let k=0;k<58000;k++){
 let x=r(84,560),y=r(42,914),slope=.13+.28*Math.sin(x/48+y/130),l=r(1,6.2),a=r(.11,.34)*(1-.4*y/H);if(rand()<.11)l=r(6,14);
 m.lineWidth=r(.33,.95);m.strokeStyle=ink(a);m.beginPath();m.moveTo(x,y);m.lineTo(x+slope*l+r(-.3,.3),y+l);m.stroke();
 if(k%4===0){m.strokeStyle=silk(r(.045,.17));m.lineWidth=r(.4,.9);m.beginPath();m.moveTo(x+1.5,y);m.lineTo(x+1.5+slope*l,y+l*.9);m.stroke()}
}
// Moss, dwarf woods and broken dots collect along folds in natural, ragged bands.
for(let k=0;k<47000;k++){
 let x=r(105,535),y=r(35,775);
 const field=Math.sin(x/29+y/58)+.65*Math.cos(x/17-y/47)+.48*Math.sin(x/7+y/18)+.4*Math.cos(x/11+y/9);
 const threshold=-.62+y/420;
 if(field>threshold){let size=r(.4,1.6),alpha=r(.16,.55)*(1-y/1400);dab(m,x,y,size,alpha);if(k%3===0)stroke(m,[[x-1,y],[x,y-2],[x+1.3,y-.5]],.55,alpha*.8)}
}

// Broad thickets follow ledges; the upper mountain is wooded, never a smooth slab.
for(let j=0;j<85;j++){
 let x=r(127,489),y=r(85,448);
 const f=Math.sin(x/43+y/73)+Math.cos(x/61-y/39);
 if(f>.36&&!(x>397&&y<231)){
  soft(m,x,y,r(14,38),r(11,26),r(.1,.2));
  for(let z=0;z<5;z++)foliage(m,x+r(-17,17),y+r(-12,12),r(5,14),r(4,11),1.7,r(.37,.66));
 }
}
for(const a of [[277,143,33,14],[262,168,34,21],[298,210,42,23],[319,257,33,25],[334,290,26,22],[362,330,26,23],[187,270,21,13],[206,288,23,14],[251,323,27,18],[419,402,22,16]]){
 soft(m,a[0],a[1],a[2]*1.7,a[3]*1.7,.19);
 for(let j=0;j<7;j++)foliage(m,a[0]+r(-a[2]*.7,a[2]*.7),a[1]+r(-a[3]*.5,a[3]*.5),r(7,15),r(5,13),2,.59);
}
m.restore();m.strokeStyle=ink(.23);m.lineWidth=1.2;m.stroke(mainPath);
// Tree-covered summit and ledges, dotted brush foliage gathers on top of the stone.
for(const [x,y,rx,ry]of [[152,144,35,19],[206,128,25,20],[252,122,28,18],[299,54,32,20],[335,40,27,17],[364,66,32,17],[403,64,28,20],[441,51,22,17],[472,89,24,21],[137,287,24,13],[215,195,20,14],[252,183,24,14],[276,180,18,11],[343,190,17,13]])foliage(m,x,y,rx,ry,1.9,.49);
for(let k=0;k<43;k++){let x=r(278,476),y=65+Math.sin(x*.02)*15;tree(m,x,y,r(7,18),r(3,6),'pine',.43)}
// The narrow eastern ravine and its waterfall.
crag(m,[[568,152],[598,161],[619,143],[640,159],[660,197],[663,741],[614,820],[547,862],[546,725],[556,638],[558,561],[544,506],[553,436],[538,391],[548,315],[534,247]],{tone:.33,count:9500,flow:-.28,edge:.45});
for(let k=0;k<15;k++)foliage(m,r(550,666),r(156,208),r(18,29),r(11,22),1.6,.5);
m.save();m.fillStyle=ink(.41);m.fill(path([[539,400],[552,447],[542,499],[549,565],[539,622],[542,690],[530,772],[526,828],[511,832],[516,770],[513,681],[523,621],[523,570],[532,493],[526,452]],true,2));m.restore();
// Small west cliff standing forward of the mountain.
crag(m,[[-8,524],[26,528],[47,540],[72,578],[95,650],[105,739],[112,828],[87,878],[-6,883]],{tone:.24,count:5500,flow:.19,edge:.4});
for(let k=0;k<8;k++)foliage(m,r(0,68),r(528,554),r(13,22),r(8,16),1.5,.48);
// Soft unpainted air at the mountain foot.
// Feather the base into blank silk; no hard horizon at the mountain foot.
m.save();m.globalCompositeOperation='destination-out';const fade=m.createLinearGradient(0,737,0,907);fade.addColorStop(0,'rgba(0,0,0,0)');fade.addColorStop(.35,'rgba(0,0,0,.23)');fade.addColorStop(.8,'rgba(0,0,0,.92)');fade.addColorStop(1,'rgba(0,0,0,1)');m.fillStyle=fade;m.fillRect(0,737,W,180);m.restore();
// Midground rock terrace; the temple is swallowed by old trees.
crag(d,[[265,1005],[274,960],[269,928],[281,880],[296,860],[331,850],[367,862],[397,854],[422,878],[462,878],[481,910],[542,916],[580,961],[639,977],[652,1094],[560,1107],[485,1069],[411,1063],[363,1049],[306,1048]],{tone:.3,count:6200,flow:-.38,edge:.53});
// Horizontal shelf cuts across vertical, wet cliff strokes.
for(let k=0;k<40;k++){const y=r(906,1000),x=r(276,530);stroke(d,[[x,y],[x+r(12,36),y+r(-4,3)],[x+r(39,72),y+r(-7,3)]],r(.5,1),r(.16,.35))}
function temple(g,x,y,s){g.save();g.translate(x,y);g.scale(s,s);
 const buildings=[[-13,8,35,17],[13,21,38,22],[1,42,27,15]];
 for(const [a,b,w,h] of buildings){g.fillStyle='rgba(178,159,112,.55)';g.fillRect(a,b,w,h);stroke(g,[[a,b],[a,b+h],[a+w,b+h],[a+w,b]],.6,.5);for(let j=3;j<w;j+=5)stroke(g,[[a+j,b+2],[a+j,b+h-2]],.5,.53);const roof=path([[a-7,b],[a+1,b-4],[a+w*.48,b-13],[a+w*.54,b-13],[a+w-2,b-5],[a+w+7,b],[a+w*.5,b+2]]);g.fillStyle=ink(.75);g.fill(roof);g.strokeStyle=silk(.3);g.lineWidth=.6;g.stroke(roof);stroke(g,[[a-5,b-1],[a-8,b-4]],.9,.75);stroke(g,[[a+w+5,b-1],[a+w+8,b-3]],.9,.75);stroke(g,[[a+w*.5,b-14],[a+w*.5,b-17]],.6,.6)}g.restore()}
// Back ranks of pine needles and mixed broadleaf crowns.
for(let k=0;k<13;k++)tree(d,r(296,478),r(861,906),r(25,56),r(8,15),'pine',r(.4,.68));
for(let k=0;k<29;k++)tree(d,r(299,489),r(886,955),r(22,55),r(11,24),'oak',r(.52,.74));
for(let k=0;k<11;k++)tree(d,r(322,629),r(953,1007),r(48,85),r(18,35),'oak',r(.39,.65));
temple(d,538,881,.9);
for(let k=0;k<12;k++)tree(d,r(425,625),r(987,1053),r(42,67),r(19,29),'oak',r(.5,.69));
for(const a of[[503,951,56,28],[569,982,58,27],[604,1026,80,37],[460,976,60,30],[398,957,52,25],[351,917,37,18],[635,999,55,21]])tree(d,a[0],a[1],a[2],a[3],'oak',.6);
tree(d,461,1043,104,42,'oak',.7);tree(d,545,1080,102,39,'oak',.69);
// West bank; the small diagonal path leads up and into the trees.
crag(d,[[-7,898],[28,907],[58,919],[96,931],[135,946],[164,953],[177,970],[168,989],[192,1008],[230,1023],[254,1068],[231,1101],[176,1117],[105,1142],[-9,1160]],{tone:.29,count:6000,flow:.48,edge:.47});
for(let k=0;k<21;k++)tree(d,r(2,177),r(992,1056),r(23,66),r(12,26),'oak',r(.4,.65));
for(let k=0;k<29;k++)stroke(d,[[r(0,100),r(1042,1076)],[r(100,160),r(1017,1050)]],r(.3,.7),.11);
// Connecting creek and low falls.
const creekPath=path([[297,1003],[309,1008],[314,1049],[302,1081],[287,1094],[261,1100],[251,1120],[211,1138],[163,1151],[68,1180],[-9,1185],[-9,1151],[87,1149],[160,1128],[229,1114],[239,1091],[272,1076],[285,1051]],true,1.2);d.fillStyle='rgba(213,194,148,.6)';d.fill(creekPath);
for(let k=0;k<70;k++){let x=r(280,305),y=r(1008,1084);d.strokeStyle=silk(r(.2,.6));d.lineWidth=r(.4,.85);d.beginPath();d.moveTo(x,y);d.lineTo(x+r(-4,4),y+r(5,18));d.stroke()}
for(let k=0;k<130;k++){let x=r(0,340),y=r(1089,1181);stroke(d,[[x,y],[x+r(4,18),y+r(-.5,.5)]],r(.3,.65),r(.07,.22))}
// Creek boulders, placed one by one.
for(const [x,y,s] of[[252,1106,14],[296,1100,18],[327,1092,23],[367,1073,38],[429,1066,41],[485,1090,29],[174,1101,35],[72,1131,28],[139,1135,38]]){crag(d,[[x-s,y+s*.45],[x-s*.91,y-s*.3],[x-s*.48,y-s*.71],[x-s*.14,y-s*.84],[x+s*.27,y-s*.62],[x+s*.54,y-s*.55],[x+s,y+s*.23],[x+s*.54,y+s*.54]],{tone:.32,count:220,flow:.6,edge:.61})}
// The winding, pale trail, just above the foreground boulders.
d.fillStyle='rgba(191,170,124,.74)';d.fill(path([[659,1092],[578,1106],[508,1117],[448,1126],[380,1135],[301,1145],[256,1135],[217,1119],[183,1102],[157,1088],[103,1073],[105,1080],[151,1104],[197,1124],[239,1155],[299,1166],[390,1152],[464,1143],[535,1137],[594,1124],[654,1115]],true,1.3));
for(let k=0;k<180;k++){let x=r(226,640),y=1158-(x-226)*.108+r(-2,8);stroke(d,[[x,y],[x+r(2,9),y-r(0,2)]],r(.3,.65),r(.08,.19))}
// Foreground trees on the far right become the veil through which the travelers emerge.
for(let k=0;k<8;k++)tree(f,r(581,661),r(1099,1124),r(63,121),r(18,34),'oak',r(.6,.78));
// Heavy foreground stones, keeping the painting grounded.
const foregroundRocks=[[[129,1191],[138,1167],[160,1158],[176,1156],[184,1145],[206,1155],[228,1150],[249,1168],[262,1196],[275,1208],[255,1239],[212,1261],[155,1238]],[[292,1190],[300,1154],[325,1148],[341,1139],[361,1133],[380,1141],[399,1138],[424,1151],[455,1168],[465,1207],[437,1259],[359,1269],[310,1249]],[[466,1222],[505,1190],[548,1176],[570,1180],[591,1157],[625,1149],[652,1157],[654,1296],[489,1294]],[[179,1288],[183,1260],[204,1235],[215,1210],[230,1206],[249,1189],[275,1197],[295,1210],[307,1242],[320,1266],[292,1295]],[[323,1298],[310,1262],[323,1236],[341,1223],[355,1229],[373,1205],[394,1218],[406,1231],[433,1246],[443,1289]],[[418,1290],[421,1268],[433,1242],[455,1228],[470,1234],[491,1225],[515,1243],[535,1270],[529,1290]]];
// Ink wash bank at the very bottom left.
crag(f,[[-10,1192],[32,1188],[68,1180],[105,1195],[148,1204],[185,1244],[179,1297],[-10,1298]],{tone:.37,count:2200,flow:-.1,edge:.35});
for(let i=0;i<foregroundRocks.length;i++){
 const pts=foregroundRocks[i];crag(f,pts,{tone:.46,count:3900,flow:i%2?.7:-.45,edge:.69});
 let minX=Math.min(...pts.map(p=>p[0])),maxX=Math.max(...pts.map(p=>p[0])),minY=Math.min(...pts.map(p=>p[1])),maxY=Math.max(...pts.map(p=>p[1]));
 f.save();f.clip(path(pts));
 for(let k=0;k<29;k++)soft(f,r(minX,maxX),r(minY,maxY),r(5,22),r(4,14),r(.04,.13));
 for(let k=0;k<500;k++){let x=r(minX,maxX),y=r(minY,maxY),l=r(2,9);stroke(f,[[x,y],[x+l*.6,y-l*.55],[x+l,y-l*.7]],r(.4,1.2),r(.09,.32))}
 for(let k=0;k<11;k++){let x=r(minX,maxX),y=r(minY,maxY);stroke(f,[[x,y],[x+r(4,15),y-r(5,12)],[x+r(17,34),y-r(7,18)]],r(.6,1.6),r(.3,.57))}for(let k=0;k<590;k++){let x=r(minX,maxX),y=r(minY,maxY);dab(f,x,y,r(.5,1.9),r(.1,.37))}f.restore();
}
// Silk weave: fine generated grain, warp and weft, occasional foxing.
const qw=grain.width,qh=grain.height,pixels=q.createImageData(qw,qh);for(let i=0;i<pixels.data.length;i+=4){const v=rand();pixels.data[i]=v<.48?53:231;pixels.data[i+1]=v<.48?49:217;pixels.data[i+2]=v<.48?33:177;pixels.data[i+3]=Math.floor(r(2,13))}q.putImageData(pixels,0,0);
q.strokeStyle='rgba(71,57,29,.044)';q.lineWidth=.3;for(let x=0;x<W;x+=1.9){q.beginPath();q.moveTo(x,0);q.lineTo(x+r(-.5,.5),H);q.stroke()}q.strokeStyle='rgba(232,214,165,.05)';for(let y=0;y<H;y+=2.1){q.beginPath();q.moveTo(0,y);q.lineTo(W,y);q.stroke()}for(let k=0;k<540;k++)dab(q,r(0,W),r(0,H),r(.2,1.1),r(.03,.14));
// Soft animated cloud banks are generated once, then drift across the painting.
const mist=document.createElement('canvas');mist.width=1000;mist.height=220;const mistCtx=mist.getContext('2d');for(let k=0;k<42;k++)soft(mistCtx,r(40,960),r(40,180),r(70,160),r(16,53),r(.06,.19),'207,189,148');
const duration=64, ease=(a,b,v)=>{let t=Math.max(0,Math.min(1,(v-a)/(b-a)));return t*t*(3-2*t)},clamp=x=>Math.min(1,Math.max(0,x));
let lastFrame=0;
function waterfall(t){
 const reveal=.25+.75*ease(1,10,t);ctx.save();ctx.globalAlpha=reveal;
 for(let i=0;i<5;i++){ctx.strokeStyle=`rgba(221,205,163,${.17+.13*Math.sin(t*1.2+i)})`;ctx.lineWidth=i===2?1.7:.7;ctx.beginPath();for(let y=443;y<825;y+=5){let x=538-(y-443)*.047+Math.sin(y*.034+t*.35)*.8+(i-2)*.8;if(y===443)ctx.moveTo(x,y);else ctx.lineTo(x,y)}ctx.stroke()}
 for(let k=0;k<20;k++){let y=445+(k*23+t*47)%377,x=538-(y-443)*.047+Math.sin(y*.033)*.7;ctx.strokeStyle=silk(.55);ctx.lineWidth=rStatic(k,.4,.9);ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-.25,y+6+(k%3)*3);ctx.stroke()}
 ctx.restore();
}
function rStatic(i,a,b){return a+(b-a)*(Math.sin(i*738.2)*.5+.5)}
function mule(x,y,t,index,fade=1){ctx.save();ctx.translate(x,y);ctx.globalAlpha=fade;const step=t*5.5+index*1.8;ctx.translate(0,Math.sin(step*2)*.35);ctx.strokeStyle=ink(.9);ctx.fillStyle=ink(.81);ctx.lineWidth=1.15;ctx.lineCap='round';
 ctx.beginPath();ctx.moveTo(-8,-11);ctx.quadraticCurveTo(-2,-14,8,-10);ctx.lineTo(9,-4);ctx.quadraticCurveTo(0,-2,-7,-5);ctx.closePath();ctx.fill();
 // Left-facing neck, head, and alert long ears.
 ctx.beginPath();ctx.moveTo(-8,-9);ctx.lineTo(-10,-16);ctx.lineTo(-15,-14);ctx.lineTo(-17,-10);ctx.lineTo(-13,-8);ctx.lineTo(-8,-5);ctx.fill();stroke(ctx,[[-13,-14],[-14,-20],[-11,-16]],.9,.85);stroke(ctx,[[-11,-15],[-10,-19]],.8,.8);
 for(let leg=0;leg<4;leg++){let lx=leg<2?-5:6,phase=step+(leg%2)*Math.PI+(leg>1?1.9:0),sx=Math.sin(phase)*2.7;stroke(ctx,[[lx,-5],[lx+sx*.5,-1],[lx+sx,3]],.75,.9)}
 stroke(ctx,[[9,-10],[12,-7],[13,-4]],.75,.85);
 // Two balanced loads and their pale rope lashings.
 ctx.fillStyle='rgba(117,107,74,.98)';ctx.fill(path([[-5,-16],[3,-17],[6,-13],[5,-8],[-5,-8]],true,.2));stroke(ctx,[[-5,-16],[3,-17],[6,-13],[5,-8],[-5,-8],[-5,-16]],.7,.84);ctx.strokeStyle=silk(.7);ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(-2,-16);ctx.lineTo(-1,-8);ctx.moveTo(-4,-12);ctx.lineTo(5,-12);ctx.stroke();
 ctx.restore();}
function person(x,y,t,stopped=false,fade=1){ctx.save();ctx.translate(x,y);ctx.globalAlpha=fade;ctx.fillStyle=ink(.93);ctx.beginPath();ctx.arc(0,-16,1.6,0,Math.PI*2);ctx.fill();stroke(ctx,[[-2,-17],[2,-17]],.8,.8);ctx.fill(path([[-1,-13],[2,-12],[4,-4],[-3,-4]],true,.2));const sw=stopped?0:Math.sin(t*6)*2;stroke(ctx,[[-1,-4],[-2+sw,2]],.8,.95);stroke(ctx,[[2,-4],[2-sw,2]],.8,.9);stroke(ctx,[[0,-11],[-5,-8],[-7,-10]],.8,.85);stroke(ctx,[[-6,-10],[-8,2]],.6,.65);if(stopped){stroke(ctx,[[1,-16],[3,-18]],.7,.9)}ctx.restore()}
function travelers(t){
 if(t<12||t>57)return;
 const progress=clamp((t-12)/44),head=645-750*progress;
 const roadY=x=>x>=280?1151-(x-260)*.105:1149-Math.pow(Math.max(0,(280-x)/200),1.4)*95;
 // Lead traveler and four pack mules are independent silhouettes.
 for(let i=0;i<4;i++){let x=head+i*31;const opacity=(1-ease(615,659,x))*ease(77,150,x);
 mule(x,roadY(x),t,i,opacity);
 }
 const guide=head-17;person(guide,roadY(guide),t,false,ease(0,1,clamp((645-guide)/38))*ease(72,146,guide));
 let last=head+132;
 if(t>=30&&t<37)last=(645-750*(30-12)/44)+132;
 else if(t>=37&&t<41){const at=(645-750*(30-12)/44)+132;const end=(645-750*(41-12)/44)+132;last=at+(end-at)*ease(37,41,t)}
 person(last,roadY(last),t*1.45,t>=30&&t<37,ease(0,1,clamp((660-last)/45))*ease(72,150,last));
 // Thin lead ropes join the caravan.
 ctx.globalAlpha=.32;for(let i=0;i<3;i++){let x=head+i*31;stroke(ctx,[[x+10,roadY(x)-10],[x+17,roadY(x)-6],[x+16,roadY(x+31)-10]],.4,.6)}ctx.globalAlpha=1;
}
function birds(t){if(t<30.5||t>43)return;let age=t-30.5;ctx.save();for(let i=0;i<9;i++){const tt=Math.max(0,age-i*.15),x=500-tt*(18+i*1.7)+Math.sin(tt+i)*8,y=882-tt*(19+i*.8)-i*2;ctx.globalAlpha=Math.min(1,tt)* (1-ease(9,12,tt));let wing=Math.sin(tt*7+i)*2.7,sz=2.3+(i%3)*.6;stroke(ctx,[[x-sz,y+wing],[x,y],[x+sz,y+wing*.8]],.8,.8)}ctx.restore()}
function fog(t){
 const morning=1-ease(0,12,t),end=ease(48,61,t),amount=.2+morning*.72+end*.72;
 ctx.save();ctx.globalAlpha=amount;
 for(let i=0;i<4;i++){let dx=-150+Math.sin(t*.035+i*1.2)*80,yy=768+i*43;ctx.drawImage(mist,dx,yy,910,145)}
 ctx.globalAlpha=.08+morning*.2+end*.19;ctx.drawImage(mist,-140+Math.sin(t*.024)*65,432,915,270);
 ctx.globalAlpha=morning*.8+end*.8;ctx.drawImage(mist,-200+Math.sin(t*.04)*40,987,1040,136);
 ctx.restore();
}
function signature(t){const a=ease(53,60,t)*(1-ease(62,64,t));if(a<=0)return;ctx.save();ctx.globalAlpha=a*.85;ctx.fillStyle='#31382b';ctx.font='17px "STKaiti","KaiTi","Songti SC",serif';ctx.translate(615,1080);ctx.rotate(-.035);ctx.fillText('范',0,0);ctx.fillText('宽',0,18);ctx.restore()}
function draw(t=0){ctx.setTransform(S,0,0,S,0,0);ctx.clearRect(0,0,W,H);ctx.drawImage(paper,0,0,W,H);ctx.drawImage(mountain,0,0,W,H);waterfall(t);ctx.drawImage(middle,0,0,W,H);
 // Subtle ripples at the foot of the fall.
 for(let i=0;i<9;i++){let phase=(t*.36+i*.17)%1;ctx.strokeStyle=ink(.12*(1-phase));ctx.lineWidth=.5;ctx.beginPath();ctx.ellipse(283-i*14,1110+i*4,3+phase*7,.45+phase,0,0,Math.PI*2);ctx.stroke()}
 travelers(t);ctx.drawImage(front,0,0,W,H);birds(t);fog(t);signature(t);ctx.drawImage(grain,0,0,W,H);
}
window.InkLandscape={draw,duration};draw(0);
})();
