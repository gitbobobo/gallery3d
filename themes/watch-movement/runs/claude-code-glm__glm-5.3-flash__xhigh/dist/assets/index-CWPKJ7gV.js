(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Bo="169",yi={ROTATE:0,DOLLY:1,PAN:2},xi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ol=0,ma=1,Bl=2,Rc=1,Cc=2,mn=3,In=0,Ce=1,_n=2,Ln=0,Ei=1,_a=2,ga=3,va=4,zl=5,Wn=100,Hl=101,Gl=102,Vl=103,kl=104,Wl=200,Xl=201,Yl=202,ql=203,Wr=204,Xr=205,Zl=206,Kl=207,jl=208,Jl=209,$l=210,Ql=211,th=212,eh=213,nh=214,Yr=0,qr=1,Zr=2,wi=3,Kr=4,jr=5,Jr=6,$r=7,Pc=0,ih=1,sh=2,Dn=0,rh=1,oh=2,ah=3,Lc=4,ch=5,lh=6,hh=7,Dc=300,Ai=301,Ri=302,Qr=303,to=304,js=306,Hs=1e3,Yn=1001,eo=1002,Ye=1003,uh=1004,rs=1005,Je=1006,ar=1007,qn=1008,Mn=1009,Ic=1010,Uc=1011,Ki=1012,zo=1013,Zn=1014,gn=1015,ts=1016,Ho=1017,Go=1018,Ci=1020,Nc=35902,Fc=1021,Oc=1022,Qe=1023,Bc=1024,zc=1025,Ti=1026,Pi=1027,Hc=1028,Vo=1029,Gc=1030,ko=1031,Wo=1033,Ds=33776,Is=33777,Us=33778,Ns=33779,no=35840,io=35841,so=35842,ro=35843,oo=36196,ao=37492,co=37496,lo=37808,ho=37809,uo=37810,fo=37811,po=37812,mo=37813,_o=37814,go=37815,vo=37816,xo=37817,Mo=37818,So=37819,yo=37820,Eo=37821,Fs=36492,To=36494,bo=36495,Vc=36283,wo=36284,Ao=36285,Ro=36286,dh=3200,fh=3201,kc=0,ph=1,Pn="",nn="srgb",Nn="srgb-linear",Xo="display-p3",Js="display-p3-linear",Gs="linear",ie="srgb",Vs="rec709",ks="p3",ii=7680,xa=519,mh=512,_h=513,gh=514,Wc=515,vh=516,xh=517,Mh=518,Sh=519,Ma=35044,Sa="300 es",vn=2e3,Ws=2001;class Qn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Me=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ya=1234567;const ki=Math.PI/180,ji=180/Math.PI;function ti(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Me[i&255]+Me[i>>8&255]+Me[i>>16&255]+Me[i>>24&255]+"-"+Me[t&255]+Me[t>>8&255]+"-"+Me[t>>16&15|64]+Me[t>>24&255]+"-"+Me[e&63|128]+Me[e>>8&255]+"-"+Me[e>>16&255]+Me[e>>24&255]+Me[n&255]+Me[n>>8&255]+Me[n>>16&255]+Me[n>>24&255]).toLowerCase()}function ge(i,t,e){return Math.max(t,Math.min(e,i))}function Yo(i,t){return(i%t+t)%t}function yh(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Eh(i,t,e){return i!==t?(e-i)/(t-i):0}function Wi(i,t,e){return(1-e)*i+e*t}function Th(i,t,e,n){return Wi(i,t,1-Math.exp(-e*n))}function bh(i,t=1){return t-Math.abs(Yo(i,t*2)-t)}function wh(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Ah(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Rh(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Ch(i,t){return i+Math.random()*(t-i)}function Ph(i){return i*(.5-Math.random())}function Lh(i){i!==void 0&&(ya=i);let t=ya+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Dh(i){return i*ki}function Ih(i){return i*ji}function Uh(i){return(i&i-1)===0&&i!==0}function Nh(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Fh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Oh(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),f=r((t-n)/2),p=o((t-n)/2),m=r((n-t)/2),_=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*f,c*p,a*l);break;case"YZY":i.set(c*p,a*h,c*f,a*l);break;case"ZXZ":i.set(c*f,c*p,a*h,a*l);break;case"XZX":i.set(a*h,c*_,c*m,a*l);break;case"YXY":i.set(c*m,a*h,c*_,a*l);break;case"ZYZ":i.set(c*_,c*m,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function vi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function be(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const qo={DEG2RAD:ki,RAD2DEG:ji,generateUUID:ti,clamp:ge,euclideanModulo:Yo,mapLinear:yh,inverseLerp:Eh,lerp:Wi,damp:Th,pingpong:bh,smoothstep:wh,smootherstep:Ah,randInt:Rh,randFloat:Ch,randFloatSpread:Ph,seededRandom:Lh,degToRad:Dh,radToDeg:Ih,isPowerOfTwo:Uh,ceilPowerOfTwo:Nh,floorPowerOfTwo:Fh,setQuaternionFromProperEuler:Oh,normalize:be,denormalize:vi};class Q{constructor(t=0,e=0){Q.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ge(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class zt{constructor(t,e,n,s,r,o,a,c,l){zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],f=n[7],p=n[2],m=n[5],_=n[8],x=s[0],u=s[3],d=s[6],b=s[1],M=s[4],E=s[7],L=s[2],R=s[5],A=s[8];return r[0]=o*x+a*b+c*L,r[3]=o*u+a*M+c*R,r[6]=o*d+a*E+c*A,r[1]=l*x+h*b+f*L,r[4]=l*u+h*M+f*R,r[7]=l*d+h*E+f*A,r[2]=p*x+m*b+_*L,r[5]=p*u+m*M+_*R,r[8]=p*d+m*E+_*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],f=h*o-a*l,p=a*c-h*r,m=l*r-o*c,_=e*f+n*p+s*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/_;return t[0]=f*x,t[1]=(s*l-h*n)*x,t[2]=(a*n-s*o)*x,t[3]=p*x,t[4]=(h*e-s*c)*x,t[5]=(s*r-a*e)*x,t[6]=m*x,t[7]=(n*c-l*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(cr.makeScale(t,e)),this}rotate(t){return this.premultiply(cr.makeRotation(-t)),this}translate(t,e){return this.premultiply(cr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const cr=new zt;function Xc(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Xs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Bh(){const i=Xs("canvas");return i.style.display="block",i}const Ea={};function Os(i){i in Ea||(Ea[i]=!0,console.warn(i))}function zh(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Hh(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Gh(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Ta=new zt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ba=new zt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ui={[Nn]:{transfer:Gs,primaries:Vs,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[nn]:{transfer:ie,primaries:Vs,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Js]:{transfer:Gs,primaries:ks,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(ba),fromReference:i=>i.applyMatrix3(Ta)},[Xo]:{transfer:ie,primaries:ks,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(ba),fromReference:i=>i.applyMatrix3(Ta).convertLinearToSRGB()}},Vh=new Set([Nn,Js]),Jt={enabled:!0,_workingColorSpace:Nn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Vh.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;const n=Ui[t].toReference,s=Ui[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return Ui[i].primaries},getTransfer:function(i){return i===Pn?Gs:Ui[i].transfer},getLuminanceCoefficients:function(i,t=this._workingColorSpace){return i.fromArray(Ui[t].luminanceCoefficients)}};function bi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function lr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let si;class kh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{si===void 0&&(si=Xs("canvas")),si.width=t.width,si.height=t.height;const n=si.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=si}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Xs("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=bi(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(bi(e[n]/255)*255):e[n]=bi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Wh=0;class Yc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wh++}),this.uuid=ti(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(hr(s[o].image)):r.push(hr(s[o]))}else r=hr(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function hr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?kh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Xh=0;class Pe extends Qn{constructor(t=Pe.DEFAULT_IMAGE,e=Pe.DEFAULT_MAPPING,n=Yn,s=Yn,r=Je,o=qn,a=Qe,c=Mn,l=Pe.DEFAULT_ANISOTROPY,h=Pn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xh++}),this.uuid=ti(),this.name="",this.source=new Yc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Q(0,0),this.repeat=new Q(1,1),this.center=new Q(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Dc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Hs:t.x=t.x-Math.floor(t.x);break;case Yn:t.x=t.x<0?0:1;break;case eo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Hs:t.y=t.y-Math.floor(t.y);break;case Yn:t.y=t.y<0?0:1;break;case eo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Pe.DEFAULT_IMAGE=null;Pe.DEFAULT_MAPPING=Dc;Pe.DEFAULT_ANISOTROPY=1;class te{constructor(t=0,e=0,n=0,s=1){te.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],f=c[8],p=c[1],m=c[5],_=c[9],x=c[2],u=c[6],d=c[10];if(Math.abs(h-p)<.01&&Math.abs(f-x)<.01&&Math.abs(_-u)<.01){if(Math.abs(h+p)<.1&&Math.abs(f+x)<.1&&Math.abs(_+u)<.1&&Math.abs(l+m+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(l+1)/2,E=(m+1)/2,L=(d+1)/2,R=(h+p)/4,A=(f+x)/4,P=(_+u)/4;return M>E&&M>L?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=R/n,r=A/n):E>L?E<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(E),n=R/s,r=P/s):L<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),n=A/r,s=P/r),this.set(n,s,r,e),this}let b=Math.sqrt((u-_)*(u-_)+(f-x)*(f-x)+(p-h)*(p-h));return Math.abs(b)<.001&&(b=1),this.x=(u-_)/b,this.y=(f-x)/b,this.z=(p-h)/b,this.w=Math.acos((l+m+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Yh extends Qn{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new te(0,0,t,e),this.scissorTest=!1,this.viewport=new te(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Je,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Pe(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Yc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Kn extends Yh{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class qc extends Pe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=Yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class qh extends Pe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=Yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class jn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],f=n[s+3];const p=r[o+0],m=r[o+1],_=r[o+2],x=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=f;return}if(a===1){t[e+0]=p,t[e+1]=m,t[e+2]=_,t[e+3]=x;return}if(f!==x||c!==p||l!==m||h!==_){let u=1-a;const d=c*p+l*m+h*_+f*x,b=d>=0?1:-1,M=1-d*d;if(M>Number.EPSILON){const L=Math.sqrt(M),R=Math.atan2(L,d*b);u=Math.sin(u*R)/L,a=Math.sin(a*R)/L}const E=a*b;if(c=c*u+p*E,l=l*u+m*E,h=h*u+_*E,f=f*u+x*E,u===1-a){const L=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=L,l*=L,h*=L,f*=L}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],f=r[o],p=r[o+1],m=r[o+2],_=r[o+3];return t[e]=a*_+h*f+c*m-l*p,t[e+1]=c*_+h*p+l*f-a*m,t[e+2]=l*_+h*m+a*p-c*f,t[e+3]=h*_-a*f-c*p-l*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),f=a(r/2),p=c(n/2),m=c(s/2),_=c(r/2);switch(o){case"XYZ":this._x=p*h*f+l*m*_,this._y=l*m*f-p*h*_,this._z=l*h*_+p*m*f,this._w=l*h*f-p*m*_;break;case"YXZ":this._x=p*h*f+l*m*_,this._y=l*m*f-p*h*_,this._z=l*h*_-p*m*f,this._w=l*h*f+p*m*_;break;case"ZXY":this._x=p*h*f-l*m*_,this._y=l*m*f+p*h*_,this._z=l*h*_+p*m*f,this._w=l*h*f-p*m*_;break;case"ZYX":this._x=p*h*f-l*m*_,this._y=l*m*f+p*h*_,this._z=l*h*_-p*m*f,this._w=l*h*f+p*m*_;break;case"YZX":this._x=p*h*f+l*m*_,this._y=l*m*f+p*h*_,this._z=l*h*_-p*m*f,this._w=l*h*f-p*m*_;break;case"XZY":this._x=p*h*f-l*m*_,this._y=l*m*f-p*h*_,this._z=l*h*_+p*m*f,this._w=l*h*f+p*m*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],f=e[10],p=n+a+f;if(p>0){const m=.5/Math.sqrt(p+1);this._w=.25/m,this._x=(h-c)*m,this._y=(r-l)*m,this._z=(o-s)*m}else if(n>a&&n>f){const m=2*Math.sqrt(1+n-a-f);this._w=(h-c)/m,this._x=.25*m,this._y=(s+o)/m,this._z=(r+l)/m}else if(a>f){const m=2*Math.sqrt(1+a-n-f);this._w=(r-l)/m,this._x=(s+o)/m,this._y=.25*m,this._z=(c+h)/m}else{const m=2*Math.sqrt(1+f-n-a);this._w=(o-s)/m,this._x=(r+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ge(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const m=1-e;return this._w=m*o+e*this._w,this._x=m*n+e*this._x,this._y=m*s+e*this._y,this._z=m*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),f=Math.sin((1-e)*h)/l,p=Math.sin(e*h)/l;return this._w=o*f+this._w*p,this._x=n*f+this._x*p,this._y=s*f+this._y*p,this._z=r*f+this._z*p,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(t=0,e=0,n=0){C.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(wa.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(wa.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),f=2*(r*n-o*e);return this.x=e+c*l+o*f-a*h,this.y=n+c*h+a*l-r*f,this.z=s+c*f+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ur.copy(this).projectOnVector(t),this.sub(ur)}reflect(t){return this.sub(ur.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ge(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ur=new C,wa=new jn;class es{constructor(t=new C(1/0,1/0,1/0),e=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ze.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ze.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Ze.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Ze):Ze.fromBufferAttribute(r,o),Ze.applyMatrix4(t.matrixWorld),this.expandByPoint(Ze);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),os.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),os.copy(n.boundingBox)),os.applyMatrix4(t.matrixWorld),this.union(os)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ze),Ze.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ni),as.subVectors(this.max,Ni),ri.subVectors(t.a,Ni),oi.subVectors(t.b,Ni),ai.subVectors(t.c,Ni),En.subVectors(oi,ri),Tn.subVectors(ai,oi),On.subVectors(ri,ai);let e=[0,-En.z,En.y,0,-Tn.z,Tn.y,0,-On.z,On.y,En.z,0,-En.x,Tn.z,0,-Tn.x,On.z,0,-On.x,-En.y,En.x,0,-Tn.y,Tn.x,0,-On.y,On.x,0];return!dr(e,ri,oi,ai,as)||(e=[1,0,0,0,1,0,0,0,1],!dr(e,ri,oi,ai,as))?!1:(cs.crossVectors(En,Tn),e=[cs.x,cs.y,cs.z],dr(e,ri,oi,ai,as))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ze).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ze).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(hn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),hn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),hn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),hn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),hn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),hn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),hn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),hn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(hn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const hn=[new C,new C,new C,new C,new C,new C,new C,new C],Ze=new C,os=new es,ri=new C,oi=new C,ai=new C,En=new C,Tn=new C,On=new C,Ni=new C,as=new C,cs=new C,Bn=new C;function dr(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Bn.fromArray(i,r);const a=s.x*Math.abs(Bn.x)+s.y*Math.abs(Bn.y)+s.z*Math.abs(Bn.z),c=t.dot(Bn),l=e.dot(Bn),h=n.dot(Bn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Zh=new es,Fi=new C,fr=new C;class Zo{constructor(t=new C,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Zh.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Fi.subVectors(t,this.center);const e=Fi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Fi,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(fr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Fi.copy(t.center).add(fr)),this.expandByPoint(Fi.copy(t.center).sub(fr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const un=new C,pr=new C,ls=new C,bn=new C,mr=new C,hs=new C,_r=new C;class Ko{constructor(t=new C,e=new C(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,un)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=un.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(un.copy(this.origin).addScaledVector(this.direction,e),un.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){pr.copy(t).add(e).multiplyScalar(.5),ls.copy(e).sub(t).normalize(),bn.copy(this.origin).sub(pr);const r=t.distanceTo(e)*.5,o=-this.direction.dot(ls),a=bn.dot(this.direction),c=-bn.dot(ls),l=bn.lengthSq(),h=Math.abs(1-o*o);let f,p,m,_;if(h>0)if(f=o*c-a,p=o*a-c,_=r*h,f>=0)if(p>=-_)if(p<=_){const x=1/h;f*=x,p*=x,m=f*(f+o*p+2*a)+p*(o*f+p+2*c)+l}else p=r,f=Math.max(0,-(o*p+a)),m=-f*f+p*(p+2*c)+l;else p=-r,f=Math.max(0,-(o*p+a)),m=-f*f+p*(p+2*c)+l;else p<=-_?(f=Math.max(0,-(-o*r+a)),p=f>0?-r:Math.min(Math.max(-r,-c),r),m=-f*f+p*(p+2*c)+l):p<=_?(f=0,p=Math.min(Math.max(-r,-c),r),m=p*(p+2*c)+l):(f=Math.max(0,-(o*r+a)),p=f>0?r:Math.min(Math.max(-r,-c),r),m=-f*f+p*(p+2*c)+l);else p=o>0?-r:r,f=Math.max(0,-(o*p+a)),m=-f*f+p*(p+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(pr).addScaledVector(ls,p),m}intersectSphere(t,e){un.subVectors(t.center,this.origin);const n=un.dot(this.direction),s=un.dot(un)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,p=this.origin;return l>=0?(n=(t.min.x-p.x)*l,s=(t.max.x-p.x)*l):(n=(t.max.x-p.x)*l,s=(t.min.x-p.x)*l),h>=0?(r=(t.min.y-p.y)*h,o=(t.max.y-p.y)*h):(r=(t.max.y-p.y)*h,o=(t.min.y-p.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(t.min.z-p.z)*f,c=(t.max.z-p.z)*f):(a=(t.max.z-p.z)*f,c=(t.min.z-p.z)*f),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,un)!==null}intersectTriangle(t,e,n,s,r){mr.subVectors(e,t),hs.subVectors(n,t),_r.crossVectors(mr,hs);let o=this.direction.dot(_r),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;bn.subVectors(this.origin,t);const c=a*this.direction.dot(hs.crossVectors(bn,hs));if(c<0)return null;const l=a*this.direction.dot(mr.cross(bn));if(l<0||c+l>o)return null;const h=-a*bn.dot(_r);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class se{constructor(t,e,n,s,r,o,a,c,l,h,f,p,m,_,x,u){se.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,f,p,m,_,x,u)}set(t,e,n,s,r,o,a,c,l,h,f,p,m,_,x,u){const d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=c,d[2]=l,d[6]=h,d[10]=f,d[14]=p,d[3]=m,d[7]=_,d[11]=x,d[15]=u,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new se().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/ci.setFromMatrixColumn(t,0).length(),r=1/ci.setFromMatrixColumn(t,1).length(),o=1/ci.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const p=o*h,m=o*f,_=a*h,x=a*f;e[0]=c*h,e[4]=-c*f,e[8]=l,e[1]=m+_*l,e[5]=p-x*l,e[9]=-a*c,e[2]=x-p*l,e[6]=_+m*l,e[10]=o*c}else if(t.order==="YXZ"){const p=c*h,m=c*f,_=l*h,x=l*f;e[0]=p+x*a,e[4]=_*a-m,e[8]=o*l,e[1]=o*f,e[5]=o*h,e[9]=-a,e[2]=m*a-_,e[6]=x+p*a,e[10]=o*c}else if(t.order==="ZXY"){const p=c*h,m=c*f,_=l*h,x=l*f;e[0]=p-x*a,e[4]=-o*f,e[8]=_+m*a,e[1]=m+_*a,e[5]=o*h,e[9]=x-p*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const p=o*h,m=o*f,_=a*h,x=a*f;e[0]=c*h,e[4]=_*l-m,e[8]=p*l+x,e[1]=c*f,e[5]=x*l+p,e[9]=m*l-_,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const p=o*c,m=o*l,_=a*c,x=a*l;e[0]=c*h,e[4]=x-p*f,e[8]=_*f+m,e[1]=f,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=m*f+_,e[10]=p-x*f}else if(t.order==="XZY"){const p=o*c,m=o*l,_=a*c,x=a*l;e[0]=c*h,e[4]=-f,e[8]=l*h,e[1]=p*f+x,e[5]=o*h,e[9]=m*f-_,e[2]=_*f-m,e[6]=a*h,e[10]=x*f+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Kh,t,jh)}lookAt(t,e,n){const s=this.elements;return ze.subVectors(t,e),ze.lengthSq()===0&&(ze.z=1),ze.normalize(),wn.crossVectors(n,ze),wn.lengthSq()===0&&(Math.abs(n.z)===1?ze.x+=1e-4:ze.z+=1e-4,ze.normalize(),wn.crossVectors(n,ze)),wn.normalize(),us.crossVectors(ze,wn),s[0]=wn.x,s[4]=us.x,s[8]=ze.x,s[1]=wn.y,s[5]=us.y,s[9]=ze.y,s[2]=wn.z,s[6]=us.z,s[10]=ze.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],f=n[5],p=n[9],m=n[13],_=n[2],x=n[6],u=n[10],d=n[14],b=n[3],M=n[7],E=n[11],L=n[15],R=s[0],A=s[4],P=s[8],W=s[12],g=s[1],S=s[5],B=s[9],F=s[13],G=s[2],Z=s[6],H=s[10],K=s[14],V=s[3],ht=s[7],ft=s[11],pt=s[15];return r[0]=o*R+a*g+c*G+l*V,r[4]=o*A+a*S+c*Z+l*ht,r[8]=o*P+a*B+c*H+l*ft,r[12]=o*W+a*F+c*K+l*pt,r[1]=h*R+f*g+p*G+m*V,r[5]=h*A+f*S+p*Z+m*ht,r[9]=h*P+f*B+p*H+m*ft,r[13]=h*W+f*F+p*K+m*pt,r[2]=_*R+x*g+u*G+d*V,r[6]=_*A+x*S+u*Z+d*ht,r[10]=_*P+x*B+u*H+d*ft,r[14]=_*W+x*F+u*K+d*pt,r[3]=b*R+M*g+E*G+L*V,r[7]=b*A+M*S+E*Z+L*ht,r[11]=b*P+M*B+E*H+L*ft,r[15]=b*W+M*F+E*K+L*pt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],f=t[6],p=t[10],m=t[14],_=t[3],x=t[7],u=t[11],d=t[15];return _*(+r*c*f-s*l*f-r*a*p+n*l*p+s*a*m-n*c*m)+x*(+e*c*m-e*l*p+r*o*p-s*o*m+s*l*h-r*c*h)+u*(+e*l*f-e*a*m-r*o*f+n*o*m+r*a*h-n*l*h)+d*(-s*a*h-e*c*f+e*a*p+s*o*f-n*o*p+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],f=t[9],p=t[10],m=t[11],_=t[12],x=t[13],u=t[14],d=t[15],b=f*u*l-x*p*l+x*c*m-a*u*m-f*c*d+a*p*d,M=_*p*l-h*u*l-_*c*m+o*u*m+h*c*d-o*p*d,E=h*x*l-_*f*l+_*a*m-o*x*m-h*a*d+o*f*d,L=_*f*c-h*x*c-_*a*p+o*x*p+h*a*u-o*f*u,R=e*b+n*M+s*E+r*L;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/R;return t[0]=b*A,t[1]=(x*p*r-f*u*r-x*s*m+n*u*m+f*s*d-n*p*d)*A,t[2]=(a*u*r-x*c*r+x*s*l-n*u*l-a*s*d+n*c*d)*A,t[3]=(f*c*r-a*p*r-f*s*l+n*p*l+a*s*m-n*c*m)*A,t[4]=M*A,t[5]=(h*u*r-_*p*r+_*s*m-e*u*m-h*s*d+e*p*d)*A,t[6]=(_*c*r-o*u*r-_*s*l+e*u*l+o*s*d-e*c*d)*A,t[7]=(o*p*r-h*c*r+h*s*l-e*p*l-o*s*m+e*c*m)*A,t[8]=E*A,t[9]=(_*f*r-h*x*r-_*n*m+e*x*m+h*n*d-e*f*d)*A,t[10]=(o*x*r-_*a*r+_*n*l-e*x*l-o*n*d+e*a*d)*A,t[11]=(h*a*r-o*f*r-h*n*l+e*f*l+o*n*m-e*a*m)*A,t[12]=L*A,t[13]=(h*x*s-_*f*s+_*n*p-e*x*p-h*n*u+e*f*u)*A,t[14]=(_*a*s-o*x*s-_*n*c+e*x*c+o*n*u-e*a*u)*A,t[15]=(o*f*s-h*a*s+h*n*c-e*f*c-o*n*p+e*a*p)*A,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,f=a+a,p=r*l,m=r*h,_=r*f,x=o*h,u=o*f,d=a*f,b=c*l,M=c*h,E=c*f,L=n.x,R=n.y,A=n.z;return s[0]=(1-(x+d))*L,s[1]=(m+E)*L,s[2]=(_-M)*L,s[3]=0,s[4]=(m-E)*R,s[5]=(1-(p+d))*R,s[6]=(u+b)*R,s[7]=0,s[8]=(_+M)*A,s[9]=(u-b)*A,s[10]=(1-(p+x))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=ci.set(s[0],s[1],s[2]).length();const o=ci.set(s[4],s[5],s[6]).length(),a=ci.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Ke.copy(this);const l=1/r,h=1/o,f=1/a;return Ke.elements[0]*=l,Ke.elements[1]*=l,Ke.elements[2]*=l,Ke.elements[4]*=h,Ke.elements[5]*=h,Ke.elements[6]*=h,Ke.elements[8]*=f,Ke.elements[9]*=f,Ke.elements[10]*=f,e.setFromRotationMatrix(Ke),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=vn){const c=this.elements,l=2*r/(e-t),h=2*r/(n-s),f=(e+t)/(e-t),p=(n+s)/(n-s);let m,_;if(a===vn)m=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===Ws)m=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=vn){const c=this.elements,l=1/(e-t),h=1/(n-s),f=1/(o-r),p=(e+t)*l,m=(n+s)*h;let _,x;if(a===vn)_=(o+r)*f,x=-2*f;else if(a===Ws)_=r*f,x=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-p,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=x,c[14]=-_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ci=new C,Ke=new se,Kh=new C(0,0,0),jh=new C(1,1,1),wn=new C,us=new C,ze=new C,Aa=new se,Ra=new jn;class an{constructor(t=0,e=0,n=0,s=an.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],f=s[2],p=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(p,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ge(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(ge(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ge(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(p,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(ge(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Aa.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Aa,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ra.setFromEuler(this),this.setFromQuaternion(Ra,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}an.DEFAULT_ORDER="XYZ";class jo{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Jh=0;const Ca=new C,li=new jn,dn=new se,ds=new C,Oi=new C,$h=new C,Qh=new jn,Pa=new C(1,0,0),La=new C(0,1,0),Da=new C(0,0,1),Ia={type:"added"},tu={type:"removed"},hi={type:"childadded",child:null},gr={type:"childremoved",child:null};class ye extends Qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Jh++}),this.uuid=ti(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ye.DEFAULT_UP.clone();const t=new C,e=new an,n=new jn,s=new C(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new se},normalMatrix:{value:new zt}}),this.matrix=new se,this.matrixWorld=new se,this.matrixAutoUpdate=ye.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return li.setFromAxisAngle(t,e),this.quaternion.multiply(li),this}rotateOnWorldAxis(t,e){return li.setFromAxisAngle(t,e),this.quaternion.premultiply(li),this}rotateX(t){return this.rotateOnAxis(Pa,t)}rotateY(t){return this.rotateOnAxis(La,t)}rotateZ(t){return this.rotateOnAxis(Da,t)}translateOnAxis(t,e){return Ca.copy(t).applyQuaternion(this.quaternion),this.position.add(Ca.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Pa,t)}translateY(t){return this.translateOnAxis(La,t)}translateZ(t){return this.translateOnAxis(Da,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(dn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ds.copy(t):ds.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Oi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?dn.lookAt(Oi,ds,this.up):dn.lookAt(ds,Oi,this.up),this.quaternion.setFromRotationMatrix(dn),s&&(dn.extractRotation(s.matrixWorld),li.setFromRotationMatrix(dn),this.quaternion.premultiply(li.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ia),hi.child=t,this.dispatchEvent(hi),hi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(tu),gr.child=t,this.dispatchEvent(gr),gr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),dn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),dn.multiply(t.parent.matrixWorld)),t.applyMatrix4(dn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ia),hi.child=t,this.dispatchEvent(hi),hi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oi,t,$h),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oi,Qh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),f=o(t.shapes),p=o(t.skeletons),m=o(t.animations),_=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),p.length>0&&(n.skeletons=p),m.length>0&&(n.animations=m),_.length>0&&(n.nodes=_)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}ye.DEFAULT_UP=new C(0,1,0);ye.DEFAULT_MATRIX_AUTO_UPDATE=!0;ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const je=new C,fn=new C,vr=new C,pn=new C,ui=new C,di=new C,Ua=new C,xr=new C,Mr=new C,Sr=new C,yr=new te,Er=new te,Tr=new te;class $e{constructor(t=new C,e=new C,n=new C){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),je.subVectors(t,e),s.cross(je);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){je.subVectors(s,e),fn.subVectors(n,e),vr.subVectors(t,e);const o=je.dot(je),a=je.dot(fn),c=je.dot(vr),l=fn.dot(fn),h=fn.dot(vr),f=o*l-a*a;if(f===0)return r.set(0,0,0),null;const p=1/f,m=(l*c-a*h)*p,_=(o*h-a*c)*p;return r.set(1-m-_,_,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,pn)===null?!1:pn.x>=0&&pn.y>=0&&pn.x+pn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,pn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,pn.x),c.addScaledVector(o,pn.y),c.addScaledVector(a,pn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return yr.setScalar(0),Er.setScalar(0),Tr.setScalar(0),yr.fromBufferAttribute(t,e),Er.fromBufferAttribute(t,n),Tr.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(yr,r.x),o.addScaledVector(Er,r.y),o.addScaledVector(Tr,r.z),o}static isFrontFacing(t,e,n,s){return je.subVectors(n,e),fn.subVectors(t,e),je.cross(fn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return je.subVectors(this.c,this.b),fn.subVectors(this.a,this.b),je.cross(fn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return $e.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return $e.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return $e.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return $e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return $e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;ui.subVectors(s,n),di.subVectors(r,n),xr.subVectors(t,n);const c=ui.dot(xr),l=di.dot(xr);if(c<=0&&l<=0)return e.copy(n);Mr.subVectors(t,s);const h=ui.dot(Mr),f=di.dot(Mr);if(h>=0&&f<=h)return e.copy(s);const p=c*f-h*l;if(p<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(ui,o);Sr.subVectors(t,r);const m=ui.dot(Sr),_=di.dot(Sr);if(_>=0&&m<=_)return e.copy(r);const x=m*l-c*_;if(x<=0&&l>=0&&_<=0)return a=l/(l-_),e.copy(n).addScaledVector(di,a);const u=h*_-m*f;if(u<=0&&f-h>=0&&m-_>=0)return Ua.subVectors(r,s),a=(f-h)/(f-h+(m-_)),e.copy(s).addScaledVector(Ua,a);const d=1/(u+x+p);return o=x*d,a=p*d,e.copy(n).addScaledVector(ui,o).addScaledVector(di,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Zc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},An={h:0,s:0,l:0},fs={h:0,s:0,l:0};function br(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Zt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=nn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=Jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Jt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=Jt.workingColorSpace){if(t=Yo(t,1),e=ge(e,0,1),n=ge(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=br(o,r,t+1/3),this.g=br(o,r,t),this.b=br(o,r,t-1/3)}return Jt.toWorkingColorSpace(this,s),this}setStyle(t,e=nn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=nn){const n=Zc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=bi(t.r),this.g=bi(t.g),this.b=bi(t.b),this}copyLinearToSRGB(t){return this.r=lr(t.r),this.g=lr(t.g),this.b=lr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=nn){return Jt.fromWorkingColorSpace(Se.copy(this),t),Math.round(ge(Se.r*255,0,255))*65536+Math.round(ge(Se.g*255,0,255))*256+Math.round(ge(Se.b*255,0,255))}getHexString(t=nn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Jt.workingColorSpace){Jt.fromWorkingColorSpace(Se.copy(this),e);const n=Se.r,s=Se.g,r=Se.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const f=o-a;switch(l=h<=.5?f/(o+a):f/(2-o-a),o){case n:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-n)/f+2;break;case r:c=(n-s)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Jt.workingColorSpace){return Jt.fromWorkingColorSpace(Se.copy(this),e),t.r=Se.r,t.g=Se.g,t.b=Se.b,t}getStyle(t=nn){Jt.fromWorkingColorSpace(Se.copy(this),t);const e=Se.r,n=Se.g,s=Se.b;return t!==nn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(An),this.setHSL(An.h+t,An.s+e,An.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(An),t.getHSL(fs);const n=Wi(An.h,fs.h,e),s=Wi(An.s,fs.s,e),r=Wi(An.l,fs.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Se=new Zt;Zt.NAMES=Zc;let eu=0;class ns extends Qn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:eu++}),this.uuid=ti(),this.name="",this.type="Material",this.blending=Ei,this.side=In,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Wr,this.blendDst=Xr,this.blendEquation=Wn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Zt(0,0,0),this.blendAlpha=0,this.depthFunc=wi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ii,this.stencilZFail=ii,this.stencilZPass=ii,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ei&&(n.blending=this.blending),this.side!==In&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Wr&&(n.blendSrc=this.blendSrc),this.blendDst!==Xr&&(n.blendDst=this.blendDst),this.blendEquation!==Wn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==wi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==xa&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ii&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ii&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ii&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class $s extends ns{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.combine=Pc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const he=new C,ps=new Q;class on{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ma,this.updateRanges=[],this.gpuType=gn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ps.fromBufferAttribute(this,e),ps.applyMatrix3(t),this.setXY(e,ps.x,ps.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.applyMatrix3(t),this.setXYZ(e,he.x,he.y,he.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.applyMatrix4(t),this.setXYZ(e,he.x,he.y,he.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.applyNormalMatrix(t),this.setXYZ(e,he.x,he.y,he.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.transformDirection(t),this.setXYZ(e,he.x,he.y,he.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=vi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=be(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=vi(e,this.array)),e}setX(t,e){return this.normalized&&(e=be(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=vi(e,this.array)),e}setY(t,e){return this.normalized&&(e=be(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=vi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=be(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=vi(e,this.array)),e}setW(t,e){return this.normalized&&(e=be(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=be(e,this.array),n=be(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=be(e,this.array),n=be(n,this.array),s=be(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=be(e,this.array),n=be(n,this.array),s=be(s,this.array),r=be(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ma&&(t.usage=this.usage),t}}class Kc extends on{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class jc extends on{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ve extends on{constructor(t,e,n){super(new Float32Array(t),e,n)}}let nu=0;const Xe=new se,wr=new ye,fi=new C,He=new es,Bi=new es,_e=new C;class tn extends Qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:nu++}),this.uuid=ti(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Xc(t)?jc:Kc)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new zt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Xe.makeRotationFromQuaternion(t),this.applyMatrix4(Xe),this}rotateX(t){return Xe.makeRotationX(t),this.applyMatrix4(Xe),this}rotateY(t){return Xe.makeRotationY(t),this.applyMatrix4(Xe),this}rotateZ(t){return Xe.makeRotationZ(t),this.applyMatrix4(Xe),this}translate(t,e,n){return Xe.makeTranslation(t,e,n),this.applyMatrix4(Xe),this}scale(t,e,n){return Xe.makeScale(t,e,n),this.applyMatrix4(Xe),this}lookAt(t){return wr.lookAt(t),wr.updateMatrix(),this.applyMatrix4(wr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fi).negate(),this.translate(fi.x,fi.y,fi.z),this}setFromPoints(t){const e=[];for(let n=0,s=t.length;n<s;n++){const r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new ve(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new es);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];He.setFromBufferAttribute(r),this.morphTargetsRelative?(_e.addVectors(this.boundingBox.min,He.min),this.boundingBox.expandByPoint(_e),_e.addVectors(this.boundingBox.max,He.max),this.boundingBox.expandByPoint(_e)):(this.boundingBox.expandByPoint(He.min),this.boundingBox.expandByPoint(He.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Zo);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(t){const n=this.boundingSphere.center;if(He.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Bi.setFromBufferAttribute(a),this.morphTargetsRelative?(_e.addVectors(He.min,Bi.min),He.expandByPoint(_e),_e.addVectors(He.max,Bi.max),He.expandByPoint(_e)):(He.expandByPoint(Bi.min),He.expandByPoint(Bi.max))}He.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)_e.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(_e));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)_e.fromBufferAttribute(a,l),c&&(fi.fromBufferAttribute(t,l),_e.add(fi)),s=Math.max(s,n.distanceToSquared(_e))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new on(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let P=0;P<n.count;P++)a[P]=new C,c[P]=new C;const l=new C,h=new C,f=new C,p=new Q,m=new Q,_=new Q,x=new C,u=new C;function d(P,W,g){l.fromBufferAttribute(n,P),h.fromBufferAttribute(n,W),f.fromBufferAttribute(n,g),p.fromBufferAttribute(r,P),m.fromBufferAttribute(r,W),_.fromBufferAttribute(r,g),h.sub(l),f.sub(l),m.sub(p),_.sub(p);const S=1/(m.x*_.y-_.x*m.y);isFinite(S)&&(x.copy(h).multiplyScalar(_.y).addScaledVector(f,-m.y).multiplyScalar(S),u.copy(f).multiplyScalar(m.x).addScaledVector(h,-_.x).multiplyScalar(S),a[P].add(x),a[W].add(x),a[g].add(x),c[P].add(u),c[W].add(u),c[g].add(u))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let P=0,W=b.length;P<W;++P){const g=b[P],S=g.start,B=g.count;for(let F=S,G=S+B;F<G;F+=3)d(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const M=new C,E=new C,L=new C,R=new C;function A(P){L.fromBufferAttribute(s,P),R.copy(L);const W=a[P];M.copy(W),M.sub(L.multiplyScalar(L.dot(W))).normalize(),E.crossVectors(R,W);const S=E.dot(c[P])<0?-1:1;o.setXYZW(P,M.x,M.y,M.z,S)}for(let P=0,W=b.length;P<W;++P){const g=b[P],S=g.start,B=g.count;for(let F=S,G=S+B;F<G;F+=3)A(t.getX(F+0)),A(t.getX(F+1)),A(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new on(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let p=0,m=n.count;p<m;p++)n.setXYZ(p,0,0,0);const s=new C,r=new C,o=new C,a=new C,c=new C,l=new C,h=new C,f=new C;if(t)for(let p=0,m=t.count;p<m;p+=3){const _=t.getX(p+0),x=t.getX(p+1),u=t.getX(p+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,u),h.subVectors(o,r),f.subVectors(s,r),h.cross(f),a.fromBufferAttribute(n,_),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,u),a.add(h),c.add(h),l.add(h),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(u,l.x,l.y,l.z)}else for(let p=0,m=e.count;p<m;p+=3)s.fromBufferAttribute(e,p+0),r.fromBufferAttribute(e,p+1),o.fromBufferAttribute(e,p+2),h.subVectors(o,r),f.subVectors(s,r),h.cross(f),n.setXYZ(p+0,h.x,h.y,h.z),n.setXYZ(p+1,h.x,h.y,h.z),n.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)_e.fromBufferAttribute(t,e),_e.normalize(),t.setXYZ(e,_e.x,_e.y,_e.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,f=a.normalized,p=new l.constructor(c.length*h);let m=0,_=0;for(let x=0,u=c.length;x<u;x++){a.isInterleavedBufferAttribute?m=c[x]*a.data.stride+a.offset:m=c[x]*h;for(let d=0;d<h;d++)p[_++]=l[m++]}return new on(p,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new tn,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,f=l.length;h<f;h++){const p=l[h],m=t(p,n);c.push(m)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let f=0,p=l.length;f<p;f++){const m=l[f];h.push(m.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],f=r[l];for(let p=0,m=f.length;p<m;p++)h.push(f[p].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Na=new se,zn=new Ko,ms=new Zo,Fa=new C,_s=new C,gs=new C,vs=new C,Ar=new C,xs=new C,Oa=new C,Ms=new C;class yt extends ye{constructor(t=new tn,e=new $s){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){xs.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],f=r[c];h!==0&&(Ar.fromBufferAttribute(f,t),o?xs.addScaledVector(Ar,h):xs.addScaledVector(Ar.sub(e),h))}e.add(xs)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ms.copy(n.boundingSphere),ms.applyMatrix4(r),zn.copy(t.ray).recast(t.near),!(ms.containsPoint(zn.origin)===!1&&(zn.intersectSphere(ms,Fa)===null||zn.origin.distanceToSquared(Fa)>(t.far-t.near)**2))&&(Na.copy(r).invert(),zn.copy(t.ray).applyMatrix4(Na),!(n.boundingBox!==null&&zn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,zn)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,p=r.groups,m=r.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,x=p.length;_<x;_++){const u=p[_],d=o[u.materialIndex],b=Math.max(u.start,m.start),M=Math.min(a.count,Math.min(u.start+u.count,m.start+m.count));for(let E=b,L=M;E<L;E+=3){const R=a.getX(E),A=a.getX(E+1),P=a.getX(E+2);s=Ss(this,d,t,n,l,h,f,R,A,P),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=u.materialIndex,e.push(s))}}else{const _=Math.max(0,m.start),x=Math.min(a.count,m.start+m.count);for(let u=_,d=x;u<d;u+=3){const b=a.getX(u),M=a.getX(u+1),E=a.getX(u+2);s=Ss(this,o,t,n,l,h,f,b,M,E),s&&(s.faceIndex=Math.floor(u/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let _=0,x=p.length;_<x;_++){const u=p[_],d=o[u.materialIndex],b=Math.max(u.start,m.start),M=Math.min(c.count,Math.min(u.start+u.count,m.start+m.count));for(let E=b,L=M;E<L;E+=3){const R=E,A=E+1,P=E+2;s=Ss(this,d,t,n,l,h,f,R,A,P),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=u.materialIndex,e.push(s))}}else{const _=Math.max(0,m.start),x=Math.min(c.count,m.start+m.count);for(let u=_,d=x;u<d;u+=3){const b=u,M=u+1,E=u+2;s=Ss(this,o,t,n,l,h,f,b,M,E),s&&(s.faceIndex=Math.floor(u/3),e.push(s))}}}}function iu(i,t,e,n,s,r,o,a){let c;if(t.side===Ce?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===In,a),c===null)return null;Ms.copy(a),Ms.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Ms);return l<e.near||l>e.far?null:{distance:l,point:Ms.clone(),object:i}}function Ss(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,_s),i.getVertexPosition(c,gs),i.getVertexPosition(l,vs);const h=iu(i,t,e,n,_s,gs,vs,Oa);if(h){const f=new C;$e.getBarycoord(Oa,_s,gs,vs,f),s&&(h.uv=$e.getInterpolatedAttribute(s,a,c,l,f,new Q)),r&&(h.uv1=$e.getInterpolatedAttribute(r,a,c,l,f,new Q)),o&&(h.normal=$e.getInterpolatedAttribute(o,a,c,l,f,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const p={a,b:c,c:l,normal:new C,materialIndex:0};$e.getNormal(_s,gs,vs,p.normal),h.face=p,h.barycoord=f}return h}class Re extends tn{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],f=[];let p=0,m=0;_("z","y","x",-1,-1,n,e,t,o,r,0),_("z","y","x",1,-1,n,e,-t,o,r,1),_("x","z","y",1,1,t,n,e,s,o,2),_("x","z","y",1,-1,t,n,-e,s,o,3),_("x","y","z",1,-1,t,e,n,s,r,4),_("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ve(l,3)),this.setAttribute("normal",new ve(h,3)),this.setAttribute("uv",new ve(f,2));function _(x,u,d,b,M,E,L,R,A,P,W){const g=E/A,S=L/P,B=E/2,F=L/2,G=R/2,Z=A+1,H=P+1;let K=0,V=0;const ht=new C;for(let ft=0;ft<H;ft++){const pt=ft*S-F;for(let Gt=0;Gt<Z;Gt++){const Yt=Gt*g-B;ht[x]=Yt*b,ht[u]=pt*M,ht[d]=G,l.push(ht.x,ht.y,ht.z),ht[x]=0,ht[u]=0,ht[d]=R>0?1:-1,h.push(ht.x,ht.y,ht.z),f.push(Gt/A),f.push(1-ft/P),K+=1}}for(let ft=0;ft<P;ft++)for(let pt=0;pt<A;pt++){const Gt=p+pt+Z*ft,Yt=p+pt+Z*(ft+1),X=p+(pt+1)+Z*(ft+1),et=p+(pt+1)+Z*ft;c.push(Gt,Yt,et),c.push(Yt,X,et),V+=6}a.addGroup(m,V,W),m+=V,p+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Re(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Li(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function we(i){const t={};for(let e=0;e<i.length;e++){const n=Li(i[e]);for(const s in n)t[s]=n[s]}return t}function su(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Jc(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}const ru={clone:Li,merge:we};var ou=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,au=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Un extends ns{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ou,this.fragmentShader=au,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Li(t.uniforms),this.uniformsGroups=su(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class $c extends ye{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new se,this.projectionMatrix=new se,this.projectionMatrixInverse=new se,this.coordinateSystem=vn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Rn=new C,Ba=new Q,za=new Q;class Ve extends $c{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ji*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ki*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ji*2*Math.atan(Math.tan(ki*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Rn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Rn.x,Rn.y).multiplyScalar(-t/Rn.z),Rn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Rn.x,Rn.y).multiplyScalar(-t/Rn.z)}getViewSize(t,e){return this.getViewBounds(t,Ba,za),e.subVectors(za,Ba)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ki*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const pi=-90,mi=1;class cu extends ye{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ve(pi,mi,t,e);s.layers=this.layers,this.add(s);const r=new Ve(pi,mi,t,e);r.layers=this.layers,this.add(r);const o=new Ve(pi,mi,t,e);o.layers=this.layers,this.add(o);const a=new Ve(pi,mi,t,e);a.layers=this.layers,this.add(a);const c=new Ve(pi,mi,t,e);c.layers=this.layers,this.add(c);const l=new Ve(pi,mi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===vn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ws)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,f=t.getRenderTarget(),p=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(f,p,m),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Qc extends Pe{constructor(t,e,n,s,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:Ai,super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class lu extends Kn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Qc(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Je}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Re(5,5,5),r=new Un({name:"CubemapFromEquirect",uniforms:Li(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ce,blending:Ln});r.uniforms.tEquirect.value=e;const o=new yt(s,r),a=e.minFilter;return e.minFilter===qn&&(e.minFilter=Je),new cu(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const Rr=new C,hu=new C,uu=new zt;class Cn{constructor(t=new C(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Rr.subVectors(n,e).cross(hu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Rr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||uu.getNormalMatrix(t),s=this.coplanarPoint(Rr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Hn=new Zo,ys=new C;class Jo{constructor(t=new Cn,e=new Cn,n=new Cn,s=new Cn,r=new Cn,o=new Cn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=vn){const n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],f=s[6],p=s[7],m=s[8],_=s[9],x=s[10],u=s[11],d=s[12],b=s[13],M=s[14],E=s[15];if(n[0].setComponents(c-r,p-l,u-m,E-d).normalize(),n[1].setComponents(c+r,p+l,u+m,E+d).normalize(),n[2].setComponents(c+o,p+h,u+_,E+b).normalize(),n[3].setComponents(c-o,p-h,u-_,E-b).normalize(),n[4].setComponents(c-a,p-f,u-x,E-M).normalize(),e===vn)n[5].setComponents(c+a,p+f,u+x,E+M).normalize();else if(e===Ws)n[5].setComponents(a,f,x,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Hn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Hn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Hn)}intersectsSprite(t){return Hn.center.set(0,0,0),Hn.radius=.7071067811865476,Hn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Hn)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(ys.x=s.normal.x>0?t.max.x:t.min.x,ys.y=s.normal.y>0?t.max.y:t.min.y,ys.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ys)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function tl(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function du(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,f=l.byteLength,p=i.createBuffer();i.bindBuffer(c,p),i.bufferData(c,l,h),a.onUploadCallback();let m;if(l instanceof Float32Array)m=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=i.SHORT;else if(l instanceof Uint32Array)m=i.UNSIGNED_INT;else if(l instanceof Int32Array)m=i.INT;else if(l instanceof Int8Array)m=i.BYTE;else if(l instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:p,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,c,l){const h=c.array,f=c.updateRanges;if(i.bindBuffer(l,a),f.length===0)i.bufferSubData(l,0,h);else{f.sort((m,_)=>m.start-_.start);let p=0;for(let m=1;m<f.length;m++){const _=f[p],x=f[m];x.start<=_.start+_.count+1?_.count=Math.max(_.count,x.start+x.count-_.start):(++p,f[p]=x)}f.length=p+1;for(let m=0,_=f.length;m<_;m++){const x=f[m];i.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}class Qs extends tn{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,f=t/a,p=e/c,m=[],_=[],x=[],u=[];for(let d=0;d<h;d++){const b=d*p-o;for(let M=0;M<l;M++){const E=M*f-r;_.push(E,-b,0),x.push(0,0,1),u.push(M/a),u.push(1-d/c)}}for(let d=0;d<c;d++)for(let b=0;b<a;b++){const M=b+l*d,E=b+l*(d+1),L=b+1+l*(d+1),R=b+1+l*d;m.push(M,E,R),m.push(E,L,R)}this.setIndex(m),this.setAttribute("position",new ve(_,3)),this.setAttribute("normal",new ve(x,3)),this.setAttribute("uv",new ve(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qs(t.width,t.height,t.widthSegments,t.heightSegments)}}var fu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pu=`#ifdef USE_ALPHAHASH
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
#endif`,mu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_u=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,xu=`#ifdef USE_AOMAP
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
#endif`,Mu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Su=`#ifdef USE_BATCHING
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
#endif`,yu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Eu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Tu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,wu=`#ifdef USE_IRIDESCENCE
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
#endif`,Au=`#ifdef USE_BUMPMAP
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
#endif`,Ru=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Cu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Pu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Lu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Du=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Iu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Uu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Nu=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Fu=`#define PI 3.141592653589793
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
} // validated`,Ou=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Bu=`vec3 transformedNormal = objectNormal;
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
#endif`,zu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Hu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Gu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Vu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ku="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wu=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Xu=`#ifdef USE_ENVMAP
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
#endif`,Yu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,qu=`#ifdef USE_ENVMAP
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
#endif`,Zu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ku=`#ifdef USE_ENVMAP
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
#endif`,ju=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ju=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,$u=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,td=`#ifdef USE_GRADIENTMAP
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
}`,ed=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,nd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,id=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,sd=`uniform bool receiveShadow;
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
#endif`,rd=`#ifdef USE_ENVMAP
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
#endif`,od=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ad=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,cd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ld=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hd=`PhysicalMaterial material;
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
#endif`,ud=`struct PhysicalMaterial {
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
}`,dd=`
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
#endif`,fd=`#if defined( RE_IndirectDiffuse )
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
#endif`,pd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,md=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_d=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,xd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Md=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Sd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,yd=`#if defined( USE_POINTS_UV )
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
#endif`,Ed=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Td=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,bd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,wd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ad=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Rd=`#ifdef USE_MORPHTARGETS
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
#endif`,Cd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ld=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Dd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Id=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ud=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Nd=`#ifdef USE_NORMALMAP
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
#endif`,Fd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Od=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Bd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,zd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Hd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Gd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Vd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,kd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Wd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Xd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Yd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,qd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Zd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Kd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,jd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Jd=`float getShadowMask() {
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
}`,$d=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Qd=`#ifdef USE_SKINNING
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
#endif`,tf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ef=`#ifdef USE_SKINNING
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
#endif`,nf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,rf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,of=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,af=`#ifdef USE_TRANSMISSION
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
#endif`,cf=`#ifdef USE_TRANSMISSION
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
#endif`,lf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,df=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ff=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,pf=`uniform sampler2D t2D;
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
}`,mf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_f=`#ifdef ENVMAP_TYPE_CUBE
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
}`,gf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xf=`#include <common>
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
}`,Mf=`#if DEPTH_PACKING == 3200
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
}`,Sf=`#define DISTANCE
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
}`,yf=`#define DISTANCE
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
}`,Ef=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Tf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bf=`uniform float scale;
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
}`,wf=`uniform vec3 diffuse;
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
}`,Af=`#include <common>
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
}`,Rf=`uniform vec3 diffuse;
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
}`,Cf=`#define LAMBERT
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
}`,Pf=`#define LAMBERT
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
}`,Lf=`#define MATCAP
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
}`,Df=`#define MATCAP
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
}`,If=`#define NORMAL
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
}`,Uf=`#define NORMAL
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
}`,Nf=`#define PHONG
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
}`,Ff=`#define PHONG
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
}`,Of=`#define STANDARD
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
}`,Bf=`#define STANDARD
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
}`,zf=`#define TOON
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
}`,Hf=`#define TOON
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
}`,Gf=`uniform float size;
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
}`,Vf=`uniform vec3 diffuse;
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
}`,kf=`#include <common>
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
}`,Wf=`uniform vec3 color;
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
}`,Xf=`uniform float rotation;
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
}`,Yf=`uniform vec3 diffuse;
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
}`,Bt={alphahash_fragment:fu,alphahash_pars_fragment:pu,alphamap_fragment:mu,alphamap_pars_fragment:_u,alphatest_fragment:gu,alphatest_pars_fragment:vu,aomap_fragment:xu,aomap_pars_fragment:Mu,batching_pars_vertex:Su,batching_vertex:yu,begin_vertex:Eu,beginnormal_vertex:Tu,bsdfs:bu,iridescence_fragment:wu,bumpmap_pars_fragment:Au,clipping_planes_fragment:Ru,clipping_planes_pars_fragment:Cu,clipping_planes_pars_vertex:Pu,clipping_planes_vertex:Lu,color_fragment:Du,color_pars_fragment:Iu,color_pars_vertex:Uu,color_vertex:Nu,common:Fu,cube_uv_reflection_fragment:Ou,defaultnormal_vertex:Bu,displacementmap_pars_vertex:zu,displacementmap_vertex:Hu,emissivemap_fragment:Gu,emissivemap_pars_fragment:Vu,colorspace_fragment:ku,colorspace_pars_fragment:Wu,envmap_fragment:Xu,envmap_common_pars_fragment:Yu,envmap_pars_fragment:qu,envmap_pars_vertex:Zu,envmap_physical_pars_fragment:rd,envmap_vertex:Ku,fog_vertex:ju,fog_pars_vertex:Ju,fog_fragment:$u,fog_pars_fragment:Qu,gradientmap_pars_fragment:td,lightmap_pars_fragment:ed,lights_lambert_fragment:nd,lights_lambert_pars_fragment:id,lights_pars_begin:sd,lights_toon_fragment:od,lights_toon_pars_fragment:ad,lights_phong_fragment:cd,lights_phong_pars_fragment:ld,lights_physical_fragment:hd,lights_physical_pars_fragment:ud,lights_fragment_begin:dd,lights_fragment_maps:fd,lights_fragment_end:pd,logdepthbuf_fragment:md,logdepthbuf_pars_fragment:_d,logdepthbuf_pars_vertex:gd,logdepthbuf_vertex:vd,map_fragment:xd,map_pars_fragment:Md,map_particle_fragment:Sd,map_particle_pars_fragment:yd,metalnessmap_fragment:Ed,metalnessmap_pars_fragment:Td,morphinstance_vertex:bd,morphcolor_vertex:wd,morphnormal_vertex:Ad,morphtarget_pars_vertex:Rd,morphtarget_vertex:Cd,normal_fragment_begin:Pd,normal_fragment_maps:Ld,normal_pars_fragment:Dd,normal_pars_vertex:Id,normal_vertex:Ud,normalmap_pars_fragment:Nd,clearcoat_normal_fragment_begin:Fd,clearcoat_normal_fragment_maps:Od,clearcoat_pars_fragment:Bd,iridescence_pars_fragment:zd,opaque_fragment:Hd,packing:Gd,premultiplied_alpha_fragment:Vd,project_vertex:kd,dithering_fragment:Wd,dithering_pars_fragment:Xd,roughnessmap_fragment:Yd,roughnessmap_pars_fragment:qd,shadowmap_pars_fragment:Zd,shadowmap_pars_vertex:Kd,shadowmap_vertex:jd,shadowmask_pars_fragment:Jd,skinbase_vertex:$d,skinning_pars_vertex:Qd,skinning_vertex:tf,skinnormal_vertex:ef,specularmap_fragment:nf,specularmap_pars_fragment:sf,tonemapping_fragment:rf,tonemapping_pars_fragment:of,transmission_fragment:af,transmission_pars_fragment:cf,uv_pars_fragment:lf,uv_pars_vertex:hf,uv_vertex:uf,worldpos_vertex:df,background_vert:ff,background_frag:pf,backgroundCube_vert:mf,backgroundCube_frag:_f,cube_vert:gf,cube_frag:vf,depth_vert:xf,depth_frag:Mf,distanceRGBA_vert:Sf,distanceRGBA_frag:yf,equirect_vert:Ef,equirect_frag:Tf,linedashed_vert:bf,linedashed_frag:wf,meshbasic_vert:Af,meshbasic_frag:Rf,meshlambert_vert:Cf,meshlambert_frag:Pf,meshmatcap_vert:Lf,meshmatcap_frag:Df,meshnormal_vert:If,meshnormal_frag:Uf,meshphong_vert:Nf,meshphong_frag:Ff,meshphysical_vert:Of,meshphysical_frag:Bf,meshtoon_vert:zf,meshtoon_frag:Hf,points_vert:Gf,points_frag:Vf,shadow_vert:kf,shadow_frag:Wf,sprite_vert:Xf,sprite_frag:Yf},ct={common:{diffuse:{value:new Zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new zt}},envmap:{envMap:{value:null},envMapRotation:{value:new zt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new zt},normalScale:{value:new Q(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0},uvTransform:{value:new zt}},sprite:{diffuse:{value:new Zt(16777215)},opacity:{value:1},center:{value:new Q(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}}},sn={basic:{uniforms:we([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.fog]),vertexShader:Bt.meshbasic_vert,fragmentShader:Bt.meshbasic_frag},lambert:{uniforms:we([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new Zt(0)}}]),vertexShader:Bt.meshlambert_vert,fragmentShader:Bt.meshlambert_frag},phong:{uniforms:we([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new Zt(0)},specular:{value:new Zt(1118481)},shininess:{value:30}}]),vertexShader:Bt.meshphong_vert,fragmentShader:Bt.meshphong_frag},standard:{uniforms:we([ct.common,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.roughnessmap,ct.metalnessmap,ct.fog,ct.lights,{emissive:{value:new Zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag},toon:{uniforms:we([ct.common,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.gradientmap,ct.fog,ct.lights,{emissive:{value:new Zt(0)}}]),vertexShader:Bt.meshtoon_vert,fragmentShader:Bt.meshtoon_frag},matcap:{uniforms:we([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,{matcap:{value:null}}]),vertexShader:Bt.meshmatcap_vert,fragmentShader:Bt.meshmatcap_frag},points:{uniforms:we([ct.points,ct.fog]),vertexShader:Bt.points_vert,fragmentShader:Bt.points_frag},dashed:{uniforms:we([ct.common,ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Bt.linedashed_vert,fragmentShader:Bt.linedashed_frag},depth:{uniforms:we([ct.common,ct.displacementmap]),vertexShader:Bt.depth_vert,fragmentShader:Bt.depth_frag},normal:{uniforms:we([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,{opacity:{value:1}}]),vertexShader:Bt.meshnormal_vert,fragmentShader:Bt.meshnormal_frag},sprite:{uniforms:we([ct.sprite,ct.fog]),vertexShader:Bt.sprite_vert,fragmentShader:Bt.sprite_frag},background:{uniforms:{uvTransform:{value:new zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Bt.background_vert,fragmentShader:Bt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new zt}},vertexShader:Bt.backgroundCube_vert,fragmentShader:Bt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Bt.cube_vert,fragmentShader:Bt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Bt.equirect_vert,fragmentShader:Bt.equirect_frag},distanceRGBA:{uniforms:we([ct.common,ct.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Bt.distanceRGBA_vert,fragmentShader:Bt.distanceRGBA_frag},shadow:{uniforms:we([ct.lights,ct.fog,{color:{value:new Zt(0)},opacity:{value:1}}]),vertexShader:Bt.shadow_vert,fragmentShader:Bt.shadow_frag}};sn.physical={uniforms:we([sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new zt},clearcoatNormalScale:{value:new Q(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new zt},sheen:{value:0},sheenColor:{value:new Zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new zt},transmissionSamplerSize:{value:new Q},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new zt},attenuationDistance:{value:0},attenuationColor:{value:new Zt(0)},specularColor:{value:new Zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new zt},anisotropyVector:{value:new Q},anisotropyMap:{value:null},anisotropyMapTransform:{value:new zt}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag};const Es={r:0,b:0,g:0},Gn=new an,qf=new se;function Zf(i,t,e,n,s,r,o){const a=new Zt(0);let c=r===!0?0:1,l,h,f=null,p=0,m=null;function _(b){let M=b.isScene===!0?b.background:null;return M&&M.isTexture&&(M=(b.backgroundBlurriness>0?e:t).get(M)),M}function x(b){let M=!1;const E=_(b);E===null?d(a,c):E&&E.isColor&&(d(E,1),M=!0);const L=i.xr.getEnvironmentBlendMode();L==="additive"?n.buffers.color.setClear(0,0,0,1,o):L==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function u(b,M){const E=_(M);E&&(E.isCubeTexture||E.mapping===js)?(h===void 0&&(h=new yt(new Re(1,1,1),new Un({name:"BackgroundCubeMaterial",uniforms:Li(sn.backgroundCube.uniforms),vertexShader:sn.backgroundCube.vertexShader,fragmentShader:sn.backgroundCube.fragmentShader,side:Ce,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,R,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Gn.copy(M.backgroundRotation),Gn.x*=-1,Gn.y*=-1,Gn.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Gn.y*=-1,Gn.z*=-1),h.material.uniforms.envMap.value=E,h.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(qf.makeRotationFromEuler(Gn)),h.material.toneMapped=Jt.getTransfer(E.colorSpace)!==ie,(f!==E||p!==E.version||m!==i.toneMapping)&&(h.material.needsUpdate=!0,f=E,p=E.version,m=i.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):E&&E.isTexture&&(l===void 0&&(l=new yt(new Qs(2,2),new Un({name:"BackgroundMaterial",uniforms:Li(sn.background.uniforms),vertexShader:sn.background.vertexShader,fragmentShader:sn.background.fragmentShader,side:In,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=E,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=Jt.getTransfer(E.colorSpace)!==ie,E.matrixAutoUpdate===!0&&E.updateMatrix(),l.material.uniforms.uvTransform.value.copy(E.matrix),(f!==E||p!==E.version||m!==i.toneMapping)&&(l.material.needsUpdate=!0,f=E,p=E.version,m=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function d(b,M){b.getRGB(Es,Jc(i)),n.buffers.color.setClear(Es.r,Es.g,Es.b,M,o)}return{getClearColor:function(){return a},setClearColor:function(b,M=1){a.set(b),c=M,d(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(b){c=b,d(a,c)},render:x,addToRenderList:u}}function Kf(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=p(null);let r=s,o=!1;function a(g,S,B,F,G){let Z=!1;const H=f(F,B,S);r!==H&&(r=H,l(r.object)),Z=m(g,F,B,G),Z&&_(g,F,B,G),G!==null&&t.update(G,i.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,E(g,S,B,F),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(G).buffer))}function c(){return i.createVertexArray()}function l(g){return i.bindVertexArray(g)}function h(g){return i.deleteVertexArray(g)}function f(g,S,B){const F=B.wireframe===!0;let G=n[g.id];G===void 0&&(G={},n[g.id]=G);let Z=G[S.id];Z===void 0&&(Z={},G[S.id]=Z);let H=Z[F];return H===void 0&&(H=p(c()),Z[F]=H),H}function p(g){const S=[],B=[],F=[];for(let G=0;G<e;G++)S[G]=0,B[G]=0,F[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:S,enabledAttributes:B,attributeDivisors:F,object:g,attributes:{},index:null}}function m(g,S,B,F){const G=r.attributes,Z=S.attributes;let H=0;const K=B.getAttributes();for(const V in K)if(K[V].location>=0){const ft=G[V];let pt=Z[V];if(pt===void 0&&(V==="instanceMatrix"&&g.instanceMatrix&&(pt=g.instanceMatrix),V==="instanceColor"&&g.instanceColor&&(pt=g.instanceColor)),ft===void 0||ft.attribute!==pt||pt&&ft.data!==pt.data)return!0;H++}return r.attributesNum!==H||r.index!==F}function _(g,S,B,F){const G={},Z=S.attributes;let H=0;const K=B.getAttributes();for(const V in K)if(K[V].location>=0){let ft=Z[V];ft===void 0&&(V==="instanceMatrix"&&g.instanceMatrix&&(ft=g.instanceMatrix),V==="instanceColor"&&g.instanceColor&&(ft=g.instanceColor));const pt={};pt.attribute=ft,ft&&ft.data&&(pt.data=ft.data),G[V]=pt,H++}r.attributes=G,r.attributesNum=H,r.index=F}function x(){const g=r.newAttributes;for(let S=0,B=g.length;S<B;S++)g[S]=0}function u(g){d(g,0)}function d(g,S){const B=r.newAttributes,F=r.enabledAttributes,G=r.attributeDivisors;B[g]=1,F[g]===0&&(i.enableVertexAttribArray(g),F[g]=1),G[g]!==S&&(i.vertexAttribDivisor(g,S),G[g]=S)}function b(){const g=r.newAttributes,S=r.enabledAttributes;for(let B=0,F=S.length;B<F;B++)S[B]!==g[B]&&(i.disableVertexAttribArray(B),S[B]=0)}function M(g,S,B,F,G,Z,H){H===!0?i.vertexAttribIPointer(g,S,B,G,Z):i.vertexAttribPointer(g,S,B,F,G,Z)}function E(g,S,B,F){x();const G=F.attributes,Z=B.getAttributes(),H=S.defaultAttributeValues;for(const K in Z){const V=Z[K];if(V.location>=0){let ht=G[K];if(ht===void 0&&(K==="instanceMatrix"&&g.instanceMatrix&&(ht=g.instanceMatrix),K==="instanceColor"&&g.instanceColor&&(ht=g.instanceColor)),ht!==void 0){const ft=ht.normalized,pt=ht.itemSize,Gt=t.get(ht);if(Gt===void 0)continue;const Yt=Gt.buffer,X=Gt.type,et=Gt.bytesPerElement,Mt=X===i.INT||X===i.UNSIGNED_INT||ht.gpuType===zo;if(ht.isInterleavedBufferAttribute){const lt=ht.data,Lt=lt.stride,Pt=ht.offset;if(lt.isInstancedInterleavedBuffer){for(let Ft=0;Ft<V.locationSize;Ft++)d(V.location+Ft,lt.meshPerAttribute);g.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let Ft=0;Ft<V.locationSize;Ft++)u(V.location+Ft);i.bindBuffer(i.ARRAY_BUFFER,Yt);for(let Ft=0;Ft<V.locationSize;Ft++)M(V.location+Ft,pt/V.locationSize,X,ft,Lt*et,(Pt+pt/V.locationSize*Ft)*et,Mt)}else{if(ht.isInstancedBufferAttribute){for(let lt=0;lt<V.locationSize;lt++)d(V.location+lt,ht.meshPerAttribute);g.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let lt=0;lt<V.locationSize;lt++)u(V.location+lt);i.bindBuffer(i.ARRAY_BUFFER,Yt);for(let lt=0;lt<V.locationSize;lt++)M(V.location+lt,pt/V.locationSize,X,ft,pt*et,pt/V.locationSize*lt*et,Mt)}}else if(H!==void 0){const ft=H[K];if(ft!==void 0)switch(ft.length){case 2:i.vertexAttrib2fv(V.location,ft);break;case 3:i.vertexAttrib3fv(V.location,ft);break;case 4:i.vertexAttrib4fv(V.location,ft);break;default:i.vertexAttrib1fv(V.location,ft)}}}}b()}function L(){P();for(const g in n){const S=n[g];for(const B in S){const F=S[B];for(const G in F)h(F[G].object),delete F[G];delete S[B]}delete n[g]}}function R(g){if(n[g.id]===void 0)return;const S=n[g.id];for(const B in S){const F=S[B];for(const G in F)h(F[G].object),delete F[G];delete S[B]}delete n[g.id]}function A(g){for(const S in n){const B=n[S];if(B[g.id]===void 0)continue;const F=B[g.id];for(const G in F)h(F[G].object),delete F[G];delete B[g.id]}}function P(){W(),o=!0,r!==s&&(r=s,l(r.object))}function W(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:W,dispose:L,releaseStatesOfGeometry:R,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:u,disableUnusedAttributes:b}}function jf(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,f){f!==0&&(i.drawArraysInstanced(n,l,h,f),e.update(h,n,f))}function a(l,h,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,f);let m=0;for(let _=0;_<f;_++)m+=h[_];e.update(m,n,1)}function c(l,h,f,p){if(f===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let _=0;_<l.length;_++)o(l[_],h[_],p[_]);else{m.multiDrawArraysInstancedWEBGL(n,l,0,h,0,p,0,f);let _=0;for(let x=0;x<f;x++)_+=h[x];for(let x=0;x<p.length;x++)e.update(_,n,p[x])}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Jf(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==Qe&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const P=A===ts&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Mn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==gn&&!P)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const f=e.logarithmicDepthBuffer===!0,p=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(p===!0){const A=t.get("EXT_clip_control");A.clipControlEXT(A.LOWER_LEFT_EXT,A.ZERO_TO_ONE_EXT)}const m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),u=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),E=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),L=_>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reverseDepthBuffer:p,maxTextures:m,maxVertexTextures:_,maxTextureSize:x,maxCubemapSize:u,maxAttributes:d,maxVertexUniforms:b,maxVaryings:M,maxFragmentUniforms:E,vertexTextures:L,maxSamples:R}}function $f(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new Cn,a=new zt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,p){const m=f.length!==0||p||n!==0||s;return s=p,n=f.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,p){e=h(f,p,0)},this.setState=function(f,p,m){const _=f.clippingPlanes,x=f.clipIntersection,u=f.clipShadows,d=i.get(f);if(!s||_===null||_.length===0||r&&!u)r?h(null):l();else{const b=r?0:n,M=b*4;let E=d.clippingState||null;c.value=E,E=h(_,p,M,m);for(let L=0;L!==M;++L)E[L]=e[L];d.clippingState=E,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,p,m,_){const x=f!==null?f.length:0;let u=null;if(x!==0){if(u=c.value,_!==!0||u===null){const d=m+x*4,b=p.matrixWorldInverse;a.getNormalMatrix(b),(u===null||u.length<d)&&(u=new Float32Array(d));for(let M=0,E=m;M!==x;++M,E+=4)o.copy(f[M]).applyMatrix4(b,a),o.normal.toArray(u,E),u[E+3]=o.constant}c.value=u,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,u}}function Qf(i){let t=new WeakMap;function e(o,a){return a===Qr?o.mapping=Ai:a===to&&(o.mapping=Ri),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Qr||a===to)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new lu(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class el extends $c{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Mi=4,Ha=[.125,.215,.35,.446,.526,.582],Xn=20,Cr=new el,Ga=new Zt;let Pr=null,Lr=0,Dr=0,Ir=!1;const kn=(1+Math.sqrt(5))/2,_i=1/kn,Va=[new C(-kn,_i,0),new C(kn,_i,0),new C(-_i,0,kn),new C(_i,0,kn),new C(0,kn,-_i),new C(0,kn,_i),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)];class Co{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Pr=this._renderer.getRenderTarget(),Lr=this._renderer.getActiveCubeFace(),Dr=this._renderer.getActiveMipmapLevel(),Ir=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xa(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wa(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Pr,Lr,Dr),this._renderer.xr.enabled=Ir,t.scissorTest=!1,Ts(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ai||t.mapping===Ri?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Pr=this._renderer.getRenderTarget(),Lr=this._renderer.getActiveCubeFace(),Dr=this._renderer.getActiveMipmapLevel(),Ir=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Je,minFilter:Je,generateMipmaps:!1,type:ts,format:Qe,colorSpace:Nn,depthBuffer:!1},s=ka(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ka(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=tp(r)),this._blurMaterial=ep(r,t,e)}return s}_compileMaterial(t){const e=new yt(this._lodPlanes[0],t);this._renderer.compile(e,Cr)}_sceneToCubeUV(t,e,n,s){const a=new Ve(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,p=h.toneMapping;h.getClearColor(Ga),h.toneMapping=Dn,h.autoClear=!1;const m=new $s({name:"PMREM.Background",side:Ce,depthWrite:!1,depthTest:!1}),_=new yt(new Re,m);let x=!1;const u=t.background;u?u.isColor&&(m.color.copy(u),t.background=null,x=!0):(m.color.copy(Ga),x=!0);for(let d=0;d<6;d++){const b=d%3;b===0?(a.up.set(0,c[d],0),a.lookAt(l[d],0,0)):b===1?(a.up.set(0,0,c[d]),a.lookAt(0,l[d],0)):(a.up.set(0,c[d],0),a.lookAt(0,0,l[d]));const M=this._cubeSize;Ts(s,b*M,d>2?M:0,M,M),h.setRenderTarget(s),x&&h.render(_,a),h.render(t,a)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=p,h.autoClear=f,t.background=u}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Ai||t.mapping===Ri;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xa()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wa());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new yt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;Ts(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Cr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Va[(s-r-1)%Va.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,f=new yt(this._lodPlanes[s],l),p=l.uniforms,m=this._sizeLods[n]-1,_=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Xn-1),x=r/_,u=isFinite(r)?1+Math.floor(h*x):Xn;u>Xn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${u} samples when the maximum is set to ${Xn}`);const d=[];let b=0;for(let A=0;A<Xn;++A){const P=A/x,W=Math.exp(-P*P/2);d.push(W),A===0?b+=W:A<u&&(b+=2*W)}for(let A=0;A<d.length;A++)d[A]=d[A]/b;p.envMap.value=t.texture,p.samples.value=u,p.weights.value=d,p.latitudinal.value=o==="latitudinal",a&&(p.poleAxis.value=a);const{_lodMax:M}=this;p.dTheta.value=_,p.mipInt.value=M-n;const E=this._sizeLods[s],L=3*E*(s>M-Mi?s-M+Mi:0),R=4*(this._cubeSize-E);Ts(e,L,R,3*E,2*E),c.setRenderTarget(e),c.render(f,Cr)}}function tp(i){const t=[],e=[],n=[];let s=i;const r=i-Mi+1+Ha.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>i-Mi?c=Ha[o-i+Mi-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,f=1+l,p=[h,h,f,h,f,f,h,h,f,f,h,f],m=6,_=6,x=3,u=2,d=1,b=new Float32Array(x*_*m),M=new Float32Array(u*_*m),E=new Float32Array(d*_*m);for(let R=0;R<m;R++){const A=R%3*2/3-1,P=R>2?0:-1,W=[A,P,0,A+2/3,P,0,A+2/3,P+1,0,A,P,0,A+2/3,P+1,0,A,P+1,0];b.set(W,x*_*R),M.set(p,u*_*R);const g=[R,R,R,R,R,R];E.set(g,d*_*R)}const L=new tn;L.setAttribute("position",new on(b,x)),L.setAttribute("uv",new on(M,u)),L.setAttribute("faceIndex",new on(E,d)),t.push(L),s>Mi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function ka(i,t,e){const n=new Kn(i,t,e);return n.texture.mapping=js,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ts(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function ep(i,t,e){const n=new Float32Array(Xn),s=new C(0,1,0);return new Un({name:"SphericalGaussianBlur",defines:{n:Xn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:$o(),fragmentShader:`

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
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Wa(){return new Un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:$o(),fragmentShader:`

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
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Xa(){return new Un({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:$o(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function $o(){return`

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
	`}function np(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Qr||c===to,h=c===Ai||c===Ri;if(l||h){let f=t.get(a);const p=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==p)return e===null&&(e=new Co(i)),f=l?e.fromEquirectangular(a,f):e.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),f.texture;if(f!==void 0)return f.texture;{const m=a.image;return l&&m&&m.height>0||h&&m&&s(m)?(e===null&&(e=new Co(i)),f=l?e.fromEquirectangular(a):e.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),a.addEventListener("dispose",r),f.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function ip(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Os("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function sp(i,t,e,n){const s={},r=new WeakMap;function o(f){const p=f.target;p.index!==null&&t.remove(p.index);for(const _ in p.attributes)t.remove(p.attributes[_]);for(const _ in p.morphAttributes){const x=p.morphAttributes[_];for(let u=0,d=x.length;u<d;u++)t.remove(x[u])}p.removeEventListener("dispose",o),delete s[p.id];const m=r.get(p);m&&(t.remove(m),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function a(f,p){return s[p.id]===!0||(p.addEventListener("dispose",o),s[p.id]=!0,e.memory.geometries++),p}function c(f){const p=f.attributes;for(const _ in p)t.update(p[_],i.ARRAY_BUFFER);const m=f.morphAttributes;for(const _ in m){const x=m[_];for(let u=0,d=x.length;u<d;u++)t.update(x[u],i.ARRAY_BUFFER)}}function l(f){const p=[],m=f.index,_=f.attributes.position;let x=0;if(m!==null){const b=m.array;x=m.version;for(let M=0,E=b.length;M<E;M+=3){const L=b[M+0],R=b[M+1],A=b[M+2];p.push(L,R,R,A,A,L)}}else if(_!==void 0){const b=_.array;x=_.version;for(let M=0,E=b.length/3-1;M<E;M+=3){const L=M+0,R=M+1,A=M+2;p.push(L,R,R,A,A,L)}}else return;const u=new(Xc(p)?jc:Kc)(p,1);u.version=x;const d=r.get(f);d&&t.remove(d),r.set(f,u)}function h(f){const p=r.get(f);if(p){const m=f.index;m!==null&&p.version<m.version&&l(f)}else l(f);return r.get(f)}return{get:a,update:c,getWireframeAttribute:h}}function rp(i,t,e){let n;function s(p){n=p}let r,o;function a(p){r=p.type,o=p.bytesPerElement}function c(p,m){i.drawElements(n,m,r,p*o),e.update(m,n,1)}function l(p,m,_){_!==0&&(i.drawElementsInstanced(n,m,r,p*o,_),e.update(m,n,_))}function h(p,m,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,r,p,0,_);let u=0;for(let d=0;d<_;d++)u+=m[d];e.update(u,n,1)}function f(p,m,_,x){if(_===0)return;const u=t.get("WEBGL_multi_draw");if(u===null)for(let d=0;d<p.length;d++)l(p[d]/o,m[d],x[d]);else{u.multiDrawElementsInstancedWEBGL(n,m,0,r,p,0,x,0,_);let d=0;for(let b=0;b<_;b++)d+=m[b];for(let b=0;b<x.length;b++)e.update(d,n,x[b])}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=f}function op(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function ap(i,t,e){const n=new WeakMap,s=new te;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=h!==void 0?h.length:0;let p=n.get(a);if(p===void 0||p.count!==f){let g=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",g)};var m=g;p!==void 0&&p.texture.dispose();const _=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,u=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let E=0;_===!0&&(E=1),x===!0&&(E=2),u===!0&&(E=3);let L=a.attributes.position.count*E,R=1;L>t.maxTextureSize&&(R=Math.ceil(L/t.maxTextureSize),L=t.maxTextureSize);const A=new Float32Array(L*R*4*f),P=new qc(A,L,R,f);P.type=gn,P.needsUpdate=!0;const W=E*4;for(let S=0;S<f;S++){const B=d[S],F=b[S],G=M[S],Z=L*R*4*S;for(let H=0;H<B.count;H++){const K=H*W;_===!0&&(s.fromBufferAttribute(B,H),A[Z+K+0]=s.x,A[Z+K+1]=s.y,A[Z+K+2]=s.z,A[Z+K+3]=0),x===!0&&(s.fromBufferAttribute(F,H),A[Z+K+4]=s.x,A[Z+K+5]=s.y,A[Z+K+6]=s.z,A[Z+K+7]=0),u===!0&&(s.fromBufferAttribute(G,H),A[Z+K+8]=s.x,A[Z+K+9]=s.y,A[Z+K+10]=s.z,A[Z+K+11]=G.itemSize===4?s.w:1)}}p={count:f,texture:P,size:new Q(L,R)},n.set(a,p),a.addEventListener("dispose",g)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let _=0;for(let u=0;u<l.length;u++)_+=l[u];const x=a.morphTargetsRelative?1:1-_;c.getUniforms().setValue(i,"morphTargetBaseInfluence",x),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",p.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:r}}function cp(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,f=t.get(c,h);if(s.get(f)!==l&&(t.update(f),s.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==l&&(p.update(),s.set(p,l))}return f}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}class nl extends Pe{constructor(t,e,n,s,r,o,a,c,l,h=Ti){if(h!==Ti&&h!==Pi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ti&&(n=Zn),n===void 0&&h===Pi&&(n=Ci),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Ye,this.minFilter=c!==void 0?c:Ye,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const il=new Pe,Ya=new nl(1,1),sl=new qc,rl=new qh,ol=new Qc,qa=[],Za=[],Ka=new Float32Array(16),ja=new Float32Array(9),Ja=new Float32Array(4);function Di(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=qa[s];if(r===void 0&&(r=new Float32Array(s),qa[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function pe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function me(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function tr(i,t){let e=Za[t];e===void 0&&(e=new Int32Array(t),Za[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function lp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function hp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(pe(e,t))return;i.uniform2fv(this.addr,t),me(e,t)}}function up(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(pe(e,t))return;i.uniform3fv(this.addr,t),me(e,t)}}function dp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(pe(e,t))return;i.uniform4fv(this.addr,t),me(e,t)}}function fp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(pe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),me(e,t)}else{if(pe(e,n))return;Ja.set(n),i.uniformMatrix2fv(this.addr,!1,Ja),me(e,n)}}function pp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(pe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),me(e,t)}else{if(pe(e,n))return;ja.set(n),i.uniformMatrix3fv(this.addr,!1,ja),me(e,n)}}function mp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(pe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),me(e,t)}else{if(pe(e,n))return;Ka.set(n),i.uniformMatrix4fv(this.addr,!1,Ka),me(e,n)}}function _p(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function gp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(pe(e,t))return;i.uniform2iv(this.addr,t),me(e,t)}}function vp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(pe(e,t))return;i.uniform3iv(this.addr,t),me(e,t)}}function xp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(pe(e,t))return;i.uniform4iv(this.addr,t),me(e,t)}}function Mp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Sp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(pe(e,t))return;i.uniform2uiv(this.addr,t),me(e,t)}}function yp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(pe(e,t))return;i.uniform3uiv(this.addr,t),me(e,t)}}function Ep(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(pe(e,t))return;i.uniform4uiv(this.addr,t),me(e,t)}}function Tp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ya.compareFunction=Wc,r=Ya):r=il,e.setTexture2D(t||r,s)}function bp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||rl,s)}function wp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||ol,s)}function Ap(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||sl,s)}function Rp(i){switch(i){case 5126:return lp;case 35664:return hp;case 35665:return up;case 35666:return dp;case 35674:return fp;case 35675:return pp;case 35676:return mp;case 5124:case 35670:return _p;case 35667:case 35671:return gp;case 35668:case 35672:return vp;case 35669:case 35673:return xp;case 5125:return Mp;case 36294:return Sp;case 36295:return yp;case 36296:return Ep;case 35678:case 36198:case 36298:case 36306:case 35682:return Tp;case 35679:case 36299:case 36307:return bp;case 35680:case 36300:case 36308:case 36293:return wp;case 36289:case 36303:case 36311:case 36292:return Ap}}function Cp(i,t){i.uniform1fv(this.addr,t)}function Pp(i,t){const e=Di(t,this.size,2);i.uniform2fv(this.addr,e)}function Lp(i,t){const e=Di(t,this.size,3);i.uniform3fv(this.addr,e)}function Dp(i,t){const e=Di(t,this.size,4);i.uniform4fv(this.addr,e)}function Ip(i,t){const e=Di(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Up(i,t){const e=Di(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Np(i,t){const e=Di(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Fp(i,t){i.uniform1iv(this.addr,t)}function Op(i,t){i.uniform2iv(this.addr,t)}function Bp(i,t){i.uniform3iv(this.addr,t)}function zp(i,t){i.uniform4iv(this.addr,t)}function Hp(i,t){i.uniform1uiv(this.addr,t)}function Gp(i,t){i.uniform2uiv(this.addr,t)}function Vp(i,t){i.uniform3uiv(this.addr,t)}function kp(i,t){i.uniform4uiv(this.addr,t)}function Wp(i,t,e){const n=this.cache,s=t.length,r=tr(e,s);pe(n,r)||(i.uniform1iv(this.addr,r),me(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||il,r[o])}function Xp(i,t,e){const n=this.cache,s=t.length,r=tr(e,s);pe(n,r)||(i.uniform1iv(this.addr,r),me(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||rl,r[o])}function Yp(i,t,e){const n=this.cache,s=t.length,r=tr(e,s);pe(n,r)||(i.uniform1iv(this.addr,r),me(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||ol,r[o])}function qp(i,t,e){const n=this.cache,s=t.length,r=tr(e,s);pe(n,r)||(i.uniform1iv(this.addr,r),me(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||sl,r[o])}function Zp(i){switch(i){case 5126:return Cp;case 35664:return Pp;case 35665:return Lp;case 35666:return Dp;case 35674:return Ip;case 35675:return Up;case 35676:return Np;case 5124:case 35670:return Fp;case 35667:case 35671:return Op;case 35668:case 35672:return Bp;case 35669:case 35673:return zp;case 5125:return Hp;case 36294:return Gp;case 36295:return Vp;case 36296:return kp;case 35678:case 36198:case 36298:case 36306:case 35682:return Wp;case 35679:case 36299:case 36307:return Xp;case 35680:case 36300:case 36308:case 36293:return Yp;case 36289:case 36303:case 36311:case 36292:return qp}}class Kp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Rp(e.type)}}class jp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Zp(e.type)}}class Jp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Ur=/(\w+)(\])?(\[|\.)?/g;function $a(i,t){i.seq.push(t),i.map[t.id]=t}function $p(i,t,e){const n=i.name,s=n.length;for(Ur.lastIndex=0;;){const r=Ur.exec(n),o=Ur.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){$a(e,l===void 0?new Kp(a,i,t):new jp(a,i,t));break}else{let f=e.map[a];f===void 0&&(f=new Jp(a),$a(e,f)),e=f}}}class Bs{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);$p(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Qa(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Qp=37297;let tm=0;function em(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function nm(i){const t=Jt.getPrimaries(Jt.workingColorSpace),e=Jt.getPrimaries(i);let n;switch(t===e?n="":t===ks&&e===Vs?n="LinearDisplayP3ToLinearSRGB":t===Vs&&e===ks&&(n="LinearSRGBToLinearDisplayP3"),i){case Nn:case Js:return[n,"LinearTransferOETF"];case nn:case Xo:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function tc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+em(i.getShaderSource(t),o)}else return s}function im(i,t){const e=nm(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function sm(i,t){let e;switch(t){case rh:e="Linear";break;case oh:e="Reinhard";break;case ah:e="Cineon";break;case Lc:e="ACESFilmic";break;case lh:e="AgX";break;case hh:e="Neutral";break;case ch:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const bs=new C;function rm(){Jt.getLuminanceCoefficients(bs);const i=bs.x.toFixed(4),t=bs.y.toFixed(4),e=bs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function om(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Hi).join(`
`)}function am(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function cm(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Hi(i){return i!==""}function ec(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function nc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const lm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Po(i){return i.replace(lm,um)}const hm=new Map;function um(i,t){let e=Bt[t];if(e===void 0){const n=hm.get(t);if(n!==void 0)e=Bt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Po(e)}const dm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ic(i){return i.replace(dm,fm)}function fm(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function sc(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function pm(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Rc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Cc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===mn&&(t="SHADOWMAP_TYPE_VSM"),t}function mm(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ai:case Ri:t="ENVMAP_TYPE_CUBE";break;case js:t="ENVMAP_TYPE_CUBE_UV";break}return t}function _m(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ri:t="ENVMAP_MODE_REFRACTION";break}return t}function gm(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Pc:t="ENVMAP_BLENDING_MULTIPLY";break;case ih:t="ENVMAP_BLENDING_MIX";break;case sh:t="ENVMAP_BLENDING_ADD";break}return t}function vm(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function xm(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=pm(e),l=mm(e),h=_m(e),f=gm(e),p=vm(e),m=om(e),_=am(r),x=s.createProgram();let u,d,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(u=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Hi).join(`
`),u.length>0&&(u+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Hi).join(`
`),d.length>0&&(d+=`
`)):(u=[sc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Hi).join(`
`),d=[sc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Dn?"#define TONE_MAPPING":"",e.toneMapping!==Dn?Bt.tonemapping_pars_fragment:"",e.toneMapping!==Dn?sm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Bt.colorspace_pars_fragment,im("linearToOutputTexel",e.outputColorSpace),rm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Hi).join(`
`)),o=Po(o),o=ec(o,e),o=nc(o,e),a=Po(a),a=ec(a,e),a=nc(a,e),o=ic(o),a=ic(a),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,u=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,d=["#define varying in",e.glslVersion===Sa?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Sa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const M=b+u+o,E=b+d+a,L=Qa(s,s.VERTEX_SHADER,M),R=Qa(s,s.FRAGMENT_SHADER,E);s.attachShader(x,L),s.attachShader(x,R),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function A(S){if(i.debug.checkShaderErrors){const B=s.getProgramInfoLog(x).trim(),F=s.getShaderInfoLog(L).trim(),G=s.getShaderInfoLog(R).trim();let Z=!0,H=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(Z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,L,R);else{const K=tc(s,L,"vertex"),V=tc(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+S.name+`
Material Type: `+S.type+`

Program Info Log: `+B+`
`+K+`
`+V)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(F===""||G==="")&&(H=!1);H&&(S.diagnostics={runnable:Z,programLog:B,vertexShader:{log:F,prefix:u},fragmentShader:{log:G,prefix:d}})}s.deleteShader(L),s.deleteShader(R),P=new Bs(s,x),W=cm(s,x)}let P;this.getUniforms=function(){return P===void 0&&A(this),P};let W;this.getAttributes=function(){return W===void 0&&A(this),W};let g=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return g===!1&&(g=s.getProgramParameter(x,Qp)),g},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=tm++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=L,this.fragmentShader=R,this}let Mm=0;class Sm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new ym(t),e.set(t,n)),n}}class ym{constructor(t){this.id=Mm++,this.code=t,this.usedTimes=0}}function Em(i,t,e,n,s,r,o){const a=new jo,c=new Sm,l=new Set,h=[],f=s.logarithmicDepthBuffer,p=s.reverseDepthBuffer,m=s.vertexTextures;let _=s.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function u(g){return l.add(g),g===0?"uv":`uv${g}`}function d(g,S,B,F,G){const Z=F.fog,H=G.geometry,K=g.isMeshStandardMaterial?F.environment:null,V=(g.isMeshStandardMaterial?e:t).get(g.envMap||K),ht=V&&V.mapping===js?V.image.height:null,ft=x[g.type];g.precision!==null&&(_=s.getMaxPrecision(g.precision),_!==g.precision&&console.warn("THREE.WebGLProgram.getParameters:",g.precision,"not supported, using",_,"instead."));const pt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Gt=pt!==void 0?pt.length:0;let Yt=0;H.morphAttributes.position!==void 0&&(Yt=1),H.morphAttributes.normal!==void 0&&(Yt=2),H.morphAttributes.color!==void 0&&(Yt=3);let X,et,Mt,lt;if(ft){const Ie=sn[ft];X=Ie.vertexShader,et=Ie.fragmentShader}else X=g.vertexShader,et=g.fragmentShader,c.update(g),Mt=c.getVertexShaderID(g),lt=c.getFragmentShaderID(g);const Lt=i.getRenderTarget(),Pt=G.isInstancedMesh===!0,Ft=G.isBatchedMesh===!0,Ht=!!g.map,j=!!g.matcap,w=!!V,rt=!!g.aoMap,st=!!g.lightMap,tt=!!g.bumpMap,ot=!!g.normalMap,At=!!g.displacementMap,mt=!!g.emissiveMap,T=!!g.metalnessMap,v=!!g.roughnessMap,N=g.anisotropy>0,Y=g.clearcoat>0,J=g.dispersion>0,q=g.iridescence>0,Tt=g.sheen>0,at=g.transmission>0,vt=N&&!!g.anisotropyMap,kt=Y&&!!g.clearcoatMap,nt=Y&&!!g.clearcoatNormalMap,xt=Y&&!!g.clearcoatRoughnessMap,Ut=q&&!!g.iridescenceMap,Nt=q&&!!g.iridescenceThicknessMap,St=Tt&&!!g.sheenColorMap,Wt=Tt&&!!g.sheenRoughnessMap,Ot=!!g.specularMap,ee=!!g.specularColorMap,D=!!g.specularIntensityMap,_t=at&&!!g.transmissionMap,k=at&&!!g.thicknessMap,$=!!g.gradientMap,ut=!!g.alphaMap,gt=g.alphaTest>0,Xt=!!g.alphaHash,le=!!g.extensions;let De=Dn;g.toneMapped&&(Lt===null||Lt.isXRRenderTarget===!0)&&(De=i.toneMapping);const qt={shaderID:ft,shaderType:g.type,shaderName:g.name,vertexShader:X,fragmentShader:et,defines:g.defines,customVertexShaderID:Mt,customFragmentShaderID:lt,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:_,batching:Ft,batchingColor:Ft&&G._colorsTexture!==null,instancing:Pt,instancingColor:Pt&&G.instanceColor!==null,instancingMorph:Pt&&G.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:Lt===null?i.outputColorSpace:Lt.isXRRenderTarget===!0?Lt.texture.colorSpace:Nn,alphaToCoverage:!!g.alphaToCoverage,map:Ht,matcap:j,envMap:w,envMapMode:w&&V.mapping,envMapCubeUVHeight:ht,aoMap:rt,lightMap:st,bumpMap:tt,normalMap:ot,displacementMap:m&&At,emissiveMap:mt,normalMapObjectSpace:ot&&g.normalMapType===ph,normalMapTangentSpace:ot&&g.normalMapType===kc,metalnessMap:T,roughnessMap:v,anisotropy:N,anisotropyMap:vt,clearcoat:Y,clearcoatMap:kt,clearcoatNormalMap:nt,clearcoatRoughnessMap:xt,dispersion:J,iridescence:q,iridescenceMap:Ut,iridescenceThicknessMap:Nt,sheen:Tt,sheenColorMap:St,sheenRoughnessMap:Wt,specularMap:Ot,specularColorMap:ee,specularIntensityMap:D,transmission:at,transmissionMap:_t,thicknessMap:k,gradientMap:$,opaque:g.transparent===!1&&g.blending===Ei&&g.alphaToCoverage===!1,alphaMap:ut,alphaTest:gt,alphaHash:Xt,combine:g.combine,mapUv:Ht&&u(g.map.channel),aoMapUv:rt&&u(g.aoMap.channel),lightMapUv:st&&u(g.lightMap.channel),bumpMapUv:tt&&u(g.bumpMap.channel),normalMapUv:ot&&u(g.normalMap.channel),displacementMapUv:At&&u(g.displacementMap.channel),emissiveMapUv:mt&&u(g.emissiveMap.channel),metalnessMapUv:T&&u(g.metalnessMap.channel),roughnessMapUv:v&&u(g.roughnessMap.channel),anisotropyMapUv:vt&&u(g.anisotropyMap.channel),clearcoatMapUv:kt&&u(g.clearcoatMap.channel),clearcoatNormalMapUv:nt&&u(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xt&&u(g.clearcoatRoughnessMap.channel),iridescenceMapUv:Ut&&u(g.iridescenceMap.channel),iridescenceThicknessMapUv:Nt&&u(g.iridescenceThicknessMap.channel),sheenColorMapUv:St&&u(g.sheenColorMap.channel),sheenRoughnessMapUv:Wt&&u(g.sheenRoughnessMap.channel),specularMapUv:Ot&&u(g.specularMap.channel),specularColorMapUv:ee&&u(g.specularColorMap.channel),specularIntensityMapUv:D&&u(g.specularIntensityMap.channel),transmissionMapUv:_t&&u(g.transmissionMap.channel),thicknessMapUv:k&&u(g.thicknessMap.channel),alphaMapUv:ut&&u(g.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(ot||N),vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!H.attributes.uv&&(Ht||ut),fog:!!Z,useFog:g.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:g.flatShading===!0,sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:p,skinning:G.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:Gt,morphTextureStride:Yt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:g.dithering,shadowMapEnabled:i.shadowMap.enabled&&B.length>0,shadowMapType:i.shadowMap.type,toneMapping:De,decodeVideoTexture:Ht&&g.map.isVideoTexture===!0&&Jt.getTransfer(g.map.colorSpace)===ie,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===_n,flipSided:g.side===Ce,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:le&&g.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(le&&g.extensions.multiDraw===!0||Ft)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return qt.vertexUv1s=l.has(1),qt.vertexUv2s=l.has(2),qt.vertexUv3s=l.has(3),l.clear(),qt}function b(g){const S=[];if(g.shaderID?S.push(g.shaderID):(S.push(g.customVertexShaderID),S.push(g.customFragmentShaderID)),g.defines!==void 0)for(const B in g.defines)S.push(B),S.push(g.defines[B]);return g.isRawShaderMaterial===!1&&(M(S,g),E(S,g),S.push(i.outputColorSpace)),S.push(g.customProgramCacheKey),S.join()}function M(g,S){g.push(S.precision),g.push(S.outputColorSpace),g.push(S.envMapMode),g.push(S.envMapCubeUVHeight),g.push(S.mapUv),g.push(S.alphaMapUv),g.push(S.lightMapUv),g.push(S.aoMapUv),g.push(S.bumpMapUv),g.push(S.normalMapUv),g.push(S.displacementMapUv),g.push(S.emissiveMapUv),g.push(S.metalnessMapUv),g.push(S.roughnessMapUv),g.push(S.anisotropyMapUv),g.push(S.clearcoatMapUv),g.push(S.clearcoatNormalMapUv),g.push(S.clearcoatRoughnessMapUv),g.push(S.iridescenceMapUv),g.push(S.iridescenceThicknessMapUv),g.push(S.sheenColorMapUv),g.push(S.sheenRoughnessMapUv),g.push(S.specularMapUv),g.push(S.specularColorMapUv),g.push(S.specularIntensityMapUv),g.push(S.transmissionMapUv),g.push(S.thicknessMapUv),g.push(S.combine),g.push(S.fogExp2),g.push(S.sizeAttenuation),g.push(S.morphTargetsCount),g.push(S.morphAttributeCount),g.push(S.numDirLights),g.push(S.numPointLights),g.push(S.numSpotLights),g.push(S.numSpotLightMaps),g.push(S.numHemiLights),g.push(S.numRectAreaLights),g.push(S.numDirLightShadows),g.push(S.numPointLightShadows),g.push(S.numSpotLightShadows),g.push(S.numSpotLightShadowsWithMaps),g.push(S.numLightProbes),g.push(S.shadowMapType),g.push(S.toneMapping),g.push(S.numClippingPlanes),g.push(S.numClipIntersection),g.push(S.depthPacking)}function E(g,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),g.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.alphaToCoverage&&a.enable(20),g.push(a.mask)}function L(g){const S=x[g.type];let B;if(S){const F=sn[S];B=ru.clone(F.uniforms)}else B=g.uniforms;return B}function R(g,S){let B;for(let F=0,G=h.length;F<G;F++){const Z=h[F];if(Z.cacheKey===S){B=Z,++B.usedTimes;break}}return B===void 0&&(B=new xm(i,S,g,r),h.push(B)),B}function A(g){if(--g.usedTimes===0){const S=h.indexOf(g);h[S]=h[h.length-1],h.pop(),g.destroy()}}function P(g){c.remove(g)}function W(){c.dispose()}return{getParameters:d,getProgramCacheKey:b,getUniforms:L,acquireProgram:R,releaseProgram:A,releaseShaderCache:P,programs:h,dispose:W}}function Tm(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function bm(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function rc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function oc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(f,p,m,_,x,u){let d=i[t];return d===void 0?(d={id:f.id,object:f,geometry:p,material:m,groupOrder:_,renderOrder:f.renderOrder,z:x,group:u},i[t]=d):(d.id=f.id,d.object=f,d.geometry=p,d.material=m,d.groupOrder=_,d.renderOrder=f.renderOrder,d.z=x,d.group=u),t++,d}function a(f,p,m,_,x,u){const d=o(f,p,m,_,x,u);m.transmission>0?n.push(d):m.transparent===!0?s.push(d):e.push(d)}function c(f,p,m,_,x,u){const d=o(f,p,m,_,x,u);m.transmission>0?n.unshift(d):m.transparent===!0?s.unshift(d):e.unshift(d)}function l(f,p){e.length>1&&e.sort(f||bm),n.length>1&&n.sort(p||rc),s.length>1&&s.sort(p||rc)}function h(){for(let f=t,p=i.length;f<p;f++){const m=i[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function wm(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new oc,i.set(n,[o])):s>=r.length?(o=new oc,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Am(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new C,color:new Zt};break;case"SpotLight":e={position:new C,direction:new C,color:new Zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new C,color:new Zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new C,skyColor:new Zt,groundColor:new Zt};break;case"RectAreaLight":e={color:new Zt,position:new C,halfWidth:new C,halfHeight:new C};break}return i[t.id]=e,e}}}function Rm(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Q};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Q};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Q,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Cm=0;function Pm(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Lm(i){const t=new Am,e=Rm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new C);const s=new C,r=new se,o=new se;function a(l){let h=0,f=0,p=0;for(let W=0;W<9;W++)n.probe[W].set(0,0,0);let m=0,_=0,x=0,u=0,d=0,b=0,M=0,E=0,L=0,R=0,A=0;l.sort(Pm);for(let W=0,g=l.length;W<g;W++){const S=l[W],B=S.color,F=S.intensity,G=S.distance,Z=S.shadow&&S.shadow.map?S.shadow.map.texture:null;if(S.isAmbientLight)h+=B.r*F,f+=B.g*F,p+=B.b*F;else if(S.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(S.sh.coefficients[H],F);A++}else if(S.isDirectionalLight){const H=t.get(S);if(H.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){const K=S.shadow,V=e.get(S);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,n.directionalShadow[m]=V,n.directionalShadowMap[m]=Z,n.directionalShadowMatrix[m]=S.shadow.matrix,b++}n.directional[m]=H,m++}else if(S.isSpotLight){const H=t.get(S);H.position.setFromMatrixPosition(S.matrixWorld),H.color.copy(B).multiplyScalar(F),H.distance=G,H.coneCos=Math.cos(S.angle),H.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),H.decay=S.decay,n.spot[x]=H;const K=S.shadow;if(S.map&&(n.spotLightMap[L]=S.map,L++,K.updateMatrices(S),S.castShadow&&R++),n.spotLightMatrix[x]=K.matrix,S.castShadow){const V=e.get(S);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,n.spotShadow[x]=V,n.spotShadowMap[x]=Z,E++}x++}else if(S.isRectAreaLight){const H=t.get(S);H.color.copy(B).multiplyScalar(F),H.halfWidth.set(S.width*.5,0,0),H.halfHeight.set(0,S.height*.5,0),n.rectArea[u]=H,u++}else if(S.isPointLight){const H=t.get(S);if(H.color.copy(S.color).multiplyScalar(S.intensity),H.distance=S.distance,H.decay=S.decay,S.castShadow){const K=S.shadow,V=e.get(S);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,V.shadowCameraNear=K.camera.near,V.shadowCameraFar=K.camera.far,n.pointShadow[_]=V,n.pointShadowMap[_]=Z,n.pointShadowMatrix[_]=S.shadow.matrix,M++}n.point[_]=H,_++}else if(S.isHemisphereLight){const H=t.get(S);H.skyColor.copy(S.color).multiplyScalar(F),H.groundColor.copy(S.groundColor).multiplyScalar(F),n.hemi[d]=H,d++}}u>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ct.LTC_FLOAT_1,n.rectAreaLTC2=ct.LTC_FLOAT_2):(n.rectAreaLTC1=ct.LTC_HALF_1,n.rectAreaLTC2=ct.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=p;const P=n.hash;(P.directionalLength!==m||P.pointLength!==_||P.spotLength!==x||P.rectAreaLength!==u||P.hemiLength!==d||P.numDirectionalShadows!==b||P.numPointShadows!==M||P.numSpotShadows!==E||P.numSpotMaps!==L||P.numLightProbes!==A)&&(n.directional.length=m,n.spot.length=x,n.rectArea.length=u,n.point.length=_,n.hemi.length=d,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=E,n.spotShadowMap.length=E,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=E+L-R,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=A,P.directionalLength=m,P.pointLength=_,P.spotLength=x,P.rectAreaLength=u,P.hemiLength=d,P.numDirectionalShadows=b,P.numPointShadows=M,P.numSpotShadows=E,P.numSpotMaps=L,P.numLightProbes=A,n.version=Cm++)}function c(l,h){let f=0,p=0,m=0,_=0,x=0;const u=h.matrixWorldInverse;for(let d=0,b=l.length;d<b;d++){const M=l[d];if(M.isDirectionalLight){const E=n.directional[f];E.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(u),f++}else if(M.isSpotLight){const E=n.spot[m];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(u),E.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(u),m++}else if(M.isRectAreaLight){const E=n.rectArea[_];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(u),o.identity(),r.copy(M.matrixWorld),r.premultiply(u),o.extractRotation(r),E.halfWidth.set(M.width*.5,0,0),E.halfHeight.set(0,M.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),_++}else if(M.isPointLight){const E=n.point[p];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(u),p++}else if(M.isHemisphereLight){const E=n.hemi[x];E.direction.setFromMatrixPosition(M.matrixWorld),E.direction.transformDirection(u),x++}}}return{setup:a,setupView:c,state:n}}function ac(i){const t=new Lm(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Dm(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new ac(i),t.set(s,[a])):r>=o.length?(a=new ac(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class Im extends ns{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=dh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Um extends ns{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Nm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Fm=`uniform sampler2D shadow_pass;
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
}`;function Om(i,t,e){let n=new Jo;const s=new Q,r=new Q,o=new te,a=new Im({depthPacking:fh}),c=new Um,l={},h=e.maxTextureSize,f={[In]:Ce,[Ce]:In,[_n]:_n},p=new Un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Q},radius:{value:4}},vertexShader:Nm,fragmentShader:Fm}),m=p.clone();m.defines.HORIZONTAL_PASS=1;const _=new tn;_.setAttribute("position",new on(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new yt(_,p),u=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rc;let d=this.type;this.render=function(R,A,P){if(u.enabled===!1||u.autoUpdate===!1&&u.needsUpdate===!1||R.length===0)return;const W=i.getRenderTarget(),g=i.getActiveCubeFace(),S=i.getActiveMipmapLevel(),B=i.state;B.setBlending(Ln),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const F=d!==mn&&this.type===mn,G=d===mn&&this.type!==mn;for(let Z=0,H=R.length;Z<H;Z++){const K=R[Z],V=K.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const ht=V.getFrameExtents();if(s.multiply(ht),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ht.x),s.x=r.x*ht.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ht.y),s.y=r.y*ht.y,V.mapSize.y=r.y)),V.map===null||F===!0||G===!0){const pt=this.type!==mn?{minFilter:Ye,magFilter:Ye}:{};V.map!==null&&V.map.dispose(),V.map=new Kn(s.x,s.y,pt),V.map.texture.name=K.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();const ft=V.getViewportCount();for(let pt=0;pt<ft;pt++){const Gt=V.getViewport(pt);o.set(r.x*Gt.x,r.y*Gt.y,r.x*Gt.z,r.y*Gt.w),B.viewport(o),V.updateMatrices(K,pt),n=V.getFrustum(),E(A,P,V.camera,K,this.type)}V.isPointLightShadow!==!0&&this.type===mn&&b(V,P),V.needsUpdate=!1}d=this.type,u.needsUpdate=!1,i.setRenderTarget(W,g,S)};function b(R,A){const P=t.update(x);p.defines.VSM_SAMPLES!==R.blurSamples&&(p.defines.VSM_SAMPLES=R.blurSamples,m.defines.VSM_SAMPLES=R.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Kn(s.x,s.y)),p.uniforms.shadow_pass.value=R.map.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(A,null,P,p,x,null),m.uniforms.shadow_pass.value=R.mapPass.texture,m.uniforms.resolution.value=R.mapSize,m.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(A,null,P,m,x,null)}function M(R,A,P,W){let g=null;const S=P.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(S!==void 0)g=S;else if(g=P.isPointLight===!0?c:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const B=g.uuid,F=A.uuid;let G=l[B];G===void 0&&(G={},l[B]=G);let Z=G[F];Z===void 0&&(Z=g.clone(),G[F]=Z,A.addEventListener("dispose",L)),g=Z}if(g.visible=A.visible,g.wireframe=A.wireframe,W===mn?g.side=A.shadowSide!==null?A.shadowSide:A.side:g.side=A.shadowSide!==null?A.shadowSide:f[A.side],g.alphaMap=A.alphaMap,g.alphaTest=A.alphaTest,g.map=A.map,g.clipShadows=A.clipShadows,g.clippingPlanes=A.clippingPlanes,g.clipIntersection=A.clipIntersection,g.displacementMap=A.displacementMap,g.displacementScale=A.displacementScale,g.displacementBias=A.displacementBias,g.wireframeLinewidth=A.wireframeLinewidth,g.linewidth=A.linewidth,P.isPointLight===!0&&g.isMeshDistanceMaterial===!0){const B=i.properties.get(g);B.light=P}return g}function E(R,A,P,W,g){if(R.visible===!1)return;if(R.layers.test(A.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&g===mn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,R.matrixWorld);const F=t.update(R),G=R.material;if(Array.isArray(G)){const Z=F.groups;for(let H=0,K=Z.length;H<K;H++){const V=Z[H],ht=G[V.materialIndex];if(ht&&ht.visible){const ft=M(R,ht,W,g);R.onBeforeShadow(i,R,A,P,F,ft,V),i.renderBufferDirect(P,null,F,ft,R,V),R.onAfterShadow(i,R,A,P,F,ft,V)}}}else if(G.visible){const Z=M(R,G,W,g);R.onBeforeShadow(i,R,A,P,F,Z,null),i.renderBufferDirect(P,null,F,Z,R,null),R.onAfterShadow(i,R,A,P,F,Z,null)}}const B=R.children;for(let F=0,G=B.length;F<G;F++)E(B[F],A,P,W,g)}function L(R){R.target.removeEventListener("dispose",L);for(const P in l){const W=l[P],g=R.target.uuid;g in W&&(W[g].dispose(),delete W[g])}}}const Bm={[Yr]:qr,[Zr]:Jr,[Kr]:$r,[wi]:jr,[qr]:Yr,[Jr]:Zr,[$r]:Kr,[jr]:wi};function zm(i){function t(){let D=!1;const _t=new te;let k=null;const $=new te(0,0,0,0);return{setMask:function(ut){k!==ut&&!D&&(i.colorMask(ut,ut,ut,ut),k=ut)},setLocked:function(ut){D=ut},setClear:function(ut,gt,Xt,le,De){De===!0&&(ut*=le,gt*=le,Xt*=le),_t.set(ut,gt,Xt,le),$.equals(_t)===!1&&(i.clearColor(ut,gt,Xt,le),$.copy(_t))},reset:function(){D=!1,k=null,$.set(-1,0,0,0)}}}function e(){let D=!1,_t=!1,k=null,$=null,ut=null;return{setReversed:function(gt){_t=gt},setTest:function(gt){gt?Mt(i.DEPTH_TEST):lt(i.DEPTH_TEST)},setMask:function(gt){k!==gt&&!D&&(i.depthMask(gt),k=gt)},setFunc:function(gt){if(_t&&(gt=Bm[gt]),$!==gt){switch(gt){case Yr:i.depthFunc(i.NEVER);break;case qr:i.depthFunc(i.ALWAYS);break;case Zr:i.depthFunc(i.LESS);break;case wi:i.depthFunc(i.LEQUAL);break;case Kr:i.depthFunc(i.EQUAL);break;case jr:i.depthFunc(i.GEQUAL);break;case Jr:i.depthFunc(i.GREATER);break;case $r:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}$=gt}},setLocked:function(gt){D=gt},setClear:function(gt){ut!==gt&&(i.clearDepth(gt),ut=gt)},reset:function(){D=!1,k=null,$=null,ut=null}}}function n(){let D=!1,_t=null,k=null,$=null,ut=null,gt=null,Xt=null,le=null,De=null;return{setTest:function(qt){D||(qt?Mt(i.STENCIL_TEST):lt(i.STENCIL_TEST))},setMask:function(qt){_t!==qt&&!D&&(i.stencilMask(qt),_t=qt)},setFunc:function(qt,Ie,ln){(k!==qt||$!==Ie||ut!==ln)&&(i.stencilFunc(qt,Ie,ln),k=qt,$=Ie,ut=ln)},setOp:function(qt,Ie,ln){(gt!==qt||Xt!==Ie||le!==ln)&&(i.stencilOp(qt,Ie,ln),gt=qt,Xt=Ie,le=ln)},setLocked:function(qt){D=qt},setClear:function(qt){De!==qt&&(i.clearStencil(qt),De=qt)},reset:function(){D=!1,_t=null,k=null,$=null,ut=null,gt=null,Xt=null,le=null,De=null}}}const s=new t,r=new e,o=new n,a=new WeakMap,c=new WeakMap;let l={},h={},f=new WeakMap,p=[],m=null,_=!1,x=null,u=null,d=null,b=null,M=null,E=null,L=null,R=new Zt(0,0,0),A=0,P=!1,W=null,g=null,S=null,B=null,F=null;const G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,H=0;const K=i.getParameter(i.VERSION);K.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(K)[1]),Z=H>=1):K.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),Z=H>=2);let V=null,ht={};const ft=i.getParameter(i.SCISSOR_BOX),pt=i.getParameter(i.VIEWPORT),Gt=new te().fromArray(ft),Yt=new te().fromArray(pt);function X(D,_t,k,$){const ut=new Uint8Array(4),gt=i.createTexture();i.bindTexture(D,gt),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Xt=0;Xt<k;Xt++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(_t,0,i.RGBA,1,1,$,0,i.RGBA,i.UNSIGNED_BYTE,ut):i.texImage2D(_t+Xt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ut);return gt}const et={};et[i.TEXTURE_2D]=X(i.TEXTURE_2D,i.TEXTURE_2D,1),et[i.TEXTURE_CUBE_MAP]=X(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),et[i.TEXTURE_2D_ARRAY]=X(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),et[i.TEXTURE_3D]=X(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),Mt(i.DEPTH_TEST),r.setFunc(wi),st(!1),tt(ma),Mt(i.CULL_FACE),w(Ln);function Mt(D){l[D]!==!0&&(i.enable(D),l[D]=!0)}function lt(D){l[D]!==!1&&(i.disable(D),l[D]=!1)}function Lt(D,_t){return h[D]!==_t?(i.bindFramebuffer(D,_t),h[D]=_t,D===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=_t),D===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=_t),!0):!1}function Pt(D,_t){let k=p,$=!1;if(D){k=f.get(_t),k===void 0&&(k=[],f.set(_t,k));const ut=D.textures;if(k.length!==ut.length||k[0]!==i.COLOR_ATTACHMENT0){for(let gt=0,Xt=ut.length;gt<Xt;gt++)k[gt]=i.COLOR_ATTACHMENT0+gt;k.length=ut.length,$=!0}}else k[0]!==i.BACK&&(k[0]=i.BACK,$=!0);$&&i.drawBuffers(k)}function Ft(D){return m!==D?(i.useProgram(D),m=D,!0):!1}const Ht={[Wn]:i.FUNC_ADD,[Hl]:i.FUNC_SUBTRACT,[Gl]:i.FUNC_REVERSE_SUBTRACT};Ht[Vl]=i.MIN,Ht[kl]=i.MAX;const j={[Wl]:i.ZERO,[Xl]:i.ONE,[Yl]:i.SRC_COLOR,[Wr]:i.SRC_ALPHA,[$l]:i.SRC_ALPHA_SATURATE,[jl]:i.DST_COLOR,[Zl]:i.DST_ALPHA,[ql]:i.ONE_MINUS_SRC_COLOR,[Xr]:i.ONE_MINUS_SRC_ALPHA,[Jl]:i.ONE_MINUS_DST_COLOR,[Kl]:i.ONE_MINUS_DST_ALPHA,[Ql]:i.CONSTANT_COLOR,[th]:i.ONE_MINUS_CONSTANT_COLOR,[eh]:i.CONSTANT_ALPHA,[nh]:i.ONE_MINUS_CONSTANT_ALPHA};function w(D,_t,k,$,ut,gt,Xt,le,De,qt){if(D===Ln){_===!0&&(lt(i.BLEND),_=!1);return}if(_===!1&&(Mt(i.BLEND),_=!0),D!==zl){if(D!==x||qt!==P){if((u!==Wn||M!==Wn)&&(i.blendEquation(i.FUNC_ADD),u=Wn,M=Wn),qt)switch(D){case Ei:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _a:i.blendFunc(i.ONE,i.ONE);break;case ga:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case va:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Ei:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _a:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case ga:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case va:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}d=null,b=null,E=null,L=null,R.set(0,0,0),A=0,x=D,P=qt}return}ut=ut||_t,gt=gt||k,Xt=Xt||$,(_t!==u||ut!==M)&&(i.blendEquationSeparate(Ht[_t],Ht[ut]),u=_t,M=ut),(k!==d||$!==b||gt!==E||Xt!==L)&&(i.blendFuncSeparate(j[k],j[$],j[gt],j[Xt]),d=k,b=$,E=gt,L=Xt),(le.equals(R)===!1||De!==A)&&(i.blendColor(le.r,le.g,le.b,De),R.copy(le),A=De),x=D,P=!1}function rt(D,_t){D.side===_n?lt(i.CULL_FACE):Mt(i.CULL_FACE);let k=D.side===Ce;_t&&(k=!k),st(k),D.blending===Ei&&D.transparent===!1?w(Ln):w(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),r.setFunc(D.depthFunc),r.setTest(D.depthTest),r.setMask(D.depthWrite),s.setMask(D.colorWrite);const $=D.stencilWrite;o.setTest($),$&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),At(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Mt(i.SAMPLE_ALPHA_TO_COVERAGE):lt(i.SAMPLE_ALPHA_TO_COVERAGE)}function st(D){W!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),W=D)}function tt(D){D!==Ol?(Mt(i.CULL_FACE),D!==g&&(D===ma?i.cullFace(i.BACK):D===Bl?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):lt(i.CULL_FACE),g=D}function ot(D){D!==S&&(Z&&i.lineWidth(D),S=D)}function At(D,_t,k){D?(Mt(i.POLYGON_OFFSET_FILL),(B!==_t||F!==k)&&(i.polygonOffset(_t,k),B=_t,F=k)):lt(i.POLYGON_OFFSET_FILL)}function mt(D){D?Mt(i.SCISSOR_TEST):lt(i.SCISSOR_TEST)}function T(D){D===void 0&&(D=i.TEXTURE0+G-1),V!==D&&(i.activeTexture(D),V=D)}function v(D,_t,k){k===void 0&&(V===null?k=i.TEXTURE0+G-1:k=V);let $=ht[k];$===void 0&&($={type:void 0,texture:void 0},ht[k]=$),($.type!==D||$.texture!==_t)&&(V!==k&&(i.activeTexture(k),V=k),i.bindTexture(D,_t||et[D]),$.type=D,$.texture=_t)}function N(){const D=ht[V];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Y(){try{i.compressedTexImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function J(){try{i.compressedTexImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function q(){try{i.texSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Tt(){try{i.texSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function at(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function vt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function kt(){try{i.texStorage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function nt(){try{i.texStorage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function xt(){try{i.texImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ut(){try{i.texImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Nt(D){Gt.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),Gt.copy(D))}function St(D){Yt.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),Yt.copy(D))}function Wt(D,_t){let k=c.get(_t);k===void 0&&(k=new WeakMap,c.set(_t,k));let $=k.get(D);$===void 0&&($=i.getUniformBlockIndex(_t,D.name),k.set(D,$))}function Ot(D,_t){const $=c.get(_t).get(D);a.get(_t)!==$&&(i.uniformBlockBinding(_t,$,D.__bindingPointIndex),a.set(_t,$))}function ee(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),l={},V=null,ht={},h={},f=new WeakMap,p=[],m=null,_=!1,x=null,u=null,d=null,b=null,M=null,E=null,L=null,R=new Zt(0,0,0),A=0,P=!1,W=null,g=null,S=null,B=null,F=null,Gt.set(0,0,i.canvas.width,i.canvas.height),Yt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:Mt,disable:lt,bindFramebuffer:Lt,drawBuffers:Pt,useProgram:Ft,setBlending:w,setMaterial:rt,setFlipSided:st,setCullFace:tt,setLineWidth:ot,setPolygonOffset:At,setScissorTest:mt,activeTexture:T,bindTexture:v,unbindTexture:N,compressedTexImage2D:Y,compressedTexImage3D:J,texImage2D:xt,texImage3D:Ut,updateUBOMapping:Wt,uniformBlockBinding:Ot,texStorage2D:kt,texStorage3D:nt,texSubImage2D:q,texSubImage3D:Tt,compressedTexSubImage2D:at,compressedTexSubImage3D:vt,scissor:Nt,viewport:St,reset:ee}}function cc(i,t,e,n){const s=Hm(n);switch(e){case Fc:return i*t;case Bc:return i*t;case zc:return i*t*2;case Hc:return i*t/s.components*s.byteLength;case Vo:return i*t/s.components*s.byteLength;case Gc:return i*t*2/s.components*s.byteLength;case ko:return i*t*2/s.components*s.byteLength;case Oc:return i*t*3/s.components*s.byteLength;case Qe:return i*t*4/s.components*s.byteLength;case Wo:return i*t*4/s.components*s.byteLength;case Ds:case Is:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Us:case Ns:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case io:case ro:return Math.max(i,16)*Math.max(t,8)/4;case no:case so:return Math.max(i,8)*Math.max(t,8)/2;case oo:case ao:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case co:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case lo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ho:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case uo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case fo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case po:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case mo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case _o:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case go:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case vo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case xo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Mo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case So:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case yo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Eo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Fs:case To:case bo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Vc:case wo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ao:case Ro:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Hm(i){switch(i){case Mn:case Ic:return{byteLength:1,components:1};case Ki:case Uc:case ts:return{byteLength:2,components:1};case Ho:case Go:return{byteLength:2,components:4};case Zn:case zo:case gn:return{byteLength:4,components:1};case Nc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Gm(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Q,h=new WeakMap;let f;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(T,v){return m?new OffscreenCanvas(T,v):Xs("canvas")}function x(T,v,N){let Y=1;const J=mt(T);if((J.width>N||J.height>N)&&(Y=N/Math.max(J.width,J.height)),Y<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const q=Math.floor(Y*J.width),Tt=Math.floor(Y*J.height);f===void 0&&(f=_(q,Tt));const at=v?_(q,Tt):f;return at.width=q,at.height=Tt,at.getContext("2d").drawImage(T,0,0,q,Tt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+q+"x"+Tt+")."),at}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),T;return T}function u(T){return T.generateMipmaps&&T.minFilter!==Ye&&T.minFilter!==Je}function d(T){i.generateMipmap(T)}function b(T,v,N,Y,J=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let q=v;if(v===i.RED&&(N===i.FLOAT&&(q=i.R32F),N===i.HALF_FLOAT&&(q=i.R16F),N===i.UNSIGNED_BYTE&&(q=i.R8)),v===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&(q=i.R8UI),N===i.UNSIGNED_SHORT&&(q=i.R16UI),N===i.UNSIGNED_INT&&(q=i.R32UI),N===i.BYTE&&(q=i.R8I),N===i.SHORT&&(q=i.R16I),N===i.INT&&(q=i.R32I)),v===i.RG&&(N===i.FLOAT&&(q=i.RG32F),N===i.HALF_FLOAT&&(q=i.RG16F),N===i.UNSIGNED_BYTE&&(q=i.RG8)),v===i.RG_INTEGER&&(N===i.UNSIGNED_BYTE&&(q=i.RG8UI),N===i.UNSIGNED_SHORT&&(q=i.RG16UI),N===i.UNSIGNED_INT&&(q=i.RG32UI),N===i.BYTE&&(q=i.RG8I),N===i.SHORT&&(q=i.RG16I),N===i.INT&&(q=i.RG32I)),v===i.RGB_INTEGER&&(N===i.UNSIGNED_BYTE&&(q=i.RGB8UI),N===i.UNSIGNED_SHORT&&(q=i.RGB16UI),N===i.UNSIGNED_INT&&(q=i.RGB32UI),N===i.BYTE&&(q=i.RGB8I),N===i.SHORT&&(q=i.RGB16I),N===i.INT&&(q=i.RGB32I)),v===i.RGBA_INTEGER&&(N===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),N===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),N===i.UNSIGNED_INT&&(q=i.RGBA32UI),N===i.BYTE&&(q=i.RGBA8I),N===i.SHORT&&(q=i.RGBA16I),N===i.INT&&(q=i.RGBA32I)),v===i.RGB&&N===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),v===i.RGBA){const Tt=J?Gs:Jt.getTransfer(Y);N===i.FLOAT&&(q=i.RGBA32F),N===i.HALF_FLOAT&&(q=i.RGBA16F),N===i.UNSIGNED_BYTE&&(q=Tt===ie?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function M(T,v){let N;return T?v===null||v===Zn||v===Ci?N=i.DEPTH24_STENCIL8:v===gn?N=i.DEPTH32F_STENCIL8:v===Ki&&(N=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Zn||v===Ci?N=i.DEPTH_COMPONENT24:v===gn?N=i.DEPTH_COMPONENT32F:v===Ki&&(N=i.DEPTH_COMPONENT16),N}function E(T,v){return u(T)===!0||T.isFramebufferTexture&&T.minFilter!==Ye&&T.minFilter!==Je?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function L(T){const v=T.target;v.removeEventListener("dispose",L),A(v),v.isVideoTexture&&h.delete(v)}function R(T){const v=T.target;v.removeEventListener("dispose",R),W(v)}function A(T){const v=n.get(T);if(v.__webglInit===void 0)return;const N=T.source,Y=p.get(N);if(Y){const J=Y[v.__cacheKey];J.usedTimes--,J.usedTimes===0&&P(T),Object.keys(Y).length===0&&p.delete(N)}n.remove(T)}function P(T){const v=n.get(T);i.deleteTexture(v.__webglTexture);const N=T.source,Y=p.get(N);delete Y[v.__cacheKey],o.memory.textures--}function W(T){const v=n.get(T);if(T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(v.__webglFramebuffer[Y]))for(let J=0;J<v.__webglFramebuffer[Y].length;J++)i.deleteFramebuffer(v.__webglFramebuffer[Y][J]);else i.deleteFramebuffer(v.__webglFramebuffer[Y]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[Y])}else{if(Array.isArray(v.__webglFramebuffer))for(let Y=0;Y<v.__webglFramebuffer.length;Y++)i.deleteFramebuffer(v.__webglFramebuffer[Y]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Y=0;Y<v.__webglColorRenderbuffer.length;Y++)v.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[Y]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const N=T.textures;for(let Y=0,J=N.length;Y<J;Y++){const q=n.get(N[Y]);q.__webglTexture&&(i.deleteTexture(q.__webglTexture),o.memory.textures--),n.remove(N[Y])}n.remove(T)}let g=0;function S(){g=0}function B(){const T=g;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),g+=1,T}function F(T){const v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function G(T,v){const N=n.get(T);if(T.isVideoTexture&&ot(T),T.isRenderTargetTexture===!1&&T.version>0&&N.__version!==T.version){const Y=T.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Yt(N,T,v);return}}e.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+v)}function Z(T,v){const N=n.get(T);if(T.version>0&&N.__version!==T.version){Yt(N,T,v);return}e.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+v)}function H(T,v){const N=n.get(T);if(T.version>0&&N.__version!==T.version){Yt(N,T,v);return}e.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+v)}function K(T,v){const N=n.get(T);if(T.version>0&&N.__version!==T.version){X(N,T,v);return}e.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+v)}const V={[Hs]:i.REPEAT,[Yn]:i.CLAMP_TO_EDGE,[eo]:i.MIRRORED_REPEAT},ht={[Ye]:i.NEAREST,[uh]:i.NEAREST_MIPMAP_NEAREST,[rs]:i.NEAREST_MIPMAP_LINEAR,[Je]:i.LINEAR,[ar]:i.LINEAR_MIPMAP_NEAREST,[qn]:i.LINEAR_MIPMAP_LINEAR},ft={[mh]:i.NEVER,[Sh]:i.ALWAYS,[_h]:i.LESS,[Wc]:i.LEQUAL,[gh]:i.EQUAL,[Mh]:i.GEQUAL,[vh]:i.GREATER,[xh]:i.NOTEQUAL};function pt(T,v){if(v.type===gn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===Je||v.magFilter===ar||v.magFilter===rs||v.magFilter===qn||v.minFilter===Je||v.minFilter===ar||v.minFilter===rs||v.minFilter===qn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,V[v.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,V[v.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,V[v.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,ht[v.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,ht[v.minFilter]),v.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,ft[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ye||v.minFilter!==rs&&v.minFilter!==qn||v.type===gn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const N=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function Gt(T,v){let N=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",L));const Y=v.source;let J=p.get(Y);J===void 0&&(J={},p.set(Y,J));const q=F(v);if(q!==T.__cacheKey){J[q]===void 0&&(J[q]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,N=!0),J[q].usedTimes++;const Tt=J[T.__cacheKey];Tt!==void 0&&(J[T.__cacheKey].usedTimes--,Tt.usedTimes===0&&P(v)),T.__cacheKey=q,T.__webglTexture=J[q].texture}return N}function Yt(T,v,N){let Y=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Y=i.TEXTURE_3D);const J=Gt(T,v),q=v.source;e.bindTexture(Y,T.__webglTexture,i.TEXTURE0+N);const Tt=n.get(q);if(q.version!==Tt.__version||J===!0){e.activeTexture(i.TEXTURE0+N);const at=Jt.getPrimaries(Jt.workingColorSpace),vt=v.colorSpace===Pn?null:Jt.getPrimaries(v.colorSpace),kt=v.colorSpace===Pn||at===vt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,kt);let nt=x(v.image,!1,s.maxTextureSize);nt=At(v,nt);const xt=r.convert(v.format,v.colorSpace),Ut=r.convert(v.type);let Nt=b(v.internalFormat,xt,Ut,v.colorSpace,v.isVideoTexture);pt(Y,v);let St;const Wt=v.mipmaps,Ot=v.isVideoTexture!==!0,ee=Tt.__version===void 0||J===!0,D=q.dataReady,_t=E(v,nt);if(v.isDepthTexture)Nt=M(v.format===Pi,v.type),ee&&(Ot?e.texStorage2D(i.TEXTURE_2D,1,Nt,nt.width,nt.height):e.texImage2D(i.TEXTURE_2D,0,Nt,nt.width,nt.height,0,xt,Ut,null));else if(v.isDataTexture)if(Wt.length>0){Ot&&ee&&e.texStorage2D(i.TEXTURE_2D,_t,Nt,Wt[0].width,Wt[0].height);for(let k=0,$=Wt.length;k<$;k++)St=Wt[k],Ot?D&&e.texSubImage2D(i.TEXTURE_2D,k,0,0,St.width,St.height,xt,Ut,St.data):e.texImage2D(i.TEXTURE_2D,k,Nt,St.width,St.height,0,xt,Ut,St.data);v.generateMipmaps=!1}else Ot?(ee&&e.texStorage2D(i.TEXTURE_2D,_t,Nt,nt.width,nt.height),D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,nt.width,nt.height,xt,Ut,nt.data)):e.texImage2D(i.TEXTURE_2D,0,Nt,nt.width,nt.height,0,xt,Ut,nt.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ot&&ee&&e.texStorage3D(i.TEXTURE_2D_ARRAY,_t,Nt,Wt[0].width,Wt[0].height,nt.depth);for(let k=0,$=Wt.length;k<$;k++)if(St=Wt[k],v.format!==Qe)if(xt!==null)if(Ot){if(D)if(v.layerUpdates.size>0){const ut=cc(St.width,St.height,v.format,v.type);for(const gt of v.layerUpdates){const Xt=St.data.subarray(gt*ut/St.data.BYTES_PER_ELEMENT,(gt+1)*ut/St.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,k,0,0,gt,St.width,St.height,1,xt,Xt,0,0)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,k,0,0,0,St.width,St.height,nt.depth,xt,St.data,0,0)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,k,Nt,St.width,St.height,nt.depth,0,St.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ot?D&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,k,0,0,0,St.width,St.height,nt.depth,xt,Ut,St.data):e.texImage3D(i.TEXTURE_2D_ARRAY,k,Nt,St.width,St.height,nt.depth,0,xt,Ut,St.data)}else{Ot&&ee&&e.texStorage2D(i.TEXTURE_2D,_t,Nt,Wt[0].width,Wt[0].height);for(let k=0,$=Wt.length;k<$;k++)St=Wt[k],v.format!==Qe?xt!==null?Ot?D&&e.compressedTexSubImage2D(i.TEXTURE_2D,k,0,0,St.width,St.height,xt,St.data):e.compressedTexImage2D(i.TEXTURE_2D,k,Nt,St.width,St.height,0,St.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ot?D&&e.texSubImage2D(i.TEXTURE_2D,k,0,0,St.width,St.height,xt,Ut,St.data):e.texImage2D(i.TEXTURE_2D,k,Nt,St.width,St.height,0,xt,Ut,St.data)}else if(v.isDataArrayTexture)if(Ot){if(ee&&e.texStorage3D(i.TEXTURE_2D_ARRAY,_t,Nt,nt.width,nt.height,nt.depth),D)if(v.layerUpdates.size>0){const k=cc(nt.width,nt.height,v.format,v.type);for(const $ of v.layerUpdates){const ut=nt.data.subarray($*k/nt.data.BYTES_PER_ELEMENT,($+1)*k/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,$,nt.width,nt.height,1,xt,Ut,ut)}v.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,xt,Ut,nt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Nt,nt.width,nt.height,nt.depth,0,xt,Ut,nt.data);else if(v.isData3DTexture)Ot?(ee&&e.texStorage3D(i.TEXTURE_3D,_t,Nt,nt.width,nt.height,nt.depth),D&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,xt,Ut,nt.data)):e.texImage3D(i.TEXTURE_3D,0,Nt,nt.width,nt.height,nt.depth,0,xt,Ut,nt.data);else if(v.isFramebufferTexture){if(ee)if(Ot)e.texStorage2D(i.TEXTURE_2D,_t,Nt,nt.width,nt.height);else{let k=nt.width,$=nt.height;for(let ut=0;ut<_t;ut++)e.texImage2D(i.TEXTURE_2D,ut,Nt,k,$,0,xt,Ut,null),k>>=1,$>>=1}}else if(Wt.length>0){if(Ot&&ee){const k=mt(Wt[0]);e.texStorage2D(i.TEXTURE_2D,_t,Nt,k.width,k.height)}for(let k=0,$=Wt.length;k<$;k++)St=Wt[k],Ot?D&&e.texSubImage2D(i.TEXTURE_2D,k,0,0,xt,Ut,St):e.texImage2D(i.TEXTURE_2D,k,Nt,xt,Ut,St);v.generateMipmaps=!1}else if(Ot){if(ee){const k=mt(nt);e.texStorage2D(i.TEXTURE_2D,_t,Nt,k.width,k.height)}D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,xt,Ut,nt)}else e.texImage2D(i.TEXTURE_2D,0,Nt,xt,Ut,nt);u(v)&&d(Y),Tt.__version=q.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function X(T,v,N){if(v.image.length!==6)return;const Y=Gt(T,v),J=v.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+N);const q=n.get(J);if(J.version!==q.__version||Y===!0){e.activeTexture(i.TEXTURE0+N);const Tt=Jt.getPrimaries(Jt.workingColorSpace),at=v.colorSpace===Pn?null:Jt.getPrimaries(v.colorSpace),vt=v.colorSpace===Pn||Tt===at?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);const kt=v.isCompressedTexture||v.image[0].isCompressedTexture,nt=v.image[0]&&v.image[0].isDataTexture,xt=[];for(let $=0;$<6;$++)!kt&&!nt?xt[$]=x(v.image[$],!0,s.maxCubemapSize):xt[$]=nt?v.image[$].image:v.image[$],xt[$]=At(v,xt[$]);const Ut=xt[0],Nt=r.convert(v.format,v.colorSpace),St=r.convert(v.type),Wt=b(v.internalFormat,Nt,St,v.colorSpace),Ot=v.isVideoTexture!==!0,ee=q.__version===void 0||Y===!0,D=J.dataReady;let _t=E(v,Ut);pt(i.TEXTURE_CUBE_MAP,v);let k;if(kt){Ot&&ee&&e.texStorage2D(i.TEXTURE_CUBE_MAP,_t,Wt,Ut.width,Ut.height);for(let $=0;$<6;$++){k=xt[$].mipmaps;for(let ut=0;ut<k.length;ut++){const gt=k[ut];v.format!==Qe?Nt!==null?Ot?D&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ut,0,0,gt.width,gt.height,Nt,gt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ut,Wt,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ot?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ut,0,0,gt.width,gt.height,Nt,St,gt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ut,Wt,gt.width,gt.height,0,Nt,St,gt.data)}}}else{if(k=v.mipmaps,Ot&&ee){k.length>0&&_t++;const $=mt(xt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,_t,Wt,$.width,$.height)}for(let $=0;$<6;$++)if(nt){Ot?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,xt[$].width,xt[$].height,Nt,St,xt[$].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Wt,xt[$].width,xt[$].height,0,Nt,St,xt[$].data);for(let ut=0;ut<k.length;ut++){const Xt=k[ut].image[$].image;Ot?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ut+1,0,0,Xt.width,Xt.height,Nt,St,Xt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ut+1,Wt,Xt.width,Xt.height,0,Nt,St,Xt.data)}}else{Ot?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Nt,St,xt[$]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Wt,Nt,St,xt[$]);for(let ut=0;ut<k.length;ut++){const gt=k[ut];Ot?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ut+1,0,0,Nt,St,gt.image[$]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ut+1,Wt,Nt,St,gt.image[$])}}}u(v)&&d(i.TEXTURE_CUBE_MAP),q.__version=J.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function et(T,v,N,Y,J,q){const Tt=r.convert(N.format,N.colorSpace),at=r.convert(N.type),vt=b(N.internalFormat,Tt,at,N.colorSpace);if(!n.get(v).__hasExternalTextures){const nt=Math.max(1,v.width>>q),xt=Math.max(1,v.height>>q);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?e.texImage3D(J,q,vt,nt,xt,v.depth,0,Tt,at,null):e.texImage2D(J,q,vt,nt,xt,0,Tt,at,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),tt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,J,n.get(N).__webglTexture,0,st(v)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,J,n.get(N).__webglTexture,q),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Mt(T,v,N){if(i.bindRenderbuffer(i.RENDERBUFFER,T),v.depthBuffer){const Y=v.depthTexture,J=Y&&Y.isDepthTexture?Y.type:null,q=M(v.stencilBuffer,J),Tt=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=st(v);tt(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,at,q,v.width,v.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,at,q,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,q,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Tt,i.RENDERBUFFER,T)}else{const Y=v.textures;for(let J=0;J<Y.length;J++){const q=Y[J],Tt=r.convert(q.format,q.colorSpace),at=r.convert(q.type),vt=b(q.internalFormat,Tt,at,q.colorSpace),kt=st(v);N&&tt(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,kt,vt,v.width,v.height):tt(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,kt,vt,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,vt,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function lt(T,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(v.depthTexture).__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),G(v.depthTexture,0);const Y=n.get(v.depthTexture).__webglTexture,J=st(v);if(v.depthTexture.format===Ti)tt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Y,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Y,0);else if(v.depthTexture.format===Pi)tt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Y,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Y,0);else throw new Error("Unknown depthTexture format")}function Lt(T){const v=n.get(T),N=T.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==T.depthTexture){const Y=T.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Y){const J=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Y.removeEventListener("dispose",J)};Y.addEventListener("dispose",J),v.__depthDisposeCallback=J}v.__boundDepthTexture=Y}if(T.depthTexture&&!v.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");lt(v.__webglFramebuffer,T)}else if(N){v.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[Y]),v.__webglDepthbuffer[Y]===void 0)v.__webglDepthbuffer[Y]=i.createRenderbuffer(),Mt(v.__webglDepthbuffer[Y],T,!1);else{const J=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=v.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,q)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),Mt(v.__webglDepthbuffer,T,!1);else{const Y=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,J)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Pt(T,v,N){const Y=n.get(T);v!==void 0&&et(Y.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&Lt(T)}function Ft(T){const v=T.texture,N=n.get(T),Y=n.get(v);T.addEventListener("dispose",R);const J=T.textures,q=T.isWebGLCubeRenderTarget===!0,Tt=J.length>1;if(Tt||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=v.version,o.memory.textures++),q){N.__webglFramebuffer=[];for(let at=0;at<6;at++)if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer[at]=[];for(let vt=0;vt<v.mipmaps.length;vt++)N.__webglFramebuffer[at][vt]=i.createFramebuffer()}else N.__webglFramebuffer[at]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer=[];for(let at=0;at<v.mipmaps.length;at++)N.__webglFramebuffer[at]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(Tt)for(let at=0,vt=J.length;at<vt;at++){const kt=n.get(J[at]);kt.__webglTexture===void 0&&(kt.__webglTexture=i.createTexture(),o.memory.textures++)}if(T.samples>0&&tt(T)===!1){N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let at=0;at<J.length;at++){const vt=J[at];N.__webglColorRenderbuffer[at]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[at]);const kt=r.convert(vt.format,vt.colorSpace),nt=r.convert(vt.type),xt=b(vt.internalFormat,kt,nt,vt.colorSpace,T.isXRRenderTarget===!0),Ut=st(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ut,xt,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+at,i.RENDERBUFFER,N.__webglColorRenderbuffer[at])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),Mt(N.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(q){e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),pt(i.TEXTURE_CUBE_MAP,v);for(let at=0;at<6;at++)if(v.mipmaps&&v.mipmaps.length>0)for(let vt=0;vt<v.mipmaps.length;vt++)et(N.__webglFramebuffer[at][vt],T,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+at,vt);else et(N.__webglFramebuffer[at],T,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0);u(v)&&d(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Tt){for(let at=0,vt=J.length;at<vt;at++){const kt=J[at],nt=n.get(kt);e.bindTexture(i.TEXTURE_2D,nt.__webglTexture),pt(i.TEXTURE_2D,kt),et(N.__webglFramebuffer,T,kt,i.COLOR_ATTACHMENT0+at,i.TEXTURE_2D,0),u(kt)&&d(i.TEXTURE_2D)}e.unbindTexture()}else{let at=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(at=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(at,Y.__webglTexture),pt(at,v),v.mipmaps&&v.mipmaps.length>0)for(let vt=0;vt<v.mipmaps.length;vt++)et(N.__webglFramebuffer[vt],T,v,i.COLOR_ATTACHMENT0,at,vt);else et(N.__webglFramebuffer,T,v,i.COLOR_ATTACHMENT0,at,0);u(v)&&d(at),e.unbindTexture()}T.depthBuffer&&Lt(T)}function Ht(T){const v=T.textures;for(let N=0,Y=v.length;N<Y;N++){const J=v[N];if(u(J)){const q=T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,Tt=n.get(J).__webglTexture;e.bindTexture(q,Tt),d(q),e.unbindTexture()}}}const j=[],w=[];function rt(T){if(T.samples>0){if(tt(T)===!1){const v=T.textures,N=T.width,Y=T.height;let J=i.COLOR_BUFFER_BIT;const q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Tt=n.get(T),at=v.length>1;if(at)for(let vt=0;vt<v.length;vt++)e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer);for(let vt=0;vt<v.length;vt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),at){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Tt.__webglColorRenderbuffer[vt]);const kt=n.get(v[vt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,kt,0)}i.blitFramebuffer(0,0,N,Y,0,0,N,Y,J,i.NEAREST),c===!0&&(j.length=0,w.length=0,j.push(i.COLOR_ATTACHMENT0+vt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(j.push(q),w.push(q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,w)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,j))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),at)for(let vt=0;vt<v.length;vt++){e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.RENDERBUFFER,Tt.__webglColorRenderbuffer[vt]);const kt=n.get(v[vt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.TEXTURE_2D,kt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){const v=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function st(T){return Math.min(s.maxSamples,T.samples)}function tt(T){const v=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function ot(T){const v=o.render.frame;h.get(T)!==v&&(h.set(T,v),T.update())}function At(T,v){const N=T.colorSpace,Y=T.format,J=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||N!==Nn&&N!==Pn&&(Jt.getTransfer(N)===ie?(Y!==Qe||J!==Mn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),v}function mt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=S,this.setTexture2D=G,this.setTexture2DArray=Z,this.setTexture3D=H,this.setTextureCube=K,this.rebindTextures=Pt,this.setupRenderTarget=Ft,this.updateRenderTargetMipmap=Ht,this.updateMultisampleRenderTarget=rt,this.setupDepthRenderbuffer=Lt,this.setupFrameBufferTexture=et,this.useMultisampledRTT=tt}function Vm(i,t){function e(n,s=Pn){let r;const o=Jt.getTransfer(s);if(n===Mn)return i.UNSIGNED_BYTE;if(n===Ho)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Go)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Nc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ic)return i.BYTE;if(n===Uc)return i.SHORT;if(n===Ki)return i.UNSIGNED_SHORT;if(n===zo)return i.INT;if(n===Zn)return i.UNSIGNED_INT;if(n===gn)return i.FLOAT;if(n===ts)return i.HALF_FLOAT;if(n===Fc)return i.ALPHA;if(n===Oc)return i.RGB;if(n===Qe)return i.RGBA;if(n===Bc)return i.LUMINANCE;if(n===zc)return i.LUMINANCE_ALPHA;if(n===Ti)return i.DEPTH_COMPONENT;if(n===Pi)return i.DEPTH_STENCIL;if(n===Hc)return i.RED;if(n===Vo)return i.RED_INTEGER;if(n===Gc)return i.RG;if(n===ko)return i.RG_INTEGER;if(n===Wo)return i.RGBA_INTEGER;if(n===Ds||n===Is||n===Us||n===Ns)if(o===ie)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ds)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Is)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Us)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ns)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ds)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Is)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Us)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ns)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===no||n===io||n===so||n===ro)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===no)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===io)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===so)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ro)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===oo||n===ao||n===co)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===oo||n===ao)return o===ie?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===co)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===lo||n===ho||n===uo||n===fo||n===po||n===mo||n===_o||n===go||n===vo||n===xo||n===Mo||n===So||n===yo||n===Eo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===lo)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ho)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===uo)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===fo)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===po)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===mo)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===_o)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===go)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===vo)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===xo)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Mo)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===So)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===yo)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Eo)return o===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Fs||n===To||n===bo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Fs)return o===ie?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===To)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===bo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Vc||n===wo||n===Ao||n===Ro)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Fs)return r.COMPRESSED_RED_RGTC1_EXT;if(n===wo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ao)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ro)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ci?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class km extends Ve{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ue extends ye{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Wm={type:"move"};class Nr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ue,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ue,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ue,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const x of t.hand.values()){const u=e.getJointPose(x,n),d=this._getHandJoint(l,x);u!==null&&(d.matrix.fromArray(u.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=u.radius),d.visible=u!==null}const h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],p=h.position.distanceTo(f.position),m=.02,_=.005;l.inputState.pinching&&p>m+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&p<=m-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Wm)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ue;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Xm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ym=`
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

}`;class qm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Pe,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Un({vertexShader:Xm,fragmentShader:Ym,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new yt(new Qs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Zm extends Qn{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,f=null,p=null,m=null,_=null;const x=new qm,u=e.getContextAttributes();let d=null,b=null;const M=[],E=[],L=new Q;let R=null;const A=new Ve;A.layers.enable(1),A.viewport=new te;const P=new Ve;P.layers.enable(2),P.viewport=new te;const W=[A,P],g=new km;g.layers.enable(1),g.layers.enable(2);let S=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let et=M[X];return et===void 0&&(et=new Nr,M[X]=et),et.getTargetRaySpace()},this.getControllerGrip=function(X){let et=M[X];return et===void 0&&(et=new Nr,M[X]=et),et.getGripSpace()},this.getHand=function(X){let et=M[X];return et===void 0&&(et=new Nr,M[X]=et),et.getHandSpace()};function F(X){const et=E.indexOf(X.inputSource);if(et===-1)return;const Mt=M[et];Mt!==void 0&&(Mt.update(X.inputSource,X.frame,l||o),Mt.dispatchEvent({type:X.type,data:X.inputSource}))}function G(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",Z);for(let X=0;X<M.length;X++){const et=E[X];et!==null&&(E[X]=null,M[X].disconnect(et))}S=null,B=null,x.reset(),t.setRenderTarget(d),m=null,p=null,f=null,s=null,b=null,Yt.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return p!==null?p:m},this.getBinding=function(){return f},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(d=t.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",G),s.addEventListener("inputsourceschange",Z),u.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(L),s.renderState.layers===void 0){const et={antialias:u.antialias,alpha:!0,depth:u.depth,stencil:u.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,et),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),b=new Kn(m.framebufferWidth,m.framebufferHeight,{format:Qe,type:Mn,colorSpace:t.outputColorSpace,stencilBuffer:u.stencil})}else{let et=null,Mt=null,lt=null;u.depth&&(lt=u.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=u.stencil?Pi:Ti,Mt=u.stencil?Ci:Zn);const Lt={colorFormat:e.RGBA8,depthFormat:lt,scaleFactor:r};f=new XRWebGLBinding(s,e),p=f.createProjectionLayer(Lt),s.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),b=new Kn(p.textureWidth,p.textureHeight,{format:Qe,type:Mn,depthTexture:new nl(p.textureWidth,p.textureHeight,Mt,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:u.stencil,colorSpace:t.outputColorSpace,samples:u.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Yt.setContext(s),Yt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function Z(X){for(let et=0;et<X.removed.length;et++){const Mt=X.removed[et],lt=E.indexOf(Mt);lt>=0&&(E[lt]=null,M[lt].disconnect(Mt))}for(let et=0;et<X.added.length;et++){const Mt=X.added[et];let lt=E.indexOf(Mt);if(lt===-1){for(let Pt=0;Pt<M.length;Pt++)if(Pt>=E.length){E.push(Mt),lt=Pt;break}else if(E[Pt]===null){E[Pt]=Mt,lt=Pt;break}if(lt===-1)break}const Lt=M[lt];Lt&&Lt.connect(Mt)}}const H=new C,K=new C;function V(X,et,Mt){H.setFromMatrixPosition(et.matrixWorld),K.setFromMatrixPosition(Mt.matrixWorld);const lt=H.distanceTo(K),Lt=et.projectionMatrix.elements,Pt=Mt.projectionMatrix.elements,Ft=Lt[14]/(Lt[10]-1),Ht=Lt[14]/(Lt[10]+1),j=(Lt[9]+1)/Lt[5],w=(Lt[9]-1)/Lt[5],rt=(Lt[8]-1)/Lt[0],st=(Pt[8]+1)/Pt[0],tt=Ft*rt,ot=Ft*st,At=lt/(-rt+st),mt=At*-rt;if(et.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(mt),X.translateZ(At),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Lt[10]===-1)X.projectionMatrix.copy(et.projectionMatrix),X.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{const T=Ft+At,v=Ht+At,N=tt-mt,Y=ot+(lt-mt),J=j*Ht/v*T,q=w*Ht/v*T;X.projectionMatrix.makePerspective(N,Y,J,q,T,v),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function ht(X,et){et===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(et.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let et=X.near,Mt=X.far;x.texture!==null&&(x.depthNear>0&&(et=x.depthNear),x.depthFar>0&&(Mt=x.depthFar)),g.near=P.near=A.near=et,g.far=P.far=A.far=Mt,(S!==g.near||B!==g.far)&&(s.updateRenderState({depthNear:g.near,depthFar:g.far}),S=g.near,B=g.far);const lt=X.parent,Lt=g.cameras;ht(g,lt);for(let Pt=0;Pt<Lt.length;Pt++)ht(Lt[Pt],lt);Lt.length===2?V(g,A,P):g.projectionMatrix.copy(A.projectionMatrix),ft(X,g,lt)};function ft(X,et,Mt){Mt===null?X.matrix.copy(et.matrixWorld):(X.matrix.copy(Mt.matrixWorld),X.matrix.invert(),X.matrix.multiply(et.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(et.projectionMatrix),X.projectionMatrixInverse.copy(et.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=ji*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return g},this.getFoveation=function(){if(!(p===null&&m===null))return c},this.setFoveation=function(X){c=X,p!==null&&(p.fixedFoveation=X),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=X)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(g)};let pt=null;function Gt(X,et){if(h=et.getViewerPose(l||o),_=et,h!==null){const Mt=h.views;m!==null&&(t.setRenderTargetFramebuffer(b,m.framebuffer),t.setRenderTarget(b));let lt=!1;Mt.length!==g.cameras.length&&(g.cameras.length=0,lt=!0);for(let Pt=0;Pt<Mt.length;Pt++){const Ft=Mt[Pt];let Ht=null;if(m!==null)Ht=m.getViewport(Ft);else{const w=f.getViewSubImage(p,Ft);Ht=w.viewport,Pt===0&&(t.setRenderTargetTextures(b,w.colorTexture,p.ignoreDepthValues?void 0:w.depthStencilTexture),t.setRenderTarget(b))}let j=W[Pt];j===void 0&&(j=new Ve,j.layers.enable(Pt),j.viewport=new te,W[Pt]=j),j.matrix.fromArray(Ft.transform.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale),j.projectionMatrix.fromArray(Ft.projectionMatrix),j.projectionMatrixInverse.copy(j.projectionMatrix).invert(),j.viewport.set(Ht.x,Ht.y,Ht.width,Ht.height),Pt===0&&(g.matrix.copy(j.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale)),lt===!0&&g.cameras.push(j)}const Lt=s.enabledFeatures;if(Lt&&Lt.includes("depth-sensing")){const Pt=f.getDepthInformation(Mt[0]);Pt&&Pt.isValid&&Pt.texture&&x.init(t,Pt,s.renderState)}}for(let Mt=0;Mt<M.length;Mt++){const lt=E[Mt],Lt=M[Mt];lt!==null&&Lt!==void 0&&Lt.update(lt,et,l||o)}pt&&pt(X,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),_=null}const Yt=new tl;Yt.setAnimationLoop(Gt),this.setAnimationLoop=function(X){pt=X},this.dispose=function(){}}}const Vn=new an,Km=new se;function jm(i,t){function e(u,d){u.matrixAutoUpdate===!0&&u.updateMatrix(),d.value.copy(u.matrix)}function n(u,d){d.color.getRGB(u.fogColor.value,Jc(i)),d.isFog?(u.fogNear.value=d.near,u.fogFar.value=d.far):d.isFogExp2&&(u.fogDensity.value=d.density)}function s(u,d,b,M,E){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(u,d):d.isMeshToonMaterial?(r(u,d),f(u,d)):d.isMeshPhongMaterial?(r(u,d),h(u,d)):d.isMeshStandardMaterial?(r(u,d),p(u,d),d.isMeshPhysicalMaterial&&m(u,d,E)):d.isMeshMatcapMaterial?(r(u,d),_(u,d)):d.isMeshDepthMaterial?r(u,d):d.isMeshDistanceMaterial?(r(u,d),x(u,d)):d.isMeshNormalMaterial?r(u,d):d.isLineBasicMaterial?(o(u,d),d.isLineDashedMaterial&&a(u,d)):d.isPointsMaterial?c(u,d,b,M):d.isSpriteMaterial?l(u,d):d.isShadowMaterial?(u.color.value.copy(d.color),u.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(u,d){u.opacity.value=d.opacity,d.color&&u.diffuse.value.copy(d.color),d.emissive&&u.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(u.map.value=d.map,e(d.map,u.mapTransform)),d.alphaMap&&(u.alphaMap.value=d.alphaMap,e(d.alphaMap,u.alphaMapTransform)),d.bumpMap&&(u.bumpMap.value=d.bumpMap,e(d.bumpMap,u.bumpMapTransform),u.bumpScale.value=d.bumpScale,d.side===Ce&&(u.bumpScale.value*=-1)),d.normalMap&&(u.normalMap.value=d.normalMap,e(d.normalMap,u.normalMapTransform),u.normalScale.value.copy(d.normalScale),d.side===Ce&&u.normalScale.value.negate()),d.displacementMap&&(u.displacementMap.value=d.displacementMap,e(d.displacementMap,u.displacementMapTransform),u.displacementScale.value=d.displacementScale,u.displacementBias.value=d.displacementBias),d.emissiveMap&&(u.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,u.emissiveMapTransform)),d.specularMap&&(u.specularMap.value=d.specularMap,e(d.specularMap,u.specularMapTransform)),d.alphaTest>0&&(u.alphaTest.value=d.alphaTest);const b=t.get(d),M=b.envMap,E=b.envMapRotation;M&&(u.envMap.value=M,Vn.copy(E),Vn.x*=-1,Vn.y*=-1,Vn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Vn.y*=-1,Vn.z*=-1),u.envMapRotation.value.setFromMatrix4(Km.makeRotationFromEuler(Vn)),u.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.reflectivity.value=d.reflectivity,u.ior.value=d.ior,u.refractionRatio.value=d.refractionRatio),d.lightMap&&(u.lightMap.value=d.lightMap,u.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,u.lightMapTransform)),d.aoMap&&(u.aoMap.value=d.aoMap,u.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,u.aoMapTransform))}function o(u,d){u.diffuse.value.copy(d.color),u.opacity.value=d.opacity,d.map&&(u.map.value=d.map,e(d.map,u.mapTransform))}function a(u,d){u.dashSize.value=d.dashSize,u.totalSize.value=d.dashSize+d.gapSize,u.scale.value=d.scale}function c(u,d,b,M){u.diffuse.value.copy(d.color),u.opacity.value=d.opacity,u.size.value=d.size*b,u.scale.value=M*.5,d.map&&(u.map.value=d.map,e(d.map,u.uvTransform)),d.alphaMap&&(u.alphaMap.value=d.alphaMap,e(d.alphaMap,u.alphaMapTransform)),d.alphaTest>0&&(u.alphaTest.value=d.alphaTest)}function l(u,d){u.diffuse.value.copy(d.color),u.opacity.value=d.opacity,u.rotation.value=d.rotation,d.map&&(u.map.value=d.map,e(d.map,u.mapTransform)),d.alphaMap&&(u.alphaMap.value=d.alphaMap,e(d.alphaMap,u.alphaMapTransform)),d.alphaTest>0&&(u.alphaTest.value=d.alphaTest)}function h(u,d){u.specular.value.copy(d.specular),u.shininess.value=Math.max(d.shininess,1e-4)}function f(u,d){d.gradientMap&&(u.gradientMap.value=d.gradientMap)}function p(u,d){u.metalness.value=d.metalness,d.metalnessMap&&(u.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,u.metalnessMapTransform)),u.roughness.value=d.roughness,d.roughnessMap&&(u.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,u.roughnessMapTransform)),d.envMap&&(u.envMapIntensity.value=d.envMapIntensity)}function m(u,d,b){u.ior.value=d.ior,d.sheen>0&&(u.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),u.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(u.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,u.sheenColorMapTransform)),d.sheenRoughnessMap&&(u.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,u.sheenRoughnessMapTransform))),d.clearcoat>0&&(u.clearcoat.value=d.clearcoat,u.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(u.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,u.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(u.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,u.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(u.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,u.clearcoatNormalMapTransform),u.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Ce&&u.clearcoatNormalScale.value.negate())),d.dispersion>0&&(u.dispersion.value=d.dispersion),d.iridescence>0&&(u.iridescence.value=d.iridescence,u.iridescenceIOR.value=d.iridescenceIOR,u.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],u.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(u.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,u.iridescenceMapTransform)),d.iridescenceThicknessMap&&(u.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,u.iridescenceThicknessMapTransform))),d.transmission>0&&(u.transmission.value=d.transmission,u.transmissionSamplerMap.value=b.texture,u.transmissionSamplerSize.value.set(b.width,b.height),d.transmissionMap&&(u.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,u.transmissionMapTransform)),u.thickness.value=d.thickness,d.thicknessMap&&(u.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,u.thicknessMapTransform)),u.attenuationDistance.value=d.attenuationDistance,u.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(u.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(u.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,u.anisotropyMapTransform))),u.specularIntensity.value=d.specularIntensity,u.specularColor.value.copy(d.specularColor),d.specularColorMap&&(u.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,u.specularColorMapTransform)),d.specularIntensityMap&&(u.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,u.specularIntensityMapTransform))}function _(u,d){d.matcap&&(u.matcap.value=d.matcap)}function x(u,d){const b=t.get(d).light;u.referencePosition.value.setFromMatrixPosition(b.matrixWorld),u.nearDistance.value=b.shadow.camera.near,u.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Jm(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,M){const E=M.program;n.uniformBlockBinding(b,E)}function l(b,M){let E=s[b.id];E===void 0&&(_(b),E=h(b),s[b.id]=E,b.addEventListener("dispose",u));const L=M.program;n.updateUBOMapping(b,L);const R=t.render.frame;r[b.id]!==R&&(p(b),r[b.id]=R)}function h(b){const M=f();b.__bindingPointIndex=M;const E=i.createBuffer(),L=b.__size,R=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,L,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,E),E}function f(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(b){const M=s[b.id],E=b.uniforms,L=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let R=0,A=E.length;R<A;R++){const P=Array.isArray(E[R])?E[R]:[E[R]];for(let W=0,g=P.length;W<g;W++){const S=P[W];if(m(S,R,W,L)===!0){const B=S.__offset,F=Array.isArray(S.value)?S.value:[S.value];let G=0;for(let Z=0;Z<F.length;Z++){const H=F[Z],K=x(H);typeof H=="number"||typeof H=="boolean"?(S.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,B+G,S.__data)):H.isMatrix3?(S.__data[0]=H.elements[0],S.__data[1]=H.elements[1],S.__data[2]=H.elements[2],S.__data[3]=0,S.__data[4]=H.elements[3],S.__data[5]=H.elements[4],S.__data[6]=H.elements[5],S.__data[7]=0,S.__data[8]=H.elements[6],S.__data[9]=H.elements[7],S.__data[10]=H.elements[8],S.__data[11]=0):(H.toArray(S.__data,G),G+=K.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,B,S.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(b,M,E,L){const R=b.value,A=M+"_"+E;if(L[A]===void 0)return typeof R=="number"||typeof R=="boolean"?L[A]=R:L[A]=R.clone(),!0;{const P=L[A];if(typeof R=="number"||typeof R=="boolean"){if(P!==R)return L[A]=R,!0}else if(P.equals(R)===!1)return P.copy(R),!0}return!1}function _(b){const M=b.uniforms;let E=0;const L=16;for(let A=0,P=M.length;A<P;A++){const W=Array.isArray(M[A])?M[A]:[M[A]];for(let g=0,S=W.length;g<S;g++){const B=W[g],F=Array.isArray(B.value)?B.value:[B.value];for(let G=0,Z=F.length;G<Z;G++){const H=F[G],K=x(H),V=E%L,ht=V%K.boundary,ft=V+ht;E+=ht,ft!==0&&L-ft<K.storage&&(E+=L-ft),B.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=E,E+=K.storage}}}const R=E%L;return R>0&&(E+=L-R),b.__size=E,b.__cache={},this}function x(b){const M={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(M.boundary=4,M.storage=4):b.isVector2?(M.boundary=8,M.storage=8):b.isVector3||b.isColor?(M.boundary=16,M.storage=12):b.isVector4?(M.boundary=16,M.storage=16):b.isMatrix3?(M.boundary=48,M.storage=48):b.isMatrix4?(M.boundary=64,M.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),M}function u(b){const M=b.target;M.removeEventListener("dispose",u);const E=o.indexOf(M.__bindingPointIndex);o.splice(E,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function d(){for(const b in s)i.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:c,update:l,dispose:d}}class $m{constructor(t={}){const{canvas:e=Bh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const m=new Uint32Array(4),_=new Int32Array(4);let x=null,u=null;const d=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=nn,this.toneMapping=Dn,this.toneMappingExposure=1;const M=this;let E=!1,L=0,R=0,A=null,P=-1,W=null;const g=new te,S=new te;let B=null;const F=new Zt(0);let G=0,Z=e.width,H=e.height,K=1,V=null,ht=null;const ft=new te(0,0,Z,H),pt=new te(0,0,Z,H);let Gt=!1;const Yt=new Jo;let X=!1,et=!1;const Mt=new se,lt=new se,Lt=new C,Pt=new te,Ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ht=!1;function j(){return A===null?K:1}let w=n;function rt(y,I){return e.getContext(y,I)}try{const y={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Bo}`),e.addEventListener("webglcontextlost",$,!1),e.addEventListener("webglcontextrestored",ut,!1),e.addEventListener("webglcontextcreationerror",gt,!1),w===null){const I="webgl2";if(w=rt(I,y),w===null)throw rt(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let st,tt,ot,At,mt,T,v,N,Y,J,q,Tt,at,vt,kt,nt,xt,Ut,Nt,St,Wt,Ot,ee,D;function _t(){st=new ip(w),st.init(),Ot=new Vm(w,st),tt=new Jf(w,st,t,Ot),ot=new zm(w),tt.reverseDepthBuffer&&ot.buffers.depth.setReversed(!0),At=new op(w),mt=new Tm,T=new Gm(w,st,ot,mt,tt,Ot,At),v=new Qf(M),N=new np(M),Y=new du(w),ee=new Kf(w,Y),J=new sp(w,Y,At,ee),q=new cp(w,J,Y,At),Nt=new ap(w,tt,T),nt=new $f(mt),Tt=new Em(M,v,N,st,tt,ee,nt),at=new jm(M,mt),vt=new wm,kt=new Dm(st),Ut=new Zf(M,v,N,ot,q,p,c),xt=new Om(M,q,tt),D=new Jm(w,At,tt,ot),St=new jf(w,st,At),Wt=new rp(w,st,At),At.programs=Tt.programs,M.capabilities=tt,M.extensions=st,M.properties=mt,M.renderLists=vt,M.shadowMap=xt,M.state=ot,M.info=At}_t();const k=new Zm(M,w);this.xr=k,this.getContext=function(){return w},this.getContextAttributes=function(){return w.getContextAttributes()},this.forceContextLoss=function(){const y=st.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=st.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(y){y!==void 0&&(K=y,this.setSize(Z,H,!1))},this.getSize=function(y){return y.set(Z,H)},this.setSize=function(y,I,O=!0){if(k.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Z=y,H=I,e.width=Math.floor(y*K),e.height=Math.floor(I*K),O===!0&&(e.style.width=y+"px",e.style.height=I+"px"),this.setViewport(0,0,y,I)},this.getDrawingBufferSize=function(y){return y.set(Z*K,H*K).floor()},this.setDrawingBufferSize=function(y,I,O){Z=y,H=I,K=O,e.width=Math.floor(y*O),e.height=Math.floor(I*O),this.setViewport(0,0,y,I)},this.getCurrentViewport=function(y){return y.copy(g)},this.getViewport=function(y){return y.copy(ft)},this.setViewport=function(y,I,O,z){y.isVector4?ft.set(y.x,y.y,y.z,y.w):ft.set(y,I,O,z),ot.viewport(g.copy(ft).multiplyScalar(K).round())},this.getScissor=function(y){return y.copy(pt)},this.setScissor=function(y,I,O,z){y.isVector4?pt.set(y.x,y.y,y.z,y.w):pt.set(y,I,O,z),ot.scissor(S.copy(pt).multiplyScalar(K).round())},this.getScissorTest=function(){return Gt},this.setScissorTest=function(y){ot.setScissorTest(Gt=y)},this.setOpaqueSort=function(y){V=y},this.setTransparentSort=function(y){ht=y},this.getClearColor=function(y){return y.copy(Ut.getClearColor())},this.setClearColor=function(){Ut.setClearColor.apply(Ut,arguments)},this.getClearAlpha=function(){return Ut.getClearAlpha()},this.setClearAlpha=function(){Ut.setClearAlpha.apply(Ut,arguments)},this.clear=function(y=!0,I=!0,O=!0){let z=0;if(y){let U=!1;if(A!==null){const it=A.texture.format;U=it===Wo||it===ko||it===Vo}if(U){const it=A.texture.type,dt=it===Mn||it===Zn||it===Ki||it===Ci||it===Ho||it===Go,Et=Ut.getClearColor(),bt=Ut.getClearAlpha(),Dt=Et.r,It=Et.g,wt=Et.b;dt?(m[0]=Dt,m[1]=It,m[2]=wt,m[3]=bt,w.clearBufferuiv(w.COLOR,0,m)):(_[0]=Dt,_[1]=It,_[2]=wt,_[3]=bt,w.clearBufferiv(w.COLOR,0,_))}else z|=w.COLOR_BUFFER_BIT}I&&(z|=w.DEPTH_BUFFER_BIT,w.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),O&&(z|=w.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),w.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",$,!1),e.removeEventListener("webglcontextrestored",ut,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),vt.dispose(),kt.dispose(),mt.dispose(),v.dispose(),N.dispose(),q.dispose(),ee.dispose(),D.dispose(),Tt.dispose(),k.dispose(),k.removeEventListener("sessionstart",aa),k.removeEventListener("sessionend",ca),Fn.stop()};function $(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function ut(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const y=At.autoReset,I=xt.enabled,O=xt.autoUpdate,z=xt.needsUpdate,U=xt.type;_t(),At.autoReset=y,xt.enabled=I,xt.autoUpdate=O,xt.needsUpdate=z,xt.type=U}function gt(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Xt(y){const I=y.target;I.removeEventListener("dispose",Xt),le(I)}function le(y){De(y),mt.remove(y)}function De(y){const I=mt.get(y).programs;I!==void 0&&(I.forEach(function(O){Tt.releaseProgram(O)}),y.isShaderMaterial&&Tt.releaseShaderCache(y))}this.renderBufferDirect=function(y,I,O,z,U,it){I===null&&(I=Ft);const dt=U.isMesh&&U.matrixWorld.determinant()<0,Et=Il(y,I,O,z,U);ot.setMaterial(z,dt);let bt=O.index,Dt=1;if(z.wireframe===!0){if(bt=J.getWireframeAttribute(O),bt===void 0)return;Dt=2}const It=O.drawRange,wt=O.attributes.position;let $t=It.start*Dt,ne=(It.start+It.count)*Dt;it!==null&&($t=Math.max($t,it.start*Dt),ne=Math.min(ne,(it.start+it.count)*Dt)),bt!==null?($t=Math.max($t,0),ne=Math.min(ne,bt.count)):wt!=null&&($t=Math.max($t,0),ne=Math.min(ne,wt.count));const oe=ne-$t;if(oe<0||oe===1/0)return;ee.setup(U,z,Et,O,bt);let Oe,Kt=St;if(bt!==null&&(Oe=Y.get(bt),Kt=Wt,Kt.setIndex(Oe)),U.isMesh)z.wireframe===!0?(ot.setLineWidth(z.wireframeLinewidth*j()),Kt.setMode(w.LINES)):Kt.setMode(w.TRIANGLES);else if(U.isLine){let Rt=z.linewidth;Rt===void 0&&(Rt=1),ot.setLineWidth(Rt*j()),U.isLineSegments?Kt.setMode(w.LINES):U.isLineLoop?Kt.setMode(w.LINE_LOOP):Kt.setMode(w.LINE_STRIP)}else U.isPoints?Kt.setMode(w.POINTS):U.isSprite&&Kt.setMode(w.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)Kt.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(st.get("WEBGL_multi_draw"))Kt.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Rt=U._multiDrawStarts,xe=U._multiDrawCounts,jt=U._multiDrawCount,qe=bt?Y.get(bt).bytesPerElement:1,ni=mt.get(z).currentProgram.getUniforms();for(let Be=0;Be<jt;Be++)ni.setValue(w,"_gl_DrawID",Be),Kt.render(Rt[Be]/qe,xe[Be])}else if(U.isInstancedMesh)Kt.renderInstances($t,oe,U.count);else if(O.isInstancedBufferGeometry){const Rt=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,xe=Math.min(O.instanceCount,Rt);Kt.renderInstances($t,oe,xe)}else Kt.render($t,oe)};function qt(y,I,O){y.transparent===!0&&y.side===_n&&y.forceSinglePass===!1?(y.side=Ce,y.needsUpdate=!0,ss(y,I,O),y.side=In,y.needsUpdate=!0,ss(y,I,O),y.side=_n):ss(y,I,O)}this.compile=function(y,I,O=null){O===null&&(O=y),u=kt.get(O),u.init(I),b.push(u),O.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(u.pushLight(U),U.castShadow&&u.pushShadow(U))}),y!==O&&y.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(u.pushLight(U),U.castShadow&&u.pushShadow(U))}),u.setupLights();const z=new Set;return y.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const it=U.material;if(it)if(Array.isArray(it))for(let dt=0;dt<it.length;dt++){const Et=it[dt];qt(Et,O,U),z.add(Et)}else qt(it,O,U),z.add(it)}),b.pop(),u=null,z},this.compileAsync=function(y,I,O=null){const z=this.compile(y,I,O);return new Promise(U=>{function it(){if(z.forEach(function(dt){mt.get(dt).currentProgram.isReady()&&z.delete(dt)}),z.size===0){U(y);return}setTimeout(it,10)}st.get("KHR_parallel_shader_compile")!==null?it():setTimeout(it,10)})};let Ie=null;function ln(y){Ie&&Ie(y)}function aa(){Fn.stop()}function ca(){Fn.start()}const Fn=new tl;Fn.setAnimationLoop(ln),typeof self<"u"&&Fn.setContext(self),this.setAnimationLoop=function(y){Ie=y,k.setAnimationLoop(y),y===null?Fn.stop():Fn.start()},k.addEventListener("sessionstart",aa),k.addEventListener("sessionend",ca),this.render=function(y,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),k.enabled===!0&&k.isPresenting===!0&&(k.cameraAutoUpdate===!0&&k.updateCamera(I),I=k.getCamera()),y.isScene===!0&&y.onBeforeRender(M,y,I,A),u=kt.get(y,b.length),u.init(I),b.push(u),lt.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),Yt.setFromProjectionMatrix(lt),et=this.localClippingEnabled,X=nt.init(this.clippingPlanes,et),x=vt.get(y,d.length),x.init(),d.push(x),k.enabled===!0&&k.isPresenting===!0){const it=M.xr.getDepthSensingMesh();it!==null&&ir(it,I,-1/0,M.sortObjects)}ir(y,I,0,M.sortObjects),x.finish(),M.sortObjects===!0&&x.sort(V,ht),Ht=k.enabled===!1||k.isPresenting===!1||k.hasDepthSensing()===!1,Ht&&Ut.addToRenderList(x,y),this.info.render.frame++,X===!0&&nt.beginShadows();const O=u.state.shadowsArray;xt.render(O,y,I),X===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=x.opaque,U=x.transmissive;if(u.setupLights(),I.isArrayCamera){const it=I.cameras;if(U.length>0)for(let dt=0,Et=it.length;dt<Et;dt++){const bt=it[dt];ha(z,U,y,bt)}Ht&&Ut.render(y);for(let dt=0,Et=it.length;dt<Et;dt++){const bt=it[dt];la(x,y,bt,bt.viewport)}}else U.length>0&&ha(z,U,y,I),Ht&&Ut.render(y),la(x,y,I);A!==null&&(T.updateMultisampleRenderTarget(A),T.updateRenderTargetMipmap(A)),y.isScene===!0&&y.onAfterRender(M,y,I),ee.resetDefaultState(),P=-1,W=null,b.pop(),b.length>0?(u=b[b.length-1],X===!0&&nt.setGlobalState(M.clippingPlanes,u.state.camera)):u=null,d.pop(),d.length>0?x=d[d.length-1]:x=null};function ir(y,I,O,z){if(y.visible===!1)return;if(y.layers.test(I.layers)){if(y.isGroup)O=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(I);else if(y.isLight)u.pushLight(y),y.castShadow&&u.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||Yt.intersectsSprite(y)){z&&Pt.setFromMatrixPosition(y.matrixWorld).applyMatrix4(lt);const dt=q.update(y),Et=y.material;Et.visible&&x.push(y,dt,Et,O,Pt.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||Yt.intersectsObject(y))){const dt=q.update(y),Et=y.material;if(z&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Pt.copy(y.boundingSphere.center)):(dt.boundingSphere===null&&dt.computeBoundingSphere(),Pt.copy(dt.boundingSphere.center)),Pt.applyMatrix4(y.matrixWorld).applyMatrix4(lt)),Array.isArray(Et)){const bt=dt.groups;for(let Dt=0,It=bt.length;Dt<It;Dt++){const wt=bt[Dt],$t=Et[wt.materialIndex];$t&&$t.visible&&x.push(y,dt,$t,O,Pt.z,wt)}}else Et.visible&&x.push(y,dt,Et,O,Pt.z,null)}}const it=y.children;for(let dt=0,Et=it.length;dt<Et;dt++)ir(it[dt],I,O,z)}function la(y,I,O,z){const U=y.opaque,it=y.transmissive,dt=y.transparent;u.setupLightsView(O),X===!0&&nt.setGlobalState(M.clippingPlanes,O),z&&ot.viewport(g.copy(z)),U.length>0&&is(U,I,O),it.length>0&&is(it,I,O),dt.length>0&&is(dt,I,O),ot.buffers.depth.setTest(!0),ot.buffers.depth.setMask(!0),ot.buffers.color.setMask(!0),ot.setPolygonOffset(!1)}function ha(y,I,O,z){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[z.id]===void 0&&(u.state.transmissionRenderTarget[z.id]=new Kn(1,1,{generateMipmaps:!0,type:st.has("EXT_color_buffer_half_float")||st.has("EXT_color_buffer_float")?ts:Mn,minFilter:qn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Jt.workingColorSpace}));const it=u.state.transmissionRenderTarget[z.id],dt=z.viewport||g;it.setSize(dt.z,dt.w);const Et=M.getRenderTarget();M.setRenderTarget(it),M.getClearColor(F),G=M.getClearAlpha(),G<1&&M.setClearColor(16777215,.5),M.clear(),Ht&&Ut.render(O);const bt=M.toneMapping;M.toneMapping=Dn;const Dt=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),u.setupLightsView(z),X===!0&&nt.setGlobalState(M.clippingPlanes,z),is(y,O,z),T.updateMultisampleRenderTarget(it),T.updateRenderTargetMipmap(it),st.has("WEBGL_multisampled_render_to_texture")===!1){let It=!1;for(let wt=0,$t=I.length;wt<$t;wt++){const ne=I[wt],oe=ne.object,Oe=ne.geometry,Kt=ne.material,Rt=ne.group;if(Kt.side===_n&&oe.layers.test(z.layers)){const xe=Kt.side;Kt.side=Ce,Kt.needsUpdate=!0,ua(oe,O,z,Oe,Kt,Rt),Kt.side=xe,Kt.needsUpdate=!0,It=!0}}It===!0&&(T.updateMultisampleRenderTarget(it),T.updateRenderTargetMipmap(it))}M.setRenderTarget(Et),M.setClearColor(F,G),Dt!==void 0&&(z.viewport=Dt),M.toneMapping=bt}function is(y,I,O){const z=I.isScene===!0?I.overrideMaterial:null;for(let U=0,it=y.length;U<it;U++){const dt=y[U],Et=dt.object,bt=dt.geometry,Dt=z===null?dt.material:z,It=dt.group;Et.layers.test(O.layers)&&ua(Et,I,O,bt,Dt,It)}}function ua(y,I,O,z,U,it){y.onBeforeRender(M,I,O,z,U,it),y.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),U.onBeforeRender(M,I,O,z,y,it),U.transparent===!0&&U.side===_n&&U.forceSinglePass===!1?(U.side=Ce,U.needsUpdate=!0,M.renderBufferDirect(O,I,z,U,y,it),U.side=In,U.needsUpdate=!0,M.renderBufferDirect(O,I,z,U,y,it),U.side=_n):M.renderBufferDirect(O,I,z,U,y,it),y.onAfterRender(M,I,O,z,U,it)}function ss(y,I,O){I.isScene!==!0&&(I=Ft);const z=mt.get(y),U=u.state.lights,it=u.state.shadowsArray,dt=U.state.version,Et=Tt.getParameters(y,U.state,it,I,O),bt=Tt.getProgramCacheKey(Et);let Dt=z.programs;z.environment=y.isMeshStandardMaterial?I.environment:null,z.fog=I.fog,z.envMap=(y.isMeshStandardMaterial?N:v).get(y.envMap||z.environment),z.envMapRotation=z.environment!==null&&y.envMap===null?I.environmentRotation:y.envMapRotation,Dt===void 0&&(y.addEventListener("dispose",Xt),Dt=new Map,z.programs=Dt);let It=Dt.get(bt);if(It!==void 0){if(z.currentProgram===It&&z.lightsStateVersion===dt)return fa(y,Et),It}else Et.uniforms=Tt.getUniforms(y),y.onBeforeCompile(Et,M),It=Tt.acquireProgram(Et,bt),Dt.set(bt,It),z.uniforms=Et.uniforms;const wt=z.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(wt.clippingPlanes=nt.uniform),fa(y,Et),z.needsLights=Nl(y),z.lightsStateVersion=dt,z.needsLights&&(wt.ambientLightColor.value=U.state.ambient,wt.lightProbe.value=U.state.probe,wt.directionalLights.value=U.state.directional,wt.directionalLightShadows.value=U.state.directionalShadow,wt.spotLights.value=U.state.spot,wt.spotLightShadows.value=U.state.spotShadow,wt.rectAreaLights.value=U.state.rectArea,wt.ltc_1.value=U.state.rectAreaLTC1,wt.ltc_2.value=U.state.rectAreaLTC2,wt.pointLights.value=U.state.point,wt.pointLightShadows.value=U.state.pointShadow,wt.hemisphereLights.value=U.state.hemi,wt.directionalShadowMap.value=U.state.directionalShadowMap,wt.directionalShadowMatrix.value=U.state.directionalShadowMatrix,wt.spotShadowMap.value=U.state.spotShadowMap,wt.spotLightMatrix.value=U.state.spotLightMatrix,wt.spotLightMap.value=U.state.spotLightMap,wt.pointShadowMap.value=U.state.pointShadowMap,wt.pointShadowMatrix.value=U.state.pointShadowMatrix),z.currentProgram=It,z.uniformsList=null,It}function da(y){if(y.uniformsList===null){const I=y.currentProgram.getUniforms();y.uniformsList=Bs.seqWithValue(I.seq,y.uniforms)}return y.uniformsList}function fa(y,I){const O=mt.get(y);O.outputColorSpace=I.outputColorSpace,O.batching=I.batching,O.batchingColor=I.batchingColor,O.instancing=I.instancing,O.instancingColor=I.instancingColor,O.instancingMorph=I.instancingMorph,O.skinning=I.skinning,O.morphTargets=I.morphTargets,O.morphNormals=I.morphNormals,O.morphColors=I.morphColors,O.morphTargetsCount=I.morphTargetsCount,O.numClippingPlanes=I.numClippingPlanes,O.numIntersection=I.numClipIntersection,O.vertexAlphas=I.vertexAlphas,O.vertexTangents=I.vertexTangents,O.toneMapping=I.toneMapping}function Il(y,I,O,z,U){I.isScene!==!0&&(I=Ft),T.resetTextureUnits();const it=I.fog,dt=z.isMeshStandardMaterial?I.environment:null,Et=A===null?M.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Nn,bt=(z.isMeshStandardMaterial?N:v).get(z.envMap||dt),Dt=z.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,It=!!O.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),wt=!!O.morphAttributes.position,$t=!!O.morphAttributes.normal,ne=!!O.morphAttributes.color;let oe=Dn;z.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(oe=M.toneMapping);const Oe=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Kt=Oe!==void 0?Oe.length:0,Rt=mt.get(z),xe=u.state.lights;if(X===!0&&(et===!0||y!==W)){const We=y===W&&z.id===P;nt.setState(z,y,We)}let jt=!1;z.version===Rt.__version?(Rt.needsLights&&Rt.lightsStateVersion!==xe.state.version||Rt.outputColorSpace!==Et||U.isBatchedMesh&&Rt.batching===!1||!U.isBatchedMesh&&Rt.batching===!0||U.isBatchedMesh&&Rt.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Rt.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Rt.instancing===!1||!U.isInstancedMesh&&Rt.instancing===!0||U.isSkinnedMesh&&Rt.skinning===!1||!U.isSkinnedMesh&&Rt.skinning===!0||U.isInstancedMesh&&Rt.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Rt.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Rt.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Rt.instancingMorph===!1&&U.morphTexture!==null||Rt.envMap!==bt||z.fog===!0&&Rt.fog!==it||Rt.numClippingPlanes!==void 0&&(Rt.numClippingPlanes!==nt.numPlanes||Rt.numIntersection!==nt.numIntersection)||Rt.vertexAlphas!==Dt||Rt.vertexTangents!==It||Rt.morphTargets!==wt||Rt.morphNormals!==$t||Rt.morphColors!==ne||Rt.toneMapping!==oe||Rt.morphTargetsCount!==Kt)&&(jt=!0):(jt=!0,Rt.__version=z.version);let qe=Rt.currentProgram;jt===!0&&(qe=ss(z,I,U));let ni=!1,Be=!1,sr=!1;const ae=qe.getUniforms(),yn=Rt.uniforms;if(ot.useProgram(qe.program)&&(ni=!0,Be=!0,sr=!0),z.id!==P&&(P=z.id,Be=!0),ni||W!==y){tt.reverseDepthBuffer?(Mt.copy(y.projectionMatrix),Hh(Mt),Gh(Mt),ae.setValue(w,"projectionMatrix",Mt)):ae.setValue(w,"projectionMatrix",y.projectionMatrix),ae.setValue(w,"viewMatrix",y.matrixWorldInverse);const We=ae.map.cameraPosition;We!==void 0&&We.setValue(w,Lt.setFromMatrixPosition(y.matrixWorld)),tt.logarithmicDepthBuffer&&ae.setValue(w,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ae.setValue(w,"isOrthographic",y.isOrthographicCamera===!0),W!==y&&(W=y,Be=!0,sr=!0)}if(U.isSkinnedMesh){ae.setOptional(w,U,"bindMatrix"),ae.setOptional(w,U,"bindMatrixInverse");const We=U.skeleton;We&&(We.boneTexture===null&&We.computeBoneTexture(),ae.setValue(w,"boneTexture",We.boneTexture,T))}U.isBatchedMesh&&(ae.setOptional(w,U,"batchingTexture"),ae.setValue(w,"batchingTexture",U._matricesTexture,T),ae.setOptional(w,U,"batchingIdTexture"),ae.setValue(w,"batchingIdTexture",U._indirectTexture,T),ae.setOptional(w,U,"batchingColorTexture"),U._colorsTexture!==null&&ae.setValue(w,"batchingColorTexture",U._colorsTexture,T));const rr=O.morphAttributes;if((rr.position!==void 0||rr.normal!==void 0||rr.color!==void 0)&&Nt.update(U,O,qe),(Be||Rt.receiveShadow!==U.receiveShadow)&&(Rt.receiveShadow=U.receiveShadow,ae.setValue(w,"receiveShadow",U.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(yn.envMap.value=bt,yn.flipEnvMap.value=bt.isCubeTexture&&bt.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&I.environment!==null&&(yn.envMapIntensity.value=I.environmentIntensity),Be&&(ae.setValue(w,"toneMappingExposure",M.toneMappingExposure),Rt.needsLights&&Ul(yn,sr),it&&z.fog===!0&&at.refreshFogUniforms(yn,it),at.refreshMaterialUniforms(yn,z,K,H,u.state.transmissionRenderTarget[y.id]),Bs.upload(w,da(Rt),yn,T)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Bs.upload(w,da(Rt),yn,T),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ae.setValue(w,"center",U.center),ae.setValue(w,"modelViewMatrix",U.modelViewMatrix),ae.setValue(w,"normalMatrix",U.normalMatrix),ae.setValue(w,"modelMatrix",U.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const We=z.uniformsGroups;for(let or=0,Fl=We.length;or<Fl;or++){const pa=We[or];D.update(pa,qe),D.bind(pa,qe)}}return qe}function Ul(y,I){y.ambientLightColor.needsUpdate=I,y.lightProbe.needsUpdate=I,y.directionalLights.needsUpdate=I,y.directionalLightShadows.needsUpdate=I,y.pointLights.needsUpdate=I,y.pointLightShadows.needsUpdate=I,y.spotLights.needsUpdate=I,y.spotLightShadows.needsUpdate=I,y.rectAreaLights.needsUpdate=I,y.hemisphereLights.needsUpdate=I}function Nl(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(y,I,O){mt.get(y.texture).__webglTexture=I,mt.get(y.depthTexture).__webglTexture=O;const z=mt.get(y);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=O===void 0,z.__autoAllocateDepthBuffer||st.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(y,I){const O=mt.get(y);O.__webglFramebuffer=I,O.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(y,I=0,O=0){A=y,L=I,R=O;let z=!0,U=null,it=!1,dt=!1;if(y){const bt=mt.get(y);if(bt.__useDefaultFramebuffer!==void 0)ot.bindFramebuffer(w.FRAMEBUFFER,null),z=!1;else if(bt.__webglFramebuffer===void 0)T.setupRenderTarget(y);else if(bt.__hasExternalTextures)T.rebindTextures(y,mt.get(y.texture).__webglTexture,mt.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const wt=y.depthTexture;if(bt.__boundDepthTexture!==wt){if(wt!==null&&mt.has(wt)&&(y.width!==wt.image.width||y.height!==wt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(y)}}const Dt=y.texture;(Dt.isData3DTexture||Dt.isDataArrayTexture||Dt.isCompressedArrayTexture)&&(dt=!0);const It=mt.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(It[I])?U=It[I][O]:U=It[I],it=!0):y.samples>0&&T.useMultisampledRTT(y)===!1?U=mt.get(y).__webglMultisampledFramebuffer:Array.isArray(It)?U=It[O]:U=It,g.copy(y.viewport),S.copy(y.scissor),B=y.scissorTest}else g.copy(ft).multiplyScalar(K).floor(),S.copy(pt).multiplyScalar(K).floor(),B=Gt;if(ot.bindFramebuffer(w.FRAMEBUFFER,U)&&z&&ot.drawBuffers(y,U),ot.viewport(g),ot.scissor(S),ot.setScissorTest(B),it){const bt=mt.get(y.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_CUBE_MAP_POSITIVE_X+I,bt.__webglTexture,O)}else if(dt){const bt=mt.get(y.texture),Dt=I||0;w.framebufferTextureLayer(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,bt.__webglTexture,O||0,Dt)}P=-1},this.readRenderTargetPixels=function(y,I,O,z,U,it,dt){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=mt.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&dt!==void 0&&(Et=Et[dt]),Et){ot.bindFramebuffer(w.FRAMEBUFFER,Et);try{const bt=y.texture,Dt=bt.format,It=bt.type;if(!tt.textureFormatReadable(Dt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!tt.textureTypeReadable(It)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=y.width-z&&O>=0&&O<=y.height-U&&w.readPixels(I,O,z,U,Ot.convert(Dt),Ot.convert(It),it)}finally{const bt=A!==null?mt.get(A).__webglFramebuffer:null;ot.bindFramebuffer(w.FRAMEBUFFER,bt)}}},this.readRenderTargetPixelsAsync=async function(y,I,O,z,U,it,dt){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=mt.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&dt!==void 0&&(Et=Et[dt]),Et){const bt=y.texture,Dt=bt.format,It=bt.type;if(!tt.textureFormatReadable(Dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!tt.textureTypeReadable(It))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(I>=0&&I<=y.width-z&&O>=0&&O<=y.height-U){ot.bindFramebuffer(w.FRAMEBUFFER,Et);const wt=w.createBuffer();w.bindBuffer(w.PIXEL_PACK_BUFFER,wt),w.bufferData(w.PIXEL_PACK_BUFFER,it.byteLength,w.STREAM_READ),w.readPixels(I,O,z,U,Ot.convert(Dt),Ot.convert(It),0);const $t=A!==null?mt.get(A).__webglFramebuffer:null;ot.bindFramebuffer(w.FRAMEBUFFER,$t);const ne=w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE,0);return w.flush(),await zh(w,ne,4),w.bindBuffer(w.PIXEL_PACK_BUFFER,wt),w.getBufferSubData(w.PIXEL_PACK_BUFFER,0,it),w.deleteBuffer(wt),w.deleteSync(ne),it}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(y,I=null,O=0){y.isTexture!==!0&&(Os("WebGLRenderer: copyFramebufferToTexture function signature has changed."),I=arguments[0]||null,y=arguments[1]);const z=Math.pow(2,-O),U=Math.floor(y.image.width*z),it=Math.floor(y.image.height*z),dt=I!==null?I.x:0,Et=I!==null?I.y:0;T.setTexture2D(y,0),w.copyTexSubImage2D(w.TEXTURE_2D,O,0,0,dt,Et,U,it),ot.unbindTexture()},this.copyTextureToTexture=function(y,I,O=null,z=null,U=0){y.isTexture!==!0&&(Os("WebGLRenderer: copyTextureToTexture function signature has changed."),z=arguments[0]||null,y=arguments[1],I=arguments[2],U=arguments[3]||0,O=null);let it,dt,Et,bt,Dt,It;O!==null?(it=O.max.x-O.min.x,dt=O.max.y-O.min.y,Et=O.min.x,bt=O.min.y):(it=y.image.width,dt=y.image.height,Et=0,bt=0),z!==null?(Dt=z.x,It=z.y):(Dt=0,It=0);const wt=Ot.convert(I.format),$t=Ot.convert(I.type);T.setTexture2D(I,0),w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,I.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,I.unpackAlignment);const ne=w.getParameter(w.UNPACK_ROW_LENGTH),oe=w.getParameter(w.UNPACK_IMAGE_HEIGHT),Oe=w.getParameter(w.UNPACK_SKIP_PIXELS),Kt=w.getParameter(w.UNPACK_SKIP_ROWS),Rt=w.getParameter(w.UNPACK_SKIP_IMAGES),xe=y.isCompressedTexture?y.mipmaps[U]:y.image;w.pixelStorei(w.UNPACK_ROW_LENGTH,xe.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,xe.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Et),w.pixelStorei(w.UNPACK_SKIP_ROWS,bt),y.isDataTexture?w.texSubImage2D(w.TEXTURE_2D,U,Dt,It,it,dt,wt,$t,xe.data):y.isCompressedTexture?w.compressedTexSubImage2D(w.TEXTURE_2D,U,Dt,It,xe.width,xe.height,wt,xe.data):w.texSubImage2D(w.TEXTURE_2D,U,Dt,It,it,dt,wt,$t,xe),w.pixelStorei(w.UNPACK_ROW_LENGTH,ne),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,oe),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Oe),w.pixelStorei(w.UNPACK_SKIP_ROWS,Kt),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Rt),U===0&&I.generateMipmaps&&w.generateMipmap(w.TEXTURE_2D),ot.unbindTexture()},this.copyTextureToTexture3D=function(y,I,O=null,z=null,U=0){y.isTexture!==!0&&(Os("WebGLRenderer: copyTextureToTexture3D function signature has changed."),O=arguments[0]||null,z=arguments[1]||null,y=arguments[2],I=arguments[3],U=arguments[4]||0);let it,dt,Et,bt,Dt,It,wt,$t,ne;const oe=y.isCompressedTexture?y.mipmaps[U]:y.image;O!==null?(it=O.max.x-O.min.x,dt=O.max.y-O.min.y,Et=O.max.z-O.min.z,bt=O.min.x,Dt=O.min.y,It=O.min.z):(it=oe.width,dt=oe.height,Et=oe.depth,bt=0,Dt=0,It=0),z!==null?(wt=z.x,$t=z.y,ne=z.z):(wt=0,$t=0,ne=0);const Oe=Ot.convert(I.format),Kt=Ot.convert(I.type);let Rt;if(I.isData3DTexture)T.setTexture3D(I,0),Rt=w.TEXTURE_3D;else if(I.isDataArrayTexture||I.isCompressedArrayTexture)T.setTexture2DArray(I,0),Rt=w.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,I.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,I.unpackAlignment);const xe=w.getParameter(w.UNPACK_ROW_LENGTH),jt=w.getParameter(w.UNPACK_IMAGE_HEIGHT),qe=w.getParameter(w.UNPACK_SKIP_PIXELS),ni=w.getParameter(w.UNPACK_SKIP_ROWS),Be=w.getParameter(w.UNPACK_SKIP_IMAGES);w.pixelStorei(w.UNPACK_ROW_LENGTH,oe.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,oe.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,bt),w.pixelStorei(w.UNPACK_SKIP_ROWS,Dt),w.pixelStorei(w.UNPACK_SKIP_IMAGES,It),y.isDataTexture||y.isData3DTexture?w.texSubImage3D(Rt,U,wt,$t,ne,it,dt,Et,Oe,Kt,oe.data):I.isCompressedArrayTexture?w.compressedTexSubImage3D(Rt,U,wt,$t,ne,it,dt,Et,Oe,oe.data):w.texSubImage3D(Rt,U,wt,$t,ne,it,dt,Et,Oe,Kt,oe),w.pixelStorei(w.UNPACK_ROW_LENGTH,xe),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,jt),w.pixelStorei(w.UNPACK_SKIP_PIXELS,qe),w.pixelStorei(w.UNPACK_SKIP_ROWS,ni),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Be),U===0&&I.generateMipmaps&&w.generateMipmap(Rt),ot.unbindTexture()},this.initRenderTarget=function(y){mt.get(y).__webglFramebuffer===void 0&&T.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?T.setTextureCube(y,0):y.isData3DTexture?T.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?T.setTexture2DArray(y,0):T.setTexture2D(y,0),ot.unbindTexture()},this.resetState=function(){L=0,R=0,A=null,ot.reset(),ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return vn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Xo?"display-p3":"srgb",e.unpackColorSpace=Jt.workingColorSpace===Js?"display-p3":"srgb"}}class al extends ye{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new an,this.environmentIntensity=1,this.environmentRotation=new an,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Qm extends Pe{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class en{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const h=n[s],p=n[s+1]-h,m=(o-h)/p;return(s+m)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new Q:new C);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new C,s=[],r=[],o=[],a=new C,c=new se;for(let m=0;m<=t;m++){const _=m/t;s[m]=this.getTangentAt(_,new C)}r[0]=new C,o[0]=new C;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),f=Math.abs(s[0].y),p=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),f<=l&&(l=f,n.set(0,1,0)),p<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let m=1;m<=t;m++){if(r[m]=r[m-1].clone(),o[m]=o[m-1].clone(),a.crossVectors(s[m-1],s[m]),a.length()>Number.EPSILON){a.normalize();const _=Math.acos(ge(s[m-1].dot(s[m]),-1,1));r[m].applyMatrix4(c.makeRotationAxis(a,_))}o[m].crossVectors(s[m],r[m])}if(e===!0){let m=Math.acos(ge(r[0].dot(r[t]),-1,1));m/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(m=-m);for(let _=1;_<=t;_++)r[_].applyMatrix4(c.makeRotationAxis(s[_],m*_)),o[_].crossVectors(s[_],r[_])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Qo extends en{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new Q){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),p=c-this.aX,m=l-this.aY;c=p*h-m*f+this.aX,l=p*f+m*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class t_ extends Qo{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function ta(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,f){let p=(o-r)/l-(a-r)/(l+h)+(a-o)/h,m=(a-o)/h-(c-o)/(h+f)+(c-a)/f;p*=h,m*=h,s(o,a,p,m)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const ws=new C,Fr=new ta,Or=new ta,Br=new ta;class e_ extends en{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new C){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(ws.subVectors(s[0],s[1]).add(s[0]),l=ws);const f=s[a%r],p=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(ws.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=ws),this.curveType==="centripetal"||this.curveType==="chordal"){const m=this.curveType==="chordal"?.5:.25;let _=Math.pow(l.distanceToSquared(f),m),x=Math.pow(f.distanceToSquared(p),m),u=Math.pow(p.distanceToSquared(h),m);x<1e-4&&(x=1),_<1e-4&&(_=x),u<1e-4&&(u=x),Fr.initNonuniformCatmullRom(l.x,f.x,p.x,h.x,_,x,u),Or.initNonuniformCatmullRom(l.y,f.y,p.y,h.y,_,x,u),Br.initNonuniformCatmullRom(l.z,f.z,p.z,h.z,_,x,u)}else this.curveType==="catmullrom"&&(Fr.initCatmullRom(l.x,f.x,p.x,h.x,this.tension),Or.initCatmullRom(l.y,f.y,p.y,h.y,this.tension),Br.initCatmullRom(l.z,f.z,p.z,h.z,this.tension));return n.set(Fr.calc(c),Or.calc(c),Br.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new C().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function lc(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function n_(i,t){const e=1-i;return e*e*t}function i_(i,t){return 2*(1-i)*i*t}function s_(i,t){return i*i*t}function Xi(i,t,e,n){return n_(i,t)+i_(i,e)+s_(i,n)}function r_(i,t){const e=1-i;return e*e*e*t}function o_(i,t){const e=1-i;return 3*e*e*i*t}function a_(i,t){return 3*(1-i)*i*i*t}function c_(i,t){return i*i*i*t}function Yi(i,t,e,n,s){return r_(i,t)+o_(i,e)+a_(i,n)+c_(i,s)}class cl extends en{constructor(t=new Q,e=new Q,n=new Q,s=new Q){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Q){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Yi(t,s.x,r.x,o.x,a.x),Yi(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class l_ extends en{constructor(t=new C,e=new C,n=new C,s=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new C){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Yi(t,s.x,r.x,o.x,a.x),Yi(t,s.y,r.y,o.y,a.y),Yi(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class ll extends en{constructor(t=new Q,e=new Q){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Q){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Q){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class h_ extends en{constructor(t=new C,e=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new C){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new C){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class hl extends en{constructor(t=new Q,e=new Q,n=new Q){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Q){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Xi(t,s.x,r.x,o.x),Xi(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ul extends en{constructor(t=new C,e=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new C){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Xi(t,s.x,r.x,o.x),Xi(t,s.y,r.y,o.y),Xi(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class dl extends en{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Q){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],f=s[o>s.length-3?s.length-1:o+2];return n.set(lc(a,c.x,l.x,h.x,f.x),lc(a,c.y,l.y,h.y,f.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new Q().fromArray(s))}return this}}var Ys=Object.freeze({__proto__:null,ArcCurve:t_,CatmullRomCurve3:e_,CubicBezierCurve:cl,CubicBezierCurve3:l_,EllipseCurve:Qo,LineCurve:ll,LineCurve3:h_,QuadraticBezierCurve:hl,QuadraticBezierCurve3:ul,SplineCurve:dl});class u_ extends en{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ys[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new Ys[s.type]().fromJSON(s))}return this}}class Jn extends u_{constructor(t){super(),this.type="Path",this.currentPoint=new Q,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new ll(this.currentPoint.clone(),new Q(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new hl(this.currentPoint.clone(),new Q(t,e),new Q(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){const a=new cl(this.currentPoint.clone(),new Q(t,e),new Q(n,s),new Q(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new dl(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){const l=new Qo(t,e,n,s,r,o,a,c);if(this.curves.length>0){const f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class ce extends tn{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],f=[],p=[],m=[];let _=0;const x=[],u=n/2;let d=0;b(),o===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new ve(f,3)),this.setAttribute("normal",new ve(p,3)),this.setAttribute("uv",new ve(m,2));function b(){const E=new C,L=new C;let R=0;const A=(e-t)/n;for(let P=0;P<=r;P++){const W=[],g=P/r,S=g*(e-t)+t;for(let B=0;B<=s;B++){const F=B/s,G=F*c+a,Z=Math.sin(G),H=Math.cos(G);L.x=S*Z,L.y=-g*n+u,L.z=S*H,f.push(L.x,L.y,L.z),E.set(Z,A,H).normalize(),p.push(E.x,E.y,E.z),m.push(F,1-g),W.push(_++)}x.push(W)}for(let P=0;P<s;P++)for(let W=0;W<r;W++){const g=x[W][P],S=x[W+1][P],B=x[W+1][P+1],F=x[W][P+1];t>0&&(h.push(g,S,F),R+=3),e>0&&(h.push(S,B,F),R+=3)}l.addGroup(d,R,0),d+=R}function M(E){const L=_,R=new Q,A=new C;let P=0;const W=E===!0?t:e,g=E===!0?1:-1;for(let B=1;B<=s;B++)f.push(0,u*g,0),p.push(0,g,0),m.push(.5,.5),_++;const S=_;for(let B=0;B<=s;B++){const G=B/s*c+a,Z=Math.cos(G),H=Math.sin(G);A.x=W*H,A.y=u*g,A.z=W*Z,f.push(A.x,A.y,A.z),p.push(0,g,0),R.x=Z*.5+.5,R.y=H*.5*g+.5,m.push(R.x,R.y),_++}for(let B=0;B<s;B++){const F=L+B,G=S+B;E===!0?h.push(G,G+1,F):h.push(G+1,G,F),P+=3}l.addGroup(d,P,E===!0?1:2),d+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ce(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ii extends Jn{constructor(t){super(t),this.uuid=ti(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new Jn().fromJSON(s))}return this}}const d_={triangulate:function(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=fl(i,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,f,p,m;if(n&&(r=g_(i,t,r,e)),i.length>80*e){a=l=i[0],c=h=i[1];for(let _=e;_<s;_+=e)f=i[_],p=i[_+1],f<a&&(a=f),p<c&&(c=p),f>l&&(l=f),p>h&&(h=p);m=Math.max(l-a,h-c),m=m!==0?32767/m:0}return Ji(r,o,e,a,c,m,0),o}};function fl(i,t,e,n,s){let r,o;if(s===R_(i,t,e,n)>0)for(r=t;r<e;r+=n)o=hc(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=hc(r,i[r],i[r+1],o);return o&&er(o,o.next)&&(Qi(o),o=o.next),o}function $n(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(er(e,e.next)||re(e.prev,e,e.next)===0)){if(Qi(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ji(i,t,e,n,s,r,o){if(!i)return;!o&&r&&y_(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?p_(i,n,s,r):f_(i)){t.push(c.i/e|0),t.push(i.i/e|0),t.push(l.i/e|0),Qi(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=m_($n(i),t,e),Ji(i,t,e,n,s,r,2)):o===2&&__(i,t,e,n,s,r):Ji($n(i),t,e,n,s,r,1);break}}}function f_(i){const t=i.prev,e=i,n=i.next;if(re(t,e,n)>=0)return!1;const s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=s<r?s<o?s:o:r<o?r:o,f=a<c?a<l?a:l:c<l?c:l,p=s>r?s>o?s:o:r>o?r:o,m=a>c?a>l?a:l:c>l?c:l;let _=n.next;for(;_!==t;){if(_.x>=h&&_.x<=p&&_.y>=f&&_.y<=m&&Si(s,a,r,c,o,l,_.x,_.y)&&re(_.prev,_,_.next)>=0)return!1;_=_.next}return!0}function p_(i,t,e,n){const s=i.prev,r=i,o=i.next;if(re(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,h=s.y,f=r.y,p=o.y,m=a<c?a<l?a:l:c<l?c:l,_=h<f?h<p?h:p:f<p?f:p,x=a>c?a>l?a:l:c>l?c:l,u=h>f?h>p?h:p:f>p?f:p,d=Lo(m,_,t,e,n),b=Lo(x,u,t,e,n);let M=i.prevZ,E=i.nextZ;for(;M&&M.z>=d&&E&&E.z<=b;){if(M.x>=m&&M.x<=x&&M.y>=_&&M.y<=u&&M!==s&&M!==o&&Si(a,h,c,f,l,p,M.x,M.y)&&re(M.prev,M,M.next)>=0||(M=M.prevZ,E.x>=m&&E.x<=x&&E.y>=_&&E.y<=u&&E!==s&&E!==o&&Si(a,h,c,f,l,p,E.x,E.y)&&re(E.prev,E,E.next)>=0))return!1;E=E.nextZ}for(;M&&M.z>=d;){if(M.x>=m&&M.x<=x&&M.y>=_&&M.y<=u&&M!==s&&M!==o&&Si(a,h,c,f,l,p,M.x,M.y)&&re(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;E&&E.z<=b;){if(E.x>=m&&E.x<=x&&E.y>=_&&E.y<=u&&E!==s&&E!==o&&Si(a,h,c,f,l,p,E.x,E.y)&&re(E.prev,E,E.next)>=0)return!1;E=E.nextZ}return!0}function m_(i,t,e){let n=i;do{const s=n.prev,r=n.next.next;!er(s,r)&&pl(s,n,n.next,r)&&$i(s,r)&&$i(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Qi(n),Qi(n.next),n=i=r),n=n.next}while(n!==i);return $n(n)}function __(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&b_(o,a)){let c=ml(o,a);o=$n(o,o.next),c=$n(c,c.next),Ji(o,t,e,n,s,r,0),Ji(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function g_(i,t,e,n){const s=[];let r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=fl(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(T_(l));for(s.sort(v_),r=0;r<s.length;r++)e=x_(s[r],e);return e}function v_(i,t){return i.x-t.x}function x_(i,t){const e=M_(i,t);if(!e)return t;const n=ml(e,i);return $n(n,n.next),$n(e,e.next)}function M_(i,t){let e=t,n=-1/0,s;const r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const p=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(p<=r&&p>n&&(n=p,s=e.x<e.next.x?e:e.next,p===r))return s}e=e.next}while(e!==t);if(!s)return null;const a=s,c=s.x,l=s.y;let h=1/0,f;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&Si(o<l?r:n,o,c,l,o<l?n:r,o,e.x,e.y)&&(f=Math.abs(o-e.y)/(r-e.x),$i(e,i)&&(f<h||f===h&&(e.x>s.x||e.x===s.x&&S_(s,e)))&&(s=e,h=f)),e=e.next;while(e!==a);return s}function S_(i,t){return re(i.prev,i,t.prev)<0&&re(t.next,i,i.next)<0}function y_(i,t,e,n){let s=i;do s.z===0&&(s.z=Lo(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,E_(s)}function E_(i){let t,e,n,s,r,o,a,c,l=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,l*=2}while(o>1);return i}function Lo(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function T_(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Si(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function b_(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!w_(i,t)&&($i(i,t)&&$i(t,i)&&A_(i,t)&&(re(i.prev,i,t.prev)||re(i,t.prev,t))||er(i,t)&&re(i.prev,i,i.next)>0&&re(t.prev,t,t.next)>0)}function re(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function er(i,t){return i.x===t.x&&i.y===t.y}function pl(i,t,e,n){const s=Rs(re(i,t,e)),r=Rs(re(i,t,n)),o=Rs(re(e,n,i)),a=Rs(re(e,n,t));return!!(s!==r&&o!==a||s===0&&As(i,e,t)||r===0&&As(i,n,t)||o===0&&As(e,i,n)||a===0&&As(e,t,n))}function As(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Rs(i){return i>0?1:i<0?-1:0}function w_(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&pl(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function $i(i,t){return re(i.prev,i,i.next)<0?re(i,t,i.next)>=0&&re(i,i.prev,t)>=0:re(i,t,i.prev)<0||re(i,i.next,t)<0}function A_(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function ml(i,t){const e=new Do(i.i,i.x,i.y),n=new Do(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function hc(i,t,e,n){const s=new Do(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Qi(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Do(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function R_(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class qi{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return qi.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];uc(t),dc(n,t);let o=t.length;e.forEach(uc);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,dc(n,e[c]);const a=d_.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function uc(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function dc(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class Sn extends tn{constructor(t=new Ii([new Q(.5,.5),new Q(-.5,.5),new Q(-.5,-.5),new Q(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){const l=t[a];o(l)}this.setAttribute("position",new ve(s,3)),this.setAttribute("uv",new ve(r,2)),this.computeVertexNormals();function o(a){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,f=e.depth!==void 0?e.depth:1;let p=e.bevelEnabled!==void 0?e.bevelEnabled:!0,m=e.bevelThickness!==void 0?e.bevelThickness:.2,_=e.bevelSize!==void 0?e.bevelSize:m-.1,x=e.bevelOffset!==void 0?e.bevelOffset:0,u=e.bevelSegments!==void 0?e.bevelSegments:3;const d=e.extrudePath,b=e.UVGenerator!==void 0?e.UVGenerator:C_;let M,E=!1,L,R,A,P;d&&(M=d.getSpacedPoints(h),E=!0,p=!1,L=d.computeFrenetFrames(h,!1),R=new C,A=new C,P=new C),p||(u=0,m=0,_=0,x=0);const W=a.extractPoints(l);let g=W.shape;const S=W.holes;if(!qi.isClockWise(g)){g=g.reverse();for(let j=0,w=S.length;j<w;j++){const rt=S[j];qi.isClockWise(rt)&&(S[j]=rt.reverse())}}const F=qi.triangulateShape(g,S),G=g;for(let j=0,w=S.length;j<w;j++){const rt=S[j];g=g.concat(rt)}function Z(j,w,rt){return w||console.error("THREE.ExtrudeGeometry: vec does not exist"),j.clone().addScaledVector(w,rt)}const H=g.length,K=F.length;function V(j,w,rt){let st,tt,ot;const At=j.x-w.x,mt=j.y-w.y,T=rt.x-j.x,v=rt.y-j.y,N=At*At+mt*mt,Y=At*v-mt*T;if(Math.abs(Y)>Number.EPSILON){const J=Math.sqrt(N),q=Math.sqrt(T*T+v*v),Tt=w.x-mt/J,at=w.y+At/J,vt=rt.x-v/q,kt=rt.y+T/q,nt=((vt-Tt)*v-(kt-at)*T)/(At*v-mt*T);st=Tt+At*nt-j.x,tt=at+mt*nt-j.y;const xt=st*st+tt*tt;if(xt<=2)return new Q(st,tt);ot=Math.sqrt(xt/2)}else{let J=!1;At>Number.EPSILON?T>Number.EPSILON&&(J=!0):At<-Number.EPSILON?T<-Number.EPSILON&&(J=!0):Math.sign(mt)===Math.sign(v)&&(J=!0),J?(st=-mt,tt=At,ot=Math.sqrt(N)):(st=At,tt=mt,ot=Math.sqrt(N/2))}return new Q(st/ot,tt/ot)}const ht=[];for(let j=0,w=G.length,rt=w-1,st=j+1;j<w;j++,rt++,st++)rt===w&&(rt=0),st===w&&(st=0),ht[j]=V(G[j],G[rt],G[st]);const ft=[];let pt,Gt=ht.concat();for(let j=0,w=S.length;j<w;j++){const rt=S[j];pt=[];for(let st=0,tt=rt.length,ot=tt-1,At=st+1;st<tt;st++,ot++,At++)ot===tt&&(ot=0),At===tt&&(At=0),pt[st]=V(rt[st],rt[ot],rt[At]);ft.push(pt),Gt=Gt.concat(pt)}for(let j=0;j<u;j++){const w=j/u,rt=m*Math.cos(w*Math.PI/2),st=_*Math.sin(w*Math.PI/2)+x;for(let tt=0,ot=G.length;tt<ot;tt++){const At=Z(G[tt],ht[tt],st);lt(At.x,At.y,-rt)}for(let tt=0,ot=S.length;tt<ot;tt++){const At=S[tt];pt=ft[tt];for(let mt=0,T=At.length;mt<T;mt++){const v=Z(At[mt],pt[mt],st);lt(v.x,v.y,-rt)}}}const Yt=_+x;for(let j=0;j<H;j++){const w=p?Z(g[j],Gt[j],Yt):g[j];E?(A.copy(L.normals[0]).multiplyScalar(w.x),R.copy(L.binormals[0]).multiplyScalar(w.y),P.copy(M[0]).add(A).add(R),lt(P.x,P.y,P.z)):lt(w.x,w.y,0)}for(let j=1;j<=h;j++)for(let w=0;w<H;w++){const rt=p?Z(g[w],Gt[w],Yt):g[w];E?(A.copy(L.normals[j]).multiplyScalar(rt.x),R.copy(L.binormals[j]).multiplyScalar(rt.y),P.copy(M[j]).add(A).add(R),lt(P.x,P.y,P.z)):lt(rt.x,rt.y,f/h*j)}for(let j=u-1;j>=0;j--){const w=j/u,rt=m*Math.cos(w*Math.PI/2),st=_*Math.sin(w*Math.PI/2)+x;for(let tt=0,ot=G.length;tt<ot;tt++){const At=Z(G[tt],ht[tt],st);lt(At.x,At.y,f+rt)}for(let tt=0,ot=S.length;tt<ot;tt++){const At=S[tt];pt=ft[tt];for(let mt=0,T=At.length;mt<T;mt++){const v=Z(At[mt],pt[mt],st);E?lt(v.x,v.y+M[h-1].y,M[h-1].x+rt):lt(v.x,v.y,f+rt)}}}X(),et();function X(){const j=s.length/3;if(p){let w=0,rt=H*w;for(let st=0;st<K;st++){const tt=F[st];Lt(tt[2]+rt,tt[1]+rt,tt[0]+rt)}w=h+u*2,rt=H*w;for(let st=0;st<K;st++){const tt=F[st];Lt(tt[0]+rt,tt[1]+rt,tt[2]+rt)}}else{for(let w=0;w<K;w++){const rt=F[w];Lt(rt[2],rt[1],rt[0])}for(let w=0;w<K;w++){const rt=F[w];Lt(rt[0]+H*h,rt[1]+H*h,rt[2]+H*h)}}n.addGroup(j,s.length/3-j,0)}function et(){const j=s.length/3;let w=0;Mt(G,w),w+=G.length;for(let rt=0,st=S.length;rt<st;rt++){const tt=S[rt];Mt(tt,w),w+=tt.length}n.addGroup(j,s.length/3-j,1)}function Mt(j,w){let rt=j.length;for(;--rt>=0;){const st=rt;let tt=rt-1;tt<0&&(tt=j.length-1);for(let ot=0,At=h+u*2;ot<At;ot++){const mt=H*ot,T=H*(ot+1),v=w+st+mt,N=w+tt+mt,Y=w+tt+T,J=w+st+T;Pt(v,N,Y,J)}}}function lt(j,w,rt){c.push(j),c.push(w),c.push(rt)}function Lt(j,w,rt){Ft(j),Ft(w),Ft(rt);const st=s.length/3,tt=b.generateTopUV(n,s,st-3,st-2,st-1);Ht(tt[0]),Ht(tt[1]),Ht(tt[2])}function Pt(j,w,rt,st){Ft(j),Ft(w),Ft(st),Ft(w),Ft(rt),Ft(st);const tt=s.length/3,ot=b.generateSideWallUV(n,s,tt-6,tt-3,tt-2,tt-1);Ht(ot[0]),Ht(ot[1]),Ht(ot[3]),Ht(ot[1]),Ht(ot[2]),Ht(ot[3])}function Ft(j){s.push(c[j*3+0]),s.push(c[j*3+1]),s.push(c[j*3+2])}function Ht(j){r.push(j.x),r.push(j.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return P_(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];n.push(a)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Ys[s.type]().fromJSON(s)),new Sn(n,t.options)}}const C_={generateTopUV:function(i,t,e,n,s){const r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[s*3],h=t[s*3+1];return[new Q(r,o),new Q(a,c),new Q(l,h)]},generateSideWallUV:function(i,t,e,n,s,r){const o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],f=t[n*3+2],p=t[s*3],m=t[s*3+1],_=t[s*3+2],x=t[r*3],u=t[r*3+1],d=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new Q(o,1-c),new Q(l,1-f),new Q(p,1-_),new Q(x,1-d)]:[new Q(a,1-c),new Q(h,1-f),new Q(m,1-_),new Q(u,1-d)]}};function P_(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class nr extends tn{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new C,f=new C,p=new C;for(let m=0;m<=n;m++)for(let _=0;_<=s;_++){const x=_/s*r,u=m/n*Math.PI*2;f.x=(t+e*Math.cos(u))*Math.cos(x),f.y=(t+e*Math.cos(u))*Math.sin(x),f.z=e*Math.sin(u),a.push(f.x,f.y,f.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),p.subVectors(f,h).normalize(),c.push(p.x,p.y,p.z),l.push(_/s),l.push(m/n)}for(let m=1;m<=n;m++)for(let _=1;_<=s;_++){const x=(s+1)*m+_-1,u=(s+1)*(m-1)+_-1,d=(s+1)*(m-1)+_,b=(s+1)*m+_;o.push(x,u,b),o.push(u,d,b)}this.setIndex(o),this.setAttribute("position",new ve(a,3)),this.setAttribute("normal",new ve(c,3)),this.setAttribute("uv",new ve(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new nr(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class ea extends tn{constructor(t=new ul(new C(-1,-1,0),new C(-1,1,0),new C(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new C,c=new C,l=new Q;let h=new C;const f=[],p=[],m=[],_=[];x(),this.setIndex(_),this.setAttribute("position",new ve(f,3)),this.setAttribute("normal",new ve(p,3)),this.setAttribute("uv",new ve(m,2));function x(){for(let M=0;M<e;M++)u(M);u(r===!1?e:0),b(),d()}function u(M){h=t.getPointAt(M/e,h);const E=o.normals[M],L=o.binormals[M];for(let R=0;R<=s;R++){const A=R/s*Math.PI*2,P=Math.sin(A),W=-Math.cos(A);c.x=W*E.x+P*L.x,c.y=W*E.y+P*L.y,c.z=W*E.z+P*L.z,c.normalize(),p.push(c.x,c.y,c.z),a.x=h.x+n*c.x,a.y=h.y+n*c.y,a.z=h.z+n*c.z,f.push(a.x,a.y,a.z)}}function d(){for(let M=1;M<=e;M++)for(let E=1;E<=s;E++){const L=(s+1)*(M-1)+(E-1),R=(s+1)*M+(E-1),A=(s+1)*M+E,P=(s+1)*(M-1)+E;_.push(L,R,P),_.push(R,A,P)}}function b(){for(let M=0;M<=e;M++)for(let E=0;E<=s;E++)l.x=M/e,l.y=E/s,m.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new ea(new Ys[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Io extends ns{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Zt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=kc,this.normalScale=new Q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class na extends ye{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Zt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const zr=new se,fc=new C,pc=new C;class _l{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Q(512,512),this.map=null,this.mapPass=null,this.matrix=new se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Jo,this._frameExtents=new Q(1,1),this._viewportCount=1,this._viewports=[new te(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;fc.setFromMatrixPosition(t.matrixWorld),e.position.copy(fc),pc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(pc),e.updateMatrixWorld(),zr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(zr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(zr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const mc=new se,zi=new C,Hr=new C;class L_ extends _l{constructor(){super(new Ve(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Q(4,2),this._viewportCount=6,this._viewports=[new te(2,1,1,1),new te(0,1,1,1),new te(3,1,1,1),new te(1,1,1,1),new te(3,0,1,1),new te(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),zi.setFromMatrixPosition(t.matrixWorld),n.position.copy(zi),Hr.copy(n.position),Hr.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Hr),n.updateMatrixWorld(),s.makeTranslation(-zi.x,-zi.y,-zi.z),mc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(mc)}}class D_ extends na{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new L_}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class I_ extends _l{constructor(){super(new el(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ia extends na{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ye.DEFAULT_UP),this.updateMatrix(),this.target=new ye,this.shadow=new I_}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class U_ extends na{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class N_{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=_c(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=_c();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function _c(){return performance.now()}const gc=new se;class F_{constructor(t,e,n=0,s=1/0){this.ray=new Ko(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new jo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return gc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(gc),this}intersectObject(t,e=!0,n=[]){return Uo(t,this,n,e),n.sort(vc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Uo(t[s],this,n,e);return n.sort(vc),n}}function vc(i,t){return i.distance-t.distance}function Uo(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Uo(r[o],t,e,!0)}}class xc{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(ge(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class O_ extends Qn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Bo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Bo);const Mc={type:"change"},sa={type:"start"},gl={type:"end"},Cs=new Ko,Sc=new Cn,B_=Math.cos(70*qo.DEG2RAD),de=new C,Ue=2*Math.PI,Qt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Gr=1e-6;class z_ extends O_{constructor(t,e=null){super(t,e),this.state=Qt.NONE,this.enabled=!0,this.target=new C,this.cursor=new C,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:yi.ROTATE,MIDDLE:yi.DOLLY,RIGHT:yi.PAN},this.touches={ONE:xi.ROTATE,TWO:xi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new C,this._lastQuaternion=new jn,this._lastTargetPosition=new C,this._quat=new jn().setFromUnitVectors(t.up,new C(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new xc,this._sphericalDelta=new xc,this._scale=1,this._panOffset=new C,this._rotateStart=new Q,this._rotateEnd=new Q,this._rotateDelta=new Q,this._panStart=new Q,this._panEnd=new Q,this._panDelta=new Q,this._dollyStart=new Q,this._dollyEnd=new Q,this._dollyDelta=new Q,this._dollyDirection=new C,this._mouse=new Q,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=G_.bind(this),this._onPointerDown=H_.bind(this),this._onPointerUp=V_.bind(this),this._onContextMenu=K_.bind(this),this._onMouseWheel=X_.bind(this),this._onKeyDown=Y_.bind(this),this._onTouchStart=q_.bind(this),this._onTouchMove=Z_.bind(this),this._onMouseDown=k_.bind(this),this._onMouseMove=W_.bind(this),this._interceptControlDown=j_.bind(this),this._interceptControlUp=J_.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Mc),this.update(),this.state=Qt.NONE}update(t=null){const e=this.object.position;de.copy(e).sub(this.target),de.applyQuaternion(this._quat),this._spherical.setFromVector3(de),this.autoRotate&&this.state===Qt.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Ue:n>Math.PI&&(n-=Ue),s<-Math.PI?s+=Ue:s>Math.PI&&(s-=Ue),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(de.setFromSpherical(this._spherical),de.applyQuaternion(this._quatInverse),e.copy(this.target).add(de),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=de.length();o=this._clampDistance(a*this._scale);const c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const a=new C(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new C(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=de.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Cs.origin.copy(this.object.position),Cs.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Cs.direction))<B_?this.object.lookAt(this.target):(Sc.setFromNormalAndCoplanarPoint(this.object.up,this.target),Cs.intersectPlane(Sc,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Gr||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Gr||this._lastTargetPosition.distanceToSquared(this.target)>Gr?(this.dispatchEvent(Mc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ue/60*this.autoRotateSpeed*t:Ue/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){de.setFromMatrixColumn(e,0),de.multiplyScalar(-t),this._panOffset.add(de)}_panUp(t,e){this.screenSpacePanning===!0?de.setFromMatrixColumn(e,1):(de.setFromMatrixColumn(e,0),de.crossVectors(this.object.up,de)),de.multiplyScalar(t),this._panOffset.add(de)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;de.copy(s).sub(this.target);let r=de.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ue*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ue*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(Ue*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-Ue*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(Ue*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-Ue*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ue*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ue*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Q,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function H_(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function G_(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function V_(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(gl),this.state=Qt.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function k_(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case yi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Qt.DOLLY;break;case yi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Qt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Qt.ROTATE}break;case yi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Qt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Qt.PAN}break;default:this.state=Qt.NONE}this.state!==Qt.NONE&&this.dispatchEvent(sa)}function W_(i){switch(this.state){case Qt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Qt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Qt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function X_(i){this.enabled===!1||this.enableZoom===!1||this.state!==Qt.NONE||(i.preventDefault(),this.dispatchEvent(sa),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(gl))}function Y_(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function q_(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case xi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Qt.TOUCH_ROTATE;break;case xi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Qt.TOUCH_PAN;break;default:this.state=Qt.NONE}break;case 2:switch(this.touches.TWO){case xi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Qt.TOUCH_DOLLY_PAN;break;case xi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Qt.TOUCH_DOLLY_ROTATE;break;default:this.state=Qt.NONE}break;default:this.state=Qt.NONE}this.state!==Qt.NONE&&this.dispatchEvent(sa)}function Z_(i){switch(this._trackPointer(i),this.state){case Qt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Qt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Qt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Qt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Qt.NONE}}function K_(i){this.enabled!==!1&&i.preventDefault()}function j_(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function J_(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class $_ extends al{constructor(){super();const t=new Re;t.deleteAttribute("uv");const e=new Io({side:Ce}),n=new Io,s=new D_(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new yt(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const o=new yt(t,n);o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),this.add(o);const a=new yt(t,n);a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),this.add(a);const c=new yt(t,n);c.position.set(6.167,.857,7.803),c.rotation.set(0,.561,0),c.scale.set(3.927,6.285,3.687),this.add(c);const l=new yt(t,n);l.position.set(-2.017,.018,6.124),l.rotation.set(0,.333,0),l.scale.set(2.002,4.566,2.064),this.add(l);const h=new yt(t,n);h.position.set(2.291,-.756,-2.621),h.rotation.set(0,-.286,0),h.scale.set(1.546,1.552,1.496),this.add(h);const f=new yt(t,n);f.position.set(-2.193,-.369,-5.547),f.rotation.set(0,.516,0),f.scale.set(3.875,3.487,2.986),this.add(f);const p=new yt(t,gi(50));p.position.set(-16.116,14.37,8.208),p.scale.set(.1,2.428,2.739),this.add(p);const m=new yt(t,gi(50));m.position.set(-16.109,18.021,-8.207),m.scale.set(.1,2.425,2.751),this.add(m);const _=new yt(t,gi(17));_.position.set(14.904,12.198,-1.832),_.scale.set(.15,4.265,6.331),this.add(_);const x=new yt(t,gi(43));x.position.set(-.462,8.89,14.52),x.scale.set(4.38,5.441,.088),this.add(x);const u=new yt(t,gi(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);const d=new yt(t,gi(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function gi(i){const t=new $s;return t.color.setScalar(i),t}const Ee=Math.PI*2,Ne=(i,t)=>new Q(i*Math.cos(t),i*Math.sin(t));function ra(i,t,e={}){const n=e.add??1,s=e.ded??1.25,r=t*i/2,o=r+t*n,a=Math.max(r-t*s,r*.55),c=Ee/i,l=e.tipF??.1,h=e.rootF??.2,f=new Ii;for(let p=0;p<i;p++){const m=p*c,_=[Ne(a,m-c*.5+(i<16?c*.06:0)),Ne(a,m-c*h),Ne(o,m-c*l),Ne(o,m+c*l),Ne(a,m+c*h)];p===0?f.moveTo(_[0].x,_[0].y):f.lineTo(_[0].x,_[0].y);for(let x=1;x<_.length;x++)f.lineTo(_[x].x,_[x].y)}return f.closePath(),f}function vl(i,t,e,n,s,r){const o=new Jn,a=14;for(let c=0;c<=a;c++){const l=Ne(1,s+(r-s)*c/a),h=i+l.x*n,f=t+l.y*n;c===0?o.moveTo(h,f):o.lineTo(h,f)}for(let c=a;c>=0;c--){const l=Ne(1,s+(r-s)*c/a);o.lineTo(i+l.x*e,t+l.y*e)}return o.closePath(),o}function Q_(i,t,e,n=4){const s=ra(i,t),r=t*i/2+t,o=Math.max(r*.17,.42),a=r*.76;for(let l=0;l<n;l++){const h=l/n*Ee+.1,f=(l+1)/n*Ee-.1;s.holes.push(vl(0,0,o,a,h,f))}const c=new Sn(s,{depth:e,bevelEnabled:!0,bevelThickness:e*.14,bevelSize:e*.12,bevelSegments:1,curveSegments:4});return c.translate(0,0,-e/2),c}function yc(i,t,e){const n=new Sn(ra(i,t,{tipF:.14,rootF:.24,ded:1}),{depth:e,bevelEnabled:!1,curveSegments:3});return n.translate(0,0,-e/2),n}function tg(i,t=15){const e=Ee/t,n=i*.8,s=new Ii;for(let c=0;c<t;c++){const l=c*e,h=[Ne(n,l-e*.4),Ne(i*.995,l-e*.26),Ne(i,l-e*.13),Ne(n,l+e*.03)];c===0?s.moveTo(h[0].x,h[0].y):s.lineTo(h[0].x,h[0].y);for(let f=1;f<h.length;f++)s.lineTo(h[f].x,h[f].y)}s.closePath();const r=i*.16,o=i*.66;for(let c=0;c<5;c++){const l=c/5*Ee+.16,h=(c+1)/5*Ee-.16;s.holes.push(vl(0,0,r,o,l,h))}const a=new Sn(s,{depth:.2,bevelEnabled:!1,curveSegments:4});return a.translate(0,0,-.1),a}function eg(i,t,e){const n=ra(i,t,{tipF:.11,rootF:.2}),s=new Jn;s.absarc(0,0,t*i/2-t*1.9,0,Ee,!0),n.holes.push(s);const r=new Sn(n,{depth:e,bevelEnabled:!0,bevelThickness:.05,bevelSize:.05,bevelSegments:1,curveSegments:4});return r.translate(0,0,-e/2),r}function ng(i,t,e){const n=new Ii;for(let o=0;o<t;o++){const a=o/t*Ee,c=Ee/t,l=[Ne(i*.94,a),Ne(i,a+c*.42),Ne(i*.94,a+c*.5)];o===0?n.moveTo(l[0].x,l[0].y):n.lineTo(l[0].x,l[0].y),n.lineTo(l[1].x,l[1].y),n.lineTo(l[2].x,l[2].y)}n.closePath();const s=new Jn;s.absarc(0,0,i*.16,0,Ee,!0),n.holes.push(s);const r=new Sn(n,{depth:e,bevelEnabled:!1,curveSegments:3});return r.translate(0,0,-e/2),r}function ig(i,t,e){const n=new ue,s=new yt(new ce(i,i,.42,64,1,!0),t);s.rotation.x=Math.PI/2;const r=new yt(new nr(i,.21,12,64),t);n.add(r);for(const a of[-1,1]){const c=new yt(new Re(i*2-.5,.42,.2),t);c.rotation.z=a*Math.PI/4,n.add(c)}const o=new ce(.14,.14,.24,8);for(let a=0;a<14;a++){const c=a/14*Ee+.12,l=new yt(o,e);l.position.set(Math.cos(c)*(i+.1),Math.sin(c)*(i+.1),0),l.rotation.x=Math.PI/2,n.add(l)}return n.userData.rim=r,n}function Ec(i,t,e,n=.035){class s extends en{getPoint(o,a=new C){const c=o*e*Ee,l=i+(t-i)*o;return a.set(l*Math.cos(c),l*Math.sin(c),Math.sin(o*6)*.015)}}return new ea(new s,520,n,6,!1)}function sg(i){const t=[];for(const a of i)for(let c=0;c<26;c++){const l=c/26*Ee;t.push(new Q(a.x+a.r*Math.cos(l),a.y+a.r*Math.sin(l)))}t.sort((a,c)=>a.x-c.x||a.y-c.y);const e=(a,c,l)=>(c.x-a.x)*(l.y-a.y)-(c.y-a.y)*(l.x-a.x),n=[],s=[];for(const a of t){for(;n.length>=2&&e(n[n.length-2],n[n.length-1],a)<=0;)n.pop();n.push(a)}for(let a=t.length-1;a>=0;a--){const c=t[a];for(;s.length>=2&&e(s[s.length-2],s[s.length-1],c)<=0;)s.pop();s.push(c)}const r=n.slice(0,-1).concat(s.slice(0,-1));return new Ii(r)}function rg(i,t,e){const n=sg(i);for(const r of i){if(!r.jewel)continue;const o=new Jn;o.absarc(r.x,r.y,.34,0,Ee,!0),n.holes.push(o)}const s=new Sn(n,{depth:e,bevelEnabled:!0,bevelThickness:.06,bevelSize:.06,bevelSegments:1,curveSegments:6});return s.translate(0,0,-e),s}function og(i,t,e,n){const s=new Ii,r=-i/2,o=-t/2;s.moveTo(r+e,o),s.lineTo(r+i-e,o),s.absarc(r+i-e,o+e,e,-Math.PI/2,0,!1),s.lineTo(r+i,o+t-e),s.absarc(r+i-e,o+t-e,e,0,Math.PI/2,!1),s.lineTo(r+e,o+t),s.absarc(r+e,o+t-e,e,Math.PI/2,Math.PI,!1),s.lineTo(r,o+e),s.absarc(r+e,o+e,e,Math.PI,Math.PI*1.5,!1);for(const c of n){const l=new Jn;l.absarc(c.x,c.y,.4,0,Ee,!0),s.holes.push(l)}const a=new Sn(s,{depth:.6,bevelEnabled:!0,bevelThickness:.08,bevelSize:.1,bevelSegments:2,curveSegments:10});return a.translate(0,0,-.6),a}function ag(){const i=document.createElement("canvas");i.width=i.height=512;const t=i.getContext("2d");t.fillStyle="#b0b0b0",t.fillRect(0,0,512,512);const e=64;for(let s=0;s<512;s+=e){const r=t.createLinearGradient(s,0,s+e,0);r.addColorStop(0,"rgba(255,255,255,0.13)"),r.addColorStop(.45,"rgba(255,255,255,0.02)"),r.addColorStop(.55,"rgba(0,0,0,0.09)"),r.addColorStop(1,"rgba(0,0,0,0.02)"),t.fillStyle=r,t.fillRect(s,0,e,512)}t.globalAlpha=.03;for(let s=0;s<1400;s++)t.fillStyle=Math.random()>.5?"#fff":"#000",t.fillRect(Math.random()*512,Math.random()*512,Math.random()*40,1);t.globalAlpha=1;const n=new Qm(i);return n.wrapS=n.wrapT=Hs,n}function Vr(i,t=.22){const e=new ue,n=new yt(new ce(t,t*.92,.14,16),i);n.rotation.x=Math.PI/2;const s=new yt(new Re(t*1.7,t*.42,.05),i);return s.position.z=.06,e.add(n,s),e.rotation.z=Math.random()*Ee,e}function Ps(i,t=.24,e=.18){const n=new yt(new ce(t,t*.8,e,14),i);return n.rotation.x=Math.PI/2,n}const qs=Math.PI*2,xn=Math.PI/180,cg=(i,t,e)=>{const n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)},Ge={1:.22,2:.18,3:.16,4:.15},Vt={barrel:72,cP:12,cW:64,tP:8,tW:60,fP:8,fW:70,eP:7,esc:15},xl=[{parent:"barrel",child:"center",m:Ge[1],psi:-8*xn},{parent:"center",child:"third",m:Ge[2],psi:-55*xn},{parent:"third",child:"fourth",m:Ge[3],psi:12*xn},{parent:"fourth",child:"escape",m:Ge[4],psi:-95*xn}],Ct={barrel:new Q(-8.6,2.6)};for(const i of xl){const t=i.m*Vt[{barrel:"barrel",center:"cW",third:"tW",fourth:"fW"}[i.parent]]/2+i.m*Vt[{center:"cP",third:"tP",fourth:"fP",escape:"eP"}[i.child]]/2;i.d=t,Ct[i.child]=new Q(Ct[i.parent].x+t*Math.cos(i.psi),Ct[i.parent].y+t*Math.sin(i.psi))}const rn=Ct.escape,No=3.1,Zi=3.6,Tc=197*xn,Ae=new Q(rn.x+No*Math.cos(Tc),rn.y+No*Math.sin(Tc)),bc=233*xn,fe=new Q(Ae.x+Zi*Math.cos(bc),Ae.y+Zi*Math.sin(bc)),lg=Math.atan2(rn.y-Ae.y,rn.x-Ae.x),kr=Math.atan2(Ae.y-fe.y,Ae.x-fe.x),hg={escape:1,fourth:Vt.eP/Vt.fW,third:Vt.eP/Vt.fW*(Vt.fP/Vt.tW),center:Vt.eP/Vt.fW*(Vt.fP/Vt.tW)*(Vt.tP/Vt.cW),barrel:Vt.eP/Vt.fW*(Vt.fP/Vt.tW)*(Vt.tP/Vt.cW)*(Vt.cP/Vt.barrel)},ug={escape:1,fourth:-1,third:1,center:-1,barrel:1},dg=5,fg=270*xn;function pg(){const i={barrel:0};for(const t of xl){const e=Vt[{barrel:"barrel",center:"cW",third:"tW",fourth:"fW"}[t.parent]],n=Vt[{center:"cP",third:"tP",fourth:"fP",escape:"eP"}[t.child]],s=qs/e,r=qs/n;i[t.child]=t.psi+Math.PI+r*(.5-(i[t.parent]-t.psi)/s)}return i}const mg=pg(),Ml={barrel:{name:"发条盒",en:"Mainspring Barrel",desc:"机芯的动力来源。盒内盘绕的长发条上紧后持续回弹，推动条盒轮缓慢旋转，是把“储存的能量”变成“转动的力”的第一级。条盒外缘的齿带动中心轮瓣，走时的全部能量都从这里流出。",stats:["72 齿","约 6 小时/圈","6 : 1 → 中心轮"]},ratchet:{name:"大钢轮",en:"Ratchet Wheel",desc:"上弦时随条盒轴转动、把力传给发条内钩的棘轮。运行中它被条夹板上的棘爪(千斤)顶住不动，使发条无法倒转松开——你看到它静止，正是因为机芯正在正常走时。",stats:["棘轮","仅上弦时转动","棘爪止逆"]},center:{name:"中心轮",en:"Center Wheel",desc:"轮系第二级，轮片驱动三轮瓣，同轴的小齿瓣被条盒轮驱动。在完整机芯中它的轴穿过表盘中心，每小时恰好一圈，分针就装在这根轴上。",stats:["轮片 64 齿 / 齿瓣 12","1 圈/小时","8 : 1 → 三轮"]},third:{name:"三轮（过轮）",en:"Third Wheel",desc:"中间的过桥轮，只负责按正确比例继续减速、把旋转传向秒轮。它不连接任何指针，却是传动比链条里不可缺少的一环。",stats:["轮片 60 齿 / 齿瓣 8","1 圈 / 7.5 分钟","7.5 : 1 → 四轮"]},fourth:{name:"四轮（秒轮）",en:"Fourth Wheel",desc:"轮系的最后一级传动轮，每分钟整一圈。在传统机芯上，秒针装在这根轴上——表盘 6 点位的小秒盘就由它驱动。你看它带动的细长秒针，正是“每秒一格”的来源。",stats:["轮片 70 齿 / 齿瓣 8","1 圈/分钟","10 : 1 → 擒纵轮"]},escape:{name:"擒纵轮",en:"Escape Wheel",desc:"轮系的出口。它的尖齿被擒纵叉一卡一放，把连续旋转切成一个个微小的“步进”，并在每次释放时给摆轮补一次冲量。没有这一级，发条的力矩会一口气泄光。",stats:["15 齿","1 圈 / 6 秒","每齿 2 拍 · 18000 vph"]},fork:{name:"擒纵叉",en:"Pallet Fork",desc:"马仔。两枚红宝石瓦（进瓦、出瓦）交替楔入擒纵齿：一侧“锁住”轮齿，另一侧被顶开“释放”，同时叉头通过圆盘钉敲击摆轮。它每秒左右摆动 5 次，发出我们熟悉的滴答声。",stats:["红宝石瓦 ×2","摆角约 ±9°","每秒 5 拍"]},balance:{name:"摆轮",en:"Balance Wheel",desc:"机芯的心脏。一根恒弹性的游丝让它始终回到平衡位置，于是摆轮以固定频率往复摆动（这里为每秒 2.5 个来回），像钟摆一样为整台机器提供唯一的“时间基准”。",stats:["摆幅 ±270°","2.5 Hz（18000 vph）","由游丝驱动"]},hairspring:{name:"游丝",en:"Hairspring",desc:"比头发还细的阿基米德螺线弹簧。摆轮每转过来，它就把它推回去；振动周期只取决于它的弹性与摆轮的惯量——这正是机械表走时精度的全部秘密。快慢针拨动它的有效长度即可调校快慢。",stats:["阿基米德螺线","约 5 圈","决定振动频率"]},plate:{name:"主夹板",en:"Main Plate",desc:"机芯的地基。所有齿轮轴的下轴榫都插在它的钻孔里，各零件的位置精度都由它保证。表盘和指针最终也安装在它的正面。",stats:["基础板","黄铜镀铑/金","钻眼轴承"]},bridgeBarrel:{name:"条夹板",en:"Barrel Bridge",desc:"盖住发条盒的桥板，压住条轴上轴榫并承载中心轮的上轴承。上弦机构的棘爪也固定在它上面。大面积的日内瓦条纹是传统机芯的装饰工艺。",stats:["日内瓦条纹","固定条轴","棘爪座"]},bridgeTrain:{name:"轮系夹板",en:"Train Bridge",desc:"一次压住三轮、四轮、擒纵轮与擒纵叉的上轴榫。孔中镶着红宝石轴承，把钢轴榫的摩擦降到极低——机芯标注的“钻数”大多就是这些托钻。",stats:["红宝石轴承 ×4","统一压紧","同轴度基准"]},cock:{name:"摆轮夹板",en:"Balance Cock",desc:"悬臂式的单柱夹板，末端镶有带防震器的摆轮轴承。它是机芯里最重要的桥板：摆轮轴榫极细，全靠它定位与保护。装拆摆轮必须先取下它。",stats:["悬臂结构","防震器轴承","微调摆幅"]}},_g=["barrel","center","third","fourth","escape","fork","balance","hairspring"];function gg(){const i=ag();i.repeat.set(.11,.11);const t=e=>new Io(e);return{brass:t({color:12884554,metalness:1,roughness:.36,envMapIntensity:1.15}),brassBright:t({color:13938528,metalness:1,roughness:.24,envMapIntensity:1.3}),steel:t({color:11975878,metalness:1,roughness:.32,envMapIntensity:1.1}),blued:t({color:2573724,metalness:.85,roughness:.25,envMapIntensity:1.3}),ruby:t({color:12587076,metalness:.15,roughness:.15,emissive:5374747,emissiveIntensity:.7}),plate:t({color:11899468,metalness:.95,roughness:.45,map:i,envMapIntensity:1.05}),dark:t({color:5853244,metalness:.9,roughness:.6})}}function vg(){const i=new ue,t=gg(),e={},n={};function s(x,u,d,b){u.traverse(E=>{E.isMesh&&(E.userData.part=x)});const M=new Map;u.traverse(E=>{E.isMesh&&(M.has(E.material)||M.set(E.material,E.material.clone()),E.material=M.get(E.material))}),e[x]={group:u,mats:[...M.values()],focus:d,radius:b},i.add(u)}const r=(x,u,d)=>{const b=new ue;return b.position.set(x,u,d),b};{const d=Object.values(Ct).concat([Ae,fe]).map(L=>({x:L.x+.76,y:L.y+3.55})),b=r(-.76,-3.55,.1),M=new yt(og(34.6,31.2,7.5,d),t.plate);M.castShadow=M.receiveShadow=!0,b.add(M);for(const[L,R]of[[-14.5,-12.5],[13.5,-11.5],[14.2,10.5],[-13.5,11.5],[0,14.5],[-1,-14.8]]){const A=Vr(t.steel,.3);A.position.set(L,R,.24),b.add(A)}for(const L of["center","third","fourth","escape"]){const R=Ps(t.ruby,.26,.16);R.position.set(Ct[L].x,Ct[L].y,.2),b.add(R)}const E=Ps(t.ruby,.22,.14);E.position.set(Ae.x,Ae.y,.2),b.add(E),s("plate",b,new C(0,0,-.2),19)}{const x=r(Ct.barrel.x,Ct.barrel.y,0),u=new ue,d=Ge[1]*Vt.barrel/2,b=new yt(new ce(d-.42,d-.42,1.7,72,1,!0),t.brass);b.rotation.x=Math.PI/2,b.position.z=.95,b.castShadow=!0;const M=new yt(new ce(d-.42,d-.42,.16,72),t.brassBright);M.rotation.x=Math.PI/2,M.position.z=.18;const E=new yt(eg(Vt.barrel,Ge[1],.5),t.brass);E.position.z=.9,E.castShadow=!0;const L=new yt(Ec(1,d-.6,6,.16),t.dark);L.position.z=1,u.add(b,M,E,L);const R=new yt(new ce(.3,.3,2.3,16),t.steel);R.rotation.x=Math.PI/2,R.position.z=1;const A=new yt(ng(4.9,64,.18),t.steel);A.position.z=1.98,A.castShadow=!0;const P=new yt(new ce(.55,.62,.2,20),t.blued);P.rotation.x=Math.PI/2,P.position.z=2.12,u.add(R,A,P),x.add(u),n.barrel=u,s("barrel",x,new C(Ct.barrel.x,Ct.barrel.y,1),8.2);const W=new ue;W.position.z=0;const g=new yt(new Re(1.7,.5,.16),t.steel);g.position.set(Ct.barrel.x+3.2,Ct.barrel.y+5.6,2.2),g.rotation.z=.6;const S=Vr(t.blued,.26);S.position.set(Ct.barrel.x+2.3,Ct.barrel.y+6.3,2.28),W.add(g,S);const B=new yt(new ce(4.9,4.9,.04,40),new $s({transparent:!0,opacity:0,depthWrite:!1}));B.rotation.x=Math.PI/2,B.position.set(Ct.barrel.x,Ct.barrel.y,2.08),W.add(B),s("ratchet",W,new C(Ct.barrel.x,Ct.barrel.y,2),5)}function o(x,u){const d=r(Ct[x].x,Ct[x].y,0),b=new ue,M=new yt(Q_(u.wN,u.wM,u.th??.26,u.spokes??4),t.brass);M.position.z=u.wZ,M.castShadow=!0;const E=new yt(yc(u.pN,u.pM,u.pH),t.steel);E.position.z=u.pZ,E.castShadow=!0;const L=new yt(new ce(.13,.13,u.shaftH,10),t.steel);return L.rotation.x=Math.PI/2,L.position.z=u.shaftZ,b.add(M,E,L),d.add(b),n[x]=b,{g:d,wheel:M,pin:E}}o("center",{wN:Vt.cW,wM:Ge[2],wZ:2.3,pN:Vt.cP,pM:Ge[1],pH:1.5,pZ:.9,shaftH:3.4,shaftZ:1.7}),o("third",{wN:Vt.tW,wM:Ge[3],wZ:1.15,pN:Vt.tP,pM:Ge[2],pH:1.3,pZ:2.3,shaftH:2.9,shaftZ:1.9}),o("fourth",{wN:Vt.fW,wM:Ge[4],wZ:2.9,pN:Vt.fP,pM:Ge[3],pH:1.2,pZ:1.15,shaftH:3.1,shaftZ:2});{const x=new ue;x.position.z=3.14;const u=new yt(new Re(4.1,.16,.06),t.blued);u.position.x=2.05;const d=new yt(new ce(.3,.34,.14,14),t.blued);d.rotation.x=Math.PI/2,x.add(u,d),n.fourth.add(x)}for(const x of["center","third","fourth"])s(x,n[x].parent,new C(Ct[x].x,Ct[x].y,2),5.4);{const x=r(rn.x,rn.y,0),u=new ue,d=new yt(tg(2.3,Vt.esc),t.steel);d.position.z=1.85,d.castShadow=!0;const b=new yt(yc(Vt.eP,Ge[4],.68),t.steel);b.position.z=2.9;const M=new yt(new ce(.11,.11,3.3,10),t.steel);M.rotation.x=Math.PI/2,M.position.z=2,u.add(d,b,M),x.add(u),n.escape=u,n.escWheel=d,s("escape",x,new C(rn.x,rn.y,1.9),2.6)}{const x=r(Ae.x,Ae.y,0),u=new ue,d=new ue;d.position.z=1.95;const b=t.steel,M=new yt(new ce(.3,.3,.22,14),b);M.rotation.x=Math.PI/2,d.add(M);const E=33*xn,L=2.42;for(const S of[-1,1]){const B=Math.PI-S*E,F=No+L*Math.cos(B),G=L*Math.sin(B),Z=Math.hypot(F,G),H=Math.atan2(G,F),K=new yt(new Re(Z,.3,.2),b);K.position.set(F/2,G/2,0),K.rotation.z=H,K.castShadow=!0;const V=new yt(new Re(.5,.2,.3),t.ruby);V.position.set(F,G,0),V.rotation.z=H-S*.24,d.add(K,V)}const R=new yt(new Re(Zi-.4,.26,.2),b);R.position.x=-3.2/2,R.castShadow=!0;const A=new yt(new Re(.55,.16,.2),b);A.position.set(-Zi+.15,.3,0),A.rotation.z=-.35;const P=A.clone();P.position.y=-.3,P.rotation.z=.35;const W=new yt(new ce(.05,.05,.7,6),b);W.rotation.x=Math.PI/2,W.position.set(-Zi+.05,0,-.2),d.add(R,A,P,W);const g=new yt(new ce(.11,.11,3.4,10),t.steel);g.rotation.x=Math.PI/2,g.position.z=-.15,d.add(g),u.add(d),x.add(u),n.fork=d,s("fork",x,new C(Ae.x,Ae.y,1.9),3.6)}{const x=r(fe.x,fe.y,0),u=new ue;u.position.z=0;const d=new ue;d.position.z=3.7;const b=ig(5,t.brassBright,t.blued);d.add(b);const M=new yt(new ce(.1,.1,3.4,10),t.steel);M.rotation.x=Math.PI/2,M.position.z=3.1;const E=new yt(new ce(.55,.55,.16,18),t.steel);E.rotation.x=Math.PI/2,E.position.z=2.5;const L=new yt(new Re(.16,.34,.3),t.ruby);L.position.set(Math.cos(kr)*.5,Math.sin(kr)*.5,2.5),L.rotation.z=kr;const R=new yt(new ce(.26,.26,.2,12),t.blued);R.rotation.x=Math.PI/2,R.position.z=4.22,u.add(d,M,E,L,R);const A=new ue;A.position.z=4.05;const P=new yt(Ec(.42,4,5,.04),t.blued);A.add(P),u.add(A),x.add(u),n.balance=u,n.hairspring=A,s("balance",u,new C(fe.x,fe.y,3.6),5.4),s("hairspring",A,new C(fe.x,fe.y,4.05),4.2)}const a=[];function c(x,u,d,b,M,E=.55){const L=new yt(new ce(E,E,M-b,16),t.plate);L.rotation.x=Math.PI/2,L.position.set(u,d,(b+M)/2),x.add(L)}function l(x,u,d,b,M,E){const L=new ue,R=new yt(rg(u,d,b),t.plate);R.position.z=d,R.castShadow=R.receiveShadow=!0,L.add(R);for(const P of M){const W=Vr(t.blued,.3);W.position.set(P[0],P[1],d+.06),L.add(W)}for(const P of E||[])c(L,P[0],P[1],.15,d-b);for(const P of u)if(P.jewel){const W=Ps(P.rubyMat??t.ruby,P.jewel,.2);W.position.set(P.x,P.y,d+.04),L.add(W)}const A=u.reduce((P,W)=>P.add(new Q(W.x,W.y)),new Q).multiplyScalar(1/u.length);s(x,L,new C(A.x,A.y,d),6),a.push(L)}l("bridgeBarrel",[{x:Ct.barrel.x,y:Ct.barrel.y,r:7.2},{x:Ct.center.x,y:Ct.center.y,r:1.4,jewel:.3}],2.82,.36,[[Ct.barrel.x-4.4,Ct.barrel.y+4.4],[Ct.barrel.x-4.6,Ct.barrel.y-4.2],[Ct.center.x+.9,Ct.center.y+1]],[[Ct.barrel.x+5.2,Ct.barrel.y+3.9],[Ct.barrel.x+5.2,Ct.barrel.y-3.9],[Ct.barrel.x-5.2,Ct.barrel.y]]),l("bridgeTrain",[{x:Ct.third.x,y:Ct.third.y,r:1.55,jewel:.26},{x:Ct.fourth.x,y:Ct.fourth.y,r:1.6,jewel:.26},{x:rn.x,y:rn.y,r:1.05,jewel:.22},{x:Ae.x,y:Ae.y,r:1,jewel:.22}],3.62,.36,[[(Ct.third.x+Ct.fourth.x)/2,(Ct.third.y+Ct.fourth.y)/2+.6]],[[Ct.third.x-1.2,Ct.third.y-2.2],[Ct.fourth.x+1,Ct.fourth.y+2.6]]),l("cock",[{x:fe.x,y:fe.y,r:1.9,jewel:.34,rubyMat:t.ruby},{x:fe.x+4.4,y:fe.y-2.2,r:1.15}],4.55,.34,[[fe.x+4.4,fe.y-2.2]],[[fe.x+4.4,fe.y-2.2,.5]]);{const x=new ue;x.position.set(fe.x,fe.y,4.62);const u=new yt(new nr(.55,.12,8,24),t.brassBright),d=Ps(t.ruby,.3,.2);d.position.z=.06,x.add(u,d),i.add(x)}let h=0;const f=1/(2*Vt.esc),p=.35*(qs/Vt.esc);function m(x,u,d){d&&(h+=x*dg*u);const b=Math.floor(h),M=h-b,E=cg(.05,.4,M),R=(b+E)*f;for(const g of["barrel","center","third","fourth","escape"])n[g].rotation.z=mg[g]+ug[g]*qs*R*hg[g];n.escWheel.rotation.z=p;const A=b%2===0?-1:1;n.fork.rotation.z=lg+A*(2*E-1)*9*xn;const P=fg*Math.sin(Math.PI*h);n.balance.rotation.z=P,n.hairspring.rotation.z=P/5;const W=1+.05*Math.cos(Math.PI*h);n.hairspring.scale.set(W,W,1)}function _(x){for(const u of a)u.visible=x}return m(0,1,!1),{root:i,parts:e,update:m,setBridgesVisible:_}}const xg=document.getElementById("app"),Te=new $m({antialias:!0,alpha:!0});Te.setPixelRatio(Math.min(window.devicePixelRatio,2));Te.setSize(window.innerWidth,window.innerHeight);Te.toneMapping=Lc;Te.toneMappingExposure=.92;Te.shadowMap.enabled=!0;Te.shadowMap.type=Cc;xg.appendChild(Te.domElement);const ei=new al,cn=vg();ei.add(cn.root);cn.root.rotation.x=0;const Mg=new Co(Te);ei.environment=Mg.fromScene(new $_,.04).texture;const ke=new ia(16773852,1.5);ke.position.set(-14,-10,30);ke.castShadow=!0;ke.shadow.mapSize.set(2048,2048);ke.shadow.camera.left=-24;ke.shadow.camera.right=24;ke.shadow.camera.top=24;ke.shadow.camera.bottom=-24;ke.shadow.camera.near=5;ke.shadow.camera.far=80;ke.shadow.bias=-6e-4;ke.target.position.set(0,-2,0);ei.add(ke,ke.target);const Sl=new ia(12571903,.4);Sl.position.set(18,14,18);ei.add(Sl);const yl=new ia(16767392,.35);yl.position.set(4,-26,-14);ei.add(yl);ei.add(new U_(3354150,.3));const Fe=new Ve(36,window.innerWidth/window.innerHeight,.5,400),Fo=new C(0,-3,1.2),El=new C(-13.5,-63.5,50.5);function Tl(){const i=Math.tan(qo.degToRad(Fe.fov/2)),t=i*Fe.aspect,e=Math.max(24.5/i,23.5/t);Fe.position.copy(Fo).addScaledVector(El.clone().normalize(),e),Le.target.copy(Fo),Le.update()}const Le=new z_(Fe,Te.domElement);Le.enableDamping=!0;Le.dampingFactor=.08;Le.minDistance=8;Le.maxDistance=90;Le.autoRotate=!0;Le.autoRotateSpeed=.5;Le.target.set(0,-3,1.2);Le.update();let bl=!1;Te.domElement.addEventListener("pointerdown",()=>{bl=!0,Le.autoRotate=!1},{passive:!0});let wl=1,zs=!0,Ls=null;const Sg=(i,t)=>{if(i)for(const e of cn.parts[i].mats)e.emissive&&(e.emissive.setHex(e.userDataBase),e.emissiveIntensity=e.userDataInt)};for(const i in cn.parts)for(const t of cn.parts[i].mats)t.emissive&&(t.userDataBase=t.emissive.getHex(),t.userDataInt=t.emissiveIntensity);const yg=document.getElementById("chips");for(const i of _g){const t=document.createElement("button");t.className="chip",t.textContent=Ml[i].name,t.dataset.id=i,t.addEventListener("click",()=>oa(i,!0)),yg.appendChild(t)}const wc=document.getElementById("card"),Eg=document.getElementById("cardName"),Tg=document.getElementById("cardEn"),bg=document.getElementById("cardDesc"),Ac=document.getElementById("cardStats");document.getElementById("cardClose").addEventListener("click",()=>oa(null));const Al=new C,Gi=new C,Rl=new C,Oo=new C;let Vi=1;function wg(i){if(Al.copy(Le.target),Rl.copy(Fe.position),i){const t=cn.parts[i];Gi.copy(t.focus);const e=Math.max(t.radius*2.6,9),n=Fe.position.clone().sub(Le.target).normalize();n.lengthSq()<.01&&n.set(0,-.7,.7).normalize(),n.z=Math.max(n.z,.35),n.normalize(),Oo.copy(Gi).add(n.multiplyScalar(e))}else{Gi.copy(Fo);const t=Math.tan(qo.degToRad(Fe.fov/2)),e=Math.max(24.5/t,23.5/(t*Fe.aspect));Oo.copy(Gi).addScaledVector(El.clone().normalize(),e)}Vi=0}function oa(i,t){if(!(Ls===i&&!i))if(Ls&&Sg(Ls),Ls=i,document.querySelectorAll(".chip").forEach(e=>e.classList.toggle("on",e.dataset.id===i)),!i)wc.classList.remove("show");else{const e=Ml[i];Eg.textContent=e.name,Tg.textContent=e.en,bg.textContent=e.desc,Ac.innerHTML="";for(const n of e.stats){const s=document.createElement("span");s.className="st",s.textContent=n,Ac.appendChild(s)}wc.classList.add("show"),t&&wg(i)}}const Zs=new F_,Ks=new Q;let Cl=0,Pl=0,Ll=0;Te.domElement.addEventListener("pointerdown",i=>{Cl=i.clientX,Pl=i.clientY,Ll=performance.now()});Te.domElement.addEventListener("pointerup",i=>{if(Math.hypot(i.clientX-Cl,i.clientY-Pl)>8||performance.now()-Ll>450)return;Ks.set(i.clientX/window.innerWidth*2-1,-(i.clientY/window.innerHeight)*2+1),Zs.setFromCamera(Ks,Fe);const t=Zs.intersectObjects(cn.root.children,!0);let e=null;for(const n of t)if(n.object.userData.part){e=n.object.userData.part;break}oa(e,!0)});Te.domElement.addEventListener("pointermove",i=>{if(i.pointerType==="touch")return;Ks.set(i.clientX/window.innerWidth*2-1,-(i.clientY/window.innerHeight)*2+1),Zs.setFromCamera(Ks,Fe);const t=Zs.intersectObjects(cn.root.children,!0);let e=null;for(const n of t)if(n.object.userData.part){e=n.object.userData.part;break}Te.domElement.style.cursor=e?"pointer":"grab"},{passive:!0});document.getElementById("btnPause").addEventListener("click",function(){zs=!zs,this.textContent=zs?"⏸":"▶"});document.querySelectorAll("#speedSeg button").forEach(i=>{i.addEventListener("click",()=>{wl=parseFloat(i.dataset.s),document.querySelectorAll("#speedSeg button").forEach(t=>t.classList.toggle("on",t===i))})});document.getElementById("btnBridge").addEventListener("click",function(){const i=this.textContent.includes("隐藏");cn.setBridgesVisible(!i),this.textContent=i?"显示夹板":"隐藏夹板"});window.addEventListener("resize",()=>{Fe.aspect=window.innerWidth/window.innerHeight,Fe.updateProjectionMatrix(),Te.setSize(window.innerWidth,window.innerHeight),bl||Tl()});Tl();const Ag=new N_;function Dl(){requestAnimationFrame(Dl);const i=Math.min(Ag.getDelta(),.05);if(cn.update(i,wl,zs),Vi<1){Vi=Math.min(1,Vi+i*2.2);const t=1-Math.pow(1-Vi,3);Le.target.lerpVectors(Al,Gi,t),Fe.position.lerpVectors(Rl,Oo,t)}Le.update(),Te.render(ei,Fe)}Dl();setTimeout(()=>{const i=document.getElementById("hint");i&&(i.style.opacity="0",setTimeout(()=>i.remove(),1200))},6e3);
