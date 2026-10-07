(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const la="170",yn={ROTATE:0,DOLLY:1,PAN:2},kn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Qc=0,Ba=1,tu=2,tc=1,ec=2,vn=3,Xn=0,Le=1,ye=2,Vn=0,Hi=1,ho=2,ka=3,Ha=4,eu=5,oi=100,nu=101,iu=102,su=103,ru=104,ou=200,au=201,lu=202,cu=203,fo=204,po=205,uu=206,hu=207,fu=208,du=209,pu=210,mu=211,gu=212,_u=213,vu=214,mo=0,go=1,_o=2,Vi=3,vo=4,xo=5,Mo=6,So=7,nc=0,xu=1,Mu=2,Wn=0,Su=1,yu=2,Eu=3,ic=4,Tu=5,bu=6,Au=7,sc=300,Wi=301,Xi=302,yo=303,Eo=304,vr=306,To=1e3,Hn=1001,bo=1002,Ue=1003,wu=1004,bs=1005,ze=1006,Ar=1007,ci=1008,An=1009,rc=1010,oc=1011,vs=1012,ca=1013,Yn=1014,nn=1015,pi=1016,ua=1017,ha=1018,Yi=1020,ac=35902,lc=1021,cc=1022,Be=1023,uc=1024,hc=1025,fi=1026,qi=1027,fa=1028,da=1029,fc=1030,pa=1031,ma=1033,ir=33776,sr=33777,rr=33778,or=33779,Ao=35840,wo=35841,Ro=35842,Co=35843,Po=36196,Do=37492,Lo=37496,Uo=37808,Io=37809,No=37810,Fo=37811,Oo=37812,zo=37813,Bo=37814,ko=37815,Ho=37816,Go=37817,Vo=37818,Wo=37819,Xo=37820,Yo=37821,ar=36492,qo=36494,jo=36495,dc=36283,Zo=36284,Ko=36285,$o=36286,Ru=3200,Cu=3201,pc=0,Pu=1,Mn="",Oe="srgb",Zi="srgb-linear",xr="linear",Jt="srgb",xi=7680,Ga=519,Du=512,Lu=513,Uu=514,mc=515,Iu=516,Nu=517,Fu=518,Ou=519,Jo=35044,gc=35048,Va="300 es",Sn=2e3,fr=2001;class gi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const be=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Wa=1234567;const gs=Math.PI/180,xs=180/Math.PI;function En(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(be[i&255]+be[i>>8&255]+be[i>>16&255]+be[i>>24&255]+"-"+be[t&255]+be[t>>8&255]+"-"+be[t>>16&15|64]+be[t>>24&255]+"-"+be[e&63|128]+be[e>>8&255]+"-"+be[e>>16&255]+be[e>>24&255]+be[n&255]+be[n>>8&255]+be[n>>16&255]+be[n>>24&255]).toLowerCase()}function Me(i,t,e){return Math.max(t,Math.min(e,i))}function ga(i,t){return(i%t+t)%t}function zu(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Bu(i,t,e){return i!==t?(e-i)/(t-i):0}function _s(i,t,e){return(1-e)*i+e*t}function ku(i,t,e,n){return _s(i,t,1-Math.exp(-e*n))}function Hu(i,t=1){return t-Math.abs(ga(i,t*2)-t)}function Gu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Vu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Wu(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Xu(i,t){return i+Math.random()*(t-i)}function Yu(i){return i*(.5-Math.random())}function qu(i){i!==void 0&&(Wa=i);let t=Wa+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function ju(i){return i*gs}function Zu(i){return i*xs}function Ku(i){return(i&i-1)===0&&i!==0}function $u(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Ju(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Qu(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),u=r((t+n)/2),c=o((t+n)/2),h=r((t-n)/2),f=o((t-n)/2),d=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*c,l*h,l*f,a*u);break;case"YZY":i.set(l*f,a*c,l*h,a*u);break;case"ZXZ":i.set(l*h,l*f,a*c,a*u);break;case"XZX":i.set(a*c,l*g,l*d,a*u);break;case"YXY":i.set(l*d,a*c,l*g,a*u);break;case"ZYZ":i.set(l*g,l*d,a*c,a*u);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function en(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function $t(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const ge={DEG2RAD:gs,RAD2DEG:xs,generateUUID:En,clamp:Me,euclideanModulo:ga,mapLinear:zu,inverseLerp:Bu,lerp:_s,damp:ku,pingpong:Hu,smoothstep:Gu,smootherstep:Vu,randInt:Wu,randFloat:Xu,randFloatSpread:Yu,seededRandom:qu,degToRad:ju,radToDeg:Zu,isPowerOfTwo:Ku,ceilPowerOfTwo:$u,floorPowerOfTwo:Ju,setQuaternionFromProperEuler:Qu,normalize:$t,denormalize:en};class vt{constructor(t=0,e=0){vt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Me(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Nt{constructor(t,e,n,s,r,o,a,l,u){Nt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,u)}set(t,e,n,s,r,o,a,l,u){const c=this.elements;return c[0]=t,c[1]=s,c[2]=a,c[3]=e,c[4]=r,c[5]=l,c[6]=n,c[7]=o,c[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],u=n[1],c=n[4],h=n[7],f=n[2],d=n[5],g=n[8],v=s[0],m=s[3],p=s[6],T=s[1],S=s[4],_=s[7],N=s[2],R=s[5],C=s[8];return r[0]=o*v+a*T+l*N,r[3]=o*m+a*S+l*R,r[6]=o*p+a*_+l*C,r[1]=u*v+c*T+h*N,r[4]=u*m+c*S+h*R,r[7]=u*p+c*_+h*C,r[2]=f*v+d*T+g*N,r[5]=f*m+d*S+g*R,r[8]=f*p+d*_+g*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],u=t[7],c=t[8];return e*o*c-e*a*u-n*r*c+n*a*l+s*r*u-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],u=t[7],c=t[8],h=c*o-a*u,f=a*l-c*r,d=u*r-o*l,g=e*h+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=h*v,t[1]=(s*u-c*n)*v,t[2]=(a*n-s*o)*v,t[3]=f*v,t[4]=(c*e-s*l)*v,t[5]=(s*r-a*e)*v,t[6]=d*v,t[7]=(n*l-u*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),u=Math.sin(r);return this.set(n*l,n*u,-n*(l*o+u*a)+o+t,-s*u,s*l,-s*(-u*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(wr.makeScale(t,e)),this}rotate(t){return this.premultiply(wr.makeRotation(-t)),this}translate(t,e){return this.premultiply(wr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const wr=new Nt;function _c(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function dr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function th(){const i=dr("canvas");return i.style.display="block",i}const Xa={};function ds(i){i in Xa||(Xa[i]=!0,console.warn(i))}function eh(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function nh(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function ih(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Wt={enabled:!0,workingColorSpace:Zi,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===Jt&&(i.r=Tn(i.r),i.g=Tn(i.g),i.b=Tn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===Jt&&(i.r=Gi(i.r),i.g=Gi(i.g),i.b=Gi(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Mn?xr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Tn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Gi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Ya=[.64,.33,.3,.6,.15,.06],qa=[.2126,.7152,.0722],ja=[.3127,.329],Za=new Nt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ka=new Nt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Wt.define({[Zi]:{primaries:Ya,whitePoint:ja,transfer:xr,toXYZ:Za,fromXYZ:Ka,luminanceCoefficients:qa,workingColorSpaceConfig:{unpackColorSpace:Oe},outputColorSpaceConfig:{drawingBufferColorSpace:Oe}},[Oe]:{primaries:Ya,whitePoint:ja,transfer:Jt,toXYZ:Za,fromXYZ:Ka,luminanceCoefficients:qa,outputColorSpaceConfig:{drawingBufferColorSpace:Oe}}});let Mi;class sh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Mi===void 0&&(Mi=dr("canvas")),Mi.width=t.width,Mi.height=t.height;const n=Mi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Mi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=dr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Tn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Tn(e[n]/255)*255):e[n]=Tn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let rh=0;class vc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:rh++}),this.uuid=En(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Rr(s[o].image)):r.push(Rr(s[o]))}else r=Rr(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Rr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?sh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let oh=0;class we extends gi{constructor(t=we.DEFAULT_IMAGE,e=we.DEFAULT_MAPPING,n=Hn,s=Hn,r=ze,o=ci,a=Be,l=An,u=we.DEFAULT_ANISOTROPY,c=Mn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:oh++}),this.uuid=En(),this.name="",this.source=new vc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=u,this.format=a,this.internalFormat=null,this.type=l,this.offset=new vt(0,0),this.repeat=new vt(1,1),this.center=new vt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==sc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case To:t.x=t.x-Math.floor(t.x);break;case Hn:t.x=t.x<0?0:1;break;case bo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case To:t.y=t.y-Math.floor(t.y);break;case Hn:t.y=t.y<0?0:1;break;case bo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}we.DEFAULT_IMAGE=null;we.DEFAULT_MAPPING=sc;we.DEFAULT_ANISOTROPY=1;class ae{constructor(t=0,e=0,n=0,s=1){ae.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,u=l[0],c=l[4],h=l[8],f=l[1],d=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(c-f)<.01&&Math.abs(h-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(c+f)<.1&&Math.abs(h+v)<.1&&Math.abs(g+m)<.1&&Math.abs(u+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const S=(u+1)/2,_=(d+1)/2,N=(p+1)/2,R=(c+f)/4,C=(h+v)/4,I=(g+m)/4;return S>_&&S>N?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=R/n,r=C/n):_>N?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=R/s,r=I/s):N<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(N),n=C/r,s=I/r),this.set(n,s,r,e),this}let T=Math.sqrt((m-g)*(m-g)+(h-v)*(h-v)+(f-c)*(f-c));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(h-v)/T,this.z=(f-c)/T,this.w=Math.acos((u+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ah extends gi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ae(0,0,t,e),this.scissorTest=!1,this.viewport=new ae(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ze,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new we(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new vc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class wn extends ah{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class xc extends we{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ue,this.minFilter=Ue,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class lh extends we{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ue,this.minFilter=Ue,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Rn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],u=n[s+1],c=n[s+2],h=n[s+3];const f=r[o+0],d=r[o+1],g=r[o+2],v=r[o+3];if(a===0){t[e+0]=l,t[e+1]=u,t[e+2]=c,t[e+3]=h;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=v;return}if(h!==v||l!==f||u!==d||c!==g){let m=1-a;const p=l*f+u*d+c*g+h*v,T=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){const N=Math.sqrt(S),R=Math.atan2(N,p*T);m=Math.sin(m*R)/N,a=Math.sin(a*R)/N}const _=a*T;if(l=l*m+f*_,u=u*m+d*_,c=c*m+g*_,h=h*m+v*_,m===1-a){const N=1/Math.sqrt(l*l+u*u+c*c+h*h);l*=N,u*=N,c*=N,h*=N}}t[e]=l,t[e+1]=u,t[e+2]=c,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],u=n[s+2],c=n[s+3],h=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+c*h+l*d-u*f,t[e+1]=l*g+c*f+u*h-a*d,t[e+2]=u*g+c*d+a*f-l*h,t[e+3]=c*g-a*h-l*f-u*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,u=a(n/2),c=a(s/2),h=a(r/2),f=l(n/2),d=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=f*c*h+u*d*g,this._y=u*d*h-f*c*g,this._z=u*c*g+f*d*h,this._w=u*c*h-f*d*g;break;case"YXZ":this._x=f*c*h+u*d*g,this._y=u*d*h-f*c*g,this._z=u*c*g-f*d*h,this._w=u*c*h+f*d*g;break;case"ZXY":this._x=f*c*h-u*d*g,this._y=u*d*h+f*c*g,this._z=u*c*g+f*d*h,this._w=u*c*h-f*d*g;break;case"ZYX":this._x=f*c*h-u*d*g,this._y=u*d*h+f*c*g,this._z=u*c*g-f*d*h,this._w=u*c*h+f*d*g;break;case"YZX":this._x=f*c*h+u*d*g,this._y=u*d*h+f*c*g,this._z=u*c*g-f*d*h,this._w=u*c*h-f*d*g;break;case"XZY":this._x=f*c*h-u*d*g,this._y=u*d*h-f*c*g,this._z=u*c*g+f*d*h,this._w=u*c*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],u=e[2],c=e[6],h=e[10],f=n+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(c-l)*d,this._y=(r-u)*d,this._z=(o-s)*d}else if(n>a&&n>h){const d=2*Math.sqrt(1+n-a-h);this._w=(c-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+u)/d}else if(a>h){const d=2*Math.sqrt(1+a-n-h);this._w=(r-u)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+c)/d}else{const d=2*Math.sqrt(1+h-n-a);this._w=(o-s)/d,this._x=(r+u)/d,this._y=(l+c)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Me(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,u=e._z,c=e._w;return this._x=n*c+o*a+s*u-r*l,this._y=s*c+o*l+r*a-n*u,this._z=r*c+o*u+n*l-s*a,this._w=o*c-n*a-s*l-r*u,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const u=Math.sqrt(l),c=Math.atan2(u,a),h=Math.sin((1-e)*c)/u,f=Math.sin(e*c)/u;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=s*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(t=0,e=0,n=0){U.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion($a.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion($a.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,u=2*(o*s-a*n),c=2*(a*e-r*s),h=2*(r*n-o*e);return this.x=e+l*u+o*h-a*c,this.y=n+l*c+a*u-r*h,this.z=s+l*h+r*c-o*u,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Cr.copy(this).projectOnVector(t),this.sub(Cr)}reflect(t){return this.sub(Cr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Me(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Cr=new U,$a=new Rn;class _i{constructor(t=new U(1/0,1/0,1/0),e=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Je.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Je.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Je.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Je):Je.fromBufferAttribute(r,o),Je.applyMatrix4(t.matrixWorld),this.expandByPoint(Je);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),As.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),As.copy(n.boundingBox)),As.applyMatrix4(t.matrixWorld),this.union(As)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Je),Je.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ns),ws.subVectors(this.max,ns),Si.subVectors(t.a,ns),yi.subVectors(t.b,ns),Ei.subVectors(t.c,ns),Un.subVectors(yi,Si),In.subVectors(Ei,yi),Jn.subVectors(Si,Ei);let e=[0,-Un.z,Un.y,0,-In.z,In.y,0,-Jn.z,Jn.y,Un.z,0,-Un.x,In.z,0,-In.x,Jn.z,0,-Jn.x,-Un.y,Un.x,0,-In.y,In.x,0,-Jn.y,Jn.x,0];return!Pr(e,Si,yi,Ei,ws)||(e=[1,0,0,0,1,0,0,0,1],!Pr(e,Si,yi,Ei,ws))?!1:(Rs.crossVectors(Un,In),e=[Rs.x,Rs.y,Rs.z],Pr(e,Si,yi,Ei,ws))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Je).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Je).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(dn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const dn=[new U,new U,new U,new U,new U,new U,new U,new U],Je=new U,As=new _i,Si=new U,yi=new U,Ei=new U,Un=new U,In=new U,Jn=new U,ns=new U,ws=new U,Rs=new U,Qn=new U;function Pr(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Qn.fromArray(i,r);const a=s.x*Math.abs(Qn.x)+s.y*Math.abs(Qn.y)+s.z*Math.abs(Qn.z),l=t.dot(Qn),u=e.dot(Qn),c=n.dot(Qn);if(Math.max(-Math.max(l,u,c),Math.min(l,u,c))>a)return!1}return!0}const ch=new _i,is=new U,Dr=new U;class Ss{constructor(t=new U,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):ch.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;is.subVectors(t,this.center);const e=is.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(is,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Dr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(is.copy(t.center).add(Dr)),this.expandByPoint(is.copy(t.center).sub(Dr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const pn=new U,Lr=new U,Cs=new U,Nn=new U,Ur=new U,Ps=new U,Ir=new U;class _a{constructor(t=new U,e=new U(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,pn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=pn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(pn.copy(this.origin).addScaledVector(this.direction,e),pn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Lr.copy(t).add(e).multiplyScalar(.5),Cs.copy(e).sub(t).normalize(),Nn.copy(this.origin).sub(Lr);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Cs),a=Nn.dot(this.direction),l=-Nn.dot(Cs),u=Nn.lengthSq(),c=Math.abs(1-o*o);let h,f,d,g;if(c>0)if(h=o*l-a,f=o*a-l,g=r*c,h>=0)if(f>=-g)if(f<=g){const v=1/c;h*=v,f*=v,d=h*(h+o*f+2*a)+f*(o*h+f+2*l)+u}else f=r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+u;else f=-r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+u;else f<=-g?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+u):f<=g?(h=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+u):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+u);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+u;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Lr).addScaledVector(Cs,f),d}intersectSphere(t,e){pn.subVectors(t.center,this.origin);const n=pn.dot(this.direction),s=pn.dot(pn)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const u=1/this.direction.x,c=1/this.direction.y,h=1/this.direction.z,f=this.origin;return u>=0?(n=(t.min.x-f.x)*u,s=(t.max.x-f.x)*u):(n=(t.max.x-f.x)*u,s=(t.min.x-f.x)*u),c>=0?(r=(t.min.y-f.y)*c,o=(t.max.y-f.y)*c):(r=(t.max.y-f.y)*c,o=(t.min.y-f.y)*c),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(t.min.z-f.z)*h,l=(t.max.z-f.z)*h):(a=(t.max.z-f.z)*h,l=(t.min.z-f.z)*h),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,pn)!==null}intersectTriangle(t,e,n,s,r){Ur.subVectors(e,t),Ps.subVectors(n,t),Ir.crossVectors(Ur,Ps);let o=this.direction.dot(Ir),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Nn.subVectors(this.origin,t);const l=a*this.direction.dot(Ps.crossVectors(Nn,Ps));if(l<0)return null;const u=a*this.direction.dot(Ur.cross(Nn));if(u<0||l+u>o)return null;const c=-a*Nn.dot(Ir);return c<0?null:this.at(c/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Yt{constructor(t,e,n,s,r,o,a,l,u,c,h,f,d,g,v,m){Yt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,u,c,h,f,d,g,v,m)}set(t,e,n,s,r,o,a,l,u,c,h,f,d,g,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=u,p[6]=c,p[10]=h,p[14]=f,p[3]=d,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Yt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Ti.setFromMatrixColumn(t,0).length(),r=1/Ti.setFromMatrixColumn(t,1).length(),o=1/Ti.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),u=Math.sin(s),c=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){const f=o*c,d=o*h,g=a*c,v=a*h;e[0]=l*c,e[4]=-l*h,e[8]=u,e[1]=d+g*u,e[5]=f-v*u,e[9]=-a*l,e[2]=v-f*u,e[6]=g+d*u,e[10]=o*l}else if(t.order==="YXZ"){const f=l*c,d=l*h,g=u*c,v=u*h;e[0]=f+v*a,e[4]=g*a-d,e[8]=o*u,e[1]=o*h,e[5]=o*c,e[9]=-a,e[2]=d*a-g,e[6]=v+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*c,d=l*h,g=u*c,v=u*h;e[0]=f-v*a,e[4]=-o*h,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*c,e[9]=v-f*a,e[2]=-o*u,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*c,d=o*h,g=a*c,v=a*h;e[0]=l*c,e[4]=g*u-d,e[8]=f*u+v,e[1]=l*h,e[5]=v*u+f,e[9]=d*u-g,e[2]=-u,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,d=o*u,g=a*l,v=a*u;e[0]=l*c,e[4]=v-f*h,e[8]=g*h+d,e[1]=h,e[5]=o*c,e[9]=-a*c,e[2]=-u*c,e[6]=d*h+g,e[10]=f-v*h}else if(t.order==="XZY"){const f=o*l,d=o*u,g=a*l,v=a*u;e[0]=l*c,e[4]=-h,e[8]=u*c,e[1]=f*h+v,e[5]=o*c,e[9]=d*h-g,e[2]=g*h-d,e[6]=a*c,e[10]=v*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(uh,t,hh)}lookAt(t,e,n){const s=this.elements;return He.subVectors(t,e),He.lengthSq()===0&&(He.z=1),He.normalize(),Fn.crossVectors(n,He),Fn.lengthSq()===0&&(Math.abs(n.z)===1?He.x+=1e-4:He.z+=1e-4,He.normalize(),Fn.crossVectors(n,He)),Fn.normalize(),Ds.crossVectors(He,Fn),s[0]=Fn.x,s[4]=Ds.x,s[8]=He.x,s[1]=Fn.y,s[5]=Ds.y,s[9]=He.y,s[2]=Fn.z,s[6]=Ds.z,s[10]=He.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],u=n[12],c=n[1],h=n[5],f=n[9],d=n[13],g=n[2],v=n[6],m=n[10],p=n[14],T=n[3],S=n[7],_=n[11],N=n[15],R=s[0],C=s[4],I=s[8],E=s[12],M=s[1],P=s[5],H=s[9],w=s[13],L=s[2],k=s[6],G=s[10],b=s[14],D=s[3],Y=s[7],tt=s[11],ot=s[15];return r[0]=o*R+a*M+l*L+u*D,r[4]=o*C+a*P+l*k+u*Y,r[8]=o*I+a*H+l*G+u*tt,r[12]=o*E+a*w+l*b+u*ot,r[1]=c*R+h*M+f*L+d*D,r[5]=c*C+h*P+f*k+d*Y,r[9]=c*I+h*H+f*G+d*tt,r[13]=c*E+h*w+f*b+d*ot,r[2]=g*R+v*M+m*L+p*D,r[6]=g*C+v*P+m*k+p*Y,r[10]=g*I+v*H+m*G+p*tt,r[14]=g*E+v*w+m*b+p*ot,r[3]=T*R+S*M+_*L+N*D,r[7]=T*C+S*P+_*k+N*Y,r[11]=T*I+S*H+_*G+N*tt,r[15]=T*E+S*w+_*b+N*ot,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],u=t[13],c=t[2],h=t[6],f=t[10],d=t[14],g=t[3],v=t[7],m=t[11],p=t[15];return g*(+r*l*h-s*u*h-r*a*f+n*u*f+s*a*d-n*l*d)+v*(+e*l*d-e*u*f+r*o*f-s*o*d+s*u*c-r*l*c)+m*(+e*u*h-e*a*d-r*o*h+n*o*d+r*a*c-n*u*c)+p*(-s*a*c-e*l*h+e*a*f+s*o*h-n*o*f+n*l*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],u=t[7],c=t[8],h=t[9],f=t[10],d=t[11],g=t[12],v=t[13],m=t[14],p=t[15],T=h*m*u-v*f*u+v*l*d-a*m*d-h*l*p+a*f*p,S=g*f*u-c*m*u-g*l*d+o*m*d+c*l*p-o*f*p,_=c*v*u-g*h*u+g*a*d-o*v*d-c*a*p+o*h*p,N=g*h*l-c*v*l-g*a*f+o*v*f+c*a*m-o*h*m,R=e*T+n*S+s*_+r*N;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/R;return t[0]=T*C,t[1]=(v*f*r-h*m*r-v*s*d+n*m*d+h*s*p-n*f*p)*C,t[2]=(a*m*r-v*l*r+v*s*u-n*m*u-a*s*p+n*l*p)*C,t[3]=(h*l*r-a*f*r-h*s*u+n*f*u+a*s*d-n*l*d)*C,t[4]=S*C,t[5]=(c*m*r-g*f*r+g*s*d-e*m*d-c*s*p+e*f*p)*C,t[6]=(g*l*r-o*m*r-g*s*u+e*m*u+o*s*p-e*l*p)*C,t[7]=(o*f*r-c*l*r+c*s*u-e*f*u-o*s*d+e*l*d)*C,t[8]=_*C,t[9]=(g*h*r-c*v*r-g*n*d+e*v*d+c*n*p-e*h*p)*C,t[10]=(o*v*r-g*a*r+g*n*u-e*v*u-o*n*p+e*a*p)*C,t[11]=(c*a*r-o*h*r-c*n*u+e*h*u+o*n*d-e*a*d)*C,t[12]=N*C,t[13]=(c*v*s-g*h*s+g*n*f-e*v*f-c*n*m+e*h*m)*C,t[14]=(g*a*s-o*v*s-g*n*l+e*v*l+o*n*m-e*a*m)*C,t[15]=(o*h*s-c*a*s+c*n*l-e*h*l-o*n*f+e*a*f)*C,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,u=r*o,c=r*a;return this.set(u*o+n,u*a-s*l,u*l+s*a,0,u*a+s*l,c*a+n,c*l-s*o,0,u*l-s*a,c*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,u=r+r,c=o+o,h=a+a,f=r*u,d=r*c,g=r*h,v=o*c,m=o*h,p=a*h,T=l*u,S=l*c,_=l*h,N=n.x,R=n.y,C=n.z;return s[0]=(1-(v+p))*N,s[1]=(d+_)*N,s[2]=(g-S)*N,s[3]=0,s[4]=(d-_)*R,s[5]=(1-(f+p))*R,s[6]=(m+T)*R,s[7]=0,s[8]=(g+S)*C,s[9]=(m-T)*C,s[10]=(1-(f+v))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Ti.set(s[0],s[1],s[2]).length();const o=Ti.set(s[4],s[5],s[6]).length(),a=Ti.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Qe.copy(this);const u=1/r,c=1/o,h=1/a;return Qe.elements[0]*=u,Qe.elements[1]*=u,Qe.elements[2]*=u,Qe.elements[4]*=c,Qe.elements[5]*=c,Qe.elements[6]*=c,Qe.elements[8]*=h,Qe.elements[9]*=h,Qe.elements[10]*=h,e.setFromRotationMatrix(Qe),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Sn){const l=this.elements,u=2*r/(e-t),c=2*r/(n-s),h=(e+t)/(e-t),f=(n+s)/(n-s);let d,g;if(a===Sn)d=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===fr)d=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=c,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Sn){const l=this.elements,u=1/(e-t),c=1/(n-s),h=1/(o-r),f=(e+t)*u,d=(n+s)*c;let g,v;if(a===Sn)g=(o+r)*h,v=-2*h;else if(a===fr)g=r*h,v=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*u,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*c,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ti=new U,Qe=new Yt,uh=new U(0,0,0),hh=new U(1,1,1),Fn=new U,Ds=new U,He=new U,Ja=new Yt,Qa=new Rn;class un{constructor(t=0,e=0,n=0,s=un.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],u=s[5],c=s[9],h=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Me(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-c,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,u),this._z=0);break;case"YXZ":this._x=Math.asin(-Me(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Me(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,u)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Me(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,u));break;case"YZX":this._z=Math.asin(Me(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,u),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Me(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,u),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-c,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ja.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ja,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Qa.setFromEuler(this),this.setFromQuaternion(Qa,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}un.DEFAULT_ORDER="XYZ";class va{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let fh=0;const tl=new U,bi=new Rn,mn=new Yt,Ls=new U,ss=new U,dh=new U,ph=new Rn,el=new U(1,0,0),nl=new U(0,1,0),il=new U(0,0,1),sl={type:"added"},mh={type:"removed"},Ai={type:"childadded",child:null},Nr={type:"childremoved",child:null};class le extends gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fh++}),this.uuid=En(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=le.DEFAULT_UP.clone();const t=new U,e=new un,n=new Rn,s=new U(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Yt},normalMatrix:{value:new Nt}}),this.matrix=new Yt,this.matrixWorld=new Yt,this.matrixAutoUpdate=le.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=le.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new va,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return bi.setFromAxisAngle(t,e),this.quaternion.multiply(bi),this}rotateOnWorldAxis(t,e){return bi.setFromAxisAngle(t,e),this.quaternion.premultiply(bi),this}rotateX(t){return this.rotateOnAxis(el,t)}rotateY(t){return this.rotateOnAxis(nl,t)}rotateZ(t){return this.rotateOnAxis(il,t)}translateOnAxis(t,e){return tl.copy(t).applyQuaternion(this.quaternion),this.position.add(tl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(el,t)}translateY(t){return this.translateOnAxis(nl,t)}translateZ(t){return this.translateOnAxis(il,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(mn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ls.copy(t):Ls.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ss.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mn.lookAt(ss,Ls,this.up):mn.lookAt(Ls,ss,this.up),this.quaternion.setFromRotationMatrix(mn),s&&(mn.extractRotation(s.matrixWorld),bi.setFromRotationMatrix(mn),this.quaternion.premultiply(bi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(sl),Ai.child=t,this.dispatchEvent(Ai),Ai.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(mh),Nr.child=t,this.dispatchEvent(Nr),Nr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),mn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),mn.multiply(t.parent.matrixWorld)),t.applyMatrix4(mn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(sl),Ai.child=t,this.dispatchEvent(Ai),Ai.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ss,t,dh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ss,ph,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let u=0,c=l.length;u<c;u++){const h=l[u];r(t.shapes,h)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,u=this.material.length;l<u;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),u=o(t.textures),c=o(t.images),h=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),u.length>0&&(n.textures=u),c.length>0&&(n.images=c),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const u in a){const c=a[u];delete c.metadata,l.push(c)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}le.DEFAULT_UP=new U(0,1,0);le.DEFAULT_MATRIX_AUTO_UPDATE=!0;le.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const tn=new U,gn=new U,Fr=new U,_n=new U,wi=new U,Ri=new U,rl=new U,Or=new U,zr=new U,Br=new U,kr=new ae,Hr=new ae,Gr=new ae;class Ze{constructor(t=new U,e=new U,n=new U){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),tn.subVectors(t,e),s.cross(tn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){tn.subVectors(s,e),gn.subVectors(n,e),Fr.subVectors(t,e);const o=tn.dot(tn),a=tn.dot(gn),l=tn.dot(Fr),u=gn.dot(gn),c=gn.dot(Fr),h=o*u-a*a;if(h===0)return r.set(0,0,0),null;const f=1/h,d=(u*l-a*c)*f,g=(o*c-a*l)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,_n)===null?!1:_n.x>=0&&_n.y>=0&&_n.x+_n.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,_n)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,_n.x),l.addScaledVector(o,_n.y),l.addScaledVector(a,_n.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return kr.setScalar(0),Hr.setScalar(0),Gr.setScalar(0),kr.fromBufferAttribute(t,e),Hr.fromBufferAttribute(t,n),Gr.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(kr,r.x),o.addScaledVector(Hr,r.y),o.addScaledVector(Gr,r.z),o}static isFrontFacing(t,e,n,s){return tn.subVectors(n,e),gn.subVectors(t,e),tn.cross(gn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return tn.subVectors(this.c,this.b),gn.subVectors(this.a,this.b),tn.cross(gn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ze.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ze.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Ze.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Ze.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ze.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;wi.subVectors(s,n),Ri.subVectors(r,n),Or.subVectors(t,n);const l=wi.dot(Or),u=Ri.dot(Or);if(l<=0&&u<=0)return e.copy(n);zr.subVectors(t,s);const c=wi.dot(zr),h=Ri.dot(zr);if(c>=0&&h<=c)return e.copy(s);const f=l*h-c*u;if(f<=0&&l>=0&&c<=0)return o=l/(l-c),e.copy(n).addScaledVector(wi,o);Br.subVectors(t,r);const d=wi.dot(Br),g=Ri.dot(Br);if(g>=0&&d<=g)return e.copy(r);const v=d*u-l*g;if(v<=0&&u>=0&&g<=0)return a=u/(u-g),e.copy(n).addScaledVector(Ri,a);const m=c*g-d*h;if(m<=0&&h-c>=0&&d-g>=0)return rl.subVectors(r,s),a=(h-c)/(h-c+(d-g)),e.copy(s).addScaledVector(rl,a);const p=1/(m+v+f);return o=v*p,a=f*p,e.copy(n).addScaledVector(wi,o).addScaledVector(Ri,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Mc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},On={h:0,s:0,l:0},Us={h:0,s:0,l:0};function Vr(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class st{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Oe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Wt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=Wt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Wt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=Wt.workingColorSpace){if(t=ga(t,1),e=Me(e,0,1),n=Me(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Vr(o,r,t+1/3),this.g=Vr(o,r,t),this.b=Vr(o,r,t-1/3)}return Wt.toWorkingColorSpace(this,s),this}setStyle(t,e=Oe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Oe){const n=Mc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Tn(t.r),this.g=Tn(t.g),this.b=Tn(t.b),this}copyLinearToSRGB(t){return this.r=Gi(t.r),this.g=Gi(t.g),this.b=Gi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Oe){return Wt.fromWorkingColorSpace(Ae.copy(this),t),Math.round(Me(Ae.r*255,0,255))*65536+Math.round(Me(Ae.g*255,0,255))*256+Math.round(Me(Ae.b*255,0,255))}getHexString(t=Oe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Wt.workingColorSpace){Wt.fromWorkingColorSpace(Ae.copy(this),e);const n=Ae.r,s=Ae.g,r=Ae.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,u;const c=(a+o)/2;if(a===o)l=0,u=0;else{const h=o-a;switch(u=c<=.5?h/(o+a):h/(2-o-a),o){case n:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-n)/h+2;break;case r:l=(n-s)/h+4;break}l/=6}return t.h=l,t.s=u,t.l=c,t}getRGB(t,e=Wt.workingColorSpace){return Wt.fromWorkingColorSpace(Ae.copy(this),e),t.r=Ae.r,t.g=Ae.g,t.b=Ae.b,t}getStyle(t=Oe){Wt.fromWorkingColorSpace(Ae.copy(this),t);const e=Ae.r,n=Ae.g,s=Ae.b;return t!==Oe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(On),this.setHSL(On.h+t,On.s+e,On.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(On),t.getHSL(Us);const n=_s(On.h,Us.h,e),s=_s(On.s,Us.s,e),r=_s(On.l,Us.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ae=new st;st.NAMES=Mc;let gh=0;class Ki extends gi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:gh++}),this.uuid=En(),this.name="",this.blending=Hi,this.side=Xn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fo,this.blendDst=po,this.blendEquation=oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new st(0,0,0),this.blendAlpha=0,this.depthFunc=Vi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ga,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xi,this.stencilZFail=xi,this.stencilZPass=xi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Hi&&(n.blending=this.blending),this.side!==Xn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==fo&&(n.blendSrc=this.blendSrc),this.blendDst!==po&&(n.blendDst=this.blendDst),this.blendEquation!==oi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Vi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ga&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==xi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==xi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==xi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Sc extends Ki{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new st(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.combine=nc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const de=new U,Is=new vt;class pe{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Jo,this.updateRanges=[],this.gpuType=nn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Is.fromBufferAttribute(this,e),Is.applyMatrix3(t),this.setXY(e,Is.x,Is.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)de.fromBufferAttribute(this,e),de.applyMatrix3(t),this.setXYZ(e,de.x,de.y,de.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)de.fromBufferAttribute(this,e),de.applyMatrix4(t),this.setXYZ(e,de.x,de.y,de.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)de.fromBufferAttribute(this,e),de.applyNormalMatrix(t),this.setXYZ(e,de.x,de.y,de.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)de.fromBufferAttribute(this,e),de.transformDirection(t),this.setXYZ(e,de.x,de.y,de.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=en(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=$t(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=en(e,this.array)),e}setX(t,e){return this.normalized&&(e=$t(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=en(e,this.array)),e}setY(t,e){return this.normalized&&(e=$t(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=en(e,this.array)),e}setZ(t,e){return this.normalized&&(e=$t(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=en(e,this.array)),e}setW(t,e){return this.normalized&&(e=$t(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=$t(e,this.array),n=$t(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=$t(e,this.array),n=$t(n,this.array),s=$t(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=$t(e,this.array),n=$t(n,this.array),s=$t(s,this.array),r=$t(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Jo&&(t.usage=this.usage),t}}class yc extends pe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Ec extends pe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class re extends pe{constructor(t,e,n){super(new Float32Array(t),e,n)}}let _h=0;const je=new Yt,Wr=new le,Ci=new U,Ge=new _i,rs=new _i,xe=new U;class Re extends gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:_h++}),this.uuid=En(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(_c(t)?Ec:yc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Nt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return je.makeRotationFromQuaternion(t),this.applyMatrix4(je),this}rotateX(t){return je.makeRotationX(t),this.applyMatrix4(je),this}rotateY(t){return je.makeRotationY(t),this.applyMatrix4(je),this}rotateZ(t){return je.makeRotationZ(t),this.applyMatrix4(je),this}translate(t,e,n){return je.makeTranslation(t,e,n),this.applyMatrix4(je),this}scale(t,e,n){return je.makeScale(t,e,n),this.applyMatrix4(je),this}lookAt(t){return Wr.lookAt(t),Wr.updateMatrix(),this.applyMatrix4(Wr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ci).negate(),this.translate(Ci.x,Ci.y,Ci.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new re(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new _i);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Ge.setFromBufferAttribute(r),this.morphTargetsRelative?(xe.addVectors(this.boundingBox.min,Ge.min),this.boundingBox.expandByPoint(xe),xe.addVectors(this.boundingBox.max,Ge.max),this.boundingBox.expandByPoint(xe)):(this.boundingBox.expandByPoint(Ge.min),this.boundingBox.expandByPoint(Ge.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ss);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){const n=this.boundingSphere.center;if(Ge.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];rs.setFromBufferAttribute(a),this.morphTargetsRelative?(xe.addVectors(Ge.min,rs.min),Ge.expandByPoint(xe),xe.addVectors(Ge.max,rs.max),Ge.expandByPoint(xe)):(Ge.expandByPoint(rs.min),Ge.expandByPoint(rs.max))}Ge.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)xe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(xe));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let u=0,c=a.count;u<c;u++)xe.fromBufferAttribute(a,u),l&&(Ci.fromBufferAttribute(t,u),xe.add(Ci)),s=Math.max(s,n.distanceToSquared(xe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new pe(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let I=0;I<n.count;I++)a[I]=new U,l[I]=new U;const u=new U,c=new U,h=new U,f=new vt,d=new vt,g=new vt,v=new U,m=new U;function p(I,E,M){u.fromBufferAttribute(n,I),c.fromBufferAttribute(n,E),h.fromBufferAttribute(n,M),f.fromBufferAttribute(r,I),d.fromBufferAttribute(r,E),g.fromBufferAttribute(r,M),c.sub(u),h.sub(u),d.sub(f),g.sub(f);const P=1/(d.x*g.y-g.x*d.y);isFinite(P)&&(v.copy(c).multiplyScalar(g.y).addScaledVector(h,-d.y).multiplyScalar(P),m.copy(h).multiplyScalar(d.x).addScaledVector(c,-g.x).multiplyScalar(P),a[I].add(v),a[E].add(v),a[M].add(v),l[I].add(m),l[E].add(m),l[M].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let I=0,E=T.length;I<E;++I){const M=T[I],P=M.start,H=M.count;for(let w=P,L=P+H;w<L;w+=3)p(t.getX(w+0),t.getX(w+1),t.getX(w+2))}const S=new U,_=new U,N=new U,R=new U;function C(I){N.fromBufferAttribute(s,I),R.copy(N);const E=a[I];S.copy(E),S.sub(N.multiplyScalar(N.dot(E))).normalize(),_.crossVectors(R,E);const P=_.dot(l[I])<0?-1:1;o.setXYZW(I,S.x,S.y,S.z,P)}for(let I=0,E=T.length;I<E;++I){const M=T[I],P=M.start,H=M.count;for(let w=P,L=P+H;w<L;w+=3)C(t.getX(w+0)),C(t.getX(w+1)),C(t.getX(w+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new pe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new U,r=new U,o=new U,a=new U,l=new U,u=new U,c=new U,h=new U;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),v=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,m),c.subVectors(o,r),h.subVectors(s,r),c.cross(h),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),u.fromBufferAttribute(n,m),a.add(c),l.add(c),u.add(c),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,u.x,u.y,u.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),c.subVectors(o,r),h.subVectors(s,r),c.cross(h),n.setXYZ(f+0,c.x,c.y,c.z),n.setXYZ(f+1,c.x,c.y,c.z),n.setXYZ(f+2,c.x,c.y,c.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)xe.fromBufferAttribute(t,e),xe.normalize(),t.setXYZ(e,xe.x,xe.y,xe.z)}toNonIndexed(){function t(a,l){const u=a.array,c=a.itemSize,h=a.normalized,f=new u.constructor(l.length*c);let d=0,g=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?d=l[v]*a.data.stride+a.offset:d=l[v]*c;for(let p=0;p<c;p++)f[g++]=u[d++]}return new pe(f,c,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Re,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],u=t(l,n);e.setAttribute(a,u)}const r=this.morphAttributes;for(const a in r){const l=[],u=r[a];for(let c=0,h=u.length;c<h;c++){const f=u[c],d=t(f,n);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const u=o[a];e.addGroup(u.start,u.count,u.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const u in l)l[u]!==void 0&&(t[u]=l[u]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const u=n[l];t.data.attributes[l]=u.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const u=this.morphAttributes[l],c=[];for(let h=0,f=u.length;h<f;h++){const d=u[h];c.push(d.toJSON(t.data))}c.length>0&&(s[l]=c,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const u in s){const c=s[u];this.setAttribute(u,c.clone(e))}const r=t.morphAttributes;for(const u in r){const c=[],h=r[u];for(let f=0,d=h.length;f<d;f++)c.push(h[f].clone(e));this.morphAttributes[u]=c}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let u=0,c=o.length;u<c;u++){const h=o[u];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ol=new Yt,ti=new _a,Ns=new Ss,al=new U,Fs=new U,Os=new U,zs=new U,Xr=new U,Bs=new U,ll=new U,ks=new U;class Zt extends le{constructor(t=new Re,e=new Sc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Bs.set(0,0,0);for(let l=0,u=r.length;l<u;l++){const c=a[l],h=r[l];c!==0&&(Xr.fromBufferAttribute(h,t),o?Bs.addScaledVector(Xr,c):Bs.addScaledVector(Xr.sub(e),c))}e.add(Bs)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ns.copy(n.boundingSphere),Ns.applyMatrix4(r),ti.copy(t.ray).recast(t.near),!(Ns.containsPoint(ti.origin)===!1&&(ti.intersectSphere(Ns,al)===null||ti.origin.distanceToSquared(al)>(t.far-t.near)**2))&&(ol.copy(r).invert(),ti.copy(t.ray).applyMatrix4(ol),!(n.boundingBox!==null&&ti.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ti)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,u=r.attributes.uv,c=r.attributes.uv1,h=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){const m=f[g],p=o[m.materialIndex],T=Math.max(m.start,d.start),S=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let _=T,N=S;_<N;_+=3){const R=a.getX(_),C=a.getX(_+1),I=a.getX(_+2);s=Hs(this,p,t,n,u,c,h,R,C,I),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const T=a.getX(m),S=a.getX(m+1),_=a.getX(m+2);s=Hs(this,o,t,n,u,c,h,T,S,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){const m=f[g],p=o[m.materialIndex],T=Math.max(m.start,d.start),S=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let _=T,N=S;_<N;_+=3){const R=_,C=_+1,I=_+2;s=Hs(this,p,t,n,u,c,h,R,C,I),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const T=m,S=m+1,_=m+2;s=Hs(this,o,t,n,u,c,h,T,S,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function vh(i,t,e,n,s,r,o,a){let l;if(t.side===Le?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===Xn,a),l===null)return null;ks.copy(a),ks.applyMatrix4(i.matrixWorld);const u=e.ray.origin.distanceTo(ks);return u<e.near||u>e.far?null:{distance:u,point:ks.clone(),object:i}}function Hs(i,t,e,n,s,r,o,a,l,u){i.getVertexPosition(a,Fs),i.getVertexPosition(l,Os),i.getVertexPosition(u,zs);const c=vh(i,t,e,n,Fs,Os,zs,ll);if(c){const h=new U;Ze.getBarycoord(ll,Fs,Os,zs,h),s&&(c.uv=Ze.getInterpolatedAttribute(s,a,l,u,h,new vt)),r&&(c.uv1=Ze.getInterpolatedAttribute(r,a,l,u,h,new vt)),o&&(c.normal=Ze.getInterpolatedAttribute(o,a,l,u,h,new U),c.normal.dot(n.direction)>0&&c.normal.multiplyScalar(-1));const f={a,b:l,c:u,normal:new U,materialIndex:0};Ze.getNormal(Fs,Os,zs,f.normal),c.face=f,c.barycoord=h}return c}class qn extends Re{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],u=[],c=[],h=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new re(u,3)),this.setAttribute("normal",new re(c,3)),this.setAttribute("uv",new re(h,2));function g(v,m,p,T,S,_,N,R,C,I,E){const M=_/C,P=N/I,H=_/2,w=N/2,L=R/2,k=C+1,G=I+1;let b=0,D=0;const Y=new U;for(let tt=0;tt<G;tt++){const ot=tt*P-w;for(let at=0;at<k;at++){const Lt=at*M-H;Y[v]=Lt*T,Y[m]=ot*S,Y[p]=L,u.push(Y.x,Y.y,Y.z),Y[v]=0,Y[m]=0,Y[p]=R>0?1:-1,c.push(Y.x,Y.y,Y.z),h.push(at/C),h.push(1-tt/I),b+=1}}for(let tt=0;tt<I;tt++)for(let ot=0;ot<C;ot++){const at=f+ot+k*tt,Lt=f+ot+k*(tt+1),j=f+(ot+1)+k*(tt+1),J=f+(ot+1)+k*tt;l.push(at,Lt,J),l.push(Lt,j,J),D+=6}a.addGroup(d,D,E),d+=D,f+=b}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ji(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Pe(i){const t={};for(let e=0;e<i.length;e++){const n=ji(i[e]);for(const s in n)t[s]=n[s]}return t}function xh(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Tc(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Wt.workingColorSpace}const Mh={clone:ji,merge:Pe};var Sh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class sn extends Ki{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Sh,this.fragmentShader=yh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ji(t.uniforms),this.uniformsGroups=xh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class bc extends le{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Yt,this.projectionMatrix=new Yt,this.projectionMatrixInverse=new Yt,this.coordinateSystem=Sn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const zn=new U,cl=new vt,ul=new vt;class Ve extends bc{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=xs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(gs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return xs*2*Math.atan(Math.tan(gs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){zn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(zn.x,zn.y).multiplyScalar(-t/zn.z),zn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(zn.x,zn.y).multiplyScalar(-t/zn.z)}getViewSize(t,e){return this.getViewBounds(t,cl,ul),e.subVectors(ul,cl)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(gs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,u=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/u,s*=o.width/l,n*=o.height/u}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Pi=-90,Di=1;class Eh extends le{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ve(Pi,Di,t,e);s.layers=this.layers,this.add(s);const r=new Ve(Pi,Di,t,e);r.layers=this.layers,this.add(r);const o=new Ve(Pi,Di,t,e);o.layers=this.layers,this.add(o);const a=new Ve(Pi,Di,t,e);a.layers=this.layers,this.add(a);const l=new Ve(Pi,Di,t,e);l.layers=this.layers,this.add(l);const u=new Ve(Pi,Di,t,e);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const u of e)this.remove(u);if(t===Sn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===fr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const u of e)this.add(u),u.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,u,c]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,u),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,c),t.setRenderTarget(h,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Ac extends we{constructor(t,e,n,s,r,o,a,l,u,c){t=t!==void 0?t:[],e=e!==void 0?e:Wi,super(t,e,n,s,r,o,a,l,u,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Th extends wn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Ac(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:ze}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new qn(5,5,5),r=new sn({name:"CubemapFromEquirect",uniforms:ji(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Le,blending:Vn});r.uniforms.tEquirect.value=e;const o=new Zt(s,r),a=e.minFilter;return e.minFilter===ci&&(e.minFilter=ze),new Eh(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const Yr=new U,bh=new U,Ah=new Nt;class ln{constructor(t=new U(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Yr.subVectors(n,e).cross(bh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Yr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Ah.getNormalMatrix(t),s=this.coplanarPoint(Yr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ei=new Ss,Gs=new U;class xa{constructor(t=new ln,e=new ln,n=new ln,s=new ln,r=new ln,o=new ln){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Sn){const n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],u=s[4],c=s[5],h=s[6],f=s[7],d=s[8],g=s[9],v=s[10],m=s[11],p=s[12],T=s[13],S=s[14],_=s[15];if(n[0].setComponents(l-r,f-u,m-d,_-p).normalize(),n[1].setComponents(l+r,f+u,m+d,_+p).normalize(),n[2].setComponents(l+o,f+c,m+g,_+T).normalize(),n[3].setComponents(l-o,f-c,m-g,_-T).normalize(),n[4].setComponents(l-a,f-h,m-v,_-S).normalize(),e===Sn)n[5].setComponents(l+a,f+h,m+v,_+S).normalize();else if(e===fr)n[5].setComponents(a,h,v,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ei.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ei.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ei)}intersectsSprite(t){return ei.center.set(0,0,0),ei.radius=.7071067811865476,ei.applyMatrix4(t.matrixWorld),this.intersectsSphere(ei)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Gs.x=s.normal.x>0?t.max.x:t.min.x,Gs.y=s.normal.y>0?t.max.y:t.min.y,Gs.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Gs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function wc(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function wh(i){const t=new WeakMap;function e(a,l){const u=a.array,c=a.usage,h=u.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,u,c),a.onUploadCallback();let d;if(u instanceof Float32Array)d=i.FLOAT;else if(u instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(u instanceof Int16Array)d=i.SHORT;else if(u instanceof Uint32Array)d=i.UNSIGNED_INT;else if(u instanceof Int32Array)d=i.INT;else if(u instanceof Int8Array)d=i.BYTE;else if(u instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:f,type:d,bytesPerElement:u.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,l,u){const c=l.array,h=l.updateRanges;if(i.bindBuffer(u,a),h.length===0)i.bufferSubData(u,0,c);else{h.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<h.length;d++){const g=h[f],v=h[d];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,h[f]=v)}h.length=f+1;for(let d=0,g=h.length;d<g;d++){const v=h[d];i.bufferSubData(u,v.start*c.BYTES_PER_ELEMENT,c,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const c=t.get(a);(!c||c.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const u=t.get(a);if(u===void 0)t.set(a,e(a,l));else if(u.version<a.version){if(u.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(u.buffer,a,l),u.version=a.version}}return{get:s,remove:r,update:o}}class Pn extends Re{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),u=a+1,c=l+1,h=t/a,f=e/l,d=[],g=[],v=[],m=[];for(let p=0;p<c;p++){const T=p*f-o;for(let S=0;S<u;S++){const _=S*h-r;g.push(_,-T,0),v.push(0,0,1),m.push(S/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let T=0;T<a;T++){const S=T+u*p,_=T+u*(p+1),N=T+1+u*(p+1),R=T+1+u*p;d.push(S,_,R),d.push(_,N,R)}this.setIndex(d),this.setAttribute("position",new re(g,3)),this.setAttribute("normal",new re(v,3)),this.setAttribute("uv",new re(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pn(t.width,t.height,t.widthSegments,t.heightSegments)}}var Rh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ch=`#ifdef USE_ALPHAHASH
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
#endif`,Ph=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Dh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Lh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Uh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ih=`#ifdef USE_AOMAP
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
#endif`,Nh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Fh=`#ifdef USE_BATCHING
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
#endif`,Oh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,zh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Bh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,kh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Hh=`#ifdef USE_IRIDESCENCE
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
#endif`,Gh=`#ifdef USE_BUMPMAP
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
#endif`,Vh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Wh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Xh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Yh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,jh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Zh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Kh=`#if defined( USE_COLOR_ALPHA )
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
#endif`,$h=`#define PI 3.141592653589793
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
} // validated`,Jh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Qh=`vec3 transformedNormal = objectNormal;
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
#endif`,tf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ef=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,nf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,sf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,rf="gl_FragColor = linearToOutputTexel( gl_FragColor );",of=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,af=`#ifdef USE_ENVMAP
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
#endif`,lf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,cf=`#ifdef USE_ENVMAP
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
#endif`,uf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hf=`#ifdef USE_ENVMAP
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
#endif`,ff=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,df=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,pf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,mf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gf=`#ifdef USE_GRADIENTMAP
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
}`,_f=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,xf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Mf=`uniform bool receiveShadow;
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
#endif`,Sf=`#ifdef USE_ENVMAP
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
#endif`,yf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ef=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Tf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,bf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Af=`PhysicalMaterial material;
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
#endif`,wf=`struct PhysicalMaterial {
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
}`,Rf=`
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
#endif`,Cf=`#if defined( RE_IndirectDiffuse )
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
#endif`,Pf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Df=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Lf=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Uf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,If=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Nf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ff=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Of=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,zf=`#if defined( USE_POINTS_UV )
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
#endif`,Bf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,kf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Gf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Vf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wf=`#ifdef USE_MORPHTARGETS
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
#endif`,Xf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Yf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,qf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,jf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,$f=`#ifdef USE_NORMALMAP
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
#endif`,Jf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Qf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,td=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ed=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,nd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,id=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,sd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,rd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,od=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ad=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ld=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ud=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,hd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,fd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,dd=`float getShadowMask() {
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
}`,pd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,md=`#ifdef USE_SKINNING
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
#endif`,gd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_d=`#ifdef USE_SKINNING
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
#endif`,vd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Md=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Sd=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,yd=`#ifdef USE_TRANSMISSION
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
#endif`,Ed=`#ifdef USE_TRANSMISSION
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
#endif`,Td=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ad=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Rd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Cd=`uniform sampler2D t2D;
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
}`,Pd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Dd=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ld=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ud=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Id=`#include <common>
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
}`,Nd=`#if DEPTH_PACKING == 3200
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
}`,Fd=`#define DISTANCE
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
}`,Od=`#define DISTANCE
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
}`,zd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Bd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kd=`uniform float scale;
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
}`,Hd=`uniform vec3 diffuse;
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
}`,Gd=`#include <common>
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
}`,Vd=`uniform vec3 diffuse;
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
}`,Wd=`#define LAMBERT
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
}`,Xd=`#define LAMBERT
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
}`,Yd=`#define MATCAP
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
}`,qd=`#define MATCAP
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
}`,jd=`#define NORMAL
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
}`,Zd=`#define NORMAL
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
}`,Kd=`#define PHONG
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
}`,$d=`#define PHONG
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
}`,Jd=`#define STANDARD
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
}`,Qd=`#define STANDARD
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
}`,tp=`#define TOON
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
}`,ep=`#define TOON
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
}`,np=`uniform float size;
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
}`,ip=`uniform vec3 diffuse;
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
}`,sp=`#include <common>
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
}`,rp=`uniform vec3 color;
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
}`,op=`uniform float rotation;
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
}`,ap=`uniform vec3 diffuse;
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
}`,Ot={alphahash_fragment:Rh,alphahash_pars_fragment:Ch,alphamap_fragment:Ph,alphamap_pars_fragment:Dh,alphatest_fragment:Lh,alphatest_pars_fragment:Uh,aomap_fragment:Ih,aomap_pars_fragment:Nh,batching_pars_vertex:Fh,batching_vertex:Oh,begin_vertex:zh,beginnormal_vertex:Bh,bsdfs:kh,iridescence_fragment:Hh,bumpmap_pars_fragment:Gh,clipping_planes_fragment:Vh,clipping_planes_pars_fragment:Wh,clipping_planes_pars_vertex:Xh,clipping_planes_vertex:Yh,color_fragment:qh,color_pars_fragment:jh,color_pars_vertex:Zh,color_vertex:Kh,common:$h,cube_uv_reflection_fragment:Jh,defaultnormal_vertex:Qh,displacementmap_pars_vertex:tf,displacementmap_vertex:ef,emissivemap_fragment:nf,emissivemap_pars_fragment:sf,colorspace_fragment:rf,colorspace_pars_fragment:of,envmap_fragment:af,envmap_common_pars_fragment:lf,envmap_pars_fragment:cf,envmap_pars_vertex:uf,envmap_physical_pars_fragment:Sf,envmap_vertex:hf,fog_vertex:ff,fog_pars_vertex:df,fog_fragment:pf,fog_pars_fragment:mf,gradientmap_pars_fragment:gf,lightmap_pars_fragment:_f,lights_lambert_fragment:vf,lights_lambert_pars_fragment:xf,lights_pars_begin:Mf,lights_toon_fragment:yf,lights_toon_pars_fragment:Ef,lights_phong_fragment:Tf,lights_phong_pars_fragment:bf,lights_physical_fragment:Af,lights_physical_pars_fragment:wf,lights_fragment_begin:Rf,lights_fragment_maps:Cf,lights_fragment_end:Pf,logdepthbuf_fragment:Df,logdepthbuf_pars_fragment:Lf,logdepthbuf_pars_vertex:Uf,logdepthbuf_vertex:If,map_fragment:Nf,map_pars_fragment:Ff,map_particle_fragment:Of,map_particle_pars_fragment:zf,metalnessmap_fragment:Bf,metalnessmap_pars_fragment:kf,morphinstance_vertex:Hf,morphcolor_vertex:Gf,morphnormal_vertex:Vf,morphtarget_pars_vertex:Wf,morphtarget_vertex:Xf,normal_fragment_begin:Yf,normal_fragment_maps:qf,normal_pars_fragment:jf,normal_pars_vertex:Zf,normal_vertex:Kf,normalmap_pars_fragment:$f,clearcoat_normal_fragment_begin:Jf,clearcoat_normal_fragment_maps:Qf,clearcoat_pars_fragment:td,iridescence_pars_fragment:ed,opaque_fragment:nd,packing:id,premultiplied_alpha_fragment:sd,project_vertex:rd,dithering_fragment:od,dithering_pars_fragment:ad,roughnessmap_fragment:ld,roughnessmap_pars_fragment:cd,shadowmap_pars_fragment:ud,shadowmap_pars_vertex:hd,shadowmap_vertex:fd,shadowmask_pars_fragment:dd,skinbase_vertex:pd,skinning_pars_vertex:md,skinning_vertex:gd,skinnormal_vertex:_d,specularmap_fragment:vd,specularmap_pars_fragment:xd,tonemapping_fragment:Md,tonemapping_pars_fragment:Sd,transmission_fragment:yd,transmission_pars_fragment:Ed,uv_pars_fragment:Td,uv_pars_vertex:bd,uv_vertex:Ad,worldpos_vertex:wd,background_vert:Rd,background_frag:Cd,backgroundCube_vert:Pd,backgroundCube_frag:Dd,cube_vert:Ld,cube_frag:Ud,depth_vert:Id,depth_frag:Nd,distanceRGBA_vert:Fd,distanceRGBA_frag:Od,equirect_vert:zd,equirect_frag:Bd,linedashed_vert:kd,linedashed_frag:Hd,meshbasic_vert:Gd,meshbasic_frag:Vd,meshlambert_vert:Wd,meshlambert_frag:Xd,meshmatcap_vert:Yd,meshmatcap_frag:qd,meshnormal_vert:jd,meshnormal_frag:Zd,meshphong_vert:Kd,meshphong_frag:$d,meshphysical_vert:Jd,meshphysical_frag:Qd,meshtoon_vert:tp,meshtoon_frag:ep,points_vert:np,points_frag:ip,shadow_vert:sp,shadow_frag:rp,sprite_vert:op,sprite_frag:ap},rt={common:{diffuse:{value:new st(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Nt}},envmap:{envMap:{value:null},envMapRotation:{value:new Nt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Nt},normalScale:{value:new vt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new st(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new st(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0},uvTransform:{value:new Nt}},sprite:{diffuse:{value:new st(16777215)},opacity:{value:1},center:{value:new vt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}}},cn={basic:{uniforms:Pe([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.fog]),vertexShader:Ot.meshbasic_vert,fragmentShader:Ot.meshbasic_frag},lambert:{uniforms:Pe([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new st(0)}}]),vertexShader:Ot.meshlambert_vert,fragmentShader:Ot.meshlambert_frag},phong:{uniforms:Pe([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new st(0)},specular:{value:new st(1118481)},shininess:{value:30}}]),vertexShader:Ot.meshphong_vert,fragmentShader:Ot.meshphong_frag},standard:{uniforms:Pe([rt.common,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.roughnessmap,rt.metalnessmap,rt.fog,rt.lights,{emissive:{value:new st(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag},toon:{uniforms:Pe([rt.common,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.gradientmap,rt.fog,rt.lights,{emissive:{value:new st(0)}}]),vertexShader:Ot.meshtoon_vert,fragmentShader:Ot.meshtoon_frag},matcap:{uniforms:Pe([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,{matcap:{value:null}}]),vertexShader:Ot.meshmatcap_vert,fragmentShader:Ot.meshmatcap_frag},points:{uniforms:Pe([rt.points,rt.fog]),vertexShader:Ot.points_vert,fragmentShader:Ot.points_frag},dashed:{uniforms:Pe([rt.common,rt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ot.linedashed_vert,fragmentShader:Ot.linedashed_frag},depth:{uniforms:Pe([rt.common,rt.displacementmap]),vertexShader:Ot.depth_vert,fragmentShader:Ot.depth_frag},normal:{uniforms:Pe([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,{opacity:{value:1}}]),vertexShader:Ot.meshnormal_vert,fragmentShader:Ot.meshnormal_frag},sprite:{uniforms:Pe([rt.sprite,rt.fog]),vertexShader:Ot.sprite_vert,fragmentShader:Ot.sprite_frag},background:{uniforms:{uvTransform:{value:new Nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ot.background_vert,fragmentShader:Ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Nt}},vertexShader:Ot.backgroundCube_vert,fragmentShader:Ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ot.cube_vert,fragmentShader:Ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ot.equirect_vert,fragmentShader:Ot.equirect_frag},distanceRGBA:{uniforms:Pe([rt.common,rt.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ot.distanceRGBA_vert,fragmentShader:Ot.distanceRGBA_frag},shadow:{uniforms:Pe([rt.lights,rt.fog,{color:{value:new st(0)},opacity:{value:1}}]),vertexShader:Ot.shadow_vert,fragmentShader:Ot.shadow_frag}};cn.physical={uniforms:Pe([cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Nt},clearcoatNormalScale:{value:new vt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Nt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Nt},sheen:{value:0},sheenColor:{value:new st(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Nt},transmissionSamplerSize:{value:new vt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Nt},attenuationDistance:{value:0},attenuationColor:{value:new st(0)},specularColor:{value:new st(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Nt},anisotropyVector:{value:new vt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Nt}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag};const Vs={r:0,b:0,g:0},ni=new un,lp=new Yt;function cp(i,t,e,n,s,r,o){const a=new st(0);let l=r===!0?0:1,u,c,h=null,f=0,d=null;function g(T){let S=T.isScene===!0?T.background:null;return S&&S.isTexture&&(S=(T.backgroundBlurriness>0?e:t).get(S)),S}function v(T){let S=!1;const _=g(T);_===null?p(a,l):_&&_.isColor&&(p(_,1),S=!0);const N=i.xr.getEnvironmentBlendMode();N==="additive"?n.buffers.color.setClear(0,0,0,1,o):N==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(T,S){const _=g(S);_&&(_.isCubeTexture||_.mapping===vr)?(c===void 0&&(c=new Zt(new qn(1,1,1),new sn({name:"BackgroundCubeMaterial",uniforms:ji(cn.backgroundCube.uniforms),vertexShader:cn.backgroundCube.vertexShader,fragmentShader:cn.backgroundCube.fragmentShader,side:Le,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(N,R,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(c)),ni.copy(S.backgroundRotation),ni.x*=-1,ni.y*=-1,ni.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(ni.y*=-1,ni.z*=-1),c.material.uniforms.envMap.value=_,c.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(lp.makeRotationFromEuler(ni)),c.material.toneMapped=Wt.getTransfer(_.colorSpace)!==Jt,(h!==_||f!==_.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=_,f=_.version,d=i.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(u===void 0&&(u=new Zt(new Pn(2,2),new sn({name:"BackgroundMaterial",uniforms:ji(cn.background.uniforms),vertexShader:cn.background.vertexShader,fragmentShader:cn.background.fragmentShader,side:Xn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(u)),u.material.uniforms.t2D.value=_,u.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,u.material.toneMapped=Wt.getTransfer(_.colorSpace)!==Jt,_.matrixAutoUpdate===!0&&_.updateMatrix(),u.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||f!==_.version||d!==i.toneMapping)&&(u.material.needsUpdate=!0,h=_,f=_.version,d=i.toneMapping),u.layers.enableAll(),T.unshift(u,u.geometry,u.material,0,0,null))}function p(T,S){T.getRGB(Vs,Tc(i)),n.buffers.color.setClear(Vs.r,Vs.g,Vs.b,S,o)}return{getClearColor:function(){return a},setClearColor:function(T,S=1){a.set(T),l=S,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(T){l=T,p(a,l)},render:v,addToRenderList:m}}function up(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(M,P,H,w,L){let k=!1;const G=h(w,H,P);r!==G&&(r=G,u(r.object)),k=d(M,w,H,L),k&&g(M,w,H,L),L!==null&&t.update(L,i.ELEMENT_ARRAY_BUFFER),(k||o)&&(o=!1,_(M,P,H,w),L!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(L).buffer))}function l(){return i.createVertexArray()}function u(M){return i.bindVertexArray(M)}function c(M){return i.deleteVertexArray(M)}function h(M,P,H){const w=H.wireframe===!0;let L=n[M.id];L===void 0&&(L={},n[M.id]=L);let k=L[P.id];k===void 0&&(k={},L[P.id]=k);let G=k[w];return G===void 0&&(G=f(l()),k[w]=G),G}function f(M){const P=[],H=[],w=[];for(let L=0;L<e;L++)P[L]=0,H[L]=0,w[L]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:H,attributeDivisors:w,object:M,attributes:{},index:null}}function d(M,P,H,w){const L=r.attributes,k=P.attributes;let G=0;const b=H.getAttributes();for(const D in b)if(b[D].location>=0){const tt=L[D];let ot=k[D];if(ot===void 0&&(D==="instanceMatrix"&&M.instanceMatrix&&(ot=M.instanceMatrix),D==="instanceColor"&&M.instanceColor&&(ot=M.instanceColor)),tt===void 0||tt.attribute!==ot||ot&&tt.data!==ot.data)return!0;G++}return r.attributesNum!==G||r.index!==w}function g(M,P,H,w){const L={},k=P.attributes;let G=0;const b=H.getAttributes();for(const D in b)if(b[D].location>=0){let tt=k[D];tt===void 0&&(D==="instanceMatrix"&&M.instanceMatrix&&(tt=M.instanceMatrix),D==="instanceColor"&&M.instanceColor&&(tt=M.instanceColor));const ot={};ot.attribute=tt,tt&&tt.data&&(ot.data=tt.data),L[D]=ot,G++}r.attributes=L,r.attributesNum=G,r.index=w}function v(){const M=r.newAttributes;for(let P=0,H=M.length;P<H;P++)M[P]=0}function m(M){p(M,0)}function p(M,P){const H=r.newAttributes,w=r.enabledAttributes,L=r.attributeDivisors;H[M]=1,w[M]===0&&(i.enableVertexAttribArray(M),w[M]=1),L[M]!==P&&(i.vertexAttribDivisor(M,P),L[M]=P)}function T(){const M=r.newAttributes,P=r.enabledAttributes;for(let H=0,w=P.length;H<w;H++)P[H]!==M[H]&&(i.disableVertexAttribArray(H),P[H]=0)}function S(M,P,H,w,L,k,G){G===!0?i.vertexAttribIPointer(M,P,H,L,k):i.vertexAttribPointer(M,P,H,w,L,k)}function _(M,P,H,w){v();const L=w.attributes,k=H.getAttributes(),G=P.defaultAttributeValues;for(const b in k){const D=k[b];if(D.location>=0){let Y=L[b];if(Y===void 0&&(b==="instanceMatrix"&&M.instanceMatrix&&(Y=M.instanceMatrix),b==="instanceColor"&&M.instanceColor&&(Y=M.instanceColor)),Y!==void 0){const tt=Y.normalized,ot=Y.itemSize,at=t.get(Y);if(at===void 0)continue;const Lt=at.buffer,j=at.type,J=at.bytesPerElement,ft=j===i.INT||j===i.UNSIGNED_INT||Y.gpuType===ca;if(Y.isInterleavedBufferAttribute){const it=Y.data,Tt=it.stride,Ct=Y.offset;if(it.isInstancedInterleavedBuffer){for(let zt=0;zt<D.locationSize;zt++)p(D.location+zt,it.meshPerAttribute);M.isInstancedMesh!==!0&&w._maxInstanceCount===void 0&&(w._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let zt=0;zt<D.locationSize;zt++)m(D.location+zt);i.bindBuffer(i.ARRAY_BUFFER,Lt);for(let zt=0;zt<D.locationSize;zt++)S(D.location+zt,ot/D.locationSize,j,tt,Tt*J,(Ct+ot/D.locationSize*zt)*J,ft)}else{if(Y.isInstancedBufferAttribute){for(let it=0;it<D.locationSize;it++)p(D.location+it,Y.meshPerAttribute);M.isInstancedMesh!==!0&&w._maxInstanceCount===void 0&&(w._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let it=0;it<D.locationSize;it++)m(D.location+it);i.bindBuffer(i.ARRAY_BUFFER,Lt);for(let it=0;it<D.locationSize;it++)S(D.location+it,ot/D.locationSize,j,tt,ot*J,ot/D.locationSize*it*J,ft)}}else if(G!==void 0){const tt=G[b];if(tt!==void 0)switch(tt.length){case 2:i.vertexAttrib2fv(D.location,tt);break;case 3:i.vertexAttrib3fv(D.location,tt);break;case 4:i.vertexAttrib4fv(D.location,tt);break;default:i.vertexAttrib1fv(D.location,tt)}}}}T()}function N(){I();for(const M in n){const P=n[M];for(const H in P){const w=P[H];for(const L in w)c(w[L].object),delete w[L];delete P[H]}delete n[M]}}function R(M){if(n[M.id]===void 0)return;const P=n[M.id];for(const H in P){const w=P[H];for(const L in w)c(w[L].object),delete w[L];delete P[H]}delete n[M.id]}function C(M){for(const P in n){const H=n[P];if(H[M.id]===void 0)continue;const w=H[M.id];for(const L in w)c(w[L].object),delete w[L];delete H[M.id]}}function I(){E(),o=!0,r!==s&&(r=s,u(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:I,resetDefaultState:E,dispose:N,releaseStatesOfGeometry:R,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:m,disableUnusedAttributes:T}}function hp(i,t,e){let n;function s(u){n=u}function r(u,c){i.drawArrays(n,u,c),e.update(c,n,1)}function o(u,c,h){h!==0&&(i.drawArraysInstanced(n,u,c,h),e.update(c,n,h))}function a(u,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,u,0,c,0,h);let d=0;for(let g=0;g<h;g++)d+=c[g];e.update(d,n,1)}function l(u,c,h,f){if(h===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<u.length;g++)o(u[g],c[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,u,0,c,0,f,0,h);let g=0;for(let v=0;v<h;v++)g+=c[v]*f[v];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function fp(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==Be&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const I=C===pi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==An&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==nn&&!I)}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=e.precision!==void 0?e.precision:"highp";const c=l(u);c!==u&&(console.warn("THREE.WebGLRenderer:",u,"not supported, using",c,"instead."),u=c);const h=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),N=g>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:u,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:T,maxVaryings:S,maxFragmentUniforms:_,vertexTextures:N,maxSamples:R}}function dp(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new ln,a=new Nt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||s;return s=f,n=h.length,d},this.beginShadows=function(){r=!0,c(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){e=c(h,f,0)},this.setState=function(h,f,d){const g=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!s||g===null||g.length===0||r&&!m)r?c(null):u();else{const T=r?0:n,S=T*4;let _=p.clippingState||null;l.value=_,_=c(g,f,S,d);for(let N=0;N!==S;++N)_[N]=e[N];p.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=T}};function u(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function c(h,f,d,g){const v=h!==null?h.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=d+v*4,T=f.matrixWorldInverse;a.getNormalMatrix(T),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,_=d;S!==v;++S,_+=4)o.copy(h[S]).applyMatrix4(T,a),o.normal.toArray(m,_),m[_+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function pp(i){let t=new WeakMap;function e(o,a){return a===yo?o.mapping=Wi:a===Eo&&(o.mapping=Xi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===yo||a===Eo)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const u=new Th(l.height);return u.fromEquirectangularTexture(i,o),t.set(o,u),o.addEventListener("dispose",s),e(u.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Rc extends bc{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=u*this.view.offsetX,o=r+u*this.view.width,a-=c*this.view.offsetY,l=a-c*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ki=4,hl=[.125,.215,.35,.446,.526,.582],ai=20,qr=new Rc,fl=new st;let jr=null,Zr=0,Kr=0,$r=!1;const ri=(1+Math.sqrt(5))/2,Li=1/ri,dl=[new U(-ri,Li,0),new U(ri,Li,0),new U(-Li,0,ri),new U(Li,0,ri),new U(0,ri,-Li),new U(0,ri,Li),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)];class pl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){jr=this._renderer.getRenderTarget(),Zr=this._renderer.getActiveCubeFace(),Kr=this._renderer.getActiveMipmapLevel(),$r=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_l(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(jr,Zr,Kr),this._renderer.xr.enabled=$r,t.scissorTest=!1,Ws(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Wi||t.mapping===Xi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),jr=this._renderer.getRenderTarget(),Zr=this._renderer.getActiveCubeFace(),Kr=this._renderer.getActiveMipmapLevel(),$r=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:ze,minFilter:ze,generateMipmaps:!1,type:pi,format:Be,colorSpace:Zi,depthBuffer:!1},s=ml(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ml(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=mp(r)),this._blurMaterial=gp(r,t,e)}return s}_compileMaterial(t){const e=new Zt(this._lodPlanes[0],t);this._renderer.compile(e,qr)}_sceneToCubeUV(t,e,n,s){const a=new Ve(90,1,e,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],c=this._renderer,h=c.autoClear,f=c.toneMapping;c.getClearColor(fl),c.toneMapping=Wn,c.autoClear=!1;const d=new Sc({name:"PMREM.Background",side:Le,depthWrite:!1,depthTest:!1}),g=new Zt(new qn,d);let v=!1;const m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,v=!0):(d.color.copy(fl),v=!0);for(let p=0;p<6;p++){const T=p%3;T===0?(a.up.set(0,l[p],0),a.lookAt(u[p],0,0)):T===1?(a.up.set(0,0,l[p]),a.lookAt(0,u[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,u[p]));const S=this._cubeSize;Ws(s,T*S,p>2?S:0,S,S),c.setRenderTarget(s),v&&c.render(g,a),c.render(t,a)}g.geometry.dispose(),g.material.dispose(),c.toneMapping=f,c.autoClear=h,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Wi||t.mapping===Xi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=_l()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=gl());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Zt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;Ws(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,qr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=dl[(s-r-1)%dl.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const l=this._renderer,u=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,h=new Zt(this._lodPlanes[s],u),f=u.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*ai-1),v=r/g,m=isFinite(r)?1+Math.floor(c*v):ai;m>ai&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ai}`);const p=[];let T=0;for(let C=0;C<ai;++C){const I=C/v,E=Math.exp(-I*I/2);p.push(E),C===0?T+=E:C<m&&(T+=2*E)}for(let C=0;C<p.length;C++)p[C]=p[C]/T;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:S}=this;f.dTheta.value=g,f.mipInt.value=S-n;const _=this._sizeLods[s],N=3*_*(s>S-ki?s-S+ki:0),R=4*(this._cubeSize-_);Ws(e,N,R,3*_,2*_),l.setRenderTarget(e),l.render(h,qr)}}function mp(i){const t=[],e=[],n=[];let s=i;const r=i-ki+1+hl.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>i-ki?l=hl[o-i+ki-1]:o===0&&(l=0),n.push(l);const u=1/(a-2),c=-u,h=1+u,f=[c,c,h,c,h,h,c,c,h,h,c,h],d=6,g=6,v=3,m=2,p=1,T=new Float32Array(v*g*d),S=new Float32Array(m*g*d),_=new Float32Array(p*g*d);for(let R=0;R<d;R++){const C=R%3*2/3-1,I=R>2?0:-1,E=[C,I,0,C+2/3,I,0,C+2/3,I+1,0,C,I,0,C+2/3,I+1,0,C,I+1,0];T.set(E,v*g*R),S.set(f,m*g*R);const M=[R,R,R,R,R,R];_.set(M,p*g*R)}const N=new Re;N.setAttribute("position",new pe(T,v)),N.setAttribute("uv",new pe(S,m)),N.setAttribute("faceIndex",new pe(_,p)),t.push(N),s>ki&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function ml(i,t,e){const n=new wn(i,t,e);return n.texture.mapping=vr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ws(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function gp(i,t,e){const n=new Float32Array(ai),s=new U(0,1,0);return new sn({name:"SphericalGaussianBlur",defines:{n:ai,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ma(),fragmentShader:`

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
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function gl(){return new sn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ma(),fragmentShader:`

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
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function _l(){return new sn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ma(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Ma(){return`

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
	`}function _p(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,u=l===yo||l===Eo,c=l===Wi||l===Xi;if(u||c){let h=t.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new pl(i)),h=u?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{const d=a.image;return u&&d&&d.height>0||c&&d&&s(d)?(e===null&&(e=new pl(i)),h=u?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function s(a){let l=0;const u=6;for(let c=0;c<u;c++)a[c]!==void 0&&l++;return l===u}function r(a){const l=a.target;l.removeEventListener("dispose",r);const u=t.get(l);u!==void 0&&(t.delete(l),u.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function vp(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&ds("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function xp(i,t,e,n){const s={},r=new WeakMap;function o(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const v=f.morphAttributes[g];for(let m=0,p=v.length;m<p;m++)t.remove(v[m])}f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(h,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function l(h){const f=h.attributes;for(const g in f)t.update(f[g],i.ARRAY_BUFFER);const d=h.morphAttributes;for(const g in d){const v=d[g];for(let m=0,p=v.length;m<p;m++)t.update(v[m],i.ARRAY_BUFFER)}}function u(h){const f=[],d=h.index,g=h.attributes.position;let v=0;if(d!==null){const T=d.array;v=d.version;for(let S=0,_=T.length;S<_;S+=3){const N=T[S+0],R=T[S+1],C=T[S+2];f.push(N,R,R,C,C,N)}}else if(g!==void 0){const T=g.array;v=g.version;for(let S=0,_=T.length/3-1;S<_;S+=3){const N=S+0,R=S+1,C=S+2;f.push(N,R,R,C,C,N)}}else return;const m=new(_c(f)?Ec:yc)(f,1);m.version=v;const p=r.get(h);p&&t.remove(p),r.set(h,m)}function c(h){const f=r.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&u(h)}else u(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:c}}function Mp(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,d){i.drawElements(n,d,r,f*o),e.update(d,n,1)}function u(f,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,f*o,g),e.update(d,n,g))}function c(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,n,1)}function h(f,d,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)u(f[p]/o,d[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,v,0,g);let p=0;for(let T=0;T<g;T++)p+=d[T]*v[T];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=u,this.renderMultiDraw=c,this.renderMultiDrawInstances=h}function Sp(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function yp(i,t,e){const n=new WeakMap,s=new ae;function r(o,a,l){const u=o.morphTargetInfluences,c=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=c!==void 0?c.length:0;let f=n.get(a);if(f===void 0||f.count!==h){let M=function(){I.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var d=M;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],T=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let _=0;g===!0&&(_=1),v===!0&&(_=2),m===!0&&(_=3);let N=a.attributes.position.count*_,R=1;N>t.maxTextureSize&&(R=Math.ceil(N/t.maxTextureSize),N=t.maxTextureSize);const C=new Float32Array(N*R*4*h),I=new xc(C,N,R,h);I.type=nn,I.needsUpdate=!0;const E=_*4;for(let P=0;P<h;P++){const H=p[P],w=T[P],L=S[P],k=N*R*4*P;for(let G=0;G<H.count;G++){const b=G*E;g===!0&&(s.fromBufferAttribute(H,G),C[k+b+0]=s.x,C[k+b+1]=s.y,C[k+b+2]=s.z,C[k+b+3]=0),v===!0&&(s.fromBufferAttribute(w,G),C[k+b+4]=s.x,C[k+b+5]=s.y,C[k+b+6]=s.z,C[k+b+7]=0),m===!0&&(s.fromBufferAttribute(L,G),C[k+b+8]=s.x,C[k+b+9]=s.y,C[k+b+10]=s.z,C[k+b+11]=L.itemSize===4?s.w:1)}}f={count:h,texture:I,size:new vt(N,R)},n.set(a,f),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<u.length;m++)g+=u[m];const v=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",u)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Ep(i,t,e,n){let s=new WeakMap;function r(l){const u=n.render.frame,c=l.geometry,h=t.get(l,c);if(s.get(h)!==u&&(t.update(h),s.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==u&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==u&&(f.update(),s.set(f,u))}return h}function o(){s=new WeakMap}function a(l){const u=l.target;u.removeEventListener("dispose",a),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:r,dispose:o}}class Sa extends we{constructor(t,e,n,s,r,o,a,l,u,c=fi){if(c!==fi&&c!==qi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&c===fi&&(n=Yn),n===void 0&&c===qi&&(n=Yi),super(null,s,r,o,a,l,c,n,u),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Ue,this.minFilter=l!==void 0?l:Ue,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Cc=new we,vl=new Sa(1,1),Pc=new xc,Dc=new lh,Lc=new Ac,xl=[],Ml=[],Sl=new Float32Array(16),yl=new Float32Array(9),El=new Float32Array(4);function $i(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=xl[s];if(r===void 0&&(r=new Float32Array(s),xl[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function _e(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function ve(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Mr(i,t){let e=Ml[t];e===void 0&&(e=new Int32Array(t),Ml[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Tp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function bp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;i.uniform2fv(this.addr,t),ve(e,t)}}function Ap(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(_e(e,t))return;i.uniform3fv(this.addr,t),ve(e,t)}}function wp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;i.uniform4fv(this.addr,t),ve(e,t)}}function Rp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(_e(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),ve(e,t)}else{if(_e(e,n))return;El.set(n),i.uniformMatrix2fv(this.addr,!1,El),ve(e,n)}}function Cp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(_e(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),ve(e,t)}else{if(_e(e,n))return;yl.set(n),i.uniformMatrix3fv(this.addr,!1,yl),ve(e,n)}}function Pp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(_e(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),ve(e,t)}else{if(_e(e,n))return;Sl.set(n),i.uniformMatrix4fv(this.addr,!1,Sl),ve(e,n)}}function Dp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Lp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;i.uniform2iv(this.addr,t),ve(e,t)}}function Up(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(_e(e,t))return;i.uniform3iv(this.addr,t),ve(e,t)}}function Ip(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;i.uniform4iv(this.addr,t),ve(e,t)}}function Np(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Fp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;i.uniform2uiv(this.addr,t),ve(e,t)}}function Op(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(_e(e,t))return;i.uniform3uiv(this.addr,t),ve(e,t)}}function zp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;i.uniform4uiv(this.addr,t),ve(e,t)}}function Bp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(vl.compareFunction=mc,r=vl):r=Cc,e.setTexture2D(t||r,s)}function kp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Dc,s)}function Hp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Lc,s)}function Gp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Pc,s)}function Vp(i){switch(i){case 5126:return Tp;case 35664:return bp;case 35665:return Ap;case 35666:return wp;case 35674:return Rp;case 35675:return Cp;case 35676:return Pp;case 5124:case 35670:return Dp;case 35667:case 35671:return Lp;case 35668:case 35672:return Up;case 35669:case 35673:return Ip;case 5125:return Np;case 36294:return Fp;case 36295:return Op;case 36296:return zp;case 35678:case 36198:case 36298:case 36306:case 35682:return Bp;case 35679:case 36299:case 36307:return kp;case 35680:case 36300:case 36308:case 36293:return Hp;case 36289:case 36303:case 36311:case 36292:return Gp}}function Wp(i,t){i.uniform1fv(this.addr,t)}function Xp(i,t){const e=$i(t,this.size,2);i.uniform2fv(this.addr,e)}function Yp(i,t){const e=$i(t,this.size,3);i.uniform3fv(this.addr,e)}function qp(i,t){const e=$i(t,this.size,4);i.uniform4fv(this.addr,e)}function jp(i,t){const e=$i(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Zp(i,t){const e=$i(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Kp(i,t){const e=$i(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function $p(i,t){i.uniform1iv(this.addr,t)}function Jp(i,t){i.uniform2iv(this.addr,t)}function Qp(i,t){i.uniform3iv(this.addr,t)}function tm(i,t){i.uniform4iv(this.addr,t)}function em(i,t){i.uniform1uiv(this.addr,t)}function nm(i,t){i.uniform2uiv(this.addr,t)}function im(i,t){i.uniform3uiv(this.addr,t)}function sm(i,t){i.uniform4uiv(this.addr,t)}function rm(i,t,e){const n=this.cache,s=t.length,r=Mr(e,s);_e(n,r)||(i.uniform1iv(this.addr,r),ve(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Cc,r[o])}function om(i,t,e){const n=this.cache,s=t.length,r=Mr(e,s);_e(n,r)||(i.uniform1iv(this.addr,r),ve(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Dc,r[o])}function am(i,t,e){const n=this.cache,s=t.length,r=Mr(e,s);_e(n,r)||(i.uniform1iv(this.addr,r),ve(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Lc,r[o])}function lm(i,t,e){const n=this.cache,s=t.length,r=Mr(e,s);_e(n,r)||(i.uniform1iv(this.addr,r),ve(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Pc,r[o])}function cm(i){switch(i){case 5126:return Wp;case 35664:return Xp;case 35665:return Yp;case 35666:return qp;case 35674:return jp;case 35675:return Zp;case 35676:return Kp;case 5124:case 35670:return $p;case 35667:case 35671:return Jp;case 35668:case 35672:return Qp;case 35669:case 35673:return tm;case 5125:return em;case 36294:return nm;case 36295:return im;case 36296:return sm;case 35678:case 36198:case 36298:case 36306:case 35682:return rm;case 35679:case 36299:case 36307:return om;case 35680:case 36300:case 36308:case 36293:return am;case 36289:case 36303:case 36311:case 36292:return lm}}class um{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Vp(e.type)}}class hm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=cm(e.type)}}class fm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Jr=/(\w+)(\])?(\[|\.)?/g;function Tl(i,t){i.seq.push(t),i.map[t.id]=t}function dm(i,t,e){const n=i.name,s=n.length;for(Jr.lastIndex=0;;){const r=Jr.exec(n),o=Jr.lastIndex;let a=r[1];const l=r[2]==="]",u=r[3];if(l&&(a=a|0),u===void 0||u==="["&&o+2===s){Tl(e,u===void 0?new um(a,i,t):new hm(a,i,t));break}else{let h=e.map[a];h===void 0&&(h=new fm(a),Tl(e,h)),e=h}}}class lr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);dm(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function bl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const pm=37297;let mm=0;function gm(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Al=new Nt;function _m(i){Wt._getMatrix(Al,Wt.workingColorSpace,i);const t=`mat3( ${Al.elements.map(e=>e.toFixed(4))} )`;switch(Wt.getTransfer(i)){case xr:return[t,"LinearTransferOETF"];case Jt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function wl(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+gm(i.getShaderSource(t),o)}else return s}function vm(i,t){const e=_m(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function xm(i,t){let e;switch(t){case Su:e="Linear";break;case yu:e="Reinhard";break;case Eu:e="Cineon";break;case ic:e="ACESFilmic";break;case bu:e="AgX";break;case Au:e="Neutral";break;case Tu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Xs=new U;function Mm(){Wt.getLuminanceCoefficients(Xs);const i=Xs.x.toFixed(4),t=Xs.y.toFixed(4),e=Xs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Sm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ps).join(`
`)}function ym(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Em(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function ps(i){return i!==""}function Rl(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Cl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Tm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qo(i){return i.replace(Tm,Am)}const bm=new Map;function Am(i,t){let e=Ot[t];if(e===void 0){const n=bm.get(t);if(n!==void 0)e=Ot[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Qo(e)}const wm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Pl(i){return i.replace(wm,Rm)}function Rm(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Dl(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function Cm(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===tc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===ec?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===vn&&(t="SHADOWMAP_TYPE_VSM"),t}function Pm(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Wi:case Xi:t="ENVMAP_TYPE_CUBE";break;case vr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Dm(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Xi:t="ENVMAP_MODE_REFRACTION";break}return t}function Lm(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case nc:t="ENVMAP_BLENDING_MULTIPLY";break;case xu:t="ENVMAP_BLENDING_MIX";break;case Mu:t="ENVMAP_BLENDING_ADD";break}return t}function Um(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Im(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Cm(e),u=Pm(e),c=Dm(e),h=Lm(e),f=Um(e),d=Sm(e),g=ym(r),v=s.createProgram();let m,p,T=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ps).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ps).join(`
`),p.length>0&&(p+=`
`)):(m=[Dl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ps).join(`
`),p=[Dl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Wn?"#define TONE_MAPPING":"",e.toneMapping!==Wn?Ot.tonemapping_pars_fragment:"",e.toneMapping!==Wn?xm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ot.colorspace_pars_fragment,vm("linearToOutputTexel",e.outputColorSpace),Mm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ps).join(`
`)),o=Qo(o),o=Rl(o,e),o=Cl(o,e),a=Qo(a),a=Rl(a,e),a=Cl(a,e),o=Pl(o),a=Pl(a),e.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Va?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Va?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=T+m+o,_=T+p+a,N=bl(s,s.VERTEX_SHADER,S),R=bl(s,s.FRAGMENT_SHADER,_);s.attachShader(v,N),s.attachShader(v,R),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function C(P){if(i.debug.checkShaderErrors){const H=s.getProgramInfoLog(v).trim(),w=s.getShaderInfoLog(N).trim(),L=s.getShaderInfoLog(R).trim();let k=!0,G=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(k=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,N,R);else{const b=wl(s,N,"vertex"),D=wl(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+H+`
`+b+`
`+D)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(w===""||L==="")&&(G=!1);G&&(P.diagnostics={runnable:k,programLog:H,vertexShader:{log:w,prefix:m},fragmentShader:{log:L,prefix:p}})}s.deleteShader(N),s.deleteShader(R),I=new lr(s,v),E=Em(s,v)}let I;this.getUniforms=function(){return I===void 0&&C(this),I};let E;this.getAttributes=function(){return E===void 0&&C(this),E};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(v,pm)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=mm++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=N,this.fragmentShader=R,this}let Nm=0;class Fm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Om(t),e.set(t,n)),n}}class Om{constructor(t){this.id=Nm++,this.code=t,this.usedTimes=0}}function zm(i,t,e,n,s,r,o){const a=new va,l=new Fm,u=new Set,c=[],h=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(E){return u.add(E),E===0?"uv":`uv${E}`}function m(E,M,P,H,w){const L=H.fog,k=w.geometry,G=E.isMeshStandardMaterial?H.environment:null,b=(E.isMeshStandardMaterial?e:t).get(E.envMap||G),D=b&&b.mapping===vr?b.image.height:null,Y=g[E.type];E.precision!==null&&(d=s.getMaxPrecision(E.precision),d!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",d,"instead."));const tt=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ot=tt!==void 0?tt.length:0;let at=0;k.morphAttributes.position!==void 0&&(at=1),k.morphAttributes.normal!==void 0&&(at=2),k.morphAttributes.color!==void 0&&(at=3);let Lt,j,J,ft;if(Y){const Kt=cn[Y];Lt=Kt.vertexShader,j=Kt.fragmentShader}else Lt=E.vertexShader,j=E.fragmentShader,l.update(E),J=l.getVertexShaderID(E),ft=l.getFragmentShaderID(E);const it=i.getRenderTarget(),Tt=i.state.buffers.depth.getReversed(),Ct=w.isInstancedMesh===!0,zt=w.isBatchedMesh===!0,ce=!!E.map,Gt=!!E.matcap,he=!!b,B=!!E.aoMap,Ye=!!E.lightMap,Bt=!!E.bumpMap,kt=!!E.normalMap,At=!!E.displacementMap,ne=!!E.emissiveMap,bt=!!E.metalnessMap,A=!!E.roughnessMap,x=E.anisotropy>0,V=E.clearcoat>0,K=E.dispersion>0,Q=E.iridescence>0,Z=E.sheen>0,yt=E.transmission>0,ct=x&&!!E.anisotropyMap,mt=V&&!!E.clearcoatMap,Vt=V&&!!E.clearcoatNormalMap,et=V&&!!E.clearcoatRoughnessMap,gt=Q&&!!E.iridescenceMap,Rt=Q&&!!E.iridescenceThicknessMap,Pt=Z&&!!E.sheenColorMap,_t=Z&&!!E.sheenRoughnessMap,Ht=!!E.specularMap,Ft=!!E.specularColorMap,te=!!E.specularIntensityMap,F=yt&&!!E.transmissionMap,lt=yt&&!!E.thicknessMap,q=!!E.gradientMap,$=!!E.alphaMap,dt=E.alphaTest>0,ut=!!E.alphaHash,Ut=!!E.extensions;let ue=Wn;E.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(ue=i.toneMapping);const Te={shaderID:Y,shaderType:E.type,shaderName:E.name,vertexShader:Lt,fragmentShader:j,defines:E.defines,customVertexShaderID:J,customFragmentShaderID:ft,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:d,batching:zt,batchingColor:zt&&w._colorsTexture!==null,instancing:Ct,instancingColor:Ct&&w.instanceColor!==null,instancingMorph:Ct&&w.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:it===null?i.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:Zi,alphaToCoverage:!!E.alphaToCoverage,map:ce,matcap:Gt,envMap:he,envMapMode:he&&b.mapping,envMapCubeUVHeight:D,aoMap:B,lightMap:Ye,bumpMap:Bt,normalMap:kt,displacementMap:f&&At,emissiveMap:ne,normalMapObjectSpace:kt&&E.normalMapType===Pu,normalMapTangentSpace:kt&&E.normalMapType===pc,metalnessMap:bt,roughnessMap:A,anisotropy:x,anisotropyMap:ct,clearcoat:V,clearcoatMap:mt,clearcoatNormalMap:Vt,clearcoatRoughnessMap:et,dispersion:K,iridescence:Q,iridescenceMap:gt,iridescenceThicknessMap:Rt,sheen:Z,sheenColorMap:Pt,sheenRoughnessMap:_t,specularMap:Ht,specularColorMap:Ft,specularIntensityMap:te,transmission:yt,transmissionMap:F,thicknessMap:lt,gradientMap:q,opaque:E.transparent===!1&&E.blending===Hi&&E.alphaToCoverage===!1,alphaMap:$,alphaTest:dt,alphaHash:ut,combine:E.combine,mapUv:ce&&v(E.map.channel),aoMapUv:B&&v(E.aoMap.channel),lightMapUv:Ye&&v(E.lightMap.channel),bumpMapUv:Bt&&v(E.bumpMap.channel),normalMapUv:kt&&v(E.normalMap.channel),displacementMapUv:At&&v(E.displacementMap.channel),emissiveMapUv:ne&&v(E.emissiveMap.channel),metalnessMapUv:bt&&v(E.metalnessMap.channel),roughnessMapUv:A&&v(E.roughnessMap.channel),anisotropyMapUv:ct&&v(E.anisotropyMap.channel),clearcoatMapUv:mt&&v(E.clearcoatMap.channel),clearcoatNormalMapUv:Vt&&v(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:et&&v(E.clearcoatRoughnessMap.channel),iridescenceMapUv:gt&&v(E.iridescenceMap.channel),iridescenceThicknessMapUv:Rt&&v(E.iridescenceThicknessMap.channel),sheenColorMapUv:Pt&&v(E.sheenColorMap.channel),sheenRoughnessMapUv:_t&&v(E.sheenRoughnessMap.channel),specularMapUv:Ht&&v(E.specularMap.channel),specularColorMapUv:Ft&&v(E.specularColorMap.channel),specularIntensityMapUv:te&&v(E.specularIntensityMap.channel),transmissionMapUv:F&&v(E.transmissionMap.channel),thicknessMapUv:lt&&v(E.thicknessMap.channel),alphaMapUv:$&&v(E.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(kt||x),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:w.isPoints===!0&&!!k.attributes.uv&&(ce||$),fog:!!L,useFog:E.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Tt,skinning:w.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:ot,morphTextureStride:at,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:ue,decodeVideoTexture:ce&&E.map.isVideoTexture===!0&&Wt.getTransfer(E.map.colorSpace)===Jt,decodeVideoTextureEmissive:ne&&E.emissiveMap.isVideoTexture===!0&&Wt.getTransfer(E.emissiveMap.colorSpace)===Jt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===ye,flipSided:E.side===Le,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Ut&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ut&&E.extensions.multiDraw===!0||zt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Te.vertexUv1s=u.has(1),Te.vertexUv2s=u.has(2),Te.vertexUv3s=u.has(3),u.clear(),Te}function p(E){const M=[];if(E.shaderID?M.push(E.shaderID):(M.push(E.customVertexShaderID),M.push(E.customFragmentShaderID)),E.defines!==void 0)for(const P in E.defines)M.push(P),M.push(E.defines[P]);return E.isRawShaderMaterial===!1&&(T(M,E),S(M,E),M.push(i.outputColorSpace)),M.push(E.customProgramCacheKey),M.join()}function T(E,M){E.push(M.precision),E.push(M.outputColorSpace),E.push(M.envMapMode),E.push(M.envMapCubeUVHeight),E.push(M.mapUv),E.push(M.alphaMapUv),E.push(M.lightMapUv),E.push(M.aoMapUv),E.push(M.bumpMapUv),E.push(M.normalMapUv),E.push(M.displacementMapUv),E.push(M.emissiveMapUv),E.push(M.metalnessMapUv),E.push(M.roughnessMapUv),E.push(M.anisotropyMapUv),E.push(M.clearcoatMapUv),E.push(M.clearcoatNormalMapUv),E.push(M.clearcoatRoughnessMapUv),E.push(M.iridescenceMapUv),E.push(M.iridescenceThicknessMapUv),E.push(M.sheenColorMapUv),E.push(M.sheenRoughnessMapUv),E.push(M.specularMapUv),E.push(M.specularColorMapUv),E.push(M.specularIntensityMapUv),E.push(M.transmissionMapUv),E.push(M.thicknessMapUv),E.push(M.combine),E.push(M.fogExp2),E.push(M.sizeAttenuation),E.push(M.morphTargetsCount),E.push(M.morphAttributeCount),E.push(M.numDirLights),E.push(M.numPointLights),E.push(M.numSpotLights),E.push(M.numSpotLightMaps),E.push(M.numHemiLights),E.push(M.numRectAreaLights),E.push(M.numDirLightShadows),E.push(M.numPointLightShadows),E.push(M.numSpotLightShadows),E.push(M.numSpotLightShadowsWithMaps),E.push(M.numLightProbes),E.push(M.shadowMapType),E.push(M.toneMapping),E.push(M.numClippingPlanes),E.push(M.numClipIntersection),E.push(M.depthPacking)}function S(E,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),E.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),E.push(a.mask)}function _(E){const M=g[E.type];let P;if(M){const H=cn[M];P=Mh.clone(H.uniforms)}else P=E.uniforms;return P}function N(E,M){let P;for(let H=0,w=c.length;H<w;H++){const L=c[H];if(L.cacheKey===M){P=L,++P.usedTimes;break}}return P===void 0&&(P=new Im(i,M,E,r),c.push(P)),P}function R(E){if(--E.usedTimes===0){const M=c.indexOf(E);c[M]=c[c.length-1],c.pop(),E.destroy()}}function C(E){l.remove(E)}function I(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:N,releaseProgram:R,releaseShaderCache:C,programs:c,dispose:I}}function Bm(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function km(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Ll(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Ul(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(h,f,d,g,v,m){let p=i[t];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:v,group:m},i[t]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=v,p.group=m),t++,p}function a(h,f,d,g,v,m){const p=o(h,f,d,g,v,m);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):e.push(p)}function l(h,f,d,g,v,m){const p=o(h,f,d,g,v,m);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function u(h,f){e.length>1&&e.sort(h||km),n.length>1&&n.sort(f||Ll),s.length>1&&s.sort(f||Ll)}function c(){for(let h=t,f=i.length;h<f;h++){const d=i[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:c,sort:u}}function Hm(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Ul,i.set(n,[o])):s>=r.length?(o=new Ul,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Gm(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new U,color:new st};break;case"SpotLight":e={position:new U,direction:new U,color:new st,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new U,color:new st,distance:0,decay:0};break;case"HemisphereLight":e={direction:new U,skyColor:new st,groundColor:new st};break;case"RectAreaLight":e={color:new st,position:new U,halfWidth:new U,halfHeight:new U};break}return i[t.id]=e,e}}}function Vm(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Wm=0;function Xm(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Ym(i){const t=new Gm,e=Vm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)n.probe.push(new U);const s=new U,r=new Yt,o=new Yt;function a(u){let c=0,h=0,f=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let d=0,g=0,v=0,m=0,p=0,T=0,S=0,_=0,N=0,R=0,C=0;u.sort(Xm);for(let E=0,M=u.length;E<M;E++){const P=u[E],H=P.color,w=P.intensity,L=P.distance,k=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)c+=H.r*w,h+=H.g*w,f+=H.b*w;else if(P.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(P.sh.coefficients[G],w);C++}else if(P.isDirectionalLight){const G=t.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const b=P.shadow,D=e.get(P);D.shadowIntensity=b.intensity,D.shadowBias=b.bias,D.shadowNormalBias=b.normalBias,D.shadowRadius=b.radius,D.shadowMapSize=b.mapSize,n.directionalShadow[d]=D,n.directionalShadowMap[d]=k,n.directionalShadowMatrix[d]=P.shadow.matrix,T++}n.directional[d]=G,d++}else if(P.isSpotLight){const G=t.get(P);G.position.setFromMatrixPosition(P.matrixWorld),G.color.copy(H).multiplyScalar(w),G.distance=L,G.coneCos=Math.cos(P.angle),G.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),G.decay=P.decay,n.spot[v]=G;const b=P.shadow;if(P.map&&(n.spotLightMap[N]=P.map,N++,b.updateMatrices(P),P.castShadow&&R++),n.spotLightMatrix[v]=b.matrix,P.castShadow){const D=e.get(P);D.shadowIntensity=b.intensity,D.shadowBias=b.bias,D.shadowNormalBias=b.normalBias,D.shadowRadius=b.radius,D.shadowMapSize=b.mapSize,n.spotShadow[v]=D,n.spotShadowMap[v]=k,_++}v++}else if(P.isRectAreaLight){const G=t.get(P);G.color.copy(H).multiplyScalar(w),G.halfWidth.set(P.width*.5,0,0),G.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=G,m++}else if(P.isPointLight){const G=t.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity),G.distance=P.distance,G.decay=P.decay,P.castShadow){const b=P.shadow,D=e.get(P);D.shadowIntensity=b.intensity,D.shadowBias=b.bias,D.shadowNormalBias=b.normalBias,D.shadowRadius=b.radius,D.shadowMapSize=b.mapSize,D.shadowCameraNear=b.camera.near,D.shadowCameraFar=b.camera.far,n.pointShadow[g]=D,n.pointShadowMap[g]=k,n.pointShadowMatrix[g]=P.shadow.matrix,S++}n.point[g]=G,g++}else if(P.isHemisphereLight){const G=t.get(P);G.skyColor.copy(P.color).multiplyScalar(w),G.groundColor.copy(P.groundColor).multiplyScalar(w),n.hemi[p]=G,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=rt.LTC_FLOAT_1,n.rectAreaLTC2=rt.LTC_FLOAT_2):(n.rectAreaLTC1=rt.LTC_HALF_1,n.rectAreaLTC2=rt.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=h,n.ambient[2]=f;const I=n.hash;(I.directionalLength!==d||I.pointLength!==g||I.spotLength!==v||I.rectAreaLength!==m||I.hemiLength!==p||I.numDirectionalShadows!==T||I.numPointShadows!==S||I.numSpotShadows!==_||I.numSpotMaps!==N||I.numLightProbes!==C)&&(n.directional.length=d,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=_+N-R,n.spotLightMap.length=N,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=C,I.directionalLength=d,I.pointLength=g,I.spotLength=v,I.rectAreaLength=m,I.hemiLength=p,I.numDirectionalShadows=T,I.numPointShadows=S,I.numSpotShadows=_,I.numSpotMaps=N,I.numLightProbes=C,n.version=Wm++)}function l(u,c){let h=0,f=0,d=0,g=0,v=0;const m=c.matrixWorldInverse;for(let p=0,T=u.length;p<T;p++){const S=u[p];if(S.isDirectionalLight){const _=n.directional[h];_.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),h++}else if(S.isSpotLight){const _=n.spot[d];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),d++}else if(S.isRectAreaLight){const _=n.rectArea[g];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(S.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(S.width*.5,0,0),_.halfHeight.set(0,S.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(S.isPointLight){const _=n.point[f];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){const _=n.hemi[v];_.direction.setFromMatrixPosition(S.matrixWorld),_.direction.transformDirection(m),v++}}}return{setup:a,setupView:l,state:n}}function Il(i){const t=new Ym(i),e=[],n=[];function s(c){u.camera=c,e.length=0,n.length=0}function r(c){e.push(c)}function o(c){n.push(c)}function a(){t.setup(e)}function l(c){t.setupView(e,c)}const u={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:u,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function qm(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Il(i),t.set(s,[a])):r>=o.length?(a=new Il(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class jm extends Ki{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Ru,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Zm extends Ki{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Km=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$m=`uniform sampler2D shadow_pass;
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
}`;function Jm(i,t,e){let n=new xa;const s=new vt,r=new vt,o=new ae,a=new jm({depthPacking:Cu}),l=new Zm,u={},c=e.maxTextureSize,h={[Xn]:Le,[Le]:Xn,[ye]:ye},f=new sn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new vt},radius:{value:4}},vertexShader:Km,fragmentShader:$m}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Re;g.setAttribute("position",new pe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Zt(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=tc;let p=this.type;this.render=function(R,C,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const E=i.getRenderTarget(),M=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),H=i.state;H.setBlending(Vn),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const w=p!==vn&&this.type===vn,L=p===vn&&this.type!==vn;for(let k=0,G=R.length;k<G;k++){const b=R[k],D=b.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",b,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;s.copy(D.mapSize);const Y=D.getFrameExtents();if(s.multiply(Y),r.copy(D.mapSize),(s.x>c||s.y>c)&&(s.x>c&&(r.x=Math.floor(c/Y.x),s.x=r.x*Y.x,D.mapSize.x=r.x),s.y>c&&(r.y=Math.floor(c/Y.y),s.y=r.y*Y.y,D.mapSize.y=r.y)),D.map===null||w===!0||L===!0){const ot=this.type!==vn?{minFilter:Ue,magFilter:Ue}:{};D.map!==null&&D.map.dispose(),D.map=new wn(s.x,s.y,ot),D.map.texture.name=b.name+".shadowMap",D.camera.updateProjectionMatrix()}i.setRenderTarget(D.map),i.clear();const tt=D.getViewportCount();for(let ot=0;ot<tt;ot++){const at=D.getViewport(ot);o.set(r.x*at.x,r.y*at.y,r.x*at.z,r.y*at.w),H.viewport(o),D.updateMatrices(b,ot),n=D.getFrustum(),_(C,I,D.camera,b,this.type)}D.isPointLightShadow!==!0&&this.type===vn&&T(D,I),D.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(E,M,P)};function T(R,C){const I=t.update(v);f.defines.VSM_SAMPLES!==R.blurSamples&&(f.defines.VSM_SAMPLES=R.blurSamples,d.defines.VSM_SAMPLES=R.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new wn(s.x,s.y)),f.uniforms.shadow_pass.value=R.map.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(C,null,I,f,v,null),d.uniforms.shadow_pass.value=R.mapPass.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(C,null,I,d,v,null)}function S(R,C,I,E){let M=null;const P=I.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(P!==void 0)M=P;else if(M=I.isPointLight===!0?l:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const H=M.uuid,w=C.uuid;let L=u[H];L===void 0&&(L={},u[H]=L);let k=L[w];k===void 0&&(k=M.clone(),L[w]=k,C.addEventListener("dispose",N)),M=k}if(M.visible=C.visible,M.wireframe=C.wireframe,E===vn?M.side=C.shadowSide!==null?C.shadowSide:C.side:M.side=C.shadowSide!==null?C.shadowSide:h[C.side],M.alphaMap=C.alphaMap,M.alphaTest=C.alphaTest,M.map=C.map,M.clipShadows=C.clipShadows,M.clippingPlanes=C.clippingPlanes,M.clipIntersection=C.clipIntersection,M.displacementMap=C.displacementMap,M.displacementScale=C.displacementScale,M.displacementBias=C.displacementBias,M.wireframeLinewidth=C.wireframeLinewidth,M.linewidth=C.linewidth,I.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const H=i.properties.get(M);H.light=I}return M}function _(R,C,I,E,M){if(R.visible===!1)return;if(R.layers.test(C.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&M===vn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,R.matrixWorld);const w=t.update(R),L=R.material;if(Array.isArray(L)){const k=w.groups;for(let G=0,b=k.length;G<b;G++){const D=k[G],Y=L[D.materialIndex];if(Y&&Y.visible){const tt=S(R,Y,E,M);R.onBeforeShadow(i,R,C,I,w,tt,D),i.renderBufferDirect(I,null,w,tt,R,D),R.onAfterShadow(i,R,C,I,w,tt,D)}}}else if(L.visible){const k=S(R,L,E,M);R.onBeforeShadow(i,R,C,I,w,k,null),i.renderBufferDirect(I,null,w,k,R,null),R.onAfterShadow(i,R,C,I,w,k,null)}}const H=R.children;for(let w=0,L=H.length;w<L;w++)_(H[w],C,I,E,M)}function N(R){R.target.removeEventListener("dispose",N);for(const I in u){const E=u[I],M=R.target.uuid;M in E&&(E[M].dispose(),delete E[M])}}}const Qm={[mo]:go,[_o]:Mo,[vo]:So,[Vi]:xo,[go]:mo,[Mo]:_o,[So]:vo,[xo]:Vi};function t0(i,t){function e(){let F=!1;const lt=new ae;let q=null;const $=new ae(0,0,0,0);return{setMask:function(dt){q!==dt&&!F&&(i.colorMask(dt,dt,dt,dt),q=dt)},setLocked:function(dt){F=dt},setClear:function(dt,ut,Ut,ue,Te){Te===!0&&(dt*=ue,ut*=ue,Ut*=ue),lt.set(dt,ut,Ut,ue),$.equals(lt)===!1&&(i.clearColor(dt,ut,Ut,ue),$.copy(lt))},reset:function(){F=!1,q=null,$.set(-1,0,0,0)}}}function n(){let F=!1,lt=!1,q=null,$=null,dt=null;return{setReversed:function(ut){if(lt!==ut){const Ut=t.get("EXT_clip_control");lt?Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.ZERO_TO_ONE_EXT):Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.NEGATIVE_ONE_TO_ONE_EXT);const ue=dt;dt=null,this.setClear(ue)}lt=ut},getReversed:function(){return lt},setTest:function(ut){ut?it(i.DEPTH_TEST):Tt(i.DEPTH_TEST)},setMask:function(ut){q!==ut&&!F&&(i.depthMask(ut),q=ut)},setFunc:function(ut){if(lt&&(ut=Qm[ut]),$!==ut){switch(ut){case mo:i.depthFunc(i.NEVER);break;case go:i.depthFunc(i.ALWAYS);break;case _o:i.depthFunc(i.LESS);break;case Vi:i.depthFunc(i.LEQUAL);break;case vo:i.depthFunc(i.EQUAL);break;case xo:i.depthFunc(i.GEQUAL);break;case Mo:i.depthFunc(i.GREATER);break;case So:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}$=ut}},setLocked:function(ut){F=ut},setClear:function(ut){dt!==ut&&(lt&&(ut=1-ut),i.clearDepth(ut),dt=ut)},reset:function(){F=!1,q=null,$=null,dt=null,lt=!1}}}function s(){let F=!1,lt=null,q=null,$=null,dt=null,ut=null,Ut=null,ue=null,Te=null;return{setTest:function(Kt){F||(Kt?it(i.STENCIL_TEST):Tt(i.STENCIL_TEST))},setMask:function(Kt){lt!==Kt&&!F&&(i.stencilMask(Kt),lt=Kt)},setFunc:function(Kt,Ke,hn){(q!==Kt||$!==Ke||dt!==hn)&&(i.stencilFunc(Kt,Ke,hn),q=Kt,$=Ke,dt=hn)},setOp:function(Kt,Ke,hn){(ut!==Kt||Ut!==Ke||ue!==hn)&&(i.stencilOp(Kt,Ke,hn),ut=Kt,Ut=Ke,ue=hn)},setLocked:function(Kt){F=Kt},setClear:function(Kt){Te!==Kt&&(i.clearStencil(Kt),Te=Kt)},reset:function(){F=!1,lt=null,q=null,$=null,dt=null,ut=null,Ut=null,ue=null,Te=null}}}const r=new e,o=new n,a=new s,l=new WeakMap,u=new WeakMap;let c={},h={},f=new WeakMap,d=[],g=null,v=!1,m=null,p=null,T=null,S=null,_=null,N=null,R=null,C=new st(0,0,0),I=0,E=!1,M=null,P=null,H=null,w=null,L=null;const k=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,b=0;const D=i.getParameter(i.VERSION);D.indexOf("WebGL")!==-1?(b=parseFloat(/^WebGL (\d)/.exec(D)[1]),G=b>=1):D.indexOf("OpenGL ES")!==-1&&(b=parseFloat(/^OpenGL ES (\d)/.exec(D)[1]),G=b>=2);let Y=null,tt={};const ot=i.getParameter(i.SCISSOR_BOX),at=i.getParameter(i.VIEWPORT),Lt=new ae().fromArray(ot),j=new ae().fromArray(at);function J(F,lt,q,$){const dt=new Uint8Array(4),ut=i.createTexture();i.bindTexture(F,ut),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ut=0;Ut<q;Ut++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(lt,0,i.RGBA,1,1,$,0,i.RGBA,i.UNSIGNED_BYTE,dt):i.texImage2D(lt+Ut,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,dt);return ut}const ft={};ft[i.TEXTURE_2D]=J(i.TEXTURE_2D,i.TEXTURE_2D,1),ft[i.TEXTURE_CUBE_MAP]=J(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ft[i.TEXTURE_2D_ARRAY]=J(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ft[i.TEXTURE_3D]=J(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),it(i.DEPTH_TEST),o.setFunc(Vi),Bt(!1),kt(Ba),it(i.CULL_FACE),B(Vn);function it(F){c[F]!==!0&&(i.enable(F),c[F]=!0)}function Tt(F){c[F]!==!1&&(i.disable(F),c[F]=!1)}function Ct(F,lt){return h[F]!==lt?(i.bindFramebuffer(F,lt),h[F]=lt,F===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=lt),F===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=lt),!0):!1}function zt(F,lt){let q=d,$=!1;if(F){q=f.get(lt),q===void 0&&(q=[],f.set(lt,q));const dt=F.textures;if(q.length!==dt.length||q[0]!==i.COLOR_ATTACHMENT0){for(let ut=0,Ut=dt.length;ut<Ut;ut++)q[ut]=i.COLOR_ATTACHMENT0+ut;q.length=dt.length,$=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,$=!0);$&&i.drawBuffers(q)}function ce(F){return g!==F?(i.useProgram(F),g=F,!0):!1}const Gt={[oi]:i.FUNC_ADD,[nu]:i.FUNC_SUBTRACT,[iu]:i.FUNC_REVERSE_SUBTRACT};Gt[su]=i.MIN,Gt[ru]=i.MAX;const he={[ou]:i.ZERO,[au]:i.ONE,[lu]:i.SRC_COLOR,[fo]:i.SRC_ALPHA,[pu]:i.SRC_ALPHA_SATURATE,[fu]:i.DST_COLOR,[uu]:i.DST_ALPHA,[cu]:i.ONE_MINUS_SRC_COLOR,[po]:i.ONE_MINUS_SRC_ALPHA,[du]:i.ONE_MINUS_DST_COLOR,[hu]:i.ONE_MINUS_DST_ALPHA,[mu]:i.CONSTANT_COLOR,[gu]:i.ONE_MINUS_CONSTANT_COLOR,[_u]:i.CONSTANT_ALPHA,[vu]:i.ONE_MINUS_CONSTANT_ALPHA};function B(F,lt,q,$,dt,ut,Ut,ue,Te,Kt){if(F===Vn){v===!0&&(Tt(i.BLEND),v=!1);return}if(v===!1&&(it(i.BLEND),v=!0),F!==eu){if(F!==m||Kt!==E){if((p!==oi||_!==oi)&&(i.blendEquation(i.FUNC_ADD),p=oi,_=oi),Kt)switch(F){case Hi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ho:i.blendFunc(i.ONE,i.ONE);break;case ka:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ha:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Hi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ho:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case ka:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ha:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}T=null,S=null,N=null,R=null,C.set(0,0,0),I=0,m=F,E=Kt}return}dt=dt||lt,ut=ut||q,Ut=Ut||$,(lt!==p||dt!==_)&&(i.blendEquationSeparate(Gt[lt],Gt[dt]),p=lt,_=dt),(q!==T||$!==S||ut!==N||Ut!==R)&&(i.blendFuncSeparate(he[q],he[$],he[ut],he[Ut]),T=q,S=$,N=ut,R=Ut),(ue.equals(C)===!1||Te!==I)&&(i.blendColor(ue.r,ue.g,ue.b,Te),C.copy(ue),I=Te),m=F,E=!1}function Ye(F,lt){F.side===ye?Tt(i.CULL_FACE):it(i.CULL_FACE);let q=F.side===Le;lt&&(q=!q),Bt(q),F.blending===Hi&&F.transparent===!1?B(Vn):B(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),r.setMask(F.colorWrite);const $=F.stencilWrite;a.setTest($),$&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),ne(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?it(i.SAMPLE_ALPHA_TO_COVERAGE):Tt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Bt(F){M!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),M=F)}function kt(F){F!==Qc?(it(i.CULL_FACE),F!==P&&(F===Ba?i.cullFace(i.BACK):F===tu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Tt(i.CULL_FACE),P=F}function At(F){F!==H&&(G&&i.lineWidth(F),H=F)}function ne(F,lt,q){F?(it(i.POLYGON_OFFSET_FILL),(w!==lt||L!==q)&&(i.polygonOffset(lt,q),w=lt,L=q)):Tt(i.POLYGON_OFFSET_FILL)}function bt(F){F?it(i.SCISSOR_TEST):Tt(i.SCISSOR_TEST)}function A(F){F===void 0&&(F=i.TEXTURE0+k-1),Y!==F&&(i.activeTexture(F),Y=F)}function x(F,lt,q){q===void 0&&(Y===null?q=i.TEXTURE0+k-1:q=Y);let $=tt[q];$===void 0&&($={type:void 0,texture:void 0},tt[q]=$),($.type!==F||$.texture!==lt)&&(Y!==q&&(i.activeTexture(q),Y=q),i.bindTexture(F,lt||ft[F]),$.type=F,$.texture=lt)}function V(){const F=tt[Y];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function K(){try{i.compressedTexImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Q(){try{i.compressedTexImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Z(){try{i.texSubImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function yt(){try{i.texSubImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ct(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function mt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Vt(){try{i.texStorage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function et(){try{i.texStorage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function gt(){try{i.texImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Rt(){try{i.texImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Pt(F){Lt.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),Lt.copy(F))}function _t(F){j.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),j.copy(F))}function Ht(F,lt){let q=u.get(lt);q===void 0&&(q=new WeakMap,u.set(lt,q));let $=q.get(F);$===void 0&&($=i.getUniformBlockIndex(lt,F.name),q.set(F,$))}function Ft(F,lt){const $=u.get(lt).get(F);l.get(lt)!==$&&(i.uniformBlockBinding(lt,$,F.__bindingPointIndex),l.set(lt,$))}function te(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},Y=null,tt={},h={},f=new WeakMap,d=[],g=null,v=!1,m=null,p=null,T=null,S=null,_=null,N=null,R=null,C=new st(0,0,0),I=0,E=!1,M=null,P=null,H=null,w=null,L=null,Lt.set(0,0,i.canvas.width,i.canvas.height),j.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:it,disable:Tt,bindFramebuffer:Ct,drawBuffers:zt,useProgram:ce,setBlending:B,setMaterial:Ye,setFlipSided:Bt,setCullFace:kt,setLineWidth:At,setPolygonOffset:ne,setScissorTest:bt,activeTexture:A,bindTexture:x,unbindTexture:V,compressedTexImage2D:K,compressedTexImage3D:Q,texImage2D:gt,texImage3D:Rt,updateUBOMapping:Ht,uniformBlockBinding:Ft,texStorage2D:Vt,texStorage3D:et,texSubImage2D:Z,texSubImage3D:yt,compressedTexSubImage2D:ct,compressedTexSubImage3D:mt,scissor:Pt,viewport:_t,reset:te}}function Nl(i,t,e,n){const s=e0(n);switch(e){case lc:return i*t;case uc:return i*t;case hc:return i*t*2;case fa:return i*t/s.components*s.byteLength;case da:return i*t/s.components*s.byteLength;case fc:return i*t*2/s.components*s.byteLength;case pa:return i*t*2/s.components*s.byteLength;case cc:return i*t*3/s.components*s.byteLength;case Be:return i*t*4/s.components*s.byteLength;case ma:return i*t*4/s.components*s.byteLength;case ir:case sr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case rr:case or:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case wo:case Co:return Math.max(i,16)*Math.max(t,8)/4;case Ao:case Ro:return Math.max(i,8)*Math.max(t,8)/2;case Po:case Do:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Lo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Uo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Io:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case No:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Fo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Oo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case zo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Bo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ko:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ho:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Go:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Vo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Wo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Xo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Yo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case ar:case qo:case jo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case dc:case Zo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ko:case $o:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function e0(i){switch(i){case An:case rc:return{byteLength:1,components:1};case vs:case oc:case pi:return{byteLength:2,components:1};case ua:case ha:return{byteLength:2,components:4};case Yn:case ca:case nn:return{byteLength:4,components:1};case ac:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function n0(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new vt,c=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,x){return d?new OffscreenCanvas(A,x):dr("canvas")}function v(A,x,V){let K=1;const Q=bt(A);if((Q.width>V||Q.height>V)&&(K=V/Math.max(Q.width,Q.height)),K<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const Z=Math.floor(K*Q.width),yt=Math.floor(K*Q.height);h===void 0&&(h=g(Z,yt));const ct=x?g(Z,yt):h;return ct.width=Z,ct.height=yt,ct.getContext("2d").drawImage(A,0,0,Z,yt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+Z+"x"+yt+")."),ct}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),A;return A}function m(A){return A.generateMipmaps}function p(A){i.generateMipmap(A)}function T(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(A,x,V,K,Q=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let Z=x;if(x===i.RED&&(V===i.FLOAT&&(Z=i.R32F),V===i.HALF_FLOAT&&(Z=i.R16F),V===i.UNSIGNED_BYTE&&(Z=i.R8)),x===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(Z=i.R8UI),V===i.UNSIGNED_SHORT&&(Z=i.R16UI),V===i.UNSIGNED_INT&&(Z=i.R32UI),V===i.BYTE&&(Z=i.R8I),V===i.SHORT&&(Z=i.R16I),V===i.INT&&(Z=i.R32I)),x===i.RG&&(V===i.FLOAT&&(Z=i.RG32F),V===i.HALF_FLOAT&&(Z=i.RG16F),V===i.UNSIGNED_BYTE&&(Z=i.RG8)),x===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(Z=i.RG8UI),V===i.UNSIGNED_SHORT&&(Z=i.RG16UI),V===i.UNSIGNED_INT&&(Z=i.RG32UI),V===i.BYTE&&(Z=i.RG8I),V===i.SHORT&&(Z=i.RG16I),V===i.INT&&(Z=i.RG32I)),x===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),V===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),V===i.UNSIGNED_INT&&(Z=i.RGB32UI),V===i.BYTE&&(Z=i.RGB8I),V===i.SHORT&&(Z=i.RGB16I),V===i.INT&&(Z=i.RGB32I)),x===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),V===i.UNSIGNED_INT&&(Z=i.RGBA32UI),V===i.BYTE&&(Z=i.RGBA8I),V===i.SHORT&&(Z=i.RGBA16I),V===i.INT&&(Z=i.RGBA32I)),x===i.RGB&&V===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),x===i.RGBA){const yt=Q?xr:Wt.getTransfer(K);V===i.FLOAT&&(Z=i.RGBA32F),V===i.HALF_FLOAT&&(Z=i.RGBA16F),V===i.UNSIGNED_BYTE&&(Z=yt===Jt?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function _(A,x){let V;return A?x===null||x===Yn||x===Yi?V=i.DEPTH24_STENCIL8:x===nn?V=i.DEPTH32F_STENCIL8:x===vs&&(V=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Yn||x===Yi?V=i.DEPTH_COMPONENT24:x===nn?V=i.DEPTH_COMPONENT32F:x===vs&&(V=i.DEPTH_COMPONENT16),V}function N(A,x){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==Ue&&A.minFilter!==ze?Math.log2(Math.max(x.width,x.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?x.mipmaps.length:1}function R(A){const x=A.target;x.removeEventListener("dispose",R),I(x),x.isVideoTexture&&c.delete(x)}function C(A){const x=A.target;x.removeEventListener("dispose",C),M(x)}function I(A){const x=n.get(A);if(x.__webglInit===void 0)return;const V=A.source,K=f.get(V);if(K){const Q=K[x.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&E(A),Object.keys(K).length===0&&f.delete(V)}n.remove(A)}function E(A){const x=n.get(A);i.deleteTexture(x.__webglTexture);const V=A.source,K=f.get(V);delete K[x.__cacheKey],o.memory.textures--}function M(A){const x=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(x.__webglFramebuffer[K]))for(let Q=0;Q<x.__webglFramebuffer[K].length;Q++)i.deleteFramebuffer(x.__webglFramebuffer[K][Q]);else i.deleteFramebuffer(x.__webglFramebuffer[K]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[K])}else{if(Array.isArray(x.__webglFramebuffer))for(let K=0;K<x.__webglFramebuffer.length;K++)i.deleteFramebuffer(x.__webglFramebuffer[K]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let K=0;K<x.__webglColorRenderbuffer.length;K++)x.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[K]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const V=A.textures;for(let K=0,Q=V.length;K<Q;K++){const Z=n.get(V[K]);Z.__webglTexture&&(i.deleteTexture(Z.__webglTexture),o.memory.textures--),n.remove(V[K])}n.remove(A)}let P=0;function H(){P=0}function w(){const A=P;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),P+=1,A}function L(A){const x=[];return x.push(A.wrapS),x.push(A.wrapT),x.push(A.wrapR||0),x.push(A.magFilter),x.push(A.minFilter),x.push(A.anisotropy),x.push(A.internalFormat),x.push(A.format),x.push(A.type),x.push(A.generateMipmaps),x.push(A.premultiplyAlpha),x.push(A.flipY),x.push(A.unpackAlignment),x.push(A.colorSpace),x.join()}function k(A,x){const V=n.get(A);if(A.isVideoTexture&&At(A),A.isRenderTargetTexture===!1&&A.version>0&&V.__version!==A.version){const K=A.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(V,A,x);return}}e.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+x)}function G(A,x){const V=n.get(A);if(A.version>0&&V.__version!==A.version){j(V,A,x);return}e.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+x)}function b(A,x){const V=n.get(A);if(A.version>0&&V.__version!==A.version){j(V,A,x);return}e.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+x)}function D(A,x){const V=n.get(A);if(A.version>0&&V.__version!==A.version){J(V,A,x);return}e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+x)}const Y={[To]:i.REPEAT,[Hn]:i.CLAMP_TO_EDGE,[bo]:i.MIRRORED_REPEAT},tt={[Ue]:i.NEAREST,[wu]:i.NEAREST_MIPMAP_NEAREST,[bs]:i.NEAREST_MIPMAP_LINEAR,[ze]:i.LINEAR,[Ar]:i.LINEAR_MIPMAP_NEAREST,[ci]:i.LINEAR_MIPMAP_LINEAR},ot={[Du]:i.NEVER,[Ou]:i.ALWAYS,[Lu]:i.LESS,[mc]:i.LEQUAL,[Uu]:i.EQUAL,[Fu]:i.GEQUAL,[Iu]:i.GREATER,[Nu]:i.NOTEQUAL};function at(A,x){if(x.type===nn&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===ze||x.magFilter===Ar||x.magFilter===bs||x.magFilter===ci||x.minFilter===ze||x.minFilter===Ar||x.minFilter===bs||x.minFilter===ci)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,Y[x.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,Y[x.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,Y[x.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,tt[x.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,tt[x.minFilter]),x.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,ot[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Ue||x.minFilter!==bs&&x.minFilter!==ci||x.type===nn&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const V=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Lt(A,x){let V=!1;A.__webglInit===void 0&&(A.__webglInit=!0,x.addEventListener("dispose",R));const K=x.source;let Q=f.get(K);Q===void 0&&(Q={},f.set(K,Q));const Z=L(x);if(Z!==A.__cacheKey){Q[Z]===void 0&&(Q[Z]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,V=!0),Q[Z].usedTimes++;const yt=Q[A.__cacheKey];yt!==void 0&&(Q[A.__cacheKey].usedTimes--,yt.usedTimes===0&&E(x)),A.__cacheKey=Z,A.__webglTexture=Q[Z].texture}return V}function j(A,x,V){let K=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(K=i.TEXTURE_3D);const Q=Lt(A,x),Z=x.source;e.bindTexture(K,A.__webglTexture,i.TEXTURE0+V);const yt=n.get(Z);if(Z.version!==yt.__version||Q===!0){e.activeTexture(i.TEXTURE0+V);const ct=Wt.getPrimaries(Wt.workingColorSpace),mt=x.colorSpace===Mn?null:Wt.getPrimaries(x.colorSpace),Vt=x.colorSpace===Mn||ct===mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Vt);let et=v(x.image,!1,s.maxTextureSize);et=ne(x,et);const gt=r.convert(x.format,x.colorSpace),Rt=r.convert(x.type);let Pt=S(x.internalFormat,gt,Rt,x.colorSpace,x.isVideoTexture);at(K,x);let _t;const Ht=x.mipmaps,Ft=x.isVideoTexture!==!0,te=yt.__version===void 0||Q===!0,F=Z.dataReady,lt=N(x,et);if(x.isDepthTexture)Pt=_(x.format===qi,x.type),te&&(Ft?e.texStorage2D(i.TEXTURE_2D,1,Pt,et.width,et.height):e.texImage2D(i.TEXTURE_2D,0,Pt,et.width,et.height,0,gt,Rt,null));else if(x.isDataTexture)if(Ht.length>0){Ft&&te&&e.texStorage2D(i.TEXTURE_2D,lt,Pt,Ht[0].width,Ht[0].height);for(let q=0,$=Ht.length;q<$;q++)_t=Ht[q],Ft?F&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,_t.width,_t.height,gt,Rt,_t.data):e.texImage2D(i.TEXTURE_2D,q,Pt,_t.width,_t.height,0,gt,Rt,_t.data);x.generateMipmaps=!1}else Ft?(te&&e.texStorage2D(i.TEXTURE_2D,lt,Pt,et.width,et.height),F&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,et.width,et.height,gt,Rt,et.data)):e.texImage2D(i.TEXTURE_2D,0,Pt,et.width,et.height,0,gt,Rt,et.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Ft&&te&&e.texStorage3D(i.TEXTURE_2D_ARRAY,lt,Pt,Ht[0].width,Ht[0].height,et.depth);for(let q=0,$=Ht.length;q<$;q++)if(_t=Ht[q],x.format!==Be)if(gt!==null)if(Ft){if(F)if(x.layerUpdates.size>0){const dt=Nl(_t.width,_t.height,x.format,x.type);for(const ut of x.layerUpdates){const Ut=_t.data.subarray(ut*dt/_t.data.BYTES_PER_ELEMENT,(ut+1)*dt/_t.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,ut,_t.width,_t.height,1,gt,Ut)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,_t.width,_t.height,et.depth,gt,_t.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,Pt,_t.width,_t.height,et.depth,0,_t.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ft?F&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,_t.width,_t.height,et.depth,gt,Rt,_t.data):e.texImage3D(i.TEXTURE_2D_ARRAY,q,Pt,_t.width,_t.height,et.depth,0,gt,Rt,_t.data)}else{Ft&&te&&e.texStorage2D(i.TEXTURE_2D,lt,Pt,Ht[0].width,Ht[0].height);for(let q=0,$=Ht.length;q<$;q++)_t=Ht[q],x.format!==Be?gt!==null?Ft?F&&e.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,_t.width,_t.height,gt,_t.data):e.compressedTexImage2D(i.TEXTURE_2D,q,Pt,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ft?F&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,_t.width,_t.height,gt,Rt,_t.data):e.texImage2D(i.TEXTURE_2D,q,Pt,_t.width,_t.height,0,gt,Rt,_t.data)}else if(x.isDataArrayTexture)if(Ft){if(te&&e.texStorage3D(i.TEXTURE_2D_ARRAY,lt,Pt,et.width,et.height,et.depth),F)if(x.layerUpdates.size>0){const q=Nl(et.width,et.height,x.format,x.type);for(const $ of x.layerUpdates){const dt=et.data.subarray($*q/et.data.BYTES_PER_ELEMENT,($+1)*q/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,$,et.width,et.height,1,gt,Rt,dt)}x.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,gt,Rt,et.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Pt,et.width,et.height,et.depth,0,gt,Rt,et.data);else if(x.isData3DTexture)Ft?(te&&e.texStorage3D(i.TEXTURE_3D,lt,Pt,et.width,et.height,et.depth),F&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,gt,Rt,et.data)):e.texImage3D(i.TEXTURE_3D,0,Pt,et.width,et.height,et.depth,0,gt,Rt,et.data);else if(x.isFramebufferTexture){if(te)if(Ft)e.texStorage2D(i.TEXTURE_2D,lt,Pt,et.width,et.height);else{let q=et.width,$=et.height;for(let dt=0;dt<lt;dt++)e.texImage2D(i.TEXTURE_2D,dt,Pt,q,$,0,gt,Rt,null),q>>=1,$>>=1}}else if(Ht.length>0){if(Ft&&te){const q=bt(Ht[0]);e.texStorage2D(i.TEXTURE_2D,lt,Pt,q.width,q.height)}for(let q=0,$=Ht.length;q<$;q++)_t=Ht[q],Ft?F&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,gt,Rt,_t):e.texImage2D(i.TEXTURE_2D,q,Pt,gt,Rt,_t);x.generateMipmaps=!1}else if(Ft){if(te){const q=bt(et);e.texStorage2D(i.TEXTURE_2D,lt,Pt,q.width,q.height)}F&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,gt,Rt,et)}else e.texImage2D(i.TEXTURE_2D,0,Pt,gt,Rt,et);m(x)&&p(K),yt.__version=Z.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function J(A,x,V){if(x.image.length!==6)return;const K=Lt(A,x),Q=x.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+V);const Z=n.get(Q);if(Q.version!==Z.__version||K===!0){e.activeTexture(i.TEXTURE0+V);const yt=Wt.getPrimaries(Wt.workingColorSpace),ct=x.colorSpace===Mn?null:Wt.getPrimaries(x.colorSpace),mt=x.colorSpace===Mn||yt===ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,mt);const Vt=x.isCompressedTexture||x.image[0].isCompressedTexture,et=x.image[0]&&x.image[0].isDataTexture,gt=[];for(let $=0;$<6;$++)!Vt&&!et?gt[$]=v(x.image[$],!0,s.maxCubemapSize):gt[$]=et?x.image[$].image:x.image[$],gt[$]=ne(x,gt[$]);const Rt=gt[0],Pt=r.convert(x.format,x.colorSpace),_t=r.convert(x.type),Ht=S(x.internalFormat,Pt,_t,x.colorSpace),Ft=x.isVideoTexture!==!0,te=Z.__version===void 0||K===!0,F=Q.dataReady;let lt=N(x,Rt);at(i.TEXTURE_CUBE_MAP,x);let q;if(Vt){Ft&&te&&e.texStorage2D(i.TEXTURE_CUBE_MAP,lt,Ht,Rt.width,Rt.height);for(let $=0;$<6;$++){q=gt[$].mipmaps;for(let dt=0;dt<q.length;dt++){const ut=q[dt];x.format!==Be?Pt!==null?Ft?F&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,dt,0,0,ut.width,ut.height,Pt,ut.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,dt,Ht,ut.width,ut.height,0,ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ft?F&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,dt,0,0,ut.width,ut.height,Pt,_t,ut.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,dt,Ht,ut.width,ut.height,0,Pt,_t,ut.data)}}}else{if(q=x.mipmaps,Ft&&te){q.length>0&&lt++;const $=bt(gt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,lt,Ht,$.width,$.height)}for(let $=0;$<6;$++)if(et){Ft?F&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,gt[$].width,gt[$].height,Pt,_t,gt[$].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Ht,gt[$].width,gt[$].height,0,Pt,_t,gt[$].data);for(let dt=0;dt<q.length;dt++){const Ut=q[dt].image[$].image;Ft?F&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,dt+1,0,0,Ut.width,Ut.height,Pt,_t,Ut.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,dt+1,Ht,Ut.width,Ut.height,0,Pt,_t,Ut.data)}}else{Ft?F&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Pt,_t,gt[$]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Ht,Pt,_t,gt[$]);for(let dt=0;dt<q.length;dt++){const ut=q[dt];Ft?F&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,dt+1,0,0,Pt,_t,ut.image[$]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,dt+1,Ht,Pt,_t,ut.image[$])}}}m(x)&&p(i.TEXTURE_CUBE_MAP),Z.__version=Q.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function ft(A,x,V,K,Q,Z){const yt=r.convert(V.format,V.colorSpace),ct=r.convert(V.type),mt=S(V.internalFormat,yt,ct,V.colorSpace),Vt=n.get(x),et=n.get(V);if(et.__renderTarget=x,!Vt.__hasExternalTextures){const gt=Math.max(1,x.width>>Z),Rt=Math.max(1,x.height>>Z);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,Z,mt,gt,Rt,x.depth,0,yt,ct,null):e.texImage2D(Q,Z,mt,gt,Rt,0,yt,ct,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),kt(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Q,et.__webglTexture,0,Bt(x)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,Q,et.__webglTexture,Z),e.bindFramebuffer(i.FRAMEBUFFER,null)}function it(A,x,V){if(i.bindRenderbuffer(i.RENDERBUFFER,A),x.depthBuffer){const K=x.depthTexture,Q=K&&K.isDepthTexture?K.type:null,Z=_(x.stencilBuffer,Q),yt=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=Bt(x);kt(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ct,Z,x.width,x.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,ct,Z,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,Z,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,yt,i.RENDERBUFFER,A)}else{const K=x.textures;for(let Q=0;Q<K.length;Q++){const Z=K[Q],yt=r.convert(Z.format,Z.colorSpace),ct=r.convert(Z.type),mt=S(Z.internalFormat,yt,ct,Z.colorSpace),Vt=Bt(x);V&&kt(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Vt,mt,x.width,x.height):kt(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Vt,mt,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,mt,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Tt(A,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(x.depthTexture);K.__renderTarget=x,(!K.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),k(x.depthTexture,0);const Q=K.__webglTexture,Z=Bt(x);if(x.depthTexture.format===fi)kt(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(x.depthTexture.format===qi)kt(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Ct(A){const x=n.get(A),V=A.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==A.depthTexture){const K=A.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),K){const Q=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,K.removeEventListener("dispose",Q)};K.addEventListener("dispose",Q),x.__depthDisposeCallback=Q}x.__boundDepthTexture=K}if(A.depthTexture&&!x.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");Tt(x.__webglFramebuffer,A)}else if(V){x.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[K]),x.__webglDepthbuffer[K]===void 0)x.__webglDepthbuffer[K]=i.createRenderbuffer(),it(x.__webglDepthbuffer[K],A,!1);else{const Q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=x.__webglDepthbuffer[K];i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,Z)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),it(x.__webglDepthbuffer,A,!1);else{const K=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Q=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Q),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,Q)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function zt(A,x,V){const K=n.get(A);x!==void 0&&ft(K.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&Ct(A)}function ce(A){const x=A.texture,V=n.get(A),K=n.get(x);A.addEventListener("dispose",C);const Q=A.textures,Z=A.isWebGLCubeRenderTarget===!0,yt=Q.length>1;if(yt||(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=x.version,o.memory.textures++),Z){V.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(x.mipmaps&&x.mipmaps.length>0){V.__webglFramebuffer[ct]=[];for(let mt=0;mt<x.mipmaps.length;mt++)V.__webglFramebuffer[ct][mt]=i.createFramebuffer()}else V.__webglFramebuffer[ct]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){V.__webglFramebuffer=[];for(let ct=0;ct<x.mipmaps.length;ct++)V.__webglFramebuffer[ct]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(yt)for(let ct=0,mt=Q.length;ct<mt;ct++){const Vt=n.get(Q[ct]);Vt.__webglTexture===void 0&&(Vt.__webglTexture=i.createTexture(),o.memory.textures++)}if(A.samples>0&&kt(A)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let ct=0;ct<Q.length;ct++){const mt=Q[ct];V.__webglColorRenderbuffer[ct]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[ct]);const Vt=r.convert(mt.format,mt.colorSpace),et=r.convert(mt.type),gt=S(mt.internalFormat,Vt,et,mt.colorSpace,A.isXRRenderTarget===!0),Rt=Bt(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Rt,gt,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,V.__webglColorRenderbuffer[ct])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),it(V.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){e.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),at(i.TEXTURE_CUBE_MAP,x);for(let ct=0;ct<6;ct++)if(x.mipmaps&&x.mipmaps.length>0)for(let mt=0;mt<x.mipmaps.length;mt++)ft(V.__webglFramebuffer[ct][mt],A,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,mt);else ft(V.__webglFramebuffer[ct],A,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);m(x)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(yt){for(let ct=0,mt=Q.length;ct<mt;ct++){const Vt=Q[ct],et=n.get(Vt);e.bindTexture(i.TEXTURE_2D,et.__webglTexture),at(i.TEXTURE_2D,Vt),ft(V.__webglFramebuffer,A,Vt,i.COLOR_ATTACHMENT0+ct,i.TEXTURE_2D,0),m(Vt)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let ct=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ct=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ct,K.__webglTexture),at(ct,x),x.mipmaps&&x.mipmaps.length>0)for(let mt=0;mt<x.mipmaps.length;mt++)ft(V.__webglFramebuffer[mt],A,x,i.COLOR_ATTACHMENT0,ct,mt);else ft(V.__webglFramebuffer,A,x,i.COLOR_ATTACHMENT0,ct,0);m(x)&&p(ct),e.unbindTexture()}A.depthBuffer&&Ct(A)}function Gt(A){const x=A.textures;for(let V=0,K=x.length;V<K;V++){const Q=x[V];if(m(Q)){const Z=T(A),yt=n.get(Q).__webglTexture;e.bindTexture(Z,yt),p(Z),e.unbindTexture()}}}const he=[],B=[];function Ye(A){if(A.samples>0){if(kt(A)===!1){const x=A.textures,V=A.width,K=A.height;let Q=i.COLOR_BUFFER_BIT;const Z=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,yt=n.get(A),ct=x.length>1;if(ct)for(let mt=0;mt<x.length;mt++)e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,yt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,yt.__webglFramebuffer);for(let mt=0;mt<x.length;mt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),ct){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,yt.__webglColorRenderbuffer[mt]);const Vt=n.get(x[mt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Vt,0)}i.blitFramebuffer(0,0,V,K,0,0,V,K,Q,i.NEAREST),l===!0&&(he.length=0,B.length=0,he.push(i.COLOR_ATTACHMENT0+mt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(he.push(Z),B.push(Z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,B)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,he))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ct)for(let mt=0;mt<x.length;mt++){e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.RENDERBUFFER,yt.__webglColorRenderbuffer[mt]);const Vt=n.get(x[mt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.TEXTURE_2D,Vt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,yt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const x=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function Bt(A){return Math.min(s.maxSamples,A.samples)}function kt(A){const x=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function At(A){const x=o.render.frame;c.get(A)!==x&&(c.set(A,x),A.update())}function ne(A,x){const V=A.colorSpace,K=A.format,Q=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||V!==Zi&&V!==Mn&&(Wt.getTransfer(V)===Jt?(K!==Be||Q!==An)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),x}function bt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(u.width=A.naturalWidth||A.width,u.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(u.width=A.displayWidth,u.height=A.displayHeight):(u.width=A.width,u.height=A.height),u}this.allocateTextureUnit=w,this.resetTextureUnits=H,this.setTexture2D=k,this.setTexture2DArray=G,this.setTexture3D=b,this.setTextureCube=D,this.rebindTextures=zt,this.setupRenderTarget=ce,this.updateRenderTargetMipmap=Gt,this.updateMultisampleRenderTarget=Ye,this.setupDepthRenderbuffer=Ct,this.setupFrameBufferTexture=ft,this.useMultisampledRTT=kt}function i0(i,t){function e(n,s=Mn){let r;const o=Wt.getTransfer(s);if(n===An)return i.UNSIGNED_BYTE;if(n===ua)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ha)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ac)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===rc)return i.BYTE;if(n===oc)return i.SHORT;if(n===vs)return i.UNSIGNED_SHORT;if(n===ca)return i.INT;if(n===Yn)return i.UNSIGNED_INT;if(n===nn)return i.FLOAT;if(n===pi)return i.HALF_FLOAT;if(n===lc)return i.ALPHA;if(n===cc)return i.RGB;if(n===Be)return i.RGBA;if(n===uc)return i.LUMINANCE;if(n===hc)return i.LUMINANCE_ALPHA;if(n===fi)return i.DEPTH_COMPONENT;if(n===qi)return i.DEPTH_STENCIL;if(n===fa)return i.RED;if(n===da)return i.RED_INTEGER;if(n===fc)return i.RG;if(n===pa)return i.RG_INTEGER;if(n===ma)return i.RGBA_INTEGER;if(n===ir||n===sr||n===rr||n===or)if(o===Jt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ir)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ir)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===sr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===rr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===or)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ao||n===wo||n===Ro||n===Co)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ao)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===wo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ro)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Co)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Po||n===Do||n===Lo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Po||n===Do)return o===Jt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Lo)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Uo||n===Io||n===No||n===Fo||n===Oo||n===zo||n===Bo||n===ko||n===Ho||n===Go||n===Vo||n===Wo||n===Xo||n===Yo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Uo)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Io)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===No)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Fo)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Oo)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===zo)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Bo)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ko)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ho)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Go)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Vo)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Wo)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Xo)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Yo)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ar||n===qo||n===jo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ar)return o===Jt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===qo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===jo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===dc||n===Zo||n===Ko||n===$o)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ar)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Zo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ko)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===$o)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Yi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class s0 extends Ve{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class We extends le{constructor(){super(),this.isGroup=!0,this.type="Group"}}const r0={type:"move"};class Qr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new We,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new We,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new We,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,u=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(u&&t.hand){o=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),p=this._getHandJoint(u,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const c=u.joints["index-finger-tip"],h=u.joints["thumb-tip"],f=c.position.distanceTo(h.position),d=.02,g=.005;u.inputState.pinching&&f>d+g?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!u.inputState.pinching&&f<=d-g&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(r0)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),u!==null&&(u.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new We;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const o0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,a0=`
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

}`;class l0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new we,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new sn({vertexShader:o0,fragmentShader:a0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Zt(new Pn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class c0 extends gi{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,u=null,c=null,h=null,f=null,d=null,g=null;const v=new l0,m=e.getContextAttributes();let p=null,T=null;const S=[],_=[],N=new vt;let R=null;const C=new Ve;C.viewport=new ae;const I=new Ve;I.viewport=new ae;const E=[C,I],M=new s0;let P=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let J=S[j];return J===void 0&&(J=new Qr,S[j]=J),J.getTargetRaySpace()},this.getControllerGrip=function(j){let J=S[j];return J===void 0&&(J=new Qr,S[j]=J),J.getGripSpace()},this.getHand=function(j){let J=S[j];return J===void 0&&(J=new Qr,S[j]=J),J.getHandSpace()};function w(j){const J=_.indexOf(j.inputSource);if(J===-1)return;const ft=S[J];ft!==void 0&&(ft.update(j.inputSource,j.frame,u||o),ft.dispatchEvent({type:j.type,data:j.inputSource}))}function L(){s.removeEventListener("select",w),s.removeEventListener("selectstart",w),s.removeEventListener("selectend",w),s.removeEventListener("squeeze",w),s.removeEventListener("squeezestart",w),s.removeEventListener("squeezeend",w),s.removeEventListener("end",L),s.removeEventListener("inputsourceschange",k);for(let j=0;j<S.length;j++){const J=_[j];J!==null&&(_[j]=null,S[j].disconnect(J))}P=null,H=null,v.reset(),t.setRenderTarget(p),d=null,f=null,h=null,s=null,T=null,Lt.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(N.width,N.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||o},this.setReferenceSpace=function(j){u=j},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",w),s.addEventListener("selectstart",w),s.addEventListener("selectend",w),s.addEventListener("squeeze",w),s.addEventListener("squeezestart",w),s.addEventListener("squeezeend",w),s.addEventListener("end",L),s.addEventListener("inputsourceschange",k),m.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(N),s.renderState.layers===void 0){const J={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,J),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),T=new wn(d.framebufferWidth,d.framebufferHeight,{format:Be,type:An,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let J=null,ft=null,it=null;m.depth&&(it=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,J=m.stencil?qi:fi,ft=m.stencil?Yi:Yn);const Tt={colorFormat:e.RGBA8,depthFormat:it,scaleFactor:r};h=new XRWebGLBinding(s,e),f=h.createProjectionLayer(Tt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),T=new wn(f.textureWidth,f.textureHeight,{format:Be,type:An,depthTexture:new Sa(f.textureWidth,f.textureHeight,ft,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),u=null,o=await s.requestReferenceSpace(a),Lt.setContext(s),Lt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function k(j){for(let J=0;J<j.removed.length;J++){const ft=j.removed[J],it=_.indexOf(ft);it>=0&&(_[it]=null,S[it].disconnect(ft))}for(let J=0;J<j.added.length;J++){const ft=j.added[J];let it=_.indexOf(ft);if(it===-1){for(let Ct=0;Ct<S.length;Ct++)if(Ct>=_.length){_.push(ft),it=Ct;break}else if(_[Ct]===null){_[Ct]=ft,it=Ct;break}if(it===-1)break}const Tt=S[it];Tt&&Tt.connect(ft)}}const G=new U,b=new U;function D(j,J,ft){G.setFromMatrixPosition(J.matrixWorld),b.setFromMatrixPosition(ft.matrixWorld);const it=G.distanceTo(b),Tt=J.projectionMatrix.elements,Ct=ft.projectionMatrix.elements,zt=Tt[14]/(Tt[10]-1),ce=Tt[14]/(Tt[10]+1),Gt=(Tt[9]+1)/Tt[5],he=(Tt[9]-1)/Tt[5],B=(Tt[8]-1)/Tt[0],Ye=(Ct[8]+1)/Ct[0],Bt=zt*B,kt=zt*Ye,At=it/(-B+Ye),ne=At*-B;if(J.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(ne),j.translateZ(At),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Tt[10]===-1)j.projectionMatrix.copy(J.projectionMatrix),j.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const bt=zt+At,A=ce+At,x=Bt-ne,V=kt+(it-ne),K=Gt*ce/A*bt,Q=he*ce/A*bt;j.projectionMatrix.makePerspective(x,V,K,Q,bt,A),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function Y(j,J){J===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(J.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let J=j.near,ft=j.far;v.texture!==null&&(v.depthNear>0&&(J=v.depthNear),v.depthFar>0&&(ft=v.depthFar)),M.near=I.near=C.near=J,M.far=I.far=C.far=ft,(P!==M.near||H!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),P=M.near,H=M.far),C.layers.mask=j.layers.mask|2,I.layers.mask=j.layers.mask|4,M.layers.mask=C.layers.mask|I.layers.mask;const it=j.parent,Tt=M.cameras;Y(M,it);for(let Ct=0;Ct<Tt.length;Ct++)Y(Tt[Ct],it);Tt.length===2?D(M,C,I):M.projectionMatrix.copy(C.projectionMatrix),tt(j,M,it)};function tt(j,J,ft){ft===null?j.matrix.copy(J.matrixWorld):(j.matrix.copy(ft.matrixWorld),j.matrix.invert(),j.matrix.multiply(J.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(J.projectionMatrix),j.projectionMatrixInverse.copy(J.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=xs*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(j){l=j,f!==null&&(f.fixedFoveation=j),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=j)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)};let ot=null;function at(j,J){if(c=J.getViewerPose(u||o),g=J,c!==null){const ft=c.views;d!==null&&(t.setRenderTargetFramebuffer(T,d.framebuffer),t.setRenderTarget(T));let it=!1;ft.length!==M.cameras.length&&(M.cameras.length=0,it=!0);for(let Ct=0;Ct<ft.length;Ct++){const zt=ft[Ct];let ce=null;if(d!==null)ce=d.getViewport(zt);else{const he=h.getViewSubImage(f,zt);ce=he.viewport,Ct===0&&(t.setRenderTargetTextures(T,he.colorTexture,f.ignoreDepthValues?void 0:he.depthStencilTexture),t.setRenderTarget(T))}let Gt=E[Ct];Gt===void 0&&(Gt=new Ve,Gt.layers.enable(Ct),Gt.viewport=new ae,E[Ct]=Gt),Gt.matrix.fromArray(zt.transform.matrix),Gt.matrix.decompose(Gt.position,Gt.quaternion,Gt.scale),Gt.projectionMatrix.fromArray(zt.projectionMatrix),Gt.projectionMatrixInverse.copy(Gt.projectionMatrix).invert(),Gt.viewport.set(ce.x,ce.y,ce.width,ce.height),Ct===0&&(M.matrix.copy(Gt.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),it===!0&&M.cameras.push(Gt)}const Tt=s.enabledFeatures;if(Tt&&Tt.includes("depth-sensing")){const Ct=h.getDepthInformation(ft[0]);Ct&&Ct.isValid&&Ct.texture&&v.init(t,Ct,s.renderState)}}for(let ft=0;ft<S.length;ft++){const it=_[ft],Tt=S[ft];it!==null&&Tt!==void 0&&Tt.update(it,J,u||o)}ot&&ot(j,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),g=null}const Lt=new wc;Lt.setAnimationLoop(at),this.setAnimationLoop=function(j){ot=j},this.dispose=function(){}}}const ii=new un,u0=new Yt;function h0(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Tc(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,T,S,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),c(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,T,S):p.isSpriteMaterial?u(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Le&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Le&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const T=t.get(p),S=T.envMap,_=T.envMapRotation;S&&(m.envMap.value=S,ii.copy(_),ii.x*=-1,ii.y*=-1,ii.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(ii.y*=-1,ii.z*=-1),m.envMapRotation.value.setFromMatrix4(u0.makeRotationFromEuler(ii)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,T,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*T,m.scale.value=S*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,T){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Le&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const T=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function f0(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,S){const _=S.program;n.uniformBlockBinding(T,_)}function u(T,S){let _=s[T.id];_===void 0&&(g(T),_=c(T),s[T.id]=_,T.addEventListener("dispose",m));const N=S.program;n.updateUBOMapping(T,N);const R=t.render.frame;r[T.id]!==R&&(f(T),r[T.id]=R)}function c(T){const S=h();T.__bindingPointIndex=S;const _=i.createBuffer(),N=T.__size,R=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,N,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,_),_}function h(){for(let T=0;T<a;T++)if(o.indexOf(T)===-1)return o.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(T){const S=s[T.id],_=T.uniforms,N=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let R=0,C=_.length;R<C;R++){const I=Array.isArray(_[R])?_[R]:[_[R]];for(let E=0,M=I.length;E<M;E++){const P=I[E];if(d(P,R,E,N)===!0){const H=P.__offset,w=Array.isArray(P.value)?P.value:[P.value];let L=0;for(let k=0;k<w.length;k++){const G=w[k],b=v(G);typeof G=="number"||typeof G=="boolean"?(P.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,H+L,P.__data)):G.isMatrix3?(P.__data[0]=G.elements[0],P.__data[1]=G.elements[1],P.__data[2]=G.elements[2],P.__data[3]=0,P.__data[4]=G.elements[3],P.__data[5]=G.elements[4],P.__data[6]=G.elements[5],P.__data[7]=0,P.__data[8]=G.elements[6],P.__data[9]=G.elements[7],P.__data[10]=G.elements[8],P.__data[11]=0):(G.toArray(P.__data,L),L+=b.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,H,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(T,S,_,N){const R=T.value,C=S+"_"+_;if(N[C]===void 0)return typeof R=="number"||typeof R=="boolean"?N[C]=R:N[C]=R.clone(),!0;{const I=N[C];if(typeof R=="number"||typeof R=="boolean"){if(I!==R)return N[C]=R,!0}else if(I.equals(R)===!1)return I.copy(R),!0}return!1}function g(T){const S=T.uniforms;let _=0;const N=16;for(let C=0,I=S.length;C<I;C++){const E=Array.isArray(S[C])?S[C]:[S[C]];for(let M=0,P=E.length;M<P;M++){const H=E[M],w=Array.isArray(H.value)?H.value:[H.value];for(let L=0,k=w.length;L<k;L++){const G=w[L],b=v(G),D=_%N,Y=D%b.boundary,tt=D+Y;_+=Y,tt!==0&&N-tt<b.storage&&(_+=N-tt),H.__data=new Float32Array(b.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=_,_+=b.storage}}}const R=_%N;return R>0&&(_+=N-R),T.__size=_,T.__cache={},this}function v(T){const S={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(S.boundary=4,S.storage=4):T.isVector2?(S.boundary=8,S.storage=8):T.isVector3||T.isColor?(S.boundary=16,S.storage=12):T.isVector4?(S.boundary=16,S.storage=16):T.isMatrix3?(S.boundary=48,S.storage=48):T.isMatrix4?(S.boundary=64,S.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),S}function m(T){const S=T.target;S.removeEventListener("dispose",m);const _=o.indexOf(S.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function p(){for(const T in s)i.deleteBuffer(s[T]);o=[],s={},r={}}return{bind:l,update:u,dispose:p}}class d0{constructor(t={}){const{canvas:e=th(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const T=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Oe,this.toneMapping=Wn,this.toneMappingExposure=1;const _=this;let N=!1,R=0,C=0,I=null,E=-1,M=null;const P=new ae,H=new ae;let w=null;const L=new st(0);let k=0,G=e.width,b=e.height,D=1,Y=null,tt=null;const ot=new ae(0,0,G,b),at=new ae(0,0,G,b);let Lt=!1;const j=new xa;let J=!1,ft=!1;const it=new Yt,Tt=new Yt,Ct=new U,zt=new ae,ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Gt=!1;function he(){return I===null?D:1}let B=n;function Ye(y,O){return e.getContext(y,O)}try{const y={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:c,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${la}`),e.addEventListener("webglcontextlost",$,!1),e.addEventListener("webglcontextrestored",dt,!1),e.addEventListener("webglcontextcreationerror",ut,!1),B===null){const O="webgl2";if(B=Ye(O,y),B===null)throw Ye(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let Bt,kt,At,ne,bt,A,x,V,K,Q,Z,yt,ct,mt,Vt,et,gt,Rt,Pt,_t,Ht,Ft,te,F;function lt(){Bt=new vp(B),Bt.init(),Ft=new i0(B,Bt),kt=new fp(B,Bt,t,Ft),At=new t0(B,Bt),kt.reverseDepthBuffer&&f&&At.buffers.depth.setReversed(!0),ne=new Sp(B),bt=new Bm,A=new n0(B,Bt,At,bt,kt,Ft,ne),x=new pp(_),V=new _p(_),K=new wh(B),te=new up(B,K),Q=new xp(B,K,ne,te),Z=new Ep(B,Q,K,ne),Pt=new yp(B,kt,A),et=new dp(bt),yt=new zm(_,x,V,Bt,kt,te,et),ct=new h0(_,bt),mt=new Hm,Vt=new qm(Bt),Rt=new cp(_,x,V,At,Z,d,l),gt=new Jm(_,Z,kt),F=new f0(B,ne,kt,At),_t=new hp(B,Bt,ne),Ht=new Mp(B,Bt,ne),ne.programs=yt.programs,_.capabilities=kt,_.extensions=Bt,_.properties=bt,_.renderLists=mt,_.shadowMap=gt,_.state=At,_.info=ne}lt();const q=new c0(_,B);this.xr=q,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const y=Bt.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Bt.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return D},this.setPixelRatio=function(y){y!==void 0&&(D=y,this.setSize(G,b,!1))},this.getSize=function(y){return y.set(G,b)},this.setSize=function(y,O,W=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=y,b=O,e.width=Math.floor(y*D),e.height=Math.floor(O*D),W===!0&&(e.style.width=y+"px",e.style.height=O+"px"),this.setViewport(0,0,y,O)},this.getDrawingBufferSize=function(y){return y.set(G*D,b*D).floor()},this.setDrawingBufferSize=function(y,O,W){G=y,b=O,D=W,e.width=Math.floor(y*W),e.height=Math.floor(O*W),this.setViewport(0,0,y,O)},this.getCurrentViewport=function(y){return y.copy(P)},this.getViewport=function(y){return y.copy(ot)},this.setViewport=function(y,O,W,X){y.isVector4?ot.set(y.x,y.y,y.z,y.w):ot.set(y,O,W,X),At.viewport(P.copy(ot).multiplyScalar(D).round())},this.getScissor=function(y){return y.copy(at)},this.setScissor=function(y,O,W,X){y.isVector4?at.set(y.x,y.y,y.z,y.w):at.set(y,O,W,X),At.scissor(H.copy(at).multiplyScalar(D).round())},this.getScissorTest=function(){return Lt},this.setScissorTest=function(y){At.setScissorTest(Lt=y)},this.setOpaqueSort=function(y){Y=y},this.setTransparentSort=function(y){tt=y},this.getClearColor=function(y){return y.copy(Rt.getClearColor())},this.setClearColor=function(){Rt.setClearColor.apply(Rt,arguments)},this.getClearAlpha=function(){return Rt.getClearAlpha()},this.setClearAlpha=function(){Rt.setClearAlpha.apply(Rt,arguments)},this.clear=function(y=!0,O=!0,W=!0){let X=0;if(y){let z=!1;if(I!==null){const nt=I.texture.format;z=nt===ma||nt===pa||nt===da}if(z){const nt=I.texture.type,ht=nt===An||nt===Yn||nt===vs||nt===Yi||nt===ua||nt===ha,xt=Rt.getClearColor(),Mt=Rt.getClearAlpha(),Dt=xt.r,It=xt.g,St=xt.b;ht?(g[0]=Dt,g[1]=It,g[2]=St,g[3]=Mt,B.clearBufferuiv(B.COLOR,0,g)):(v[0]=Dt,v[1]=It,v[2]=St,v[3]=Mt,B.clearBufferiv(B.COLOR,0,v))}else X|=B.COLOR_BUFFER_BIT}O&&(X|=B.DEPTH_BUFFER_BIT),W&&(X|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",$,!1),e.removeEventListener("webglcontextrestored",dt,!1),e.removeEventListener("webglcontextcreationerror",ut,!1),mt.dispose(),Vt.dispose(),bt.dispose(),x.dispose(),V.dispose(),Z.dispose(),te.dispose(),F.dispose(),yt.dispose(),q.dispose(),q.removeEventListener("sessionstart",Da),q.removeEventListener("sessionend",La),$n.stop()};function $(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),N=!0}function dt(){console.log("THREE.WebGLRenderer: Context Restored."),N=!1;const y=ne.autoReset,O=gt.enabled,W=gt.autoUpdate,X=gt.needsUpdate,z=gt.type;lt(),ne.autoReset=y,gt.enabled=O,gt.autoUpdate=W,gt.needsUpdate=X,gt.type=z}function ut(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Ut(y){const O=y.target;O.removeEventListener("dispose",Ut),ue(O)}function ue(y){Te(y),bt.remove(y)}function Te(y){const O=bt.get(y).programs;O!==void 0&&(O.forEach(function(W){yt.releaseProgram(W)}),y.isShaderMaterial&&yt.releaseShaderCache(y))}this.renderBufferDirect=function(y,O,W,X,z,nt){O===null&&(O=ce);const ht=z.isMesh&&z.matrixWorld.determinant()<0,xt=Kc(y,O,W,X,z);At.setMaterial(X,ht);let Mt=W.index,Dt=1;if(X.wireframe===!0){if(Mt=Q.getWireframeAttribute(W),Mt===void 0)return;Dt=2}const It=W.drawRange,St=W.attributes.position;let Xt=It.start*Dt,ee=(It.start+It.count)*Dt;nt!==null&&(Xt=Math.max(Xt,nt.start*Dt),ee=Math.min(ee,(nt.start+nt.count)*Dt)),Mt!==null?(Xt=Math.max(Xt,0),ee=Math.min(ee,Mt.count)):St!=null&&(Xt=Math.max(Xt,0),ee=Math.min(ee,St.count));const ie=ee-Xt;if(ie<0||ie===1/0)return;te.setup(z,X,xt,W,Mt);let Ie,qt=_t;if(Mt!==null&&(Ie=K.get(Mt),qt=Ht,qt.setIndex(Ie)),z.isMesh)X.wireframe===!0?(At.setLineWidth(X.wireframeLinewidth*he()),qt.setMode(B.LINES)):qt.setMode(B.TRIANGLES);else if(z.isLine){let Et=X.linewidth;Et===void 0&&(Et=1),At.setLineWidth(Et*he()),z.isLineSegments?qt.setMode(B.LINES):z.isLineLoop?qt.setMode(B.LINE_LOOP):qt.setMode(B.LINE_STRIP)}else z.isPoints?qt.setMode(B.POINTS):z.isSprite&&qt.setMode(B.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)qt.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(Bt.get("WEBGL_multi_draw"))qt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const Et=z._multiDrawStarts,fn=z._multiDrawCounts,jt=z._multiDrawCount,$e=Mt?K.get(Mt).bytesPerElement:1,vi=bt.get(X).currentProgram.getUniforms();for(let ke=0;ke<jt;ke++)vi.setValue(B,"_gl_DrawID",ke),qt.render(Et[ke]/$e,fn[ke])}else if(z.isInstancedMesh)qt.renderInstances(Xt,ie,z.count);else if(W.isInstancedBufferGeometry){const Et=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,fn=Math.min(W.instanceCount,Et);qt.renderInstances(Xt,ie,fn)}else qt.render(Xt,ie)};function Kt(y,O,W){y.transparent===!0&&y.side===ye&&y.forceSinglePass===!1?(y.side=Le,y.needsUpdate=!0,Ts(y,O,W),y.side=Xn,y.needsUpdate=!0,Ts(y,O,W),y.side=ye):Ts(y,O,W)}this.compile=function(y,O,W=null){W===null&&(W=y),p=Vt.get(W),p.init(O),S.push(p),W.traverseVisible(function(z){z.isLight&&z.layers.test(O.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),y!==W&&y.traverseVisible(function(z){z.isLight&&z.layers.test(O.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),p.setupLights();const X=new Set;return y.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const nt=z.material;if(nt)if(Array.isArray(nt))for(let ht=0;ht<nt.length;ht++){const xt=nt[ht];Kt(xt,W,z),X.add(xt)}else Kt(nt,W,z),X.add(nt)}),S.pop(),p=null,X},this.compileAsync=function(y,O,W=null){const X=this.compile(y,O,W);return new Promise(z=>{function nt(){if(X.forEach(function(ht){bt.get(ht).currentProgram.isReady()&&X.delete(ht)}),X.size===0){z(y);return}setTimeout(nt,10)}Bt.get("KHR_parallel_shader_compile")!==null?nt():setTimeout(nt,10)})};let Ke=null;function hn(y){Ke&&Ke(y)}function Da(){$n.stop()}function La(){$n.start()}const $n=new wc;$n.setAnimationLoop(hn),typeof self<"u"&&$n.setContext(self),this.setAnimationLoop=function(y){Ke=y,q.setAnimationLoop(y),y===null?$n.stop():$n.start()},q.addEventListener("sessionstart",Da),q.addEventListener("sessionend",La),this.render=function(y,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(O),O=q.getCamera()),y.isScene===!0&&y.onBeforeRender(_,y,O,I),p=Vt.get(y,S.length),p.init(O),S.push(p),Tt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),j.setFromProjectionMatrix(Tt),ft=this.localClippingEnabled,J=et.init(this.clippingPlanes,ft),m=mt.get(y,T.length),m.init(),T.push(m),q.enabled===!0&&q.isPresenting===!0){const nt=_.xr.getDepthSensingMesh();nt!==null&&br(nt,O,-1/0,_.sortObjects)}br(y,O,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(Y,tt),Gt=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,Gt&&Rt.addToRenderList(m,y),this.info.render.frame++,J===!0&&et.beginShadows();const W=p.state.shadowsArray;gt.render(W,y,O),J===!0&&et.endShadows(),this.info.autoReset===!0&&this.info.reset();const X=m.opaque,z=m.transmissive;if(p.setupLights(),O.isArrayCamera){const nt=O.cameras;if(z.length>0)for(let ht=0,xt=nt.length;ht<xt;ht++){const Mt=nt[ht];Ia(X,z,y,Mt)}Gt&&Rt.render(y);for(let ht=0,xt=nt.length;ht<xt;ht++){const Mt=nt[ht];Ua(m,y,Mt,Mt.viewport)}}else z.length>0&&Ia(X,z,y,O),Gt&&Rt.render(y),Ua(m,y,O);I!==null&&(A.updateMultisampleRenderTarget(I),A.updateRenderTargetMipmap(I)),y.isScene===!0&&y.onAfterRender(_,y,O),te.resetDefaultState(),E=-1,M=null,S.pop(),S.length>0?(p=S[S.length-1],J===!0&&et.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,T.pop(),T.length>0?m=T[T.length-1]:m=null};function br(y,O,W,X){if(y.visible===!1)return;if(y.layers.test(O.layers)){if(y.isGroup)W=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(O);else if(y.isLight)p.pushLight(y),y.castShadow&&p.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||j.intersectsSprite(y)){X&&zt.setFromMatrixPosition(y.matrixWorld).applyMatrix4(Tt);const ht=Z.update(y),xt=y.material;xt.visible&&m.push(y,ht,xt,W,zt.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||j.intersectsObject(y))){const ht=Z.update(y),xt=y.material;if(X&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),zt.copy(y.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),zt.copy(ht.boundingSphere.center)),zt.applyMatrix4(y.matrixWorld).applyMatrix4(Tt)),Array.isArray(xt)){const Mt=ht.groups;for(let Dt=0,It=Mt.length;Dt<It;Dt++){const St=Mt[Dt],Xt=xt[St.materialIndex];Xt&&Xt.visible&&m.push(y,ht,Xt,W,zt.z,St)}}else xt.visible&&m.push(y,ht,xt,W,zt.z,null)}}const nt=y.children;for(let ht=0,xt=nt.length;ht<xt;ht++)br(nt[ht],O,W,X)}function Ua(y,O,W,X){const z=y.opaque,nt=y.transmissive,ht=y.transparent;p.setupLightsView(W),J===!0&&et.setGlobalState(_.clippingPlanes,W),X&&At.viewport(P.copy(X)),z.length>0&&Es(z,O,W),nt.length>0&&Es(nt,O,W),ht.length>0&&Es(ht,O,W),At.buffers.depth.setTest(!0),At.buffers.depth.setMask(!0),At.buffers.color.setMask(!0),At.setPolygonOffset(!1)}function Ia(y,O,W,X){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[X.id]===void 0&&(p.state.transmissionRenderTarget[X.id]=new wn(1,1,{generateMipmaps:!0,type:Bt.has("EXT_color_buffer_half_float")||Bt.has("EXT_color_buffer_float")?pi:An,minFilter:ci,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Wt.workingColorSpace}));const nt=p.state.transmissionRenderTarget[X.id],ht=X.viewport||P;nt.setSize(ht.z,ht.w);const xt=_.getRenderTarget();_.setRenderTarget(nt),_.getClearColor(L),k=_.getClearAlpha(),k<1&&_.setClearColor(16777215,.5),_.clear(),Gt&&Rt.render(W);const Mt=_.toneMapping;_.toneMapping=Wn;const Dt=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),p.setupLightsView(X),J===!0&&et.setGlobalState(_.clippingPlanes,X),Es(y,W,X),A.updateMultisampleRenderTarget(nt),A.updateRenderTargetMipmap(nt),Bt.has("WEBGL_multisampled_render_to_texture")===!1){let It=!1;for(let St=0,Xt=O.length;St<Xt;St++){const ee=O[St],ie=ee.object,Ie=ee.geometry,qt=ee.material,Et=ee.group;if(qt.side===ye&&ie.layers.test(X.layers)){const fn=qt.side;qt.side=Le,qt.needsUpdate=!0,Na(ie,W,X,Ie,qt,Et),qt.side=fn,qt.needsUpdate=!0,It=!0}}It===!0&&(A.updateMultisampleRenderTarget(nt),A.updateRenderTargetMipmap(nt))}_.setRenderTarget(xt),_.setClearColor(L,k),Dt!==void 0&&(X.viewport=Dt),_.toneMapping=Mt}function Es(y,O,W){const X=O.isScene===!0?O.overrideMaterial:null;for(let z=0,nt=y.length;z<nt;z++){const ht=y[z],xt=ht.object,Mt=ht.geometry,Dt=X===null?ht.material:X,It=ht.group;xt.layers.test(W.layers)&&Na(xt,O,W,Mt,Dt,It)}}function Na(y,O,W,X,z,nt){y.onBeforeRender(_,O,W,X,z,nt),y.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),z.onBeforeRender(_,O,W,X,y,nt),z.transparent===!0&&z.side===ye&&z.forceSinglePass===!1?(z.side=Le,z.needsUpdate=!0,_.renderBufferDirect(W,O,X,z,y,nt),z.side=Xn,z.needsUpdate=!0,_.renderBufferDirect(W,O,X,z,y,nt),z.side=ye):_.renderBufferDirect(W,O,X,z,y,nt),y.onAfterRender(_,O,W,X,z,nt)}function Ts(y,O,W){O.isScene!==!0&&(O=ce);const X=bt.get(y),z=p.state.lights,nt=p.state.shadowsArray,ht=z.state.version,xt=yt.getParameters(y,z.state,nt,O,W),Mt=yt.getProgramCacheKey(xt);let Dt=X.programs;X.environment=y.isMeshStandardMaterial?O.environment:null,X.fog=O.fog,X.envMap=(y.isMeshStandardMaterial?V:x).get(y.envMap||X.environment),X.envMapRotation=X.environment!==null&&y.envMap===null?O.environmentRotation:y.envMapRotation,Dt===void 0&&(y.addEventListener("dispose",Ut),Dt=new Map,X.programs=Dt);let It=Dt.get(Mt);if(It!==void 0){if(X.currentProgram===It&&X.lightsStateVersion===ht)return Oa(y,xt),It}else xt.uniforms=yt.getUniforms(y),y.onBeforeCompile(xt,_),It=yt.acquireProgram(xt,Mt),Dt.set(Mt,It),X.uniforms=xt.uniforms;const St=X.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(St.clippingPlanes=et.uniform),Oa(y,xt),X.needsLights=Jc(y),X.lightsStateVersion=ht,X.needsLights&&(St.ambientLightColor.value=z.state.ambient,St.lightProbe.value=z.state.probe,St.directionalLights.value=z.state.directional,St.directionalLightShadows.value=z.state.directionalShadow,St.spotLights.value=z.state.spot,St.spotLightShadows.value=z.state.spotShadow,St.rectAreaLights.value=z.state.rectArea,St.ltc_1.value=z.state.rectAreaLTC1,St.ltc_2.value=z.state.rectAreaLTC2,St.pointLights.value=z.state.point,St.pointLightShadows.value=z.state.pointShadow,St.hemisphereLights.value=z.state.hemi,St.directionalShadowMap.value=z.state.directionalShadowMap,St.directionalShadowMatrix.value=z.state.directionalShadowMatrix,St.spotShadowMap.value=z.state.spotShadowMap,St.spotLightMatrix.value=z.state.spotLightMatrix,St.spotLightMap.value=z.state.spotLightMap,St.pointShadowMap.value=z.state.pointShadowMap,St.pointShadowMatrix.value=z.state.pointShadowMatrix),X.currentProgram=It,X.uniformsList=null,It}function Fa(y){if(y.uniformsList===null){const O=y.currentProgram.getUniforms();y.uniformsList=lr.seqWithValue(O.seq,y.uniforms)}return y.uniformsList}function Oa(y,O){const W=bt.get(y);W.outputColorSpace=O.outputColorSpace,W.batching=O.batching,W.batchingColor=O.batchingColor,W.instancing=O.instancing,W.instancingColor=O.instancingColor,W.instancingMorph=O.instancingMorph,W.skinning=O.skinning,W.morphTargets=O.morphTargets,W.morphNormals=O.morphNormals,W.morphColors=O.morphColors,W.morphTargetsCount=O.morphTargetsCount,W.numClippingPlanes=O.numClippingPlanes,W.numIntersection=O.numClipIntersection,W.vertexAlphas=O.vertexAlphas,W.vertexTangents=O.vertexTangents,W.toneMapping=O.toneMapping}function Kc(y,O,W,X,z){O.isScene!==!0&&(O=ce),A.resetTextureUnits();const nt=O.fog,ht=X.isMeshStandardMaterial?O.environment:null,xt=I===null?_.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Zi,Mt=(X.isMeshStandardMaterial?V:x).get(X.envMap||ht),Dt=X.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,It=!!W.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),St=!!W.morphAttributes.position,Xt=!!W.morphAttributes.normal,ee=!!W.morphAttributes.color;let ie=Wn;X.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(ie=_.toneMapping);const Ie=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,qt=Ie!==void 0?Ie.length:0,Et=bt.get(X),fn=p.state.lights;if(J===!0&&(ft===!0||y!==M)){const qe=y===M&&X.id===E;et.setState(X,y,qe)}let jt=!1;X.version===Et.__version?(Et.needsLights&&Et.lightsStateVersion!==fn.state.version||Et.outputColorSpace!==xt||z.isBatchedMesh&&Et.batching===!1||!z.isBatchedMesh&&Et.batching===!0||z.isBatchedMesh&&Et.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&Et.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&Et.instancing===!1||!z.isInstancedMesh&&Et.instancing===!0||z.isSkinnedMesh&&Et.skinning===!1||!z.isSkinnedMesh&&Et.skinning===!0||z.isInstancedMesh&&Et.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Et.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Et.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Et.instancingMorph===!1&&z.morphTexture!==null||Et.envMap!==Mt||X.fog===!0&&Et.fog!==nt||Et.numClippingPlanes!==void 0&&(Et.numClippingPlanes!==et.numPlanes||Et.numIntersection!==et.numIntersection)||Et.vertexAlphas!==Dt||Et.vertexTangents!==It||Et.morphTargets!==St||Et.morphNormals!==Xt||Et.morphColors!==ee||Et.toneMapping!==ie||Et.morphTargetsCount!==qt)&&(jt=!0):(jt=!0,Et.__version=X.version);let $e=Et.currentProgram;jt===!0&&($e=Ts(X,O,z));let vi=!1,ke=!1,ts=!1;const se=$e.getUniforms(),on=Et.uniforms;if(At.useProgram($e.program)&&(vi=!0,ke=!0,ts=!0),X.id!==E&&(E=X.id,ke=!0),vi||M!==y){At.buffers.depth.getReversed()?(it.copy(y.projectionMatrix),nh(it),ih(it),se.setValue(B,"projectionMatrix",it)):se.setValue(B,"projectionMatrix",y.projectionMatrix),se.setValue(B,"viewMatrix",y.matrixWorldInverse);const Dn=se.map.cameraPosition;Dn!==void 0&&Dn.setValue(B,Ct.setFromMatrixPosition(y.matrixWorld)),kt.logarithmicDepthBuffer&&se.setValue(B,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&se.setValue(B,"isOrthographic",y.isOrthographicCamera===!0),M!==y&&(M=y,ke=!0,ts=!0)}if(z.isSkinnedMesh){se.setOptional(B,z,"bindMatrix"),se.setOptional(B,z,"bindMatrixInverse");const qe=z.skeleton;qe&&(qe.boneTexture===null&&qe.computeBoneTexture(),se.setValue(B,"boneTexture",qe.boneTexture,A))}z.isBatchedMesh&&(se.setOptional(B,z,"batchingTexture"),se.setValue(B,"batchingTexture",z._matricesTexture,A),se.setOptional(B,z,"batchingIdTexture"),se.setValue(B,"batchingIdTexture",z._indirectTexture,A),se.setOptional(B,z,"batchingColorTexture"),z._colorsTexture!==null&&se.setValue(B,"batchingColorTexture",z._colorsTexture,A));const es=W.morphAttributes;if((es.position!==void 0||es.normal!==void 0||es.color!==void 0)&&Pt.update(z,W,$e),(ke||Et.receiveShadow!==z.receiveShadow)&&(Et.receiveShadow=z.receiveShadow,se.setValue(B,"receiveShadow",z.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(on.envMap.value=Mt,on.flipEnvMap.value=Mt.isCubeTexture&&Mt.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&O.environment!==null&&(on.envMapIntensity.value=O.environmentIntensity),ke&&(se.setValue(B,"toneMappingExposure",_.toneMappingExposure),Et.needsLights&&$c(on,ts),nt&&X.fog===!0&&ct.refreshFogUniforms(on,nt),ct.refreshMaterialUniforms(on,X,D,b,p.state.transmissionRenderTarget[y.id]),lr.upload(B,Fa(Et),on,A)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(lr.upload(B,Fa(Et),on,A),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&se.setValue(B,"center",z.center),se.setValue(B,"modelViewMatrix",z.modelViewMatrix),se.setValue(B,"normalMatrix",z.normalMatrix),se.setValue(B,"modelMatrix",z.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const qe=X.uniformsGroups;for(let Dn=0,Ln=qe.length;Dn<Ln;Dn++){const za=qe[Dn];F.update(za,$e),F.bind(za,$e)}}return $e}function $c(y,O){y.ambientLightColor.needsUpdate=O,y.lightProbe.needsUpdate=O,y.directionalLights.needsUpdate=O,y.directionalLightShadows.needsUpdate=O,y.pointLights.needsUpdate=O,y.pointLightShadows.needsUpdate=O,y.spotLights.needsUpdate=O,y.spotLightShadows.needsUpdate=O,y.rectAreaLights.needsUpdate=O,y.hemisphereLights.needsUpdate=O}function Jc(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(y,O,W){bt.get(y.texture).__webglTexture=O,bt.get(y.depthTexture).__webglTexture=W;const X=bt.get(y);X.__hasExternalTextures=!0,X.__autoAllocateDepthBuffer=W===void 0,X.__autoAllocateDepthBuffer||Bt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(y,O){const W=bt.get(y);W.__webglFramebuffer=O,W.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(y,O=0,W=0){I=y,R=O,C=W;let X=!0,z=null,nt=!1,ht=!1;if(y){const Mt=bt.get(y);if(Mt.__useDefaultFramebuffer!==void 0)At.bindFramebuffer(B.FRAMEBUFFER,null),X=!1;else if(Mt.__webglFramebuffer===void 0)A.setupRenderTarget(y);else if(Mt.__hasExternalTextures)A.rebindTextures(y,bt.get(y.texture).__webglTexture,bt.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const St=y.depthTexture;if(Mt.__boundDepthTexture!==St){if(St!==null&&bt.has(St)&&(y.width!==St.image.width||y.height!==St.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(y)}}const Dt=y.texture;(Dt.isData3DTexture||Dt.isDataArrayTexture||Dt.isCompressedArrayTexture)&&(ht=!0);const It=bt.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(It[O])?z=It[O][W]:z=It[O],nt=!0):y.samples>0&&A.useMultisampledRTT(y)===!1?z=bt.get(y).__webglMultisampledFramebuffer:Array.isArray(It)?z=It[W]:z=It,P.copy(y.viewport),H.copy(y.scissor),w=y.scissorTest}else P.copy(ot).multiplyScalar(D).floor(),H.copy(at).multiplyScalar(D).floor(),w=Lt;if(At.bindFramebuffer(B.FRAMEBUFFER,z)&&X&&At.drawBuffers(y,z),At.viewport(P),At.scissor(H),At.setScissorTest(w),nt){const Mt=bt.get(y.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+O,Mt.__webglTexture,W)}else if(ht){const Mt=bt.get(y.texture),Dt=O||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,Mt.__webglTexture,W||0,Dt)}E=-1},this.readRenderTargetPixels=function(y,O,W,X,z,nt,ht){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xt=bt.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ht!==void 0&&(xt=xt[ht]),xt){At.bindFramebuffer(B.FRAMEBUFFER,xt);try{const Mt=y.texture,Dt=Mt.format,It=Mt.type;if(!kt.textureFormatReadable(Dt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!kt.textureTypeReadable(It)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=y.width-X&&W>=0&&W<=y.height-z&&B.readPixels(O,W,X,z,Ft.convert(Dt),Ft.convert(It),nt)}finally{const Mt=I!==null?bt.get(I).__webglFramebuffer:null;At.bindFramebuffer(B.FRAMEBUFFER,Mt)}}},this.readRenderTargetPixelsAsync=async function(y,O,W,X,z,nt,ht){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xt=bt.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ht!==void 0&&(xt=xt[ht]),xt){const Mt=y.texture,Dt=Mt.format,It=Mt.type;if(!kt.textureFormatReadable(Dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!kt.textureTypeReadable(It))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=y.width-X&&W>=0&&W<=y.height-z){At.bindFramebuffer(B.FRAMEBUFFER,xt);const St=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,St),B.bufferData(B.PIXEL_PACK_BUFFER,nt.byteLength,B.STREAM_READ),B.readPixels(O,W,X,z,Ft.convert(Dt),Ft.convert(It),0);const Xt=I!==null?bt.get(I).__webglFramebuffer:null;At.bindFramebuffer(B.FRAMEBUFFER,Xt);const ee=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await eh(B,ee,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,St),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,nt),B.deleteBuffer(St),B.deleteSync(ee),nt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(y,O=null,W=0){y.isTexture!==!0&&(ds("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,y=arguments[1]);const X=Math.pow(2,-W),z=Math.floor(y.image.width*X),nt=Math.floor(y.image.height*X),ht=O!==null?O.x:0,xt=O!==null?O.y:0;A.setTexture2D(y,0),B.copyTexSubImage2D(B.TEXTURE_2D,W,0,0,ht,xt,z,nt),At.unbindTexture()},this.copyTextureToTexture=function(y,O,W=null,X=null,z=0){y.isTexture!==!0&&(ds("WebGLRenderer: copyTextureToTexture function signature has changed."),X=arguments[0]||null,y=arguments[1],O=arguments[2],z=arguments[3]||0,W=null);let nt,ht,xt,Mt,Dt,It,St,Xt,ee;const ie=y.isCompressedTexture?y.mipmaps[z]:y.image;W!==null?(nt=W.max.x-W.min.x,ht=W.max.y-W.min.y,xt=W.isBox3?W.max.z-W.min.z:1,Mt=W.min.x,Dt=W.min.y,It=W.isBox3?W.min.z:0):(nt=ie.width,ht=ie.height,xt=ie.depth||1,Mt=0,Dt=0,It=0),X!==null?(St=X.x,Xt=X.y,ee=X.z):(St=0,Xt=0,ee=0);const Ie=Ft.convert(O.format),qt=Ft.convert(O.type);let Et;O.isData3DTexture?(A.setTexture3D(O,0),Et=B.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(A.setTexture2DArray(O,0),Et=B.TEXTURE_2D_ARRAY):(A.setTexture2D(O,0),Et=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,O.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,O.unpackAlignment);const fn=B.getParameter(B.UNPACK_ROW_LENGTH),jt=B.getParameter(B.UNPACK_IMAGE_HEIGHT),$e=B.getParameter(B.UNPACK_SKIP_PIXELS),vi=B.getParameter(B.UNPACK_SKIP_ROWS),ke=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,ie.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,ie.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Mt),B.pixelStorei(B.UNPACK_SKIP_ROWS,Dt),B.pixelStorei(B.UNPACK_SKIP_IMAGES,It);const ts=y.isDataArrayTexture||y.isData3DTexture,se=O.isDataArrayTexture||O.isData3DTexture;if(y.isRenderTargetTexture||y.isDepthTexture){const on=bt.get(y),es=bt.get(O),qe=bt.get(on.__renderTarget),Dn=bt.get(es.__renderTarget);At.bindFramebuffer(B.READ_FRAMEBUFFER,qe.__webglFramebuffer),At.bindFramebuffer(B.DRAW_FRAMEBUFFER,Dn.__webglFramebuffer);for(let Ln=0;Ln<xt;Ln++)ts&&B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,bt.get(y).__webglTexture,z,It+Ln),y.isDepthTexture?(se&&B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,bt.get(O).__webglTexture,z,ee+Ln),B.blitFramebuffer(Mt,Dt,nt,ht,St,Xt,nt,ht,B.DEPTH_BUFFER_BIT,B.NEAREST)):se?B.copyTexSubImage3D(Et,z,St,Xt,ee+Ln,Mt,Dt,nt,ht):B.copyTexSubImage2D(Et,z,St,Xt,ee+Ln,Mt,Dt,nt,ht);At.bindFramebuffer(B.READ_FRAMEBUFFER,null),At.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else se?y.isDataTexture||y.isData3DTexture?B.texSubImage3D(Et,z,St,Xt,ee,nt,ht,xt,Ie,qt,ie.data):O.isCompressedArrayTexture?B.compressedTexSubImage3D(Et,z,St,Xt,ee,nt,ht,xt,Ie,ie.data):B.texSubImage3D(Et,z,St,Xt,ee,nt,ht,xt,Ie,qt,ie):y.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,z,St,Xt,nt,ht,Ie,qt,ie.data):y.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,z,St,Xt,ie.width,ie.height,Ie,ie.data):B.texSubImage2D(B.TEXTURE_2D,z,St,Xt,nt,ht,Ie,qt,ie);B.pixelStorei(B.UNPACK_ROW_LENGTH,fn),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,jt),B.pixelStorei(B.UNPACK_SKIP_PIXELS,$e),B.pixelStorei(B.UNPACK_SKIP_ROWS,vi),B.pixelStorei(B.UNPACK_SKIP_IMAGES,ke),z===0&&O.generateMipmaps&&B.generateMipmap(Et),At.unbindTexture()},this.copyTextureToTexture3D=function(y,O,W=null,X=null,z=0){return y.isTexture!==!0&&(ds("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,X=arguments[1]||null,y=arguments[2],O=arguments[3],z=arguments[4]||0),ds('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(y,O,W,X,z)},this.initRenderTarget=function(y){bt.get(y).__webglFramebuffer===void 0&&A.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?A.setTextureCube(y,0):y.isData3DTexture?A.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?A.setTexture2DArray(y,0):A.setTexture2D(y,0),At.unbindTexture()},this.resetState=function(){R=0,C=0,I=null,At.reset(),te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Sn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Wt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Wt._getUnpackColorSpace()}}class p0 extends le{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new un,this.environmentIntensity=1,this.environmentRotation=new un,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class m0{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Jo,this.updateRanges=[],this.version=0,this.uuid=En()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=En()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=En()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ce=new U;class pr{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ce.fromBufferAttribute(this,e),Ce.applyMatrix4(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ce.fromBufferAttribute(this,e),Ce.applyNormalMatrix(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ce.fromBufferAttribute(this,e),Ce.transformDirection(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=en(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=$t(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=$t(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=$t(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=$t(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=$t(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=en(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=en(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=en(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=en(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=$t(e,this.array),n=$t(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=$t(e,this.array),n=$t(n,this.array),s=$t(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=$t(e,this.array),n=$t(n,this.array),s=$t(s,this.array),r=$t(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new pe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new pr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Uc extends Ki{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new st(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Ui;const os=new U,Ii=new U,Ni=new U,Fi=new vt,as=new vt,Ic=new Yt,Ys=new U,ls=new U,qs=new U,Fl=new vt,to=new vt,Ol=new vt;class g0 extends le{constructor(t=new Uc){if(super(),this.isSprite=!0,this.type="Sprite",Ui===void 0){Ui=new Re;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new m0(e,5);Ui.setIndex([0,1,2,0,2,3]),Ui.setAttribute("position",new pr(n,3,0,!1)),Ui.setAttribute("uv",new pr(n,2,3,!1))}this.geometry=Ui,this.material=t,this.center=new vt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ii.setFromMatrixScale(this.matrixWorld),Ic.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ni.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ii.multiplyScalar(-Ni.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;js(Ys.set(-.5,-.5,0),Ni,o,Ii,s,r),js(ls.set(.5,-.5,0),Ni,o,Ii,s,r),js(qs.set(.5,.5,0),Ni,o,Ii,s,r),Fl.set(0,0),to.set(1,0),Ol.set(1,1);let a=t.ray.intersectTriangle(Ys,ls,qs,!1,os);if(a===null&&(js(ls.set(-.5,.5,0),Ni,o,Ii,s,r),to.set(0,1),a=t.ray.intersectTriangle(Ys,qs,ls,!1,os),a===null))return;const l=t.ray.origin.distanceTo(os);l<t.near||l>t.far||e.push({distance:l,point:os.clone(),uv:Ze.getInterpolation(os,Ys,ls,qs,Fl,to,Ol,new vt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function js(i,t,e,n,s,r){Fi.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(as.x=r*Fi.x-s*Fi.y,as.y=s*Fi.x+r*Fi.y):as.copy(Fi),i.copy(t),i.x+=as.x,i.y+=as.y,i.applyMatrix4(Ic)}class Nc extends we{constructor(t=null,e=1,n=1,s,r,o,a,l,u=Ue,c=Ue,h,f){super(null,o,a,l,u,c,s,r,h,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class di extends pe{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Oi=new Yt,zl=new Yt,Zs=[],Bl=new _i,_0=new Yt,cs=new Zt,us=new Ss;class Ji extends Zt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new di(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,_0)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new _i),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Oi),Bl.copy(t.boundingBox).applyMatrix4(Oi),this.boundingBox.union(Bl)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ss),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Oi),us.copy(t.boundingSphere).applyMatrix4(Oi),this.boundingSphere.union(us)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(cs.geometry=this.geometry,cs.material=this.material,cs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),us.copy(this.boundingSphere),us.applyMatrix4(n),t.ray.intersectsSphere(us)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Oi),zl.multiplyMatrices(n,Oi),cs.matrixWorld=zl,cs.raycast(t,Zs);for(let o=0,a=Zs.length;o<a;o++){const l=Zs[o];l.instanceId=r,l.object=this,e.push(l)}Zs.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new di(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Nc(new Float32Array(s*this.count),s,this.count,fa,nn));const r=this.morphTexture.source.data.data;let o=0;for(let u=0;u<n.length;u++)o+=n[u];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class v0 extends we{constructor(t,e,n,s,r,o,a,l,u){super(t,e,n,s,r,o,a,l,u),this.isCanvasTexture=!0,this.needsUpdate=!0}}class x0{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,l=r-1,u;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),u=n[s]-o,u<0)a=s+1;else if(u>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const c=n[s],f=n[s+1]-c,d=(o-c)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new vt:new U);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new U,s=[],r=[],o=[],a=new U,l=new Yt;for(let d=0;d<=t;d++){const g=d/t;s[d]=this.getTangentAt(g,new U)}r[0]=new U,o[0]=new U;let u=Number.MAX_VALUE;const c=Math.abs(s[0].x),h=Math.abs(s[0].y),f=Math.abs(s[0].z);c<=u&&(u=c,n.set(1,0,0)),h<=u&&(u=h,n.set(0,1,0)),f<=u&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Me(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(a,g))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(Me(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],d*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}function ya(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,u){s(o,a,u*(a-r),u*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,u,c,h){let f=(o-r)/u-(a-r)/(u+c)+(a-o)/c,d=(a-o)/c-(l-o)/(c+h)+(l-a)/h;f*=c,d*=c,s(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const Ks=new U,eo=new ya,no=new ya,io=new ya;class hs extends x0{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new U){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let u,c;this.closed||a>0?u=s[(a-1)%r]:(Ks.subVectors(s[0],s[1]).add(s[0]),u=Ks);const h=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?c=s[(a+2)%r]:(Ks.subVectors(s[r-1],s[r-2]).add(s[r-1]),c=Ks),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(u.distanceToSquared(h),d),v=Math.pow(h.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(c),d);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),eo.initNonuniformCatmullRom(u.x,h.x,f.x,c.x,g,v,m),no.initNonuniformCatmullRom(u.y,h.y,f.y,c.y,g,v,m),io.initNonuniformCatmullRom(u.z,h.z,f.z,c.z,g,v,m)}else this.curveType==="catmullrom"&&(eo.initCatmullRom(u.x,h.x,f.x,c.x,this.tension),no.initCatmullRom(u.y,h.y,f.y,c.y,this.tension),io.initCatmullRom(u.z,h.z,f.z,c.z,this.tension));return n.set(eo.calc(l),no.calc(l),io.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new U().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}class Sr extends Re{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],l=[],u=new U,c=new vt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let h=0,f=3;h<=e;h++,f+=3){const d=n+h/e*s;u.x=t*Math.cos(d),u.y=t*Math.sin(d),o.push(u.x,u.y,u.z),a.push(0,0,1),c.x=(o[f]/t+1)/2,c.y=(o[f+1]/t+1)/2,l.push(c.x,c.y)}for(let h=1;h<=e;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new re(o,3)),this.setAttribute("normal",new re(a,3)),this.setAttribute("uv",new re(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Sr(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ys extends Re{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const u=this;s=Math.floor(s),r=Math.floor(r);const c=[],h=[],f=[],d=[];let g=0;const v=[],m=n/2;let p=0;T(),o===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(c),this.setAttribute("position",new re(h,3)),this.setAttribute("normal",new re(f,3)),this.setAttribute("uv",new re(d,2));function T(){const _=new U,N=new U;let R=0;const C=(e-t)/n;for(let I=0;I<=r;I++){const E=[],M=I/r,P=M*(e-t)+t;for(let H=0;H<=s;H++){const w=H/s,L=w*l+a,k=Math.sin(L),G=Math.cos(L);N.x=P*k,N.y=-M*n+m,N.z=P*G,h.push(N.x,N.y,N.z),_.set(k,C,G).normalize(),f.push(_.x,_.y,_.z),d.push(w,1-M),E.push(g++)}v.push(E)}for(let I=0;I<s;I++)for(let E=0;E<r;E++){const M=v[E][I],P=v[E+1][I],H=v[E+1][I+1],w=v[E][I+1];(t>0||E!==0)&&(c.push(M,P,w),R+=3),(e>0||E!==r-1)&&(c.push(P,H,w),R+=3)}u.addGroup(p,R,0),p+=R}function S(_){const N=g,R=new vt,C=new U;let I=0;const E=_===!0?t:e,M=_===!0?1:-1;for(let H=1;H<=s;H++)h.push(0,m*M,0),f.push(0,M,0),d.push(.5,.5),g++;const P=g;for(let H=0;H<=s;H++){const L=H/s*l+a,k=Math.cos(L),G=Math.sin(L);C.x=E*G,C.y=m*M,C.z=E*k,h.push(C.x,C.y,C.z),f.push(0,M,0),R.x=k*.5+.5,R.y=G*.5*M+.5,d.push(R.x,R.y),g++}for(let H=0;H<s;H++){const w=N+H,L=P+H;_===!0?c.push(L,L+1,w):c.push(L+1,L,w),I+=3}u.addGroup(p,I,_===!0?1:2),p+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ys(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ea extends ys{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Ea(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class yr extends Re{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),u(n),c(),this.setAttribute("position",new re(r,3)),this.setAttribute("normal",new re(r.slice(),3)),this.setAttribute("uv",new re(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(T){const S=new U,_=new U,N=new U;for(let R=0;R<e.length;R+=3)d(e[R+0],S),d(e[R+1],_),d(e[R+2],N),l(S,_,N,T)}function l(T,S,_,N){const R=N+1,C=[];for(let I=0;I<=R;I++){C[I]=[];const E=T.clone().lerp(_,I/R),M=S.clone().lerp(_,I/R),P=R-I;for(let H=0;H<=P;H++)H===0&&I===R?C[I][H]=E:C[I][H]=E.clone().lerp(M,H/P)}for(let I=0;I<R;I++)for(let E=0;E<2*(R-I)-1;E++){const M=Math.floor(E/2);E%2===0?(f(C[I][M+1]),f(C[I+1][M]),f(C[I][M])):(f(C[I][M+1]),f(C[I+1][M+1]),f(C[I+1][M]))}}function u(T){const S=new U;for(let _=0;_<r.length;_+=3)S.x=r[_+0],S.y=r[_+1],S.z=r[_+2],S.normalize().multiplyScalar(T),r[_+0]=S.x,r[_+1]=S.y,r[_+2]=S.z}function c(){const T=new U;for(let S=0;S<r.length;S+=3){T.x=r[S+0],T.y=r[S+1],T.z=r[S+2];const _=m(T)/2/Math.PI+.5,N=p(T)/Math.PI+.5;o.push(_,1-N)}g(),h()}function h(){for(let T=0;T<o.length;T+=6){const S=o[T+0],_=o[T+2],N=o[T+4],R=Math.max(S,_,N),C=Math.min(S,_,N);R>.9&&C<.1&&(S<.2&&(o[T+0]+=1),_<.2&&(o[T+2]+=1),N<.2&&(o[T+4]+=1))}}function f(T){r.push(T.x,T.y,T.z)}function d(T,S){const _=T*3;S.x=t[_+0],S.y=t[_+1],S.z=t[_+2]}function g(){const T=new U,S=new U,_=new U,N=new U,R=new vt,C=new vt,I=new vt;for(let E=0,M=0;E<r.length;E+=9,M+=6){T.set(r[E+0],r[E+1],r[E+2]),S.set(r[E+3],r[E+4],r[E+5]),_.set(r[E+6],r[E+7],r[E+8]),R.set(o[M+0],o[M+1]),C.set(o[M+2],o[M+3]),I.set(o[M+4],o[M+5]),N.copy(T).add(S).add(_).divideScalar(3);const P=m(N);v(R,M+0,T,P),v(C,M+2,S,P),v(I,M+4,_,P)}}function v(T,S,_,N){N<0&&T.x===1&&(o[S]=T.x-1),_.x===0&&_.z===0&&(o[S]=N/2/Math.PI+.5)}function m(T){return Math.atan2(T.z,-T.x)}function p(T){return Math.atan2(-T.y,Math.sqrt(T.x*T.x+T.z*T.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yr(t.vertices,t.indices,t.radius,t.details)}}class Ta extends yr{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ta(t.radius,t.detail)}}class Er extends yr{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Er(t.radius,t.detail)}}class Cn extends Re{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let u=0;const c=[],h=new U,f=new U,d=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const T=[],S=p/n;let _=0;p===0&&o===0?_=.5/e:p===n&&l===Math.PI&&(_=-.5/e);for(let N=0;N<=e;N++){const R=N/e;h.x=-t*Math.cos(s+R*r)*Math.sin(o+S*a),h.y=t*Math.cos(o+S*a),h.z=t*Math.sin(s+R*r)*Math.sin(o+S*a),g.push(h.x,h.y,h.z),f.copy(h).normalize(),v.push(f.x,f.y,f.z),m.push(R+_,1-S),T.push(u++)}c.push(T)}for(let p=0;p<n;p++)for(let T=0;T<e;T++){const S=c[p][T+1],_=c[p][T],N=c[p+1][T],R=c[p+1][T+1];(p!==0||o>0)&&d.push(S,_,R),(p!==n-1||l<Math.PI)&&d.push(_,N,R)}this.setIndex(d),this.setAttribute("position",new re(g,3)),this.setAttribute("normal",new re(v,3)),this.setAttribute("uv",new re(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Cn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class fe extends Ki{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new st(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new st(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=pc,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ba extends le{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new st(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class M0 extends ba{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(le.DEFAULT_UP),this.updateMatrix(),this.groundColor=new st(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const so=new Yt,kl=new U,Hl=new U;class S0{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new vt(512,512),this.map=null,this.mapPass=null,this.matrix=new Yt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new xa,this._frameExtents=new vt(1,1),this._viewportCount=1,this._viewports=[new ae(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;kl.setFromMatrixPosition(t.matrixWorld),e.position.copy(kl),Hl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Hl),e.updateMatrixWorld(),so.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(so),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(so)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class y0 extends S0{constructor(){super(new Rc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Gl extends ba{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(le.DEFAULT_UP),this.updateMatrix(),this.target=new le,this.shadow=new y0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class E0 extends ba{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class T0{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Vl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Vl();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Vl(){return performance.now()}const Wl=new Yt;class b0{constructor(t,e,n=0,s=1/0){this.ray=new _a(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new va,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Wl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Wl),this}intersectObject(t,e=!0,n=[]){return ta(t,this,n,e),n.sort(Xl),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)ta(t[s],this,n,e);return n.sort(Xl),n}}function Xl(i,t){return i.distance-t.distance}function ta(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)ta(r[o],t,e,!0)}}class ea{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Me(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class A0 extends gi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:la}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=la);const Yl={type:"change"},Aa={type:"start"},Fc={type:"end"},$s=new _a,ql=new ln,w0=Math.cos(70*ge.DEG2RAD),me=new U,Ne=2*Math.PI,Qt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ro=1e-6;class R0 extends A0{constructor(t,e=null){super(t,e),this.state=Qt.NONE,this.enabled=!0,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:yn.ROTATE,MIDDLE:yn.DOLLY,RIGHT:yn.PAN},this.touches={ONE:kn.ROTATE,TWO:kn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new U,this._lastQuaternion=new Rn,this._lastTargetPosition=new U,this._quat=new Rn().setFromUnitVectors(t.up,new U(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ea,this._sphericalDelta=new ea,this._scale=1,this._panOffset=new U,this._rotateStart=new vt,this._rotateEnd=new vt,this._rotateDelta=new vt,this._panStart=new vt,this._panEnd=new vt,this._panDelta=new vt,this._dollyStart=new vt,this._dollyEnd=new vt,this._dollyDelta=new vt,this._dollyDirection=new U,this._mouse=new vt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=P0.bind(this),this._onPointerDown=C0.bind(this),this._onPointerUp=D0.bind(this),this._onContextMenu=z0.bind(this),this._onMouseWheel=I0.bind(this),this._onKeyDown=N0.bind(this),this._onTouchStart=F0.bind(this),this._onTouchMove=O0.bind(this),this._onMouseDown=L0.bind(this),this._onMouseMove=U0.bind(this),this._interceptControlDown=B0.bind(this),this._interceptControlUp=k0.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Yl),this.update(),this.state=Qt.NONE}update(t=null){const e=this.object.position;me.copy(e).sub(this.target),me.applyQuaternion(this._quat),this._spherical.setFromVector3(me),this.autoRotate&&this.state===Qt.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Ne:n>Math.PI&&(n-=Ne),s<-Math.PI?s+=Ne:s>Math.PI&&(s-=Ne),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(me.setFromSpherical(this._spherical),me.applyQuaternion(this._quatInverse),e.copy(this.target).add(me),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=me.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new U(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const u=new U(this._mouse.x,this._mouse.y,0);u.unproject(this.object),this.object.position.sub(u).add(a),this.object.updateMatrixWorld(),o=me.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):($s.origin.copy(this.object.position),$s.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot($s.direction))<w0?this.object.lookAt(this.target):(ql.setFromNormalAndCoplanarPoint(this.object.up,this.target),$s.intersectPlane(ql,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>ro||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ro||this._lastTargetPosition.distanceToSquared(this.target)>ro?(this.dispatchEvent(Yl),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ne/60*this.autoRotateSpeed*t:Ne/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){me.setFromMatrixColumn(e,0),me.multiplyScalar(-t),this._panOffset.add(me)}_panUp(t,e){this.screenSpacePanning===!0?me.setFromMatrixColumn(e,1):(me.setFromMatrixColumn(e,0),me.crossVectors(this.object.up,me)),me.multiplyScalar(t),this._panOffset.add(me)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;me.copy(s).sub(this.target);let r=me.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ne*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ne*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(Ne*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-Ne*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(Ne*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-Ne*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ne*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ne*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new vt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function C0(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function P0(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function D0(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Fc),this.state=Qt.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function L0(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case yn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Qt.DOLLY;break;case yn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Qt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Qt.ROTATE}break;case yn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Qt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Qt.PAN}break;default:this.state=Qt.NONE}this.state!==Qt.NONE&&this.dispatchEvent(Aa)}function U0(i){switch(this.state){case Qt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Qt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Qt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function I0(i){this.enabled===!1||this.enableZoom===!1||this.state!==Qt.NONE||(i.preventDefault(),this.dispatchEvent(Aa),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Fc))}function N0(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function F0(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case kn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Qt.TOUCH_ROTATE;break;case kn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Qt.TOUCH_PAN;break;default:this.state=Qt.NONE}break;case 2:switch(this.touches.TWO){case kn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Qt.TOUCH_DOLLY_PAN;break;case kn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Qt.TOUCH_DOLLY_ROTATE;break;default:this.state=Qt.NONE}break;default:this.state=Qt.NONE}this.state!==Qt.NONE&&this.dispatchEvent(Aa)}function O0(i){switch(this._trackPointer(i),this.state){case Qt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Qt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Qt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Qt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Qt.NONE}}function z0(i){this.enabled!==!1&&i.preventDefault()}function B0(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function k0(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const mr={rx:6.35,rz:4.85},wt={nx:256,nz:224,x0:-8.15,x1:8.15,z0:-6.55,z1:6.55},Oc=.84,zc=.46,jl=Math.hypot(Oc,zc),Fe={x:Oc/jl,z:zc/jl},na=[{x:.86,z:.51,k:.48,a:1},{x:.18,z:.98,k:.95,a:.62},{x:-.78,z:.63,k:1.55,a:.38},{x:.62,z:-.78,k:2.35,a:.22},{x:.97,z:.24,k:4.4,a:.16,windMin:.2},{x:-.35,z:.94,k:6.8,a:.1,windMin:.42}];function ia(i,t,e){const n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)}function H0(i){return 1+.05*Math.sin(i*2+.4)+.032*Math.sin(i*3-1.15)+.02*Math.sin(i*5+.7)}function Ee(i,t){const e=Math.atan2(t,i);return Math.hypot(i/mr.rx,t/mr.rz)/H0(e)}function ui(i,t,e=0){return Ee(i,t)<1-e}function G0(i,t){const e=Ee(i,t);if(e>=1)return 0;const n=1-e,s=ia(0,.1,n),r=ia(.1,.62,n);return s*(.1+r*r*1.62)}function Js(i,t){let e=Math.imul(i,374761393)+Math.imul(t,668265263);return e=Math.imul(e^e>>>13,1274126177),((e^e>>>16)>>>0)/4294967296}function V0(i,t){const e=Math.floor(i),n=Math.floor(t),s=i-e,r=t-n,o=s*s*(3-2*s),a=r*r*(3-2*r),l=Js(e,n),u=Js(e+1,n),c=Js(e,n+1),h=Js(e+1,n+1);return l+(u-l)*o+(c-l)*a+(l-u-c+h)*o*a}function W0(i,t){let e=0,n=.5,s=1;for(let r=0;r<4;r++)e+=n*V0(i*s,t*s),s*=2.03,n*=.5;return e}function Xe(i,t){const e=Ee(i,t),n=W0(i*.37,t*.37);if(e<1)return-G0(i,t);const s=e-1,r=s*.85+s*s*1.15,o=1-Math.exp(-s*2.4);let a=r*.55*(1-o)+o*(.42+(n-.5)*.22);a+=(n-.5)*.07*Math.min(1,s*5);const l=Math.exp(-((i+6.45)**2+(t+1.85)**2)/7.2)*.28,u=Math.exp(-((i-5.4)**2+(t-3.6)**2)/6)*.16;return a+l+u}function X0(){const{nx:i,nz:t}=wt,e=new Float32Array(i*t),n=new Float32Array(i*t),s=new Float32Array(i*t),r=new Uint8Array(i*t),o=wt.x1-wt.x0,a=wt.z1-wt.z0;for(let l=0;l<t;l++){const u=wt.z0+(l+.5)/t*a;for(let c=0;c<i;c++){const h=wt.x0+(c+.5)/i*o;Ee(h,u)>=.978&&(r[l*i+c]=1)}}for(let l=0;l<i;l++)r[l]=1,r[(t-1)*i+l]=1;for(let l=0;l<t;l++)r[l*i]=1,r[l*i+i-1]=1;return{nx:i,nz:t,curr:e,prev:n,next:s,solid:r,acc:0}}function Y0(i,t,e,n){const{nx:s,nz:r,solid:o}=i,a=wt.x1-wt.x0,l=wt.z1-wt.z0,u=n*n,c=Math.max(1,Math.floor((t-n-wt.x0)/a*s)),h=Math.min(s-2,Math.ceil((t+n-wt.x0)/a*s)),f=Math.max(1,Math.floor((e-n-wt.z0)/l*r)),d=Math.min(r-2,Math.ceil((e+n-wt.z0)/l*r));for(let g=f;g<=d;g++){const v=wt.z0+(g+.5)/r*l;for(let m=c;m<=h;m++){const T=wt.x0+(m+.5)/s*a-t,S=v-e;T*T+S*S<=u&&(o[g*s+m]=1)}}}function q0(i){const{nx:t,nz:e,curr:n,prev:s,next:r,solid:o}=i,a=.9964;for(let l=1;l<e-1;l++){const u=l*t;for(let c=1;c<t-1;c++){const h=u+c;if(o[h]){r[h]=0;continue}const f=n[h],d=o[h-1]?f:n[h-1],g=o[h+1]?f:n[h+1],v=o[h-t]?f:n[h-t],m=o[h+t]?f:n[h+t];let p=(d+g+v+m)*.5-s[h];p*=a,p>.42?p=.42:p<-.42&&(p=-.42),r[h]=p}}i.prev=n,i.curr=r,i.next=s}function j0(i,t){i.acc+=t;const e=1/60;let n=0;for(;i.acc>=e&&n<3;)q0(i),i.acc-=e,n++;n===3&&(i.acc=0)}function xn(i,t,e,n,s){if(!ui(t,e,.02))return;const{nx:r,nz:o,curr:a,solid:l}=i,u=wt.x1-wt.x0,c=wt.z1-wt.z0,h=Math.max(1,Math.floor((t-s-wt.x0)/u*r)),f=Math.min(r-2,Math.ceil((t+s-wt.x0)/u*r)),d=Math.max(1,Math.floor((e-s-wt.z0)/c*o)),g=Math.min(o-2,Math.ceil((e+s-wt.z0)/c*o)),v=Math.max(s,.04);for(let m=d;m<=g;m++){const p=wt.z0+(m+.5)/o*c,T=m*r;for(let S=h;S<=f;S++){const _=T+S;if(l[_])continue;const R=wt.x0+(S+.5)/r*u-t,C=p-e,I=Math.hypot(R,C);if(I>v)continue;const E=.5*(1+Math.cos(Math.PI*I/v));a[_]+=n*E}}}function oo(i,t,e){const{nx:n,nz:s,curr:r}=i,o=wt.x1-wt.x0,a=wt.z1-wt.z0,l=(t-wt.x0)/o*n-.5,u=(e-wt.z0)/a*s-.5,c=Math.floor(l),h=Math.floor(u),f=l-c,d=u-h,g=(S,_)=>S<0||_<0||S>=n||_>=s?0:r[_*n+S],v=g(c,h),m=g(c+1,h),p=g(c,h+1),T=g(c+1,h+1);return v*(1-f)*(1-d)+m*f*(1-d)+p*(1-f)*d+T*f*d}function Z0(i,t){return i?ia(i,i+.45,t):1}function ao(i,t,e,n){let s=0,r=0,o=0;const a=.42+n*.75,l=1+n*.85;for(let u=0;u<na.length;u++){const c=na[u],h=Math.hypot(c.x,c.z),f=c.x/h,d=c.z/h,g=c.k*l,v=.125*c.a*a*Z0(c.windMin,n),m=Math.sqrt(9.81*g)*.82,p=g*(f*i+d*t)-m*e,T=Math.sin(p),S=Math.cos(p);s+=v*T,r+=v*g*f*S,o+=v*g*d*S}return{h:s,dhdx:r,dhdz:o}}function fs(i,t,e,n,s){const o=ao(t,e,n,s).h+oo(i,t,e),a=.12,l=ao(t+a,e,n,s).h+oo(i,t+a,e),u=ao(t,e+a,n,s).h+oo(i,t,e+a),c=(l-o)/a,h=(u-o)/a,f=-c,d=-h,g=1/Math.hypot(f,1,d);return{y:o,nx:f*g,ny:g,nz:d*g}}function Bc(i,t){return{x:(Ee(i+.06,t)-Ee(i-.06,t))/(2*.06),z:(Ee(i,t+.06)-Ee(i,t-.06))/(2*.06)}}function sa(){return`
    vec3 gerstnerAll(vec2 xz, float t, float wind) {
      float ampScale = 0.42 + wind * 0.75;
      float freqScale = 1.0 + wind * 0.85;
      float h = 0.0;
      float dhdx = 0.0;
      float dhdz = 0.0;
      ${na.map(t=>{const e=Math.hypot(t.x,t.z),n=(t.x/e).toFixed(6),s=(t.z/e).toFixed(6),r=t.windMin?`smoothstep(${t.windMin.toFixed(3)}, ${(t.windMin+.45).toFixed(3)}, wind)`:"1.0";return`
      {
        float k = ${t.k.toFixed(4)} * freqScale;
        float gate = ${r};
        float a = 0.125 * ${t.a.toFixed(4)} * ampScale * gate;
        float omega = sqrt(9.81 * k) * 0.82;
        float phase = k * (${n} * xz.x + ${s} * xz.y) - omega * t;
        float s = sin(phase);
        float c = cos(phase);
        h += a * s;
        dhdx += a * k * ${n} * c;
        dhdz += a * k * ${s} * c;
      }`}).join(`
`)}
      return vec3(h, dhdx, dhdz);
    }
  `}const K0=`
  const float POND_RX = ${mr.rx.toFixed(4)};
  const float POND_RZ = ${mr.rz.toFixed(4)};
  float pondEdge(float a) {
    return 1.0
      + 0.05 * sin(a * 2.0 + 0.4)
      + 0.032 * sin(a * 3.0 - 1.15)
      + 0.02 * sin(a * 5.0 + 0.7);
  }
  float pondFactor(vec2 p) {
    float a = atan(p.y, p.x);
    return length(vec2(p.x / POND_RX, p.y / POND_RZ)) / pondEdge(a);
  }
`,ra=`
  uniform sampler2D uWave;
  uniform vec2 uSimOrigin;
  uniform vec2 uSimSize;
  uniform vec2 uSimTexel;
  float simH(vec2 xz) {
    vec2 uv = (xz - uSimOrigin) / uSimSize;
    vec2 texel = uv * uSimTexel;
    vec2 f = fract(texel - 0.5);
    vec2 base = (floor(texel - 0.5) + 0.5) / uSimTexel;
    float a = texture2D(uWave, base).r;
    float b = texture2D(uWave, base + vec2(1.0 / uSimTexel.x, 0.0)).r;
    float c = texture2D(uWave, base + vec2(0.0, 1.0 / uSimTexel.y)).r;
    float d = texture2D(uWave, base + vec2(1.0 / uSimTexel.x, 1.0 / uSimTexel.y)).r;
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
`,$0=`
  float causticLight(vec2 xz, float depth) {
    vec3 g = gerstnerAll(xz, uTime, uWind);
    float e = 0.09;
    float h0 = simH(xz);
    float hx = (simH(xz + vec2(e, 0.0)) - h0) / e + g.y;
    float hz = (simH(xz + vec2(0.0, e)) - h0) / e + g.z;
    vec2 p = xz * (1.25 + depth * 0.22) + vec2(hx, hz) * (0.7 + depth * 2.1);
    float a = sin(p.x * 6.4 + uTime * 1.35) * sin(p.y * 5.3 - uTime * 1.12);
    float b = sin((p.x * 1.25 + p.y) * 7.2 - uTime * 0.82) * sin((p.x - p.y * 1.15) * 5.5 + uTime * 1.48);
    float c = pow(max(a, 0.0), 1.7) + pow(max(b, 0.0), 1.7);
    float shallow = exp(-max(depth, 0.0) * 1.05);
    return c * shallow;
  }
`,pt={uTime:{value:0},uWind:{value:.22},uRain:{value:0},uSunAmt:{value:1},uMoonAmt:{value:0},uStarAmt:{value:0},uNight:{value:0},uAbsorb:{value:1.1},uSunDir:{value:new U},uSunColor:{value:new st},uMoonDir:{value:new U(-.05,.055,-.95).normalize()},uDeep:{value:new st},uShallow:{value:new st},uScatter:{value:new st},uSkyTop:{value:new st},uSkyHorizon:{value:new st},uSkyGround:{value:new st},uWave:{value:null},uSimOrigin:{value:new vt(wt.x0,wt.z0)},uSimSize:{value:new vt(wt.x1-wt.x0,wt.z1-wt.z0)},uSimTexel:{value:new vt(wt.nx,wt.nz)},uResolution:{value:new vt(1,1)},uNear:{value:.08},uFar:{value:180}},gr=[{sunDir:new U(-.32,.88,-.35),sunColor:new st("#fff1d2"),sunIntensity:2.55,hemiIntensity:.62,skyTop:new st("#3f86c8"),skyHorizon:new st("#c5e4ea"),skyGround:new st("#b7c3a4"),hemiSky:new st("#c5dff2"),hemiGround:new st("#8d6b49"),deep:new st("#062428"),shallow:new st("#e7f3ec"),scatter:new st("#2a8f86"),sunAmt:1,moonAmt:0,starAmt:0,night:0,absorb:.72},{sunDir:new U(-.78,.24,-.5),sunColor:new st("#ff7a3c"),sunIntensity:1.55,hemiIntensity:.36,skyTop:new st("#2a3266"),skyHorizon:new st("#e8885e"),skyGround:new st("#6a3548"),hemiSky:new st("#e09878"),hemiGround:new st("#3a2430"),deep:new st("#160d1c"),shallow:new st("#f0c4aa"),scatter:new st("#8a4038"),sunAmt:.72,moonAmt:.28,starAmt:.18,night:.12,absorb:1.22},{sunDir:new U(.4,.8,-.28),sunColor:new st("#d5e2ff"),sunIntensity:.46,hemiIntensity:.1,skyTop:new st("#070b16"),skyHorizon:new st("#1a2748"),skyGround:new st("#070910"),hemiSky:new st("#243456"),hemiGround:new st("#0c0e12"),deep:new st("#02050c"),shallow:new st("#a9bbd0"),scatter:new st("#102033"),sunAmt:.04,moonAmt:1,starAmt:1,night:1,absorb:1.65}];for(const i of gr)i.sunDir.normalize();function si(i,t,e,n){i.copy(t).lerp(e,n)}function J0(i){const t=new M0("#c5dff2","#8d6b49",.62),e=new Gl("#fff1d2",2.55);e.castShadow=!0,e.shadow.mapSize.set(2048,2048),e.shadow.camera.near=1,e.shadow.camera.far=48,e.shadow.camera.left=-14,e.shadow.camera.right=14,e.shadow.camera.top=14,e.shadow.camera.bottom=-14,e.shadow.bias=-35e-5,e.shadow.normalBias=.028,e.position.copy(gr[0].sunDir).multiplyScalar(24);const n=new E0("#ffffff",.08),s=new Gl("#e7f2ff",.22);return s.position.set(6,5,7),i.add(t,e,e.target,n,s),{hemi:t,sun:e,amb:n,fill:s}}function kc(i,t,e){const n=ge.clamp(i,0,2),s=Math.min(1,Math.floor(n)),r=n-s,o=gr[s],a=gr[Math.min(s+1,2)],l=r*r*(3-2*r);pt.uSunDir.value.copy(o.sunDir).lerp(a.sunDir,l).normalize(),si(pt.uSunColor.value,o.sunColor,a.sunColor,l),si(pt.uDeep.value,o.deep,a.deep,l),si(pt.uShallow.value,o.shallow,a.shallow,l),si(pt.uScatter.value,o.scatter,a.scatter,l),si(pt.uSkyTop.value,o.skyTop,a.skyTop,l),si(pt.uSkyHorizon.value,o.skyHorizon,a.skyHorizon,l),si(pt.uSkyGround.value,o.skyGround,a.skyGround,l);const u=new st("#222830");t>0&&(pt.uSkyTop.value.lerp(u,t*.72),pt.uSkyHorizon.value.lerp(new st("#3a4048"),t*.55),pt.uSunColor.value.lerp(new st("#9aa4b0"),t*.65)),pt.uSunAmt.value=ge.lerp(o.sunAmt,a.sunAmt,l)*(1-t*.82),pt.uMoonAmt.value=ge.lerp(o.moonAmt,a.moonAmt,l),pt.uStarAmt.value=ge.lerp(o.starAmt,a.starAmt,l)*(1-t*.85),pt.uNight.value=ge.lerp(o.night,a.night,l),pt.uAbsorb.value=ge.lerp(o.absorb,a.absorb,l),pt.uMoonDir.value.set(-.05,.055,-.95).normalize();const c=ge.lerp(o.sunIntensity,a.sunIntensity,l)*(1-t*.78),h=ge.lerp(o.hemiIntensity,a.hemiIntensity,l)*(1-t*.4);e.sun.color.copy(pt.uSunColor.value),e.sun.intensity=c,e.sun.position.copy(pt.uSunDir.value).multiplyScalar(24),e.hemi.intensity=h;const f=pt.uNight.value;e.amb.intensity=.08*(1-f*.7)*(1-t*.35),e.fill.intensity=.22*(1-f*.88)*(1-t*.5),e.hemi.color.copy(o.hemiSky).lerp(a.hemiSky,l),e.hemi.groundColor.copy(o.hemiGround).lerp(a.hemiGround,l),t>0&&(e.hemi.color.lerp(u,t*.5),e.hemi.groundColor.lerp(new st("#1a1c1e"),t*.4))}const Q0=["uTime","uWind","uRain","uSunAmt","uMoonAmt","uStarAmt","uNight","uSunDir","uSunColor","uMoonDir","uWave","uSimOrigin","uSimSize","uSimTexel"];function jn(i,t=Q0){for(const e of t)i.uniforms[e]=pt[e]}function Hc(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new Re;let u=0;for(let c=0;c<i.length;++c){const h=i[c];let f=0;if(e!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in h.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(h.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in h.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(h.morphAttributes[d])}if(t){let d;if(e)d=h.index.count;else if(h.attributes.position!==void 0)d=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". The geometry must have either an index or a position attribute"),null;l.addGroup(u,d,c),u+=d}}if(e){let c=0;const h=[];for(let f=0;f<i.length;++f){const d=i[f].index;for(let g=0;g<d.count;++g)h.push(d.getX(g)+c);c+=i[f].attributes.position.count}l.setIndex(h)}for(const c in r){const h=Zl(r[c]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+c+" attribute."),null;l.setAttribute(c,h)}for(const c in o){const h=o[c][0].length;if(h===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[c]=[];for(let f=0;f<h;++f){const d=[];for(let v=0;v<o[c].length;++v)d.push(o[c][v][f]);const g=Zl(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+c+" morphAttribute."),null;l.morphAttributes[c].push(g)}}return l}function Zl(i){let t,e,n,s=-1,r=0;for(let u=0;u<i.length;++u){const c=i[u];if(t===void 0&&(t=c.array.constructor),t!==c.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=c.itemSize),e!==c.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=c.normalized),n!==c.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=c.gpuType),s!==c.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=c.count*e}const o=new t(r),a=new pe(o,e,n);let l=0;for(let u=0;u<i.length;++u){const c=i[u];if(c.isInterleavedBufferAttribute){const h=l/e;for(let f=0,d=c.count;f<d;f++)for(let g=0;g<e;g++){const v=c.getComponent(f,g);a.setComponent(f+h,g,v)}}else o.set(c.array,l);l+=c.count*e}return s!==void 0&&(a.gpuType=s),a}const tg=`
#ifdef USE_INSTANCING
  vWpos = (modelMatrix * instanceMatrix * vec4(transformed, 1.0)).xyz;
#else
  vWpos = (modelMatrix * vec4(transformed, 1.0)).xyz;
#endif
`,eg=`
varying vec3 vWpos;
uniform float uTime;
uniform float uWind;
uniform float uRain;
uniform float uSunAmt;
${ra}
${sa()}
${$0}
vec3 toLinear(vec3 c) { return pow(max(c, vec3(0.0)), vec3(2.2)); }
`,ng=`
  if (vWpos.y < 0.02) {
    float cdepth = -vWpos.y;
    float cau = causticLight(vWpos.xz, cdepth) * uSunAmt * (1.0 - uRain * 0.72);
    diffuseColor.rgb *= 0.32 + cau * 3.4;
  }
`,ig=`
  float wet = smoothstep(0.22, -0.06, vWpos.y);
  roughnessFactor = mix(roughnessFactor, 0.18, wet);
  diffuseColor.rgb *= mix(1.0, 0.74, wet);
`;function Zn(i,t,e){i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
      varying vec3 vWpos;
      uniform float uTime;
      uniform float uWind;
      ${t||""}
    `).replace("#include <begin_vertex>",`#include <begin_vertex>
      ${e||""}
    `).replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
      ${tg}
    `)}function Kn(i,t,e,n){i.fragmentShader=i.fragmentShader.replace("#include <common>",`#include <common>
      ${eg}
      ${t||""}
    `).replace("#include <color_fragment>",`#include <color_fragment>
      ${e||""}
      ${ng}
    `),n&&(i.fragmentShader=i.fragmentShader.replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
       ${ig}
      `))}function wa(i){i.onBeforeCompile=t=>{jn(t),Zn(t),Kn(t,"","",!0)},i.customProgramCacheKey=()=>"ground-v1"}function Kl(i){i.onBeforeCompile=t=>{jn(t),Zn(t),Kn(t,"",`
      float grain = sin(vWpos.x * 26.0 + vWpos.z * 8.0 + vWpos.y * 5.0);
      float streak = sin((vWpos.x + vWpos.z) * 47.0);
      diffuseColor.rgb *= mix(0.7, 1.08, grain * 0.5 + 0.5);
      diffuseColor.rgb *= mix(0.92, 1.04, streak * 0.5 + 0.5);
      if (vWpos.y < 0.0) diffuseColor.rgb *= 0.62;
    `,!0)},i.customProgramCacheKey=()=>"wood-v1"}function sg(i){i.onBeforeCompile=t=>{jn(t),Zn(t,`
      attribute float aBend;
      attribute float aPhase;
    `,`
      float s = sin(uTime * (1.05 + uWind * 0.9) + aPhase);
      float amp = aBend * (0.05 + uWind * 0.22);
      transformed.x += s * amp;
      transformed.z += s * 0.65 * amp;
      transformed.y += (s * 0.5 - 0.5) * aBend * (0.02 + uWind * 0.09);
    `),Kn(t,"",`
      float moss = smoothstep(1.6, 0.15, vWpos.y);
      float bark = sin(vWpos.y * 18.0 + vWpos.x * 7.0) * 0.5 + 0.5;
      diffuseColor.rgb *= mix(0.72, 1.06, bark);
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.16, 0.28, 0.1), moss * 0.4);
    `,!1)},i.customProgramCacheKey=()=>"tree-v1"}function rg(i){i.onBeforeCompile=t=>{jn(t),Zn(t,`
      attribute float aPhase;
      attribute float aCattail;
      attribute float aAmp;
      varying float vH;
      varying float vCattail;
    `,`
      vH = position.y;
      vCattail = aCattail;
      float sway = sin(uTime * (1.3 + uWind * 0.85) + aPhase) * position.y * position.y;
      transformed.x += sway * aAmp * (0.22 + uWind * 1.45);
      transformed.z += cos(uTime * (1.05 + uWind * 0.7) + aPhase) * position.y * position.y * aAmp * (0.12 + uWind * 0.85);
    `),Kn(t,`
      varying float vH;
      varying float vCattail;
    `,`
      vec3 reed = mix(vec3(0.09, 0.28, 0.08), vec3(0.52, 0.62, 0.2), vH);
      if (vCattail > 0.5 && vH > 0.8) {
        reed = mix(vec3(0.35, 0.18, 0.07), vec3(0.22, 0.1, 0.05), smoothstep(0.8, 1.0, vH));
      }
      diffuseColor.rgb = reed;
    `,!1)},i.customProgramCacheKey=()=>"reed-v1"}function og(i){i.onBeforeCompile=t=>{jn(t),Zn(t,`
      attribute float aPhase;
    `,`
      float s = sin(uTime * (1.4 + uWind * 1.1) + aPhase);
      transformed.x += s * position.y * (0.15 + uWind * 0.85);
      transformed.z += cos(uTime * 1.1 + aPhase) * position.y * (0.08 + uWind * 0.45);
    `),Kn(t,"",`
      float vein = smoothstep(0.08, 0.0, abs(vWpos.x * 0.0 + 0.0));
      diffuseColor.rgb *= mix(0.85, 1.05, 0.5);
    `,!1)},i.customProgramCacheKey=()=>"leaf-v1"}function ag(i){i.onBeforeCompile=t=>{jn(t),Zn(t,`
      attribute float aPhase;
    `,`
      float s = sin(uTime * (0.8 + uWind * 0.4) + aPhase) * position.y * position.y;
      transformed.x += s * (0.04 + uWind * 0.08);
    `),Kn(t,"",`
      vec3 gcol = mix(vec3(0.04, 0.18, 0.07), vec3(0.28, 0.48, 0.14), clamp(-vWpos.y, 0.0, 1.0));
      diffuseColor.rgb = gcol;
    `,!1)},i.customProgramCacheKey=()=>"grass-v1"}function lg(i){i.onBeforeCompile=t=>{jn(t),Zn(t,`
      attribute float aSpine;
      attribute float aPhase;
      attribute float aPattern;
      attribute float aAmp;
      varying vec3 vObj;
      varying float vPattern;
    `,`
      vObj = position;
      vPattern = aPattern;
      float w = sin(uTime * (4.2 + aAmp * 3.5) + aSpine * 7.5 + aPhase);
      transformed.x += w * aSpine * aSpine * 0.16 * aAmp;
    `),Kn(t,`
      varying vec3 vObj;
      varying float vPattern;
    `,`
      vec3 body = vec3(0.72, 0.7, 0.64);
      vec3 mark = vec3(0.55, 0.06, 0.03);
      float id = vPattern;
      if (id < 0.5) {
        body = vec3(0.78, 0.74, 0.68);
        mark = vec3(0.62, 0.05, 0.03);
      } else if (id < 1.5) {
        body = vec3(0.78, 0.18, 0.03);
        mark = vec3(0.9, 0.42, 0.08);
      } else if (id < 2.5) {
        body = vec3(0.82, 0.48, 0.08);
        mark = vec3(0.4, 0.12, 0.02);
      } else if (id < 3.5) {
        body = vec3(0.03, 0.03, 0.035);
        mark = vec3(0.45, 0.07, 0.04);
      } else {
        body = vec3(0.75, 0.73, 0.68);
        mark = vec3(0.55, 0.08, 0.04);
      }
      float n1 = sin(vObj.z * 16.0 + vObj.x * 11.0) * sin(vObj.y * 14.0 + vObj.z * 7.0);
      float spots = smoothstep(0.2, 0.75, n1 * 0.5 + 0.5);
      float band = smoothstep(0.35, 0.85, sin(vObj.z * 9.0 + sin(vObj.x * 18.0) * 2.2) * 0.5 + 0.5);
      float mask = id < 2.5 ? spots : band;
      if (id > 3.5) mask = spots * 0.85;
      diffuseColor.rgb = mix(body, mark, mask);
      float belly = smoothstep(0.02, -0.1, vObj.y);
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.85, 0.8, 0.72), belly * (id < 3.5 ? 0.35 : 0.08));
    `,!1)},i.customProgramCacheKey=()=>"fish-v1"}function cg(i){i.onBeforeCompile=t=>{jn(t),Zn(t),Kn(t,"",`
      float vein = 0.5 + 0.5 * sin(vWpos.x * 22.0 + vWpos.z * 16.0);
      diffuseColor.rgb *= mix(0.8, 1.08, vein);
    `,!0)},i.customProgramCacheKey=()=>"lily-v1"}function ug(i){let t=i>>>0;return()=>{t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Tr(i){i.traverse(t=>{t.raycast=()=>{}})}function hg(i,t){const e=ug(14149),n=[],s=[],r=[],o=fg();i.add(o);const a=dg();i.add(a);const l=pg(e);i.add(l);const u=mg(e);i.add(u);const c=gg(e);i.add(c);const h=_g(e);i.add(h);const f=xg(e,r);i.add(f.trunk),i.add(f.leaves);const d=Sg(n);i.add(d);for(const v of n)Y0(t,v.x,v.z,.2);const g=yg(s);return i.add(g),{posts:n,lilies:s,tips:r,sky:o,terrain:a}}function fg(){const i=new Cn(42,32,18),t=new sn({side:Le,depthWrite:!1,uniforms:{uTime:pt.uTime,uRain:pt.uRain,uSunDir:pt.uSunDir,uSunColor:pt.uSunColor,uSunAmt:pt.uSunAmt,uMoonDir:pt.uMoonDir,uMoonAmt:pt.uMoonAmt,uStarAmt:pt.uStarAmt,uSkyTop:pt.uSkyTop,uSkyHorizon:pt.uSkyHorizon,uSkyGround:pt.uSkyGround},vertexShader:`
      varying vec3 vDir;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vDir = world.xyz;
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,fragmentShader:`
      varying vec3 vDir;
      uniform float uTime;
      uniform float uRain;
      uniform float uSunAmt;
      uniform float uMoonAmt;
      uniform float uStarAmt;
      uniform vec3 uSunDir;
      uniform vec3 uSunColor;
      uniform vec3 uMoonDir;
      uniform vec3 uSkyTop;
      uniform vec3 uSkyHorizon;
      uniform vec3 uSkyGround;

      float hash12(vec2 p) {
        vec3 p3 = fract(vec3(p.xyx) * 0.1031);
        p3 += dot(p3, p3.yzx + 33.33);
        return fract((p3.x + p3.y) * p3.z);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash12(i);
        float b = hash12(i + vec2(1.0, 0.0));
        float c = hash12(i + vec2(0.0, 1.0));
        float d = hash12(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 5; i++) {
          v += a * noise(p);
          p *= 2.07;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec3 dir = normalize(vDir - cameraPosition);
        float h = dir.y;
        vec3 col = mix(uSkyHorizon, uSkyTop, pow(smoothstep(0.0, 0.45, max(h, 0.0)), 0.55));
        col = mix(uSkyGround, col, smoothstep(-0.18, 0.05, h));

        vec2 cuv = dir.xz / max(dir.y + 0.32, 0.08);
        float n = fbm(cuv * 1.15 + vec2(uTime * 0.008, uTime * 0.003));
        float cloud = smoothstep(0.62, 0.9, n) * smoothstep(0.02, 0.28, h);
        vec3 cloudCol = mix(vec3(1.0, 0.98, 0.96), uSkyHorizon, 0.4);
        cloudCol = mix(cloudCol, vec3(0.45, 0.48, 0.5), uRain);
        col = mix(col, cloudCol, cloud * mix(0.5, 0.95, uRain));
        col *= mix(1.0, 0.38, uRain);
        col = mix(col, vec3(0.16, 0.18, 0.2), uRain * 0.45);

        float sd = dot(dir, normalize(uSunDir));
        float sun = smoothstep(0.99915, 0.9997, sd);
        float glow = pow(max(sd, 0.0), 84.0);
        col += (sun * 5.5 + glow * 0.7) * uSunColor * uSunAmt * (1.0 - uRain * 0.85);

        float md = dot(dir, normalize(uMoonDir));
        float moon = smoothstep(0.9981, 0.99935, md);
        float crater = noise(dir.xy * 180.0);
        float mglow = pow(max(md, 0.0), 14.0);
        col += (moon * (0.75 + 0.25 * crater) * 4.2 + mglow * 0.45) * vec3(0.86, 0.91, 1.0) * uMoonAmt;

        float star = hash12(floor((dir.xy + dir.yz) * 380.0));
        float stars = smoothstep(0.993, 0.9992, star) * smoothstep(0.08, 0.3, h);
        col += stars * uStarAmt * (1.0 - uRain);

        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `}),e=new Zt(i,t);return e.frustumCulled=!1,e.renderOrder=-10,e.userData.kind="sky",Tr(e),e}function dg(){const i=new Pn(38,32,128,108);i.rotateX(-Math.PI/2);const t=i.attributes.position,e=new Float32Array(t.count*3),n=new st("#3a3228"),s=new st("#7b6846"),r=new st("#4a3828"),o=new st("#8d7452"),a=new st("#74624a"),l=new st;for(let h=0;h<t.count;h++){const f=t.getX(h),d=t.getZ(h),g=Xe(f,d);t.setY(h,g);const v=Ee(f,d),m=((Math.sin(f*3.1)+Math.sin(d*2.7))*.5+1)*.5;g<-.7?l.copy(n):g<-.05?l.copy(s).lerp(n,Math.min(1,-g/1.2)):g<.07?l.copy(r):v<1.6?l.copy(o):l.copy(a),l.offsetHSL(0,0,(m-.5)*.06),e[h*3]=l.r,e[h*3+1]=l.g,e[h*3+2]=l.b}i.setAttribute("color",new pe(e,3)),i.computeVertexNormals();const u=new fe({vertexColors:!0,roughness:.94,metalness:0,side:ye});wa(u);const c=new Zt(i,u);return c.receiveShadow=!0,c.userData.kind="terrain",c}function pg(i){const t=new Er(1,0),e=new fe({roughness:.58,metalness:.05});wa(e);const n=230,s=new Ji(t,e,n);s.instanceMatrix.setUsage(gc);const r=new le,o=new st;let a=0;for(let l=0;a<n&&l<5e3;l++){const u=a<80?-1.6+i()*3.6:(i()*2-1)*7.4,c=a<80?2.95+i()*1.5:(i()*2-1)*5.8,h=Ee(u,c),f=Xe(u,c),d=h>.9&&h<1.28&&f>-.02&&f<.45,g=f<-.02&&f>-.62&&h<1;if(!d&&!g||g&&c<-.4&&i()>.4)continue;const v=g?.035+i()*.09:.04+i()*.14;r.position.set(u,f+(g?v*.15:-v*.35),c),r.rotation.set(i()*6,i()*6,i()*6),r.scale.set(v*(.7+i()*.8),v*(.45+i()*.5),v*(.7+i())),r.updateMatrix(),s.setMatrixAt(a,r.matrix);const m=i();m<.55?o.set("#9a9286"):m<.82?o.set("#b7a48a"):o.set("#6e7a68"),o.offsetHSL(0,0,(i()-.5)*.08),s.setColorAt(a,o),a++}return s.count=a,s.receiveShadow=!0,s.frustumCulled=!1,s.userData.kind="pebble",s}function mg(i){const t=new We,e=[[-6.15,-1.55],[-5.7,-2.7],[5.9,2.15],[4.8,3.3],[-3.2,4.15],[1.2,4.55]];for(const[n,s]of e){const r=new Ta(.28+i()*.22,0),o=r.attributes.position;for(let c=0;c<o.count;c++){const h=.82+i()*.36;o.setXYZ(c,o.getX(c)*h,o.getY(c)*(.55+i()*.3),o.getZ(c)*h)}r.computeVertexNormals();const a=new fe({color:i()>.5?"#8a8176":"#6d645c",roughness:.78,metalness:.04});wa(a);const l=new Zt(r,a),u=Xe(n,s);l.position.set(n,u-.1,s),l.rotation.set(i(),i(),i()),l.castShadow=!0,l.receiveShadow=!0,l.userData.kind="rock",t.add(l)}return t}function gg(i){const t=new Pn(.07,.42,1,4);t.translate(0,.21,0);const e=[],n=[],s=new le;for(let l=0,u=0;u<90&&l<2500;l++){const c=(i()*2-1)*6.2,h=(i()*2-1)*4.6,f=Xe(c,h);f>-.08||f<-.7||h<-1&&i()>.45||(s.position.set(c,f,h),s.rotation.y=i()*Math.PI,s.scale.set(.7+i(),.55+i()*.9,1),s.updateMatrix(),n.push(s.matrix.clone()),e.push(i()*Math.PI*2),u++)}const r=new fe({color:"#ffffff",roughness:.7,side:ye});ag(r);const o=new Ji(t,r,n.length),a=new Float32Array(n.length);for(let l=0;l<n.length;l++)o.setMatrixAt(l,n[l]),a[l]=e[l];return t.setAttribute("aPhase",new di(a,1)),o.frustumCulled=!1,Tr(o),o}function _g(i){const t=new ys(.016,.028,1,5,6,!1);t.translate(0,.5,0);const e=new fe({color:"#ffffff",roughness:.72,side:ye});rg(e);const n=[],s=(c,h,f,d)=>{for(let g=0;g<f;g++){const v=c+(i()-.5)*1.3,m=h+(i()-.5)*1.1,p=Xe(v,m);if(d){if(p>-.04||p<-.48||Ee(v,m)>.98)continue}else if(p<.01||p>.55||Ee(v,m)<.98)continue;n.push({x:v,z:m,h:p,watery:d})}};s(-3.4,2.5,18,!1),s(-4.6,1.2,14,!1),s(3.4,3.6,12,!1),s(-2.2,2.15,16,!0),s(1.8,2.55,14,!0),s(-1.2,-2.4,12,!0),s(1.15,-3.15,16,!0),s(4.2,-.6,10,!1);const r=new Ji(t,e,Math.max(1,n.length)),o=new Float32Array(n.length),a=new Float32Array(n.length),l=new Float32Array(n.length),u=new le;for(let c=0;c<n.length;c++){const h=n[c],f=h.watery?.9+i()*.7:1.05+i()*.85;u.position.set(h.x,h.h,h.z),u.rotation.y=i()*Math.PI,u.rotation.z=(i()-.5)*.08,u.scale.set(.8+i()*.6,f,.8+i()*.6),u.updateMatrix(),r.setMatrixAt(c,u.matrix),o[c]=i()*Math.PI*2,a[c]=i()>.55?1:0,l[c]=.12+i()*.18}return r.count=n.length,t.setAttribute("aPhase",new di(o,1)),t.setAttribute("aCattail",new di(a,1)),t.setAttribute("aAmp",new di(l,1)),r.frustumCulled=!1,r.castShadow=!0,Tr(r),r}function vg(){const i=new Re,t=new Float32Array([0,0,0,.05,.04,.006,.022,.11,.012,0,.2,0,-.022,.11,.012,-.05,.04,.006]);return i.setAttribute("position",new pe(t,3)),i.setIndex([0,1,2,0,2,3,0,3,4,0,4,5]),i.computeVertexNormals(),i}function $l(i,t,e,n,s){for(let r=0;r<s;r++)i.push({x:t.x+(n()-.5)*.1,y:t.y+(n()-.5)*.06,z:t.z+(n()-.5)*.1,tangent:e,side:n()>.5?1:-1,phase:n()*Math.PI*2,roll:n()*Math.PI,scale:.8+n()*.85,hue:n()})}function xg(i,t){const e=[],n=[],s=new U(-6.45,Xe(-6.45,-1.85),-1.85),r=[];for(let S=0;S<=8;S++){const _=S/8,N=_*_;r.push(new U(s.x+N*2.35,s.y+_*2.85,s.z+N*1.25))}const o=new hs(r);e.push(Qs(o,8,.28,.09,.12,i()*6));for(let S=0;S<3;S++){const _=-.2+S*.85,N=s.clone(),R=new U(s.x+Math.cos(_)*.75,Xe(s.x+Math.cos(_)*.9,s.z+Math.sin(_)*.7)+.02,s.z+Math.sin(_)*.55),C=new U(s.x+Math.cos(_)*1.45,Math.min(-.04,Xe(s.x+Math.cos(_)*1.45,s.z+Math.sin(_)*1.15)),s.z+Math.sin(_)*1.2);e.push(Qs(new hs([N,R,C]),4,.07,.028,.25,i()*6))}const a=Math.atan2(-s.z*.35,-s.x);for(let S=0;S<6;S++){const _=.62+S/6*.32,N=o.getPoint(_),R=a+(S-2.5)*.55,C=1.35+S%3*.45,I=new U(N.x+Math.cos(R)*C,N.y+.15+S%2*.25,N.z+Math.sin(R)*C*.85),E=N.clone().lerp(I,.55);E.y+=.45;const M=new hs([N,E,I]);e.push(Qs(M,5,.05,.02,.35,i()*6));const P=M.getPoints(5);for(let H=2;H<P.length;H++){const w=P[H],L=3;for(let k=0;k<L;k++){const G=R+(k-1)*.28+(i()-.5)*.2,b=.7+i()*1.15,D=.35+i()*.85;let Y=Math.max(.35,w.y-b);const tt=w.x+Math.cos(G)*D,ot=w.z+Math.sin(G)*D;Ee(tt,ot)>.98&&(Y=Math.max(Y,.7));const at=w.clone().add(new U(Math.cos(G)*.12,.08,Math.sin(G)*.12)),Lt=new U(w.x+Math.cos(G)*D*.65,(w.y+Y)*.5,w.z+Math.sin(G)*D*.65),j=new U(tt,Y,ot),ft=new hs([w.clone(),at,Lt,j]).getPoints(6);for(let it=2;it<ft.length;it++){const Tt=ft[it-1],Ct=ft[it].clone().sub(Tt);Ct.lengthSq()<1e-6||(Ct.normalize(),$l(n,ft[it],Ct,i,it>3?4:3))}}}}[[-3.15,.35],[-2.55,-.45],[-3.7,.95],[-4.15,-.15]].forEach(([S,_],N)=>{const R=o.getPoint(.78+N*.04),C=N===0?-Math.PI/2-2.4:i()*Math.PI*2,I=new U(S,.04,_),E=R.clone().add(new U((S-R.x)*.25,.35,(_-R.z)*.25)),M=new U(R.x+(S-R.x)*.7,.85,R.z+(_-R.z)*.7),P=new hs([R,E,M,I]);e.push(Qs(P,7,.02,.008,1,C)),t.push({x:S,z:_,baseY:.04,phase:C,wet:!1});const H=P.getPoints(8);for(let w=2;w<H.length;w++){const L=H[w].clone().sub(H[w-1]);L.lengthSq()<1e-6||(L.normalize(),$l(n,H[w],L,i,4))}});const u=Hc(e,!1);u.computeVertexNormals();const c=new fe({color:"#6b5344",roughness:.86,metalness:0});sg(c);const h=new Zt(u,c);h.castShadow=!0,h.receiveShadow=!0,h.userData.kind="tree";const f=vg(),d=new fe({color:"#ffffff",roughness:.5,side:ye});og(d);const g=new Ji(f,d,Math.max(1,n.length)),v=new Float32Array(n.length),m=new le,p=new st,T=new U(0,1,0);for(let S=0;S<n.length;S++){const _=n[S];m.position.set(_.x,_.y,_.z);const N=new Rn().setFromUnitVectors(T,_.tangent.clone().normalize()),R=new Rn().setFromAxisAngle(_.tangent,_.side*1.05+(_.roll-1.2)*.55);m.quaternion.copy(N).multiply(R),m.scale.setScalar(_.scale),m.updateMatrix(),g.setMatrixAt(S,m.matrix),v[S]=_.phase,_.hue>.94?p.set("#d2b15a"):p.setHSL(.2+_.hue*.1,.55,.36+_.hue*.16),g.setColorAt(S,p)}return g.count=n.length,f.setAttribute("aPhase",new di(v,1)),g.frustumCulled=!1,g.castShadow=!0,Tr(g),{trunk:h,leaves:g,leafMats:[d]}}function Qs(i,t,e,n,s,r){return Mg(i,t,e,n,s,r)}function Mg(i,t,e,n,s,r){const o=i.computeFrenetFrames(t,!1),a=[],l=[],u=[],c=[],h=[],f=5,d=i.getPoint(0),g=i.getLength();for(let p=0;p<=t;p++){const T=p/t,S=i.getPointAt(T),_=o.normals[p],N=o.binormals[p],R=e+(n-e)*T,C=S.distanceTo(d),I=Math.min(1,C/Math.max(g,.001));for(let E=0;E<=f;E++){const M=E/f*Math.PI*2,P=Math.sin(M),H=Math.cos(M),w=H*_.x+P*N.x,L=H*_.y+P*N.y,k=H*_.z+P*N.z;a.push(S.x+w*R,S.y+L*R,S.z+k*R),l.push(w,L,k),u.push(E/f,T),c.push(s*I*I),h.push(r)}}const v=[];for(let p=0;p<t;p++)for(let T=0;T<f;T++){const S=p*(f+1)+T,_=(p+1)*(f+1)+T,N=(p+1)*(f+1)+T+1,R=p*(f+1)+T+1;v.push(S,_,R,_,N,R)}const m=new Re;return m.setAttribute("position",new re(a,3)),m.setAttribute("normal",new re(l,3)),m.setAttribute("uv",new re(u,2)),m.setAttribute("aBend",new re(c,1)),m.setAttribute("aPhase",new re(h,1)),m.setIndex(v),m}function Sg(i){const t=new We,e=new fe({color:"#6d4c32",roughness:.8,metalness:0}),n=new fe({color:"#4e3828",roughness:.84,metalness:0});Kl(e),Kl(n);const s=new U(1.25,0,-5.2),r=new U(.9,0,-.4),o=r.clone().sub(s),a=o.length();o.multiplyScalar(1/a);const l=Math.atan2(o.x,o.z),c=Math.max(8,Math.floor(a/.2)),h=new qn(.78,.045,.16);for(let d=0;d<=c;d++){const g=d/c,v=ge.lerp(s.x,r.x,g),m=ge.lerp(s.z,r.z,g),p=Xe(v,m),T=p>.03?p+.12:.18,S=new Zt(h,d%2?e:n);if(S.position.set(v,T,m),S.rotation.y=l+(d%5===0?.02:0),S.castShadow=!0,S.receiveShadow=!0,S.userData.kind="dock",t.add(S),d%4===0||d===c){const _=Math.min(-.05,p),N=T-.02,R=Math.max(.3,N-_),C=new Zt(new ys(.05,.065,1,7),n);C.scale.y=R,C.position.set(v,_+R*.5,m),C.castShadow=!0,C.receiveShadow=!0,C.userData.kind="dock",t.add(C),p<.02&&i.push({x:v,z:m,r:.16})}}const f=new qn(.05,.05,a);for(const d of[-.34,.34]){const g=s.clone().lerp(r,.5),v=new Zt(f,n);v.position.set(g.x+Math.cos(l)*d,.34,g.z-Math.sin(l)*d),v.rotation.y=l,v.castShadow=!0,v.userData.kind="dock",t.add(v)}return t}function yg(i){const t=new We,e=new Sr(1,26,.42,Math.PI*2-.85);e.rotateX(-Math.PI/2);const n=e.attributes.position;for(let o=0;o<n.count;o++){const a=n.getX(o),l=n.getZ(o),u=Math.hypot(a,l);n.setY(o,u*u*.05)}e.computeVertexNormals();const s=new fe({color:"#3f6b38",roughness:.48,metalness:0,side:ye});cg(s);const r=[[-.35,1.45,.62,!0],[1.25,.55,.48,!0],[-1.7,-.15,.55,!1],[.15,-1.25,.42,!0],[-2.5,.85,.5,!1],[2.05,1.55,.4,!1]];for(const[o,a,l,u]of r){if(Ee(o,a)>.9)continue;const c=new We,h=new Zt(e,s);if(h.scale.setScalar(l),h.userData.kind="lily",c.add(h),u){const f=Eg();f.scale.setScalar(l*1.15),f.traverse(d=>{d.isMesh&&(d.userData.kind="lily")}),c.add(f)}c.position.set(o,.02,a),t.add(c),i.push({x:o,z:a,r:l*.92,pad:c})}return t}function Eg(){const i=new We,t=new Cn(.09,8,6);t.scale(.55,.28,1);const e=new fe({color:"#f3c6d0",roughness:.48});for(let s=0;s<9;s++){const r=new Zt(t,e),o=s/9*Math.PI*2;r.position.set(Math.cos(o)*.07,.025,Math.sin(o)*.07),r.rotation.y=-o,r.rotation.x=.7,r.castShadow=!0,i.add(r)}const n=new Zt(new Cn(.04,8,6),new fe({color:"#e2b84a",roughness:.55}));return n.position.y=.045,i.add(n),i}const zi=new U,Bn=new U,Bi=new U,Jl=new Yt,tr=new U;function mi(i){i.traverse(t=>{t.raycast=()=>{}})}function Gc(i,t,e){const n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)}function Tg(i,t,e,n){const s=Pg(i),r=[],o=[],a=[],l=[],u=Ig(i),c=Ng(i),h=Fg(i),f=Ug(),d=new fe({vertexColors:!0,roughness:.72,metalness:0,side:ye}),g=Lg(),v=new Sr(.035,6);v.rotateX(-Math.PI/2);const m=new fe({color:"#d7c08a",roughness:.6,side:ye}),p=new Pn(.1,.042),T=new fe({color:"#8eaa45",roughness:.55,side:ye});bg(l,p,T,i);const S={rain:c.group,flies:h.group,update:_,ripple(w,L){xn(t,w,L,.055,.22)},throwStone(w,L,k){if(a.length>12){const Y=a.find(tt=>tt.state==="rest")||a[0];i.remove(Y.mesh),a.splice(a.indexOf(Y),1)}const G=new Zt(g,new fe({color:a.length%2?"#8d8680":"#6e675f",roughness:.7,metalness:.04})),b=.055+Math.random()*.035;G.scale.setScalar(b),G.castShadow=!0,G.receiveShadow=!0,G.userData.kind="stone",i.add(G);const D=k.clone();D.y=Math.max(.9,Math.min(D.y,2.2)),a.push({mesh:G,state:"fly",start:D,x:w,z:L,y:D.y,vy:0,t:0,duration:.42+Math.hypot(D.x-w,D.z-L)*.05,radius:b,spin:Math.random()*4})},placeBoat(w,L){if(r.length>=8){const b=r.shift();i.remove(b.mesh)}const k=new Zt(f,d);k.castShadow=!0,k.userData.kind="boat",i.add(k);const G=er(w,L,.12,r,e);r.push({mesh:k,x:G.x,z:G.z,vx:0,vz:0,yaw:Math.random()*Math.PI*2}),xn(t,G.x,G.z,.03,.16)},placeFood(w,L){if(!ui(w,L,.04))return;if(o.length>=6){const D=o.shift();i.remove(D.group)}const k=new We,G=[],b=5+Math.floor(Math.random()*3);for(let D=0;D<b;D++){const Y=new Zt(v,m),tt=(Math.random()-.5)*.22,ot=(Math.random()-.5)*.22;Y.scale.setScalar(.7+Math.random()*.8),Y.userData.kind="food",k.add(Y),G.push({mesh:Y,x:w+tt,z:L+ot,phase:Math.random()*6,alive:!0})}i.add(k),o.push({group:k,flakes:G,x:w,z:L}),xn(t,w,L,.02,.12)}};function _(w){const L=pt.uTime.value,k=pt.uWind.value,G=pt.uRain.value,b=pt.uNight.value;if(G>.08){const D=Math.round(G*7);for(let Y=0;Y<D;Y++){const tt=(Math.random()*2-1)*6,ot=(Math.random()*2-1)*4.6;ui(tt,ot,.03)&&(xn(t,tt,ot,.01+G*.008,.09),Math.random()<.35&&u.burst(tt,ot,!1))}}for(const D of e.tips){const Y=Math.sin(L*(1.05+k*.9)+D.phase),tt=(Y*.5-.5)*(.02+k*.09),ot=D.baseY+tt,at=D.x+Y*(.05+k*.22),Lt=D.z+Y*.65*(.05+k*.22);ot<.002&&!D.wet&&ui(at,Lt,.02)&&(xn(t,at,Lt,.07+k*.03,.22),D.wet=!0),ot>.03&&(D.wet=!1)}j0(t,w),n();for(const D of e.lilies){const Y=fs(t,D.x,D.z,L,k);D.pad.position.y=Y.y+.012,zi.set(Y.nx,Y.ny,Y.nz),Bn.set(0,1,0),D.pad.quaternion.setFromUnitVectors(Bn,zi)}N(w),R(w,L,k),C(w,L,k),I(w,L),E(w,L,k),u.update(w,t),c.update(w,k,G),h.update(w,L,b),P(w,k),n()}Og(s,e.posts);function N(w){for(const L of a)if(L.state==="fly"){L.t+=w;const k=Math.min(1,L.t/L.duration),G=Math.sin(k*Math.PI)*(.65+Math.hypot(L.start.x-L.x,L.start.z-L.z)*.1),b=L.start.x+(L.x-L.start.x)*k,D=L.start.z+(L.z-L.start.z)*k,Y=L.start.y+(.15-L.start.y)*k+G;L.mesh.position.set(b,Y,D),L.mesh.rotation.x+=w*L.spin,L.mesh.rotation.z+=w*L.spin*.7,k>=1&&(L.state="sink",L.y=.05,L.vy=-.2,xn(t,L.x,L.z,.2,.42),u.burst(L.x,L.z,!0),H(L.x,L.z))}else if(L.state==="sink"){L.vy-=3.4*w,L.vy*=Math.exp(-1.4*w),L.y+=L.vy*w;const k=Xe(L.x,L.z)+L.radius*.8;L.y<=k&&(L.y=k,L.state="rest"),L.mesh.position.set(L.x,L.y,L.z),L.mesh.rotation.x+=w*.8}}function R(w,L,k){const G=Math.exp(-.7*w),b=k*(.22+k);for(const D of r){const Y=fs(t,D.x,D.z,L,k);D.vx+=Fe.x*b*.85*w,D.vz+=Fe.z*b*.85*w,D.vx+=Y.nx*2.1*w,D.vz+=Y.nz*2.1*w,D.vx*=G,D.vz*=G,D.x+=D.vx*w,D.z+=D.vz*w;const tt=er(D.x,D.z,.14,r,e,D);if(tt.hit){const at=tt.nx||0,Lt=tt.nz||0,j=D.vx*at+D.vz*Lt;j<0&&(D.vx-=at*j,D.vz-=Lt*j)}D.x=tt.x,D.z=tt.z,Math.hypot(D.vx,D.vz)>.03&&(D.yaw=Math.atan2(D.vx,D.vz)),zi.set(Y.nx,Y.ny,Y.nz),Bn.set(Math.sin(D.yaw),0,Math.cos(D.yaw)),Bi.crossVectors(zi,Bn),Bi.lengthSq()<1e-6&&Bi.set(1,0,0),Bi.normalize(),Bn.crossVectors(Bi,zi).normalize(),Jl.makeBasis(Bi,zi,Bn),D.mesh.quaternion.setFromRotationMatrix(Jl),D.mesh.position.set(D.x,Y.y+.02,D.z)}}function C(w,L,k){const G=Math.exp(-1.1*w),b=k*(.18+k*.8);for(const D of o){let Y=0,tt=0,ot=0;for(const at of D.flakes){if(!at.alive)continue;const Lt=fs(t,at.x,at.z,L,k);at.vx=(at.vx||0)+Fe.x*b*.35*w+Lt.nx*.8*w,at.vz=(at.vz||0)+Fe.z*b*.35*w+Lt.nz*.8*w,at.vx*=G,at.vz*=G,at.x+=at.vx*w,at.z+=at.vz*w;const j=er(at.x,at.z,.05,[],e);at.x=j.x,at.z=j.z,at.mesh.position.set(at.x,Lt.y+.008,at.z),at.mesh.rotation.y=L*.4+at.phase,Y+=at.x,tt+=at.z,ot++}ot>0&&(D.x=Y/ot,D.z=tt/ot)}}function I(w,L,k){const G=o.filter(b=>b.flakes.some(D=>D.alive));for(const b of s){b.flee>0&&(b.flee-=w);let D=null,Y=null;if(b.flee>0)b.targetY=-.85,b.speed=1.15,b.amp=1.7;else if(G.length){let J=1/0;for(const ft of G)for(const it of ft.flakes){if(!it.alive)continue;const Tt=Math.hypot(it.x-b.x,it.z-b.z);Tt<J&&(J=Tt,Y=it)}Y&&J<4.8&&(D=Bn.set(Y.x-b.x,0,Y.z-b.z),D.lengthSq()>1e-6&&D.normalize(),b.speed=.78,b.targetY=J<.45?-.05:-.16,b.amp=1.35)}if(D)b.heading=Math.atan2(D.x,D.z);else{if(b.wander-=w,b.wander<=0&&(b.heading+=(Math.random()-.5)*1.4,b.wander=1.2+Math.random()*2.4),Ee(b.x,b.z)>.72){const ft=Math.atan2(-b.z,-b.x);b.heading+=wg(ft-b.heading)*.08}D=Bn.set(Math.sin(b.heading),0,Math.cos(b.heading)),b.speed=.32+Math.sin(L*.6+b.phase)*.05;const J=Ag(b.x,b.z);b.targetY=Math.max(-J+.16,-.35-Math.sin(L*.35+b.phase)*.12),b.amp=.85}const tt=1-Math.exp(-2.8*w);if(b.dir.lerp(D,tt).normalize(),Rg(b),Cg(b),b.dir.normalize(),b.x+=b.dir.x*b.speed*w,b.z+=b.dir.z*b.speed*w,Ee(b.x,b.z)>.9){const J=Bc(b.x,b.z),ft=Math.hypot(J.x,J.z)||1;b.x-=J.x/ft*.04,b.z-=J.z/ft*.04}const ot=Xe(b.x,b.z)+.08;b.targetY=Math.max(b.targetY,ot),b.y=ge.damp(b.y,Math.min(b.targetY,-.02),3.2,w),b.group.position.set(b.x,b.y,b.z);let at=ge.clamp((b.y-b.targetY)*2.2,-.35,.45);if(Y&&b.flee<=0){const J=Math.hypot(Y.x-b.x,Y.z-b.z);J<.42&&(at=-.55),J<.16&&b.y>-.14&&(tr.set(0,.02,.32),b.group.localToWorld(tr),xn(t,tr.x,tr.z,.018,.08),Y.alive=!1,Y.mesh.visible=!1,b.bite=.35)}b.group.rotation.order="YXZ",b.group.rotation.y=Math.atan2(b.dir.x,b.dir.z),b.group.rotation.x=at;const Lt=b.ampAttr.array,j=b.amp;for(let J=0;J<Lt.length;J++)Lt[J]=j;b.ampAttr.needsUpdate=!0}for(let b=o.length-1;b>=0;b--)o[b].flakes.every(D=>!D.alive)&&(i.remove(o[b].group),o.splice(b,1))}function E(w,L,k){const G=k*(.2+k);for(const b of l)if(b.state==="fall"){b.vy=Math.max(b.vy-.7*w,-.42),b.x+=(Fe.x*(.15+k*.8)+Math.sin(L*3+b.phase)*.15)*w,b.z+=(Fe.z*(.15+k*.8)+Math.cos(L*2.4+b.phase)*.12)*w,b.y+=b.vy*w,b.mesh.rotation.x+=w*2.2,b.mesh.rotation.z+=w*1.4;const D=fs(t,b.x,b.z,L,k);b.y<=D.y+.01&&ui(b.x,b.z,.02)?(b.y=D.y,b.state="float",b.vx=Fe.x*.1,b.vz=Fe.z*.1,xn(t,b.x,b.z,.02,.1),u.burst(b.x,b.z,!1)):b.y<Xe(b.x,b.z)&&(b.state="gone",b.mesh.visible=!1),b.mesh.position.set(b.x,b.y,b.z)}else if(b.state==="float"){const D=fs(t,b.x,b.z,L,k);b.vx=(b.vx||0)+Fe.x*G*.45*w+D.nx*1.1*w,b.vz=(b.vz||0)+Fe.z*G*.45*w+D.nz*1.1*w,b.vx*=Math.exp(-.8*w),b.vz*=Math.exp(-.8*w),b.x+=b.vx*w,b.z+=b.vz*w;const Y=er(b.x,b.z,.05,[],e);b.x=Y.x,b.z=Y.z,b.mesh.position.set(b.x,D.y+.008,b.z),b.mesh.rotation.y+=w*.4,b.mesh.rotation.z=Math.sin(L*1.5+b.phase)*.3}}let M=1.2;function P(w,L){if(M-=w*(.08+L*.55),M>0)return;if(M=.8+Math.random()*1.6,l.filter(Y=>Y.state!=="gone").length>14){const Y=l.find(tt=>tt.state==="float");Y&&(Y.state="gone",Y.mesh.visible=!1)}const G=e.tips[Math.floor(Math.random()*Math.max(1,e.tips.length))]||{x:-2.2,z:-.3,baseY:1.6,phase:0},b=Math.sin(pt.uTime.value*(1.05+L*.9)+(G.phase||0));let D=l.find(Y=>Y.state==="gone");if(!D){const Y=new Zt(p,Vc(Math.random()));mi(Y),i.add(Y),D={mesh:Y,state:"fall",x:0,y:1,z:0,vy:0,phase:0},l.push(D)}D.state="fall",D.mesh.visible=!0,D.x=(G.x||-2.2)+b*.1,D.y=Math.max(.9,G.baseY||1.5),D.z=G.z||-.3,D.vy=-.05,D.phase=Math.random()*6,D.mesh.position.set(D.x,D.y,D.z)}function H(w,L){for(const k of s){const G=Math.hypot(k.x-w,k.z-L);if(G<3.3){k.flee=2.6;const b=1/Math.max(G,.2);k.dir.set((k.x-w)*b,0,(k.z-L)*b).normalize(),k.heading=Math.atan2(k.dir.x,k.dir.z)}}}return S}function Vc(i){const t=i>.85?"#c6a24a":"#7ea044";return new fe({color:t,roughness:.55,side:ye})}function bg(i,t,e,n){const s=[{x:-.7,z:1.15,state:"float"},{x:.45,z:-.35,state:"float"},{x:-1.8,z:.15,y:1.7,state:"fall"}];for(const r of s){const o=new Zt(t,r.state==="fall"?Vc(.2):e);mi(o),n.add(o);const a={mesh:o,state:r.state,x:r.x,y:r.y||0,z:r.z,vy:-.12,vx:.02,vz:.01,phase:Math.random()*6};o.position.set(a.x,a.y,a.z),i.push(a)}}function Ag(i,t){return Math.max(.05,-Xe(i,t))}function wg(i){for(;i>Math.PI;)i-=Math.PI*2;for(;i<-Math.PI;)i+=Math.PI*2;return i}function Rg(i){Ra(i)}function Cg(i){Ca(i)}function er(i,t,e,n,s,r){let o=!1,a=0,l=0;const u=Ee(i,t);if(u>.9){const c=Bc(i,t),h=Math.hypot(c.x,c.z)||1,f=(u-.88)*1.4+e;i-=c.x/h*f,t-=c.z/h*f,a=-c.x/h,l=-c.z/h,o=!0}for(const c of s.lilies){const h=i-c.x,f=t-c.z,d=Math.hypot(h,f),g=e+c.r;d<g&&d>1e-5&&(a=h/d,l=f/d,i=c.x+a*g,t=c.z+l*g,o=!0)}for(const c of s.posts){const h=i-c.x,f=t-c.z,d=Math.hypot(h,f),g=e+c.r;d<g&&d>1e-5&&(a=h/d,l=f/d,i=c.x+a*g,t=c.z+l*g,o=!0)}if(n)for(const c of n){if(c===r)continue;const h=i-c.x,f=t-c.z,d=Math.hypot(h,f),g=e+.16;d<g&&d>1e-5&&(a=h/d,l=f/d,i=c.x+a*g,t=c.z+l*g,o=!0)}return{x:i,z:t,hit:o,nx:a,nz:l}}function Pg(i){const t=new fe({color:"#ffffff",roughness:.32,metalness:.06});lg(t);const e=[{x:-.15,z:1.55,pattern:0,phase:.4,heading:1.55},{x:1.35,z:.85,pattern:1,phase:1.7,heading:2.4},{x:-1.15,z:.35,pattern:4,phase:2.4,heading:-.7},{x:.55,z:-.35,pattern:2,phase:.2,heading:2},{x:-1.7,z:-.55,pattern:3,phase:3.1,heading:.9},{x:1.65,z:-1.05,pattern:1,phase:4.2,heading:-2.2}],n=[],s=new fe({color:"#f4f1ea",roughness:.3}),r=new fe({color:"#1a120e",roughness:.4});for(const o of e){const a=Dg(o.pattern,o.phase),l=a.getAttribute("aAmp");l.setUsage(gc);const u=new Zt(a,t);u.castShadow=!0,u.receiveShadow=!0,mi(u);const c=new We;c.add(u);for(const f of[-1,1]){const d=new Zt(new Cn(.018,8,6),s);d.position.set(f*.075,.035,.2);const g=new Zt(new Cn(.009,6,5),r);g.position.set(0,0,.012),d.add(g),mi(d),c.add(d)}c.position.set(o.x,-.28,o.z),i.add(c);const h=o.heading;n.push({group:c,ampAttr:l,x:o.x,y:-.28,z:o.z,dir:new U(Math.sin(h),0,Math.cos(h)),heading:h,wander:1,speed:.32,targetY:-.25,phase:o.phase,flee:0,amp:1,bite:0})}return n}function Dg(i,t){const e=new Cn(.5,18,12);e.scale(.2,.15,.58);const n=e.attributes.position;for(let o=0;o<n.count;o++){const a=n.getZ(o),l=Gc(.02,-.48,a),u=1-l*.7;n.setX(o,n.getX(o)*u),n.setY(o,n.getY(o)*(1-l*.55))}const s=new Ea(.07,.2,4);s.rotateX(-Math.PI/2),s.translate(0,0,-.42);const r=new qn(.012,.09,.14);return r.translate(0,.09,-.02),lo(e,i,t),lo(s,i,t),lo(r,i,t),Hc([e,s,r])}function lo(i,t,e){const n=i.attributes.position.count,s=new Float32Array(n),r=new Float32Array(n),o=new Float32Array(n),a=new Float32Array(n);for(let l=0;l<n;l++){const u=i.attributes.position.getZ(l);s[l]=ge.clamp((.22-u)/.7,0,1),r[l]=t,o[l]=e,a[l]=1}i.setAttribute("aSpine",new pe(s,1)),i.setAttribute("aPattern",new pe(r,1)),i.setAttribute("aPhase",new pe(o,1)),i.setAttribute("aAmp",new pe(a,1)),i.computeVertexNormals()}function Lg(){const i=new Er(1,1),t=i.attributes.position;for(let e=0;e<t.count;e++){const n=.82+e*17%7*.03;t.setXYZ(e,t.getX(e)*n,t.getY(e)*(.7+e%5*.04),t.getZ(e)*n)}return i.computeVertexNormals(),i}function Ug(){const i=[0,.05,.3,0,.045,-.24,0,0,.02,-.09,.07,.1,.09,.07,.1,-.075,.065,-.1,.075,.065,-.1,-.1,.078,0,.1,.078,0],t=[2,0,3,2,4,0,2,3,7,2,7,5,2,5,1,2,1,6,2,6,8,2,8,4,0,4,3,3,7,0,0,7,4,7,8,4,1,5,6,5,7,6,7,8,6],e=new Re;e.setAttribute("position",new re(i,3)),e.setIndex(t),e.computeVertexNormals();const n=new st("#f3e6c4"),s=new st("#b3392c"),r=new Float32Array(9*3);for(let o=0;o<9;o++){const l=o>=3?s:n;r[o*3]=l.r,r[o*3+1]=l.g,r[o*3+2]=l.b}return e.setAttribute("color",new pe(r,3)),e}function Ig(i){const t=new Cn(1,6,5),e=new fe({color:"#e7f2f4",roughness:.12,metalness:.04,transparent:!0,opacity:.85}),n=new Ji(t,e,70);n.frustumCulled=!1,n.count=70,mi(n),i.add(n);const s=Array.from({length:70},()=>({alive:!1,x:0,y:0,z:0,vx:0,vy:0,vz:0,s:.02})),r=new le;function o(){for(let a=0;a<s.length;a++){const l=s[a];l.alive?(r.position.set(l.x,l.y,l.z),r.scale.setScalar(l.s)):(r.position.set(0,-10,0),r.scale.setScalar(1e-4)),r.updateMatrix(),n.setMatrixAt(a,r.matrix)}n.instanceMatrix.needsUpdate=!0}return o(),{burst(a,l,u){const c=u?22:6;let h=0;for(const f of s){if(f.alive)continue;const d=Math.random()*Math.PI*2,g=u?.7+Math.random()*1.5:.2+Math.random()*.45;if(f.alive=!0,f.x=a+(Math.random()-.5)*.08,f.y=.05,f.z=l+(Math.random()-.5)*.08,f.vx=Math.cos(d)*g,f.vz=Math.sin(d)*g,f.vy=(u?1.5:.6)+Math.random()*(u?1.8:.7),f.s=u?.018+Math.random()*.02:.01+Math.random()*.012,h++,h>=c)break}},update(a,l){let u=!1;for(const c of s)c.alive&&(u=!0,c.vy-=9.2*a,c.x+=c.vx*a,c.y+=c.vy*a,c.z+=c.vz*a,c.y<0&&c.vy<0&&(ui(c.x,c.z,.02)&&xn(l,c.x,c.z,.012,.07),c.alive=!1));u&&o()}}}function Ng(i){const t=new Pn(.012,.48),e=new sn({transparent:!0,depthWrite:!1,uniforms:{},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      varying vec2 vUv;
      void main() {
        float a = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.45, vUv.y);
        gl_FragColor = vec4(0.75, 0.8, 0.84, a * 0.38);
        #include <colorspace_fragment>
      }
    `}),n=320,s=new Ji(t,e,n);s.frustumCulled=!1,mi(s);const r=new We;r.add(s),r.visible=!1,i.add(r);const o=Array.from({length:n},()=>l(new U)),a=new le;function l(){return{x:(Math.random()*2-1)*8,y:Math.random()*12,z:(Math.random()*2-1)*7,sp:7+Math.random()*4,len:.65+Math.random()*.7}}return{group:r,update(u,c,h){if(r.visible=h>.04,!!r.visible){for(let f=0;f<o.length;f++){const d=o[f];d.y-=d.sp*u*(.45+h),d.x+=Fe.x*c*2.2*u,d.z+=Fe.z*c*2.2*u,d.y<0&&(d.y=8+Math.random()*6,d.x=(Math.random()*2-1)*8,d.z=(Math.random()*2-1)*7),a.position.set(d.x,d.y,d.z),a.rotation.set(c*.45*Fe.z,0,-c*.45*Fe.x),a.scale.set(1,d.len,1),a.updateMatrix(),s.setMatrixAt(f,a.matrix)}s.instanceMatrix.needsUpdate=!0}}}}function Fg(i){const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d"),n=e.createRadialGradient(32,32,0,32,32,32);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.25,"rgba(230,255,170,0.7)"),n.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=n,e.fillRect(0,0,64,64);const s=new v0(t);s.colorSpace=Oe;const r=new Uc({map:s,color:"#d6f58a",transparent:!0,blending:ho,depthWrite:!1,opacity:0}),o=new We,a=[];for(let l=0;l<18;l++){const u=new g0(r);mi(u),o.add(u);const c=l<11;a.push({sprite:u,cx:c?(Math.random()*2-1)*3.2:-4.5+Math.random()*2,cy:.45+Math.random()*1.3,cz:c?(Math.random()*2-1)*2.4:-1.5+Math.random(),rx:.35+Math.random()*.8,rz:.3+Math.random()*.7,p1:Math.random()*6,p2:Math.random()*6,p3:Math.random()*6,s:.08+Math.random()*.06})}return i.add(o),{group:o,update(l,u,c){const h=Gc(.35,.75,c);if(r.opacity=h,o.visible=h>.02,!!o.visible)for(const f of a){f.sprite.position.set(f.cx+Math.sin(u*.37+f.p1)*f.rx,f.cy+Math.sin(u*.52+f.p2)*.28,f.cz+Math.cos(u*.31+f.p3)*f.rz);const d=.85+Math.sin(u*4.5+f.p1)*.2;f.sprite.scale.setScalar(f.s*d)}}}}function Og(i,t){Ra.fish=i,Ca.posts=t}const Ra=i=>{const t=Ra.fish||[];for(const e of t){if(e===i)continue;const n=i.x-e.x,s=i.z-e.z,r=Math.hypot(n,s);r<.38&&r>1e-4&&(i.dir.x+=n/r*.35,i.dir.z+=s/r*.35)}},Ca=i=>{const t=Ca.posts||[];for(const e of t){const n=i.x-e.x,s=i.z-e.z,r=Math.hypot(n,s);r<.42&&r>1e-4&&(i.dir.x+=n/r*.5,i.dir.z+=s/r*.5)}};function zg(i){const t=new Float32Array(wt.nx*wt.nz*4),e=new Nc(t,wt.nx,wt.nz,Be,nn);e.flipY=!1,e.generateMipmaps=!1,e.magFilter=Ue,e.minFilter=Ue,e.wrapS=e.wrapT=Hn,e.colorSpace=Mn,e.needsUpdate=!0,pt.uWave.value=e;const n=new ln,s=new U,r=new U,o=new U,a=new Yt,l=new U,u=new ae,c=new U,h=new U,f=new ae,d=new Yt,g=new Ve,v=new wn(2,2,{type:pi,format:Be,minFilter:ze,magFilter:ze,depthBuffer:!0,stencilBuffer:!1}),m=new wn(2,2,{type:pi,format:Be,minFilter:ze,magFilter:ze,depthBuffer:!0,stencilBuffer:!1});m.depthTexture=new Sa(2,2),m.depthTexture.format=fi,m.depthTexture.type=Yn;const p=new Pn(wt.x1-wt.x0,wt.z1-wt.z0,200,160),T=new sn({uniforms:{textureMatrix:{value:d},uReflect:{value:v.texture},uRefract:{value:m.texture},uDepth:{value:m.depthTexture},uWave:pt.uWave,uSimOrigin:pt.uSimOrigin,uSimSize:pt.uSimSize,uSimTexel:pt.uSimTexel,uTime:pt.uTime,uWind:pt.uWind,uRain:pt.uRain,uSunDir:pt.uSunDir,uSunColor:pt.uSunColor,uSunAmt:pt.uSunAmt,uMoonDir:pt.uMoonDir,uMoonAmt:pt.uMoonAmt,uDeep:pt.uDeep,uShallow:pt.uShallow,uScatter:pt.uScatter,uAbsorb:pt.uAbsorb,uResolution:pt.uResolution,uNear:pt.uNear,uFar:pt.uFar},vertexShader:`
      uniform mat4 textureMatrix;
      uniform float uTime;
      uniform float uWind;
      ${ra}
      ${sa()}
      varying vec4 vMirror;
      varying vec3 vWorld;
      varying vec3 vFlat;
      varying float vViewZ;
      void main() {
        vMirror = textureMatrix * vec4(position, 1.0);
        vec4 flatWorld = modelMatrix * vec4(position, 1.0);
        vFlat = flatWorld.xyz;
        vec3 g = gerstnerAll(flatWorld.xz, uTime, uWind);
        float h = g.x + simH(flatWorld.xz);
        vec3 displaced = position;
        displaced.z += h;
        vec4 world = modelMatrix * vec4(displaced, 1.0);
        vWorld = world.xyz;
        vec4 mv = viewMatrix * world;
        vViewZ = mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,fragmentShader:`
      uniform sampler2D uReflect;
      uniform sampler2D uRefract;
      uniform sampler2D uDepth;
      uniform float uTime;
      uniform float uWind;
      uniform float uRain;
      uniform float uSunAmt;
      uniform float uMoonAmt;
      uniform float uAbsorb;
      uniform float uNear;
      uniform float uFar;
      uniform vec2 uResolution;
      uniform vec3 uSunDir;
      uniform vec3 uSunColor;
      uniform vec3 uMoonDir;
      uniform vec3 uDeep;
      uniform vec3 uShallow;
      uniform vec3 uScatter;
      ${ra}
      ${sa()}
      ${K0}
      varying vec4 vMirror;
      varying vec3 vWorld;
      varying vec3 vFlat;
      varying float vViewZ;

      float perspectiveDepthToViewZ(const in float invClipZ, const in float near, const in float far) {
        return (near * far) / ((far - near) * invClipZ - far);
      }

      void main() {
        if (pondFactor(vFlat.xz) > 0.993) discard;
        vec3 g = gerstnerAll(vFlat.xz, uTime, uWind);
        float e = 0.08;
        float s0 = simH(vFlat.xz);
        float sx = (simH(vFlat.xz + vec2(e, 0.0)) - s0) / e;
        float sz = (simH(vFlat.xz + vec2(0.0, e)) - s0) / e;
        float dhdx = g.y + sx;
        float dhdz = g.z + sz;
        float micro = mix(0.02, 0.11, uWind) + uRain * 0.09;
        float freq = mix(2.5, 12.0, uWind);
        dhdx += micro * cos(vFlat.x * freq + vFlat.z * freq * 0.37 + uTime * (1.7 + uWind * 1.4));
        dhdz += micro * cos(vFlat.z * freq * 1.08 - vFlat.x * freq * 0.29 - uTime * 1.45);
        vec3 normal = normalize(vec3(-dhdx, 1.0, -dhdz));

        vec3 viewDir = normalize(cameraPosition - vWorld);
        float ndv = clamp(dot(normal, viewDir), 0.0, 1.0);
        float fres = 0.02 + 0.98 * pow(1.0 - ndv, 5.0);
        fres = mix(fres, fres * 0.72 + 0.06, uRain);

        vec2 distort = normal.xz;
        vec2 ruv = vMirror.xy / vMirror.w + distort * (0.055 + uWind * 0.02);
        vec3 refl;
        if (uRain > 0.04) {
          float b = 0.0045 + uRain * 0.01;
          refl = texture2D(uReflect, ruv).rgb * 0.42;
          refl += texture2D(uReflect, ruv + vec2(b, 0.4 * b)).rgb * 0.16;
          refl += texture2D(uReflect, ruv + vec2(-b, 0.2 * b)).rgb * 0.16;
          refl += texture2D(uReflect, ruv + vec2(0.3 * b, -b)).rgb * 0.13;
          refl += texture2D(uReflect, ruv + vec2(-0.6 * b, -0.7 * b)).rgb * 0.13;
        } else {
          refl = texture2D(uReflect, ruv).rgb;
        }
        refl = mix(refl, vec3(dot(refl, vec3(0.25, 0.5, 0.25))), uRain * 0.28);

        vec2 suv = gl_FragCoord.xy / uResolution + distort * (0.085 + uRain * 0.04);
        suv = clamp(suv, vec2(0.001), vec2(0.999));
        vec3 refr = texture2D(uRefract, suv).rgb;
        float sceneZ = perspectiveDepthToViewZ(texture2D(uDepth, suv).r, uNear, uFar);
        float thickness = max(0.0, vViewZ - sceneZ);
        float transmit = exp(-thickness * uAbsorb);
        float closeBottom = smoothstep(1.2, 0.16, thickness);
        vec3 tinted = mix(uDeep, refr * uShallow, transmit);
        vec3 waterCol = mix(tinted, refr, closeBottom);
        waterCol += uScatter * (1.0 - exp(-thickness * 0.75)) * 0.38 * (1.0 - closeBottom);

        vec3 color = mix(waterCol, refl, fres);
        vec3 L = normalize(uSunDir);
        vec3 H = normalize(L + viewDir);
        float specP = mix(180.0, 32.0, clamp(uWind, 0.0, 1.0));
        specP = mix(specP, 24.0, uRain);
        float spec = pow(clamp(dot(normal, H), 0.0, 1.0), specP);
        color += uSunColor * spec * uSunAmt * (1.0 - uRain * 0.8) * 1.55;

        vec3 Lm = normalize(uMoonDir);
        vec3 Hm = normalize(Lm + viewDir);
        float mspec = pow(clamp(dot(normal, Hm), 0.0, 1.0), mix(240.0, 64.0, uWind));
        color += vec3(0.75, 0.84, 1.0) * mspec * uMoonAmt * 1.7;

        float crest = smoothstep(0.05, 0.16, s0);
        color = mix(color, vec3(0.8, 0.86, 0.84), crest * 0.55);

        gl_FragColor = vec4(color, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `}),S=new Zt(p,T);S.rotation.x=-Math.PI/2,S.position.y=0,S.userData.kind="water",S.frustumCulled=!1,i.add(S);const _=new ln(new U(0,-1,0),1e4),N={refraction:[],reflection:[]};function R(P,H){for(const w of P)w.visible=H}function C(P,H){if(S.visible=!1,R(N.reflection,!1),r.setFromMatrixPosition(S.matrixWorld),o.setFromMatrixPosition(H.matrixWorld),a.extractRotation(S.matrixWorld),s.set(0,0,1).applyMatrix4(a),c.subVectors(r,o),c.dot(s)>0){S.visible=!0,R(N.reflection,!0);return}c.reflect(s).negate(),c.add(r),a.extractRotation(H.matrixWorld),l.set(0,0,-1),l.applyMatrix4(a),l.add(o),h.subVectors(r,l),h.reflect(s).negate(),h.add(r),g.position.copy(c),g.up.set(0,1,0),g.up.applyMatrix4(a),g.up.reflect(s),g.lookAt(h),g.far=H.far,g.near=H.near,g.updateMatrixWorld(),g.projectionMatrix.copy(H.projectionMatrix),d.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),d.multiply(g.projectionMatrix),d.multiply(g.matrixWorldInverse),d.multiply(S.matrixWorld),n.setFromNormalAndCoplanarPoint(s,r),n.applyMatrix4(g.matrixWorldInverse),u.set(n.normal.x,n.normal.y,n.normal.z,n.constant);const w=g.projectionMatrix;f.x=(Math.sign(u.x)+w.elements[8])/w.elements[0],f.y=(Math.sign(u.y)+w.elements[9])/w.elements[5],f.z=-1,f.w=(1+w.elements[10])/w.elements[14],u.multiplyScalar(2/u.dot(f));const L=.004;w.elements[2]=u.x,w.elements[6]=u.y,w.elements[10]=u.z+1-L,w.elements[14]=u.w,P.setRenderTarget(v),P.setClearColor(pt.uSkyHorizon.value,1),P.clear(),P.render(i,g),P.setRenderTarget(null),S.visible=!0,R(N.reflection,!0)}function I(P,H){S.visible=!1,R(N.refraction,!1),_.constant=0,P.setRenderTarget(m),P.setClearColor(pt.uDeep.value,1),P.clear(),P.render(i,H),P.setRenderTarget(null),_.constant=1e4,S.visible=!0,R(N.refraction,!0)}function E(P,H){const w=Math.max(2,Math.floor(P)),L=Math.max(2,Math.floor(H));v.setSize(w,L),m.setSize(w,L),pt.uResolution.value.set(w,L)}function M(P){const H=P.curr;for(let w=0;w<H.length;w++)t[w*4]=H[w];e.needsUpdate=!0}return{mesh:S,mask:N,worldClip:_,reflectRT:v,refractRT:m,setSize:E,upload:M,renderReflection:C,renderRefraction:I}}document.querySelector("#app");const Ms=document.querySelector("#stage"),Wc=[...document.querySelectorAll("[data-tool]")],Xc=[...document.querySelectorAll("[data-time]")],li=document.querySelector("#wind"),Bg=document.querySelector("#wind-name"),oa=document.querySelector("#rain"),rn=document.createElement("canvas");Ms.appendChild(rn);const Yc=rn.getContext("webgl2",{antialias:!0,alpha:!1,powerPreference:"high-performance"});if(!Yc)throw Ms.textContent="需要 WebGL 2 才能显示这片池塘。",new Error("WebGL2 unavailable");const Se=new d0({canvas:rn,context:Yc,antialias:!0});Se.outputColorSpace=Oe;Se.toneMapping=ic;Se.toneMappingExposure=1.02;Se.shadowMap.enabled=!0;Se.shadowMap.type=ec;Se.shadowMap.autoUpdate=!1;Se.setClearColor(1056808,1);Se.localClippingEnabled=!0;const Qi=new p0,De=new Ve(42,1,.08,180);De.position.set(1.35,1.65,6.55);const oe=new R0(De,rn);oe.target.set(-.7,-.08,.15);oe.enableDamping=!0;oe.dampingFactor=.08;oe.enablePan=!1;oe.minDistance=1.7;oe.maxDistance=12.5;oe.minPolarAngle=.28;oe.maxPolarAngle=1.48;oe.touches.ONE=kn.ROTATE;oe.touches.TWO=kn.DOLLY_PAN;oe.mouseButtons.LEFT=yn.ROTATE;oe.mouseButtons.MIDDLE=yn.DOLLY;oe.mouseButtons.RIGHT=yn.ROTATE;oe.update();const _r=X0(),qc=J0(Qi),bn=zg(Qi);Se.clippingPlanes=[bn.worldClip];const Pa=hg(Qi,_r),Gn=Tg(Qi,_r,Pa,()=>bn.upload(_r));bn.mask.refraction.push(Pa.sky,Gn.rain,Gn.flies);bn.mask.reflection.push(Gn.rain);let cr="ripple",aa=.22,ur=0,nr=0,jc=0,co=0;const an=new Set,Ql=new b0,uo=new vt,kg=new Set(["dock","tree","rock"]);function Hg(i){return i<.08?"无风":i<.34?"微风":i<.62?"清风":i<.85?"强风":"劲风"}function ms(i){cr=i;for(const t of Wc){const e=t.dataset.tool===i;t.setAttribute("aria-pressed",e?"true":"false")}}function hr(i){jc=i;for(const t of Xc){const e=Number(t.dataset.time)===i;t.setAttribute("aria-pressed",e?"true":"false")}}function Zc(){const i=Ms.clientWidth||window.innerWidth,t=Ms.clientHeight||window.innerHeight,e=i/Math.max(1,t),n=i<700?1.45:1.7,s=Math.min(window.devicePixelRatio||1,n);Se.setPixelRatio(s),Se.setSize(i,t,!1),De.aspect=e,De.fov=e<.82?52:42,De.updateProjectionMatrix(),pt.uNear.value=De.near,pt.uFar.value=De.far;const r=Se.getDrawingBufferSize(new vt);bn.setSize(r.x,r.y)}function Gg(){const i=Math.max(.001,oe.getDistance()),t=.12-oe.target.y,e=Math.acos(ge.clamp(t/i,-1,1));oe.maxPolarAngle=Math.min(1.52,e)}function Vg(i,t){const e=rn.getBoundingClientRect();uo.x=(i-e.left)/e.width*2-1,uo.y=-((t-e.top)/e.height)*2+1,Ql.setFromCamera(uo,De);const n=Ql.intersectObjects(Qi.children,!0);for(const s of n){const r=s.object.userData.kind;if(!r||r==="sky"||r==="pebble")continue;if(kg.has(r))return;const{x:o,z:a}=s.point;if(!ui(o,a,-.03))return;cr==="stone"?Gn.throwStone(o,a,De.position):cr==="boat"?Gn.placeBoat(o,a):cr==="food"?Gn.placeFood(o,a):Gn.ripple(o,a);return}}const hi=new Map;rn.addEventListener("pointerdown",i=>{hi.set(i.pointerId,{x:i.clientX,y:i.clientY,t:performance.now(),n:hi.size+1}),rn.classList.add("is-dragging")});rn.addEventListener("pointerup",i=>{const t=hi.get(i.pointerId);hi.delete(i.pointerId),hi.size===0&&rn.classList.remove("is-dragging"),!(!t||t.n>1||hi.size>0||Math.hypot(i.clientX-t.x,i.clientY-t.y)>8||performance.now()-t.t>480)&&Vg(i.clientX,i.clientY)});rn.addEventListener("pointercancel",i=>{hi.delete(i.pointerId)});rn.addEventListener("contextmenu",i=>i.preventDefault());for(const i of Wc)i.addEventListener("click",()=>ms(i.dataset.tool));for(const i of Xc)i.addEventListener("click",()=>hr(Number(i.dataset.time)));li.addEventListener("input",()=>{aa=Number(li.value)/100,Bg.textContent=Hg(aa)});oa.addEventListener("click",()=>{ur=ur>.5?0:1,oa.setAttribute("aria-pressed",ur>.5?"true":"false")});window.addEventListener("keydown",i=>{i.target instanceof HTMLInputElement||(an.add(i.key),i.key==="1"&&ms("ripple"),i.key==="2"&&ms("stone"),i.key==="3"&&ms("boat"),i.key==="4"&&ms("food"),i.key==="5"&&hr(0),i.key==="6"&&hr(1),i.key==="7"&&hr(2),(i.key==="r"||i.key==="R")&&oa.click(),i.key==="["&&(li.value=String(Math.max(0,Number(li.value)-5))),i.key==="]"&&(li.value=String(Math.min(100,Number(li.value)+5))),(i.key==="["||i.key==="]")&&li.dispatchEvent(new Event("input")))});window.addEventListener("keyup",i=>an.delete(i.key));function Wg(i){const t=De.position.clone().sub(oe.target),e=new ea().setFromVector3(t);let n=!1;an.has("ArrowLeft")&&(e.theta+=i*.7,n=!0),an.has("ArrowRight")&&(e.theta-=i*.7,n=!0),an.has("ArrowUp")&&(e.phi-=i*.45,n=!0),an.has("ArrowDown")&&(e.phi+=i*.45,n=!0),(an.has("-")||an.has("_"))&&(e.radius*=1+i*.7,n=!0),(an.has("=")||an.has("+"))&&(e.radius*=1-i*.55,n=!0),n&&(e.phi=ge.clamp(e.phi,oe.minPolarAngle,oe.maxPolarAngle),e.radius=ge.clamp(e.radius,oe.minDistance,oe.maxDistance),t.setFromSpherical(e),De.position.copy(oe.target).add(t))}const Xg=new T0;Zc();kc(0,0,qc);bn.upload(_r);new ResizeObserver(Zc).observe(Ms);Se.setAnimationLoop(()=>{const i=Math.min(.05,Xg.getDelta());pt.uTime.value+=i,co=ge.damp(co,jc,2.2,i),nr=ge.damp(nr,ur,2.5,i),pt.uWind.value=aa,pt.uRain.value=nr,kc(co,nr,qc),Wg(i),Gg(),oe.update(),Pa.sky.position.copy(De.position),Gn.update(i),Se.shadowMap.needsUpdate=!0,bn.worldClip.constant=1e4,bn.renderReflection(Se,De),bn.renderRefraction(Se,De),Se.setClearColor(1056808,1),Se.render(Qi,De)});
