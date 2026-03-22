var Ol=Object.defineProperty;var Bl=(r,t,e)=>t in r?Ol(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var jn=(r,t,e)=>Bl(r,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();class ks{static calculateHexagram(t){if(t.length!==6)throw new Error("6 tosses are required for a complete hexagram.");let e=[],n=[],i=[];return t.forEach((s,o)=>{let a,l,c=!1;switch(s){case 6:a="0",l="1",c=!0;break;case 7:a="1",l="1";break;case 8:a="0",l="0";break;case 9:a="1",l="0",c=!0;break;default:throw new Error(`Invalid coin sum: ${s}. Must be 6, 7, 8, or 9.`)}e.push(a),n.push(l),c&&i.push(o+1)}),{originalBinary:e.join(""),futureBinary:n.join(""),changingLines:i,hasChange:i.length>0}}static findHexagramIdByBinary(t,e){if(!e)return null;const n=e.find(i=>i.binary===t);return n?n.id:null}static getRelatedHexagrams(t){const e=t.substring(1,4),n=t.substring(2,5),i=e+n,s=t.split("").reverse().join(""),o=t.split("").map(a=>a==="1"?"0":"1").join("");return{nuclearBinary:i,invertedBinary:s,oppositeBinary:o}}static getRelation(t,e){var i;return((i={金:{金:"兄弟",水:"子孫",木:"妻財",火:"官鬼",土:"父母"},木:{木:"兄弟",火:"子孫",土:"妻財",金:"官鬼",水:"父母"},水:{水:"兄弟",木:"子孫",火:"妻財",土:"官鬼",金:"父母"},火:{火:"兄弟",土:"子孫",金:"妻財",水:"官鬼",木:"父母"},土:{土:"兄弟",金:"子孫",水:"妻財",木:"官鬼",火:"父母"}}[t])==null?void 0:i[e])||"未知"}static getSixBeasts(t){const e=["青龍","朱雀","勾陳","騰蛇","白虎","玄武"];let n=0;["甲","乙"].includes(t)?n=0:["丙","丁"].includes(t)?n=1:["戊"].includes(t)?n=2:["己"].includes(t)?n=3:["庚","辛"].includes(t)?n=4:["壬","癸"].includes(t)&&(n=5);let i=[];for(let s=0;s<6;s++)i.push(e[(n+s)%6]);return i}}class Rr{static async loadAllHexagrams(){const t=[];for(let n=1;n<=this.HEXAGRAM_COUNT;n++)t.push(fetch(`${this.DATA_PATH}hexagram_${n}.json`).then(i=>i.json()).catch(i=>(console.error(`Failed to load hexagram ${n}:`,i),null)));return(await Promise.all(t)).filter(n=>n!==null)}static async getHexagram(t){try{return await(await fetch(`${this.DATA_PATH}hexagram_${t}.json`)).json()}catch(e){return console.error(`Error loading hexagram ${t}:`,e),null}}}jn(Rr,"DATA_PATH","./yi_data_enhanced/"),jn(Rr,"HEXAGRAM_COUNT",64);class bn{static saveRecord(t){const e=this.getHistory(),n={id:Date.now().toString(),date:new Date().toISOString(),messages:[],...t};return e.unshift(n),localStorage.setItem(this.STORAGE_KEY,JSON.stringify(e)),n.id}static updateMessages(t,e){const n=this.getHistory(),i=n.findIndex(s=>s.id===t);i!==-1&&(n[i].messages=e,localStorage.setItem(this.STORAGE_KEY,JSON.stringify(n)))}static getRecord(t){return this.getHistory().find(n=>n.id===t)}static getHistory(){const t=localStorage.getItem(this.STORAGE_KEY);return t?JSON.parse(t):[]}static clearHistory(){localStorage.removeItem(this.STORAGE_KEY)}static getMonthlyHistory(t,e){return this.getHistory().filter(i=>{const s=new Date(i.date);return s.getFullYear()===t&&s.getMonth()===e})}static getMonthlyStats(t,e,n){const i=this.getMonthlyHistory(t,e),s={金:0,木:0,水:0,火:0,土:0};return i.forEach(o=>{var l;const a=n.find(c=>c.id===o.originalId);if(a&&((l=a.najia_analysis)!=null&&l.palace_wuxing)){const c=a.najia_analysis.palace_wuxing;s[c]!==void 0&&s[c]++}}),{total:i.length,wuxing:s}}}jn(bn,"STORAGE_KEY","iching_journal_history");/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Br="160",zl=0,eo=1,Hl=2,Wa=1,Gl=2,pn=3,Ln=0,Ce=1,mn=2,An=0,gi=1,no=2,io=3,so=4,Vl=5,Gn=100,kl=101,Wl=102,ro=103,oo=104,ql=200,Xl=201,Yl=202,$l=203,Cr=204,Lr=205,jl=206,Kl=207,Zl=208,Jl=209,Ql=210,tc=211,ec=212,nc=213,ic=214,sc=0,rc=1,oc=2,bs=3,ac=4,lc=5,cc=6,hc=7,qa=0,uc=1,dc=2,Rn=0,fc=1,pc=2,mc=3,gc=4,_c=5,vc=6,Xa=300,xi=301,yi=302,Pr=303,Ir=304,Ds=306,Dr=1e3,qe=1001,Nr=1002,Te=1003,ao=1004,Ws=1005,Be=1006,xc=1007,Oi=1008,Cn=1009,yc=1010,Mc=1011,zr=1012,Ya=1013,Tn=1014,wn=1015,Bi=1016,$a=1017,ja=1018,Wn=1020,Sc=1021,Xe=1023,Ec=1024,bc=1025,qn=1026,Mi=1027,Tc=1028,Ka=1029,wc=1030,Za=1031,Ja=1033,qs=33776,Xs=33777,Ys=33778,$s=33779,lo=35840,co=35841,ho=35842,uo=35843,Qa=36196,fo=37492,po=37496,mo=37808,go=37809,_o=37810,vo=37811,xo=37812,yo=37813,Mo=37814,So=37815,Eo=37816,bo=37817,To=37818,wo=37819,Ao=37820,Ro=37821,js=36492,Co=36494,Lo=36495,Ac=36283,Po=36284,Io=36285,Do=36286,tl=3e3,Xn=3001,Rc=3200,Cc=3201,el=0,Lc=1,ze="",ge="srgb",_n="srgb-linear",Hr="display-p3",Ns="display-p3-linear",Ts="linear",Qt="srgb",ws="rec709",As="p3",Kn=7680,No=519,Pc=512,Ic=513,Dc=514,nl=515,Nc=516,Uc=517,Fc=518,Oc=519,Uo=35044,Fo="300 es",Ur=1035,gn=2e3,Rs=2001;class bi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}}const ve=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ks=Math.PI/180,Cs=180/Math.PI;function zi(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ve[r&255]+ve[r>>8&255]+ve[r>>16&255]+ve[r>>24&255]+"-"+ve[t&255]+ve[t>>8&255]+"-"+ve[t>>16&15|64]+ve[t>>24&255]+"-"+ve[e&63|128]+ve[e>>8&255]+"-"+ve[e>>16&255]+ve[e>>24&255]+ve[n&255]+ve[n>>8&255]+ve[n>>16&255]+ve[n>>24&255]).toLowerCase()}function Re(r,t,e){return Math.max(t,Math.min(e,r))}function Bc(r,t){return(r%t+t)%t}function Zs(r,t,e){return(1-e)*r+e*t}function Oo(r){return(r&r-1)===0&&r!==0}function Fr(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Ai(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function we(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class kt{constructor(t=0,e=0){kt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Re(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ht{constructor(t,e,n,i,s,o,a,l,c){Ht.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c)}set(t,e,n,i,s,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],m=n[5],g=n[8],_=i[0],p=i[3],f=i[6],v=i[1],x=i[4],M=i[7],C=i[2],w=i[5],A=i[8];return s[0]=o*_+a*v+l*C,s[3]=o*p+a*x+l*w,s[6]=o*f+a*M+l*A,s[1]=c*_+h*v+d*C,s[4]=c*p+h*x+d*w,s[7]=c*f+h*M+d*A,s[2]=u*_+m*v+g*C,s[5]=u*p+m*x+g*w,s[8]=u*f+m*M+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*s*h+n*a*l+i*s*c-i*o*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=h*o-a*c,u=a*l-h*s,m=c*s-o*l,g=e*d+n*u+i*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=d*_,t[1]=(i*c-h*n)*_,t[2]=(a*n-i*o)*_,t[3]=u*_,t[4]=(h*e-i*l)*_,t[5]=(i*s-a*e)*_,t[6]=m*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Js.makeScale(t,e)),this}rotate(t){return this.premultiply(Js.makeRotation(-t)),this}translate(t,e){return this.premultiply(Js.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Js=new Ht;function il(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function Ls(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function zc(){const r=Ls("canvas");return r.style.display="block",r}const Bo={};function Fi(r){r in Bo||(Bo[r]=!0,console.warn(r))}const zo=new Ht().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Ho=new Ht().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Yi={[_n]:{transfer:Ts,primaries:ws,toReference:r=>r,fromReference:r=>r},[ge]:{transfer:Qt,primaries:ws,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[Ns]:{transfer:Ts,primaries:As,toReference:r=>r.applyMatrix3(Ho),fromReference:r=>r.applyMatrix3(zo)},[Hr]:{transfer:Qt,primaries:As,toReference:r=>r.convertSRGBToLinear().applyMatrix3(Ho),fromReference:r=>r.applyMatrix3(zo).convertLinearToSRGB()}},Hc=new Set([_n,Ns]),$t={enabled:!0,_workingColorSpace:_n,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!Hc.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,t,e){if(this.enabled===!1||t===e||!t||!e)return r;const n=Yi[t].toReference,i=Yi[e].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,t){return this.convert(r,this._workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this._workingColorSpace)},getPrimaries:function(r){return Yi[r].primaries},getTransfer:function(r){return r===ze?Ts:Yi[r].transfer}};function _i(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Qs(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Zn;class sl{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Zn===void 0&&(Zn=Ls("canvas")),Zn.width=t.width,Zn.height=t.height;const n=Zn.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Zn}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ls("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=_i(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(_i(e[n]/255)*255):e[n]=_i(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Gc=0;class rl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Gc++}),this.uuid=zi(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(tr(i[o].image)):s.push(tr(i[o]))}else s=tr(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function tr(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?sl.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Vc=0;class Ne extends bi{constructor(t=Ne.DEFAULT_IMAGE,e=Ne.DEFAULT_MAPPING,n=qe,i=qe,s=Be,o=Oi,a=Xe,l=Cn,c=Ne.DEFAULT_ANISOTROPY,h=ze){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Vc++}),this.uuid=zi(),this.name="",this.source=new rl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new kt(0,0),this.repeat=new kt(1,1),this.center=new kt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Fi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Xn?ge:ze),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Xa)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Dr:t.x=t.x-Math.floor(t.x);break;case qe:t.x=t.x<0?0:1;break;case Nr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Dr:t.y=t.y-Math.floor(t.y);break;case qe:t.y=t.y<0?0:1;break;case Nr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Fi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===ge?Xn:tl}set encoding(t){Fi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===Xn?ge:ze}}Ne.DEFAULT_IMAGE=null;Ne.DEFAULT_MAPPING=Xa;Ne.DEFAULT_ANISOTROPY=1;class me{constructor(t=0,e=0,n=0,i=1){me.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],m=l[5],g=l[9],_=l[2],p=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,M=(m+1)/2,C=(f+1)/2,w=(h+u)/4,A=(d+_)/4,B=(g+p)/4;return x>M&&x>C?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=w/n,s=A/n):M>C?M<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(M),n=w/i,s=B/i):C<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(C),n=A/s,i=B/s),this.set(n,i,s,e),this}let v=Math.sqrt((p-g)*(p-g)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(v)<.001&&(v=1),this.x=(p-g)/v,this.y=(d-_)/v,this.z=(u-h)/v,this.w=Math.acos((c+m+f-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class kc extends bi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new me(0,0,t,e),this.scissorTest=!1,this.viewport=new me(0,0,t,e);const i={width:t,height:e,depth:1};n.encoding!==void 0&&(Fi("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Xn?ge:ze),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Be,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Ne(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new rl(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Yn extends kc{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class ol extends Ne{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Te,this.minFilter=Te,this.wrapR=qe,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Wc extends Ne{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Te,this.minFilter=Te,this.wrapR=qe,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}let Hi=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3];const u=s[o+0],m=s[o+1],g=s[o+2],_=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(a===1){t[e+0]=u,t[e+1]=m,t[e+2]=g,t[e+3]=_;return}if(d!==_||l!==u||c!==m||h!==g){let p=1-a;const f=l*u+c*m+h*g+d*_,v=f>=0?1:-1,x=1-f*f;if(x>Number.EPSILON){const C=Math.sqrt(x),w=Math.atan2(C,f*v);p=Math.sin(p*w)/C,a=Math.sin(a*w)/C}const M=a*v;if(l=l*p+u*M,c=c*p+m*M,h=h*p+g*M,d=d*p+_*M,p===1-a){const C=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=C,c*=C,h*=C,d*=C}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=s[o],u=s[o+1],m=s[o+2],g=s[o+3];return t[e]=a*g+h*d+l*m-c*u,t[e+1]=l*g+h*u+c*d-a*m,t[e+2]=c*g+h*m+a*u-l*d,t[e+3]=h*g-a*d-l*u-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),d=a(s/2),u=l(n/2),m=l(i/2),g=l(s/2);switch(o){case"XYZ":this._x=u*h*d+c*m*g,this._y=c*m*d-u*h*g,this._z=c*h*g+u*m*d,this._w=c*h*d-u*m*g;break;case"YXZ":this._x=u*h*d+c*m*g,this._y=c*m*d-u*h*g,this._z=c*h*g-u*m*d,this._w=c*h*d+u*m*g;break;case"ZXY":this._x=u*h*d-c*m*g,this._y=c*m*d+u*h*g,this._z=c*h*g+u*m*d,this._w=c*h*d-u*m*g;break;case"ZYX":this._x=u*h*d-c*m*g,this._y=c*m*d+u*h*g,this._z=c*h*g-u*m*d,this._w=c*h*d+u*m*g;break;case"YZX":this._x=u*h*d+c*m*g,this._y=c*m*d+u*h*g,this._z=c*h*g-u*m*d,this._w=c*h*d-u*m*g;break;case"XZY":this._x=u*h*d-c*m*g,this._y=c*m*d-u*h*g,this._z=c*h*g+u*m*d,this._w=c*h*d+u*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){const m=.5/Math.sqrt(u+1);this._w=.25/m,this._x=(h-l)*m,this._y=(s-c)*m,this._z=(o-i)*m}else if(n>a&&n>d){const m=2*Math.sqrt(1+n-a-d);this._w=(h-l)/m,this._x=.25*m,this._y=(i+o)/m,this._z=(s+c)/m}else if(a>d){const m=2*Math.sqrt(1+a-n-d);this._w=(s-c)/m,this._x=(i+o)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+d-n-a);this._w=(o-i)/m,this._x=(s+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Re(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-s*l,this._y=i*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const m=1-e;return this._w=m*o+e*this._w,this._x=m*n+e*this._x,this._y=m*i+e*this._y,this._z=m*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=o*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=s*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(e*Math.cos(i),n*Math.sin(s),n*Math.cos(s),e*Math.sin(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};class H{constructor(t=0,e=0,n=0){H.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Go.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Go.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-s*i),d=2*(s*n-o*e);return this.x=e+l*c+o*d-a*h,this.y=n+l*h+a*c-s*d,this.z=i+l*d+s*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return er.copy(this).projectOnVector(t),this.sub(er)}reflect(t){return this.sub(er.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Re(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const er=new H,Go=new Hi;class Gi{constructor(t=new H(1/0,1/0,1/0),e=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(He.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(He.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=He.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,He):He.fromBufferAttribute(s,o),He.applyMatrix4(t.matrixWorld),this.expandByPoint(He);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),$i.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),$i.copy(n.boundingBox)),$i.applyMatrix4(t.matrixWorld),this.union($i)}const i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,He),He.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ri),ji.subVectors(this.max,Ri),Jn.subVectors(t.a,Ri),Qn.subVectors(t.b,Ri),ti.subVectors(t.c,Ri),vn.subVectors(Qn,Jn),xn.subVectors(ti,Qn),Nn.subVectors(Jn,ti);let e=[0,-vn.z,vn.y,0,-xn.z,xn.y,0,-Nn.z,Nn.y,vn.z,0,-vn.x,xn.z,0,-xn.x,Nn.z,0,-Nn.x,-vn.y,vn.x,0,-xn.y,xn.x,0,-Nn.y,Nn.x,0];return!nr(e,Jn,Qn,ti,ji)||(e=[1,0,0,0,1,0,0,0,1],!nr(e,Jn,Qn,ti,ji))?!1:(Ki.crossVectors(vn,xn),e=[Ki.x,Ki.y,Ki.z],nr(e,Jn,Qn,ti,ji))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,He).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(He).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(sn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const sn=[new H,new H,new H,new H,new H,new H,new H,new H],He=new H,$i=new Gi,Jn=new H,Qn=new H,ti=new H,vn=new H,xn=new H,Nn=new H,Ri=new H,ji=new H,Ki=new H,Un=new H;function nr(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Un.fromArray(r,s);const a=i.x*Math.abs(Un.x)+i.y*Math.abs(Un.y)+i.z*Math.abs(Un.z),l=t.dot(Un),c=e.dot(Un),h=n.dot(Un);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const qc=new Gi,Ci=new H,ir=new H;class Gr{constructor(t=new H,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):qc.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ci.subVectors(t,this.center);const e=Ci.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Ci,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ir.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ci.copy(t.center).add(ir)),this.expandByPoint(Ci.copy(t.center).sub(ir))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const rn=new H,sr=new H,Zi=new H,yn=new H,rr=new H,Ji=new H,or=new H;let Xc=class{constructor(t=new H,e=new H(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,rn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=rn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(rn.copy(this.origin).addScaledVector(this.direction,e),rn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){sr.copy(t).add(e).multiplyScalar(.5),Zi.copy(e).sub(t).normalize(),yn.copy(this.origin).sub(sr);const s=t.distanceTo(e)*.5,o=-this.direction.dot(Zi),a=yn.dot(this.direction),l=-yn.dot(Zi),c=yn.lengthSq(),h=Math.abs(1-o*o);let d,u,m,g;if(h>0)if(d=o*l-a,u=o*a-l,g=s*h,d>=0)if(u>=-g)if(u<=g){const _=1/h;d*=_,u*=_,m=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=s,d=Math.max(0,-(o*u+a)),m=-d*d+u*(u+2*l)+c;else u=-s,d=Math.max(0,-(o*u+a)),m=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-o*s+a)),u=d>0?-s:Math.min(Math.max(-s,-l),s),m=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-s,-l),s),m=u*(u+2*l)+c):(d=Math.max(0,-(o*s+a)),u=d>0?s:Math.min(Math.max(-s,-l),s),m=-d*d+u*(u+2*l)+c);else u=o>0?-s:s,d=Math.max(0,-(o*u+a)),m=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(sr).addScaledVector(Zi,u),m}intersectSphere(t,e){rn.subVectors(t.center,this.origin);const n=rn.dot(this.direction),i=rn.dot(rn)-n*n,s=t.radius*t.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,i=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,i=(t.min.x-u.x)*c),h>=0?(s=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(s=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),d>=0?(a=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,rn)!==null}intersectTriangle(t,e,n,i,s){rr.subVectors(e,t),Ji.subVectors(n,t),or.crossVectors(rr,Ji);let o=this.direction.dot(or),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;yn.subVectors(this.origin,t);const l=a*this.direction.dot(Ji.crossVectors(yn,Ji));if(l<0)return null;const c=a*this.direction.dot(rr.cross(yn));if(c<0||l+c>o)return null;const h=-a*yn.dot(or);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};class ce{constructor(t,e,n,i,s,o,a,l,c,h,d,u,m,g,_,p){ce.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c,h,d,u,m,g,_,p)}set(t,e,n,i,s,o,a,l,c,h,d,u,m,g,_,p){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=i,f[1]=s,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=m,f[7]=g,f[11]=_,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ce().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/ei.setFromMatrixColumn(t,0).length(),s=1/ei.setFromMatrixColumn(t,1).length(),o=1/ei.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),d=Math.sin(s);if(t.order==="XYZ"){const u=o*h,m=o*d,g=a*h,_=a*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=m+g*c,e[5]=u-_*c,e[9]=-a*l,e[2]=_-u*c,e[6]=g+m*c,e[10]=o*l}else if(t.order==="YXZ"){const u=l*h,m=l*d,g=c*h,_=c*d;e[0]=u+_*a,e[4]=g*a-m,e[8]=o*c,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=m*a-g,e[6]=_+u*a,e[10]=o*l}else if(t.order==="ZXY"){const u=l*h,m=l*d,g=c*h,_=c*d;e[0]=u-_*a,e[4]=-o*d,e[8]=g+m*a,e[1]=m+g*a,e[5]=o*h,e[9]=_-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const u=o*h,m=o*d,g=a*h,_=a*d;e[0]=l*h,e[4]=g*c-m,e[8]=u*c+_,e[1]=l*d,e[5]=_*c+u,e[9]=m*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const u=o*l,m=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=_-u*d,e[8]=g*d+m,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=m*d+g,e[10]=u-_*d}else if(t.order==="XZY"){const u=o*l,m=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+_,e[5]=o*h,e[9]=m*d-g,e[2]=g*d-m,e[6]=a*h,e[10]=_*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Yc,t,$c)}lookAt(t,e,n){const i=this.elements;return Pe.subVectors(t,e),Pe.lengthSq()===0&&(Pe.z=1),Pe.normalize(),Mn.crossVectors(n,Pe),Mn.lengthSq()===0&&(Math.abs(n.z)===1?Pe.x+=1e-4:Pe.z+=1e-4,Pe.normalize(),Mn.crossVectors(n,Pe)),Mn.normalize(),Qi.crossVectors(Pe,Mn),i[0]=Mn.x,i[4]=Qi.x,i[8]=Pe.x,i[1]=Mn.y,i[5]=Qi.y,i[9]=Pe.y,i[2]=Mn.z,i[6]=Qi.z,i[10]=Pe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],m=n[13],g=n[2],_=n[6],p=n[10],f=n[14],v=n[3],x=n[7],M=n[11],C=n[15],w=i[0],A=i[4],B=i[8],S=i[12],b=i[1],U=i[5],F=i[9],N=i[13],L=i[2],P=i[6],I=i[10],$=i[14],z=i[3],W=i[7],K=i[11],Z=i[15];return s[0]=o*w+a*b+l*L+c*z,s[4]=o*A+a*U+l*P+c*W,s[8]=o*B+a*F+l*I+c*K,s[12]=o*S+a*N+l*$+c*Z,s[1]=h*w+d*b+u*L+m*z,s[5]=h*A+d*U+u*P+m*W,s[9]=h*B+d*F+u*I+m*K,s[13]=h*S+d*N+u*$+m*Z,s[2]=g*w+_*b+p*L+f*z,s[6]=g*A+_*U+p*P+f*W,s[10]=g*B+_*F+p*I+f*K,s[14]=g*S+_*N+p*$+f*Z,s[3]=v*w+x*b+M*L+C*z,s[7]=v*A+x*U+M*P+C*W,s[11]=v*B+x*F+M*I+C*K,s[15]=v*S+x*N+M*$+C*Z,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],m=t[14],g=t[3],_=t[7],p=t[11],f=t[15];return g*(+s*l*d-i*c*d-s*a*u+n*c*u+i*a*m-n*l*m)+_*(+e*l*m-e*c*u+s*o*u-i*o*m+i*c*h-s*l*h)+p*(+e*c*d-e*a*m-s*o*d+n*o*m+s*a*h-n*c*h)+f*(-i*a*h-e*l*d+e*a*u+i*o*d-n*o*u+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],m=t[11],g=t[12],_=t[13],p=t[14],f=t[15],v=d*p*c-_*u*c+_*l*m-a*p*m-d*l*f+a*u*f,x=g*u*c-h*p*c-g*l*m+o*p*m+h*l*f-o*u*f,M=h*_*c-g*d*c+g*a*m-o*_*m-h*a*f+o*d*f,C=g*d*l-h*_*l-g*a*u+o*_*u+h*a*p-o*d*p,w=e*v+n*x+i*M+s*C;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return t[0]=v*A,t[1]=(_*u*s-d*p*s-_*i*m+n*p*m+d*i*f-n*u*f)*A,t[2]=(a*p*s-_*l*s+_*i*c-n*p*c-a*i*f+n*l*f)*A,t[3]=(d*l*s-a*u*s-d*i*c+n*u*c+a*i*m-n*l*m)*A,t[4]=x*A,t[5]=(h*p*s-g*u*s+g*i*m-e*p*m-h*i*f+e*u*f)*A,t[6]=(g*l*s-o*p*s-g*i*c+e*p*c+o*i*f-e*l*f)*A,t[7]=(o*u*s-h*l*s+h*i*c-e*u*c-o*i*m+e*l*m)*A,t[8]=M*A,t[9]=(g*d*s-h*_*s-g*n*m+e*_*m+h*n*f-e*d*f)*A,t[10]=(o*_*s-g*a*s+g*n*c-e*_*c-o*n*f+e*a*f)*A,t[11]=(h*a*s-o*d*s-h*n*c+e*d*c+o*n*m-e*a*m)*A,t[12]=C*A,t[13]=(h*_*i-g*d*i+g*n*u-e*_*u-h*n*p+e*d*p)*A,t[14]=(g*a*i-o*_*i-g*n*l+e*_*l+o*n*p-e*a*p)*A,t[15]=(o*d*i-h*a*i+h*n*l-e*d*l-o*n*u+e*a*u)*A,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,l=t.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,h=o+o,d=a+a,u=s*c,m=s*h,g=s*d,_=o*h,p=o*d,f=a*d,v=l*c,x=l*h,M=l*d,C=n.x,w=n.y,A=n.z;return i[0]=(1-(_+f))*C,i[1]=(m+M)*C,i[2]=(g-x)*C,i[3]=0,i[4]=(m-M)*w,i[5]=(1-(u+f))*w,i[6]=(p+v)*w,i[7]=0,i[8]=(g+x)*A,i[9]=(p-v)*A,i[10]=(1-(u+_))*A,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=ei.set(i[0],i[1],i[2]).length();const o=ei.set(i[4],i[5],i[6]).length(),a=ei.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],Ge.copy(this);const c=1/s,h=1/o,d=1/a;return Ge.elements[0]*=c,Ge.elements[1]*=c,Ge.elements[2]*=c,Ge.elements[4]*=h,Ge.elements[5]*=h,Ge.elements[6]*=h,Ge.elements[8]*=d,Ge.elements[9]*=d,Ge.elements[10]*=d,e.setFromRotationMatrix(Ge),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,o,a=gn){const l=this.elements,c=2*s/(e-t),h=2*s/(n-i),d=(e+t)/(e-t),u=(n+i)/(n-i);let m,g;if(a===gn)m=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Rs)m=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,o,a=gn){const l=this.elements,c=1/(e-t),h=1/(n-i),d=1/(o-s),u=(e+t)*c,m=(n+i)*h;let g,_;if(a===gn)g=(o+s)*d,_=-2*d;else if(a===Rs)g=s*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ei=new H,Ge=new ce,Yc=new H(0,0,0),$c=new H(1,1,1),Mn=new H,Qi=new H,Pe=new H,Vo=new ce,ko=new Hi;class Us{constructor(t=0,e=0,n=0,i=Us.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],m=i[10];switch(e){case"XYZ":this._y=Math.asin(Re(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Re(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Re(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Re(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Re(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Re(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Vo.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Vo,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ko.setFromEuler(this),this.setFromQuaternion(ko,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Us.DEFAULT_ORDER="XYZ";class al{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let jc=0;const Wo=new H,ni=new Hi,on=new ce,ts=new H,Li=new H,Kc=new H,Zc=new Hi,qo=new H(1,0,0),Xo=new H(0,1,0),Yo=new H(0,0,1),Jc={type:"added"},Qc={type:"removed"};class ye extends bi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jc++}),this.uuid=zi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ye.DEFAULT_UP.clone();const t=new H,e=new Us,n=new Hi,i=new H(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ce},normalMatrix:{value:new Ht}}),this.matrix=new ce,this.matrixWorld=new ce,this.matrixAutoUpdate=ye.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new al,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ni.setFromAxisAngle(t,e),this.quaternion.multiply(ni),this}rotateOnWorldAxis(t,e){return ni.setFromAxisAngle(t,e),this.quaternion.premultiply(ni),this}rotateX(t){return this.rotateOnAxis(qo,t)}rotateY(t){return this.rotateOnAxis(Xo,t)}rotateZ(t){return this.rotateOnAxis(Yo,t)}translateOnAxis(t,e){return Wo.copy(t).applyQuaternion(this.quaternion),this.position.add(Wo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(qo,t)}translateY(t){return this.translateOnAxis(Xo,t)}translateZ(t){return this.translateOnAxis(Yo,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(on.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ts.copy(t):ts.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Li.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?on.lookAt(Li,ts,this.up):on.lookAt(ts,Li,this.up),this.quaternion.setFromRotationMatrix(on),i&&(on.extractRotation(i.matrixWorld),ni.setFromRotationMatrix(on),this.quaternion.premultiply(ni.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Jc)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Qc)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),on.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),on.multiply(t.parent.matrixWorld)),t.applyMatrix4(on),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Li,t,Kc),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Li,Zc,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++){const s=e[n];(s.matrixWorldAutoUpdate===!0||t===!0)&&s.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++){const a=i[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];s(t.shapes,d)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),m=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}ye.DEFAULT_UP=new H(0,1,0);ye.DEFAULT_MATRIX_AUTO_UPDATE=!0;ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ve=new H,an=new H,ar=new H,ln=new H,ii=new H,si=new H,$o=new H,lr=new H,cr=new H,hr=new H;let es=!1;class We{constructor(t=new H,e=new H,n=new H){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Ve.subVectors(t,e),i.cross(Ve);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){Ve.subVectors(i,e),an.subVectors(n,e),ar.subVectors(t,e);const o=Ve.dot(Ve),a=Ve.dot(an),l=Ve.dot(ar),c=an.dot(an),h=an.dot(ar),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const u=1/d,m=(c*l-a*h)*u,g=(o*h-a*l)*u;return s.set(1-m-g,g,m)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,ln)===null?!1:ln.x>=0&&ln.y>=0&&ln.x+ln.y<=1}static getUV(t,e,n,i,s,o,a,l){return es===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),es=!0),this.getInterpolation(t,e,n,i,s,o,a,l)}static getInterpolation(t,e,n,i,s,o,a,l){return this.getBarycoord(t,e,n,i,ln)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ln.x),l.addScaledVector(o,ln.y),l.addScaledVector(a,ln.z),l)}static isFrontFacing(t,e,n,i){return Ve.subVectors(n,e),an.subVectors(t,e),Ve.cross(an).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ve.subVectors(this.c,this.b),an.subVectors(this.a,this.b),Ve.cross(an).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return We.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return We.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,i,s){return es===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),es=!0),We.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}getInterpolation(t,e,n,i,s){return We.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return We.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return We.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let o,a;ii.subVectors(i,n),si.subVectors(s,n),lr.subVectors(t,n);const l=ii.dot(lr),c=si.dot(lr);if(l<=0&&c<=0)return e.copy(n);cr.subVectors(t,i);const h=ii.dot(cr),d=si.dot(cr);if(h>=0&&d<=h)return e.copy(i);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(ii,o);hr.subVectors(t,s);const m=ii.dot(hr),g=si.dot(hr);if(g>=0&&m<=g)return e.copy(s);const _=m*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(si,a);const p=h*g-m*d;if(p<=0&&d-h>=0&&m-g>=0)return $o.subVectors(s,i),a=(d-h)/(d-h+(m-g)),e.copy(i).addScaledVector($o,a);const f=1/(p+_+u);return o=_*f,a=u*f,e.copy(n).addScaledVector(ii,o).addScaledVector(si,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const ll={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Sn={h:0,s:0,l:0},ns={h:0,s:0,l:0};function ur(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class qt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ge){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=$t.workingColorSpace){return this.r=t,this.g=e,this.b=n,$t.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=$t.workingColorSpace){if(t=Bc(t,1),e=Re(e,0,1),n=Re(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=ur(o,s,t+1/3),this.g=ur(o,s,t),this.b=ur(o,s,t-1/3)}return $t.toWorkingColorSpace(this,i),this}setStyle(t,e=ge){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ge){const n=ll[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=_i(t.r),this.g=_i(t.g),this.b=_i(t.b),this}copyLinearToSRGB(t){return this.r=Qs(t.r),this.g=Qs(t.g),this.b=Qs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ge){return $t.fromWorkingColorSpace(xe.copy(this),t),Math.round(Re(xe.r*255,0,255))*65536+Math.round(Re(xe.g*255,0,255))*256+Math.round(Re(xe.b*255,0,255))}getHexString(t=ge){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$t.workingColorSpace){$t.fromWorkingColorSpace(xe.copy(this),e);const n=xe.r,i=xe.g,s=xe.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=$t.workingColorSpace){return $t.fromWorkingColorSpace(xe.copy(this),e),t.r=xe.r,t.g=xe.g,t.b=xe.b,t}getStyle(t=ge){$t.fromWorkingColorSpace(xe.copy(this),t);const e=xe.r,n=xe.g,i=xe.b;return t!==ge?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Sn),this.setHSL(Sn.h+t,Sn.s+e,Sn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Sn),t.getHSL(ns);const n=Zs(Sn.h,ns.h,e),i=Zs(Sn.s,ns.s,e),s=Zs(Sn.l,ns.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const xe=new qt;qt.NAMES=ll;let th=0,Vi=class extends bi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:th++}),this.uuid=zi(),this.name="",this.type="Material",this.blending=gi,this.side=Ln,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Cr,this.blendDst=Lr,this.blendEquation=Gn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qt(0,0,0),this.blendAlpha=0,this.depthFunc=bs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=No,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Kn,this.stencilZFail=Kn,this.stencilZPass=Kn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==gi&&(n.blending=this.blending),this.side!==Ln&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Cr&&(n.blendSrc=this.blendSrc),this.blendDst!==Lr&&(n.blendDst=this.blendDst),this.blendEquation!==Gn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==bs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==No&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Kn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Kn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Kn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};class cl extends Vi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=qa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const re=new H,is=new kt;class tn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Uo,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=wn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)is.fromBufferAttribute(this,e),is.applyMatrix3(t),this.setXY(e,is.x,is.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)re.fromBufferAttribute(this,e),re.applyMatrix3(t),this.setXYZ(e,re.x,re.y,re.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)re.fromBufferAttribute(this,e),re.applyMatrix4(t),this.setXYZ(e,re.x,re.y,re.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)re.fromBufferAttribute(this,e),re.applyNormalMatrix(t),this.setXYZ(e,re.x,re.y,re.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)re.fromBufferAttribute(this,e),re.transformDirection(t),this.setXYZ(e,re.x,re.y,re.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ai(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=we(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ai(e,this.array)),e}setX(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ai(e,this.array)),e}setY(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ai(e,this.array)),e}setZ(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ai(e,this.array)),e}setW(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=we(e,this.array),n=we(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=we(e,this.array),n=we(n,this.array),i=we(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=we(e,this.array),n=we(n,this.array),i=we(i,this.array),s=we(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Uo&&(t.usage=this.usage),t}}class hl extends tn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class ul extends tn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class en extends tn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let eh=0;const Oe=new ce,dr=new ye,ri=new H,Ie=new Gi,Pi=new Gi,pe=new H;class Pn extends bi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:eh++}),this.uuid=zi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(il(t)?ul:hl)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ht().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Oe.makeRotationFromQuaternion(t),this.applyMatrix4(Oe),this}rotateX(t){return Oe.makeRotationX(t),this.applyMatrix4(Oe),this}rotateY(t){return Oe.makeRotationY(t),this.applyMatrix4(Oe),this}rotateZ(t){return Oe.makeRotationZ(t),this.applyMatrix4(Oe),this}translate(t,e,n){return Oe.makeTranslation(t,e,n),this.applyMatrix4(Oe),this}scale(t,e,n){return Oe.makeScale(t,e,n),this.applyMatrix4(Oe),this}lookAt(t){return dr.lookAt(t),dr.updateMatrix(),this.applyMatrix4(dr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ri).negate(),this.translate(ri.x,ri.y,ri.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new en(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Gi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];Ie.setFromBufferAttribute(s),this.morphTargetsRelative?(pe.addVectors(this.boundingBox.min,Ie.min),this.boundingBox.expandByPoint(pe),pe.addVectors(this.boundingBox.max,Ie.max),this.boundingBox.expandByPoint(pe)):(this.boundingBox.expandByPoint(Ie.min),this.boundingBox.expandByPoint(Ie.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new H,1/0);return}if(t){const n=this.boundingSphere.center;if(Ie.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];Pi.setFromBufferAttribute(a),this.morphTargetsRelative?(pe.addVectors(Ie.min,Pi.min),Ie.expandByPoint(pe),pe.addVectors(Ie.max,Pi.max),Ie.expandByPoint(pe)):(Ie.expandByPoint(Pi.min),Ie.expandByPoint(Pi.max))}Ie.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)pe.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(pe));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)pe.fromBufferAttribute(a,c),l&&(ri.fromBufferAttribute(t,c),pe.add(ri)),i=Math.max(i,n.distanceToSquared(pe))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.array,i=e.position.array,s=e.normal.array,o=e.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new tn(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let b=0;b<a;b++)c[b]=new H,h[b]=new H;const d=new H,u=new H,m=new H,g=new kt,_=new kt,p=new kt,f=new H,v=new H;function x(b,U,F){d.fromArray(i,b*3),u.fromArray(i,U*3),m.fromArray(i,F*3),g.fromArray(o,b*2),_.fromArray(o,U*2),p.fromArray(o,F*2),u.sub(d),m.sub(d),_.sub(g),p.sub(g);const N=1/(_.x*p.y-p.x*_.y);isFinite(N)&&(f.copy(u).multiplyScalar(p.y).addScaledVector(m,-_.y).multiplyScalar(N),v.copy(m).multiplyScalar(_.x).addScaledVector(u,-p.x).multiplyScalar(N),c[b].add(f),c[U].add(f),c[F].add(f),h[b].add(v),h[U].add(v),h[F].add(v))}let M=this.groups;M.length===0&&(M=[{start:0,count:n.length}]);for(let b=0,U=M.length;b<U;++b){const F=M[b],N=F.start,L=F.count;for(let P=N,I=N+L;P<I;P+=3)x(n[P+0],n[P+1],n[P+2])}const C=new H,w=new H,A=new H,B=new H;function S(b){A.fromArray(s,b*3),B.copy(A);const U=c[b];C.copy(U),C.sub(A.multiplyScalar(A.dot(U))).normalize(),w.crossVectors(B,U);const N=w.dot(h[b])<0?-1:1;l[b*4]=C.x,l[b*4+1]=C.y,l[b*4+2]=C.z,l[b*4+3]=N}for(let b=0,U=M.length;b<U;++b){const F=M[b],N=F.start,L=F.count;for(let P=N,I=N+L;P<I;P+=3)S(n[P+0]),S(n[P+1]),S(n[P+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new tn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,m=n.count;u<m;u++)n.setXYZ(u,0,0,0);const i=new H,s=new H,o=new H,a=new H,l=new H,c=new H,h=new H,d=new H;if(t)for(let u=0,m=t.count;u<m;u+=3){const g=t.getX(u+0),_=t.getX(u+1),p=t.getX(u+2);i.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),o.fromBufferAttribute(e,p),h.subVectors(o,s),d.subVectors(i,s),h.cross(d),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,m=e.count;u<m;u+=3)i.fromBufferAttribute(e,u+0),s.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,s),d.subVectors(i,s),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)pe.fromBufferAttribute(t,e),pe.normalize(),t.setXYZ(e,pe.x,pe.y,pe.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h);let m=0,g=0;for(let _=0,p=l.length;_<p;_++){a.isInterleavedBufferAttribute?m=l[_]*a.data.stride+a.offset:m=l[_]*h;for(let f=0;f<h;f++)u[g++]=c[m++]}return new tn(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Pn,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,d=c.length;h<d;h++){const u=c[h],m=t(u,n);l.push(m)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const m=c[d];h.push(m.toJSON(t.data))}h.length>0&&(i[l]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const s=t.morphAttributes;for(const c in s){const h=[],d=s[c];for(let u=0,m=d.length;u<m;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const jo=new ce,Fn=new Xc,ss=new Gr,Ko=new H,oi=new H,ai=new H,li=new H,fr=new H,rs=new H,os=new kt,as=new kt,ls=new kt,Zo=new H,Jo=new H,Qo=new H,cs=new H,hs=new H;class Qe extends ye{constructor(t=new Pn,e=new cl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(s&&a){rs.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],d=s[l];h!==0&&(fr.fromBufferAttribute(d,t),o?rs.addScaledVector(fr,h):rs.addScaledVector(fr.sub(e),h))}e.add(rs)}return e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ss.copy(n.boundingSphere),ss.applyMatrix4(s),Fn.copy(t.ray).recast(t.near),!(ss.containsPoint(Fn.origin)===!1&&(Fn.intersectSphere(ss,Ko)===null||Fn.origin.distanceToSquared(Ko)>(t.far-t.near)**2))&&(jo.copy(s).invert(),Fn.copy(t.ray).applyMatrix4(jo),!(n.boundingBox!==null&&Fn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Fn)))}_computeIntersections(t,e,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,m=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){const p=u[g],f=o[p.materialIndex],v=Math.max(p.start,m.start),x=Math.min(a.count,Math.min(p.start+p.count,m.start+m.count));for(let M=v,C=x;M<C;M+=3){const w=a.getX(M),A=a.getX(M+1),B=a.getX(M+2);i=us(this,f,t,n,c,h,d,w,A,B),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const g=Math.max(0,m.start),_=Math.min(a.count,m.start+m.count);for(let p=g,f=_;p<f;p+=3){const v=a.getX(p),x=a.getX(p+1),M=a.getX(p+2);i=us(this,o,t,n,c,h,d,v,x,M),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){const p=u[g],f=o[p.materialIndex],v=Math.max(p.start,m.start),x=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let M=v,C=x;M<C;M+=3){const w=M,A=M+1,B=M+2;i=us(this,f,t,n,c,h,d,w,A,B),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const g=Math.max(0,m.start),_=Math.min(l.count,m.start+m.count);for(let p=g,f=_;p<f;p+=3){const v=p,x=p+1,M=p+2;i=us(this,o,t,n,c,h,d,v,x,M),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}}}function nh(r,t,e,n,i,s,o,a){let l;if(t.side===Ce?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,t.side===Ln,a),l===null)return null;hs.copy(a),hs.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(hs);return c<e.near||c>e.far?null:{distance:c,point:hs.clone(),object:r}}function us(r,t,e,n,i,s,o,a,l,c){r.getVertexPosition(a,oi),r.getVertexPosition(l,ai),r.getVertexPosition(c,li);const h=nh(r,t,e,n,oi,ai,li,cs);if(h){i&&(os.fromBufferAttribute(i,a),as.fromBufferAttribute(i,l),ls.fromBufferAttribute(i,c),h.uv=We.getInterpolation(cs,oi,ai,li,os,as,ls,new kt)),s&&(os.fromBufferAttribute(s,a),as.fromBufferAttribute(s,l),ls.fromBufferAttribute(s,c),h.uv1=We.getInterpolation(cs,oi,ai,li,os,as,ls,new kt),h.uv2=h.uv1),o&&(Zo.fromBufferAttribute(o,a),Jo.fromBufferAttribute(o,l),Qo.fromBufferAttribute(o,c),h.normal=We.getInterpolation(cs,oi,ai,li,Zo,Jo,Qo,new H),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new H,materialIndex:0};We.getNormal(oi,ai,li,d.normal),h.face=d}return h}class ki extends Pn{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],d=[];let u=0,m=0;g("z","y","x",-1,-1,n,e,t,o,s,0),g("z","y","x",1,-1,n,e,-t,o,s,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,s,4),g("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new en(c,3)),this.setAttribute("normal",new en(h,3)),this.setAttribute("uv",new en(d,2));function g(_,p,f,v,x,M,C,w,A,B,S){const b=M/A,U=C/B,F=M/2,N=C/2,L=w/2,P=A+1,I=B+1;let $=0,z=0;const W=new H;for(let K=0;K<I;K++){const Z=K*U-N;for(let X=0;X<P;X++){const j=X*b-F;W[_]=j*v,W[p]=Z*x,W[f]=L,c.push(W.x,W.y,W.z),W[_]=0,W[p]=0,W[f]=w>0?1:-1,h.push(W.x,W.y,W.z),d.push(X/A),d.push(1-K/B),$+=1}}for(let K=0;K<B;K++)for(let Z=0;Z<A;Z++){const X=u+Z+P*K,j=u+Z+P*(K+1),J=u+(Z+1)+P*(K+1),at=u+(Z+1)+P*K;l.push(X,j,at),l.push(j,J,at),z+=6}a.addGroup(m,z,S),m+=z,u+=$}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ki(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Si(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function be(r){const t={};for(let e=0;e<r.length;e++){const n=Si(r[e]);for(const i in n)t[i]=n[i]}return t}function ih(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function dl(r){return r.getRenderTarget()===null?r.outputColorSpace:$t.workingColorSpace}const sh={clone:Si,merge:be};var rh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,oh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class $n extends Vi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=rh,this.fragmentShader=oh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Si(t.uniforms),this.uniformsGroups=ih(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class fl extends ye{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ce,this.projectionMatrix=new ce,this.projectionMatrixInverse=new ce,this.coordinateSystem=gn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class De extends fl{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Cs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ks*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Cs*2*Math.atan(Math.tan(Ks*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ks*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ci=-90,hi=1;class ah extends ye{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new De(ci,hi,t,e);i.layers=this.layers,this.add(i);const s=new De(ci,hi,t,e);s.layers=this.layers,this.add(s);const o=new De(ci,hi,t,e);o.layers=this.layers,this.add(o);const a=new De(ci,hi,t,e);a.layers=this.layers,this.add(a);const l=new De(ci,hi,t,e);l.layers=this.layers,this.add(l);const c=new De(ci,hi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===gn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Rs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(d,u,m),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class pl extends Ne{constructor(t,e,n,i,s,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:xi,super(t,e,n,i,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class lh extends Yn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];e.encoding!==void 0&&(Fi("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===Xn?ge:ze),this.texture=new pl(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Be}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new ki(5,5,5),s=new $n({name:"CubemapFromEquirect",uniforms:Si(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ce,blending:An});s.uniforms.tEquirect.value=e;const o=new Qe(i,s),a=e.minFilter;return e.minFilter===Oi&&(e.minFilter=Be),new ah(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}}const pr=new H,ch=new H,hh=new Ht;let zn=class{constructor(t=new H(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=pr.subVectors(n,e).cross(ch.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(pr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||hh.getNormalMatrix(t),i=this.coplanarPoint(pr).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}};const On=new Gr,ds=new H;class Vr{constructor(t=new zn,e=new zn,n=new zn,i=new zn,s=new zn,o=new zn){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=gn){const n=this.planes,i=t.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],d=i[6],u=i[7],m=i[8],g=i[9],_=i[10],p=i[11],f=i[12],v=i[13],x=i[14],M=i[15];if(n[0].setComponents(l-s,u-c,p-m,M-f).normalize(),n[1].setComponents(l+s,u+c,p+m,M+f).normalize(),n[2].setComponents(l+o,u+h,p+g,M+v).normalize(),n[3].setComponents(l-o,u-h,p-g,M-v).normalize(),n[4].setComponents(l-a,u-d,p-_,M-x).normalize(),e===gn)n[5].setComponents(l+a,u+d,p+_,M+x).normalize();else if(e===Rs)n[5].setComponents(a,d,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),On.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),On.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(On)}intersectsSprite(t){return On.center.set(0,0,0),On.radius=.7071067811865476,On.applyMatrix4(t.matrixWorld),this.intersectsSphere(On)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(ds.x=i.normal.x>0?t.max.x:t.min.x,ds.y=i.normal.y>0?t.max.y:t.min.y,ds.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(ds)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ml(){let r=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function uh(r,t){const e=t.isWebGL2,n=new WeakMap;function i(c,h){const d=c.array,u=c.usage,m=d.byteLength,g=r.createBuffer();r.bindBuffer(h,g),r.bufferData(h,d,u),c.onUploadCallback();let _;if(d instanceof Float32Array)_=r.FLOAT;else if(d instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)_=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=r.UNSIGNED_SHORT;else if(d instanceof Int16Array)_=r.SHORT;else if(d instanceof Uint32Array)_=r.UNSIGNED_INT;else if(d instanceof Int32Array)_=r.INT;else if(d instanceof Int8Array)_=r.BYTE;else if(d instanceof Uint8Array)_=r.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)_=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:_,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:m}}function s(c,h,d){const u=h.array,m=h._updateRange,g=h.updateRanges;if(r.bindBuffer(d,c),m.count===-1&&g.length===0&&r.bufferSubData(d,0,u),g.length!==0){for(let _=0,p=g.length;_<p;_++){const f=g[_];e?r.bufferSubData(d,f.start*u.BYTES_PER_ELEMENT,u,f.start,f.count):r.bufferSubData(d,f.start*u.BYTES_PER_ELEMENT,u.subarray(f.start,f.start+f.count))}h.clearUpdateRanges()}m.count!==-1&&(e?r.bufferSubData(d,m.offset*u.BYTES_PER_ELEMENT,u,m.offset,m.count):r.bufferSubData(d,m.offset*u.BYTES_PER_ELEMENT,u.subarray(m.offset,m.offset+m.count)),m.count=-1),h.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(r.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const u=n.get(c);(!u||u.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const d=n.get(c);if(d===void 0)n.set(c,i(c,h));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(d.buffer,c,h),d.version=c.version}}return{get:o,remove:a,update:l}}class Fs extends Pn{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,d=t/a,u=e/l,m=[],g=[],_=[],p=[];for(let f=0;f<h;f++){const v=f*u-o;for(let x=0;x<c;x++){const M=x*d-s;g.push(M,-v,0),_.push(0,0,1),p.push(x/a),p.push(1-f/l)}}for(let f=0;f<l;f++)for(let v=0;v<a;v++){const x=v+c*f,M=v+c*(f+1),C=v+1+c*(f+1),w=v+1+c*f;m.push(x,M,w),m.push(M,C,w)}this.setIndex(m),this.setAttribute("position",new en(g,3)),this.setAttribute("normal",new en(_,3)),this.setAttribute("uv",new en(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fs(t.width,t.height,t.widthSegments,t.heightSegments)}}var dh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,fh=`#ifdef USE_ALPHAHASH
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
#endif`,ph=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,mh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gh=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,_h=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,vh=`#ifdef USE_AOMAP
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
#endif`,xh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,yh=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
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
#endif`,Mh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Sh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Eh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Th=`#ifdef USE_IRIDESCENCE
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
#endif`,wh=`#ifdef USE_BUMPMAP
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
#endif`,Ah=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
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
#endif`,Rh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ch=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Lh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ph=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ih=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Dh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Nh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Uh=`#define PI 3.141592653589793
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
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
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
} // validated`,Fh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Oh=`vec3 transformedNormal = objectNormal;
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
#endif`,Bh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,zh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Hh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Gh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Vh="gl_FragColor = linearToOutputTexel( gl_FragColor );",kh=`
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
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Wh=`#ifdef USE_ENVMAP
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
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
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
#endif`,qh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Xh=`#ifdef USE_ENVMAP
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
#endif`,Yh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,$h=`#ifdef USE_ENVMAP
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
#endif`,jh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Kh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Zh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Jh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Qh=`#ifdef USE_GRADIENTMAP
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
}`,tu=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,eu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,nu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,iu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,su=`uniform bool receiveShadow;
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
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
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
#endif`,ru=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
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
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
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
#endif`,ou=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,au=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,cu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hu=`PhysicalMaterial material;
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
#endif`,uu=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
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
}`,du=`
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
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
#endif`,fu=`#if defined( RE_IndirectDiffuse )
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
#endif`,pu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,mu=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gu=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_u=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,vu=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,xu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,yu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Mu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Su=`#if defined( USE_POINTS_UV )
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
#endif`,Eu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,bu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Tu=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Au=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Ru=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Cu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Lu=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Pu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Iu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Du=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Nu=`#ifdef USE_NORMALMAP
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
#endif`,Uu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Fu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ou=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Bu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,zu=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Hu=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
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
}`,Gu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Vu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ku=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Wu=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,qu=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Xu=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Yu=`#if NUM_SPOT_LIGHT_COORDS > 0
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
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
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
		return shadow;
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
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
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
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,$u=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
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
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ju=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Ku=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Zu=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ju=`#ifdef USE_SKINNING
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
#endif`,Qu=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,td=`#ifdef USE_SKINNING
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
#endif`,ed=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,nd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,id=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,sd=`#ifndef saturate
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
vec3 OptimizedCineonToneMapping( vec3 color ) {
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
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,rd=`#ifdef USE_TRANSMISSION
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
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,od=`#ifdef USE_TRANSMISSION
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
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ad=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ld=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ud=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,dd=`uniform sampler2D t2D;
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
}`,fd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pd=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,md=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_d=`#include <common>
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
}`,vd=`#if DEPTH_PACKING == 3200
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
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
	#endif
}`,xd=`#define DISTANCE
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
}`,yd=`#define DISTANCE
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Md=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Sd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ed=`uniform float scale;
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
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,bd=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Td=`#include <common>
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
}`,wd=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Ad=`#define LAMBERT
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
}`,Rd=`#define LAMBERT
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Cd=`#define MATCAP
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
}`,Ld=`#define MATCAP
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Pd=`#define NORMAL
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
}`,Id=`#define NORMAL
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
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Dd=`#define PHONG
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
}`,Nd=`#define PHONG
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Ud=`#define STANDARD
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
}`,Fd=`#define STANDARD
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Od=`#define TOON
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
}`,Bd=`#define TOON
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,zd=`uniform float size;
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
}`,Hd=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Gd=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
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
}`,Vd=`uniform vec3 color;
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
}`,kd=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
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
}`,Wd=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Nt={alphahash_fragment:dh,alphahash_pars_fragment:fh,alphamap_fragment:ph,alphamap_pars_fragment:mh,alphatest_fragment:gh,alphatest_pars_fragment:_h,aomap_fragment:vh,aomap_pars_fragment:xh,batching_pars_vertex:yh,batching_vertex:Mh,begin_vertex:Sh,beginnormal_vertex:Eh,bsdfs:bh,iridescence_fragment:Th,bumpmap_pars_fragment:wh,clipping_planes_fragment:Ah,clipping_planes_pars_fragment:Rh,clipping_planes_pars_vertex:Ch,clipping_planes_vertex:Lh,color_fragment:Ph,color_pars_fragment:Ih,color_pars_vertex:Dh,color_vertex:Nh,common:Uh,cube_uv_reflection_fragment:Fh,defaultnormal_vertex:Oh,displacementmap_pars_vertex:Bh,displacementmap_vertex:zh,emissivemap_fragment:Hh,emissivemap_pars_fragment:Gh,colorspace_fragment:Vh,colorspace_pars_fragment:kh,envmap_fragment:Wh,envmap_common_pars_fragment:qh,envmap_pars_fragment:Xh,envmap_pars_vertex:Yh,envmap_physical_pars_fragment:ru,envmap_vertex:$h,fog_vertex:jh,fog_pars_vertex:Kh,fog_fragment:Zh,fog_pars_fragment:Jh,gradientmap_pars_fragment:Qh,lightmap_fragment:tu,lightmap_pars_fragment:eu,lights_lambert_fragment:nu,lights_lambert_pars_fragment:iu,lights_pars_begin:su,lights_toon_fragment:ou,lights_toon_pars_fragment:au,lights_phong_fragment:lu,lights_phong_pars_fragment:cu,lights_physical_fragment:hu,lights_physical_pars_fragment:uu,lights_fragment_begin:du,lights_fragment_maps:fu,lights_fragment_end:pu,logdepthbuf_fragment:mu,logdepthbuf_pars_fragment:gu,logdepthbuf_pars_vertex:_u,logdepthbuf_vertex:vu,map_fragment:xu,map_pars_fragment:yu,map_particle_fragment:Mu,map_particle_pars_fragment:Su,metalnessmap_fragment:Eu,metalnessmap_pars_fragment:bu,morphcolor_vertex:Tu,morphnormal_vertex:wu,morphtarget_pars_vertex:Au,morphtarget_vertex:Ru,normal_fragment_begin:Cu,normal_fragment_maps:Lu,normal_pars_fragment:Pu,normal_pars_vertex:Iu,normal_vertex:Du,normalmap_pars_fragment:Nu,clearcoat_normal_fragment_begin:Uu,clearcoat_normal_fragment_maps:Fu,clearcoat_pars_fragment:Ou,iridescence_pars_fragment:Bu,opaque_fragment:zu,packing:Hu,premultiplied_alpha_fragment:Gu,project_vertex:Vu,dithering_fragment:ku,dithering_pars_fragment:Wu,roughnessmap_fragment:qu,roughnessmap_pars_fragment:Xu,shadowmap_pars_fragment:Yu,shadowmap_pars_vertex:$u,shadowmap_vertex:ju,shadowmask_pars_fragment:Ku,skinbase_vertex:Zu,skinning_pars_vertex:Ju,skinning_vertex:Qu,skinnormal_vertex:td,specularmap_fragment:ed,specularmap_pars_fragment:nd,tonemapping_fragment:id,tonemapping_pars_fragment:sd,transmission_fragment:rd,transmission_pars_fragment:od,uv_pars_fragment:ad,uv_pars_vertex:ld,uv_vertex:cd,worldpos_vertex:hd,background_vert:ud,background_frag:dd,backgroundCube_vert:fd,backgroundCube_frag:pd,cube_vert:md,cube_frag:gd,depth_vert:_d,depth_frag:vd,distanceRGBA_vert:xd,distanceRGBA_frag:yd,equirect_vert:Md,equirect_frag:Sd,linedashed_vert:Ed,linedashed_frag:bd,meshbasic_vert:Td,meshbasic_frag:wd,meshlambert_vert:Ad,meshlambert_frag:Rd,meshmatcap_vert:Cd,meshmatcap_frag:Ld,meshnormal_vert:Pd,meshnormal_frag:Id,meshphong_vert:Dd,meshphong_frag:Nd,meshphysical_vert:Ud,meshphysical_frag:Fd,meshtoon_vert:Od,meshtoon_frag:Bd,points_vert:zd,points_frag:Hd,shadow_vert:Gd,shadow_frag:Vd,sprite_vert:kd,sprite_frag:Wd},st={common:{diffuse:{value:new qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ht}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ht},normalScale:{value:new kt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0},uvTransform:{value:new Ht}},sprite:{diffuse:{value:new qt(16777215)},opacity:{value:1},center:{value:new kt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}}},Je={basic:{uniforms:be([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.fog]),vertexShader:Nt.meshbasic_vert,fragmentShader:Nt.meshbasic_frag},lambert:{uniforms:be([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new qt(0)}}]),vertexShader:Nt.meshlambert_vert,fragmentShader:Nt.meshlambert_frag},phong:{uniforms:be([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new qt(0)},specular:{value:new qt(1118481)},shininess:{value:30}}]),vertexShader:Nt.meshphong_vert,fragmentShader:Nt.meshphong_frag},standard:{uniforms:be([st.common,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.roughnessmap,st.metalnessmap,st.fog,st.lights,{emissive:{value:new qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Nt.meshphysical_vert,fragmentShader:Nt.meshphysical_frag},toon:{uniforms:be([st.common,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.gradientmap,st.fog,st.lights,{emissive:{value:new qt(0)}}]),vertexShader:Nt.meshtoon_vert,fragmentShader:Nt.meshtoon_frag},matcap:{uniforms:be([st.common,st.bumpmap,st.normalmap,st.displacementmap,st.fog,{matcap:{value:null}}]),vertexShader:Nt.meshmatcap_vert,fragmentShader:Nt.meshmatcap_frag},points:{uniforms:be([st.points,st.fog]),vertexShader:Nt.points_vert,fragmentShader:Nt.points_frag},dashed:{uniforms:be([st.common,st.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Nt.linedashed_vert,fragmentShader:Nt.linedashed_frag},depth:{uniforms:be([st.common,st.displacementmap]),vertexShader:Nt.depth_vert,fragmentShader:Nt.depth_frag},normal:{uniforms:be([st.common,st.bumpmap,st.normalmap,st.displacementmap,{opacity:{value:1}}]),vertexShader:Nt.meshnormal_vert,fragmentShader:Nt.meshnormal_frag},sprite:{uniforms:be([st.sprite,st.fog]),vertexShader:Nt.sprite_vert,fragmentShader:Nt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Nt.background_vert,fragmentShader:Nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Nt.backgroundCube_vert,fragmentShader:Nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Nt.cube_vert,fragmentShader:Nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Nt.equirect_vert,fragmentShader:Nt.equirect_frag},distanceRGBA:{uniforms:be([st.common,st.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Nt.distanceRGBA_vert,fragmentShader:Nt.distanceRGBA_frag},shadow:{uniforms:be([st.lights,st.fog,{color:{value:new qt(0)},opacity:{value:1}}]),vertexShader:Nt.shadow_vert,fragmentShader:Nt.shadow_frag}};Je.physical={uniforms:be([Je.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ht},clearcoatNormalScale:{value:new kt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ht},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ht},sheen:{value:0},sheenColor:{value:new qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ht},transmissionSamplerSize:{value:new kt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ht},attenuationDistance:{value:0},attenuationColor:{value:new qt(0)},specularColor:{value:new qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ht},anisotropyVector:{value:new kt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ht}}]),vertexShader:Nt.meshphysical_vert,fragmentShader:Nt.meshphysical_frag};const fs={r:0,b:0,g:0};function qd(r,t,e,n,i,s,o){const a=new qt(0);let l=s===!0?0:1,c,h,d=null,u=0,m=null;function g(p,f){let v=!1,x=f.isScene===!0?f.background:null;x&&x.isTexture&&(x=(f.backgroundBlurriness>0?e:t).get(x)),x===null?_(a,l):x&&x.isColor&&(_(x,1),v=!0);const M=r.xr.getEnvironmentBlendMode();M==="additive"?n.buffers.color.setClear(0,0,0,1,o):M==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||v)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),x&&(x.isCubeTexture||x.mapping===Ds)?(h===void 0&&(h=new Qe(new ki(1,1,1),new $n({name:"BackgroundCubeMaterial",uniforms:Si(Je.backgroundCube.uniforms),vertexShader:Je.backgroundCube.vertexShader,fragmentShader:Je.backgroundCube.fragmentShader,side:Ce,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,h.material.toneMapped=$t.getTransfer(x.colorSpace)!==Qt,(d!==x||u!==x.version||m!==r.toneMapping)&&(h.material.needsUpdate=!0,d=x,u=x.version,m=r.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Qe(new Fs(2,2),new $n({name:"BackgroundMaterial",uniforms:Si(Je.background.uniforms),vertexShader:Je.background.vertexShader,fragmentShader:Je.background.fragmentShader,side:Ln,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.toneMapped=$t.getTransfer(x.colorSpace)!==Qt,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(d!==x||u!==x.version||m!==r.toneMapping)&&(c.material.needsUpdate=!0,d=x,u=x.version,m=r.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function _(p,f){p.getRGB(fs,dl(r)),n.buffers.color.setClear(fs.r,fs.g,fs.b,f,o)}return{getClearColor:function(){return a},setClearColor:function(p,f=1){a.set(p),l=f,_(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,_(a,l)},render:g}}function Xd(r,t,e,n){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:t.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},l=p(null);let c=l,h=!1;function d(L,P,I,$,z){let W=!1;if(o){const K=_($,I,P);c!==K&&(c=K,m(c.object)),W=f(L,$,I,z),W&&v(L,$,I,z)}else{const K=P.wireframe===!0;(c.geometry!==$.id||c.program!==I.id||c.wireframe!==K)&&(c.geometry=$.id,c.program=I.id,c.wireframe=K,W=!0)}z!==null&&e.update(z,r.ELEMENT_ARRAY_BUFFER),(W||h)&&(h=!1,B(L,P,I,$),z!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function u(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function m(L){return n.isWebGL2?r.bindVertexArray(L):s.bindVertexArrayOES(L)}function g(L){return n.isWebGL2?r.deleteVertexArray(L):s.deleteVertexArrayOES(L)}function _(L,P,I){const $=I.wireframe===!0;let z=a[L.id];z===void 0&&(z={},a[L.id]=z);let W=z[P.id];W===void 0&&(W={},z[P.id]=W);let K=W[$];return K===void 0&&(K=p(u()),W[$]=K),K}function p(L){const P=[],I=[],$=[];for(let z=0;z<i;z++)P[z]=0,I[z]=0,$[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:I,attributeDivisors:$,object:L,attributes:{},index:null}}function f(L,P,I,$){const z=c.attributes,W=P.attributes;let K=0;const Z=I.getAttributes();for(const X in Z)if(Z[X].location>=0){const J=z[X];let at=W[X];if(at===void 0&&(X==="instanceMatrix"&&L.instanceMatrix&&(at=L.instanceMatrix),X==="instanceColor"&&L.instanceColor&&(at=L.instanceColor)),J===void 0||J.attribute!==at||at&&J.data!==at.data)return!0;K++}return c.attributesNum!==K||c.index!==$}function v(L,P,I,$){const z={},W=P.attributes;let K=0;const Z=I.getAttributes();for(const X in Z)if(Z[X].location>=0){let J=W[X];J===void 0&&(X==="instanceMatrix"&&L.instanceMatrix&&(J=L.instanceMatrix),X==="instanceColor"&&L.instanceColor&&(J=L.instanceColor));const at={};at.attribute=J,J&&J.data&&(at.data=J.data),z[X]=at,K++}c.attributes=z,c.attributesNum=K,c.index=$}function x(){const L=c.newAttributes;for(let P=0,I=L.length;P<I;P++)L[P]=0}function M(L){C(L,0)}function C(L,P){const I=c.newAttributes,$=c.enabledAttributes,z=c.attributeDivisors;I[L]=1,$[L]===0&&(r.enableVertexAttribArray(L),$[L]=1),z[L]!==P&&((n.isWebGL2?r:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,P),z[L]=P)}function w(){const L=c.newAttributes,P=c.enabledAttributes;for(let I=0,$=P.length;I<$;I++)P[I]!==L[I]&&(r.disableVertexAttribArray(I),P[I]=0)}function A(L,P,I,$,z,W,K){K===!0?r.vertexAttribIPointer(L,P,I,z,W):r.vertexAttribPointer(L,P,I,$,z,W)}function B(L,P,I,$){if(n.isWebGL2===!1&&(L.isInstancedMesh||$.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;x();const z=$.attributes,W=I.getAttributes(),K=P.defaultAttributeValues;for(const Z in W){const X=W[Z];if(X.location>=0){let j=z[Z];if(j===void 0&&(Z==="instanceMatrix"&&L.instanceMatrix&&(j=L.instanceMatrix),Z==="instanceColor"&&L.instanceColor&&(j=L.instanceColor)),j!==void 0){const J=j.normalized,at=j.itemSize,pt=e.get(j);if(pt===void 0)continue;const mt=pt.buffer,Lt=pt.type,It=pt.bytesPerElement,bt=n.isWebGL2===!0&&(Lt===r.INT||Lt===r.UNSIGNED_INT||j.gpuType===Ya);if(j.isInterleavedBufferAttribute){const Vt=j.data,G=Vt.stride,Me=j.offset;if(Vt.isInstancedInterleavedBuffer){for(let yt=0;yt<X.locationSize;yt++)C(X.location+yt,Vt.meshPerAttribute);L.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=Vt.meshPerAttribute*Vt.count)}else for(let yt=0;yt<X.locationSize;yt++)M(X.location+yt);r.bindBuffer(r.ARRAY_BUFFER,mt);for(let yt=0;yt<X.locationSize;yt++)A(X.location+yt,at/X.locationSize,Lt,J,G*It,(Me+at/X.locationSize*yt)*It,bt)}else{if(j.isInstancedBufferAttribute){for(let Vt=0;Vt<X.locationSize;Vt++)C(X.location+Vt,j.meshPerAttribute);L.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let Vt=0;Vt<X.locationSize;Vt++)M(X.location+Vt);r.bindBuffer(r.ARRAY_BUFFER,mt);for(let Vt=0;Vt<X.locationSize;Vt++)A(X.location+Vt,at/X.locationSize,Lt,J,at*It,at/X.locationSize*Vt*It,bt)}}else if(K!==void 0){const J=K[Z];if(J!==void 0)switch(J.length){case 2:r.vertexAttrib2fv(X.location,J);break;case 3:r.vertexAttrib3fv(X.location,J);break;case 4:r.vertexAttrib4fv(X.location,J);break;default:r.vertexAttrib1fv(X.location,J)}}}}w()}function S(){F();for(const L in a){const P=a[L];for(const I in P){const $=P[I];for(const z in $)g($[z].object),delete $[z];delete P[I]}delete a[L]}}function b(L){if(a[L.id]===void 0)return;const P=a[L.id];for(const I in P){const $=P[I];for(const z in $)g($[z].object),delete $[z];delete P[I]}delete a[L.id]}function U(L){for(const P in a){const I=a[P];if(I[L.id]===void 0)continue;const $=I[L.id];for(const z in $)g($[z].object),delete $[z];delete I[L.id]}}function F(){N(),h=!0,c!==l&&(c=l,m(c.object))}function N(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:F,resetDefaultState:N,dispose:S,releaseStatesOfGeometry:b,releaseStatesOfProgram:U,initAttributes:x,enableAttribute:M,disableUnusedAttributes:w}}function Yd(r,t,e,n){const i=n.isWebGL2;let s;function o(h){s=h}function a(h,d){r.drawArrays(s,h,d),e.update(d,s,1)}function l(h,d,u){if(u===0)return;let m,g;if(i)m=r,g="drawArraysInstanced";else if(m=t.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[g](s,h,d,u),e.update(d,s,u)}function c(h,d,u){if(u===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<u;g++)this.render(h[g],d[g]);else{m.multiDrawArraysWEBGL(s,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=d[_];e.update(g,s,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function $d(r,t,e){let n;function i(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");n=r.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(A){if(A==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let a=e.precision!==void 0?e.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),u=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),_=r.getParameter(r.MAX_VERTEX_ATTRIBS),p=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),f=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),x=u>0,M=o||t.has("OES_texture_float"),C=x&&M,w=o?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:u,maxTextureSize:m,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:p,maxVaryings:f,maxFragmentUniforms:v,vertexTextures:x,floatFragmentTextures:M,floatVertexTextures:C,maxSamples:w}}function jd(r){const t=this;let e=null,n=0,i=!1,s=!1;const o=new zn,a=new Ht,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const m=d.length!==0||u||n!==0||i;return i=u,n=d.length,m},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,m){const g=d.clippingPlanes,_=d.clipIntersection,p=d.clipShadows,f=r.get(d);if(!i||g===null||g.length===0||s&&!p)s?h(null):c();else{const v=s?0:n,x=v*4;let M=f.clippingState||null;l.value=M,M=h(g,u,x,m);for(let C=0;C!==x;++C)M[C]=e[C];f.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,m,g){const _=d!==null?d.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const f=m+_*4,v=u.matrixWorldInverse;a.getNormalMatrix(v),(p===null||p.length<f)&&(p=new Float32Array(f));for(let x=0,M=m;x!==_;++x,M+=4)o.copy(d[x]).applyMatrix4(v,a),o.normal.toArray(p,M),p[M+3]=o.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function Kd(r){let t=new WeakMap;function e(o,a){return a===Pr?o.mapping=xi:a===Ir&&(o.mapping=yi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Pr||a===Ir)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new lh(l.height/2);return c.fromEquirectangularTexture(r,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class Zd extends fl{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const pi=4,ta=[.125,.215,.35,.446,.526,.582],Vn=20,mr=new Zd,ea=new qt;let gr=null,_r=0,vr=0;const Hn=(1+Math.sqrt(5))/2,ui=1/Hn,na=[new H(1,1,1),new H(-1,1,1),new H(1,1,-1),new H(-1,1,-1),new H(0,Hn,ui),new H(0,Hn,-ui),new H(ui,0,Hn),new H(-ui,0,Hn),new H(Hn,ui,0),new H(-Hn,ui,0)];class ia{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){gr=this._renderer.getRenderTarget(),_r=this._renderer.getActiveCubeFace(),vr=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=oa(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ra(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(gr,_r,vr),t.scissorTest=!1,ps(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===xi||t.mapping===yi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),gr=this._renderer.getRenderTarget(),_r=this._renderer.getActiveCubeFace(),vr=this._renderer.getActiveMipmapLevel();const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Be,minFilter:Be,generateMipmaps:!1,type:Bi,format:Xe,colorSpace:_n,depthBuffer:!1},i=sa(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sa(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Jd(s)),this._blurMaterial=Qd(s,t,e)}return i}_compileMaterial(t){const e=new Qe(this._lodPlanes[0],t);this._renderer.compile(e,mr)}_sceneToCubeUV(t,e,n,i){const a=new De(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(ea),h.toneMapping=Rn,h.autoClear=!1;const m=new cl({name:"PMREM.Background",side:Ce,depthWrite:!1,depthTest:!1}),g=new Qe(new ki,m);let _=!1;const p=t.background;p?p.isColor&&(m.color.copy(p),t.background=null,_=!0):(m.color.copy(ea),_=!0);for(let f=0;f<6;f++){const v=f%3;v===0?(a.up.set(0,l[f],0),a.lookAt(c[f],0,0)):v===1?(a.up.set(0,0,l[f]),a.lookAt(0,c[f],0)):(a.up.set(0,l[f],0),a.lookAt(0,0,c[f]));const x=this._cubeSize;ps(i,v*x,f>2?x:0,x,x),h.setRenderTarget(i),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===xi||t.mapping===yi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=oa()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ra());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new Qe(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;ps(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,mr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=na[(i-1)%na.length];this._blur(t,i-1,i,s,o)}e.autoClear=n}_blur(t,e,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Qe(this._lodPlanes[i],c),u=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Vn-1),_=s/g,p=isFinite(s)?1+Math.floor(h*_):Vn;p>Vn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Vn}`);const f=[];let v=0;for(let A=0;A<Vn;++A){const B=A/_,S=Math.exp(-B*B/2);f.push(S),A===0?v+=S:A<p&&(v+=2*S)}for(let A=0;A<f.length;A++)f[A]=f[A]/v;u.envMap.value=t.texture,u.samples.value=p,u.weights.value=f,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:x}=this;u.dTheta.value=g,u.mipInt.value=x-n;const M=this._sizeLods[i],C=3*M*(i>x-pi?i-x+pi:0),w=4*(this._cubeSize-M);ps(e,C,w,3*M,2*M),l.setRenderTarget(e),l.render(d,mr)}}function Jd(r){const t=[],e=[],n=[];let i=r;const s=r-pi+1+ta.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);e.push(a);let l=1/a;o>r-pi?l=ta[o-r+pi-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],m=6,g=6,_=3,p=2,f=1,v=new Float32Array(_*g*m),x=new Float32Array(p*g*m),M=new Float32Array(f*g*m);for(let w=0;w<m;w++){const A=w%3*2/3-1,B=w>2?0:-1,S=[A,B,0,A+2/3,B,0,A+2/3,B+1,0,A,B,0,A+2/3,B+1,0,A,B+1,0];v.set(S,_*g*w),x.set(u,p*g*w);const b=[w,w,w,w,w,w];M.set(b,f*g*w)}const C=new Pn;C.setAttribute("position",new tn(v,_)),C.setAttribute("uv",new tn(x,p)),C.setAttribute("faceIndex",new tn(M,f)),t.push(C),i>pi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function sa(r,t,e){const n=new Yn(r,t,e);return n.texture.mapping=Ds,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ps(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function Qd(r,t,e){const n=new Float32Array(Vn),i=new H(0,1,0);return new $n({name:"SphericalGaussianBlur",defines:{n:Vn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:kr(),fragmentShader:`

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
		`,blending:An,depthTest:!1,depthWrite:!1})}function ra(){return new $n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:kr(),fragmentShader:`

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
		`,blending:An,depthTest:!1,depthWrite:!1})}function oa(){return new $n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:kr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:An,depthTest:!1,depthWrite:!1})}function kr(){return`

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
	`}function tf(r){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Pr||l===Ir,h=l===xi||l===yi;if(c||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let d=t.get(a);return e===null&&(e=new ia(r)),d=c?e.fromEquirectangular(a,d):e.fromCubemap(a,d),t.set(a,d),d.texture}else{if(t.has(a))return t.get(a).texture;{const d=a.image;if(c&&d&&d.height>0||h&&d&&i(d)){e===null&&(e=new ia(r));const u=c?e.fromEquirectangular(a):e.fromCubemap(a);return t.set(a,u),a.addEventListener("dispose",s),u.texture}else return null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function ef(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){const i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function nf(r,t,e,n){const i={},s=new WeakMap;function o(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);for(const g in u.morphAttributes){const _=u.morphAttributes[g];for(let p=0,f=_.length;p<f;p++)t.remove(_[p])}u.removeEventListener("dispose",o),delete i[u.id];const m=s.get(u);m&&(t.remove(m),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",o),i[u.id]=!0,e.memory.geometries++),u}function l(d){const u=d.attributes;for(const g in u)t.update(u[g],r.ARRAY_BUFFER);const m=d.morphAttributes;for(const g in m){const _=m[g];for(let p=0,f=_.length;p<f;p++)t.update(_[p],r.ARRAY_BUFFER)}}function c(d){const u=[],m=d.index,g=d.attributes.position;let _=0;if(m!==null){const v=m.array;_=m.version;for(let x=0,M=v.length;x<M;x+=3){const C=v[x+0],w=v[x+1],A=v[x+2];u.push(C,w,w,A,A,C)}}else if(g!==void 0){const v=g.array;_=g.version;for(let x=0,M=v.length/3-1;x<M;x+=3){const C=x+0,w=x+1,A=x+2;u.push(C,w,w,A,A,C)}}else return;const p=new(il(u)?ul:hl)(u,1);p.version=_;const f=s.get(d);f&&t.remove(f),s.set(d,p)}function h(d){const u=s.get(d);if(u){const m=d.index;m!==null&&u.version<m.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function sf(r,t,e,n){const i=n.isWebGL2;let s;function o(m){s=m}let a,l;function c(m){a=m.type,l=m.bytesPerElement}function h(m,g){r.drawElements(s,g,a,m*l),e.update(g,s,1)}function d(m,g,_){if(_===0)return;let p,f;if(i)p=r,f="drawElementsInstanced";else if(p=t.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[f](s,g,a,m*l,_),e.update(g,s,_)}function u(m,g,_){if(_===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let f=0;f<_;f++)this.render(m[f]/l,g[f]);else{p.multiDrawElementsWEBGL(s,g,0,a,m,0,_);let f=0;for(let v=0;v<_;v++)f+=g[v];e.update(f,s,1)}}this.setMode=o,this.setIndex=c,this.render=h,this.renderInstances=d,this.renderMultiDraw=u}function rf(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case r.TRIANGLES:e.triangles+=a*(s/3);break;case r.LINES:e.lines+=a*(s/2);break;case r.LINE_STRIP:e.lines+=a*(s-1);break;case r.LINE_LOOP:e.lines+=a*s;break;case r.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function of(r,t){return r[0]-t[0]}function af(r,t){return Math.abs(t[1])-Math.abs(r[1])}function lf(r,t,e){const n={},i=new Float32Array(8),s=new WeakMap,o=new me,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,h,d){const u=c.morphTargetInfluences;if(t.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let p=s.get(h);if(p===void 0||p.count!==_){let P=function(){N.dispose(),s.delete(h),h.removeEventListener("dispose",P)};var m=P;p!==void 0&&p.texture.dispose();const x=h.morphAttributes.position!==void 0,M=h.morphAttributes.normal!==void 0,C=h.morphAttributes.color!==void 0,w=h.morphAttributes.position||[],A=h.morphAttributes.normal||[],B=h.morphAttributes.color||[];let S=0;x===!0&&(S=1),M===!0&&(S=2),C===!0&&(S=3);let b=h.attributes.position.count*S,U=1;b>t.maxTextureSize&&(U=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);const F=new Float32Array(b*U*4*_),N=new ol(F,b,U,_);N.type=wn,N.needsUpdate=!0;const L=S*4;for(let I=0;I<_;I++){const $=w[I],z=A[I],W=B[I],K=b*U*4*I;for(let Z=0;Z<$.count;Z++){const X=Z*L;x===!0&&(o.fromBufferAttribute($,Z),F[K+X+0]=o.x,F[K+X+1]=o.y,F[K+X+2]=o.z,F[K+X+3]=0),M===!0&&(o.fromBufferAttribute(z,Z),F[K+X+4]=o.x,F[K+X+5]=o.y,F[K+X+6]=o.z,F[K+X+7]=0),C===!0&&(o.fromBufferAttribute(W,Z),F[K+X+8]=o.x,F[K+X+9]=o.y,F[K+X+10]=o.z,F[K+X+11]=W.itemSize===4?o.w:1)}}p={count:_,texture:N,size:new kt(b,U)},s.set(h,p),h.addEventListener("dispose",P)}let f=0;for(let x=0;x<u.length;x++)f+=u[x];const v=h.morphTargetsRelative?1:1-f;d.getUniforms().setValue(r,"morphTargetBaseInfluence",v),d.getUniforms().setValue(r,"morphTargetInfluences",u),d.getUniforms().setValue(r,"morphTargetsTexture",p.texture,e),d.getUniforms().setValue(r,"morphTargetsTextureSize",p.size)}else{const g=u===void 0?0:u.length;let _=n[h.id];if(_===void 0||_.length!==g){_=[];for(let M=0;M<g;M++)_[M]=[M,0];n[h.id]=_}for(let M=0;M<g;M++){const C=_[M];C[0]=M,C[1]=u[M]}_.sort(af);for(let M=0;M<8;M++)M<g&&_[M][1]?(a[M][0]=_[M][0],a[M][1]=_[M][1]):(a[M][0]=Number.MAX_SAFE_INTEGER,a[M][1]=0);a.sort(of);const p=h.morphAttributes.position,f=h.morphAttributes.normal;let v=0;for(let M=0;M<8;M++){const C=a[M],w=C[0],A=C[1];w!==Number.MAX_SAFE_INTEGER&&A?(p&&h.getAttribute("morphTarget"+M)!==p[w]&&h.setAttribute("morphTarget"+M,p[w]),f&&h.getAttribute("morphNormal"+M)!==f[w]&&h.setAttribute("morphNormal"+M,f[w]),i[M]=A,v+=A):(p&&h.hasAttribute("morphTarget"+M)===!0&&h.deleteAttribute("morphTarget"+M),f&&h.hasAttribute("morphNormal"+M)===!0&&h.deleteAttribute("morphNormal"+M),i[M]=0)}const x=h.morphTargetsRelative?1:1-v;d.getUniforms().setValue(r,"morphTargetBaseInfluence",x),d.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:l}}function cf(r,t,e,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,d=t.get(l,h);if(i.get(d)!==c&&(t.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;i.get(u)!==c&&(u.update(),i.set(u,c))}return d}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}class gl extends Ne{constructor(t,e,n,i,s,o,a,l,c,h){if(h=h!==void 0?h:qn,h!==qn&&h!==Mi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===qn&&(n=Tn),n===void 0&&h===Mi&&(n=Wn),super(null,i,s,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Te,this.minFilter=l!==void 0?l:Te,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const _l=new Ne,vl=new gl(1,1);vl.compareFunction=nl;const xl=new ol,yl=new Wc,Ml=new pl,aa=[],la=[],ca=new Float32Array(16),ha=new Float32Array(9),ua=new Float32Array(4);function Ti(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=aa[i];if(s===void 0&&(s=new Float32Array(i),aa[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function he(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function ue(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Os(r,t){let e=la[t];e===void 0&&(e=new Int32Array(t),la[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function hf(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function uf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(he(e,t))return;r.uniform2fv(this.addr,t),ue(e,t)}}function df(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(he(e,t))return;r.uniform3fv(this.addr,t),ue(e,t)}}function ff(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(he(e,t))return;r.uniform4fv(this.addr,t),ue(e,t)}}function pf(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(he(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),ue(e,t)}else{if(he(e,n))return;ua.set(n),r.uniformMatrix2fv(this.addr,!1,ua),ue(e,n)}}function mf(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(he(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),ue(e,t)}else{if(he(e,n))return;ha.set(n),r.uniformMatrix3fv(this.addr,!1,ha),ue(e,n)}}function gf(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(he(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),ue(e,t)}else{if(he(e,n))return;ca.set(n),r.uniformMatrix4fv(this.addr,!1,ca),ue(e,n)}}function _f(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function vf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(he(e,t))return;r.uniform2iv(this.addr,t),ue(e,t)}}function xf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(he(e,t))return;r.uniform3iv(this.addr,t),ue(e,t)}}function yf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(he(e,t))return;r.uniform4iv(this.addr,t),ue(e,t)}}function Mf(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function Sf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(he(e,t))return;r.uniform2uiv(this.addr,t),ue(e,t)}}function Ef(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(he(e,t))return;r.uniform3uiv(this.addr,t),ue(e,t)}}function bf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(he(e,t))return;r.uniform4uiv(this.addr,t),ue(e,t)}}function Tf(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);const s=this.type===r.SAMPLER_2D_SHADOW?vl:_l;e.setTexture2D(t||s,i)}function wf(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||yl,i)}function Af(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Ml,i)}function Rf(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||xl,i)}function Cf(r){switch(r){case 5126:return hf;case 35664:return uf;case 35665:return df;case 35666:return ff;case 35674:return pf;case 35675:return mf;case 35676:return gf;case 5124:case 35670:return _f;case 35667:case 35671:return vf;case 35668:case 35672:return xf;case 35669:case 35673:return yf;case 5125:return Mf;case 36294:return Sf;case 36295:return Ef;case 36296:return bf;case 35678:case 36198:case 36298:case 36306:case 35682:return Tf;case 35679:case 36299:case 36307:return wf;case 35680:case 36300:case 36308:case 36293:return Af;case 36289:case 36303:case 36311:case 36292:return Rf}}function Lf(r,t){r.uniform1fv(this.addr,t)}function Pf(r,t){const e=Ti(t,this.size,2);r.uniform2fv(this.addr,e)}function If(r,t){const e=Ti(t,this.size,3);r.uniform3fv(this.addr,e)}function Df(r,t){const e=Ti(t,this.size,4);r.uniform4fv(this.addr,e)}function Nf(r,t){const e=Ti(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function Uf(r,t){const e=Ti(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function Ff(r,t){const e=Ti(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function Of(r,t){r.uniform1iv(this.addr,t)}function Bf(r,t){r.uniform2iv(this.addr,t)}function zf(r,t){r.uniform3iv(this.addr,t)}function Hf(r,t){r.uniform4iv(this.addr,t)}function Gf(r,t){r.uniform1uiv(this.addr,t)}function Vf(r,t){r.uniform2uiv(this.addr,t)}function kf(r,t){r.uniform3uiv(this.addr,t)}function Wf(r,t){r.uniform4uiv(this.addr,t)}function qf(r,t,e){const n=this.cache,i=t.length,s=Os(e,i);he(n,s)||(r.uniform1iv(this.addr,s),ue(n,s));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||_l,s[o])}function Xf(r,t,e){const n=this.cache,i=t.length,s=Os(e,i);he(n,s)||(r.uniform1iv(this.addr,s),ue(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||yl,s[o])}function Yf(r,t,e){const n=this.cache,i=t.length,s=Os(e,i);he(n,s)||(r.uniform1iv(this.addr,s),ue(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||Ml,s[o])}function $f(r,t,e){const n=this.cache,i=t.length,s=Os(e,i);he(n,s)||(r.uniform1iv(this.addr,s),ue(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||xl,s[o])}function jf(r){switch(r){case 5126:return Lf;case 35664:return Pf;case 35665:return If;case 35666:return Df;case 35674:return Nf;case 35675:return Uf;case 35676:return Ff;case 5124:case 35670:return Of;case 35667:case 35671:return Bf;case 35668:case 35672:return zf;case 35669:case 35673:return Hf;case 5125:return Gf;case 36294:return Vf;case 36295:return kf;case 36296:return Wf;case 35678:case 36198:case 36298:case 36306:case 35682:return qf;case 35679:case 36299:case 36307:return Xf;case 35680:case 36300:case 36308:case 36293:return Yf;case 36289:case 36303:case 36311:case 36292:return $f}}class Kf{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Cf(e.type)}}class Zf{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=jf(e.type)}}class Jf{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(t,e[a.id],n)}}}const xr=/(\w+)(\])?(\[|\.)?/g;function da(r,t){r.seq.push(t),r.map[t.id]=t}function Qf(r,t,e){const n=r.name,i=n.length;for(xr.lastIndex=0;;){const s=xr.exec(n),o=xr.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){da(e,c===void 0?new Kf(a,r,t):new Zf(a,r,t));break}else{let d=e.map[a];d===void 0&&(d=new Jf(a),da(e,d)),e=d}}}class Es{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),o=t.getUniformLocation(e,s.name);Qf(s,o,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function fa(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const tp=37297;let ep=0;function np(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function ip(r){const t=$t.getPrimaries($t.workingColorSpace),e=$t.getPrimaries(r);let n;switch(t===e?n="":t===As&&e===ws?n="LinearDisplayP3ToLinearSRGB":t===ws&&e===As&&(n="LinearSRGBToLinearDisplayP3"),r){case _n:case Ns:return[n,"LinearTransferOETF"];case ge:case Hr:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function pa(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+np(r.getShaderSource(t),o)}else return i}function sp(r,t){const e=ip(t);return`vec4 ${r}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function rp(r,t){let e;switch(t){case fc:e="Linear";break;case pc:e="Reinhard";break;case mc:e="OptimizedCineon";break;case gc:e="ACESFilmic";break;case vc:e="AgX";break;case _c:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function op(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(mi).join(`
`)}function ap(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(mi).join(`
`)}function lp(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function cp(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function mi(r){return r!==""}function ma(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ga(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const hp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Or(r){return r.replace(hp,dp)}const up=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function dp(r,t){let e=Nt[t];if(e===void 0){const n=up.get(t);if(n!==void 0)e=Nt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Or(e)}const fp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _a(r){return r.replace(fp,pp)}function pp(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function va(r){let t="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function mp(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Wa?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===Gl?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===pn&&(t="SHADOWMAP_TYPE_VSM"),t}function gp(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case xi:case yi:t="ENVMAP_TYPE_CUBE";break;case Ds:t="ENVMAP_TYPE_CUBE_UV";break}return t}function _p(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case yi:t="ENVMAP_MODE_REFRACTION";break}return t}function vp(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case qa:t="ENVMAP_BLENDING_MULTIPLY";break;case uc:t="ENVMAP_BLENDING_MIX";break;case dc:t="ENVMAP_BLENDING_ADD";break}return t}function xp(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function yp(r,t,e,n){const i=r.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=mp(e),c=gp(e),h=_p(e),d=vp(e),u=xp(e),m=e.isWebGL2?"":op(e),g=ap(e),_=lp(s),p=i.createProgram();let f,v,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(mi).join(`
`),f.length>0&&(f+=`
`),v=[m,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(mi).join(`
`),v.length>0&&(v+=`
`)):(f=[va(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(mi).join(`
`),v=[m,va(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Rn?"#define TONE_MAPPING":"",e.toneMapping!==Rn?Nt.tonemapping_pars_fragment:"",e.toneMapping!==Rn?rp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Nt.colorspace_pars_fragment,sp("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(mi).join(`
`)),o=Or(o),o=ma(o,e),o=ga(o,e),a=Or(a),a=ma(a,e),a=ga(a,e),o=_a(o),a=_a(a),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,f=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,v=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===Fo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Fo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const M=x+f+o,C=x+v+a,w=fa(i,i.VERTEX_SHADER,M),A=fa(i,i.FRAGMENT_SHADER,C);i.attachShader(p,w),i.attachShader(p,A),e.index0AttributeName!==void 0?i.bindAttribLocation(p,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(p,0,"position"),i.linkProgram(p);function B(F){if(r.debug.checkShaderErrors){const N=i.getProgramInfoLog(p).trim(),L=i.getShaderInfoLog(w).trim(),P=i.getShaderInfoLog(A).trim();let I=!0,$=!0;if(i.getProgramParameter(p,i.LINK_STATUS)===!1)if(I=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,p,w,A);else{const z=pa(i,w,"vertex"),W=pa(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(p,i.VALIDATE_STATUS)+`

Program Info Log: `+N+`
`+z+`
`+W)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(L===""||P==="")&&($=!1);$&&(F.diagnostics={runnable:I,programLog:N,vertexShader:{log:L,prefix:f},fragmentShader:{log:P,prefix:v}})}i.deleteShader(w),i.deleteShader(A),S=new Es(i,p),b=cp(i,p)}let S;this.getUniforms=function(){return S===void 0&&B(this),S};let b;this.getAttributes=function(){return b===void 0&&B(this),b};let U=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=i.getProgramParameter(p,tp)),U},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=ep++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=w,this.fragmentShader=A,this}let Mp=0;class Sp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Ep(t),e.set(t,n)),n}}class Ep{constructor(t){this.id=Mp++,this.code=t,this.usedTimes=0}}function bp(r,t,e,n,i,s,o){const a=new al,l=new Sp,c=[],h=i.isWebGL2,d=i.logarithmicDepthBuffer,u=i.vertexTextures;let m=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return S===0?"uv":`uv${S}`}function p(S,b,U,F,N){const L=F.fog,P=N.geometry,I=S.isMeshStandardMaterial?F.environment:null,$=(S.isMeshStandardMaterial?e:t).get(S.envMap||I),z=$&&$.mapping===Ds?$.image.height:null,W=g[S.type];S.precision!==null&&(m=i.getMaxPrecision(S.precision),m!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",m,"instead."));const K=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,Z=K!==void 0?K.length:0;let X=0;P.morphAttributes.position!==void 0&&(X=1),P.morphAttributes.normal!==void 0&&(X=2),P.morphAttributes.color!==void 0&&(X=3);let j,J,at,pt;if(W){const Se=Je[W];j=Se.vertexShader,J=Se.fragmentShader}else j=S.vertexShader,J=S.fragmentShader,l.update(S),at=l.getVertexShaderID(S),pt=l.getFragmentShaderID(S);const mt=r.getRenderTarget(),Lt=N.isInstancedMesh===!0,It=N.isBatchedMesh===!0,bt=!!S.map,Vt=!!S.matcap,G=!!$,Me=!!S.aoMap,yt=!!S.lightMap,Rt=!!S.bumpMap,gt=!!S.normalMap,te=!!S.displacementMap,Ut=!!S.emissiveMap,R=!!S.metalnessMap,E=!!S.roughnessMap,k=S.anisotropy>0,et=S.clearcoat>0,tt=S.iridescence>0,nt=S.sheen>0,_t=S.transmission>0,lt=k&&!!S.anisotropyMap,dt=et&&!!S.clearcoatMap,Et=et&&!!S.clearcoatNormalMap,Ft=et&&!!S.clearcoatRoughnessMap,Q=tt&&!!S.iridescenceMap,Yt=tt&&!!S.iridescenceThicknessMap,Gt=nt&&!!S.sheenColorMap,At=nt&&!!S.sheenRoughnessMap,xt=!!S.specularMap,ft=!!S.specularColorMap,Dt=!!S.specularIntensityMap,Xt=_t&&!!S.transmissionMap,ne=_t&&!!S.thicknessMap,Bt=!!S.gradientMap,it=!!S.alphaMap,D=S.alphaTest>0,rt=!!S.alphaHash,ot=!!S.extensions,Tt=!!P.attributes.uv1,Mt=!!P.attributes.uv2,jt=!!P.attributes.uv3;let Kt=Rn;return S.toneMapped&&(mt===null||mt.isXRRenderTarget===!0)&&(Kt=r.toneMapping),{isWebGL2:h,shaderID:W,shaderType:S.type,shaderName:S.name,vertexShader:j,fragmentShader:J,defines:S.defines,customVertexShaderID:at,customFragmentShaderID:pt,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:m,batching:It,instancing:Lt,instancingColor:Lt&&N.instanceColor!==null,supportsVertexTextures:u,outputColorSpace:mt===null?r.outputColorSpace:mt.isXRRenderTarget===!0?mt.texture.colorSpace:_n,map:bt,matcap:Vt,envMap:G,envMapMode:G&&$.mapping,envMapCubeUVHeight:z,aoMap:Me,lightMap:yt,bumpMap:Rt,normalMap:gt,displacementMap:u&&te,emissiveMap:Ut,normalMapObjectSpace:gt&&S.normalMapType===Lc,normalMapTangentSpace:gt&&S.normalMapType===el,metalnessMap:R,roughnessMap:E,anisotropy:k,anisotropyMap:lt,clearcoat:et,clearcoatMap:dt,clearcoatNormalMap:Et,clearcoatRoughnessMap:Ft,iridescence:tt,iridescenceMap:Q,iridescenceThicknessMap:Yt,sheen:nt,sheenColorMap:Gt,sheenRoughnessMap:At,specularMap:xt,specularColorMap:ft,specularIntensityMap:Dt,transmission:_t,transmissionMap:Xt,thicknessMap:ne,gradientMap:Bt,opaque:S.transparent===!1&&S.blending===gi,alphaMap:it,alphaTest:D,alphaHash:rt,combine:S.combine,mapUv:bt&&_(S.map.channel),aoMapUv:Me&&_(S.aoMap.channel),lightMapUv:yt&&_(S.lightMap.channel),bumpMapUv:Rt&&_(S.bumpMap.channel),normalMapUv:gt&&_(S.normalMap.channel),displacementMapUv:te&&_(S.displacementMap.channel),emissiveMapUv:Ut&&_(S.emissiveMap.channel),metalnessMapUv:R&&_(S.metalnessMap.channel),roughnessMapUv:E&&_(S.roughnessMap.channel),anisotropyMapUv:lt&&_(S.anisotropyMap.channel),clearcoatMapUv:dt&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:Et&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ft&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:Yt&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:Gt&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:At&&_(S.sheenRoughnessMap.channel),specularMapUv:xt&&_(S.specularMap.channel),specularColorMapUv:ft&&_(S.specularColorMap.channel),specularIntensityMapUv:Dt&&_(S.specularIntensityMap.channel),transmissionMapUv:Xt&&_(S.transmissionMap.channel),thicknessMapUv:ne&&_(S.thicknessMap.channel),alphaMapUv:it&&_(S.alphaMap.channel),vertexTangents:!!P.attributes.tangent&&(gt||k),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,vertexUv1s:Tt,vertexUv2s:Mt,vertexUv3s:jt,pointsUvs:N.isPoints===!0&&!!P.attributes.uv&&(bt||it),fog:!!L,useFog:S.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:N.isSkinnedMesh===!0,morphTargets:P.morphAttributes.position!==void 0,morphNormals:P.morphAttributes.normal!==void 0,morphColors:P.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:X,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:r.shadowMap.enabled&&U.length>0,shadowMapType:r.shadowMap.type,toneMapping:Kt,useLegacyLights:r._useLegacyLights,decodeVideoTexture:bt&&S.map.isVideoTexture===!0&&$t.getTransfer(S.map.colorSpace)===Qt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===mn,flipSided:S.side===Ce,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionDerivatives:ot&&S.extensions.derivatives===!0,extensionFragDepth:ot&&S.extensions.fragDepth===!0,extensionDrawBuffers:ot&&S.extensions.drawBuffers===!0,extensionShaderTextureLOD:ot&&S.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ot&&S.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()}}function f(S){const b=[];if(S.shaderID?b.push(S.shaderID):(b.push(S.customVertexShaderID),b.push(S.customFragmentShaderID)),S.defines!==void 0)for(const U in S.defines)b.push(U),b.push(S.defines[U]);return S.isRawShaderMaterial===!1&&(v(b,S),x(b,S),b.push(r.outputColorSpace)),b.push(S.customProgramCacheKey),b.join()}function v(S,b){S.push(b.precision),S.push(b.outputColorSpace),S.push(b.envMapMode),S.push(b.envMapCubeUVHeight),S.push(b.mapUv),S.push(b.alphaMapUv),S.push(b.lightMapUv),S.push(b.aoMapUv),S.push(b.bumpMapUv),S.push(b.normalMapUv),S.push(b.displacementMapUv),S.push(b.emissiveMapUv),S.push(b.metalnessMapUv),S.push(b.roughnessMapUv),S.push(b.anisotropyMapUv),S.push(b.clearcoatMapUv),S.push(b.clearcoatNormalMapUv),S.push(b.clearcoatRoughnessMapUv),S.push(b.iridescenceMapUv),S.push(b.iridescenceThicknessMapUv),S.push(b.sheenColorMapUv),S.push(b.sheenRoughnessMapUv),S.push(b.specularMapUv),S.push(b.specularColorMapUv),S.push(b.specularIntensityMapUv),S.push(b.transmissionMapUv),S.push(b.thicknessMapUv),S.push(b.combine),S.push(b.fogExp2),S.push(b.sizeAttenuation),S.push(b.morphTargetsCount),S.push(b.morphAttributeCount),S.push(b.numDirLights),S.push(b.numPointLights),S.push(b.numSpotLights),S.push(b.numSpotLightMaps),S.push(b.numHemiLights),S.push(b.numRectAreaLights),S.push(b.numDirLightShadows),S.push(b.numPointLightShadows),S.push(b.numSpotLightShadows),S.push(b.numSpotLightShadowsWithMaps),S.push(b.numLightProbes),S.push(b.shadowMapType),S.push(b.toneMapping),S.push(b.numClippingPlanes),S.push(b.numClipIntersection),S.push(b.depthPacking)}function x(S,b){a.disableAll(),b.isWebGL2&&a.enable(0),b.supportsVertexTextures&&a.enable(1),b.instancing&&a.enable(2),b.instancingColor&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),S.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.skinning&&a.enable(4),b.morphTargets&&a.enable(5),b.morphNormals&&a.enable(6),b.morphColors&&a.enable(7),b.premultipliedAlpha&&a.enable(8),b.shadowMapEnabled&&a.enable(9),b.useLegacyLights&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),S.push(a.mask)}function M(S){const b=g[S.type];let U;if(b){const F=Je[b];U=sh.clone(F.uniforms)}else U=S.uniforms;return U}function C(S,b){let U;for(let F=0,N=c.length;F<N;F++){const L=c[F];if(L.cacheKey===b){U=L,++U.usedTimes;break}}return U===void 0&&(U=new yp(r,b,S,s),c.push(U)),U}function w(S){if(--S.usedTimes===0){const b=c.indexOf(S);c[b]=c[c.length-1],c.pop(),S.destroy()}}function A(S){l.remove(S)}function B(){l.dispose()}return{getParameters:p,getProgramCacheKey:f,getUniforms:M,acquireProgram:C,releaseProgram:w,releaseShaderCache:A,programs:c,dispose:B}}function Tp(){let r=new WeakMap;function t(s){let o=r.get(s);return o===void 0&&(o={},r.set(s,o)),o}function e(s){r.delete(s)}function n(s,o,a){r.get(s)[o]=a}function i(){r=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function wp(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function xa(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function ya(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(d,u,m,g,_,p){let f=r[t];return f===void 0?(f={id:d.id,object:d,geometry:u,material:m,groupOrder:g,renderOrder:d.renderOrder,z:_,group:p},r[t]=f):(f.id=d.id,f.object=d,f.geometry=u,f.material=m,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=_,f.group=p),t++,f}function a(d,u,m,g,_,p){const f=o(d,u,m,g,_,p);m.transmission>0?n.push(f):m.transparent===!0?i.push(f):e.push(f)}function l(d,u,m,g,_,p){const f=o(d,u,m,g,_,p);m.transmission>0?n.unshift(f):m.transparent===!0?i.unshift(f):e.unshift(f)}function c(d,u){e.length>1&&e.sort(d||wp),n.length>1&&n.sort(u||xa),i.length>1&&i.sort(u||xa)}function h(){for(let d=t,u=r.length;d<u;d++){const m=r[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:h,sort:c}}function Ap(){let r=new WeakMap;function t(n,i){const s=r.get(n);let o;return s===void 0?(o=new ya,r.set(n,[o])):i>=s.length?(o=new ya,s.push(o)):o=s[i],o}function e(){r=new WeakMap}return{get:t,dispose:e}}function Rp(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new H,color:new qt};break;case"SpotLight":e={position:new H,direction:new H,color:new qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new H,color:new qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new H,skyColor:new qt,groundColor:new qt};break;case"RectAreaLight":e={color:new qt,position:new H,halfWidth:new H,halfHeight:new H};break}return r[t.id]=e,e}}}function Cp(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let Lp=0;function Pp(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function Ip(r,t){const e=new Rp,n=Cp(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new H);const s=new H,o=new ce,a=new ce;function l(h,d){let u=0,m=0,g=0;for(let F=0;F<9;F++)i.probe[F].set(0,0,0);let _=0,p=0,f=0,v=0,x=0,M=0,C=0,w=0,A=0,B=0,S=0;h.sort(Pp);const b=d===!0?Math.PI:1;for(let F=0,N=h.length;F<N;F++){const L=h[F],P=L.color,I=L.intensity,$=L.distance,z=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=P.r*I*b,m+=P.g*I*b,g+=P.b*I*b;else if(L.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(L.sh.coefficients[W],I);S++}else if(L.isDirectionalLight){const W=e.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity*b),L.castShadow){const K=L.shadow,Z=n.get(L);Z.shadowBias=K.bias,Z.shadowNormalBias=K.normalBias,Z.shadowRadius=K.radius,Z.shadowMapSize=K.mapSize,i.directionalShadow[_]=Z,i.directionalShadowMap[_]=z,i.directionalShadowMatrix[_]=L.shadow.matrix,M++}i.directional[_]=W,_++}else if(L.isSpotLight){const W=e.get(L);W.position.setFromMatrixPosition(L.matrixWorld),W.color.copy(P).multiplyScalar(I*b),W.distance=$,W.coneCos=Math.cos(L.angle),W.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),W.decay=L.decay,i.spot[f]=W;const K=L.shadow;if(L.map&&(i.spotLightMap[A]=L.map,A++,K.updateMatrices(L),L.castShadow&&B++),i.spotLightMatrix[f]=K.matrix,L.castShadow){const Z=n.get(L);Z.shadowBias=K.bias,Z.shadowNormalBias=K.normalBias,Z.shadowRadius=K.radius,Z.shadowMapSize=K.mapSize,i.spotShadow[f]=Z,i.spotShadowMap[f]=z,w++}f++}else if(L.isRectAreaLight){const W=e.get(L);W.color.copy(P).multiplyScalar(I),W.halfWidth.set(L.width*.5,0,0),W.halfHeight.set(0,L.height*.5,0),i.rectArea[v]=W,v++}else if(L.isPointLight){const W=e.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity*b),W.distance=L.distance,W.decay=L.decay,L.castShadow){const K=L.shadow,Z=n.get(L);Z.shadowBias=K.bias,Z.shadowNormalBias=K.normalBias,Z.shadowRadius=K.radius,Z.shadowMapSize=K.mapSize,Z.shadowCameraNear=K.camera.near,Z.shadowCameraFar=K.camera.far,i.pointShadow[p]=Z,i.pointShadowMap[p]=z,i.pointShadowMatrix[p]=L.shadow.matrix,C++}i.point[p]=W,p++}else if(L.isHemisphereLight){const W=e.get(L);W.skyColor.copy(L.color).multiplyScalar(I*b),W.groundColor.copy(L.groundColor).multiplyScalar(I*b),i.hemi[x]=W,x++}}v>0&&(t.isWebGL2?r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=st.LTC_FLOAT_1,i.rectAreaLTC2=st.LTC_FLOAT_2):(i.rectAreaLTC1=st.LTC_HALF_1,i.rectAreaLTC2=st.LTC_HALF_2):r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=st.LTC_FLOAT_1,i.rectAreaLTC2=st.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=st.LTC_HALF_1,i.rectAreaLTC2=st.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=u,i.ambient[1]=m,i.ambient[2]=g;const U=i.hash;(U.directionalLength!==_||U.pointLength!==p||U.spotLength!==f||U.rectAreaLength!==v||U.hemiLength!==x||U.numDirectionalShadows!==M||U.numPointShadows!==C||U.numSpotShadows!==w||U.numSpotMaps!==A||U.numLightProbes!==S)&&(i.directional.length=_,i.spot.length=f,i.rectArea.length=v,i.point.length=p,i.hemi.length=x,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=C,i.pointShadowMap.length=C,i.spotShadow.length=w,i.spotShadowMap.length=w,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=C,i.spotLightMatrix.length=w+A-B,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=B,i.numLightProbes=S,U.directionalLength=_,U.pointLength=p,U.spotLength=f,U.rectAreaLength=v,U.hemiLength=x,U.numDirectionalShadows=M,U.numPointShadows=C,U.numSpotShadows=w,U.numSpotMaps=A,U.numLightProbes=S,i.version=Lp++)}function c(h,d){let u=0,m=0,g=0,_=0,p=0;const f=d.matrixWorldInverse;for(let v=0,x=h.length;v<x;v++){const M=h[v];if(M.isDirectionalLight){const C=i.directional[u];C.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(f),u++}else if(M.isSpotLight){const C=i.spot[g];C.position.setFromMatrixPosition(M.matrixWorld),C.position.applyMatrix4(f),C.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(f),g++}else if(M.isRectAreaLight){const C=i.rectArea[_];C.position.setFromMatrixPosition(M.matrixWorld),C.position.applyMatrix4(f),a.identity(),o.copy(M.matrixWorld),o.premultiply(f),a.extractRotation(o),C.halfWidth.set(M.width*.5,0,0),C.halfHeight.set(0,M.height*.5,0),C.halfWidth.applyMatrix4(a),C.halfHeight.applyMatrix4(a),_++}else if(M.isPointLight){const C=i.point[m];C.position.setFromMatrixPosition(M.matrixWorld),C.position.applyMatrix4(f),m++}else if(M.isHemisphereLight){const C=i.hemi[p];C.direction.setFromMatrixPosition(M.matrixWorld),C.direction.transformDirection(f),p++}}}return{setup:l,setupView:c,state:i}}function Ma(r,t){const e=new Ip(r,t),n=[],i=[];function s(){n.length=0,i.length=0}function o(d){n.push(d)}function a(d){i.push(d)}function l(d){e.setup(n,d)}function c(d){e.setupView(n,d)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:e},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function Dp(r,t){let e=new WeakMap;function n(s,o=0){const a=e.get(s);let l;return a===void 0?(l=new Ma(r,t),e.set(s,[l])):o>=a.length?(l=new Ma(r,t),a.push(l)):l=a[o],l}function i(){e=new WeakMap}return{get:n,dispose:i}}class Np extends Vi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Rc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Up extends Vi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Fp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Op=`uniform sampler2D shadow_pass;
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
}`;function Bp(r,t,e){let n=new Vr;const i=new kt,s=new kt,o=new me,a=new Np({depthPacking:Cc}),l=new Up,c={},h=e.maxTextureSize,d={[Ln]:Ce,[Ce]:Ln,[mn]:mn},u=new $n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new kt},radius:{value:4}},vertexShader:Fp,fragmentShader:Op}),m=u.clone();m.defines.HORIZONTAL_PASS=1;const g=new Pn;g.setAttribute("position",new tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Qe(g,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wa;let f=this.type;this.render=function(w,A,B){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;const S=r.getRenderTarget(),b=r.getActiveCubeFace(),U=r.getActiveMipmapLevel(),F=r.state;F.setBlending(An),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const N=f!==pn&&this.type===pn,L=f===pn&&this.type!==pn;for(let P=0,I=w.length;P<I;P++){const $=w[P],z=$.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;i.copy(z.mapSize);const W=z.getFrameExtents();if(i.multiply(W),s.copy(z.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/W.x),i.x=s.x*W.x,z.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/W.y),i.y=s.y*W.y,z.mapSize.y=s.y)),z.map===null||N===!0||L===!0){const Z=this.type!==pn?{minFilter:Te,magFilter:Te}:{};z.map!==null&&z.map.dispose(),z.map=new Yn(i.x,i.y,Z),z.map.texture.name=$.name+".shadowMap",z.camera.updateProjectionMatrix()}r.setRenderTarget(z.map),r.clear();const K=z.getViewportCount();for(let Z=0;Z<K;Z++){const X=z.getViewport(Z);o.set(s.x*X.x,s.y*X.y,s.x*X.z,s.y*X.w),F.viewport(o),z.updateMatrices($,Z),n=z.getFrustum(),M(A,B,z.camera,$,this.type)}z.isPointLightShadow!==!0&&this.type===pn&&v(z,B),z.needsUpdate=!1}f=this.type,p.needsUpdate=!1,r.setRenderTarget(S,b,U)};function v(w,A){const B=t.update(_);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,m.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,m.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Yn(i.x,i.y)),u.uniforms.shadow_pass.value=w.map.texture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,r.setRenderTarget(w.mapPass),r.clear(),r.renderBufferDirect(A,null,B,u,_,null),m.uniforms.shadow_pass.value=w.mapPass.texture,m.uniforms.resolution.value=w.mapSize,m.uniforms.radius.value=w.radius,r.setRenderTarget(w.map),r.clear(),r.renderBufferDirect(A,null,B,m,_,null)}function x(w,A,B,S){let b=null;const U=B.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(U!==void 0)b=U;else if(b=B.isPointLight===!0?l:a,r.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const F=b.uuid,N=A.uuid;let L=c[F];L===void 0&&(L={},c[F]=L);let P=L[N];P===void 0&&(P=b.clone(),L[N]=P,A.addEventListener("dispose",C)),b=P}if(b.visible=A.visible,b.wireframe=A.wireframe,S===pn?b.side=A.shadowSide!==null?A.shadowSide:A.side:b.side=A.shadowSide!==null?A.shadowSide:d[A.side],b.alphaMap=A.alphaMap,b.alphaTest=A.alphaTest,b.map=A.map,b.clipShadows=A.clipShadows,b.clippingPlanes=A.clippingPlanes,b.clipIntersection=A.clipIntersection,b.displacementMap=A.displacementMap,b.displacementScale=A.displacementScale,b.displacementBias=A.displacementBias,b.wireframeLinewidth=A.wireframeLinewidth,b.linewidth=A.linewidth,B.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const F=r.properties.get(b);F.light=B}return b}function M(w,A,B,S,b){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&b===pn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,w.matrixWorld);const N=t.update(w),L=w.material;if(Array.isArray(L)){const P=N.groups;for(let I=0,$=P.length;I<$;I++){const z=P[I],W=L[z.materialIndex];if(W&&W.visible){const K=x(w,W,S,b);w.onBeforeShadow(r,w,A,B,N,K,z),r.renderBufferDirect(B,null,N,K,w,z),w.onAfterShadow(r,w,A,B,N,K,z)}}}else if(L.visible){const P=x(w,L,S,b);w.onBeforeShadow(r,w,A,B,N,P,null),r.renderBufferDirect(B,null,N,P,w,null),w.onAfterShadow(r,w,A,B,N,P,null)}}const F=w.children;for(let N=0,L=F.length;N<L;N++)M(F[N],A,B,S,b)}function C(w){w.target.removeEventListener("dispose",C);for(const B in c){const S=c[B],b=w.target.uuid;b in S&&(S[b].dispose(),delete S[b])}}}function zp(r,t,e){const n=e.isWebGL2;function i(){let D=!1;const rt=new me;let ot=null;const Tt=new me(0,0,0,0);return{setMask:function(Mt){ot!==Mt&&!D&&(r.colorMask(Mt,Mt,Mt,Mt),ot=Mt)},setLocked:function(Mt){D=Mt},setClear:function(Mt,jt,Kt,de,Se){Se===!0&&(Mt*=de,jt*=de,Kt*=de),rt.set(Mt,jt,Kt,de),Tt.equals(rt)===!1&&(r.clearColor(Mt,jt,Kt,de),Tt.copy(rt))},reset:function(){D=!1,ot=null,Tt.set(-1,0,0,0)}}}function s(){let D=!1,rt=null,ot=null,Tt=null;return{setTest:function(Mt){Mt?It(r.DEPTH_TEST):bt(r.DEPTH_TEST)},setMask:function(Mt){rt!==Mt&&!D&&(r.depthMask(Mt),rt=Mt)},setFunc:function(Mt){if(ot!==Mt){switch(Mt){case sc:r.depthFunc(r.NEVER);break;case rc:r.depthFunc(r.ALWAYS);break;case oc:r.depthFunc(r.LESS);break;case bs:r.depthFunc(r.LEQUAL);break;case ac:r.depthFunc(r.EQUAL);break;case lc:r.depthFunc(r.GEQUAL);break;case cc:r.depthFunc(r.GREATER);break;case hc:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}ot=Mt}},setLocked:function(Mt){D=Mt},setClear:function(Mt){Tt!==Mt&&(r.clearDepth(Mt),Tt=Mt)},reset:function(){D=!1,rt=null,ot=null,Tt=null}}}function o(){let D=!1,rt=null,ot=null,Tt=null,Mt=null,jt=null,Kt=null,de=null,Se=null;return{setTest:function(Zt){D||(Zt?It(r.STENCIL_TEST):bt(r.STENCIL_TEST))},setMask:function(Zt){rt!==Zt&&!D&&(r.stencilMask(Zt),rt=Zt)},setFunc:function(Zt,Ee,$e){(ot!==Zt||Tt!==Ee||Mt!==$e)&&(r.stencilFunc(Zt,Ee,$e),ot=Zt,Tt=Ee,Mt=$e)},setOp:function(Zt,Ee,$e){(jt!==Zt||Kt!==Ee||de!==$e)&&(r.stencilOp(Zt,Ee,$e),jt=Zt,Kt=Ee,de=$e)},setLocked:function(Zt){D=Zt},setClear:function(Zt){Se!==Zt&&(r.clearStencil(Zt),Se=Zt)},reset:function(){D=!1,rt=null,ot=null,Tt=null,Mt=null,jt=null,Kt=null,de=null,Se=null}}}const a=new i,l=new s,c=new o,h=new WeakMap,d=new WeakMap;let u={},m={},g=new WeakMap,_=[],p=null,f=!1,v=null,x=null,M=null,C=null,w=null,A=null,B=null,S=new qt(0,0,0),b=0,U=!1,F=null,N=null,L=null,P=null,I=null;const $=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,W=0;const K=r.getParameter(r.VERSION);K.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(K)[1]),z=W>=1):K.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),z=W>=2);let Z=null,X={};const j=r.getParameter(r.SCISSOR_BOX),J=r.getParameter(r.VIEWPORT),at=new me().fromArray(j),pt=new me().fromArray(J);function mt(D,rt,ot,Tt){const Mt=new Uint8Array(4),jt=r.createTexture();r.bindTexture(D,jt),r.texParameteri(D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(D,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Kt=0;Kt<ot;Kt++)n&&(D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY)?r.texImage3D(rt,0,r.RGBA,1,1,Tt,0,r.RGBA,r.UNSIGNED_BYTE,Mt):r.texImage2D(rt+Kt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Mt);return jt}const Lt={};Lt[r.TEXTURE_2D]=mt(r.TEXTURE_2D,r.TEXTURE_2D,1),Lt[r.TEXTURE_CUBE_MAP]=mt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Lt[r.TEXTURE_2D_ARRAY]=mt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Lt[r.TEXTURE_3D]=mt(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),It(r.DEPTH_TEST),l.setFunc(bs),Ut(!1),R(eo),It(r.CULL_FACE),gt(An);function It(D){u[D]!==!0&&(r.enable(D),u[D]=!0)}function bt(D){u[D]!==!1&&(r.disable(D),u[D]=!1)}function Vt(D,rt){return m[D]!==rt?(r.bindFramebuffer(D,rt),m[D]=rt,n&&(D===r.DRAW_FRAMEBUFFER&&(m[r.FRAMEBUFFER]=rt),D===r.FRAMEBUFFER&&(m[r.DRAW_FRAMEBUFFER]=rt)),!0):!1}function G(D,rt){let ot=_,Tt=!1;if(D)if(ot=g.get(rt),ot===void 0&&(ot=[],g.set(rt,ot)),D.isWebGLMultipleRenderTargets){const Mt=D.texture;if(ot.length!==Mt.length||ot[0]!==r.COLOR_ATTACHMENT0){for(let jt=0,Kt=Mt.length;jt<Kt;jt++)ot[jt]=r.COLOR_ATTACHMENT0+jt;ot.length=Mt.length,Tt=!0}}else ot[0]!==r.COLOR_ATTACHMENT0&&(ot[0]=r.COLOR_ATTACHMENT0,Tt=!0);else ot[0]!==r.BACK&&(ot[0]=r.BACK,Tt=!0);Tt&&(e.isWebGL2?r.drawBuffers(ot):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(ot))}function Me(D){return p!==D?(r.useProgram(D),p=D,!0):!1}const yt={[Gn]:r.FUNC_ADD,[kl]:r.FUNC_SUBTRACT,[Wl]:r.FUNC_REVERSE_SUBTRACT};if(n)yt[ro]=r.MIN,yt[oo]=r.MAX;else{const D=t.get("EXT_blend_minmax");D!==null&&(yt[ro]=D.MIN_EXT,yt[oo]=D.MAX_EXT)}const Rt={[ql]:r.ZERO,[Xl]:r.ONE,[Yl]:r.SRC_COLOR,[Cr]:r.SRC_ALPHA,[Ql]:r.SRC_ALPHA_SATURATE,[Zl]:r.DST_COLOR,[jl]:r.DST_ALPHA,[$l]:r.ONE_MINUS_SRC_COLOR,[Lr]:r.ONE_MINUS_SRC_ALPHA,[Jl]:r.ONE_MINUS_DST_COLOR,[Kl]:r.ONE_MINUS_DST_ALPHA,[tc]:r.CONSTANT_COLOR,[ec]:r.ONE_MINUS_CONSTANT_COLOR,[nc]:r.CONSTANT_ALPHA,[ic]:r.ONE_MINUS_CONSTANT_ALPHA};function gt(D,rt,ot,Tt,Mt,jt,Kt,de,Se,Zt){if(D===An){f===!0&&(bt(r.BLEND),f=!1);return}if(f===!1&&(It(r.BLEND),f=!0),D!==Vl){if(D!==v||Zt!==U){if((x!==Gn||w!==Gn)&&(r.blendEquation(r.FUNC_ADD),x=Gn,w=Gn),Zt)switch(D){case gi:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case no:r.blendFunc(r.ONE,r.ONE);break;case io:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case so:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case gi:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case no:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case io:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case so:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}M=null,C=null,A=null,B=null,S.set(0,0,0),b=0,v=D,U=Zt}return}Mt=Mt||rt,jt=jt||ot,Kt=Kt||Tt,(rt!==x||Mt!==w)&&(r.blendEquationSeparate(yt[rt],yt[Mt]),x=rt,w=Mt),(ot!==M||Tt!==C||jt!==A||Kt!==B)&&(r.blendFuncSeparate(Rt[ot],Rt[Tt],Rt[jt],Rt[Kt]),M=ot,C=Tt,A=jt,B=Kt),(de.equals(S)===!1||Se!==b)&&(r.blendColor(de.r,de.g,de.b,Se),S.copy(de),b=Se),v=D,U=!1}function te(D,rt){D.side===mn?bt(r.CULL_FACE):It(r.CULL_FACE);let ot=D.side===Ce;rt&&(ot=!ot),Ut(ot),D.blending===gi&&D.transparent===!1?gt(An):gt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),l.setFunc(D.depthFunc),l.setTest(D.depthTest),l.setMask(D.depthWrite),a.setMask(D.colorWrite);const Tt=D.stencilWrite;c.setTest(Tt),Tt&&(c.setMask(D.stencilWriteMask),c.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),c.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),k(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?It(r.SAMPLE_ALPHA_TO_COVERAGE):bt(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ut(D){F!==D&&(D?r.frontFace(r.CW):r.frontFace(r.CCW),F=D)}function R(D){D!==zl?(It(r.CULL_FACE),D!==N&&(D===eo?r.cullFace(r.BACK):D===Hl?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):bt(r.CULL_FACE),N=D}function E(D){D!==L&&(z&&r.lineWidth(D),L=D)}function k(D,rt,ot){D?(It(r.POLYGON_OFFSET_FILL),(P!==rt||I!==ot)&&(r.polygonOffset(rt,ot),P=rt,I=ot)):bt(r.POLYGON_OFFSET_FILL)}function et(D){D?It(r.SCISSOR_TEST):bt(r.SCISSOR_TEST)}function tt(D){D===void 0&&(D=r.TEXTURE0+$-1),Z!==D&&(r.activeTexture(D),Z=D)}function nt(D,rt,ot){ot===void 0&&(Z===null?ot=r.TEXTURE0+$-1:ot=Z);let Tt=X[ot];Tt===void 0&&(Tt={type:void 0,texture:void 0},X[ot]=Tt),(Tt.type!==D||Tt.texture!==rt)&&(Z!==ot&&(r.activeTexture(ot),Z=ot),r.bindTexture(D,rt||Lt[D]),Tt.type=D,Tt.texture=rt)}function _t(){const D=X[Z];D!==void 0&&D.type!==void 0&&(r.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function lt(){try{r.compressedTexImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function dt(){try{r.compressedTexImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Et(){try{r.texSubImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ft(){try{r.texSubImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Q(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Yt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Gt(){try{r.texStorage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function At(){try{r.texStorage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function xt(){try{r.texImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ft(){try{r.texImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Dt(D){at.equals(D)===!1&&(r.scissor(D.x,D.y,D.z,D.w),at.copy(D))}function Xt(D){pt.equals(D)===!1&&(r.viewport(D.x,D.y,D.z,D.w),pt.copy(D))}function ne(D,rt){let ot=d.get(rt);ot===void 0&&(ot=new WeakMap,d.set(rt,ot));let Tt=ot.get(D);Tt===void 0&&(Tt=r.getUniformBlockIndex(rt,D.name),ot.set(D,Tt))}function Bt(D,rt){const Tt=d.get(rt).get(D);h.get(rt)!==Tt&&(r.uniformBlockBinding(rt,Tt,D.__bindingPointIndex),h.set(rt,Tt))}function it(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),n===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},Z=null,X={},m={},g=new WeakMap,_=[],p=null,f=!1,v=null,x=null,M=null,C=null,w=null,A=null,B=null,S=new qt(0,0,0),b=0,U=!1,F=null,N=null,L=null,P=null,I=null,at.set(0,0,r.canvas.width,r.canvas.height),pt.set(0,0,r.canvas.width,r.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:It,disable:bt,bindFramebuffer:Vt,drawBuffers:G,useProgram:Me,setBlending:gt,setMaterial:te,setFlipSided:Ut,setCullFace:R,setLineWidth:E,setPolygonOffset:k,setScissorTest:et,activeTexture:tt,bindTexture:nt,unbindTexture:_t,compressedTexImage2D:lt,compressedTexImage3D:dt,texImage2D:xt,texImage3D:ft,updateUBOMapping:ne,uniformBlockBinding:Bt,texStorage2D:Gt,texStorage3D:At,texSubImage2D:Et,texSubImage3D:Ft,compressedTexSubImage2D:Q,compressedTexSubImage3D:Yt,scissor:Dt,viewport:Xt,reset:it}}function Hp(r,t,e,n,i,s,o){const a=i.isWebGL2,l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let d;const u=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,E){return m?new OffscreenCanvas(R,E):Ls("canvas")}function _(R,E,k,et){let tt=1;if((R.width>et||R.height>et)&&(tt=et/Math.max(R.width,R.height)),tt<1||E===!0)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap){const nt=E?Fr:Math.floor,_t=nt(tt*R.width),lt=nt(tt*R.height);d===void 0&&(d=g(_t,lt));const dt=k?g(_t,lt):d;return dt.width=_t,dt.height=lt,dt.getContext("2d").drawImage(R,0,0,_t,lt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+R.width+"x"+R.height+") to ("+_t+"x"+lt+")."),dt}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+R.width+"x"+R.height+")."),R;return R}function p(R){return Oo(R.width)&&Oo(R.height)}function f(R){return a?!1:R.wrapS!==qe||R.wrapT!==qe||R.minFilter!==Te&&R.minFilter!==Be}function v(R,E){return R.generateMipmaps&&E&&R.minFilter!==Te&&R.minFilter!==Be}function x(R){r.generateMipmap(R)}function M(R,E,k,et,tt=!1){if(a===!1)return E;if(R!==null){if(r[R]!==void 0)return r[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let nt=E;if(E===r.RED&&(k===r.FLOAT&&(nt=r.R32F),k===r.HALF_FLOAT&&(nt=r.R16F),k===r.UNSIGNED_BYTE&&(nt=r.R8)),E===r.RED_INTEGER&&(k===r.UNSIGNED_BYTE&&(nt=r.R8UI),k===r.UNSIGNED_SHORT&&(nt=r.R16UI),k===r.UNSIGNED_INT&&(nt=r.R32UI),k===r.BYTE&&(nt=r.R8I),k===r.SHORT&&(nt=r.R16I),k===r.INT&&(nt=r.R32I)),E===r.RG&&(k===r.FLOAT&&(nt=r.RG32F),k===r.HALF_FLOAT&&(nt=r.RG16F),k===r.UNSIGNED_BYTE&&(nt=r.RG8)),E===r.RGBA){const _t=tt?Ts:$t.getTransfer(et);k===r.FLOAT&&(nt=r.RGBA32F),k===r.HALF_FLOAT&&(nt=r.RGBA16F),k===r.UNSIGNED_BYTE&&(nt=_t===Qt?r.SRGB8_ALPHA8:r.RGBA8),k===r.UNSIGNED_SHORT_4_4_4_4&&(nt=r.RGBA4),k===r.UNSIGNED_SHORT_5_5_5_1&&(nt=r.RGB5_A1)}return(nt===r.R16F||nt===r.R32F||nt===r.RG16F||nt===r.RG32F||nt===r.RGBA16F||nt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),nt}function C(R,E,k){return v(R,k)===!0||R.isFramebufferTexture&&R.minFilter!==Te&&R.minFilter!==Be?Math.log2(Math.max(E.width,E.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?E.mipmaps.length:1}function w(R){return R===Te||R===ao||R===Ws?r.NEAREST:r.LINEAR}function A(R){const E=R.target;E.removeEventListener("dispose",A),S(E),E.isVideoTexture&&h.delete(E)}function B(R){const E=R.target;E.removeEventListener("dispose",B),U(E)}function S(R){const E=n.get(R);if(E.__webglInit===void 0)return;const k=R.source,et=u.get(k);if(et){const tt=et[E.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&b(R),Object.keys(et).length===0&&u.delete(k)}n.remove(R)}function b(R){const E=n.get(R);r.deleteTexture(E.__webglTexture);const k=R.source,et=u.get(k);delete et[E.__cacheKey],o.memory.textures--}function U(R){const E=R.texture,k=n.get(R),et=n.get(E);if(et.__webglTexture!==void 0&&(r.deleteTexture(et.__webglTexture),o.memory.textures--),R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let tt=0;tt<6;tt++){if(Array.isArray(k.__webglFramebuffer[tt]))for(let nt=0;nt<k.__webglFramebuffer[tt].length;nt++)r.deleteFramebuffer(k.__webglFramebuffer[tt][nt]);else r.deleteFramebuffer(k.__webglFramebuffer[tt]);k.__webglDepthbuffer&&r.deleteRenderbuffer(k.__webglDepthbuffer[tt])}else{if(Array.isArray(k.__webglFramebuffer))for(let tt=0;tt<k.__webglFramebuffer.length;tt++)r.deleteFramebuffer(k.__webglFramebuffer[tt]);else r.deleteFramebuffer(k.__webglFramebuffer);if(k.__webglDepthbuffer&&r.deleteRenderbuffer(k.__webglDepthbuffer),k.__webglMultisampledFramebuffer&&r.deleteFramebuffer(k.__webglMultisampledFramebuffer),k.__webglColorRenderbuffer)for(let tt=0;tt<k.__webglColorRenderbuffer.length;tt++)k.__webglColorRenderbuffer[tt]&&r.deleteRenderbuffer(k.__webglColorRenderbuffer[tt]);k.__webglDepthRenderbuffer&&r.deleteRenderbuffer(k.__webglDepthRenderbuffer)}if(R.isWebGLMultipleRenderTargets)for(let tt=0,nt=E.length;tt<nt;tt++){const _t=n.get(E[tt]);_t.__webglTexture&&(r.deleteTexture(_t.__webglTexture),o.memory.textures--),n.remove(E[tt])}n.remove(E),n.remove(R)}let F=0;function N(){F=0}function L(){const R=F;return R>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),F+=1,R}function P(R){const E=[];return E.push(R.wrapS),E.push(R.wrapT),E.push(R.wrapR||0),E.push(R.magFilter),E.push(R.minFilter),E.push(R.anisotropy),E.push(R.internalFormat),E.push(R.format),E.push(R.type),E.push(R.generateMipmaps),E.push(R.premultiplyAlpha),E.push(R.flipY),E.push(R.unpackAlignment),E.push(R.colorSpace),E.join()}function I(R,E){const k=n.get(R);if(R.isVideoTexture&&te(R),R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){const et=R.image;if(et===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(et.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{at(k,R,E);return}}e.bindTexture(r.TEXTURE_2D,k.__webglTexture,r.TEXTURE0+E)}function $(R,E){const k=n.get(R);if(R.version>0&&k.__version!==R.version){at(k,R,E);return}e.bindTexture(r.TEXTURE_2D_ARRAY,k.__webglTexture,r.TEXTURE0+E)}function z(R,E){const k=n.get(R);if(R.version>0&&k.__version!==R.version){at(k,R,E);return}e.bindTexture(r.TEXTURE_3D,k.__webglTexture,r.TEXTURE0+E)}function W(R,E){const k=n.get(R);if(R.version>0&&k.__version!==R.version){pt(k,R,E);return}e.bindTexture(r.TEXTURE_CUBE_MAP,k.__webglTexture,r.TEXTURE0+E)}const K={[Dr]:r.REPEAT,[qe]:r.CLAMP_TO_EDGE,[Nr]:r.MIRRORED_REPEAT},Z={[Te]:r.NEAREST,[ao]:r.NEAREST_MIPMAP_NEAREST,[Ws]:r.NEAREST_MIPMAP_LINEAR,[Be]:r.LINEAR,[xc]:r.LINEAR_MIPMAP_NEAREST,[Oi]:r.LINEAR_MIPMAP_LINEAR},X={[Pc]:r.NEVER,[Oc]:r.ALWAYS,[Ic]:r.LESS,[nl]:r.LEQUAL,[Dc]:r.EQUAL,[Fc]:r.GEQUAL,[Nc]:r.GREATER,[Uc]:r.NOTEQUAL};function j(R,E,k){if(k?(r.texParameteri(R,r.TEXTURE_WRAP_S,K[E.wrapS]),r.texParameteri(R,r.TEXTURE_WRAP_T,K[E.wrapT]),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,K[E.wrapR]),r.texParameteri(R,r.TEXTURE_MAG_FILTER,Z[E.magFilter]),r.texParameteri(R,r.TEXTURE_MIN_FILTER,Z[E.minFilter])):(r.texParameteri(R,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(R,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(E.wrapS!==qe||E.wrapT!==qe)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(R,r.TEXTURE_MAG_FILTER,w(E.magFilter)),r.texParameteri(R,r.TEXTURE_MIN_FILTER,w(E.minFilter)),E.minFilter!==Te&&E.minFilter!==Be&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),E.compareFunction&&(r.texParameteri(R,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(R,r.TEXTURE_COMPARE_FUNC,X[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){const et=t.get("EXT_texture_filter_anisotropic");if(E.magFilter===Te||E.minFilter!==Ws&&E.minFilter!==Oi||E.type===wn&&t.has("OES_texture_float_linear")===!1||a===!1&&E.type===Bi&&t.has("OES_texture_half_float_linear")===!1)return;(E.anisotropy>1||n.get(E).__currentAnisotropy)&&(r.texParameterf(R,et.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy)}}function J(R,E){let k=!1;R.__webglInit===void 0&&(R.__webglInit=!0,E.addEventListener("dispose",A));const et=E.source;let tt=u.get(et);tt===void 0&&(tt={},u.set(et,tt));const nt=P(E);if(nt!==R.__cacheKey){tt[nt]===void 0&&(tt[nt]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,k=!0),tt[nt].usedTimes++;const _t=tt[R.__cacheKey];_t!==void 0&&(tt[R.__cacheKey].usedTimes--,_t.usedTimes===0&&b(E)),R.__cacheKey=nt,R.__webglTexture=tt[nt].texture}return k}function at(R,E,k){let et=r.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(et=r.TEXTURE_2D_ARRAY),E.isData3DTexture&&(et=r.TEXTURE_3D);const tt=J(R,E),nt=E.source;e.bindTexture(et,R.__webglTexture,r.TEXTURE0+k);const _t=n.get(nt);if(nt.version!==_t.__version||tt===!0){e.activeTexture(r.TEXTURE0+k);const lt=$t.getPrimaries($t.workingColorSpace),dt=E.colorSpace===ze?null:$t.getPrimaries(E.colorSpace),Et=E.colorSpace===ze||lt===dt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Et);const Ft=f(E)&&p(E.image)===!1;let Q=_(E.image,Ft,!1,i.maxTextureSize);Q=Ut(E,Q);const Yt=p(Q)||a,Gt=s.convert(E.format,E.colorSpace);let At=s.convert(E.type),xt=M(E.internalFormat,Gt,At,E.colorSpace,E.isVideoTexture);j(et,E,Yt);let ft;const Dt=E.mipmaps,Xt=a&&E.isVideoTexture!==!0&&xt!==Qa,ne=_t.__version===void 0||tt===!0,Bt=C(E,Q,Yt);if(E.isDepthTexture)xt=r.DEPTH_COMPONENT,a?E.type===wn?xt=r.DEPTH_COMPONENT32F:E.type===Tn?xt=r.DEPTH_COMPONENT24:E.type===Wn?xt=r.DEPTH24_STENCIL8:xt=r.DEPTH_COMPONENT16:E.type===wn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),E.format===qn&&xt===r.DEPTH_COMPONENT&&E.type!==zr&&E.type!==Tn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),E.type=Tn,At=s.convert(E.type)),E.format===Mi&&xt===r.DEPTH_COMPONENT&&(xt=r.DEPTH_STENCIL,E.type!==Wn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),E.type=Wn,At=s.convert(E.type))),ne&&(Xt?e.texStorage2D(r.TEXTURE_2D,1,xt,Q.width,Q.height):e.texImage2D(r.TEXTURE_2D,0,xt,Q.width,Q.height,0,Gt,At,null));else if(E.isDataTexture)if(Dt.length>0&&Yt){Xt&&ne&&e.texStorage2D(r.TEXTURE_2D,Bt,xt,Dt[0].width,Dt[0].height);for(let it=0,D=Dt.length;it<D;it++)ft=Dt[it],Xt?e.texSubImage2D(r.TEXTURE_2D,it,0,0,ft.width,ft.height,Gt,At,ft.data):e.texImage2D(r.TEXTURE_2D,it,xt,ft.width,ft.height,0,Gt,At,ft.data);E.generateMipmaps=!1}else Xt?(ne&&e.texStorage2D(r.TEXTURE_2D,Bt,xt,Q.width,Q.height),e.texSubImage2D(r.TEXTURE_2D,0,0,0,Q.width,Q.height,Gt,At,Q.data)):e.texImage2D(r.TEXTURE_2D,0,xt,Q.width,Q.height,0,Gt,At,Q.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Xt&&ne&&e.texStorage3D(r.TEXTURE_2D_ARRAY,Bt,xt,Dt[0].width,Dt[0].height,Q.depth);for(let it=0,D=Dt.length;it<D;it++)ft=Dt[it],E.format!==Xe?Gt!==null?Xt?e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,it,0,0,0,ft.width,ft.height,Q.depth,Gt,ft.data,0,0):e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,it,xt,ft.width,ft.height,Q.depth,0,ft.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xt?e.texSubImage3D(r.TEXTURE_2D_ARRAY,it,0,0,0,ft.width,ft.height,Q.depth,Gt,At,ft.data):e.texImage3D(r.TEXTURE_2D_ARRAY,it,xt,ft.width,ft.height,Q.depth,0,Gt,At,ft.data)}else{Xt&&ne&&e.texStorage2D(r.TEXTURE_2D,Bt,xt,Dt[0].width,Dt[0].height);for(let it=0,D=Dt.length;it<D;it++)ft=Dt[it],E.format!==Xe?Gt!==null?Xt?e.compressedTexSubImage2D(r.TEXTURE_2D,it,0,0,ft.width,ft.height,Gt,ft.data):e.compressedTexImage2D(r.TEXTURE_2D,it,xt,ft.width,ft.height,0,ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xt?e.texSubImage2D(r.TEXTURE_2D,it,0,0,ft.width,ft.height,Gt,At,ft.data):e.texImage2D(r.TEXTURE_2D,it,xt,ft.width,ft.height,0,Gt,At,ft.data)}else if(E.isDataArrayTexture)Xt?(ne&&e.texStorage3D(r.TEXTURE_2D_ARRAY,Bt,xt,Q.width,Q.height,Q.depth),e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,Gt,At,Q.data)):e.texImage3D(r.TEXTURE_2D_ARRAY,0,xt,Q.width,Q.height,Q.depth,0,Gt,At,Q.data);else if(E.isData3DTexture)Xt?(ne&&e.texStorage3D(r.TEXTURE_3D,Bt,xt,Q.width,Q.height,Q.depth),e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,Gt,At,Q.data)):e.texImage3D(r.TEXTURE_3D,0,xt,Q.width,Q.height,Q.depth,0,Gt,At,Q.data);else if(E.isFramebufferTexture){if(ne)if(Xt)e.texStorage2D(r.TEXTURE_2D,Bt,xt,Q.width,Q.height);else{let it=Q.width,D=Q.height;for(let rt=0;rt<Bt;rt++)e.texImage2D(r.TEXTURE_2D,rt,xt,it,D,0,Gt,At,null),it>>=1,D>>=1}}else if(Dt.length>0&&Yt){Xt&&ne&&e.texStorage2D(r.TEXTURE_2D,Bt,xt,Dt[0].width,Dt[0].height);for(let it=0,D=Dt.length;it<D;it++)ft=Dt[it],Xt?e.texSubImage2D(r.TEXTURE_2D,it,0,0,Gt,At,ft):e.texImage2D(r.TEXTURE_2D,it,xt,Gt,At,ft);E.generateMipmaps=!1}else Xt?(ne&&e.texStorage2D(r.TEXTURE_2D,Bt,xt,Q.width,Q.height),e.texSubImage2D(r.TEXTURE_2D,0,0,0,Gt,At,Q)):e.texImage2D(r.TEXTURE_2D,0,xt,Gt,At,Q);v(E,Yt)&&x(et),_t.__version=nt.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function pt(R,E,k){if(E.image.length!==6)return;const et=J(R,E),tt=E.source;e.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+k);const nt=n.get(tt);if(tt.version!==nt.__version||et===!0){e.activeTexture(r.TEXTURE0+k);const _t=$t.getPrimaries($t.workingColorSpace),lt=E.colorSpace===ze?null:$t.getPrimaries(E.colorSpace),dt=E.colorSpace===ze||_t===lt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt);const Et=E.isCompressedTexture||E.image[0].isCompressedTexture,Ft=E.image[0]&&E.image[0].isDataTexture,Q=[];for(let it=0;it<6;it++)!Et&&!Ft?Q[it]=_(E.image[it],!1,!0,i.maxCubemapSize):Q[it]=Ft?E.image[it].image:E.image[it],Q[it]=Ut(E,Q[it]);const Yt=Q[0],Gt=p(Yt)||a,At=s.convert(E.format,E.colorSpace),xt=s.convert(E.type),ft=M(E.internalFormat,At,xt,E.colorSpace),Dt=a&&E.isVideoTexture!==!0,Xt=nt.__version===void 0||et===!0;let ne=C(E,Yt,Gt);j(r.TEXTURE_CUBE_MAP,E,Gt);let Bt;if(Et){Dt&&Xt&&e.texStorage2D(r.TEXTURE_CUBE_MAP,ne,ft,Yt.width,Yt.height);for(let it=0;it<6;it++){Bt=Q[it].mipmaps;for(let D=0;D<Bt.length;D++){const rt=Bt[D];E.format!==Xe?At!==null?Dt?e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+it,D,0,0,rt.width,rt.height,At,rt.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+it,D,ft,rt.width,rt.height,0,rt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Dt?e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+it,D,0,0,rt.width,rt.height,At,xt,rt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+it,D,ft,rt.width,rt.height,0,At,xt,rt.data)}}}else{Bt=E.mipmaps,Dt&&Xt&&(Bt.length>0&&ne++,e.texStorage2D(r.TEXTURE_CUBE_MAP,ne,ft,Q[0].width,Q[0].height));for(let it=0;it<6;it++)if(Ft){Dt?e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,Q[it].width,Q[it].height,At,xt,Q[it].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,ft,Q[it].width,Q[it].height,0,At,xt,Q[it].data);for(let D=0;D<Bt.length;D++){const ot=Bt[D].image[it].image;Dt?e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+it,D+1,0,0,ot.width,ot.height,At,xt,ot.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+it,D+1,ft,ot.width,ot.height,0,At,xt,ot.data)}}else{Dt?e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,At,xt,Q[it]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,ft,At,xt,Q[it]);for(let D=0;D<Bt.length;D++){const rt=Bt[D];Dt?e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+it,D+1,0,0,At,xt,rt.image[it]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+it,D+1,ft,At,xt,rt.image[it])}}}v(E,Gt)&&x(r.TEXTURE_CUBE_MAP),nt.__version=tt.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function mt(R,E,k,et,tt,nt){const _t=s.convert(k.format,k.colorSpace),lt=s.convert(k.type),dt=M(k.internalFormat,_t,lt,k.colorSpace);if(!n.get(E).__hasExternalTextures){const Ft=Math.max(1,E.width>>nt),Q=Math.max(1,E.height>>nt);tt===r.TEXTURE_3D||tt===r.TEXTURE_2D_ARRAY?e.texImage3D(tt,nt,dt,Ft,Q,E.depth,0,_t,lt,null):e.texImage2D(tt,nt,dt,Ft,Q,0,_t,lt,null)}e.bindFramebuffer(r.FRAMEBUFFER,R),gt(E)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,et,tt,n.get(k).__webglTexture,0,Rt(E)):(tt===r.TEXTURE_2D||tt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,et,tt,n.get(k).__webglTexture,nt),e.bindFramebuffer(r.FRAMEBUFFER,null)}function Lt(R,E,k){if(r.bindRenderbuffer(r.RENDERBUFFER,R),E.depthBuffer&&!E.stencilBuffer){let et=a===!0?r.DEPTH_COMPONENT24:r.DEPTH_COMPONENT16;if(k||gt(E)){const tt=E.depthTexture;tt&&tt.isDepthTexture&&(tt.type===wn?et=r.DEPTH_COMPONENT32F:tt.type===Tn&&(et=r.DEPTH_COMPONENT24));const nt=Rt(E);gt(E)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,nt,et,E.width,E.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,nt,et,E.width,E.height)}else r.renderbufferStorage(r.RENDERBUFFER,et,E.width,E.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,R)}else if(E.depthBuffer&&E.stencilBuffer){const et=Rt(E);k&&gt(E)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,et,r.DEPTH24_STENCIL8,E.width,E.height):gt(E)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,et,r.DEPTH24_STENCIL8,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,R)}else{const et=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let tt=0;tt<et.length;tt++){const nt=et[tt],_t=s.convert(nt.format,nt.colorSpace),lt=s.convert(nt.type),dt=M(nt.internalFormat,_t,lt,nt.colorSpace),Et=Rt(E);k&&gt(E)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Et,dt,E.width,E.height):gt(E)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Et,dt,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,dt,E.width,E.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function It(R,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,R),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),I(E.depthTexture,0);const et=n.get(E.depthTexture).__webglTexture,tt=Rt(E);if(E.depthTexture.format===qn)gt(E)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,et,0,tt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,et,0);else if(E.depthTexture.format===Mi)gt(E)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,et,0,tt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,et,0);else throw new Error("Unknown depthTexture format")}function bt(R){const E=n.get(R),k=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!E.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");It(E.__webglFramebuffer,R)}else if(k){E.__webglDepthbuffer=[];for(let et=0;et<6;et++)e.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[et]),E.__webglDepthbuffer[et]=r.createRenderbuffer(),Lt(E.__webglDepthbuffer[et],R,!1)}else e.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer=r.createRenderbuffer(),Lt(E.__webglDepthbuffer,R,!1);e.bindFramebuffer(r.FRAMEBUFFER,null)}function Vt(R,E,k){const et=n.get(R);E!==void 0&&mt(et.__webglFramebuffer,R,R.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),k!==void 0&&bt(R)}function G(R){const E=R.texture,k=n.get(R),et=n.get(E);R.addEventListener("dispose",B),R.isWebGLMultipleRenderTargets!==!0&&(et.__webglTexture===void 0&&(et.__webglTexture=r.createTexture()),et.__version=E.version,o.memory.textures++);const tt=R.isWebGLCubeRenderTarget===!0,nt=R.isWebGLMultipleRenderTargets===!0,_t=p(R)||a;if(tt){k.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(a&&E.mipmaps&&E.mipmaps.length>0){k.__webglFramebuffer[lt]=[];for(let dt=0;dt<E.mipmaps.length;dt++)k.__webglFramebuffer[lt][dt]=r.createFramebuffer()}else k.__webglFramebuffer[lt]=r.createFramebuffer()}else{if(a&&E.mipmaps&&E.mipmaps.length>0){k.__webglFramebuffer=[];for(let lt=0;lt<E.mipmaps.length;lt++)k.__webglFramebuffer[lt]=r.createFramebuffer()}else k.__webglFramebuffer=r.createFramebuffer();if(nt)if(i.drawBuffers){const lt=R.texture;for(let dt=0,Et=lt.length;dt<Et;dt++){const Ft=n.get(lt[dt]);Ft.__webglTexture===void 0&&(Ft.__webglTexture=r.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&R.samples>0&&gt(R)===!1){const lt=nt?E:[E];k.__webglMultisampledFramebuffer=r.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let dt=0;dt<lt.length;dt++){const Et=lt[dt];k.__webglColorRenderbuffer[dt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,k.__webglColorRenderbuffer[dt]);const Ft=s.convert(Et.format,Et.colorSpace),Q=s.convert(Et.type),Yt=M(Et.internalFormat,Ft,Q,Et.colorSpace,R.isXRRenderTarget===!0),Gt=Rt(R);r.renderbufferStorageMultisample(r.RENDERBUFFER,Gt,Yt,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+dt,r.RENDERBUFFER,k.__webglColorRenderbuffer[dt])}r.bindRenderbuffer(r.RENDERBUFFER,null),R.depthBuffer&&(k.__webglDepthRenderbuffer=r.createRenderbuffer(),Lt(k.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(tt){e.bindTexture(r.TEXTURE_CUBE_MAP,et.__webglTexture),j(r.TEXTURE_CUBE_MAP,E,_t);for(let lt=0;lt<6;lt++)if(a&&E.mipmaps&&E.mipmaps.length>0)for(let dt=0;dt<E.mipmaps.length;dt++)mt(k.__webglFramebuffer[lt][dt],R,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+lt,dt);else mt(k.__webglFramebuffer[lt],R,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);v(E,_t)&&x(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(nt){const lt=R.texture;for(let dt=0,Et=lt.length;dt<Et;dt++){const Ft=lt[dt],Q=n.get(Ft);e.bindTexture(r.TEXTURE_2D,Q.__webglTexture),j(r.TEXTURE_2D,Ft,_t),mt(k.__webglFramebuffer,R,Ft,r.COLOR_ATTACHMENT0+dt,r.TEXTURE_2D,0),v(Ft,_t)&&x(r.TEXTURE_2D)}e.unbindTexture()}else{let lt=r.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(a?lt=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(lt,et.__webglTexture),j(lt,E,_t),a&&E.mipmaps&&E.mipmaps.length>0)for(let dt=0;dt<E.mipmaps.length;dt++)mt(k.__webglFramebuffer[dt],R,E,r.COLOR_ATTACHMENT0,lt,dt);else mt(k.__webglFramebuffer,R,E,r.COLOR_ATTACHMENT0,lt,0);v(E,_t)&&x(lt),e.unbindTexture()}R.depthBuffer&&bt(R)}function Me(R){const E=p(R)||a,k=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let et=0,tt=k.length;et<tt;et++){const nt=k[et];if(v(nt,E)){const _t=R.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,lt=n.get(nt).__webglTexture;e.bindTexture(_t,lt),x(_t),e.unbindTexture()}}}function yt(R){if(a&&R.samples>0&&gt(R)===!1){const E=R.isWebGLMultipleRenderTargets?R.texture:[R.texture],k=R.width,et=R.height;let tt=r.COLOR_BUFFER_BIT;const nt=[],_t=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,lt=n.get(R),dt=R.isWebGLMultipleRenderTargets===!0;if(dt)for(let Et=0;Et<E.length;Et++)e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Et,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Et,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let Et=0;Et<E.length;Et++){nt.push(r.COLOR_ATTACHMENT0+Et),R.depthBuffer&&nt.push(_t);const Ft=lt.__ignoreDepthValues!==void 0?lt.__ignoreDepthValues:!1;if(Ft===!1&&(R.depthBuffer&&(tt|=r.DEPTH_BUFFER_BIT),R.stencilBuffer&&(tt|=r.STENCIL_BUFFER_BIT)),dt&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,lt.__webglColorRenderbuffer[Et]),Ft===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[_t]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[_t])),dt){const Q=n.get(E[Et]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Q,0)}r.blitFramebuffer(0,0,k,et,0,0,k,et,tt,r.NEAREST),c&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,nt)}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),dt)for(let Et=0;Et<E.length;Et++){e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Et,r.RENDERBUFFER,lt.__webglColorRenderbuffer[Et]);const Ft=n.get(E[Et]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Et,r.TEXTURE_2D,Ft,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}}function Rt(R){return Math.min(i.maxSamples,R.samples)}function gt(R){const E=n.get(R);return a&&R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function te(R){const E=o.render.frame;h.get(R)!==E&&(h.set(R,E),R.update())}function Ut(R,E){const k=R.colorSpace,et=R.format,tt=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||R.format===Ur||k!==_n&&k!==ze&&($t.getTransfer(k)===Qt?a===!1?t.has("EXT_sRGB")===!0&&et===Xe?(R.format=Ur,R.minFilter=Be,R.generateMipmaps=!1):E=sl.sRGBToLinear(E):(et!==Xe||tt!==Cn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),E}this.allocateTextureUnit=L,this.resetTextureUnits=N,this.setTexture2D=I,this.setTexture2DArray=$,this.setTexture3D=z,this.setTextureCube=W,this.rebindTextures=Vt,this.setupRenderTarget=G,this.updateRenderTargetMipmap=Me,this.updateMultisampleRenderTarget=yt,this.setupDepthRenderbuffer=bt,this.setupFrameBufferTexture=mt,this.useMultisampledRTT=gt}function Gp(r,t,e){const n=e.isWebGL2;function i(s,o=ze){let a;const l=$t.getTransfer(o);if(s===Cn)return r.UNSIGNED_BYTE;if(s===$a)return r.UNSIGNED_SHORT_4_4_4_4;if(s===ja)return r.UNSIGNED_SHORT_5_5_5_1;if(s===yc)return r.BYTE;if(s===Mc)return r.SHORT;if(s===zr)return r.UNSIGNED_SHORT;if(s===Ya)return r.INT;if(s===Tn)return r.UNSIGNED_INT;if(s===wn)return r.FLOAT;if(s===Bi)return n?r.HALF_FLOAT:(a=t.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===Sc)return r.ALPHA;if(s===Xe)return r.RGBA;if(s===Ec)return r.LUMINANCE;if(s===bc)return r.LUMINANCE_ALPHA;if(s===qn)return r.DEPTH_COMPONENT;if(s===Mi)return r.DEPTH_STENCIL;if(s===Ur)return a=t.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===Tc)return r.RED;if(s===Ka)return r.RED_INTEGER;if(s===wc)return r.RG;if(s===Za)return r.RG_INTEGER;if(s===Ja)return r.RGBA_INTEGER;if(s===qs||s===Xs||s===Ys||s===$s)if(l===Qt)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===qs)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Xs)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Ys)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===$s)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===qs)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Xs)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Ys)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===$s)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===lo||s===co||s===ho||s===uo)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===lo)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===co)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===ho)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===uo)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Qa)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===fo||s===po)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(s===fo)return l===Qt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===po)return l===Qt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===mo||s===go||s===_o||s===vo||s===xo||s===yo||s===Mo||s===So||s===Eo||s===bo||s===To||s===wo||s===Ao||s===Ro)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(s===mo)return l===Qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===go)return l===Qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===_o)return l===Qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===vo)return l===Qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===xo)return l===Qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===yo)return l===Qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Mo)return l===Qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===So)return l===Qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Eo)return l===Qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===bo)return l===Qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===To)return l===Qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===wo)return l===Qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Ao)return l===Qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Ro)return l===Qt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===js||s===Co||s===Lo)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(s===js)return l===Qt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Co)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Lo)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Ac||s===Po||s===Io||s===Do)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(s===js)return a.COMPRESSED_RED_RGTC1_EXT;if(s===Po)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Io)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Do)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Wn?n?r.UNSIGNED_INT_24_8:(a=t.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}class Vp extends De{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ms extends ye{constructor(){super(),this.isGroup=!0,this.type="Group"}}const kp={type:"move"};class yr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ms,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ms,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ms,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const p=e.getJointPose(_,n),f=this._getHandJoint(c,_);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),m=.02,g=.005;c.inputState.pinching&&u>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(kp)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ms;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Wp extends bi{constructor(t,e){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,m=null,g=null;const _=e.getContextAttributes();let p=null,f=null;const v=[],x=[],M=new kt;let C=null;const w=new De;w.layers.enable(1),w.viewport=new me;const A=new De;A.layers.enable(2),A.viewport=new me;const B=[w,A],S=new Vp;S.layers.enable(1),S.layers.enable(2);let b=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let J=v[j];return J===void 0&&(J=new yr,v[j]=J),J.getTargetRaySpace()},this.getControllerGrip=function(j){let J=v[j];return J===void 0&&(J=new yr,v[j]=J),J.getGripSpace()},this.getHand=function(j){let J=v[j];return J===void 0&&(J=new yr,v[j]=J),J.getHandSpace()};function F(j){const J=x.indexOf(j.inputSource);if(J===-1)return;const at=v[J];at!==void 0&&(at.update(j.inputSource,j.frame,c||o),at.dispatchEvent({type:j.type,data:j.inputSource}))}function N(){i.removeEventListener("select",F),i.removeEventListener("selectstart",F),i.removeEventListener("selectend",F),i.removeEventListener("squeeze",F),i.removeEventListener("squeezestart",F),i.removeEventListener("squeezeend",F),i.removeEventListener("end",N),i.removeEventListener("inputsourceschange",L);for(let j=0;j<v.length;j++){const J=x[j];J!==null&&(x[j]=null,v[j].disconnect(J))}b=null,U=null,t.setRenderTarget(p),m=null,u=null,d=null,i=null,f=null,X.stop(),n.isPresenting=!1,t.setPixelRatio(C),t.setSize(M.width,M.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return u!==null?u:m},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(j){if(i=j,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",F),i.addEventListener("selectstart",F),i.addEventListener("selectend",F),i.addEventListener("squeeze",F),i.addEventListener("squeezestart",F),i.addEventListener("squeezeend",F),i.addEventListener("end",N),i.addEventListener("inputsourceschange",L),_.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(M),i.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const J={antialias:i.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(i,e,J),i.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),f=new Yn(m.framebufferWidth,m.framebufferHeight,{format:Xe,type:Cn,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil})}else{let J=null,at=null,pt=null;_.depth&&(pt=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,J=_.stencil?Mi:qn,at=_.stencil?Wn:Tn);const mt={colorFormat:e.RGBA8,depthFormat:pt,scaleFactor:s};d=new XRWebGLBinding(i,e),u=d.createProjectionLayer(mt),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),f=new Yn(u.textureWidth,u.textureHeight,{format:Xe,type:Cn,depthTexture:new gl(u.textureWidth,u.textureHeight,at,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0});const Lt=t.properties.get(f);Lt.__ignoreDepthValues=u.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),X.setContext(i),X.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function L(j){for(let J=0;J<j.removed.length;J++){const at=j.removed[J],pt=x.indexOf(at);pt>=0&&(x[pt]=null,v[pt].disconnect(at))}for(let J=0;J<j.added.length;J++){const at=j.added[J];let pt=x.indexOf(at);if(pt===-1){for(let Lt=0;Lt<v.length;Lt++)if(Lt>=x.length){x.push(at),pt=Lt;break}else if(x[Lt]===null){x[Lt]=at,pt=Lt;break}if(pt===-1)break}const mt=v[pt];mt&&mt.connect(at)}}const P=new H,I=new H;function $(j,J,at){P.setFromMatrixPosition(J.matrixWorld),I.setFromMatrixPosition(at.matrixWorld);const pt=P.distanceTo(I),mt=J.projectionMatrix.elements,Lt=at.projectionMatrix.elements,It=mt[14]/(mt[10]-1),bt=mt[14]/(mt[10]+1),Vt=(mt[9]+1)/mt[5],G=(mt[9]-1)/mt[5],Me=(mt[8]-1)/mt[0],yt=(Lt[8]+1)/Lt[0],Rt=It*Me,gt=It*yt,te=pt/(-Me+yt),Ut=te*-Me;J.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Ut),j.translateZ(te),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert();const R=It+te,E=bt+te,k=Rt-Ut,et=gt+(pt-Ut),tt=Vt*bt/E*R,nt=G*bt/E*R;j.projectionMatrix.makePerspective(k,et,tt,nt,R,E),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}function z(j,J){J===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(J.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(i===null)return;S.near=A.near=w.near=j.near,S.far=A.far=w.far=j.far,(b!==S.near||U!==S.far)&&(i.updateRenderState({depthNear:S.near,depthFar:S.far}),b=S.near,U=S.far);const J=j.parent,at=S.cameras;z(S,J);for(let pt=0;pt<at.length;pt++)z(at[pt],J);at.length===2?$(S,w,A):S.projectionMatrix.copy(w.projectionMatrix),W(j,S,J)};function W(j,J,at){at===null?j.matrix.copy(J.matrixWorld):(j.matrix.copy(at.matrixWorld),j.matrix.invert(),j.matrix.multiply(J.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(J.projectionMatrix),j.projectionMatrixInverse.copy(J.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Cs*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(u===null&&m===null))return l},this.setFoveation=function(j){l=j,u!==null&&(u.fixedFoveation=j),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=j)};let K=null;function Z(j,J){if(h=J.getViewerPose(c||o),g=J,h!==null){const at=h.views;m!==null&&(t.setRenderTargetFramebuffer(f,m.framebuffer),t.setRenderTarget(f));let pt=!1;at.length!==S.cameras.length&&(S.cameras.length=0,pt=!0);for(let mt=0;mt<at.length;mt++){const Lt=at[mt];let It=null;if(m!==null)It=m.getViewport(Lt);else{const Vt=d.getViewSubImage(u,Lt);It=Vt.viewport,mt===0&&(t.setRenderTargetTextures(f,Vt.colorTexture,u.ignoreDepthValues?void 0:Vt.depthStencilTexture),t.setRenderTarget(f))}let bt=B[mt];bt===void 0&&(bt=new De,bt.layers.enable(mt),bt.viewport=new me,B[mt]=bt),bt.matrix.fromArray(Lt.transform.matrix),bt.matrix.decompose(bt.position,bt.quaternion,bt.scale),bt.projectionMatrix.fromArray(Lt.projectionMatrix),bt.projectionMatrixInverse.copy(bt.projectionMatrix).invert(),bt.viewport.set(It.x,It.y,It.width,It.height),mt===0&&(S.matrix.copy(bt.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),pt===!0&&S.cameras.push(bt)}}for(let at=0;at<v.length;at++){const pt=x[at],mt=v[at];pt!==null&&mt!==void 0&&mt.update(pt,J,c||o)}K&&K(j,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),g=null}const X=new ml;X.setAnimationLoop(Z),this.setAnimationLoop=function(j){K=j},this.dispose=function(){}}}function qp(r,t){function e(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function n(p,f){f.color.getRGB(p.fogColor.value,dl(r)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function i(p,f,v,x,M){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(p,f):f.isMeshToonMaterial?(s(p,f),d(p,f)):f.isMeshPhongMaterial?(s(p,f),h(p,f)):f.isMeshStandardMaterial?(s(p,f),u(p,f),f.isMeshPhysicalMaterial&&m(p,f,M)):f.isMeshMatcapMaterial?(s(p,f),g(p,f)):f.isMeshDepthMaterial?s(p,f):f.isMeshDistanceMaterial?(s(p,f),_(p,f)):f.isMeshNormalMaterial?s(p,f):f.isLineBasicMaterial?(o(p,f),f.isLineDashedMaterial&&a(p,f)):f.isPointsMaterial?l(p,f,v,x):f.isSpriteMaterial?c(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,e(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===Ce&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,e(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===Ce&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,e(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,e(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const v=t.get(f).envMap;if(v&&(p.envMap.value=v,p.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap){p.lightMap.value=f.lightMap;const x=r._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=f.lightMapIntensity*x,e(f.lightMap,p.lightMapTransform)}f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,p.aoMapTransform))}function o(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform))}function a(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function l(p,f,v,x){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*v,p.scale.value=x*.5,f.map&&(p.map.value=f.map,e(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function c(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function h(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function d(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function u(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,p.roughnessMapTransform)),t.get(f).envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function m(p,f,v){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ce&&p.clearcoatNormalScale.value.negate())),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,f){f.matcap&&(p.matcap.value=f.matcap)}function _(p,f){const v=t.get(f).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Xp(r,t,e,n){let i={},s={},o=[];const a=e.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(v,x){const M=x.program;n.uniformBlockBinding(v,M)}function c(v,x){let M=i[v.id];M===void 0&&(g(v),M=h(v),i[v.id]=M,v.addEventListener("dispose",p));const C=x.program;n.updateUBOMapping(v,C);const w=t.render.frame;s[v.id]!==w&&(u(v),s[v.id]=w)}function h(v){const x=d();v.__bindingPointIndex=x;const M=r.createBuffer(),C=v.__size,w=v.usage;return r.bindBuffer(r.UNIFORM_BUFFER,M),r.bufferData(r.UNIFORM_BUFFER,C,w),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,M),M}function d(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){const x=i[v.id],M=v.uniforms,C=v.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let w=0,A=M.length;w<A;w++){const B=Array.isArray(M[w])?M[w]:[M[w]];for(let S=0,b=B.length;S<b;S++){const U=B[S];if(m(U,w,S,C)===!0){const F=U.__offset,N=Array.isArray(U.value)?U.value:[U.value];let L=0;for(let P=0;P<N.length;P++){const I=N[P],$=_(I);typeof I=="number"||typeof I=="boolean"?(U.__data[0]=I,r.bufferSubData(r.UNIFORM_BUFFER,F+L,U.__data)):I.isMatrix3?(U.__data[0]=I.elements[0],U.__data[1]=I.elements[1],U.__data[2]=I.elements[2],U.__data[3]=0,U.__data[4]=I.elements[3],U.__data[5]=I.elements[4],U.__data[6]=I.elements[5],U.__data[7]=0,U.__data[8]=I.elements[6],U.__data[9]=I.elements[7],U.__data[10]=I.elements[8],U.__data[11]=0):(I.toArray(U.__data,L),L+=$.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,F,U.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function m(v,x,M,C){const w=v.value,A=x+"_"+M;if(C[A]===void 0)return typeof w=="number"||typeof w=="boolean"?C[A]=w:C[A]=w.clone(),!0;{const B=C[A];if(typeof w=="number"||typeof w=="boolean"){if(B!==w)return C[A]=w,!0}else if(B.equals(w)===!1)return B.copy(w),!0}return!1}function g(v){const x=v.uniforms;let M=0;const C=16;for(let A=0,B=x.length;A<B;A++){const S=Array.isArray(x[A])?x[A]:[x[A]];for(let b=0,U=S.length;b<U;b++){const F=S[b],N=Array.isArray(F.value)?F.value:[F.value];for(let L=0,P=N.length;L<P;L++){const I=N[L],$=_(I),z=M%C;z!==0&&C-z<$.boundary&&(M+=C-z),F.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=M,M+=$.storage}}}const w=M%C;return w>0&&(M+=C-w),v.__size=M,v.__cache={},this}function _(v){const x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function p(v){const x=v.target;x.removeEventListener("dispose",p);const M=o.indexOf(x.__bindingPointIndex);o.splice(M,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function f(){for(const v in i)r.deleteBuffer(i[v]);o=[],i={},s={}}return{bind:l,update:c,dispose:f}}class Sl{constructor(t={}){const{canvas:e=zc(),context:n=null,depth:i=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=t;this.isWebGLRenderer=!0;let u;n!==null?u=n.getContextAttributes().alpha:u=o;const m=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const f=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ge,this._useLegacyLights=!1,this.toneMapping=Rn,this.toneMappingExposure=1;const x=this;let M=!1,C=0,w=0,A=null,B=-1,S=null;const b=new me,U=new me;let F=null;const N=new qt(0);let L=0,P=e.width,I=e.height,$=1,z=null,W=null;const K=new me(0,0,P,I),Z=new me(0,0,P,I);let X=!1;const j=new Vr;let J=!1,at=!1,pt=null;const mt=new ce,Lt=new kt,It=new H,bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Vt(){return A===null?$:1}let G=n;function Me(T,O){for(let q=0;q<T.length;q++){const Y=T[q],V=e.getContext(Y,O);if(V!==null)return V}return null}try{const T={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Br}`),e.addEventListener("webglcontextlost",it,!1),e.addEventListener("webglcontextrestored",D,!1),e.addEventListener("webglcontextcreationerror",rt,!1),G===null){const O=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&O.shift(),G=Me(O,T),G===null)throw Me(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&G instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),G.getShaderPrecisionFormat===void 0&&(G.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let yt,Rt,gt,te,Ut,R,E,k,et,tt,nt,_t,lt,dt,Et,Ft,Q,Yt,Gt,At,xt,ft,Dt,Xt;function ne(){yt=new ef(G),Rt=new $d(G,yt,t),yt.init(Rt),ft=new Gp(G,yt,Rt),gt=new zp(G,yt,Rt),te=new rf(G),Ut=new Tp,R=new Hp(G,yt,gt,Ut,Rt,ft,te),E=new Kd(x),k=new tf(x),et=new uh(G,Rt),Dt=new Xd(G,yt,et,Rt),tt=new nf(G,et,te,Dt),nt=new cf(G,tt,et,te),Gt=new lf(G,Rt,R),Ft=new jd(Ut),_t=new bp(x,E,k,yt,Rt,Dt,Ft),lt=new qp(x,Ut),dt=new Ap,Et=new Dp(yt,Rt),Yt=new qd(x,E,k,gt,nt,u,l),Q=new Bp(x,nt,Rt),Xt=new Xp(G,te,Rt,gt),At=new Yd(G,yt,te,Rt),xt=new sf(G,yt,te,Rt),te.programs=_t.programs,x.capabilities=Rt,x.extensions=yt,x.properties=Ut,x.renderLists=dt,x.shadowMap=Q,x.state=gt,x.info=te}ne();const Bt=new Wp(x,G);this.xr=Bt,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){const T=yt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=yt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(T){T!==void 0&&($=T,this.setSize(P,I,!1))},this.getSize=function(T){return T.set(P,I)},this.setSize=function(T,O,q=!0){if(Bt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}P=T,I=O,e.width=Math.floor(T*$),e.height=Math.floor(O*$),q===!0&&(e.style.width=T+"px",e.style.height=O+"px"),this.setViewport(0,0,T,O)},this.getDrawingBufferSize=function(T){return T.set(P*$,I*$).floor()},this.setDrawingBufferSize=function(T,O,q){P=T,I=O,$=q,e.width=Math.floor(T*q),e.height=Math.floor(O*q),this.setViewport(0,0,T,O)},this.getCurrentViewport=function(T){return T.copy(b)},this.getViewport=function(T){return T.copy(K)},this.setViewport=function(T,O,q,Y){T.isVector4?K.set(T.x,T.y,T.z,T.w):K.set(T,O,q,Y),gt.viewport(b.copy(K).multiplyScalar($).floor())},this.getScissor=function(T){return T.copy(Z)},this.setScissor=function(T,O,q,Y){T.isVector4?Z.set(T.x,T.y,T.z,T.w):Z.set(T,O,q,Y),gt.scissor(U.copy(Z).multiplyScalar($).floor())},this.getScissorTest=function(){return X},this.setScissorTest=function(T){gt.setScissorTest(X=T)},this.setOpaqueSort=function(T){z=T},this.setTransparentSort=function(T){W=T},this.getClearColor=function(T){return T.copy(Yt.getClearColor())},this.setClearColor=function(){Yt.setClearColor.apply(Yt,arguments)},this.getClearAlpha=function(){return Yt.getClearAlpha()},this.setClearAlpha=function(){Yt.setClearAlpha.apply(Yt,arguments)},this.clear=function(T=!0,O=!0,q=!0){let Y=0;if(T){let V=!1;if(A!==null){const ht=A.texture.format;V=ht===Ja||ht===Za||ht===Ka}if(V){const ht=A.texture.type,vt=ht===Cn||ht===Tn||ht===zr||ht===Wn||ht===$a||ht===ja,St=Yt.getClearColor(),wt=Yt.getClearAlpha(),Ot=St.r,Ct=St.g,Pt=St.b;vt?(m[0]=Ot,m[1]=Ct,m[2]=Pt,m[3]=wt,G.clearBufferuiv(G.COLOR,0,m)):(g[0]=Ot,g[1]=Ct,g[2]=Pt,g[3]=wt,G.clearBufferiv(G.COLOR,0,g))}else Y|=G.COLOR_BUFFER_BIT}O&&(Y|=G.DEPTH_BUFFER_BIT),q&&(Y|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",it,!1),e.removeEventListener("webglcontextrestored",D,!1),e.removeEventListener("webglcontextcreationerror",rt,!1),dt.dispose(),Et.dispose(),Ut.dispose(),E.dispose(),k.dispose(),nt.dispose(),Dt.dispose(),Xt.dispose(),_t.dispose(),Bt.dispose(),Bt.removeEventListener("sessionstart",Se),Bt.removeEventListener("sessionend",Zt),pt&&(pt.dispose(),pt=null),Ee.stop()};function it(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function D(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const T=te.autoReset,O=Q.enabled,q=Q.autoUpdate,Y=Q.needsUpdate,V=Q.type;ne(),te.autoReset=T,Q.enabled=O,Q.autoUpdate=q,Q.needsUpdate=Y,Q.type=V}function rt(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function ot(T){const O=T.target;O.removeEventListener("dispose",ot),Tt(O)}function Tt(T){Mt(T),Ut.remove(T)}function Mt(T){const O=Ut.get(T).programs;O!==void 0&&(O.forEach(function(q){_t.releaseProgram(q)}),T.isShaderMaterial&&_t.releaseShaderCache(T))}this.renderBufferDirect=function(T,O,q,Y,V,ht){O===null&&(O=bt);const vt=V.isMesh&&V.matrixWorld.determinant()<0,St=Dl(T,O,q,Y,V);gt.setMaterial(Y,vt);let wt=q.index,Ot=1;if(Y.wireframe===!0){if(wt=tt.getWireframeAttribute(q),wt===void 0)return;Ot=2}const Ct=q.drawRange,Pt=q.attributes.position;let se=Ct.start*Ot,Le=(Ct.start+Ct.count)*Ot;ht!==null&&(se=Math.max(se,ht.start*Ot),Le=Math.min(Le,(ht.start+ht.count)*Ot)),wt!==null?(se=Math.max(se,0),Le=Math.min(Le,wt.count)):Pt!=null&&(se=Math.max(se,0),Le=Math.min(Le,Pt.count));const fe=Le-se;if(fe<0||fe===1/0)return;Dt.setup(V,Y,St,q,wt);let nn,ee=At;if(wt!==null&&(nn=et.get(wt),ee=xt,ee.setIndex(nn)),V.isMesh)Y.wireframe===!0?(gt.setLineWidth(Y.wireframeLinewidth*Vt()),ee.setMode(G.LINES)):ee.setMode(G.TRIANGLES);else if(V.isLine){let zt=Y.linewidth;zt===void 0&&(zt=1),gt.setLineWidth(zt*Vt()),V.isLineSegments?ee.setMode(G.LINES):V.isLineLoop?ee.setMode(G.LINE_LOOP):ee.setMode(G.LINE_STRIP)}else V.isPoints?ee.setMode(G.POINTS):V.isSprite&&ee.setMode(G.TRIANGLES);if(V.isBatchedMesh)ee.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else if(V.isInstancedMesh)ee.renderInstances(se,fe,V.count);else if(q.isInstancedBufferGeometry){const zt=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,zs=Math.min(q.instanceCount,zt);ee.renderInstances(se,fe,zs)}else ee.render(se,fe)};function jt(T,O,q){T.transparent===!0&&T.side===mn&&T.forceSinglePass===!1?(T.side=Ce,T.needsUpdate=!0,Xi(T,O,q),T.side=Ln,T.needsUpdate=!0,Xi(T,O,q),T.side=mn):Xi(T,O,q)}this.compile=function(T,O,q=null){q===null&&(q=T),p=Et.get(q),p.init(),v.push(p),q.traverseVisible(function(V){V.isLight&&V.layers.test(O.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),T!==q&&T.traverseVisible(function(V){V.isLight&&V.layers.test(O.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),p.setupLights(x._useLegacyLights);const Y=new Set;return T.traverse(function(V){const ht=V.material;if(ht)if(Array.isArray(ht))for(let vt=0;vt<ht.length;vt++){const St=ht[vt];jt(St,q,V),Y.add(St)}else jt(ht,q,V),Y.add(ht)}),v.pop(),p=null,Y},this.compileAsync=function(T,O,q=null){const Y=this.compile(T,O,q);return new Promise(V=>{function ht(){if(Y.forEach(function(vt){Ut.get(vt).currentProgram.isReady()&&Y.delete(vt)}),Y.size===0){V(T);return}setTimeout(ht,10)}yt.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let Kt=null;function de(T){Kt&&Kt(T)}function Se(){Ee.stop()}function Zt(){Ee.start()}const Ee=new ml;Ee.setAnimationLoop(de),typeof self<"u"&&Ee.setContext(self),this.setAnimationLoop=function(T){Kt=T,Bt.setAnimationLoop(T),T===null?Ee.stop():Ee.start()},Bt.addEventListener("sessionstart",Se),Bt.addEventListener("sessionend",Zt),this.render=function(T,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Bt.enabled===!0&&Bt.isPresenting===!0&&(Bt.cameraAutoUpdate===!0&&Bt.updateCamera(O),O=Bt.getCamera()),T.isScene===!0&&T.onBeforeRender(x,T,O,A),p=Et.get(T,v.length),p.init(),v.push(p),mt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),j.setFromProjectionMatrix(mt),at=this.localClippingEnabled,J=Ft.init(this.clippingPlanes,at),_=dt.get(T,f.length),_.init(),f.push(_),$e(T,O,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(z,W),this.info.render.frame++,J===!0&&Ft.beginShadows();const q=p.state.shadowsArray;if(Q.render(q,T,O),J===!0&&Ft.endShadows(),this.info.autoReset===!0&&this.info.reset(),Yt.render(_,T),p.setupLights(x._useLegacyLights),O.isArrayCamera){const Y=O.cameras;for(let V=0,ht=Y.length;V<ht;V++){const vt=Y[V];jr(_,T,vt,vt.viewport)}}else jr(_,T,O);A!==null&&(R.updateMultisampleRenderTarget(A),R.updateRenderTargetMipmap(A)),T.isScene===!0&&T.onAfterRender(x,T,O),Dt.resetDefaultState(),B=-1,S=null,v.pop(),v.length>0?p=v[v.length-1]:p=null,f.pop(),f.length>0?_=f[f.length-1]:_=null};function $e(T,O,q,Y){if(T.visible===!1)return;if(T.layers.test(O.layers)){if(T.isGroup)q=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(O);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||j.intersectsSprite(T)){Y&&It.setFromMatrixPosition(T.matrixWorld).applyMatrix4(mt);const vt=nt.update(T),St=T.material;St.visible&&_.push(T,vt,St,q,It.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||j.intersectsObject(T))){const vt=nt.update(T),St=T.material;if(Y&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),It.copy(T.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),It.copy(vt.boundingSphere.center)),It.applyMatrix4(T.matrixWorld).applyMatrix4(mt)),Array.isArray(St)){const wt=vt.groups;for(let Ot=0,Ct=wt.length;Ot<Ct;Ot++){const Pt=wt[Ot],se=St[Pt.materialIndex];se&&se.visible&&_.push(T,vt,se,q,It.z,Pt)}}else St.visible&&_.push(T,vt,St,q,It.z,null)}}const ht=T.children;for(let vt=0,St=ht.length;vt<St;vt++)$e(ht[vt],O,q,Y)}function jr(T,O,q,Y){const V=T.opaque,ht=T.transmissive,vt=T.transparent;p.setupLightsView(q),J===!0&&Ft.setGlobalState(x.clippingPlanes,q),ht.length>0&&Il(V,ht,O,q),Y&&gt.viewport(b.copy(Y)),V.length>0&&qi(V,O,q),ht.length>0&&qi(ht,O,q),vt.length>0&&qi(vt,O,q),gt.buffers.depth.setTest(!0),gt.buffers.depth.setMask(!0),gt.buffers.color.setMask(!0),gt.setPolygonOffset(!1)}function Il(T,O,q,Y){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;const ht=Rt.isWebGL2;pt===null&&(pt=new Yn(1,1,{generateMipmaps:!0,type:yt.has("EXT_color_buffer_half_float")?Bi:Cn,minFilter:Oi,samples:ht?4:0})),x.getDrawingBufferSize(Lt),ht?pt.setSize(Lt.x,Lt.y):pt.setSize(Fr(Lt.x),Fr(Lt.y));const vt=x.getRenderTarget();x.setRenderTarget(pt),x.getClearColor(N),L=x.getClearAlpha(),L<1&&x.setClearColor(16777215,.5),x.clear();const St=x.toneMapping;x.toneMapping=Rn,qi(T,q,Y),R.updateMultisampleRenderTarget(pt),R.updateRenderTargetMipmap(pt);let wt=!1;for(let Ot=0,Ct=O.length;Ot<Ct;Ot++){const Pt=O[Ot],se=Pt.object,Le=Pt.geometry,fe=Pt.material,nn=Pt.group;if(fe.side===mn&&se.layers.test(Y.layers)){const ee=fe.side;fe.side=Ce,fe.needsUpdate=!0,Kr(se,q,Y,Le,fe,nn),fe.side=ee,fe.needsUpdate=!0,wt=!0}}wt===!0&&(R.updateMultisampleRenderTarget(pt),R.updateRenderTargetMipmap(pt)),x.setRenderTarget(vt),x.setClearColor(N,L),x.toneMapping=St}function qi(T,O,q){const Y=O.isScene===!0?O.overrideMaterial:null;for(let V=0,ht=T.length;V<ht;V++){const vt=T[V],St=vt.object,wt=vt.geometry,Ot=Y===null?vt.material:Y,Ct=vt.group;St.layers.test(q.layers)&&Kr(St,O,q,wt,Ot,Ct)}}function Kr(T,O,q,Y,V,ht){T.onBeforeRender(x,O,q,Y,V,ht),T.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),V.onBeforeRender(x,O,q,Y,T,ht),V.transparent===!0&&V.side===mn&&V.forceSinglePass===!1?(V.side=Ce,V.needsUpdate=!0,x.renderBufferDirect(q,O,Y,V,T,ht),V.side=Ln,V.needsUpdate=!0,x.renderBufferDirect(q,O,Y,V,T,ht),V.side=mn):x.renderBufferDirect(q,O,Y,V,T,ht),T.onAfterRender(x,O,q,Y,V,ht)}function Xi(T,O,q){O.isScene!==!0&&(O=bt);const Y=Ut.get(T),V=p.state.lights,ht=p.state.shadowsArray,vt=V.state.version,St=_t.getParameters(T,V.state,ht,O,q),wt=_t.getProgramCacheKey(St);let Ot=Y.programs;Y.environment=T.isMeshStandardMaterial?O.environment:null,Y.fog=O.fog,Y.envMap=(T.isMeshStandardMaterial?k:E).get(T.envMap||Y.environment),Ot===void 0&&(T.addEventListener("dispose",ot),Ot=new Map,Y.programs=Ot);let Ct=Ot.get(wt);if(Ct!==void 0){if(Y.currentProgram===Ct&&Y.lightsStateVersion===vt)return Jr(T,St),Ct}else St.uniforms=_t.getUniforms(T),T.onBuild(q,St,x),T.onBeforeCompile(St,x),Ct=_t.acquireProgram(St,wt),Ot.set(wt,Ct),Y.uniforms=St.uniforms;const Pt=Y.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Pt.clippingPlanes=Ft.uniform),Jr(T,St),Y.needsLights=Ul(T),Y.lightsStateVersion=vt,Y.needsLights&&(Pt.ambientLightColor.value=V.state.ambient,Pt.lightProbe.value=V.state.probe,Pt.directionalLights.value=V.state.directional,Pt.directionalLightShadows.value=V.state.directionalShadow,Pt.spotLights.value=V.state.spot,Pt.spotLightShadows.value=V.state.spotShadow,Pt.rectAreaLights.value=V.state.rectArea,Pt.ltc_1.value=V.state.rectAreaLTC1,Pt.ltc_2.value=V.state.rectAreaLTC2,Pt.pointLights.value=V.state.point,Pt.pointLightShadows.value=V.state.pointShadow,Pt.hemisphereLights.value=V.state.hemi,Pt.directionalShadowMap.value=V.state.directionalShadowMap,Pt.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Pt.spotShadowMap.value=V.state.spotShadowMap,Pt.spotLightMatrix.value=V.state.spotLightMatrix,Pt.spotLightMap.value=V.state.spotLightMap,Pt.pointShadowMap.value=V.state.pointShadowMap,Pt.pointShadowMatrix.value=V.state.pointShadowMatrix),Y.currentProgram=Ct,Y.uniformsList=null,Ct}function Zr(T){if(T.uniformsList===null){const O=T.currentProgram.getUniforms();T.uniformsList=Es.seqWithValue(O.seq,T.uniforms)}return T.uniformsList}function Jr(T,O){const q=Ut.get(T);q.outputColorSpace=O.outputColorSpace,q.batching=O.batching,q.instancing=O.instancing,q.instancingColor=O.instancingColor,q.skinning=O.skinning,q.morphTargets=O.morphTargets,q.morphNormals=O.morphNormals,q.morphColors=O.morphColors,q.morphTargetsCount=O.morphTargetsCount,q.numClippingPlanes=O.numClippingPlanes,q.numIntersection=O.numClipIntersection,q.vertexAlphas=O.vertexAlphas,q.vertexTangents=O.vertexTangents,q.toneMapping=O.toneMapping}function Dl(T,O,q,Y,V){O.isScene!==!0&&(O=bt),R.resetTextureUnits();const ht=O.fog,vt=Y.isMeshStandardMaterial?O.environment:null,St=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:_n,wt=(Y.isMeshStandardMaterial?k:E).get(Y.envMap||vt),Ot=Y.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Ct=!!q.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Pt=!!q.morphAttributes.position,se=!!q.morphAttributes.normal,Le=!!q.morphAttributes.color;let fe=Rn;Y.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(fe=x.toneMapping);const nn=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,ee=nn!==void 0?nn.length:0,zt=Ut.get(Y),zs=p.state.lights;if(J===!0&&(at===!0||T!==S)){const Fe=T===S&&Y.id===B;Ft.setState(Y,T,Fe)}let ie=!1;Y.version===zt.__version?(zt.needsLights&&zt.lightsStateVersion!==zs.state.version||zt.outputColorSpace!==St||V.isBatchedMesh&&zt.batching===!1||!V.isBatchedMesh&&zt.batching===!0||V.isInstancedMesh&&zt.instancing===!1||!V.isInstancedMesh&&zt.instancing===!0||V.isSkinnedMesh&&zt.skinning===!1||!V.isSkinnedMesh&&zt.skinning===!0||V.isInstancedMesh&&zt.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&zt.instancingColor===!1&&V.instanceColor!==null||zt.envMap!==wt||Y.fog===!0&&zt.fog!==ht||zt.numClippingPlanes!==void 0&&(zt.numClippingPlanes!==Ft.numPlanes||zt.numIntersection!==Ft.numIntersection)||zt.vertexAlphas!==Ot||zt.vertexTangents!==Ct||zt.morphTargets!==Pt||zt.morphNormals!==se||zt.morphColors!==Le||zt.toneMapping!==fe||Rt.isWebGL2===!0&&zt.morphTargetsCount!==ee)&&(ie=!0):(ie=!0,zt.__version=Y.version);let In=zt.currentProgram;ie===!0&&(In=Xi(Y,O,V));let Qr=!1,wi=!1,Hs=!1;const _e=In.getUniforms(),Dn=zt.uniforms;if(gt.useProgram(In.program)&&(Qr=!0,wi=!0,Hs=!0),Y.id!==B&&(B=Y.id,wi=!0),Qr||S!==T){_e.setValue(G,"projectionMatrix",T.projectionMatrix),_e.setValue(G,"viewMatrix",T.matrixWorldInverse);const Fe=_e.map.cameraPosition;Fe!==void 0&&Fe.setValue(G,It.setFromMatrixPosition(T.matrixWorld)),Rt.logarithmicDepthBuffer&&_e.setValue(G,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&_e.setValue(G,"isOrthographic",T.isOrthographicCamera===!0),S!==T&&(S=T,wi=!0,Hs=!0)}if(V.isSkinnedMesh){_e.setOptional(G,V,"bindMatrix"),_e.setOptional(G,V,"bindMatrixInverse");const Fe=V.skeleton;Fe&&(Rt.floatVertexTextures?(Fe.boneTexture===null&&Fe.computeBoneTexture(),_e.setValue(G,"boneTexture",Fe.boneTexture,R)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}V.isBatchedMesh&&(_e.setOptional(G,V,"batchingTexture"),_e.setValue(G,"batchingTexture",V._matricesTexture,R));const Gs=q.morphAttributes;if((Gs.position!==void 0||Gs.normal!==void 0||Gs.color!==void 0&&Rt.isWebGL2===!0)&&Gt.update(V,q,In),(wi||zt.receiveShadow!==V.receiveShadow)&&(zt.receiveShadow=V.receiveShadow,_e.setValue(G,"receiveShadow",V.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(Dn.envMap.value=wt,Dn.flipEnvMap.value=wt.isCubeTexture&&wt.isRenderTargetTexture===!1?-1:1),wi&&(_e.setValue(G,"toneMappingExposure",x.toneMappingExposure),zt.needsLights&&Nl(Dn,Hs),ht&&Y.fog===!0&&lt.refreshFogUniforms(Dn,ht),lt.refreshMaterialUniforms(Dn,Y,$,I,pt),Es.upload(G,Zr(zt),Dn,R)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(Es.upload(G,Zr(zt),Dn,R),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&_e.setValue(G,"center",V.center),_e.setValue(G,"modelViewMatrix",V.modelViewMatrix),_e.setValue(G,"normalMatrix",V.normalMatrix),_e.setValue(G,"modelMatrix",V.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const Fe=Y.uniformsGroups;for(let Vs=0,Fl=Fe.length;Vs<Fl;Vs++)if(Rt.isWebGL2){const to=Fe[Vs];Xt.update(to,In),Xt.bind(to,In)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return In}function Nl(T,O){T.ambientLightColor.needsUpdate=O,T.lightProbe.needsUpdate=O,T.directionalLights.needsUpdate=O,T.directionalLightShadows.needsUpdate=O,T.pointLights.needsUpdate=O,T.pointLightShadows.needsUpdate=O,T.spotLights.needsUpdate=O,T.spotLightShadows.needsUpdate=O,T.rectAreaLights.needsUpdate=O,T.hemisphereLights.needsUpdate=O}function Ul(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(T,O,q){Ut.get(T.texture).__webglTexture=O,Ut.get(T.depthTexture).__webglTexture=q;const Y=Ut.get(T);Y.__hasExternalTextures=!0,Y.__hasExternalTextures&&(Y.__autoAllocateDepthBuffer=q===void 0,Y.__autoAllocateDepthBuffer||yt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(T,O){const q=Ut.get(T);q.__webglFramebuffer=O,q.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(T,O=0,q=0){A=T,C=O,w=q;let Y=!0,V=null,ht=!1,vt=!1;if(T){const wt=Ut.get(T);wt.__useDefaultFramebuffer!==void 0?(gt.bindFramebuffer(G.FRAMEBUFFER,null),Y=!1):wt.__webglFramebuffer===void 0?R.setupRenderTarget(T):wt.__hasExternalTextures&&R.rebindTextures(T,Ut.get(T.texture).__webglTexture,Ut.get(T.depthTexture).__webglTexture);const Ot=T.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(vt=!0);const Ct=Ut.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ct[O])?V=Ct[O][q]:V=Ct[O],ht=!0):Rt.isWebGL2&&T.samples>0&&R.useMultisampledRTT(T)===!1?V=Ut.get(T).__webglMultisampledFramebuffer:Array.isArray(Ct)?V=Ct[q]:V=Ct,b.copy(T.viewport),U.copy(T.scissor),F=T.scissorTest}else b.copy(K).multiplyScalar($).floor(),U.copy(Z).multiplyScalar($).floor(),F=X;if(gt.bindFramebuffer(G.FRAMEBUFFER,V)&&Rt.drawBuffers&&Y&&gt.drawBuffers(T,V),gt.viewport(b),gt.scissor(U),gt.setScissorTest(F),ht){const wt=Ut.get(T.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+O,wt.__webglTexture,q)}else if(vt){const wt=Ut.get(T.texture),Ot=O||0;G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,wt.__webglTexture,q||0,Ot)}B=-1},this.readRenderTargetPixels=function(T,O,q,Y,V,ht,vt){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let St=Ut.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&vt!==void 0&&(St=St[vt]),St){gt.bindFramebuffer(G.FRAMEBUFFER,St);try{const wt=T.texture,Ot=wt.format,Ct=wt.type;if(Ot!==Xe&&ft.convert(Ot)!==G.getParameter(G.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Pt=Ct===Bi&&(yt.has("EXT_color_buffer_half_float")||Rt.isWebGL2&&yt.has("EXT_color_buffer_float"));if(Ct!==Cn&&ft.convert(Ct)!==G.getParameter(G.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ct===wn&&(Rt.isWebGL2||yt.has("OES_texture_float")||yt.has("WEBGL_color_buffer_float")))&&!Pt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=T.width-Y&&q>=0&&q<=T.height-V&&G.readPixels(O,q,Y,V,ft.convert(Ot),ft.convert(Ct),ht)}finally{const wt=A!==null?Ut.get(A).__webglFramebuffer:null;gt.bindFramebuffer(G.FRAMEBUFFER,wt)}}},this.copyFramebufferToTexture=function(T,O,q=0){const Y=Math.pow(2,-q),V=Math.floor(O.image.width*Y),ht=Math.floor(O.image.height*Y);R.setTexture2D(O,0),G.copyTexSubImage2D(G.TEXTURE_2D,q,0,0,T.x,T.y,V,ht),gt.unbindTexture()},this.copyTextureToTexture=function(T,O,q,Y=0){const V=O.image.width,ht=O.image.height,vt=ft.convert(q.format),St=ft.convert(q.type);R.setTexture2D(q,0),G.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,q.flipY),G.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),G.pixelStorei(G.UNPACK_ALIGNMENT,q.unpackAlignment),O.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,Y,T.x,T.y,V,ht,vt,St,O.image.data):O.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,Y,T.x,T.y,O.mipmaps[0].width,O.mipmaps[0].height,vt,O.mipmaps[0].data):G.texSubImage2D(G.TEXTURE_2D,Y,T.x,T.y,vt,St,O.image),Y===0&&q.generateMipmaps&&G.generateMipmap(G.TEXTURE_2D),gt.unbindTexture()},this.copyTextureToTexture3D=function(T,O,q,Y,V=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ht=T.max.x-T.min.x+1,vt=T.max.y-T.min.y+1,St=T.max.z-T.min.z+1,wt=ft.convert(Y.format),Ot=ft.convert(Y.type);let Ct;if(Y.isData3DTexture)R.setTexture3D(Y,0),Ct=G.TEXTURE_3D;else if(Y.isDataArrayTexture||Y.isCompressedArrayTexture)R.setTexture2DArray(Y,0),Ct=G.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}G.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,Y.flipY),G.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),G.pixelStorei(G.UNPACK_ALIGNMENT,Y.unpackAlignment);const Pt=G.getParameter(G.UNPACK_ROW_LENGTH),se=G.getParameter(G.UNPACK_IMAGE_HEIGHT),Le=G.getParameter(G.UNPACK_SKIP_PIXELS),fe=G.getParameter(G.UNPACK_SKIP_ROWS),nn=G.getParameter(G.UNPACK_SKIP_IMAGES),ee=q.isCompressedTexture?q.mipmaps[V]:q.image;G.pixelStorei(G.UNPACK_ROW_LENGTH,ee.width),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,ee.height),G.pixelStorei(G.UNPACK_SKIP_PIXELS,T.min.x),G.pixelStorei(G.UNPACK_SKIP_ROWS,T.min.y),G.pixelStorei(G.UNPACK_SKIP_IMAGES,T.min.z),q.isDataTexture||q.isData3DTexture?G.texSubImage3D(Ct,V,O.x,O.y,O.z,ht,vt,St,wt,Ot,ee.data):q.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),G.compressedTexSubImage3D(Ct,V,O.x,O.y,O.z,ht,vt,St,wt,ee.data)):G.texSubImage3D(Ct,V,O.x,O.y,O.z,ht,vt,St,wt,Ot,ee),G.pixelStorei(G.UNPACK_ROW_LENGTH,Pt),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,se),G.pixelStorei(G.UNPACK_SKIP_PIXELS,Le),G.pixelStorei(G.UNPACK_SKIP_ROWS,fe),G.pixelStorei(G.UNPACK_SKIP_IMAGES,nn),V===0&&Y.generateMipmaps&&G.generateMipmap(Ct),gt.unbindTexture()},this.initTexture=function(T){T.isCubeTexture?R.setTextureCube(T,0):T.isData3DTexture?R.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?R.setTexture2DArray(T,0):R.setTexture2D(T,0),gt.unbindTexture()},this.resetState=function(){C=0,w=0,A=null,gt.reset(),Dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Hr?"display-p3":"srgb",e.unpackColorSpace=$t.workingColorSpace===Ns?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===ge?Xn:tl}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===Xn?ge:_n}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class Yp extends Sl{}Yp.prototype.isWebGL1Renderer=!0;class $p extends ye{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}}class Wr extends Pn{constructor(t=1,e=1,n=1,i=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const h=[],d=[],u=[],m=[];let g=0;const _=[],p=n/2;let f=0;v(),o===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new en(d,3)),this.setAttribute("normal",new en(u,3)),this.setAttribute("uv",new en(m,2));function v(){const M=new H,C=new H;let w=0;const A=(e-t)/n;for(let B=0;B<=s;B++){const S=[],b=B/s,U=b*(e-t)+t;for(let F=0;F<=i;F++){const N=F/i,L=N*l+a,P=Math.sin(L),I=Math.cos(L);C.x=U*P,C.y=-b*n+p,C.z=U*I,d.push(C.x,C.y,C.z),M.set(P,A,I).normalize(),u.push(M.x,M.y,M.z),m.push(N,1-b),S.push(g++)}_.push(S)}for(let B=0;B<i;B++)for(let S=0;S<s;S++){const b=_[S][B],U=_[S+1][B],F=_[S+1][B+1],N=_[S][B+1];h.push(b,U,N),h.push(U,F,N),w+=6}c.addGroup(f,w,0),f+=w}function x(M){const C=g,w=new kt,A=new H;let B=0;const S=M===!0?t:e,b=M===!0?1:-1;for(let F=1;F<=i;F++)d.push(0,p*b,0),u.push(0,b,0),m.push(.5,.5),g++;const U=g;for(let F=0;F<=i;F++){const L=F/i*l+a,P=Math.cos(L),I=Math.sin(L);A.x=S*I,A.y=p*b,A.z=S*P,d.push(A.x,A.y,A.z),u.push(0,b,0),w.x=P*.5+.5,w.y=I*.5*b+.5,m.push(w.x,w.y),g++}for(let F=0;F<i;F++){const N=C+F,L=U+F;M===!0?h.push(L,L+1,N):h.push(L+1,L,N),B+=3}c.addGroup(f,B,M===!0?1:2),f+=B}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wr(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class gs extends Vi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new qt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=el,this.normalScale=new kt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class El extends ye{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new qt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}const Mr=new ce,Sa=new H,Ea=new H;class jp{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new kt(512,512),this.map=null,this.mapPass=null,this.matrix=new ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Vr,this._frameExtents=new kt(1,1),this._viewportCount=1,this._viewports=[new me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Sa.setFromMatrixPosition(t.matrixWorld),e.position.copy(Sa),Ea.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ea),e.updateMatrixWorld(),Mr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Mr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Mr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Kp extends jp{constructor(){super(new De(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=Cs*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=t.distance||e.far;(n!==e.fov||i!==e.aspect||s!==e.far)&&(e.fov=n,e.aspect=i,e.far=s,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class Zp extends El{constructor(t,e,n=0,i=Math.PI/3,s=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ye.DEFAULT_UP),this.updateMatrix(),this.target=new ye,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new Kp}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Jp extends El{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Br}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Br);class Ye{constructor(t){t===void 0&&(t=[0,0,0,0,0,0,0,0,0]),this.elements=t}identity(){const t=this.elements;t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1}setZero(){const t=this.elements;t[0]=0,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=0,t[6]=0,t[7]=0,t[8]=0}setTrace(t){const e=this.elements;e[0]=t.x,e[4]=t.y,e[8]=t.z}getTrace(t){t===void 0&&(t=new y);const e=this.elements;return t.x=e[0],t.y=e[4],t.z=e[8],t}vmult(t,e){e===void 0&&(e=new y);const n=this.elements,i=t.x,s=t.y,o=t.z;return e.x=n[0]*i+n[1]*s+n[2]*o,e.y=n[3]*i+n[4]*s+n[5]*o,e.z=n[6]*i+n[7]*s+n[8]*o,e}smult(t){for(let e=0;e<this.elements.length;e++)this.elements[e]*=t}mmult(t,e){e===void 0&&(e=new Ye);const n=this.elements,i=t.elements,s=e.elements,o=n[0],a=n[1],l=n[2],c=n[3],h=n[4],d=n[5],u=n[6],m=n[7],g=n[8],_=i[0],p=i[1],f=i[2],v=i[3],x=i[4],M=i[5],C=i[6],w=i[7],A=i[8];return s[0]=o*_+a*v+l*C,s[1]=o*p+a*x+l*w,s[2]=o*f+a*M+l*A,s[3]=c*_+h*v+d*C,s[4]=c*p+h*x+d*w,s[5]=c*f+h*M+d*A,s[6]=u*_+m*v+g*C,s[7]=u*p+m*x+g*w,s[8]=u*f+m*M+g*A,e}scale(t,e){e===void 0&&(e=new Ye);const n=this.elements,i=e.elements;for(let s=0;s!==3;s++)i[3*s+0]=t.x*n[3*s+0],i[3*s+1]=t.y*n[3*s+1],i[3*s+2]=t.z*n[3*s+2];return e}solve(t,e){e===void 0&&(e=new y);const n=3,i=4,s=[];let o,a;for(o=0;o<n*i;o++)s.push(0);for(o=0;o<3;o++)for(a=0;a<3;a++)s[o+i*a]=this.elements[o+3*a];s[3+4*0]=t.x,s[3+4*1]=t.y,s[3+4*2]=t.z;let l=3;const c=l;let h;const d=4;let u;do{if(o=c-l,s[o+i*o]===0){for(a=o+1;a<c;a++)if(s[o+i*a]!==0){h=d;do u=d-h,s[u+i*o]+=s[u+i*a];while(--h);break}}if(s[o+i*o]!==0)for(a=o+1;a<c;a++){const m=s[o+i*a]/s[o+i*o];h=d;do u=d-h,s[u+i*a]=u<=o?0:s[u+i*a]-s[u+i*o]*m;while(--h)}}while(--l);if(e.z=s[2*i+3]/s[2*i+2],e.y=(s[1*i+3]-s[1*i+2]*e.z)/s[1*i+1],e.x=(s[0*i+3]-s[0*i+2]*e.z-s[0*i+1]*e.y)/s[0*i+0],isNaN(e.x)||isNaN(e.y)||isNaN(e.z)||e.x===1/0||e.y===1/0||e.z===1/0)throw`Could not solve equation! Got x=[${e.toString()}], b=[${t.toString()}], A=[${this.toString()}]`;return e}e(t,e,n){if(n===void 0)return this.elements[e+3*t];this.elements[e+3*t]=n}copy(t){for(let e=0;e<t.elements.length;e++)this.elements[e]=t.elements[e];return this}toString(){let t="";const e=",";for(let n=0;n<9;n++)t+=this.elements[n]+e;return t}reverse(t){t===void 0&&(t=new Ye);const e=3,n=6,i=Qp;let s,o;for(s=0;s<3;s++)for(o=0;o<3;o++)i[s+n*o]=this.elements[s+3*o];i[3+6*0]=1,i[3+6*1]=0,i[3+6*2]=0,i[4+6*0]=0,i[4+6*1]=1,i[4+6*2]=0,i[5+6*0]=0,i[5+6*1]=0,i[5+6*2]=1;let a=3;const l=a;let c;const h=n;let d;do{if(s=l-a,i[s+n*s]===0){for(o=s+1;o<l;o++)if(i[s+n*o]!==0){c=h;do d=h-c,i[d+n*s]+=i[d+n*o];while(--c);break}}if(i[s+n*s]!==0)for(o=s+1;o<l;o++){const u=i[s+n*o]/i[s+n*s];c=h;do d=h-c,i[d+n*o]=d<=s?0:i[d+n*o]-i[d+n*s]*u;while(--c)}}while(--a);s=2;do{o=s-1;do{const u=i[s+n*o]/i[s+n*s];c=n;do d=n-c,i[d+n*o]=i[d+n*o]-i[d+n*s]*u;while(--c)}while(o--)}while(--s);s=2;do{const u=1/i[s+n*s];c=n;do d=n-c,i[d+n*s]=i[d+n*s]*u;while(--c)}while(s--);s=2;do{o=2;do{if(d=i[e+o+n*s],isNaN(d)||d===1/0)throw`Could not reverse! A=[${this.toString()}]`;t.e(s,o,d)}while(o--)}while(s--);return t}setRotationFromQuaternion(t){const e=t.x,n=t.y,i=t.z,s=t.w,o=e+e,a=n+n,l=i+i,c=e*o,h=e*a,d=e*l,u=n*a,m=n*l,g=i*l,_=s*o,p=s*a,f=s*l,v=this.elements;return v[3*0+0]=1-(u+g),v[3*0+1]=h-f,v[3*0+2]=d+p,v[3*1+0]=h+f,v[3*1+1]=1-(c+g),v[3*1+2]=m-_,v[3*2+0]=d-p,v[3*2+1]=m+_,v[3*2+2]=1-(c+u),this}transpose(t){t===void 0&&(t=new Ye);const e=this.elements,n=t.elements;let i;return n[0]=e[0],n[4]=e[4],n[8]=e[8],i=e[1],n[1]=e[3],n[3]=i,i=e[2],n[2]=e[6],n[6]=i,i=e[5],n[5]=e[7],n[7]=i,t}}const Qp=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];class y{constructor(t,e,n){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),this.x=t,this.y=e,this.z=n}cross(t,e){e===void 0&&(e=new y);const n=t.x,i=t.y,s=t.z,o=this.x,a=this.y,l=this.z;return e.x=a*s-l*i,e.y=l*n-o*s,e.z=o*i-a*n,e}set(t,e,n){return this.x=t,this.y=e,this.z=n,this}setZero(){this.x=this.y=this.z=0}vadd(t,e){if(e)e.x=t.x+this.x,e.y=t.y+this.y,e.z=t.z+this.z;else return new y(this.x+t.x,this.y+t.y,this.z+t.z)}vsub(t,e){if(e)e.x=this.x-t.x,e.y=this.y-t.y,e.z=this.z-t.z;else return new y(this.x-t.x,this.y-t.y,this.z-t.z)}crossmat(){return new Ye([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])}normalize(){const t=this.x,e=this.y,n=this.z,i=Math.sqrt(t*t+e*e+n*n);if(i>0){const s=1/i;this.x*=s,this.y*=s,this.z*=s}else this.x=0,this.y=0,this.z=0;return i}unit(t){t===void 0&&(t=new y);const e=this.x,n=this.y,i=this.z;let s=Math.sqrt(e*e+n*n+i*i);return s>0?(s=1/s,t.x=e*s,t.y=n*s,t.z=i*s):(t.x=1,t.y=0,t.z=0),t}length(){const t=this.x,e=this.y,n=this.z;return Math.sqrt(t*t+e*e+n*n)}lengthSquared(){return this.dot(this)}distanceTo(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z;return Math.sqrt((s-e)*(s-e)+(o-n)*(o-n)+(a-i)*(a-i))}distanceSquared(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z;return(s-e)*(s-e)+(o-n)*(o-n)+(a-i)*(a-i)}scale(t,e){e===void 0&&(e=new y);const n=this.x,i=this.y,s=this.z;return e.x=t*n,e.y=t*i,e.z=t*s,e}vmul(t,e){return e===void 0&&(e=new y),e.x=t.x*this.x,e.y=t.y*this.y,e.z=t.z*this.z,e}addScaledVector(t,e,n){return n===void 0&&(n=new y),n.x=this.x+t*e.x,n.y=this.y+t*e.y,n.z=this.z+t*e.z,n}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}isZero(){return this.x===0&&this.y===0&&this.z===0}negate(t){return t===void 0&&(t=new y),t.x=-this.x,t.y=-this.y,t.z=-this.z,t}tangents(t,e){const n=this.length();if(n>0){const i=tm,s=1/n;i.set(this.x*s,this.y*s,this.z*s);const o=em;Math.abs(i.x)<.9?(o.set(1,0,0),i.cross(o,t)):(o.set(0,1,0),i.cross(o,t)),i.cross(t,e)}else t.set(1,0,0),e.set(0,1,0)}toString(){return`${this.x},${this.y},${this.z}`}toArray(){return[this.x,this.y,this.z]}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}lerp(t,e,n){const i=this.x,s=this.y,o=this.z;n.x=i+(t.x-i)*e,n.y=s+(t.y-s)*e,n.z=o+(t.z-o)*e}almostEquals(t,e){return e===void 0&&(e=1e-6),!(Math.abs(this.x-t.x)>e||Math.abs(this.y-t.y)>e||Math.abs(this.z-t.z)>e)}almostZero(t){return t===void 0&&(t=1e-6),!(Math.abs(this.x)>t||Math.abs(this.y)>t||Math.abs(this.z)>t)}isAntiparallelTo(t,e){return this.negate(ba),ba.almostEquals(t,e)}clone(){return new y(this.x,this.y,this.z)}}y.ZERO=new y(0,0,0);y.UNIT_X=new y(1,0,0);y.UNIT_Y=new y(0,1,0);y.UNIT_Z=new y(0,0,1);const tm=new y,em=new y,ba=new y;class Ue{constructor(t){t===void 0&&(t={}),this.lowerBound=new y,this.upperBound=new y,t.lowerBound&&this.lowerBound.copy(t.lowerBound),t.upperBound&&this.upperBound.copy(t.upperBound)}setFromPoints(t,e,n,i){const s=this.lowerBound,o=this.upperBound,a=n;s.copy(t[0]),a&&a.vmult(s,s),o.copy(s);for(let l=1;l<t.length;l++){let c=t[l];a&&(a.vmult(c,Ta),c=Ta),c.x>o.x&&(o.x=c.x),c.x<s.x&&(s.x=c.x),c.y>o.y&&(o.y=c.y),c.y<s.y&&(s.y=c.y),c.z>o.z&&(o.z=c.z),c.z<s.z&&(s.z=c.z)}return e&&(e.vadd(s,s),e.vadd(o,o)),i&&(s.x-=i,s.y-=i,s.z-=i,o.x+=i,o.y+=i,o.z+=i),this}copy(t){return this.lowerBound.copy(t.lowerBound),this.upperBound.copy(t.upperBound),this}clone(){return new Ue().copy(this)}extend(t){this.lowerBound.x=Math.min(this.lowerBound.x,t.lowerBound.x),this.upperBound.x=Math.max(this.upperBound.x,t.upperBound.x),this.lowerBound.y=Math.min(this.lowerBound.y,t.lowerBound.y),this.upperBound.y=Math.max(this.upperBound.y,t.upperBound.y),this.lowerBound.z=Math.min(this.lowerBound.z,t.lowerBound.z),this.upperBound.z=Math.max(this.upperBound.z,t.upperBound.z)}overlaps(t){const e=this.lowerBound,n=this.upperBound,i=t.lowerBound,s=t.upperBound,o=i.x<=n.x&&n.x<=s.x||e.x<=s.x&&s.x<=n.x,a=i.y<=n.y&&n.y<=s.y||e.y<=s.y&&s.y<=n.y,l=i.z<=n.z&&n.z<=s.z||e.z<=s.z&&s.z<=n.z;return o&&a&&l}volume(){const t=this.lowerBound,e=this.upperBound;return(e.x-t.x)*(e.y-t.y)*(e.z-t.z)}contains(t){const e=this.lowerBound,n=this.upperBound,i=t.lowerBound,s=t.upperBound;return e.x<=i.x&&n.x>=s.x&&e.y<=i.y&&n.y>=s.y&&e.z<=i.z&&n.z>=s.z}getCorners(t,e,n,i,s,o,a,l){const c=this.lowerBound,h=this.upperBound;t.copy(c),e.set(h.x,c.y,c.z),n.set(h.x,h.y,c.z),i.set(c.x,h.y,h.z),s.set(h.x,c.y,h.z),o.set(c.x,h.y,c.z),a.set(c.x,c.y,h.z),l.copy(h)}toLocalFrame(t,e){const n=wa,i=n[0],s=n[1],o=n[2],a=n[3],l=n[4],c=n[5],h=n[6],d=n[7];this.getCorners(i,s,o,a,l,c,h,d);for(let u=0;u!==8;u++){const m=n[u];t.pointToLocal(m,m)}return e.setFromPoints(n)}toWorldFrame(t,e){const n=wa,i=n[0],s=n[1],o=n[2],a=n[3],l=n[4],c=n[5],h=n[6],d=n[7];this.getCorners(i,s,o,a,l,c,h,d);for(let u=0;u!==8;u++){const m=n[u];t.pointToWorld(m,m)}return e.setFromPoints(n)}overlapsRay(t){const{direction:e,from:n}=t,i=1/e.x,s=1/e.y,o=1/e.z,a=(this.lowerBound.x-n.x)*i,l=(this.upperBound.x-n.x)*i,c=(this.lowerBound.y-n.y)*s,h=(this.upperBound.y-n.y)*s,d=(this.lowerBound.z-n.z)*o,u=(this.upperBound.z-n.z)*o,m=Math.max(Math.max(Math.min(a,l),Math.min(c,h)),Math.min(d,u)),g=Math.min(Math.min(Math.max(a,l),Math.max(c,h)),Math.max(d,u));return!(g<0||m>g)}}const Ta=new y,wa=[new y,new y,new y,new y,new y,new y,new y,new y];class Aa{constructor(){this.matrix=[]}get(t,e){let{index:n}=t,{index:i}=e;if(i>n){const s=i;i=n,n=s}return this.matrix[(n*(n+1)>>1)+i-1]}set(t,e,n){let{index:i}=t,{index:s}=e;if(s>i){const o=s;s=i,i=o}this.matrix[(i*(i+1)>>1)+s-1]=n?1:0}reset(){for(let t=0,e=this.matrix.length;t!==e;t++)this.matrix[t]=0}setNumObjects(t){this.matrix.length=t*(t-1)>>1}}class bl{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;return n[t]===void 0&&(n[t]=[]),n[t].includes(e)||n[t].push(e),this}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return!!(n[t]!==void 0&&n[t].includes(e))}hasAnyEventListener(t){return this._listeners===void 0?!1:this._listeners[t]!==void 0}removeEventListener(t,e){if(this._listeners===void 0)return this;const n=this._listeners;if(n[t]===void 0)return this;const i=n[t].indexOf(e);return i!==-1&&n[t].splice(i,1),this}dispatchEvent(t){if(this._listeners===void 0)return this;const n=this._listeners[t.type];if(n!==void 0){t.target=this;for(let i=0,s=n.length;i<s;i++)n[i].call(this,t)}return this}}class ae{constructor(t,e,n,i){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),i===void 0&&(i=1),this.x=t,this.y=e,this.z=n,this.w=i}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}toString(){return`${this.x},${this.y},${this.z},${this.w}`}toArray(){return[this.x,this.y,this.z,this.w]}setFromAxisAngle(t,e){const n=Math.sin(e*.5);return this.x=t.x*n,this.y=t.y*n,this.z=t.z*n,this.w=Math.cos(e*.5),this}toAxisAngle(t){t===void 0&&(t=new y),this.normalize();const e=2*Math.acos(this.w),n=Math.sqrt(1-this.w*this.w);return n<.001?(t.x=this.x,t.y=this.y,t.z=this.z):(t.x=this.x/n,t.y=this.y/n,t.z=this.z/n),[t,e]}setFromVectors(t,e){if(t.isAntiparallelTo(e)){const n=nm,i=im;t.tangents(n,i),this.setFromAxisAngle(n,Math.PI)}else{const n=t.cross(e);this.x=n.x,this.y=n.y,this.z=n.z,this.w=Math.sqrt(t.length()**2*e.length()**2)+t.dot(e),this.normalize()}return this}mult(t,e){e===void 0&&(e=new ae);const n=this.x,i=this.y,s=this.z,o=this.w,a=t.x,l=t.y,c=t.z,h=t.w;return e.x=n*h+o*a+i*c-s*l,e.y=i*h+o*l+s*a-n*c,e.z=s*h+o*c+n*l-i*a,e.w=o*h-n*a-i*l-s*c,e}inverse(t){t===void 0&&(t=new ae);const e=this.x,n=this.y,i=this.z,s=this.w;this.conjugate(t);const o=1/(e*e+n*n+i*i+s*s);return t.x*=o,t.y*=o,t.z*=o,t.w*=o,t}conjugate(t){return t===void 0&&(t=new ae),t.x=-this.x,t.y=-this.y,t.z=-this.z,t.w=this.w,t}normalize(){let t=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(t=1/t,this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}normalizeFast(){const t=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}vmult(t,e){e===void 0&&(e=new y);const n=t.x,i=t.y,s=t.z,o=this.x,a=this.y,l=this.z,c=this.w,h=c*n+a*s-l*i,d=c*i+l*n-o*s,u=c*s+o*i-a*n,m=-o*n-a*i-l*s;return e.x=h*c+m*-o+d*-l-u*-a,e.y=d*c+m*-a+u*-o-h*-l,e.z=u*c+m*-l+h*-a-d*-o,e}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w,this}toEuler(t,e){e===void 0&&(e="YZX");let n,i,s;const o=this.x,a=this.y,l=this.z,c=this.w;switch(e){case"YZX":const h=o*a+l*c;if(h>.499&&(n=2*Math.atan2(o,c),i=Math.PI/2,s=0),h<-.499&&(n=-2*Math.atan2(o,c),i=-Math.PI/2,s=0),n===void 0){const d=o*o,u=a*a,m=l*l;n=Math.atan2(2*a*c-2*o*l,1-2*u-2*m),i=Math.asin(2*h),s=Math.atan2(2*o*c-2*a*l,1-2*d-2*m)}break;default:throw new Error(`Euler order ${e} not supported yet.`)}t.y=n,t.z=i,t.x=s}setFromEuler(t,e,n,i){i===void 0&&(i="XYZ");const s=Math.cos(t/2),o=Math.cos(e/2),a=Math.cos(n/2),l=Math.sin(t/2),c=Math.sin(e/2),h=Math.sin(n/2);return i==="XYZ"?(this.x=l*o*a+s*c*h,this.y=s*c*a-l*o*h,this.z=s*o*h+l*c*a,this.w=s*o*a-l*c*h):i==="YXZ"?(this.x=l*o*a+s*c*h,this.y=s*c*a-l*o*h,this.z=s*o*h-l*c*a,this.w=s*o*a+l*c*h):i==="ZXY"?(this.x=l*o*a-s*c*h,this.y=s*c*a+l*o*h,this.z=s*o*h+l*c*a,this.w=s*o*a-l*c*h):i==="ZYX"?(this.x=l*o*a-s*c*h,this.y=s*c*a+l*o*h,this.z=s*o*h-l*c*a,this.w=s*o*a+l*c*h):i==="YZX"?(this.x=l*o*a+s*c*h,this.y=s*c*a+l*o*h,this.z=s*o*h-l*c*a,this.w=s*o*a-l*c*h):i==="XZY"&&(this.x=l*o*a-s*c*h,this.y=s*c*a-l*o*h,this.z=s*o*h+l*c*a,this.w=s*o*a+l*c*h),this}clone(){return new ae(this.x,this.y,this.z,this.w)}slerp(t,e,n){n===void 0&&(n=new ae);const i=this.x,s=this.y,o=this.z,a=this.w;let l=t.x,c=t.y,h=t.z,d=t.w,u,m,g,_,p;return m=i*l+s*c+o*h+a*d,m<0&&(m=-m,l=-l,c=-c,h=-h,d=-d),1-m>1e-6?(u=Math.acos(m),g=Math.sin(u),_=Math.sin((1-e)*u)/g,p=Math.sin(e*u)/g):(_=1-e,p=e),n.x=_*i+p*l,n.y=_*s+p*c,n.z=_*o+p*h,n.w=_*a+p*d,n}integrate(t,e,n,i){i===void 0&&(i=new ae);const s=t.x*n.x,o=t.y*n.y,a=t.z*n.z,l=this.x,c=this.y,h=this.z,d=this.w,u=e*.5;return i.x+=u*(s*d+o*h-a*c),i.y+=u*(o*d+a*l-s*h),i.z+=u*(a*d+s*c-o*l),i.w+=u*(-s*l-o*c-a*h),i}}const nm=new y,im=new y,sm={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256};class ut{constructor(t){t===void 0&&(t={}),this.id=ut.idCounter++,this.type=t.type||0,this.boundingSphereRadius=0,this.collisionResponse=t.collisionResponse?t.collisionResponse:!0,this.collisionFilterGroup=t.collisionFilterGroup!==void 0?t.collisionFilterGroup:1,this.collisionFilterMask=t.collisionFilterMask!==void 0?t.collisionFilterMask:-1,this.material=t.material?t.material:null,this.body=null}updateBoundingSphereRadius(){throw`computeBoundingSphereRadius() not implemented for shape type ${this.type}`}volume(){throw`volume() not implemented for shape type ${this.type}`}calculateLocalInertia(t,e){throw`calculateLocalInertia() not implemented for shape type ${this.type}`}calculateWorldAABB(t,e,n,i){throw`calculateWorldAABB() not implemented for shape type ${this.type}`}}ut.idCounter=0;ut.types=sm;class Wt{constructor(t){t===void 0&&(t={}),this.position=new y,this.quaternion=new ae,t.position&&this.position.copy(t.position),t.quaternion&&this.quaternion.copy(t.quaternion)}pointToLocal(t,e){return Wt.pointToLocalFrame(this.position,this.quaternion,t,e)}pointToWorld(t,e){return Wt.pointToWorldFrame(this.position,this.quaternion,t,e)}vectorToWorldFrame(t,e){return e===void 0&&(e=new y),this.quaternion.vmult(t,e),e}static pointToLocalFrame(t,e,n,i){return i===void 0&&(i=new y),n.vsub(t,i),e.conjugate(Ra),Ra.vmult(i,i),i}static pointToWorldFrame(t,e,n,i){return i===void 0&&(i=new y),e.vmult(n,i),i.vadd(t,i),i}static vectorToWorldFrame(t,e,n){return n===void 0&&(n=new y),t.vmult(e,n),n}static vectorToLocalFrame(t,e,n,i){return i===void 0&&(i=new y),e.w*=-1,e.vmult(n,i),e.w*=-1,i}}const Ra=new ae;class vi extends ut{constructor(t){t===void 0&&(t={});const{vertices:e=[],faces:n=[],normals:i=[],axes:s,boundingSphereRadius:o}=t;super({type:ut.types.CONVEXPOLYHEDRON}),this.vertices=e,this.faces=n,this.faceNormals=i,this.faceNormals.length===0&&this.computeNormals(),o?this.boundingSphereRadius=o:this.updateBoundingSphereRadius(),this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,this.worldFaceNormals=[],this.worldFaceNormalsNeedsUpdate=!0,this.uniqueAxes=s?s.slice():null,this.uniqueEdges=[],this.computeEdges()}computeEdges(){const t=this.faces,e=this.vertices,n=this.uniqueEdges;n.length=0;const i=new y;for(let s=0;s!==t.length;s++){const o=t[s],a=o.length;for(let l=0;l!==a;l++){const c=(l+1)%a;e[o[l]].vsub(e[o[c]],i),i.normalize();let h=!1;for(let d=0;d!==n.length;d++)if(n[d].almostEquals(i)||n[d].almostEquals(i)){h=!0;break}h||n.push(i.clone())}}}computeNormals(){this.faceNormals.length=this.faces.length;for(let t=0;t<this.faces.length;t++){for(let i=0;i<this.faces[t].length;i++)if(!this.vertices[this.faces[t][i]])throw new Error(`Vertex ${this.faces[t][i]} not found!`);const e=this.faceNormals[t]||new y;this.getFaceNormal(t,e),e.negate(e),this.faceNormals[t]=e;const n=this.vertices[this.faces[t][0]];if(e.dot(n)<0){console.error(`.faceNormals[${t}] = Vec3(${e.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);for(let i=0;i<this.faces[t].length;i++)console.warn(`.vertices[${this.faces[t][i]}] = Vec3(${this.vertices[this.faces[t][i]].toString()})`)}}}getFaceNormal(t,e){const n=this.faces[t],i=this.vertices[n[0]],s=this.vertices[n[1]],o=this.vertices[n[2]];vi.computeNormal(i,s,o,e)}static computeNormal(t,e,n,i){const s=new y,o=new y;e.vsub(t,o),n.vsub(e,s),s.cross(o,i),i.isZero()||i.normalize()}clipAgainstHull(t,e,n,i,s,o,a,l,c){const h=new y;let d=-1,u=-Number.MAX_VALUE;for(let g=0;g<n.faces.length;g++){h.copy(n.faceNormals[g]),s.vmult(h,h);const _=h.dot(o);_>u&&(u=_,d=g)}const m=[];for(let g=0;g<n.faces[d].length;g++){const _=n.vertices[n.faces[d][g]],p=new y;p.copy(_),s.vmult(p,p),i.vadd(p,p),m.push(p)}d>=0&&this.clipFaceAgainstHull(o,t,e,m,a,l,c)}findSeparatingAxis(t,e,n,i,s,o,a,l){const c=new y,h=new y,d=new y,u=new y,m=new y,g=new y;let _=Number.MAX_VALUE;const p=this;if(p.uniqueAxes)for(let f=0;f!==p.uniqueAxes.length;f++){n.vmult(p.uniqueAxes[f],c);const v=p.testSepAxis(c,t,e,n,i,s);if(v===!1)return!1;v<_&&(_=v,o.copy(c))}else{const f=a?a.length:p.faces.length;for(let v=0;v<f;v++){const x=a?a[v]:v;c.copy(p.faceNormals[x]),n.vmult(c,c);const M=p.testSepAxis(c,t,e,n,i,s);if(M===!1)return!1;M<_&&(_=M,o.copy(c))}}if(t.uniqueAxes)for(let f=0;f!==t.uniqueAxes.length;f++){s.vmult(t.uniqueAxes[f],h);const v=p.testSepAxis(h,t,e,n,i,s);if(v===!1)return!1;v<_&&(_=v,o.copy(h))}else{const f=l?l.length:t.faces.length;for(let v=0;v<f;v++){const x=l?l[v]:v;h.copy(t.faceNormals[x]),s.vmult(h,h);const M=p.testSepAxis(h,t,e,n,i,s);if(M===!1)return!1;M<_&&(_=M,o.copy(h))}}for(let f=0;f!==p.uniqueEdges.length;f++){n.vmult(p.uniqueEdges[f],u);for(let v=0;v!==t.uniqueEdges.length;v++)if(s.vmult(t.uniqueEdges[v],m),u.cross(m,g),!g.almostZero()){g.normalize();const x=p.testSepAxis(g,t,e,n,i,s);if(x===!1)return!1;x<_&&(_=x,o.copy(g))}}return i.vsub(e,d),d.dot(o)>0&&o.negate(o),!0}testSepAxis(t,e,n,i,s,o){const a=this;vi.project(a,t,n,i,Sr),vi.project(e,t,s,o,Er);const l=Sr[0],c=Sr[1],h=Er[0],d=Er[1];if(l<d||h<c)return!1;const u=l-d,m=h-c;return u<m?u:m}calculateLocalInertia(t,e){const n=new y,i=new y;this.computeLocalAABB(i,n);const s=n.x-i.x,o=n.y-i.y,a=n.z-i.z;e.x=1/12*t*(2*o*2*o+2*a*2*a),e.y=1/12*t*(2*s*2*s+2*a*2*a),e.z=1/12*t*(2*o*2*o+2*s*2*s)}getPlaneConstantOfFace(t){const e=this.faces[t],n=this.faceNormals[t],i=this.vertices[e[0]];return-n.dot(i)}clipFaceAgainstHull(t,e,n,i,s,o,a){const l=new y,c=new y,h=new y,d=new y,u=new y,m=new y,g=new y,_=new y,p=this,f=[],v=i,x=f;let M=-1,C=Number.MAX_VALUE;for(let b=0;b<p.faces.length;b++){l.copy(p.faceNormals[b]),n.vmult(l,l);const U=l.dot(t);U<C&&(C=U,M=b)}if(M<0)return;const w=p.faces[M];w.connectedFaces=[];for(let b=0;b<p.faces.length;b++)for(let U=0;U<p.faces[b].length;U++)w.indexOf(p.faces[b][U])!==-1&&b!==M&&w.connectedFaces.indexOf(b)===-1&&w.connectedFaces.push(b);const A=w.length;for(let b=0;b<A;b++){const U=p.vertices[w[b]],F=p.vertices[w[(b+1)%A]];U.vsub(F,c),h.copy(c),n.vmult(h,h),e.vadd(h,h),d.copy(this.faceNormals[M]),n.vmult(d,d),e.vadd(d,d),h.cross(d,u),u.negate(u),m.copy(U),n.vmult(m,m),e.vadd(m,m);const N=w.connectedFaces[b];g.copy(this.faceNormals[N]);const L=this.getPlaneConstantOfFace(N);_.copy(g),n.vmult(_,_);const P=L-_.dot(e);for(this.clipFaceAgainstPlane(v,x,_,P);v.length;)v.shift();for(;x.length;)v.push(x.shift())}g.copy(this.faceNormals[M]);const B=this.getPlaneConstantOfFace(M);_.copy(g),n.vmult(_,_);const S=B-_.dot(e);for(let b=0;b<v.length;b++){let U=_.dot(v[b])+S;if(U<=s&&(console.log(`clamped: depth=${U} to minDist=${s}`),U=s),U<=o){const F=v[b];if(U<=1e-6){const N={point:F,normal:_,depth:U};a.push(N)}}}}clipFaceAgainstPlane(t,e,n,i){let s,o;const a=t.length;if(a<2)return e;let l=t[t.length-1],c=t[0];s=n.dot(l)+i;for(let h=0;h<a;h++){if(c=t[h],o=n.dot(c)+i,s<0)if(o<0){const d=new y;d.copy(c),e.push(d)}else{const d=new y;l.lerp(c,s/(s-o),d),e.push(d)}else if(o<0){const d=new y;l.lerp(c,s/(s-o),d),e.push(d),e.push(c)}l=c,s=o}return e}computeWorldVertices(t,e){for(;this.worldVertices.length<this.vertices.length;)this.worldVertices.push(new y);const n=this.vertices,i=this.worldVertices;for(let s=0;s!==this.vertices.length;s++)e.vmult(n[s],i[s]),t.vadd(i[s],i[s]);this.worldVerticesNeedsUpdate=!1}computeLocalAABB(t,e){const n=this.vertices;t.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),e.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(let i=0;i<this.vertices.length;i++){const s=n[i];s.x<t.x?t.x=s.x:s.x>e.x&&(e.x=s.x),s.y<t.y?t.y=s.y:s.y>e.y&&(e.y=s.y),s.z<t.z?t.z=s.z:s.z>e.z&&(e.z=s.z)}}computeWorldFaceNormals(t){const e=this.faceNormals.length;for(;this.worldFaceNormals.length<e;)this.worldFaceNormals.push(new y);const n=this.faceNormals,i=this.worldFaceNormals;for(let s=0;s!==e;s++)t.vmult(n[s],i[s]);this.worldFaceNormalsNeedsUpdate=!1}updateBoundingSphereRadius(){let t=0;const e=this.vertices;for(let n=0;n!==e.length;n++){const i=e[n].lengthSquared();i>t&&(t=i)}this.boundingSphereRadius=Math.sqrt(t)}calculateWorldAABB(t,e,n,i){const s=this.vertices;let o,a,l,c,h,d,u=new y;for(let m=0;m<s.length;m++){u.copy(s[m]),e.vmult(u,u),t.vadd(u,u);const g=u;(o===void 0||g.x<o)&&(o=g.x),(c===void 0||g.x>c)&&(c=g.x),(a===void 0||g.y<a)&&(a=g.y),(h===void 0||g.y>h)&&(h=g.y),(l===void 0||g.z<l)&&(l=g.z),(d===void 0||g.z>d)&&(d=g.z)}n.set(o,a,l),i.set(c,h,d)}volume(){return 4*Math.PI*this.boundingSphereRadius/3}getAveragePointLocal(t){t===void 0&&(t=new y);const e=this.vertices;for(let n=0;n<e.length;n++)t.vadd(e[n],t);return t.scale(1/e.length,t),t}transformAllPoints(t,e){const n=this.vertices.length,i=this.vertices;if(e){for(let s=0;s<n;s++){const o=i[s];e.vmult(o,o)}for(let s=0;s<this.faceNormals.length;s++){const o=this.faceNormals[s];e.vmult(o,o)}}if(t)for(let s=0;s<n;s++){const o=i[s];o.vadd(t,o)}}pointIsInside(t){const e=this.vertices,n=this.faces,i=this.faceNormals,s=new y;this.getAveragePointLocal(s);for(let o=0;o<this.faces.length;o++){let a=i[o];const l=e[n[o][0]],c=new y;t.vsub(l,c);const h=a.dot(c),d=new y;s.vsub(l,d);const u=a.dot(d);if(h<0&&u>0||h>0&&u<0)return!1}return-1}static project(t,e,n,i,s){const o=t.vertices.length,a=rm;let l=0,c=0;const h=om,d=t.vertices;h.setZero(),Wt.vectorToLocalFrame(n,i,e,a),Wt.pointToLocalFrame(n,i,h,h);const u=h.dot(a);c=l=d[0].dot(a);for(let m=1;m<o;m++){const g=d[m].dot(a);g>l&&(l=g),g<c&&(c=g)}if(c-=u,l-=u,c>l){const m=c;c=l,l=m}s[0]=l,s[1]=c}}const Sr=[],Er=[];new y;const rm=new y,om=new y;class qr extends ut{constructor(t){super({type:ut.types.BOX}),this.halfExtents=t,this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}updateConvexPolyhedronRepresentation(){const t=this.halfExtents.x,e=this.halfExtents.y,n=this.halfExtents.z,i=y,s=[new i(-t,-e,-n),new i(t,-e,-n),new i(t,e,-n),new i(-t,e,-n),new i(-t,-e,n),new i(t,-e,n),new i(t,e,n),new i(-t,e,n)],o=[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]],a=[new i(0,0,1),new i(0,1,0),new i(1,0,0)],l=new vi({vertices:s,faces:o,axes:a});this.convexPolyhedronRepresentation=l,l.material=this.material}calculateLocalInertia(t,e){return e===void 0&&(e=new y),qr.calculateInertia(this.halfExtents,t,e),e}static calculateInertia(t,e,n){const i=t;n.x=1/12*e*(2*i.y*2*i.y+2*i.z*2*i.z),n.y=1/12*e*(2*i.x*2*i.x+2*i.z*2*i.z),n.z=1/12*e*(2*i.y*2*i.y+2*i.x*2*i.x)}getSideNormals(t,e){const n=t,i=this.halfExtents;if(n[0].set(i.x,0,0),n[1].set(0,i.y,0),n[2].set(0,0,i.z),n[3].set(-i.x,0,0),n[4].set(0,-i.y,0),n[5].set(0,0,-i.z),e!==void 0)for(let s=0;s!==n.length;s++)e.vmult(n[s],n[s]);return n}volume(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z}updateBoundingSphereRadius(){this.boundingSphereRadius=this.halfExtents.length()}forEachWorldCorner(t,e,n){const i=this.halfExtents,s=[[i.x,i.y,i.z],[-i.x,i.y,i.z],[-i.x,-i.y,i.z],[-i.x,-i.y,-i.z],[i.x,-i.y,-i.z],[i.x,i.y,-i.z],[-i.x,i.y,-i.z],[i.x,-i.y,i.z]];for(let o=0;o<s.length;o++)En.set(s[o][0],s[o][1],s[o][2]),e.vmult(En,En),t.vadd(En,En),n(En.x,En.y,En.z)}calculateWorldAABB(t,e,n,i){const s=this.halfExtents;je[0].set(s.x,s.y,s.z),je[1].set(-s.x,s.y,s.z),je[2].set(-s.x,-s.y,s.z),je[3].set(-s.x,-s.y,-s.z),je[4].set(s.x,-s.y,-s.z),je[5].set(s.x,s.y,-s.z),je[6].set(-s.x,s.y,-s.z),je[7].set(s.x,-s.y,s.z);const o=je[0];e.vmult(o,o),t.vadd(o,o),i.copy(o),n.copy(o);for(let a=1;a<8;a++){const l=je[a];e.vmult(l,l),t.vadd(l,l);const c=l.x,h=l.y,d=l.z;c>i.x&&(i.x=c),h>i.y&&(i.y=h),d>i.z&&(i.z=d),c<n.x&&(n.x=c),h<n.y&&(n.y=h),d<n.z&&(n.z=d)}}}const En=new y,je=[new y,new y,new y,new y,new y,new y,new y,new y],Xr={DYNAMIC:1,STATIC:2,KINEMATIC:4},Yr={AWAKE:0,SLEEPY:1,SLEEPING:2};class ct extends bl{constructor(t){t===void 0&&(t={}),super(),this.id=ct.idCounter++,this.index=-1,this.world=null,this.vlambda=new y,this.collisionFilterGroup=typeof t.collisionFilterGroup=="number"?t.collisionFilterGroup:1,this.collisionFilterMask=typeof t.collisionFilterMask=="number"?t.collisionFilterMask:-1,this.collisionResponse=typeof t.collisionResponse=="boolean"?t.collisionResponse:!0,this.position=new y,this.previousPosition=new y,this.interpolatedPosition=new y,this.initPosition=new y,t.position&&(this.position.copy(t.position),this.previousPosition.copy(t.position),this.interpolatedPosition.copy(t.position),this.initPosition.copy(t.position)),this.velocity=new y,t.velocity&&this.velocity.copy(t.velocity),this.initVelocity=new y,this.force=new y;const e=typeof t.mass=="number"?t.mass:0;this.mass=e,this.invMass=e>0?1/e:0,this.material=t.material||null,this.linearDamping=typeof t.linearDamping=="number"?t.linearDamping:.01,this.type=e<=0?ct.STATIC:ct.DYNAMIC,typeof t.type==typeof ct.STATIC&&(this.type=t.type),this.allowSleep=typeof t.allowSleep<"u"?t.allowSleep:!0,this.sleepState=ct.AWAKE,this.sleepSpeedLimit=typeof t.sleepSpeedLimit<"u"?t.sleepSpeedLimit:.1,this.sleepTimeLimit=typeof t.sleepTimeLimit<"u"?t.sleepTimeLimit:1,this.timeLastSleepy=0,this.wakeUpAfterNarrowphase=!1,this.torque=new y,this.quaternion=new ae,this.initQuaternion=new ae,this.previousQuaternion=new ae,this.interpolatedQuaternion=new ae,t.quaternion&&(this.quaternion.copy(t.quaternion),this.initQuaternion.copy(t.quaternion),this.previousQuaternion.copy(t.quaternion),this.interpolatedQuaternion.copy(t.quaternion)),this.angularVelocity=new y,t.angularVelocity&&this.angularVelocity.copy(t.angularVelocity),this.initAngularVelocity=new y,this.shapes=[],this.shapeOffsets=[],this.shapeOrientations=[],this.inertia=new y,this.invInertia=new y,this.invInertiaWorld=new Ye,this.invMassSolve=0,this.invInertiaSolve=new y,this.invInertiaWorldSolve=new Ye,this.fixedRotation=typeof t.fixedRotation<"u"?t.fixedRotation:!1,this.angularDamping=typeof t.angularDamping<"u"?t.angularDamping:.01,this.linearFactor=new y(1,1,1),t.linearFactor&&this.linearFactor.copy(t.linearFactor),this.angularFactor=new y(1,1,1),t.angularFactor&&this.angularFactor.copy(t.angularFactor),this.aabb=new Ue,this.aabbNeedsUpdate=!0,this.boundingRadius=0,this.wlambda=new y,this.isTrigger=!!t.isTrigger,t.shape&&this.addShape(t.shape),this.updateMassProperties()}wakeUp(){const t=this.sleepState;this.sleepState=ct.AWAKE,this.wakeUpAfterNarrowphase=!1,t===ct.SLEEPING&&this.dispatchEvent(ct.wakeupEvent)}sleep(){this.sleepState=ct.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0),this.wakeUpAfterNarrowphase=!1}sleepTick(t){if(this.allowSleep){const e=this.sleepState,n=this.velocity.lengthSquared()+this.angularVelocity.lengthSquared(),i=this.sleepSpeedLimit**2;e===ct.AWAKE&&n<i?(this.sleepState=ct.SLEEPY,this.timeLastSleepy=t,this.dispatchEvent(ct.sleepyEvent)):e===ct.SLEEPY&&n>i?this.wakeUp():e===ct.SLEEPY&&t-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(ct.sleepEvent))}}updateSolveMassProperties(){this.sleepState===ct.SLEEPING||this.type===ct.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))}pointToLocalFrame(t,e){return e===void 0&&(e=new y),t.vsub(this.position,e),this.quaternion.conjugate().vmult(e,e),e}vectorToLocalFrame(t,e){return e===void 0&&(e=new y),this.quaternion.conjugate().vmult(t,e),e}pointToWorldFrame(t,e){return e===void 0&&(e=new y),this.quaternion.vmult(t,e),e.vadd(this.position,e),e}vectorToWorldFrame(t,e){return e===void 0&&(e=new y),this.quaternion.vmult(t,e),e}addShape(t,e,n){const i=new y,s=new ae;return e&&i.copy(e),n&&s.copy(n),this.shapes.push(t),this.shapeOffsets.push(i),this.shapeOrientations.push(s),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=this,this}removeShape(t){const e=this.shapes.indexOf(t);return e===-1?(console.warn("Shape does not belong to the body"),this):(this.shapes.splice(e,1),this.shapeOffsets.splice(e,1),this.shapeOrientations.splice(e,1),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=null,this)}updateBoundingRadius(){const t=this.shapes,e=this.shapeOffsets,n=t.length;let i=0;for(let s=0;s!==n;s++){const o=t[s];o.updateBoundingSphereRadius();const a=e[s].length(),l=o.boundingSphereRadius;a+l>i&&(i=a+l)}this.boundingRadius=i}updateAABB(){const t=this.shapes,e=this.shapeOffsets,n=this.shapeOrientations,i=t.length,s=am,o=lm,a=this.quaternion,l=this.aabb,c=cm;for(let h=0;h!==i;h++){const d=t[h];a.vmult(e[h],s),s.vadd(this.position,s),a.mult(n[h],o),d.calculateWorldAABB(s,o,c.lowerBound,c.upperBound),h===0?l.copy(c):l.extend(c)}this.aabbNeedsUpdate=!1}updateInertiaWorld(t){const e=this.invInertia;if(!(e.x===e.y&&e.y===e.z&&!t)){const n=hm,i=um;n.setRotationFromQuaternion(this.quaternion),n.transpose(i),n.scale(e,n),n.mmult(i,this.invInertiaWorld)}}applyForce(t,e){if(e===void 0&&(e=new y),this.type!==ct.DYNAMIC)return;this.sleepState===ct.SLEEPING&&this.wakeUp();const n=dm;e.cross(t,n),this.force.vadd(t,this.force),this.torque.vadd(n,this.torque)}applyLocalForce(t,e){if(e===void 0&&(e=new y),this.type!==ct.DYNAMIC)return;const n=fm,i=pm;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyForce(n,i)}applyTorque(t){this.type===ct.DYNAMIC&&(this.sleepState===ct.SLEEPING&&this.wakeUp(),this.torque.vadd(t,this.torque))}applyImpulse(t,e){if(e===void 0&&(e=new y),this.type!==ct.DYNAMIC)return;this.sleepState===ct.SLEEPING&&this.wakeUp();const n=e,i=mm;i.copy(t),i.scale(this.invMass,i),this.velocity.vadd(i,this.velocity);const s=gm;n.cross(t,s),this.invInertiaWorld.vmult(s,s),this.angularVelocity.vadd(s,this.angularVelocity)}applyLocalImpulse(t,e){if(e===void 0&&(e=new y),this.type!==ct.DYNAMIC)return;const n=_m,i=vm;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyImpulse(n,i)}updateMassProperties(){const t=xm;this.invMass=this.mass>0?1/this.mass:0;const e=this.inertia,n=this.fixedRotation;this.updateAABB(),t.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),qr.calculateInertia(t,this.mass,e),this.invInertia.set(e.x>0&&!n?1/e.x:0,e.y>0&&!n?1/e.y:0,e.z>0&&!n?1/e.z:0),this.updateInertiaWorld(!0)}getVelocityAtWorldPoint(t,e){const n=new y;return t.vsub(this.position,n),this.angularVelocity.cross(n,e),this.velocity.vadd(e,e),e}integrate(t,e,n){if(this.previousPosition.copy(this.position),this.previousQuaternion.copy(this.quaternion),!(this.type===ct.DYNAMIC||this.type===ct.KINEMATIC)||this.sleepState===ct.SLEEPING)return;const i=this.velocity,s=this.angularVelocity,o=this.position,a=this.force,l=this.torque,c=this.quaternion,h=this.invMass,d=this.invInertiaWorld,u=this.linearFactor,m=h*t;i.x+=a.x*m*u.x,i.y+=a.y*m*u.y,i.z+=a.z*m*u.z;const g=d.elements,_=this.angularFactor,p=l.x*_.x,f=l.y*_.y,v=l.z*_.z;s.x+=t*(g[0]*p+g[1]*f+g[2]*v),s.y+=t*(g[3]*p+g[4]*f+g[5]*v),s.z+=t*(g[6]*p+g[7]*f+g[8]*v),o.x+=i.x*t,o.y+=i.y*t,o.z+=i.z*t,c.integrate(this.angularVelocity,t,this.angularFactor,c),e&&(n?c.normalizeFast():c.normalize()),this.aabbNeedsUpdate=!0,this.updateInertiaWorld()}}ct.idCounter=0;ct.COLLIDE_EVENT_NAME="collide";ct.DYNAMIC=Xr.DYNAMIC;ct.STATIC=Xr.STATIC;ct.KINEMATIC=Xr.KINEMATIC;ct.AWAKE=Yr.AWAKE;ct.SLEEPY=Yr.SLEEPY;ct.SLEEPING=Yr.SLEEPING;ct.wakeupEvent={type:"wakeup"};ct.sleepyEvent={type:"sleepy"};ct.sleepEvent={type:"sleep"};const am=new y,lm=new ae,cm=new Ue,hm=new Ye,um=new Ye;new Ye;const dm=new y,fm=new y,pm=new y,mm=new y,gm=new y,_m=new y,vm=new y,xm=new y;class ym{constructor(){this.world=null,this.useBoundingBoxes=!1,this.dirty=!0}collisionPairs(t,e,n){throw new Error("collisionPairs not implemented for this BroadPhase class!")}needBroadphaseCollision(t,e){return!(!(t.collisionFilterGroup&e.collisionFilterMask)||!(e.collisionFilterGroup&t.collisionFilterMask)||(t.type&ct.STATIC||t.sleepState===ct.SLEEPING)&&(e.type&ct.STATIC||e.sleepState===ct.SLEEPING))}intersectionTest(t,e,n,i){this.useBoundingBoxes?this.doBoundingBoxBroadphase(t,e,n,i):this.doBoundingSphereBroadphase(t,e,n,i)}doBoundingSphereBroadphase(t,e,n,i){const s=Mm;e.position.vsub(t.position,s);const o=(t.boundingRadius+e.boundingRadius)**2;s.lengthSquared()<o&&(n.push(t),i.push(e))}doBoundingBoxBroadphase(t,e,n,i){t.aabbNeedsUpdate&&t.updateAABB(),e.aabbNeedsUpdate&&e.updateAABB(),t.aabb.overlaps(e.aabb)&&(n.push(t),i.push(e))}makePairsUnique(t,e){const n=Sm,i=Em,s=bm,o=t.length;for(let a=0;a!==o;a++)i[a]=t[a],s[a]=e[a];t.length=0,e.length=0;for(let a=0;a!==o;a++){const l=i[a].id,c=s[a].id,h=l<c?`${l},${c}`:`${c},${l}`;n[h]=a,n.keys.push(h)}for(let a=0;a!==n.keys.length;a++){const l=n.keys.pop(),c=n[l];t.push(i[c]),e.push(s[c]),delete n[l]}}setWorld(t){}static boundingSphereCheck(t,e){const n=new y;t.position.vsub(e.position,n);const i=t.shapes[0],s=e.shapes[0];return Math.pow(i.boundingSphereRadius+s.boundingSphereRadius,2)>n.lengthSquared()}aabbQuery(t,e,n){return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),[]}}const Mm=new y;new y;new ae;new y;const Sm={keys:[]},Em=[],bm=[];new y;new y;new y;class Tm extends ym{constructor(){super()}collisionPairs(t,e,n){const i=t.bodies,s=i.length;let o,a;for(let l=0;l!==s;l++)for(let c=0;c!==l;c++)o=i[l],a=i[c],this.needBroadphaseCollision(o,a)&&this.intersectionTest(o,a,e,n)}aabbQuery(t,e,n){n===void 0&&(n=[]);for(let i=0;i<t.bodies.length;i++){const s=t.bodies[i];s.aabbNeedsUpdate&&s.updateAABB(),s.aabb.overlaps(e)&&n.push(s)}return n}}class Ps{constructor(){this.rayFromWorld=new y,this.rayToWorld=new y,this.hitNormalWorld=new y,this.hitPointWorld=new y,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}reset(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}abort(){this.shouldStop=!0}set(t,e,n,i,s,o,a){this.rayFromWorld.copy(t),this.rayToWorld.copy(e),this.hitNormalWorld.copy(n),this.hitPointWorld.copy(i),this.shape=s,this.body=o,this.distance=a}}let Tl,wl,Al,Rl,Cl,Ll,Pl;const $r={CLOSEST:1,ANY:2,ALL:4};Tl=ut.types.SPHERE;wl=ut.types.PLANE;Al=ut.types.BOX;Rl=ut.types.CYLINDER;Cl=ut.types.CONVEXPOLYHEDRON;Ll=ut.types.HEIGHTFIELD;Pl=ut.types.TRIMESH;class oe{get[Tl](){return this._intersectSphere}get[wl](){return this._intersectPlane}get[Al](){return this._intersectBox}get[Rl](){return this._intersectConvex}get[Cl](){return this._intersectConvex}get[Ll](){return this._intersectHeightfield}get[Pl](){return this._intersectTrimesh}constructor(t,e){t===void 0&&(t=new y),e===void 0&&(e=new y),this.from=t.clone(),this.to=e.clone(),this.direction=new y,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=oe.ANY,this.result=new Ps,this.hasHit=!1,this.callback=n=>{}}intersectWorld(t,e){return this.mode=e.mode||oe.ANY,this.result=e.result||new Ps,this.skipBackfaces=!!e.skipBackfaces,this.collisionFilterMask=typeof e.collisionFilterMask<"u"?e.collisionFilterMask:-1,this.collisionFilterGroup=typeof e.collisionFilterGroup<"u"?e.collisionFilterGroup:-1,this.checkCollisionResponse=typeof e.checkCollisionResponse<"u"?e.checkCollisionResponse:!0,e.from&&this.from.copy(e.from),e.to&&this.to.copy(e.to),this.callback=e.callback||(()=>{}),this.hasHit=!1,this.result.reset(),this.updateDirection(),this.getAABB(Ca),br.length=0,t.broadphase.aabbQuery(t,Ca,br),this.intersectBodies(br),this.hasHit}intersectBody(t,e){e&&(this.result=e,this.updateDirection());const n=this.checkCollisionResponse;if(n&&!t.collisionResponse||!(this.collisionFilterGroup&t.collisionFilterMask)||!(t.collisionFilterGroup&this.collisionFilterMask))return;const i=wm,s=Am;for(let o=0,a=t.shapes.length;o<a;o++){const l=t.shapes[o];if(!(n&&!l.collisionResponse)&&(t.quaternion.mult(t.shapeOrientations[o],s),t.quaternion.vmult(t.shapeOffsets[o],i),i.vadd(t.position,i),this.intersectShape(l,s,i,t),this.result.shouldStop))break}}intersectBodies(t,e){e&&(this.result=e,this.updateDirection());for(let n=0,i=t.length;!this.result.shouldStop&&n<i;n++)this.intersectBody(t[n])}updateDirection(){this.to.vsub(this.from,this.direction),this.direction.normalize()}intersectShape(t,e,n,i){const s=this.from;if(Gm(s,this.direction,n)>t.boundingSphereRadius)return;const a=this[t.type];a&&a.call(this,t,e,n,i,t)}_intersectBox(t,e,n,i,s){return this._intersectConvex(t.convexPolyhedronRepresentation,e,n,i,s)}_intersectPlane(t,e,n,i,s){const o=this.from,a=this.to,l=this.direction,c=new y(0,0,1);e.vmult(c,c);const h=new y;o.vsub(n,h);const d=h.dot(c);a.vsub(n,h);const u=h.dot(c);if(d*u>0||o.distanceTo(a)<d)return;const m=c.dot(l);if(Math.abs(m)<this.precision)return;const g=new y,_=new y,p=new y;o.vsub(n,g);const f=-c.dot(g)/m;l.scale(f,_),o.vadd(_,p),this.reportIntersection(c,p,s,i,-1)}getAABB(t){const{lowerBound:e,upperBound:n}=t,i=this.to,s=this.from;e.x=Math.min(i.x,s.x),e.y=Math.min(i.y,s.y),e.z=Math.min(i.z,s.z),n.x=Math.max(i.x,s.x),n.y=Math.max(i.y,s.y),n.z=Math.max(i.z,s.z)}_intersectHeightfield(t,e,n,i,s){t.data,t.elementSize;const o=Rm;o.from.copy(this.from),o.to.copy(this.to),Wt.pointToLocalFrame(n,e,o.from,o.from),Wt.pointToLocalFrame(n,e,o.to,o.to),o.updateDirection();const a=Cm;let l,c,h,d;l=c=0,h=d=t.data.length-1;const u=new Ue;o.getAABB(u),t.getIndexOfPosition(u.lowerBound.x,u.lowerBound.y,a,!0),l=Math.max(l,a[0]),c=Math.max(c,a[1]),t.getIndexOfPosition(u.upperBound.x,u.upperBound.y,a,!0),h=Math.min(h,a[0]+1),d=Math.min(d,a[1]+1);for(let m=l;m<h;m++)for(let g=c;g<d;g++){if(this.result.shouldStop)return;if(t.getAabbAtIndex(m,g,u),!!u.overlapsRay(o)){if(t.getConvexTrianglePillar(m,g,!1),Wt.pointToWorldFrame(n,e,t.pillarOffset,_s),this._intersectConvex(t.pillarConvex,e,_s,i,s,La),this.result.shouldStop)return;t.getConvexTrianglePillar(m,g,!0),Wt.pointToWorldFrame(n,e,t.pillarOffset,_s),this._intersectConvex(t.pillarConvex,e,_s,i,s,La)}}}_intersectSphere(t,e,n,i,s){const o=this.from,a=this.to,l=t.radius,c=(a.x-o.x)**2+(a.y-o.y)**2+(a.z-o.z)**2,h=2*((a.x-o.x)*(o.x-n.x)+(a.y-o.y)*(o.y-n.y)+(a.z-o.z)*(o.z-n.z)),d=(o.x-n.x)**2+(o.y-n.y)**2+(o.z-n.z)**2-l**2,u=h**2-4*c*d,m=Lm,g=Pm;if(!(u<0))if(u===0)o.lerp(a,u,m),m.vsub(n,g),g.normalize(),this.reportIntersection(g,m,s,i,-1);else{const _=(-h-Math.sqrt(u))/(2*c),p=(-h+Math.sqrt(u))/(2*c);if(_>=0&&_<=1&&(o.lerp(a,_,m),m.vsub(n,g),g.normalize(),this.reportIntersection(g,m,s,i,-1)),this.result.shouldStop)return;p>=0&&p<=1&&(o.lerp(a,p,m),m.vsub(n,g),g.normalize(),this.reportIntersection(g,m,s,i,-1))}}_intersectConvex(t,e,n,i,s,o){const a=Im,l=Pa,c=o&&o.faceList||null,h=t.faces,d=t.vertices,u=t.faceNormals,m=this.direction,g=this.from,_=this.to,p=g.distanceTo(_),f=c?c.length:h.length,v=this.result;for(let x=0;!v.shouldStop&&x<f;x++){const M=c?c[x]:x,C=h[M],w=u[M],A=e,B=n;l.copy(d[C[0]]),A.vmult(l,l),l.vadd(B,l),l.vsub(g,l),A.vmult(w,a);const S=m.dot(a);if(Math.abs(S)<this.precision)continue;const b=a.dot(l)/S;if(!(b<0)){m.scale(b,Ae),Ae.vadd(g,Ae),ke.copy(d[C[0]]),A.vmult(ke,ke),B.vadd(ke,ke);for(let U=1;!v.shouldStop&&U<C.length-1;U++){Ke.copy(d[C[U]]),Ze.copy(d[C[U+1]]),A.vmult(Ke,Ke),A.vmult(Ze,Ze),B.vadd(Ke,Ke),B.vadd(Ze,Ze);const F=Ae.distanceTo(g);!(oe.pointInTriangle(Ae,ke,Ke,Ze)||oe.pointInTriangle(Ae,Ke,ke,Ze))||F>p||this.reportIntersection(a,Ae,s,i,M)}}}}_intersectTrimesh(t,e,n,i,s,o){const a=Dm,l=zm,c=Hm,h=Pa,d=Nm,u=Um,m=Fm,g=Bm,_=Om,p=t.indices;t.vertices;const f=this.from,v=this.to,x=this.direction;c.position.copy(n),c.quaternion.copy(e),Wt.vectorToLocalFrame(n,e,x,d),Wt.pointToLocalFrame(n,e,f,u),Wt.pointToLocalFrame(n,e,v,m),m.x*=t.scale.x,m.y*=t.scale.y,m.z*=t.scale.z,u.x*=t.scale.x,u.y*=t.scale.y,u.z*=t.scale.z,m.vsub(u,d),d.normalize();const M=u.distanceSquared(m);t.tree.rayQuery(this,c,l);for(let C=0,w=l.length;!this.result.shouldStop&&C!==w;C++){const A=l[C];t.getNormal(A,a),t.getVertex(p[A*3],ke),ke.vsub(u,h);const B=d.dot(a),S=a.dot(h)/B;if(S<0)continue;d.scale(S,Ae),Ae.vadd(u,Ae),t.getVertex(p[A*3+1],Ke),t.getVertex(p[A*3+2],Ze);const b=Ae.distanceSquared(u);!(oe.pointInTriangle(Ae,Ke,ke,Ze)||oe.pointInTriangle(Ae,ke,Ke,Ze))||b>M||(Wt.vectorToWorldFrame(e,a,_),Wt.pointToWorldFrame(n,e,Ae,g),this.reportIntersection(_,g,s,i,A))}l.length=0}reportIntersection(t,e,n,i,s){const o=this.from,a=this.to,l=o.distanceTo(e),c=this.result;if(!(this.skipBackfaces&&t.dot(this.direction)>0))switch(c.hitFaceIndex=typeof s<"u"?s:-1,this.mode){case oe.ALL:this.hasHit=!0,c.set(o,a,t,e,n,i,l),c.hasHit=!0,this.callback(c);break;case oe.CLOSEST:(l<c.distance||!c.hasHit)&&(this.hasHit=!0,c.hasHit=!0,c.set(o,a,t,e,n,i,l));break;case oe.ANY:this.hasHit=!0,c.hasHit=!0,c.set(o,a,t,e,n,i,l),c.shouldStop=!0;break}}static pointInTriangle(t,e,n,i){i.vsub(e,kn),n.vsub(e,Ii),t.vsub(e,Tr);const s=kn.dot(kn),o=kn.dot(Ii),a=kn.dot(Tr),l=Ii.dot(Ii),c=Ii.dot(Tr);let h,d;return(h=l*a-o*c)>=0&&(d=s*c-o*a)>=0&&h+d<s*l-o*o}}oe.CLOSEST=$r.CLOSEST;oe.ANY=$r.ANY;oe.ALL=$r.ALL;const Ca=new Ue,br=[],Ii=new y,Tr=new y,wm=new y,Am=new ae,Ae=new y,ke=new y,Ke=new y,Ze=new y;new y;new Ps;const La={faceList:[0]},_s=new y,Rm=new oe,Cm=[],Lm=new y,Pm=new y,Im=new y;new y;new y;const Pa=new y,Dm=new y,Nm=new y,Um=new y,Fm=new y,Om=new y,Bm=new y;new Ue;const zm=[],Hm=new Wt,kn=new y,vs=new y;function Gm(r,t,e){e.vsub(r,kn);const n=kn.dot(t);return t.scale(n,vs),vs.vadd(r,vs),e.distanceTo(vs)}class Vm{static defaults(t,e){t===void 0&&(t={});for(let n in e)n in t||(t[n]=e[n]);return t}}class Ia{constructor(){this.spatial=new y,this.rotational=new y}multiplyElement(t){return t.spatial.dot(this.spatial)+t.rotational.dot(this.rotational)}multiplyVectors(t,e){return t.dot(this.spatial)+e.dot(this.rotational)}}class Wi{constructor(t,e,n,i){n===void 0&&(n=-1e6),i===void 0&&(i=1e6),this.id=Wi.idCounter++,this.minForce=n,this.maxForce=i,this.bi=t,this.bj=e,this.a=0,this.b=0,this.eps=0,this.jacobianElementA=new Ia,this.jacobianElementB=new Ia,this.enabled=!0,this.multiplier=0,this.setSpookParams(1e7,4,1/60)}setSpookParams(t,e,n){const i=e,s=t,o=n;this.a=4/(o*(1+4*i)),this.b=4*i/(1+4*i),this.eps=4/(o*o*s*(1+4*i))}computeB(t,e,n){const i=this.computeGW(),s=this.computeGq(),o=this.computeGiMf();return-s*t-i*e-o*n}computeGq(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.position,o=i.position;return t.spatial.dot(s)+e.spatial.dot(o)}computeGW(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.velocity,o=i.velocity,a=n.angularVelocity,l=i.angularVelocity;return t.multiplyVectors(s,a)+e.multiplyVectors(o,l)}computeGWlambda(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.vlambda,o=i.vlambda,a=n.wlambda,l=i.wlambda;return t.multiplyVectors(s,a)+e.multiplyVectors(o,l)}computeGiMf(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.force,o=n.torque,a=i.force,l=i.torque,c=n.invMassSolve,h=i.invMassSolve;return s.scale(c,Da),a.scale(h,Na),n.invInertiaWorldSolve.vmult(o,Ua),i.invInertiaWorldSolve.vmult(l,Fa),t.multiplyVectors(Da,Ua)+e.multiplyVectors(Na,Fa)}computeGiMGt(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.invMassSolve,o=i.invMassSolve,a=n.invInertiaWorldSolve,l=i.invInertiaWorldSolve;let c=s+o;return a.vmult(t.rotational,xs),c+=xs.dot(t.rotational),l.vmult(e.rotational,xs),c+=xs.dot(e.rotational),c}addToWlambda(t){const e=this.jacobianElementA,n=this.jacobianElementB,i=this.bi,s=this.bj,o=km;i.vlambda.addScaledVector(i.invMassSolve*t,e.spatial,i.vlambda),s.vlambda.addScaledVector(s.invMassSolve*t,n.spatial,s.vlambda),i.invInertiaWorldSolve.vmult(e.rotational,o),i.wlambda.addScaledVector(t,o,i.wlambda),s.invInertiaWorldSolve.vmult(n.rotational,o),s.wlambda.addScaledVector(t,o,s.wlambda)}computeC(){return this.computeGiMGt()+this.eps}}Wi.idCounter=0;const Da=new y,Na=new y,Ua=new y,Fa=new y,xs=new y,km=new y;class Wm extends Wi{constructor(t,e,n){n===void 0&&(n=1e6),super(t,e,0,n),this.restitution=0,this.ri=new y,this.rj=new y,this.ni=new y}computeB(t){const e=this.a,n=this.b,i=this.bi,s=this.bj,o=this.ri,a=this.rj,l=qm,c=Xm,h=i.velocity,d=i.angularVelocity;i.force,i.torque;const u=s.velocity,m=s.angularVelocity;s.force,s.torque;const g=Ym,_=this.jacobianElementA,p=this.jacobianElementB,f=this.ni;o.cross(f,l),a.cross(f,c),f.negate(_.spatial),l.negate(_.rotational),p.spatial.copy(f),p.rotational.copy(c),g.copy(s.position),g.vadd(a,g),g.vsub(i.position,g),g.vsub(o,g);const v=f.dot(g),x=this.restitution+1,M=x*u.dot(f)-x*h.dot(f)+m.dot(c)-d.dot(l),C=this.computeGiMf();return-v*e-M*n-t*C}getImpactVelocityAlongNormal(){const t=$m,e=jm,n=Km,i=Zm,s=Jm;return this.bi.position.vadd(this.ri,n),this.bj.position.vadd(this.rj,i),this.bi.getVelocityAtWorldPoint(n,t),this.bj.getVelocityAtWorldPoint(i,e),t.vsub(e,s),this.ni.dot(s)}}const qm=new y,Xm=new y,Ym=new y,$m=new y,jm=new y,Km=new y,Zm=new y,Jm=new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;class Oa extends Wi{constructor(t,e,n){super(t,e,-n,n),this.ri=new y,this.rj=new y,this.t=new y}computeB(t){this.a;const e=this.b;this.bi,this.bj;const n=this.ri,i=this.rj,s=Qm,o=tg,a=this.t;n.cross(a,s),i.cross(a,o);const l=this.jacobianElementA,c=this.jacobianElementB;a.negate(l.spatial),s.negate(l.rotational),c.spatial.copy(a),c.rotational.copy(o);const h=this.computeGW(),d=this.computeGiMf();return-h*e-t*d}}const Qm=new y,tg=new y;class Bs{constructor(t,e,n){n=Vm.defaults(n,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),this.id=Bs.idCounter++,this.materials=[t,e],this.friction=n.friction,this.restitution=n.restitution,this.contactEquationStiffness=n.contactEquationStiffness,this.contactEquationRelaxation=n.contactEquationRelaxation,this.frictionEquationStiffness=n.frictionEquationStiffness,this.frictionEquationRelaxation=n.frictionEquationRelaxation}}Bs.idCounter=0;class Ei{constructor(t){t===void 0&&(t={});let e="";typeof t=="string"&&(e=t,t={}),this.name=e,this.id=Ei.idCounter++,this.friction=typeof t.friction<"u"?t.friction:-1,this.restitution=typeof t.restitution<"u"?t.restitution:-1}}Ei.idCounter=0;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new oe;new y;new y;new y;new y(1,0,0),new y(0,1,0),new y(0,0,1);new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;class eg extends vi{constructor(t,e,n,i){if(t===void 0&&(t=1),e===void 0&&(e=1),n===void 0&&(n=1),i===void 0&&(i=8),t<0)throw new Error("The cylinder radiusTop cannot be negative.");if(e<0)throw new Error("The cylinder radiusBottom cannot be negative.");const s=i,o=[],a=[],l=[],c=[],h=[],d=Math.cos,u=Math.sin;o.push(new y(-e*u(0),-n*.5,e*d(0))),c.push(0),o.push(new y(-t*u(0),n*.5,t*d(0))),h.push(1);for(let g=0;g<s;g++){const _=2*Math.PI/s*(g+1),p=2*Math.PI/s*(g+.5);g<s-1?(o.push(new y(-e*u(_),-n*.5,e*d(_))),c.push(2*g+2),o.push(new y(-t*u(_),n*.5,t*d(_))),h.push(2*g+3),l.push([2*g,2*g+1,2*g+3,2*g+2])):l.push([2*g,2*g+1,1,0]),(s%2===1||g<s/2)&&a.push(new y(-u(p),0,d(p)))}l.push(c),a.push(new y(0,1,0));const m=[];for(let g=0;g<h.length;g++)m.push(h[h.length-g-1]);l.push(m),super({vertices:o,faces:l,axes:a}),this.type=ut.types.CYLINDER,this.radiusTop=t,this.radiusBottom=e,this.height=n,this.numSegments=i}}class Ba extends ut{constructor(){super({type:ut.types.PLANE}),this.worldNormal=new y,this.worldNormalNeedsUpdate=!0,this.boundingSphereRadius=Number.MAX_VALUE}computeWorldNormal(t){const e=this.worldNormal;e.set(0,0,1),t.vmult(e,e),this.worldNormalNeedsUpdate=!1}calculateLocalInertia(t,e){return e===void 0&&(e=new y),e}volume(){return Number.MAX_VALUE}calculateWorldAABB(t,e,n,i){cn.set(0,0,1),e.vmult(cn,cn);const s=Number.MAX_VALUE;n.set(-s,-s,-s),i.set(s,s,s),cn.x===1?i.x=t.x:cn.x===-1&&(n.x=t.x),cn.y===1?i.y=t.y:cn.y===-1&&(n.y=t.y),cn.z===1?i.z=t.z:cn.z===-1&&(n.z=t.z)}updateBoundingSphereRadius(){this.boundingSphereRadius=Number.MAX_VALUE}}const cn=new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new Ue;new y;new Ue;new y;new y;new y;new y;new y;new y;new y;new Ue;new y;new Wt;new Ue;class ng{constructor(){this.equations=[]}solve(t,e){return 0}addEquation(t){t.enabled&&!t.bi.isTrigger&&!t.bj.isTrigger&&this.equations.push(t)}removeEquation(t){const e=this.equations,n=e.indexOf(t);n!==-1&&e.splice(n,1)}removeAllEquations(){this.equations.length=0}}class ig extends ng{constructor(){super(),this.iterations=10,this.tolerance=1e-7}solve(t,e){let n=0;const i=this.iterations,s=this.tolerance*this.tolerance,o=this.equations,a=o.length,l=e.bodies,c=l.length,h=t;let d,u,m,g,_,p;if(a!==0)for(let M=0;M!==c;M++)l[M].updateSolveMassProperties();const f=rg,v=og,x=sg;f.length=a,v.length=a,x.length=a;for(let M=0;M!==a;M++){const C=o[M];x[M]=0,v[M]=C.computeB(h),f[M]=1/C.computeC()}if(a!==0){for(let w=0;w!==c;w++){const A=l[w],B=A.vlambda,S=A.wlambda;B.set(0,0,0),S.set(0,0,0)}for(n=0;n!==i;n++){g=0;for(let w=0;w!==a;w++){const A=o[w];d=v[w],u=f[w],p=x[w],_=A.computeGWlambda(),m=u*(d-_-A.eps*p),p+m<A.minForce?m=A.minForce-p:p+m>A.maxForce&&(m=A.maxForce-p),x[w]+=m,g+=m>0?m:-m,A.addToWlambda(m)}if(g*g<s)break}for(let w=0;w!==c;w++){const A=l[w],B=A.velocity,S=A.angularVelocity;A.vlambda.vmul(A.linearFactor,A.vlambda),B.vadd(A.vlambda,B),A.wlambda.vmul(A.angularFactor,A.wlambda),S.vadd(A.wlambda,S)}let M=o.length;const C=1/h;for(;M--;)o[M].multiplier=x[M]*C}return n}}const sg=[],rg=[],og=[];class ag{constructor(){this.objects=[],this.type=Object}release(){const t=arguments.length;for(let e=0;e!==t;e++)this.objects.push(e<0||arguments.length<=e?void 0:arguments[e]);return this}get(){return this.objects.length===0?this.constructObject():this.objects.pop()}constructObject(){throw new Error("constructObject() not implemented in this Pool subclass yet!")}resize(t){const e=this.objects;for(;e.length>t;)e.pop();for(;e.length<t;)e.push(this.constructObject());return this}}class lg extends ag{constructor(){super(...arguments),this.type=y}constructObject(){return new y}}const Jt={sphereSphere:ut.types.SPHERE,spherePlane:ut.types.SPHERE|ut.types.PLANE,boxBox:ut.types.BOX|ut.types.BOX,sphereBox:ut.types.SPHERE|ut.types.BOX,planeBox:ut.types.PLANE|ut.types.BOX,convexConvex:ut.types.CONVEXPOLYHEDRON,sphereConvex:ut.types.SPHERE|ut.types.CONVEXPOLYHEDRON,planeConvex:ut.types.PLANE|ut.types.CONVEXPOLYHEDRON,boxConvex:ut.types.BOX|ut.types.CONVEXPOLYHEDRON,sphereHeightfield:ut.types.SPHERE|ut.types.HEIGHTFIELD,boxHeightfield:ut.types.BOX|ut.types.HEIGHTFIELD,convexHeightfield:ut.types.CONVEXPOLYHEDRON|ut.types.HEIGHTFIELD,sphereParticle:ut.types.PARTICLE|ut.types.SPHERE,planeParticle:ut.types.PLANE|ut.types.PARTICLE,boxParticle:ut.types.BOX|ut.types.PARTICLE,convexParticle:ut.types.PARTICLE|ut.types.CONVEXPOLYHEDRON,cylinderCylinder:ut.types.CYLINDER,sphereCylinder:ut.types.SPHERE|ut.types.CYLINDER,planeCylinder:ut.types.PLANE|ut.types.CYLINDER,boxCylinder:ut.types.BOX|ut.types.CYLINDER,convexCylinder:ut.types.CONVEXPOLYHEDRON|ut.types.CYLINDER,heightfieldCylinder:ut.types.HEIGHTFIELD|ut.types.CYLINDER,particleCylinder:ut.types.PARTICLE|ut.types.CYLINDER,sphereTrimesh:ut.types.SPHERE|ut.types.TRIMESH,planeTrimesh:ut.types.PLANE|ut.types.TRIMESH};class cg{get[Jt.sphereSphere](){return this.sphereSphere}get[Jt.spherePlane](){return this.spherePlane}get[Jt.boxBox](){return this.boxBox}get[Jt.sphereBox](){return this.sphereBox}get[Jt.planeBox](){return this.planeBox}get[Jt.convexConvex](){return this.convexConvex}get[Jt.sphereConvex](){return this.sphereConvex}get[Jt.planeConvex](){return this.planeConvex}get[Jt.boxConvex](){return this.boxConvex}get[Jt.sphereHeightfield](){return this.sphereHeightfield}get[Jt.boxHeightfield](){return this.boxHeightfield}get[Jt.convexHeightfield](){return this.convexHeightfield}get[Jt.sphereParticle](){return this.sphereParticle}get[Jt.planeParticle](){return this.planeParticle}get[Jt.boxParticle](){return this.boxParticle}get[Jt.convexParticle](){return this.convexParticle}get[Jt.cylinderCylinder](){return this.convexConvex}get[Jt.sphereCylinder](){return this.sphereConvex}get[Jt.planeCylinder](){return this.planeConvex}get[Jt.boxCylinder](){return this.boxConvex}get[Jt.convexCylinder](){return this.convexConvex}get[Jt.heightfieldCylinder](){return this.heightfieldCylinder}get[Jt.particleCylinder](){return this.particleCylinder}get[Jt.sphereTrimesh](){return this.sphereTrimesh}get[Jt.planeTrimesh](){return this.planeTrimesh}constructor(t){this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],this.v3pool=new lg,this.world=t,this.currentContactMaterial=t.defaultContactMaterial,this.enableFrictionReduction=!1}createContactEquation(t,e,n,i,s,o){let a;this.contactPointPool.length?(a=this.contactPointPool.pop(),a.bi=t,a.bj=e):a=new Wm(t,e),a.enabled=t.collisionResponse&&e.collisionResponse&&n.collisionResponse&&i.collisionResponse;const l=this.currentContactMaterial;a.restitution=l.restitution,a.setSpookParams(l.contactEquationStiffness,l.contactEquationRelaxation,this.world.dt);const c=n.material||t.material,h=i.material||e.material;return c&&h&&c.restitution>=0&&h.restitution>=0&&(a.restitution=c.restitution*h.restitution),a.si=s||n,a.sj=o||i,a}createFrictionEquationsFromContact(t,e){const n=t.bi,i=t.bj,s=t.si,o=t.sj,a=this.world,l=this.currentContactMaterial;let c=l.friction;const h=s.material||n.material,d=o.material||i.material;if(h&&d&&h.friction>=0&&d.friction>=0&&(c=h.friction*d.friction),c>0){const u=c*(a.frictionGravity||a.gravity).length();let m=n.invMass+i.invMass;m>0&&(m=1/m);const g=this.frictionEquationPool,_=g.length?g.pop():new Oa(n,i,u*m),p=g.length?g.pop():new Oa(n,i,u*m);return _.bi=p.bi=n,_.bj=p.bj=i,_.minForce=p.minForce=-u*m,_.maxForce=p.maxForce=u*m,_.ri.copy(t.ri),_.rj.copy(t.rj),p.ri.copy(t.ri),p.rj.copy(t.rj),t.ni.tangents(_.t,p.t),_.setSpookParams(l.frictionEquationStiffness,l.frictionEquationRelaxation,a.dt),p.setSpookParams(l.frictionEquationStiffness,l.frictionEquationRelaxation,a.dt),_.enabled=p.enabled=t.enabled,e.push(_,p),!0}return!1}createFrictionFromAverage(t){let e=this.result[this.result.length-1];if(!this.createFrictionEquationsFromContact(e,this.frictionResult)||t===1)return;const n=this.frictionResult[this.frictionResult.length-2],i=this.frictionResult[this.frictionResult.length-1];Bn.setZero(),di.setZero(),fi.setZero();const s=e.bi;e.bj;for(let a=0;a!==t;a++)e=this.result[this.result.length-1-a],e.bi!==s?(Bn.vadd(e.ni,Bn),di.vadd(e.ri,di),fi.vadd(e.rj,fi)):(Bn.vsub(e.ni,Bn),di.vadd(e.rj,di),fi.vadd(e.ri,fi));const o=1/t;di.scale(o,n.ri),fi.scale(o,n.rj),i.ri.copy(n.ri),i.rj.copy(n.rj),Bn.normalize(),Bn.tangents(n.t,i.t)}getContacts(t,e,n,i,s,o,a){this.contactPointPool=s,this.frictionEquationPool=a,this.result=i,this.frictionResult=o;const l=dg,c=fg,h=hg,d=ug;for(let u=0,m=t.length;u!==m;u++){const g=t[u],_=e[u];let p=null;g.material&&_.material&&(p=n.getContactMaterial(g.material,_.material)||null);const f=g.type&ct.KINEMATIC&&_.type&ct.STATIC||g.type&ct.STATIC&&_.type&ct.KINEMATIC||g.type&ct.KINEMATIC&&_.type&ct.KINEMATIC;for(let v=0;v<g.shapes.length;v++){g.quaternion.mult(g.shapeOrientations[v],l),g.quaternion.vmult(g.shapeOffsets[v],h),h.vadd(g.position,h);const x=g.shapes[v];for(let M=0;M<_.shapes.length;M++){_.quaternion.mult(_.shapeOrientations[M],c),_.quaternion.vmult(_.shapeOffsets[M],d),d.vadd(_.position,d);const C=_.shapes[M];if(!(x.collisionFilterMask&C.collisionFilterGroup&&C.collisionFilterMask&x.collisionFilterGroup)||h.distanceTo(d)>x.boundingSphereRadius+C.boundingSphereRadius)continue;let w=null;x.material&&C.material&&(w=n.getContactMaterial(x.material,C.material)||null),this.currentContactMaterial=w||p||n.defaultContactMaterial;const A=x.type|C.type,B=this[A];if(B){let S=!1;x.type<C.type?S=B.call(this,x,C,h,d,l,c,g,_,x,C,f):S=B.call(this,C,x,d,h,c,l,_,g,x,C,f),S&&f&&(n.shapeOverlapKeeper.set(x.id,C.id),n.bodyOverlapKeeper.set(g.id,_.id))}}}}}sphereSphere(t,e,n,i,s,o,a,l,c,h,d){if(d)return n.distanceSquared(i)<(t.radius+e.radius)**2;const u=this.createContactEquation(a,l,t,e,c,h);i.vsub(n,u.ni),u.ni.normalize(),u.ri.copy(u.ni),u.rj.copy(u.ni),u.ri.scale(t.radius,u.ri),u.rj.scale(-e.radius,u.rj),u.ri.vadd(n,u.ri),u.ri.vsub(a.position,u.ri),u.rj.vadd(i,u.rj),u.rj.vsub(l.position,u.rj),this.result.push(u),this.createFrictionEquationsFromContact(u,this.frictionResult)}spherePlane(t,e,n,i,s,o,a,l,c,h,d){const u=this.createContactEquation(a,l,t,e,c,h);if(u.ni.set(0,0,1),o.vmult(u.ni,u.ni),u.ni.negate(u.ni),u.ni.normalize(),u.ni.scale(t.radius,u.ri),n.vsub(i,ys),u.ni.scale(u.ni.dot(ys),za),ys.vsub(za,u.rj),-ys.dot(u.ni)<=t.radius){if(d)return!0;const m=u.ri,g=u.rj;m.vadd(n,m),m.vsub(a.position,m),g.vadd(i,g),g.vsub(l.position,g),this.result.push(u),this.createFrictionEquationsFromContact(u,this.frictionResult)}}boxBox(t,e,n,i,s,o,a,l,c,h,d){return t.convexPolyhedronRepresentation.material=t.material,e.convexPolyhedronRepresentation.material=e.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e.convexPolyhedronRepresentation,n,i,s,o,a,l,t,e,d)}sphereBox(t,e,n,i,s,o,a,l,c,h,d){const u=this.v3pool,m=zg;n.vsub(i,Ms),e.getSideNormals(m,o);const g=t.radius;let _=!1;const p=Gg,f=Vg,v=kg;let x=null,M=0,C=0,w=0,A=null;for(let I=0,$=m.length;I!==$&&_===!1;I++){const z=Fg;z.copy(m[I]);const W=z.length();z.normalize();const K=Ms.dot(z);if(K<W+g&&K>0){const Z=Og,X=Bg;Z.copy(m[(I+1)%3]),X.copy(m[(I+2)%3]);const j=Z.length(),J=X.length();Z.normalize(),X.normalize();const at=Ms.dot(Z),pt=Ms.dot(X);if(at<j&&at>-j&&pt<J&&pt>-J){const mt=Math.abs(K-W-g);if((A===null||mt<A)&&(A=mt,C=at,w=pt,x=W,p.copy(z),f.copy(Z),v.copy(X),M++,d))return!0}}}if(M){_=!0;const I=this.createContactEquation(a,l,t,e,c,h);p.scale(-g,I.ri),I.ni.copy(p),I.ni.negate(I.ni),p.scale(x,p),f.scale(C,f),p.vadd(f,p),v.scale(w,v),p.vadd(v,I.rj),I.ri.vadd(n,I.ri),I.ri.vsub(a.position,I.ri),I.rj.vadd(i,I.rj),I.rj.vsub(l.position,I.rj),this.result.push(I),this.createFrictionEquationsFromContact(I,this.frictionResult)}let B=u.get();const S=Hg;for(let I=0;I!==2&&!_;I++)for(let $=0;$!==2&&!_;$++)for(let z=0;z!==2&&!_;z++)if(B.set(0,0,0),I?B.vadd(m[0],B):B.vsub(m[0],B),$?B.vadd(m[1],B):B.vsub(m[1],B),z?B.vadd(m[2],B):B.vsub(m[2],B),i.vadd(B,S),S.vsub(n,S),S.lengthSquared()<g*g){if(d)return!0;_=!0;const W=this.createContactEquation(a,l,t,e,c,h);W.ri.copy(S),W.ri.normalize(),W.ni.copy(W.ri),W.ri.scale(g,W.ri),W.rj.copy(B),W.ri.vadd(n,W.ri),W.ri.vsub(a.position,W.ri),W.rj.vadd(i,W.rj),W.rj.vsub(l.position,W.rj),this.result.push(W),this.createFrictionEquationsFromContact(W,this.frictionResult)}u.release(B),B=null;const b=u.get(),U=u.get(),F=u.get(),N=u.get(),L=u.get(),P=m.length;for(let I=0;I!==P&&!_;I++)for(let $=0;$!==P&&!_;$++)if(I%3!==$%3){m[$].cross(m[I],b),b.normalize(),m[I].vadd(m[$],U),F.copy(n),F.vsub(U,F),F.vsub(i,F);const z=F.dot(b);b.scale(z,N);let W=0;for(;W===I%3||W===$%3;)W++;L.copy(n),L.vsub(N,L),L.vsub(U,L),L.vsub(i,L);const K=Math.abs(z),Z=L.length();if(K<m[W].length()&&Z<g){if(d)return!0;_=!0;const X=this.createContactEquation(a,l,t,e,c,h);U.vadd(N,X.rj),X.rj.copy(X.rj),L.negate(X.ni),X.ni.normalize(),X.ri.copy(X.rj),X.ri.vadd(i,X.ri),X.ri.vsub(n,X.ri),X.ri.normalize(),X.ri.scale(g,X.ri),X.ri.vadd(n,X.ri),X.ri.vsub(a.position,X.ri),X.rj.vadd(i,X.rj),X.rj.vsub(l.position,X.rj),this.result.push(X),this.createFrictionEquationsFromContact(X,this.frictionResult)}}u.release(b,U,F,N,L)}planeBox(t,e,n,i,s,o,a,l,c,h,d){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,e.convexPolyhedronRepresentation.id=e.id,this.planeConvex(t,e.convexPolyhedronRepresentation,n,i,s,o,a,l,t,e,d)}convexConvex(t,e,n,i,s,o,a,l,c,h,d,u,m){const g=s_;if(!(n.distanceTo(i)>t.boundingSphereRadius+e.boundingSphereRadius)&&t.findSeparatingAxis(e,n,s,i,o,g,u,m)){const _=[],p=r_;t.clipAgainstHull(n,s,e,i,o,g,-100,100,_);let f=0;for(let v=0;v!==_.length;v++){if(d)return!0;const x=this.createContactEquation(a,l,t,e,c,h),M=x.ri,C=x.rj;g.negate(x.ni),_[v].normal.negate(p),p.scale(_[v].depth,p),_[v].point.vadd(p,M),C.copy(_[v].point),M.vsub(n,M),C.vsub(i,C),M.vadd(n,M),M.vsub(a.position,M),C.vadd(i,C),C.vsub(l.position,C),this.result.push(x),f++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(x,this.frictionResult)}this.enableFrictionReduction&&f&&this.createFrictionFromAverage(f)}}sphereConvex(t,e,n,i,s,o,a,l,c,h,d){const u=this.v3pool;n.vsub(i,Wg);const m=e.faceNormals,g=e.faces,_=e.vertices,p=t.radius;let f=!1;for(let v=0;v!==_.length;v++){const x=_[v],M=$g;o.vmult(x,M),i.vadd(M,M);const C=Yg;if(M.vsub(n,C),C.lengthSquared()<p*p){if(d)return!0;f=!0;const w=this.createContactEquation(a,l,t,e,c,h);w.ri.copy(C),w.ri.normalize(),w.ni.copy(w.ri),w.ri.scale(p,w.ri),M.vsub(i,w.rj),w.ri.vadd(n,w.ri),w.ri.vsub(a.position,w.ri),w.rj.vadd(i,w.rj),w.rj.vsub(l.position,w.rj),this.result.push(w),this.createFrictionEquationsFromContact(w,this.frictionResult);return}}for(let v=0,x=g.length;v!==x&&f===!1;v++){const M=m[v],C=g[v],w=jg;o.vmult(M,w);const A=Kg;o.vmult(_[C[0]],A),A.vadd(i,A);const B=Zg;w.scale(-p,B),n.vadd(B,B);const S=Jg;B.vsub(A,S);const b=S.dot(w),U=Qg;if(n.vsub(A,U),b<0&&U.dot(w)>0){const F=[];for(let N=0,L=C.length;N!==L;N++){const P=u.get();o.vmult(_[C[N]],P),i.vadd(P,P),F.push(P)}if(Ug(F,w,n)){if(d)return!0;f=!0;const N=this.createContactEquation(a,l,t,e,c,h);w.scale(-p,N.ri),w.negate(N.ni);const L=u.get();w.scale(-b,L);const P=u.get();w.scale(-p,P),n.vsub(i,N.rj),N.rj.vadd(P,N.rj),N.rj.vadd(L,N.rj),N.rj.vadd(i,N.rj),N.rj.vsub(l.position,N.rj),N.ri.vadd(n,N.ri),N.ri.vsub(a.position,N.ri),u.release(L),u.release(P),this.result.push(N),this.createFrictionEquationsFromContact(N,this.frictionResult);for(let I=0,$=F.length;I!==$;I++)u.release(F[I]);return}else for(let N=0;N!==C.length;N++){const L=u.get(),P=u.get();o.vmult(_[C[(N+1)%C.length]],L),o.vmult(_[C[(N+2)%C.length]],P),i.vadd(L,L),i.vadd(P,P);const I=qg;P.vsub(L,I);const $=Xg;I.unit($);const z=u.get(),W=u.get();n.vsub(L,W);const K=W.dot($);$.scale(K,z),z.vadd(L,z);const Z=u.get();if(z.vsub(n,Z),K>0&&K*K<I.lengthSquared()&&Z.lengthSquared()<p*p){if(d)return!0;const X=this.createContactEquation(a,l,t,e,c,h);z.vsub(i,X.rj),z.vsub(n,X.ni),X.ni.normalize(),X.ni.scale(p,X.ri),X.rj.vadd(i,X.rj),X.rj.vsub(l.position,X.rj),X.ri.vadd(n,X.ri),X.ri.vsub(a.position,X.ri),this.result.push(X),this.createFrictionEquationsFromContact(X,this.frictionResult);for(let j=0,J=F.length;j!==J;j++)u.release(F[j]);u.release(L),u.release(P),u.release(z),u.release(Z),u.release(W);return}u.release(L),u.release(P),u.release(z),u.release(Z),u.release(W)}for(let N=0,L=F.length;N!==L;N++)u.release(F[N])}}}planeConvex(t,e,n,i,s,o,a,l,c,h,d){const u=t_,m=e_;m.set(0,0,1),s.vmult(m,m);let g=0;const _=n_;for(let p=0;p!==e.vertices.length;p++)if(u.copy(e.vertices[p]),o.vmult(u,u),i.vadd(u,u),u.vsub(n,_),m.dot(_)<=0){if(d)return!0;const v=this.createContactEquation(a,l,t,e,c,h),x=i_;m.scale(m.dot(_),x),u.vsub(x,x),x.vsub(n,v.ri),v.ni.copy(m),u.vsub(i,v.rj),v.ri.vadd(n,v.ri),v.ri.vsub(a.position,v.ri),v.rj.vadd(i,v.rj),v.rj.vsub(l.position,v.rj),this.result.push(v),g++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(v,this.frictionResult)}this.enableFrictionReduction&&g&&this.createFrictionFromAverage(g)}boxConvex(t,e,n,i,s,o,a,l,c,h,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e,n,i,s,o,a,l,t,e,d)}sphereHeightfield(t,e,n,i,s,o,a,l,c,h,d){const u=e.data,m=t.radius,g=e.elementSize,_=__,p=g_;Wt.pointToLocalFrame(i,o,n,p);let f=Math.floor((p.x-m)/g)-1,v=Math.ceil((p.x+m)/g)+1,x=Math.floor((p.y-m)/g)-1,M=Math.ceil((p.y+m)/g)+1;if(v<0||M<0||f>u.length||x>u[0].length)return;f<0&&(f=0),v<0&&(v=0),x<0&&(x=0),M<0&&(M=0),f>=u.length&&(f=u.length-1),v>=u.length&&(v=u.length-1),M>=u[0].length&&(M=u[0].length-1),x>=u[0].length&&(x=u[0].length-1);const C=[];e.getRectMinMax(f,x,v,M,C);const w=C[0],A=C[1];if(p.z-m>A||p.z+m<w)return;const B=this.result;for(let S=f;S<v;S++)for(let b=x;b<M;b++){const U=B.length;let F=!1;if(e.getConvexTrianglePillar(S,b,!1),Wt.pointToWorldFrame(i,o,e.pillarOffset,_),n.distanceTo(_)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(F=this.sphereConvex(t,e.pillarConvex,n,_,s,o,a,l,t,e,d)),d&&F||(e.getConvexTrianglePillar(S,b,!0),Wt.pointToWorldFrame(i,o,e.pillarOffset,_),n.distanceTo(_)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(F=this.sphereConvex(t,e.pillarConvex,n,_,s,o,a,l,t,e,d)),d&&F))return!0;if(B.length-U>2)return}}boxHeightfield(t,e,n,i,s,o,a,l,c,h,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexHeightfield(t.convexPolyhedronRepresentation,e,n,i,s,o,a,l,t,e,d)}convexHeightfield(t,e,n,i,s,o,a,l,c,h,d){const u=e.data,m=e.elementSize,g=t.boundingSphereRadius,_=p_,p=m_,f=f_;Wt.pointToLocalFrame(i,o,n,f);let v=Math.floor((f.x-g)/m)-1,x=Math.ceil((f.x+g)/m)+1,M=Math.floor((f.y-g)/m)-1,C=Math.ceil((f.y+g)/m)+1;if(x<0||C<0||v>u.length||M>u[0].length)return;v<0&&(v=0),x<0&&(x=0),M<0&&(M=0),C<0&&(C=0),v>=u.length&&(v=u.length-1),x>=u.length&&(x=u.length-1),C>=u[0].length&&(C=u[0].length-1),M>=u[0].length&&(M=u[0].length-1);const w=[];e.getRectMinMax(v,M,x,C,w);const A=w[0],B=w[1];if(!(f.z-g>B||f.z+g<A))for(let S=v;S<x;S++)for(let b=M;b<C;b++){let U=!1;if(e.getConvexTrianglePillar(S,b,!1),Wt.pointToWorldFrame(i,o,e.pillarOffset,_),n.distanceTo(_)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(U=this.convexConvex(t,e.pillarConvex,n,_,s,o,a,l,null,null,d,p,null)),d&&U||(e.getConvexTrianglePillar(S,b,!0),Wt.pointToWorldFrame(i,o,e.pillarOffset,_),n.distanceTo(_)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(U=this.convexConvex(t,e.pillarConvex,n,_,s,o,a,l,null,null,d,p,null)),d&&U))return!0}}sphereParticle(t,e,n,i,s,o,a,l,c,h,d){const u=c_;if(u.set(0,0,1),i.vsub(n,u),u.lengthSquared()<=t.radius*t.radius){if(d)return!0;const g=this.createContactEquation(l,a,e,t,c,h);u.normalize(),g.rj.copy(u),g.rj.scale(t.radius,g.rj),g.ni.copy(u),g.ni.negate(g.ni),g.ri.set(0,0,0),this.result.push(g),this.createFrictionEquationsFromContact(g,this.frictionResult)}}planeParticle(t,e,n,i,s,o,a,l,c,h,d){const u=o_;u.set(0,0,1),a.quaternion.vmult(u,u);const m=a_;if(i.vsub(a.position,m),u.dot(m)<=0){if(d)return!0;const _=this.createContactEquation(l,a,e,t,c,h);_.ni.copy(u),_.ni.negate(_.ni),_.ri.set(0,0,0);const p=l_;u.scale(u.dot(i),p),i.vsub(p,p),_.rj.copy(p),this.result.push(_),this.createFrictionEquationsFromContact(_,this.frictionResult)}}boxParticle(t,e,n,i,s,o,a,l,c,h,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexParticle(t.convexPolyhedronRepresentation,e,n,i,s,o,a,l,t,e,d)}convexParticle(t,e,n,i,s,o,a,l,c,h,d){let u=-1;const m=u_,g=d_;let _=null;const p=h_;if(p.copy(i),p.vsub(n,p),s.conjugate(Ha),Ha.vmult(p,p),t.pointIsInside(p)){t.worldVerticesNeedsUpdate&&t.computeWorldVertices(n,s),t.worldFaceNormalsNeedsUpdate&&t.computeWorldFaceNormals(s);for(let f=0,v=t.faces.length;f!==v;f++){const x=[t.worldVertices[t.faces[f][0]]],M=t.worldFaceNormals[f];i.vsub(x[0],Ga);const C=-M.dot(Ga);if(_===null||Math.abs(C)<Math.abs(_)){if(d)return!0;_=C,u=f,m.copy(M)}}if(u!==-1){const f=this.createContactEquation(l,a,e,t,c,h);m.scale(_,g),g.vadd(i,g),g.vsub(n,g),f.rj.copy(g),m.negate(f.ni),f.ri.set(0,0,0);const v=f.ri,x=f.rj;v.vadd(i,v),v.vsub(l.position,v),x.vadd(n,x),x.vsub(a.position,x),this.result.push(f),this.createFrictionEquationsFromContact(f,this.frictionResult)}else console.warn("Point found inside convex, but did not find penetrating face!")}}heightfieldCylinder(t,e,n,i,s,o,a,l,c,h,d){return this.convexHeightfield(e,t,i,n,o,s,l,a,c,h,d)}particleCylinder(t,e,n,i,s,o,a,l,c,h,d){return this.convexParticle(e,t,i,n,o,s,l,a,c,h,d)}sphereTrimesh(t,e,n,i,s,o,a,l,c,h,d){const u=Mg,m=Sg,g=Eg,_=bg,p=Tg,f=wg,v=Lg,x=yg,M=vg,C=Pg;Wt.pointToLocalFrame(i,o,n,p);const w=t.radius;v.lowerBound.set(p.x-w,p.y-w,p.z-w),v.upperBound.set(p.x+w,p.y+w,p.z+w),e.getTrianglesInAABB(v,C);const A=xg,B=t.radius*t.radius;for(let N=0;N<C.length;N++)for(let L=0;L<3;L++)if(e.getVertex(e.indices[C[N]*3+L],A),A.vsub(p,M),M.lengthSquared()<=B){if(x.copy(A),Wt.pointToWorldFrame(i,o,x,A),A.vsub(n,M),d)return!0;let P=this.createContactEquation(a,l,t,e,c,h);P.ni.copy(M),P.ni.normalize(),P.ri.copy(P.ni),P.ri.scale(t.radius,P.ri),P.ri.vadd(n,P.ri),P.ri.vsub(a.position,P.ri),P.rj.copy(A),P.rj.vsub(l.position,P.rj),this.result.push(P),this.createFrictionEquationsFromContact(P,this.frictionResult)}for(let N=0;N<C.length;N++)for(let L=0;L<3;L++){e.getVertex(e.indices[C[N]*3+L],u),e.getVertex(e.indices[C[N]*3+(L+1)%3],m),m.vsub(u,g),p.vsub(m,f);const P=f.dot(g);p.vsub(u,f);let I=f.dot(g);if(I>0&&P<0&&(p.vsub(u,f),_.copy(g),_.normalize(),I=f.dot(_),_.scale(I,f),f.vadd(u,f),f.distanceTo(p)<t.radius)){if(d)return!0;const z=this.createContactEquation(a,l,t,e,c,h);f.vsub(p,z.ni),z.ni.normalize(),z.ni.scale(t.radius,z.ri),z.ri.vadd(n,z.ri),z.ri.vsub(a.position,z.ri),Wt.pointToWorldFrame(i,o,f,f),f.vsub(l.position,z.rj),Wt.vectorToWorldFrame(o,z.ni,z.ni),Wt.vectorToWorldFrame(o,z.ri,z.ri),this.result.push(z),this.createFrictionEquationsFromContact(z,this.frictionResult)}}const S=Ag,b=Rg,U=Cg,F=_g;for(let N=0,L=C.length;N!==L;N++){e.getTriangleVertices(C[N],S,b,U),e.getNormal(C[N],F),p.vsub(S,f);let P=f.dot(F);if(F.scale(P,f),p.vsub(f,f),P=f.distanceTo(p),oe.pointInTriangle(f,S,b,U)&&P<t.radius){if(d)return!0;let I=this.createContactEquation(a,l,t,e,c,h);f.vsub(p,I.ni),I.ni.normalize(),I.ni.scale(t.radius,I.ri),I.ri.vadd(n,I.ri),I.ri.vsub(a.position,I.ri),Wt.pointToWorldFrame(i,o,f,f),f.vsub(l.position,I.rj),Wt.vectorToWorldFrame(o,I.ni,I.ni),Wt.vectorToWorldFrame(o,I.ri,I.ri),this.result.push(I),this.createFrictionEquationsFromContact(I,this.frictionResult)}}C.length=0}planeTrimesh(t,e,n,i,s,o,a,l,c,h,d){const u=new y,m=pg;m.set(0,0,1),s.vmult(m,m);for(let g=0;g<e.vertices.length/3;g++){e.getVertex(g,u);const _=new y;_.copy(u),Wt.pointToWorldFrame(i,o,_,u);const p=mg;if(u.vsub(n,p),m.dot(p)<=0){if(d)return!0;const v=this.createContactEquation(a,l,t,e,c,h);v.ni.copy(m);const x=gg;m.scale(p.dot(m),x),u.vsub(x,x),v.ri.copy(x),v.ri.vsub(a.position,v.ri),v.rj.copy(u),v.rj.vsub(l.position,v.rj),this.result.push(v),this.createFrictionEquationsFromContact(v,this.frictionResult)}}}}const Bn=new y,di=new y,fi=new y,hg=new y,ug=new y,dg=new ae,fg=new ae,pg=new y,mg=new y,gg=new y,_g=new y,vg=new y;new y;const xg=new y,yg=new y,Mg=new y,Sg=new y,Eg=new y,bg=new y,Tg=new y,wg=new y,Ag=new y,Rg=new y,Cg=new y,Lg=new Ue,Pg=[],ys=new y,za=new y,Ig=new y,Dg=new y,Ng=new y;function Ug(r,t,e){let n=null;const i=r.length;for(let s=0;s!==i;s++){const o=r[s],a=Ig;r[(s+1)%i].vsub(o,a);const l=Dg;a.cross(t,l);const c=Ng;e.vsub(o,c);const h=l.dot(c);if(n===null||h>0&&n===!0||h<=0&&n===!1){n===null&&(n=h>0);continue}else return!1}return!0}const Ms=new y,Fg=new y,Og=new y,Bg=new y,zg=[new y,new y,new y,new y,new y,new y],Hg=new y,Gg=new y,Vg=new y,kg=new y,Wg=new y,qg=new y,Xg=new y,Yg=new y,$g=new y,jg=new y,Kg=new y,Zg=new y,Jg=new y,Qg=new y;new y;new y;const t_=new y,e_=new y,n_=new y,i_=new y,s_=new y,r_=new y,o_=new y,a_=new y,l_=new y,c_=new y,Ha=new ae,h_=new y;new y;const u_=new y,Ga=new y,d_=new y,f_=new y,p_=new y,m_=[0],g_=new y,__=new y;class Va{constructor(){this.current=[],this.previous=[]}getKey(t,e){if(e<t){const n=e;e=t,t=n}return t<<16|e}set(t,e){const n=this.getKey(t,e),i=this.current;let s=0;for(;n>i[s];)s++;if(n!==i[s]){for(let o=i.length-1;o>=s;o--)i[o+1]=i[o];i[s]=n}}tick(){const t=this.current;this.current=this.previous,this.previous=t,this.current.length=0}getDiff(t,e){const n=this.current,i=this.previous,s=n.length,o=i.length;let a=0;for(let l=0;l<s;l++){let c=!1;const h=n[l];for(;h>i[a];)a++;c=h===i[a],c||ka(t,h)}a=0;for(let l=0;l<o;l++){let c=!1;const h=i[l];for(;h>n[a];)a++;c=n[a]===h,c||ka(e,h)}}}function ka(r,t){r.push((t&4294901760)>>16,t&65535)}const wr=(r,t)=>r<t?`${r}-${t}`:`${t}-${r}`;class v_{constructor(){this.data={keys:[]}}get(t,e){const n=wr(t,e);return this.data[n]}set(t,e,n){const i=wr(t,e);this.get(t,e)||this.data.keys.push(i),this.data[i]=n}delete(t,e){const n=wr(t,e),i=this.data.keys.indexOf(n);i!==-1&&this.data.keys.splice(i,1),delete this.data[n]}reset(){const t=this.data,e=t.keys;for(;e.length>0;){const n=e.pop();delete t[n]}}}class x_ extends bl{constructor(t){t===void 0&&(t={}),super(),this.dt=-1,this.allowSleep=!!t.allowSleep,this.contacts=[],this.frictionEquations=[],this.quatNormalizeSkip=t.quatNormalizeSkip!==void 0?t.quatNormalizeSkip:0,this.quatNormalizeFast=t.quatNormalizeFast!==void 0?t.quatNormalizeFast:!1,this.time=0,this.stepnumber=0,this.default_dt=1/60,this.nextId=0,this.gravity=new y,t.gravity&&this.gravity.copy(t.gravity),t.frictionGravity&&(this.frictionGravity=new y,this.frictionGravity.copy(t.frictionGravity)),this.broadphase=t.broadphase!==void 0?t.broadphase:new Tm,this.bodies=[],this.hasActiveBodies=!1,this.solver=t.solver!==void 0?t.solver:new ig,this.constraints=[],this.narrowphase=new cg(this),this.collisionMatrix=new Aa,this.collisionMatrixPrevious=new Aa,this.bodyOverlapKeeper=new Va,this.shapeOverlapKeeper=new Va,this.contactmaterials=[],this.contactMaterialTable=new v_,this.defaultMaterial=new Ei("default"),this.defaultContactMaterial=new Bs(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),this.doProfiling=!1,this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},this.accumulator=0,this.subsystems=[],this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null},this.idToBodyMap={},this.broadphase.setWorld(this)}getContactMaterial(t,e){return this.contactMaterialTable.get(t.id,e.id)}collisionMatrixTick(){const t=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=t,this.collisionMatrix.reset(),this.bodyOverlapKeeper.tick(),this.shapeOverlapKeeper.tick()}addConstraint(t){this.constraints.push(t)}removeConstraint(t){const e=this.constraints.indexOf(t);e!==-1&&this.constraints.splice(e,1)}rayTest(t,e,n){n instanceof Ps?this.raycastClosest(t,e,{skipBackfaces:!0},n):this.raycastAll(t,e,{skipBackfaces:!0},n)}raycastAll(t,e,n,i){return n===void 0&&(n={}),n.mode=oe.ALL,n.from=t,n.to=e,n.callback=i,Ar.intersectWorld(this,n)}raycastAny(t,e,n,i){return n===void 0&&(n={}),n.mode=oe.ANY,n.from=t,n.to=e,n.result=i,Ar.intersectWorld(this,n)}raycastClosest(t,e,n,i){return n===void 0&&(n={}),n.mode=oe.CLOSEST,n.from=t,n.to=e,n.result=i,Ar.intersectWorld(this,n)}addBody(t){this.bodies.includes(t)||(t.index=this.bodies.length,this.bodies.push(t),t.world=this,t.initPosition.copy(t.position),t.initVelocity.copy(t.velocity),t.timeLastSleepy=this.time,t instanceof ct&&(t.initAngularVelocity.copy(t.angularVelocity),t.initQuaternion.copy(t.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=t,this.idToBodyMap[t.id]=t,this.dispatchEvent(this.addBodyEvent))}removeBody(t){t.world=null;const e=this.bodies.length-1,n=this.bodies,i=n.indexOf(t);if(i!==-1){n.splice(i,1);for(let s=0;s!==n.length;s++)n[s].index=s;this.collisionMatrix.setNumObjects(e),this.removeBodyEvent.body=t,delete this.idToBodyMap[t.id],this.dispatchEvent(this.removeBodyEvent)}}getBodyById(t){return this.idToBodyMap[t]}getShapeById(t){const e=this.bodies;for(let n=0;n<e.length;n++){const i=e[n].shapes;for(let s=0;s<i.length;s++){const o=i[s];if(o.id===t)return o}}return null}addContactMaterial(t){this.contactmaterials.push(t),this.contactMaterialTable.set(t.materials[0].id,t.materials[1].id,t)}removeContactMaterial(t){const e=this.contactmaterials.indexOf(t);e!==-1&&(this.contactmaterials.splice(e,1),this.contactMaterialTable.delete(t.materials[0].id,t.materials[1].id))}fixedStep(t,e){t===void 0&&(t=1/60),e===void 0&&(e=10);const n=le.now()/1e3;if(!this.lastCallTime)this.step(t,void 0,e);else{const i=n-this.lastCallTime;this.step(t,i,e)}this.lastCallTime=n}step(t,e,n){if(n===void 0&&(n=10),e===void 0)this.internalStep(t),this.time+=t;else{this.accumulator+=e;const i=le.now();let s=0;for(;this.accumulator>=t&&s<n&&(this.internalStep(t),this.accumulator-=t,s++,!(le.now()-i>t*1e3)););this.accumulator=this.accumulator%t;const o=this.accumulator/t;for(let a=0;a!==this.bodies.length;a++){const l=this.bodies[a];l.previousPosition.lerp(l.position,o,l.interpolatedPosition),l.previousQuaternion.slerp(l.quaternion,o,l.interpolatedQuaternion),l.previousQuaternion.normalize()}this.time+=e}}internalStep(t){this.dt=t;const e=this.contacts,n=b_,i=T_,s=this.bodies.length,o=this.bodies,a=this.solver,l=this.gravity,c=this.doProfiling,h=this.profile,d=ct.DYNAMIC;let u=-1/0;const m=this.constraints,g=E_;l.length();const _=l.x,p=l.y,f=l.z;let v=0;for(c&&(u=le.now()),v=0;v!==s;v++){const N=o[v];if(N.type===d){const L=N.force,P=N.mass;L.x+=P*_,L.y+=P*p,L.z+=P*f}}for(let N=0,L=this.subsystems.length;N!==L;N++)this.subsystems[N].update();c&&(u=le.now()),n.length=0,i.length=0,this.broadphase.collisionPairs(this,n,i),c&&(h.broadphase=le.now()-u);let x=m.length;for(v=0;v!==x;v++){const N=m[v];if(!N.collideConnected)for(let L=n.length-1;L>=0;L-=1)(N.bodyA===n[L]&&N.bodyB===i[L]||N.bodyB===n[L]&&N.bodyA===i[L])&&(n.splice(L,1),i.splice(L,1))}this.collisionMatrixTick(),c&&(u=le.now());const M=S_,C=e.length;for(v=0;v!==C;v++)M.push(e[v]);e.length=0;const w=this.frictionEquations.length;for(v=0;v!==w;v++)g.push(this.frictionEquations[v]);for(this.frictionEquations.length=0,this.narrowphase.getContacts(n,i,this,e,M,this.frictionEquations,g),c&&(h.narrowphase=le.now()-u),c&&(u=le.now()),v=0;v<this.frictionEquations.length;v++)a.addEquation(this.frictionEquations[v]);const A=e.length;for(let N=0;N!==A;N++){const L=e[N],P=L.bi,I=L.bj,$=L.si,z=L.sj;let W;if(P.material&&I.material?W=this.getContactMaterial(P.material,I.material)||this.defaultContactMaterial:W=this.defaultContactMaterial,W.friction,P.material&&I.material&&(P.material.friction>=0&&I.material.friction>=0&&P.material.friction*I.material.friction,P.material.restitution>=0&&I.material.restitution>=0&&(L.restitution=P.material.restitution*I.material.restitution)),a.addEquation(L),P.allowSleep&&P.type===ct.DYNAMIC&&P.sleepState===ct.SLEEPING&&I.sleepState===ct.AWAKE&&I.type!==ct.STATIC){const K=I.velocity.lengthSquared()+I.angularVelocity.lengthSquared(),Z=I.sleepSpeedLimit**2;K>=Z*2&&(P.wakeUpAfterNarrowphase=!0)}if(I.allowSleep&&I.type===ct.DYNAMIC&&I.sleepState===ct.SLEEPING&&P.sleepState===ct.AWAKE&&P.type!==ct.STATIC){const K=P.velocity.lengthSquared()+P.angularVelocity.lengthSquared(),Z=P.sleepSpeedLimit**2;K>=Z*2&&(I.wakeUpAfterNarrowphase=!0)}this.collisionMatrix.set(P,I,!0),this.collisionMatrixPrevious.get(P,I)||(Di.body=I,Di.contact=L,P.dispatchEvent(Di),Di.body=P,I.dispatchEvent(Di)),this.bodyOverlapKeeper.set(P.id,I.id),this.shapeOverlapKeeper.set($.id,z.id)}for(this.emitContactEvents(),c&&(h.makeContactConstraints=le.now()-u,u=le.now()),v=0;v!==s;v++){const N=o[v];N.wakeUpAfterNarrowphase&&(N.wakeUp(),N.wakeUpAfterNarrowphase=!1)}for(x=m.length,v=0;v!==x;v++){const N=m[v];N.update();for(let L=0,P=N.equations.length;L!==P;L++){const I=N.equations[L];a.addEquation(I)}}a.solve(t,this),c&&(h.solve=le.now()-u),a.removeAllEquations();const B=Math.pow;for(v=0;v!==s;v++){const N=o[v];if(N.type&d){const L=B(1-N.linearDamping,t),P=N.velocity;P.scale(L,P);const I=N.angularVelocity;if(I){const $=B(1-N.angularDamping,t);I.scale($,I)}}}this.dispatchEvent(M_),c&&(u=le.now());const b=this.stepnumber%(this.quatNormalizeSkip+1)===0,U=this.quatNormalizeFast;for(v=0;v!==s;v++)o[v].integrate(t,b,U);this.clearForces(),this.broadphase.dirty=!0,c&&(h.integrate=le.now()-u),this.stepnumber+=1,this.dispatchEvent(y_);let F=!0;if(this.allowSleep)for(F=!1,v=0;v!==s;v++){const N=o[v];N.sleepTick(this.time),N.sleepState!==ct.SLEEPING&&(F=!0)}this.hasActiveBodies=F}emitContactEvents(){const t=this.hasAnyEventListener("beginContact"),e=this.hasAnyEventListener("endContact");if((t||e)&&this.bodyOverlapKeeper.getDiff(hn,un),t){for(let s=0,o=hn.length;s<o;s+=2)Ni.bodyA=this.getBodyById(hn[s]),Ni.bodyB=this.getBodyById(hn[s+1]),this.dispatchEvent(Ni);Ni.bodyA=Ni.bodyB=null}if(e){for(let s=0,o=un.length;s<o;s+=2)Ui.bodyA=this.getBodyById(un[s]),Ui.bodyB=this.getBodyById(un[s+1]),this.dispatchEvent(Ui);Ui.bodyA=Ui.bodyB=null}hn.length=un.length=0;const n=this.hasAnyEventListener("beginShapeContact"),i=this.hasAnyEventListener("endShapeContact");if((n||i)&&this.shapeOverlapKeeper.getDiff(hn,un),n){for(let s=0,o=hn.length;s<o;s+=2){const a=this.getShapeById(hn[s]),l=this.getShapeById(hn[s+1]);dn.shapeA=a,dn.shapeB=l,a&&(dn.bodyA=a.body),l&&(dn.bodyB=l.body),this.dispatchEvent(dn)}dn.bodyA=dn.bodyB=dn.shapeA=dn.shapeB=null}if(i){for(let s=0,o=un.length;s<o;s+=2){const a=this.getShapeById(un[s]),l=this.getShapeById(un[s+1]);fn.shapeA=a,fn.shapeB=l,a&&(fn.bodyA=a.body),l&&(fn.bodyB=l.body),this.dispatchEvent(fn)}fn.bodyA=fn.bodyB=fn.shapeA=fn.shapeB=null}}clearForces(){const t=this.bodies,e=t.length;for(let n=0;n!==e;n++){const i=t[n];i.force,i.torque,i.force.set(0,0,0),i.torque.set(0,0,0)}}}new Ue;const Ar=new oe,le=globalThis.performance||{};if(!le.now){let r=Date.now();le.timing&&le.timing.navigationStart&&(r=le.timing.navigationStart),le.now=()=>Date.now()-r}new y;const y_={type:"postStep"},M_={type:"preStep"},Di={type:ct.COLLIDE_EVENT_NAME,body:null,contact:null},S_=[],E_=[],b_=[],T_=[],hn=[],un=[],Ni={type:"beginContact",bodyA:null,bodyB:null},Ui={type:"endContact",bodyA:null,bodyB:null},dn={type:"beginShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},fn={type:"endShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null};class w_{constructor(t){this.container=document.getElementById(t),this.coins=[],this.isCasting=!1,this.onResult=null,this.initThree(),this.initPhysics(),this.createEnvironment(),this.createCoins(),this.animate()}initThree(){this.scene=new $p;const t=this.container.clientWidth/this.container.clientHeight;this.camera=new De(45,t,.1,1e3),this.camera.position.set(0,15,12),this.camera.lookAt(0,0,0),this.renderer=new Sl({antialias:!0,alpha:!0}),this.renderer.setSize(this.container.clientWidth,this.container.clientHeight),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.shadowMap.enabled=!0,this.container.appendChild(this.renderer.domElement);const e=new Jp(16777215,.4);this.scene.add(e);const n=new Zp(16777215,1);n.position.set(5,20,10),n.castShadow=!0,n.shadow.mapSize.width=1024,n.shadow.mapSize.height=1024,this.scene.add(n),window.addEventListener("resize",()=>this.onResize())}initPhysics(){this.world=new x_,this.world.gravity.set(0,-25,0),this.world.allowSleep=!0}createEnvironment(){const t=new Ba,e=new ct({mass:0});e.addShape(t),e.quaternion.setFromEuler(-Math.PI/2,0,0),this.world.addBody(e);const n=new Ba,i=new Ei,s=new ct({mass:0,material:i});s.addShape(n),s.position.set(0,0,-8),this.world.addBody(s);const o=new ct({mass:0,material:i});o.addShape(n),o.quaternion.setFromEuler(0,Math.PI,0),o.position.set(0,0,8),this.world.addBody(o);const a=new ct({mass:0,material:i});a.addShape(n),a.quaternion.setFromEuler(0,Math.PI/2,0),a.position.set(-10,0,0),this.world.addBody(a);const l=new ct({mass:0,material:i});l.addShape(n),l.quaternion.setFromEuler(0,-Math.PI/2,0),l.position.set(10,0,0),this.world.addBody(l);const c=new Fs(20,20),h=new gs({color:1710886,roughness:.8,metalness:.2}),d=new Qe(c,h);d.rotation.x=-Math.PI/2,d.receiveShadow=!0,this.scene.add(d)}createCoins(){const t=new Wr(.85,.85,.25,64),e=new gs({color:9202203,metalness:.9,roughness:.1}),n=new gs({color:16766720,metalness:1,roughness:.05,emissive:13938487,emissiveIntensity:.2}),i=new gs({color:14540253,metalness:.8,roughness:.2,emissive:10066329,emissiveIntensity:.1}),s=[e,n,i];for(let o=0;o<3;o++){const a=new Qe(t,s);a.castShadow=!0,this.scene.add(a);const l=new eg(.85,.85,.25,32),c=new ct({mass:1.2,shape:l,material:new Ei({friction:.1,restitution:.6})});c.position.set((o-1)*2,4,0),this.world.addBody(c),this.coins.push({mesh:a,body:c})}}cast(){this.isCasting||(this.isCasting=!0,this.coins.forEach((t,e)=>{t.body.wakeUp(),t.body.position.set((e-1)*2,8+Math.random()*2,0);const n=(Math.random()-.5)*4,i=(Math.random()-.5)*4;t.body.applyImpulse(new y(n,8,i),new y(Math.random(),Math.random(),Math.random())),t.body.angularVelocity.set(Math.random()*20,Math.random()*20,Math.random()*20)}),this.checkResults())}checkResults(){let t=0;const e=setTimeout(()=>{this.isCasting&&(console.log("UX: Forcing result after 3s timeout"),clearInterval(n),this.finishCasting())},3e3),n=setInterval(()=>{let i=!0;this.coins.forEach(s=>{(s.body.velocity.length()>.2||s.body.angularVelocity.length()>.2)&&(i=!1)}),i?(t++,t>5&&(clearInterval(n),clearTimeout(e),this.finishCasting())):t=0},100)}finishCasting(){if(!this.isCasting)return;const e=this.coins.map(n=>{n.mesh.position.copy(n.body.position),n.mesh.quaternion.copy(n.body.quaternion);const i=new H(0,1,0);return i.applyQuaternion(n.mesh.quaternion),i.y>0?3:2}).reduce((n,i)=>n+i,0);this.isCasting=!1,this.onResult&&this.onResult(e)}animate(){requestAnimationFrame(()=>this.animate()),this.world.fixedStep(),this.coins.forEach(t=>{t.mesh.position.copy(t.body.position),t.mesh.quaternion.copy(t.body.quaternion)}),this.renderer.render(this.scene,this.camera)}onResize(){const t=this.container.clientWidth,e=this.container.clientHeight;this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,e)}}class A_{static async*streamChat(t,e,n={}){var l,c,h;const s="http://localhost:8000/chat";if(!e){yield"導師目前不知您問的是哪一卦，請先選擇卦象。";return}const o=!!n.question,a=`你現在是一位精通「六爻」與「術數」的易經導師。
當前卦象：${e.name}卦 (#${e.id})
宮位：${(l=e.najia_analysis)==null?void 0:l.palace}宮 [${(c=e.najia_analysis)==null?void 0:c.palace_wuxing}]
納甲數據：${JSON.stringify((h=e.najia_analysis)==null?void 0:h.lines)}

[教學方針]
1. 將學生視為「易學初學者」，語氣要平易近人、循循善誘。
2. 避免過於晦澀的專業術語，若必須使用（如「勾陳」、「螣蛇」），請附帶簡單的白話解釋。
3. 語氣保持導師的威嚴與慈愛感。

${o?`
[占卜占斷模式]
學生提問：${n.question}
占卜時間：${n.date} (真太陽時)
動爻狀態：${n.changingLines&&n.changingLines.length>0?`第 ${n.changingLines.join(", ")} 爻發動`:"靜卦無動爻"}
之卦（變卦）：${n.futureHexName?n.futureHexName+"卦":"無變卦"}

請以「占卜大師」的身份，針對具體問題、動爻演變與日辰生剋進行剖析，給予學生明確且白話的趨吉避凶建議。`:`
[學術研究模式]
當前處於純卦象研究模式，無具體占卜問題。

請以「儒家學者」與「術數教授」的身份，深入淺出地為初學者解說此卦的哲學意涵、卦序邏輯以及基礎術語，啟發智慧。`}

請注意：
1. 結合日辰與卦中五行的生剋進行專業但易懂的演繹。
2. 請務必使用「繁體中文」來回覆。
3. 回覆必須精簡，總字數請嚴格限制在 500 字以內，直取核心。`;console.log(`AIService: Calling backend at ${s}...`);try{const d=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:t,system_instruction:a})});if(!d.ok){const g=await d.json().catch(()=>({}));yield`導師連線中斷 (Backend Error ${d.status}: ${g.error||"Unknown Error"})`;return}const u=d.body.getReader(),m=new TextDecoder;for(;;){const{done:g,value:_}=await u.read();if(g)break;yield m.decode(_)}}catch(d){console.error("AIService Backend Error:",d),yield`無法連接到 AI 導師伺服器。如果是本地運行，請確保 'python3 server.py' 已啟動。 (${d.message})`}}}class Is{static getGanZhi(t){const e=t.getFullYear(),n=t.getMonth()+1;t.getDate();const i=e-1984,s=this.STEMS[(i%10+10)%10],o=this.BRANCHES[(i%12+12)%12],a=this.BRANCHES[(n+1)%12],l=new Date(1900,0,1);Math.floor((t.getTime()-l.getTime())/(24*60*60*1e3));const c=new Date(1900,0,31),h=Math.floor((t.getTime()-c.getTime())/(24*60*60*1e3)),d=this.STEMS[(h%10+10)%10],u=this.BRANCHES[(h%12+12)%12];return{year:`${s}${o}`,month:`${a}`,day:`${d}${u}`,dayStem:d,dayBranch:u,monthBranch:a}}static getWuxingStrength(t){const n={寅:"木",卯:"木",辰:"土",巳:"火",午:"火",未:"土",申:"金",酉:"金",戌:"土",亥:"水",子:"水",丑:"土"}[t];return{木:{木:"旺",火:"相",水:"休",土:"囚",金:"死"},火:{火:"旺",土:"相",木:"休",金:"囚",水:"死"},土:{土:"旺",金:"相",火:"休",水:"囚",木:"死"},金:{金:"旺",水:"相",土:"休",木:"囚",火:"死"},水:{水:"旺",木:"相",金:"休",火:"囚",土:"死"}}[n]}}jn(Is,"STEMS",["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]),jn(Is,"BRANCHES",["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]);const Ss={1:{bopomofo:"ㄑㄧㄢˊ",pinyin:"Qián"},2:{bopomofo:"ㄎㄨㄣ",pinyin:"Kūn"},3:{bopomofo:"ㄓㄨㄣ",pinyin:"Zhūn"},4:{bopomofo:"ㄇㄥˊ",pinyin:"Méng"},5:{bopomofo:"ㄒㄩ",pinyin:"Xū"},6:{bopomofo:"ㄙㄨㄥˋ",pinyin:"Sòng"},7:{bopomofo:"ㄕ",pinyin:"Shī"},8:{bopomofo:"ㄅㄧˇ",pinyin:"Bǐ"},9:{bopomofo:"ㄒㄧㄠˇ ㄒㄩˋ",pinyin:"Xiǎo Xù"},10:{bopomofo:"ㄌㄩˇ",pinyin:"Lǚ"},11:{bopomofo:"ㄊㄞˋ",pinyin:"Tài"},12:{bopomofo:"ㄆㄧˇ",pinyin:"Pǐ"},13:{bopomofo:"ㄊㄨㄥˊ ㄖㄣˊ",pinyin:"Tóng Rén"},14:{bopomofo:"ㄉㄚˋ ㄧㄡˇ",pinyin:"Dà Yǒu"},15:{bopomofo:"ㄑㄧㄢ",pinyin:"Qiān"},16:{bopomofo:"ㄩˋ",pinyin:"Yù"},17:{bopomofo:"ㄙㄨㄟˊ",pinyin:"Suí"},18:{bopomofo:"ㄍㄨˇ",pinyin:"Gǔ"},19:{bopomofo:"ㄌㄧㄣˊ",pinyin:"Lín"},20:{bopomofo:"ㄍㄨㄢ",pinyin:"Guān"},21:{bopomofo:"ㄕˋ ㄏㄜˊ",pinyin:"Shì Hé"},22:{bopomofo:"ㄅㄧˋ",pinyin:"Bì"},23:{bopomofo:"ㄅㄛ",pinyin:"Bō"},24:{bopomofo:"ㄈㄨˋ",pinyin:"Fù"},25:{bopomofo:"ㄨˊ ㄨㄤˋ",pinyin:"Wú Wàng"},26:{bopomofo:"ㄉㄚˋ ㄒㄩˋ",pinyin:"Dà Xù"},27:{bopomofo:"ㄧˊ",pinyin:"Yí"},28:{bopomofo:"ㄉㄚˋ ㄍㄨㄛˋ",pinyin:"Dà Guò"},29:{bopomofo:"ㄎㄢˇ",pinyin:"Kǎn"},30:{bopomofo:"ㄌㄧˊ",pinyin:"Lí"},31:{bopomofo:"ㄒㄧㄢˊ",pinyin:"Xián"},32:{bopomofo:"ㄏㄥˊ",pinyin:"Héng"},33:{bopomofo:"ㄉㄨㄣˋ",pinyin:"Dùn"},34:{bopomofo:"ㄉㄚˋ ㄓㄨㄤˋ",pinyin:"Dà Zhuàng"},35:{bopomofo:"ㄐㄧㄣˋ",pinyin:"Jìn"},36:{bopomofo:"ㄇㄧㄥˊ ㄧˊ",pinyin:"Míng Yí"},37:{bopomofo:"ㄐㄧㄚ ㄖㄣˊ",pinyin:"Jiā Rén"},38:{bopomofo:"ㄎㄨㄟˊ",pinyin:"Kuí"},39:{bopomofo:"ㄐㄧㄢˇ",pinyin:"Jiǎn"},40:{bopomofo:"ㄒㄧㄝˋ",pinyin:"Xiè"},41:{bopomofo:"ㄙㄨㄣˇ",pinyin:"Sǔn"},42:{bopomofo:"ㄧˋ",pinyin:"Yì"},43:{bopomofo:"ㄍㄨㄞˋ",pinyin:"Guài"},44:{bopomofo:"ㄍㄡˋ",pinyin:"Gòu"},45:{bopomofo:"ㄘㄨㄟˋ",pinyin:"Cuì"},46:{bopomofo:"ㄕㄥ",pinyin:"Shēng"},47:{bopomofo:"ㄎㄨㄣˋ",pinyin:"Kùn"},48:{bopomofo:"ㄐㄧㄥˇ",pinyin:"Jǐng"},49:{bopomofo:"ㄍㄜˊ",pinyin:"Gé"},50:{bopomofo:"ㄉㄧㄥˇ",pinyin:"Dǐng"},51:{bopomofo:"ㄓㄣˋ",pinyin:"Zhèn"},52:{bopomofo:"ㄍㄣˋ",pinyin:"Gèn"},53:{bopomofo:"ㄐㄧㄢˋ",pinyin:"Jiàn"},54:{bopomofo:"ㄍㄨㄟ ㄇㄟˋ",pinyin:"Guī Mèi"},55:{bopomofo:"ㄈㄥ",pinyin:"Fēng"},56:{bopomofo:"ㄌㄩˇ",pinyin:"Lǚ"},57:{bopomofo:"ㄒㄩㄣˋ",pinyin:"Xùn"},58:{bopomofo:"ㄉㄨㄟˋ",pinyin:"Duì"},59:{bopomofo:"ㄏㄨㄢˋ",pinyin:"Huàn"},60:{bopomofo:"ㄐㄧㄝˊ",pinyin:"Jié"},61:{bopomofo:"ㄓㄨㄥ ㄈㄨˊ",pinyin:"Zhōng Fú"},62:{bopomofo:"ㄒㄧㄠˇ ㄍㄨㄛˋ",pinyin:"Xiǎo Guò"},63:{bopomofo:"ㄐㄧˋ ㄐㄧˋ",pinyin:"Jì Jì"},64:{bopomofo:"ㄨㄟˋ ㄐㄧˋ",pinyin:"Wèi Jì"}};class R_{constructor(){this.library=[],this.currentView="tabletop",this.currentTosses=[],this.currentHexData=null,this.chart=null,this.currentRecordId=null,this.chatMessages=[],this.calendarDate=new Date,this.calendarMonth=this.calendarDate.getMonth(),this.calendarYear=this.calendarDate.getFullYear(),this.radarChart=null,this.resultSource="tabletop",this.librarySubpage="grid",window.app=this,this.init()}async init(){console.log("Initializing I-Ching Lab..."),this.library=await Rr.loadAllHexagrams(),console.log(`Loaded ${this.library.length} hexagrams.`),this.library.length>0&&console.log("Sample Hexagram Data:",this.library[0]),this.setupNavigation(),this.setupCastingManager(),this.setupEventListeners(),this.setupCalendarNav(),this.setupLibraryNav(),this.renderView(),this.showWelcomeMessage()}showWelcomeMessage(){console.log("%c☯ I-Ching Lab ☯","color: #d4af37; font-size: 20px; font-weight: bold;"),console.log("歡迎來到易經實驗室。請點擊畫面，開始您的第一卦。")}setupCastingManager(){this.caster=new w_("canvas-container"),this.caster.onResult=t=>this.handleTossResult(t)}handleTossResult(t){this.currentTosses.push(t),console.log(`Toss ${this.currentTosses.length}: Sum = ${t}`),this.renderCastingProgress(),this.currentTosses.length<6?(this.updateTossProgress(),setTimeout(()=>{const e=document.querySelector(".instruction");e.innerText=`第 ${this.currentTosses.length+1} 次投擲 (已完成 ${this.currentTosses.length}/6)`},1e3)):this.finishDivination()}renderCastingProgress(){const t=document.getElementById("casting-progress");t&&(t.innerHTML="",this.currentTosses.forEach(e=>{const n=document.createElement("div");n.className="hex-line "+this.getLineClass(e),t.appendChild(n)}))}getLineClass(t){return t===9?"yang old-yang":t===8?"yin":t===7?"yang":t===6?"yin old-yin":""}updateTossProgress(){const t=document.querySelector(".instruction");t.innerText="計算中..."}finishDivination(){var o;const t=ks.calculateHexagram(this.currentTosses),e=this.library.find(a=>a.binary===t.originalBinary),n=t.hasChange?this.library.find(a=>a.binary===t.futureBinary):null,i=bn.saveRecord({question:((o=document.getElementById("user-question"))==null?void 0:o.value)||"隨喜求卦",originalId:e.id,originalBinary:t.originalBinary,originalName:e.name,futureId:n==null?void 0:n.id,futureName:n==null?void 0:n.name,changingLines:t.changingLines,hasChange:t.hasChange});this.currentRecordId=i,this.chatMessages=[],this.showResultOverlay(e,n,t,i);const s=document.getElementById("ask-mentor-result");s&&s.classList.add("pulse-gold")}getSolarTime(){return new Date().toLocaleString("zh-TW",{timeZone:"America/New_York"})+" (波士頓真太陽時)"}showResultOverlay(t,e,n,i=null){var N,L;this.currentRecordId=i||this.currentRecordId,this.currentRecordId&&!this.resultSource&&(this.resultSource="history");const s=document.getElementById("result-overlay"),o=s.querySelector(".hex-name"),a=s.querySelector(".binary-display"),l=s.querySelector(".hex-summary"),c=Ss[t.id],h=c?`
            <div class="result-phonetic-stack">
                <span class="zhuyin">${c.bopomofo}</span>
                <span class="pinyin">${c.pinyin}</span>
            </div>
        `:"",d=e?Ss[e.id]:null,u=d?`
            <div class="result-phonetic-stack">
                <span class="zhuyin">${d.bopomofo}</span>
                <span class="pinyin">${d.pinyin}</span>
            </div>
        `:"",m=ks.getRelatedHexagrams(t.binary),g=this.library.find(P=>P.binary===m.nuclearBinary),_=this.library.find(P=>P.binary===m.invertedBinary),p=Is.getGanZhi(new Date),f=ks.getSixBeasts(p.dayStem),v=Is.getWuxingStrength(p.monthBranch);this.radarChart,o.innerHTML=`
            <div class="result-hex-display">
                <div class="hex-block original">
                    <span class="hex-label">本卦 (當前)</span>
                    ${this.renderMiniHexSymbol(t.binary)}
                    <div class="hex-name-wrap">
                        <span class="hex-name-text">${t.name}</span>
                        ${h}
                    </div>
                </div>
                ${n.hasChange?`
                <div class="hex-arrow">→</div>
                <div class="hex-block future">
                    <span class="hex-label">之卦 (演變)</span>
                    ${this.renderMiniHexSymbol(e.binary)}
                    <div class="hex-name-wrap">
                        <span class="hex-name-text">${e.name}</span>
                        ${u}
                    </div>
                </div>
                `:""}
            </div>
        `,a.innerText=n.originalBinary,n.hasChange?l.innerHTML=`
                <div class="change-info">
                    <p><strong>現狀：</strong>${t.name}卦 — ${t.summary}</p>
                    <p><strong>趨勢：</strong>變爻引發向 ${e.name}卦 的演進。這代表了事態未來的發展方向。</p>
                </div>
            `:l.innerText=t.summary;const x=document.getElementById("najia-info");if(t.najia_analysis){x.classList.remove("hidden"),x.querySelector(".palace-info").innerText=`${t.najia_analysis.palace}宮 [${t.najia_analysis.palace_wuxing}]`;const P=x.querySelector(".lines-najia");P.innerHTML="",t.najia_analysis.lines.forEach(I=>{const $=document.createElement("div");$.className="najia-line",$.dataset.line=I.line_number,$.dataset.relative=I.relative,$.innerHTML=`
                    <span class="line-rel">${I.relative}</span>
                    <span class="line-dz">${I.dizhi}</span>
                    <span class="line-wx">${I.wuxing}</span>
                `,P.appendChild($)})}const M=document.createElement("div");M.className="advanced-insights-panel hidden",M.id="advanced-panel",(N=t.najia_analysis)!=null&&N.palace_wuxing;const C=(((L=t.najia_analysis)==null?void 0:L.lines)||[]).map(P=>P.relative);M.innerHTML=`
            <div class="advanced-grid">
                <div class="insight-col">
                    <h4><i class="fas fa-link"></i> 關聯卦象</h4>
                    <div class="related-hexes">
                        <div class="rel-item" onclick="app.showHexagramDetail(app.library.find(h=>h.id==='${g==null?void 0:g.id}'))">
                            <span class="rel-label">互卦 (內在)</span>
                            <span class="rel-name">${(g==null?void 0:g.name)||"無"}卦</span>
                        </div>
                        <div class="rel-item" onclick="app.showHexagramDetail(app.library.find(h=>h.id==='${_==null?void 0:_.id}'))">
                            <span class="rel-label">綜卦 (視角)</span>
                            <span class="rel-name">${(_==null?void 0:_.name)||"無"}卦</span>
                        </div>
                    </div>
                </div>
                <div class="insight-col">
                    <h4><i class="fas fa-dragon"></i> 六親與六神</h4>
                    <ul class="beast-list">
                        ${C.slice().reverse().map((P,I)=>`
                            <li>
                                <span class="beast-name">${f[5-I]}</span>
                                <span class="relative-name">${P}</span>
                                <span class="line-idx">爻 ${6-I}</span>
                            </li>
                        `).join("")}
                    </ul>
                </div>
                <div class="insight-col">
                    <h4><i class="fas fa-bolt"></i> 今日能量 (${p.day})</h4>
                    <div class="strength-tags">
                        ${Object.entries(v).map(([P,I])=>`
                            <span class="strength-tag ${I}">${P}:${I}</span>
                        `).join("")}
                    </div>
                </div>
            </div>
        `;const w=s.querySelector(".advanced-insights-panel");w&&w.remove(),s.querySelector(".result-actions").before(M);const A=document.createElement("button");A.className="btn-secondary toggle-advanced",A.innerHTML='<i class="fas fa-flask"></i> 顯示深層分析',A.onclick=()=>{M.classList.toggle("hidden"),A.innerHTML=M.classList.contains("hidden")?'<i class="fas fa-flask"></i> 顯示深層分析':'<i class="fas fa-times"></i> 隱藏分析'};const B=s.querySelector(".result-actions"),S=B.querySelector(".toggle-advanced");S&&S.remove(),B.prepend(A),s.classList.remove("hidden"),document.querySelector(".instruction").classList.add("hidden");const b=s.querySelectorAll(".btn-focus");b.forEach(P=>{P.classList.remove("active"),P.onclick=()=>{b.forEach(I=>I.classList.remove("active")),P.classList.add("active"),this.highlightYongShen(P.dataset.type,t)}});const U=s.querySelector("#ask-mentor-result");U.onclick=()=>{var I;const P=((I=document.getElementById("user-question"))==null?void 0:I.value)||"隨喜求卦";s.classList.add("hidden"),this.currentHexData=t,this.currentRecordId=i,this.switchView("ai-mentor"),this.prepareAIMentorView(t,i),this.chatMessages.length===0&&this.handleSendChat(`針對在此次「${P}」的占卜中，請導師為我開示此卦。`)};const F=s.querySelector("#copy-result");F.onclick=()=>{var W,K,Z;const P=((W=document.getElementById("user-question"))==null?void 0:W.value)||"隨喜求卦",I=this.getSolarTime();let $="";t.najia_analysis&&($=t.najia_analysis.lines.map(X=>{const j=n.changingLines.includes(X.line_number);return`L${X.line_number}: [${X.relative}] ${X.dizhi}${X.wuxing}${j?" (動)":""}`}).reverse().join(`
`));const z=`【I-Ching Lab 卦象紀錄】
問題：${P}
時間：${I}
本卦：${t.name}${n.hasChange?" 之 "+e.name:""}
二进制：${n.originalBinary}

[納甲資訊]
${(K=t.najia_analysis)==null?void 0:K.palace}宮 [${(Z=t.najia_analysis)==null?void 0:Z.palace_wuxing}]
${$}

解義：${t.summary}
#IChingLab #易經 #術數`;navigator.clipboard.writeText(z).then(()=>{const X=F.innerText;F.innerText="已複製資訊！",setTimeout(()=>F.innerText=X,2e3)})}}highlightYongShen(t,e){if(!e.najia_analysis)return;const i={career:["官鬼"],wealth:["妻財"],love:["妻財","官鬼"]}[t];document.querySelectorAll(".najia-line").forEach(o=>{const a=i.includes(o.dataset.relative);o.classList.toggle("highlight",a)}),console.log(`Highlighted YongShen for ${t}:`,i)}setupLibraryNav(){document.querySelectorAll(".sub-nav-btn").forEach(e=>{e.addEventListener("click",()=>{const n=e.dataset.sub;this.switchLibrarySubpage(n)})})}switchLibrarySubpage(t){this.librarySubpage=t,document.querySelectorAll(".sub-nav-btn").forEach(e=>{e.classList.toggle("active",e.dataset.sub===t)}),document.querySelectorAll(".library-subpage").forEach(e=>{e.classList.toggle("active",e.id===`subpage-${t}`)}),t==="grid"&&this.renderLibrary(),t==="bagua"&&this.renderBaguaDiagram(),t==="lookup"&&this.renderLookupTables(),t==="learn"&&this.renderLearnContent(),console.log(`Switched Library to subpage: ${t}`)}renderBaguaDiagram(){const t=document.getElementById("bagua-diagram-container");if(!t)return;const e=[{name:"離",phonetic:"ㄌㄧˊ (Lí)",symbol:"☲",nature:"火",dir:"南 (Top)"},{name:"坤",phonetic:"ㄎㄨㄣ (Kūn)",symbol:"☷",nature:"地",dir:"西南"},{name:"兌",phonetic:"ㄉㄨㄟˋ (Duì)",symbol:"☱",nature:"澤",dir:"西 (Right)"},{name:"乾",phonetic:"ㄑㄧㄢˊ (Qián)",symbol:"☰",nature:"天",dir:"西北"},{name:"坎",phonetic:"ㄎㄢˇ (Kǎn)",symbol:"☵",nature:"水",dir:"北 (Bottom)"},{name:"艮",phonetic:"ㄍㄣˋ (Gèn)",symbol:"☶",nature:"山",dir:"東北"},{name:"震",phonetic:"ㄓㄣˋ (Zhèn)",symbol:"☳",nature:"雷",dir:"東 (Left)"},{name:"巽",phonetic:"ㄒㄩㄣˋ (Xùn)",symbol:"☴",nature:"風",dir:"東南"}];t.innerHTML=`
            <div class="bagua-circle">
                <div class="bagua-center">☯</div>
                ${e.map((n,i)=>`
                    <div class="trigram-node t-${i}" onclick="app.showTrigramDetail('${n.name}')">
                        <span class="t-symbol">${n.symbol}</span>
                        <span class="t-name">${n.name}</span>
                    </div>
                `).join("")}
            </div>
            <div id="trigram-detail-panel" class="trigram-info-panel">
                <p>點擊卦象查看詳細資訊</p>
            </div>
        `}showTrigramDetail(t){const n={乾:{nature:"天",attribute:"健",element:"金",animal:"馬",family:"父",body:"首",color:"大赤、金",season:"秋冬之交",zhuyin:"ㄑㄧㄢˊ",pinyin:"Qián"},坤:{nature:"地",attribute:"順",element:"土",animal:"牛",family:"母",body:"腹",color:"黃、黑",season:"夏秋之交",zhuyin:"ㄎㄨㄣ",pinyin:"Kūn"},震:{nature:"雷",attribute:"動",element:"木",animal:"龍",family:"長男",body:"足",color:"青、綠",season:"春",zhuyin:"ㄓㄣˋ",pinyin:"Zhèn"},巽:{nature:"風",attribute:"入",element:"木",animal:"雞",family:"長女",body:"股 (大腿)",color:"白",season:"春夏之交",zhuyin:"ㄒㄩㄣˋ",pinyin:"Xùn"},坎:{nature:"水",attribute:"陷",element:"水",animal:"豕 (豬)",family:"中男",body:"耳",color:"黑、藍",season:"冬",zhuyin:"ㄎㄢˇ",pinyin:"Kǎn"},離:{nature:"火",attribute:"麗",element:"火",animal:"雉 (雉雞)",family:"中女",body:"目",color:"紅、紫",season:"夏",zhuyin:"ㄌㄧˊ",pinyin:"Lí"},艮:{nature:"山",attribute:"止",element:"土",animal:"狗",family:"少男",body:"手",color:"黃",season:"冬春之交",zhuyin:"ㄍㄣˋ",pinyin:"Gèn"},兌:{nature:"澤",attribute:"說 (悅)",element:"金",animal:"羊",family:"少女",body:"口",color:"白",season:"秋",zhuyin:"ㄉㄨㄟˋ",pinyin:"Duì"}}[t],i=document.getElementById("trigram-detail-panel");i&&(i.innerHTML=`
            <h3>${t} 卦 <small>${n.zhuyin} | ${n.pinyin}</small></h3>
            <div class="t-detail-grid">
                <span><strong>自然：</strong>${n.nature}</span>
                <span><strong>五行：</strong>${n.element}</span>
                <span><strong>動物：</strong>${n.animal}</span>
                <span><strong>特性：</strong>${n.attribute}</span>
                <span><strong>家族：</strong>${n.family}</span>
                <span><strong>人體：</strong>${n.body}</span>
                <span><strong>代表色：</strong>${n.color}</span>
                <span><strong>時令：</strong>${n.season}</span>
            </div>
        `)}renderLookupTables(){const t=document.querySelector("#subpage-lookup .lookup-tables");t&&(t.innerHTML=`
            <div class="lookup-card glass-panel">
                <h3>五行對應表 (Five Elements)</h3>
                <table class="data-table">
                    <thead>
                        <tr><th>五行</th><th>方位</th><th>季節</th><th>顏色</th><th>五官</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>木</td><td>東</td><td>春</td><td>青</td><td>目</td></tr>
                        <tr><td>火</td><td>南</td><td>夏</td><td>赤</td><td>舌</td></tr>
                        <tr><td>土</td><td>中</td><td>四季</td><td>黃</td><td>口</td></tr>
                        <tr><td>金</td><td>西</td><td>秋</td><td>白</td><td>鼻</td></tr>
                        <tr><td>水</td><td>北</td><td>冬</td><td>黑</td><td>耳</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="lookup-card glass-panel">
                <h3>納甲地支對應 (Najia Reference - Full)</h3>
                <table class="data-table">
                    <thead>
                        <tr><th>八宮屬性</th><th>內卦 (Bottom)</th><th>外卦 (Top)</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>乾宮 (金) / 震宮 (木)</td><td>子、寅、辰</td><td>午、申、戌</td></tr>
                        <tr><td>坤宮 (土)</td><td>未、巳、卯</td><td>丑、亥、酉</td></tr>
                        <tr><td>坎宮 (水)</td><td>寅、辰、午</td><td>申、戌、子</td></tr>
                        <tr><td>離宮 (火)</td><td>卯、丑、亥</td><td>酉、未、巳</td></tr>
                        <tr><td>巽宮 (木)</td><td>丑、亥、酉</td><td>未、巳、卯</td></tr>
                        <tr><td>兌宮 (金)</td><td>巳、卯、丑</td><td>亥、酉、未</td></tr>
                        <tr><td>艮宮 (土)</td><td>辰、午、申</td><td>戌、子、寅</td></tr>
                    </tbody>
                </table>
            </div>
        `)}renderLearnContent(){const t=document.querySelector("#subpage-learn .learn-content");t&&(t.innerHTML=`
            <article class="learn-article">
                <h2>☯ 如何開始學習易經？</h2>
                <p>易經並非單純的迷信，而是一套古代的「符號邏輯系統」，用來解釋萬物變化的規律。</p>
                
                <section>
                    <h3>1. 認識符號 (陰陽與八卦)</h3>
                    <p>一長橫「⚊」代表陽，兩個短橫「⚋」代表陰。三爻組成一個「經卦」（八卦），六爻組成一個「別卦」（六十四卦）。</p>
                </section>

                <section>
                    <h3>2. 掌握「變爻」</h3>
                    <p>本占卜系統使用 6, 7, 8, 9 數字法。<strong>6 為老陰，9 為老陽</strong>，這兩個數字代表「變動」，會演變成相反的符號。這就是「易」——變化的真諦。</p>
                </section>

                <section>
                    <h3>3. 術數進階：梅花易數 (Plum Blossom)</h3>
                    <p>這是一種靈活的起卦法，不需要硬幣，只需「數」與「象」。</p>
                    <div class="plum-blossom-tool glass-panel" style="padding:15px; margin-top:10px; border:1px solid rgba(212,175,55,0.3);">
                        <p style="font-size:0.85rem; margin-bottom:10px; color:var(--accent-gold);">體驗數位起卦：輸入兩個數字（如日期、手機尾數）</p>
                        <div style="display:flex; gap:10px;">
                            <input type="number" id="pb-num1" placeholder="數字 1" style="width:70px; background:rgba(0,0,0,0.3); border:1px solid var(--glass-border); color:white; padding:5px; border-radius:5px;">
                            <input type="number" id="pb-num2" placeholder="數字 2" style="width:70px; background:rgba(0,0,0,0.3); border:1px solid var(--glass-border); color:white; padding:5px; border-radius:5px;">
                            <button class="nav-btn gold" onclick="app.calculatePlumBlossom()" style="padding:5px 12px; font-size:0.85rem;">生成卦象</button>
                        </div>
                        <div id="pb-result" style="margin-top:10px; font-size:0.9rem;"></div>
                    </div>
                </section>

                <section>
                    <h3>4. 易經成語與智慧</h3>
                    <ul>
                        <li><strong>「君子豹變」</strong>（革卦）：指君子隨時代而變，自我革新。</li>
                        <li><strong>「同聲相應」</strong>（乾卦）：指志同道合的人會互相感召。</li>
                        <li><strong>「三陽開泰」</strong>（泰卦）：意為好運降臨，萬象更新。</li>
                    </ul>
                </section>

                <section>
                    <h3>5. 推薦資源</h3>
                    <ul>
                        <li>《易經今註今譯》- 基礎入門首選</li>
                        <li>《增刪卜易》- 進階六爻占卜必讀</li>
                        <li>本應用 AI 導師：隨時對話請教，是您最好的領路人。</li>
                    </ul>
                </section>
            </article>
        `)}calculatePlumBlossom(){const t=parseInt(document.getElementById("pb-num1").value),e=parseInt(document.getElementById("pb-num2").value);if(isNaN(t)||isNaN(e))return;const n=["111","011","101","001","110","010","100","000"],i=t%8||8,s=e%8||8,o=n[i-1],a=n[s-1],l=o+a,c=this.library.find(d=>d.binary===l),h=document.getElementById("pb-result");c&&(h.innerHTML=`卦象結果：<strong>${c.name}卦</strong> <button class="nav-btn" onclick="app.showHexagramDetail(app.library.find(h=>h.id===${c.id}))">查看詳解</button>`)}setupEventListeners(){document.getElementById("canvas-container").addEventListener("click",()=>{!this.caster.isCasting&&this.currentTosses.length<6&&this.caster.cast()}),document.getElementById("close-result-overlay").addEventListener("click",()=>{document.getElementById("result-overlay").classList.add("hidden"),this.resultSource==="history"&&(this.switchView("history"),this.resultSource="tabletop")}),document.getElementById("re-toss").addEventListener("click",()=>{document.getElementById("result-overlay").classList.add("hidden"),document.querySelector(".instruction").classList.remove("hidden"),document.querySelector(".instruction").innerText="點擊畫面開始第 1 次投擲",this.currentTosses=[],this.currentRecordId=null,this.chatMessages=[],this.resultSource="tabletop",document.getElementById("casting-progress").innerHTML=""}),window.DeviceOrientationEvent&&window.addEventListener("deviceorientation",e=>{Math.abs(e.beta)+Math.abs(e.gamma)>60&&!this.caster.isCasting&&this.caster.cast()},!0)}setupNavigation(){document.querySelectorAll(".nav-links a").forEach(e=>{e.addEventListener("click",n=>{n.preventDefault();const i=n.target.getAttribute("href").substring(1);this.switchView(i)})})}switchView(t){this.currentView=t,document.querySelectorAll(".nav-links a").forEach(e=>{e.classList.toggle("active",e.getAttribute("href")===`#${t}`)}),document.querySelectorAll(".view").forEach(e=>{e.classList.toggle("active",e.id===t)}),this.renderView()}renderView(){if(this.currentView==="library")this.switchLibrarySubpage(this.librarySubpage);else if(this.currentView==="history")this.renderCalendar();else if(this.currentView==="ai-mentor")if(this.currentHexData)this.prepareAIMentorView(this.currentHexData,this.currentRecordId);else{const t=document.getElementById("chat-history-main");t.innerHTML=`<div class="empty-state">
                    <h3>尚未選擇卦象</h3>
                    <p>請先前往「全卦圖書館」選擇一卦，或從「每日紀錄」中開啟先前的對話。</p>
                </div>`,document.getElementById("mentor-current-hex").innerText="等待導引..."}}renderLibrary(){const t=document.getElementById("hex-grid");t.innerHTML="",this.library.forEach(e=>{const n=document.createElement("div");n.className="hex-card glass-panel";let i='<div class="card-symbol">';e.binary.split("").forEach(a=>{i+=`<div class="hex-line ${a==="1"?"yang":"yin"}"></div>`}),i+="</div>";const s=Ss[e.id],o=s?`
                <div class="card-phonetic">
                    <span class="zhuyin">${s.bopomofo}</span>
                    <span class="pinyin">${s.pinyin}</span>
                </div>
            `:"";n.innerHTML=`
                ${i}
                <div class="card-id">#${e.id}</div>
                <div class="card-name">${e.name}卦</div>
                ${o}
                <div class="card-binary">${e.binary}</div>
            `,n.onclick=()=>this.showHexagramDetail(e),t.appendChild(n)})}setupCalendarNav(){const t=document.getElementById("prev-month"),e=document.getElementById("next-month");t&&(t.onclick=()=>this.changeCalendarMonth(-1)),e&&(e.onclick=()=>this.changeCalendarMonth(1))}changeCalendarMonth(t){this.calendarMonth+=t,this.calendarMonth<0?(this.calendarMonth=11,this.calendarYear--):this.calendarMonth>11&&(this.calendarMonth=0,this.calendarYear++),this.renderCalendar()}renderCalendar(){if(this.currentView!=="history")return;const t=document.getElementById("calendar-grid"),e=document.getElementById("current-month-display");if(!t||!e)return;e.innerText=`${this.calendarYear}年 ${this.calendarMonth+1}月`,t.innerHTML="",["日","一","二","三","四","五","六"].forEach(h=>{const d=document.createElement("div");d.className="calendar-day-head",d.innerText=h,t.appendChild(d)});const i=new Date(this.calendarYear,this.calendarMonth,1).getDay(),s=new Date(this.calendarYear,this.calendarMonth+1,0).getDate(),o=new Date(this.calendarYear,this.calendarMonth,0).getDate(),a=bn.getMonthlyHistory(this.calendarYear,this.calendarMonth),l={};a.forEach(h=>{const d=new Date(h.date).getDate();l[d]||(l[d]=[]),l[d].push(h)});for(let h=i-1;h>=0;h--){const d=document.createElement("div");d.className="calendar-day",d.innerHTML=`<span class="day-number">${o-h}</span>`,t.appendChild(d)}const c=new Date;for(let h=1;h<=s;h++){const d=document.createElement("div"),u=c.getDate()===h&&c.getMonth()===this.calendarMonth&&c.getFullYear()===this.calendarYear;d.className=`calendar-day current-month ${u?"today":""}`;const m=l[h]||[];if(m.length>0){d.classList.add("has-record");let g='<div class="records-preview">';m.forEach(()=>g+='<div class="record-dot"></div>'),g+="</div>",d.innerHTML=`<span class="day-number">${h}</span>${g}`,d.onclick=()=>{this.showDaySelectionModal(h,m)}}else d.innerHTML=`<span class="day-number">${h}</span>`;t.appendChild(d)}this.updateMonthlyStats()}updateMonthlyStats(){const t=bn.getMonthlyStats(this.calendarYear,this.calendarMonth,this.library),e=document.getElementById("radar-chart").getContext("2d"),n=document.getElementById("stats-summary"),i=Object.keys(t.wuxing),s=Object.values(t.wuxing);if(this.radarChart&&this.radarChart.destroy(),t.total===0){n.innerHTML="<p>本月尚無紀錄，快去開啟您的易經探索吧！</p>",this.radarChart=new Chart(e,{type:"radar",data:{labels:["金","木","水","火","土"],datasets:[]},options:{scales:{r:{display:!1}}}});return}let o=-1,a="";for(let c in t.wuxing)t.wuxing[c]>o&&(o=t.wuxing[c],a=c);const l={木:"木氣充盈，代表本月您的能量集中在「成長」與「開拓」上。適合啟動新計畫或自我提升。",火:"火氣旺盛，顯示本月生活節奏快且充滿熱情。注意情緒管理，轉化衝動為行動力。",土:"土氣沈穩，象徵著安定與收穫。本月適合守成、反思或處理與家庭、根基相關的事宜。",金:"金氣銳利，代表果斷與原則。本月您的決策力和執行力極佳，適合解決積壓已久的難題。",水:"水氣靈動，象徵智慧與變化。本月您的直覺敏銳，適合深度思考與人際交流的柔性處理。"};n.innerHTML=`
            <p>本月共計 <strong>${t.total}</strong> 次占卜。</p>
            <p>主導能量：<strong>${a}</strong> 元素</p>
            <p>${l[a]||""}</p>
        `,this.radarChart=new Chart(e,{type:"radar",data:{labels:i,datasets:[{label:"五行強度",data:s,backgroundColor:"rgba(212, 175, 55, 0.2)",borderColor:"#d4af37",borderWidth:2,pointBackgroundColor:"#d4af37"}]},options:{scales:{r:{beginAtZero:!0,ticks:{display:!1},suggestedMax:Math.max(...s)+1,grid:{color:"rgba(255, 255, 255, 0.1)"},angleLines:{color:"rgba(255, 255, 255, 0.1)"},pointLabels:{color:"#f0f0f0",font:{size:12}}}},plugins:{legend:{display:!1}}}})}renderMiniHexSymbol(t){return!t||t.length!==6?"":`
            <div class="mini-hex-symbol">
                ${t.split("").map(e=>`<div class="line ${e==="0"?"yin":"yang"}"></div>`).join("")}
            </div>
        `}showHexagramDetail(t,e=!1,n=null){var h,d,u,m,g,_,p,f,v,x,M;if(!t){console.error("showHexagramDetail: hex is undefined");return}console.log("Showing detail for hex:",t.id,t.name),this.currentHexData=t,this.currentRecordId=n;const i=document.getElementById("detail-modal"),s=i.querySelector(".modal-body"),o=Ss[t.id],a=o?`
            <div class="header-phonetic-stack">
                <span class="zhuyin">${o.bopomofo}</span>
                <span class="pinyin">${o.pinyin}</span>
            </div>
        `:"";s.innerHTML=`
            <div class="modal-header">
                <div class="modal-header-flex">
                    <div class="header-main-title">
                        <h2>第${t.id}卦 ${t.name}卦</h2>
                        ${a}
                    </div>
                    <div class="hex-badges">
                        ${this.renderMiniHexSymbol(t.binary)}
                    </div>
                </div>
            </div>

            <details class="detail-section" open>
                <summary>卦象綜述</summary>
                <div class="detail-content">
                    <p><strong>概括：</strong>${t.summary||"尚無總結"}</p>
                    <p><strong>卦辭：</strong>${((h=t.original_classic)==null?void 0:h.hexagram_text)||"尚聯文獻"}</p>
                    <p><strong>彖傳：</strong>${((d=t.original_classic)==null?void 0:d.tuan_zhuan)||"尚聯文獻"}</p>
                </div>
            </details>

            <details class="detail-section">
                <summary>結構與邏輯</summary>
                <div class="detail-content">
                    <p>${t.logic_teaching||((u=t.structure)==null?void 0:u.interaction_logic)||"術數推演中..."}</p>
                    ${(m=t.structure)!=null&&m.upper_trigram_attr?`<p><strong>上卦：</strong>${t.structure.upper_trigram_attr}</p>`:""}
                    ${(g=t.structure)!=null&&g.lower_trigram_attr?`<p><strong>下卦：</strong>${t.structure.lower_trigram_attr}</p>`:""}
                </div>
            </details>

            <details class="detail-section">
                <summary>六爻詳解</summary>
                <div class="detail-content">
                    <div class="yao-details">
                        ${(t.line_details||[]).map(C=>`
                            <div class="yao-item">
                                <strong>第 ${C.line} 爻：${C.classic_text}</strong>
                                <p>${C.modern_interpretation}</p>
                            </div>
                        `).join("")||"<p>正在整理爻辭中...</p>"}
                    </div>
                </div>
            </details>

            <details class="detail-section">
                <summary>現代解析 (事業/感情/財運)</summary>
                <div class="detail-content">
                    <div class="analysis-grid">
                        <div class="analysis-item"><strong>總體：</strong>${((_=t.llm_analysis)==null?void 0:_.general)||"正在研讀中..."}</div>
                        <div class="analysis-item"><strong>事業：</strong>${((p=t.llm_analysis)==null?void 0:p.career)||"正在研讀中..."}</div>
                        <div class="analysis-item"><strong>感情：</strong>${((f=t.llm_analysis)==null?void 0:f.love)||"正在研讀中..."}</div>
                        <div class="analysis-item"><strong>財運：</strong>${((v=t.llm_analysis)==null?void 0:v.finance)||"正在研讀中..."}</div>
                    </div>
                </div>
            </details>

            <details class="detail-section">
                <summary>象徵、陰暗面與典故</summary>
                <div class="detail-content">
                    <p><strong>原型意象：</strong>${(t.archetypes||[]).join("、")||"尚無資料"}</p>
                    <p><strong>陰暗面：</strong>${t.shadow_side||"尚無資料"}</p>
                    <hr style="opacity:0.1; margin:15px 0;">
                    <p style="color:var(--accent-gold); font-weight:600; margin-bottom:5px;">【典故】${((x=t.ancient_story)==null?void 0:x.title)||""}</p>
                    <p style="font-style:italic; border-left: 2px solid var(--glass-border); padding-left: 10px;">${((M=t.ancient_story)==null?void 0:M.content)||"尚無內容"}</p>
                </div>
            </details>

            <details class="detail-section">
                <summary>視覺意象與記憶竅門</summary>
                <div class="detail-content">
                    <p><strong>視覺場景：</strong>${t.visual_vibe||"意象捕捉中..."}</p>
                    <ul style="margin-top:10px; padding-left:20px;">
                        ${(t.memory_hacks||[]).map(C=>`<li style="margin-bottom:5px;">${C}</li>`).join("")}
                    </ul>
                </div>
            </details>
        `;const l=document.getElementById("ask-ai");l.onclick=()=>{i.classList.remove("active"),this.switchView("ai-mentor")};const c=i.querySelector(".close-btn");c.onclick=()=>i.classList.remove("active"),i.classList.add("active"),this.prepareAIMentorView(t,n)}prepareAIMentorView(t,e){const n=document.getElementById("mentor-current-hex");n.innerText=`${t.name}卦 (#${t.id}) - 導師對話中`;const i=document.getElementById("chat-history-main");i.innerHTML="";const s=bn.getRecord(e||this.currentRecordId);this.chatMessages=(s==null?void 0:s.messages)||[],this.chatMessages.length>0?this.chatMessages.forEach(o=>this.appendMessageToUI(o.role,o.content)):i.innerHTML=`<p class="empty-state">點擊發送按鈕或輸入疑問，與導師探討「${t.name}卦」的深層意涵。</p>`,document.getElementById("send-chat-main").onclick=()=>this.handleSendChat(),document.getElementById("chat-input-main").onkeypress=o=>{o.key==="Enter"&&this.handleSendChat()}}async handleSendChat(t=null){const e=document.getElementById("chat-input-main"),n=t||e.value.trim();if(!n&&!t)return;t||(e.value="");const i=document.getElementById("chat-history-main"),s=i.querySelector(".empty-state");s&&s.remove(),this.chatMessages.push({role:"user",content:n}),this.appendMessageToUI("user",n);const o=document.querySelector(".chat-status");o.innerText="導師沈思中...";const a=this.appendMessageToUI("ai","導師思考中...");let l="";try{const c=bn.getRecord(this.currentRecordId),h=A_.streamChat(this.chatMessages,this.currentHexData,c||{});for await(const d of h)l===""&&(a.innerText=""),l+=d,window.marked?a.innerHTML=window.marked.parse(l):a.innerText=l,i.scrollTop=i.scrollHeight;this.chatMessages.push({role:"assistant",content:l}),this.currentRecordId&&bn.updateMessages(this.currentRecordId,this.chatMessages)}catch(c){a.innerText=`導師連線中斷：${c.message}`,console.error("Chat Error:",c)}finally{o.innerText="在線"}}appendMessageToUI(t,e){const n=document.getElementById("chat-history-main"),i=document.createElement("div");return i.className=`chat-msg ${t==="user"?"user":"ai"}`,t==="ai"&&window.marked&&e!=="導師思考中..."?i.innerHTML=window.marked.parse(e):i.innerText=e,n.appendChild(i),n.scrollTop=n.scrollHeight,i}showDaySelectionModal(t,e){const n=document.getElementById("detail-modal"),i=n.querySelector(".modal-body");i.innerHTML=`
            <div class="modal-header-flex">
                <div class="calendar-icon-header" style="font-size: 1.5rem;">📅</div>
                <h2>${this.calendarYear}年${this.calendarMonth+1}月${t}日 的占卜紀錄</h2>
            </div>
            
            <div class="day-selection-list" style="margin-top: 20px; display: flex; flex-direction: column; gap: 15px;">
                <p class="selection-hint" style="color: var(--text-secondary); font-size: 0.9rem;">當天共有 ${e.length} 筆紀錄，請選擇欲查看的項目：</p>
                ${e.map(s=>{const o=this.library.find(l=>l.id===s.originalId);return`
                        <div class="selection-item glass-panel" style="padding: 15px; border-radius: 12px; border: 1px solid var(--glass-border); display: flex; align-items: center; justify-content: space-between; gap: 15px;">
                            <div class="item-info" style="flex: 1;">
                                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
                                    <span style="font-size: 0.8rem; background: rgba(212, 175, 55, 0.2); color: var(--accent-gold); padding: 2px 8px; border-radius: 4px;">${new Date(s.date).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
                                    <strong style="color: var(--text-primary);">${(o==null?void 0:o.name)||"未知"}卦</strong>
                                </div>
                                <div style="font-size: 0.9rem; color: var(--text-secondary);">${s.question||"隨喜求卦"}</div>
                            </div>
                            <div class="item-actions" style="display: flex; gap: 8px;">
                                <button class="nav-btn" onclick="window.app.showHistoryResultOverlay('${s.id}')" style="white-space: nowrap; font-size: 0.8rem;">查看斷語</button>
                                <button class="nav-btn gold" onclick="window.app.showHexagramDetailById('${o==null?void 0:o.id}', '${s.id}')" style="white-space: nowrap; font-size: 0.8rem;">詳解</button>
                            </div>
                        </div>
                    `}).join("")}
            </div>
        `,n.classList.add("active")}showHistoryResultOverlay(t){const e=bn.getRecord(t);if(!e)return;const n=this.library.find(o=>o.id===e.originalId),i=e.futureId?this.library.find(o=>o.id===e.futureId):null;if(!n)return;document.getElementById("detail-modal").classList.remove("active"),this.resultSource="history",this.switchView("tabletop"),this.showResultOverlay(n,i,{originalBinary:e.originalBinary||"000000",hasChange:e.hasChange,changingLines:e.changingLines||[]},t)}showHexagramDetailById(t,e){const n=this.library.find(i=>i.id===parseInt(t));n&&this.showHexagramDetail(n,!1,e)}}window.addEventListener("DOMContentLoaded",()=>{window.ichingApp=new R_});
