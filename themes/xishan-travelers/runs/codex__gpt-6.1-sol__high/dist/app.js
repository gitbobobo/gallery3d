(()=>{
const art=window.InkLandscape,play=document.getElementById('play'),restart=document.getElementById('restart'),sound=document.getElementById('sound'),detail=document.getElementById('detail'),chapters=[...document.querySelectorAll('.chapter')];
const starts=[0,12,30,45],ends=[12,30,45,64],texts=[['壹','晨雾','天色初明，群山尚在梦中。','一缕雾散，千仞青峰渐醒。'],['贰','行旅','四头驮骡，踏过溪边的小路。','山高水长，人间的脚步不曾停歇。'],['叁','钟声','古寺一声钟，惊起林间宿鸟。','有人驻足望山，又追上远行的背影。'],['肆','入山','行旅隐入山径，云雾重新合拢。','树叶深处，留下一个名字：范宽。']];
let time=0,playing=true,prev=performance.now(),active=-1,audio=null,enabled=false,bellPlayed=false,focused=false,lastPaint=-1;
function update(){let n=starts.findLastIndex(s=>time>=s);if(n<0)n=0;if(n!==active){active=n;const txt=texts[n];document.getElementById('chapter-number').textContent=txt[0];document.getElementById('chapter-title').textContent=txt[1];document.getElementById('line-one').textContent=txt[2];document.getElementById('line-two').textContent=txt[3];chapters.forEach((el,i)=>{el.classList.toggle('active',i===n);el.setAttribute('aria-current',i===n?'step':'false')})}chapters.forEach((el,i)=>el.querySelector('.chapter-progress').style.width=(i===n?Math.min(100,(time-starts[n])/(ends[n]-starts[n])*100):0)+'%');document.getElementById('elapsed').textContent=Math.floor(time/60).toString().padStart(2,'0')+':'+Math.floor(time%60).toString().padStart(2,'0');
if(focused){
 let center=500;
 if(time>=12&&time<53){const head=645-750*Math.min(1,(time-12)/44);center=Math.max(165,Math.min(500,head+70));if(time>=30&&time<37)center=(head+470)/2;}
 else if(time>=53){const v=Math.min(1,(time-53)/7);center=165+(520-165)*v*v*(3-2*v);}
 const origin=Math.max(0,Math.min(640,(center-640/4.8)/(1-1/2.4)));document.querySelector('.painting-area').style.setProperty('--focus-x',(origin/640*100)+'%');
}
}
function bell(){if(!enabled||!audio)return;const now=audio.currentTime;[174.6,349.8,513.1,728.3,1027.4,1391.7].forEach((freq,i)=>{const osc=audio.createOscillator(),gain=audio.createGain();osc.type='sine';osc.frequency.value=freq;osc.frequency.exponentialRampToValueAtTime(freq*.997,now+8);gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(.055/(1+i*.55),now+.025);gain.gain.exponentialRampToValueAtTime(.0001,now+9-i*.65);osc.connect(gain);gain.connect(audio.destination);osc.start(now);osc.stop(now+9)});}
function setPlaying(v){playing=v;prev=performance.now();play.setAttribute('aria-label',v?'暂停动画':'继续动画');document.getElementById('play-icon').innerHTML=v?'<path d="M9 6v12M15 6v12"/>':'<path d="M8 5l11 7-11 7Z"/>';document.getElementById('status').textContent=v?'自动演绎中':'已暂停';}
play.addEventListener('click',()=>setPlaying(!playing));restart.addEventListener('click',()=>{time=0;bellPlayed=false;setPlaying(true);art.draw(time);update()});chapters.forEach((el,i)=>el.addEventListener('click',()=>{time=starts[i];bellPlayed=false;setPlaying(true);art.draw(time);update()}));
sound.addEventListener('click',async()=>{enabled=!enabled;if(enabled){audio??=new(window.AudioContext||window.webkitAudioContext)();await audio.resume();if(active===2)bell()}sound.setAttribute('aria-pressed',String(enabled));sound.setAttribute('aria-label',enabled?'关闭钟声':'开启钟声');document.getElementById('sound-icon').innerHTML=enabled?'<path d="M10 5L5 9H2v6h3l5 4V5ZM15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>':'<path d="M10 5L5 9H2v6h3l5 4V5ZM15 9l6 6m0-6-6 6"/>'});
detail.addEventListener('click',()=>{focused=!focused;document.querySelector('.painting-area').classList.toggle('is-detail',focused);detail.setAttribute('aria-pressed',String(focused));detail.setAttribute('aria-label',focused?'返回全图':'放大观看山脚行旅');detail.querySelector('span').textContent=focused?'全貌':'近观';update()});
document.querySelector('.brand').addEventListener('click',e=>{e.preventDefault();restart.click()});document.addEventListener('keydown',e=>{if(e.code==='Space'&&!['BUTTON','A'].includes(e.target.tagName)){e.preventDefault();setPlaying(!playing)}if(e.key.toLowerCase()==='r')restart.click();if(e.key==='Escape'&&focused)detail.click()});
document.addEventListener('visibilitychange',()=>{prev=performance.now()});
function frame(now){const dt=Math.min((now-prev)/1000,.2);prev=now;if(playing&&!document.hidden){time+=dt;if(time>=64){time%=64;bellPlayed=false}if(time>=30.5&&time<45&&!bellPlayed){bellPlayed=true;bell()}if(time-lastPaint>.032||time<lastPaint){art.draw(time);lastPaint=time}update()}requestAnimationFrame(frame)}
// Expose a deterministic seek for visual verification and precise chapter controls.
window.inkJourney={seek(t){time=Math.max(0,Math.min(63.99,t));bellPlayed=time>30.5;art.draw(time);update()},get time(){return time},pause(){setPlaying(false)},play(){setPlaying(true)}};
update();requestAnimationFrame(frame);
})();
