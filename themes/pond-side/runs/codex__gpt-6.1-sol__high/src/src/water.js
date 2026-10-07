import * as THREE from 'three';
export const pondRadius = (a) => 1 + .045*Math.sin(a*5+.5)+.035*Math.sin(a*3-1)+.025*Math.sin(a*9);
export function pondRatio(x,z){return Math.hypot(x/8.1,z/6.1)/pondRadius(Math.atan2(z/6.1,x/8.1));}
export function bottomHeight(x,z){const r=pondRatio(x,z);return r<1 ? -1.65*Math.pow(Math.max(0,1-r*r),.68)-.035 : .18+Math.min(1.3,(r-1)*.58)+.13*Math.sin(x*.7)*Math.cos(z*.45);}
export class PondWater {
 constructor(renderer,scene,camera,piles){
  this.renderer=renderer;this.scene=scene;this.camera=camera;this.n=144;this.a=new Float32Array(this.n*this.n);this.b=new Float32Array(this.n*this.n);this.c=new Float32Array(this.n*this.n);this.mask=new Uint8Array(this.n*this.n);this.acc=0;
  for(let j=0;j<this.n;j++)for(let i=0;i<this.n;i++){let x=i/(this.n-1)*20-10,z=j/(this.n-1)*16-8;this.mask[j*this.n+i]=pondRatio(x,z)<.996&&!piles.some(p=>Math.hypot(p.x-x,p.z-z)<.2)?1:0;}
  this.tex=new THREE.DataTexture(this.a,this.n,this.n,THREE.RedFormat,THREE.FloatType);this.tex.minFilter=this.tex.magFilter=THREE.LinearFilter;this.tex.needsUpdate=true;
  this.reflection=new THREE.WebGLRenderTarget(1024,768,{type:THREE.HalfFloatType});this.refraction=new THREE.WebGLRenderTarget(1024,768,{type:THREE.HalfFloatType});this.refraction.depthTexture=new THREE.DepthTexture(1024,768,THREE.UnsignedIntType);this.mirror=new THREE.PerspectiveCamera();
  this.bias=new THREE.Matrix4().set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1);
  this.uniforms={uHeight:{value:this.tex},uReflection:{value:this.reflection.texture},uRefraction:{value:this.refraction.texture},uDepth:{value:this.refraction.depthTexture},uNearFar:{value:new THREE.Vector2(camera.near,camera.far)},uReflectMatrix:{value:new THREE.Matrix4()},uRefractMatrix:{value:new THREE.Matrix4()},uTime:{value:0},uWind:{value:2},uRain:{value:0},uNight:{value:0},uSun:{value:new THREE.Vector3(-.55,.75,-.3).normalize()},uSunColor:{value:new THREE.Color('#fff3c4')},uTint:{value:new THREE.Color('#305d44')}};
  this.mesh=new THREE.Mesh(new THREE.PlaneGeometry(20,16,190,152).rotateX(-Math.PI/2),new THREE.ShaderMaterial({uniforms:this.uniforms,vertexShader:`
    uniform sampler2D uHeight;uniform float uTime;uniform float uWind;varying vec3 vWorld;varying vec4 vRef;varying vec4 vRefr;varying float vWaterDepth;uniform mat4 uReflectMatrix;uniform mat4 uRefractMatrix;
    float heightAt(vec2 p){return texture2D(uHeight,vec2((p.x+10.)/20.,(p.y+8.)/16.)).r+sin(p.x*2.3+p.y*1.9+uTime*1.25)*.006*uWind+sin(p.x*3.5-p.y*1.4+uTime*1.6)*.004*uWind;}
    void main(){vec3 p=position;p.y=heightAt(p.xz);vWorld=(modelMatrix*vec4(p,1.)).xyz;vWaterDepth=-(viewMatrix*vec4(vWorld,1.)).z;vRef=uReflectMatrix*vec4(vWorld,1.);vRefr=uRefractMatrix*vec4(vWorld,1.);gl_Position=projectionMatrix*viewMatrix*vec4(vWorld,1.);}
  `,fragmentShader:`
    uniform sampler2D uDepth;uniform vec2 uNearFar;uniform mat4 uRefractMatrix;uniform sampler2D uHeight;uniform sampler2D uReflection;uniform sampler2D uRefraction;uniform float uTime;uniform float uWind;uniform float uRain;uniform float uNight;uniform vec3 uSun;uniform vec3 uSunColor;uniform vec3 uTint;
    varying vec3 vWorld;varying vec4 vRef;varying vec4 vRefr;varying float vWaterDepth;
    float radius(float a){return 1.+.045*sin(a*5.+.5)+.035*sin(a*3.-1.)+.025*sin(a*9.);}
    float h(vec2 p){float base=texture2D(uHeight,vec2((p.x+10.)/20.,(p.y+8.)/16.)).r;return base+sin(p.x*2.3+p.y*1.9+uTime*1.25)*.006*uWind+sin(p.x*3.5-p.y*1.4+uTime*1.6)*.004*uWind;}
    void main(){vec2 q=vWorld.xz/vec2(8.1,6.1);float r=length(q)/radius(atan(q.y,q.x));if(r>.998)discard;
      float e=.065;vec2 slope=vec2(h(vWorld.xz+vec2(e,0.))-h(vWorld.xz-vec2(e,0.)),h(vWorld.xz+vec2(0.,e))-h(vWorld.xz-vec2(0.,e)))/(2.*e);
      float fine=.003+uWind*.004+uRain*.013;slope+=fine*vec2(sin(vWorld.x*14.+vWorld.z*9.+uTime*3.)+sin(vWorld.x*23.-vWorld.z*15.+uTime*2.1),cos(vWorld.z*19.+vWorld.x*8.+uTime*2.7)+sin(vWorld.z*31.+vWorld.x*18.-uTime*3.2));
      vec3 normal=normalize(vec3(-slope.x,1.,-slope.y));vec3 view=normalize(cameraPosition-vWorld);float ndv=max(.01,dot(normal,view));float fresnel=.025+.975*pow(1.-ndv,5.);
      vec2 distortion=slope*.032;vec2 refuv=vRef.xy/vRef.w+distortion;vec2 refruv=vRefr.xy/vRefr.w+distortion*.58;
      vec3 refl=texture2D(uReflection,clamp(refuv,.002,.998)).rgb;
      if(uRain>.01){refl=(refl*2.+texture2D(uReflection,refuv+vec2(.003)).rgb+texture2D(uReflection,refuv-vec2(.003)).rgb)/4.;}
      vec3 bentDirection=refract(-view,normal,.75019);float bedDepth=1.65*pow(max(0.,1.-r*r),.68)+.035;vec4 opticalProbe=uRefractMatrix*vec4(vWorld+bentDirection*bedDepth/max(.25,-bentDirection.y),1.);vec2 opticalOffset=clamp(opticalProbe.xy/opticalProbe.w-vRefr.xy/vRefr.w,vec2(-.018),vec2(.018));refruv+=opticalOffset*.34;
      vec3 refr=texture2D(uRefraction,clamp(refruv,.002,.998)).rgb;float d=texture2D(uDepth,clamp(refruv,.002,.998)).r;float linearDepth=uNearFar.x*uNearFar.y/(uNearFar.y-d*(uNearFar.y-uNearFar.x));float depth=clamp((linearDepth-vWaterDepth)*max(.08,view.y),.025,3.);vec3 absorb=exp(-vec3(.95,.52,.43)*depth*1.2/max(.4,ndv));vec3 transmitted=refr*absorb+uTint*(1.-absorb)*(.22-.10*uNight);
      vec3 col=mix(transmitted,refl,clamp(fresnel+.075+uRain*.06,.0,.98));vec3 halfDir=normalize(view+uSun);float glint=pow(max(0.,dot(normal,halfDir)),390.)*2.8+pow(max(0.,dot(normal,halfDir)),75.)*.17;col+=glint*uSunColor*(1.-uRain*.6);
      gl_FragColor=vec4(col,1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `,side:THREE.DoubleSide}));this.mesh.frustumCulled=false;this.mesh.name='水面';scene.add(this.mesh);
 }
 impulse(x,z,strength=.16,width=.35){let ix=(x+10)/20*(this.n-1),iz=(z+8)/16*(this.n-1),rad=width*this.n/16;for(let j=Math.max(1,Math.floor(iz-rad*2));j<Math.min(this.n-1,iz+rad*2);j++)for(let i=Math.max(1,Math.floor(ix-rad*2));i<Math.min(this.n-1,ix+rad*2);i++){let k=j*this.n+i;if(this.mask[k])this.a[k]+=strength*Math.exp(-((i-ix)**2+(j-iz)**2)/(rad*rad));}}
 update(dt,time,wind,rain){this.acc+=dt;let steps=0,n=this.n;while(this.acc>=1/60&&steps<4){for(let j=1;j<n-1;j++)for(let i=1;i<n-1;i++){let k=j*n+i;if(!this.mask[k]){this.c[k]=0;continue;}let center=this.a[k];let lapX=(this.mask[k-1]?this.a[k-1]:center)+(this.mask[k+1]?this.a[k+1]:center)-2*center;let lapZ=(this.mask[k-n]?this.a[k-n]:center)+(this.mask[k+n]?this.a[k+n]:center)-2*center;this.c[k]=(2*center-this.b[k]+.16*lapX+.25*lapZ)*.990;}let old=this.b;this.b=this.a;this.a=this.c;this.c=old;this.acc-=1/60;steps++;}this.tex.image.data=this.a;this.tex.needsUpdate=true;this.uniforms.uTime.value=time;this.uniforms.uWind.value=wind;this.uniforms.uRain.value=rain;}
 height(x,z){let i=THREE.MathUtils.clamp(Math.round((x+10)/20*(this.n-1)),0,this.n-1),j=THREE.MathUtils.clamp(Math.round((z+8)/16*(this.n-1)),0,this.n-1);return this.a[j*this.n+i]+Math.sin(x*2.3+z*1.9+this.uniforms.uTime.value*1.25)*.006*this.uniforms.uWind.value;}
 slope(x,z){return new THREE.Vector2((this.height(x+.15,z)-this.height(x-.15,z))/.3,(this.height(x,z+.15)-this.height(x,z-.15))/.3);}
 resize(w,h){let ratio=Math.min(1,1050/w);this.reflection.setSize(Math.round(w*ratio),Math.round(h*ratio));this.refraction.setSize(Math.round(w*ratio),Math.round(h*ratio));}
 render(){const r=this.renderer,c=this.camera;c.updateMatrixWorld();this.mesh.visible=false;let direction=new THREE.Vector3();c.getWorldDirection(direction);this.mirror.position.copy(c.position);this.mirror.position.y*=-1;direction.y*=-1;this.mirror.up.set(c.up.x,-c.up.y,c.up.z);this.mirror.lookAt(this.mirror.position.clone().add(direction));this.mirror.projectionMatrix.copy(c.projectionMatrix);this.mirror.projectionMatrixInverse.copy(c.projectionMatrixInverse);this.mirror.updateMatrixWorld();this.uniforms.uReflectMatrix.value.copy(this.bias).multiply(this.mirror.projectionMatrix).multiply(this.mirror.matrixWorldInverse);this.uniforms.uRefractMatrix.value.copy(this.bias).multiply(c.projectionMatrix).multiply(c.matrixWorldInverse);
  let shadow=r.shadowMap.autoUpdate;r.shadowMap.autoUpdate=false;r.clippingPlanes=[new THREE.Plane(new THREE.Vector3(0,1,0),-.015)];r.setRenderTarget(this.reflection);r.render(this.scene,this.mirror);r.clippingPlanes=[new THREE.Plane(new THREE.Vector3(0,-1,0),.02)];r.setRenderTarget(this.refraction);r.render(this.scene,c);r.clippingPlanes=[];r.setRenderTarget(null);r.shadowMap.autoUpdate=shadow;this.mesh.visible=true;
 }
}
