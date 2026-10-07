(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const xo="170",ji={ROTATE:0,DOLLY:1,PAN:2},Vi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Sh=0,Ko=1,Eh=2,Mc=1,yc=2,Un=3,ei=0,Xe=1,Se=2,Qn=0,Zi=1,Us=2,$o=3,Jo=4,wh=5,fi=100,bh=101,Th=102,Ah=103,Rh=104,Ch=200,Ph=201,Dh=202,Lh=203,Ea=204,wa=205,Ih=206,Uh=207,Nh=208,Fh=209,Oh=210,zh=211,Bh=212,Hh=213,kh=214,ba=0,Ta=1,Aa=2,Ji=3,Ra=4,Ca=5,Pa=6,Da=7,Sc=0,Vh=1,Gh=2,ti=0,Wh=1,Xh=2,Yh=3,Ec=4,qh=5,jh=6,Zh=7,wc=300,Qi=301,ts=302,La=303,Ia=304,Ir=306,es=1e3,an=1001,Ua=1002,Ke=1003,Kh=1004,ks=1005,Ie=1006,Vr=1007,$n=1008,En=1009,bc=1010,Tc=1011,Ns=1012,Mo=1013,_i=1014,mn=1015,ii=1016,yo=1017,So=1018,ns=1020,Ac=35902,Rc=1021,Cc=1022,Ze=1023,Pc=1024,Dc=1025,Ki=1026,is=1027,Os=1028,Eo=1029,Lc=1030,wo=1031,bo=1033,yr=33776,Sr=33777,Er=33778,wr=33779,Na=35840,Fa=35841,Oa=35842,za=35843,Ba=36196,Ha=37492,ka=37496,Va=37808,Ga=37809,Wa=37810,Xa=37811,Ya=37812,qa=37813,ja=37814,Za=37815,Ka=37816,$a=37817,Ja=37818,Qa=37819,to=37820,eo=37821,br=36492,no=36494,io=36495,Ic=36283,so=36284,ro=36285,ao=36286,$h=3200,Uc=3201,Nc=0,Jh=1,Kn="",Oe="srgb",os="srgb-linear",Ur="linear",ie="srgb",Ei=7680,Qo=519,Qh=512,tu=513,eu=514,Fc=515,nu=516,iu=517,su=518,ru=519,oo=35044,au=35048,tl="300 es",On=2e3,Rr=2001;class xi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Ne=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let el=1234567;const Ls=Math.PI/180,Fs=180/Math.PI;function zn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ne[i&255]+Ne[i>>8&255]+Ne[i>>16&255]+Ne[i>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[n&255]+Ne[n>>8&255]+Ne[n>>16&255]+Ne[n>>24&255]).toLowerCase()}function Le(i,t,e){return Math.max(t,Math.min(e,i))}function To(i,t){return(i%t+t)%t}function ou(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function lu(i,t,e){return i!==t?(e-i)/(t-i):0}function Is(i,t,e){return(1-e)*i+e*t}function cu(i,t,e,n){return Is(i,t,1-Math.exp(-e*n))}function hu(i,t=1){return t-Math.abs(To(i,t*2)-t)}function uu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function fu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function du(i,t){return i+Math.floor(Math.random()*(t-i+1))}function pu(i,t){return i+Math.random()*(t-i)}function mu(i){return i*(.5-Math.random())}function gu(i){i!==void 0&&(el=i);let t=el+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function _u(i){return i*Ls}function vu(i){return i*Fs}function xu(i){return(i&i-1)===0&&i!==0}function Mu(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function yu(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Su(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),u=r((t-n)/2),f=a((t-n)/2),p=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*h,l*u,l*f,o*c);break;case"YZY":i.set(l*f,o*h,l*u,o*c);break;case"ZXZ":i.set(l*u,l*f,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*p,o*c);break;case"YXY":i.set(l*p,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*p,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function pn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ne(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Oc={DEG2RAD:Ls,RAD2DEG:Fs,generateUUID:zn,clamp:Le,euclideanModulo:To,mapLinear:ou,inverseLerp:lu,lerp:Is,damp:cu,pingpong:hu,smoothstep:uu,smootherstep:fu,randInt:du,randFloat:pu,randFloatSpread:mu,seededRandom:gu,degToRad:_u,radToDeg:vu,isPowerOfTwo:xu,ceilPowerOfTwo:Mu,floorPowerOfTwo:yu,setQuaternionFromProperEuler:Su,normalize:ne,denormalize:pn};class ot{constructor(t=0,e=0){ot.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Le(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Nt{constructor(t,e,n,s,r,a,o,l,c){Nt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],p=n[5],g=n[8],_=s[0],m=s[3],d=s[6],x=s[1],M=s[4],v=s[7],A=s[2],b=s[5],T=s[8];return r[0]=a*_+o*x+l*A,r[3]=a*m+o*M+l*b,r[6]=a*d+o*v+l*T,r[1]=c*_+h*x+u*A,r[4]=c*m+h*M+u*b,r[7]=c*d+h*v+u*T,r[2]=f*_+p*x+g*A,r[5]=f*m+p*M+g*b,r[8]=f*d+p*v+g*T,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,f=o*l-h*r,p=c*r-a*l,g=e*u+n*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(s*c-h*n)*_,t[2]=(o*n-s*a)*_,t[3]=f*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-o*e)*_,t[6]=p*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Gr.makeScale(t,e)),this}rotate(t){return this.premultiply(Gr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Gr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Gr=new Nt;function zc(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Cr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Eu(){const i=Cr("canvas");return i.style.display="block",i}const nl={};function Ps(i){i in nl||(nl[i]=!0,console.warn(i))}function wu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function bu(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Tu(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const qt={enabled:!0,workingColorSpace:os,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ie&&(i.r=Bn(i.r),i.g=Bn(i.g),i.b=Bn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ie&&(i.r=$i(i.r),i.g=$i(i.g),i.b=$i(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Kn?Ur:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Bn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function $i(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const il=[.64,.33,.3,.6,.15,.06],sl=[.2126,.7152,.0722],rl=[.3127,.329],al=new Nt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ol=new Nt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);qt.define({[os]:{primaries:il,whitePoint:rl,transfer:Ur,toXYZ:al,fromXYZ:ol,luminanceCoefficients:sl,workingColorSpaceConfig:{unpackColorSpace:Oe},outputColorSpaceConfig:{drawingBufferColorSpace:Oe}},[Oe]:{primaries:il,whitePoint:rl,transfer:ie,toXYZ:al,fromXYZ:ol,luminanceCoefficients:sl,outputColorSpaceConfig:{drawingBufferColorSpace:Oe}}});let wi;class Au{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{wi===void 0&&(wi=Cr("canvas")),wi.width=t.width,wi.height=t.height;const n=wi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=wi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Cr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Bn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Bn(e[n]/255)*255):e[n]=Bn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Ru=0;class Bc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ru++}),this.uuid=zn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Wr(s[a].image)):r.push(Wr(s[a]))}else r=Wr(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Wr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Au.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Cu=0;class ze extends xi{constructor(t=ze.DEFAULT_IMAGE,e=ze.DEFAULT_MAPPING,n=an,s=an,r=Ie,a=$n,o=Ze,l=En,c=ze.DEFAULT_ANISOTROPY,h=Kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Cu++}),this.uuid=zn(),this.name="",this.source=new Bc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ot(0,0),this.repeat=new ot(1,1),this.center=new ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==wc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case es:t.x=t.x-Math.floor(t.x);break;case an:t.x=t.x<0?0:1;break;case Ua:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case es:t.y=t.y-Math.floor(t.y);break;case an:t.y=t.y<0?0:1;break;case Ua:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ze.DEFAULT_IMAGE=null;ze.DEFAULT_MAPPING=wc;ze.DEFAULT_ANISOTROPY=1;class Qt{constructor(t=0,e=0,n=0,s=1){Qt.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],p=l[5],g=l[9],_=l[2],m=l[6],d=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,v=(p+1)/2,A=(d+1)/2,b=(h+f)/4,T=(u+_)/4,C=(g+m)/4;return M>v&&M>A?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=b/n,r=T/n):v>A?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=b/s,r=C/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=T/r,s=C/r),this.set(n,s,r,e),this}let x=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(u-_)/x,this.z=(f-h)/x,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Pu extends xi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Qt(0,0,t,e),this.scissorTest=!1,this.viewport=new Qt(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ie,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new ze(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Bc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class gn extends Pu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Hc extends ze{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ke,this.minFilter=Ke,this.wrapR=an,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Du extends ze{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ke,this.minFilter=Ke,this.wrapR=an,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ee{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const f=r[a+0],p=r[a+1],g=r[a+2],_=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(u!==_||l!==f||c!==p||h!==g){let m=1-o;const d=l*f+c*p+h*g+u*_,x=d>=0?1:-1,M=1-d*d;if(M>Number.EPSILON){const A=Math.sqrt(M),b=Math.atan2(A,d*x);m=Math.sin(m*b)/A,o=Math.sin(o*b)/A}const v=o*x;if(l=l*m+f*v,c=c*m+p*v,h=h*m+g*v,u=u*m+_*v,m===1-o){const A=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=A,c*=A,h*=A,u*=A}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[a],f=r[a+1],p=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*p-c*f,t[e+1]=l*g+h*f+c*u-o*p,t[e+2]=c*g+h*p+o*f-l*u,t[e+3]=h*g-o*u-l*f-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),u=o(r/2),f=l(n/2),p=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=f*h*u+c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u-f*p*g;break;case"YXZ":this._x=f*h*u+c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u+f*p*g;break;case"ZXY":this._x=f*h*u-c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u-f*p*g;break;case"ZYX":this._x=f*h*u-c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u+f*p*g;break;case"YZX":this._x=f*h*u+c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u-f*p*g;break;case"XZY":this._x=f*h*u-c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+o+u;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(n>o&&n>u){const p=2*Math.sqrt(1+n-o-u);this._w=(h-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>u){const p=2*Math.sqrt(1+o-n-u);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+u-n-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Le(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-e;return this._w=p*a+e*this._w,this._x=p*n+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=a*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(t=0,e=0,n=0){D.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ll.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ll.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Xr.copy(this).projectOnVector(t),this.sub(Xr)}reflect(t){return this.sub(Xr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Le(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Xr=new D,ll=new Ee;class Mi{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(hn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(hn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=hn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,hn):hn.fromBufferAttribute(r,a),hn.applyMatrix4(t.matrixWorld),this.expandByPoint(hn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Vs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Vs.copy(n.boundingBox)),Vs.applyMatrix4(t.matrixWorld),this.union(Vs)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,hn),hn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ms),Gs.subVectors(this.max,ms),bi.subVectors(t.a,ms),Ti.subVectors(t.b,ms),Ai.subVectors(t.c,ms),Wn.subVectors(Ti,bi),Xn.subVectors(Ai,Ti),ri.subVectors(bi,Ai);let e=[0,-Wn.z,Wn.y,0,-Xn.z,Xn.y,0,-ri.z,ri.y,Wn.z,0,-Wn.x,Xn.z,0,-Xn.x,ri.z,0,-ri.x,-Wn.y,Wn.x,0,-Xn.y,Xn.x,0,-ri.y,ri.x,0];return!Yr(e,bi,Ti,Ai,Gs)||(e=[1,0,0,0,1,0,0,0,1],!Yr(e,bi,Ti,Ai,Gs))?!1:(Ws.crossVectors(Wn,Xn),e=[Ws.x,Ws.y,Ws.z],Yr(e,bi,Ti,Ai,Gs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,hn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(hn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(An[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),An[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),An[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),An[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),An[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),An[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),An[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),An[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(An),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const An=[new D,new D,new D,new D,new D,new D,new D,new D],hn=new D,Vs=new Mi,bi=new D,Ti=new D,Ai=new D,Wn=new D,Xn=new D,ri=new D,ms=new D,Gs=new D,Ws=new D,ai=new D;function Yr(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ai.fromArray(i,r);const o=s.x*Math.abs(ai.x)+s.y*Math.abs(ai.y)+s.z*Math.abs(ai.z),l=t.dot(ai),c=e.dot(ai),h=n.dot(ai);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Lu=new Mi,gs=new D,qr=new D;class ls{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Lu.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;gs.subVectors(t,this.center);const e=gs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(gs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(qr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(gs.copy(t.center).add(qr)),this.expandByPoint(gs.copy(t.center).sub(qr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Rn=new D,jr=new D,Xs=new D,Yn=new D,Zr=new D,Ys=new D,Kr=new D;class Nr{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Rn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Rn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Rn.copy(this.origin).addScaledVector(this.direction,e),Rn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){jr.copy(t).add(e).multiplyScalar(.5),Xs.copy(e).sub(t).normalize(),Yn.copy(this.origin).sub(jr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Xs),o=Yn.dot(this.direction),l=-Yn.dot(Xs),c=Yn.lengthSq(),h=Math.abs(1-a*a);let u,f,p,g;if(h>0)if(u=a*l-o,f=a*o-l,g=r*h,u>=0)if(f>=-g)if(f<=g){const _=1/h;u*=_,f*=_,p=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(jr).addScaledVector(Xs,f),p}intersectSphere(t,e){Rn.subVectors(t.center,this.origin);const n=Rn.dot(this.direction),s=Rn.dot(Rn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Rn)!==null}intersectTriangle(t,e,n,s,r){Zr.subVectors(e,t),Ys.subVectors(n,t),Kr.crossVectors(Zr,Ys);let a=this.direction.dot(Kr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Yn.subVectors(this.origin,t);const l=o*this.direction.dot(Ys.crossVectors(Yn,Ys));if(l<0)return null;const c=o*this.direction.dot(Zr.cross(Yn));if(c<0||l+c>a)return null;const h=-o*Yn.dot(Kr);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ft{constructor(t,e,n,s,r,a,o,l,c,h,u,f,p,g,_,m){Ft.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,u,f,p,g,_,m)}set(t,e,n,s,r,a,o,l,c,h,u,f,p,g,_,m){const d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=h,d[10]=u,d[14]=f,d[3]=p,d[7]=g,d[11]=_,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ft().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Ri.setFromMatrixColumn(t,0).length(),r=1/Ri.setFromMatrixColumn(t,1).length(),a=1/Ri.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=a*h,p=a*u,g=o*h,_=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=p+g*c,e[5]=f-_*c,e[9]=-o*l,e[2]=_-f*c,e[6]=g+p*c,e[10]=a*l}else if(t.order==="YXZ"){const f=l*h,p=l*u,g=c*h,_=c*u;e[0]=f+_*o,e[4]=g*o-p,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=p*o-g,e[6]=_+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*h,p=l*u,g=c*h,_=c*u;e[0]=f-_*o,e[4]=-a*u,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*h,e[9]=_-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*h,p=a*u,g=o*h,_=o*u;e[0]=l*h,e[4]=g*c-p,e[8]=f*c+_,e[1]=l*u,e[5]=_*c+f,e[9]=p*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,p=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=_-f*u,e[8]=g*u+p,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=p*u+g,e[10]=f-_*u}else if(t.order==="XZY"){const f=a*l,p=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+_,e[5]=a*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=o*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Iu,t,Uu)}lookAt(t,e,n){const s=this.elements;return tn.subVectors(t,e),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),qn.crossVectors(n,tn),qn.lengthSq()===0&&(Math.abs(n.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),qn.crossVectors(n,tn)),qn.normalize(),qs.crossVectors(tn,qn),s[0]=qn.x,s[4]=qs.x,s[8]=tn.x,s[1]=qn.y,s[5]=qs.y,s[9]=tn.y,s[2]=qn.z,s[6]=qs.z,s[10]=tn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],p=n[13],g=n[2],_=n[6],m=n[10],d=n[14],x=n[3],M=n[7],v=n[11],A=n[15],b=s[0],T=s[4],C=s[8],E=s[12],y=s[1],P=s[5],z=s[9],L=s[13],H=s[2],X=s[6],F=s[10],W=s[14],k=s[3],Z=s[7],tt=s[11],ft=s[15];return r[0]=a*b+o*y+l*H+c*k,r[4]=a*T+o*P+l*X+c*Z,r[8]=a*C+o*z+l*F+c*tt,r[12]=a*E+o*L+l*W+c*ft,r[1]=h*b+u*y+f*H+p*k,r[5]=h*T+u*P+f*X+p*Z,r[9]=h*C+u*z+f*F+p*tt,r[13]=h*E+u*L+f*W+p*ft,r[2]=g*b+_*y+m*H+d*k,r[6]=g*T+_*P+m*X+d*Z,r[10]=g*C+_*z+m*F+d*tt,r[14]=g*E+_*L+m*W+d*ft,r[3]=x*b+M*y+v*H+A*k,r[7]=x*T+M*P+v*X+A*Z,r[11]=x*C+M*z+v*F+A*tt,r[15]=x*E+M*L+v*W+A*ft,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],p=t[14],g=t[3],_=t[7],m=t[11],d=t[15];return g*(+r*l*u-s*c*u-r*o*f+n*c*f+s*o*p-n*l*p)+_*(+e*l*p-e*c*f+r*a*f-s*a*p+s*c*h-r*l*h)+m*(+e*c*u-e*o*p-r*a*u+n*a*p+r*o*h-n*c*h)+d*(-s*o*h-e*l*u+e*o*f+s*a*u-n*a*f+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],p=t[11],g=t[12],_=t[13],m=t[14],d=t[15],x=u*m*c-_*f*c+_*l*p-o*m*p-u*l*d+o*f*d,M=g*f*c-h*m*c-g*l*p+a*m*p+h*l*d-a*f*d,v=h*_*c-g*u*c+g*o*p-a*_*p-h*o*d+a*u*d,A=g*u*l-h*_*l-g*o*f+a*_*f+h*o*m-a*u*m,b=e*x+n*M+s*v+r*A;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/b;return t[0]=x*T,t[1]=(_*f*r-u*m*r-_*s*p+n*m*p+u*s*d-n*f*d)*T,t[2]=(o*m*r-_*l*r+_*s*c-n*m*c-o*s*d+n*l*d)*T,t[3]=(u*l*r-o*f*r-u*s*c+n*f*c+o*s*p-n*l*p)*T,t[4]=M*T,t[5]=(h*m*r-g*f*r+g*s*p-e*m*p-h*s*d+e*f*d)*T,t[6]=(g*l*r-a*m*r-g*s*c+e*m*c+a*s*d-e*l*d)*T,t[7]=(a*f*r-h*l*r+h*s*c-e*f*c-a*s*p+e*l*p)*T,t[8]=v*T,t[9]=(g*u*r-h*_*r-g*n*p+e*_*p+h*n*d-e*u*d)*T,t[10]=(a*_*r-g*o*r+g*n*c-e*_*c-a*n*d+e*o*d)*T,t[11]=(h*o*r-a*u*r-h*n*c+e*u*c+a*n*p-e*o*p)*T,t[12]=A*T,t[13]=(h*_*s-g*u*s+g*n*f-e*_*f-h*n*m+e*u*m)*T,t[14]=(g*o*s-a*_*s-g*n*l+e*_*l+a*n*m-e*o*m)*T,t[15]=(a*u*s-h*o*s+h*n*l-e*u*l-a*n*f+e*o*f)*T,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,f=r*c,p=r*h,g=r*u,_=a*h,m=a*u,d=o*u,x=l*c,M=l*h,v=l*u,A=n.x,b=n.y,T=n.z;return s[0]=(1-(_+d))*A,s[1]=(p+v)*A,s[2]=(g-M)*A,s[3]=0,s[4]=(p-v)*b,s[5]=(1-(f+d))*b,s[6]=(m+x)*b,s[7]=0,s[8]=(g+M)*T,s[9]=(m-x)*T,s[10]=(1-(f+_))*T,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Ri.set(s[0],s[1],s[2]).length();const a=Ri.set(s[4],s[5],s[6]).length(),o=Ri.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],un.copy(this);const c=1/r,h=1/a,u=1/o;return un.elements[0]*=c,un.elements[1]*=c,un.elements[2]*=c,un.elements[4]*=h,un.elements[5]*=h,un.elements[6]*=h,un.elements[8]*=u,un.elements[9]*=u,un.elements[10]*=u,e.setFromRotationMatrix(un),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=On){const l=this.elements,c=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s);let p,g;if(o===On)p=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Rr)p=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=On){const l=this.elements,c=1/(e-t),h=1/(n-s),u=1/(a-r),f=(e+t)*c,p=(n+s)*h;let g,_;if(o===On)g=(a+r)*u,_=-2*u;else if(o===Rr)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ri=new D,un=new Ft,Iu=new D(0,0,0),Uu=new D(1,1,1),qn=new D,qs=new D,tn=new D,cl=new Ft,hl=new Ee;class De{constructor(t=0,e=0,n=0,s=De.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Le(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Le(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Le(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Le(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Le(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Le(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return cl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(cl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return hl.setFromEuler(this),this.setFromQuaternion(hl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}De.DEFAULT_ORDER="XYZ";class Ao{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Nu=0;const ul=new D,Ci=new Ee,Cn=new Ft,js=new D,_s=new D,Fu=new D,Ou=new Ee,fl=new D(1,0,0),dl=new D(0,1,0),pl=new D(0,0,1),ml={type:"added"},zu={type:"removed"},Pi={type:"childadded",child:null},$r={type:"childremoved",child:null};class Te extends xi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Nu++}),this.uuid=zn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Te.DEFAULT_UP.clone();const t=new D,e=new De,n=new Ee,s=new D(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ft},normalMatrix:{value:new Nt}}),this.matrix=new Ft,this.matrixWorld=new Ft,this.matrixAutoUpdate=Te.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ao,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ci.setFromAxisAngle(t,e),this.quaternion.multiply(Ci),this}rotateOnWorldAxis(t,e){return Ci.setFromAxisAngle(t,e),this.quaternion.premultiply(Ci),this}rotateX(t){return this.rotateOnAxis(fl,t)}rotateY(t){return this.rotateOnAxis(dl,t)}rotateZ(t){return this.rotateOnAxis(pl,t)}translateOnAxis(t,e){return ul.copy(t).applyQuaternion(this.quaternion),this.position.add(ul.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(fl,t)}translateY(t){return this.translateOnAxis(dl,t)}translateZ(t){return this.translateOnAxis(pl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Cn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?js.copy(t):js.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),_s.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Cn.lookAt(_s,js,this.up):Cn.lookAt(js,_s,this.up),this.quaternion.setFromRotationMatrix(Cn),s&&(Cn.extractRotation(s.matrixWorld),Ci.setFromRotationMatrix(Cn),this.quaternion.premultiply(Ci.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ml),Pi.child=t,this.dispatchEvent(Pi),Pi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(zu),$r.child=t,this.dispatchEvent($r),$r.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Cn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Cn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Cn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ml),Pi.child=t,this.dispatchEvent(Pi),Pi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,t,Fu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,Ou,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Te.DEFAULT_UP=new D(0,1,0);Te.DEFAULT_MATRIX_AUTO_UPDATE=!0;Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const fn=new D,Pn=new D,Jr=new D,Dn=new D,Di=new D,Li=new D,gl=new D,Qr=new D,ta=new D,ea=new D,na=new Qt,ia=new Qt,sa=new Qt;class rn{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),fn.subVectors(t,e),s.cross(fn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){fn.subVectors(s,e),Pn.subVectors(n,e),Jr.subVectors(t,e);const a=fn.dot(fn),o=fn.dot(Pn),l=fn.dot(Jr),c=Pn.dot(Pn),h=Pn.dot(Jr),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,p=(c*l-o*h)*f,g=(a*h-o*l)*f;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Dn)===null?!1:Dn.x>=0&&Dn.y>=0&&Dn.x+Dn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Dn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Dn.x),l.addScaledVector(a,Dn.y),l.addScaledVector(o,Dn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return na.setScalar(0),ia.setScalar(0),sa.setScalar(0),na.fromBufferAttribute(t,e),ia.fromBufferAttribute(t,n),sa.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(na,r.x),a.addScaledVector(ia,r.y),a.addScaledVector(sa,r.z),a}static isFrontFacing(t,e,n,s){return fn.subVectors(n,e),Pn.subVectors(t,e),fn.cross(Pn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return fn.subVectors(this.c,this.b),Pn.subVectors(this.a,this.b),fn.cross(Pn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return rn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return rn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return rn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return rn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return rn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;Di.subVectors(s,n),Li.subVectors(r,n),Qr.subVectors(t,n);const l=Di.dot(Qr),c=Li.dot(Qr);if(l<=0&&c<=0)return e.copy(n);ta.subVectors(t,s);const h=Di.dot(ta),u=Li.dot(ta);if(h>=0&&u<=h)return e.copy(s);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Di,a);ea.subVectors(t,r);const p=Di.dot(ea),g=Li.dot(ea);if(g>=0&&p<=g)return e.copy(r);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(Li,o);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return gl.subVectors(r,s),o=(u-h)/(u-h+(p-g)),e.copy(s).addScaledVector(gl,o);const d=1/(m+_+f);return a=_*d,o=f*d,e.copy(n).addScaledVector(Di,a).addScaledVector(Li,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const kc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},jn={h:0,s:0,l:0},Zs={h:0,s:0,l:0};function ra(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class bt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Oe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,qt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,qt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=qt.workingColorSpace){if(t=To(t,1),e=Le(e,0,1),n=Le(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=ra(a,r,t+1/3),this.g=ra(a,r,t),this.b=ra(a,r,t-1/3)}return qt.toWorkingColorSpace(this,s),this}setStyle(t,e=Oe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Oe){const n=kc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Bn(t.r),this.g=Bn(t.g),this.b=Bn(t.b),this}copyLinearToSRGB(t){return this.r=$i(t.r),this.g=$i(t.g),this.b=$i(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Oe){return qt.fromWorkingColorSpace(Fe.copy(this),t),Math.round(Le(Fe.r*255,0,255))*65536+Math.round(Le(Fe.g*255,0,255))*256+Math.round(Le(Fe.b*255,0,255))}getHexString(t=Oe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=qt.workingColorSpace){qt.fromWorkingColorSpace(Fe.copy(this),e);const n=Fe.r,s=Fe.g,r=Fe.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=qt.workingColorSpace){return qt.fromWorkingColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t=Oe){qt.fromWorkingColorSpace(Fe.copy(this),t);const e=Fe.r,n=Fe.g,s=Fe.b;return t!==Oe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(jn),this.setHSL(jn.h+t,jn.s+e,jn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(jn),t.getHSL(Zs);const n=Is(jn.h,Zs.h,e),s=Is(jn.s,Zs.s,e),r=Is(jn.l,Zs.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Fe=new bt;bt.NAMES=kc;let Bu=0;class yi extends xi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Bu++}),this.uuid=zn(),this.name="",this.blending=Zi,this.side=ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ea,this.blendDst=wa,this.blendEquation=fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new bt(0,0,0),this.blendAlpha=0,this.depthFunc=Ji,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Qo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ei,this.stencilZFail=Ei,this.stencilZPass=Ei,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Zi&&(n.blending=this.blending),this.side!==ei&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ea&&(n.blendSrc=this.blendSrc),this.blendDst!==wa&&(n.blendDst=this.blendDst),this.blendEquation!==fi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ji&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Qo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ei&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ei&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ei&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ro extends yi{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new De,this.combine=Sc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ks=Hu();function Hu(){const i=new ArrayBuffer(4),t=new Float32Array(i),e=new Uint32Array(i),n=new Uint32Array(512),s=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,s[l]=24,s[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,s[l]=-c-1,s[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,s[l]=13,s[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,s[l]=24,s[l|256]=24):(n[l]=31744,n[l|256]=64512,s[l]=13,s[l|256]=13)}const r=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;(c&8388608)===0;)c<<=1,h-=8388608;c&=-8388609,h+=947912704,r[l]=c|h}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:t,uint32View:e,baseTable:n,shiftTable:s,mantissaTable:r,exponentTable:a,offsetTable:o}}function ku(i){Math.abs(i)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),i=Le(i,-65504,65504),Ks.floatView[0]=i;const t=Ks.uint32View[0],e=t>>23&511;return Ks.baseTable[e]+((t&8388607)>>Ks.shiftTable[e])}const Vu={toHalfFloat:ku},xe=new D,$s=new ot;class ge{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=oo,this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)$s.fromBufferAttribute(this,e),$s.applyMatrix3(t),this.setXY(e,$s.x,$s.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.applyMatrix3(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.applyMatrix4(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.applyNormalMatrix(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.transformDirection(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=pn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ne(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=pn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=pn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=pn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=pn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),s=ne(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),s=ne(s,this.array),r=ne(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==oo&&(t.usage=this.usage),t}}class Vc extends ge{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Gc extends ge{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Bt extends ge{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Gu=0;const sn=new Ft,aa=new Te,Ii=new D,en=new Mi,vs=new Mi,Ce=new D;class fe extends xi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Gu++}),this.uuid=zn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(zc(t)?Gc:Vc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Nt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return sn.makeRotationFromQuaternion(t),this.applyMatrix4(sn),this}rotateX(t){return sn.makeRotationX(t),this.applyMatrix4(sn),this}rotateY(t){return sn.makeRotationY(t),this.applyMatrix4(sn),this}rotateZ(t){return sn.makeRotationZ(t),this.applyMatrix4(sn),this}translate(t,e,n){return sn.makeTranslation(t,e,n),this.applyMatrix4(sn),this}scale(t,e,n){return sn.makeScale(t,e,n),this.applyMatrix4(sn),this}lookAt(t){return aa.lookAt(t),aa.updateMatrix(),this.applyMatrix4(aa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ii).negate(),this.translate(Ii.x,Ii.y,Ii.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Bt(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];en.setFromBufferAttribute(r),this.morphTargetsRelative?(Ce.addVectors(this.boundingBox.min,en.min),this.boundingBox.expandByPoint(Ce),Ce.addVectors(this.boundingBox.max,en.max),this.boundingBox.expandByPoint(Ce)):(this.boundingBox.expandByPoint(en.min),this.boundingBox.expandByPoint(en.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ls);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const n=this.boundingSphere.center;if(en.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];vs.setFromBufferAttribute(o),this.morphTargetsRelative?(Ce.addVectors(en.min,vs.min),en.expandByPoint(Ce),Ce.addVectors(en.max,vs.max),en.expandByPoint(Ce)):(en.expandByPoint(vs.min),en.expandByPoint(vs.max))}en.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Ce.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ce));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ce.fromBufferAttribute(o,c),l&&(Ii.fromBufferAttribute(t,c),Ce.add(Ii)),s=Math.max(s,n.distanceToSquared(Ce))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ge(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let C=0;C<n.count;C++)o[C]=new D,l[C]=new D;const c=new D,h=new D,u=new D,f=new ot,p=new ot,g=new ot,_=new D,m=new D;function d(C,E,y){c.fromBufferAttribute(n,C),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,y),f.fromBufferAttribute(r,C),p.fromBufferAttribute(r,E),g.fromBufferAttribute(r,y),h.sub(c),u.sub(c),p.sub(f),g.sub(f);const P=1/(p.x*g.y-g.x*p.y);isFinite(P)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(P),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(P),o[C].add(_),o[E].add(_),o[y].add(_),l[C].add(m),l[E].add(m),l[y].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let C=0,E=x.length;C<E;++C){const y=x[C],P=y.start,z=y.count;for(let L=P,H=P+z;L<H;L+=3)d(t.getX(L+0),t.getX(L+1),t.getX(L+2))}const M=new D,v=new D,A=new D,b=new D;function T(C){A.fromBufferAttribute(s,C),b.copy(A);const E=o[C];M.copy(E),M.sub(A.multiplyScalar(A.dot(E))).normalize(),v.crossVectors(b,E);const P=v.dot(l[C])<0?-1:1;a.setXYZW(C,M.x,M.y,M.z,P)}for(let C=0,E=x.length;C<E;++C){const y=x[C],P=y.start,z=y.count;for(let L=P,H=P+z;L<H;L+=3)T(t.getX(L+0)),T(t.getX(L+1)),T(t.getX(L+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ge(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const s=new D,r=new D,a=new D,o=new D,l=new D,c=new D,h=new D,u=new D;if(t)for(let f=0,p=t.count;f<p;f+=3){const g=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=e.count;f<p;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ce.fromBufferAttribute(t,e),Ce.normalize(),t.setXYZ(e,Ce.x,Ce.y,Ce.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?p=l[_]*o.data.stride+o.offset:p=l[_]*h;for(let d=0;d<h;d++)f[g++]=c[p++]}return new ge(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new fe,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const f=c[h],p=t(f,n);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const p=c[u];h.push(p.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,p=u.length;f<p;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const _l=new Ft,oi=new Nr,Js=new ls,vl=new D,Qs=new D,tr=new D,er=new D,oa=new D,nr=new D,xl=new D,ir=new D;class Gt extends Te{constructor(t=new fe,e=new Ro){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){nr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(oa.fromBufferAttribute(u,t),a?nr.addScaledVector(oa,h):nr.addScaledVector(oa.sub(e),h))}e.add(nr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Js.copy(n.boundingSphere),Js.applyMatrix4(r),oi.copy(t.ray).recast(t.near),!(Js.containsPoint(oi.origin)===!1&&(oi.intersectSphere(Js,vl)===null||oi.origin.distanceToSquared(vl)>(t.far-t.near)**2))&&(_l.copy(r).invert(),oi.copy(t.ray).applyMatrix4(_l),!(n.boundingBox!==null&&oi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,oi)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=a[m.materialIndex],x=Math.max(m.start,p.start),M=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let v=x,A=M;v<A;v+=3){const b=o.getX(v),T=o.getX(v+1),C=o.getX(v+2);s=sr(this,d,t,n,c,h,u,b,T,C),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const x=o.getX(m),M=o.getX(m+1),v=o.getX(m+2);s=sr(this,a,t,n,c,h,u,x,M,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=a[m.materialIndex],x=Math.max(m.start,p.start),M=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let v=x,A=M;v<A;v+=3){const b=v,T=v+1,C=v+2;s=sr(this,d,t,n,c,h,u,b,T,C),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const x=m,M=m+1,v=m+2;s=sr(this,a,t,n,c,h,u,x,M,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Wu(i,t,e,n,s,r,a,o){let l;if(t.side===Xe?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===ei,o),l===null)return null;ir.copy(o),ir.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(ir);return c<e.near||c>e.far?null:{distance:c,point:ir.clone(),object:i}}function sr(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Qs),i.getVertexPosition(l,tr),i.getVertexPosition(c,er);const h=Wu(i,t,e,n,Qs,tr,er,xl);if(h){const u=new D;rn.getBarycoord(xl,Qs,tr,er,u),s&&(h.uv=rn.getInterpolatedAttribute(s,o,l,c,u,new ot)),r&&(h.uv1=rn.getInterpolatedAttribute(r,o,l,c,u,new ot)),a&&(h.normal=rn.getInterpolatedAttribute(a,o,l,c,u,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new D,materialIndex:0};rn.getNormal(Qs,tr,er,f.normal),h.face=f,h.barycoord=u}return h}class dn extends fe{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let f=0,p=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Bt(c,3)),this.setAttribute("normal",new Bt(h,3)),this.setAttribute("uv",new Bt(u,2));function g(_,m,d,x,M,v,A,b,T,C,E){const y=v/T,P=A/C,z=v/2,L=A/2,H=b/2,X=T+1,F=C+1;let W=0,k=0;const Z=new D;for(let tt=0;tt<F;tt++){const ft=tt*P-L;for(let Ct=0;Ct<X;Ct++){const Ht=Ct*y-z;Z[_]=Ht*x,Z[m]=ft*M,Z[d]=H,c.push(Z.x,Z.y,Z.z),Z[_]=0,Z[m]=0,Z[d]=b>0?1:-1,h.push(Z.x,Z.y,Z.z),u.push(Ct/T),u.push(1-tt/C),W+=1}}for(let tt=0;tt<C;tt++)for(let ft=0;ft<T;ft++){const Ct=f+ft+X*tt,Ht=f+ft+X*(tt+1),q=f+(ft+1)+X*(tt+1),Q=f+(ft+1)+X*tt;l.push(Ct,Ht,Q),l.push(Ht,q,Q),k+=6}o.addGroup(p,k,E),p+=k,f+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new dn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ss(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ve(i){const t={};for(let e=0;e<i.length;e++){const n=ss(i[e]);for(const s in n)t[s]=n[s]}return t}function Xu(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Wc(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:qt.workingColorSpace}const Yu={clone:ss,merge:Ve};var qu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ju=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class $e extends yi{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=qu,this.fragmentShader=ju,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ss(t.uniforms),this.uniformsGroups=Xu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Xc extends Te{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ft,this.projectionMatrix=new Ft,this.projectionMatrixInverse=new Ft,this.coordinateSystem=On}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Zn=new D,Ml=new ot,yl=new ot;class Ge extends Xc{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Fs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ls*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Fs*2*Math.atan(Math.tan(Ls*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Zn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Zn.x,Zn.y).multiplyScalar(-t/Zn.z),Zn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Zn.x,Zn.y).multiplyScalar(-t/Zn.z)}getViewSize(t,e){return this.getViewBounds(t,Ml,yl),e.subVectors(yl,Ml)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ls*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ui=-90,Ni=1;class Zu extends Te{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ge(Ui,Ni,t,e);s.layers=this.layers,this.add(s);const r=new Ge(Ui,Ni,t,e);r.layers=this.layers,this.add(r);const a=new Ge(Ui,Ni,t,e);a.layers=this.layers,this.add(a);const o=new Ge(Ui,Ni,t,e);o.layers=this.layers,this.add(o);const l=new Ge(Ui,Ni,t,e);l.layers=this.layers,this.add(l);const c=new Ge(Ui,Ni,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===On)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Rr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Yc extends ze{constructor(t,e,n,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Qi,super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Ku extends gn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Yc(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Ie}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new dn(5,5,5),r=new $e({name:"CubemapFromEquirect",uniforms:ss(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Xe,blending:Qn});r.uniforms.tEquirect.value=e;const a=new Gt(s,r),o=e.minFilter;return e.minFilter===$n&&(e.minFilter=Ie),new Zu(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const la=new D,$u=new D,Ju=new Nt;class Nn{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=la.subVectors(n,e).cross($u.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(la),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Ju.getNormalMatrix(t),s=this.coplanarPoint(la).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const li=new ls,rr=new D;class Co{constructor(t=new Nn,e=new Nn,n=new Nn,s=new Nn,r=new Nn,a=new Nn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=On){const n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],u=s[6],f=s[7],p=s[8],g=s[9],_=s[10],m=s[11],d=s[12],x=s[13],M=s[14],v=s[15];if(n[0].setComponents(l-r,f-c,m-p,v-d).normalize(),n[1].setComponents(l+r,f+c,m+p,v+d).normalize(),n[2].setComponents(l+a,f+h,m+g,v+x).normalize(),n[3].setComponents(l-a,f-h,m-g,v-x).normalize(),n[4].setComponents(l-o,f-u,m-_,v-M).normalize(),e===On)n[5].setComponents(l+o,f+u,m+_,v+M).normalize();else if(e===Rr)n[5].setComponents(o,u,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),li.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),li.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(li)}intersectsSprite(t){return li.center.set(0,0,0),li.radius=.7071067811865476,li.applyMatrix4(t.matrixWorld),this.intersectsSphere(li)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(rr.x=s.normal.x>0?t.max.x:t.min.x,rr.y=s.normal.y>0?t.max.y:t.min.y,rr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(rr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function qc(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Qu(i){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,h);else{u.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<u.length;p++){const g=u[f],_=u[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,u[f]=_)}u.length=f+1;for(let p=0,g=u.length;p<g;p++){const _=u[p];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}class vi extends fe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,u=t/o,f=e/l,p=[],g=[],_=[],m=[];for(let d=0;d<h;d++){const x=d*f-a;for(let M=0;M<c;M++){const v=M*u-r;g.push(v,-x,0),_.push(0,0,1),m.push(M/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let x=0;x<o;x++){const M=x+c*d,v=x+c*(d+1),A=x+1+c*(d+1),b=x+1+c*d;p.push(M,v,b),p.push(v,A,b)}this.setIndex(p),this.setAttribute("position",new Bt(g,3)),this.setAttribute("normal",new Bt(_,3)),this.setAttribute("uv",new Bt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vi(t.width,t.height,t.widthSegments,t.heightSegments)}}var tf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ef=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,nf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,sf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,af=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,of=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,lf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,hf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,uf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ff=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,df=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,pf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,mf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,gf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,_f=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,vf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Mf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,yf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Sf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ef=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,wf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,bf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Tf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Af=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Rf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Cf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Pf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Df="gl_FragColor = linearToOutputTexel( gl_FragColor );",Lf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,If=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Uf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Nf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ff=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Of=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,zf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Bf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Hf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,kf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Vf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Gf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Wf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Xf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Yf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,qf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,jf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Zf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Kf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$f=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Jf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Qf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,td=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ed=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,nd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,id=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ad=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,od=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ld=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,cd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,hd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ud=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,fd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,dd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,pd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,md=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,_d=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,xd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Md=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ed=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,wd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,bd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Td=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ad=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Rd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Cd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Pd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Dd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ld=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Id=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ud=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Nd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Fd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Od=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,zd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Bd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Hd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,kd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Vd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Gd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Wd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Xd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Yd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,qd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,jd=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Zd=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Kd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$d=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Jd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Qd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const tp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ep=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,np=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ip=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ap=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,op=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,lp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,cp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,hp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,up=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,dp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,mp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_p=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,xp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,yp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Sp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ep=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,bp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ap=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Cp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Pp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Lp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ip=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,zt={alphahash_fragment:tf,alphahash_pars_fragment:ef,alphamap_fragment:nf,alphamap_pars_fragment:sf,alphatest_fragment:rf,alphatest_pars_fragment:af,aomap_fragment:of,aomap_pars_fragment:lf,batching_pars_vertex:cf,batching_vertex:hf,begin_vertex:uf,beginnormal_vertex:ff,bsdfs:df,iridescence_fragment:pf,bumpmap_pars_fragment:mf,clipping_planes_fragment:gf,clipping_planes_pars_fragment:_f,clipping_planes_pars_vertex:vf,clipping_planes_vertex:xf,color_fragment:Mf,color_pars_fragment:yf,color_pars_vertex:Sf,color_vertex:Ef,common:wf,cube_uv_reflection_fragment:bf,defaultnormal_vertex:Tf,displacementmap_pars_vertex:Af,displacementmap_vertex:Rf,emissivemap_fragment:Cf,emissivemap_pars_fragment:Pf,colorspace_fragment:Df,colorspace_pars_fragment:Lf,envmap_fragment:If,envmap_common_pars_fragment:Uf,envmap_pars_fragment:Nf,envmap_pars_vertex:Ff,envmap_physical_pars_fragment:qf,envmap_vertex:Of,fog_vertex:zf,fog_pars_vertex:Bf,fog_fragment:Hf,fog_pars_fragment:kf,gradientmap_pars_fragment:Vf,lightmap_pars_fragment:Gf,lights_lambert_fragment:Wf,lights_lambert_pars_fragment:Xf,lights_pars_begin:Yf,lights_toon_fragment:jf,lights_toon_pars_fragment:Zf,lights_phong_fragment:Kf,lights_phong_pars_fragment:$f,lights_physical_fragment:Jf,lights_physical_pars_fragment:Qf,lights_fragment_begin:td,lights_fragment_maps:ed,lights_fragment_end:nd,logdepthbuf_fragment:id,logdepthbuf_pars_fragment:sd,logdepthbuf_pars_vertex:rd,logdepthbuf_vertex:ad,map_fragment:od,map_pars_fragment:ld,map_particle_fragment:cd,map_particle_pars_fragment:hd,metalnessmap_fragment:ud,metalnessmap_pars_fragment:fd,morphinstance_vertex:dd,morphcolor_vertex:pd,morphnormal_vertex:md,morphtarget_pars_vertex:gd,morphtarget_vertex:_d,normal_fragment_begin:vd,normal_fragment_maps:xd,normal_pars_fragment:Md,normal_pars_vertex:yd,normal_vertex:Sd,normalmap_pars_fragment:Ed,clearcoat_normal_fragment_begin:wd,clearcoat_normal_fragment_maps:bd,clearcoat_pars_fragment:Td,iridescence_pars_fragment:Ad,opaque_fragment:Rd,packing:Cd,premultiplied_alpha_fragment:Pd,project_vertex:Dd,dithering_fragment:Ld,dithering_pars_fragment:Id,roughnessmap_fragment:Ud,roughnessmap_pars_fragment:Nd,shadowmap_pars_fragment:Fd,shadowmap_pars_vertex:Od,shadowmap_vertex:zd,shadowmask_pars_fragment:Bd,skinbase_vertex:Hd,skinning_pars_vertex:kd,skinning_vertex:Vd,skinnormal_vertex:Gd,specularmap_fragment:Wd,specularmap_pars_fragment:Xd,tonemapping_fragment:Yd,tonemapping_pars_fragment:qd,transmission_fragment:jd,transmission_pars_fragment:Zd,uv_pars_fragment:Kd,uv_pars_vertex:$d,uv_vertex:Jd,worldpos_vertex:Qd,background_vert:tp,background_frag:ep,backgroundCube_vert:np,backgroundCube_frag:ip,cube_vert:sp,cube_frag:rp,depth_vert:ap,depth_frag:op,distanceRGBA_vert:lp,distanceRGBA_frag:cp,equirect_vert:hp,equirect_frag:up,linedashed_vert:fp,linedashed_frag:dp,meshbasic_vert:pp,meshbasic_frag:mp,meshlambert_vert:gp,meshlambert_frag:_p,meshmatcap_vert:vp,meshmatcap_frag:xp,meshnormal_vert:Mp,meshnormal_frag:yp,meshphong_vert:Sp,meshphong_frag:Ep,meshphysical_vert:wp,meshphysical_frag:bp,meshtoon_vert:Tp,meshtoon_frag:Ap,points_vert:Rp,points_frag:Cp,shadow_vert:Pp,shadow_frag:Dp,sprite_vert:Lp,sprite_frag:Ip},st={common:{diffuse:{value:new bt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Nt}},envmap:{envMap:{value:null},envMapRotation:{value:new Nt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Nt},normalScale:{value:new ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new bt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new bt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0},uvTransform:{value:new Nt}},sprite:{diffuse:{value:new bt(16777215)},opacity:{value:1},center:{value:new ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}}},xn={basic:{uniforms:Ve([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.fog]),vertexShader:zt.meshbasic_vert,fragmentShader:zt.meshbasic_frag},lambert:{uniforms:Ve([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new bt(0)}}]),vertexShader:zt.meshlambert_vert,fragmentShader:zt.meshlambert_frag},phong:{uniforms:Ve([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new bt(0)},specular:{value:new bt(1118481)},shininess:{value:30}}]),vertexShader:zt.meshphong_vert,fragmentShader:zt.meshphong_frag},standard:{uniforms:Ve([st.common,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.roughnessmap,st.metalnessmap,st.fog,st.lights,{emissive:{value:new bt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag},toon:{uniforms:Ve([st.common,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.gradientmap,st.fog,st.lights,{emissive:{value:new bt(0)}}]),vertexShader:zt.meshtoon_vert,fragmentShader:zt.meshtoon_frag},matcap:{uniforms:Ve([st.common,st.bumpmap,st.normalmap,st.displacementmap,st.fog,{matcap:{value:null}}]),vertexShader:zt.meshmatcap_vert,fragmentShader:zt.meshmatcap_frag},points:{uniforms:Ve([st.points,st.fog]),vertexShader:zt.points_vert,fragmentShader:zt.points_frag},dashed:{uniforms:Ve([st.common,st.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:zt.linedashed_vert,fragmentShader:zt.linedashed_frag},depth:{uniforms:Ve([st.common,st.displacementmap]),vertexShader:zt.depth_vert,fragmentShader:zt.depth_frag},normal:{uniforms:Ve([st.common,st.bumpmap,st.normalmap,st.displacementmap,{opacity:{value:1}}]),vertexShader:zt.meshnormal_vert,fragmentShader:zt.meshnormal_frag},sprite:{uniforms:Ve([st.sprite,st.fog]),vertexShader:zt.sprite_vert,fragmentShader:zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:zt.background_vert,fragmentShader:zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Nt}},vertexShader:zt.backgroundCube_vert,fragmentShader:zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:zt.cube_vert,fragmentShader:zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:zt.equirect_vert,fragmentShader:zt.equirect_frag},distanceRGBA:{uniforms:Ve([st.common,st.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:zt.distanceRGBA_vert,fragmentShader:zt.distanceRGBA_frag},shadow:{uniforms:Ve([st.lights,st.fog,{color:{value:new bt(0)},opacity:{value:1}}]),vertexShader:zt.shadow_vert,fragmentShader:zt.shadow_frag}};xn.physical={uniforms:Ve([xn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Nt},clearcoatNormalScale:{value:new ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Nt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Nt},sheen:{value:0},sheenColor:{value:new bt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Nt},transmissionSamplerSize:{value:new ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Nt},attenuationDistance:{value:0},attenuationColor:{value:new bt(0)},specularColor:{value:new bt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Nt},anisotropyVector:{value:new ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Nt}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag};const ar={r:0,b:0,g:0},ci=new De,Up=new Ft;function Np(i,t,e,n,s,r,a){const o=new bt(0);let l=r===!0?0:1,c,h,u=null,f=0,p=null;function g(x){let M=x.isScene===!0?x.background:null;return M&&M.isTexture&&(M=(x.backgroundBlurriness>0?e:t).get(M)),M}function _(x){let M=!1;const v=g(x);v===null?d(o,l):v&&v.isColor&&(d(v,1),M=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,a):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(x,M){const v=g(M);v&&(v.isCubeTexture||v.mapping===Ir)?(h===void 0&&(h=new Gt(new dn(1,1,1),new $e({name:"BackgroundCubeMaterial",uniforms:ss(xn.backgroundCube.uniforms),vertexShader:xn.backgroundCube.vertexShader,fragmentShader:xn.backgroundCube.fragmentShader,side:Xe,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,b,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ci.copy(M.backgroundRotation),ci.x*=-1,ci.y*=-1,ci.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(ci.y*=-1,ci.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Up.makeRotationFromEuler(ci)),h.material.toneMapped=qt.getTransfer(v.colorSpace)!==ie,(u!==v||f!==v.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,u=v,f=v.version,p=i.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Gt(new vi(2,2),new $e({name:"BackgroundMaterial",uniforms:ss(xn.background.uniforms),vertexShader:xn.background.vertexShader,fragmentShader:xn.background.fragmentShader,side:ei,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=qt.getTransfer(v.colorSpace)!==ie,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||f!==v.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,u=v,f=v.version,p=i.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function d(x,M){x.getRGB(ar,Wc(i)),n.buffers.color.setClear(ar.r,ar.g,ar.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(x,M=1){o.set(x),l=M,d(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,d(o,l)},render:_,addToRenderList:m}}function Fp(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,a=!1;function o(y,P,z,L,H){let X=!1;const F=u(L,z,P);r!==F&&(r=F,c(r.object)),X=p(y,L,z,H),X&&g(y,L,z,H),H!==null&&t.update(H,i.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,v(y,P,z,L),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function u(y,P,z){const L=z.wireframe===!0;let H=n[y.id];H===void 0&&(H={},n[y.id]=H);let X=H[P.id];X===void 0&&(X={},H[P.id]=X);let F=X[L];return F===void 0&&(F=f(l()),X[L]=F),F}function f(y){const P=[],z=[],L=[];for(let H=0;H<e;H++)P[H]=0,z[H]=0,L[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:z,attributeDivisors:L,object:y,attributes:{},index:null}}function p(y,P,z,L){const H=r.attributes,X=P.attributes;let F=0;const W=z.getAttributes();for(const k in W)if(W[k].location>=0){const tt=H[k];let ft=X[k];if(ft===void 0&&(k==="instanceMatrix"&&y.instanceMatrix&&(ft=y.instanceMatrix),k==="instanceColor"&&y.instanceColor&&(ft=y.instanceColor)),tt===void 0||tt.attribute!==ft||ft&&tt.data!==ft.data)return!0;F++}return r.attributesNum!==F||r.index!==L}function g(y,P,z,L){const H={},X=P.attributes;let F=0;const W=z.getAttributes();for(const k in W)if(W[k].location>=0){let tt=X[k];tt===void 0&&(k==="instanceMatrix"&&y.instanceMatrix&&(tt=y.instanceMatrix),k==="instanceColor"&&y.instanceColor&&(tt=y.instanceColor));const ft={};ft.attribute=tt,tt&&tt.data&&(ft.data=tt.data),H[k]=ft,F++}r.attributes=H,r.attributesNum=F,r.index=L}function _(){const y=r.newAttributes;for(let P=0,z=y.length;P<z;P++)y[P]=0}function m(y){d(y,0)}function d(y,P){const z=r.newAttributes,L=r.enabledAttributes,H=r.attributeDivisors;z[y]=1,L[y]===0&&(i.enableVertexAttribArray(y),L[y]=1),H[y]!==P&&(i.vertexAttribDivisor(y,P),H[y]=P)}function x(){const y=r.newAttributes,P=r.enabledAttributes;for(let z=0,L=P.length;z<L;z++)P[z]!==y[z]&&(i.disableVertexAttribArray(z),P[z]=0)}function M(y,P,z,L,H,X,F){F===!0?i.vertexAttribIPointer(y,P,z,H,X):i.vertexAttribPointer(y,P,z,L,H,X)}function v(y,P,z,L){_();const H=L.attributes,X=z.getAttributes(),F=P.defaultAttributeValues;for(const W in X){const k=X[W];if(k.location>=0){let Z=H[W];if(Z===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(Z=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(Z=y.instanceColor)),Z!==void 0){const tt=Z.normalized,ft=Z.itemSize,Ct=t.get(Z);if(Ct===void 0)continue;const Ht=Ct.buffer,q=Ct.type,Q=Ct.bytesPerElement,dt=q===i.INT||q===i.UNSIGNED_INT||Z.gpuType===Mo;if(Z.isInterleavedBufferAttribute){const it=Z.data,ut=it.stride,mt=Z.offset;if(it.isInstancedInterleavedBuffer){for(let Pt=0;Pt<k.locationSize;Pt++)d(k.location+Pt,it.meshPerAttribute);y.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let Pt=0;Pt<k.locationSize;Pt++)m(k.location+Pt);i.bindBuffer(i.ARRAY_BUFFER,Ht);for(let Pt=0;Pt<k.locationSize;Pt++)M(k.location+Pt,ft/k.locationSize,q,tt,ut*Q,(mt+ft/k.locationSize*Pt)*Q,dt)}else{if(Z.isInstancedBufferAttribute){for(let it=0;it<k.locationSize;it++)d(k.location+it,Z.meshPerAttribute);y.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let it=0;it<k.locationSize;it++)m(k.location+it);i.bindBuffer(i.ARRAY_BUFFER,Ht);for(let it=0;it<k.locationSize;it++)M(k.location+it,ft/k.locationSize,q,tt,ft*Q,ft/k.locationSize*it*Q,dt)}}else if(F!==void 0){const tt=F[W];if(tt!==void 0)switch(tt.length){case 2:i.vertexAttrib2fv(k.location,tt);break;case 3:i.vertexAttrib3fv(k.location,tt);break;case 4:i.vertexAttrib4fv(k.location,tt);break;default:i.vertexAttrib1fv(k.location,tt)}}}}x()}function A(){C();for(const y in n){const P=n[y];for(const z in P){const L=P[z];for(const H in L)h(L[H].object),delete L[H];delete P[z]}delete n[y]}}function b(y){if(n[y.id]===void 0)return;const P=n[y.id];for(const z in P){const L=P[z];for(const H in L)h(L[H].object),delete L[H];delete P[z]}delete n[y.id]}function T(y){for(const P in n){const z=n[P];if(z[y.id]===void 0)continue;const L=z[y.id];for(const H in L)h(L[H].object),delete L[H];delete z[y.id]}}function C(){E(),a=!0,r!==s&&(r=s,c(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:C,resetDefaultState:E,dispose:A,releaseStatesOfGeometry:b,releaseStatesOfProgram:T,initAttributes:_,enableAttribute:m,disableUnusedAttributes:x}}function Op(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];e.update(p,n,1)}function l(c,h,u,f){if(u===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)a(c[g],h[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*f[_];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function zp(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const T=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(T){return!(T!==Ze&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const C=T===ii&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==En&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==mn&&!C)}function l(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,b=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:v,vertexTextures:A,maxSamples:b}}function Bp(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new Nn,o=new Nt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const p=u.length!==0||f||n!==0||s;return s=f,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,p){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,d=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const x=r?0:n,M=x*4;let v=d.clippingState||null;l.value=v,v=h(g,f,M,p);for(let A=0;A!==M;++A)v[A]=e[A];d.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,p,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const d=p+_*4,x=f.matrixWorldInverse;o.getNormalMatrix(x),(m===null||m.length<d)&&(m=new Float32Array(d));for(let M=0,v=p;M!==_;++M,v+=4)a.copy(u[M]).applyMatrix4(x,o),a.normal.toArray(m,v),m[v+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function Hp(i){let t=new WeakMap;function e(a,o){return o===La?a.mapping=Qi:o===Ia&&(a.mapping=ts),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===La||o===Ia)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Ku(l.height);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Fr extends Xc{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Gi=4,Sl=[.125,.215,.35,.446,.526,.582],di=20,ca=new Fr,El=new bt;let ha=null,ua=0,fa=0,da=!1;const ui=(1+Math.sqrt(5))/2,Fi=1/ui,wl=[new D(-ui,Fi,0),new D(ui,Fi,0),new D(-Fi,0,ui),new D(Fi,0,ui),new D(0,ui,-Fi),new D(0,ui,Fi),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)];class bl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){ha=this._renderer.getRenderTarget(),ua=this._renderer.getActiveCubeFace(),fa=this._renderer.getActiveMipmapLevel(),da=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Rl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Al(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ha,ua,fa),this._renderer.xr.enabled=da,t.scissorTest=!1,or(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Qi||t.mapping===ts?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ha=this._renderer.getRenderTarget(),ua=this._renderer.getActiveCubeFace(),fa=this._renderer.getActiveMipmapLevel(),da=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ie,minFilter:Ie,generateMipmaps:!1,type:ii,format:Ze,colorSpace:os,depthBuffer:!1},s=Tl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Tl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=kp(r)),this._blurMaterial=Vp(r,t,e)}return s}_compileMaterial(t){const e=new Gt(this._lodPlanes[0],t);this._renderer.compile(e,ca)}_sceneToCubeUV(t,e,n,s){const o=new Ge(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(El),h.toneMapping=ti,h.autoClear=!1;const p=new Ro({name:"PMREM.Background",side:Xe,depthWrite:!1,depthTest:!1}),g=new Gt(new dn,p);let _=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,_=!0):(p.color.copy(El),_=!0);for(let d=0;d<6;d++){const x=d%3;x===0?(o.up.set(0,l[d],0),o.lookAt(c[d],0,0)):x===1?(o.up.set(0,0,l[d]),o.lookAt(0,c[d],0)):(o.up.set(0,l[d],0),o.lookAt(0,0,c[d]));const M=this._cubeSize;or(s,x*M,d>2?M:0,M,M),h.setRenderTarget(s),_&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Qi||t.mapping===ts;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Rl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Al());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Gt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;or(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,ca)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=wl[(s-r-1)%wl.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Gt(this._lodPlanes[s],c),f=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*di-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):di;m>di&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${di}`);const d=[];let x=0;for(let T=0;T<di;++T){const C=T/_,E=Math.exp(-C*C/2);d.push(E),T===0?x+=E:T<m&&(x+=2*E)}for(let T=0;T<d.length;T++)d[T]=d[T]/x;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:M}=this;f.dTheta.value=g,f.mipInt.value=M-n;const v=this._sizeLods[s],A=3*v*(s>M-Gi?s-M+Gi:0),b=4*(this._cubeSize-v);or(e,A,b,3*v,2*v),l.setRenderTarget(e),l.render(u,ca)}}function kp(i){const t=[],e=[],n=[];let s=i;const r=i-Gi+1+Sl.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-Gi?l=Sl[a-i+Gi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,_=3,m=2,d=1,x=new Float32Array(_*g*p),M=new Float32Array(m*g*p),v=new Float32Array(d*g*p);for(let b=0;b<p;b++){const T=b%3*2/3-1,C=b>2?0:-1,E=[T,C,0,T+2/3,C,0,T+2/3,C+1,0,T,C,0,T+2/3,C+1,0,T,C+1,0];x.set(E,_*g*b),M.set(f,m*g*b);const y=[b,b,b,b,b,b];v.set(y,d*g*b)}const A=new fe;A.setAttribute("position",new ge(x,_)),A.setAttribute("uv",new ge(M,m)),A.setAttribute("faceIndex",new ge(v,d)),t.push(A),s>Gi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Tl(i,t,e){const n=new gn(i,t,e);return n.texture.mapping=Ir,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function or(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Vp(i,t,e){const n=new Float32Array(di),s=new D(0,1,0);return new $e({name:"SphericalGaussianBlur",defines:{n:di,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Po(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function Al(){return new $e({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Po(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function Rl(){return new $e({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Po(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function Po(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Gp(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===La||l===Ia,h=l===Qi||l===ts;if(c||h){let u=t.get(o);const f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new bl(i)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const p=o.image;return c&&p&&p.height>0||h&&p&&s(p)?(e===null&&(e=new bl(i)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Wp(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Ps("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Xp(i,t,e,n){const s={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let m=0,d=_.length;m<d;m++)t.remove(_[m])}f.removeEventListener("dispose",a),delete s[f.id];const p=r.get(f);p&&(t.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const g in f)t.update(f[g],i.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const _=p[g];for(let m=0,d=_.length;m<d;m++)t.update(_[m],i.ARRAY_BUFFER)}}function c(u){const f=[],p=u.index,g=u.attributes.position;let _=0;if(p!==null){const x=p.array;_=p.version;for(let M=0,v=x.length;M<v;M+=3){const A=x[M+0],b=x[M+1],T=x[M+2];f.push(A,b,b,T,T,A)}}else if(g!==void 0){const x=g.array;_=g.version;for(let M=0,v=x.length/3-1;M<v;M+=3){const A=M+0,b=M+1,T=M+2;f.push(A,b,b,T,T,A)}}else return;const m=new(zc(f)?Gc:Vc)(f,1);m.version=_;const d=r.get(u);d&&t.remove(d),r.set(u,m)}function h(u){const f=r.get(u);if(f){const p=u.index;p!==null&&f.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Yp(i,t,e){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,p){i.drawElements(n,p,r,f*a),e.update(p,n,1)}function c(f,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,f*a,g),e.update(p,n,g))}function h(f,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];e.update(m,n,1)}function u(f,p,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)c(f[d]/a,p[d],_[d]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,f,0,_,0,g);let d=0;for(let x=0;x<g;x++)d+=p[x]*_[x];e.update(d,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function qp(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function jp(i,t,e){const n=new WeakMap,s=new Qt;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(o);if(f===void 0||f.count!==u){let y=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",y)};var p=y;f!==void 0&&f.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let v=0;g===!0&&(v=1),_===!0&&(v=2),m===!0&&(v=3);let A=o.attributes.position.count*v,b=1;A>t.maxTextureSize&&(b=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const T=new Float32Array(A*b*4*u),C=new Hc(T,A,b,u);C.type=mn,C.needsUpdate=!0;const E=v*4;for(let P=0;P<u;P++){const z=d[P],L=x[P],H=M[P],X=A*b*4*P;for(let F=0;F<z.count;F++){const W=F*E;g===!0&&(s.fromBufferAttribute(z,F),T[X+W+0]=s.x,T[X+W+1]=s.y,T[X+W+2]=s.z,T[X+W+3]=0),_===!0&&(s.fromBufferAttribute(L,F),T[X+W+4]=s.x,T[X+W+5]=s.y,T[X+W+6]=s.z,T[X+W+7]=0),m===!0&&(s.fromBufferAttribute(H,F),T[X+W+8]=s.x,T[X+W+9]=s.y,T[X+W+10]=s.z,T[X+W+11]=H.itemSize===4?s.w:1)}}f={count:u,texture:C,size:new ot(A,b)},n.set(o,f),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Zp(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}class jc extends ze{constructor(t,e,n,s,r,a,o,l,c,h=Ki){if(h!==Ki&&h!==is)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ki&&(n=_i),n===void 0&&h===is&&(n=ns),super(null,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Ke,this.minFilter=l!==void 0?l:Ke,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Zc=new ze,Cl=new jc(1,1),Kc=new Hc,$c=new Du,Jc=new Yc,Pl=[],Dl=[],Ll=new Float32Array(16),Il=new Float32Array(9),Ul=new Float32Array(4);function cs(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Pl[s];if(r===void 0&&(r=new Float32Array(s),Pl[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Ae(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Re(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Or(i,t){let e=Dl[t];e===void 0&&(e=new Int32Array(t),Dl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Kp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function $p(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2fv(this.addr,t),Re(e,t)}}function Jp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ae(e,t))return;i.uniform3fv(this.addr,t),Re(e,t)}}function Qp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4fv(this.addr,t),Re(e,t)}}function tm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;Ul.set(n),i.uniformMatrix2fv(this.addr,!1,Ul),Re(e,n)}}function em(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;Il.set(n),i.uniformMatrix3fv(this.addr,!1,Il),Re(e,n)}}function nm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;Ll.set(n),i.uniformMatrix4fv(this.addr,!1,Ll),Re(e,n)}}function im(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function sm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2iv(this.addr,t),Re(e,t)}}function rm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3iv(this.addr,t),Re(e,t)}}function am(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4iv(this.addr,t),Re(e,t)}}function om(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function lm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2uiv(this.addr,t),Re(e,t)}}function cm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3uiv(this.addr,t),Re(e,t)}}function hm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4uiv(this.addr,t),Re(e,t)}}function um(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Cl.compareFunction=Fc,r=Cl):r=Zc,e.setTexture2D(t||r,s)}function fm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||$c,s)}function dm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Jc,s)}function pm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Kc,s)}function mm(i){switch(i){case 5126:return Kp;case 35664:return $p;case 35665:return Jp;case 35666:return Qp;case 35674:return tm;case 35675:return em;case 35676:return nm;case 5124:case 35670:return im;case 35667:case 35671:return sm;case 35668:case 35672:return rm;case 35669:case 35673:return am;case 5125:return om;case 36294:return lm;case 36295:return cm;case 36296:return hm;case 35678:case 36198:case 36298:case 36306:case 35682:return um;case 35679:case 36299:case 36307:return fm;case 35680:case 36300:case 36308:case 36293:return dm;case 36289:case 36303:case 36311:case 36292:return pm}}function gm(i,t){i.uniform1fv(this.addr,t)}function _m(i,t){const e=cs(t,this.size,2);i.uniform2fv(this.addr,e)}function vm(i,t){const e=cs(t,this.size,3);i.uniform3fv(this.addr,e)}function xm(i,t){const e=cs(t,this.size,4);i.uniform4fv(this.addr,e)}function Mm(i,t){const e=cs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function ym(i,t){const e=cs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Sm(i,t){const e=cs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Em(i,t){i.uniform1iv(this.addr,t)}function wm(i,t){i.uniform2iv(this.addr,t)}function bm(i,t){i.uniform3iv(this.addr,t)}function Tm(i,t){i.uniform4iv(this.addr,t)}function Am(i,t){i.uniform1uiv(this.addr,t)}function Rm(i,t){i.uniform2uiv(this.addr,t)}function Cm(i,t){i.uniform3uiv(this.addr,t)}function Pm(i,t){i.uniform4uiv(this.addr,t)}function Dm(i,t,e){const n=this.cache,s=t.length,r=Or(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||Zc,r[a])}function Lm(i,t,e){const n=this.cache,s=t.length,r=Or(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||$c,r[a])}function Im(i,t,e){const n=this.cache,s=t.length,r=Or(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Jc,r[a])}function Um(i,t,e){const n=this.cache,s=t.length,r=Or(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Kc,r[a])}function Nm(i){switch(i){case 5126:return gm;case 35664:return _m;case 35665:return vm;case 35666:return xm;case 35674:return Mm;case 35675:return ym;case 35676:return Sm;case 5124:case 35670:return Em;case 35667:case 35671:return wm;case 35668:case 35672:return bm;case 35669:case 35673:return Tm;case 5125:return Am;case 36294:return Rm;case 36295:return Cm;case 36296:return Pm;case 35678:case 36198:case 36298:case 36306:case 35682:return Dm;case 35679:case 36299:case 36307:return Lm;case 35680:case 36300:case 36308:case 36293:return Im;case 36289:case 36303:case 36311:case 36292:return Um}}class Fm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=mm(e.type)}}class Om{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Nm(e.type)}}class zm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const pa=/(\w+)(\])?(\[|\.)?/g;function Nl(i,t){i.seq.push(t),i.map[t.id]=t}function Bm(i,t,e){const n=i.name,s=n.length;for(pa.lastIndex=0;;){const r=pa.exec(n),a=pa.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Nl(e,c===void 0?new Fm(o,i,t):new Om(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new zm(o),Nl(e,u)),e=u}}}class Tr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);Bm(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Fl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Hm=37297;let km=0;function Vm(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Ol=new Nt;function Gm(i){qt._getMatrix(Ol,qt.workingColorSpace,i);const t=`mat3( ${Ol.elements.map(e=>e.toFixed(4))} )`;switch(qt.getTransfer(i)){case Ur:return[t,"LinearTransferOETF"];case ie:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function zl(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Vm(i.getShaderSource(t),a)}else return s}function Wm(i,t){const e=Gm(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Xm(i,t){let e;switch(t){case Wh:e="Linear";break;case Xh:e="Reinhard";break;case Yh:e="Cineon";break;case Ec:e="ACESFilmic";break;case jh:e="AgX";break;case Zh:e="Neutral";break;case qh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const lr=new D;function Ym(){qt.getLuminanceCoefficients(lr);const i=lr.x.toFixed(4),t=lr.y.toFixed(4),e=lr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function qm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ds).join(`
`)}function jm(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Zm(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Ds(i){return i!==""}function Bl(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Hl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Km=/^[ \t]*#include +<([\w\d./]+)>/gm;function lo(i){return i.replace(Km,Jm)}const $m=new Map;function Jm(i,t){let e=zt[t];if(e===void 0){const n=$m.get(t);if(n!==void 0)e=zt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return lo(e)}const Qm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kl(i){return i.replace(Qm,t0)}function t0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Vl(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function e0(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Mc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===yc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Un&&(t="SHADOWMAP_TYPE_VSM"),t}function n0(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Qi:case ts:t="ENVMAP_TYPE_CUBE";break;case Ir:t="ENVMAP_TYPE_CUBE_UV";break}return t}function i0(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ts:t="ENVMAP_MODE_REFRACTION";break}return t}function s0(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Sc:t="ENVMAP_BLENDING_MULTIPLY";break;case Vh:t="ENVMAP_BLENDING_MIX";break;case Gh:t="ENVMAP_BLENDING_ADD";break}return t}function r0(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function a0(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=e0(e),c=n0(e),h=i0(e),u=s0(e),f=r0(e),p=qm(e),g=jm(r),_=s.createProgram();let m,d,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ds).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ds).join(`
`),d.length>0&&(d+=`
`)):(m=[Vl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ds).join(`
`),d=[Vl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ti?"#define TONE_MAPPING":"",e.toneMapping!==ti?zt.tonemapping_pars_fragment:"",e.toneMapping!==ti?Xm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",zt.colorspace_pars_fragment,Wm("linearToOutputTexel",e.outputColorSpace),Ym(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ds).join(`
`)),a=lo(a),a=Bl(a,e),a=Hl(a,e),o=lo(o),o=Bl(o,e),o=Hl(o,e),a=kl(a),o=kl(o),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===tl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===tl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const M=x+m+a,v=x+d+o,A=Fl(s,s.VERTEX_SHADER,M),b=Fl(s,s.FRAGMENT_SHADER,v);s.attachShader(_,A),s.attachShader(_,b),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function T(P){if(i.debug.checkShaderErrors){const z=s.getProgramInfoLog(_).trim(),L=s.getShaderInfoLog(A).trim(),H=s.getShaderInfoLog(b).trim();let X=!0,F=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,A,b);else{const W=zl(s,A,"vertex"),k=zl(s,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+z+`
`+W+`
`+k)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(L===""||H==="")&&(F=!1);F&&(P.diagnostics={runnable:X,programLog:z,vertexShader:{log:L,prefix:m},fragmentShader:{log:H,prefix:d}})}s.deleteShader(A),s.deleteShader(b),C=new Tr(s,_),E=Zm(s,_)}let C;this.getUniforms=function(){return C===void 0&&T(this),C};let E;this.getAttributes=function(){return E===void 0&&T(this),E};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(_,Hm)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=km++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=b,this}let o0=0;class l0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new c0(t),e.set(t,n)),n}}class c0{constructor(t){this.id=o0++,this.code=t,this.usedTimes=0}}function h0(i,t,e,n,s,r,a){const o=new Ao,l=new l0,c=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return c.add(E),E===0?"uv":`uv${E}`}function m(E,y,P,z,L){const H=z.fog,X=L.geometry,F=E.isMeshStandardMaterial?z.environment:null,W=(E.isMeshStandardMaterial?e:t).get(E.envMap||F),k=W&&W.mapping===Ir?W.image.height:null,Z=g[E.type];E.precision!==null&&(p=s.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));const tt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ft=tt!==void 0?tt.length:0;let Ct=0;X.morphAttributes.position!==void 0&&(Ct=1),X.morphAttributes.normal!==void 0&&(Ct=2),X.morphAttributes.color!==void 0&&(Ct=3);let Ht,q,Q,dt;if(Z){const ee=xn[Z];Ht=ee.vertexShader,q=ee.fragmentShader}else Ht=E.vertexShader,q=E.fragmentShader,l.update(E),Q=l.getVertexShaderID(E),dt=l.getFragmentShaderID(E);const it=i.getRenderTarget(),ut=i.state.buffers.depth.getReversed(),mt=L.isInstancedMesh===!0,Pt=L.isBatchedMesh===!0,te=!!E.map,Wt=!!E.matcap,oe=!!W,O=!!E.aoMap,He=!!E.lightMap,kt=!!E.bumpMap,Vt=!!E.normalMap,At=!!E.displacementMap,le=!!E.emissiveMap,Tt=!!E.metalnessMap,R=!!E.roughnessMap,S=E.anisotropy>0,B=E.clearcoat>0,K=E.dispersion>0,J=E.iridescence>0,j=E.sheen>0,yt=E.transmission>0,at=S&&!!E.anisotropyMap,pt=B&&!!E.clearcoatMap,Yt=B&&!!E.clearcoatNormalMap,et=B&&!!E.clearcoatRoughnessMap,gt=J&&!!E.iridescenceMap,Rt=J&&!!E.iridescenceThicknessMap,Dt=j&&!!E.sheenColorMap,_t=j&&!!E.sheenRoughnessMap,Xt=!!E.specularMap,Ot=!!E.specularColorMap,re=!!E.specularIntensityMap,I=yt&&!!E.transmissionMap,rt=yt&&!!E.thicknessMap,Y=!!E.gradientMap,$=!!E.alphaMap,ht=E.alphaTest>0,lt=!!E.alphaHash,It=!!E.extensions;let ve=ti;E.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(ve=i.toneMapping);const Ue={shaderID:Z,shaderType:E.type,shaderName:E.name,vertexShader:Ht,fragmentShader:q,defines:E.defines,customVertexShaderID:Q,customFragmentShaderID:dt,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:Pt,batchingColor:Pt&&L._colorsTexture!==null,instancing:mt,instancingColor:mt&&L.instanceColor!==null,instancingMorph:mt&&L.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:it===null?i.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:os,alphaToCoverage:!!E.alphaToCoverage,map:te,matcap:Wt,envMap:oe,envMapMode:oe&&W.mapping,envMapCubeUVHeight:k,aoMap:O,lightMap:He,bumpMap:kt,normalMap:Vt,displacementMap:f&&At,emissiveMap:le,normalMapObjectSpace:Vt&&E.normalMapType===Jh,normalMapTangentSpace:Vt&&E.normalMapType===Nc,metalnessMap:Tt,roughnessMap:R,anisotropy:S,anisotropyMap:at,clearcoat:B,clearcoatMap:pt,clearcoatNormalMap:Yt,clearcoatRoughnessMap:et,dispersion:K,iridescence:J,iridescenceMap:gt,iridescenceThicknessMap:Rt,sheen:j,sheenColorMap:Dt,sheenRoughnessMap:_t,specularMap:Xt,specularColorMap:Ot,specularIntensityMap:re,transmission:yt,transmissionMap:I,thicknessMap:rt,gradientMap:Y,opaque:E.transparent===!1&&E.blending===Zi&&E.alphaToCoverage===!1,alphaMap:$,alphaTest:ht,alphaHash:lt,combine:E.combine,mapUv:te&&_(E.map.channel),aoMapUv:O&&_(E.aoMap.channel),lightMapUv:He&&_(E.lightMap.channel),bumpMapUv:kt&&_(E.bumpMap.channel),normalMapUv:Vt&&_(E.normalMap.channel),displacementMapUv:At&&_(E.displacementMap.channel),emissiveMapUv:le&&_(E.emissiveMap.channel),metalnessMapUv:Tt&&_(E.metalnessMap.channel),roughnessMapUv:R&&_(E.roughnessMap.channel),anisotropyMapUv:at&&_(E.anisotropyMap.channel),clearcoatMapUv:pt&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:Yt&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:et&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:gt&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:Rt&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:Dt&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:_t&&_(E.sheenRoughnessMap.channel),specularMapUv:Xt&&_(E.specularMap.channel),specularColorMapUv:Ot&&_(E.specularColorMap.channel),specularIntensityMapUv:re&&_(E.specularIntensityMap.channel),transmissionMapUv:I&&_(E.transmissionMap.channel),thicknessMapUv:rt&&_(E.thicknessMap.channel),alphaMapUv:$&&_(E.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(Vt||S),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!X.attributes.uv&&(te||$),fog:!!H,useFog:E.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:ut,skinning:L.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:ft,morphTextureStride:Ct,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:ve,decodeVideoTexture:te&&E.map.isVideoTexture===!0&&qt.getTransfer(E.map.colorSpace)===ie,decodeVideoTextureEmissive:le&&E.emissiveMap.isVideoTexture===!0&&qt.getTransfer(E.emissiveMap.colorSpace)===ie,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Se,flipSided:E.side===Xe,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:It&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(It&&E.extensions.multiDraw===!0||Pt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Ue.vertexUv1s=c.has(1),Ue.vertexUv2s=c.has(2),Ue.vertexUv3s=c.has(3),c.clear(),Ue}function d(E){const y=[];if(E.shaderID?y.push(E.shaderID):(y.push(E.customVertexShaderID),y.push(E.customFragmentShaderID)),E.defines!==void 0)for(const P in E.defines)y.push(P),y.push(E.defines[P]);return E.isRawShaderMaterial===!1&&(x(y,E),M(y,E),y.push(i.outputColorSpace)),y.push(E.customProgramCacheKey),y.join()}function x(E,y){E.push(y.precision),E.push(y.outputColorSpace),E.push(y.envMapMode),E.push(y.envMapCubeUVHeight),E.push(y.mapUv),E.push(y.alphaMapUv),E.push(y.lightMapUv),E.push(y.aoMapUv),E.push(y.bumpMapUv),E.push(y.normalMapUv),E.push(y.displacementMapUv),E.push(y.emissiveMapUv),E.push(y.metalnessMapUv),E.push(y.roughnessMapUv),E.push(y.anisotropyMapUv),E.push(y.clearcoatMapUv),E.push(y.clearcoatNormalMapUv),E.push(y.clearcoatRoughnessMapUv),E.push(y.iridescenceMapUv),E.push(y.iridescenceThicknessMapUv),E.push(y.sheenColorMapUv),E.push(y.sheenRoughnessMapUv),E.push(y.specularMapUv),E.push(y.specularColorMapUv),E.push(y.specularIntensityMapUv),E.push(y.transmissionMapUv),E.push(y.thicknessMapUv),E.push(y.combine),E.push(y.fogExp2),E.push(y.sizeAttenuation),E.push(y.morphTargetsCount),E.push(y.morphAttributeCount),E.push(y.numDirLights),E.push(y.numPointLights),E.push(y.numSpotLights),E.push(y.numSpotLightMaps),E.push(y.numHemiLights),E.push(y.numRectAreaLights),E.push(y.numDirLightShadows),E.push(y.numPointLightShadows),E.push(y.numSpotLightShadows),E.push(y.numSpotLightShadowsWithMaps),E.push(y.numLightProbes),E.push(y.shadowMapType),E.push(y.toneMapping),E.push(y.numClippingPlanes),E.push(y.numClipIntersection),E.push(y.depthPacking)}function M(E,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),E.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),E.push(o.mask)}function v(E){const y=g[E.type];let P;if(y){const z=xn[y];P=Yu.clone(z.uniforms)}else P=E.uniforms;return P}function A(E,y){let P;for(let z=0,L=h.length;z<L;z++){const H=h[z];if(H.cacheKey===y){P=H,++P.usedTimes;break}}return P===void 0&&(P=new a0(i,y,E,r),h.push(P)),P}function b(E){if(--E.usedTimes===0){const y=h.indexOf(E);h[y]=h[h.length-1],h.pop(),E.destroy()}}function T(E){l.remove(E)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:v,acquireProgram:A,releaseProgram:b,releaseShaderCache:T,programs:h,dispose:C}}function u0(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function f0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Gl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Wl(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u,f,p,g,_,m){let d=i[t];return d===void 0?(d={id:u.id,object:u,geometry:f,material:p,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[t]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=_,d.group=m),t++,d}function o(u,f,p,g,_,m){const d=a(u,f,p,g,_,m);p.transmission>0?n.push(d):p.transparent===!0?s.push(d):e.push(d)}function l(u,f,p,g,_,m){const d=a(u,f,p,g,_,m);p.transmission>0?n.unshift(d):p.transparent===!0?s.unshift(d):e.unshift(d)}function c(u,f){e.length>1&&e.sort(u||f0),n.length>1&&n.sort(f||Gl),s.length>1&&s.sort(f||Gl)}function h(){for(let u=t,f=i.length;u<f;u++){const p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function d0(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Wl,i.set(n,[a])):s>=r.length?(a=new Wl,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function p0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new bt};break;case"SpotLight":e={position:new D,direction:new D,color:new bt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new bt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new bt,groundColor:new bt};break;case"RectAreaLight":e={color:new bt,position:new D,halfWidth:new D,halfHeight:new D};break}return i[t.id]=e,e}}}function m0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let g0=0;function _0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function v0(i){const t=new p0,e=m0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);const s=new D,r=new Ft,a=new Ft;function o(c){let h=0,u=0,f=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let p=0,g=0,_=0,m=0,d=0,x=0,M=0,v=0,A=0,b=0,T=0;c.sort(_0);for(let E=0,y=c.length;E<y;E++){const P=c[E],z=P.color,L=P.intensity,H=P.distance,X=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=z.r*L,u+=z.g*L,f+=z.b*L;else if(P.isLightProbe){for(let F=0;F<9;F++)n.probe[F].addScaledVector(P.sh.coefficients[F],L);T++}else if(P.isDirectionalLight){const F=t.get(P);if(F.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const W=P.shadow,k=e.get(P);k.shadowIntensity=W.intensity,k.shadowBias=W.bias,k.shadowNormalBias=W.normalBias,k.shadowRadius=W.radius,k.shadowMapSize=W.mapSize,n.directionalShadow[p]=k,n.directionalShadowMap[p]=X,n.directionalShadowMatrix[p]=P.shadow.matrix,x++}n.directional[p]=F,p++}else if(P.isSpotLight){const F=t.get(P);F.position.setFromMatrixPosition(P.matrixWorld),F.color.copy(z).multiplyScalar(L),F.distance=H,F.coneCos=Math.cos(P.angle),F.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),F.decay=P.decay,n.spot[_]=F;const W=P.shadow;if(P.map&&(n.spotLightMap[A]=P.map,A++,W.updateMatrices(P),P.castShadow&&b++),n.spotLightMatrix[_]=W.matrix,P.castShadow){const k=e.get(P);k.shadowIntensity=W.intensity,k.shadowBias=W.bias,k.shadowNormalBias=W.normalBias,k.shadowRadius=W.radius,k.shadowMapSize=W.mapSize,n.spotShadow[_]=k,n.spotShadowMap[_]=X,v++}_++}else if(P.isRectAreaLight){const F=t.get(P);F.color.copy(z).multiplyScalar(L),F.halfWidth.set(P.width*.5,0,0),F.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=F,m++}else if(P.isPointLight){const F=t.get(P);if(F.color.copy(P.color).multiplyScalar(P.intensity),F.distance=P.distance,F.decay=P.decay,P.castShadow){const W=P.shadow,k=e.get(P);k.shadowIntensity=W.intensity,k.shadowBias=W.bias,k.shadowNormalBias=W.normalBias,k.shadowRadius=W.radius,k.shadowMapSize=W.mapSize,k.shadowCameraNear=W.camera.near,k.shadowCameraFar=W.camera.far,n.pointShadow[g]=k,n.pointShadowMap[g]=X,n.pointShadowMatrix[g]=P.shadow.matrix,M++}n.point[g]=F,g++}else if(P.isHemisphereLight){const F=t.get(P);F.skyColor.copy(P.color).multiplyScalar(L),F.groundColor.copy(P.groundColor).multiplyScalar(L),n.hemi[d]=F,d++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=st.LTC_FLOAT_1,n.rectAreaLTC2=st.LTC_FLOAT_2):(n.rectAreaLTC1=st.LTC_HALF_1,n.rectAreaLTC2=st.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const C=n.hash;(C.directionalLength!==p||C.pointLength!==g||C.spotLength!==_||C.rectAreaLength!==m||C.hemiLength!==d||C.numDirectionalShadows!==x||C.numPointShadows!==M||C.numSpotShadows!==v||C.numSpotMaps!==A||C.numLightProbes!==T)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=v+A-b,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=T,C.directionalLength=p,C.pointLength=g,C.spotLength=_,C.rectAreaLength=m,C.hemiLength=d,C.numDirectionalShadows=x,C.numPointShadows=M,C.numSpotShadows=v,C.numSpotMaps=A,C.numLightProbes=T,n.version=g0++)}function l(c,h){let u=0,f=0,p=0,g=0,_=0;const m=h.matrixWorldInverse;for(let d=0,x=c.length;d<x;d++){const M=c[d];if(M.isDirectionalLight){const v=n.directional[u];v.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),u++}else if(M.isSpotLight){const v=n.spot[p];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),p++}else if(M.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),a.identity(),r.copy(M.matrixWorld),r.premultiply(m),a.extractRotation(r),v.halfWidth.set(M.width*.5,0,0),v.halfHeight.set(0,M.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(M.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:n}}function Xl(i){const t=new v0(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function x0(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Xl(i),t.set(s,[o])):r>=a.length?(o=new Xl(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class Qc extends yi{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=$h,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class M0 extends yi{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const y0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,S0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function E0(i,t,e){let n=new Co;const s=new ot,r=new ot,a=new Qt,o=new Qc({depthPacking:Uc}),l=new M0,c={},h=e.maxTextureSize,u={[ei]:Xe,[Xe]:ei,[Se]:Se},f=new $e({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ot},radius:{value:4}},vertexShader:y0,fragmentShader:S0}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new fe;g.setAttribute("position",new ge(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Gt(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Mc;let d=this.type;this.render=function(b,T,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;const E=i.getRenderTarget(),y=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),z=i.state;z.setBlending(Qn),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const L=d!==Un&&this.type===Un,H=d===Un&&this.type!==Un;for(let X=0,F=b.length;X<F;X++){const W=b[X],k=W.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",W,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const Z=k.getFrameExtents();if(s.multiply(Z),r.copy(k.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Z.x),s.x=r.x*Z.x,k.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Z.y),s.y=r.y*Z.y,k.mapSize.y=r.y)),k.map===null||L===!0||H===!0){const ft=this.type!==Un?{minFilter:Ke,magFilter:Ke}:{};k.map!==null&&k.map.dispose(),k.map=new gn(s.x,s.y,ft),k.map.texture.name=W.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();const tt=k.getViewportCount();for(let ft=0;ft<tt;ft++){const Ct=k.getViewport(ft);a.set(r.x*Ct.x,r.y*Ct.y,r.x*Ct.z,r.y*Ct.w),z.viewport(a),k.updateMatrices(W,ft),n=k.getFrustum(),v(T,C,k.camera,W,this.type)}k.isPointLightShadow!==!0&&this.type===Un&&x(k,C),k.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(E,y,P)};function x(b,T){const C=t.update(_);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new gn(s.x,s.y)),f.uniforms.shadow_pass.value=b.map.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(T,null,C,f,_,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(T,null,C,p,_,null)}function M(b,T,C,E){let y=null;const P=C.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(P!==void 0)y=P;else if(y=C.isPointLight===!0?l:o,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const z=y.uuid,L=T.uuid;let H=c[z];H===void 0&&(H={},c[z]=H);let X=H[L];X===void 0&&(X=y.clone(),H[L]=X,T.addEventListener("dispose",A)),y=X}if(y.visible=T.visible,y.wireframe=T.wireframe,E===Un?y.side=T.shadowSide!==null?T.shadowSide:T.side:y.side=T.shadowSide!==null?T.shadowSide:u[T.side],y.alphaMap=T.alphaMap,y.alphaTest=T.alphaTest,y.map=T.map,y.clipShadows=T.clipShadows,y.clippingPlanes=T.clippingPlanes,y.clipIntersection=T.clipIntersection,y.displacementMap=T.displacementMap,y.displacementScale=T.displacementScale,y.displacementBias=T.displacementBias,y.wireframeLinewidth=T.wireframeLinewidth,y.linewidth=T.linewidth,C.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const z=i.properties.get(y);z.light=C}return y}function v(b,T,C,E,y){if(b.visible===!1)return;if(b.layers.test(T.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&y===Un)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,b.matrixWorld);const L=t.update(b),H=b.material;if(Array.isArray(H)){const X=L.groups;for(let F=0,W=X.length;F<W;F++){const k=X[F],Z=H[k.materialIndex];if(Z&&Z.visible){const tt=M(b,Z,E,y);b.onBeforeShadow(i,b,T,C,L,tt,k),i.renderBufferDirect(C,null,L,tt,b,k),b.onAfterShadow(i,b,T,C,L,tt,k)}}}else if(H.visible){const X=M(b,H,E,y);b.onBeforeShadow(i,b,T,C,L,X,null),i.renderBufferDirect(C,null,L,X,b,null),b.onAfterShadow(i,b,T,C,L,X,null)}}const z=b.children;for(let L=0,H=z.length;L<H;L++)v(z[L],T,C,E,y)}function A(b){b.target.removeEventListener("dispose",A);for(const C in c){const E=c[C],y=b.target.uuid;y in E&&(E[y].dispose(),delete E[y])}}}const w0={[ba]:Ta,[Aa]:Pa,[Ra]:Da,[Ji]:Ca,[Ta]:ba,[Pa]:Aa,[Da]:Ra,[Ca]:Ji};function b0(i,t){function e(){let I=!1;const rt=new Qt;let Y=null;const $=new Qt(0,0,0,0);return{setMask:function(ht){Y!==ht&&!I&&(i.colorMask(ht,ht,ht,ht),Y=ht)},setLocked:function(ht){I=ht},setClear:function(ht,lt,It,ve,Ue){Ue===!0&&(ht*=ve,lt*=ve,It*=ve),rt.set(ht,lt,It,ve),$.equals(rt)===!1&&(i.clearColor(ht,lt,It,ve),$.copy(rt))},reset:function(){I=!1,Y=null,$.set(-1,0,0,0)}}}function n(){let I=!1,rt=!1,Y=null,$=null,ht=null;return{setReversed:function(lt){if(rt!==lt){const It=t.get("EXT_clip_control");rt?It.clipControlEXT(It.LOWER_LEFT_EXT,It.ZERO_TO_ONE_EXT):It.clipControlEXT(It.LOWER_LEFT_EXT,It.NEGATIVE_ONE_TO_ONE_EXT);const ve=ht;ht=null,this.setClear(ve)}rt=lt},getReversed:function(){return rt},setTest:function(lt){lt?it(i.DEPTH_TEST):ut(i.DEPTH_TEST)},setMask:function(lt){Y!==lt&&!I&&(i.depthMask(lt),Y=lt)},setFunc:function(lt){if(rt&&(lt=w0[lt]),$!==lt){switch(lt){case ba:i.depthFunc(i.NEVER);break;case Ta:i.depthFunc(i.ALWAYS);break;case Aa:i.depthFunc(i.LESS);break;case Ji:i.depthFunc(i.LEQUAL);break;case Ra:i.depthFunc(i.EQUAL);break;case Ca:i.depthFunc(i.GEQUAL);break;case Pa:i.depthFunc(i.GREATER);break;case Da:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}$=lt}},setLocked:function(lt){I=lt},setClear:function(lt){ht!==lt&&(rt&&(lt=1-lt),i.clearDepth(lt),ht=lt)},reset:function(){I=!1,Y=null,$=null,ht=null,rt=!1}}}function s(){let I=!1,rt=null,Y=null,$=null,ht=null,lt=null,It=null,ve=null,Ue=null;return{setTest:function(ee){I||(ee?it(i.STENCIL_TEST):ut(i.STENCIL_TEST))},setMask:function(ee){rt!==ee&&!I&&(i.stencilMask(ee),rt=ee)},setFunc:function(ee,ln,bn){(Y!==ee||$!==ln||ht!==bn)&&(i.stencilFunc(ee,ln,bn),Y=ee,$=ln,ht=bn)},setOp:function(ee,ln,bn){(lt!==ee||It!==ln||ve!==bn)&&(i.stencilOp(ee,ln,bn),lt=ee,It=ln,ve=bn)},setLocked:function(ee){I=ee},setClear:function(ee){Ue!==ee&&(i.clearStencil(ee),Ue=ee)},reset:function(){I=!1,rt=null,Y=null,$=null,ht=null,lt=null,It=null,ve=null,Ue=null}}}const r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},u={},f=new WeakMap,p=[],g=null,_=!1,m=null,d=null,x=null,M=null,v=null,A=null,b=null,T=new bt(0,0,0),C=0,E=!1,y=null,P=null,z=null,L=null,H=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,W=0;const k=i.getParameter(i.VERSION);k.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(k)[1]),F=W>=1):k.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),F=W>=2);let Z=null,tt={};const ft=i.getParameter(i.SCISSOR_BOX),Ct=i.getParameter(i.VIEWPORT),Ht=new Qt().fromArray(ft),q=new Qt().fromArray(Ct);function Q(I,rt,Y,$){const ht=new Uint8Array(4),lt=i.createTexture();i.bindTexture(I,lt),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let It=0;It<Y;It++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(rt,0,i.RGBA,1,1,$,0,i.RGBA,i.UNSIGNED_BYTE,ht):i.texImage2D(rt+It,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ht);return lt}const dt={};dt[i.TEXTURE_2D]=Q(i.TEXTURE_2D,i.TEXTURE_2D,1),dt[i.TEXTURE_CUBE_MAP]=Q(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),dt[i.TEXTURE_2D_ARRAY]=Q(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),dt[i.TEXTURE_3D]=Q(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),it(i.DEPTH_TEST),a.setFunc(Ji),kt(!1),Vt(Ko),it(i.CULL_FACE),O(Qn);function it(I){h[I]!==!0&&(i.enable(I),h[I]=!0)}function ut(I){h[I]!==!1&&(i.disable(I),h[I]=!1)}function mt(I,rt){return u[I]!==rt?(i.bindFramebuffer(I,rt),u[I]=rt,I===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=rt),I===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=rt),!0):!1}function Pt(I,rt){let Y=p,$=!1;if(I){Y=f.get(rt),Y===void 0&&(Y=[],f.set(rt,Y));const ht=I.textures;if(Y.length!==ht.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let lt=0,It=ht.length;lt<It;lt++)Y[lt]=i.COLOR_ATTACHMENT0+lt;Y.length=ht.length,$=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,$=!0);$&&i.drawBuffers(Y)}function te(I){return g!==I?(i.useProgram(I),g=I,!0):!1}const Wt={[fi]:i.FUNC_ADD,[bh]:i.FUNC_SUBTRACT,[Th]:i.FUNC_REVERSE_SUBTRACT};Wt[Ah]=i.MIN,Wt[Rh]=i.MAX;const oe={[Ch]:i.ZERO,[Ph]:i.ONE,[Dh]:i.SRC_COLOR,[Ea]:i.SRC_ALPHA,[Oh]:i.SRC_ALPHA_SATURATE,[Nh]:i.DST_COLOR,[Ih]:i.DST_ALPHA,[Lh]:i.ONE_MINUS_SRC_COLOR,[wa]:i.ONE_MINUS_SRC_ALPHA,[Fh]:i.ONE_MINUS_DST_COLOR,[Uh]:i.ONE_MINUS_DST_ALPHA,[zh]:i.CONSTANT_COLOR,[Bh]:i.ONE_MINUS_CONSTANT_COLOR,[Hh]:i.CONSTANT_ALPHA,[kh]:i.ONE_MINUS_CONSTANT_ALPHA};function O(I,rt,Y,$,ht,lt,It,ve,Ue,ee){if(I===Qn){_===!0&&(ut(i.BLEND),_=!1);return}if(_===!1&&(it(i.BLEND),_=!0),I!==wh){if(I!==m||ee!==E){if((d!==fi||v!==fi)&&(i.blendEquation(i.FUNC_ADD),d=fi,v=fi),ee)switch(I){case Zi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Us:i.blendFunc(i.ONE,i.ONE);break;case $o:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Jo:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Zi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Us:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case $o:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Jo:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}x=null,M=null,A=null,b=null,T.set(0,0,0),C=0,m=I,E=ee}return}ht=ht||rt,lt=lt||Y,It=It||$,(rt!==d||ht!==v)&&(i.blendEquationSeparate(Wt[rt],Wt[ht]),d=rt,v=ht),(Y!==x||$!==M||lt!==A||It!==b)&&(i.blendFuncSeparate(oe[Y],oe[$],oe[lt],oe[It]),x=Y,M=$,A=lt,b=It),(ve.equals(T)===!1||Ue!==C)&&(i.blendColor(ve.r,ve.g,ve.b,Ue),T.copy(ve),C=Ue),m=I,E=!1}function He(I,rt){I.side===Se?ut(i.CULL_FACE):it(i.CULL_FACE);let Y=I.side===Xe;rt&&(Y=!Y),kt(Y),I.blending===Zi&&I.transparent===!1?O(Qn):O(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);const $=I.stencilWrite;o.setTest($),$&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),le(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?it(i.SAMPLE_ALPHA_TO_COVERAGE):ut(i.SAMPLE_ALPHA_TO_COVERAGE)}function kt(I){y!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),y=I)}function Vt(I){I!==Sh?(it(i.CULL_FACE),I!==P&&(I===Ko?i.cullFace(i.BACK):I===Eh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ut(i.CULL_FACE),P=I}function At(I){I!==z&&(F&&i.lineWidth(I),z=I)}function le(I,rt,Y){I?(it(i.POLYGON_OFFSET_FILL),(L!==rt||H!==Y)&&(i.polygonOffset(rt,Y),L=rt,H=Y)):ut(i.POLYGON_OFFSET_FILL)}function Tt(I){I?it(i.SCISSOR_TEST):ut(i.SCISSOR_TEST)}function R(I){I===void 0&&(I=i.TEXTURE0+X-1),Z!==I&&(i.activeTexture(I),Z=I)}function S(I,rt,Y){Y===void 0&&(Z===null?Y=i.TEXTURE0+X-1:Y=Z);let $=tt[Y];$===void 0&&($={type:void 0,texture:void 0},tt[Y]=$),($.type!==I||$.texture!==rt)&&(Z!==Y&&(i.activeTexture(Y),Z=Y),i.bindTexture(I,rt||dt[I]),$.type=I,$.texture=rt)}function B(){const I=tt[Z];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function K(){try{i.compressedTexImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function J(){try{i.compressedTexImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function j(){try{i.texSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function yt(){try{i.texSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function at(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function pt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Yt(){try{i.texStorage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function et(){try{i.texStorage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function gt(){try{i.texImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Rt(){try{i.texImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Dt(I){Ht.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),Ht.copy(I))}function _t(I){q.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),q.copy(I))}function Xt(I,rt){let Y=c.get(rt);Y===void 0&&(Y=new WeakMap,c.set(rt,Y));let $=Y.get(I);$===void 0&&($=i.getUniformBlockIndex(rt,I.name),Y.set(I,$))}function Ot(I,rt){const $=c.get(rt).get(I);l.get(rt)!==$&&(i.uniformBlockBinding(rt,$,I.__bindingPointIndex),l.set(rt,$))}function re(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},Z=null,tt={},u={},f=new WeakMap,p=[],g=null,_=!1,m=null,d=null,x=null,M=null,v=null,A=null,b=null,T=new bt(0,0,0),C=0,E=!1,y=null,P=null,z=null,L=null,H=null,Ht.set(0,0,i.canvas.width,i.canvas.height),q.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:it,disable:ut,bindFramebuffer:mt,drawBuffers:Pt,useProgram:te,setBlending:O,setMaterial:He,setFlipSided:kt,setCullFace:Vt,setLineWidth:At,setPolygonOffset:le,setScissorTest:Tt,activeTexture:R,bindTexture:S,unbindTexture:B,compressedTexImage2D:K,compressedTexImage3D:J,texImage2D:gt,texImage3D:Rt,updateUBOMapping:Xt,uniformBlockBinding:Ot,texStorage2D:Yt,texStorage3D:et,texSubImage2D:j,texSubImage3D:yt,compressedTexSubImage2D:at,compressedTexSubImage3D:pt,scissor:Dt,viewport:_t,reset:re}}function Yl(i,t,e,n){const s=T0(n);switch(e){case Rc:return i*t;case Pc:return i*t;case Dc:return i*t*2;case Os:return i*t/s.components*s.byteLength;case Eo:return i*t/s.components*s.byteLength;case Lc:return i*t*2/s.components*s.byteLength;case wo:return i*t*2/s.components*s.byteLength;case Cc:return i*t*3/s.components*s.byteLength;case Ze:return i*t*4/s.components*s.byteLength;case bo:return i*t*4/s.components*s.byteLength;case yr:case Sr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Er:case wr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Fa:case za:return Math.max(i,16)*Math.max(t,8)/4;case Na:case Oa:return Math.max(i,8)*Math.max(t,8)/2;case Ba:case Ha:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ka:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Va:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ga:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Wa:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Xa:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ya:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case qa:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case ja:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Za:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ka:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case $a:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ja:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Qa:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case to:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case eo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case br:case no:case io:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Ic:case so:return Math.ceil(i/4)*Math.ceil(t/4)*8;case ro:case ao:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function T0(i){switch(i){case En:case bc:return{byteLength:1,components:1};case Ns:case Tc:case ii:return{byteLength:2,components:1};case yo:case So:return{byteLength:2,components:4};case _i:case Mo:case mn:return{byteLength:4,components:1};case Ac:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function A0(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ot,h=new WeakMap;let u;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,S){return p?new OffscreenCanvas(R,S):Cr("canvas")}function _(R,S,B){let K=1;const J=Tt(R);if((J.width>B||J.height>B)&&(K=B/Math.max(J.width,J.height)),K<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const j=Math.floor(K*J.width),yt=Math.floor(K*J.height);u===void 0&&(u=g(j,yt));const at=S?g(j,yt):u;return at.width=j,at.height=yt,at.getContext("2d").drawImage(R,0,0,j,yt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+j+"x"+yt+")."),at}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),R;return R}function m(R){return R.generateMipmaps}function d(R){i.generateMipmap(R)}function x(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(R,S,B,K,J=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let j=S;if(S===i.RED&&(B===i.FLOAT&&(j=i.R32F),B===i.HALF_FLOAT&&(j=i.R16F),B===i.UNSIGNED_BYTE&&(j=i.R8)),S===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(j=i.R8UI),B===i.UNSIGNED_SHORT&&(j=i.R16UI),B===i.UNSIGNED_INT&&(j=i.R32UI),B===i.BYTE&&(j=i.R8I),B===i.SHORT&&(j=i.R16I),B===i.INT&&(j=i.R32I)),S===i.RG&&(B===i.FLOAT&&(j=i.RG32F),B===i.HALF_FLOAT&&(j=i.RG16F),B===i.UNSIGNED_BYTE&&(j=i.RG8)),S===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(j=i.RG8UI),B===i.UNSIGNED_SHORT&&(j=i.RG16UI),B===i.UNSIGNED_INT&&(j=i.RG32UI),B===i.BYTE&&(j=i.RG8I),B===i.SHORT&&(j=i.RG16I),B===i.INT&&(j=i.RG32I)),S===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(j=i.RGB8UI),B===i.UNSIGNED_SHORT&&(j=i.RGB16UI),B===i.UNSIGNED_INT&&(j=i.RGB32UI),B===i.BYTE&&(j=i.RGB8I),B===i.SHORT&&(j=i.RGB16I),B===i.INT&&(j=i.RGB32I)),S===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),B===i.UNSIGNED_INT&&(j=i.RGBA32UI),B===i.BYTE&&(j=i.RGBA8I),B===i.SHORT&&(j=i.RGBA16I),B===i.INT&&(j=i.RGBA32I)),S===i.RGB&&B===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),S===i.RGBA){const yt=J?Ur:qt.getTransfer(K);B===i.FLOAT&&(j=i.RGBA32F),B===i.HALF_FLOAT&&(j=i.RGBA16F),B===i.UNSIGNED_BYTE&&(j=yt===ie?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function v(R,S){let B;return R?S===null||S===_i||S===ns?B=i.DEPTH24_STENCIL8:S===mn?B=i.DEPTH32F_STENCIL8:S===Ns&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===_i||S===ns?B=i.DEPTH_COMPONENT24:S===mn?B=i.DEPTH_COMPONENT32F:S===Ns&&(B=i.DEPTH_COMPONENT16),B}function A(R,S){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==Ke&&R.minFilter!==Ie?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function b(R){const S=R.target;S.removeEventListener("dispose",b),C(S),S.isVideoTexture&&h.delete(S)}function T(R){const S=R.target;S.removeEventListener("dispose",T),y(S)}function C(R){const S=n.get(R);if(S.__webglInit===void 0)return;const B=R.source,K=f.get(B);if(K){const J=K[S.__cacheKey];J.usedTimes--,J.usedTimes===0&&E(R),Object.keys(K).length===0&&f.delete(B)}n.remove(R)}function E(R){const S=n.get(R);i.deleteTexture(S.__webglTexture);const B=R.source,K=f.get(B);delete K[S.__cacheKey],a.memory.textures--}function y(R){const S=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(S.__webglFramebuffer[K]))for(let J=0;J<S.__webglFramebuffer[K].length;J++)i.deleteFramebuffer(S.__webglFramebuffer[K][J]);else i.deleteFramebuffer(S.__webglFramebuffer[K]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[K])}else{if(Array.isArray(S.__webglFramebuffer))for(let K=0;K<S.__webglFramebuffer.length;K++)i.deleteFramebuffer(S.__webglFramebuffer[K]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let K=0;K<S.__webglColorRenderbuffer.length;K++)S.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[K]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const B=R.textures;for(let K=0,J=B.length;K<J;K++){const j=n.get(B[K]);j.__webglTexture&&(i.deleteTexture(j.__webglTexture),a.memory.textures--),n.remove(B[K])}n.remove(R)}let P=0;function z(){P=0}function L(){const R=P;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),P+=1,R}function H(R){const S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.colorSpace),S.join()}function X(R,S){const B=n.get(R);if(R.isVideoTexture&&At(R),R.isRenderTargetTexture===!1&&R.version>0&&B.__version!==R.version){const K=R.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(B,R,S);return}}e.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+S)}function F(R,S){const B=n.get(R);if(R.version>0&&B.__version!==R.version){q(B,R,S);return}e.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+S)}function W(R,S){const B=n.get(R);if(R.version>0&&B.__version!==R.version){q(B,R,S);return}e.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+S)}function k(R,S){const B=n.get(R);if(R.version>0&&B.__version!==R.version){Q(B,R,S);return}e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+S)}const Z={[es]:i.REPEAT,[an]:i.CLAMP_TO_EDGE,[Ua]:i.MIRRORED_REPEAT},tt={[Ke]:i.NEAREST,[Kh]:i.NEAREST_MIPMAP_NEAREST,[ks]:i.NEAREST_MIPMAP_LINEAR,[Ie]:i.LINEAR,[Vr]:i.LINEAR_MIPMAP_NEAREST,[$n]:i.LINEAR_MIPMAP_LINEAR},ft={[Qh]:i.NEVER,[ru]:i.ALWAYS,[tu]:i.LESS,[Fc]:i.LEQUAL,[eu]:i.EQUAL,[su]:i.GEQUAL,[nu]:i.GREATER,[iu]:i.NOTEQUAL};function Ct(R,S){if(S.type===mn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Ie||S.magFilter===Vr||S.magFilter===ks||S.magFilter===$n||S.minFilter===Ie||S.minFilter===Vr||S.minFilter===ks||S.minFilter===$n)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,Z[S.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,Z[S.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,Z[S.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,tt[S.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,tt[S.minFilter]),S.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,ft[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Ke||S.minFilter!==ks&&S.minFilter!==$n||S.type===mn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");i.texParameterf(R,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Ht(R,S){let B=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",b));const K=S.source;let J=f.get(K);J===void 0&&(J={},f.set(K,J));const j=H(S);if(j!==R.__cacheKey){J[j]===void 0&&(J[j]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),J[j].usedTimes++;const yt=J[R.__cacheKey];yt!==void 0&&(J[R.__cacheKey].usedTimes--,yt.usedTimes===0&&E(S)),R.__cacheKey=j,R.__webglTexture=J[j].texture}return B}function q(R,S,B){let K=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(K=i.TEXTURE_3D);const J=Ht(R,S),j=S.source;e.bindTexture(K,R.__webglTexture,i.TEXTURE0+B);const yt=n.get(j);if(j.version!==yt.__version||J===!0){e.activeTexture(i.TEXTURE0+B);const at=qt.getPrimaries(qt.workingColorSpace),pt=S.colorSpace===Kn?null:qt.getPrimaries(S.colorSpace),Yt=S.colorSpace===Kn||at===pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Yt);let et=_(S.image,!1,s.maxTextureSize);et=le(S,et);const gt=r.convert(S.format,S.colorSpace),Rt=r.convert(S.type);let Dt=M(S.internalFormat,gt,Rt,S.colorSpace,S.isVideoTexture);Ct(K,S);let _t;const Xt=S.mipmaps,Ot=S.isVideoTexture!==!0,re=yt.__version===void 0||J===!0,I=j.dataReady,rt=A(S,et);if(S.isDepthTexture)Dt=v(S.format===is,S.type),re&&(Ot?e.texStorage2D(i.TEXTURE_2D,1,Dt,et.width,et.height):e.texImage2D(i.TEXTURE_2D,0,Dt,et.width,et.height,0,gt,Rt,null));else if(S.isDataTexture)if(Xt.length>0){Ot&&re&&e.texStorage2D(i.TEXTURE_2D,rt,Dt,Xt[0].width,Xt[0].height);for(let Y=0,$=Xt.length;Y<$;Y++)_t=Xt[Y],Ot?I&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,_t.width,_t.height,gt,Rt,_t.data):e.texImage2D(i.TEXTURE_2D,Y,Dt,_t.width,_t.height,0,gt,Rt,_t.data);S.generateMipmaps=!1}else Ot?(re&&e.texStorage2D(i.TEXTURE_2D,rt,Dt,et.width,et.height),I&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,et.width,et.height,gt,Rt,et.data)):e.texImage2D(i.TEXTURE_2D,0,Dt,et.width,et.height,0,gt,Rt,et.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Ot&&re&&e.texStorage3D(i.TEXTURE_2D_ARRAY,rt,Dt,Xt[0].width,Xt[0].height,et.depth);for(let Y=0,$=Xt.length;Y<$;Y++)if(_t=Xt[Y],S.format!==Ze)if(gt!==null)if(Ot){if(I)if(S.layerUpdates.size>0){const ht=Yl(_t.width,_t.height,S.format,S.type);for(const lt of S.layerUpdates){const It=_t.data.subarray(lt*ht/_t.data.BYTES_PER_ELEMENT,(lt+1)*ht/_t.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,lt,_t.width,_t.height,1,gt,It)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,_t.width,_t.height,et.depth,gt,_t.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Y,Dt,_t.width,_t.height,et.depth,0,_t.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ot?I&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,_t.width,_t.height,et.depth,gt,Rt,_t.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Y,Dt,_t.width,_t.height,et.depth,0,gt,Rt,_t.data)}else{Ot&&re&&e.texStorage2D(i.TEXTURE_2D,rt,Dt,Xt[0].width,Xt[0].height);for(let Y=0,$=Xt.length;Y<$;Y++)_t=Xt[Y],S.format!==Ze?gt!==null?Ot?I&&e.compressedTexSubImage2D(i.TEXTURE_2D,Y,0,0,_t.width,_t.height,gt,_t.data):e.compressedTexImage2D(i.TEXTURE_2D,Y,Dt,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ot?I&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,_t.width,_t.height,gt,Rt,_t.data):e.texImage2D(i.TEXTURE_2D,Y,Dt,_t.width,_t.height,0,gt,Rt,_t.data)}else if(S.isDataArrayTexture)if(Ot){if(re&&e.texStorage3D(i.TEXTURE_2D_ARRAY,rt,Dt,et.width,et.height,et.depth),I)if(S.layerUpdates.size>0){const Y=Yl(et.width,et.height,S.format,S.type);for(const $ of S.layerUpdates){const ht=et.data.subarray($*Y/et.data.BYTES_PER_ELEMENT,($+1)*Y/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,$,et.width,et.height,1,gt,Rt,ht)}S.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,gt,Rt,et.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Dt,et.width,et.height,et.depth,0,gt,Rt,et.data);else if(S.isData3DTexture)Ot?(re&&e.texStorage3D(i.TEXTURE_3D,rt,Dt,et.width,et.height,et.depth),I&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,gt,Rt,et.data)):e.texImage3D(i.TEXTURE_3D,0,Dt,et.width,et.height,et.depth,0,gt,Rt,et.data);else if(S.isFramebufferTexture){if(re)if(Ot)e.texStorage2D(i.TEXTURE_2D,rt,Dt,et.width,et.height);else{let Y=et.width,$=et.height;for(let ht=0;ht<rt;ht++)e.texImage2D(i.TEXTURE_2D,ht,Dt,Y,$,0,gt,Rt,null),Y>>=1,$>>=1}}else if(Xt.length>0){if(Ot&&re){const Y=Tt(Xt[0]);e.texStorage2D(i.TEXTURE_2D,rt,Dt,Y.width,Y.height)}for(let Y=0,$=Xt.length;Y<$;Y++)_t=Xt[Y],Ot?I&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,gt,Rt,_t):e.texImage2D(i.TEXTURE_2D,Y,Dt,gt,Rt,_t);S.generateMipmaps=!1}else if(Ot){if(re){const Y=Tt(et);e.texStorage2D(i.TEXTURE_2D,rt,Dt,Y.width,Y.height)}I&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,gt,Rt,et)}else e.texImage2D(i.TEXTURE_2D,0,Dt,gt,Rt,et);m(S)&&d(K),yt.__version=j.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function Q(R,S,B){if(S.image.length!==6)return;const K=Ht(R,S),J=S.source;e.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+B);const j=n.get(J);if(J.version!==j.__version||K===!0){e.activeTexture(i.TEXTURE0+B);const yt=qt.getPrimaries(qt.workingColorSpace),at=S.colorSpace===Kn?null:qt.getPrimaries(S.colorSpace),pt=S.colorSpace===Kn||yt===at?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt);const Yt=S.isCompressedTexture||S.image[0].isCompressedTexture,et=S.image[0]&&S.image[0].isDataTexture,gt=[];for(let $=0;$<6;$++)!Yt&&!et?gt[$]=_(S.image[$],!0,s.maxCubemapSize):gt[$]=et?S.image[$].image:S.image[$],gt[$]=le(S,gt[$]);const Rt=gt[0],Dt=r.convert(S.format,S.colorSpace),_t=r.convert(S.type),Xt=M(S.internalFormat,Dt,_t,S.colorSpace),Ot=S.isVideoTexture!==!0,re=j.__version===void 0||K===!0,I=J.dataReady;let rt=A(S,Rt);Ct(i.TEXTURE_CUBE_MAP,S);let Y;if(Yt){Ot&&re&&e.texStorage2D(i.TEXTURE_CUBE_MAP,rt,Xt,Rt.width,Rt.height);for(let $=0;$<6;$++){Y=gt[$].mipmaps;for(let ht=0;ht<Y.length;ht++){const lt=Y[ht];S.format!==Ze?Dt!==null?Ot?I&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ht,0,0,lt.width,lt.height,Dt,lt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ht,Xt,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ot?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ht,0,0,lt.width,lt.height,Dt,_t,lt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ht,Xt,lt.width,lt.height,0,Dt,_t,lt.data)}}}else{if(Y=S.mipmaps,Ot&&re){Y.length>0&&rt++;const $=Tt(gt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,rt,Xt,$.width,$.height)}for(let $=0;$<6;$++)if(et){Ot?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,gt[$].width,gt[$].height,Dt,_t,gt[$].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Xt,gt[$].width,gt[$].height,0,Dt,_t,gt[$].data);for(let ht=0;ht<Y.length;ht++){const It=Y[ht].image[$].image;Ot?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ht+1,0,0,It.width,It.height,Dt,_t,It.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ht+1,Xt,It.width,It.height,0,Dt,_t,It.data)}}else{Ot?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Dt,_t,gt[$]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Xt,Dt,_t,gt[$]);for(let ht=0;ht<Y.length;ht++){const lt=Y[ht];Ot?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ht+1,0,0,Dt,_t,lt.image[$]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ht+1,Xt,Dt,_t,lt.image[$])}}}m(S)&&d(i.TEXTURE_CUBE_MAP),j.__version=J.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function dt(R,S,B,K,J,j){const yt=r.convert(B.format,B.colorSpace),at=r.convert(B.type),pt=M(B.internalFormat,yt,at,B.colorSpace),Yt=n.get(S),et=n.get(B);if(et.__renderTarget=S,!Yt.__hasExternalTextures){const gt=Math.max(1,S.width>>j),Rt=Math.max(1,S.height>>j);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?e.texImage3D(J,j,pt,gt,Rt,S.depth,0,yt,at,null):e.texImage2D(J,j,pt,gt,Rt,0,yt,at,null)}e.bindFramebuffer(i.FRAMEBUFFER,R),Vt(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,J,et.__webglTexture,0,kt(S)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,J,et.__webglTexture,j),e.bindFramebuffer(i.FRAMEBUFFER,null)}function it(R,S,B){if(i.bindRenderbuffer(i.RENDERBUFFER,R),S.depthBuffer){const K=S.depthTexture,J=K&&K.isDepthTexture?K.type:null,j=v(S.stencilBuffer,J),yt=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=kt(S);Vt(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,at,j,S.width,S.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,at,j,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,j,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,yt,i.RENDERBUFFER,R)}else{const K=S.textures;for(let J=0;J<K.length;J++){const j=K[J],yt=r.convert(j.format,j.colorSpace),at=r.convert(j.type),pt=M(j.internalFormat,yt,at,j.colorSpace),Yt=kt(S);B&&Vt(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Yt,pt,S.width,S.height):Vt(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Yt,pt,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,pt,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ut(R,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(S.depthTexture);K.__renderTarget=S,(!K.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),X(S.depthTexture,0);const J=K.__webglTexture,j=kt(S);if(S.depthTexture.format===Ki)Vt(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0);else if(S.depthTexture.format===is)Vt(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function mt(R){const S=n.get(R),B=R.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==R.depthTexture){const K=R.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),K){const J=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,K.removeEventListener("dispose",J)};K.addEventListener("dispose",J),S.__depthDisposeCallback=J}S.__boundDepthTexture=K}if(R.depthTexture&&!S.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");ut(S.__webglFramebuffer,R)}else if(B){S.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[K]),S.__webglDepthbuffer[K]===void 0)S.__webglDepthbuffer[K]=i.createRenderbuffer(),it(S.__webglDepthbuffer[K],R,!1);else{const J=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,j=S.__webglDepthbuffer[K];i.bindRenderbuffer(i.RENDERBUFFER,j),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,j)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),it(S.__webglDepthbuffer,R,!1);else{const K=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,J)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Pt(R,S,B){const K=n.get(R);S!==void 0&&dt(K.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&mt(R)}function te(R){const S=R.texture,B=n.get(R),K=n.get(S);R.addEventListener("dispose",T);const J=R.textures,j=R.isWebGLCubeRenderTarget===!0,yt=J.length>1;if(yt||(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=S.version,a.memory.textures++),j){B.__webglFramebuffer=[];for(let at=0;at<6;at++)if(S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer[at]=[];for(let pt=0;pt<S.mipmaps.length;pt++)B.__webglFramebuffer[at][pt]=i.createFramebuffer()}else B.__webglFramebuffer[at]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer=[];for(let at=0;at<S.mipmaps.length;at++)B.__webglFramebuffer[at]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(yt)for(let at=0,pt=J.length;at<pt;at++){const Yt=n.get(J[at]);Yt.__webglTexture===void 0&&(Yt.__webglTexture=i.createTexture(),a.memory.textures++)}if(R.samples>0&&Vt(R)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let at=0;at<J.length;at++){const pt=J[at];B.__webglColorRenderbuffer[at]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[at]);const Yt=r.convert(pt.format,pt.colorSpace),et=r.convert(pt.type),gt=M(pt.internalFormat,Yt,et,pt.colorSpace,R.isXRRenderTarget===!0),Rt=kt(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Rt,gt,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+at,i.RENDERBUFFER,B.__webglColorRenderbuffer[at])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),it(B.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(j){e.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),Ct(i.TEXTURE_CUBE_MAP,S);for(let at=0;at<6;at++)if(S.mipmaps&&S.mipmaps.length>0)for(let pt=0;pt<S.mipmaps.length;pt++)dt(B.__webglFramebuffer[at][pt],R,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+at,pt);else dt(B.__webglFramebuffer[at],R,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0);m(S)&&d(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(yt){for(let at=0,pt=J.length;at<pt;at++){const Yt=J[at],et=n.get(Yt);e.bindTexture(i.TEXTURE_2D,et.__webglTexture),Ct(i.TEXTURE_2D,Yt),dt(B.__webglFramebuffer,R,Yt,i.COLOR_ATTACHMENT0+at,i.TEXTURE_2D,0),m(Yt)&&d(i.TEXTURE_2D)}e.unbindTexture()}else{let at=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(at=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(at,K.__webglTexture),Ct(at,S),S.mipmaps&&S.mipmaps.length>0)for(let pt=0;pt<S.mipmaps.length;pt++)dt(B.__webglFramebuffer[pt],R,S,i.COLOR_ATTACHMENT0,at,pt);else dt(B.__webglFramebuffer,R,S,i.COLOR_ATTACHMENT0,at,0);m(S)&&d(at),e.unbindTexture()}R.depthBuffer&&mt(R)}function Wt(R){const S=R.textures;for(let B=0,K=S.length;B<K;B++){const J=S[B];if(m(J)){const j=x(R),yt=n.get(J).__webglTexture;e.bindTexture(j,yt),d(j),e.unbindTexture()}}}const oe=[],O=[];function He(R){if(R.samples>0){if(Vt(R)===!1){const S=R.textures,B=R.width,K=R.height;let J=i.COLOR_BUFFER_BIT;const j=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,yt=n.get(R),at=S.length>1;if(at)for(let pt=0;pt<S.length;pt++)e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,yt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,yt.__webglFramebuffer);for(let pt=0;pt<S.length;pt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),at){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,yt.__webglColorRenderbuffer[pt]);const Yt=n.get(S[pt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Yt,0)}i.blitFramebuffer(0,0,B,K,0,0,B,K,J,i.NEAREST),l===!0&&(oe.length=0,O.length=0,oe.push(i.COLOR_ATTACHMENT0+pt),R.depthBuffer&&R.resolveDepthBuffer===!1&&(oe.push(j),O.push(j),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,O)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,oe))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),at)for(let pt=0;pt<S.length;pt++){e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,yt.__webglColorRenderbuffer[pt]);const Yt=n.get(S[pt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.TEXTURE_2D,Yt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,yt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const S=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function kt(R){return Math.min(s.maxSamples,R.samples)}function Vt(R){const S=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function At(R){const S=a.render.frame;h.get(R)!==S&&(h.set(R,S),R.update())}function le(R,S){const B=R.colorSpace,K=R.format,J=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||B!==os&&B!==Kn&&(qt.getTransfer(B)===ie?(K!==Ze||J!==En)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),S}function Tt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=L,this.resetTextureUnits=z,this.setTexture2D=X,this.setTexture2DArray=F,this.setTexture3D=W,this.setTextureCube=k,this.rebindTextures=Pt,this.setupRenderTarget=te,this.updateRenderTargetMipmap=Wt,this.updateMultisampleRenderTarget=He,this.setupDepthRenderbuffer=mt,this.setupFrameBufferTexture=dt,this.useMultisampledRTT=Vt}function R0(i,t){function e(n,s=Kn){let r;const a=qt.getTransfer(s);if(n===En)return i.UNSIGNED_BYTE;if(n===yo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===So)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ac)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===bc)return i.BYTE;if(n===Tc)return i.SHORT;if(n===Ns)return i.UNSIGNED_SHORT;if(n===Mo)return i.INT;if(n===_i)return i.UNSIGNED_INT;if(n===mn)return i.FLOAT;if(n===ii)return i.HALF_FLOAT;if(n===Rc)return i.ALPHA;if(n===Cc)return i.RGB;if(n===Ze)return i.RGBA;if(n===Pc)return i.LUMINANCE;if(n===Dc)return i.LUMINANCE_ALPHA;if(n===Ki)return i.DEPTH_COMPONENT;if(n===is)return i.DEPTH_STENCIL;if(n===Os)return i.RED;if(n===Eo)return i.RED_INTEGER;if(n===Lc)return i.RG;if(n===wo)return i.RG_INTEGER;if(n===bo)return i.RGBA_INTEGER;if(n===yr||n===Sr||n===Er||n===wr)if(a===ie)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===yr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Er)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===yr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Sr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Er)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===wr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Na||n===Fa||n===Oa||n===za)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Na)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Fa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Oa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===za)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ba||n===Ha||n===ka)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ba||n===Ha)return a===ie?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ka)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Va||n===Ga||n===Wa||n===Xa||n===Ya||n===qa||n===ja||n===Za||n===Ka||n===$a||n===Ja||n===Qa||n===to||n===eo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Va)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ga)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Wa)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Xa)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ya)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===qa)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ja)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Za)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ka)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===$a)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ja)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Qa)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===to)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===eo)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===br||n===no||n===io)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===br)return a===ie?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===no)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===io)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ic||n===so||n===ro||n===ao)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===br)return r.COMPRESSED_RED_RGTC1_EXT;if(n===so)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ro)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ao)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ns?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class C0 extends Ge{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Wi extends Te{constructor(){super(),this.isGroup=!0,this.type="Group"}}const P0={type:"move"};class ma{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Wi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Wi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Wi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),d=this._getHandJoint(c,_);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(P0)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Wi;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const D0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,L0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class I0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new ze,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new $e({vertexShader:D0,fragmentShader:L0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Gt(new vi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class U0 extends xi{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,f=null,p=null,g=null;const _=new I0,m=e.getContextAttributes();let d=null,x=null;const M=[],v=[],A=new ot;let b=null;const T=new Ge;T.viewport=new Qt;const C=new Ge;C.viewport=new Qt;const E=[T,C],y=new C0;let P=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let Q=M[q];return Q===void 0&&(Q=new ma,M[q]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(q){let Q=M[q];return Q===void 0&&(Q=new ma,M[q]=Q),Q.getGripSpace()},this.getHand=function(q){let Q=M[q];return Q===void 0&&(Q=new ma,M[q]=Q),Q.getHandSpace()};function L(q){const Q=v.indexOf(q.inputSource);if(Q===-1)return;const dt=M[Q];dt!==void 0&&(dt.update(q.inputSource,q.frame,c||a),dt.dispatchEvent({type:q.type,data:q.inputSource}))}function H(){s.removeEventListener("select",L),s.removeEventListener("selectstart",L),s.removeEventListener("selectend",L),s.removeEventListener("squeeze",L),s.removeEventListener("squeezestart",L),s.removeEventListener("squeezeend",L),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",X);for(let q=0;q<M.length;q++){const Q=v[q];Q!==null&&(v[q]=null,M[q].disconnect(Q))}P=null,z=null,_.reset(),t.setRenderTarget(d),p=null,f=null,u=null,s=null,x=null,Ht.stop(),n.isPresenting=!1,t.setPixelRatio(b),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(d=t.getRenderTarget(),s.addEventListener("select",L),s.addEventListener("selectstart",L),s.addEventListener("selectend",L),s.addEventListener("squeeze",L),s.addEventListener("squeezestart",L),s.addEventListener("squeezeend",L),s.addEventListener("end",H),s.addEventListener("inputsourceschange",X),m.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(A),s.renderState.layers===void 0){const Q={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,Q),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new gn(p.framebufferWidth,p.framebufferHeight,{format:Ze,type:En,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let Q=null,dt=null,it=null;m.depth&&(it=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Q=m.stencil?is:Ki,dt=m.stencil?ns:_i);const ut={colorFormat:e.RGBA8,depthFormat:it,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(ut),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),x=new gn(f.textureWidth,f.textureHeight,{format:Ze,type:En,depthTexture:new jc(f.textureWidth,f.textureHeight,dt,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ht.setContext(s),Ht.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function X(q){for(let Q=0;Q<q.removed.length;Q++){const dt=q.removed[Q],it=v.indexOf(dt);it>=0&&(v[it]=null,M[it].disconnect(dt))}for(let Q=0;Q<q.added.length;Q++){const dt=q.added[Q];let it=v.indexOf(dt);if(it===-1){for(let mt=0;mt<M.length;mt++)if(mt>=v.length){v.push(dt),it=mt;break}else if(v[mt]===null){v[mt]=dt,it=mt;break}if(it===-1)break}const ut=M[it];ut&&ut.connect(dt)}}const F=new D,W=new D;function k(q,Q,dt){F.setFromMatrixPosition(Q.matrixWorld),W.setFromMatrixPosition(dt.matrixWorld);const it=F.distanceTo(W),ut=Q.projectionMatrix.elements,mt=dt.projectionMatrix.elements,Pt=ut[14]/(ut[10]-1),te=ut[14]/(ut[10]+1),Wt=(ut[9]+1)/ut[5],oe=(ut[9]-1)/ut[5],O=(ut[8]-1)/ut[0],He=(mt[8]+1)/mt[0],kt=Pt*O,Vt=Pt*He,At=it/(-O+He),le=At*-O;if(Q.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(le),q.translateZ(At),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),ut[10]===-1)q.projectionMatrix.copy(Q.projectionMatrix),q.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const Tt=Pt+At,R=te+At,S=kt-le,B=Vt+(it-le),K=Wt*te/R*Tt,J=oe*te/R*Tt;q.projectionMatrix.makePerspective(S,B,K,J,Tt,R),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function Z(q,Q){Q===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(Q.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let Q=q.near,dt=q.far;_.texture!==null&&(_.depthNear>0&&(Q=_.depthNear),_.depthFar>0&&(dt=_.depthFar)),y.near=C.near=T.near=Q,y.far=C.far=T.far=dt,(P!==y.near||z!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),P=y.near,z=y.far),T.layers.mask=q.layers.mask|2,C.layers.mask=q.layers.mask|4,y.layers.mask=T.layers.mask|C.layers.mask;const it=q.parent,ut=y.cameras;Z(y,it);for(let mt=0;mt<ut.length;mt++)Z(ut[mt],it);ut.length===2?k(y,T,C):y.projectionMatrix.copy(T.projectionMatrix),tt(q,y,it)};function tt(q,Q,dt){dt===null?q.matrix.copy(Q.matrixWorld):(q.matrix.copy(dt.matrixWorld),q.matrix.invert(),q.matrix.multiply(Q.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(Q.projectionMatrix),q.projectionMatrixInverse.copy(Q.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Fs*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(q){l=q,f!==null&&(f.fixedFoveation=q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=q)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let ft=null;function Ct(q,Q){if(h=Q.getViewerPose(c||a),g=Q,h!==null){const dt=h.views;p!==null&&(t.setRenderTargetFramebuffer(x,p.framebuffer),t.setRenderTarget(x));let it=!1;dt.length!==y.cameras.length&&(y.cameras.length=0,it=!0);for(let mt=0;mt<dt.length;mt++){const Pt=dt[mt];let te=null;if(p!==null)te=p.getViewport(Pt);else{const oe=u.getViewSubImage(f,Pt);te=oe.viewport,mt===0&&(t.setRenderTargetTextures(x,oe.colorTexture,f.ignoreDepthValues?void 0:oe.depthStencilTexture),t.setRenderTarget(x))}let Wt=E[mt];Wt===void 0&&(Wt=new Ge,Wt.layers.enable(mt),Wt.viewport=new Qt,E[mt]=Wt),Wt.matrix.fromArray(Pt.transform.matrix),Wt.matrix.decompose(Wt.position,Wt.quaternion,Wt.scale),Wt.projectionMatrix.fromArray(Pt.projectionMatrix),Wt.projectionMatrixInverse.copy(Wt.projectionMatrix).invert(),Wt.viewport.set(te.x,te.y,te.width,te.height),mt===0&&(y.matrix.copy(Wt.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),it===!0&&y.cameras.push(Wt)}const ut=s.enabledFeatures;if(ut&&ut.includes("depth-sensing")){const mt=u.getDepthInformation(dt[0]);mt&&mt.isValid&&mt.texture&&_.init(t,mt,s.renderState)}}for(let dt=0;dt<M.length;dt++){const it=v[dt],ut=M[dt];it!==null&&ut!==void 0&&ut.update(it,Q,c||a)}ft&&ft(q,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),g=null}const Ht=new qc;Ht.setAnimationLoop(Ct),this.setAnimationLoop=function(q){ft=q},this.dispose=function(){}}}const hi=new De,N0=new Ft;function F0(i,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,Wc(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,x,M,v){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),u(m,d)):d.isMeshPhongMaterial?(r(m,d),h(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,v)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),_(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,x,M):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Xe&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Xe&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const x=t.get(d),M=x.envMap,v=x.envMapRotation;M&&(m.envMap.value=M,hi.copy(v),hi.x*=-1,hi.y*=-1,hi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(hi.y*=-1,hi.z*=-1),m.envMapRotation.value.setFromMatrix4(N0.makeRotationFromEuler(hi)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,x,M){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*x,m.scale.value=M*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function u(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,x){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Xe&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function _(m,d){const x=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function O0(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,M){const v=M.program;n.uniformBlockBinding(x,v)}function c(x,M){let v=s[x.id];v===void 0&&(g(x),v=h(x),s[x.id]=v,x.addEventListener("dispose",m));const A=M.program;n.updateUBOMapping(x,A);const b=t.render.frame;r[x.id]!==b&&(f(x),r[x.id]=b)}function h(x){const M=u();x.__bindingPointIndex=M;const v=i.createBuffer(),A=x.__size,b=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,A,b),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,v),v}function u(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const M=s[x.id],v=x.uniforms,A=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let b=0,T=v.length;b<T;b++){const C=Array.isArray(v[b])?v[b]:[v[b]];for(let E=0,y=C.length;E<y;E++){const P=C[E];if(p(P,b,E,A)===!0){const z=P.__offset,L=Array.isArray(P.value)?P.value:[P.value];let H=0;for(let X=0;X<L.length;X++){const F=L[X],W=_(F);typeof F=="number"||typeof F=="boolean"?(P.__data[0]=F,i.bufferSubData(i.UNIFORM_BUFFER,z+H,P.__data)):F.isMatrix3?(P.__data[0]=F.elements[0],P.__data[1]=F.elements[1],P.__data[2]=F.elements[2],P.__data[3]=0,P.__data[4]=F.elements[3],P.__data[5]=F.elements[4],P.__data[6]=F.elements[5],P.__data[7]=0,P.__data[8]=F.elements[6],P.__data[9]=F.elements[7],P.__data[10]=F.elements[8],P.__data[11]=0):(F.toArray(P.__data,H),H+=W.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(x,M,v,A){const b=x.value,T=M+"_"+v;if(A[T]===void 0)return typeof b=="number"||typeof b=="boolean"?A[T]=b:A[T]=b.clone(),!0;{const C=A[T];if(typeof b=="number"||typeof b=="boolean"){if(C!==b)return A[T]=b,!0}else if(C.equals(b)===!1)return C.copy(b),!0}return!1}function g(x){const M=x.uniforms;let v=0;const A=16;for(let T=0,C=M.length;T<C;T++){const E=Array.isArray(M[T])?M[T]:[M[T]];for(let y=0,P=E.length;y<P;y++){const z=E[y],L=Array.isArray(z.value)?z.value:[z.value];for(let H=0,X=L.length;H<X;H++){const F=L[H],W=_(F),k=v%A,Z=k%W.boundary,tt=k+Z;v+=Z,tt!==0&&A-tt<W.storage&&(v+=A-tt),z.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=v,v+=W.storage}}}const b=v%A;return b>0&&(v+=A-b),x.__size=v,x.__cache={},this}function _(x){const M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=48,M.storage=48):x.isMatrix4?(M.boundary=64,M.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),M}function m(x){const M=x.target;M.removeEventListener("dispose",m);const v=a.indexOf(M.__bindingPointIndex);a.splice(v,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function d(){for(const x in s)i.deleteBuffer(s[x]);a=[],s={},r={}}return{bind:l,update:c,dispose:d}}class z0{constructor(t={}){const{canvas:e=Eu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,d=null;const x=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Oe,this.toneMapping=ti,this.toneMappingExposure=1;const v=this;let A=!1,b=0,T=0,C=null,E=-1,y=null;const P=new Qt,z=new Qt;let L=null;const H=new bt(0);let X=0,F=e.width,W=e.height,k=1,Z=null,tt=null;const ft=new Qt(0,0,F,W),Ct=new Qt(0,0,F,W);let Ht=!1;const q=new Co;let Q=!1,dt=!1;const it=new Ft,ut=new Ft,mt=new D,Pt=new Qt,te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Wt=!1;function oe(){return C===null?k:1}let O=n;function He(w,U){return e.getContext(w,U)}try{const w={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${xo}`),e.addEventListener("webglcontextlost",$,!1),e.addEventListener("webglcontextrestored",ht,!1),e.addEventListener("webglcontextcreationerror",lt,!1),O===null){const U="webgl2";if(O=He(U,w),O===null)throw He(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let kt,Vt,At,le,Tt,R,S,B,K,J,j,yt,at,pt,Yt,et,gt,Rt,Dt,_t,Xt,Ot,re,I;function rt(){kt=new Wp(O),kt.init(),Ot=new R0(O,kt),Vt=new zp(O,kt,t,Ot),At=new b0(O,kt),Vt.reverseDepthBuffer&&f&&At.buffers.depth.setReversed(!0),le=new qp(O),Tt=new u0,R=new A0(O,kt,At,Tt,Vt,Ot,le),S=new Hp(v),B=new Gp(v),K=new Qu(O),re=new Fp(O,K),J=new Xp(O,K,le,re),j=new Zp(O,J,K,le),Dt=new jp(O,Vt,R),et=new Bp(Tt),yt=new h0(v,S,B,kt,Vt,re,et),at=new F0(v,Tt),pt=new d0,Yt=new x0(kt),Rt=new Np(v,S,B,At,j,p,l),gt=new E0(v,j,Vt),I=new O0(O,le,Vt,At),_t=new Op(O,kt,le),Xt=new Yp(O,kt,le),le.programs=yt.programs,v.capabilities=Vt,v.extensions=kt,v.properties=Tt,v.renderLists=pt,v.shadowMap=gt,v.state=At,v.info=le}rt();const Y=new U0(v,O);this.xr=Y,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const w=kt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=kt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(w){w!==void 0&&(k=w,this.setSize(F,W,!1))},this.getSize=function(w){return w.set(F,W)},this.setSize=function(w,U,V=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=w,W=U,e.width=Math.floor(w*k),e.height=Math.floor(U*k),V===!0&&(e.style.width=w+"px",e.style.height=U+"px"),this.setViewport(0,0,w,U)},this.getDrawingBufferSize=function(w){return w.set(F*k,W*k).floor()},this.setDrawingBufferSize=function(w,U,V){F=w,W=U,k=V,e.width=Math.floor(w*V),e.height=Math.floor(U*V),this.setViewport(0,0,w,U)},this.getCurrentViewport=function(w){return w.copy(P)},this.getViewport=function(w){return w.copy(ft)},this.setViewport=function(w,U,V,G){w.isVector4?ft.set(w.x,w.y,w.z,w.w):ft.set(w,U,V,G),At.viewport(P.copy(ft).multiplyScalar(k).round())},this.getScissor=function(w){return w.copy(Ct)},this.setScissor=function(w,U,V,G){w.isVector4?Ct.set(w.x,w.y,w.z,w.w):Ct.set(w,U,V,G),At.scissor(z.copy(Ct).multiplyScalar(k).round())},this.getScissorTest=function(){return Ht},this.setScissorTest=function(w){At.setScissorTest(Ht=w)},this.setOpaqueSort=function(w){Z=w},this.setTransparentSort=function(w){tt=w},this.getClearColor=function(w){return w.copy(Rt.getClearColor())},this.setClearColor=function(){Rt.setClearColor.apply(Rt,arguments)},this.getClearAlpha=function(){return Rt.getClearAlpha()},this.setClearAlpha=function(){Rt.setClearAlpha.apply(Rt,arguments)},this.clear=function(w=!0,U=!0,V=!0){let G=0;if(w){let N=!1;if(C!==null){const nt=C.texture.format;N=nt===bo||nt===wo||nt===Eo}if(N){const nt=C.texture.type,ct=nt===En||nt===_i||nt===Ns||nt===ns||nt===yo||nt===So,vt=Rt.getClearColor(),xt=Rt.getClearAlpha(),Lt=vt.r,Ut=vt.g,Mt=vt.b;ct?(g[0]=Lt,g[1]=Ut,g[2]=Mt,g[3]=xt,O.clearBufferuiv(O.COLOR,0,g)):(_[0]=Lt,_[1]=Ut,_[2]=Mt,_[3]=xt,O.clearBufferiv(O.COLOR,0,_))}else G|=O.COLOR_BUFFER_BIT}U&&(G|=O.DEPTH_BUFFER_BIT),V&&(G|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",$,!1),e.removeEventListener("webglcontextrestored",ht,!1),e.removeEventListener("webglcontextcreationerror",lt,!1),pt.dispose(),Yt.dispose(),Tt.dispose(),S.dispose(),B.dispose(),j.dispose(),re.dispose(),I.dispose(),yt.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",Vo),Y.removeEventListener("sessionend",Go),si.stop()};function $(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function ht(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const w=le.autoReset,U=gt.enabled,V=gt.autoUpdate,G=gt.needsUpdate,N=gt.type;rt(),le.autoReset=w,gt.enabled=U,gt.autoUpdate=V,gt.needsUpdate=G,gt.type=N}function lt(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function It(w){const U=w.target;U.removeEventListener("dispose",It),ve(U)}function ve(w){Ue(w),Tt.remove(w)}function Ue(w){const U=Tt.get(w).programs;U!==void 0&&(U.forEach(function(V){yt.releaseProgram(V)}),w.isShaderMaterial&&yt.releaseShaderCache(w))}this.renderBufferDirect=function(w,U,V,G,N,nt){U===null&&(U=te);const ct=N.isMesh&&N.matrixWorld.determinant()<0,vt=xh(w,U,V,G,N);At.setMaterial(G,ct);let xt=V.index,Lt=1;if(G.wireframe===!0){if(xt=J.getWireframeAttribute(V),xt===void 0)return;Lt=2}const Ut=V.drawRange,Mt=V.attributes.position;let jt=Ut.start*Lt,ae=(Ut.start+Ut.count)*Lt;nt!==null&&(jt=Math.max(jt,nt.start*Lt),ae=Math.min(ae,(nt.start+nt.count)*Lt)),xt!==null?(jt=Math.max(jt,0),ae=Math.min(ae,xt.count)):Mt!=null&&(jt=Math.max(jt,0),ae=Math.min(ae,Mt.count));const ce=ae-jt;if(ce<0||ce===1/0)return;re.setup(N,G,vt,V,xt);let Ye,Kt=_t;if(xt!==null&&(Ye=K.get(xt),Kt=Xt,Kt.setIndex(Ye)),N.isMesh)G.wireframe===!0?(At.setLineWidth(G.wireframeLinewidth*oe()),Kt.setMode(O.LINES)):Kt.setMode(O.TRIANGLES);else if(N.isLine){let St=G.linewidth;St===void 0&&(St=1),At.setLineWidth(St*oe()),N.isLineSegments?Kt.setMode(O.LINES):N.isLineLoop?Kt.setMode(O.LINE_LOOP):Kt.setMode(O.LINE_STRIP)}else N.isPoints?Kt.setMode(O.POINTS):N.isSprite&&Kt.setMode(O.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)Kt.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(kt.get("WEBGL_multi_draw"))Kt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const St=N._multiDrawStarts,Tn=N._multiDrawCounts,$t=N._multiDrawCount,cn=xt?K.get(xt).bytesPerElement:1,Si=Tt.get(G).currentProgram.getUniforms();for(let Qe=0;Qe<$t;Qe++)Si.setValue(O,"_gl_DrawID",Qe),Kt.render(St[Qe]/cn,Tn[Qe])}else if(N.isInstancedMesh)Kt.renderInstances(jt,ce,N.count);else if(V.isInstancedBufferGeometry){const St=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Tn=Math.min(V.instanceCount,St);Kt.renderInstances(jt,ce,Tn)}else Kt.render(jt,ce)};function ee(w,U,V){w.transparent===!0&&w.side===Se&&w.forceSinglePass===!1?(w.side=Xe,w.needsUpdate=!0,Hs(w,U,V),w.side=ei,w.needsUpdate=!0,Hs(w,U,V),w.side=Se):Hs(w,U,V)}this.compile=function(w,U,V=null){V===null&&(V=w),d=Yt.get(V),d.init(U),M.push(d),V.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(d.pushLight(N),N.castShadow&&d.pushShadow(N))}),w!==V&&w.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(d.pushLight(N),N.castShadow&&d.pushShadow(N))}),d.setupLights();const G=new Set;return w.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const nt=N.material;if(nt)if(Array.isArray(nt))for(let ct=0;ct<nt.length;ct++){const vt=nt[ct];ee(vt,V,N),G.add(vt)}else ee(nt,V,N),G.add(nt)}),M.pop(),d=null,G},this.compileAsync=function(w,U,V=null){const G=this.compile(w,U,V);return new Promise(N=>{function nt(){if(G.forEach(function(ct){Tt.get(ct).currentProgram.isReady()&&G.delete(ct)}),G.size===0){N(w);return}setTimeout(nt,10)}kt.get("KHR_parallel_shader_compile")!==null?nt():setTimeout(nt,10)})};let ln=null;function bn(w){ln&&ln(w)}function Vo(){si.stop()}function Go(){si.start()}const si=new qc;si.setAnimationLoop(bn),typeof self<"u"&&si.setContext(self),this.setAnimationLoop=function(w){ln=w,Y.setAnimationLoop(w),w===null?si.stop():si.start()},Y.addEventListener("sessionstart",Vo),Y.addEventListener("sessionend",Go),this.render=function(w,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(U),U=Y.getCamera()),w.isScene===!0&&w.onBeforeRender(v,w,U,C),d=Yt.get(w,M.length),d.init(U),M.push(d),ut.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),q.setFromProjectionMatrix(ut),dt=this.localClippingEnabled,Q=et.init(this.clippingPlanes,dt),m=pt.get(w,x.length),m.init(),x.push(m),Y.enabled===!0&&Y.isPresenting===!0){const nt=v.xr.getDepthSensingMesh();nt!==null&&kr(nt,U,-1/0,v.sortObjects)}kr(w,U,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(Z,tt),Wt=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,Wt&&Rt.addToRenderList(m,w),this.info.render.frame++,Q===!0&&et.beginShadows();const V=d.state.shadowsArray;gt.render(V,w,U),Q===!0&&et.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=m.opaque,N=m.transmissive;if(d.setupLights(),U.isArrayCamera){const nt=U.cameras;if(N.length>0)for(let ct=0,vt=nt.length;ct<vt;ct++){const xt=nt[ct];Xo(G,N,w,xt)}Wt&&Rt.render(w);for(let ct=0,vt=nt.length;ct<vt;ct++){const xt=nt[ct];Wo(m,w,xt,xt.viewport)}}else N.length>0&&Xo(G,N,w,U),Wt&&Rt.render(w),Wo(m,w,U);C!==null&&(R.updateMultisampleRenderTarget(C),R.updateRenderTargetMipmap(C)),w.isScene===!0&&w.onAfterRender(v,w,U),re.resetDefaultState(),E=-1,y=null,M.pop(),M.length>0?(d=M[M.length-1],Q===!0&&et.setGlobalState(v.clippingPlanes,d.state.camera)):d=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function kr(w,U,V,G){if(w.visible===!1)return;if(w.layers.test(U.layers)){if(w.isGroup)V=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(U);else if(w.isLight)d.pushLight(w),w.castShadow&&d.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||q.intersectsSprite(w)){G&&Pt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(ut);const ct=j.update(w),vt=w.material;vt.visible&&m.push(w,ct,vt,V,Pt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||q.intersectsObject(w))){const ct=j.update(w),vt=w.material;if(G&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Pt.copy(w.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),Pt.copy(ct.boundingSphere.center)),Pt.applyMatrix4(w.matrixWorld).applyMatrix4(ut)),Array.isArray(vt)){const xt=ct.groups;for(let Lt=0,Ut=xt.length;Lt<Ut;Lt++){const Mt=xt[Lt],jt=vt[Mt.materialIndex];jt&&jt.visible&&m.push(w,ct,jt,V,Pt.z,Mt)}}else vt.visible&&m.push(w,ct,vt,V,Pt.z,null)}}const nt=w.children;for(let ct=0,vt=nt.length;ct<vt;ct++)kr(nt[ct],U,V,G)}function Wo(w,U,V,G){const N=w.opaque,nt=w.transmissive,ct=w.transparent;d.setupLightsView(V),Q===!0&&et.setGlobalState(v.clippingPlanes,V),G&&At.viewport(P.copy(G)),N.length>0&&Bs(N,U,V),nt.length>0&&Bs(nt,U,V),ct.length>0&&Bs(ct,U,V),At.buffers.depth.setTest(!0),At.buffers.depth.setMask(!0),At.buffers.color.setMask(!0),At.setPolygonOffset(!1)}function Xo(w,U,V,G){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[G.id]===void 0&&(d.state.transmissionRenderTarget[G.id]=new gn(1,1,{generateMipmaps:!0,type:kt.has("EXT_color_buffer_half_float")||kt.has("EXT_color_buffer_float")?ii:En,minFilter:$n,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qt.workingColorSpace}));const nt=d.state.transmissionRenderTarget[G.id],ct=G.viewport||P;nt.setSize(ct.z,ct.w);const vt=v.getRenderTarget();v.setRenderTarget(nt),v.getClearColor(H),X=v.getClearAlpha(),X<1&&v.setClearColor(16777215,.5),v.clear(),Wt&&Rt.render(V);const xt=v.toneMapping;v.toneMapping=ti;const Lt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),d.setupLightsView(G),Q===!0&&et.setGlobalState(v.clippingPlanes,G),Bs(w,V,G),R.updateMultisampleRenderTarget(nt),R.updateRenderTargetMipmap(nt),kt.has("WEBGL_multisampled_render_to_texture")===!1){let Ut=!1;for(let Mt=0,jt=U.length;Mt<jt;Mt++){const ae=U[Mt],ce=ae.object,Ye=ae.geometry,Kt=ae.material,St=ae.group;if(Kt.side===Se&&ce.layers.test(G.layers)){const Tn=Kt.side;Kt.side=Xe,Kt.needsUpdate=!0,Yo(ce,V,G,Ye,Kt,St),Kt.side=Tn,Kt.needsUpdate=!0,Ut=!0}}Ut===!0&&(R.updateMultisampleRenderTarget(nt),R.updateRenderTargetMipmap(nt))}v.setRenderTarget(vt),v.setClearColor(H,X),Lt!==void 0&&(G.viewport=Lt),v.toneMapping=xt}function Bs(w,U,V){const G=U.isScene===!0?U.overrideMaterial:null;for(let N=0,nt=w.length;N<nt;N++){const ct=w[N],vt=ct.object,xt=ct.geometry,Lt=G===null?ct.material:G,Ut=ct.group;vt.layers.test(V.layers)&&Yo(vt,U,V,xt,Lt,Ut)}}function Yo(w,U,V,G,N,nt){w.onBeforeRender(v,U,V,G,N,nt),w.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),N.onBeforeRender(v,U,V,G,w,nt),N.transparent===!0&&N.side===Se&&N.forceSinglePass===!1?(N.side=Xe,N.needsUpdate=!0,v.renderBufferDirect(V,U,G,N,w,nt),N.side=ei,N.needsUpdate=!0,v.renderBufferDirect(V,U,G,N,w,nt),N.side=Se):v.renderBufferDirect(V,U,G,N,w,nt),w.onAfterRender(v,U,V,G,N,nt)}function Hs(w,U,V){U.isScene!==!0&&(U=te);const G=Tt.get(w),N=d.state.lights,nt=d.state.shadowsArray,ct=N.state.version,vt=yt.getParameters(w,N.state,nt,U,V),xt=yt.getProgramCacheKey(vt);let Lt=G.programs;G.environment=w.isMeshStandardMaterial?U.environment:null,G.fog=U.fog,G.envMap=(w.isMeshStandardMaterial?B:S).get(w.envMap||G.environment),G.envMapRotation=G.environment!==null&&w.envMap===null?U.environmentRotation:w.envMapRotation,Lt===void 0&&(w.addEventListener("dispose",It),Lt=new Map,G.programs=Lt);let Ut=Lt.get(xt);if(Ut!==void 0){if(G.currentProgram===Ut&&G.lightsStateVersion===ct)return jo(w,vt),Ut}else vt.uniforms=yt.getUniforms(w),w.onBeforeCompile(vt,v),Ut=yt.acquireProgram(vt,xt),Lt.set(xt,Ut),G.uniforms=vt.uniforms;const Mt=G.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Mt.clippingPlanes=et.uniform),jo(w,vt),G.needsLights=yh(w),G.lightsStateVersion=ct,G.needsLights&&(Mt.ambientLightColor.value=N.state.ambient,Mt.lightProbe.value=N.state.probe,Mt.directionalLights.value=N.state.directional,Mt.directionalLightShadows.value=N.state.directionalShadow,Mt.spotLights.value=N.state.spot,Mt.spotLightShadows.value=N.state.spotShadow,Mt.rectAreaLights.value=N.state.rectArea,Mt.ltc_1.value=N.state.rectAreaLTC1,Mt.ltc_2.value=N.state.rectAreaLTC2,Mt.pointLights.value=N.state.point,Mt.pointLightShadows.value=N.state.pointShadow,Mt.hemisphereLights.value=N.state.hemi,Mt.directionalShadowMap.value=N.state.directionalShadowMap,Mt.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Mt.spotShadowMap.value=N.state.spotShadowMap,Mt.spotLightMatrix.value=N.state.spotLightMatrix,Mt.spotLightMap.value=N.state.spotLightMap,Mt.pointShadowMap.value=N.state.pointShadowMap,Mt.pointShadowMatrix.value=N.state.pointShadowMatrix),G.currentProgram=Ut,G.uniformsList=null,Ut}function qo(w){if(w.uniformsList===null){const U=w.currentProgram.getUniforms();w.uniformsList=Tr.seqWithValue(U.seq,w.uniforms)}return w.uniformsList}function jo(w,U){const V=Tt.get(w);V.outputColorSpace=U.outputColorSpace,V.batching=U.batching,V.batchingColor=U.batchingColor,V.instancing=U.instancing,V.instancingColor=U.instancingColor,V.instancingMorph=U.instancingMorph,V.skinning=U.skinning,V.morphTargets=U.morphTargets,V.morphNormals=U.morphNormals,V.morphColors=U.morphColors,V.morphTargetsCount=U.morphTargetsCount,V.numClippingPlanes=U.numClippingPlanes,V.numIntersection=U.numClipIntersection,V.vertexAlphas=U.vertexAlphas,V.vertexTangents=U.vertexTangents,V.toneMapping=U.toneMapping}function xh(w,U,V,G,N){U.isScene!==!0&&(U=te),R.resetTextureUnits();const nt=U.fog,ct=G.isMeshStandardMaterial?U.environment:null,vt=C===null?v.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:os,xt=(G.isMeshStandardMaterial?B:S).get(G.envMap||ct),Lt=G.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Ut=!!V.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Mt=!!V.morphAttributes.position,jt=!!V.morphAttributes.normal,ae=!!V.morphAttributes.color;let ce=ti;G.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(ce=v.toneMapping);const Ye=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Kt=Ye!==void 0?Ye.length:0,St=Tt.get(G),Tn=d.state.lights;if(Q===!0&&(dt===!0||w!==y)){const nn=w===y&&G.id===E;et.setState(G,w,nn)}let $t=!1;G.version===St.__version?(St.needsLights&&St.lightsStateVersion!==Tn.state.version||St.outputColorSpace!==vt||N.isBatchedMesh&&St.batching===!1||!N.isBatchedMesh&&St.batching===!0||N.isBatchedMesh&&St.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&St.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&St.instancing===!1||!N.isInstancedMesh&&St.instancing===!0||N.isSkinnedMesh&&St.skinning===!1||!N.isSkinnedMesh&&St.skinning===!0||N.isInstancedMesh&&St.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&St.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&St.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&St.instancingMorph===!1&&N.morphTexture!==null||St.envMap!==xt||G.fog===!0&&St.fog!==nt||St.numClippingPlanes!==void 0&&(St.numClippingPlanes!==et.numPlanes||St.numIntersection!==et.numIntersection)||St.vertexAlphas!==Lt||St.vertexTangents!==Ut||St.morphTargets!==Mt||St.morphNormals!==jt||St.morphColors!==ae||St.toneMapping!==ce||St.morphTargetsCount!==Kt)&&($t=!0):($t=!0,St.__version=G.version);let cn=St.currentProgram;$t===!0&&(cn=Hs(G,U,N));let Si=!1,Qe=!1,ds=!1;const he=cn.getUniforms(),vn=St.uniforms;if(At.useProgram(cn.program)&&(Si=!0,Qe=!0,ds=!0),G.id!==E&&(E=G.id,Qe=!0),Si||y!==w){At.buffers.depth.getReversed()?(it.copy(w.projectionMatrix),bu(it),Tu(it),he.setValue(O,"projectionMatrix",it)):he.setValue(O,"projectionMatrix",w.projectionMatrix),he.setValue(O,"viewMatrix",w.matrixWorldInverse);const Vn=he.map.cameraPosition;Vn!==void 0&&Vn.setValue(O,mt.setFromMatrixPosition(w.matrixWorld)),Vt.logarithmicDepthBuffer&&he.setValue(O,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&he.setValue(O,"isOrthographic",w.isOrthographicCamera===!0),y!==w&&(y=w,Qe=!0,ds=!0)}if(N.isSkinnedMesh){he.setOptional(O,N,"bindMatrix"),he.setOptional(O,N,"bindMatrixInverse");const nn=N.skeleton;nn&&(nn.boneTexture===null&&nn.computeBoneTexture(),he.setValue(O,"boneTexture",nn.boneTexture,R))}N.isBatchedMesh&&(he.setOptional(O,N,"batchingTexture"),he.setValue(O,"batchingTexture",N._matricesTexture,R),he.setOptional(O,N,"batchingIdTexture"),he.setValue(O,"batchingIdTexture",N._indirectTexture,R),he.setOptional(O,N,"batchingColorTexture"),N._colorsTexture!==null&&he.setValue(O,"batchingColorTexture",N._colorsTexture,R));const ps=V.morphAttributes;if((ps.position!==void 0||ps.normal!==void 0||ps.color!==void 0)&&Dt.update(N,V,cn),(Qe||St.receiveShadow!==N.receiveShadow)&&(St.receiveShadow=N.receiveShadow,he.setValue(O,"receiveShadow",N.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(vn.envMap.value=xt,vn.flipEnvMap.value=xt.isCubeTexture&&xt.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&U.environment!==null&&(vn.envMapIntensity.value=U.environmentIntensity),Qe&&(he.setValue(O,"toneMappingExposure",v.toneMappingExposure),St.needsLights&&Mh(vn,ds),nt&&G.fog===!0&&at.refreshFogUniforms(vn,nt),at.refreshMaterialUniforms(vn,G,k,W,d.state.transmissionRenderTarget[w.id]),Tr.upload(O,qo(St),vn,R)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Tr.upload(O,qo(St),vn,R),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&he.setValue(O,"center",N.center),he.setValue(O,"modelViewMatrix",N.modelViewMatrix),he.setValue(O,"normalMatrix",N.normalMatrix),he.setValue(O,"modelMatrix",N.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const nn=G.uniformsGroups;for(let Vn=0,Gn=nn.length;Vn<Gn;Vn++){const Zo=nn[Vn];I.update(Zo,cn),I.bind(Zo,cn)}}return cn}function Mh(w,U){w.ambientLightColor.needsUpdate=U,w.lightProbe.needsUpdate=U,w.directionalLights.needsUpdate=U,w.directionalLightShadows.needsUpdate=U,w.pointLights.needsUpdate=U,w.pointLightShadows.needsUpdate=U,w.spotLights.needsUpdate=U,w.spotLightShadows.needsUpdate=U,w.rectAreaLights.needsUpdate=U,w.hemisphereLights.needsUpdate=U}function yh(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(w,U,V){Tt.get(w.texture).__webglTexture=U,Tt.get(w.depthTexture).__webglTexture=V;const G=Tt.get(w);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=V===void 0,G.__autoAllocateDepthBuffer||kt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,U){const V=Tt.get(w);V.__webglFramebuffer=U,V.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(w,U=0,V=0){C=w,b=U,T=V;let G=!0,N=null,nt=!1,ct=!1;if(w){const xt=Tt.get(w);if(xt.__useDefaultFramebuffer!==void 0)At.bindFramebuffer(O.FRAMEBUFFER,null),G=!1;else if(xt.__webglFramebuffer===void 0)R.setupRenderTarget(w);else if(xt.__hasExternalTextures)R.rebindTextures(w,Tt.get(w.texture).__webglTexture,Tt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Mt=w.depthTexture;if(xt.__boundDepthTexture!==Mt){if(Mt!==null&&Tt.has(Mt)&&(w.width!==Mt.image.width||w.height!==Mt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(w)}}const Lt=w.texture;(Lt.isData3DTexture||Lt.isDataArrayTexture||Lt.isCompressedArrayTexture)&&(ct=!0);const Ut=Tt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ut[U])?N=Ut[U][V]:N=Ut[U],nt=!0):w.samples>0&&R.useMultisampledRTT(w)===!1?N=Tt.get(w).__webglMultisampledFramebuffer:Array.isArray(Ut)?N=Ut[V]:N=Ut,P.copy(w.viewport),z.copy(w.scissor),L=w.scissorTest}else P.copy(ft).multiplyScalar(k).floor(),z.copy(Ct).multiplyScalar(k).floor(),L=Ht;if(At.bindFramebuffer(O.FRAMEBUFFER,N)&&G&&At.drawBuffers(w,N),At.viewport(P),At.scissor(z),At.setScissorTest(L),nt){const xt=Tt.get(w.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+U,xt.__webglTexture,V)}else if(ct){const xt=Tt.get(w.texture),Lt=U||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,xt.__webglTexture,V||0,Lt)}E=-1},this.readRenderTargetPixels=function(w,U,V,G,N,nt,ct){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let vt=Tt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ct!==void 0&&(vt=vt[ct]),vt){At.bindFramebuffer(O.FRAMEBUFFER,vt);try{const xt=w.texture,Lt=xt.format,Ut=xt.type;if(!Vt.textureFormatReadable(Lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Vt.textureTypeReadable(Ut)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=w.width-G&&V>=0&&V<=w.height-N&&O.readPixels(U,V,G,N,Ot.convert(Lt),Ot.convert(Ut),nt)}finally{const xt=C!==null?Tt.get(C).__webglFramebuffer:null;At.bindFramebuffer(O.FRAMEBUFFER,xt)}}},this.readRenderTargetPixelsAsync=async function(w,U,V,G,N,nt,ct){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let vt=Tt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ct!==void 0&&(vt=vt[ct]),vt){const xt=w.texture,Lt=xt.format,Ut=xt.type;if(!Vt.textureFormatReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Vt.textureTypeReadable(Ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=w.width-G&&V>=0&&V<=w.height-N){At.bindFramebuffer(O.FRAMEBUFFER,vt);const Mt=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,Mt),O.bufferData(O.PIXEL_PACK_BUFFER,nt.byteLength,O.STREAM_READ),O.readPixels(U,V,G,N,Ot.convert(Lt),Ot.convert(Ut),0);const jt=C!==null?Tt.get(C).__webglFramebuffer:null;At.bindFramebuffer(O.FRAMEBUFFER,jt);const ae=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await wu(O,ae,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,Mt),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,nt),O.deleteBuffer(Mt),O.deleteSync(ae),nt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,U=null,V=0){w.isTexture!==!0&&(Ps("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,w=arguments[1]);const G=Math.pow(2,-V),N=Math.floor(w.image.width*G),nt=Math.floor(w.image.height*G),ct=U!==null?U.x:0,vt=U!==null?U.y:0;R.setTexture2D(w,0),O.copyTexSubImage2D(O.TEXTURE_2D,V,0,0,ct,vt,N,nt),At.unbindTexture()},this.copyTextureToTexture=function(w,U,V=null,G=null,N=0){w.isTexture!==!0&&(Ps("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,w=arguments[1],U=arguments[2],N=arguments[3]||0,V=null);let nt,ct,vt,xt,Lt,Ut,Mt,jt,ae;const ce=w.isCompressedTexture?w.mipmaps[N]:w.image;V!==null?(nt=V.max.x-V.min.x,ct=V.max.y-V.min.y,vt=V.isBox3?V.max.z-V.min.z:1,xt=V.min.x,Lt=V.min.y,Ut=V.isBox3?V.min.z:0):(nt=ce.width,ct=ce.height,vt=ce.depth||1,xt=0,Lt=0,Ut=0),G!==null?(Mt=G.x,jt=G.y,ae=G.z):(Mt=0,jt=0,ae=0);const Ye=Ot.convert(U.format),Kt=Ot.convert(U.type);let St;U.isData3DTexture?(R.setTexture3D(U,0),St=O.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(R.setTexture2DArray(U,0),St=O.TEXTURE_2D_ARRAY):(R.setTexture2D(U,0),St=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,U.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,U.unpackAlignment);const Tn=O.getParameter(O.UNPACK_ROW_LENGTH),$t=O.getParameter(O.UNPACK_IMAGE_HEIGHT),cn=O.getParameter(O.UNPACK_SKIP_PIXELS),Si=O.getParameter(O.UNPACK_SKIP_ROWS),Qe=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,ce.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ce.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,xt),O.pixelStorei(O.UNPACK_SKIP_ROWS,Lt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Ut);const ds=w.isDataArrayTexture||w.isData3DTexture,he=U.isDataArrayTexture||U.isData3DTexture;if(w.isRenderTargetTexture||w.isDepthTexture){const vn=Tt.get(w),ps=Tt.get(U),nn=Tt.get(vn.__renderTarget),Vn=Tt.get(ps.__renderTarget);At.bindFramebuffer(O.READ_FRAMEBUFFER,nn.__webglFramebuffer),At.bindFramebuffer(O.DRAW_FRAMEBUFFER,Vn.__webglFramebuffer);for(let Gn=0;Gn<vt;Gn++)ds&&O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Tt.get(w).__webglTexture,N,Ut+Gn),w.isDepthTexture?(he&&O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Tt.get(U).__webglTexture,N,ae+Gn),O.blitFramebuffer(xt,Lt,nt,ct,Mt,jt,nt,ct,O.DEPTH_BUFFER_BIT,O.NEAREST)):he?O.copyTexSubImage3D(St,N,Mt,jt,ae+Gn,xt,Lt,nt,ct):O.copyTexSubImage2D(St,N,Mt,jt,ae+Gn,xt,Lt,nt,ct);At.bindFramebuffer(O.READ_FRAMEBUFFER,null),At.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else he?w.isDataTexture||w.isData3DTexture?O.texSubImage3D(St,N,Mt,jt,ae,nt,ct,vt,Ye,Kt,ce.data):U.isCompressedArrayTexture?O.compressedTexSubImage3D(St,N,Mt,jt,ae,nt,ct,vt,Ye,ce.data):O.texSubImage3D(St,N,Mt,jt,ae,nt,ct,vt,Ye,Kt,ce):w.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,N,Mt,jt,nt,ct,Ye,Kt,ce.data):w.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,N,Mt,jt,ce.width,ce.height,Ye,ce.data):O.texSubImage2D(O.TEXTURE_2D,N,Mt,jt,nt,ct,Ye,Kt,ce);O.pixelStorei(O.UNPACK_ROW_LENGTH,Tn),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,$t),O.pixelStorei(O.UNPACK_SKIP_PIXELS,cn),O.pixelStorei(O.UNPACK_SKIP_ROWS,Si),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Qe),N===0&&U.generateMipmaps&&O.generateMipmap(St),At.unbindTexture()},this.copyTextureToTexture3D=function(w,U,V=null,G=null,N=0){return w.isTexture!==!0&&(Ps("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,G=arguments[1]||null,w=arguments[2],U=arguments[3],N=arguments[4]||0),Ps('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,U,V,G,N)},this.initRenderTarget=function(w){Tt.get(w).__webglFramebuffer===void 0&&R.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?R.setTextureCube(w,0):w.isData3DTexture?R.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?R.setTexture2DArray(w,0):R.setTexture2D(w,0),At.unbindTexture()},this.resetState=function(){b=0,T=0,C=null,At.reset(),re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return On}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=qt._getUnpackColorSpace()}}class Do{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new bt(t),this.density=e}clone(){return new Do(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Lo extends Te{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new De,this.environmentIntensity=1,this.environmentRotation=new De,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class B0{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=oo,this.updateRanges=[],this.version=0,this.uuid=zn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=zn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=zn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const ke=new D;class Pr{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.applyMatrix4(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.applyNormalMatrix(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.transformDirection(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=pn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ne(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=pn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=pn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=pn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=pn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),s=ne(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),s=ne(s,this.array),r=ne(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new ge(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Pr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class th extends yi{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new bt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Oi;const xs=new D,zi=new D,Bi=new D,Hi=new ot,Ms=new ot,eh=new Ft,cr=new D,ys=new D,hr=new D,ql=new ot,ga=new ot,jl=new ot;class H0 extends Te{constructor(t=new th){if(super(),this.isSprite=!0,this.type="Sprite",Oi===void 0){Oi=new fe;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new B0(e,5);Oi.setIndex([0,1,2,0,2,3]),Oi.setAttribute("position",new Pr(n,3,0,!1)),Oi.setAttribute("uv",new Pr(n,2,3,!1))}this.geometry=Oi,this.material=t,this.center=new ot(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),zi.setFromMatrixScale(this.matrixWorld),eh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Bi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&zi.multiplyScalar(-Bi.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;ur(cr.set(-.5,-.5,0),Bi,a,zi,s,r),ur(ys.set(.5,-.5,0),Bi,a,zi,s,r),ur(hr.set(.5,.5,0),Bi,a,zi,s,r),ql.set(0,0),ga.set(1,0),jl.set(1,1);let o=t.ray.intersectTriangle(cr,ys,hr,!1,xs);if(o===null&&(ur(ys.set(-.5,.5,0),Bi,a,zi,s,r),ga.set(0,1),o=t.ray.intersectTriangle(cr,hr,ys,!1,xs),o===null))return;const l=t.ray.origin.distanceTo(xs);l<t.near||l>t.far||e.push({distance:l,point:xs.clone(),uv:rn.getInterpolation(xs,cr,ys,hr,ql,ga,jl,new ot),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function ur(i,t,e,n,s,r){Hi.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Ms.x=r*Hi.x-s*Hi.y,Ms.y=s*Hi.x+r*Hi.y):Ms.copy(Hi),i.copy(t),i.x+=Ms.x,i.y+=Ms.y,i.applyMatrix4(eh)}class zr extends ze{constructor(t=null,e=1,n=1,s,r,a,o,l,c=Ke,h=Ke,u,f){super(null,a,o,l,c,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class We extends ge{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const ki=new Ft,Zl=new Ft,fr=[],Kl=new Mi,k0=new Ft,Ss=new Gt,Es=new ls;class kn extends Gt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new We(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,k0)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Mi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ki),Kl.copy(t.boundingBox).applyMatrix4(ki),this.boundingBox.union(Kl)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new ls),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ki),Es.copy(t.boundingSphere).applyMatrix4(ki),this.boundingSphere.union(Es)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Ss.geometry=this.geometry,Ss.material=this.material,Ss.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Es.copy(this.boundingSphere),Es.applyMatrix4(n),t.ray.intersectsSphere(Es)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ki),Zl.multiplyMatrices(n,ki),Ss.matrixWorld=Zl,Ss.raycast(t,fr);for(let a=0,o=fr.length;a<o;a++){const l=fr[a];l.instanceId=r,l.object=this,e.push(l)}fr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new We(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new zr(new Float32Array(s*this.count),s,this.count,Os,mn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class V0 extends yi{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new bt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const $l=new Ft,co=new Nr,dr=new ls,pr=new D;class G0 extends Te{constructor(t=new fe,e=new V0){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),dr.copy(n.boundingSphere),dr.applyMatrix4(s),dr.radius+=r,t.ray.intersectsSphere(dr)===!1)return;$l.copy(s).invert(),co.copy(t.ray).applyMatrix4($l);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const f=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let g=f,_=p;g<_;g++){const m=c.getX(g);pr.fromBufferAttribute(u,m),Jl(pr,m,l,s,t,e,this)}}else{const f=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let g=f,_=p;g<_;g++)pr.fromBufferAttribute(u,g),Jl(pr,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Jl(i,t,e,n,s,r,a){const o=co.distanceSqToPoint(i);if(o<e){const l=new D;co.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class Br extends ze{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Hn extends fe{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],p=[];let g=0;const _=[],m=n/2;let d=0;x(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new Bt(u,3)),this.setAttribute("normal",new Bt(f,3)),this.setAttribute("uv",new Bt(p,2));function x(){const v=new D,A=new D;let b=0;const T=(e-t)/n;for(let C=0;C<=r;C++){const E=[],y=C/r,P=y*(e-t)+t;for(let z=0;z<=s;z++){const L=z/s,H=L*l+o,X=Math.sin(H),F=Math.cos(H);A.x=P*X,A.y=-y*n+m,A.z=P*F,u.push(A.x,A.y,A.z),v.set(X,T,F).normalize(),f.push(v.x,v.y,v.z),p.push(L,1-y),E.push(g++)}_.push(E)}for(let C=0;C<s;C++)for(let E=0;E<r;E++){const y=_[E][C],P=_[E+1][C],z=_[E+1][C+1],L=_[E][C+1];(t>0||E!==0)&&(h.push(y,P,L),b+=3),(e>0||E!==r-1)&&(h.push(P,z,L),b+=3)}c.addGroup(d,b,0),d+=b}function M(v){const A=g,b=new ot,T=new D;let C=0;const E=v===!0?t:e,y=v===!0?1:-1;for(let z=1;z<=s;z++)u.push(0,m*y,0),f.push(0,y,0),p.push(.5,.5),g++;const P=g;for(let z=0;z<=s;z++){const H=z/s*l+o,X=Math.cos(H),F=Math.sin(H);T.x=E*F,T.y=m*y,T.z=E*X,u.push(T.x,T.y,T.z),f.push(0,y,0),b.x=X*.5+.5,b.y=F*.5*y+.5,p.push(b.x,b.y),g++}for(let z=0;z<s;z++){const L=A+z,H=P+z;v===!0?h.push(H,H+1,L):h.push(H+1,H,L),C+=3}c.addGroup(d,C,v===!0?1:2),d+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Hn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Io extends Hn{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Io(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Uo extends fe{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new Bt(r,3)),this.setAttribute("normal",new Bt(r.slice(),3)),this.setAttribute("uv",new Bt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(x){const M=new D,v=new D,A=new D;for(let b=0;b<e.length;b+=3)p(e[b+0],M),p(e[b+1],v),p(e[b+2],A),l(M,v,A,x)}function l(x,M,v,A){const b=A+1,T=[];for(let C=0;C<=b;C++){T[C]=[];const E=x.clone().lerp(v,C/b),y=M.clone().lerp(v,C/b),P=b-C;for(let z=0;z<=P;z++)z===0&&C===b?T[C][z]=E:T[C][z]=E.clone().lerp(y,z/P)}for(let C=0;C<b;C++)for(let E=0;E<2*(b-C)-1;E++){const y=Math.floor(E/2);E%2===0?(f(T[C][y+1]),f(T[C+1][y]),f(T[C][y])):(f(T[C][y+1]),f(T[C+1][y+1]),f(T[C+1][y]))}}function c(x){const M=new D;for(let v=0;v<r.length;v+=3)M.x=r[v+0],M.y=r[v+1],M.z=r[v+2],M.normalize().multiplyScalar(x),r[v+0]=M.x,r[v+1]=M.y,r[v+2]=M.z}function h(){const x=new D;for(let M=0;M<r.length;M+=3){x.x=r[M+0],x.y=r[M+1],x.z=r[M+2];const v=m(x)/2/Math.PI+.5,A=d(x)/Math.PI+.5;a.push(v,1-A)}g(),u()}function u(){for(let x=0;x<a.length;x+=6){const M=a[x+0],v=a[x+2],A=a[x+4],b=Math.max(M,v,A),T=Math.min(M,v,A);b>.9&&T<.1&&(M<.2&&(a[x+0]+=1),v<.2&&(a[x+2]+=1),A<.2&&(a[x+4]+=1))}}function f(x){r.push(x.x,x.y,x.z)}function p(x,M){const v=x*3;M.x=t[v+0],M.y=t[v+1],M.z=t[v+2]}function g(){const x=new D,M=new D,v=new D,A=new D,b=new ot,T=new ot,C=new ot;for(let E=0,y=0;E<r.length;E+=9,y+=6){x.set(r[E+0],r[E+1],r[E+2]),M.set(r[E+3],r[E+4],r[E+5]),v.set(r[E+6],r[E+7],r[E+8]),b.set(a[y+0],a[y+1]),T.set(a[y+2],a[y+3]),C.set(a[y+4],a[y+5]),A.copy(x).add(M).add(v).divideScalar(3);const P=m(A);_(b,y+0,x,P),_(T,y+2,M,P),_(C,y+4,v,P)}}function _(x,M,v,A){A<0&&x.x===1&&(a[M]=x.x-1),v.x===0&&v.z===0&&(a[M]=A/2/Math.PI+.5)}function m(x){return Math.atan2(x.z,-x.x)}function d(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Uo(t.vertices,t.indices,t.radius,t.details)}}class hs extends Uo{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new hs(t.radius,t.detail)}}class zs extends fe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new D,f=new D,p=[],g=[],_=[],m=[];for(let d=0;d<=n;d++){const x=[],M=d/n;let v=0;d===0&&a===0?v=.5/e:d===n&&l===Math.PI&&(v=-.5/e);for(let A=0;A<=e;A++){const b=A/e;u.x=-t*Math.cos(s+b*r)*Math.sin(a+M*o),u.y=t*Math.cos(a+M*o),u.z=t*Math.sin(s+b*r)*Math.sin(a+M*o),g.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),m.push(b+v,1-M),x.push(c++)}h.push(x)}for(let d=0;d<n;d++)for(let x=0;x<e;x++){const M=h[d][x+1],v=h[d][x],A=h[d+1][x],b=h[d+1][x+1];(d!==0||a>0)&&p.push(M,v,b),(d!==n-1||l<Math.PI)&&p.push(v,A,b)}this.setIndex(p),this.setAttribute("position",new Bt(g,3)),this.setAttribute("normal",new Bt(_,3)),this.setAttribute("uv",new Bt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zs(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class ue extends yi{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new bt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new bt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Nc,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new De,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class No extends Te{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new bt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class W0 extends No{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.groundColor=new bt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const _a=new Ft,Ql=new D,tc=new D;class nh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ot(512,512),this.map=null,this.mapPass=null,this.matrix=new Ft,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Co,this._frameExtents=new ot(1,1),this._viewportCount=1,this._viewports=[new Qt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Ql.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ql),tc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(tc),e.updateMatrixWorld(),_a.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_a),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(_a)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const ec=new Ft,ws=new D,va=new D;class X0 extends nh{constructor(){super(new Ge(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ot(4,2),this._viewportCount=6,this._viewports=[new Qt(2,1,1,1),new Qt(0,1,1,1),new Qt(3,1,1,1),new Qt(1,1,1,1),new Qt(3,0,1,1),new Qt(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ws.setFromMatrixPosition(t.matrixWorld),n.position.copy(ws),va.copy(n.position),va.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(va),n.updateMatrixWorld(),s.makeTranslation(-ws.x,-ws.y,-ws.z),ec.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ec)}}class Y0 extends No{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new X0}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class q0 extends nh{constructor(){super(new Fr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class j0 extends No{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.target=new Te,this.shadow=new q0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Z0{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=nc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=nc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function nc(){return performance.now()}const ic=new Ft;class K0{constructor(t,e,n=0,s=1/0){this.ray=new Nr(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Ao,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return ic.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ic),this}intersectObject(t,e=!0,n=[]){return ho(t,this,n,e),n.sort(sc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)ho(t[s],this,n,e);return n.sort(sc),n}}function sc(i,t){return i.distance-t.distance}function ho(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)ho(r[a],t,e,!0)}}class rc{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Le(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class $0 extends xi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:xo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=xo);const ac={type:"change"},Fo={type:"start"},ih={type:"end"},mr=new Nr,oc=new Nn,J0=Math.cos(70*Oc.DEG2RAD),we=new D,qe=2*Math.PI,se={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},xa=1e-6;class Q0 extends $0{constructor(t,e=null){super(t,e),this.state=se.NONE,this.enabled=!0,this.target=new D,this.cursor=new D,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ji.ROTATE,MIDDLE:ji.DOLLY,RIGHT:ji.PAN},this.touches={ONE:Vi.ROTATE,TWO:Vi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new D,this._lastQuaternion=new Ee,this._lastTargetPosition=new D,this._quat=new Ee().setFromUnitVectors(t.up,new D(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new rc,this._sphericalDelta=new rc,this._scale=1,this._panOffset=new D,this._rotateStart=new ot,this._rotateEnd=new ot,this._rotateDelta=new ot,this._panStart=new ot,this._panEnd=new ot,this._panDelta=new ot,this._dollyStart=new ot,this._dollyEnd=new ot,this._dollyDelta=new ot,this._dollyDirection=new D,this._mouse=new ot,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=eg.bind(this),this._onPointerDown=tg.bind(this),this._onPointerUp=ng.bind(this),this._onContextMenu=cg.bind(this),this._onMouseWheel=rg.bind(this),this._onKeyDown=ag.bind(this),this._onTouchStart=og.bind(this),this._onTouchMove=lg.bind(this),this._onMouseDown=ig.bind(this),this._onMouseMove=sg.bind(this),this._interceptControlDown=hg.bind(this),this._interceptControlUp=ug.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ac),this.update(),this.state=se.NONE}update(t=null){const e=this.object.position;we.copy(e).sub(this.target),we.applyQuaternion(this._quat),this._spherical.setFromVector3(we),this.autoRotate&&this.state===se.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=qe:n>Math.PI&&(n-=qe),s<-Math.PI?s+=qe:s>Math.PI&&(s-=qe),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(we.setFromSpherical(this._spherical),we.applyQuaternion(this._quatInverse),e.copy(this.target).add(we),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=we.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new D(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new D(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=we.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(mr.origin.copy(this.object.position),mr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(mr.direction))<J0?this.object.lookAt(this.target):(oc.setFromNormalAndCoplanarPoint(this.object.up,this.target),mr.intersectPlane(oc,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>xa||8*(1-this._lastQuaternion.dot(this.object.quaternion))>xa||this._lastTargetPosition.distanceToSquared(this.target)>xa?(this.dispatchEvent(ac),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?qe/60*this.autoRotateSpeed*t:qe/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){we.setFromMatrixColumn(e,0),we.multiplyScalar(-t),this._panOffset.add(we)}_panUp(t,e){this.screenSpacePanning===!0?we.setFromMatrixColumn(e,1):(we.setFromMatrixColumn(e,0),we.crossVectors(this.object.up,we)),we.multiplyScalar(t),this._panOffset.add(we)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;we.copy(s).sub(this.target);let r=we.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(qe*this._rotateDelta.x/e.clientHeight),this._rotateUp(qe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(qe*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-qe*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(qe*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-qe*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(qe*this._rotateDelta.x/e.clientHeight),this._rotateUp(qe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new ot,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function tg(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function eg(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function ng(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(ih),this.state=se.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function ig(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case ji.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=se.DOLLY;break;case ji.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=se.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=se.ROTATE}break;case ji.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=se.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=se.PAN}break;default:this.state=se.NONE}this.state!==se.NONE&&this.dispatchEvent(Fo)}function sg(i){switch(this.state){case se.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case se.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case se.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function rg(i){this.enabled===!1||this.enableZoom===!1||this.state!==se.NONE||(i.preventDefault(),this.dispatchEvent(Fo),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(ih))}function ag(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function og(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Vi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=se.TOUCH_ROTATE;break;case Vi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=se.TOUCH_PAN;break;default:this.state=se.NONE}break;case 2:switch(this.touches.TWO){case Vi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=se.TOUCH_DOLLY_PAN;break;case Vi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=se.TOUCH_DOLLY_ROTATE;break;default:this.state=se.NONE}break;default:this.state=se.NONE}this.state!==se.NONE&&this.dispatchEvent(Fo)}function lg(i){switch(this._trackPointer(i),this.state){case se.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case se.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case se.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case se.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=se.NONE}}function cg(i){this.enabled!==!1&&i.preventDefault()}function hg(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function ug(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const pe=14,Et=384,Ln=pe/Et,wt={uTime:{value:0},uWind:{value:.3},uWT:{value:0},uWindDir:{value:new ot(.8,-.6).normalize()},uRefr:{value:0},uSunDir:{value:new D(.5,.7,.2).normalize()},uSunRad:{value:new D(3,3,3)},uAbsorb:{value:new D(.95,.3,.42)},uScatter:{value:new D(.03,.1,.08)},tCaustic:{value:null},uCaustic:{value:1},uRain:{value:0}};function Je(i){let t=i>>>0;return()=>{t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}const be=(i,t,e)=>Math.max(t,Math.min(e,i)),_n=(i,t,e)=>i+(t-i)*e,pi=(i,t,e)=>{const n=be((e-i)/(t-i),0,1);return n*n*(3-2*n)};function gr(i,t){let e=i*374761393+t*668265263|0;return e=Math.imul(e^e>>>13,1274126177),((e^e>>>16)>>>0)/4294967296}function Xi(i,t){const e=Math.floor(i),n=Math.floor(t),s=i-e,r=t-n,a=s*s*(3-2*s),o=r*r*(3-2*r),l=gr(e,n),c=gr(e+1,n),h=gr(e,n+1),u=gr(e+1,n+1);return _n(_n(l,c,a),_n(h,u,a),o)}function on(i,t,e=4){let n=0,s=.5,r=1;for(let a=0;a<e;a++)n+=s*Xi(i*r,t*r),r*=2.03,s*=.5;return n}new EventTarget;function uo(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new fe;let c=0;for(let h=0;h<i.length;++h){const u=i[h];let f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in u.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(u.attributes[p]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in u.morphAttributes){if(!s.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[p]===void 0&&(a[p]=[]),a[p].push(u.morphAttributes[p])}if(t){let p;if(e)p=u.index.count;else if(u.attributes.position!==void 0)p=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,p,h),c+=p}}if(e){let h=0;const u=[];for(let f=0;f<i.length;++f){const p=i[f].index;for(let g=0;g<p.count;++g)u.push(p.getX(g)+h);h+=i[f].attributes.position.count}l.setIndex(u)}for(const h in r){const u=lc(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in a){const u=a[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let f=0;f<u;++f){const p=[];for(let _=0;_<a[h].length;++_)p.push(a[h][_][f]);const g=lc(p);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function lc(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const a=new t(r),o=new ge(a,e,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let f=0,p=h.count;f<p;f++)for(let g=0;g<e;g++){const _=h.getComponent(f,g);o.setComponent(f+u,g,_)}}else a.set(h.array,l);l+=h.count*e}return s!==void 0&&(o.gpuType=s),o}function sh(i,t=1e-4){t=Math.max(t,Number.EPSILON);const e={},n=i.getIndex(),s=i.getAttribute("position"),r=n?n.count:s.count;let a=0;const o=Object.keys(i.attributes),l={},c={},h=[],u=["getX","getY","getZ","getW"],f=["setX","setY","setZ","setW"];for(let x=0,M=o.length;x<M;x++){const v=o[x],A=i.attributes[v];l[v]=new A.constructor(new A.array.constructor(A.count*A.itemSize),A.itemSize,A.normalized);const b=i.morphAttributes[v];b&&(c[v]||(c[v]=[]),b.forEach((T,C)=>{const E=new T.array.constructor(T.count*T.itemSize);c[v][C]=new T.constructor(E,T.itemSize,T.normalized)}))}const p=t*.5,g=Math.log10(1/t),_=Math.pow(10,g),m=p*_;for(let x=0;x<r;x++){const M=n?n.getX(x):x;let v="";for(let A=0,b=o.length;A<b;A++){const T=o[A],C=i.getAttribute(T),E=C.itemSize;for(let y=0;y<E;y++)v+=`${~~(C[u[y]](M)*_+m)},`}if(v in e)h.push(e[v]);else{for(let A=0,b=o.length;A<b;A++){const T=o[A],C=i.getAttribute(T),E=i.morphAttributes[T],y=C.itemSize,P=l[T],z=c[T];for(let L=0;L<y;L++){const H=u[L],X=f[L];if(P[X](a,C[H](M)),E)for(let F=0,W=E.length;F<W;F++)z[F][X](a,E[F][H](M))}}e[v]=a,h.push(a),a++}}const d=i.clone();for(const x in i.attributes){const M=l[x];if(d.setAttribute(x,new M.constructor(M.array.slice(0,a*M.itemSize),M.itemSize,M.normalized)),x in c)for(let v=0;v<c[x].length;v++){const A=c[x][v];d.morphAttributes[x][v]=new A.constructor(A.array.slice(0,a*A.itemSize),A.itemSize,A.normalized)}}return d.setIndex(h),d}const Dr=`
float h21(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(h21(i),h21(i+vec2(1,0)),f.x), mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x), f.y); }
float fbm(vec2 p){ float s=0.0, a=0.5; for(int i=0;i<5;i++){ s+=a*vn(p); p=p*2.03+vec2(17.1,9.3); a*=0.5; } return s; }
`,rh=`
attribute float aW; attribute float aPh; attribute float aAmp;
uniform float uWT;
vec3 swayOff(vec3 wp){
  float amp = aAmp * (0.04 + uWind*0.6);
  float gust = 0.75 + 0.25*sin(uTime*0.45 + dot(wp.xz, uWindDir)*0.35);
  float s1 = sin(uWT + aPh);
  float s2 = sin(uWT*1.9 + aPh*1.7 + 1.3);
  float w = aW*aW;
  vec2 d = uWindDir*(0.5 + 0.35*s1 + 0.5*uWind) + vec2(-uWindDir.y, uWindDir.x)*s2*0.3;
  return vec3(d.x, -0.12*w*amp, d.y)*amp*w*gust;
}
`,ah="wp.xyz += swayOff(wp.xyz);",oh=`
varying vec3 vWP;
uniform float uRefr; uniform float uTime; uniform float uWind; uniform vec2 uWindDir;
`;function lh(i,t){Object.assign(i.uniforms,{uRefr:wt.uRefr,uTime:wt.uTime,uWind:wt.uWind,uWindDir:wt.uWindDir,uWT:wt.uWT,uSunDir:wt.uSunDir,uSunRad:wt.uSunRad,uAbsorb:wt.uAbsorb,uScatter:wt.uScatter,tCaustic:wt.tCaustic,uCaustic:wt.uCaustic},t)}const ch=i=>`
vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
  mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
  mvPosition = instanceMatrix * mvPosition;
#endif
vec4 wp = modelMatrix * mvPosition;
${i}
vWP = wp.xyz;
if (uRefr > 0.5 && wp.y < 0.0) wp.y *= 0.75;
mvPosition = viewMatrix * wp;
gl_Position = projectionMatrix * mvPosition;
`,fg=`
if (vWP.y < 0.03) {
  float d = max(-vWP.y, 0.0);
  vec3 Vw = normalize(cameraPosition - vWP);
  float cosI = clamp(abs(Vw.y), 0.05, 1.0);
  float sinR = sqrt(1.0 - cosI*cosI) / 1.333;
  float cosR = sqrt(1.0 - sinR*sinR);
  vec3 sunL = normalize(uSunDir);
  float cosS = sqrt(1.0 - (1.0 - sunL.y*sunL.y) / 1.777);
  vec3 Tsun = exp(-uAbsorb * d / max(cosS, 0.3));
  vec3 Tview = exp(-uAbsorb * d / cosR);
  vec3 wn = inverseTransformDirection(normal, viewMatrix);
  float nl = max(dot(wn, sunL), 0.0);
  float sh = 1.0;
  #ifdef USE_SHADOWMAP
    sh = getShadowMask();
  #endif
  float cs = texture2D(tCaustic, vWP.xz / ${pe.toFixed(1)} + 0.5).r;
  vec3 extra = diffuseColor.rgb * RECIPROCAL_PI * uSunRad * nl * sh * (cs - 1.0) * uCaustic * 1.7;
  vec3 lit = max(outgoingLight + extra, vec3(0.0)) * mix(vec3(1.0), Tsun, 0.65);
  vec3 ucol = lit * Tview + uScatter * (1.0 - Tview);
  outgoingLight = mix(outgoingLight, ucol, smoothstep(0.03, -0.01, vWP.y));
}
`;function us(i,t={}){const{vsPars:e="",vsBegin:n="",vsWorld:s="",fsPars:r="",fsColor:a="",fsRough:o="",fsNormal:l="",uniforms:c={},key:h=""}=t;return i.onBeforeCompile=u=>{lh(u,c),u.vertexShader=u.vertexShader.replace("#include <common>",`#include <common>
${oh}
${e}`).replace("#include <begin_vertex>",`#include <begin_vertex>
${n}`).replace("#include <project_vertex>",ch(s)),u.fragmentShader=u.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 vWP;
uniform float uRefr; uniform float uTime; uniform float uWind;
uniform vec3 uSunDir; uniform vec3 uSunRad; uniform vec3 uAbsorb; uniform vec3 uScatter;
uniform sampler2D tCaustic; uniform float uCaustic;
${Dr}
${r}`).replace("#include <shadowmap_pars_fragment>",`#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>`).replace("#include <color_fragment>",`#include <color_fragment>
${a}`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
${o}`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
${l}`).replace("#include <opaque_fragment>",`${fg}
#include <opaque_fragment>`)},i.customProgramCacheKey=()=>h,i}function dg(i="",t="",e=""){const n=new Qc({depthPacking:Uc});return n.onBeforeCompile=s=>{lh(s,{}),s.vertexShader=s.vertexShader.replace("#include <common>",`#include <common>
${oh}
${t}`).replace("#include <project_vertex>",ch(i).replace("if (uRefr > 0.5 && wp.y < 0.0) wp.y *= 0.75;",""))},n.customProgramCacheKey=()=>"d"+e,n}function Lr(i,t,e={}){return us(i,{vsPars:rh,vsWorld:ah,key:"sway"+t,...e})}function fo(i=""){return dg(ah,rh,"sway"+i)}const rs={a:5.6,b:4.4},me={x:-1.6,z0:4.95,z1:.45,w:1.5,y:.58},yn=[];for(const i of[3.75,2.65,1.55,.6])for(const t of[-1,1])yn.push({x:me.x+t*.64,z:i,r:.1});function fs(i,t){const e=i/rs.a,n=t/rs.b,s=Math.atan2(n,e),r=1+.07*Math.sin(2*s+.7)+.06*Math.sin(3*s+2.1)+.035*Math.sin(5*s+.3);return Math.sqrt(e*e+n*n)/r}function Zt(i,t){const e=fs(i,t),n=1-e,s=on(i*.5+11,t*.5+3,3);if(n>0){const l=be(n/.58,0,1);let c=-1.75*Math.pow(l,1.35);return c+=(s-.5)*.12*pi(.02,.2,n),c+=(on(i*1.7,t*1.7,2)-.5)*.06*pi(.1,.4,n),Math.min(c,-5e-4-n*.001)}const r=-n,a=Math.min(r,1.3)+Math.max(r-1.3,0)*.06;let o=a*.5+a*a*.22;return o+=pi(2,5,e)*(on(i*.08+40,t*.08,3)-.3)*2.4,o+=(s-.5)*.25*pi(.05,.4,r),Math.max(o,8e-4+r*.002)}function pg(){const i=[],n=Math.round(107.5);for(let l=-n;l<=n;l++)i.push(l*.08);let s=n*.08,r=.08;const a=[],o=[];for(let l=0;l<34;l++)r*=1.13,s+=r,a.push(s),o.push(-s);return[...o.reverse(),...i,...a]}const hh=`
vec3 perturbN(vec3 sp, vec3 sn, vec2 dH, float fd){
  vec3 sx = dFdx(sp), sy = dFdy(sp);
  vec3 R1 = cross(sy, sn), R2 = cross(sn, sx);
  float det = dot(sx, R1) * fd;
  vec3 g = sign(det) * (dH.x*R1 + dH.y*R2);
  return normalize(abs(det)*sn - g);
}
float gWet; float gSand;
vec3 lin(vec3 c){ return pow(c, vec3(2.2)); }
`,mg=`
{
  vec2 p = vWP.xz; float y = vWP.y;
  float n1 = fbm(p*0.55), n2 = fbm(p*2.7+5.0), n3 = vn(p*16.0), n4 = fbm(p*0.23+9.0);
  vec3 grass = mix(vec3(0.13,0.21,0.05), vec3(0.28,0.36,0.09), n1);
  grass = mix(grass, vec3(0.34,0.38,0.12), smoothstep(0.55,0.8,n2)*0.5);
  vec3 dry = mix(vec3(0.27,0.19,0.11), vec3(0.36,0.28,0.18), n2);
  vec3 wetc = vec3(0.10,0.07,0.045);
  vec3 silt = mix(vec3(0.36,0.31,0.21), vec3(0.2,0.25,0.11), n1);
  silt = mix(silt, vec3(0.55,0.49,0.36), smoothstep(0.42,0.65,n4)*0.7);
  float gm = smoothstep(0.02, 0.32, y + (n1-0.5)*0.4);
  vec3 c = mix(dry, grass, gm);
  float sand = smoothstep(0.55,0.7,n4) * smoothstep(0.45,0.0,y) * smoothstep(-0.55,-0.05,y);
  c = mix(c, vec3(0.50,0.44,0.33), sand*0.8);
  gWet = smoothstep(0.16, 0.0, y);
  c = mix(c, c*0.38, gWet*0.85);
  c = mix(c, silt, smoothstep(0.0,-0.15,y));
  float alg = smoothstep(0.45,0.7,fbm(p*1.3+31.0)) * smoothstep(-0.05,-0.4,y) * smoothstep(-1.4,-0.6,y);
  c = mix(c, vec3(0.09,0.2,0.06), alg*0.55);
  c *= 0.72 + 0.55*n3;
  diffuseColor.rgb = lin(c);
}
`,gg="roughnessFactor = mix(0.95, 0.4, gWet);",_g=`
{
  float bh = fbm(vWP.xz*7.0)*0.6 + vn(vWP.xz*34.0)*0.35;
  vec2 dH = vec2(dFdx(bh), dFdy(bh)) * 0.06;
  normal = perturbN(-vViewPosition, normal, dH, faceDirection);
}
`;function vg(i){const t=pg(),e=t,n=t.length,s=e.length,r=new Float32Array(n*s*3);let a=0;for(let u=0;u<s;u++)for(let f=0;f<n;f++)r[a++]=t[f],r[a++]=Zt(t[f],e[u]),r[a++]=e[u];const o=new Uint32Array((n-1)*(s-1)*6);a=0;for(let u=0;u<s-1;u++)for(let f=0;f<n-1;f++){const p=u*n+f,g=p+1,_=p+n,m=_+1;o[a++]=p,o[a++]=_,o[a++]=g,o[a++]=g,o[a++]=_,o[a++]=m}const l=new fe;l.setAttribute("position",new ge(r,3)),l.setIndex(new ge(o,1)),l.computeVertexNormals();const c=us(new ue({color:16777215,roughness:.95,metalness:0}),{fsPars:hh,fsColor:mg,fsRough:gg,fsNormal:_g,key:"terrain"}),h=new Gt(l,c);return h.receiveShadow=!0,h.layers.enable(1),h.frustumCulled=!1,i.add(h),h}function xg(i=512){const t=new Uint16Array(i*i),e=Vu.toHalfFloat;for(let s=0;s<i;s++)for(let r=0;r<i;r++){const a=((r+.5)/i-.5)*pe,o=((s+.5)/i-.5)*pe;t[s*i+r]=e(Zt(a,o))}const n=new zr(t,i,i,Os,ii);return n.magFilter=Ie,n.minFilter=Ie,n.wrapS=n.wrapT=an,n.needsUpdate=!0,n}function Mg(i){const t=Je(7);let e=new hs(1,1);e.deleteAttribute("uv"),e.deleteAttribute("normal"),e=sh(e);const n=e.attributes.position;for(let u=0;u<n.count;u++){const f=n.getX(u),p=n.getY(u),g=n.getZ(u),_=1+.18*(Xi(f*2+5,p*2+g*2)-.5);n.setXYZ(u,f*_,p*_,g*_)}e.computeVertexNormals();const s=[];let r=0;for(;s.length<1500&&r<6e4;){r++;const u=(t()-.5)*16,f=(t()-.5)*16,p=fs(u,f);if(p<.55||p>1.16)continue;const g=Zt(u,f);if(g<-.9||g>.28)continue;const _=on(u*.45+3,f*.45+8,3),m=1-Math.abs(p-.98)*3.2;if(t()>be(_*1.5*m,.03,.95)||Math.abs(u-me.x)<.9&&f>.4&&t()<.8)continue;const x=t()<.06?.1+t()*.12:.02+Math.pow(t(),2)*.06;s.push({x:u,z:f,y:g,s:x,ry:t()*6.28,flat:.45+t()*.4,el:.6+t()*.7})}const a=new kn(e,us(new ue({color:16777215,roughness:.55}),{fsPars:hh,key:"pebble"}),s.length),o=new Ft,l=new Ee,c=new De,h=new bt;return s.forEach((u,f)=>{c.set(0,u.ry,0),l.setFromEuler(c),o.compose(new D(u.x,u.y+u.s*u.flat*.35,u.z),l,new D(u.s*u.el,u.s*u.flat,u.s)),a.setMatrixAt(f,o);const p=t();p<.45?h.setHSL(.09+t()*.04,.14,.2+t()*.18):p<.8?h.setHSL(.11,.07,.22+t()*.16):p<.92?h.setHSL(.08,.3,.22+t()*.1):h.setHSL(.12,.1,.4+t()*.12),a.setColorAt(f,h)}),a.instanceMatrix.needsUpdate=!0,a.castShadow=!0,a.receiveShadow=!0,a.layers.enable(1),i.add(a),a}function yg(i){const t=Je(21),e=3,n=[],s=[],r=[];for(let x=0;x<=e;x++){const M=x/e,v=.5*(1-M*.92);n.push(-v,M,M*M*.35,v,M,M*M*.35),s.push(M,M)}for(let x=0;x<e;x++){const M=x*2;r.push(M,M+1,M+2,M+1,M+3,M+2)}const a=new fe;a.setAttribute("position",new Bt(n,3)),a.setAttribute("aW",new Bt(s,1)),a.setIndex(r),a.computeVertexNormals();const o=a.attributes.normal;for(let x=0;x<o.count;x++)o.setXYZ(x,0,1,.2);const l=24e3,c=new kn(a,null,l),h=new Float32Array(l),u=new Float32Array(l),f=new Ft,p=new Ee,g=new De,_=new bt;let m=0,d=0;for(;m<l&&d<l*8;){d++;const x=t()*Math.PI*2,M=Math.sqrt(_n(1.03*1.03,2.7*2.7,t())),v=1+.07*Math.sin(2*x+.7)+.06*Math.sin(3*x+2.1),A=Math.cos(x)*M*v*rs.a,b=Math.sin(x)*M*v*rs.b,T=fs(A,b),C=Zt(A,b);if(C<.1||Math.abs(A-me.x)<1.15&&b>3.4)continue;const E=.35+on(A*.35,b*.35,3)*1.1;if(t()>E*pi(.1,.4,C))continue;const y=(.08+t()*.15)*(1+.7*pi(1.4,2.4,T));g.set((t()-.5)*.35,t()*6.28,0),p.setFromEuler(g),f.compose(new D(A,C-.02,b),p,new D(y*.08+.015,y,y)),c.setMatrixAt(m,f),_.setHSL(.2+t()*.08,.45+t()*.2,.12+t()*.12),c.setColorAt(m,_),h[m]=t()*6.28,u[m]=.4+t()*.5,m++}return c.count=m,a.setAttribute("aPh",new We(h,1)),a.setAttribute("aAmp",new We(u,1)),c.material=Lr(new ue({color:16777215,roughness:.8,side:Se}),"grass"),c.frustumCulled=!1,c.receiveShadow=!0,i.add(c),c}function Sg(i){const t=Je(99),e=[],n=new Hn(.12,.2,4.2,6);n.translate(0,2.1,0),n.deleteAttribute("uv");const s=(_,m)=>{const d=new Float32Array(_.attributes.position.count*3),x=_.attributes.position,M=new bt;for(let v=0;v<x.count;v++)m(M,x.getX(v),x.getY(v),x.getZ(v)),d[v*3]=M.r,d[v*3+1]=M.g,d[v*3+2]=M.b;_.setAttribute("color",new ge(d,3))};s(n,_=>_.set(3812384)),e.push(n);const r=.22+t()*.05;for(let _=0;_<4;_++){let m=new hs(1.7-_*.18,2);m.deleteAttribute("uv"),m.deleteAttribute("normal"),m=sh(m);const d=m.attributes.position;for(let M=0;M<d.count;M++){const v=d.getX(M),A=d.getY(M),b=d.getZ(M),T=1+.22*(Xi(v*1.8+_*5,A*1.8+b*1.8)-.5)+.1*(Xi(v*5+_,b*5+A*5)-.5);d.setXYZ(M,v*T,A*T*.8,b*T)}m.translate((t()-.5)*1.8,3.4+_*.8-(_>2?.3:0),(t()-.5)*1.8),m.computeVertexNormals();const x=_*7.1;s(m,(M,v,A,b)=>{const T=be((A-2.6)/4.2,0,1);M.setHSL(r+(Xi(v*2+x,b*2)-.5)*.04,.5,.075+.09*T+.05*Xi(v*4,A*4+b*4))}),e.push(m)}const a=uo(e),o=[];let l=0;for(;o.length<95&&l<5e3;){l++;const _=t()*Math.PI*2,m=3.4+t()*3.6,d=Math.cos(_)*m*rs.a,x=Math.sin(_)*m*rs.b;x>11&&Math.abs(d)<9||o.push({x:d,z:x,y:Zt(d,x),s:.5+t()*.6,ry:t()*6.28})}const c=new ue({vertexColors:!0,roughness:.95}),h=new kn(a,c,o.length),u=new Ft,f=new Ee,p=new De,g=new bt;return o.forEach((_,m)=>{p.set(0,_.ry,0),f.setFromEuler(p),u.compose(new D(_.x,_.y-.3,_.z),f,new D(_.s,_.s*(.9+t()*.5),_.s)),h.setMatrixAt(m,u),g.setScalar(.75+t()*.5),h.setColorAt(m,g)}),h.castShadow=!1,h.receiveShadow=!1,i.add(h),h}const Eg=.012,wg=.022,bg=.2;class Tg{constructor(){const t=Et*Et;this.h=new Float32Array(t),this.hn=new Float32Array(t),this.v=new Float32Array(t),this.lap=new Float32Array(t),this.mask=new Float32Array(t),this.k=new Float32Array(t),this.damp=new Float32Array(t),this.depth=new Float32Array(t),this.acc=0,this.tex=new zr(this.h,Et,Et,Os,mn),this.tex.minFilter=this.tex.magFilter=Ke,this.tex.generateMipmaps=!1,this.tex.needsUpdate=!0,this.buildMasks(),this.surfRT=new gn(Et,Et,{type:ii,format:Ze,minFilter:Ie,magFilter:Ie,depthBuffer:!1,wrapS:an,wrapT:an}),this.passScene=new Lo,this.passCam=new Fr(-1,1,1,-1,0,1),this.passMat=new $e({uniforms:{tH:{value:this.tex},uN:{value:Et},uDX:{value:Ln}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:`
        uniform sampler2D tH; uniform float uN; uniform float uDX; varying vec2 vUv;
        float H(ivec2 p){ int n = int(uN) - 1; return texelFetch(tH, clamp(p, ivec2(0), ivec2(n)), 0).r; }
        void main(){
          ivec2 p = ivec2(vUv * uN);
          float c = H(p);
          float gx = ((H(p+ivec2(1,-1)) + 2.0*H(p+ivec2(1,0)) + H(p+ivec2(1,1))) - (H(p+ivec2(-1,-1)) + 2.0*H(p+ivec2(-1,0)) + H(p+ivec2(-1,1)))) / (8.0*uDX);
          float gz = ((H(p+ivec2(-1,1)) + 2.0*H(p+ivec2(0,1)) + H(p+ivec2(1,1))) - (H(p+ivec2(-1,-1)) + 2.0*H(p+ivec2(0,-1)) + H(p+ivec2(1,-1)))) / (8.0*uDX);
          gl_FragColor = vec4(c, gx, gz, 1.0);
        }`,depthTest:!1,depthWrite:!1}),this.passScene.add(new Gt(new vi(2,2),this.passMat))}buildMasks(){const{mask:t,k:e,damp:n,depth:s}=this;for(let r=0;r<Et;r++)for(let a=0;a<Et;a++){const o=((a+.5)/Et-.5)*pe,l=((r+.5)/Et-.5)*pe,c=-Zt(o,l),h=r*Et+a;s[h]=c;const u=a<2||r<2||a>Et-3||r>Et-3;t[h]=c>.03&&!u?1:0,e[h]=bg*be(c/1,.18,1),n[h]=.9983-.014*(1-pi(.04,.45,c))}for(const r of yn)this.carve(r.x,r.z,r.r+.015)}carve(t,e,n){const{mask:s,h:r,v:a}=this,o=(t/pe+.5)*Et,l=(e/pe+.5)*Et,c=n/Ln;for(let h=Math.floor(l-c-1);h<=Math.ceil(l+c+1);h++)for(let u=Math.floor(o-c-1);u<=Math.ceil(o+c+1);u++){if(u<1||h<1||u>=Et-1||h>=Et-1)continue;const f=u+.5-o,p=h+.5-l;if(f*f+p*p<=c*c){const g=h*Et+u;s[g]=0,r[g]=0,a[g]=0}}}addDamping(t,e,n,s){const{damp:r,mask:a}=this,o=(t/pe+.5)*Et,l=(e/pe+.5)*Et,c=n/Ln;for(let h=Math.floor(l-c);h<=Math.ceil(l+c);h++)for(let u=Math.floor(o-c);u<=Math.ceil(o+c);u++){if(u<1||h<1||u>=Et-1||h>=Et-1)continue;const f=u+.5-o,p=h+.5-l,g=Math.sqrt(f*f+p*p)/c;if(g<1){const _=h*Et+u;r[_]=Math.max(.93,r[_]-s*(1-g*g))}}}impulse(t,e,n,s){const{h:r,mask:a}=this,o=(t/pe+.5)*Et,l=(e/pe+.5)*Et,c=s*3.2/Ln,h=s/Ln*(s/Ln);for(let u=Math.floor(l-c);u<=Math.ceil(l+c);u++)for(let f=Math.floor(o-c);f<=Math.ceil(o+c);f++){if(f<1||u<1||f>=Et-1||u>=Et-1)continue;const p=u*Et+f;if(!a[p])continue;const g=f+.5-o,_=u+.5-l,m=(g*g+_*_)/h;r[p]+=n*(1-m)*Math.exp(-m)}}bump(t,e,n,s){const{h:r,mask:a}=this,o=(t/pe+.5)*Et,l=(e/pe+.5)*Et,c=s*3/Ln,h=s/Ln*(s/Ln);for(let u=Math.floor(l-c);u<=Math.ceil(l+c);u++)for(let f=Math.floor(o-c);f<=Math.ceil(o+c);f++){if(f<1||u<1||f>=Et-1||u>=Et-1)continue;const p=u*Et+f;if(!a[p])continue;const g=f+.5-o,_=u+.5-l;r[p]+=n*Math.exp(-(g*g+_*_)/h)}}step(){const{h:t,hn:e,v:n,lap:s,mask:r,k:a,damp:o}=this;for(let l=1;l<Et-1;l++){const c=l*Et;for(let h=1;h<Et-1;h++){const u=c+h;if(r[u]===0){s[u]=0;continue}const f=t[u];s[u]=r[u-1]*(t[u-1]-f)+r[u+1]*(t[u+1]-f)+r[u-Et]*(t[u-Et]-f)+r[u+Et]*(t[u+Et]-f)}}for(let l=1;l<Et-1;l++){const c=l*Et;for(let h=1;h<Et-1;h++){const u=c+h;if(r[u]===0){e[u]=0,n[u]=0;continue}const f=s[u],p=r[u-1]*(s[u-1]-f)+r[u+1]*(s[u+1]-f)+r[u-Et]*(s[u-Et]-f)+r[u+Et]*(s[u+Et]-f),g=(n[u]+a[u]*f-Eg*p)*o[u];n[u]=g,e[u]=t[u]+g+wg*f}}this.h=e,this.hn=t,this.tex.image.data=this.h}update(t){this.acc+=Math.min(t,.05);let e=0;for(;this.acc>=1/60&&e<2;)this.step(),this.acc-=1/60,e++;this.acc>1/30&&(this.acc=0)}renderSurface(t){this.tex.needsUpdate=!0;const e=t.getRenderTarget();t.setRenderTarget(this.surfRT),t.render(this.passScene,this.passCam),t.setRenderTarget(e)}idx(t,e){return[(t/pe+.5)*Et-.5,(e/pe+.5)*Et-.5]}sample(t,e){const[n,s]=this.idx(t,e),r=Math.floor(n),a=Math.floor(s);if(r<0||a<0||r>=Et-1||a>=Et-1)return 0;const o=n-r,l=s-a,c=this.h,h=a*Et+r;return(c[h]*(1-o)+c[h+1]*o)*(1-l)+(c[h+Et]*(1-o)+c[h+Et+1]*o)*l}slope(t,e,n){return n.x=(this.sample(t+.06,e)-this.sample(t-.06,e))/(2*.06),n.y=(this.sample(t,e+.06)-this.sample(t,e-.06))/(2*.06),n}depthAt(t,e){return-Zt(t,e)}}function Ag(i=256){const t=Je(5),e=[];for(let c=0;c<170;c++){const h=3.2*Math.pow(15,t()),u=c*2.399963+t()*.9;let f=Math.round(Math.cos(u)*h),p=Math.round(Math.sin(u)*h);!f&&!p&&(f=1);const g=Math.hypot(f,p);e.push({kx:f,ky:p,a:Math.pow(g,-1.3)*2*Math.PI,ph:t()*6.283})}const n=new Float32Array(i*i),s=new Float32Array(i*i);let r=0;for(let c=0;c<i;c++)for(let h=0;h<i;h++){let u=0,f=0;for(const g of e){const _=Math.cos(2*Math.PI*(g.kx*h+g.ky*c)/i+g.ph)*g.a;u+=_*g.kx,f+=_*g.ky}const p=c*i+h;n[p]=u,s[p]=f,r+=u*u+f*f}const a=Math.sqrt(r/(i*i*2)),o=new Uint8Array(i*i*4);for(let c=0;c<i*i;c++)o[c*4]=Math.round(cc(n[c]/(3.2*a)*.5+.5)*255),o[c*4+1]=Math.round(cc(s[c]/(3.2*a)*.5+.5)*255),o[c*4+2]=128,o[c*4+3]=255;const l=new zr(o,i,i,Ze,En);return l.wrapS=l.wrapT=es,l.minFilter=$n,l.magFilter=Ie,l.generateMipmaps=!0,l.anisotropy=8,l.needsUpdate=!0,l}const cc=i=>Math.max(0,Math.min(1,i));function Rg(i=3,t=512,e=512,n=[122,92,62]){const s=document.createElement("canvas");s.width=t,s.height=e;const r=s.getContext("2d"),a=Je(i);r.fillStyle=`rgb(${n[0]},${n[1]},${n[2]})`,r.fillRect(0,0,t,e);const o=r.getImageData(0,0,t,e),l=o.data;for(let h=0;h<e;h++)for(let u=0;u<t;u++){const f=on(u*.004+i,h*.05,3)*40,p=Math.sin((h+f)*.35+on(u*.01,h*.02+i,2)*6)*.5+.5,g=on(u*.03+i*3,h*.9,2),_=.72+p*.2+g*.22+(a()-.5)*.06,m=(h*t+u)*4;l[m]=n[0]*_,l[m+1]=n[1]*_,l[m+2]=n[2]*_*.97}r.putImageData(o,0,0),r.strokeStyle="rgba(30,20,10,0.28)";for(let h=0;h<26;h++){r.lineWidth=.5+a()*1.2,r.beginPath();const u=a()*e;r.moveTo(0,u);for(let f=0;f<=t;f+=32)r.lineTo(f,u+Math.sin(f*.02+h)*3+(a()-.5)*1.5);r.stroke()}const c=new Br(s);return c.colorSpace=Oe,c.wrapS=c.wrapT=es,c.anisotropy=8,c}function uh(i=11,t=256,e=512,n=[96,80,64]){const s=document.createElement("canvas");s.width=t,s.height=e;const r=s.getContext("2d"),a=r.createImageData(t,e),o=a.data;for(let c=0;c<e;c++)for(let h=0;h<t;h++){const u=on(h*.02+i,c*.01,2)*18,f=on((h+u)*.09,c*.012+i,4),p=Math.pow(1-Math.abs(Math.sin((h+u)*.19+f*5)),6),g=.55+f*.7-p*.45,_=(c*t+h)*4;o[_]=n[0]*g,o[_+1]=n[1]*g,o[_+2]=n[2]*g,o[_+3]=255}r.putImageData(a,0,0);const l=new Br(s);return l.colorSpace=Oe,l.wrapS=l.wrapT=es,l.anisotropy=8,l}const hc=`
uniform sampler2D tChop; uniform sampler2D tSurf; uniform vec2 uWOff; uniform float uWind; uniform float uGain; uniform float uRain; uniform float uTime;
vec2 guv(vec2 p){ return p / ${pe.toFixed(1)} + 0.5; }
vec2 chopSlope(vec2 p){
  vec2 uvA = (p + uWOff*0.5) * 0.31;
  vec2 uvB = (mat2(0.8,-0.6,0.6,0.8) * p + uWOff*1.0) * 0.97 + 0.37;
  vec2 uvC = (mat2(0.6,0.8,-0.8,0.6) * p + uWOff*1.5) * 2.9 + 0.71;
  float g = vn(p*0.16 - uWOff*0.6);
  float gust = mix(0.55, 1.5, smoothstep(0.25, 0.8, g));
  float w = uWind;
  vec2 a = CH(uvA)*2.0-1.0;
  vec2 b = (CH(uvB)*2.0-1.0);
  vec2 c = (CH(uvC)*2.0-1.0);
  return a*(0.05+0.16*w) + b*(0.05+0.34*w)*gust + c*(0.008+0.4*w*w)*gust;
}
vec2 ringHash(vec2 p){ return vec2(h21(p), h21(p+17.31)); }
vec2 rainRings(vec2 p, float scale, float seed){
  vec2 q = p*scale + seed*13.7; vec2 id = floor(q); vec2 f = fract(q) - 0.5;
  float h = h21(id + seed);
  float act = step(h, uRain*0.9);
  float period = 0.55 + h*0.7;
  float tt = fract(uTime/period + h*9.0);
  vec2 c = (ringHash(id+seed*3.1) - 0.5) * 0.24;
  vec2 d = f - c; float r = length(d);
  float R = tt*0.38;
  float w = r - R;
  float env = (1.0-tt)*(1.0-tt)*smoothstep(0.0, 0.06, tt);
  float prof = sin(w*85.0) * exp(-w*w*900.0);
  return normalize(d + 1e-5) * prof * env * act * 0.55;
}
vec2 surfSlope(vec2 p, float simGain, float wo){
  vec3 s = texture2D(tSurf, guv(p)).rgb;
  vec2 sl = s.gb * simGain + chopSlope(p) * wo;
  if (uRain > 0.01) sl += rainRings(p, 2.6, 0.0) + rainRings(p, 4.1, 1.0)*0.8;
  return sl;
}
`;class Cg{constructor(t,e,n){this.scene=t,this.sim=e,this.chopTex=Ag(256),this.wOff=new ot,this.rtOpts={type:ii,format:Ze,minFilter:Ie,magFilter:Ie,depthBuffer:!0,generateMipmaps:!1},this.reflRT=new gn(4,4,this.rtOpts),this.refrRT=new gn(4,4,this.rtOpts),this.causticRT=new gn(512,512,{...this.rtOpts,depthBuffer:!1,wrapS:an,wrapT:an}),wt.tCaustic.value=this.causticRT.texture,this.vcam=new Ge,this.rcam=new Ge,this.reflMat=new Ft,this.uni={tRefl:{value:this.reflRT.texture},tRefr:{value:this.refrRT.texture},tSurf:{value:e.surfRT.texture},tTerr:{value:n},tChop:{value:this.chopTex},uReflMat:{value:this.reflMat},uRes:{value:new ot(1,1)},uTime:wt.uTime,uWind:wt.uWind,uWindDir:wt.uWindDir,uWOff:{value:this.wOff},uRain:wt.uRain,uGain:{value:2},uSunDir:wt.uSunDir,uSunRad:wt.uSunRad,uAbsorb:wt.uAbsorb,uScatter:wt.uScatter,uLanternPos:{value:new D(0,1,0)},uLantern:{value:0}},this.buildWater(),this.buildCaustics(),this.plane=new Nn,this.q=new Qt,this.cp=new Qt,this.tmpV=new D,this.tmpU=new D,this.tmpT=new D,this.rot=new Ft}buildWater(){const t=new vi(pe,pe,1,1);t.rotateX(-Math.PI/2);const e=new $e({uniforms:this.uni,transparent:!0,depthWrite:!0,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:3,vertexShader:"varying vec3 vWP; void main(){ vec4 w = modelMatrix*vec4(position,1.0); vWP = w.xyz; gl_Position = projectionMatrix*viewMatrix*w; }",fragmentShader:`
        varying vec3 vWP;
        uniform sampler2D tRefl, tRefr, tTerr;
        uniform mat4 uReflMat; uniform vec2 uRes; uniform vec2 uWindDir;
        uniform vec3 uSunDir, uSunRad, uAbsorb, uScatter, uLanternPos; uniform float uLantern;
        ${Dr}
        #define CH(uv) texture2D(tChop, uv).rg
        ${hc}
        void main(){
          vec2 p = vWP.xz;
          float depth = -texture2D(tTerr, guv(p)).r;
          float edgeA = smoothstep(0.0, 0.07, depth);
          if (edgeA < 0.002) discard;
          vec3 Vd = cameraPosition - vWP;
          float dist = length(Vd);
          vec3 V = Vd / dist;
          float far = 1.0 / (1.0 + dist*0.035);
          vec2 sl = surfSlope(p, uGain, far);
          sl *= mix(1.0, 0.8, smoothstep(0.0, 0.3, depth) * 0.0);
          vec3 n = normalize(vec3(-sl.x, 1.0, -sl.y));
          float NV = clamp(dot(n, V), 0.0, 1.0);
          float NVf = clamp(dot(vec3(0.0,1.0,0.0), V), 0.0, 1.0);
          float F = 0.02 + 0.98*pow(1.0 - mix(NV, NVf, 0.35), 5.0);

          vec3 nv = mat3(viewMatrix) * n; vec3 uv3 = mat3(viewMatrix) * vec3(0.0,1.0,0.0);
          vec2 off = nv.xy - uv3.xy;

          vec4 rc = uReflMat * vec4(vWP, 1.0);
          vec2 ruv = rc.xy / rc.w;
          ruv += vec2(off.x, -off.y) * 0.17 / (1.0 + dist*0.08);
          float blur = 0.0012 + 0.011*uRain + 0.003*uWind;
          vec3 refl = texture2D(tRefl, ruv).rgb * 0.4
            + texture2D(tRefl, ruv + vec2(blur, 0.0)).rgb * 0.15 + texture2D(tRefl, ruv - vec2(blur, 0.0)).rgb * 0.15
            + texture2D(tRefl, ruv + vec2(0.0, blur)).rgb * 0.15 + texture2D(tRefl, ruv - vec2(0.0, blur)).rgb * 0.15;

          vec2 suv = gl_FragCoord.xy / uRes;
          float dfade = clamp(depth*2.0, 0.0, 1.0);
          vec2 ruv2 = suv + off * 0.09 * dfade / (1.0 + dist*0.06);
          vec3 refr = texture2D(tRefr, ruv2).rgb;
          float wetEdge = 1.0 - smoothstep(0.0, 0.12, depth);
          refr = mix(refr, refr*vec3(0.8,0.78,0.7) + uScatter*0.5, wetEdge*0.35);

          vec3 col = mix(refr, refl, F);

          vec3 L = normalize(uSunDir);
          vec3 H = normalize(V + L);
          float nh = max(dot(n, H), 0.0);
          float a = 0.03 + 0.05*uWind + 0.05*uRain; float a2 = a*a;
          float dd = nh*nh*(a2 - 1.0) + 1.0;
          float D = a2 / (3.14159*dd*dd);
          float Fs = 0.02 + 0.98*pow(1.0 - max(dot(V, H), 0.0), 5.0);
          float nl = max(dot(n, L), 0.0);
          col += uSunRad * D * Fs * 0.25 * nl / max(NV, 0.08) * 0.5 * smoothstep(0.0, 0.08, L.y);

          if (uLantern > 0.01) {
            vec3 Ld = uLanternPos - vWP; float ld = length(Ld); vec3 Ll = Ld/ld;
            vec3 Hl = normalize(V + Ll); float nhl = max(dot(n, Hl), 0.0);
            float dl = nhl*nhl*(a2 - 1.0) + 1.0; float Dl = a2/(3.14159*dl*dl);
            col += vec3(1.0,0.62,0.28) * uLantern * 6.0 * Dl * 0.02 / max(NV, 0.08) / (1.0 + ld*ld*0.15) * max(dot(n,Ll),0.0);
          }

          gl_FragColor = vec4(col, edgeA);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`});this.mesh=new Gt(t,e),this.mesh.renderOrder=5,this.mesh.frustumCulled=!1,this.scene.add(this.mesh)}buildCaustics(){const t=new vi(pe,pe,255,255);t.rotateX(-Math.PI/2),this.caustScene=new Lo,this.caustCam=new Fr(-1,1,1,-1,0,1),this.caustMat=new $e({uniforms:{...this.uni,uLightDir:{value:new D(0,-1,0)},uCSun:{value:1}},blending:Us,depthTest:!1,depthWrite:!1,transparent:!0,vertexShader:`
        uniform sampler2D tTerr; uniform vec3 uLightDir; uniform vec2 uWindDir;
        varying vec3 vOld; varying vec3 vNew; varying float vVis;
        ${Dr}
        #define CH(uv) textureLod(tChop, uv, 1.2).rg
        ${hc}
        void main(){
          vec2 xz = position.xz;
          float D = -textureLod(tTerr, guv(xz), 0.0).r;
          vVis = step(0.03, D);
          vec2 sl = surfSlope(xz, uGain, 0.8);
          vec3 n = normalize(vec3(-sl.x, 1.0, -sl.y));
          vec3 r  = refract(uLightDir, n, 1.0/1.333);
          vec3 r0 = refract(uLightDir, vec3(0.0,1.0,0.0), 1.0/1.333);
          vec3 s = vec3(xz.x, 0.0, xz.y);
          vec3 hit = s + r * (max(D,0.0) / -r.y);
          float D2 = max(-textureLod(tTerr, guv(hit.xz), 0.0).r, 0.0);
          hit = s + r * (D2 / -r.y);
          vec3 old = s + r0 * (D2 / -r0.y);
          vOld = old; vNew = hit;
          gl_Position = vec4(hit.xz / ${(pe/2).toFixed(1)}, 0.0, 1.0);
          if (D < 0.03) gl_Position = vec4(3.0, 3.0, 3.0, 1.0);
        }`,fragmentShader:`
        uniform float uCSun;
        varying vec3 vOld; varying vec3 vNew; varying float vVis;
        void main(){
          float oa = length(dFdx(vOld)) * length(dFdy(vOld));
          float na = length(dFdx(vNew)) * length(dFdy(vNew));
          float I = min(oa / max(na, 1e-7), 7.0);
          gl_FragColor = vec4(I * vVis, 0.0, 0.0, 1.0);
        }`}),this.caustMat.extensions={derivatives:!0};const e=new Gt(t,this.caustMat);e.frustumCulled=!1,this.caustScene.add(e)}resize(t,e,n){this.reflRT.setSize(Math.max(2,Math.round(t*n*.62)),Math.max(2,Math.round(e*n*.62))),this.refrRT.setSize(Math.max(2,Math.round(t*n*.8)),Math.max(2,Math.round(e*n*.8))),this.uni.uRes.value.set(Math.round(t*n),Math.round(e*n))}oblique(t,e,n){t.updateMatrixWorld(),this.plane.set(e,n),this.plane.applyMatrix4(t.matrixWorldInverse);const s=this.cp.set(this.plane.normal.x,this.plane.normal.y,this.plane.normal.z,this.plane.constant),r=t.projectionMatrix,a=this.q,o=r.elements;a.x=(Math.sign(s.x)+o[8])/o[0],a.y=(Math.sign(s.y)+o[9])/o[5],a.z=-1,a.w=(1+o[10])/o[14],s.multiplyScalar(2/s.dot(a)),o[2]=s.x,o[6]=s.y,o[10]=s.z+1-.003,o[14]=s.w}update(t,e){this.wOff.addScaledVector(wt.uWindDir.value,t*(.12+.5*wt.uWind.value)),this.caustMat.uniforms.uLightDir.value.copy(wt.uSunDir.value).negate()}renderPasses(t,e,n,s){const r=t.getRenderTarget(),a=t.autoClear;this.mesh.visible=!1,t.setRenderTarget(this.causticRT),t.setClearColor(0,1),t.clear(),t.render(this.caustScene,this.caustCam),n.updateMatrixWorld();const o=this.tmpV.setFromMatrixPosition(n.matrixWorld);this.rot.extractRotation(n.matrixWorld);const l=this.tmpT.set(0,0,-1).applyMatrix4(this.rot).add(o),c=this.tmpU.set(0,1,0).applyMatrix4(this.rot),h=this.vcam;h.position.set(o.x,-o.y,o.z),h.up.set(c.x,-c.y,c.z),h.lookAt(l.x,-l.y,l.z),h.far=n.far,h.near=n.near,h.fov=n.fov,h.aspect=n.aspect,h.updateMatrixWorld(),h.projectionMatrix.copy(n.projectionMatrix),h.matrixWorldInverse.copy(h.matrixWorld).invert(),this.reflMat.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),this.reflMat.multiply(h.projectionMatrix).multiply(h.matrixWorldInverse),this.oblique(h,new D(0,1,0),.02),s.before("refl"),t.setRenderTarget(this.reflRT),t.setClearColor(0,1),t.clear(),t.render(e,h);const u=this.rcam;u.copy(n),u.layers.set(1),u.updateMatrixWorld(),u.matrixWorldInverse.copy(u.matrixWorld).invert(),this.oblique(u,new D(0,-1,0),.03),wt.uRefr.value=1,s.before("refr"),t.setRenderTarget(this.refrRT),t.setClearColor(new bt(wt.uScatter.value.x,wt.uScatter.value.y,wt.uScatter.value.z),1),t.clear(),t.render(e,u),wt.uRefr.value=0,s.before("main"),t.setRenderTarget(r),t.autoClear=a,this.mesh.visible=!0}}const Jt=i=>new bt(i),In=(i,t,e)=>new D(i,t,e).normalize(),bs={day:{sunPos:In(.5,.74,-.2),moonPos:In(-.4,-.5,.6),lightDir:In(.5,.74,-.2),lightColor:Jt("#fff0d8"),lightInt:3.4,hemiSky:Jt("#9cc4ff"),hemiGround:Jt("#52602f"),hemiInt:1.35,zenith:Jt("#2f6cc4"),horizon:Jt("#b4d3ea"),sunI:1,moonI:0,stars:0,cloudLit:Jt("#ffffff"),cloudSh:Jt("#a7b8cf"),cloud:.45,fog:Jt("#b3cfe4"),fogD:.017,exposure:.95,scatter:Jt("#3c8566"),scatterK:.13,caustic:1,flies:0,lantern:0,sunCol:Jt("#fff2da")},dusk:{sunPos:In(-.45,.17,-.88),moonPos:In(.6,.55,.4),lightDir:In(-.45,.17,-.88),lightColor:Jt("#ff9d52"),lightInt:3.4,hemiSky:Jt("#9a90d0"),hemiGround:Jt("#5a4030"),hemiInt:1.5,zenith:Jt("#2c3f86"),horizon:Jt("#ff9a5e"),sunI:1,moonI:.25,stars:.12,cloudLit:Jt("#ffb08a"),cloudSh:Jt("#6c5c8c"),cloud:.6,fog:Jt("#d98c68"),fogD:.026,exposure:1.1,scatter:Jt("#4a5a62"),scatterK:.05,caustic:.3,flies:.45,lantern:.6,sunCol:Jt("#ff8a3a")},night:{sunPos:In(.3,-.5,.8),moonPos:In(-.28,.4,-.87),lightDir:In(-.28,.4,-.87),lightColor:Jt("#a5bdff"),lightInt:.8,hemiSky:Jt("#3a4f92"),hemiGround:Jt("#141a26"),hemiInt:.65,zenith:Jt("#050c24"),horizon:Jt("#15264a"),sunI:0,moonI:1,stars:1,cloudLit:Jt("#44557e"),cloudSh:Jt("#0e1630"),cloud:.3,fog:Jt("#0c1730"),fogD:.026,exposure:1.25,scatter:Jt("#2a4a66"),scatterK:.012,caustic:.1,flies:1,lantern:1,sunCol:Jt("#ffffff")}},uc=["lightInt","hemiInt","sunI","moonI","stars","cloud","fogD","exposure","scatterK","caustic","flies","lantern"],fc=["lightColor","hemiSky","hemiGround","zenith","horizon","cloudLit","cloudSh","fog","scatter","sunCol"],dc=["sunPos","moonPos","lightDir"];class Pg{constructor(t,e){this.scene=t,this.renderer=e,this.name="day",this.cur={};for(const s of uc)this.cur[s]=bs.day[s];for(const s of fc)this.cur[s]=bs.day[s].clone();for(const s of dc)this.cur[s]=bs.day[s].clone();this.target=bs.day,this.rain=0,this.rainTarget=0,this.out={brightness:1,flies:0,lantern:0,lightInt:1},this.sun=new j0(16777215,3),this.sun.castShadow=!0;const n=this.sun.shadow.camera;n.left=-11,n.right=11,n.top=11,n.bottom=-11,n.near=1,n.far=80,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.bias=-3e-4,this.sun.shadow.normalBias=.035,this.sun.shadow.radius=2.5,t.add(this.sun,this.sun.target),this.hemi=new W0(16777215,4473924,1),t.add(this.hemi),t.fog=new Do(11784164,.0065),this.skyU={uSunPos:{value:new D},uMoonPos:{value:new D},uZenith:{value:new bt},uHorizon:{value:new bt},uSunCol:{value:new bt},uCloudLit:{value:new bt},uCloudSh:{value:new bt},uSunI:{value:1},uMoonI:{value:0},uStars:{value:0},uCloud:{value:.5},uRain:wt.uRain,uTime:wt.uTime,uWindDir:wt.uWindDir},this.sky=new Gt(new zs(450,48,24),new $e({uniforms:this.skyU,side:Xe,depthWrite:!1,fog:!1,vertexShader:"varying vec3 vWP; void main(){ vec4 w = modelMatrix*vec4(position,1.0); vWP = w.xyz; gl_Position = projectionMatrix*viewMatrix*w; }",fragmentShader:`
        varying vec3 vWP;
        uniform vec3 uSunPos, uMoonPos, uZenith, uHorizon, uSunCol, uCloudLit, uCloudSh;
        uniform float uSunI, uMoonI, uStars, uCloud, uRain, uTime; uniform vec2 uWindDir;
        ${Dr}
        float h31(vec3 p){ p = fract(p*0.3183099+0.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
        void main(){
          vec3 d = normalize(vWP - cameraPosition);
          float y = d.y;
          float t = pow(clamp(y, 0.0, 1.0), 0.5);
          vec3 col = mix(uHorizon, uZenith, t);
          col = mix(col, uHorizon*0.55, smoothstep(0.0, -0.25, y));
          float sd = max(dot(d, uSunPos), 0.0);
          col += uSunCol * uSunI * (0.18*pow(sd, 5.0) + 0.5*pow(sd, 48.0));
          col += uSunCol * uSunI * 40.0 * smoothstep(0.99992, 0.99997, sd) * (1.0 - uRain);
          float md = dot(d, uMoonPos);
          if (md > 0.9) {
            vec3 mt = normalize(cross(uMoonPos, vec3(0.0,1.0,0.0)));
            vec3 mb = cross(mt, uMoonPos);
            vec2 mp = vec2(dot(d, mt), dot(d, mb)) * 60.0;
            float disc = smoothstep(0.99955, 0.99972, md);
            float tex = 0.8 + 0.28*fbm(mp*3.0+3.0) - 0.2*smoothstep(0.55,0.7,fbm(mp*2.0+9.0));
            col += vec3(0.9,0.93,1.0) * tex * disc * 7.0 * uMoonI * (1.0-uRain*0.8);
            col += vec3(0.5,0.6,0.9) * uMoonI * (0.06*pow(max(md,0.0), 60.0) + 0.4*pow(max(md,0.0), 900.0));
          }
          if (uStars > 0.01 && y > 0.0) {
            vec3 sp = d * 150.0; vec3 ip = floor(sp); vec3 fp = fract(sp) - 0.5;
            float hh = h31(ip);
            vec3 off = (vec3(h31(ip+1.7), h31(ip+3.1), h31(ip+5.3)) - 0.5) * 0.6;
            float st = step(0.985, hh) * smoothstep(0.22, 0.0, length(fp - off));
            st *= 0.6 + 0.4*sin(uTime*2.0 + hh*80.0);
            col += vec3(0.85,0.9,1.0) * st * 2.2 * uStars * smoothstep(0.0, 0.2, y) * (1.0-uRain) * (1.0 - uCloud*0.5);
          }
          if (y > -0.02) {
            vec2 p = d.xz / (max(y, 0.0) + 0.18) * 0.55 + uWindDir * uTime * 0.012;
            float cover = mix(0.66, 0.28, uCloud);
            float n = fbm(p*1.2) * 0.75 + fbm(p*3.4+7.0)*0.25;
            float dens = smoothstep(cover, cover + 0.22, n);
            float lit = smoothstep(0.35, 0.7, fbm(p*1.2 + uSunPos.xz*0.15 + 3.0));
            vec3 cc = mix(uCloudSh, uCloudLit, lit);
            cc += uSunCol * uSunI * 0.35 * pow(sd, 8.0) * (1.0 - dens*0.5);
            col = mix(col, cc, dens * smoothstep(-0.02, 0.18, y) * 0.92);
          }
          gl_FragColor = vec4(col, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`})),this.sky.frustumCulled=!1,this.sky.renderOrder=-10,t.add(this.sky),this.apply(1)}set(t){this.name=t,this.target=bs[t]}setRain(t){this.rainTarget=t?1:0}apply(t){const e=this.target,n=this.cur;for(const s of uc)n[s]=_n(n[s],e[s],t);for(const s of fc)n[s].lerp(e[s],t);for(const s of dc)n[s].lerp(e[s],t).normalize()}update(t,e){this.apply(1-Math.exp(-t*1.6)),this.rain+=(this.rainTarget-this.rain)*(1-Math.exp(-t*.9));const n=this.rain,s=this.cur;wt.uRain.value=n;const r=new bt(.42,.46,.5),a=be(s.hemiInt*.5+s.lightInt*.12,.05,1.2),o=(p,g)=>p.clone().lerp(r.clone().multiplyScalar(a*.55+.05*s.sunI),g),l=s.lightDir.clone();l.y=Math.max(l.y,.14),l.normalize(),this.sun.color.copy(s.lightColor),this.sun.intensity=s.lightInt*(1-.82*n),this.sun.position.copy(l).multiplyScalar(40),this.sun.target.position.set(0,0,0),this.sun.shadow.intensity=1-.8*n,this.hemi.color.copy(s.hemiSky),this.hemi.groundColor.copy(s.hemiGround),this.hemi.intensity=s.hemiInt*(1-.25*n)+.15*n*(1-s.stars),this.scene.fog.color.copy(o(s.fog,.55*n)),this.scene.fog.density=s.fogD*(1+1.1*n),this.renderer.toneMappingExposure=s.exposure*(1+.12*n*(1-s.stars));const c=this.skyU;c.uSunPos.value.copy(s.sunPos),c.uMoonPos.value.copy(s.moonPos),c.uZenith.value.copy(o(s.zenith,.6*n)),c.uHorizon.value.copy(o(s.horizon,.55*n)),c.uSunCol.value.copy(s.sunCol),c.uCloudLit.value.copy(o(s.cloudLit,.5*n)),c.uCloudSh.value.copy(o(s.cloudSh,.6*n)),c.uSunI.value=s.sunI,c.uMoonI.value=s.moonI,c.uStars.value=s.stars,c.uCloud.value=_n(s.cloud,1,n),wt.uSunDir.value.copy(l);const h=s.lightColor.clone().multiplyScalar(s.lightInt*(1-.82*n));wt.uSunRad.value.set(h.r,h.g,h.b);const u=s.scatter.clone().multiplyScalar(s.scatterK*5*(1-.35*n)+0);wt.uScatter.value.set(u.r,u.g,u.b);const f=be((l.y-.1)/.5,0,1);wt.uCaustic.value=s.caustic*(1-n*.9)*(.3+.7*f),this.out.flies=s.flies*(1-.7*n),this.out.lantern=s.lantern,this.out.lightInt=this.sun.intensity,this.out.brightness=be(.12+s.hemiInt*.5+this.sun.intensity*.2,.1,2),this.out.stars=s.stars,this.out.fogColor=this.scene.fog.color,this.out.skyAmb=c.uHorizon.value,this.out.zenith=c.uZenith.value,this.out.moon=s.moonI,this.out.sunI=s.sunI,this.out.lightDir=l,this.out.lightColor=h,this.out.elev=l.y,this.sky.position.set(e.position.x,0,e.position.z)}}function Yi(i,t,e=8,n=1){const s=i.length,r=[],a=[],o=[],l=[],c=[];for(let p=0;p<s;p++){const g=i[Math.max(0,p-1)],_=i[Math.min(s-1,p+1)];c.push(new D().subVectors(_,g).normalize())}let h=new D(0,0,1);Math.abs(c[0].dot(h))>.9&&h.set(1,0,0),h=h.sub(c[0].clone().multiplyScalar(c[0].dot(h))).normalize();let u=0;for(let p=0;p<s;p++){p>0&&(u+=i[p].distanceTo(i[p-1]),h.sub(c[p].clone().multiplyScalar(c[p].dot(h))).normalize());const g=new D().crossVectors(c[p],h).normalize();for(let _=0;_<=e;_++){const m=_/e*Math.PI*2,d=Math.cos(m),x=Math.sin(m),M=h.x*d+g.x*x,v=h.y*d+g.y*x,A=h.z*d+g.z*x,b=t[p];r.push(i[p].x+M*b,i[p].y+v*b,i[p].z+A*b),a.push(M,v,A),o.push(_/e,u*n)}}for(let p=0;p<s-1;p++)for(let g=0;g<e;g++){const _=p*(e+1)+g,m=_+1,d=_+e+1,x=d+1;l.push(_,m,d,m,x,d)}const f=new fe;return f.setAttribute("position",new Bt(r,3)),f.setAttribute("normal",new Bt(a,3)),f.setAttribute("uv",new Bt(o,2)),f.setIndex(l),f}function pc(i,t,e,n,s){const r=[];for(let a=0;a<=s;a++){const o=a/s,l=1-o;r.push(new D(l*l*l*i.x+3*l*l*o*t.x+3*l*o*o*e.x+o*o*o*n.x,l*l*l*i.y+3*l*l*o*t.y+3*l*o*o*e.y+o*o*o*n.y,l*l*l*i.z+3*l*l*o*t.z+3*l*o*o*e.z+o*o*o*n.z))}return r}function Dg(i=128,t=[[0,"rgba(255,255,255,1)"],[.25,"rgba(255,255,255,0.45)"],[1,"rgba(255,255,255,0)"]]){const e=document.createElement("canvas");e.width=e.height=i;const n=e.getContext("2d"),s=n.createRadialGradient(i/2,i/2,0,i/2,i/2,i/2);for(const[a,o]of t)s.addColorStop(a,o);n.fillStyle=s,n.fillRect(0,0,i,i);const r=new Br(e);return r.colorSpace=Oe,r}function Lg(i){const t=Je(77),e=Rg(3),n=new ue({map:e,color:16772829,roughness:.82}),s=me.z0-me.z1,r=Math.floor(s/.165),a=new kn(new dn(me.w,.045,.15),n,r),o=new Ft,l=new Ee,c=new De,h=new bt;for(let L=0;L<r;L++)c.set((t()-.5)*.01,(t()-.5)*.012,(t()-.5)*.01),l.setFromEuler(c),o.compose(new D(me.x+(t()-.5)*.02,me.y+(t()-.5)*.006,me.z0-.1-L*.165),l,new D(.96+t()*.04,1,1)),a.setMatrixAt(L,o),h.setScalar(.95+t()*.45),h.r*=1+(t()-.5)*.1,a.setColorAt(L,h);a.castShadow=a.receiveShadow=!0,i.add(a);const u=new dn(.09,.13,s+.2),f=u.attributes.uv;for(let L=0;L<f.count;L++){const H=f.getX(L),X=f.getY(L);f.setXY(L,X*3,H)}for(const L of[-1,1]){const H=new Gt(u,n);H.position.set(me.x+L*.6,me.y-.09,(me.z0+me.z1)/2-.05),H.castShadow=H.receiveShadow=!0,i.add(H)}const p=new dn(me.w+.1,.08,.09),g=[...new Set(yn.map(L=>L.z))];for(const L of g){const H=new Gt(p,n);H.position.set(me.x,me.y-.17,L),H.castShadow=H.receiveShadow=!0,i.add(H)}const _=uh(5,128,256,[168,150,128]),m=us(new ue({map:_,color:14208959,roughness:.9}),{fsColor:`{
      float wet = smoothstep(0.4, -0.02, vWP.y);
      diffuseColor.rgb *= mix(1.0, 0.5, wet);
      float alg = smoothstep(-0.02, -0.5, vWP.y) * 0.65 + smoothstep(0.05,-0.02,vWP.y)*smoothstep(-0.08,-0.02,vWP.y)*0.5;
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.02,0.05,0.012), alg);
    }`,key:"pile"}),d=yn[yn.length-2];yn.forEach((L,H)=>{const F=L.x>me.x?1.32:me.y+.42,W=F+2.4,k=new Hn(.088,.105,W,10),Z=new Gt(k,m);Z.position.set(L.x,F-W/2,L.z),Z.rotation.y=t()*6,Z.castShadow=Z.receiveShadow=!0,Z.layers.enable(1),i.add(Z);const tt=new Gt(new Hn(.06,.088,.03,10),n);tt.position.set(L.x,F+.012,L.z),tt.castShadow=!0,i.add(tt)});const x=yn.filter(L=>L.x>me.x).sort((L,H)=>H.z-L.z),M=new ue({color:9205328,roughness:1});for(const L of[1.08,.82])for(let H=0;H<x.length-1;H++){const X=x[H],F=x[H+1],W=[];for(let Z=0;Z<=12;Z++){const tt=Z/12;W.push(new D(X.x+.08,L-Math.sin(tt*Math.PI)*.09,X.z+(F.z-X.z)*tt))}const k=new Gt(Yi(W,W.map(()=>.013),5,1),M);k.castShadow=!0,i.add(k)}const v=new D(d.x-.02,me.y+.42+.02,d.z),A=new Gt(new dn(.05,.5,.05),n);A.position.set(v.x,v.y+.25,v.z),A.castShadow=!0,i.add(A);const b=new Gt(new dn(.28,.035,.035),n);b.position.set(v.x+.12,v.y+.5,v.z),i.add(b);const T=new ue({color:2826264,emissive:16751164,emissiveIntensity:.15,roughness:.5}),C=new Gt(new dn(.14,.2,.14),T),E=new D(v.x+.24,v.y+.36,v.z);C.position.copy(E),i.add(C);const y=new Gt(new Io(.12,.09,4),new ue({color:1840144,roughness:.8}));y.position.set(E.x,E.y+.145,E.z),y.rotation.y=Math.PI/4,i.add(y);const P=new Y0(16753226,0,9,2);P.position.copy(E),i.add(P);const z=new H0(new th({map:Dg(128),color:16749632,blending:Us,depthWrite:!1,transparent:!0,opacity:0,fog:!1}));return z.position.copy(E),z.scale.setScalar(1.5),i.add(z),{lanternPos:E,blockers:[a],update(L,H){const X=L.out.lantern,F=.93+.07*Math.sin(H*9)*Math.sin(H*3.7+1);P.intensity=X*2.2*F,T.emissiveIntensity=.1+X*3.2*F,z.material.opacity=(.12+X*.7)*F}}}const Me=D;function Ig(i){const t=Je(1234),e=-5.1,n=-3,s=Zt(e,n)-.15,r=new ot(-e,-n).normalize(),a=[],o=[],l=[],c=2.1;for(let F=0;F<=10;F++){const W=F/10;o.push(new Me(e+r.x*.55*W*W+Math.sin(W*3.1)*.1,s+W*c,n+r.y*.55*W*W+Math.cos(W*2.3)*.08)),l.push(.34-.12*W+.16*Math.pow(1-W,6))}a.push(Yi(o,l,12,.6));const h=o[o.length-1].clone(),u=[];[-.75,.05,.85].forEach((F,W)=>{const k=new ot(r.x,r.y).rotateAround(new ot,F*.55),Z=new Me(k.x,0,k.y),tt=h.clone(),ft=pc(tt,tt.clone().add(new Me(Z.x*.3,.9,Z.z*.3)),tt.clone().add(new Me(Z.x*.9,1.6,Z.z*.9)),tt.clone().add(new Me(Z.x*(1.3+W*.1),2+t()*.4,Z.z*(1.3+W*.1))),10);a.push(Yi(ft,ft.map((Ht,q)=>.17-.1*(q/10)),8,.8));const Ct=4;for(let Ht=0;Ht<Ct;Ht++){const q=.35+Ht/Ct*.65,Q=Math.min(10,Math.round(q*10)),dt=(t()-.5)*2.2+(Ht%2?.5:-.5),it=new ot(k.x,k.y).rotateAround(new ot,dt);u.push({p0:ft[Q].clone(),dir:new Me(it.x,0,it.y),reach:2.4+t()*2.4,crown:!1})}u.push({p0:ft[10].clone(),dir:Z.clone(),reach:3.2+t()*1.6,crown:!1}),u.push({p0:ft[7].clone(),dir:new Me(-Z.x,0,-Z.z).multiplyScalar(.6).add(new Me((t()-.5)*1.2,0,(t()-.5)*1.2)).normalize(),reach:1.4,crown:!0})});const p=[],g=[],_=[];for(const F of u){const W=F.p0,k=F.dir,Z=F.reach,tt=pc(W,W.clone().add(new Me(k.x*Z*.35,.55,k.z*Z*.35)),W.clone().add(new Me(k.x*Z*.75,.45,k.z*Z*.75)),W.clone().add(new Me(k.x*Z,-.1-t()*.25,k.z*Z)),12);a.push(Yi(tt,tt.map((Ct,Ht)=>.065-.05*(Ht/12)),6,1));const ft=Math.round(Z*(F.crown?2.4:3.6));for(let Ct=0;Ct<ft;Ct++){const q=(.2+(Ct+t()*.6)/ft*.8)*12,Q=Math.min(11,Math.floor(q)),dt=tt[Q].clone().lerp(tt[Q+1],q-Q),it=Zt(dt.x,dt.z);let ut;it>0?ut=it+.1+t()*.35:ut=t()<.2?-.03:.08+t()*.55;let mt=Math.max(.35,dt.y-ut);F.crown&&(mt=.4+t()*.7),p.push({P0:dt,L:mt,out:new Me(k.x,0,k.z),ph:t()*6.28,amp:.8+t()*.5,touch:ut<0})}}const m=[],d=[],x=10;for(const F of p){const W=[],k=[];for(let ut=0;ut<=x;ut++){const mt=ut/x;W.push(new Me(F.P0.x+F.out.x*.12*F.L*Math.sin(mt*Math.PI*.6)+Math.sin(mt*6+F.ph)*.015,F.P0.y-F.L*(.75*mt+.25*mt*mt),F.P0.z+F.out.z*.12*F.L*Math.sin(mt*Math.PI*.6)+Math.cos(mt*5+F.ph)*.015)),k.push(mt)}const Z=Yi(W,W.map((ut,mt)=>.006-.0035*(mt/x)),3,1),tt=Z.attributes.position.count,ft=new Float32Array(tt),Ct=new Float32Array(tt).fill(F.ph),Ht=new Float32Array(tt).fill(F.amp),q=new Float32Array(tt*3);for(let ut=0;ut<=x;ut++)for(let mt=0;mt<=3;mt++){const Pt=ut*4+mt;ft[Pt]=k[ut],q[Pt*3]=.33,q[Pt*3+1]=.3,q[Pt*3+2]=.13}Z.setAttribute("aW",new ge(ft,1)),Z.setAttribute("aPh",new ge(Ct,1)),Z.setAttribute("aAmp",new ge(Ht,1)),Z.setAttribute("color",new ge(q,3)),Z.deleteAttribute("uv"),m.push(Z);const Q=W[x];g.push(Q.clone()),F.touch&&_.push({x:Q.x,z:Q.z});const it=Math.floor(F.L*.92/.07);for(let ut=1;ut<=it;ut++){const mt=ut/it*.97,Pt=mt*x,te=Math.min(x-1,Math.floor(Pt)),Wt=W[te].clone().lerp(W[te+1],Pt-te),oe=new Me().subVectors(W[te+1],W[te]).normalize();for(const O of[-1,1]){const He=t()*6.283,kt=new Me(Math.cos(He),0,Math.sin(He));kt.sub(oe.clone().multiplyScalar(oe.dot(kt))).normalize();const Vt=oe.clone().multiplyScalar(-1).addScaledVector(kt,O*(.5+t()*.5)).normalize();d.push({P:Wt,yAxis:Vt,t:mt,ph:F.ph,amp:F.amp,sc:.8+t()*.6})}}}const M=uh(),v=new Gt(uo(a),new ue({map:M,color:13483950,roughness:.95}));v.castShadow=!0,v.receiveShadow=!0,i.add(v);const A=new Gt(uo(m),Lr(new ue({vertexColors:!0,roughness:.8,side:Se}),"twig"));A.customDepthMaterial=fo("twig"),A.castShadow=!0,A.frustumCulled=!1,i.add(A);const b=new fe;b.setAttribute("position",new Bt([0,0,0,-.019,.08,.006,.019,.08,.006,0,.21,0],3)),b.setAttribute("normal",new Bt([0,0,1,0,0,1,0,0,1,0,0,1],3)),b.setIndex([0,2,1,1,2,3]);const T=d.length,C=new kn(b,Lr(new ue({roughness:.6,side:Se}),"leaf"),T),E=new Float32Array(T),y=new Float32Array(T),P=new Float32Array(T),z=new Ft,L=new bt,H=new Me,X=new Me;return d.forEach((F,W)=>{H.crossVectors(F.yAxis,new Me(t()-.5,t()-.3,t()-.5)).normalize(),X.crossVectors(H,F.yAxis).normalize(),z.makeBasis(H,F.yAxis,X),z.scale(new Me(F.sc,F.sc,F.sc)),z.setPosition(F.P),C.setMatrixAt(W,z),L.setHSL(.19+t()*.06,.5+t()*.2,.2+t()*.14),C.setColorAt(W,L),E[W]=F.t,y[W]=F.ph,P[W]=F.amp}),b.setAttribute("aW",new We(E,1)),b.setAttribute("aPh",new We(y,1)),b.setAttribute("aAmp",new We(P,1)),C.customDepthMaterial=fo("leaf"),C.castShadow=!0,C.receiveShadow=!0,C.frustumCulled=!1,i.add(C),{tips:g,touchers:_,base:new Me(e,s,n),leafCount:T}}const Fn=D;function fh(i,t,e,n=1.3){const s=[],r=[],a=[],o=[];for(let c=0;c<=i;c++){const h=c/i,u=t*(1-Math.pow(h,n)*.97),f=e*h*h;s.push(-u,h,f,u,h,f),r.push(0,.2,1,0,.2,1),a.push(h,h)}for(let c=0;c<i;c++){const h=c*2;o.push(h,h+1,h+2,h+1,h+3,h+2)}const l=new fe;return l.setAttribute("position",new Bt(s,3)),l.setAttribute("normal",new Bt(r,3)),l.setAttribute("aW",new Bt(a,1)),l.setIndex(o),l}function Ug(i,t){const e=[],n=[];for(let o=0;o<=i;o++)e.push(new Fn(0,o/i,0)),n.push(t*(1-.55*o/i));const s=Yi(e,n,5,1);s.deleteAttribute("uv");const r=s.attributes.position.count,a=new Float32Array(r);for(let o=0;o<=i;o++)for(let l=0;l<=5;l++)a[o*6+l]=o/i;return s.setAttribute("aW",new ge(a,1)),s}function Ng(){const i=new Hn(.026,.02,.17,7,1);return i.translate(0,.085,0),i.deleteAttribute("uv"),i.setAttribute("aW",new ge(new Float32Array(i.attributes.position.count).fill(1),1)),i}function Ar(i,t,e,n,s=!0){const r=new kn(i,Lr(t,n),e);return r.customDepthMaterial=fo(n),r.castShadow=s,r.receiveShadow=!0,r.frustumCulled=!1,r.layers.enable(1),r}function Fg(i,t){const e=Je(314),n=[];let s=0;for(;n.length<420&&s<4e4;){s++;const A=(e()-.5)*14,b=(e()-.5)*12,T=fs(A,b);if(T<.9||T>1.05)continue;const C=Zt(A,b);if(C<-.4||Math.abs(A-me.x)<1.3&&b>2||!(b<.6||A<-3.6))continue;const E=on(A*.55+5,b*.55+2,3);E<.5||e()>(E-.45)*3||n.push({x:A,z:b,y:C})}const r=n.length,a=Ar(Ug(8,.011),new ue({color:16777215,roughness:.6}),r,"stalk"),o=Ar(fh(8,.034,.5),new ue({color:16777215,roughness:.55,side:Se}),r*2,"blade",!1),l=Math.round(r*.3),c=Ar(Ng(),new ue({color:16777215,roughness:.9}),l,"head",!1),h=new Float32Array(r),u=new Float32Array(r),f=new Float32Array(r*2),p=new Float32Array(r*2),g=new Float32Array(l),_=new Float32Array(l),m=new Ft,d=new Ee,x=new De,M=new bt;let v=0;return n.forEach((A,b)=>{const T=1.2+e()*.9,C=(e()-.5)*.18,E=(e()-.5)*.18;x.set(C,e()*6.28,E,"YXZ"),d.setFromEuler(x);const y=new Fn(A.x,A.y-.12,A.z);m.compose(y,d,new Fn(1,T,1)),a.setMatrixAt(b,m),M.setHSL(.17+e()*.05,.4+e()*.2,.28+e()*.12),a.setColorAt(b,M);const P=e()*6.28,z=.55+e()*.45;if(h[b]=P,u[b]=z,v<l&&e()<.34){const L=new Fn(0,T-.17,0).applyQuaternion(d).add(y);m.compose(L,d,new Fn(1,1,1)),c.setMatrixAt(v,m),M.setHSL(.07+e()*.03,.55,.12+e()*.06),c.setColorAt(v,M),g[v]=P,_[v]=z,v++}for(let L=0;L<2;L++){const H=.9+e()*1,X=e()*6.28;x.set((e()-.5)*.3,X,(e()-.5)*.3,"YXZ"),d.setFromEuler(x),m.compose(new Fn(A.x+(e()-.5)*.06,A.y-.1,A.z+(e()-.5)*.06),d,new Fn(1,H,H*(.8+e()*.6))),o.setMatrixAt(b*2+L,m),M.setHSL(.2+e()*.06,.45+e()*.2,.22+e()*.12),o.setColorAt(b*2+L,M),f[b*2+L]=P+L,p[b*2+L]=z*1.1}t.addDamping(A.x,A.z,.28,.0025)}),c.count=v,a.geometry.setAttribute("aPh",new We(h,1)),a.geometry.setAttribute("aAmp",new We(u,1)),o.geometry.setAttribute("aPh",new We(f,1)),o.geometry.setAttribute("aAmp",new We(p,1)),c.geometry.setAttribute("aPh",new We(g,1)),c.geometry.setAttribute("aAmp",new We(_,1)),i.add(a,o,c),{stalks:n}}function Og(i){const t=Je(55),e=[];let n=0;for(;e.length<90&&n<2e4;){n++;const _=(t()-.5)*13,m=(t()-.5)*11,d=Zt(_,m);d>-.1||d<-1.1||on(_*.4+9,m*.4+1,3)<.47||Math.abs(_-me.x)<.5&&m>.3||e.push({x:_,z:m})}const s=16,r=e.length*s,a=fh(6,.018,.25,1),o=Ar(a,new ue({color:16777215,roughness:.6,side:Se}),r,"plant",!1),l=new Float32Array(r),c=new Float32Array(r),h=new Ft,u=new Ee,f=new De,p=new bt;let g=0;for(const _ of e)for(let m=0;m<s;m++){const d=_.x+(t()-.5)*.35,x=_.z+(t()-.5)*.35,M=Zt(d,x),v=.3+t()*.55;f.set((t()-.5)*.4,t()*6.28,(t()-.5)*.4,"YXZ"),u.setFromEuler(f),h.compose(new Fn(d,M-.03,x),u,new Fn(1,v,v*(.6+t()))),o.setMatrixAt(g,h),p.setHSL(.22+t()*.1,.5+t()*.25,.14+t()*.16),o.setColorAt(g,p),l[g]=t()*6.28,c[g]=.35+t()*.3,g++}return a.setAttribute("aPh",new We(l,1)),a.setAttribute("aAmp",new We(c,1)),i.add(o),o}const po=D;function zg(){const t=document.createElement("canvas");t.width=t.height=256;const e=t.getContext("2d"),n=e.createRadialGradient(256/2,256/2,4,256/2,256/2,256/2);n.addColorStop(0,"#5f9a3a"),n.addColorStop(.55,"#3f7d2c"),n.addColorStop(1,"#2a5a1f"),e.fillStyle=n,e.fillRect(0,0,256,256),e.strokeStyle="rgba(190,230,140,0.35)",e.lineWidth=1.4;for(let a=0;a<22;a++){const o=a/22*Math.PI*2;e.beginPath(),e.moveTo(256/2,256/2),e.quadraticCurveTo(256/2+Math.cos(o+.2)*256*.25,256/2+Math.sin(o+.2)*256*.25,256/2+Math.cos(o)*256*.5,256/2+Math.sin(o)*256*.5),e.stroke()}const s=Je(8);for(let a=0;a<400;a++)e.fillStyle=`rgba(${s()<.5?"20,50,15":"120,170,70"},${.05+s()*.08})`,e.beginPath(),e.arc(s()*256,s()*256,2+s()*9,0,6.28),e.fill();const r=new Br(t);return r.colorSpace=Oe,r.anisotropy=4,r}function mc(i,t=.4){const r=[[0,0,0,.5,.5]],a=[];for(let c=1;c<=4;c++){const h=c/4,u=[];for(let f=0;f<=40;f++){const p=.6+t+f/40*(Math.PI*2-t),g=Math.cos(p)*h,_=Math.sin(p)*h;u.push(r.length),r.push([g,i*h*h,_,.5+g*.5,.5+_*.5])}a.push(u)}const o=[];for(let c=0;c<40;c++)o.push(0,a[0][c+1],a[0][c]);for(let c=0;c<3;c++)for(let h=0;h<40;h++){const u=a[c][h],f=a[c][h+1],p=a[c+1][h],g=a[c+1][h+1];o.push(u,f,p,f,g,p)}const l=new fe;return l.setAttribute("position",new Bt(r.flatMap(c=>[c[0],c[1],c[2]]),3)),l.setAttribute("uv",new Bt(r.flatMap(c=>[c[3],c[4]]),2)),l.setIndex(o),l.computeVertexNormals(),l}function Bg(i,t,e){const s=[],r=[],a=[];for(let h=0;h<=6;h++){const u=h/6,f=t*Math.pow(Math.sin(Math.PI*(.12+.88*u)),.8)*(1-u*.25)*(h===6?.02:1);for(let p=-1;p<=1;p++){s.push(i*u,e*Math.pow(u,1.7)+(p===0?.008*(1-u):0),p*f);const g=Math.pow(u,1.8);r.push(1-.05*g,.97-.35*g,.9-.15*g-.05*(1-u))}}for(let h=0;h<6;h++)for(let u=0;u<2;u++){const f=h*3+u,p=f+1,g=f+3,_=g+1;a.push(f,p,g,p,_,g)}const o=new fe;o.setAttribute("position",new Bt(s,3)),o.setAttribute("color",new Bt(r,3)),o.setIndex(a),o.computeVertexNormals();const l=o.attributes.normal,c=o.attributes.position;for(let h=0;h<l.count;h++){const u=new po(c.getX(h)/i*.45,1,0).normalize();l.setXYZ(h,u.x,u.y,u.z)}return o}function Hg(i,t,e){const n=Je(2024),s=zg(),r=mc(.09),a=mc(.16,.25),o=[16777215,14215360,15261872].map(d=>new ue({map:s,color:d,roughness:.5,side:Se,emissive:1456142,emissiveIntensity:.28})),l=[],c=[[2.4,-.3],[1.2,1.9],[-2.9,-1.4],[3.2,1.6],[.2,-2.3]],h=(d,x)=>{for(let M=0;M<400;M++){const v=c[Math.floor(n()*c.length)],A=v[0]+(n()-.5)*2.8*x,b=v[1]+(n()-.5)*2.2*x;if(!(Zt(A,b)>-.5||fs(A,b)>.86)&&!(Math.abs(A-me.x)<1.2&&b>-.2)&&!l.some(T=>Math.hypot(T.x-A,T.z-b)<T.r+d+.12))return[A,b]}return null},u=[];for(let d=0;d<3;d++)u.push({kind:"lotus",r:.55+n()*.2});for(let d=0;d<17;d++)u.push({kind:"pad",r:.22+n()*.18});for(let d=0;d<5;d++)u.push({kind:"flower",r:.2});for(const d of u){const x=h(d.r,d.kind==="lotus"?1.6:1);if(!x)continue;const M=new Wi;if(d.kind==="flower"){const v=new Gt(r,o[1]);v.scale.setScalar(.3),v.rotation.y=n()*6,v.position.set(.14,0,.1),M.add(v);const A=new Wi,b=(C,E,y,P,z,L)=>{const H=Bg(E,y,P);for(let X=0;X<C;X++){const F=new Gt(H,kg);F.rotation.set(0,X/C*Math.PI*2+n()*.15,z),F.position.y=L,F.castShadow=!0,A.add(F)}};b(9,.13,.036,.04,0,0),b(8,.115,.034,.075,.35,.012),b(6,.09,.03,.09,.8,.02);const T=new Gt(new Hn(.03,.035,.03,10),new ue({color:15909424,roughness:.6}));T.position.y=.035,A.add(T),A.position.y=.01,A.scale.setScalar(.85+n()*.5),M.add(A),l.push({x:x[0],z:x[1],r:.24,grp:M,yaw:n()*6,kind:"flower"}),t.addDamping(x[0],x[1],.3,.008)}else{const v=d.kind==="lotus",A=new Gt(v?a:r,o[Math.floor(n()*3)]);A.scale.setScalar(d.r/(v?.16*0+1:1)),A.scale.setScalar(d.r),A.rotation.y=n()*6.28,A.castShadow=!0,A.receiveShadow=!0,M.add(A),l.push({x:x[0],z:x[1],r:d.r,grp:M,yaw:0,kind:d.kind}),e.push({x:x[0],z:x[1],r:d.r*.95}),t.addDamping(x[0],x[1],d.r*1.15,.012)}M.position.set(x[0],.015,x[1]),i.add(M)}const f=new po(0,1,0),p=new po,g=new Ee,_=new Ee,m=new ot;return{items:l,update(){for(const d of l){const x=t.sample(d.x,d.z);t.slope(d.x,d.z,m),p.set(-m.x*1.4,1,-m.y*1.4).normalize(),g.setFromUnitVectors(f,p),_.setFromAxisAngle(f,d.yaw),d.grp.quaternion.copy(g).multiply(_),d.grp.position.y=(d.kind==="lotus"?.036:.024)+Math.max(x*.6,-.012)}}}}const kg=new ue({vertexColors:!0,roughness:.55,side:Se,emissive:5917252,emissiveIntensity:.45}),gc=i=>.014+.092*Math.pow(Math.sin(Math.PI*Math.min(1,Math.pow(i,.85)*.98)),.75);function Vg(){const i=[],t=[],e=[],r=(f,p,g,_)=>(i.push(f,p,g),t.push(_),i.length/3-1);for(let f=0;f<=28;f++){const p=f/28,g=-.5+p,_=gc(p),m=_*.95;for(let d=0;d<12;d++){const x=d/12*Math.PI*2,M=Math.cos(x),v=Math.sin(x);r(g,M*m*(M>0?1.08:.8),v*_,0)}}for(let f=0;f<28;f++)for(let p=0;p<12;p++){const g=f*12+p,_=f*12+(p+1)%12,m=(f+1)*12+p,d=(f+1)*12+(p+1)%12;e.push(g,m,_,_,m,d)}const a=r(-.5-0,0,0,0),o=r(.515,-.004,0,0);for(let f=0;f<12;f++)e.push(a,f,(f+1)%12),e.push(o,336+(f+1)%12,336+f);const l=(f,p,g,_)=>{const m=i.length/3;for(let d=0;d<=p;d++)for(let x=0;x<=g;x++){const M=f(d/p,x/g);r(M[0],M[1],M[2],_)}for(let d=0;d<p;d++)for(let x=0;x<g;x++){const M=m+d*(g+1)+x,v=M+1,A=M+g+1,b=A+1;e.push(M,A,v,v,A,b)}};l((f,p)=>{const g=p*2-1,_=.014+.16*Math.pow(f,.85);return[-.5-.3*f*(1-.2*(1-Math.abs(g))*f),g*_,0]},8,8,1),l((f,p)=>{const g=.14-.46*f,_=g+.5,m=gc(_)*.95*1.05,d=.075*Math.sin(Math.PI*Math.pow(f,.7))*(1-.3*f)+.01;return[g,m*.9+d*p,0]},8,2,1);for(const f of[-1,1])l((p,g)=>[_n(.24,.1,g)-p*.1*g-p*.1,-.04-p*.025,f*(.075+p*.15*(.4+.6*g))],3,3,1);const c=new zs(.016,6,5);for(const f of[-1,1]){const p=i.length/3,g=c.attributes.position;for(let m=0;m<g.count;m++)r(g.getX(m)+.42,g.getY(m)+.03,g.getZ(m)+f*.062,2);const _=c.index.array;for(let m=0;m<_.length;m++)e.push(p+_[m])}const h=new fe;h.setAttribute("position",new Bt(i,3)),h.setAttribute("aKind",new Bt(t,1));const u=new Float32Array(i.length/3);for(let f=0;f<u.length;f++)u[f]=be((.42-i[f*3])/1.2,0,1);return h.setAttribute("aS",new ge(u,1)),h.setIndex(e),h.computeVertexNormals(),h}const Gg="attribute float aS; attribute float aKind; varying vec3 vOP; varying float vKind; uniform float uPhase; uniform float uAmp;",Wg=`
vOP = position; vKind = aKind;
float sw = pow(aS, 1.4);
transformed.z += uAmp * sin(uPhase - position.x*5.5) * sw * 0.15;
transformed.z += uAmp * 0.012 * sin(uPhase + 1.6) * (1.0 - aS);
if (aKind > 0.5 && aKind < 1.5 && abs(position.z) > 0.05) transformed.y += sin(uPhase*0.5) * 0.02 * (abs(position.z) - 0.05) * 5.0;
`,Xg="varying vec3 vOP; varying float vKind; uniform float uSeed; uniform float uVar; uniform float uBlack;",Yg=`
{
  vec2 q = vec2(vOP.x*5.5, vOP.z*9.0 + vOP.y*6.0 + uSeed*3.0);
  float n = fbm(q + uSeed*7.0);
  vec3 white = vec3(0.92,0.89,0.82);
  vec3 red = mix(vec3(0.85,0.2,0.03), vec3(0.96,0.48,0.07), uVar);
  float rm = smoothstep(0.48, 0.55, n + 0.12*smoothstep(0.1,0.5,vOP.x));
  vec3 c = mix(white, red, rm);
  float bl = smoothstep(0.67, 0.72, fbm(vec2(vOP.x*8.0, vOP.z*13.0 + vOP.y*9.0) + uSeed*11.0 + 4.0)) * uBlack;
  c = mix(c, vec3(0.025), bl);
  c = mix(c, white, smoothstep(-0.02, -0.1, vOP.y)*0.7);
  if (vKind > 0.5 && vKind < 1.5) c = mix(c, vec3(1.0,0.78,0.5), 0.35);
  if (vKind > 1.5) c = vec3(0.01);
  diffuseColor.rgb = pow(c, vec3(2.2));
}
`;class qg{constructor(t,e){this.ctx=e,this.geo=Vg(),this.fish=[];const n=Je(404);[[.88,.1,0],[.72,.55,.7],[.95,.2,.5],[.66,.85,0],[.8,.3,.9],[.7,.95,.4],[.9,0,0]].forEach((r,a)=>{const o={uPhase:{value:n()*6},uAmp:{value:.8},uSeed:{value:n()*10},uVar:{value:r[1]},uBlack:{value:r[2]}},l=us(new ue({color:16777215,roughness:.38,metalness:0,side:Se}),{vsPars:Gg,vsBegin:Wg,fsPars:Xg,fsColor:Yg,uniforms:o,key:"fish"}),c=new Gt(this.geo,l);c.rotation.order="YZX",c.scale.setScalar(r[0]),c.castShadow=!0,c.layers.enable(1),c.frustumCulled=!1,t.add(c);let h=0,u=0;for(let f=0;f<200&&(h=(n()-.5)*9,u=(n()-.5)*7,!(Zt(h,u)<-.8&&!this.nearPile(h,u,.8)));f++);this.fish.push({mesh:c,u:o,scale:r[0],x:h,z:u,y:-.5-n()*.3,yaw:n()*6.28,speed:.3,pitch:0,roll:0,state:"cruise",stateT:0,tx:0,tz:0,tT:0,pref:n(),flee:0,eat:0,wakeT:0,rate:0})})}nearPile(t,e,n){return yn.some(s=>Math.hypot(s.x-t,s.z-e)<n)}scare(t,e,n=5.5){for(const s of this.fish){const r=Math.hypot(s.x-t,s.z-e);r<n&&(s.state="flee",s.stateT=1.6+Math.random()*1.6+(n-r)*.15,s.fx=s.x-t,s.fz=s.z-e,s.fyaw=Math.atan2(s.fz,s.fx)+(Math.random()-.5)*.7,s.speed=Math.max(s.speed,1.6+Math.random()*.8))}}pickTarget(t){for(let e=0;e<40;e++){const n=(Math.random()-.5)*10,s=(Math.random()-.5)*8;if(Zt(n,s)<-.7&&!this.nearPile(n,s,.5)){t.tx=n,t.tz=s,t.tT=4+Math.random()*6;return}}t.tx=0,t.tz=0,t.tT=3}update(t,e){const{sim:n,food:s}=this.ctx;for(const r of this.fish){r.stateT-=t,r.tT-=t,r.eat-=t,r.wakeT-=t;let a=r.yaw,o=.35+.15*Math.sin(e*.3+r.pref*9),l=-.3-r.pref*.45,c=2;r.state==="flee"&&r.stateT<=0&&(r.state="cruise");let h=null;if(r.state==="cruise"&&s&&(h=s.nearest(r.x,r.z,8)),r.state==="flee")a=r.fyaw,o=1.9,l=-.6-r.pref*.3,c=6;else if(h){const M=h.x-r.x,v=h.z-r.z,A=Math.hypot(M,v);a=Math.atan2(v,M),o=A>2?1:A>.6?.55:.28,A<1.4&&(l=-.045),c=4;const b=r.x+Math.cos(r.yaw)*.42*r.scale,T=r.z+Math.sin(r.yaw)*.42*r.scale;Math.hypot(h.x-b,h.z-T)<.13&&r.y>-.13&&r.eat<=0&&(s.eat(h),n.impulse(b,T,.005,.045),this.ctx.splash?.mouth(b,T),r.eat=.45,r.pitch=.35)}else{r.tT<=0&&this.pickTarget(r);const M=r.tx-r.x,v=r.tz-r.z;a=Math.atan2(v,M),Math.hypot(M,v)<.8&&(r.tT=0)}const u=r.x+Math.cos(r.yaw)*.9,f=r.z+Math.sin(r.yaw)*.9,p=-Zt(u,f);if(p<(r.state==="flee"?.25:.45)&&!(h&&p>.15)){const v=-Zt(r.x+.4,r.z)+Zt(r.x-.4,r.z),A=-Zt(r.x,r.z+.4)+Zt(r.x,r.z-.4),b=be((.6-p)*2.4,0,1),T=Math.atan2(A,v);a=Ma(a,T,b),c=Math.max(c,3.5),o=Math.min(o,.45)}for(const M of yn){const v=M.x-r.x,A=M.z-r.z;if(Math.hypot(v,A)<.9&&r.y>-1.7){const T=Math.atan2(A,v),C=mo(T,r.yaw);Math.abs(C)<1.2&&(a=Ma(a,r.yaw-Math.sign(C||1)*1,.7))}}for(const M of this.fish)if(M!==r){const v=M.x-r.x,A=M.z-r.z;Math.hypot(v,A)<.7&&Math.abs(M.y-r.y)<.35&&(a=Ma(a,Math.atan2(-A,-v),.35))}const g=mo(a,r.yaw),_=be(g*c,-3.2,3.2);r.yaw+=_*t,r.rate=_n(r.rate,_,.1),r.speed+=(o-r.speed)*(1-Math.exp(-t*(r.state==="flee"?1.2:1.5))),r.x+=Math.cos(r.yaw)*r.speed*t,r.z+=Math.sin(r.yaw)*r.speed*t;const m=Zt(r.x,r.z);m>-.2&&(r.x-=Math.cos(r.yaw)*r.speed*t*1.5,r.z-=Math.sin(r.yaw)*r.speed*t*1.5,r.yaw+=1.5*t);const d=m+.12*r.scale+.06;l=Math.max(l,d),l=Math.min(l,-.04);const x=(l-r.y)*1.6;r.y+=x*t,r.pitch+=(be(x*.7,-.3,.3)+(r.eat>0?.25:0)-r.pitch)*(1-Math.exp(-t*5)),r.roll+=(be(-r.rate*.12,-.35,.35)-r.roll)*(1-Math.exp(-t*4)),r.u.uPhase.value+=t*(4+r.speed*7.5),r.u.uAmp.value+=(.45+Math.min(r.speed,2.2)*.65-r.u.uAmp.value)*.1,r.y>-.2&&r.speed>.45&&r.wakeT<=0&&(r.wakeT=.16,n.impulse(r.x+Math.cos(r.yaw)*.25,r.z+Math.sin(r.yaw)*.25,.0012*Math.min(r.speed,1.8),.07)),r.mesh.position.set(r.x,r.y,r.z),r.mesh.rotation.set(r.roll,-r.yaw,r.pitch)}}}function mo(i,t){let e=i-t;for(;e>Math.PI;)e-=6.2832;for(;e<-Math.PI;)e+=6.2832;return e}function Ma(i,t,e){return i+mo(t,i)*e}const Pe=D,ni=(i,t)=>-Zt(i,t);function jg(i,t,e){e.x=-Zt(i+.12,t)+Zt(i-.12,t),e.y=-Zt(i,t+.12)+Zt(i,t-.12);const s=Math.hypot(e.x,e.y)||1;return e.x/=s,e.y/=s,e}function Oo(i,t=1){const e=wt.uWind.value,n=wt.uWindDir.value,s=.75+.25*Math.sin(wt.uTime.value*.45)+.1*Math.sin(wt.uTime.value*1.3);return i.set(n.x*(.05+.55*e*s)*t,n.y*(.05+.55*e*s)*t),i}class Zg{constructor(t,e){this.ctx=e,this.MAX=360;const n=new hs(1,0);this.mat=new ue({color:14676223,roughness:.05,metalness:0,transparent:!0,opacity:.85}),this.mesh=new kn(n,this.mat,this.MAX),this.mesh.frustumCulled=!1,this.mesh.instanceMatrix.setUsage(au),t.add(this.mesh),this.p=Array.from({length:this.MAX},()=>({alive:!1,x:0,y:0,z:0,vx:0,vy:0,vz:0,s:0,life:0})),this.cursor=0,this.crownMat=new Ro({color:14215924,transparent:!0,opacity:0,side:Se,depthWrite:!1});const s=new Hn(.5,.2,1,20,1,!0);s.translate(0,.5,0),this.crowns=Array.from({length:6},()=>{const r=new Gt(s,this.crownMat.clone());return r.visible=!1,r.frustumCulled=!1,t.add(r),{m:r,t:1,dur:.6,r:.3,h:.3}}),this.ci=0,this.tmp=new Ft,this.q=new Ee,this.sc=new Pe,this._d=new Pe,this._p=new Pe,this._up=new Pe(0,1,0)}emit(t,e,n,s,r,a,o){const l=this.p[this.cursor];this.cursor=(this.cursor+1)%this.MAX,l.alive=!0,l.x=t,l.y=e,l.z=n,l.vx=s,l.vy=r,l.vz=a,l.s=o,l.life=2}stone(t,e,n=1){for(let r=0;r<30;r++){const a=Math.random()*6.283,o=(.5+Math.random()*1.1)*n;this.emit(t+Math.cos(a)*.08,.02,e+Math.sin(a)*.08,Math.cos(a)*o,1.6+Math.random()*1.8,Math.sin(a)*o,.008+Math.random()*.011)}for(let r=0;r<14;r++){const a=Math.random()*6.283,o=Math.random()*.35;this.emit(t,.05,e,Math.cos(a)*o,2.6+Math.random()*1.8,Math.sin(a)*o,.01+Math.random()*.014)}const s=this.crowns[this.ci];this.ci=(this.ci+1)%this.crowns.length,s.m.position.set(t,0,e),s.t=0,s.dur=.65,s.r=.34*n,s.h=.34*n,s.m.visible=!0}small(t,e,n=2,s=1){for(let r=0;r<n;r++){const a=Math.random()*6.283,o=(.1+Math.random()*.35)*s;this.emit(t,.01,e,Math.cos(a)*o,.9+Math.random()*1.1*s,Math.sin(a)*o,.006+Math.random()*.006)}}mouth(t,e){this.small(t,e,5,1.2)}update(t){const e=this.ctx.env.out.brightness;this.mat.color.setScalar(be(.35+e*.5,.2,1.3));for(const s of this.crowns){if(s.t>=1){s.m.visible=!1;continue}s.t=Math.min(1,s.t+t/s.dur);const r=s.t,a=Math.sin(Math.min(1,r*1.6)*Math.PI*.5),o=s.h*Math.sin(Math.PI*Math.pow(r,.6))*1;s.m.scale.set(s.r*(.3+a*1.2),Math.max(o,.001),s.r*(.3+a*1.2)),s.m.material.opacity=(1-r)*.45,s.m.material.color.setScalar(be(.3+e*.6,.2,1.2))}const{sim:n}=this.ctx;for(let s=0;s<this.MAX;s++){const r=this.p[s];if(!r.alive){this.tmp.makeScale(0,0,0),this.mesh.setMatrixAt(s,this.tmp);continue}if(r.vy-=9.8*t,r.x+=r.vx*t,r.y+=r.vy*t,r.z+=r.vz*t,r.life-=t,r.y<0&&r.vy<0){r.alive=!1,r.s>.012&&Math.random()<.5&&n.impulse(r.x,r.z,-.0022,.04),this.tmp.makeScale(0,0,0),this.mesh.setMatrixAt(s,this.tmp);continue}r.life<0&&(r.alive=!1);const a=Math.hypot(r.vx,r.vy,r.vz);this.sc.set(r.s,r.s*(1+Math.min(a*.25,1.4)),r.s),this._d.set(r.vx,r.vy,r.vz).normalize(),this.q.setFromUnitVectors(this._up,this._d),this.tmp.compose(this._p.set(r.x,r.y,r.z),this.q,this.sc),this.mesh.setMatrixAt(s,this.tmp)}this.mesh.instanceMatrix.needsUpdate=!0}}class Kg{constructor(t,e){this.ctx=e,this.MAX=90;const n=new zs(1,8,6);this.mesh=new kn(n,new ue({color:13207869,roughness:.55,emissive:3808261,emissiveIntensity:.4}),this.MAX),this.mesh.frustumCulled=!1,this.mesh.castShadow=!0,t.add(this.mesh),this.p=Array.from({length:this.MAX},()=>({alive:!1,x:0,z:0,vx:0,vz:0,age:0,s:.024,dying:0})),this.cursor=0,this.tmp=new Ft,this.sl=new ot,this.n=new ot,this.w=new ot}spawn(t,e,n=8){for(let s=0;s<n;s++){const r=this.p[this.cursor];this.cursor=(this.cursor+1)%this.MAX;const a=Math.random()*6.283,o=Math.sqrt(Math.random())*.28;r.alive=!0,r.x=t+Math.cos(a)*o,r.z=e+Math.sin(a)*o,r.vx=r.vz=0,r.age=0,r.dying=0,r.s=.02+Math.random()*.008,ni(r.x,r.z)<.05&&(r.x=t,r.z=e),this.ctx.sim.impulse(r.x,r.z,-.0016,.035)}}nearest(t,e,n){let s=null,r=n;for(const a of this.p)if(a.alive&&!a.dying){const o=Math.hypot(a.x-t,a.z-e);o<r&&(r=o,s=a)}return s}eat(t){t.dying=.001}update(t){const{sim:e,obstacles:n}=this.ctx;Oo(this.w,.55);for(let s=0;s<this.MAX;s++){const r=this.p[s];if(!r.alive){this.tmp.makeScale(0,0,0),this.mesh.setMatrixAt(s,this.tmp);continue}if(r.age+=t,r.dying&&(r.dying+=t*6,r.dying>1)){r.alive=!1;continue}r.age>80&&(r.dying=Math.max(r.dying,.5)),e.slope(r.x,r.z,this.sl),r.vx+=(-this.sl.x*2.2+(this.w.x-r.vx)*.9)*t,r.vz+=(-this.sl.y*2.2+(this.w.y-r.vz)*.9)*t;const a=r.x+r.vx*t,o=r.z+r.vz*t;ni(a,o)>.05?(r.x=a,r.z=o):(r.vx*=-.2,r.vz*=-.2);for(const h of n){const u=r.x-h.x,f=r.z-h.z,p=Math.hypot(u,f);p<h.r&&(r.x=h.x+u/p*h.r,r.z=h.z+f/p*h.r)}const l=e.sample(r.x,r.z),c=r.s*(r.dying?1-r.dying:1);this.tmp.compose(new Pe(r.x,.006+l,r.z),new Ee,new Pe(c,c*.7,c)),this.mesh.setMatrixAt(s,this.tmp)}this.mesh.instanceMatrix.needsUpdate=!0}}class $g{constructor(t,e){this.ctx=e,this.scene=t,this.list=[];const n=new hs(1,1),s=n.attributes.position;for(let r=0;r<s.count;r++){const a=s.getX(r),o=s.getY(r),l=s.getZ(r),c=1+.16*Math.sin(a*5+o*3)*Math.cos(l*4+a*2);s.setXYZ(r,a*c,o*c*.75,l*c*.9)}n.computeVertexNormals(),this.geo=n,this.mat=us(new ue({color:9078656,roughness:.7}),{key:"stone"})}throw(t,e,n){const{sim:s,fish:r}=this.ctx,a=.06+Math.random()*.035,o=new Gt(this.geo,this.mat.clone());o.material.color.setHSL(.09+Math.random()*.05,.08,.28+Math.random()*.2),o.scale.setScalar(a),o.castShadow=!0,o.layers.enable(1),this.scene.add(o);const l=n.x-t,c=n.z-e,h=Math.hypot(l,c)||1,u=Math.min(h,3),f={mesh:o,r:a,state:"fly",t:0,dur:.6,sx:t+l/h*u,sz:e+c/h*u,sy:1.6,tx:t,tz:e,vy:0,spin:new Pe(Math.random()-.5,Math.random()-.5,Math.random()-.5).multiplyScalar(14)};if(o.position.set(f.sx,f.sy,f.sz),this.list.push(f),this.list.length>22){const p=this.list.shift();this.scene.remove(p.mesh),p.mesh.material.dispose()}}update(t){const{sim:e,fish:n,splash:s}=this.ctx;for(const r of this.list){const a=r.mesh;if(r.state==="fly"){r.t+=t/r.dur;const o=Math.min(r.t,1);if(a.position.x=_n(r.sx,r.tx,o),a.position.z=_n(r.sz,r.tz,o),a.position.y=_n(r.sy,0,o)+Math.sin(o*Math.PI)*1.4,a.rotation.x+=r.spin.x*t,a.rotation.y+=r.spin.y*t,a.rotation.z+=r.spin.z*t,r.t>=1){r.state="sink",r.vy=-3.2;const l=ni(r.tx,r.tz);if(l>.04){const c=be(l/.4,.5,1);e.impulse(r.tx,r.tz,-.115*c,.17),e.impulse(r.tx,r.tz,-.04*c,.34),s.stone(r.tx,r.tz,c),n.scare(r.tx,r.tz,5.5),this.ctx.onStone?.(r.tx,r.tz)}else s.small(r.tx,r.tz,4,1)}}else if(r.state==="sink"){r.vy+=(-.85-r.vy)*(1-Math.exp(-t*4)),r.spin.multiplyScalar(Math.exp(-t*3)),a.position.y+=r.vy*t,a.position.x+=Math.sin(a.position.y*9+r.r*90)*.15*t,a.rotation.x+=r.spin.x*t*.4,a.rotation.z+=r.spin.z*t*.4;const o=Zt(a.position.x,a.position.z)+r.r*.5;a.position.y<=o&&(a.position.y=o,r.state="rest")}}}}function Jg(){const i=[],t=(r,a,o)=>i.push(...r,...a,...o),e=[[-.17,0,-.05],[.17,0,-.05],[.17,0,.05],[-.17,0,.05]];t(e[0],e[2],e[1]),t(e[0],e[3],e[2]);const n=[[-.21,.075,-.09],[.21,.075,-.09],[.21,.075,.09],[-.21,.075,.09]];t(e[3],e[2],n[2]),t(e[3],n[2],n[3]),t(e[1],e[0],n[0]),t(e[1],n[0],n[1]),t(e[1],e[2],n[2]),t(e[1],n[2],[.235,.1,0]),t(e[1],[.235,.1,0],n[1]),t(e[0],n[3],e[3]),t(e[0],[-.235,.1,0],n[3]),t(e[0],n[0],[-.235,.1,0]),t([-.17,.075,0],[.17,.075,0],[0,.23,0]);const s=new fe;return s.setAttribute("position",new Bt(i,3)),s.computeVertexNormals(),s}class Qg{constructor(t,e){this.ctx=e,this.scene=t,this.list=[],this.geo=Jg(),this.palette=[16513006,16173520,12572910,16245665,15312272,13624776],this.sl=new ot,this.n=new ot,this.w=new ot,this.up=new Pe(0,1,0)}place(t,e){const n=new ue({color:this.palette[Math.floor(Math.random()*this.palette.length)],roughness:.85,flatShading:!0,side:Se,emissive:16777215,emissiveIntensity:0});n.emissive.copy(n.color),n.emissiveIntensity=.12;const s=new Gt(this.geo,n);s.scale.setScalar(1.35),s.castShadow=!0,s.receiveShadow=!0,s.rotation.order="YXZ",this.scene.add(s);const r={mesh:s,x:t,z:e,vx:0,vz:0,yaw:Math.random()*6.28,av:0,y:.5,vy:0,ph:Math.random()*6,wake:0,qx:new Ee};if(this.list.push(r),this.ctx.sim.impulse(t,e,-.012,.09),this.ctx.splash.small(t,e,5,.8),this.list.length>12){const a=this.list.shift();this.scene.remove(a.mesh),a.mesh.material.dispose()}}update(t,e){const{sim:n,obstacles:s}=this.ctx;Oo(this.w,.9);const r=.28;for(const a of this.list){n.slope(a.x,a.z,this.sl);const o=-this.sl.x*7+(this.w.x-a.vx)*.9,l=-this.sl.y*7+(this.w.y-a.vz)*.9;a.vx+=o*t,a.vz+=l*t;const c=Math.hypot(a.vx,a.vz);c>1.6&&(a.vx*=1.6/c,a.vz*=1.6/c);let h=a.x+a.vx*t,u=a.z+a.vz*t;if(ni(h,u)<.12){jg(a.x,a.z,this.n);const b=a.vx*this.n.x+a.vz*this.n.y;b<0&&(a.vx-=1.4*b*this.n.x,a.vz-=1.4*b*this.n.y),a.vx+=this.n.x*.15*t*10,a.vz+=this.n.y*.15*t*10,a.av+=(Math.random()-.5)*1.2,h=a.x+a.vx*t,u=a.z+a.vz*t,ni(h,u)<.1&&(h=a.x+this.n.x*.01,u=a.z+this.n.y*.01)}for(const b of yn){const T=h-b.x,C=u-b.z,E=Math.hypot(T,C),y=b.r+r*.6;if(E<y){const P=E||.001;h=b.x+T/P*y,u=b.z+C/P*y;const z=(a.vx*T+a.vz*C)/P;z<0&&(a.vx-=1.3*z*T/P,a.vz-=1.3*z*C/P),a.av+=(Math.random()-.5)*.8}}for(const b of s){const T=h-b.x,C=u-b.z,E=Math.hypot(T,C),y=b.r+r*.5;if(E<y){const P=E||.001;h=b.x+T/P*y,u=b.z+C/P*y;const z=(a.vx*T+a.vz*C)/P;z<0&&(a.vx-=1.2*z*T/P,a.vz-=1.2*z*C/P)}}for(const b of this.list)if(b!==a){const T=h-b.x,C=u-b.z,E=Math.hypot(T,C);if(E<r*1.3&&E>1e-4){const y=(r*1.3-E)*.5;h+=T/E*y,u+=C/E*y}}a.x=h,a.z=u;const f=Math.hypot(a.vx,a.vz),p=Math.atan2(-a.vz,a.vx);a.av+=t_(p,a.yaw)*Math.min(f*2.5,1.2)*t*3-a.av*t*2.5,a.av+=Math.sin(e*.7+a.ph)*.05*t,a.yaw+=a.av*t,a.wake-=t,f>.05&&a.wake<=0&&(a.wake=.22,n.impulse(a.x+a.vx*.12,a.z+a.vz*.12,-.0012*Math.min(f,1),.06));const _=.03+n.sample(a.x,a.z);a.vy+=(_-a.y)*90*t-a.vy*7*t,a.y+=a.vy*t,a.y<_-.15&&(a.y=_-.15),a.mesh.position.set(a.x,a.y,a.z);const m=Math.cos(a.yaw),d=Math.sin(a.yaw),x=this.sl.x*m-this.sl.y*d,M=this.sl.x*d+this.sl.y*m,v=be(x*2.2,-.5,.5),A=be(-M*2.2+Math.sin(e*1.3+a.ph)*.03,-.5,.5);a.mesh.rotation.set(A,a.yaw,v)}}}function t_(i,t){let e=i-t;for(;e>Math.PI;)e-=6.2832;for(;e<-Math.PI;)e+=6.2832;return e}class e_{constructor(t,e,n){this.ctx=e,this.tips=n,this.MAX=90;const s=new fe;s.setAttribute("position",new Bt([0,-.07,0,-.016,-.02,.004,.016,-.02,.004,0,.07,0],3)),s.setAttribute("normal",new Bt([0,0,1,0,0,1,0,0,1,0,0,1],3)),s.setIndex([0,2,1,1,2,3]),this.mesh=new kn(s,new ue({color:16777215,roughness:.6,side:Se}),this.MAX),this.mesh.frustumCulled=!1,this.mesh.castShadow=!1,t.add(this.mesh),this.p=Array.from({length:this.MAX},()=>({alive:!1})),this.cursor=0,this.next=1.2,this.tmp=new Ft,this.q=new Ee,this.sl=new ot,this.w=new ot,this.col=new bt;for(let r=0;r<this.MAX;r++)this.mesh.setColorAt(r,this.col.setHSL(.2,.5,.3))}spawn(t=!1){const e=this.p[this.cursor];this.cursor=(this.cursor+1)%this.MAX;const n=this.tips[Math.floor(Math.random()*this.tips.length)];if(e.alive=!0,e.state="fall",e.age=0,e.ph=Math.random()*6.28,e.sc=.9+Math.random()*.5,e.x=n.x,e.y=n.y+Math.random()*.4,e.z=n.z,e.vx=e.vz=0,e.rot=new Pe(Math.random()*6,Math.random()*6,Math.random()*6),e.yaw=Math.random()*6.28,this.mesh.setColorAt(this.p.indexOf(e),this.col.setHSL(.14+Math.random()*.1,.55,.28+Math.random()*.12)),this.mesh.instanceColor.needsUpdate=!0,t){for(let s=0;s<40;s++){const r=(Math.random()-.5)*8,a=(Math.random()-.5)*6;if(ni(r,a)>.4){e.x=r,e.z=a;break}}e.y=0,e.state="float"}}update(t,e){const n=wt.uWind.value;this.next-=t,this.next<=0&&(this.spawn(),this.next=(5+Math.random()*6)/(.25+n*3.2)),Oo(this.w,1);const{sim:s}=this.ctx;for(let r=0;r<this.MAX;r++){const a=this.p[r];if(!a.alive){this.tmp.makeScale(0,0,0),this.mesh.setMatrixAt(r,this.tmp);continue}a.age+=t;let o=a.sc;if(a.state==="fall"){a.vx+=(this.w.x*2.4-a.vx)*t*1.2+Math.sin(e*2.3+a.ph)*.35*t,a.vz+=(this.w.y*2.4-a.vz)*t*1.2+Math.cos(e*2.1+a.ph)*.35*t,a.x+=a.vx*t,a.z+=a.vz*t,a.y-=(.42+.12*Math.sin(e*3+a.ph))*t;const l=Zt(a.x,a.z);a.y<=Math.max(l,0)+.005&&(l<-.03?(a.state="float",a.y=0,s.impulse(a.x,a.z,-.0035,.05),a.vx*=.1,a.vz*=.1):(a.state="rest",a.age=0,a.y=l+.01)),this.q.setFromEuler(new De(a.rot.x+e*2.2+Math.sin(e*3+a.ph)*.8,a.rot.y+e*1.1,a.rot.z+Math.sin(e*2+a.ph))),this.tmp.compose(new Pe(a.x,a.y,a.z),this.q,new Pe(o,o,o))}else if(a.state==="float"){s.slope(a.x,a.z,this.sl),a.vx+=(-this.sl.x*2+(this.w.x*.6-a.vx)*.7)*t,a.vz+=(-this.sl.y*2+(this.w.y*.6-a.vz)*.7)*t;const l=a.x+a.vx*t,c=a.z+a.vz*t;ni(l,c)>.05?(a.x=l,a.z=c):a.vx=a.vz=0;const h=s.sample(a.x,a.z);a.yaw+=Math.sin(e*.5+a.ph)*.2*t;const u=new Pe(-this.sl.x*1.5,1,-this.sl.y*1.5).normalize();this.q.setFromUnitVectors(new Pe(0,0,1),u);const f=new Ee().setFromAxisAngle(new Pe(0,0,1),a.yaw);this.q.multiply(f),a.age>140&&(o*=Math.max(0,1-(a.age-140)/8)),a.age>148&&(a.alive=!1),this.tmp.compose(new Pe(a.x,.005+h,a.z),this.q,new Pe(o,o,o))}else this.q.setFromEuler(new De(-1.45,0,a.yaw)),a.age>20&&(o*=Math.max(0,1-(a.age-20)/4)),a.age>24&&(a.alive=!1),this.tmp.compose(new Pe(a.x,a.y,a.z),this.q,new Pe(o,o,o));this.mesh.setMatrixAt(r,this.tmp)}this.mesh.instanceMatrix.needsUpdate=!0}}class n_{constructor(t,e){this.ctx=e;const n=2600,s=Je(5),r=[],a=[],o=[];for(let c=0;c<n;c++){const h=[s(),s(),s(),s()];for(const[f,p]of[[-1,0],[1,0],[-1,1],[1,1]])r.push(f,p,0),a.push(...h);const u=c*4;o.push(u,u+1,u+2,u+1,u+3,u+2)}const l=new fe;l.setAttribute("position",new Bt(r,3)),l.setAttribute("aR",new Bt(a,4)),l.setIndex(o),this.mat=new $e({uniforms:{uTime:wt.uTime,uWind:wt.uWind,uWindDir:wt.uWindDir,uRain:wt.uRain,uCol:{value:new bt(.7,.78,.9)}},transparent:!0,depthWrite:!1,fog:!1,vertexShader:`
        attribute vec4 aR; uniform float uTime, uWind, uRain; uniform vec2 uWindDir; varying float vA;
        void main(){
          float H = 9.0, W = 20.0;
          float spd = 11.0 + aR.w*3.0;
          float y = mod(aR.y*H - uTime*spd, H);
          vec3 p = vec3((aR.x-0.5)*W, y, (aR.z-0.5)*W*0.9);
          vec3 sl = normalize(vec3(uWindDir.x*(0.08+0.3*uWind), -1.0, uWindDir.y*(0.08+0.3*uWind)));
          p.xz += -sl.xz * (y/(-sl.y)) * 0.0;
          float len = 0.45 + aR.w*0.3;
          vec3 vd = normalize(p - cameraPosition);
          vec3 right = normalize(cross(vd, sl));
          float dist = length(p - cameraPosition);
          float wd = 0.006 + dist*0.0012;
          vec3 wp = p + right*position.x*wd - sl*position.y*len;
          vA = smoothstep(0.0,0.6,y) * (1.0 - smoothstep(14.0, 26.0, dist)) * (0.35 + 0.5*aR.z) * step(aR.x, uRain);
          gl_Position = projectionMatrix*viewMatrix*vec4(wp,1.0);
        }`,fragmentShader:`uniform vec3 uCol; varying float vA; void main(){ gl_FragColor = vec4(uCol, vA*0.6);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        }`}),this.mesh=new Gt(l,this.mat),this.mesh.frustumCulled=!1,this.mesh.visible=!1,this.mesh.renderOrder=8,t.add(this.mesh),this.acc=0,this.acc2=0}update(t,e){const n=wt.uRain.value;if(this.mesh.visible=n>.02,this.mat.uniforms.uCol.value.setRGB(.55,.62,.72).multiplyScalar(.2+this.ctx.env.out.brightness*.5),n<.05)return;const{sim:s,splash:r}=this.ctx;for(this.acc+=t*95*n;this.acc>=1;){this.acc-=1;for(let a=0;a<6;a++){const o=(Math.random()-.5)*11.5,l=(Math.random()-.5)*9.5;if(ni(o,l)>.05){s.impulse(o,l,-(.0012+Math.random()*.0018),.04),Math.hypot(o-e.position.x,l-e.position.z)<9&&Math.random()<.5&&r.small(o,l,2,.6);break}}}}}class i_{constructor(t){const n=Je(66),s=[],r=[],a=[];for(let l=0;l<80;l++){let c,h;for(let u=0;u<50&&(c=(n()-.5)*15,h=(n()-.5)*12,!(fs(c,h)<1.25));u++);s.push(c,.35+n()*1.6,h),r.push(n()*6.28,n()*6.28,n()*6.28,n()*6.28),a.push(.3+n()*.5,.4+n()*.6,.3+n()*.5,.5+n()*.8)}const o=new fe;o.setAttribute("position",new Bt(s,3)),o.setAttribute("aP",new Bt(r,4)),o.setAttribute("aF",new Bt(a,4)),this.mat=new $e({uniforms:{uTime:wt.uTime,uScale:{value:800},uAmt:{value:0}},transparent:!0,depthWrite:!1,blending:Us,fog:!1,vertexShader:`
        attribute vec4 aP; attribute vec4 aF; uniform float uTime, uScale, uAmt; varying float vB;
        void main(){
          vec3 p = position + vec3(sin(uTime*aF.x+aP.x)*1.1 + sin(uTime*aF.w*0.31+aP.w)*0.8, sin(uTime*aF.y+aP.y)*0.35, cos(uTime*aF.z+aP.z)*1.1);
          float bl = pow(max(0.0, sin(uTime*aF.w*1.9 + aP.w*6.0)), 2.0)*0.9 + 0.1;
          vB = bl * uAmt;
          vec4 mv = viewMatrix*vec4(p,1.0);
          gl_PointSize = clamp(0.16 * uScale / -mv.z, 2.5, 34.0);
          gl_Position = projectionMatrix*mv;
        }`,fragmentShader:`varying float vB; void main(){ float d = length(gl_PointCoord-0.5)*2.0; float a = pow(max(1.0-d,0.0), 2.2); gl_FragColor = vec4(vec3(0.75,1.0,0.35)*a*vB*2.2, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        }`}),this.mesh=new G0(o,this.mat),this.mesh.frustumCulled=!1,this.mesh.visible=!1,this.mesh.renderOrder=7,t.add(this.mesh)}update(t){this.mat.uniforms.uAmt.value=t,this.mesh.visible=t>.02}setScale(t,e){this.mat.uniforms.uScale.value=t/(2*Math.tan(Oc.degToRad(e)/2))}}const _r={ripple:'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="3" /><circle cx="16" cy="16" r="8" opacity=".7"/><circle cx="16" cy="16" r="13" opacity=".4"/></svg>',stone:'<svg viewBox="0 0 32 32"><path d="M6 20c-1-5 3-11 9-12 6-1 11 2 11 8 0 5-4 9-10 9-6 1-9-1-10-5z"/><path d="M12 13c2-1 4-1 6 0" opacity=".6"/></svg>',boat:'<svg viewBox="0 0 32 32"><path d="M4 20h24l-4 6H8z"/><path d="M16 5l8 13H8z" opacity=".85"/><path d="M16 5v13" opacity=".5"/></svg>',food:'<svg viewBox="0 0 32 32"><circle cx="10" cy="19" r="3.2"/><circle cx="20" cy="12" r="3.2"/><circle cx="22" cy="22" r="3.2"/><path d="M4 28c4 1.5 8 1.5 12 0" opacity=".45"/></svg>',sun:'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="5.5"/><path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.5 7.5l2.8 2.8M21.7 21.7l2.8 2.8M7.5 24.5l2.8-2.8M21.7 10.3l2.8-2.8"/></svg>',dusk:'<svg viewBox="0 0 32 32"><path d="M7 21a9 9 0 0 1 18 0"/><path d="M3 21h26M8 26h16M16 7v3M6.5 11.5l2 2M25.5 11.5l-2 2"/></svg>',moon:'<svg viewBox="0 0 32 32"><path d="M22 5a11 11 0 1 0 5 19A12 12 0 0 1 22 5z"/></svg>',rain:'<svg viewBox="0 0 32 32"><path d="M9 18a6 6 0 0 1 1-11.9A7 7 0 0 1 23.5 9 5 5 0 0 1 23 18z"/><path d="M11 22l-1.5 4M17 22l-1.5 4M23 22l-1.5 4"/></svg>',wind:'<svg viewBox="0 0 32 32"><path d="M4 12h15a3.5 3.5 0 1 0-3.5-3.5M4 19h21a3.5 3.5 0 1 1-3.5 3.5M4 25.5h9"/></svg>'};function s_(i,t){const e=[["ripple","点水"],["stone","石子"],["boat","纸船"],["food","鱼食"]],n=[["day","sun","白天"],["dusk","dusk","黄昏"],["night","moon","夜晚"]];i.innerHTML=`
    <div class="title"><span>池塘一角</span></div>
    <div class="toast" id="toast"></div>
    <section class="dock" id="dock" aria-label="控制面板">
      <button class="fold" id="fold" aria-label="收起或展开面板" aria-expanded="true"><i></i></button>
      <div class="body">
        <div class="row tools" role="radiogroup" aria-label="道具">
          ${e.map(([x,M],v)=>`<button class="tool${v?"":" on"}" data-tool="${x}" role="radio" aria-checked="${v?"false":"true"}" title="${M}（${v+1}）">${_r[x]}<b>${M}</b></button>`).join("")}
        </div>
        <div class="row env">
          <div class="seg" role="radiogroup" aria-label="时间">
            ${n.map(([x,M,v],A)=>`<button class="t${A?"":" on"}" data-time="${x}" role="radio" aria-checked="${A?"false":"true"}">${_r[M]}<b>${v}</b></button>`).join("")}
          </div>
          <button class="rain" id="rain" role="switch" aria-checked="false">${_r.rain}<b>下雨</b><i class="sw"></i></button>
        </div>
        <label class="row wind">${_r.wind}<b>风力</b><input id="wind" type="range" min="0" max="1" step="0.01" value="0.3" aria-label="风力"><output id="windv">微风</output></label>
      </div>
    </section>`;const s=x=>i.querySelector(x),r=[...i.querySelectorAll("[data-tool]")],a=[...i.querySelectorAll("[data-time]")],o=x=>{r.forEach(M=>{const v=M.dataset.tool===x;M.classList.toggle("on",v),M.setAttribute("aria-checked",v)}),t.onTool(x)};r.forEach(x=>x.addEventListener("click",()=>o(x.dataset.tool))),a.forEach(x=>x.addEventListener("click",()=>{a.forEach(M=>{const v=M===x;M.classList.toggle("on",v),M.setAttribute("aria-checked",v)}),t.onTime(x.dataset.time)}));const l=s("#rain"),c=x=>{l.classList.toggle("on",x),l.setAttribute("aria-checked",x),t.onRain(x)};l.addEventListener("click",()=>c(!l.classList.contains("on")));const h=s("#wind"),u=s("#windv"),f=x=>x<.08?"无风":x<.3?"微风":x<.55?"清风":x<.8?"大风":"狂风",p=()=>{const x=+h.value;u.textContent=f(x),h.style.setProperty("--p",x*100+"%"),t.onWind(x)};h.addEventListener("input",p),p();const g=s("#dock");s("#fold").addEventListener("click",()=>{const x=g.classList.toggle("folded");s("#fold").setAttribute("aria-expanded",!x)});const _=s("#toast");let m=0;const d=(x,M=2200)=>{_.textContent=x,_.classList.add("show"),clearTimeout(m),m=setTimeout(()=>_.classList.remove("show"),M)};return d("轻点水面，激起一圈涟漪",6e3),i.addEventListener("pointerdown",x=>x.stopPropagation()),{setTool:o,setRain:c,say:d,toolBtns:r,timeBtns:a,rain:l}}const wn=document.getElementById("c"),je=new z0({canvas:wn,antialias:!0,powerPreference:"high-performance"});je.toneMapping=Ec;je.shadowMap.enabled=!0;je.shadowMap.type=yc;je.shadowMap.autoUpdate=!1;const _e=new Lo,de=new Ge(52,1,.08,700);de.position.set(4.2,1.1,4.9);const ye=new Q0(de,wn);ye.target.set(-.9,-.05,-1);ye.enablePan=!1;ye.enableDamping=!0;ye.dampingFactor=.07;ye.minDistance=1;ye.maxDistance=17;ye.rotateSpeed=.6;ye.zoomSpeed=.8;ye.minPolarAngle=.25;let zo=!0;innerWidth/innerHeight<.8&&(de.position.set(4.9,2.5,6.1),ye.target.set(-.9,-.4,-.5));ye.update();ye.addEventListener("start",()=>{zo=!1});const Jn=new Pg(_e,je),Sn=new Tg,r_=xg(512);vg(_e);Mg(_e);yg(_e);Sg(_e);const go=Lg(_e),dh=Ig(_e),ph=[];Fg(_e,Sn);Og(_e);const a_=Hg(_e,Sn,ph),mi=new Cg(_e,Sn,r_),Be={sim:Sn,scene:_e,env:Jn,obstacles:ph};Be.splash=new Zg(_e,Be);Be.food=new Kg(_e,Be);const Hr=new qg(_e,Be);Be.fish=Hr;const Bo=new $g(_e,Be),Ho=new Qg(_e,Be),ko=new e_(_e,Be,dh.tips),o_=new n_(_e,Be),mh=new i_(_e);for(let i=0;i<3;i++)ko.spawn(!0);const l_=matchMedia("(pointer: coarse)").matches||Math.min(innerWidth,innerHeight)<600;let Mn=Math.min(window.devicePixelRatio||1,l_?1.5:2),_o=Mn,Ts=1,As=1;function as(){Ts=wn.clientWidth||window.innerWidth,As=wn.clientHeight||window.innerHeight,je.setPixelRatio(Mn),je.setSize(Ts,As,!1),de.aspect=Ts/As,de.fov=Ts/As<.8?68:52,de.updateProjectionMatrix(),mi.resize(Ts,As,Mn)}window.addEventListener("resize",as);new ResizeObserver(as).observe(wn);as();let vo="ripple",gh=.3;const qi=s_(document.getElementById("ui"),{onTool(i){vo=i,wn.classList.toggle("aim",i!=="ripple")},onTime(i){Jn.set(i)},onRain(i){Jn.setRain(i)},onWind(i){gh=i}}),_c=document.getElementById("dock");new ResizeObserver(()=>document.getElementById("ui").style.setProperty("--dock-h",_c.offsetHeight+"px")).observe(_c);window.addEventListener("keydown",i=>{const t={1:"ripple",2:"stone",3:"boat",4:"food"};t[i.key]?qi.setTool(t[i.key]):i.key==="Escape"?qi.setTool("ripple"):(i.key==="r"||i.key==="R")&&qi.setRain(!qi.rain.classList.contains("on"))});const vr=new K0,vc=new ot,gi=new Map;let xc=0;wn.addEventListener("pointerdown",i=>{if(gi.set(i.pointerId,{x:i.clientX,y:i.clientY,t:performance.now(),multi:gi.size>0}),gi.size>1)for(const t of gi.values())t.multi=!0});wn.addEventListener("pointercancel",i=>gi.delete(i.pointerId));wn.addEventListener("pointerup",i=>{const t=gi.get(i.pointerId);if(gi.delete(i.pointerId),!t||t.multi||Math.hypot(i.clientX-t.x,i.clientY-t.y)>8||performance.now()-t.t>600)return;const e=wn.getBoundingClientRect();vc.set((i.clientX-e.left)/e.width*2-1,-((i.clientY-e.top)/e.height)*2+1),vr.setFromCamera(vc,de);const n=vr.ray.origin,s=vr.ray.direction;if(s.y>=-.002)return;const r=-n.y/s.y,a=vr.intersectObjects(go.blockers,!1)[0];if(a&&a.distance<r)return;const o=n.x+s.x*r,l=n.z+s.z*r;if(-Zt(o,l)<.04||Math.abs(o)>pe/2-.5||Math.abs(l)>pe/2-.5){vo!=="ripple"&&qi.say("这里不是水面");return}_h(vo,o,l)});function _h(i,t,e){const n=performance.now();if(i==="ripple")Sn.impulse(t,e,-.07,.15),Be.splash.small(t,e,3,.8),Hr.scare(t,e,1.6);else if(i==="stone"){if(n-xc<140)return;xc=n,Bo.throw(t,e,de.position)}else i==="boat"?Ho.place(t,e):i==="food"&&(Be.food.spawn(t,e,8),Be.splash.small(t,e,3,.6))}const c_=new Z0,h_={before(i){const t=i==="refl"?mi.reflRT.height:je.domElement.height;mh.setScale(t,de.fov)}};let Rs=.3,ya=2,Sa=0,xr=0,Mr=6;const Cs=new D;function vh(){const i=c_.getDelta(),t=Math.min(i,.1);if(wt.uTime.value+=t,Rs+=(gh-Rs)*(1-Math.exp(-t*1.8)),wt.uWind.value=Rs,wt.uWT.value+=t*(1.2+Rs*1.6),zo){const r=.025500000000000002*Math.cos(wt.uTime.value*.15)*t;Cs.copy(de.position).sub(ye.target);const a=Math.cos(r),o=Math.sin(r),l=Cs.x*a-Cs.z*o,c=Cs.x*o+Cs.z*a;de.position.set(ye.target.x+l,de.position.y,ye.target.z+c)}const e=de.position.distanceTo(ye.target);ye.maxPolarAngle=Math.min(1.62,Math.acos(be((.13-ye.target.y)/e,-1,1))),ye.update();const n=Zt(de.position.x,de.position.z),s=n>0?n+.28:.13;if(de.position.y<s&&(de.position.y=s),de.updateMatrixWorld(),Jn.update(t,de),Sn.update(t),ya-=t,ya<=0){ya=1.2+Math.random()*3;for(let r=0;r<8;r++){const a=(Math.random()-.5)*10,o=(Math.random()-.5)*8;if(-Zt(a,o)>.3){Sn.impulse(a,o,-.0028,.05);break}}}for(const r of dh.touchers)Math.random()<t*(.25+Rs*1.6)&&Sn.impulse(r.x,r.z,-.0022,.05);if(a_.update(),Hr.update(t,wt.uTime.value),Ho.update(t,wt.uTime.value),Bo.update(t),Be.food.update(t),ko.update(t,wt.uTime.value),o_.update(t,de),Be.splash.update(t),mh.update(Jn.out.flies),go.update(Jn,wt.uTime.value),mi.uni.uLanternPos.value.copy(go.lanternPos),mi.uni.uLantern.value=Jn.out.lantern,Sn.renderSurface(je),mi.update(t,de),je.shadowMap.needsUpdate=!0,mi.renderPasses(je,_e,de,h_),je.setRenderTarget(null),je.render(_e,de),Sa+=i,xr++,Mr-=i,xr>=45){const r=Sa/xr;Sa=0,xr=0,Mr<=0&&(r>1/26&&Mn>.7?(Mn=Math.max(.7,Mn-.25),as(),Mr=4):r<1/52&&Mn<_o&&(Mn=Math.min(_o,Mn+.25),as(),Mr=8))}window.__bootMs||(window.__bootMs=performance.now()),requestAnimationFrame(vh)}requestAnimationFrame(vh);requestAnimationFrame(()=>requestAnimationFrame(()=>document.getElementById("loading").classList.add("done")));window.__pond={renderer:je,scene:_e,camera:de,controls:ye,env:Jn,sim:Sn,water:mi,G:wt,ctx:Be,stopSway(){zo=!1},fishSys:Hr,boats:Ho,stones:Bo,leaves:ko,ui:qi,interact:_h,setPR(i){Mn=i,_o=i,as()}};
