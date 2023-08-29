(function(){/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
'use strict';var aa,ba="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};function ca(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("a");}var da=ca(this);
function ea(a,b){if(b)a:{var c=da;a=a.split(".");for(var d=0;d<a.length-1;d++){var e=a[d];if(!(e in c))break a;c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&ba(c,a,{configurable:!0,writable:!0,value:b})}}function fa(a){function b(d){return a.next(d)}function c(d){return a.throw(d)}return new Promise(function(d,e){function f(g){g.done?d(g.value):Promise.resolve(g.value).then(b,c).then(f,e)}f(a.next())})}function ha(a){return fa(a())}
function ia(a,b){a instanceof String&&(a+="");var c=0,d=!1,e={next:function(){if(!d&&c<a.length){var f=c++;return{value:b(f,a[f]),done:!1}}d=!0;return{done:!0,value:void 0}}};e[Symbol.iterator]=function(){return e};return e}ea("Array.prototype.values",function(a){return a?a:function(){return ia(this,function(b,c){return c})}});ea("Object.entries",function(a){return a?a:function(b){var c=[],d;for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&c.push([d,b[d]]);return c}});
ea("Array.prototype.includes",function(a){return a?a:function(b,c){var d=this;d instanceof String&&(d=String(d));var e=d.length;c=c||0;for(0>c&&(c=Math.max(c+e,0));c<e;c++){var f=d[c];if(f===b||Object.is(f,b))return!0}return!1}});ea("Array.prototype.flat",function(a){return a?a:function(b){b=void 0===b?1:b;for(var c=[],d=0;d<this.length;d++){var e=this[d];Array.isArray(e)&&0<b?(e=Array.prototype.flat.call(e,b-1),c.push.apply(c,e)):c.push(e)}return c}});
ea("Promise.prototype.finally",function(a){return a?a:function(b){return this.then(function(c){return Promise.resolve(b()).then(function(){return c})},function(c){return Promise.resolve(b()).then(function(){throw c;})})}});var ja=ja||{},ka=this||self;function la(a){a.Fc=void 0;a.mb=function(){return a.Fc?a.Fc:a.Fc=new a}}function ma(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}function oa(a,b,c){return a.call.apply(a.bind,arguments)}
function pa(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var e=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(e,d);return a.apply(b,e)}}return function(){return a.apply(b,arguments)}}function qa(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?qa=oa:qa=pa;return qa.apply(null,arguments)}
function ra(a,b){function c(){}c.prototype=b.prototype;a.Vf=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.zh=function(d,e,f){for(var g=Array(arguments.length-2),h=2;h<arguments.length;h++)g[h-2]=arguments[h];return b.prototype[e].apply(d,g)}}function sa(a){return a};function l(a,b,c,d){var e=arguments.length,f=3>e?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d,g;if("object"===typeof Reflect&&Reflect&&"function"===typeof Reflect.decorate)f=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;0<=h;h--)if(g=a[h])f=(3>e?g(f):3<e?g(b,c,f):g(b,c))||f;return 3<e&&f&&Object.defineProperty(b,c,f),f}function n(a,b){if("object"===typeof Reflect&&Reflect&&"function"===typeof Reflect.metadata)return Reflect.metadata(a,b)};var u=class{};function v(a,b){const c=b.constructor;a.Rc.set(c,b);a.O&&a.O&&a.O.o.add(c,a);return b}function w(a,b){return a.Rc.get(b)}function ta(a,b){b=b instanceof u?b.constructor:b;a.Rc.delete(b);if(a.O&&a.O){let c;null==(c=a.O.o.j.get(b))||c.delete(a)}}var x=class{constructor(...a){this.Rc=new Map;for(const b of a)v(this,b)}get(a){if(a=this.Rc.get(a))return a;throw Error("b");}};const ua=new Set;var wa=class{constructor(){this.j=new Map}find(a){return va(a.map(b=>this.j.get(b)||ua))}add(a,b){let c=this.j.get(a);c||(c=new Set,this.j.set(a,c));c.add(b)}};function va(a){if(0===a.length)return[];if(1===a.length)return Array.from(a[0]);const b=[];for(const c of a[0]){let d=!0;for(let e=1;e<a.length;e++)a[e].has(c)||(d=!1);d&&b.push(c)}return b};function xa(a,...b){const c=[];for(const d of a.j)for(const e of b)d.constructor===e&&c.push(d);return c}function ya(a){var b=[za,Aa];const c=[];for(let d=0;d<a.j.length;d++)for(const e of b)a.j[d].constructor===e&&c.push(d);return c}function Ba(a,b){b.O=a;a=a.o;for(const c of b.Rc.keys())a.add(c,b)}function z(a,b){b.O=void 0;a=a.o;for(const d of b.Rc.keys()){let e=void 0;var c=b;null==(e=a.j.get(d))||e.delete(c)}}var Ca=class{constructor(){this.j=[];this.o=new wa}find(...a){return this.o.find(a)}};var Da=class{constructor(a){this.O=a;this.enabled=!0}};function Ea(a,b){if(1!==a.length)throw a=`Expected 1 but found ${a.length}.`,b=b?`${b} (${a})`:a,Error(b);return a[0]};function Fa(a,b){a.x/=b;a.y/=b;return a}function Ga(a,b){return Math.sqrt(Math.pow(a.x-b.x,2)+Math.pow(a.y-b.y,2))}
var C=class{constructor(a=0,b=0){this.x=a;this.y=b}set(a,b){this.x=a;this.y=b;return this}add(a){this.x+=a.x;this.y+=a.y;return this}sub(a){this.x-=a.x;this.y-=a.y;return this}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}transform(a){const b=a.b*this.x+a.d*this.y+a.f;this.x=a.a*this.x+a.c*this.y+a.e;this.y=b;return this}kb(){return new C(this.x,this.y)}},Ha=class{constructor(){this.a=1;this.c=this.b=0;this.d=1;this.f=this.e=0}set(a,b,c,d,e,f){this.a=a;this.b=b;this.c=c;this.d=d;this.e=e;
this.f=f;return this}kb(){return(new Ha).set(this.a,this.b,this.c,this.d,this.e,this.f)}};var Ia=class extends u{},D=class extends u{constructor(a,b=0,c=0,d=new C(0,0)){super();this.Xa=a;this.j=b;this.o=c;this.offset=d;this.alpha=1;this.v=Ja++}},Ja=0;function Ka(a,b){return new La(Ma(a,b).j,new C(a.Re(b),a.Se(b)),new C(a.Xd(b),b[4]))}
var La=class{constructor(a,b,c){this.v=a;this.o=b;this.j=c}},Na=class{constructor(a){this.j=a}},Oa=class extends u{constructor(a,b=!0){super();this.frames=a;this.index=this.j=0;this.loop=!0;this.offset=new C(0,0);this.o=null;this.loop=b}},Ra=class{constructor(a,b){this.Xa=a;this.j=b;if(0>=b)throw Error("d");}};let Sa;function Ta(a){if(void 0===Sa)throw Error();return Ka(Sa,a)};function Ua(a){if(void 0===Sa)throw Error();var b=a.frames,c=a.Mf,d=Sa;const e=[];for(const f of b)e.push(new Ra(Ka(d,f),c));b=new Oa(e,a.loop);a.offset&&(b.offset=a.offset.kb());return b}function Va(a){return Ta(a.frames[0])};var Wa;var Xa=/&/g,Ya=/</g,Za=/>/g,$a=/"/g,ab=/'/g,bb=/\x00/g,cb=/[\x00&<>"']/;function db(){var a=ka.navigator;return a&&(a=a.userAgent)?a:""}function eb(a){return-1!=db().indexOf(a)};const fb=Array.prototype.indexOf?function(a,b){return Array.prototype.indexOf.call(a,b,void 0)}:function(a,b){if("string"===typeof a)return"string"!==typeof b||1!=b.length?-1:a.indexOf(b,0);for(let c=0;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},gb=Array.prototype.map?function(a,b){return Array.prototype.map.call(a,b,void 0)}:function(a,b){const c=a.length,d=Array(c),e="string"===typeof a?a.split(""):a;for(let f=0;f<c;f++)f in e&&(d[f]=b.call(void 0,e[f],f,a));return d};function hb(a){hb[" "](a);return a}hb[" "]=function(){};var ib=eb("Trident")||eb("MSIE"),jb=eb("Gecko")&&!(-1!=db().toLowerCase().indexOf("webkit")&&!eb("Edge"))&&!(eb("Trident")||eb("MSIE"))&&!eb("Edge");var kb={},lb=null;function mb(a,b){void 0===b&&(b=0);nb();b=kb[b];const c=Array(Math.floor(a.length/3)),d=b[64]||"";let e=0,f=0;for(;e<a.length-2;e+=3){var g=a[e],h=a[e+1],k=a[e+2],m=b[g>>2];g=b[(g&3)<<4|h>>4];h=b[(h&15)<<2|k>>6];k=b[k&63];c[f++]=m+g+h+k}m=0;k=d;switch(a.length-e){case 2:m=a[e+1],k=b[(m&15)<<2]||d;case 1:a=a[e],c[f]=b[a>>2]+b[(a&3)<<4|m>>4]+k+d}return c.join("")}
function ob(a){var b=a.length,c=3*b/4;c%3?c=Math.floor(c):-1!="=.".indexOf(a[b-1])&&(c=-1!="=.".indexOf(a[b-2])?c-2:c-1);var d=new Uint8Array(c),e=0;pb(a,function(f){d[e++]=f});return e!==c?d.subarray(0,e):d}
function pb(a,b){function c(k){for(;d<a.length;){var m=a.charAt(d++),p=lb[m];if(null!=p)return p;if(!/^[\s\xa0]*$/.test(m))throw Error("e`"+m);}return k}nb();for(var d=0;;){var e=c(-1),f=c(0),g=c(64),h=c(64);if(64===h&&-1===e)break;b(e<<2|f>>4);64!=g&&(b(f<<4&240|g>>2),64!=h&&b(g<<6&192|h))}}
function nb(){if(!lb){lb={};for(var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),b=["+/=","+/","-_=","-_.","-_"],c=0;5>c;c++){var d=a.concat(b[c].split(""));kb[c]=d;for(var e=0;e<d.length;e++){var f=d[e];void 0===lb[f]&&(lb[f]=e)}}}};var qb="undefined"!==typeof Uint8Array;function rb(a){return qb&&null!=a&&a instanceof Uint8Array}let sb;function tb(){return sb||(sb=new Uint8Array(0))}var ub={};let vb;function wb(){return vb||(vb=new xb(null,ub))}function yb(a){if(ub!==ub)throw Error("f");var b=a.Od;b=null==b||rb(b)?b:"string"===typeof b?ob(b):null;return null==b?b:a.Od=b}function zb(a){return(a=yb(a))?new Uint8Array(a):tb()}var xb=class{constructor(a,b){if(b!==ub)throw Error("f");this.Od=a;if(null!=a&&0===a.length)throw Error("g");}Jf(){return null==this.Od}};const Ab="function"===typeof Symbol&&"symbol"===typeof Symbol()?Symbol():void 0;function Bb(a,b){if(Ab)return a[Ab]|=b;if(void 0!==a.Ub)return a.Ub|=b;Object.defineProperties(a,{Ub:{value:b,configurable:!0,writable:!0,enumerable:!1}});return b}function Cb(a,b){Ab?a[Ab]&&(a[Ab]&=~b):void 0!==a.Ub&&(a.Ub&=~b)}function Db(a){let b;Ab?b=a[Ab]:b=a.Ub;return null==b?0:b}function Eb(a,b){Ab?a[Ab]=b:void 0!==a.Ub?a.Ub=b:Object.defineProperties(a,{Ub:{value:b,configurable:!0,writable:!0,enumerable:!1}})}
function Fb(a){Bb(a,1);return a}function Gb(a){return!!(Db(a)&2)}function Hb(a){Bb(a,16);return a}function Ib(a,b){Eb(b,(a|0)&-51)}function Jb(a,b){Eb(b,(a|18)&-41)};var Kb={};function Lb(a){return null!==a&&"object"===typeof a&&!Array.isArray(a)&&a.constructor===Object}function Mb(a,b){if(null!=a)if("string"===typeof a)a=a?new xb(a,ub):wb();else if(a.constructor!==xb)if(rb(a))a=a.length?new xb(new Uint8Array(a),ub):wb();else{if(!b)throw Error();a=void 0}return a}var Nb;const Ob=[];Eb(Ob,23);Nb=Object.freeze(Ob);function Pb(a){if(Gb(a.Ja))throw Error("h");}function Qb(a){var b=a.length;(b=b?a[b-1]:void 0)&&Lb(b)?b.g=1:a.push({g:1})};function Rb(a,b,c){let d=!1;if(null!=a&&"object"===typeof a&&!(d=Array.isArray(a))&&a.he===Kb)return a;if(d)return new b(a);if(c)return new b}function Sb(a,b,c=!1){if(Array.isArray(a))return new b(c?Hb(a):a)};let Tb;function Ub(a){switch(typeof a){case "number":return isFinite(a)?a:String(a);case "object":if(a)if(Array.isArray(a)){if(0!==(Db(a)&128))return a=Array.prototype.slice.call(a),Qb(a),a}else{if(rb(a))return mb(a);if(a instanceof xb){const b=a.Od;return null==b?"":"string"===typeof b?b:a.Od=mb(b)}}}return a};function Vb(a,b,c,d){if(null!=a){if(Array.isArray(a))a=Wb(a,b,c,void 0!==d);else if(Lb(a)){const e={};for(let f in a)e[f]=Vb(a[f],b,c,d);a=e}else a=b(a,d);return a}}function Wb(a,b,c,d){const e=Db(a);d=d?!!(e&16):void 0;a=Array.prototype.slice.call(a);for(let f=0;f<a.length;f++)a[f]=Vb(a[f],b,c,d);c(e,a);return a}function Xb(a){return a.he===Kb?a.toJSON():Ub(a)}function Yb(a){if(!a)return a;if("object"===typeof a){if(rb(a))return new Uint8Array(a);if(a.he===Kb)return a.clone()}return a}
function Zb(a,b){a&128&&Qb(b)};function $b(a){return a.j||(a.j=a.Ja[a.o+a.zc]={})}function ac(a,b,c){return-1===b?null:b>=a.o?a.j?a.j[b]:void 0:c&&a.j&&(c=a.j[b],null!=c)?c:a.Ja[b+a.zc]}function bc(a,b,c,d){a.v&&(a.v=void 0);if(b>=a.o||d)return $b(a)[b]=c,a;a.Ja[b+a.zc]=c;(c=a.j)&&b in c&&delete c[b];return a}
function cc(a,b,c,d,e){let f=ac(a,b,d);Array.isArray(f)||(f=Nb);const g=Db(f);g&1||Fb(f);if(e)g&2||Bb(f,2),c&1||Object.freeze(f);else{e=!(c&2);const h=g&2;c&1||!h?e&&g&16&&!h&&Cb(f,16):(f=Fb(Array.prototype.slice.call(f)),bc(a,b,f,d))}return f}function dc(a,b){const c=ac(a,b),d=Mb(c,!0);null!=d&&d!==c&&bc(a,b,d);return d}function ec(a,b){a=ac(a,b);return null==a?0:a}function fc(a,b){a=dc(a,b);return null==a?wb():a}function gc(a,b,c){Pb(a);0!==c?bc(a,b,c):bc(a,b,void 0,!1)}
function hc(a,b,c){Pb(a);c=Mb(c,!1);null==c||c.Jf()?bc(a,b,void 0,!1):bc(a,b,c);return a}function ic(a,b){let c=0;for(let d=0;d<b.length;d++){const e=b[d];null!=ac(a,e)&&(0!==c&&bc(a,c,void 0,!1),c=e)}return c}function jc(a,b,c){var d=ac(a,c,!1);b=Rb(d,b);b!==d&&null!=b&&(bc(a,c,b,!1),Bb(b.Ja,Db(a.Ja)&-33));d=b;if(null==d)return d;Gb(a.Ja)||(b=kc(d),b!==d&&(d=b,bc(a,c,d,!1)));return d}
function lc(a,b,c,d,e,f){a.Ua||(a.Ua={});let g=a.Ua[c],h=cc(a,c,3,d,f);if(g)f||(Object.isFrozen(g)?e||(g=Array.prototype.slice.call(g),a.Ua[c]=g):e&&Object.freeze(g));else{g=[];const k=!!(Db(a.Ja)&16),m=Gb(h);!f&&m&&(h=Fb(Array.prototype.slice.call(h)),bc(a,c,h,d));d=m;for(let p=0;p<h.length;p++){const q=h[p],t=Sb(q,b,k);void 0!==t&&(d=d||Gb(q),g.push(t),m&&Bb(t.Ja,2))}a.Ua[c]=g;a=h;Object.isFrozen(a)||(b=Db(a)|33,Eb(a,d?b&-9:b|8));(f||e&&m)&&Bb(g,2);(f||e)&&Object.freeze(g)}return g}
function mc(a,b,c,d){var e=Gb(a.Ja);b=lc(a,b,c,d,e,e);a=cc(a,c,3,d,e);if(!(e||Db(a)&8)){for(e=0;e<b.length;e++)c=b[e],d=kc(c),c!==d&&(b[e]=d,a[e]=b[e].Ja);Bb(a,8)}return b}function nc(a,b,c,d){Pb(a);let e;if(null!=c){e=Fb([]);let f=!1;for(let g=0;g<c.length;g++)e[g]=c[g].Ja,f=f||Gb(e[g]);a.Ua||(a.Ua={});a.Ua[b]=c;c=e;f?Cb(c,8):Bb(c,8)}else a.Ua&&(a.Ua[b]=void 0),e=Nb;bc(a,b,e,d)}function oc(a,b){a=ac(a,b);return null==a?0:a}function pc(a,b,c){var d=ic(a,qc)===c;return jc(a,b,d?c:-1)};function rc(a){const b=Db(a);if(b&2)return a;a=gb(a,sc);Jb(b,a);Object.freeze(a);return a}function tc(a,b,c=Jb){if(null!=a){if(qb&&a instanceof Uint8Array)return a.length?new xb(new Uint8Array(a),ub):wb();if(Array.isArray(a)){const d=Db(a);if(d&2)return a;if(b&&!(d&32)&&(d&16||0===d))return Eb(a,d|2),a;a=Wb(a,tc,c,!0);b=Db(a);b&4&&b&2&&Object.freeze(a);return a}return a.he===Kb?sc(a):a}}function sc(a){if(Gb(a.Ja))return a;a=uc(a,!0);Bb(a.Ja,2);return a}
function uc(a,b){const c=a.Ja;var d=Hb([]),e=a.constructor.j;e&&d.push(e);0!==(Db(c)&128)&&Qb(d);b=b||a.hc()?Jb:Ib;e=a.constructor;Tb=d;d=new e(d);Tb=void 0;a.wc&&(d.wc=a.wc.slice());e=!!(Db(c)&16);for(let q=0;q<c.length;q++){var f=c[q];if(q===c.length-1&&Lb(f))for(const t in f){var g=+t;if(Number.isNaN(g))$b(d)[g]=f[g];else{var h=d,k=g;g=f[t];var m=e,p=b;const A=a.Ua&&a.Ua[k];A?nc(h,k,rc(A),!0):(g=tc(g,m,p),Pb(h),bc(h,k,g,!0))}}else h=d,g=q-a.zc,m=e,p=b,(k=a.Ua&&a.Ua[g])?nc(h,g,rc(k),!1):(f=tc(f,
m,p),Pb(h),bc(h,g,f,!1))}return d};function kc(a){if(Gb(a.Ja)){var b=uc(a,!1);b.v=a;a=b}return a}
var xc=class{constructor(a,b,c){null==a&&(a=Tb);Tb=void 0;var d=this.constructor.o||0,e=0<d,f=this.constructor.j,g=!1;if(null==a){a=f?[f]:[];var h=!0;Eb(a,48)}else{if(!Array.isArray(a))throw Error();if(f&&f!==a[0])throw Error();const k=Bb(a,0);let m=k;if(h=0!==(16&m))(g=0!==(32&m))||(m|=32);if(e)if(128&m)d=0;else{if(0<a.length){const p=a[a.length-1];if(Lb(p)&&"g"in p){d=0;m|=128;delete p.g;let q=!0;for(let t in p){q=!1;break}q&&a.pop()}}}else if(128&m)throw Error();k!==m&&Eb(a,m)}this.zc=(f?0:-1)-
d;this.Ua=void 0;this.Ja=a;a:{f=this.Ja.length;d=f-1;if(f&&(f=this.Ja[d],Lb(f))){this.j=f;this.o=d-this.zc;break a}void 0!==b&&-1<b?(this.o=Math.max(b,d+1-this.zc),this.j=void 0):this.o=Number.MAX_VALUE}if(!e&&this.j&&"g"in this.j)throw Error("i");if(c){b=h&&!g&&!0;e=this.o;let k;for(h=0;h<c.length;h++)g=c[h],g<e?(g+=this.zc,(d=a[g])?vc(d,b):a[g]=Nb):(k||(k=$b(this)),(d=k[g])?vc(d,b):k[g]=Nb)}}toJSON(){return Wb(this.Ja,Xb,Zb)}clone(){var a=Wb(this.Ja,Yb,Ib);Hb(a);Tb=a;a=new this.constructor(a);Tb=
void 0;wc(a,this);return a}hc(){return Gb(this.Ja)}};function vc(a,b){if(Array.isArray(a)){var c=Db(a),d=1;!b||c&2||(d|=16);(c&d)!==d&&Eb(a,c|d)}}xc.prototype.he=Kb;xc.prototype.toString=function(){return this.Ja.toString()};
function wc(a,b){b.wc&&(a.wc=b.wc.slice());const c=b.Ua;if(c){const f=b.j;for(let g in c)if(b=c[g]){var d=!(!f||!f[g]),e=+g;if(Array.isArray(b)){if(b.length)for(d=mc(a,b[0].constructor,e,d),e=0;e<Math.min(d.length,b.length);e++)wc(d[e],b[e])}else throw a=typeof b,Error("j`"+("object"!=a?a:b?Array.isArray(b)?"array":a:"null")+"`"+b);}}};function yc(a){if("string"===typeof a)return{buffer:ob(a),hc:!1};if(Array.isArray(a))return{buffer:new Uint8Array(a),hc:!1};if(a.constructor===Uint8Array)return{buffer:a,hc:!1};if(a.constructor===ArrayBuffer)return{buffer:new Uint8Array(a),hc:!1};if(a.constructor===xb)return{buffer:yb(a)||tb(),hc:!0};if(a instanceof Uint8Array)return{buffer:new Uint8Array(a.buffer,a.byteOffset,a.byteLength),hc:!1};throw Error("s");};const zc="function"===typeof Uint8Array.prototype.slice;function Ac(a,b){var {Ee:c=!1}={};a.Ee=c;b&&(b=yc(b),a.v=b.buffer,a.U=b.hc,a.H=0,a.o=a.v.length,a.j=a.H)}function Bc(a){a.v=null;a.U=!1;a.H=0;a.o=0;a.j=0;a.Ee=!1}function Cc(a,b){a.j=b;if(b>a.o)throw Error("q`"+b+"`"+a.o);}
function Dc(a){const b=a.v;let c=a.j,d=b[c++],e=d&127;if(d&128&&(d=b[c++],e|=(d&127)<<7,d&128&&(d=b[c++],e|=(d&127)<<14,d&128&&(d=b[c++],e|=(d&127)<<21,d&128&&(d=b[c++],e|=d<<28,d&128&&b[c++]&128&&b[c++]&128&&b[c++]&128&&b[c++]&128&&b[c++]&128)))))throw Error("p");Cc(a,c);return e}
function Ec(a,b){if(0==b)return wb();if(0>b)throw Error("r`"+b);var c=a.j;const d=c+b;if(d>a.o)throw Error("q`"+(a.o-c)+"`"+b);a.j=d;a.Ee&&a.U?c=a.v.subarray(c,c+b):(a=a.v,b=c+b,c=c===b?tb():zc?a.slice(c,b):new Uint8Array(a.subarray(c,b)));return 0==c.length?wb():new xb(c,ub)}var Gc=class{constructor(a){this.v=null;this.U=!1;this.j=this.o=this.H=0;Ac(this,a)}V(){Bc(this);100>Fc.length&&Fc.push(this)}reset(){this.j=this.H}},Fc=[];function Hc(a){var b=a.j;if(b.j==b.o)return!1;a.v=a.j.j;var c=Dc(a.j)>>>0;b=c>>>3;c&=7;if(!(0<=c&&5>=c))throw Error("l`"+c+"`"+a.v);if(1>b)throw Error("m`"+b+"`"+a.v);a.H=b;a.o=c;return!0}
function Ic(a){switch(a.o){case 0:if(0!=a.o)Ic(a);else a:{a=a.j;var b=a.j;const c=b+10,d=a.v;for(;b<c;)if(0===(d[b++]&128)){Cc(a,b);break a}throw Error("p");}break;case 1:a=a.j;Cc(a,a.j+8);break;case 2:2!=a.o?Ic(a):(b=Dc(a.j)>>>0,a=a.j,Cc(a,a.j+b));break;case 5:a=a.j;Cc(a,a.j+4);break;case 3:b=a.H;do{if(!Hc(a))throw Error("n");if(4==a.o){if(a.H!=b)throw Error("o");break}Ic(a)}while(1);break;default:throw Error("l`"+a.o+"`"+a.v);}}
function Jc(a,b,c){const d=a.j.o,e=Dc(a.j)>>>0,f=a.j.j+e;let g=f-d;0>=g&&(a.j.o=f,c(b,a,void 0,void 0,void 0),g=f-a.j.j);if(g)throw Error("k`"+e+"`"+(e-g));a.j.j=f;a.j.o=d}var Lc=class{constructor(a){if(Fc.length){const b=Fc.pop();Ac(b,a);a=b}else a=new Gc(a);this.j=a;this.v=this.j.j;this.o=this.H=-1;({Vd:a=!1}={});this.Vd=a}V(){Bc(this.j);this.o=this.H=-1;100>Kc.length&&Kc.push(this)}reset(){this.j.reset();this.v=this.j.j;this.o=this.H=-1}},Kc=[];function Mc(a,b){for(;127<b;)a.j.push(b&127|128),b>>>=7;a.j.push(b)}function Nc(a,b){if(0<=b)Mc(a,b);else{for(let c=0;9>c;c++)a.j.push(b&127|128),b>>=7;a.j.push(1)}}var Oc=class{constructor(){this.j=[]}length(){return this.j.length}end(){const a=this.j;this.j=[];return a}};function Pc(a,b){0!==b.length&&(a.v.push(b),a.o+=b.length)}function Qc(a,b){Mc(a.j,8*b+2);b=a.j.end();Pc(a,b);b.push(a.o);return b}function Rc(a,b){var c=b.pop();for(c=a.o+a.j.length()-c;127<c;)b.push(c&127|128),c>>>=7,a.o++;b.push(c);a.o++}function Sc(a,b){if(b=b.wc){Pc(a,a.j.end());for(let c=0;c<b.length;c++)Pc(a,yb(b[c])||tb())}}var Tc=class{constructor(){this.v=[];this.o=0;this.j=new Oc}};function Uc(a,b,c){if(c)for(let d in c){const e=c[d];let f=e.hh;if(!f){const g=e.Jh||e.fh.te;if(e.Af){const h=Vc(e.Af);f=(k,m,p)=>g(k,m,p,h)}else if(e.Lf){const h=Wc(e.Me.Cc,e.Lf);f=(k,m,p)=>g(k,m,p,h)}else f=g;e.hh=f}f(b,a,e.Me)}Sc(b,a)}const Xc=Symbol();function Yc(a,b,c){return a[Xc]||(a[Xc]=(d,e)=>b(d,e,c))}function Zc(a){let b=a[Xc];if(!b){const c=$c(a);b=(d,e)=>ad(d,e,c);a[Xc]=b}return b}function bd(a){var b=a.Af;if(b)return Zc(b);if(b=a.Ih)return Yc(a.Me.Cc,b,a.Lf)}
function cd(a){const b=bd(a),c=a.Me,d=a.fh.qe;return b?(e,f)=>d(e,f,c,b):(e,f)=>d(e,f,c)}function dd(a,b){let c=a[b];"function"==typeof c&&0===c.length&&(c=c(),a[b]=c);return Array.isArray(c)&&(ed in c||fd in c||0<c.length&&"function"==typeof c[0])?c:void 0}
function gd(a,b,c,d,e,f){b.Cc=a[0];let g=1;if(a.length>g&&"number"!==typeof a[g]){var h=a[g++];c(b,h)}for(;g<a.length;){c=a[g++];for(var k=g+1;k<a.length&&"number"!==typeof a[k];)k++;h=a[g++];k-=g;switch(k){case 0:d(b,c,h);break;case 1:(k=dd(a,g))?(g++,e(b,c,h,k)):d(b,c,h,a[g++]);break;case 2:k=g++;k=dd(a,k);e(b,c,h,k,a[g++]);break;case 3:f(b,c,h,a[g++],a[g++],a[g++]);break;case 4:f(b,c,h,a[g++],a[g++],a[g++],a[g++]);break;default:throw Error("t`"+k);}}return b}const hd=Symbol();
function Vc(a){let b=a[hd];if(!b){const c=id(a);b=(d,e)=>jd(d,e,c);a[hd]=b}return b}function Wc(a,b){let c=a[hd];c||(c=(d,e)=>Uc(d,e,b),a[hd]=c);return c}const fd=Symbol();function kd(a,b){a.push(b)}function ld(a,b,c){a.push(b,c.te)}function md(a,b,c,d){const e=Vc(d),f=id(d).Cc,g=c.te;a.push(b,(h,k,m)=>g(h,k,m,f,e))}function nd(a,b,c,d,e,f){const g=Wc(d,f),h=c.te;a.push(b,(k,m,p)=>h(k,m,p,d,g))}
function id(a){let b=a[fd];if(b)return b;b=gd(a,a[fd]=[],kd,ld,md,nd);ed in a&&fd in a&&(a.length=0);return b}const ed=Symbol();function od(a,b){a[0]=b}function pd(a,b,c,d){const e=c.qe;a[b]=d?(f,g,h)=>e(f,g,h,d):e}function qd(a,b,c,d,e){const f=c.qe,g=Zc(d),h=$c(d).Cc;a[b]=(k,m,p)=>f(k,m,p,h,g,e)}function rd(a,b,c,d,e,f,g){const h=c.qe,k=Yc(d,e,f);a[b]=(m,p,q)=>h(m,p,q,d,k,g)}function $c(a){let b=a[ed];if(b)return b;b=gd(a,a[ed]={},od,pd,qd,rd);ed in a&&fd in a&&(a.length=0);return b}
function ad(a,b,c){for(;Hc(b)&&4!=b.o;){var d=b.H,e=c[d];if(!e){var f=c[0];f&&(f=f[d])&&(e=c[d]=cd(f))}if(!e||!e(b,a,d))if(f=b,d=a,e=f.v,Ic(f),!f.Vd){const g=f.j.j-e;f.j.j=e;e=Ec(f.j,g);(f=d.wc)?f.push(e):d.wc=[e]}}return a}function jd(a,b,c){const d=c.length,e=1==d%2;let f=e?1:0;for(;f<d;f+=2)(0,c[f+1])(b,a,c[f]);Uc(a,b,e?c[0]:void 0)}
var td=a=>{const b=new Tc;jd(a,b,id(sd));Pc(b,b.j.end());a=new Uint8Array(b.o);const c=b.v,d=c.length;let e=0;for(let f=0;f<d;f++){const g=c[f];a.set(g,e);e+=g.length}b.v=[a];return a};function ud(a,b){return{qe:a,te:b}}
var vd=ud(function(a,b,c){if(0!==a.o)return!1;a=Dc(a.j);gc(b,c,a);return!0},function(a,b,c){b=ac(b,c);null!=b&&null!=b&&(Mc(a.j,8*c),Nc(a.j,b))}),wd=ud(function(a,b,c,d,e){if(2!==a.o)return!1;Pb(b);const f=lc(b,d,c,void 0,!1,!1);d=new d;b=cc(b,c,2,void 0,!1);f.push(d);b.push(d.Ja);d.hc()&&Cb(b,8);Jc(a,d,e);return!0},function(a,b,c,d,e){b=mc(b,d,c);if(null!=b)for(d=0;d<b.length;d++){const f=Qc(a,c);e(b[d],a);Rc(a,f)}}),xd=ud(function(a,b,c,d,e,f){if(2!==a.o)return!1;(f=ic(b,f))&&f!==c&&(Pb(b),bc(b,
f,void 0,!1));Pb(b);f=ac(b,c);d=kc(Rb(f,d,!0));f!==d&&bc(b,c,d);Jc(a,d,e);return!0},function(a,b,c,d,e){b=jc(b,d,c);null!=b&&(c=Qc(a,c),e(b,a),Rc(a,c))}),yd=ud(function(a,b,c){if(2!==a.o)return!1;const d=Dc(a.j)>>>0;a=Ec(a.j,d);hc(b,c,a);return!0},function(a,b,c){b=dc(b,c);null!=b&&(b=yc(b).buffer,Mc(a.j,8*c+2),Mc(a.j,b.length),Pc(a,a.j.end()),Pc(a,b))}),zd=ud(function(a,b,c){if(0!==a.o)return!1;a=Dc(a.j);gc(b,c,a);return!0},function(a,b,c){b=ac(b,c);null!=b&&(b=parseInt(b,10),Mc(a.j,8*c),Nc(a.j,
b))}),Ad=ud(function(a,b,c){if(0!==a.o)return!1;a=Dc(a.j)>>>0;gc(b,c,a>>>1^-(a&1));return!0},function(a,b,c){b=ac(b,c);null!=b&&null!=b&&(Mc(a.j,8*c),Mc(a.j,(b<<1^b>>31)>>>0))});function Bd(a){if(!a.v){a.v=!0;for(const b of a.U)b()}}class Cd{constructor(a){this.H=a;this.v=!1;this.U=[]}o(){}};class Dd extends Cd{constructor(a){super(a);this.j=new Image}o(){if(this.j.src)return Promise.resolve(this.j);let a;const b=new Promise(d=>a=d),c=()=>{Bd(this);a(this.j)};this.j.crossOrigin="Anonymous";this.j.decode?(this.j.src=this.H,this.j.decode().then(c,()=>{this.j.removeAttribute("crossOrigin");this.j.src=this.H;this.j.decode().then(c,()=>{c()})})):(this.j.onload=c,this.j.onerror=()=>{this.j.removeAttribute("crossOrigin");this.j.removeAttribute("onerror");this.j.src=this.j.src},this.j.src=this.H);
(this.j.complete||"complete"==this.j.readyState)&&c();return b}};function Ma(a,b){return a.j["number"===typeof b?b:b[0]]}function Ed(){var a=Fd.mb();const b=Ma(a,0);return(new Promise(c=>{b.v?c():b.U.push(c);b.o()})).then(()=>{})}function Gd(a,b,c,d){var e=Hd,f=b[1],g=b[2];const h=b[3],k=b[4];let m,p,q,t,A,E;m=f;p=g;q=h;t=k;A=h;E=k;if(m<f){var y=f-m;m=f;q-=y;c+=y;A-=y}p<g&&(y=g-p,p=g,t-=y,d+=y,E-=y);m+q>f+h&&(f=m+q-(f+h),q-=f,A-=f);p+t>g+k&&(g=p+t-(g+k),t-=g,E-=g);b=Ma(e,b);if(!b.v)throw Error("u");0<q&&0<t&&a.drawImage(b.j,m,p,q,t,c,d,A,E)}
var Jd=class{constructor(){var a=Id;this.j=[];this.o=[];for(const c of a){a=new Dd(""+c.filename);var b=c.size;this.j.push(a);this.o.push(b)}}Xd(a){return a[3]}Re(a){return a[1]}Se(a){return a[2]}getSize(a){return{width:a[3],height:a[4]}}};class Fd extends Jd{}la(Fd);
var Id=[{filename:"main-sprite.png",size:[1473,1657]}],Kd=[0,0,164,320,31],Ld=[0,323,164,320,20],Md=[0,646,164,320,20],Nd=[0,1017,0,320,180],Od=[0,1418,1629,20,20],Pd=[0,306,1631,20,20],Qd=[0,329,1631,20,20],Rd=[0,352,1632,20,20],Sd=[0,375,1632,20,20],Td=[0,398,1632,20,20],Ud=[0,421,1632,20,20],Vd=[0,444,1632,20,20],Wd=[0,306,628,16,16],Xd=[0,357,656,16,16],Yd=[0,1456,665,16,16],Zd=[0,536,1632,19,19],$d=[0,138,1632,19,19],ae=[0,160,1632,19,19],be=[0,1153,1634,19,19],ce=[0,1175,1634,19,19],de=[0,1197,
1634,19,19],ee=[0,1219,1634,19,19],fe=[0,1241,1634,19,19],ge=[0,969,164,20,16],he=[0,992,164,20,16],ie=[0,1440,456,20,16],je=[0,1454,0,17,16],ke=[0,306,590,17,16],le=[0,306,609,17,16],me=[0,1326,1635,19,19],ne=[0,1348,1635,19,19],oe=[0,1370,1635,19,19],pe=[0,1392,1635,19,19],qe=[0,969,1636,19,19],re=[0,991,1636,19,19],se=[0,1441,1636,19,19],te=[0,911,1638,19,19],ue=[0,1448,798,22,22],ve=[0,1450,823,22,22],we=[0,1450,848,22,22],xe=[0,561,685,16,16],ye=[0,1456,684,16,16],ze=[0,1456,703,16,16],Ae=[0,
1456,722,16,16],Be=[0,467,1632,20,16],Ce=[0,490,1632,20,16],De=[0,513,1632,20,16],Ee=[0,1428,1211,21,21],Fe=[0,1428,1235,21,21],Ge=[0,1428,1259,21,21],He=[0,1428,1283,21,21],Ie=[0,969,738,16,16],Je=[0,765,739,16,16],Ke=[0,1456,741,16,16],Le=[0,765,758,16,16],Me=[0,1071,774,16,16],Ne=[0,918,789,16,16],Oe=[0,1428,1061,22,22],Pe=[0,1428,1086,22,22],Qe=[0,1428,1111,22,22],Re=[0,1428,1136,22,22],Se=[0,1428,1161,22,22],Te=[0,1428,1186,22,22],Ue=[0,865,518,78,93],Ve=[0,1447,98,8,8],We=[0,959,187,6,8],Xe=
[0,172,519,66,31],Ye=[0,959,198,5,8],Ze=[0,946,521,66,31],$e=[0,959,209,5,8],af=[0,1015,521,66,31],bf=[0,959,220,5,8],cf=[0,241,523,66,31],df=[0,311,226,5,8],ef=[0,310,523,66,31],ff=[0,959,231,5,8],gf=[0,357,793,48,48],hf=[0,867,942,48,48],jf=[0,663,1402,48,48],kf=[0,714,1402,48,48],lf=[0,153,1405,48,48],mf=[0,357,1405,48,48],nf=[0,408,1405,48,48],of=[0,459,1405,48,48],pf=[0,510,1405,48,48],qf=[0,1020,1422,48,48],rf=[0,1071,1422,48,48],sf=[0,1122,1425,48,48],tf=[0,306,1427,48,48],uf=[0,1173,1430,
48,48],vf=[0,1224,1430,48,48],wf=[0,918,1434,48,48],xf=[0,1103,477,96,48],yf=[0,532,586,48,96],zf=[0,561,1435,48,48],Af=[0,204,1436,48,48],Bf=[0,1275,1436,48,48],Cf=[0,1326,1436,48,48],Df=[0,1377,1436,48,48],Ef=[0,969,1437,48,48],Ff=[0,0,1440,48,48],Gf=[0,184,1628,16,16],Hf=[0,102,1440,48,48],If=[0,765,1442,48,48],Jf=[0,510,1558,48,48],Kf=[0,561,1588,48,48],Lf=[0,198,331,9,17],Mf=[0,198,351,9,17],Nf=[0,198,371,9,17],Of=[0,747,187,209,130],Pf=[0,1301,501,83,62],Qf=[0,1387,501,83,62],Rf=[0,0,505,83,
62],Sf=[0,86,505,83,62],Tf=[0,693,518,83,62],Uf=[0,779,518,83,62],Vf=[0,969,183,238,161],Wf=[0,323,187,209,135],Xf=[0,998,497,87,21],Yf=[0,535,187,209,135],Zf=[0,1408,390,49,30],$f=[0,631,523,49,30],ag=[0,1210,528,49,30],bg=[0,172,553,49,30],cg=[0,946,555,49,30],dg=[0,998,555,49,30],eg=[0,631,556,49,30],fg=[0,224,557,49,30],gg=[0,276,557,49,30],hg=[0,1210,561,49,30],ig=[0,1262,566,49,30],jg=[0,1314,566,49,30],kg=[0,1447,23,22,22],lg=[0,1447,48,22,22],mg=[0,1447,73,22,22],ng=[0,905,419,22,22],og=[0,
836,583,22,22],pg=[0,1448,773,22,22],qg=[0,1440,308,11,12],rg=[0,707,325,36,26],sg=[0,707,354,36,26],tg=[0,707,383,36,26],ug=[0,1340,23,104,26],vg=[0,1340,52,104,26],wg=[0,1340,81,104,26],xg=[0,1103,446,36,26],yg=[0,634,642,36,26],zg=[0,787,682,36,26],Ag=[0,1210,183,227,141],Bg=[0,1394,477,65,20],F=[0,1340,0,111,20],Cg=[0,0,198,209,130],Dg=[0,1439,110,30,30],Eg=[0,92,1616,20,20],Fg=[0,773,1618,20,20],Gg=[0,1015,1626,20,20],Hg=[0,1084,1626,20,20],Ig=[0,888,1628,20,20],Jg=[0,658,1629,20,20],Kg=[0,727,
1629,20,20],Lg=[0,1107,1629,20,20],Mg=[0,1130,1629,20,20],Ng=[0,0,0,1014,161],Og=[[0,816,1034,48,48],[0,51,1083,48,48],[0,102,1083,48,48],[0,765,1085,48,48],[0,816,1085,48,48]],Pg=[[0,663,1147,48,48],[0,714,1147,48,48],[0,153,1150,48,48],[0,357,1150,48,48],[0,408,1150,48,48]];function G(){var a=Qg;if(1===a)return Rg;if(2===a)return Sg;if(5===a)return Tg;if(3===a)return Ug;if(4===a)return Vg;throw Error("v");}function H(a){return{frames:[a],Mf:9999,loop:!0}}function I(a,b,c,d){return{frames:a,Mf:b,loop:c,offset:d}}
const Tg={Pc:I([[0,938,687,48,48],[0,1099,708,48,48],[0,1150,708,48,48]],200,!0),tb:{T:H([0,1201,711,48,48]),N:H([0,1193,762,48,48])},vb:{T:H([0,1252,716,48,48]),N:H([0,1295,767,48,48])},Gb:{T:H([0,1040,723,48,48]),N:I([[0,255,773,48,48],[0,1346,773,48,48]],300,!0)},Hb:{T:H([0,0,726,48,48]),N:H([0,663,790,48,48])},key:{T:H([0,51,726,48,48]),N:H([0,714,790,48,48])},lock:{T:H([0,102,726,48,48]),N:H([0,153,793,48,48])},Nb:{T:H([0,889,738,48,48]),N:H([0,561,823,48,48])},ub:{T:H([0,357,742,48,48]),N:H([0,
0,828,48,48])},Fd:{T:H([0,408,742,48,48]),N:H([0,51,828,48,48])},Na:{T:H([0,663,739,48,48]),N:H([0,1348,824,48,48])},Pb:{T:H([0,459,742,48,48]),N:H([0,102,828,48,48])},Ld:{T:H([0,510,742,48,48]),N:I([[0,765,830,48,48],[0,816,830,48,48]],150,!0)},Lb:{T:H([0,1340,110,96,48]),N:H([0,1143,426,96,48])},Mb:{T:H([0,1366,566,48,96]),N:H([0,1417,566,48,96])},hb:{T:H([0,306,713,48,48]),ob:H([0,306,764,48,48]),Kb:H([0,1244,767,48,48])},Ya:{T:H([0,612,739,48,48]),ob:H([0,204,824,48,48]),Kb:H([0,255,824,48,48])},
yd:{T:H([0,1303,716,48,48]),N:I([[0,102,777,48,48],[0,765,779,48,48]],150,!0)},Ec:{T:H([0,989,720,48,48]),N:H([0,940,771,48,48]),Ca:I([[0,561,772,48,48],[0,940,771,48,48]],150,!0)},yb:{T:H([0,561,721,48,48]),Ca:H([0,204,773,48,48])},Ab:{T:H([0,204,722,48,48]),Ca:I([[0,1397,773,48,48],[0,991,774,48,48],[0,1397,773,48,48],[0,0,777,48,48]],150,!0)},Bb:{T:H([0,1354,722,48,48]),Ca:I([[0,816,779,48,48],[0,867,789,48,48]],150,!0)},xd:{T:H([0,255,722,48,48]),N:H([0,51,777,48,48])},Vc:H([0,1091,759,48,48]),
Wc:H([0,1142,759,48,48]),Ta:{T:H([0,1405,722,48,48]),Ta:H([0,612,790,48,48]),Jd:H([0,1297,824,48,48])},blink:{ud:H([0,153,742,48,48]),rd:H([0,714,739,48,48]),Na:H([0,969,825,48,48]),Xc:H([0,1399,824,48,48])},Ia:{T:H([0,787,728,48,48]),N:H(gf),Tb:H(gf),Ca:I([[0,357,793,48,48],[0,459,793,48,48]],100,!0),Pa:H([0,408,793,48,48]),Cb:H([0,408,793,48,48]),nb:H([0,459,793,48,48]),Qb:I([[0,510,793,48,48],[0,1042,810,48,48]],100,!0),Ib:H(gf),Db:H(gf),Jb:H(gf),Ob:I([[0,212,198,96,96],[0,212,297,96,96],[0,747,
320,96,96],[0,846,320,96,96],[0,311,325,96,96]],41,!1,new C(-24,-24))},Qa:{T:H([0,838,728,48,48]),N:H([0,357,793,48,48]),lc:I([[0,306,815,48,48],[0,1195,818,48,48]],100,!0),mc:I([[0,1246,818,48,48],[0,918,822,48,48]],100,!0),kc:I([[0,1093,810,48,48],[0,1144,813,48,48]],100,!0),nc:I([[0,510,793,48,48],[0,1042,810,48,48]],100,!0)}},Ug={Pc:I([[0,867,840,48,48],[0,612,841,48,48]],200,!0),tb:{T:H([0,663,841,48,48]),N:I([[0,714,892,48,48],[0,153,895,48,48]],150,!0)},vb:{T:H([0,153,844,48,48]),N:I([[0,408,
895,48,48],[0,459,895,48,48],[0,510,895,48,48],[0,1020,912,48,48],[0,1071,912,48,48]],150,!0)},Gb:{T:H([0,306,866,48,48]),N:I([[0,918,924,48,48],[0,561,925,48,48]],300,!0)},Hb:{T:H([0,1173,869,48,48]),N:H([0,102,930,48,48])},key:{T:H([0,1224,869,48,48]),N:H([0,765,932,48,48])},lock:{T:H([0,918,873,48,48]),N:H([0,816,932,48,48])},Nb:{T:H([0,255,875,48,48]),N:H([0,765,983,48,48])},ub:{T:H([0,0,879,48,48]),N:H([0,357,997,48,48])},Fd:{T:H([0,51,879,48,48]),N:H([0,408,997,48,48])},Na:{T:H([0,1326,875,
48,48]),N:H([0,663,994,48,48])},Pb:{T:H([0,102,879,48,48]),N:H([0,459,997,48,48])},Ld:{T:H([0,765,881,48,48]),N:I([[0,510,997,48,48],[0,1020,1014,48,48],[0,1071,1014,48,48]],300,!0)},Lb:{T:H([0,1242,426,96,48]),N:H([0,1341,426,96,48])},Mb:{T:H([0,0,570,48,96]),N:H([0,51,570,48,96])},hb:{T:H([0,714,841,48,48]),ob:H([0,714,841,48,48]),Kb:H([0,357,895,48,48])},Ya:{T:H([0,1275,875,48,48]),ob:H([0,816,983,48,48]),Kb:H([0,867,993,48,48])},yd:{T:H([0,357,844,48,48]),N:I([[0,1326,926,48,48],[0,1377,926,48,
48]],150,!0)},Ec:{T:H([0,408,844,48,48]),N:H([0,1122,915,48,48]),Ca:I([[0,1122,915,48,48],[0,306,917,48,48]],150,!0)},yb:{T:H([0,459,844,48,48]),Ca:I([[0,1173,920,48,48],[0,1224,920,48,48]],150,!0)},Ab:{T:H([0,510,844,48,48]),Ca:I([[0,204,926,48,48],[0,255,926,48,48]],150,!0)},Bb:{T:H([0,1071,861,48,48]),Ca:I([[0,969,927,48,48],[0,0,930,48,48]],150,!0)},xd:{T:H([0,1020,861,48,48]),N:H([0,1275,926,48,48])},Vc:I([[0,816,881,48,48],[0,867,891,48,48]],150,!0),Wc:I([[0,612,892,48,48],[0,663,892,48,48]],
150,!0),Ta:{T:H([0,1122,864,48,48]),Ta:H([0,51,930,48,48]),Jd:H([0,612,994,48,48])},blink:{ud:H([0,969,876,48,48]),rd:H([0,1377,875,48,48]),Na:H([0,153,997,48,48]),Xc:H([0,714,994,48,48])},Ia:{T:H(hf),N:I([hf,[0,867,942,48,48]],150,!0),Tb:I([[0,1224,971,48,48],[0,1224,971,48,48]],150,!0),Ca:I([[0,918,975,48,48],[0,867,942,48,48]],100,!0),Pa:I([[0,357,946,48,48],[0,357,946,48,48],[0,357,946,48,48],[0,357,946,48,48]],41.6,!1),Cb:I([[0,612,943,48,48],[0,612,943,48,48],[0,612,943,48,48]],41.6,!1),nb:I([[0,
153,946,48,48],[0,153,946,48,48]],41.6,!1),Qb:I([[0,561,976,48,48],[0,1224,971,48,48]],100,!0),Ib:I([[0,408,946,48,48],[0,408,946,48,48],[0,408,946,48,48],[0,408,946,48,48]],100,!0),Db:I([[0,663,943,48,48],[0,663,943,48,48],[0,663,943,48,48]],100,!0),Jb:I([[0,714,943,48,48],[0,714,943,48,48]],100,!0),Ob:I([[0,459,946,48,48],[0,510,946,48,48],[0,1020,963,48,48],[0,1071,963,48,48],[0,1122,966,48,48],[0,306,968,48,48],[0,1173,971,48,48],[0,306,968,48,48],[0,1173,971,48,48],[0,1173,971,48,48]],41,!1)},
Qa:{T:H([0,204,875,48,48]),N:I([[0,204,977,48,48],[0,204,977,48,48]],150,!0),lc:I([[0,1326,977,48,48],[0,1377,977,48,48]],100,!0),mc:I([[0,969,978,48,48],[0,0,981,48,48]],100,!0),kc:I([[0,255,977,48,48],[0,1275,977,48,48]],100,!0),nc:I([[0,51,981,48,48],[0,102,981,48,48]],100,!0)}},Vg={Pc:I([[0,1122,1017,48,48],[0,306,1019,48,48],[0,1173,1022,48,48],[0,1224,1022,48,48],[0,918,1026,48,48]],200,!0),tb:{T:H([0,561,1027,48,48]),N:H([0,561,1027,48,48])},vb:{T:H([0,255,1028,48,48]),N:I([[0,255,1028,48,
48],[0,1173,1073,48,48],[0,1224,1073,48,48],[0,1173,1073,48,48]],150,!0)},Gb:{T:H([0,0,1032,48,48]),N:I([[0,0,1032,48,48],[0,255,1079,48,48],[0,1275,1079,48,48],[0,1326,1079,48,48],[0,1377,1079,48,48]],300,!0)},Hb:{T:H([0,51,1032,48,48]),N:H([0,51,1032,48,48])},key:{T:H([0,102,1032,48,48]),N:H([0,102,1032,48,48])},lock:{T:H([0,765,1034,48,48]),N:H([0,765,1034,48,48])},Nb:{T:H([0,612,1045,48,48]),N:H([0,612,1045,48,48])},ub:{T:H([0,408,1048,48,48]),N:H([0,408,1048,48,48])},Fd:{T:H([0,459,1048,48,48]),
N:H([0,459,1048,48,48])},Na:{T:H([0,714,1045,48,48]),N:H([0,714,1045,48,48])},Pb:{T:H([0,510,1048,48,48]),N:H([0,510,1048,48,48])},Ld:{T:H([0,1020,1065,48,48]),N:I([[0,1020,1065,48,48],[0,816,1187,48,48],[0,867,1197,48,48],[0,612,1198,48,48],[0,663,1198,48,48]],150,!0)},Lb:{T:H([0,0,430,96,48]),N:H([0,99,430,96,48])},Mb:{T:H([0,683,583,48,96]),N:H([0,379,586,48,96])},hb:{T:H([0,204,1028,48,48]),ob:H([0,204,1028,48,48]),Kb:H([0,306,1070,48,48])},Ya:{T:H([0,663,1045,48,48]),ob:H([0,663,1045,48,48]),
Kb:H([0,102,1185,48,48])},yd:{T:H([0,1275,1028,48,48]),N:I([[0,1275,1028,48,48],[0,969,1080,48,48],[0,0,1083,48,48],[0,969,1080,48,48],[0,1275,1028,48,48]],150,!0)},Ec:{T:H([0,1326,1028,48,48]),N:H([0,1326,1028,48,48]),Ca:I([[0,1326,1028,48,48],[0,918,1077,48,48],[0,561,1078,48,48],[0,204,1079,48,48]],150,!0)},yb:{T:H([0,997,588,48,72]),Ca:I([[0,997,588,48,72],[0,583,589,48,72],[0,204,590,48,72],[0,255,590,48,72],[0,1048,591,48,72]],150,!0)},Ab:{T:H([0,1099,591,48,57]),Ca:I([[0,1099,591,48,57],[0,
1150,591,48,57],[0,1201,594,48,57],[0,1252,599,48,57],[0,1303,599,48,57]],150,!0)},Bb:{T:H([0,102,570,48,96]),Ca:I([[0,102,570,48,96],[0,734,583,48,96],[0,785,583,48,96],[0,153,586,48,96],[0,328,557,48,96]],150,!0)},xd:{T:H([0,1377,1028,48,48]),N:H([0,1377,1028,48,48])},Vc:H([0,1071,1065,48,48]),Wc:H([0,1122,1068,48,48]),Ta:{T:H([0,969,1029,48,48]),Ta:H([0,969,1029,48,48]),Jd:H([0,765,1187,48,48])},blink:{ud:H([0,357,1048,48,48]),rd:H([0,153,1048,48,48]),Na:H([0,357,1048,48,48]),Xc:H([0,153,1048,
48,48])},Ia:{T:H([0,816,1034,48,48]),N:I(Og,150,!0),Tb:I(Og,150,!0),Ca:I([[0,102,1134,48,48],[0,765,1136,48,48],[0,816,1136,48,48],[0,867,1146,48,48],[0,612,1147,48,48]],100,!0),Pa:I([[0,1071,1116,48,48],[0,1122,1119,48,48],[0,306,1121,48,48],[0,1173,1124,48,48],[0,1224,1124,48,48]],41.6,!1),Cb:I([[0,867,1095,48,48],[0,612,1096,48,48],[0,663,1096,48,48],[0,714,1096,48,48],[0,153,1099,48,48]],41.6,!1),nb:I([[0,816,1034,48,48],[0,816,1034,48,48]],41.6,!1),Qb:I(Pg,100,!0),Ib:I([[0,918,1128,48,48],[0,
561,1129,48,48],[0,204,1130,48,48],[0,255,1130,48,48],[0,1275,1130,48,48]],100,!0),Db:I([[0,357,1099,48,48],[0,408,1099,48,48],[0,459,1099,48,48],[0,510,1099,48,48],[0,1020,1116,48,48]],100,!0),Jb:I(Pg,100,!0),Ob:I([[0,1326,1130,48,48],[0,1377,1130,48,48],[0,969,1131,48,48],[0,0,1134,48,48],[0,51,1134,48,48],[0,816,1085,48,48]],41,!1)},Qa:{T:H([0,867,1044,48,48]),N:I([[0,867,1044,48,48],[0,459,1150,48,48],[0,510,1150,48,48],[0,1020,1167,48,48],[0,1071,1167,48,48]],150,!0),lc:I([[0,918,1179,48,48],
[0,561,1180,48,48],[0,204,1181,48,48],[0,561,1180,48,48],[0,918,1179,48,48]],100,!0),mc:I([[0,867,1044,48,48],[0,255,1181,48,48],[0,1275,1181,48,48],[0,1326,1181,48,48],[0,867,1044,48,48]],100,!0),kc:I([[0,1122,1170,48,48],[0,306,1172,48,48],[0,1173,1175,48,48],[0,1224,1175,48,48],[0,1122,1170,48,48]],100,!0),nc:I([[0,1377,1181,48,48],[0,969,1182,48,48],[0,0,1185,48,48],[0,51,1185,48,48],[0,1377,1181,48,48]],100,!0)}},Sg={Pc:I([[0,714,1198,48,48],[0,153,1201,48,48],[0,357,1201,48,48],[0,408,1201,
48,48]],200,!0),tb:{T:H([0,459,1201,48,48]),N:H([0,408,1252,48,48])},vb:{T:H([0,1020,1218,48,48]),N:H([0,1020,1269,48,48])},Gb:{T:H([0,204,1232,48,48]),N:I([[0,255,1283,48,48],[0,1275,1283,48,48],[0,1326,1283,48,48],[0,1377,1283,48,48]],300,!0)},Hb:{T:H([0,255,1232,48,48]),N:H([0,459,1303,48,48])},key:{T:H([0,1275,1232,48,48]),N:H([0,510,1303,48,48])},lock:{T:H([0,1326,1232,48,48]),N:H([0,1020,1320,48,48])},Nb:{T:H([0,0,1236,48,48]),N:I([[0,306,1376,48,48],[0,1173,1379,48,48],[0,1224,1379,48,48],
[0,918,1383,48,48]],300,!0)},ub:{T:H([0,867,1248,48,48]),N:H([0,969,1386,48,48])},Fd:{T:H([0,612,1249,48,48]),N:H([0,0,1389,48,48])},Na:{T:H([0,102,1236,48,48]),N:H([0,1275,1385,48,48])},Pb:{T:H([0,663,1249,48,48]),N:H([0,51,1389,48,48])},Ld:{T:H([0,714,1249,48,48]),N:I([[0,102,1389,48,48],[0,765,1391,48,48],[0,816,1391,48,48]],300,!0)},Lb:{T:H([0,905,446,96,48]),N:H([0,1004,446,96,48])},Mb:{T:H([0,430,586,48,96]),N:H([0,481,586,48,96])},hb:{T:H([0,510,1201,48,48]),ob:H([0,459,1252,48,48]),Kb:H([0,
510,1252,48,48])},Ya:{T:H([0,51,1236,48,48]),ob:H([0,561,1384,48,48]),Kb:H([0,204,1385,48,48])},yd:{T:H([0,1071,1218,48,48]),N:I([[0,816,1289,48,48],[0,867,1299,48,48],[0,612,1300,48,48],[0,816,1289,48,48]],150,!0)},Ec:{T:H([0,1122,1221,48,48]),N:H([0,1071,1269,48,48]),Ca:I([[0,1122,1272,48,48],[0,306,1274,48,48],[0,1122,1272,48,48],[0,1173,1277,48,48]],150,!0)},yb:{T:H([0,306,1223,48,48]),Ca:I([[0,1224,1277,48,48],[0,918,1281,48,48],[0,561,1282,48,48],[0,204,1283,48,48]],150,!0)},Ab:{T:H([0,1173,
1226,48,48]),Ca:I([[0,969,1284,48,48],[0,0,1287,48,48],[0,51,1287,48,48],[0,102,1287,48,48]],150,!0)},Bb:{T:H([0,918,1230,48,48]),Ca:I([[0,663,1300,48,48],[0,714,1300,48,48],[0,153,1303,48,48],[0,357,1303,48,48]],150,!0)},xd:{T:H([0,1224,1226,48,48]),N:H([0,765,1289,48,48])},Vc:H([0,153,1252,48,48]),Wc:H([0,357,1252,48,48]),Ta:{T:H([0,561,1231,48,48]),Ta:H([0,408,1303,48,48]),Jd:H([0,255,1385,48,48])},blink:{ud:H([0,816,1238,48,48]),rd:H([0,765,1238,48,48]),Na:H([0,1377,1385,48,48]),Xc:H([0,1326,
1385,48,48])},Ia:{T:H([0,1377,1232,48,48]),N:I([[0,1122,1323,48,48],[0,306,1325,48,48]],200,!0),Tb:I([[0,1173,1328,48,48],[0,1224,1328,48,48]],200,!0),Ca:I([[0,918,1332,48,48],[0,561,1333,48,48],[0,204,1334,48,48],[0,255,1334,48,48]],100,!0),Pa:I([[0,997,663,48,54],[0,1354,665,48,54],[0,1405,665,48,54],[0,836,614,48,54]],41.6,!1),Cb:I([[0,836,614,48,54],[0,887,614,48,54],[0,1099,651,48,54]],41.6,!1),nb:I([[0,1252,659,48,54],[0,1303,659,48,54],[0,997,663,48,54]],41.6,!1),Qb:I([[0,1275,1334,48,48],
[0,1326,1334,48,48],[0,1377,1334,48,48],[0,969,1335,48,48]],100,!0),Ib:I([[0,255,665,48,54],[0,1048,666,48,54],[0,0,669,48,54],[0,1150,651,48,54]],100,!0),Db:I([[0,1150,651,48,54],[0,1201,654,48,54],[0,306,656,48,54]],100,!0),Jb:I([[0,583,664,48,54],[0,204,665,48,54],[0,255,665,48,54]],100,!0),Ob:I([[0,410,325,96,96],[0,509,325,96,96],[0,608,325,96,96],[0,1210,327,96,96],[0,1309,327,96,96],[0,0,331,96,96],[0,99,331,96,96],[0,945,347,96,96]],41,!1,new C(-24,-24))},Qa:{T:H([0,969,1233,48,48]),N:H([0,
0,1338,48,48]),lc:I([[0,867,1350,48,48],[0,612,1351,48,48],[0,663,1351,48,48],[0,714,1351,48,48]],100,!0),mc:I([[0,153,1354,48,48],[0,357,1354,48,48],[0,408,1354,48,48],[0,459,1354,48,48]],100,!0),kc:I([[0,51,1338,48,48],[0,102,1338,48,48],[0,765,1340,48,48],[0,816,1340,48,48]],100,!0),nc:I([[0,510,1354,48,48],[0,1020,1371,48,48],[0,1071,1371,48,48],[0,1122,1374,48,48]],100,!0)}},Rg={Pc:I([[0,867,1401,48,48],[0,612,1402,48,48]],200,!0),tb:{T:H(jf),N:H([0,612,1453,48,48])},vb:{T:H(lf),N:H([0,153,1456,
48,48])},Gb:{T:H(tf),N:I([[0,306,1478,48,48],[0,1173,1481,48,48],[0,306,1478,48,48],[0,1224,1481,48,48]],300,!0)},Hb:{T:H(uf),N:H([0,867,1503,48,48])},key:{T:H(vf),N:H([0,612,1504,48,48])},lock:{T:H(wf),N:H([0,663,1504,48,48])},Nb:{T:H([0,255,1436,48,48]),N:H(Jf)},ub:{T:H(Ff),N:H([0,918,1587,48,48])},Fd:{T:H([0,51,1440,48,48]),N:H(Kf)},Na:{T:H(Cf),N:H([0,306,1580,48,48])},Pb:{T:H(Hf),N:H([0,204,1589,48,48])},Ld:{T:H(If),N:I([[0,255,1589,48,48],[0,1275,1589,48,48]],600,!0)},Lb:{T:H(xf),N:H([0,1202,
477,96,48])},Mb:{T:H(yf),N:H([0,946,588,48,96])},hb:{T:H(kf),ob:H([0,663,1453,48,48]),Kb:H([0,714,1453,48,48])},Ya:{T:H(Bf),ob:H([0,1020,1575,48,48]),Kb:H([0,1071,1575,48,48])},yd:{T:H(mf),N:I([[0,1326,1487,48,48],[0,1377,1487,48,48],[0,969,1488,48,48],[0,1326,1487,48,48]],150,!0)},Ec:{T:H(nf),N:H([0,357,1456,48,48]),Ca:I([[0,408,1456,48,48],[0,459,1456,48,48],[0,408,1456,48,48],[0,459,1456,48,48]],150,!0)},yb:{T:H(of),Ca:I([[0,510,1456,48,48],[0,1020,1473,48,48],[0,1071,1473,48,48],[0,1122,1476,
48,48]],150,!0)},Ab:{T:H(pf),Ca:I([[0,918,1485,48,48],[0,561,1486,48,48],[0,204,1487,48,48],[0,255,1487,48,48]],150,!0)},Bb:{T:H(rf),Ca:I([[0,0,1491,48,48],[0,51,1491,48,48],[0,102,1491,48,48],[0,765,1493,48,48]],150,!0)},xd:{T:H(qf),N:H([0,1275,1487,48,48])},Vc:H([0,816,1442,48,48]),Wc:H([0,867,1452,48,48]),Ta:{T:H(sf),Ta:H([0,816,1493,48,48]),Jd:H([0,1122,1578,48,48])},blink:{ud:H(Ef),rd:H(Df),Na:H([0,1224,1583,48,48]),Xc:H([0,1173,1583,48,48])},Ia:{T:H(zf),N:H([0,714,1504,48,48]),Tb:H([0,306,1529,
48,48]),Ca:I([[0,1173,1532,48,48],[0,1224,1532,48,48],[0,918,1536,48,48],[0,561,1537,48,48]],100,!0),Pa:I([[0,153,1507,48,48],[0,357,1507,48,48],[0,408,1507,48,48],[0,459,1507,48,48]],41.6,!1),Cb:I([[0,51,669,48,54],[0,102,669,48,54],[0,836,671,48,54]],41.6,!1),nb:I([[0,736,682,48,54],[0,153,685,48,54],[0,357,685,48,54]],41.6,!1),Qb:I([[0,204,1538,48,48],[0,255,1538,48,48],[0,1275,1538,48,48],[0,1326,1538,48,48]],100,!0),Ib:I([[0,510,1507,48,48],[0,1020,1524,48,48],[0,1071,1524,48,48],[0,1122,1527,
48,48]],100,!0),Db:I([[0,887,671,48,54],[0,634,682,48,54],[0,685,682,48,54]],100,!0),Jb:I([[0,408,685,48,54],[0,459,685,48,54],[0,510,685,48,54]],100,!0),Ob:I([[0,1044,347,96,96],[0,198,396,96,96],[0,707,419,96,96],[0,806,419,96,96],[0,297,424,96,96],[0,396,424,96,96],[0,495,424,96,96],[0,594,424,96,96]],41,!1,new C(-24,-24))},Qa:{T:H(Af),N:H([0,1377,1538,48,48]),lc:I([[0,765,1544,48,48],[0,816,1544,48,48],[0,867,1554,48,48],[0,612,1555,48,48]],100,!0),mc:I([[0,663,1555,48,48],[0,714,1555,48,48],
[0,153,1558,48,48],[0,357,1558,48,48]],100,!0),kc:I([[0,969,1539,48,48],[0,0,1542,48,48],[0,51,1542,48,48],[0,102,1542,48,48]],100,!0),nc:I([[0,255,1538,48,48],[0,1326,1538,48,48],[0,408,1558,48,48],[0,459,1558,48,48]],100,!0)}};function Wg(){this.ha=this.ha}Wg.prototype.ha=!1;function Xg(a,b){this.type=a;this.j=this.target=b;this.defaultPrevented=!1}Xg.prototype.preventDefault=function(){this.defaultPrevented=!0};var Yg=function(){if(!ka.addEventListener||!Object.defineProperty)return!1;var a=!1,b=Object.defineProperty({},"passive",{get:function(){a=!0}});try{ka.addEventListener("test",()=>{},b),ka.removeEventListener("test",()=>{},b)}catch(c){}return a}();function Zg(a,b){Xg.call(this,a?a.type:"");this.relatedTarget=this.j=this.target=null;this.button=this.screenY=this.screenX=this.clientY=this.clientX=0;this.key="";this.keyCode=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.state=null;this.pointerId=0;this.pointerType="";this.o=null;if(a){var c=this.type=a.type,d=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement;this.j=b;if(b=a.relatedTarget){if(jb){a:{try{hb(b.nodeName);var e=!0;
break a}catch(f){}e=!1}e||(b=null)}}else"mouseover"==c?b=a.fromElement:"mouseout"==c&&(b=a.toElement);this.relatedTarget=b;d?(this.clientX=void 0!==d.clientX?d.clientX:d.pageX,this.clientY=void 0!==d.clientY?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=void 0!==a.clientX?a.clientX:a.pageX,this.clientY=void 0!==a.clientY?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0);this.button=a.button;this.keyCode=a.keyCode||0;this.key=a.key||"";this.ctrlKey=
a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.pointerId=a.pointerId||0;this.pointerType="string"===typeof a.pointerType?a.pointerType:$g[a.pointerType]||"";this.state=a.state;this.o=a;a.defaultPrevented&&Zg.Vf.preventDefault.call(this)}}ra(Zg,Xg);var $g={2:"touch",3:"pen",4:"mouse"};Zg.prototype.preventDefault=function(){Zg.Vf.preventDefault.call(this);var a=this.o;a.preventDefault?a.preventDefault():a.returnValue=!1};var ah="closure_listenable_"+(1E6*Math.random()|0);function bh(a){return!(!a||!a[ah])};var ch=0;function dh(a,b,c,d,e){this.listener=a;this.proxy=null;this.src=b;this.type=c;this.capture=!!d;this.Yd=e;this.key=++ch;this.Id=this.Sd=!1}function eh(a){a.Id=!0;a.listener=null;a.proxy=null;a.src=null;a.Yd=null};const fh="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function gh(a,b){let c,d;for(let e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(let f=0;f<fh.length;f++)c=fh[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};function hh(a){this.src=a;this.j={};this.o=0}hh.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.j[f];a||(a=this.j[f]=[],this.o++);var g=ih(a,b,d,e);-1<g?(b=a[g],c||(b.Sd=!1)):(b=new dh(b,this.src,f,!!d,e),b.Sd=c,a.push(b));return b};function jh(a,b){var c=b.type;if(!(c in a.j))return!1;var d=a.j[c];const e=fb(d,b);let f;(f=0<=e)&&Array.prototype.splice.call(d,e,1);f&&(eh(b),0==a.j[c].length&&(delete a.j[c],a.o--));return f}
function ih(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.Id&&f.listener==b&&f.capture==!!c&&f.Yd==d)return e}return-1};var kh="closure_lm_"+(1E6*Math.random()|0),lh={},mh=0;function nh(a,b,c,d,e){if(d&&d.once)return oh(a,b,c,d,e);if(Array.isArray(b)){for(var f=0;f<b.length;f++)nh(a,b[f],c,d,e);return null}c=ph(c);return bh(a)?qh(a,b,c,ma(d)?!!d.capture:!!d,e):rh(a,b,c,!1,d,e)}
function rh(a,b,c,d,e,f){if(!b)throw Error("w");var g=ma(e)?!!e.capture:!!e,h=sh(a);h||(a[kh]=h=new hh(a));c=h.add(b,c,d,g,f);if(c.proxy)return c;d=th();c.proxy=d;d.src=a;d.listener=c;if(a.addEventListener)Yg||(e=g),void 0===e&&(e=!1),a.addEventListener(b.toString(),d,e);else if(a.attachEvent)a.attachEvent(uh(b.toString()),d);else if(a.addListener&&a.removeListener)a.addListener(d);else throw Error("x");mh++;return c}
function th(){function a(c){return b.call(a.src,a.listener,c)}const b=vh;return a}function oh(a,b,c,d,e){if(Array.isArray(b)){for(var f=0;f<b.length;f++)oh(a,b[f],c,d,e);return null}c=ph(c);return bh(a)?a.tc.add(String(b),c,!0,ma(d)?!!d.capture:!!d,e):rh(a,b,c,!0,d,e)}
function wh(a,b,c,d,e){if(Array.isArray(b))for(var f=0;f<b.length;f++)wh(a,b[f],c,d,e);else(d=ma(d)?!!d.capture:!!d,c=ph(c),bh(a))?(a=a.tc,b=String(b).toString(),b in a.j&&(f=a.j[b],c=ih(f,c,d,e),-1<c&&(eh(f[c]),Array.prototype.splice.call(f,c,1),0==f.length&&(delete a.j[b],a.o--)))):a&&(a=sh(a))&&(b=a.j[b.toString()],a=-1,b&&(a=ih(b,c,d,e)),(c=-1<a?b[a]:null)&&xh(c))}
function xh(a){if("number"===typeof a||!a||a.Id)return!1;var b=a.src;if(bh(b))return jh(b.tc,a);var c=a.type,d=a.proxy;b.removeEventListener?b.removeEventListener(c,d,a.capture):b.detachEvent?b.detachEvent(uh(c),d):b.addListener&&b.removeListener&&b.removeListener(d);mh--;(c=sh(b))?(jh(c,a),0==c.o&&(c.src=null,b[kh]=null)):eh(a);return!0}function uh(a){return a in lh?lh[a]:lh[a]="on"+a}
function vh(a,b){if(a.Id)a=!0;else{b=new Zg(b,this);var c=a.listener,d=a.Yd||a.src;a.Sd&&xh(a);a=c.call(d,b)}return a}function sh(a){a=a[kh];return a instanceof hh?a:null}var yh="__closure_events_fn_"+(1E9*Math.random()>>>0);function ph(a){if("function"===typeof a)return a;a[yh]||(a[yh]=function(b){return a.handleEvent(b)});return a[yh]};function zh(){Wg.call(this);this.tc=new hh(this);this.Ma=this}ra(zh,Wg);zh.prototype[ah]=!0;zh.prototype.addEventListener=function(a,b,c,d){nh(this,a,b,c,d)};zh.prototype.removeEventListener=function(a,b,c,d){wh(this,a,b,c,d)};function Ah(a,b){a=a.Ma;var c=b.type||b;if("string"===typeof b)b=new Xg(b,a);else if(b instanceof Xg)b.target=b.target||a;else{var d=b;b=new Xg(c,a);gh(b,d)}a=b.j=a;Bh(a,c,!0,b);Bh(a,c,!1,b)}function qh(a,b,c,d,e){return a.tc.add(String(b),c,!1,d,e)}
function Bh(a,b,c,d){if(b=a.tc.j[String(b)]){b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.Id&&g.capture==c){var h=g.listener,k=g.Yd||g.src;g.Sd&&jh(a.tc,g);e=!1!==h.call(k,d)&&e}}}};function Ch(){}Ch.prototype.j=null;Ch.prototype.getOptions=function(){var a;(a=this.j)||(a={},Dh(this)&&(a[0]=!0,a[1]=!0),a=this.j=a);return a};var Eh;function Fh(){}ra(Fh,Ch);function Gh(a){return(a=Dh(a))?new ActiveXObject(a):new XMLHttpRequest}function Dh(a){if(!a.o&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){const b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"];for(let c=0;c<b.length;c++){const d=b[c];try{return new ActiveXObject(d),a.o=d}catch(e){}}throw Error("y");}return a.o}Eh=new Fh;var Hh;function Ih(){if(void 0===Hh){var a=null,b=ka.trustedTypes;if(b&&b.createPolicy){try{a=b.createPolicy("goog#html",{createHTML:sa,createScript:sa,createScriptURL:sa})}catch(c){ka.console&&ka.console.error(c.message)}Hh=a}else Hh=a}return Hh};function Jh(a,b){this.o=a===Kh&&b||"";this.v=Lh}Jh.prototype.uc=!0;Jh.prototype.j=function(){return this.o};function Mh(a){return a instanceof Jh&&a.constructor===Jh&&a.v===Lh?a.o:"type_error:Const"}var Lh={},Kh={};const Nh={};class Oh{constructor(a,b){this.o=b===Nh?a:"";this.uc=!0}toString(){return this.o.toString()}j(){return this.o.toString()}};var Qh=class{constructor(a,b){this.o=b===Ph?a:""}toString(){return this.o+""}};Qh.prototype.uc=!0;Qh.prototype.j=function(){return this.o.toString()};function Rh(a){return a instanceof Qh&&a.constructor===Qh?a.o:"type_error:TrustedResourceUrl"}
function Sh(){var a={},b=Mh(new Jh(Kh,"//google-doodles.appspot.com/?"));if(!Th.test(b))throw Error("z`"+b);var c=b.replace(Uh,function(d,e){if(!Object.prototype.hasOwnProperty.call(a,e))throw Error("A`"+e+"`"+b+"`"+JSON.stringify(a));d=a[e];return d instanceof Jh?Mh(d):encodeURIComponent(String(d))});return Vh(c)}var Uh=/%{(\w+)}/g,Th=RegExp("^((https:)?//[0-9a-z.:[\\]-]+/|/[^/\\\\]|[^:/\\\\%]+/|[^:/\\\\%]*[?#]|about:blank#)","i"),Wh=/^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/;
function Xh(a){var b=Sh();b=Wh.exec(Rh(b).toString());var c=b[3]||"";return Vh(b[1]+Yh("?",b[2]||"",a)+Yh("#",c))}var Ph={};function Vh(a){const b=Ih();a=b?b.createScriptURL(a):a;return new Qh(a,Ph)}
function Yh(a,b,c){if(null==c)return b;if("string"===typeof c)return c?a+encodeURIComponent(c):"";for(var d in c)if(Object.prototype.hasOwnProperty.call(c,d)){var e=c[d];e=Array.isArray(e)?e:[e];for(var f=0;f<e.length;f++){var g=e[f];null!=g&&(b||(b=a),b+=(b.length>a.length?"&":"")+encodeURIComponent(d)+"="+encodeURIComponent(String(g)))}}return b};var $h=class{constructor(a,b){this.o=b===Zh?a:""}toString(){return this.o.toString()}};$h.prototype.uc=!0;$h.prototype.j=function(){return this.o.toString()};function ai(a){return a instanceof $h&&a.constructor===$h?a.o:"type_error:SafeUrl"}var bi=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,Zh={},ci=new $h("about:invalid#zClosurez",Zh);const di={};class ei{constructor(a,b){this.o=b===di?a:"";this.uc=!0}j(){return this.o}toString(){return this.o.toString()}};const fi={};function gi(a){return a instanceof hi&&a.constructor===hi?a.o:"type_error:SafeHtml"}function ii(a){a instanceof hi||(a="object"==typeof a&&a.uc?a.j():String(a),cb.test(a)&&(-1!=a.indexOf("&")&&(a=a.replace(Xa,"&amp;")),-1!=a.indexOf("<")&&(a=a.replace(Ya,"&lt;")),-1!=a.indexOf(">")&&(a=a.replace(Za,"&gt;")),-1!=a.indexOf('"')&&(a=a.replace($a,"&quot;")),-1!=a.indexOf("'")&&(a=a.replace(ab,"&#39;")),-1!=a.indexOf("\x00")&&(a=a.replace(bb,"&#0;"))),a=ji(a));return a}
function ji(a){const b=Ih();a=b?b.createHTML(a):a;return new hi(a,fi)}function ki(a){const b=ii(li),c=[],d=e=>{Array.isArray(e)?e.forEach(d):(e=ii(e),c.push(gi(e).toString()))};a.forEach(d);return ji(c.join(gi(b).toString()))}function mi(a){return ki(Array.prototype.slice.call(arguments))}class hi{constructor(a,b){this.o=b===fi?a:"";this.uc=!0}j(){return this.o.toString()}toString(){return this.o.toString()}}var li=new hi(ka.trustedTypes&&ka.trustedTypes.emptyHTML||"",fi),ni=ji("<br>");var oi=function(a){let b=!1,c;return function(){b||(c=a(),b=!0);return c}}(function(){var a=document.createElement("div"),b=document.createElement("div");b.appendChild(document.createElement("div"));a.appendChild(b);b=a.firstChild.firstChild;a.innerHTML=gi(li);return!b.parentElement});function pi(a,b){if(oi())for(;a.lastChild;)a.removeChild(a.lastChild);a.innerHTML=gi(b)}
function qi(a){a instanceof $h||a instanceof $h||(a="object"==typeof a&&a.uc?a.j():String(a),bi.test(a)||(a="about:invalid#zClosurez"),a=new $h(a,Zh));ka.open(ai(a),"")};function ri(a){return String(a).replace(/\-([a-z])/g,function(b,c){return c.toUpperCase()})};function si(a,b,c){return a+c*(b-a)};function ti(a,b){b=String(b);"application/xhtml+xml"===a.contentType&&(b=b.toLowerCase());return a.createElement(b)}function ui(){this.j=ka.document||document}ui.prototype.createElement=function(a){return ti(this.j,a)};function vi(a,b,c){if("function"===typeof a)c&&(a=qa(a,c));else if(a&&"function"==typeof a.handleEvent)a=qa(a.handleEvent,a);else throw Error("C");return 2147483647<Number(b)?-1:ka.setTimeout(a,b||0)};var wi=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function xi(a,b){if(a){a=a.split("&");for(var c=0;c<a.length;c++){var d=a[c].indexOf("="),e=null;if(0<=d){var f=a[c].substring(0,d);e=a[c].substring(d+1)}else f=a[c];b(f,e?decodeURIComponent(e.replace(/\+/g," ")):"")}}};function yi(a){zh.call(this);this.headers=new Map;this.W=a||null;this.o=!1;this.V=this.j=null;this.Da="";this.v=this.va=this.H=this.ta=!1;this.Va=0;this.U=null;this.Ka="";this.ab=this.Ha=!1}ra(yi,zh);var zi=/^https?$/i,Ai=["POST","PUT"];
function Bi(a,b){if(a.j)throw Error("D`"+a.Da+"`"+b);a.Da=b;a.ta=!1;a.o=!0;a.j=a.W?Gh(a.W):Gh(Eh);a.V=a.W?a.W.getOptions():Eh.getOptions();a.j.onreadystatechange=qa(a.Of,a);try{a.va=!0,a.j.open("GET",String(b),!0),a.va=!1}catch(e){Ci(a);return}b=new Map(a.headers);const c=Array.from(b.keys()).find(e=>"content-type"==e.toLowerCase()),d=ka.FormData&&!1;!(0<=fb(Ai,"GET"))||c||d||b.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const [e,f]of b)a.j.setRequestHeader(e,f);a.Ka&&
(a.j.responseType=a.Ka);"withCredentials"in a.j&&a.j.withCredentials!==a.Ha&&(a.j.withCredentials=a.Ha);try{Di(a),0<a.Va&&(a.ab=Ei(a.j),a.ab?(a.j.timeout=a.Va,a.j.ontimeout=qa(a.Wf,a)):a.U=vi(a.Wf,a.Va,a)),a.H=!0,a.j.send(""),a.H=!1}catch(e){Ci(a)}}function Ei(a){return ib&&"number"===typeof a.timeout&&void 0!==a.ontimeout}aa=yi.prototype;aa.Wf=function(){"undefined"!=typeof ja&&this.j&&(Ah(this,"timeout"),this.abort(8))};function Ci(a){a.o=!1;a.j&&(a.v=!0,a.j.abort(),a.v=!1);Fi(a);Gi(a)}
function Fi(a){a.ta||(a.ta=!0,Ah(a,"complete"),Ah(a,"error"))}aa.abort=function(){this.j&&this.o&&(this.o=!1,this.v=!0,this.j.abort(),this.v=!1,Ah(this,"complete"),Ah(this,"abort"),Gi(this))};aa.Of=function(){this.ha||(this.va||this.H||this.v?Hi(this):this.Yg())};aa.Yg=function(){Hi(this)};
function Hi(a){if(a.o&&"undefined"!=typeof ja&&(!a.V[1]||4!=(a.j?a.j.readyState:0)||2!=Ii(a)))if(a.H&&4==(a.j?a.j.readyState:0))vi(a.Of,0,a);else if(Ah(a,"readystatechange"),4==(a.j?a.j.readyState:0)){a.o=!1;try{const f=Ii(a);a:switch(f){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var b=!0;break a;default:b=!1}var c;if(!(c=b)){var d;if(d=0===f){var e=String(a.Da).match(wi)[1]||null;!e&&ka.self&&ka.self.location&&(e=ka.self.location.protocol.slice(0,-1));d=!zi.test(e?e.toLowerCase():
"")}c=d}c?(Ah(a,"complete"),Ah(a,"success")):Fi(a)}finally{Gi(a)}}}function Gi(a){if(a.j){Di(a);const b=a.j,c=a.V[0]?()=>{}:null;a.j=null;a.V=null;Ah(a,"ready");try{b.onreadystatechange=c}catch(d){}}}function Di(a){a.j&&a.ab&&(a.j.ontimeout=null);a.U&&(ka.clearTimeout(a.U),a.U=null)}aa.isActive=function(){return!!this.j};function Ii(a){try{return 2<(a.j?a.j.readyState:0)?a.j.status:-1}catch(b){return-1}};function Ji(a){if(a.j&&"running"==a.j.state&&!a.H){a.H=!0;for(let b=0;b<a.ta.length;b++)a.ta[b]()}}function Ki(a){a.j&&(null==a.v?Li(a):void 0===a.v.playbackState?Li(a):a.v.playbackState!==a.v.PLAYING_STATE&&a.v.playbackState!==a.v.FINISHED_STATE&&Li(a))}
function Mi(a,b){if(Ni&&!a.j){a.j=new (window.AudioContext||window.webkitAudioContext);a.o=a.j.createGain();a.o.connect(a.j.destination);for(let c in a.W)a.W[c].j=a.j;for(let c in a.U)Oi(a.U[c],a.j,a.o);a.j.onstatechange=()=>{Ji(a)};Ji(a);Ki(a);oh(b,"click pointerup mousedown mouseup touchstart touchend".split(" "),()=>{a.j&&(a.j.resume(),Ki(a))},!0)}}function Pi(a){var b=Qi;b.ta.push(a);b.H&&a()}
function Li(a){if(a.j){a.v=a.j.createBufferSource();var b=a.j.createBuffer(1,1,22050);a.v.buffer=b;a.v.connect(a.j.destination);a.v.start(0);for(const c of a.Da)c()}}function Ri(){var a=Si.mb();a.va=.55;!a.ha&&a.o&&a.j&&a.o.gain.setValueAtTime(a.va,a.j.currentTime)}
class Ti{constructor(){var a=J;this.W=K;this.U=a;this.j=null;this.Da=[];this.o=null;this.va=1;this.H=this.V=this.ha=!1;this.ta=[];this.v=null}destroy(){this.j&&(this.j.close(),this.j=null)}reset(){for(let a in this.W)this.W[a].U=[];for(let a in this.U)Ui(this.U[a])}isMuted(){return this.ha&&!!this.o&&0==this.o.gain.value}}var Ni=!(!window.AudioContext&&!window.webkitAudioContext)&&!!window.GainNode;function Oi(a,b,c){a.j=b;a.H=c}
function Ui(a,b){Vi(a);if(void 0!==b&&a.j){if(a.o[b]){try{a.o[b].node.stop(0)}catch(d){}var c=(1E3*a.j.currentTime-a.o[b].Rf)%a.V;delete a.o[b];return[c]}return[]}b=[];for(c in a.o)b=b.concat(Ui(a,c));return b}function Wi(a,b){return!b.Xg&&null!==a.j&&1E3*a.j.currentTime>b.Rf+a.V}function Vi(a){if(a.j)for(const b in a.o)Wi(a,a.o[b])&&delete a.o[b]}
function Xi(a,b=0,c=!1){if(a.j&&a.H){Vi(a);var d=void 0===d?a.j.currentTime+b/1E3:d;if(!e){var e=a.j.createBufferSource();e.playbackRate.setValueAtTime(1,a.j.currentTime)}!a.U&&a.j&&a.j.createGain&&(a.U=a.j.createGain());a.v&&e.connect(a.v);a.U?(a.v?a.v.connect(a.U):e.connect(a.U),a.U.connect(a.H)):a.v?a.v.connect(a.H):e.connect(a.H);a.v=null;e.loop=c;try{e.buffer=a.ha.buffer}catch(g){return}b=a.W/1E3;var f=a.V/1E3/e.playbackRate.value;c?(e.loopStart=b,e.loopEnd=b+f,e.start(d,b)):e.start(d,b,f);b=
a.va++;a.o[b]={node:e,Rf:1E3*d,Xg:c}}}function Yi(a){for(const b in a.o){const c=a.o[b];if(c&&!Wi(a,c))return!0}return!1}var L=class{constructor(a,b,c,d){this.ha=a;this.W=b;this.V=c;this.ta=d;this.o={};this.v=this.H=this.j=this.U=null;this.va=0}clone(){const a=new L(this.ha,this.W,this.V,this.ta);Oi(a,this.j,this.H);return a}};const Zi=document.createElement("audio");
var $i="function"===typeof Zi.canPlayType&&""!=Zi.canPlayType("audio/mpeg")?".mp3":".ogg",aj=class extends Cd{constructor(a){super(""+a+$i);this.j=this.buffer=null;this.V=0}o(){const a=new Promise(c=>{this.v?c():this.U.push(c)});if(0!=this.V)return Promise.resolve();if(!this.j)return Promise.reject(Error("F"));const b=new XMLHttpRequest;b.open("GET",this.H,!0);b.responseType="arraybuffer";b.onload=()=>{const c=d=>{d&&(this.buffer=d,this.V=3,Bd(this))};this.j&&this.j.decodeAudioData(b.response,
c);this.V=2};b.send();this.V=1;return a}};class Si extends Ti{}var K={};K.Ba=new aj("sfx");K.Sb=new aj("music");var J={};J.ue=new L(K.Sb,0,29090.90625,0);J.Yf=new L(K.Ba,0,1055.760009765625,0);J.Zf=new L(K.Ba,2055.760009765625,706.1220092773438,0);J.we=new L(K.Ba,3761.882080078125,733.1519775390625,0);J.ih=new L(K.Ba,5495.0341796875,717.4829711914062,0);J.dg=new L(K.Ba,7212.51708984375,1327.845947265625,0);J.fg=new L(K.Ba,9540.36328125,1454.5350341796875,0);J.hg=new L(K.Ba,11994.8984375,1424.7850341796875,0);
J.jh=new L(K.Ba,14419.6826171875,1018.4349975585938,0);J.mh=new L(K.Ba,16438.1171875,1857.4150390625,0);J.ig=new L(K.Ba,19295.533203125,1134.89794921875,0);J.jg=new L(K.Ba,21430.431640625,1957.052001953125,0);J.nh=new L(K.Ba,24387.482421875,983.8779907226562,0);J.oh=new L(K.Ba,26371.361328125,703.968017578125,0);J.xe=new L(K.Ba,28075.328125,492.26800537109375,0);J.lg=new L(K.Ba,29567.595703125,681.0880126953125,0);J.og=new L(K.Ba,31248.685546875,559.614990234375,0);
J.qg=new L(K.Ba,32808.30078125,1430.4539794921875,0);J.rg=new L(K.Ba,35238.75390625,466.82501220703125,0);J.qh=new L(K.Ba,36705.578125,2213.01611328125,0);J.rh=new L(K.Ba,39918.59375,623.968017578125,0);J.sh=new L(K.Ba,41542.5625,546.14501953125,0);J.Lc=new L(K.Ba,43088.70703125,341.156005859375,0);J.kd=new L(K.Ba,44429.86328125,4704.30810546875,0);J.vg=new L(K.Ba,50134.171875,363.6050109863281,0);J.uh=new L(K.Ba,51497.77734375,457.8680114746094,0);
J.ef=new L(K.Ba,52955.64453125,390.5220031738281,0);J.Mc=new L(K.Ba,56885.8515625,1261.3609619140625,0);J.wh=new L(K.Ba,54346.16796875,1539.6829833984375,0);J.wg=new L(K.Ba,59147.2109375,878.322021484375,0);J.xh=new L(K.Ba,61025.53125,607.4829711914062,0);J.xg=new L(K.Ba,62633.015625,725.6920166015625,0);J.yg=new L(K.Ba,64358.70703125,1333.197021484375,0);J.ff=new L(K.Ba,66691.90625,682.31298828125,0);J.qf=new L(K.Sb,30090.90625,21333.33203125,0);J.rf=new L(K.Sb,52424.23828125,21333.33203125,0);
J.sf=new L(K.Sb,74757.5703125,43636.37109375,0);J.tf=new L(K.Sb,119393.9453125,37333.33203125,0);J.uf=new L(K.Sb,157727.28125,37966.1015625,0);J.vf=new L(K.Sb,196693.375,35368.4140625,0);J.ze=new L(K.Sb,233061.796875,35368.4140625,0);J.Ig=new L(K.Sb,269430.21875,4736.87109375,0);la(Si);var bj="en af sq am ar hy az eu be bn bs bg my ca zh-HK zh-CN zh-TW hr cs da nl en-GB et fa fil fi fr fr-CA gl ka de el gu iw hi hu is id it ja kn kk km ko ky lo lv lt mk ms ml mr mn ne no pl pt-BR pt-PT pa ro ru sr si sk sl es-419 es sw sv ta te th tr uk ur uz vi zu".split(" ");var cj=class extends u{constructor(a,b,c=!1){super();this.o=a;this.v=b;this.j=c}},dj=class extends u{constructor(){super(...arguments);this.Og=80}},ej=class extends u{},fj=class extends u{constructor(){super(...arguments);this.j=0}},gj=class extends u{};var hj=class extends u{},ij=class extends u{},jj=class extends u{constructor(){super(...arguments);this.destination=new C(0,0);this.Pf=!1}},kj=class extends u{},lj=class extends u{},mj=class extends u{},nj=class extends u{constructor(){super(...arguments);this.o=!1;this.j=[]}},oj=class extends u{constructor(a=!1){super();this.Yc=a}};var pj=class extends u{},qj=class extends u{},rj=class extends u{},sj=class extends u{},tj=class extends u{},uj=class extends u{},vj=class extends u{},wj=class extends u{constructor(){super(...arguments);this.j=this.Td=this.Vb=0}};let Qg=1;function xj(a){if(1===a)return ff;if(2===a)return df;if(5===a)return Ye;if(3===a)return $e;if(4===a)return bf;throw Error("G");}function yj(a){if(1===a)return ef;if(2===a)return cf;if(5===a)return Xe;if(3===a)return Ze;if(4===a)return af;throw Error("H");}function zj(a){if(1===a)return"#e0e0e0";if(2===a)return"#c9e6eb";if(5===a)return"#333";if(3===a)return"#d4f7e3";if(4===a)return"#f4d9f0";throw Error("I");}
function Aj(a){if(1===a)return"#8dffa3";if(2===a)return"#bbf5ff";if(5===a)return"#000";if(3===a)return"#afebc8";if(4===a)return"#fbe7f8";throw Error("I");}function Bj(a){if(1===a)return"#8dffa3";if(2===a)return"#bbf5ff";if(5===a)return"#000";if(3===a)return"#8dd0b1";if(4===a)return"#fbe7f8";throw Error("I");}function Cj(){Dj();1===Qg?Xi(J.ze,0,!0):2===Qg?Xi(J.vf,0,!0):5===Qg?Xi(J.sf,0,!0):3===Qg?Xi(J.tf,0,!0):4===Qg&&Xi(J.uf,0,!0)}function Dj(){Ui(J.ze);Ui(J.vf);Ui(J.sf);Ui(J.tf);Ui(J.uf)};var Ej=class extends u{},N=class extends u{constructor(){super(...arguments);this.o=!1;this.bc=!0;this.Te=this.j=!1;this.state=4}},Fj=class extends u{constructor(){super(...arguments);this.bc=!0}},Gj=class extends u{constructor(){super(...arguments);this.speed=.1}},Hj=class extends u{constructor(){super(...arguments);this.speed=.1}},Ij=class extends u{constructor(a,b,c=!1){super();this.position=a;this.o=b;this.j=c}},Jj=class extends u{constructor(){super(...arguments);this.Gf=!0}},Kj=class extends u{constructor(){super(...arguments);
this.j=0;this.Wb=!1}},Lj=class extends u{constructor(){super(...arguments);this.Ue=!1}},Mj=class extends u{constructor(){super(...arguments);this.N=Ua(G().Ia.N);this.Tb=Ua(G().Ia.Tb);this.Ob=Ua(G().Ia.Ob);this.Ca=Ua(G().Ia.Ca);this.Pa=Ua(G().Ia.Pa);this.Cb=Ua(G().Ia.Cb);this.nb=Ua(G().Ia.nb);this.Qb=Ua(G().Ia.Qb);this.Ib=Ua(G().Ia.Ib);this.Db=Ua(G().Ia.Db);this.Jb=Ua(G().Ia.Jb)}},Nj=class extends u{constructor(){super(...arguments);this.Ob=Ua(G().Ia.Ob);this.lc=Ua(G().Qa.lc);this.mc=Ua(G().Qa.mc);
this.kc=Ua(G().Qa.kc);this.nc=Ua(G().Qa.nc)}};var Oj=class extends u{constructor(a,b){super();this.j=a;this.o=b}},Pj=class extends u{constructor(a){super();this.position=a}};var Sj=a=>{let b=new Image;b.onerror=b.onload=b.onabort=()=>{delete Qj[Rj]};Qj[Rj]=b;b.src=`${""}/gen_204?atyp=i&ct=${"doodle"}&cad=${a}&zx=${Date.now()}`;Rj++};let Qj=[],Rj=0;function Tj(a){this.U=this.ha=this.H="";this.W=null;this.V=this.v="";this.o=!1;var b;a instanceof Tj?(this.o=a.o,Uj(this,a.H),this.ha=a.ha,this.U=a.U,Vj(this,a.W),this.v=a.v,Wj(this,a.j.clone()),this.V=a.V):a&&(b=String(a).match(wi))?(this.o=!1,Uj(this,b[1]||"",!0),this.ha=Xj(b[2]||""),this.U=Xj(b[3]||"",!0),Vj(this,b[4]),this.v=Xj(b[5]||"",!0),Wj(this,b[6]||"",!0),this.V=Xj(b[7]||"")):(this.o=!1,this.j=new Yj(null,this.o))}
Tj.prototype.toString=function(){var a=[],b=this.H;b&&a.push(Zj(b,ak,!0),":");var c=this.U;if(c||"file"==b)a.push("//"),(b=this.ha)&&a.push(Zj(b,ak,!0),"@"),a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.W,null!=c&&a.push(":",String(c));if(c=this.v)this.U&&"/"!=c.charAt(0)&&a.push("/"),a.push(Zj(c,"/"==c.charAt(0)?bk:ck,!0));(c=this.j.toString())&&a.push("?",c);(c=this.V)&&a.push("#",Zj(c,dk));return a.join("")};Tj.prototype.clone=function(){return new Tj(this)};
function Uj(a,b,c){a.H=c?Xj(b,!0):b;a.H&&(a.H=a.H.replace(/:$/,""))}function Vj(a,b){if(b){b=Number(b);if(isNaN(b)||0>b)throw Error("K`"+b);a.W=b}else a.W=null}function Wj(a,b,c){b instanceof Yj?(a.j=b,ek(a.j,a.o)):(c||(b=Zj(b,fk)),a.j=new Yj(b,a.o))}function Xj(a,b){return a?b?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Zj(a,b,c){return"string"===typeof a?(a=encodeURI(a).replace(b,gk),c&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}
function gk(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var ak=/[#\/\?@]/g,ck=/[#\?:]/g,bk=/[#\?]/g,fk=/[#\?@]/g,dk=/#/g;function Yj(a,b){this.o=this.j=null;this.v=a||null;this.H=!!b}function hk(a){a.j||(a.j=new Map,a.o=0,a.v&&xi(a.v,function(b,c){a.add(decodeURIComponent(b.replace(/\+/g," ")),c)}))}aa=Yj.prototype;aa.add=function(a,b){hk(this);this.v=null;a=ik(this,a);var c=this.j.get(a);c||this.j.set(a,c=[]);c.push(b);this.o+=1;return this};
function jk(a,b){hk(a);b=ik(a,b);a.j.has(b)&&(a.v=null,a.o-=a.j.get(b).length,a.j.delete(b))}aa.Jf=function(){hk(this);return 0==this.o};function kk(a,b){hk(a);b=ik(a,b);return a.j.has(b)}aa.forEach=function(a,b){hk(this);this.j.forEach(function(c,d){c.forEach(function(e){a.call(b,e,d,this)},this)},this)};function lk(a,b){hk(a);let c=[];if("string"===typeof b)kk(a,b)&&(c=c.concat(a.j.get(ik(a,b))));else for(a=Array.from(a.j.values()),b=0;b<a.length;b++)c=c.concat(a[b]);return c}
aa.set=function(a,b){hk(this);this.v=null;a=ik(this,a);kk(this,a)&&(this.o-=this.j.get(a).length);this.j.set(a,[b]);this.o+=1;return this};aa.get=function(a,b){if(!a)return b;a=lk(this,a);return 0<a.length?String(a[0]):b};
aa.toString=function(){if(this.v)return this.v;if(!this.j)return"";const a=[],b=Array.from(this.j.keys());for(var c=0;c<b.length;c++){var d=b[c];const f=encodeURIComponent(String(d)),g=lk(this,d);for(d=0;d<g.length;d++){var e=f;""!==g[d]&&(e+="="+encodeURIComponent(String(g[d])));a.push(e)}}return this.v=a.join("&")};aa.clone=function(){var a=new Yj;a.v=this.v;this.j&&(a.j=new Map(this.j),a.o=this.o);return a};function ik(a,b){b=String(b);a.H&&(b=b.toLowerCase());return b}
function ek(a,b){b&&!a.H&&(hk(a),a.v=null,a.j.forEach(function(c,d){var e=d.toLowerCase();if(d!=e&&(jk(this,d),jk(this,e),0<c.length)){this.v=null;d=this.j;var f=d.set;e=ik(this,e);var g=c.length;if(0<g){const h=Array(g);for(let k=0;k<g;k++)h[k]=c[k];g=h}else g=[];f.call(d,e,g);this.o+=c.length}},a));a.H=b};var mk=navigator.userAgent,nk=new Tj(location.href),ok=()=>"MacIntel"===navigator.platform&&1<navigator.maxTouchPoints,pk=()=>mk.includes("iPad")||mk.includes("iPhone")||mk.includes("iPod")||ok();const qk=()=>mk.toLowerCase().includes("gsa")||mk.includes("GoogleApp");var rk=()=>pk()||mk.includes("Android")||mk.includes("Mobile")||mk.includes("Silk")||mk.includes("UCBrowser")||mk.includes("UCWEB"),sk="sdoodles"===document.documentElement.id&&!rk();mk.includes("GT-I9300")&&mk.includes("Chrome");
var tk=()=>nk.v.includes("/logos/")&&nk.v.includes(".html"),uk=()=>{const a=nk.j.get("ntp");return"1"===a||"2"===a},vk=()=>"1"===nk.j.get("fpdoodle")&&!!document.getElementById("fpdoodle"),wk=()=>!!document.querySelector("body#iframedoodle"),xk=()=>(!rk()||ok())&&!sk&&!(document.getElementById("fkbx")||uk())&&!vk()&&!tk(),yk=ok()&&!sk&&!(document.getElementById("fkbx")||uk())&&!vk()&&!tk();var zk=RegExp("^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)","i");/*

 SPDX-License-Identifier: Apache-2.0
*/
var Ak;try{new URL("s://g"),Ak=!0}catch(a){Ak=!1}const Bk=Ak;function Ck(a,b=`unexpected value ${a}!`){throw Error(b);};function Dk(a,b){a.src=Rh(b);var c;let d;(c=(b=null==(d=(c=(a.ownerDocument&&a.ownerDocument.defaultView||window).document).querySelector)?void 0:d.call(c,"script[nonce]"))?b.nonce||b.getAttribute("nonce")||"":"")&&a.setAttribute("nonce",c)};function Ek(a,b,c){b=String(b);let d=c;"inserthtml"===b.toLowerCase()&&(d=gi(c));return a.execCommand(b,!1,d)};class Fk{constructor(a){this.Vg=a}}function Gk(a){return new Fk(b=>b.substr(0,a.length+1).toLowerCase()===a+":")}const Hk=[Gk("data"),Gk("http"),Gk("https"),Gk("mailto"),Gk("ftp"),new Fk(a=>/^[^:]*([/?#]|$)/.test(a))];function Ik(a,b=Hk){for(let c=0;c<b.length;++c){const d=b[c];if(d instanceof Fk&&d.Vg(a))return new $h(a,Zh)}};var Jk=(a,...b)=>{if(a)for(let c=0;c<b.length;c+=2){const d=b[c],e=b[c+1],f=a.style;f&&d in f?f[d]=e:d in a&&(a[d]=e)}},Kk=Date.now,Lk=["Moz","ms","O","webkit"],Mk=(a,b,c)=>{if(a){for(const d of Lk)a.style[d+b]=c;a.style[b.charAt(0).toLowerCase()+b.substr(1)]=c}},Nk=["","moz","ms","o","webkit"],Ok=(a,b)=>{if(!a)return null;for(const d of Nk){var c=b;0<d.length&&(c=b.charAt(0).toUpperCase()+b.substr(1));c=d+c;if("undefined"!=typeof a[c])return c}return null},Qk=()=>{let a=google.doodle?google.doodle.url:
"";a&&Pk(a,!0)},Pk=(a,b)=>{if(b=(b=b&&!(qk()&&pk()))||uk())qi(a);else{b=window.top.location;a=Ik(a,Hk)||ci;if(a instanceof $h)a=ai(a);else{b:if(Bk){try{var c=new URL(a)}catch(d){c="https:";break b}c=c.protocol}else c:{c=document.createElement("a");try{c.href=a}catch(d){c=void 0;break c}c=c.protocol;c=":"===c||""===c?"https:":c}a="javascript:"!==c?a:void 0}void 0!==a&&b.assign(a)}},Rk=()=>window.google&&void 0!==window.google.doodle?window.google.doodle:null,Sk=(a,b)=>{const c=Rk();return c&&void 0!=
c[a]?c[a]:b},Tk=a=>{Rk()||(window.google.doodle={});window.google.doodle.pvc=a},Uk=()=>{const a=Sk("doodle_args",{}).is_dogfood;return null!=a?a:!1},Vk=Sk("hl","en"),Wk=Sk("gl","");zk.test(Vk);var Yk=(a,b,c)=>{const d=Math.max(0,c-230)+(document.querySelector("div.og-pdp")?36:12);Jk(a,"width",`${b}px`,"height",`${c}px`);Xk(d)};
const Xk=a=>{a=`${a}px`;var b=document.getElementById("lga");b&&Jk(b,"marginBottom",a);document.getElementById("fkbx")||uk()||((b=document.getElementById("searchform"))&&Jk(b,"transform","translateY("+a+")"),a=new UIEvent("resize",{bubbles:!1,Ah:!1,view:window,detail:0}),window.dispatchEvent(a))};let Zk=null,$k=null,al=null;
var bl=()=>{al||(window.google&&window.google.kEI&&window.google.kEI.length?al=window.google.kEI:wk()&&kk(nk.j,"ei")&&(al=nk.j.get("ei")));return al},cl=()=>{if(!Zk){const a=document.getElementById("hplogoved");a?Zk=a.getAttribute("data-ved"):wk()&&kk(nk.j,"ved")&&(Zk=nk.j.get("ved"))}return Zk},dl=a=>{const b=new Tj("/");b.j.set("fpdoodle","1");b.j.set("doodle",String(a));Vk&&b.j.set("hl",Vk);Wk&&b.j.set("gl",Wk);Pk(b.toString(),!1)};Fd.mb();var el=Sk("id","207425764"),O=1/3,fl=540-3*Ld[4];var gl=class extends u{constructor(a){super();this.parent=a}},hl=class extends u{constructor(a=[]){super();this.children=a}};function il(a,b){jl(a,b)}function kl(a){return(a=w(a,hl))?a.children:[]}function jl(a,b){const c=w(b,gl),d=b.O!==a.O;d&&ll(b);c&&c.parent!==a&&ml(b);c?c.parent=a:v(b,new gl(a));(w(a,hl)||v(a,new hl)).children.push(b);d&&a.O&&nl(b,a.O)}function ml(a){var b=w(a,gl);b&&(b=b.parent.get(hl).children,b.splice(b.indexOf(a),1))}
function nl(a,b){if(a.O)throw Error("M");Ba(b,a);for(const c of kl(a))nl(c,b)}function ll(a){let b;null==(b=a.O)||z(b,a);for(const c of kl(a))ll(c)};function ol(a){const b=a.scale,c=a.position,d=Math.sin(a.j);a=Math.cos(a.j);return(new Ha).set(b.x*a,b.x*d,-b.y*d,b.y*a,c.x,c.y)}var P=class extends u{constructor(a=new C,b=0,c=new C(1,1)){super();this.position=a;this.j=b;this.scale=c}};
function pl(a){var b=a;for(a=ol(a.get(P));;){b=w(b,gl);if(!b)break;b=b.parent;var c=w(b,P);if(!c)break;var d=a;c=ol(c);const e=c.b*d.a+c.d*d.b,f=c.a*d.c+c.c*d.d,g=c.b*d.c+c.d*d.d,h=c.a*d.e+c.c*d.f+c.e,k=c.b*d.e+c.d*d.f+c.f;d.a=c.a*d.a+c.c*d.b;d.b=e;d.c=f;d.d=g;d.e=h;d.f=k}return a};function ql(a,b,c){if(a<=b&&a>=c||a>=b&&a<=c)return a;if(b<=a&&b>=c||b>=a&&b<=c)return b;if(c<=a&&c>=b||c>=a&&c<=b)return c;throw Error();}function rl(a){return 0<a?1:0>a?-1:0};function sl(a){a.sort((b,c)=>{b=b.get(D);c=c.get(D);return b.j-c.j||b.o-c.o||b.v-c.v})}function tl(a){var b=Ea(a.O.find(Ia),"Can't find camera");a=b.get(P);a.position.x=-a.position.x;a.position.y=-a.position.y;a.j=-a.j;b=pl(b);a.position.x=-a.position.x;a.position.y=-a.position.y;a.j=-a.j;return b}
var ul=class extends Da{constructor(a,b){super(a);this.j=b}H(){const a=this.j;a.save();a.clearRect(0,0,a.canvas.width,a.canvas.height);const b=tl(this);var c=this.O.find(D);sl(c);for(const e of c){var d=e.get(D);a.globalAlpha=d.alpha;a.setTransform(b.a,b.b,b.c,b.d,b.e,b.f);c=pl(e);a.transform(c.a,c.b,c.c,c.d,c.e,c.f);a.translate(d.offset.x,d.offset.y);c=d;d=a;c.Xa instanceof La?(c=c.Xa,this.j.drawImage(c.v,c.o.x,c.o.y,c.j.x,c.j.y,0,0,c.j.x,c.j.y)):c.Xa instanceof Na&&c.Xa.j(d)}a.restore()}},vl=class extends Da{H(a){for(const b of this.O.find(Oa)){const c=
b.get(Oa);let d=c.frames[c.index];if(0>=d.j)throw Error("N");for(c.j+=a;c.j>=d.j;)c.index++,c.index>=c.frames.length&&(c.index=c.loop?0:c.frames.length-1,c.o&&c.o()),c.j-=d.j,d=c.frames[c.index];b.get(D).Xa=d.Xa;b.get(D).offset=c.offset}}};var R=class extends u{constructor(a=new C,b=new C){super();this.size=a;this.offset=b}},S=class extends u{constructor(a=new C,b=0){super();this.wa=a;this.j=new C(0,0);this.o=Math.max(0,Math.min(1,b))}},yl=class extends Da{constructor(a,b){super(a);this.o=b;this.j=new wl}H(a){const b=this.O.find(R);for(var c of b)c.oe=c.get(P).position,c.le=c.get(R);for(const g of this.O.find(S)){c=g.get(S);const h=g.oe,k=g.le;this.j.set(h,k);const m=[];for(const q of b)xl(this.j,q.oe,q.le)&&m.push(q);0<c.o&&(c.wa.x-=
c.wa.x*c.o*a,c.wa.y-=c.wa.y*c.o*a);c.j.x+=c.wa.x*a;c.j.y+=c.wa.y*a;var d=void 0;let p;Math.abs(c.wa.x)>=Math.abs(c.wa.y)?p=d=1<=Math.abs(c.j.x):d=p=1<=Math.abs(c.j.y);for(var e=0,f=0;d&&1<=Math.abs(c.j.x);){const q=rl(c.j.x);if(h.x===e&&q===f)throw Error("O");e=h.x;f=q;h.x+=q;c.j.x-=q;this.j.set(h,k);for(const t of b)t!==g&&t.O===this.O&&-1===m.indexOf(t)&&xl(this.j,t.oe,t.le)&&(this.o(this.O,q,0,g,t),this.j.set(h,k))}for(e=d=0;p&&1<=Math.abs(c.j.y);){f=rl(c.j.y);if(h.y===d&&f===e)throw Error("O");
d=h.y;e=f;h.y+=f;c.j.y-=f;this.j.set(h,k);for(const q of b)q!==g&&q.O===this.O&&-1===m.indexOf(q)&&xl(this.j,q.oe,q.le)&&(this.o(this.O,0,f,g,q),this.j.set(h,k))}}}};function xl(a,b,c){if(!c)return!1;a.j.set(b.x,b.y).add(c.offset);a.H.set(a.j.x,a.j.y).add(c.size);b=a.o;c=a.v;var d=a.j;a=a.H;const e=Math.max(b.x,c.x),f=Math.min(b.y,c.y),g=Math.max(b.y,c.y),h=Math.min(d.x,a.x),k=Math.min(d.y,a.y),m=Math.max(d.y,a.y);return Math.min(b.x,c.x)<Math.max(d.x,a.x)&&h<e&&f<m&&k<g}
class wl{constructor(){this.o=new C(0,0);this.v=new C(0,0);this.j=new C(0,0);this.H=new C(0,0)}set(a,b){this.o.set(a.x,a.y).add(b.offset);this.v.set(this.o.x,this.o.y).add(b.size)}}var zl=class{constructor(){this.j=[]}add(a,b){a:{for(const [d,e]of this.j){var c=e;if(d===a)break a}c=void 0}c||(c=[],this.j.push([a,c]));for(const [d,e]of b)c.push([d,e])}get(a,b){for(const [d,e]of this.j){var c=e;if(w(a,d))for(const [f,g]of c)if(c=g,w(b,f))return c}}};function Al(a,b,c){return new Oj(new D(Ta(b.frames[0]),c),new D(Ta(a.frames[0]),c))}function Bl(a,b,c){a=Al(a,b,c);return 1<b.frames.length?[Ua(b),a]:[a]}function Cl(a,b){return Bl(a.T,a.N,b)}function Dl(a){return Bl(a.T,a.Ca,1)}var T=new Map;T.set(5,(a,b)=>{const c=G();return new x(new P(new C(a,b),0,new C(O,O)),...Cl(c.Na,0),new R(new C(16,16)))});T.set(15,(a,b)=>{const c=G();return new x(new uj,new P(new C(a,b),0,new C(O,O)),...Cl(c.key,0),new R(new C(16,16)))});
T.set(16,(a,b)=>{const c=G();return new x(new ij,new P(new C(a,b),0,new C(O,O)),...Cl(c.lock,0),new R(new C(16,16)))});T.set(22,(a,b)=>{const c=G();return new x(new ej,new P(new C(a,b),0,new C(O,O)),...Cl(c.Gb,0),new R(new C(16,16)))});T.set(24,(a,b)=>{const c=G();return new x(new fj,new P(new C(a,b),0,new C(O,O)),...Cl(c.xd,0),new R(new C(16,16)))});T.set(25,(a,b)=>{const c=G();return new x(new P(new C(a,b),0,new C(O,O)),new nj,...Bl(c.Ya.T,c.Ya.ob,0),new R(new C(16,16)))});
T.set(26,(a,b)=>El(!1,a,b));T.set(27,(a,b)=>El(!0,a,b));function El(a,b,c){const d=G();return new x(new P(new C(b,c),0,new C(O,O)),new oj(a),...Bl(a?d.blink.rd:d.blink.ud,a?d.blink.Xc:d.blink.Na,0),new R(new C(16,16)))}T.set(9,(a,b)=>{const c=G();return new x(new tj,new P(new C(a,b),0,new C(O,O)),...Cl(c.vb,0),new R(new C(16,16)))});T.set(6,(a,b)=>{const c=G();return new x(new qj,new P(new C(a,b),0,new C(O,O)),...Cl(c.ub,0),new R(new C(16,16)))});T.set(10,Fl);
function Fl(a,b){const c=G();return new x(new cj(new C(a,b),Fl),new P(new C(a,b),0,new C(O,O)),new Lj,...Cl(c.yd,1),new R(new C(13,13),new C(2,2)))}T.set(11,Gl);function Gl(a,b){const c=G();return new x(new cj(new C(a,b),Gl),new P(new C(a,b),0,new C(O,O)),new Lj,...Dl(c.Ab),new S(new C(.05,0)),new R(new C(13,13),new C(2,2)))}T.set(12,Hl);
function Hl(a,b){const c=G();return new x(new cj(new C(a,b),Hl),new P(new C(a,b),0,new C(O,O)),new Lj,...Dl(c.Bb),new S(new C(0,.05)),new R(new C(13,13),new C(2,2)))}T.set(18,Il);function Il(a,b){const c=G();return new x(new cj(new C(a,b),Il),new P(new C(a,b),0,new C(O,O)),new Lj,...Dl(c.yb),new R(new C(13,13),new C(2,2)),new S(new C(.0353553,.0353553)))}T.set(19,Jl);
function Jl(a,b){const c=G();return new x(new cj(new C(a,b),Jl),new P(new C(a,b),0,new C(O,O)),new dj,new Lj,...Cl(c.Ec,1),new R(new C(13,13),new C(2,2)),new S(new C(0,0)))}function Kl(a,b){const c=new N,d=new Mj;d.Ob.o=()=>{c.bc=!1};const e=G();return new x(new Ej,new Kj,new Lj,new lj,c,d,d.Ob,new Ij(new C(a,b),Kl),new P(new C(a,b),0,new C(O,O)),new R(new C(9,14),new C(3,2)),new S,Al(e.Ia.T,e.Ia.N,2))}T.set(2,Kl);
function Ll(a,b){const c=G(),d=new Fj,e=Ua(c.Ia.Ob);e.o=()=>{d.bc=!1};return new x(new Ej,new Kj,e,new Nj,d,new Lj,new Ij(new C(a,b),Ll),new P(new C(a,b),0,new C(O,O)),new R(new C(9,13),new C(3,2)),new S,Al(c.Qa.T,c.Qa.N,2))}T.set(8,Ll);T.set(3,(a,b)=>{const c=G();return new x(new Gj,new P(new C(a,b),0,new C(O,O)),new R(new C(32,16)),new S,...Cl(c.Lb,2))});T.set(29,(a,b)=>{const c=G();return new x(new Hj,new P(new C(a,b),0,new C(O,O)),new R(new C(16,32)),new S,...Cl(c.Mb,2))});
T.set(14,(a,b)=>{const c=G();return new x(new hj,new P(new C(a,b),0,new C(O,O)),new R(new C(16,16)),new S(new C(0,0),.03),...Cl(c.Fd,1))});T.set(23,(a,b)=>{const c=G();return new x(new kj,new P(new C(a,b),0,new C(O,O)),new R(new C(16,16)),...Cl(c.Pb,0))});function Ml(a,b){const c=G();return new x(new pj,new lj,new Kj,new Lj,new Ij(new C(a,b),Ml),new P(new C(a,b),0,new C(O,O)),new R(new C(10,10),new C(3,3)),new S(new C(.05,-.05)),...Cl(c.tb,2))}T.set(4,Ml);
T.set(21,(a,b)=>{const c=G();return new x(new rj,new P(new C(a,b),0,new C(O,O)),new R(new C(16,16)),...Bl(c.hb.T,c.hb.ob,0))});T.set(7,(a,b)=>{const c=G();return new x(new sj,new P(new C(a,b),0,new C(O,O)),new R(new C(16,16)),...Cl(c.Hb,0))});T.set(13,(a,b)=>{const c=G();return new x(new mj,new P(new C(a,b),0,new C(O,O)),new R(new C(16,16)),new Lj,new S(new C(0,.05)),...Bl(c.Ta.T,c.Ta.Ta,0))});
T.set(28,(a,b)=>{const c=G();return new x(new P(new C(a,b),0,new C(O,O)),new jj,new R(new C(16,16)),...Cl(c.Nb,0))});T.set(20,(a,b)=>{const c=G();return new x(new P(new C(a,b),0,new C(O,O)),new R(new C(16,16)),new vj,...Cl(c.Ld,0))});var Nl=class extends Error{},Ol=class extends Error{},Pl=class extends Error{},Ql=class extends Error{};
function Rl(a,b,c,d,e){if(-1E3>b||1E3<b||-1E3>c||1E3<c)throw new Ol;if(!T.has(d)&&1!==d&&0!==d)throw new Ql;var f=1===d||0===d;if(2E3<=a.j.size&&!f)throw new Nl;a.o.delete(a.key(b,c));if(f)a.j.delete(a.key(b,c));else if(a.j.set(a.key(b,c),d),28===d){d=a.o;f=d.set;b=a.key(b,c);if(void 0!==e)a=e;else a:{e=new Map;for(const g of a.o.values())e.has(g)?e.set(g,e.get(g)+1):e.set(g,1);for(a=0;99>a;a++)if(e.has(a)){if(2>e.get(a))break a}else break a;throw new Pl;}f.call(d,b,a)}}
function Sl(a){const [b,c]=a.split(",");return[Number(b),Number(c)]}function Tl(a){const b=[];for(const c of a.j.keys()){const d=a.j.get(c),[e,f]=Sl(c);b.push([e,f,d])}b.sort((c,d)=>c[1]-d[1]||c[0]-d[0]);return b}function Ul(a){if(0===a.j.size)a.left=0,a.right=-1,a.top=0,a.bottom=-1;else{a.left=1E3;a.right=-1E3;a.top=1E3;a.bottom=-1E3;for(const b of a.j.keys()){const [c,d]=Sl(b),e=c,f=d;a.left=Math.min(a.left,e);a.right=Math.max(a.right,e);a.top=Math.min(a.top,f);a.bottom=Math.max(a.bottom,f)}}}
function Vl(a,b){if(a.size!==b.size)return!1;for(const [c,d]of b)if(b=d,a.get(c)!==b)return!1;return!0}var Wl=class{constructor(){this.j=new Map;this.o=new Map;this.bottom=this.top=this.right=this.left=0}Uc(a,b){return(a=this.j.get(this.key(a,b)))?a:1}key(a,b){return`${a},${b}`}};function Xl(a){if(1===a)return Yl;if(2===a)return Zl;if(5===a)return $l;if(3===a)return am;if(4===a)return bm;throw Error("v");}
const $l={tb:[0,959,264,4,4],ld:[0,311,270,4,4],nd:[0,959,271,4,4],ub:[0,311,277,4,4],hb:[0,959,278,4,4],vb:[0,311,284,4,4],wd:[0,311,291,4,4],yb:[0,959,292,4,4],Ab:[0,311,298,4,4],vd:[0,959,285,4,4],Bb:[0,959,299,4,4],Ad:[0,311,305,4,4],Gb:[0,959,306,4,4],Bd:[0,1408,327,60,60],Cd:[0,1439,143,30,30],Hb:[0,1454,308,4,4],key:[0,1461,308,4,4],Ed:[0,1468,308,4,4],lock:[0,311,312,4,4],Lb:[0,1458,98,8,4],Mb:[0,311,237,4,8],Ia:[0,1454,315,4,4],Qa:[0,1461,315,4,4],Nb:[0,1468,315,4,4],Gd:[0,1460,390,4,4],
Ya:[0,1467,390,4,4],Hd:[0,297,396,4,4],Na:[0,1460,397,4,4],Pb:[0,1467,397,4,4]},am={tb:[0,297,403,4,4],ld:[0,1460,404,4,4],nd:[0,1467,404,4,4],ub:[0,297,410,4,4],hb:[0,1143,410,4,4],vb:[0,1150,410,4,4],wd:[0,1164,410,4,4],yb:[0,1171,410,4,4],Ab:[0,1178,410,4,4],vd:[0,1157,410,4,4],Bb:[0,1185,410,4,4],Ad:[0,1192,410,4,4],Gb:[0,1199,410,4,4],Bd:[0,379,523,60,60],Cd:[0,1440,209,30,30],Hb:[0,1460,411,4,4],key:[0,1467,411,4,4],Ed:[0,1143,417,4,4],lock:[0,1150,417,4,4],Lb:[0,311,198,8,4],Mb:[0,959,242,
4,8],Ia:[0,1157,417,4,4],Qa:[0,1164,417,4,4],Nb:[0,1171,417,4,4],Gd:[0,1178,417,4,4],Ya:[0,1185,417,4,4],Hd:[0,1192,417,4,4],Na:[0,1199,417,4,4],Pb:[0,930,419,4,4]},bm={tb:[0,937,419,4,4],ld:[0,693,424,4,4],nd:[0,930,426,4,4],ub:[0,937,426,4,4],hb:[0,693,431,4,4],vb:[0,930,433,4,4],wd:[0,693,438,4,4],yb:[0,693,445,4,4],Ab:[0,693,452,4,4],vd:[0,937,433,4,4],Bb:[0,1463,456,4,4],Ad:[0,693,459,4,4],Gb:[0,1463,463,4,4],Bd:[0,505,523,60,60],Cd:[0,1440,275,30,30],Hb:[0,693,466,4,4],key:[0,1463,470,4,4],
Ed:[0,693,473,4,4],lock:[0,1462,477,4,4],Lb:[0,311,205,8,4],Mb:[0,311,248,4,8],Ia:[0,186,481,4,4],Qa:[0,693,480,4,4],Nb:[0,1462,484,4,4],Gd:[0,693,487,4,4],Ya:[0,1462,491,4,4],Hd:[0,279,495,4,4],Na:[0,286,495,4,4],Pb:[0,693,494,4,4]},Yl={tb:[0,683,572,4,4],ld:[0,1468,573,4,4],nd:[0,153,577,4,4],ub:[0,160,577,4,4],hb:[0,1468,580,4,4],vb:[0,1468,587,4,4],wd:[0,1354,599,4,4],yb:[0,1468,601,4,4],Ab:[0,1354,606,4,4],vd:[0,1468,594,4,4],Bb:[0,1468,608,4,4],Ad:[0,938,614,4,4],Gb:[0,1354,613,4,4],Bd:[0,1147,
528,60,60],Cd:[0,1050,555,30,30],Hb:[0,1468,615,4,4],key:[0,1354,620,4,4],Ed:[0,938,621,4,4],lock:[0,1468,622,4,4],Lb:[0,311,219,8,4],Mb:[0,311,259,4,8],Ia:[0,1354,627,4,4],Qa:[0,938,628,4,4],Nb:[0,1468,629,4,4],Gd:[0,1354,634,4,4],Ya:[0,938,635,4,4],Hd:[0,1468,636,4,4],Na:[0,673,642,4,4],Pb:[0,1354,641,4,4]},Zl={tb:[0,1088,497,4,4],ld:[0,1095,497,4,4],nd:[0,693,501,4,4],ub:[0,279,502,4,4],hb:[0,286,502,4,4],vb:[0,172,505,4,4],wd:[0,1095,504,4,4],yb:[0,693,508,4,4],Ab:[0,279,509,4,4],vd:[0,1088,504,
4,4],Bb:[0,286,509,4,4],Ad:[0,1088,511,4,4],Gb:[0,1095,511,4,4],Bd:[0,1084,528,60,60],Cd:[0,1262,528,30,30],Hb:[0,1088,518,4,4],key:[0,1095,518,4,4],Ed:[0,683,523,4,4],lock:[0,683,530,4,4],Lb:[0,311,212,8,4],Mb:[0,959,253,4,8],Ia:[0,683,537,4,4],Qa:[0,683,544,4,4],Nb:[0,683,551,4,4],Gd:[0,683,558,4,4],Ya:[0,683,565,4,4],Hd:[0,1468,566,4,4],Na:[0,153,570,4,4],Pb:[0,160,570,4,4]};const Hd=Fd.mb();
var dm=class{constructor(a,b=!1){this.j=a;this.V=b;this.o=document.createElement("canvas");this.U="";this.v=!0;a=b?60:30;this.o.width=a;this.o.height=a;a=this.o.getContext("2d");if(!a)throw Error();this.H=a;this.H.imageSmoothingEnabled=!1}url(){if(this.v){const f=this.H,[g,h]=[f.canvas.width,f.canvas.height];f.resetTransform();f.fillStyle=Bj(this.j.style);f.fillRect(0,0,g,h);f.translate(Math.floor(g/2),Math.floor(h/2));this.V&&f.scale(2,2);var a=new C(0,0);var b,c,d;for(const [k,m,p]of Tl(this.j.j)){var e=
k;const q=m,t=p;2!==t||b?8!==t||c?4!==t||d||(d=new C(e,q)):c=new C(e,q):b=new C(e,q)}b?a=b:c?a=c:d&&(a=d);Ul(this.j.j);b=this.j.j.left+3.5;c=this.j.j.right+1-3.5;d=this.j.j.top+3.5;e=this.j.j.bottom+1-2.5;a.x=b<=c?ql(b,c,a.x):b;a.y=d<=e?ql(d,e,a.y):e;f.translate(4*-a.x,4*-a.y);a=Xl(this.j.style);for(const [k,m,p]of Tl(this.j.j))b=k,c=m,(d=cm(p,a))&&Gd(f,d,4*b,4*c);f.resetTransform();Gd(f,this.V?a.Bd:a.Cd,0,0);this.U=this.o.toDataURL();this.v=!1}return this.U}};
function cm(a,b){if(2===a)return b.Ia;if(3===a)return b.Lb;if(4===a)return b.tb;if(5===a)return b.Na;if(6===a)return b.ub;if(7===a)return b.Hb;if(8===a)return b.Qa;if(9===a)return b.vb;if(10===a)return b.vd;if(11===a)return b.Ab;if(12===a)return b.Bb;if(13===a)return b.Ad;if(14===a)return b.Hd;if(15===a)return b.key;if(16===a)return b.lock;if(18===a)return b.yb;if(19===a)return b.wd;if(20===a)return b.Gd;if(21===a)return b.hb;if(22===a)return b.Gb;if(23===a)return b.Pb;if(24===a)return b.Ed;if(25===
a)return b.Ya;if(26===a)return b.nd;if(27===a)return b.ld;if(28===a)return b.Nb;if(29===a)return b.Mb};function em(a){a.o||(a.o=new dm(a,!0));return a.o.url()}function fm(a){let b;null!=(b=a.v)&&(b.v=!0);null!=(a=a.o)&&(a.v=!0)}var gm=class{constructor(){this.j=new Wl;this.style=1;this.source=2}clone(){const a=new gm;for(const [d,e,f]of Tl(this.j)){const g=d,h=e,k=f;Rl(a.j,g,h,k);if(28===k){var b=a.j;var c=this.j;c=c.o.get(c.key(g,h));Rl(b,g,h,k,c)}else Rl(a.j,g,h,k)}a.source=this.source;a.style=this.style;return a}};var hm=class extends xc{constructor(a){super(a)}Re(){return oc(this,1)}Se(){return oc(this,2)}Uc(){return ec(this,3)}};var jm=class extends xc{constructor(a){super(a,-1,im)}},im=[1];var km=class extends xc{constructor(a){super(a)}Xd(){return oc(this,1)}Oe(){return fc(this,4)}Pe(){return fc(this,5)}Qe(){return ec(this,6)}};var lm=class extends xc{constructor(a){super(a)}Oe(){return fc(this,1)}Pe(){return fc(this,2)}Qe(){return ec(this,3)}};function mm(a){a:{var b=sd;if(Kc.length){const e=Kc.pop();var {Vd:c=!1}={};e.Vd=c;Ac(e.j,a);a=e}else a=new Lc(a);try{const e=$c(b);var d=ad(new e.Cc,a,e);break a}finally{a.V()}d=void 0}return d}var nm=class extends xc{constructor(a){super(a)}},qc=[1,2,3],sd=[nm,1,xd,[jm,1,wd,[hm,1,Ad,2,Ad,3,zd]],qc,2,xd,[km,1,vd,2,vd,3,vd,4,yd,5,yd,6,zd],qc,3,xd,[lm,1,yd,2,yd,3,zd],qc];function om(a){a=mb(a,3);return`https://www.google.com/webhp?doodle=${el}-${a}`}function pm(){const a=(new URL(window.location.href)).searchParams.get("doodle");if(a&&a.includes("-"))return ob(a.substring(a.indexOf("-")+1))};var qm=a=>{var b="Fc";if(a.Fc&&a.hasOwnProperty(b))return a.Fc;b=new a;return a.Fc=b};function rm(a,b){const c=a.j[b];c&&(c.Md&&(clearTimeout(c.Md),c.Md=0),c.jc&&(c.jc.parentNode&&c.jc.parentNode.removeChild(c.jc),c.jc=null),c.Xe=null,c.zd=null,c.Zc||delete a.j[b])}
function sm(a,b,c,d){let e=a.j[b];if(e){if(e.Zc){c&&c(e.Zc);return}if(e.Md)return}else e={zd:d,Wg:b,jc:null,Xe:c,Md:0,Zc:null};e.jc||(e.jc=document.createElement("script"));c="c"+ ++a.o;tm[c]=function(f){var g=qm(um),h=e;h.Zc=f.id;h.Zc?h.Xe&&h.Xe(h.Zc):h.zd&&h.zd();rm(g,h.Wg)};c=Xh({callback:"google.doodle.lsc."+c,url:b});Dk(e.jc,c);e.Md=setTimeout(()=>{e.zd&&e.zd();rm(qm(um),b)},1E3);a.v.appendChild(e.jc);a.j[b]=e}
class um{constructor(){this.j={};this.o=0;this.v=document.body}reset(){for(const a in this.j)rm(this,a);this.j={}}}const tm={};var vm=tm,wm=["google","doodle","lsc"],xm=ka;wm[0]in xm||"undefined"==typeof xm.execScript||xm.execScript("var "+wm[0]);for(var ym;wm.length&&(ym=wm.shift());)wm.length||void 0===vm?xm[ym]&&xm[ym]!==Object.prototype[ym]?xm=xm[ym]:xm=xm[ym]={}:xm[ym]=vm;var U="undefined"!==typeof Uint8Array&&"undefined"!==typeof Uint16Array&&"undefined"!==typeof Uint32Array;/*


 JavaScript Zlib and Deflate Library

 The MIT License

 Copyright (c) 2011 imaya

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/
function zm(a,b){this.index="number"===typeof b?b:0;this.o=0;this.buffer=a instanceof(U?Uint8Array:Array)?a:new (U?Uint8Array:Array)(32768);if(2*this.buffer.length<=this.index)throw Error("P");this.buffer.length<=this.index&&Am(this)}function Am(a){var b=a.buffer,c,d=b.length,e=new (U?Uint8Array:Array)(d<<1);if(U)e.set(b);else for(c=0;c<d;++c)e[c]=b[c];return a.buffer=e}
zm.prototype.j=function(a,b){var c=this.buffer,d=this.index,e=this.o,f=c[d],g;1<b&&(a=8<b?(Bm[a&255]<<24|Bm[a>>>8&255]<<16|Bm[a>>>16&255]<<8|Bm[a>>>24&255])>>32-b:Bm[a]>>8-b);if(8>b+e)f=f<<b|a,e+=b;else for(g=0;g<b;++g)f=f<<1|a>>b-g-1&1,8===++e&&(e=0,c[d++]=Bm[f],f=0,d===c.length&&(c=Am(this)));c[d]=f;this.buffer=c;this.o=e;this.index=d};var Cm=new (U?Uint8Array:Array)(256),Dm;for(Dm=0;256>Dm;++Dm){var Em=Dm,Fm=Em,Gm=7;for(Em>>>=1;Em;Em>>>=1)Fm<<=1,Fm|=Em&1,--Gm;Cm[Dm]=(Fm<<Gm&255)>>>0}var Bm=Cm;/*


 zlib.heap.js

 The MIT License

 Copyright (c) 2011 imaya

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/
function Hm(){this.buffer=new (U?Uint16Array:Array)(1144);this.length=0}Hm.prototype.push=function(a,b){var c=this.buffer;var d=this.length;c[this.length++]=b;for(c[this.length++]=a;0<d;)if(a=2*((d-2)/4|0),c[d]>c[a])b=c[d],c[d]=c[a],c[a]=b,b=c[d+1],c[d+1]=c[a+1],c[a+1]=b,d=a;else break;return this.length};
Hm.prototype.pop=function(){var a=this.buffer,b;var c=a[0];var d=a[1];this.length-=2;a[0]=a[this.length];a[1]=a[this.length+1];for(b=0;;){var e=2*b+2;if(e>=this.length)break;e+2<this.length&&a[e+2]>a[e]&&(e+=2);if(a[e]>a[b]){var f=a[b];a[b]=a[e];a[e]=f;f=a[b+1];a[b+1]=a[e+1];a[e+1]=f}else break;b=e}return{index:d,value:c,length:this.length}};function Im(a){this.H=0;this.input=U&&a instanceof Array?new Uint8Array(a):a;this.op=0;this.j||(this.j=new (U?Uint8Array:Array)(32768))}var Jm=[],Km;for(Km=0;288>Km;Km++)switch(!0){case 143>=Km:Jm.push([Km+48,8]);break;case 255>=Km:Jm.push([Km-144+400,9]);break;case 279>=Km:Jm.push([Km-256,7]);break;case 287>=Km:Jm.push([Km-280+192,8]);break;default:throw Error("Q`"+Km);}function Lm(a,b){this.length=a;this.j=b}
var Mm,Nm=function(){function a(e){switch(!0){case 3===e:return[257,e-3,0];case 4===e:return[258,e-4,0];case 5===e:return[259,e-5,0];case 6===e:return[260,e-6,0];case 7===e:return[261,e-7,0];case 8===e:return[262,e-8,0];case 9===e:return[263,e-9,0];case 10===e:return[264,e-10,0];case 12>=e:return[265,e-11,1];case 14>=e:return[266,e-13,1];case 16>=e:return[267,e-15,1];case 18>=e:return[268,e-17,1];case 22>=e:return[269,e-19,2];case 26>=e:return[270,e-23,2];case 30>=e:return[271,e-27,2];case 34>=e:return[272,
e-31,2];case 42>=e:return[273,e-35,3];case 50>=e:return[274,e-43,3];case 58>=e:return[275,e-51,3];case 66>=e:return[276,e-59,3];case 82>=e:return[277,e-67,4];case 98>=e:return[278,e-83,4];case 114>=e:return[279,e-99,4];case 130>=e:return[280,e-115,4];case 162>=e:return[281,e-131,5];case 194>=e:return[282,e-163,5];case 226>=e:return[283,e-195,5];case 257>=e:return[284,e-227,5];case 258===e:return[285,e-258,0];default:throw Error("T`"+e);}}var b=[],c;for(c=3;258>=c;c++){var d=a(c);b[c]=d[2]<<24|d[1]<<
16|d[0]}return b}();Mm=U?new Uint32Array(Nm):Nm;
function Om(a,b){function c(B,M){const Q=[];var r=Mm[B.length];Q[0]=r&65535;Q[1]=r>>16&255;Q[2]=r>>24;r=B.j;switch(!0){case 1===r:r=[0,r-1,0];break;case 2===r:r=[1,r-2,0];break;case 3===r:r=[2,r-3,0];break;case 4===r:r=[3,r-4,0];break;case 6>=r:r=[4,r-5,1];break;case 8>=r:r=[5,r-7,1];break;case 12>=r:r=[6,r-9,2];break;case 16>=r:r=[7,r-13,2];break;case 24>=r:r=[8,r-17,3];break;case 32>=r:r=[9,r-25,3];break;case 48>=r:r=[10,r-33,4];break;case 64>=r:r=[11,r-49,4];break;case 96>=r:r=[12,r-65,5];break;
case 128>=r:r=[13,r-97,5];break;case 192>=r:r=[14,r-129,6];break;case 256>=r:r=[15,r-193,6];break;case 384>=r:r=[16,r-257,7];break;case 512>=r:r=[17,r-385,7];break;case 768>=r:r=[18,r-513,8];break;case 1024>=r:r=[19,r-769,8];break;case 1536>=r:r=[20,r-1025,9];break;case 2048>=r:r=[21,r-1537,9];break;case 3072>=r:r=[22,r-2049,10];break;case 4096>=r:r=[23,r-3073,10];break;case 6144>=r:r=[24,r-4097,11];break;case 8192>=r:r=[25,r-6145,11];break;case 12288>=r:r=[26,r-8193,12];break;case 16384>=r:r=[27,
r-12289,12];break;case 24576>=r:r=[28,r-16385,13];break;case 32768>=r:r=[29,r-24577,13];break;default:throw Error("U");}Q[3]=r[0];Q[4]=r[1];Q[5]=r[2];var na;r=0;for(na=Q.length;r<na;++r)m[p++]=Q[r];t[Q[0]]++;A[Q[3]]++;q=B.length+M-1;k=null}var d,e,f,g,h={},k,m=U?new Uint16Array(2*b.length):[],p=0,q=0,t=new (U?Uint32Array:Array)(286),A=new (U?Uint32Array:Array)(30),E=a.H;if(!U){for(e=0;285>=e;)t[e++]=0;for(e=0;29>=e;)A[e++]=0}t[256]=1;var y=0;for(d=b.length;y<d;++y){e=g=0;for(f=3;e<f&&y+e!==d;++e)g=
g<<8|b[y+e];void 0===h[g]&&(h[g]=[]);e=h[g];if(0<q--)e.push(y);else{for(;0<e.length&&32768<y-e[0];)e.shift();if(y+3>=d){k&&c(k,-1);e=0;for(f=d-y;e<f;++e)g=b[y+e],m[p++]=g,++t[g];break}0<e.length?(f=Pm(b,y,e),k?k.length<f.length?(g=b[y-1],m[p++]=g,++t[g],c(f,0)):c(k,-1):f.length<E?k=f:c(f,0)):k?c(k,-1):(g=b[y],m[p++]=g,++t[g]);e.push(y)}}m[p++]=256;t[256]++;a.v=t;a.o=A;return U?m.subarray(0,p):m}
function Pm(a,b,c){var d=0,e=a.length;var f=0;var g=c.length;a:for(;f<g;f++){var h=c[g-f-1];var k=3;if(3<d){for(k=d;3<k;k--)if(a[h+k-1]!==a[b+k-1])continue a;k=d}for(;258>k&&b+k<e&&a[h+k]===a[b+k];)++k;if(k>d){var m=h;d=k}if(258===k)break}return new Lm(d,b-m)}
function Qm(a,b){var c=a.length,d=new Hm,e=new (U?Uint8Array:Array)(c),f;if(!U)for(f=0;f<c;f++)e[f]=0;for(f=0;f<c;++f)0<a[f]&&d.push(f,a[f]);a=Array(d.length/2);var g=new (U?Uint32Array:Array)(d.length/2);if(1===a.length)return e[d.pop().index]=1,e;f=0;for(c=d.length/2;f<c;++f)a[f]=d.pop(),g[f]=a[f].value;b=Rm(g,g.length,b);f=0;for(c=a.length;f<c;++f)e[a[f].index]=b[f];return e}
function Rm(a,b,c){function d(E){var y=k[E][m[E]];y===b?(d(E+1),d(E+1)):--g[y];++m[E]}var e=new (U?Uint16Array:Array)(c),f=new (U?Uint8Array:Array)(c),g=new (U?Uint8Array:Array)(b),h=Array(c),k=Array(c),m=Array(c),p=(1<<c)-b,q=1<<c-1,t;e[c-1]=b;for(t=0;t<c;++t)p<q?f[t]=0:(f[t]=1,p-=q),p<<=1,e[c-2-t]=(e[c-1-t]/2|0)+b;e[0]=f[0];h[0]=Array(e[0]);k[0]=Array(e[0]);for(t=1;t<c;++t)e[t]>2*e[t-1]+f[t]&&(e[t]=2*e[t-1]+f[t]),h[t]=Array(e[t]),k[t]=Array(e[t]);for(p=0;p<b;++p)g[p]=c;for(q=0;q<e[c-1];++q)h[c-
1][q]=a[q],k[c-1][q]=q;for(p=0;p<c;++p)m[p]=0;1===f[c-1]&&(--g[0],++m[c-1]);for(t=c-2;0<=t;--t){c=p=0;var A=m[t+1];for(q=0;q<e[t];q++)c=h[t+1][A]+h[t+1][A+1],c>a[p]?(h[t][q]=c,k[t][q]=b,A+=2):(h[t][q]=a[p],k[t][q]=p,++p);m[t]=0;1===f[t]&&d(t)}return g}
function Sm(a){var b=new (U?Uint16Array:Array)(a.length),c=[],d=[],e=0,f,g;var h=0;for(f=a.length;h<f;h++)c[a[h]]=(c[a[h]]|0)+1;h=1;for(f=16;h<=f;h++)d[h]=e,e+=c[h]|0,e<<=1;h=0;for(f=a.length;h<f;h++)for(e=d[a[h]],d[a[h]]+=1,c=b[h]=0,g=a[h];c<g;c++)b[h]=b[h]<<1|e&1,e>>>=1;return b};/*


 JavaScript Inflate Library

 The MIT License

 Copyright (c) 2012 imaya

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/
function Tm(a){var b=a.length,c=0,d=Number.POSITIVE_INFINITY,e,f,g;for(f=0;f<b;++f)a[f]>c&&(c=a[f]),a[f]<d&&(d=a[f]);var h=1<<c;var k=new (U?Uint32Array:Array)(h);var m=1;var p=0;for(e=2;m<=c;){for(f=0;f<b;++f)if(a[f]===m){var q=0;var t=p;for(g=0;g<m;++g)q=q<<1|t&1,t>>=1;t=m<<16|f;for(g=q;g<h;g+=e)k[g]=t;++p}++m;p<<=1;e<<=1}return[k,c,d]};function Um(a){var b=null;this.U=[];this.V=32768;this.o=this.H=this.v=this.ha=0;this.input=U?new Uint8Array(a):a;this.ta=!1;this.W=1;this.resize=!1;if(b||!(b={}))b.index&&(this.v=b.index),b.bufferSize&&(this.V=b.bufferSize),b.bufferType&&(this.W=b.bufferType),b.resize&&(this.resize=b.resize);switch(this.W){case 0:this.op=32768;this.j=new (U?Uint8Array:Array)(this.V+33026);break;case 1:this.op=0;this.j=new (U?Uint8Array:Array)(this.V);this.yc=this.Tg;this.Cf=this.Pg;this.Je=this.Rg;break;default:throw Error("V");
}}
function Vm(a){for(;!a.ta;){var b=a,c=Wm(b,3);c&1&&(b.ta=!0);c>>>=1;switch(c){case 0:c=b;var d=c.input,e=c.v,f=c.j,g=c.op;var h=d.length;var k=f.length;c.H=0;c.o=0;if(e+1>=h)throw Error("Y");b=d[e++]|d[e++]<<8;if(e+1>=h)throw Error("Z");h=d[e++]|d[e++]<<8;if(b===~h)throw Error("$");if(e+b>d.length)throw Error("X");switch(c.W){case 0:for(;g+b>f.length;){h=k-g;b-=h;if(U)f.set(d.subarray(e,e+h),g),g+=h,e+=h;else for(;h--;)f[g++]=d[e++];c.op=g;f=c.yc();g=c.op}break;case 1:for(;g+b>f.length;)f=c.yc({Hf:2});break;
default:throw Error("V");}if(U)f.set(d.subarray(e,e+b),g),g+=b,e+=b;else for(;b--;)f[g++]=d[e++];c.v=e;c.op=g;c.j=f;break;case 1:b.Je(Xm,Ym);break;case 2:Zm(b);break;default:throw Error("W`"+c);}}return a.Cf()}var $m,an=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];$m=U?new Uint16Array(an):an;var bn,cn=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,258,258];bn=U?new Uint16Array(cn):cn;
var dn,en=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0];dn=U?new Uint8Array(en):en;var fn,gn=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577];fn=U?new Uint16Array(gn):gn;var hn,jn=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];hn=U?new Uint8Array(jn):jn;var Xm,kn=new (U?Uint8Array:Array)(288),ln,mn;ln=0;for(mn=kn.length;ln<mn;++ln)kn[ln]=143>=ln?8:255>=ln?9:279>=ln?7:8;Xm=Tm(kn);
var Ym,nn=new (U?Uint8Array:Array)(30),on,pn;on=0;for(pn=nn.length;on<pn;++on)nn[on]=5;Ym=Tm(nn);function Wm(a,b){for(var c=a.H,d=a.o,e=a.input,f=a.v,g=e.length;d<b;){if(f>=g)throw Error("X");c|=e[f++]<<d;d+=8}a.H=c>>>b;a.o=d-b;a.v=f;return c&(1<<b)-1}function qn(a,b){var c=a.H,d=a.o,e=a.input,f=a.v,g=e.length,h=b[0];for(b=b[1];d<b&&!(f>=g);)c|=e[f++]<<d,d+=8;e=h[c&(1<<b)-1];g=e>>>16;a.H=c>>g;a.o=d-g;a.v=f;return e&65535}
function Zm(a){function b(h,k,m){var p=this.Da,q;for(q=0;q<h;){var t=qn(this,k);switch(t){case 16:for(t=3+Wm(this,2);t--;)m[q++]=p;break;case 17:for(t=3+Wm(this,3);t--;)m[q++]=0;p=0;break;case 18:for(t=11+Wm(this,7);t--;)m[q++]=0;p=0;break;default:p=m[q++]=t}}this.Da=p;return m}var c=Wm(a,5)+257,d=Wm(a,5)+1,e=Wm(a,4)+4,f=new (U?Uint8Array:Array)($m.length),g;for(g=0;g<e;++g)f[$m[g]]=Wm(a,3);if(!U)for(g=e,e=f.length;g<e;++g)f[$m[g]]=0;e=Tm(f);f=new (U?Uint8Array:Array)(c);g=new (U?Uint8Array:Array)(d);
a.Da=0;a.Je(Tm(b.call(a,c,e,f)),Tm(b.call(a,d,e,g)))}aa=Um.prototype;aa.Je=function(a,b){var c=this.j,d=this.op;this.va=a;for(var e=c.length-258,f,g,h;256!==(f=qn(this,a));)if(256>f)d>=e&&(this.op=d,c=this.yc(),d=this.op),c[d++]=f;else for(f-=257,h=bn[f],0<dn[f]&&(h+=Wm(this,dn[f])),f=qn(this,b),g=fn[f],0<hn[f]&&(g+=Wm(this,hn[f])),d>=e&&(this.op=d,c=this.yc(),d=this.op);h--;)c[d]=c[d++-g];for(;8<=this.o;)this.o-=8,this.v--;this.op=d};
aa.Rg=function(a,b){var c=this.j,d=this.op;this.va=a;for(var e=c.length,f,g,h;256!==(f=qn(this,a));)if(256>f)d>=e&&(c=this.yc(),e=c.length),c[d++]=f;else for(f-=257,h=bn[f],0<dn[f]&&(h+=Wm(this,dn[f])),f=qn(this,b),g=fn[f],0<hn[f]&&(g+=Wm(this,hn[f])),d+h>e&&(c=this.yc(),e=c.length);h--;)c[d]=c[d++-g];for(;8<=this.o;)this.o-=8,this.v--;this.op=d};
aa.yc=function(){var a=new (U?Uint8Array:Array)(this.op-32768),b=this.op-32768,c,d=this.j;if(U)a.set(d.subarray(32768,a.length));else{var e=0;for(c=a.length;e<c;++e)a[e]=d[e+32768]}this.U.push(a);this.ha+=a.length;if(U)d.set(d.subarray(b,b+32768));else for(e=0;32768>e;++e)d[e]=d[b+e];this.op=32768;return d};
aa.Tg=function(a){var b=this.input.length/this.v+1|0,c=this.input,d=this.j;a&&("number"===typeof a.Hf&&(b=a.Hf),"number"===typeof a.Mg&&(b+=a.Mg));2>b?(a=(c.length-this.v)/this.va[2],a=a/2*258|0,a=a<d.length?d.length+a:d.length<<1):a=d.length*b;U?(a=new Uint8Array(a),a.set(d)):a=d;return this.j=a};
aa.Cf=function(){var a=0,b=this.j,c=this.U,d=new (U?Uint8Array:Array)(this.ha+(this.op-32768)),e,f;if(0===c.length)return U?this.j.subarray(32768,this.op):this.j.slice(32768,this.op);var g=0;for(e=c.length;g<e;++g){var h=c[g];var k=0;for(f=h.length;k<f;++k)d[a++]=h[k]}g=32768;for(e=this.op;g<e;++g)d[a++]=b[g];this.U=[];return this.buffer=d};
aa.Pg=function(){var a=this.op;if(U)if(this.resize){var b=new Uint8Array(a);b.set(this.j.subarray(0,a))}else b=this.j.subarray(0,a);else this.j.length>a&&(this.j.length=a),b=this.j;return this.buffer=b};function rn(a,b){const c=a.j,d=new Map;for(const [g,h,k]of Tl(c)){var e=g;const m=h,p=k;var f=T.get(p);f&&(f=f(16*e,16*m),28===p&&(e=c.o.get(c.key(e,m)),d.has(e)?d.get(e).push(f):d.set(e,[f])),Ba(b,f))}Ba(b,new x(new wj));Ul(c);sn(d,a)}
function sn(a,b){for(const [d,e]of a.entries()){const f=d;var c=e;if(c&&c[0]&&c[1]){a=c[0];c=c[1];a.get(jj).destination=c.get(P).position.kb();c.get(jj).destination=a.get(P).position.kb();for(const g of[a,c])g.get(jj).Pf=!0,il(g,new x(new P,new D(new Na(h=>{h.save();var k=b.style;if(1===k||2===k)k="#fff";else if(5===k)k="#DE31EA";else if(3===k||4===k)k="#fff";else throw Error("J");h.fillStyle=k;h.font="28px PixelMplus10";k=f+1;h.fillText(k.toString(),10<=k?11:18,40,1E3);h.restore()}),0)))}}}
function tn(a){return un(mm(ob(a)))}function vn(a){a=td(wn(a));const b=om(a);return new Promise(c=>{sm(qm(um),b,d=>{d.startsWith("//")&&(d=`https:${d}`);c(d)},()=>{c(b)})})}
function wn(a){var b=a.j;Ul(b);var c=new lm,d=Tl(b),e=d.length,f=new Uint8Array(5*e),g=new Int16Array(f.buffer,0,e),h=new Int16Array(f.buffer,2*e,e),k=new Uint8Array(f.buffer,4*e,e);e=[];var m=0;for(const [Gs,Hs,Is]of d){d=Gs;var p=Hs,q=Is;g[m]=d;h[m]=p;k[m]=q;m++;28===q&&e.push(b.o.get(b.key(d,p)))}b=new Im(f);g=b.input;switch(2){case 2:f=new zm(U?new Uint8Array(b.j.buffer):b.j,b.op);var t,A,E=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];p=Array(19);var y;f.j(1,1);f.j(2,2);g=Om(b,g);m=Qm(b.v,
15);d=Sm(m);h=Qm(b.o,7);k=Sm(h);for(q=286;257<q&&0===m[q-1];q--);for(t=30;1<t&&0===h[t-1];t--);var B=q,M=t;var Q=new (U?Uint32Array:Array)(B+M);var r=new (U?Uint32Array:Array)(316),na;var Pa=new (U?Uint8Array:Array)(19);for(y=A=0;y<B;y++)Q[A++]=m[y];for(y=0;y<M;y++)Q[A++]=h[y];if(!U)for(y=0,M=Pa.length;y<M;++y)Pa[y]=0;y=na=0;for(M=Q.length;y<M;y+=A){for(A=1;y+A<M&&Q[y+A]===Q[y];++A);B=A;if(0===Q[y])if(3>B)for(;0<B--;)r[na++]=0,Pa[0]++;else for(;0<B;){var Qa=138>B?B:138;Qa>B-3&&Qa<B&&(Qa=B-3);10>=
Qa?(r[na++]=17,r[na++]=Qa-3,Pa[17]++):(r[na++]=18,r[na++]=Qa-11,Pa[18]++);B-=Qa}else if(r[na++]=Q[y],Pa[Q[y]]++,B--,3>B)for(;0<B--;)r[na++]=Q[y],Pa[Q[y]]++;else for(;0<B;)Qa=6>B?B:6,Qa>B-3&&Qa<B&&(Qa=B-3),r[na++]=16,r[na++]=Qa-3,Pa[16]++,B-=Qa}Q=U?r.subarray(0,na):r.slice(0,na);Pa=Qm(Pa,7);for(y=0;19>y;y++)p[y]=Pa[E[y]];for(A=19;4<A&&0===p[A-1];A--);E=Sm(Pa);f.j(q-257,5);f.j(t-1,5);f.j(A-4,4);for(y=0;y<A;y++)f.j(p[y],3);y=0;for(p=Q.length;y<p;y++)if(q=Q[y],f.j(E[q],Pa[q]),16<=q){y++;switch(q){case 16:q=
2;break;case 17:q=3;break;case 18:q=7;break;default:throw Error("S`"+q);}f.j(Q[y],q)}m=[d,m];d=[k,h];h=m[0];k=m[1];m=d[0];q=d[1];d=0;for(p=g.length;d<p;++d)if(t=g[d],f.j(h[t],k[t]),256<t)f.j(g[++d],g[++d]),t=g[++d],f.j(m[t],q[t]),f.j(g[++d],g[++d]);else if(256===t)break;g=f.buffer;h=f.index;0<f.o&&(g[h]<<=8-f.o,g[h]=Bm[g[h]],h++);U?f=g.subarray(0,h):(g.length=h,f=g);b.j=f;b.op=b.j.length}b=hc(c,1,b.j);e=Uint8Array.from(e);e=hc(b,2,e);gc(e,3,a.style);a=new nm;e=c;c=qc;Pb(a);null==e&&(e=void 0);Pb(a);
(c=ic(a,c))&&3!==c&&null!=e&&bc(a,c,void 0,!1);return bc(a,3,e)}
function un(a){const b=new gm;var c=b.j,d=pc(a,jm,1);if(d){for(var e of mc(d,hm,1))a=e.Uc(),Rl(c,e.Re(),e.Se(),a);return b}if(e=pc(a,km,2)){a=zb(e.Oe());a=Vm(new Um(a));d=e.Xd();var f=oc(e,2),g=oc(e,3),h=zb(e.Pe()),k=0,m=f;for(var p=0;p<a.length;p++)28===a[p]?(Rl(c,m,g,a[p],h[k]),k++):Rl(c,m,g,a[p]),m++,m>=f+d&&(m=f,g++);c=e.Qe();0<c&&(b.style=c);return b}if(e=pc(a,lm,3)){a=zb(e.Oe());h=Vm(new Um(a));if(0!==h.length%5)throw Error("aa");a=h.length/5;d=new Int16Array(h.buffer,0,a);f=new Int16Array(h.buffer,
2*a,a);h=new Uint8Array(h.buffer,4*a,a);k=zb(e.Pe());m=0;for(g=0;g<a;g++){p=d[g];const q=f[g],t=h[g];28===t?(Rl(c,p,q,t,k[m]),m++):Rl(c,p,q,t)}c=e.Qe();0!==c&&(b.style=c);return b}throw Error("ba");};var xn=tn("EoEBCEIQ8///////////ARj+//////////8BImelUtEOgCAIHG2s5djqpf//VcEZY+qQ9HgIEu4OCzZxLs6hJpr5eD2GCAd2Sl/NJyEXvY6t5wysQq3SiOGwO181SoFAHNJXX94Aj7mbsokP4jZx0WL3R5jsrxryTIIfHgafbtlycC4D");xn.source=0;const yn=tn("GoUJCoAJxVQHYxRFFP7kWDXnXe5I7tjcYRAwCqIRUVQ0FhRbFASiRmMEC4EQQhJrwB9q77333nllZnfndmdvEyLMd232le-9b97c1diGa7Ad1-I67MD1uAE3Yiduws0YwS24FbfB77Fc24hYt0cMu3EX7sY9uBejuB8PYA_24kHsw34cwBgewsN4BON4FI9JlGbiHLsp4j6K2U8-42SdwOOYxBM4iEN4Ek_haTyDw5jCERzFNI5hBscxixPYkshj67kdu3AH7oxyuvzjlOEE5tBAE2sRYgAttLEOF2MQ63EJNmAjNuFSDOEyXI7NxHAFtuJKXIVh4bIs2ifn9_c5QVyzxFVDHWvQh_6CjMzDWu8Upl0O1x7KrwoW0Yi5GwVZtzq8ep6xlvZcbcdchZ5BBVX0LoEnqaedqxGj3lg0IROmN-0lZmpSJp43q_dYNFHd9HCr7ad6N0hdm00126iOHdSxnZ1R0nqfTEw8bxxne7QdburSm-82ZmvLs6RzqqzMuUaq1Xktoi5n2SsZbNV2_hoFz2eUOtdJzsoyIHZXl3jCR-Vssq3aA_MPkd-BzOxh7p2KVWF_7kg72ZLZrZ4Vs7lxfabvdI2qzXCGhRncHDrvQ-Lt-g7R2Wf136AsPkvT00Mzs5rkRAx3zLvNsoBn8Ryexwt4ES9lRLqzcIjuiY2cxyL5J30GaVYOOv-9cziZuvWDdP9mcCrF1SaLTtkk2V9OsU9Gd3bGVLsoXgNmSmO7-_8_l-HN5zpJShwRr3nSQG38bEo0sfwbpZ6pKN9CwqK1TjlsbLf_H2kt3bvE_0R6JnwemmHenMUpyaNR6-UfSz2PUj_qcZJ8rEesEv-zqec0VaOei-RbITvrc4w4WItKFMeaKTerVKHKsyZAdZ-VfMn-mEmjmYuna9rs52SuWE_Wh8-BJ41nj_Xlf1zb8YKcmI2aj_xZE9ZULcfxyn_d8GoOXsvB67l4Y1l4c0Xw1rLx9lnEO-cQ7_7veO-s4f0VwAdnhA_PAT46Y3y8IvgkB5_m4rMC-HyJ-MKLL3PxlQdfe_FNCt968V0mvvfiBw9-9OKnZePnJeKXAvjVg9-64PdC-GNJ-DMHf3Xgby_-6YJ_VwjdFwqv8zqwyoNSAaz2Ikjh_A5cYHChgx4HZYOLDCqCKoLU6kksuyuZXb3e4dxupxOYVTMepbrfJwjCVpxLSOq19rq8AHWtVqtl9o8flWxUsn5dVEArrFEl1QZHBf2-rBmhpexaqDnl7lYqt9eqN-UHvSioZJWpeAPUWmtKUMjPmkFlgMpuSyxlM8HZKTIXn1yNMtWDte5iY58Ix8fp6ceUTEki0TmZ7KhAEYI1EaO0wCLr_GSWEsVpWNy02jSjEFgv4SYPrlCfhtS-UKhZ6qcYymuKiSXV-Q3JS6ukTTx4Wmly_DtuRDwcpn5RqWQfNeIhlE86HysjO7RsoMPorkY5CMpxHhO_mpYqxFrxTvaukhFRqP6hsrEjf5cps21P3ON7LbveXpFPZ5Pfq9zOIy16BKwqSW0NRv6eWlgzj-wT3Z4GGAM.");
yn.source=1;const zn=tn("GoMICvQHzZeHVxtHEMa_GM4ghEUREgJkei0ihFSn90pIAgkESEgF28RxanHiQHr7X9N7K8xsub2yd7oTgpf96U6n3fm-nZ1d6T0t4mEs4RE8isewjBU8jiewijU8iYewSPd1el8Wd75kDD8tqefVQL-Jl2rjb5x5Lp6J7_Jitfm04mak8-HP8u7tHcAghjCMEYxiDOOYwCSmMI0ZzKKCOVyJeVyFBdJxdANOIoNWtKETBZTQh37hMKVi_N4nKL4RDmma0Ey6FmRJewo50rejgzzy6CKfIrrJqwe95FfGaeVZLasFXK3WxPNIb-kq_QbV-PFlxDXgOXmmdWxgE0_haWzhGTyL5_A8XsCL2MYOzlrrOETOE-RYEWsLZs7n4CzOuWPcs0m-254-f7yc9ZyvXteICDNmViBHb8YtuBW34XbcgTtxF-7GPbgX9-F-PIAHLdoFoTEKE6-jN0WGtkpppdZ5Ves0B6-2QlHX4jpcjxtwBjfiJquGvyfmG8jfIVN7b9Wl2xmKXBG7wnvir07aufg7xz6st69GRnDF5Kp1hU19vdVlL173eeziJVzAy7iIV_AqXsPreANv4i28jXdwCe_iPVwOOEbvmXa9SA6sC_5KxZ_VJNlcxvvYU6dvTWguUNyeZW-SzJpkTp7PthvGf0M4cWR8HOdxFJHxlWSPTxK4cG3Y47yoBKs-Jt2niZSskpqPlOqzRLqdwEzV4ndrmsVeG-m0h33lZdRbFLsjTvElMW5mkxG8XnN6gj46Ruq9ueoRvep9fIAPPeOf4wt86ZnD622L_ErsGeci98yc16j4-JPC-jh1df96jpqx8IitZ1_c9S-Efxbulb9k8v71f1F8o_hW8B3xvcsPPn50-Yn4WfCL4lcLvyl-J_4g_hT8RfxN_EP8G0A2BNoVqTiRioZjojExzv-EkzXTZKE5lkwMLYcgm4LWGjlVV3IW2upCewI66k5njeSPiK4QhSOlmJDuxJQS01MXemumr0bKqTldA_11YyABgwkYimQ4ESMpGE3J2KEYr8pELJOxTEUyHWImxKygEsGc-A_LzAucUMu5TyWnTJfj9IpPPeFQ2QrBjmxUpB4uus3J5_Px0VWsnOaMbibxlI2FoZxNjjJRy9SlHFcnqpVDD97WR5dceat7I0dlaFtKZP1tcxdCm5JMJ3aT8jJJqcxSNNpScvAn0F4tX3ql37-su_fcZF_G4Uf3Up307ka5kfSe5-cMpas7vbUvKp3TpR985bCakqiJhcEsWmRuWiAbnSH243B9wNx1WJrIlR_axOGRMuoQZ1cdYJ7C60o7KqbWer-hr3Tu0jJ51S2qE9hcqVJiY-PpCMoDGxTXQqdWfEUOABIIAQMAAAECAwIYBQ..");
zn.source=1;const An=tn("Go4JCv8I3ZVpe9o4EIAVwCEGDIQQHI7s0XaP_u7t3ve3Pfsb9r7bJk16pEfapFfahExnRhKSkYUN8e6H1fs8Rp5LMyNZnEJTrIuLYgynsCQqYkXURVO0RBelfbEpXhdviLc9-g20GKHNa2h1wbIDEGJJlEQZ7QOxLKroFYoaejZENPHusf9ADDnGK-JVjnNOnOdYb80dLZ4Z782UiL4Y2nbarpuyynnLrmzl1UVL18JoKQJp7QzJjmxIP-QKSEJvG7yeroiktBM6jqlX2_dQvolV6HqTNVL-do8uinfgEnwBX8IYyIoyt2Ul7HoN8ybdBUvzDXwL38H3aFH0LukVvoKvMf5lOJeQXIYXjuQpHMFzlB87mjtwF-7BfdiHB_AQDuAQHsFjeIIezzw-ui7yzfLUtXa46yaOiULr54vRV_7vwnvwPnwAH8JH8DF8Ap_CZ_A5R83OR_Y2O05WTg2rFqoke-UG7m26j91fku-pPTnGk5U8L2vOKXE9ZRYHvDKtW2K_LK_sM3DCJ51iTftr-bpXM0iRZ1U2cnzoO0hKNlEyxu6Ngc7WGO_qFp40eXeQ9VW0aYtVlMl5xPMuvl0Beq-hPUn6-J2RjCTmi5SelJnUkbTN_rSulth2QxWHYk_fPTKfa7CFutiSbcE2Slb5RjJSklWxL3XsSjLGNlxHHXCtZuVZdwfZ6xso_e7JG2cH_-P0zpHfDuxakhWW7cINuAm34PYc52r6fqT8KJaMtAcyX1uiz7mMpiMJVRlZygzMTOZSQZ0730f_OvdCag6xKtMfU8UR5mq_21X55NVEBFsjcCeS8Y22jDr6T_HpH2PGp2zlZmlb0R1wwv3VvaXdT6ttvh1yT5GJZGIY6_-zXZrsB8WPGfyUk58L5ZfC-XUOfsvJ75n8kZM_Hf5K5W8v_0xxJRdXU7jmZetfZ9vhusOOl90FuFEQN8_IrYK4XQB7C3DHw92FubcQ98_IvpcHHh4uwIHDocMjvt2JJw5PLZ4lOErh-QxeOBx7OfEyTuE0Ff8Qc4-lgig5lFOoFEjgsJyb6oSVKUKL2hT1FBpTRB6aXlozaWewmovOQqwVRjcn6znp5STOyUZO-jkZpDCcUMURBPJpfv-TEfKgWUtOcR42cbBMjfUgGIUolZZhN-loRrOJj3aNpnEwkrI4niylfpICZRYh1iyOY1TEljjnYAfyUZORnmANtpqqDJcRmtFTrhRF9KxgdaRTsHkXizXZkEWsGqbbwHprkFUQLJuhMkiOSiBXoSxoLVqD10GFPXQ3UENd1nNcwMRSS0yU1Nsypmnv18RvRgOlHvfJvNRnOCqN7LB0VI_EdtN-S1VvFLSM2MTBntniZj1xUlXsoa6HZrx9uBVtmrO8dJavodfrmcmkntkfEH2xYUT5cA3qROBxkd9JEAzb_NOvNVpyl8hr0BlhqZh5Z_IdduhTUWUoVz3wkzJHLaY19Ws7Ctb4m9XqWjSgZGyToB7Vw8YgGjQCOrOYzlDF1b9myFxZo4Jg0jrc2R58EPnRilkmy7VXxzuIHgNL9BISCAIDAgEBAAADGAQ.");
An.source=1;const Bn=tn("GmkKZZXM1w7CMAyF4R_S09CWNd7_MdkrxgEJiV4Yf4qtnFiBCVMSDaIlM6OjZ2DOgiUr1mzYsgM_0d1__pS9D5Z_7tn2XrP33lnfP2MO5hh0Cjqby5erub3d3cNpvNqfGs9qWqfUSEkFGAE.");Bn.source=1;const Cn=tn("Gt8DCtoDrZDZb9QwEMaHpc5iErJtIAmuOY_SbFNogZa2QP_vIg5xPsADPCCEEOK-BYjzEALhfh6brLuFBQTzk50Zzzfjcbq0j-yqaRxriv0x7DW-B3C2H2fjvKrGc1nruWxFEzTJfg26nK94n4TO5ru0i3bTHnQ8SIdoG22nHTQNf8b7e71qwtdMe-UMHaY5xEfpCNYxGmH1Tt9tbFWdnaFX-92MIDdH85SicsH3WORI0xbaih5WNxvkEs5upJxKZCt0nUK3BWQXaT3FyG-AokPDUGXQbYKygHYzKRr107m6_mlm-S3zwV0R5q-xr-7jpnP_5vevlbSG5xLoJTElIU5pyMf2JIa3Mm75uA31EJ_HqLGVLVrb5NZ5tXv1klkyx8EJc5I5BU43nGHOgnPMeXCh4SJzKeCyuWKummvmurkBbjK3mNsBdwLu_gH3wH3mwV_xsOHRCh4P4MkAnv5nnjHP_5kX5iXzCrwGb5i3zDvznvlgPjKfzGfmS8PXgG8DESJJ2pGIYFLKKIqtx1tZluzhW0aylOVoYEqpIi9UR_WOUu1MSbsXPzWhE62lFtZSjSKrFVmWiVxp3I-2eTrcFk4hRHilVfabTJJf3NQzLWJhJ3Ife-GPxSZaUqX9fZcBGAI.");
Cn.source=1;var Dn=[xn,Bn,zn,yn,An,Cn];var En=()=>pk()||!(!navigator.vendor||0!==navigator.vendor.indexOf("Apple")),Fn=()=>{if(wk())throw Error("ca");return xk()||!!document.getElementById("fkbx")||uk()||tk()},Gn=()=>{if(wk())throw Error("ca");return vk()||tk()||rk()&&!ok()},Hn=()=>wk()?"1"===nk.j.get("ccta"):vk()&&!(document.getElementById("fkbx")||uk())||tk()&&rk()&&!xk(),In=()=>{const a=!rk()&&xk()&&600>=window.innerHeight;return!yk&&(xk()||a)&&!tk()};const Jn=[5,6,7,8,9,11,12,16];let Kn=0,Ln=!1,Mn={},Nn=[];
var On=a=>{var b=Date.now();0==a&&(Kn=b);Mn.e=a;Mn.t=0==Kn?-1:Math.floor(b-Kn);Mn.l="sdoodles"===document.documentElement.id?0:1;b=[];for(var c in Mn)Mn.hasOwnProperty(c)&&b.push(c+":"+Mn[c]);c=b.join(",");b=10==a;var d=0<=Jn.indexOf(a);(document.getElementById("fkbx")||uk())&&(c+="&ntp=1");b?(b=cl())&&(c+=`&ved=${b}`):d&&($k||((b=document.getElementById("hplogoshareved"))?$k=b.getAttribute("data-ved"):wk()&&kk(nk.j,"sved")&&($k=nk.j.get("sved"))),(b=$k)&&(c+=`&ved=${b}`));-1==c.search("&ei=")&&(c+=
"&ei=",(b=bl())&&(c+=b));for(window.google&&window.google.log?window.google.log("doodle",c):Sj(c);0<Nn.length;)delete Mn[Nn.pop()];Ln||0!=a||Hn()||(Ln=!0,On(10))};function Pn(){Qn||(Qn=new Rn);return Qn}function Sn(a){for(const b of Dn)Tn(a,b.clone());Un(a)}function Tn(a,b){let c=Math.random()+Date.now()+"";for(;a.o.has(c);)c=Math.random()+Date.now()+"";a.o.set(c,b);return a.j=c}function Un(a){var b=Array.from(a.o.entries());a=[];for(const [d,e]of b){b=d;var c=e;c={b64Data:mb(td(wn(c))),source:c.source};a.push([b,c])}window.localStorage.setItem("all-lawson-games",JSON.stringify(a))}function Vn(a,b){b=Tn(a,b);Un(a);return b}
function Wn(a,b){a=a.o.get(b);if(!a)throw Error("da`"+b);return a}function Xn(a){return Wn(a,a.j)}function Yn(a){for(const [b,c]of a.o)if(a=b,0===c.source)return a;throw Error("ea");}function Zn(a){return Yn(a)===a.j}function $n(a,b){for(const [f,g]of a.o.entries()){const h=f;a=g;var c=b,d=c.j,e=a.j;if(Vl(d.j,e.j)&&Vl(d.o,e.o)&&c.style===a.style)return h}}
var Rn=class{constructor(){this.v=!0;this.o=new Map;if(window.localStorage.getItem("all-lawson-games")){this.v=!1;try{var a=window.localStorage.getItem("all-lawson-games");if(a){var b=JSON.parse(a);a=[];for(const [c,d]of b){b=c;const e=d,f=tn(e.b64Data);f.source=void 0!==e.source?e.source:2;a.push([b,f])}this.o=new Map(a)}}catch(c){console.log("Error loading saved cartridges"),Sn(this)}}else Sn(this);this.j=[...this.o.keys()][1]}},Qn;const ao=new C(0,0);
var bo=class extends Da{H(){var a=this.O.find(dj,S);if(0!==a.length){var b=this.O.find(Ej);if(0!==b.length){var c=G();for(const f of a){a=f.get(P).position;var d=b[0];let g=Ga(a,b[0].get(P).position);for(let h=0;h<b.length-1;h++){const k=b[h];var e=k.get(P).position;e=Ga(a,e);e<g&&(g=e,d=k)}g>f.get(dj).Og?(ta(f,Oa),f.get(D).Xa=Va(c.Ec.N),f.get(S).wa.x=0,f.get(S).wa.y=0):(void 0===w(f,Oa)&&v(f,Ua(c.Ec.Ca)),d=d.get(P).position,ao.x=d.x,ao.y=d.y,ao.sub(a),a=Fa(ao,ao.length()),a.x*=.05,a.y*=.05,f.get(S).wa.x=
ao.x,f.get(S).wa.y=ao.y)}}}}};function co(a){const b=new D(Va(a),0);return 1<a.frames.length?[b,Ua(a)]:[b]}
var fo=class extends Da{H(a){var b=this.O.find(fj);for(const e of b)if(b=e.get(fj),b.j+=a,3E3<b.j){b.j=0;var c=b=e;if(!Yi(J.ef)){c=c.get(P).position;var d=Ea(this.O.find(Ia)).get(P).position;eo(c,d)&&Xi(J.ef)}Ba(this.O,new x(new gj,new lj,new P(b.get(P).position.kb(),0,new C(O,O)),...co(G().Wc),new R(new C(8,16),new C(4,0)),new S(new C(0,-.1))));Ba(this.O,new x(new gj,new lj,new P(b.get(P).position.kb(),0,new C(O,O)),...co(G().Wc),new R(new C(8,16),new C(4,0)),new S(new C(0,.1))));Ba(this.O,new x(new gj,
new lj,new P(b.get(P).position.kb(),0,new C(O,O)),...co(G().Vc),new R(new C(16,8),new C(0,4)),new S(new C(-.1,0))));Ba(this.O,new x(new gj,new lj,new P(b.get(P).position.kb(),0,new C(O,O)),...co(G().Vc),new R(new C(16,8),new C(0,4)),new S(new C(.1,0))))}}};function eo(a,b){a=new C(a.x/3,a.y/3);b=new C(b.x+4,b.y+4);return b.x<a.x||b.y<a.y||b.x>a.x+320||b.y>a.y+fl/3?!1:!0};var io=class extends Da{constructor(a,b){super(a);this.j=b}H(){var a=this.O.find(nj);for(const e of a){a=[];const f=e.get(nj);for(const g of f.j){var b=this.j,c=e,d=g;b.j.set(c.get(P).position,c.get(R));xl(b.j,d.get(P).position,d.get(R))||a.push(g)}if(f.o){b=[];for(const g of f.j)g.O&&!a.includes(g)&&b.push(g);f.j=b;0===f.j.length&&(go(this.O),ho(this.O),f.o=!1,v(e,new D(Va(G().Ya.ob))))}}}};
function go(a){var b=a.find(oj);a=G();for(const c of b)b=c.get(oj),b.Yc=!b.Yc,c.get(D).Xa=Va(b.Yc?a.blink.Xc:a.blink.Na)}function ho(a){a=a.find(mj);const b=G();for(const c of a)c.get(S).wa.y*=-1,0<c.get(S).wa.y?c.get(D).Xa=Va(b.Ta.Ta):c.get(D).Xa=Va(b.Ta.Jd)};let jo;const ko=new zl;ko.add(Ij,[[ej,lo]]);ko.add(Lj,[[jj,mo]]);ko.add(gj,[[Ej,no],[gj,oo],[qj,po],[cj,po],[R,qo]]);ko.add(N,[[cj,ro],[kj,so],[qj,to]]);ko.add(Kj,[[vj,uo],[cj,vo]]);ko.add(Ej,[[sj,wo],[gj,xo],[rj,yo],[hj,zo],[tj,Ao],[uj,Bo],[ij,Co],[nj,Do],[oj,Eo],[R,Fo]]);ko.add(Gj,[[nj,Do],[sj,oo],[tj,oo],[rj,oo],[oj,Go],[R,Ho]]);ko.add(Hj,[[nj,Do],[sj,oo],[tj,oo],[rj,oo],[oj,Go],[R,Ho]]);ko.add(hj,[[nj,Do],[sj,oo],[tj,oo],[rj,oo],[R,Ho]]);ko.add(mj,[[nj,Do],[sj,oo],[tj,oo],[rj,oo],[R,Io]]);
ko.add(cj,[[nj,Do],[gj,Jo],[Ej,Ko],[sj,oo],[tj,oo],[rj,oo],[oj,Lo],[R,Mo]]);ko.add(pj,[[nj,Do],[qj,No],[Gj,Oo],[Hj,Oo],[rj,yo],[sj,wo],[tj,Ao],[uj,Bo],[oj,Lo],[ij,Po],[R,Mo]]);ko.add(R,[[R,Qo]]);function Fo(a,b,c,d,e){const f=w(d,N);0<c&&f&&(f.o=!0);Ho(a,b,c,d,e)}function uo(a,b,c,d,e){b=d.get(Kj);b.j=0;Yi(J.kd)||(Xi(J.kd,0,!0),Dj());b.Wb=!0;z(a,e);0<kl(d).length||(a=G(),a=new x(Ua(a.Pc),new P,new D(Va(a.Pc),2)),jl(d,a))}
function Ao(a,b,c,d,e){b=Ea(a.find(wj)).get(wj);z(a,e);d=d.get(P).position;Ro(J.rg,d,a);b.Td++;jo&&(a=jo,a.oa.coinCountText=So(a.j));To()}function Bo(a,b,c,d,e){b=Ea(a.find(wj)).get(wj);z(a,e);d=d.get(P).position;Ro(J.vg,d,a);b.Vb++;jo&&1===b.Vb&&Uo()}function Po(a,b,c,d,e){const f=Ea(a.find(wj)).get(wj);0<f.Vb?(f.Vb--,jo&&0===f.Vb&&Uo(),b=d.get(P).position,Ro(J.ff,b,a),z(a,e)):Mo(a,b,c,d,e)}
function Co(a,b,c,d,e){const f=Ea(a.find(wj)).get(wj);0<f.Vb?(f.Vb--,jo&&0===f.Vb&&Uo(),b=d.get(P).position,Ro(J.ff,b,a),z(a,e)):Fo(a,b,c,d,e)}function zo(a,b,c,d,e){Fo(a,b,c,d,e);e=e.get(S);d=d.get(P).position;Ro(J.lg,d,a);e.wa.x=b/6;e.wa.y=c/6}function Mo(a,b,c,d){a=d.get(P).position;d=d.get(S);0!==b?(a.x-=b,d.wa.x=-d.wa.x,d.j.x=-d.j.x):0!==c&&(a.y-=c,d.wa.y=-d.wa.y,d.j.y=-d.j.y)}
function Oo(a,b,c,d,e){Mo(a,b,c,d,e);b=d.get(S);c=e.get(P).position;e=e.get(R).size;const f=e.x>e.y,g=d.get(P).position.kb();d=Fa(d.get(R).size.kb(),2).add(g).sub(c);Ro(J.og,g,a);f?(c=0>b.wa.y,d=ql(0,1,1-d.x/e.x),a=c?.125*Math.PI:1.875*Math.PI,e=c?.875*Math.PI:1.125*Math.PI):(c=0>b.wa.x,d=ql(0,1,1-d.y/e.y),a=c?1.375*Math.PI:1.625*Math.PI,e=c?.625*Math.PI:1.875*Math.PI);a+=(e-a)*d;d=b.wa.length();b.wa.x=Math.cos(a)*d;b.wa.y=-Math.sin(a)*d}
function Io(a,b,c,d,e){const f=d.get(S).wa.kb();Ho(a,b,c,d,e);d.get(S).wa=f}function Eo(a,b,c,d,e){e.get(oj).Yc||Fo(a,b,c,d,e)}function Lo(a,b,c,d,e){e.get(oj).Yc||Mo(a,b,c,d,e)}function Go(a,b,c,d,e){e.get(oj).Yc||Ho(a,b,c,d,e)}function Do(a,b,c,d,e){b=e.get(nj);b.j.push(d);b.o||(b.o=!0,d=d.get(P).position,Ro(J.wg,d,a),v(e,new D(Va(G().Ya.Kb))),go(a),ho(a))}
function vo(a,b,c,d,e){if(w(d,pj))d.get(Kj).Wb?(d=d.get(P).position,Ro(J.Lc,d,a),z(a,e)):Mo(a,b,c,d,e);else if(b=d.get(Kj),c=d.get(P).position,b.Wb)Ro(J.Lc,c,a),z(a,e);else if(Ro(J.Mc,c,a),jo)Vo(jo,d),Wo(a,e);else throw Error("fa");}function lo(a,b,c,d,e){if(d.get(Kj).Wb)w(d,pj)?Mo(a,b,c,d,e):Fo(a,b,c,d,e);else if(jo)Vo(jo,d);else throw Error("fa");}
function Ko(a,b,c,d,e){b=w(e,Kj);c=w(e,N);const f=d.get(P).position;if(b&&b.Wb)Ro(J.Lc,f,a),z(a,d);else if(c&&Xo(e,d))e.get(S).wa.y=-.26,Ro(J.Lc,f,a),z(a,d);else if(jo)Ro(J.Mc,f,a),Vo(jo,e),Wo(a,d);else throw Error("fa");}function Jo(a,b,c,d){Wo(a,d)}function no(a,b,c,d,e){if((b=w(e,Kj))&&b.Wb)z(a,d);else if(jo)b=e.get(P).position,Ro(J.Mc,b,a),Vo(jo,e),z(a,d);else throw Error("fa");}function po(a,b,c,d,e){z(a,d);b=e.get(P).position;w(e,qj)?Ro(J.xe,b,a):Ro(J.Lc,b,a);z(a,e)}function oo(){}
function qo(a,b,c,d){z(a,d)}function xo(a,b,c,d,e){const f=d.get(P).position;if(d.get(Kj).Wb)Fo(a,b,c,d,e);else if(jo)Ro(J.Mc,f,a),Vo(jo,d);else throw Error("fa");}function to(a,b,c,d,e){if(-1===c){z(a,e);const f=d.get(P).position;Ro(J.xe,f,a);To()}Fo(a,b,c,d,e)}function No(a,b,c,d,e){d.get(Kj).Wb||Mo(a,b,c,d,e);z(a,e);b=Ea(a.find(wj)).get(wj);d=d.get(P).position;Ro(J.xe,d,a);b.j++;jo&&(a=jo,a.oa.breakableCountText=Yo(a.j));To()}
function mo(a,b,c,d,e){d.get(Lj).Ue||(d.get(Lj).Ue=!0,b=e.get(jj),d=d.get(P).position,d.x=b.destination.x,d.y=b.destination.y,Ro(J.yg,d,a))}function To(){if(jo)jo.Ge();else throw Error("fa");}function ro(a,b,c,d,e){Xo(d,e)?(b=e.get(P).position,Ro(J.Lc,b,a),z(a,e),a=d.get(S).wa,d.get(N),a.y=-.26):vo(a,b,c,d,e)}function Xo(a,b){a=a.get(P).position;return 9<b.get(P).position.y-a.y}function so(a,b,c,d,e){1===c?(b=d.get(S).wa,d.get(N),b.y=-.39,d=d.get(P).position,Ro(J.xg,d,a)):Fo(a,b,c,d,e)}
function wo(){if(jo)Zo(jo);else throw Error("fa");}function yo(a,b,c,d,e){b=d.get(Ij);b.position!==e.get(P).position&&(b.position=e.get(P).position,d=d.get(P).position,Ro(J.qg,d,a));v(e,new D(Va(G().hb.Kb)))}function Ho(a,b,c,d){a=d.get(P).position;d=d.get(S);0!==b?(a.x-=b,d.j.x=0,d.wa.x=0):0!==c&&(a.y-=c,d.j.y=0,d.wa.y=0)}function Qo(a,b,c,d){a=d.get(P).position;0!==b?a.x-=b:0!==c&&(a.y-=c)}
function Wo(a,b){var c=b.get(cj);if(!c.j&&(c.j=!0,c=c.v(c.o.x,c.o.y),w(c,Oj))){const d=c.get(Oj);v(c,d.j);Ba(a,c);z(a,b)}}function $o(a,b,c,d,e){const f=ko.get(d,e);if(f)f(a,b,c,d,e);else throw console.log("Error: Unexpected collision",d,e,ko),Error("ga");}function Ro(a,b,c){Yi(a)||(c=Ea(c.find(Ia)).get(P).position,eo(c,b)&&Xi(a))};var ap=class extends u{};function bp(a,b,c,d){b=b.getBoundingClientRect();return b.width>b.height?new C((a.pageX-b.x)/(b.width/c),(a.pageY-b.y)/(b.height/d)):new C((a.pageY-b.y)/(b.height/c),(b.width-a.pageX+b.x)/(b.width/d))};/*

 Copyright 2017 Google LLC
 SPDX-License-Identifier: BSD-3-Clause
*/
const cp=new Set,dp=new Map,ep=(a,b)=>{if(void 0!==window.ShadyCSS&&(!window.ShadyCSS.nativeShadow||window.ShadyCSS.ApplyShim)){var c,d,e=(null==(c=window.ShadyDOM)?0:c.inUse)&&!0===(null==(d=window.ShadyDOM)?void 0:d.noPatch)?window.ShadyDOM.wrap:A=>A,f=A=>void 0!==A&&!cp.has(A),g=A=>{let E=dp.get(A);void 0===E&&dp.set(A,E=[]);return E},h=(A,E)=>{const y=g(A),B=0!==y.length;if(B){const M=document.createElement("style");M.textContent=y.join("\n");E.content.appendChild(M)}cp.add(A);dp.delete(A);window.ShadyCSS.prepareTemplateStyles(E,
A);B&&window.ShadyCSS.nativeShadow&&(A=E.content.querySelector("style"),null!==A&&E.content.appendChild(A))},k=new Map,m=a.createElement;a.createElement=function(A,E){A=m.call(a,A,E);E=null==E?void 0:E.scope;void 0!==E&&(window.ShadyCSS.nativeShadow||window.ShadyCSS.prepareTemplateDom(A,E),f(E)&&g(E).push(...Array.from(A.content.querySelectorAll("style")).map(y=>{let B;null==(B=y.parentNode)||B.removeChild(y);return y.textContent})));return A};var p=document.createDocumentFragment(),q=document.createComment("");
b=b.prototype;var t=b.ac;b.ac=function(A,E=this){const y=e(this.qc).parentNode;var B,M=null==(B=this.options)?void 0:B.scope,Q;if((y instanceof ShadowRoot||y===(null==(Q=this.options)?void 0:Q.Ph))&&f(M)){B=this.qc;Q=this.Nc;p.appendChild(q);this.qc=q;this.Nc=null;t.call(this,A,E);A=(null==A?0:A._$litType$)?this.Ea.Be.el:document.createElement("template");h(M,A);p.removeChild(q);let r;if(null==(r=window.ShadyCSS)?0:r.nativeShadow)M=A.content.querySelector("style"),null!==M&&p.appendChild(M.cloneNode(!0));
y.insertBefore(p,Q);this.qc=B;this.Nc=Q}else t.call(this,A,E)};b.xf=function(A){var E,y=null==(E=this.options)?void 0:E.scope;E=k.get(y);void 0===E&&k.set(y,E=new Map);y=E.get(A.Za);void 0===y&&E.set(A.Za,y=new a(A,this.options));return y}}};let fp;null!=(fp=window).litHtmlPolyfillSupport||(fp.litHtmlPolyfillSupport=ep);let gp="";if(window.Symbol){const a=Symbol();"symbol"!==typeof a&&(gp=Object.keys(a)[0])}const hp=""!==gp;var ip=hp?a=>null!=a&&void 0!==a[gp]:()=>!1;
if(hp&&!window.Symbol.for){const a=new Map;window.Symbol.for=b=>{a.has(b)||a.set(b,Symbol(b));return a.get(b)}};const jp=({ReactiveElement:a})=>{if(void 0!==window.ShadyCSS&&(!window.ShadyCSS.nativeShadow||window.ShadyCSS.ApplyShim)){a=a.prototype;window.ShadyDOM&&window.ShadyDOM.inUse&&!0===window.ShadyDOM.noPatch&&window.ShadyDOM.patchElementProto(a);var b=a.Ac;a.Ac=function(){const e=this.localName;if(window.ShadyCSS.nativeShadow)return b.call(this);if(!this.constructor.hasOwnProperty("__scoped")){this.constructor.__scoped=!0;const g=this.constructor.Le.map(m=>m instanceof CSSStyleSheet?Array.from(m.cssRules).reduce((p,
q)=>p+q.cssText,""):m.cssText);let h,k;null==(h=window.ShadyCSS)||null==(k=h.ScopingShim)||k.prepareAdoptedCssText(g,e);void 0===this.constructor.Jg&&window.ShadyCSS.prepareTemplateStyles(document.createElement("template"),e)}let f;return null!=(f=this.shadowRoot)?f:this.attachShadow(this.constructor.Uf)};var c=a.connectedCallback;a.connectedCallback=function(){c.call(this);this.Dd&&window.ShadyCSS.styleElement(this)};var d=a.Ae;a.Ae=function(e){this.Dd||window.ShadyCSS.styleElement(this);d.call(this,
e)}}};let kp;null!=(kp=window).reactiveElementPolyfillSupport||(kp.reactiveElementPolyfillSupport=jp);const lp=({LitElement:a})=>{if(void 0!==window.ShadyCSS&&(!window.ShadyCSS.nativeShadow||window.ShadyCSS.ApplyShim)){a.Jg=!0;a=a.prototype;var b=a.Ac;a.Ac=function(){this.re.scope=this.localName;return b.call(this)}}};let mp;null!=(mp=window).litElementPolyfillSupport||(mp.litElementPolyfillSupport=lp);/*

 Copyright 2018 Google LLC
 SPDX-License-Identifier: BSD-3-Clause
*/
function np(a){return a&&a.uc?a.j():a}
const op={CONSTANT:{Hc(a){return a instanceof Jh},Jc:Mh},JAVASCRIPT:{Hc(a){return a instanceof Oh},Jc:function(a){return a instanceof Oh&&a.constructor===Oh?a.o:"type_error:SafeScript"}},HTML:{Hc(a){return a instanceof hi},Jc:a=>gi(a)},RESOURCE_URL:{Hc(a){return a instanceof Qh},Jc:function(a){return Rh(a)}},STRING:{Hc(a){return a instanceof Object},Jc:np},STYLE:{Hc(a){return a instanceof ei},Jc:function(a){return a instanceof ei&&a.constructor===ei?a.o:"type_error:SafeStyle"}},URL:{Hc(a){return a instanceof
$h},Jc:function(a){return ai(a)}}};function pp(a,b){return b}const qp={CONSTANT:pp,JAVASCRIPT:pp,HTML:a=>{var b={};a=a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");b.Nh&&(a=a.replace(/(^|[\r\n\t ]) /g,"$1&#160;"));b.Mh&&(a=a.replace(/(\r\n|\n|\r)/g,"<br>"));b.Oh&&(a=a.replace(/(\t+)/g,'<span style="white-space:pre">$1</span>'));b=ji(a);return gi(b)},RESOURCE_URL:pp,STRING:String,STYLE:pp,URL:(a,b)=>{a=Ik(a);return void 0===a?b:a.toString()}};function rp(a,b,c){if(Object.hasOwnProperty.call(sp,a)&&(a=sp[a],Object.hasOwnProperty.call(a,b)&&(a=a[b],a instanceof Array))){let e=null,f=!1;for(let g=0,h=a.length;g<h;++g){const k=a[g];var d=k.Oa;if(!d)return k.ya;null===e&&(e={});d=Object.hasOwnProperty.call(e,d)?e[d]:e[d]=c(d);if(d===k.Ra)return k.ya;null==d&&(f=!0)}if(f)return null}b=tp[b];return"number"===typeof b?b:null}
const tp={align:1,alt:1,"aria-activedescendant":10,"aria-atomic":1,"aria-autocomplete":1,"aria-busy":1,"aria-checked":1,"aria-controls":10,"aria-current":1,"aria-disabled":1,"aria-dropeffect":1,"aria-expanded":1,"aria-haspopup":1,"aria-hidden":1,"aria-invalid":1,"aria-label":1,"aria-labelledby":10,"aria-level":1,"aria-live":1,"aria-multiline":1,"aria-multiselectable":1,"aria-orientation":1,"aria-owns":10,"aria-posinset":1,"aria-pressed":1,"aria-readonly":1,"aria-relevant":1,"aria-required":1,"aria-selected":1,
"aria-setsize":1,"aria-sort":1,"aria-valuemax":1,"aria-valuemin":1,"aria-valuenow":1,"aria-valuetext":1,async:8,autocapitalize:1,autocomplete:1,autocorrect:1,autofocus:1,autoplay:1,bgcolor:1,border:1,cellpadding:1,cellspacing:1,checked:1,cite:3,"class":1,color:1,cols:1,colspan:1,contenteditable:1,controls:1,datetime:1,dir:8,disabled:1,download:1,draggable:1,enctype:1,face:1,"for":10,formenctype:1,frameborder:1,height:1,hidden:1,href:4,hreflang:1,id:10,ismap:1,itemid:1,itemprop:1,itemref:1,itemscope:1,
itemtype:1,label:1,lang:1,list:10,loading:8,loop:1,max:1,maxlength:1,media:1,min:1,minlength:1,multiple:1,muted:1,name:10,nonce:1,open:1,placeholder:1,poster:3,preload:1,rel:1,required:1,reversed:1,role:1,rows:1,rowspan:1,selected:1,shape:1,size:1,sizes:1,slot:1,span:1,spellcheck:1,src:4,srcset:11,start:1,step:1,style:5,summary:1,tabindex:1,target:8,title:1,translate:1,type:1,valign:1,value:1,width:1,wrap:1},sp={a:{href:[{ya:3}]},area:{href:[{ya:3}]},audio:{src:[{ya:3}]},button:{formaction:[{ya:3}],
formmethod:[{ya:1}]},form:{action:[{ya:3}],method:[{ya:1}]},iframe:{srcdoc:[{ya:2}]},img:{src:[{ya:3}]},input:{accept:[{ya:1}],formaction:[{ya:3}],formmethod:[{ya:1}],pattern:[{ya:1}],readonly:[{ya:1}],src:[{ya:3}]},link:{href:[{ya:3,Oa:"rel",Ra:"alternate"},{ya:3,Oa:"rel",Ra:"author"},{ya:3,Oa:"rel",Ra:"bookmark"},{ya:3,Oa:"rel",Ra:"canonical"},{ya:3,Oa:"rel",Ra:"cite"},{ya:3,Oa:"rel",Ra:"help"},{ya:3,Oa:"rel",Ra:"icon"},{ya:3,Oa:"rel",Ra:"license"},{ya:3,Oa:"rel",Ra:"next"},{ya:3,Oa:"rel",Ra:"prefetch"},
{ya:3,Oa:"rel",Ra:"dns-prefetch"},{ya:3,Oa:"rel",Ra:"prerender"},{ya:3,Oa:"rel",Ra:"preconnect"},{ya:3,Oa:"rel",Ra:"preload"},{ya:3,Oa:"rel",Ra:"prev"},{ya:3,Oa:"rel",Ra:"search"},{ya:3,Oa:"rel",Ra:"subresource"}]},script:{defer:[{ya:1}]},source:{src:[{ya:3}]},textarea:{readonly:[{ya:1}]},video:{src:[{ya:3}]}},up={a:1,abbr:1,address:1,applet:4,area:5,article:1,aside:1,audio:1,b:1,base:4,bdi:1,bdo:1,blockquote:1,body:1,br:5,button:1,canvas:1,caption:1,center:1,cite:1,code:1,col:5,colgroup:1,command:1,
data:1,datalist:1,dd:1,del:1,details:1,dfn:1,dialog:1,div:1,dl:1,dt:1,em:1,embed:4,fieldset:1,figcaption:1,figure:1,font:1,footer:1,form:1,frame:1,frameset:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,head:1,header:1,hr:5,html:1,i:1,iframe:1,img:5,input:5,ins:1,kbd:1,label:1,legend:1,lh:1,li:1,link:5,main:1,map:1,mark:1,math:4,menu:1,meta:4,meter:1,nav:1,noscript:1,object:4,ol:1,optgroup:1,option:1,output:1,p:1,param:5,picture:1,pre:1,progress:1,q:1,rb:1,rp:1,rt:1,rtc:1,ruby:1,s:1,samp:1,script:3,section:1,select:1,
slot:1,small:1,source:5,span:1,strong:1,style:2,sub:1,summary:1,sup:1,svg:4,table:1,tbody:1,td:1,template:4,textarea:6,tfoot:1,th:1,thead:1,time:1,title:6,tr:1,track:5,u:1,ul:1,"var":1,video:1,wbr:5},vp=[{auto:!0,ltr:!0,rtl:!0},{async:!0},{eager:!0,lazy:!0},{_self:!0,_blank:!0}],wp={"*":{async:1,dir:0,loading:2,target:3}};function xp(a){var b=yp;if(!b){b=zp();const d={};for(var c in b)d[b[c]]=c;b=yp=d}c=b[a];return"string"===typeof c?c:String(a).replace(/([A-Z])/g,"-$1").toLowerCase()}function Ap(a){a=String(a).toLowerCase();const b=zp()[a];return"string"===typeof b?b:ri(a)}function Bp(a){a=a.toLowerCase();a=zp()[a];return"string"===typeof a?a:null}function zp(){if(!Cp){const a=Object.assign({},Dp);for(const b of Ep)a[b.toLowerCase()]=b;Cp=a}return Cp}
const Ep="aLink accessKey allowFullscreen bgColor cellPadding cellSpacing codeBase codeType contentEditable crossOrigin dateTime dirName formAction formEnctype formMethod formNoValidate formTarget frameBorder innerHTML innerText inputMode isMap longDesc marginHeight marginWidth maxLength mediaGroup minLength noHref noResize noShade noValidate noWrap nodeValue outerHTML outerText readOnly tabIndex textContent trueSpeed useMap vAlign vLink valueAsDate valueAsNumber valueType".split(" "),Dp={accept_charset:"acceptCharset",
"char":"ch",charoff:"chOff",checked:"defaultChecked","class":"className","for":"htmlFor",http_equiv:"httpEquiv",muted:"defaultMuted",selected:"defaultSelected",value:"defaultValue"};let Cp=null,yp=null;/*

 Copyright 2017 Google LLC
 SPDX-License-Identifier: BSD-3-Clause

*/
const Fp={},Gp=RegExp("^(?!(?:annotation-xml|color-profile|font-face|font-face(?:-(?:src|uri|format|name))?|missing-glyph)$)[a-z][a-z.0-9_\u00b7\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u037d\u200c\u200d\u203f-\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\udfff\uf900-\ufdcf\ufdf0-\ufffd]*-[\\-a-z.0-9_\u00b7\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u037d\u200c\u200d\u203f-\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\udfff\uf900-\ufdcf\ufdf0-\ufffd]*$");
function Hp(a,b){const c=window.customElements;return c&&c.get(a)||!0===Fp[a]?2:"HTMLUnknownElement"===b.name?1:"HTMLElement"===b.name&&Gp.test(a)?3:0};/*

 Copyright 2020 Google LLC
 SPDX-License-Identifier: BSD-3-Clause
*/
function Ip(a,b){switch(b){case "innerHTML":return 1===Jp(a)?2:null;case "textContent":return a=Jp(a),1===a||6===a?1:null;default:let c,d;return null!=(d=null==(c=Kp[a.localName])?void 0:c[b])?d:null}}function Jp(a){const b=a.localName,c=Hp(b,a.constructor);switch(c){case 0:case 1:return Lp(b,a);case 3:case 2:return 1;default:Ck(c,"got an unknown element classification")}}
function Lp(a,b){var c=Object.hasOwnProperty.call(up,a)?up[a]:null;return null!==c?c:Object.hasOwnProperty.call(Mp,a)&&b instanceof SVGElement?Mp[a]:null}const Mp={text:1},Kp={audio:{currentTime:1,srcObject:1},video:{currentTime:1,srcObject:1}};const Np=/(?!,)([^\t\n\f\r ]+)(?:[\t\n\f\r ]+([.0-9+\-]+[a-z]?))?/gi,Op=/[\t\n\f\r ]+/,Pp=/[\t\n\f\r ,]+/g;function Qp(a){return(a=a.split(Op,2))?{url:a[0],metadata:a[1]}:null}function Rp(a){let b=String(a.url).replace(Pp,encodeURIComponent);if(a=a.metadata){Pp.lastIndex=0;if(Pp.test(a))return null;b+=" "+a}return b}const Sp=(a,b,c)=>c,Tp={};
function Up(a,b,c){const d=[,{Eb(e,f,g){return g},Fb:void 0,Xb:void 0,Yb:void 0},{Eb:void 0,Fb:void 0,Xb:void 0,Yb:"HTML"}];d[3]={Eb:void 0,Fb:void 0,Xb:Vp,Yb:"URL"};d[4]={Eb:void 0,Fb:void 0,Xb:Vp,Yb:"RESOURCE_URL"};d[5]={Eb:void 0,Fb:void 0,Xb:Wp,Yb:"STYLE"};d[7]={Eb:void 0,Fb:void 0,Xb:Xp,Yb:"JAVASCRIPT"};d[8]={Eb:void 0,Fb(e,f,g){g=String(g).toLowerCase();a:{let h=null;(e=wp[e])&&(h=e[f]);if("number"!==typeof h&&((e=wp["*"])&&(h=e[f]),"number"!==typeof h)){f=!1;break a}f=!0===vp[h][String(g).toLowerCase()]}return f?
g:Wp},Xb:Wp,Yb:void 0};d[9]={Eb:void 0,Fb:void 0,Xb:Wp,Yb:"CONSTANT"};d[10]={Eb:void 0,Fb(e,f,g){return a.test(g)?g:Wp},Xb:Wp,Yb:"CONSTANT"};d[11]={Eb(e,f,g,h){if("string"===typeof g)var k=(k=g.match(Np))?k.map(Qp).filter(Boolean):[];else if(Array.isArray(g))k=g;else return Vp;var m=k;k=[];var p=[];const q={};if(Array.isArray(m))for(let t=0,A=m.length;t<A;++t){const E=m[t],y=E&&E.url;if(y){const B=b(y,"URL",q);if(B){const M=B!==q;(M?k:p).push({url:M?B:y,metadata:E.metadata})}}}else p.push(m);m=p.length?
JSON.stringify(p):null;p=Tp;if(k.length){if(!Array.isArray(k))throw Error();p=k.map(Rp).filter(Boolean).join(" , ")||Tp}m&&c&&c(!0,`Failed to sanitize attribute value of <${e}>: <${e} ${f}="${g}">: ${m}`,h);return p===Tp?Vp:p},Fb:void 0,Xb:void 0,Yb:void 0};return d}
const {Ag:Wp,zg:Xp,Bg:Vp}=(()=>{var a=(()=>{const d={createHTML:()=>"zClosurez",createScript:()=>" /*zClosurez*/ ",createScriptURL:()=>"about:invalid#zClosurez"};return"undefined"!==typeof trustedTypes?trustedTypes.createPolicy("polymer_resin",d):d})();const b=a.createHTML(""),c=a.createScript("");a=a.createScriptURL("");return{Ag:b,zg:c,Bg:a}})();/*

 Copyright 2019 Google LLC
 SPDX-License-Identifier: BSD-3-Clause
*/
var Yp=function(a){function b(k){const m=k.localName;if(!k.getAttribute("is")&&2===Hp(m,k.constructor))return h;(k=g[m])||(k=g[m]=document.createElement(m));return k}let c=a.reportHandler||void 0;const d=a.safeTypesBridge||Sp;let e=/^$/;if(a=a.allowedIdentifierPrefixes)for(const k of a)e=new RegExp(e.source+"|^"+String(k).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08"));c&&c(!1,"initResin",null);const f=Up(e,d,c),g={},h=document.createElement("polyresinuncustomized");return function(k,
m,p){var q=k.nodeType;if(q!==Node.ELEMENT_NODE){if(q===Node.TEXT_NODE){m=k.parentElement;p=!m;if(m&&m.nodeType===Node.ELEMENT_NODE){q=m.localName;var t=Hp(q,m.constructor);switch(t){case 0:case 1:m=Lp(q,m);p=1===m||6===m;break;case 3:case 2:p=!0;break;default:Ck(t,"got an unknown element classification")}}if(p)return B=>""+d(B,"STRING",B)}return B=>{if(!B&&B!==document.all)return B;c&&c(!0,`Failed to sanitize ${k.parentElement&&k.parentElement.nodeName} #text node to value ${B}`,k.parentElement);
return Wp}}const A=k.localName;q=b(k);let E=null;switch(p){case "attribute":if(Ap(m)in q)break;return B=>B;case "property":if(m in q){E=Ip(q,m);break}if((t=Bp(m))&&t in q)break;return B=>B;default:Ck(p,"got an unknown resin type, expected either 'property' or 'attribute'")}const y="attribute"===p?m.toLowerCase():xp(m);E||(E=rp(A,y,B=>{const M=k.getAttribute(B);return!M||/[\[\{]/.test(B)?null:M}));return B=>{var M=Tp;let Q=null;if(!B&&B!==document.all)return B;if(null!=E){const r=f[E],na=r.Yb;Q=r.Xb;
na&&(M=d(B,na,Tp));M===Tp&&(r.Fb?(M=String(d(B,"STRING",B)),M=r.Fb(A,y,M)):r.Eb&&(M=r.Eb(A,y,B,k)),M===Q&&(M=Tp))}M===Tp&&(M=Q||Wp,c&&c(!0,`Failed to sanitize attribute of <${A}>: <${A} ${y}="${B}">`,k));return M}}}({allowedIdentifierPrefixes:[""],reportHandler:function(){},safeTypesBridge:(a,b,c)=>{var d=op[b];return d.Hc(a)&&(d=d.Jc(a,c),d!==c)?d:(0,qp[b])(String(np(a)),c)}});const Zp=window;let $p,aq,bq;
const cq=(null==($p=Zp.ShadyDOM)?0:$p.inUse)&&(!0===(null==(aq=Zp.ShadyDOM)?void 0:aq.noPatch)||"on-demand"===(null==(bq=Zp.ShadyDOM)?void 0:bq.noPatch))?Zp.ShadyDOM.wrap:a=>a,dq=Zp.trustedTypes,eq=dq?dq.createPolicy("lit-html",{createHTML:a=>a}):void 0,fq=a=>a,gq=()=>fq,hq=new Map,iq=`lit$${String(Math.random()).slice(9)}$`,jq="?"+iq,kq=`<${jq}>`,lq=document,mq=a=>null===a||"object"!=typeof a&&"function"!=typeof a||ip(a),nq=Array.isArray,oq=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pq=
/--\x3e/g,qq=/>/g,rq=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),sq=/'/g,tq=/"/g,uq=/^(?:script|style|textarea|title)$/i;var vq=(a,...b)=>({_$litType$:1,Za:a,values:b}),wq=Symbol.for("lit-noChange"),xq=Symbol.for("lit-nothing");const yq=new WeakMap,zq=lq.createTreeWalker(lq,129,null,!1);
var Aq=class{constructor({Za:a,_$litType$:b},c){this.j=[];let d=0,e=0;const f=a.length-1,g=this.j;var h=a.length-1,k=[];let m=2===b?"<svg>":"",p,q=oq;for(let y=0;y<h;y++){const B=a[y];let M=-1,Q;var t=0;let r;for(;t<B.length;){q.lastIndex=t;r=q.exec(B);if(null===r)break;t=q.lastIndex;if(q===oq)"!--"===r[1]?q=pq:void 0!==r[1]?q=qq:void 0!==r[2]?(uq.test(r[2])&&(p=new RegExp(`</${r[2]}`,"g")),q=rq):void 0!==r[3]&&(q=rq);else if(q===rq)if(">"===r[0]){let na;q=null!=(na=p)?na:oq;M=-1}else void 0===r[1]?
M=-2:(M=q.lastIndex-r[2].length,Q=r[1],q=void 0===r[3]?rq:'"'===r[3]?tq:sq);else q===tq||q===sq?q=rq:q===pq||q===qq?q=oq:(q=rq,p=void 0)}t=q===rq&&a[y+1].startsWith("/>")?" ":"";m+=q===oq?B+kq:0<=M?(k.push(Q),B.slice(0,M)+"$lit$"+B.slice(M))+iq+t:B+iq+(-2===M?(k.push(void 0),y):t)}h=m+(a[h]||"<?>")+(2===b?"</svg>":"");if(!Array.isArray(a)||!a.hasOwnProperty("raw"))throw Error("ha");a=[void 0!==eq?eq.createHTML(h):h,k];const [A,E]=a;this.el=Aq.createElement(A,c);zq.currentNode=this.el.content;2===
b&&(b=this.el.content,c=b.firstChild,c.remove(),b.append(...c.childNodes));for(;null!==(b=zq.nextNode())&&g.length<f;){if(1===b.nodeType){if(b.hasAttributes()){c=[];for(const y of b.getAttributeNames())if(y.endsWith("$lit$")||y.startsWith(iq))k=E[e++],c.push(y),void 0!==k?(a=b.getAttribute(k.toLowerCase()+"$lit$").split(iq),k=/([.?@])?(.*)/.exec(k),g.push({type:1,index:d,name:k[2],Za:a,Cc:"."===k[1]?Bq:"?"===k[1]?Cq:"@"===k[1]?Dq:Eq})):g.push({type:6,index:d});for(const y of c)b.removeAttribute(y)}if(uq.test(b.tagName)&&
(c=b.textContent.split(iq),a=c.length-1,0<a)){b.textContent=dq?dq.emptyScript:"";for(k=0;k<a;k++)b.append(c[k],lq.createComment("")),zq.nextNode(),g.push({type:2,index:++d});b.append(c[a],lq.createComment(""))}}else if(8===b.nodeType)if(b.data===jq)g.push({type:2,index:d});else for(c=-1;-1!==(c=b.data.indexOf(iq,c+1));)g.push({type:7,index:d}),c+=iq.length-1;d++}}static createElement(a){const b=lq.createElement("template");b.innerHTML=a;return b}};
function Fq(a,b,c=a,d){if(b===wq)return b;var e;let f=void 0!==d?null==(e=c.o)?void 0:e[d]:c.va;e=mq(b)?void 0:b._$litDirective$;let g;if((null==(g=f)?void 0:g.constructor)!==e){let h,k;null==(h=f)||null==(k=h._$notifyDirectiveConnectionChanged)||k.call(h,!1);void 0===e?f=void 0:(f=new e(a),f.Kg(a,c,d));if(void 0!==d){let m;(null!=(m=c.o)?m:c.o=[])[d]=f}else c.va=f}void 0!==f&&(b=Fq(a,f.Lg(a,b.values),f,d));return b}
class Gq{constructor(a,b){this.o=[];this.H=void 0;this.Be=a;this.j=b}get Zb(){return this.j.Zb}U(a){const {el:{content:b},j:c}=this.Be;var d;const e=(null!=(d=null==a?void 0:a.Bh)?d:lq).importNode(b,!0);zq.currentNode=e;d=zq.nextNode();let f=0,g=0,h=c[0];for(;void 0!==h;){if(f===h.index){let m;2===h.type?m=new Hq(d,d.nextSibling,this,a):1===h.type?m=new h.Cc(d,h.name,h.Za,this,a):6===h.type&&(m=new Iq(d,this,a));this.o.push(m);h=c[++g]}let k;f!==(null==(k=h)?void 0:k.index)&&(d=zq.nextNode(),f++)}return e}v(a){let b=
0;for(const c of this.o)void 0!==c&&(void 0!==c.Za?(c.ac(a,c,b),b+=c.Za.length-2):c.ac(a[b])),b++}}function Jq(a,b){if(void 0===a.j){a.W=b;let c;null==(c=a.ta)||c.call(a,b)}}
var Hq=class{constructor(a,b,c,d){this.type=2;this.Ea=xq;this.H=void 0;this.qc=a;this.Nc=b;this.j=c;this.options=d;let e;this.W=null!=(e=null==d?void 0:d.isConnected)?e:!0;this.o=void 0}get Zb(){let a,b;return null!=(b=null==(a=this.j)?void 0:a.Zb)?b:this.W}ac(a,b=this){a=Fq(this,a,b);mq(a)?a===xq||null==a||""===a?(this.Ea!==xq&&this.v(),this.Ea=xq):a!==this.Ea&&a!==wq&&this.ha(a):void 0!==a._$litType$?this.Ka(a):void 0!==a.nodeType?this.U(a):nq(a)||"function"===typeof(null==a?void 0:a[Symbol.iterator])?
this.Da(a):this.ha(a)}V(a,b=this.Nc){return cq(cq(this.qc).parentNode).insertBefore(a,b)}U(a){if(this.Ea!==a){this.v();if(Yp!==gq){let b;const c=null==(b=this.qc.parentNode)?void 0:b.nodeName;if("STYLE"===c||"SCRIPT"===c)throw Error("ia");}this.Ea=this.V(a)}}ha(a){if(this.Ea!==xq&&mq(this.Ea)){var b=cq(this.qc).nextSibling;void 0===this.o&&(this.o=Yp(b,"data","property"));a=this.o(a);b.data=a}else b=document.createTextNode(""),this.U(b),void 0===this.o&&(this.o=Yp(b,"data","property")),a=this.o(a),
b.data=a;this.Ea=a}Ka(a){const {values:b,_$litType$:c}=a;a="number"===typeof c?this.xf(a):(void 0===c.el&&(c.el=Aq.createElement(c.h,this.options)),c);var d;(null==(d=this.Ea)?void 0:d.Be)===a?this.Ea.v(b):(d=new Gq(a,this),a=d.U(this.options),d.v(b),this.U(a),this.Ea=d)}xf(a){const b=a.Za;let c=yq.get(b);if(void 0===c){const d=b.join("\x00");c=hq.get(d);void 0===c&&(c=new Aq(a),hq.set(d,c));yq.set(b,c)}return c}Da(a){nq(this.Ea)||(this.Ea=[],this.v());const b=this.Ea;let c=0,d;for(const e of a)c===
b.length?b.push(d=new Hq(this.V(lq.createComment("")),this.V(lq.createComment("")),this,this.options)):d=b[c],d.ac(e),c++;c<b.length&&(this.v(d&&cq(d.Nc).nextSibling,c),b.length=c)}v(a=cq(this.qc).nextSibling,b){let c;for(null==(c=this.ta)||c.call(this,!1,!0,b);a&&a!==this.Nc;)b=cq(a).nextSibling,cq(a).remove(),a=b}},Eq=class{constructor(a,b,c,d,e){this.type=1;this.Ea=xq;this.H=void 0;this.element=a;this.name=b;this.j=d;this.options=e;2<c.length||""!==c[0]||""!==c[1]?(this.Ea=Array(c.length-1).fill(new String),
this.Za=c):this.Ea=xq;this.Oc=void 0}get tagName(){return this.element.tagName}get Zb(){return this.j.Zb}ac(a,b=this,c,d){const e=this.Za;let f=!1;if(void 0===e){if(a=Fq(this,a,b,0),f=!mq(a)||a!==this.Ea&&a!==wq)this.Ea=a}else{const g=a;a=e[0];let h,k;for(h=0;h<e.length-1;h++){k=Fq(this,g[c+h],b,h);k===wq&&(k=this.Ea[h]);f||(f=!mq(k)||k!==this.Ea[h]);if(k===xq)a=xq;else if(a!==xq){let m;a+=(null!=(m=k)?m:"")+e[h+1]}this.Ea[h]=k}}f&&!d&&this.Ce(a)}Ce(a){if(a===xq)cq(this.element).removeAttribute(this.name);
else{void 0===this.Oc&&(this.Oc=Yp(this.element,this.name,"attribute"));let b;a=this.Oc(null!=(b=a)?b:"");let c;cq(this.element).setAttribute(this.name,null!=(c=a)?c:"")}}},Bq=class extends Eq{constructor(){super(...arguments);this.type=3}Ce(a){void 0===this.Oc&&(this.Oc=Yp(this.element,this.name,"property"));a=this.Oc(a);this.element[this.name]=a===xq?void 0:a}};const Kq=dq?dq.emptyScript:"";
var Cq=class extends Eq{constructor(){super(...arguments);this.type=4}Ce(a){a&&a!==xq?cq(this.element).setAttribute(this.name,Kq):cq(this.element).removeAttribute(this.name)}},Dq=class extends Eq{constructor(a,b,c,d,e){super(a,b,c,d,e);this.type=5}ac(a,b=this){var c;a=null!=(c=Fq(this,a,b,0))?c:xq;if(a!==wq){b=this.Ea;c=a===xq&&b!==xq||a.capture!==b.capture||a.once!==b.once||a.passive!==b.passive;var d=a!==xq&&(b===xq||c);c&&this.element.removeEventListener(this.name,this,b);d&&this.element.addEventListener(this.name,
this,a);this.Ea=a}}handleEvent(a){if("function"===typeof this.Ea){let b,c;this.Ea.call(null!=(c=null==(b=this.options)?void 0:b.host)?c:this.element,a)}else this.Ea.handleEvent(a)}},Iq=class{constructor(a,b,c){this.element=a;this.type=6;this.H=void 0;this.j=b;this.options=c}get Zb(){return this.j.Zb}ac(a){Fq(this,a)}};let Lq;null==(Lq=window.litHtmlPolyfillSupport)||Lq(Aq,Hq);let Mq;(null!=(Mq=Zp.litHtmlVersions)?Mq:Zp.litHtmlVersions=[]).push("2.4.0");const Nq=window;var Oq=Nq.ShadowRoot&&(void 0===Nq.ShadyCSS||Nq.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype;const Pq=Symbol(),Qq=new WeakMap;
var Rq=class{constructor(a,b){this._$cssResult$=!0;if(Pq!==Pq)throw Error("ja");this.cssText=a;this.o=b}get j(){let a=this.v;const b=this.o;if(Oq&&void 0===a){const c=void 0!==b&&1===b.length;c&&(a=Qq.get(b));void 0===a&&((this.v=a=new CSSStyleSheet).replaceSync(this.cssText),c&&Qq.set(b,a))}return a}toString(){return this.cssText}},V=(a,...b)=>{b=1===a.length?a[0]:b.reduce((c,d,e)=>{if(!0===d._$cssResult$)d=d.cssText;else if("number"!==typeof d)throw Error("ka`"+d);return c+d+a[e+1]},a[0]);return new Rq(b,
a)},Sq=(a,b)=>{Oq?a.adoptedStyleSheets=b.map(c=>c instanceof CSSStyleSheet?c:c.j):b.forEach(c=>{const d=document.createElement("style"),e=Nq.litNonce;void 0!==e&&d.setAttribute("nonce",e);d.textContent=c.cssText;a.appendChild(d)})},Tq=Oq?a=>a:a=>{if(a instanceof CSSStyleSheet){let b="";for(const c of a.cssRules)b+=c.cssText;a=new Rq("string"===typeof b?b:String(b))}return a};var Uq=!/^\s*class\s*\{\s*\}\s*$/.test(class{}.toString());/*

 Copyright 2016 Google LLC
 SPDX-License-Identifier: BSD-3-Clause
*/
(function(){if(Uq&&!HTMLElement.es5Shimmed&&void 0!==ka.Reflect&&void 0!==ka.customElements&&!ka.customElements.polyfillWrapFlushCallback){var a=HTMLElement;ka.HTMLElement=function(){return Reflect.construct(a,[],this.constructor)};HTMLElement.prototype=a.prototype;HTMLElement.prototype.constructor=HTMLElement;HTMLElement.es5Shimmed=!0;Object.setPrototypeOf(HTMLElement,a)}})();const Vq=window,Wq=Vq.trustedTypes,Xq=Wq?Wq.emptyScript:"",Yq=Vq.reactiveElementPolyfillSupport;var Zq={Xf(a,b){switch(b){case Boolean:a=a?Xq:null;break;case Object:case Array:a=null==a?a:JSON.stringify(a)}return a},Ne(a,b){let c=a;switch(b){case Boolean:c=null!==a;break;case Number:c=null===a?null:Number(a);break;case Object:case Array:try{c=JSON.parse(a)}catch(d){c=null}}return c}},$q=(a,b)=>b!==a&&(b===b||a===a);const ar={Fe:!0,type:String,Sc:Zq,Tf:!1,Ug:$q};
function br(a){if(!a.hasOwnProperty("finalized")){a.finalized=!0;var b=Object.getPrototypeOf(a);br(b);void 0!==b.De&&(a.De=[...b.De]);a.Dc=new Map(b.Dc);a.zf=new Map;if(a.hasOwnProperty("Sf")){b=a.Sf;const d=[...Object.getOwnPropertyNames(b),...Object.getOwnPropertySymbols(b)];for(var c of d)cr(a,c,b[c])}b=a.j;c=[];if(Array.isArray(b)){b=new Set(b.flat(Infinity).reverse());for(const d of b)c.unshift(Tq(d))}else void 0!==b&&c.push(Tq(b));a.Le=c}}
function dr(a,b,c){return{get(){return this[b]},set(d){const e=this[a];this[b]=d;er(this,a,e,c)},configurable:!0,enumerable:!0}}function cr(a,b,c=ar){c.state&&(c.Fe=!1);br(a);a.Dc.set(b,c);c.Kh||a.prototype.hasOwnProperty(b)||(c=dr(b,"symbol"===typeof b?Symbol():`__${b}`,c),void 0!==c&&Object.defineProperty(a.prototype,b,c))}
function er(a,b,c,d){let e=!0;void 0!==b&&(d=d||a.constructor.Dc.get(b)||ar,(d.Ug||$q)(a[b],c)?(a.W.has(b)||a.W.set(b,c),!0===d.Tf&&a.v!==b&&(void 0===a.U&&(a.U=new Map),a.U.set(b,d))):e=!1);!a.V&&e&&(a.Ka=a.Qd())}function fr(a){if(a.V){a.ha&&(a.ha.forEach((d,e)=>a[e]=d),a.ha=void 0);var b=!1,c=a.W;try{b=!0;a.jd();let d;null==(d=a.Da)||d.forEach(e=>{let f;return null==(f=e.Gh)?void 0:f.call(e)});a.ta(c)}catch(d){throw b=!1,a.ab(),d;}b&&a.Ae(c)}}
var gr=class extends HTMLElement{constructor(){super();this.ha=new Map;this.Dd=this.V=!1;this.v=null;this.Eg()}static get observedAttributes(){br(this);const a=[];this.Dc.forEach((b,c)=>{b=this.yf(c,b);void 0!==b&&(this.zf.set(b,c),a.push(b))});return a}static yf(a,b){b=b.Fe;return!1===b?void 0:"string"===typeof b?b:"string"===typeof a?a.toLowerCase():void 0}Eg(){this.Ka=new Promise(b=>this.xc=b);this.W=new Map;this.Cg();er(this);let a;null==(a=this.constructor.De)||a.forEach(b=>b(this))}Cg(){this.constructor.Dc.forEach((a,
b)=>{this.hasOwnProperty(b)&&(this.ha.set(b,this[b]),delete this[b])})}Ac(){let a;const b=null!=(a=this.shadowRoot)?a:this.attachShadow(this.constructor.Uf);Sq(b,this.constructor.Le);return b}connectedCallback(){void 0===this.Va&&(this.Va=this.Ac());this.xc(!0);let a;null==(a=this.Da)||a.forEach(b=>{let c;return null==(c=b.Eh)?void 0:c.call(b)})}xc(){}disconnectedCallback(){let a;null==(a=this.Da)||a.forEach(b=>{let c;return null==(c=b.Fh)?void 0:c.call(b)})}attributeChangedCallback(a,b,c){this.Pd(a,
c)}Rd(a,b,c=ar){const d=this.constructor.yf(a,c);if(void 0!==d&&!0===c.Tf){let e;const f=(void 0!==(null==(e=c.Sc)?void 0:e.Xf)?c.Sc:Zq).Xf(b,c.type);this.v=a;null==f?this.removeAttribute(d):this.setAttribute(d,f);this.v=null}}Pd(a,b){var c=this.constructor;a=c.zf.get(a);if(void 0!==a&&this.v!==a){c=c.Dc.get(a)||ar;let d;const e="function"===typeof c.Sc?{Ne:c.Sc}:void 0!==(null==(d=c.Sc)?void 0:d.Ne)?c.Sc:Zq;this.v=a;this[a]=e.Ne(b,c.type);this.v=null}}Qd(){const a=this;return ha(function*(){a.V=
!0;try{yield a.Ka}catch(c){a.yh||Promise.reject(c)}const b=fr(a);null!=b&&(yield b);return!a.V})}jd(){}Ae(){let a;null==(a=this.Da)||a.forEach(b=>{let c;return null==(c=b.Hh)?void 0:c.call(b)});this.Dd||(this.Dd=!0);this.Kc()}ab(){this.W=new Map;this.V=!1}get Hg(){return this.Ka}ta(){void 0!==this.U&&(this.U.forEach((a,b)=>this.Rd(b,this[b],a)),this.U=void 0);this.ab()}Kc(){}};gr.finalized=!0;gr.Dc=new Map;gr.Le=[];gr.Uf={mode:"open"};null==Yq||Yq({ReactiveElement:gr});let hr;
(null!=(hr=Vq.reactiveElementVersions)?hr:Vq.reactiveElementVersions=[]).push("1.4.2");var ir=class extends gr{constructor(){super(...arguments);this.re={host:this};this.va=void 0}Ac(){const a=super.Ac();let b;null!=(b=this.re).We||(b.We=a.firstChild);return a}ta(a){const b=this.o();this.Dd||(this.re.isConnected=this.isConnected);super.ta(a);a=this.Va;var c=this.re,d;const e=null!=(d=null==c?void 0:c.We)?d:a;d=e._$litPart$;if(void 0===d){let f;d=null!=(f=null==c?void 0:c.We)?f:null;e._$litPart$=d=new Hq(a.insertBefore(lq.createComment(""),d),d,void 0,null!=c?c:{})}d.ac(b);this.va=d}connectedCallback(){super.connectedCallback();
let a;null==(a=this.va)||Jq(a,!0)}disconnectedCallback(){super.disconnectedCallback();let a;null==(a=this.va)||Jq(a,!1)}o(){return wq}};ir.finalized=!0;ir._$litElement$=!0;let jr;null==(jr=window.litElementPolyfillSupport)||jr({LitElement:ir});let kr,lr;(null!=(lr=(kr=window).litElementVersions)?lr:kr.litElementVersions=[]).push("3.2.2");var mr=V``,nr=[V`main-sprite.png`];var or={ad:["ca"],ae:["ar","en","fa","hi","ur"],af:["ps","fa"],ag:["en"],ai:["en"],al:["sq","en"],am:["hy","ru"],ao:["pt-PT"],ar:["es-419","es"],as:["en"],at:["de"],au:["en"],az:["az","ru"],ba:["bs","hr","sr"],bd:["bn","en"],be:["nl","de","en","fr"],bf:["fr"],bg:["bg"],bh:["ar","en"],bi:["fr"],bj:["fr"],bn:["ms","en","zh-CN"],bo:["es-419","es"],br:["pt-BR","en"],bs:["en"],bt:["en"],bw:["tn","en"],by:["be","ru"],bz:["en","es","es-419"],ca:["en","fr","fr-CA"],cd:["fr","sw"],cf:["fr"],cg:["fr"],ch:["de",
"en","fr","it"],ci:["fr"],ck:["en"],cl:["es-419","es"],cm:["fr","en"],cn:["zh-CN"],co:["es-419","es"],cr:["es-419","en","es"],cu:["es-419","es"],cv:["pt-PT"],cy:["en","el","tr"],cz:["cs"],de:["de","en","fr"],dj:["fr","ar","so"],dk:["da"],dm:["en"],"do":["es-419","es"],dz:["fr","ar"],ec:["es-419","es"],ee:["et","ru"],eg:["ar","en"],es:["es","ca","en","eu","gl"],et:["am","en","so"],fi:["fi","sv"],fj:["en"],fr:["fr"],ga:["fr"],ge:["ka","en"],gg:["en","fr"],gh:["en"],gi:["en","es","it","pt-PT"],gl:["da",
"en"],gm:["en","wo"],gr:["el"],gt:["es-419","es"],gy:["en"],hk:["zh-TW","en","zh-CN","zh-HK"],hn:["es-419","es"],hr:["hr"],ht:["fr","en","ht"],hu:["hu"],id:["id","en","nl"],ie:["en-GB","ga"],il:["iw","ar","en"],im:["en"],"in":"en bn gu hi kn ml mr ne or pa ta te".split(" "),iq:["ar","en"],is:["is","en"],it:["it","en"],je:["en","fr"],jm:["en"],jo:["ar","en"],jp:["ja"],ke:["sw","en"],kg:["ky","ru"],kh:["km","en"],ki:["en"],kr:["ko"],kw:["ar","en"],kz:["kk","ru"],la:["lo","en"],lb:["ar","en","fr","hy"],
lk:["en","si","ta"],ls:["st","en","zu"],lt:["lt"],lu:["de","fr"],lv:["lv","lt","ru"],ly:["ar","en","it"],ma:["fr","ar"],md:["ro","ro-MD","ru"],me:["sr-ME","bs","sr"],mg:["mg","fr"],mk:["mk"],ml:["fr"],mm:["my","en"],mn:["mn"],mt:["mt","en"],mu:["en","fr"],mv:["en"],mw:["ny","en"],mx:["es-419","es"],my:["en","ms"],mz:["pt-PT","ny","sn","sw"],na:["en","af","de"],ne:["fr"],ng:["en"],ni:["es-419","en","es"],nl:["nl","en"],no:["no","nn"],np:["ne","en"],nr:["en"],nu:["en"],nz:["en-GB"],om:["ar","en"],pa:["es-419",
"en","es"],pe:["es-419","es"],pg:["en"],ph:["en"],pk:["en","pa","ur"],pl:["pl"],pn:["en"],pr:["es-419","en","es"],ps:["ar","en"],pt:["pt-PT"],py:["es-419","es"],qa:["ar","en"],ro:["ro","de","hu"],rs:["sr","sr-Latn"],ru:["ru"],rw:["en","fr","sw"],sa:["ar","en"],sb:["en"],sc:["crs","en","fr"],se:["sv"],sg:["en","ms","ta","zh-CN"],si:["sl"],sk:["sk","hu"],sl:["en"],sm:["it"],sn:["fr","wo"],so:["so","ar","en"],sr:["nl","en"],st:["pt-PT"],sv:["es-419","es"],td:["fr","ar"],tg:["fr"],th:["th","en"],tj:["tg",
"ru"],tl:["pt-PT","en","id"],tm:["tk","ru","uz"],tn:["ar","fr"],to:["en"],tr:["tr"],tt:"en es es-419 fr hi zh-TW".split(" "),tw:["zh-TW","en"],tz:["sw","en"],ua:["uk","ru"],ug:["en"],uk:["en-GB"],us:["en","es","es-419","zh-CN"],uy:["es-419","es"],uz:["uz","ru"],vc:["en"],ve:["es-419","es"],vi:["en"],vn:["vi","en","fr","zh-TW"],vu:["en","fr"],ws:["en"],za:["en","af","st","tn","zu"],zm:["en","ny","sn"],zw:["en","ny","sn","tn","zu"]};function pr(a,b,c,d){const e=`${b}-${c}`;if(d.includes(e))return a.j=b,e;if(b&&d.includes(b))return a.j=b;if(c&&or[c])for(const f of or[c])if(d.includes(f))return a.j=f,a.j;return d.includes("en")?(a.j="en",a.j):a.j=null}function W(a){var b=qr;if(null==b.o)throw Error("la");return void 0===b.o[a]?"":b.o[a]}
class rr{constructor(){this.j=this.o=null}load(a,b,c,d){a=pr(this,a,b,c);if(null==a)return Promise.resolve();const e=`${d}messages.${a}.nocache.json`,f=new yi;f.Ka="text";return new Promise((g,h)=>{qh(f,"success",()=>{try{var k=f.j?f.j.responseText:""}catch(m){k=""}this.o=JSON.parse(k.substring(5));g()});qh(f,"error",h);Bi(f,e)})}};const sr=Fd.mb(),qr=qm(rr);function tr(a){const [b,c,d]=a;a=V`${mr}${nr[b]}`;const e=V`${-(3*c)}px ${-(3*d)}px`;var f=Id[b].size;f=V`${3*f[0]}px ${3*f[1]}px`;return V`url(${a}) ${e}/${f} no-repeat`}function ur(a){return 3*sr.Xd(a)}function X(a){return 3*a[4]}function Y(a,b,c){void 0!==c?a.dispatchEvent(new CustomEvent(b,{detail:c,bubbles:!0,composed:!0})):a.dispatchEvent(new Event(b,{bubbles:!0,composed:!0}))}
function vr(a,b,c){a=V`${mr}${a}`;b=V`${b}px ${c}px`;return V`url(${a}) 0px 0px /${b} no-repeat`}function wr(a,b){b.style.fontSize="26px";let c=26,d=b.offsetWidth;a=a.offsetWidth;if(!d||!a)return-1;for(;d>a&&10<c;)c-=.1,b.style.fontSize=`${c}px`,d=b.offsetWidth;return c};const xr=(a,b)=>({kind:b.kind,elements:b.elements,Wd(c){customElements.define(a,c)}});var yr=a=>b=>{"function"===typeof b?customElements.define(a,b):b=xr(a,b);return b};var zr=({Wd:a,qd:b})=>(c,d)=>{if(void 0!==d){var e=c.constructor;void 0!==b&&Object.defineProperty(c,d,b(d));null==a||a(e,d)}else{const f=null!=(e=c.Zg)?e:c.key;c=void 0!=b?{kind:"method",ah:"prototype",key:f,qd:b(c.key)}:Object.assign({},c,{key:f});void 0!=a&&(c.Wd=function(g){a(g,f)});return c}};const Ar=(a,b)=>"method"!==b.kind||!b.qd||"value"in b.qd?{kind:"field",key:Symbol(),ah:"own",qd:{},Zg:b.key,If(){"function"===typeof b.If&&(this[b.key]=b.If.call(this))},Wd(c){cr(c,b.key,a)}}:Object.assign({},b,{Wd(c){cr(c,b.key,a)}});function Z(a){return(b,c)=>{void 0!==c?(cr(b.constructor,c,a),b=void 0):b=Ar(a,b);return b}};function Br(a){return zr({qd:()=>({get(){let b,c;return null!=(c=null==(b=this.Va)?void 0:b.querySelector(a))?c:null},enumerable:!0,configurable:!0})})};function Cr(){return Z(Object.assign({},void 0,{state:!0}))};var Dr=a=>(...b)=>({_$litDirective$:a,values:b}),Er=class{get Zb(){return this.j.Zb}Kg(a,b,c){this.W=a;this.j=b;this.V=c}Lg(a,b){return this.H(a,b)}H(a,b){return this.v(...b)}};var Fr=Dr(class extends Er{constructor(a){super();let b;if(1!==a.type||"class"!==a.name||2<(null==(b=a.Za)?void 0:b.length))throw Error("ma");}v(a){return" "+Object.keys(a).filter(b=>a[b]).join(" ")+" "}H(a,[b]){if(void 0===this.o){this.o=new Set;void 0!==a.Za&&(this.U=new Set(a.Za.join(" ").split(/\s/).filter(d=>""!==d)));for(const d in b){let e;!b[d]||(null==(e=this.U)?0:e.has(d))||this.o.add(d)}return this.v(b)}const c=a.element.classList;this.o.forEach(d=>{d in b||(c.remove(d),this.o.delete(d))});
for(const d in b){a=!!b[d];let e;a===this.o.has(d)||null!=(e=this.U)&&e.has(d)||(a?(c.add(d),this.o.add(d)):(c.remove(d),this.o.delete(d)))}return wq}});var Gr=Dr(class extends Er{constructor(a){super();let b;if(1!==a.type||"style"!==a.name||2<(null==(b=a.Za)?void 0:b.length))throw Error("na");}v(a){return Object.keys(a).reduce((b,c)=>{const d=a[c];if(null==d)return b;c=c.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase();return b+`${c}:${d};`},"")}H(a,[b]){const c=a.element.style;void 0===this.o&&(this.o=new Set);this.o.forEach(d=>{null==b[d]&&(this.o.delete(d),d.includes("-")?c.removeProperty(d):c[d]="")});for(const d in b)a=b[d],
null!=a&&(this.o.add(d),d.includes("-")?c.setProperty(d,a):c[d]=a);return wq}});var Hr=V`end`,Ir=V`center`,Jr=class extends ir{constructor(){super(...arguments);this.value={};this.disabled=this.pressed=!1;this.type="";this.iconIdle=[0,0,0,0,0,0];this.iconHover=[0,0,0,0,0,0];this.iconActive=[0,0,0,0,0,0];this.iconDisabled=[0,0,0,0,0,0];this.rotationDegrees=0}o(){const a=Fr({pressed:this.pressed,disabled:this.disabled,[this.type]:!0}),b=Gr({"--ddl-sprite-button3-icon-idle":tr(this.iconIdle).cssText,"--ddl-sprite-button3-icon-hover":tr(this.iconHover).cssText,"--ddl-sprite-button3-icon-active":tr(this.iconActive).cssText,
"--ddl-sprite-button3-icon-disabled":tr(this.iconDisabled).cssText,"--ddl-sprite-button3-icon-width":`${ur(this.iconIdle)}px`,"--ddl-sprite-button3-icon-height":`${X(this.iconIdle)}px`,transform:`rotate(${this.rotationDegrees}deg)`});return vq`
      <button class="${a}">
        <div id='bezel'>
          <div id='icon' style=${b}></div>
          <slot></slot>
        </div>
      </button>`}};Jr.j=[Kr(V`cartridge`,[0,634,589,42,50],[0,1428,928,42,50],[0,1428,875,42,50],Ir),Kr(V`play`,[0,93,481,90,21],[0,186,495,90,21],[0,905,497,90,18],Hr),Kr(V`edit`,[0,1301,477,90,21],[0,0,481,90,21],[0,1340,161,90,18],Hr),V`
    button {
      cursor: pointer;
      background: none;
      border: none;
      padding: 0;
      display: grid;
      position: relative;
      width: var(--ddl-sprite-button3-icon-width);
      height: var(--ddl-sprite-button3-icon-height);
      touch-action: none;
    }

    button.disabled {
      cursor: auto;
    }

    button #icon {
      background: var(--ddl-sprite-button3-icon-idle);
      width: var(--ddl-sprite-button3-icon-width);
      height: var(--ddl-sprite-button3-icon-height);
    }
    button:hover #icon {
      background: var(--ddl-sprite-button3-icon-hover);
    }
    button.pressed #icon,
    button:active #icon {
      background: var(--ddl-sprite-button3-icon-active);
    }
    button.disabled #icon,
    button:disabled #icon {
      background: var(--ddl-sprite-button3-icon-disabled);
    }
  `];l([Z({type:Object}),n("design:type",Object)],Jr.prototype,"value",void 0);l([Z({type:Boolean}),n("design:type",Object)],Jr.prototype,"pressed",void 0);l([Z({type:Boolean}),n("design:type",Object)],Jr.prototype,"disabled",void 0);l([Z({type:String}),n("design:type",Object)],Jr.prototype,"type",void 0);l([Z({type:Array}),n("design:type",Array)],Jr.prototype,"iconIdle",void 0);l([Z({type:Array}),n("design:type",Array)],Jr.prototype,"iconHover",void 0);
l([Z({type:Array}),n("design:type",Array)],Jr.prototype,"iconActive",void 0);l([Z({type:Array}),n("design:type",Array)],Jr.prototype,"iconDisabled",void 0);l([Z({type:Number}),n("design:type",Object)],Jr.prototype,"rotationDegrees",void 0);Jr=l([yr("ddl-sprite-button")],Jr);function Kr(a,b,c,d,e){var f=[b,c,d];const g=Math.max(...f.map(X));f=Math.max(...f.map(ur));return V`
    .${a} {
      width: ${f}px;
      height: ${g}px;
    }
    .${a} > #bezel {
      background: ${tr(b)};
      width: ${ur(b)}px;
      height: ${X(b)}px;
      align-self: ${e};
      justify-self: center;
    }
    .${a}:hover > #bezel {
      position: relative;
      background: ${tr(c)};
      width: ${ur(c)}px;
      height: ${X(c)}px;
    }
    .${a}.pressed > #bezel,
    .${a}:active > #bezel {
      background: ${tr(d)};
      width: ${ur(d)}px;
      height: ${X(d)}px;
    }
    .${a} > #bezel #icon {
      position: absolute;
      top: 12px;
      left: 18px;
    }
    .${a} ::slotted(img) {
      width: 90px;
      height: 90px;
      padding-top: 12px;
    }
    .${a}.pressed ::slotted(img),
    .${a}:active ::slotted(img),
    .${a}:hover ::slotted(img) {
      padding-top: 12px;
    }`};var Lr=class extends ir{constructor(){super(...arguments);this.hideCloseButton=!1}j(){Y(this,"hide-modal")}o(){return vq`
      <div class="bgContainer">
        <div class="contentsContainer">
          <slot></slot>
          <ddl-sprite-button
            ?hidden=${this.hideCloseButton}
            class="closeButton"
            @click=${this.j}
            title=${W("close_modal")}
            .iconIdle=${Wd}
            .iconHover=${Yd}
            .iconActive=${Xd}
            .iconDisabled=${Wd}>
          </ddl-sprite-button>
        </div>
      </div>
    `}};Lr.j=V`
    .bgContainer {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 20;
    }

    .contentsContainer {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .closeButton {
      position: absolute;
      top: 20px;
      right: 20px;
    }
  `;l([Z({type:Boolean}),n("design:type",Object)],Lr.prototype,"hideCloseButton",void 0);Lr=l([yr("ddl-modal")],Lr);var Mr={playerPlatformer:zf,playerTopDown:Af,paddleHorizontal:xf,paddleVertical:yf,ball:jf,solid:Cf,breakable:Ff,goal:uf,coin:lf,enemy:mf,enemyHorizontal:pf,enemyVertical:rf,pushableSolid:Kf,enemyDiagonal:of,enemyChasing:nf,fallingSolid:sf,eraser:[0,1428,981,39,48],key:vf,lock:wf,powerup:If,checkpoint:kf,fire:tf,spring:Hf,laserCannon:qf,pressurePlate:Bf,blinkingSolidOn:Ef,blinkingSolidOff:Df,portal:Jf,styleWand:Jg,styleN8:Ig,styleN16:Hg,styleL:Fg,styleM:Gg,styleD:Eg,undo:[0,1020,825,16,16]},Nr={playerPlatformer:{N:[0,
788,1595,20,20],Aa:[0,834,1595,20,20],active:[0,811,1595,20,20]},playerTopDown:{N:[0,857,1605,20,20],Aa:[0,612,1606,20,20],active:[0,880,1605,20,20]},paddleHorizontal:{N:[0,23,1593,20,20],Aa:[0,69,1593,20,20],active:[0,46,1593,20,20]},paddleVertical:{N:[0,92,1593,20,20],Aa:[0,765,1595,20,20],active:[0,115,1593,20,20]},ball:{N:[0,945,320,20,20],Aa:[0,1453,1084,20,20],active:[0,1453,1061,20,20]},solid:{N:[0,161,1609,20,20],Aa:[0,1372,1612,20,20],active:[0,357,1609,20,20]},breakable:{N:[0,518,1609,20,
20],Aa:[0,1349,1612,20,20],active:[0,1326,1612,20,20]},goal:{N:[0,1451,1544,20,20],Aa:[0,1451,1567,20,20],active:[0,1428,1560,20,20]},coin:{N:[0,1453,1176,20,20],Aa:[0,1452,1222,20,20],active:[0,1453,1199,20,20]},enemy:{N:[0,1452,1245,20,20],Aa:[0,1451,1429,20,20],active:[0,1452,1268,20,20]},enemyHorizontal:{N:[0,1428,1399,20,20],Aa:[0,1428,1422,20,20],active:[0,1451,1406,20,20]},enemyVertical:{N:[0,1428,1445,20,20],Aa:[0,1428,1468,20,20],active:[0,1451,1452,20,20]},enemyDiagonal:{N:[0,1428,1330,
20,20],Aa:[0,1428,1353,20,20],active:[0,1451,1337,20,20]},enemyChasing:{N:[0,1452,1291,20,20],Aa:[0,1451,1314,20,20],active:[0,1428,1307,20,20]},pushableSolid:{N:[0,138,1609,20,20],Aa:[0,969,1613,20,20],active:[0,1395,1612,20,20]},fallingSolid:{N:[0,1428,1514,20,20],Aa:[0,1428,1537,20,20],active:[0,1451,1521,20,20]},eraser:{N:[0,1451,1475,20,20],Aa:[0,1451,1498,20,20],active:[0,1428,1491,20,20]},key:{N:[0,1428,1583,20,20],Aa:[0,1349,1589,20,20],active:[0,1326,1589,20,20]},lock:{N:[0,992,1590,20,20],
Aa:[0,0,1593,20,20],active:[0,1451,1590,20,20]},powerup:{N:[0,23,1616,20,20],Aa:[0,69,1616,20,20],active:[0,46,1616,20,20]},checkpoint:{N:[0,1453,1107,20,20],Aa:[0,1453,1153,20,20],active:[0,1453,1130,20,20]},fire:{N:[0,1451,1360,20,20],Aa:[0,1451,1383,20,20],active:[0,1428,1376,20,20]},spring:{N:[0,992,1613,20,20],Aa:[0,0,1616,20,20],active:[0,1441,1613,20,20]},laserCannon:{N:[0,1372,1589,20,20],Aa:[0,969,1590,20,20],active:[0,1395,1589,20,20]},pressurePlate:{N:[0,704,1606,20,20],Aa:[0,1418,1606,
20,20],active:[0,727,1606,20,20]},blinkingSolidOn:{N:[0,449,1609,20,20],Aa:[0,495,1609,20,20],active:[0,472,1609,20,20]},blinkingSolidOff:{N:[0,380,1609,20,20],Aa:[0,426,1609,20,20],active:[0,403,1609,20,20]},portal:{N:[0,635,1606,20,20],Aa:[0,681,1606,20,20],active:[0,658,1606,20,20]},styleWand:{N:Jg,Aa:[0,704,1629,20,20],active:[0,681,1629,20,20]},styleN8:{N:Ig,Aa:[0,635,1629,20,20],active:[0,612,1629,20,20]},styleN16:{N:Hg,Aa:[0,865,1628,20,20],active:[0,842,1628,20,20]},styleL:{N:Fg,Aa:[0,819,
1618,20,20],active:[0,796,1618,20,20]},styleM:{N:Gg,Aa:[0,1061,1626,20,20],active:[0,1038,1626,20,20]},styleD:{N:Eg,Aa:[0,750,1618,20,20],active:[0,115,1616,20,20]},undo:{N:Kg,Aa:Mg,active:Kg}},Or={playerPlatformer:2,playerTopDown:8,paddleHorizontal:3,paddleVertical:29,ball:4,solid:5,breakable:6,goal:7,coin:9,enemy:10,enemyHorizontal:11,enemyVertical:12,enemyDiagonal:18,enemyChasing:19,pushableSolid:14,fallingSolid:13,eraser:1,key:15,lock:16,powerup:20,checkpoint:21,fire:22,spring:23,laserCannon:24,
pressurePlate:25,blinkingSolidOn:26,blinkingSolidOff:27,portal:28,styleWand:22,styleN8:1,styleN16:1,styleL:1,styleM:1,styleD:1,undo:1},Pr={playerPlatformer:"tool_player_platformer",playerTopDown:"tool_player_top_down",paddleHorizontal:"tool_paddle_horizontal",paddleVertical:"tool_paddle_vertical",ball:"tool_ball",solid:"tool_solid",breakable:"tool_breakable",goal:"tool_goal",coin:"tool_coin",enemy:"tool_enemy",enemyHorizontal:"tool_enemy_horizontal",enemyVertical:"tool_enemy_vertical",enemyDiagonal:"tool_enemy_diagonal",
enemyChasing:"tool_enemy_chasing",pushableSolid:"tool_pushable_solid",fallingSolid:"tool_falling_solid",eraser:"tool_eraser",key:"tool_key",lock:"tool_lock",powerup:"tool_powerup",checkpoint:"tool_checkpoint",fire:"tool_fire",spring:"tool_spring",laserCannon:"tool_laser_cannon",pressurePlate:"tool_switch",blinkingSolidOn:"tool_switch_block_on",blinkingSolidOff:"tool_switch_block_off",portal:"tool_portal",styleWand:"tool_style_wand",styleN8:"tool_style_n8",styleN16:"tool_style_n16",styleL:"tool_style_l",
styleM:"tool_style_m",styleD:"tool_style_d",undo:"tool_undo"};var Qr=class{constructor(){this.o=[];this.j=-1}canUndo(){return 0<=this.j}push(a){this.j++;this.o.splice(this.j);this.o.push(a);return a}hd(){0<=this.j&&(this.o[this.j].hd(),this.j--)}};function Rr(a){a.v.get(D).Xa=Ta(Mr[a.j.oa.tool])}function Sr(a,b){a.j.oa.od&&(a.j.oa.od.errorText=b)}function Tr(a){Un(a.V);Ur(a.j);a.j.oa.canUndo=a.W.canUndo()}function Vr(a){Wr();const b=a.j.oa;"edit"===b.screen?Xi(J.ue,0,!0):"play"===b.screen?(a.j.Nd&&Yi(J.ze)||Cj(),Ui(J.ue)):"main_menu"===b.screen?Xi(J.qf,0,!0):"tutorial"===b.screen&&Cj()}function Wr(){Ui(J.ue);Ui(J.qf);Ui(J.rf);Dj();Ui(J.kd)}function Xr(a,b,c){"edit"===a.j.oa.screen&&(c&&Yr(a,b),(a.H||a.U)&&Zr(a,b,a.U))}
function $r(a,b){b=bp(b,a.o,a.o.width,a.o.height);var c=Ea(xa(a.j.O,ul));a=b.transform;c=tl(c);const d=c.d,e=-c.b,f=-c.c,g=c.a,h=c.c*c.f-c.e*c.d,k=-(c.a*c.f-c.e*c.b),m=c.a*d+c.c*e;if(0===m)throw Error("c");c.a=d/m;c.b=e/m;c.c=f/m;c.d=g/m;c.e=h/m;c.f=k/m;a.call(b,c);b.x=16*Math.floor(b.x/16);b.y=16*Math.floor(b.y/16);return b}function as(a,b,c){"edit"!==a.j.oa.screen||a.U||(a.H=!0,c&&Yr(a,b),Zr(a,b))}function Yr(a,b){a.v.get(P).position=b;a.v.O||Ba(a.j.O,a.v)}
function Zr(a,b,c=!1){const d=b.x/16,e=b.y/16,f=c?1:Or[a.j.oa.tool],g=Xn(a.V),h=g.j.Uc(d,e);f!==h&&(a.W.push({Ef:()=>{try{Rl(g.j,d,e,f),Sr(a,"")}catch(k){k instanceof Nl?Sr(a,W("too_many_blocks")):Sr(a,W("generic_error"))}fm(g);1===f?Xi(J.Yf):2===f||8===f?Xi(J.hg):10===f||11===f||12===f||18===f||19===f||22===f||24===f?Xi(J.dg):5===f||14===f||6===f||13===f?Xi(J.ig):Xi(J.fg)},hd:()=>{Xi(J.jg);Rl(g.j,d,e,h);Sr(a,"");fm(g)}}).Ef(),Tr(a))}
var cs=class{constructor(a){this.j=a;this.W=new Qr;this.V=Pn();this.U=this.H=!1;this.v=new x(new P(new C(80,112),0,new C(O,O)),new ap,new D(Ta(Cf),3));const b=this.j.oa;this.o=bs(b);Rr(this);document.body.addEventListener("keydown",c=>{"KeyZ"===c.code&&(c.metaKey||c.ctrlKey)&&(c.shiftKey?"edit"===this.j.oa.screen&&(c=this.W,c.j<c.o.length-1&&(c.j++,c.o[c.j].Ef()),Tr(this)):this.hd())});b.addEventListener("change-screen",()=>{Sr(this,"");Xn(this.V);if(!Zn(this.V)){const c=Ea(this.j.O.find(Ia)).get(P).scale;
c.x=3;c.y=3}"edit"===b.screen?Tr(this):"play"===b.screen&&(z(this.j.O,this.v),this.U=this.H=!1);Vr(this)});b.addEventListener("show-modal",()=>{"pause-modal"===b.La&&(Wr(),Xi(J.rf,0,!0))});b.addEventListener("restart-music",()=>{Wr();Vr(this)});b.addEventListener("change-tool",()=>void Rr(this));b.addEventListener("undo-action",()=>void this.hd());b.addEventListener("change-style",c=>{if(c instanceof CustomEvent){c=c.detail;var d={styleN8:1,styleN16:2,styleL:3,styleD:5,styleM:4};c in d&&(c=d[c],d=
Xn(this.V),d.style=c,fm(d),Tr(this))}});this.o.addEventListener("mousemove",c=>{Xr(this,$r(this,c),!0)});this.o.addEventListener("mousedown",c=>{0===c.button?as(this,$r(this,c),!0):2===c.button&&(c=$r(this,c),"edit"!==this.j.oa.screen||this.H||(this.U=!0,Yr(this,c),this.v.get(D).Xa=Ta(Mr.eraser),Zr(this,c,!0)))});this.o.addEventListener("mouseout",()=>{z(this.j.O,this.v)});document.body.addEventListener("mouseup",c=>{0===c.button?this.H=!1:2===c.button&&(this.U=!1,Rr(this))});this.o.addEventListener("touchstart",
c=>{c.preventDefault();as(this,$r(this,c.touches[0]),!1)});this.o.addEventListener("touchmove",c=>{c.preventDefault();Xr(this,$r(this,c.touches[0]),!1)});this.o.addEventListener("touchend",c=>{c.preventDefault();this.H=!1});this.o.addEventListener("wheel",c=>{if("edit"===this.j.oa.screen){c.preventDefault();c.stopPropagation();var d=Ea(this.j.O.find(Ia)),e=d.get(P).scale;d=d.get(P).position;var f=e.x,g=ql(.3,6,e.x-.001*c.deltaY);f!==g&&(e.x=g,e.y=g,c=bp(c,this.o,this.o.width,this.o.height),e=d.y+
c.y,d.x+=(d.x+c.x)*(g/f-1),d.y+=e*(g/f-1))}});this.v.get(D).alpha=.5}hd(){"edit"===this.j.oa.screen&&(this.W.hd(),Tr(this))}};function ds(a){let b;return a.input.j[1]||!(null==(b=a.j)||!b.j.down)}var es=class{constructor(a,b){this.input=a;this.j=b}up(){let a;return this.input.up()||!(null==(a=this.j)||!a.up())}left(){let a;return this.input.left()||!(null==(a=this.j)||!a.left())}right(){let a;return this.input.right()||!(null==(a=this.j)||!a.right())}Pa(){let a;return this.input.Pa()||!(null==(a=this.j)||!a.Pa())}};const fs=Math.PI/8;function gs(a){for(const b of Object.keys(a.j))a.j[b]=!1}var hs=class{constructor(){this.j={up:!1,down:!1,left:!1,right:!1,jump:!1}}up(){return this.j.up}left(){return this.j.left}right(){return this.j.right}Pa(){return this.j.jump}};function is(a,b,c){return Math.sqrt(Math.pow(a.x-b.x,2)+Math.pow(a.y-b.y,2))<c}
var js=class{constructor(a,b){this.O=a;this.active=!0;this.U=!1;this.o=new C(0,0);this.j=new C(0,0);this.ta=new C(860,360);this.H=!1;this.W=this.va=0;this.V=new x(new P(new C(0,0)),new ap,new Pj(new C(120,360)),new D(new Na(c=>{c.beginPath();c.arc(0,0,90,0,2*Math.PI,!1);c.fillStyle="#507380";c.globalAlpha=.2;c.fill();if(this.U){c.beginPath();const e=is(this.o,this.j,90),f=-Math.atan2(this.o.x-this.j.x,this.o.y-this.j.y)+Math.PI/2;var d=this.v;gs(d);f>-Math.PI/4-fs&&f<=Math.PI/4+fs&&(d.j.right=!0);
f>Math.PI/4-fs&&f<=3*Math.PI/4+fs&&(d.j.down=!0);f>3*Math.PI/4-fs&&f<=5*Math.PI/4+fs&&(d.j.left=!0);if(f>5*Math.PI/4-fs&&f<=3*Math.PI/2||f>-Math.PI/2&&f<=-Math.PI/4+fs)d.j.up=!0;d=e?new C(this.o.x-this.j.x,this.o.y-this.j.y):new C(90*Math.cos(f),90*Math.sin(f));c.arc(d.x,d.y,45,0,2*Math.PI,!1);c.globalAlpha=1;c.fillStyle="#507380";c.fill()}}),3));this.ha=new x(new P(new C(0,0)),new ap,new Pj(this.ta),new D(new Na(c=>{c.beginPath();c.arc(0,0,50,0,2*Math.PI,!1);c.fillStyle="#507380";this.v.j.jump=this.H;
c.globalAlpha=this.H?1:.2;c.fill()}),3));this.v=new hs;b.addEventListener("touchstart",c=>{if(this.active)for(const e of c.changedTouches){var d=bp(e,b,b.width,b.height);is(d,this.ta,150)?(this.H=!0,this.va=e.identifier):d.x<b.width/2&&(this.j=d,this.U=!0,this.W=e.identifier,this.o=this.j,c=this.V.get(Pj).position,c.x=d.x,c.y=d.y)}});b.addEventListener("touchend",c=>{for(const d of c.changedTouches)d.identifier===this.W&&(this.U=!1),d.identifier===this.va&&(this.H=!1);gs(this.v)});b.addEventListener("touchmove",
c=>{for(const d of c.changedTouches)d.identifier===this.W&&this.U&&(this.o=bp(d,b,b.width,b.height))})}start(){this.active=!0;Ba(this.O,this.V);Ba(this.O,this.ha)}};var ks=class extends Da{constructor(a){super(a);this.o=Pn();this.j=new C(0,0)}H(){var a=Ea(this.O.find(Ia));const b=a.get(P).position;a=a.get(P).scale;var c=this.O.find(Jj),d=(c=0<c.length?c[0]:void 0)?c.get(P).position:new C(0,0);this.j.set(d.x-160,d.y-fl/6);var e=Xn(this.o);d=16*e.j.left;const f=16*e.j.right+16-320,g=16*e.j.top;e=16*e.j.bottom+16-fl/3;this.j.x=d<=f?ql(d,f,this.j.x):d;this.j.y=g<=e?ql(g,e,this.j.y):e;d=1;c&&!c.get(Jj).Gf&&(d=.2);b.x=Math.floor(b.x+(this.j.x*a.x-b.x)*d);b.y=Math.floor(b.y+
(this.j.y*a.y-b.y)*d);c&&(c.get(Jj).Gf=!1)}},Aa=class extends Da{constructor(a){super(a);this.v=this.o=!1;this.j=3}H(a){var b=Ea(this.O.find(Ia));const c=this.O.find(Jj)[0];let d=-152;var e=24;const f=b.get(P).position;b=b.get(P).scale;this.o&&(e=c.get(P).position,d=e.x-960/(2*b.x)+8,e=e.y-fl/(2*b.x));this.v&&b.x!==this.j&&(a/=700,b.x-=a,b.y-=a,b.x<this.j&&(b.x=this.j,b.y=this.j));f.x+=.1*(d*b.x-f.x);f.y+=.1*(e*b.y-f.y)}};function ls(a){a.o=!1;a.v=!1;a.U=!1;a.j=!1}
var ms=class extends Da{constructor(a,b){super(a);this.input=b;this.enabled=this.j=this.U=this.v=this.o=!1;document.body.addEventListener("pan-left-start",()=>{this.o=!0});document.body.addEventListener("pan-right-start",()=>{this.v=!0});document.body.addEventListener("pan-up-start",()=>{this.U=!0});document.body.addEventListener("pan-down-start",()=>{this.j=!0});document.addEventListener("mouseup",()=>{ls(this)});document.addEventListener("touchend",()=>{ls(this)})}H(a){const b=Ea(this.O.find(Ia)).get(P).position,
c=this.input.left()||this.o?-1:this.input.right()||this.v?1:0,d=this.input.up()||this.U?-1:this.input.j[1]||this.j?1:0;b.x+=c*a*.4;b.y+=d*a*.4}},ns=class extends Da{H(){var a=Ea(this.O.find(Ia));const b=a.get(P).position;a=a.get(P).scale;for(const c of this.O.find(Pj)){const d=c.get(Pj).position,e=c.get(P);e.position.set(b.x/a.x+d.x/a.y,b.y/a.x+d.y/a.y);e.scale.set(1/a.x,1/a.y)}}};function os(a,b,c){a.get(D).offset.x=0;a.get(D).offset.y=0;var d=a.get(Mj),e=w(a,Oa);if(0>c.y)1!==b.state&&(d.Pa.index=0,d.Ib.index=0,b.state=1);else if(.06<c.y&&!b.o)2!==b.state&&(b.state=2,d.Cb.index=0,d.Db.index=0);else if(0!==c.x)0!==b.state&&(b.state=0,d.Ca.index=0,d.Qb.index=0);else if(2===b.state)b.state=3,d.nb.index=0,d.Jb.index=0;else if(3!==b.state||e&&e.index>=d.nb.frames.length-1)b.state=4;c=b.state;d=a.get(Mj);e=w(a,Oa);4===c?b.j&&e!==d.Tb?(d.Tb.index=d.N.index,v(a,d.Tb)):b.j||e===d.N||
(d.N.index=d.Tb.index,v(a,d.N)):0===c?b.j&&e!==d.Qb?(d.Qb.index=d.Ca.index,v(a,d.Qb)):b.j||e===d.Ca||(d.Ca.index=d.Qb.index,v(a,d.Ca)):2===c?b.j&&e!==d.Db?(d.Db.index=d.Cb.index,v(a,d.Db)):b.j||e===d.Cb||(d.Cb.index=d.Db.index,v(a,d.Cb)):1===c?b.j&&e!==d.Ib?(d.Ib.index=d.Pa.index,v(a,d.Ib)):b.j||e===d.Pa||(d.Pa.index=d.Ib.index,v(a,d.Pa)):3===c&&(b.j&&e!==d.Jb?(d.Jb.index=d.nb.index,v(a,d.Jb)):b.j||e===d.nb||(d.nb.index=d.Jb.index,v(a,d.nb)))}
var ps=class extends Da{constructor(a,b){super(a);this.input=b;this.o=this.j=0;this.v=this.W=this.V=this.U=!1}H(a){const b=this.input.left(),c=this.input.right(),d=this.input.up(),e=ds(this.input);var f=this.input.Pa();b&&!this.U?this.j=-1:c&&!this.V&&(this.j=1);d&&!this.W?this.o=-1:e&&!this.v&&(this.o=1);const g=b&&!c?-1:c&&!b?1:b&&-1===this.j?-1:c&&1===this.j?1:0,h=d&&!e?-1:e&&!d?1:d&&-1===this.o?-1:e&&1===this.o?1:0;for(var k of this.O.find(N,P)){var m=k.get(S).wa;const p=k.get(N);p.bc?(m.x=0,
p.Te?(m.y+=8E-4*a,m.y=Math.min(m.y,.3),os(k,p,m)):m.y=0):(m.x=.1*g,0>m.x&&(p.j=!0),0<m.x&&(p.j=!1),m.y+=8E-4*a,m.y=Math.min(m.y,.3),f&&p.o&&!p.bc&&(m.y=-.26),os(k,p,m),p.o=!1)}for(const p of this.O.find(Fj,P))a=p.get(Fj),f=p.get(S).wa,a.bc?(f.x=0,f.y=0):(f.x=.1*g,f.y=.1*h,a=p,k=a.get(Nj),m=w(a,Oa),a.get(D).offset.x=0,a.get(D).offset.y=0,0>f.x?m!==k.nc&&(k.nc.index=0,v(a,k.nc)):0<f.x?m!==k.kc&&(k.kc.index=0,v(a,k.kc)):0>f.y?m!==k.lc&&(k.lc.index=0,v(a,k.lc)):0<f.y?m!==k.mc&&(k.mc.index=0,v(a,k.mc)):
(ta(a,Oa),a.get(D).Xa=Va(G().Qa.N)));this.U=b;this.V=c;this.W=d;this.v=e}},qs=class extends Da{H(){const a=this.O.find(Lj);for(const b of a)b.get(Lj).Ue=!1}},rs=class extends Da{constructor(a,b){super(a);this.input=b}H(){for(var a of this.O.find(Gj,P)){const b=this.input.left()?-1:this.input.right()?1:0;a.get(S).wa.x=b*a.get(Gj).speed}for(const b of this.O.find(Hj,P))a=this.input.up()?-1:ds(this.input)?1:0,b.get(S).wa.y=a*b.get(Hj).speed}};var ss=class extends Da{H(a){var b=this.O.find(Kj);let c=!1;for(const d of b)if(b=d.get(Kj),b.Wb&&(c=!0,b.j+=a,5E3<b.j)){b.Wb=!1;for(const e of kl(d))b=e,ll(b),ml(b),ta(b,gl)}!c&&Yi(J.kd)&&(Ui(J.kd),Cj())}};var ts=class extends Da{constructor(a,b){super(a);this.o=b;this.j=Pn()}H(){var a=Xn(this.j);const b=16*a.j.bottom+64,c=16*a.j.top-128,d=16*a.j.right+64;a=16*a.j.left-64;for(const e of this.O.find(lj)){const f=e.get(P).position;if(f.y>b||f.y<c||f.x>d||f.x<a)w(e,gj)?z(this.O,e):Vo(this.o,e)}}};var us={};function vs(){throw Error("oa");}vs.prototype.Df=null;vs.prototype.toString=function(){return this.hf};function ws(){vs.call(this)}ra(ws,vs);ws.prototype.Ie=us;function xs(a){if(null!=a)switch(a.Df){case 1:return 1;case -1:return-1;case 0:return 0}return null}function ys(a){return null!=a&&a.Ie===us?a:a instanceof hi?zs(gi(a).toString()):a instanceof hi?zs(gi(a).toString()):zs(String(String(a)).replace(As,Bs),xs(a))}var zs=function(a){function b(c){this.hf=c}b.prototype=a.prototype;return function(c,d){c=new b(String(c));void 0!==d&&(c.Df=d);return c}}(ws);
function Cs(a){return null!=a&&a.Ie===us?String(String(a.hf).replace(Ds,"").replace(Es,"&lt;")).replace(Fs,Bs):String(a).replace(As,Bs)}const Js={"\x00":"&#0;","\t":"&#9;","\n":"&#10;","\v":"&#11;","\f":"&#12;","\r":"&#13;"," ":"&#32;",'"':"&quot;","&":"&amp;","'":"&#39;","-":"&#45;","/":"&#47;","<":"&lt;","=":"&#61;",">":"&gt;","`":"&#96;","\u0085":"&#133;","\u00a0":"&#160;","\u2028":"&#8232;","\u2029":"&#8233;"};function Bs(a){return Js[a]}
const As=/[\x00\x22\x26\x27\x3c\x3e]/g,Fs=/[\x00\x22\x27\x3c\x3e]/g,Ds=/<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g,Es=/</g;/*
 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
function Ks(a,b){b=a(b||Ls,void 0);a=(Wa||(Wa=new ui)).createElement("DIV");b=Ms(b);pi(a,b);1==a.childNodes.length&&(b=a.firstChild,1==b.nodeType&&(a=b));return a}function Ms(a){if(ma(a))if(a instanceof vs){if(a.Ie!==us)throw Error("pa");a=ji(a.toString())}else a=ii("zSoyz");else a=ii(String(a));return a}const Ls={};function Ns(){return zs('<img src="cta.gif" id="lawson-cta-animated" class="lawsonCta" alt=""/>')}function Os(){return zs('<div class="'+Cs("ddl-jerrySpeak_")+'"></div>')}
function Ps(a){a=a.Gc;return zs('<img src="tutorial_arrow.png" class="'+Cs("ddl-arrowPrompt_")+'" alt=""><svg width=960 height=540 id="'+Cs("spotlight")+'"><path d="M0,0  h960 v540 h-960 z M 168 22.5 c 0 -7.5 0 -16.5 0 -24 h -6 c 0 -3 0 -9 0 -12 h -6 c 0 -3 0 -9 0 -12 h -6 v -6 h -6 v -6 h -6 v -6 h -6 v -6 h -6 v -6 h -6 V -61.5 h -6 V -67.5 c -3 0 -9 0 -12 0 V -73.5 c -3 0 -9 0 -12 0 V -79.5 c -7.5 0 -16.5 0 -24 0 V -85.5 c -15.78 0 -32.22 0 -48 0 v 6 c -7.5 0 -16.5 0 -24 0 v 6 c -3 0 -9 0 -12 0 v 6 c -3 0 -9 0 -12 0 v 6 h -6 v 6 h -6 v 6 h -6 v 6 h -6 v 6 h -6 v 6 H -66 v 6 H -72 c 0 3 0 9 0 12 H -78 c 0 3 0 9 0 12 H -84 c 0 7.5 0 16.5 0 24 H -90 c 0 17.82 0 36.18 0 54 h 6 c 0 7.5 0 16.5 0 24 h 6 c 0 3 0 9 0 12 h 6 c 0 3 0 9 0 12 h 6 v 6 h 6 v 6 h 6 v 6 h 6 v 6 h 6 v 6 h 6 v 6 h 6 v 6 c 3 0 9 0 12 0 v 6 c 3 0 9 0 12 0 v 6 c 7.5 0 16.5 0 24 0 v 6 c 15.78 0 32.22 0 48 0 v -6 c 7.5 0 16.5 0 24 0 v -6 c 3 0 9 0 12 0 v -6 c 3 0 9 0 12 0 v -6 h 6 v -6 h 6 v -6 h 6 v -6 h 6 v -6 h 6 v -6 h 6 v -6 h 6 c 0 -3 0 -9 0 -12 h 6 c 0 -3 0 -9 0 -12 h 6 c 0 -7.5 0 -16.5 0 -24 h 6 c 0 -17.82 0 -36.18 0 -54 H 168 z "/></svg><div class="'+Cs("ddl-editPromptText_")+
'">'+ys(a)+"</div>")}
function Qs(a){a=a.Gc;return zs('<img src="tutorial_arrow.png" class="'+Cs("ddl-arrowPrompt2_")+'" alt=""><svg width=960 height=540 id="'+Cs("spotlight")+'"><path d="M0,0  h960 v540 h-960 z M 380 422.5 c 0 -7.5 0 -16.5 0 -24 h -6 c 0 -3 0 -9 0 -12 h -6 c 0 -3 0 -9 0 -12 h -6 v -6 h -6 v -6 h -6 v -6 h -6 v -6 h -6 v -6 h -6 V 338.5 h -6 V 332.5 c -3 0 -9 0 -12 0 V 326.5 c -3 0 -9 0 -12 0 V 320.5 c -7.5 0 -16.5 0 -24 0 V 314.5 c -15.78 0 -32.22 0 -48 0 v 6 c -7.5 0 -16.5 0 -24 0 v 6 c -3 0 -9 0 -12 0 v 6 c -3 0 -9 0 -12 0 v 6 h -6 v 6 h -6 v 6 h -6 v 6 h -6 v 6 h -6 v 6 H 146 v 6 H 140 c 0 3 0 9 0 12 H 134 c 0 3 0 9 0 12 H 128 c 0 7.5 0 16.5 0 24 H 122 c 0 17.82 0 36.18 0 54 h 6 c 0 7.5 0 16.5 0 24 h 6 c 0 3 0 9 0 12 h 6 c 0 3 0 9 0 12 h 6 v 6 h 6 v 6 h 6 v 6 h 6 v 6 h 6 v 6 h 6 v 6 h 6 v 6 c 3 0 9 0 12 0 v 6 c 3 0 9 0 12 0 v 6 c 7.5 0 16.5 0 24 0 v 6 c 15.78 0 32.22 0 48 0 v -6 c 7.5 0 16.5 0 24 0 v -6 c 3 0 9 0 12 0 v -6 c 3 0 9 0 12 0 v -6 h 6 v -6 h 6 v -6 h 6 v -6 h 6 v -6 h 6 v -6 h 6 v -6 h 6 c 0 -3 0 -9 0 -12 h 6 c 0 -3 0 -9 0 -12 h 6 c 0 -7.5 0 -16.5 0 -24 h 6 c 0 -17.82 0 -36.18 0 -54 H 380 z "/></svg><div class="'+Cs("ddl-editPromptText_")+
'">'+ys(a)+"</div>")}
function Rs(a){a=a.Gc;return zs('<img src="tutorial_arrow.png" class="'+Cs("ddl-arrowPrompt3_")+'" alt=""><svg width=960 height=540 id="'+Cs("spotlight")+'"><path d="M0,0  h960 v540 h-960 z M 380 262.5 c 0 -7.5 0 -16.5 0 -24 h -6 c 0 -3 0 -9 0 -12 h -6 c 0 -3 0 -9 0 -12 h -6 v -6 h -6 v -6 h -6 v -6 h -6 v -6 h -6 v -6 h -6 V 178.5 h -6 V 172.5 c -3 0 -9 0 -12 0 V 166.5 c -3 0 -9 0 -12 0 V 160.5 c -7.5 0 -16.5 0 -24 0 V 154.5 c -15.78 0 -32.22 0 -48 0 v 6 c -7.5 0 -16.5 0 -24 0 v 6 c -3 0 -9 0 -12 0 v 6 c -3 0 -9 0 -12 0 v 6 h -6 v 6 h -6 v 6 h -6 v 6 h -6 v 6 h -6 v 6 H 146 v 6 H 140 c 0 3 0 9 0 12 H 134 c 0 3 0 9 0 12 H 128 c 0 7.5 0 16.5 0 24 H 122 c 0 17.82 0 36.18 0 54 h 6 c 0 7.5 0 16.5 0 24 h 6 c 0 3 0 9 0 12 h 6 c 0 3 0 9 0 12 h 6 v 6 h 6 v 6 h 6 v 6 h 6 v 6 h 6 v 6 h 6 v 6 h 6 v 6 c 3 0 9 0 12 0 v 6 c 3 0 9 0 12 0 v 6 c 7.5 0 16.5 0 24 0 v 6 c 15.78 0 32.22 0 48 0 v -6 c 7.5 0 16.5 0 24 0 v -6 c 3 0 9 0 12 0 v -6 c 3 0 9 0 12 0 v -6 h 6 v -6 h 6 v -6 h 6 v -6 h 6 v -6 h 6 v -6 h 6 v -6 h 6 c 0 -3 0 -9 0 -12 h 6 c 0 -3 0 -9 0 -12 h 6 c 0 -7.5 0 -16.5 0 -24 h 6 c 0 -17.82 0 -36.18 0 -54 H 380 z "/></svg><div class="'+Cs("ddl-editPromptText_")+
" "+Cs("ddl-editPromptText2_")+'">'+ys(a)+"</div>")}
function Ss(a){a=a.Gc;return zs('<img src="tutorial_arrow.png" class="'+Cs("ddl-arrowPrompt_")+'" alt=""><svg width=960 height=540 id="'+Cs("spotlight")+'"><path d="M0,0  h960 v540 h-960 z M 168 22.5 c 0 -7.5 0 -16.5 0 -24 h -6 c 0 -3 0 -9 0 -12 h -6 c 0 -3 0 -9 0 -12 h -6 v -6 h -6 v -6 h -6 v -6 h -6 v -6 h -6 v -6 h -6 V -61.5 h -6 V -67.5 c -3 0 -9 0 -12 0 V -73.5 c -3 0 -9 0 -12 0 V -79.5 c -7.5 0 -16.5 0 -24 0 V -85.5 c -15.78 0 -32.22 0 -48 0 v 6 c -7.5 0 -16.5 0 -24 0 v 6 c -3 0 -9 0 -12 0 v 6 c -3 0 -9 0 -12 0 v 6 h -6 v 6 h -6 v 6 h -6 v 6 h -6 v 6 h -6 v 6 H -66 v 6 H -72 c 0 3 0 9 0 12 H -78 c 0 3 0 9 0 12 H -84 c 0 7.5 0 16.5 0 24 H -90 c 0 17.82 0 36.18 0 54 h 6 c 0 7.5 0 16.5 0 24 h 6 c 0 3 0 9 0 12 h 6 c 0 3 0 9 0 12 h 6 v 6 h 6 v 6 h 6 v 6 h 6 v 6 h 6 v 6 h 6 v 6 h 6 v 6 c 3 0 9 0 12 0 v 6 c 3 0 9 0 12 0 v 6 c 7.5 0 16.5 0 24 0 v 6 c 15.78 0 32.22 0 48 0 v -6 c 7.5 0 16.5 0 24 0 v -6 c 3 0 9 0 12 0 v -6 c 3 0 9 0 12 0 v -6 h 6 v -6 h 6 v -6 h 6 v -6 h 6 v -6 h 6 v -6 h 6 v -6 h 6 c 0 -3 0 -9 0 -12 h 6 c 0 -3 0 -9 0 -12 h 6 c 0 -7.5 0 -16.5 0 -24 h 6 c 0 -17.82 0 -36.18 0 -54 H 168 z "/></svg><div class="'+Cs("ddl-editPromptText_")+
'">'+ys(a)+"</div>")};function Ts(a){if(0===a.j){a.j=1;a.U=!0;rk()?Us(a,W("onboarding_2_mobile")):Us(a,W("onboarding_2_desktop"));a.W=!1;a.oc.o=!0;for(var b of a.O.find(N))a=b.get(P).position,b.get(Ij).position=a.kb()}else if(2===a.j)a.U=!1,a.ta=0,a.va=1,a.V=!1,Us(a,W("onboarding_3"),3),a.j=3,a.W=!0;else if(3===a.j)a.V=!0,a.U=!0,a.W=!1;else if(3.1===a.j)a.v.innerText="",a.V=!1,a.U=!1,a.W=!0,a.ha="",Us(a,W("onboarding_4"),3.1),a.j=4;else if(4===a.j)a.V=!1,a.va=1,a.ta=0,a.v.innerText="",a.U=!0,a.W=!1,rk()?Us(a,W("onboarding_5_mobile")):
Us(a,W("onboarding_5_desktop")),a.j+=1;else if(7===a.j)a.ta=0,a.W=!0,a.U=!1,a.V=!1,a.v.innerText="",a.ha="",Us(a,W("onboarding_6"),3.5),a.j=7.2;else if(7.2===a.j)a.V=!0,a.va=1,a.U=!0,a.ta=0,a.W=!1,a.j=7.3;else if(7.4===a.j)a.ta=0,a.W=!0,a.U=!1,a.V=!1,a.v.innerText="",a.ha="",Us(a,W("onboarding_7"),3.3),a.j=8;else if(8===a.j)a.ha="",Us(a,W("onboarding_8"),2),a.j+=1,a.oc.v=!0;else if(9===a.j)a.va=1,a.ta=0,a.V=!0,a.U=!0,b=Xn(a.jd),Rl(b.j,-5,4,1),Rl(b.j,43,4,2),Rl(b.j,41,4,1),Rl(b.j,38,4,1),a.o.Fa.appendChild(a.Va),
Vs(a.o.oa,"play"),a.j+=1,a.v.innerText="";else if(11===a.j)a.U=!1,a.v.innerText="",a.o.Fa.removeChild(a.Va),a.j+=1,a.o.Fa.appendChild(a.Wa);else if(13===a.j)a.v.innerText="",a.o.Fa.removeChild(a.Wa),a.j+=1,a.o.Fa.appendChild(a.Rb);else if(16===a.j){a.W=!1;a.v.innerText=W("string_14");a.o.Fa.removeChild(a.Rb);a.v.style.top="29%";a.j+=1;a.xc=[new x(new ap,new P(new C(768,32)),new D(Ta(Gf),-1)),new x(new ap,new P(new C(752,48)),new D(Ta(Gf),-1)),new x(new ap,new P(new C(736,64)),new D(Ta(Gf),-1))];for(const c of a.xc)Ba(a.o.O,
c)}else 18===a.j?(a.v.innerText="",a.o.Fa.appendChild(a.Kc),a.j+=1):20===a.j?(a.o.Fa.removeChild(a.Kc),a.j+=1):22===a.j?(a.W=!0,a.v.style.top="20%",Us(a,W("string_16"),2),a.ha="",a.j+=1):23===a.j?(Us(a,W("string_17"),3.3),a.ha="",a.j+=1):24===a.j&&(a.v.innerText="",Vs(a.o.oa,"main_menu"))}function Ws(a){z(a.o.O,a.Ha)}function Us(a,b,c=0,d=!1){a.Ma=b;a.Ka=1E3*c;d?(a.Da=0,a.ab=!0):a.v.innerText=b}
var za=class extends Da{constructor(a,b,c){super(a);this.o=b;this.oc=c;this.xc=[];this.ha=this.Ma="";this.Ka=this.ta=this.Da=0;this.ab=!1;this.W=!0;this.j=0;this.V=this.U=!1;this.va=1;this.jd=Pn();this.Pd=()=>{12===this.j&&(this.j+=1,Ts(this))};this.Rd=()=>{14===this.j?this.j+=1:15===this.j&&(this.o.oa.disableEditButton=!1,this.j+=1,Ts(this))};this.Qd=()=>{"play"===this.o.oa.screen?(Ws(this),Ba(this.o.O,this.Ha)):"edit"===this.o.oa.screen&&Ws(this)};this.v=Ks(Os);this.Va=Ks(Ps,{Gc:W("string_11")});
this.Wa=Ks(Qs,{Gc:W("string_12")});this.Rb=Ks(Rs,{Gc:W("string_13")});this.Kc=Ks(Ss,{Gc:W("string_15")});this.Ha=new x(new ap,new P(new C(-128,-80)),new D(Ta(Ng),-1));b.Fa.appendChild(this.v);this.O.find(N)[0].get(N).Te=!0;Vs(b.oa,"tutorial");Us(this,"       "+W("onboarding_1"),1.5,!0);Ba(this.o.O,this.Ha);document.body.addEventListener("block-flyout-opened",this.Pd);document.body.addEventListener("change-tool",this.Rd);document.body.addEventListener("change-screen",this.Qd)}H(a){if(this.ab)for(this.Da+=
a;60<this.Da;){this.Da-=60;if(this.ha.length===this.Ma.length){this.ab=!1;break}this.ha=this.Ma.slice(0,this.ha.length+1);this.v.innerText=this.ha}for(var b of this.O.find(N))b.get(N).bc=this.W;this.U?(this.ta+=.01*a,b=.25*Math.sin(.5*this.ta)+.75,this.V&&(this.va*=1-a/300,b=.8*this.va,this.Va.style.opacity=(1-this.va).toString()),this.v.style.opacity=b.toString()):this.v.style.opacity="1";if(0<this.Ka&&!this.ab)this.Ka=Math.max(0,this.Ka-a),0===this.Ka&&Ts(this);else{if(1===this.j){this.o.oa.disableEditButton=
!1;for(var c of this.O.find(N))0<Math.abs(c.get(S).wa.x)&&(this.V=!0),52<c.get(P).position.x&&(this.j+=1,Ts(this))}else 3===this.j?263<this.O.find(N)[0].get(P).position.x&&(this.j=3.1,Ts(this)):5===this.j?330<this.O.find(N)[0].get(P).position.x&&(this.V=!0,this.j+=1):6===this.j?376<this.O.find(N)[0].get(P).position.x&&(this.j+=1,Ts(this)):7.3===this.j?694<this.O.find(N)[0].get(P).position.x&&(this.j=7.4,Ts(this)):10===this.j?"edit"===this.o.oa.screen&&(this.j+=1,Ts(this)):12===this.j?this.o.oa.disableEditButton=
!0:17===this.j?"edit"===this.o.oa.screen&&(b=Xn(this.jd),a=b.j.Uc(48,2),c=b.j.Uc(47,3),b=b.j.Uc(46,4),5===a&&5===c&&5===b&&(this.j+=1,Ts(this))):19===this.j?"play"===this.o.oa.screen&&(this.j+=1,Ts(this)):21===this.j&&(a=this.O.find(N)[0].get(P).position,this.O.find(N)[0].get(N).Te=!0,800<a.x&&(this.j+=1,Ts(this)));this.o.Ze&&22>this.j&&(this.j=22,Ts(this))}}};function Xs(a){return a.v?0:0<a.o?1:0<a.j?2:3}function Ys(a,b){a.v=!1;a.o=0;a.j=0;for(const [,,c]of Tl(b))b=c,7===b?a.v=!0:9===b?a.o+=1:6===b&&(a.j+=1)}function So(a){if(1===Xs(a)){let b;return`${null!=(b=Ea(a.O.find(wj)).get(wj).Td)?b:0}/${a.o}  `}return""}function Yo(a){if(2===Xs(a)){const b=Ea(a.O.find(wj)).get(wj);return`${a.j-b.j}  `}return""}
function Zs(a){const b=Xs(a);if(0===b)return W("objective_flag");const c=Ea(a.O.find(wj)).get(wj);if(1===b){if(c.Td<a.o)return W("objective_coins")}else if(2===b&&c.j<a.j)return W("objective_break");return""}var $s=class{constructor(a){this.O=a;this.v=!1;this.j=this.o=0}Ge(){const a=Xs(this);if(0!==a){var b=Ea(this.O.find(wj)).get(wj);if(1===a){if(b.Td>=this.o)return!0}else if(2===a&&b.j>=this.j)return!0;return!1}}};function at(a){for(const b of Object.keys(a.j))a.j[b]=!1;for(const b in a.o)a.v[b]&&(a.j[a.o[b]]=!0)}
var bt=class{constructor(a){this.j={[0]:!1,[1]:!1,[2]:!1,[3]:!1,[4]:!1};this.o={ArrowUp:0,ArrowDown:1,ArrowLeft:2,ArrowRight:3,KeyW:0,KeyS:1,KeyA:2,KeyD:3,Space:4};this.v={};a.addEventListener("keydown",b=>{b.code in this.o&&(b.preventDefault(),this.v[b.code]=!0,this.j[this.o[b.code]]=!0)});a.addEventListener("keyup",b=>{this.v[b.code]=!1;b.code in this.o&&(b.preventDefault(),at(this))});a.addEventListener("focusout",()=>{this.v={};at(this)})}up(){return this.j[0]}left(){return this.j[2]}right(){return this.j[3]}Pa(){return this.j[4]}};Sa=Fd.mb();function Uo(){var a=jo;a.oa.showKeyIcon=0<Ea(a.j.O.find(wj)).get(wj).Vb}function Vo(a,b){w(b,N)&&(b.get(N).bc=!0);w(b,Fj)&&(b.get(Fj).bc=!0);a.oa.od&&w(b,Jj)&&(Yi(J.Mc)||Xi(J.Mc),a.oa.od.errorText=W("try_again"),setTimeout(()=>{a.oa.od.errorText=""},1500));setTimeout(()=>{var c=b.get(Ij);if(!c.j){c.j=!0;c=c.o(c.position.x,c.position.y);if(w(c,Oj)){const d=c.get(Oj);v(c,d.j)}w(b,Jj)&&v(c,new Jj);Ba(a.O,c);z(a.O,b)}},300)}
function Zo(a){a.Nd?a.Ze=!0:(a.pause(),Xi(J.Ig),Dj(),On(2),ct(a.oa,"game-over-modal"))}function Ur(a){const b=a.O.find(ap),c=Xn(a.o);a.O.o.j.clear();for(const d of b)Ba(a.O,d);a.oa.H();Qg=c.style;rn(c,a.O);Ys(a.j,c.j);dt(a);a.oa.winConditionText=Zs(a.j);et(a)}function dt(a){a.oa.coinCountText=So(a.j);a.oa.breakableCountText=Yo(a.j);a.oa.showKeyIcon=0<Ea(a.j.O.find(wj)).get(wj).Vb}
function ft(a){const b=a.O.find(N),c=a.O.find(Fj);a=a.O.find(pj);0<b.length?v(b[0],new Jj):0<c.length?v(c[0],new Jj):0<a.length&&v(a[0],new Jj)}function gt(a){for(var b of xa(a.O,...a.U))a.Nd&&b instanceof ks||(b.enabled=!0);ft(a);ht(a);b=a.O.find(jj);for(const c of b)c.get(jj).Pf||z(a.O,c)}
function it(a){On(0);a.Nd=!1;a.Ze=!1;for(const c of xa(a.O,za)){var b=c;Ws(b);const d=[b.v,b.Va,b.Wa,b.Rb,b.Kc];for(const e of d)e.parentNode&&b.o.Fa.removeChild(e);document.body.removeEventListener("block-flyout-opened",b.Pd);document.body.removeEventListener("change-screen",b.Qd);document.body.removeEventListener("change-tool",b.Rd);for(const e of b.xc)z(b.o.O,e)}for(const c of ya(a.O).reverse())a.O.j.splice(c,1);b=a.V.W;b.o.splice(0);b.j=-1;Ur(a)}
function jt(a){a.o.j=Yn(a.o);Xn(a.o).j=tn("EoEBCEIQ8///////////ARj+//////////8BImelUtEOgCAIHG2s5djqpf//VcEZY+qQ9HgIEu4OCzZxLs6hJpr5eD2GCAd2Sl/NJyEXvY6t5wysQq3SiOGwO181SoFAHNJXX94Aj7mbsokP4jZx0WL3R5jsrxryTIIfHgafbtlycC4D").j;Ur(a);Ea(a.O.find(Ia)).get(P).scale=new C(6,6);a.Nd=!0;a.H.enabled=!1;const b=new Aa(a.O);a.O.j.push(new za(a.O,a,b));a.O.j.push(b);gt(a)}function ht(a){a=a.O.find(Oj);for(const b of a)w(b,D)&&ta(b,b.get(D)),a=b.get(Oj),v(b,a.j)}
function et(a){a=a.O.find(Oj);for(const b of a)w(b,D)&&ta(b,b.get(D)),a=b.get(Oj),v(b,a.o)}
var kt=class{constructor(a,b,c){this.oa=a;this.Fa=b;this.ka=c;this.Ze=this.Nd=!1;this.O=new Ca;this.o=Pn();this.H=new ks(this.O);this.U=[ps,rs,yl,vl,ks,ts,bo,ss,ts,fo,io,qs,Aa];b=bs(a).getContext("2d");if(!b)throw Error("qa");jo=this;b.imageSmoothingEnabled=!1;const d=pm();a.isFromShare=void 0!==d;a.isFromShare&&On(101);if(d)try{var e=un(mm(d));e.source=3;const g=$n(this.o,e);this.o.j=void 0===g?Vn(this.o,e):g;er(this.oa.Kf)}catch(g){console.error(g)}Ba(this.O,new x(new P(new C(0,0),0,new C(3,3)),
new ap,new Ia));e=Xn(this.o);On(0);Qg=e.style;rn(e,this.O);this.j=new $s(this.O);Ys(this.j,e.j);dt(this);this.oa.winConditionText=Zs(this.j);c=new bt(c);rk()&&(this.v=new js(this.O,bs(this.oa)),this.v.start());var f;e=new es(c,null==(f=this.v)?void 0:f.v);f=new yl(this.O,$o);this.O.j=[new ps(this.O,e),new ms(this.O,c),new rs(this.O,e),f,new io(this.O,f),new ts(this.O,this),new bo(this.O),new qs(this.O),new fo(this.O),new ss(this.O),this.H,new ns(this.O),new vl(this.O),new ul(this.O,b)];this.V=new cs(this);
a.addEventListener("snap-editor-camera",()=>{ft(this);this.H.H()});a.addEventListener("change-screen",()=>{a.H();if("edit"===a.screen||"main_menu"===a.screen){this.pause();var g;null!=(g=this.v)&&(g.active=!1,z(g.O,g.V),z(g.O,g.ha),gs(g.v))}else if("play"===a.screen||"tutorial"===a.screen)gt(this),null==(g=this.v)||g.start()});a.addEventListener("show-modal",()=>{"play"===a.screen&&this.pause()});a.addEventListener("hide-modal",()=>{"play"===a.screen&&gt(this)});a.addEventListener("change-cartridge",
()=>{it(this)});a.addEventListener("start-tutorial",()=>{it(this);jt(this)});a.addEventListener("restart-cartridge",()=>{On(0);Cj();Ur(this);gt(this)});ft(this);ht(this);this.o.v&&jt(this)}pause(){for(const a of xa(this.O,...this.U))a.enabled=!1;et(this)}Ge(){this.j.Ge()&&Zo(this)}};var lt=class extends ir{constructor(){super(...arguments);this.name="World"}o(){return vq`
      <div id="pan_arrows_container">
        <ddl-sprite-button
          id ='pan_left_arrow'
          @mousedown=${()=>void Y(this,"pan-left-start")}
          @touchstart=${()=>void Y(this,"pan-left-start")}
          rotationDegrees=180
          .iconIdle=${Lf}
          .iconHover=${Nf}
          .iconActive=${Mf}
          title=${W("pan_left")}>
        </ddl-sprite-button>

        <ddl-sprite-button
          id ='pan_right_arrow'
          @mousedown=${()=>void Y(this,"pan-right-start")}
          @touchstart=${()=>void Y(this,"pan-right-start")}
          .iconIdle=${Lf}
          .iconHover=${Nf}
          .iconActive=${Mf}
          title=${W("pan_right")}>
        </ddl-sprite-button>

        <ddl-sprite-button
          id ='pan_up_arrow'
          rotationDegrees=-90
          @mousedown=${()=>void Y(this,"pan-up-start")}
          @touchstart=${()=>void Y(this,"pan-up-start")}
          .iconIdle=${Lf}
          .iconHover=${Nf}
          .iconActive=${Mf}
          title=${W("pan_up")}>
        </ddl-sprite-button>

          <ddl-sprite-button
          id ='pan_down_arrow'
          @mousedown=${()=>void Y(this,"pan-down-start")}
          @touchstart=${()=>void Y(this,"pan-down-start")}
          rotationDegrees=90
          .iconIdle=${Lf}
          .iconHover=${Nf}
          .iconActive=${Mf}
          title=${W("pan_down")}>
        </ddl-sprite-button>
      </div>
    `}};lt.j=V`
    #pan_arrows_container {
      pointer-events: none;
      width: 100%;
      height: 100%;
      display: grid;
    }

    ddl-sprite-button {
      pointer-events: all;
      padding: 20px;
    }

    #pan_left_arrow {
      grid-area: 2 / 1 / 3 / 2;
      justify-self: start;
      align-self: center;
    }

    #pan_right_arrow {
      grid-area: 2 / 3 / 3 / 4;
      justify-self: end;
      align-self: center;
    }

    #pan_up_arrow {
      grid-area: 1 / 2 / 2 / 3;
      justify-self: center;
      align-self: start;
    }

    #pan_down_arrow {
      grid-area: 3 / 2 / 4 / 3;
      justify-self: center;
      align-self: end;
    }
  `;l([Z({type:String}),n("design:type",Object)],lt.prototype,"name",void 0);lt=l([yr("ddl-pan-arrows")],lt);var mt=class extends ir{constructor(){super(...arguments);this.tool="solid";this.hoveredTool="";this.openedIndex=-1;this.canUndo=!1;this.Ke=[["playerPlatformer","playerTopDown","paddleHorizontal","paddleVertical","ball"],["solid","breakable","pushableSolid","fire"],["goal","checkpoint","coin","powerup"],"enemy enemyHorizontal enemyVertical enemyDiagonal enemyChasing laserCannon".split(" "),["key","portal","lock","spring"],["pressurePlate","blinkingSolidOn","blinkingSolidOff","fallingSolid"],["eraser"],
"styleWand styleN8 styleN16 styleL styleM styleD".split(" ")].map(a=>({Ye:a,selected:a[0]}))}Ha(a){a.target instanceof Jr?(a.target.classList.contains("toolboxButton")||(Xi(J.we),this.openedIndex=-1),a=a.target.value,"styleN8"===a||"styleN16"===a||"styleL"===a||"styleM"===a||"styleD"===a||"styleWand"===a?(Xi(J.we),"styleWand"!==a&&Y(this,"change-style",a)):(this.tool=a,Xi(J.we),Y(this,"change-tool"))):(Xi(J.Zf),this.openedIndex=-1)}j(a){a.target instanceof Jr&&(this.hoveredTool=a.target.value,Y(this,
"hover-tool"))}H(){this.hoveredTool="";Y(this,"hover-tool")}jd(){for(const a of this.Ke)a.Ye.includes(this.tool)&&(a.selected=this.tool)}Ma(){Y(this,"undo-action")}o(){return vq`
      <div id='toolbox' @click=${this.Ha}>
        ${this.Ke.map((a,b)=>vq`
          <div class='drawer'>
            <div class="flyout" ?hidden=${b!==this.openedIndex||1>=a.Ye.length}>
              ${a.Ye.map(c=>"styleWand"===c?vq``:vq`
                <ddl-sprite-button
                    @mouseenter=${this.j}
                    @mouseout=${this.H}
                    title=${W(Pr[c])}
                    ?pressed=${c===a.selected}
                    .value=${c}
                    .iconIdle=${Nr[c].N}
                    .iconHover=${Nr[c].Aa}
                    .iconActive=${Nr[c].active}>
                </ddl-sprite-button>`)}
            </div>
            <ddl-sprite-button class='toolboxButton'
                @mouseenter=${this.j}
                @mouseout=${this.H}
                @click=${()=>{1===b&&Y(this,"block-flyout-opened");this.openedIndex=this.openedIndex===b?-1:b}}
                title=${W("button_open_drawer")}
                .value=${a.selected}
                ?pressed=${this.tool===a.selected}
                .iconIdle=${Nr[a.selected].N}
                .iconHover=${Nr[a.selected].Aa}
                .iconActive=${Nr[a.selected].active}>
            </ddl-sprite-button>
          </div>
        `)}
        <ddl-sprite-button
                id='undo'
                @mouseenter=${this.j}
                @mouseout=${this.H}
                @click=${this.Ma}
                .value=${"undo"}
                title=${W("tool_undo")}
                ?disabled=${!this.canUndo}
                .iconDisabled=${Kg}
                .iconIdle=${Kg}
                .iconHover=${Mg}
                .iconActive=${Lg}>
            </ddl-sprite-button>
      </div>`}};mt.j=V`
    :host {
      image-rendering: pixelated;
      width: 73.75%;
    }

    #toolbox {
      display: flex;
      align-items: flex-end;
      /**
       * This is so that it does not take up height for object placement while
       * the toolbox is open and does not affect the toolbox visually.
       */
      height: 60px;
      justify-content: space-between;
    }

    .drawer {
      display: flex;
      flex-direction: column;
    }`;l([Z({type:String}),n("design:type",Object)],mt.prototype,"tool",void 0);l([Z({type:String}),n("design:type",Object)],mt.prototype,"hoveredTool",void 0);l([Z({type:Number}),n("design:type",Object)],mt.prototype,"openedIndex",void 0);l([Z({type:Boolean}),n("design:type",Object)],mt.prototype,"canUndo",void 0);l([Cr(),n("design:type",Object)],mt.prototype,"Ke",void 0);mt=l([yr("ddl-toolbox")],mt);function nt(a,b){Y(a,"show-modal",{La:b})}
var ot=class extends ir{constructor(){super(...arguments);this.H=!1;this.j=Pn();this.mode="play";this.tool="solid";this.isFromShare=!1;this.errorText=this.hoveredToolText=this.winConditionText="";this.canUndo=!1;this.breakableCountText=this.coinCountText="";this.disableEditButton=this.showKeyIcon=!1;this.currentCartridgeId=this.j.j;this.isMobile=rk();this.jf=En()}oc(){this.mode="edit"===this.mode?"play":"edit";"edit"===this.mode?(!this.H&&this.isFromShare&&this.currentCartridgeId!==Yn(this.j)?(this.mode=
"onboard",nt(this,"edit-modal")):Y(this,"change-mode-edit"),this.H=!0):Y(this,"change-mode-play")}Rb(){Y(this,"menu-button-click")}Ha(a){a.target instanceof mt&&(this.tool=a.target.tool)}Ma(a){a.target instanceof mt&&(this.hoveredToolText=(a=a.target.hoveredTool)&&a in Pr?W(Pr[a]):"");this.errorText=""}Wa(){this.isMobile?Y(this,"native-share"):nt(this,"share-modal")}pause(){"edit"!==this.mode&&nt(this,"pause-modal")}o(){const a="edit"===this.mode;var b=Wn(this.j,this.currentCartridgeId),c=yj(b.style);
c=Gr({background:`${tr(c)}`,width:`${ur(c)}px`,height:`${X(c)}px`});b=xj(b.style);b=Gr({background:`${tr(b)}`,width:`${ur(b)}px`,height:`${X(b)}px`});const d=""!==this.coinCountText;var e=d?We:Ve;e=Gr({background:`${tr(e)}`,width:`${ur(e)}px`,height:`${X(e)}px`});const f=""!==this.coinCountText||""!==this.breakableCountText,g=Gr({"z-index":`${f?1:0}`}),h=Fr({mobile:this.isMobile});var k=this.jf,m=k?Ie:Le,p=k?Ke:Ne;k=k?Je:Me;let q=this.winConditionText;a?q=this.hoveredToolText?this.hoveredToolText:
this.errorText?this.errorText:W("edit_mode"):this.errorText&&(q=this.errorText);return vq`
      <div id='top'
        class='${h}'
        style='${g}'>
        <ddl-sprite-button id="playEditButton"
          @click=${this.oc}
          ?disabled=${this.disableEditButton&&this.currentCartridgeId===Yn(this.j)}
          title=${a?W("button_play_mode"):W("button_edit_mode")}
          .iconIdle=${a?Be:ge}
          .iconHover=${a?De:ie}
            .iconActive=${a?Ce:he}>
      </ddl-sprite-button>

      <div class="topBarText">${q}</div>

      <div class="buttons">
        <ddl-sprite-button
              @click=${()=>void this.pause()}
              ?disabled=${a}
              title=${W("button_pause")}
              .iconIdle=${xe}
              .iconHover=${Ae}
              .iconActive=${ye}
              .iconDisabled=${ze}>
          </ddl-sprite-button>
          <ddl-sprite-button @click=${this.Rb}
            title=${W("button_main_menu")}
            .iconIdle=${je}
            .iconHover=${le}
            .iconActive=${ke}>
          </ddl-sprite-button>
          <ddl-sprite-button
            @click=${this.Wa}
            title=${W("button_share_this_game")}
            .iconIdle=${m}
            .iconHover=${p}
            .iconActive=${k}>
          </ddl-sprite-button>
        </div>
      </div>
      <div id='counterContainer'
        ?hidden=${a||!f}>
        <div id='counter' style='${c}'></div>
        <div id='counterTextContainer'>
          <div id='counterText'>
            ${d?this.coinCountText:this.breakableCountText}
          </div>
          <div id='objectiveIcon' style='${e}'></div>
        </div>
      </div>
      <div ?hidden=${!this.showKeyIcon}>
        <div id='keyContainer'>
          <div id='key' style='${b}'></div>
        </div>
      </div>
      <ddl-pan-arrows ?hidden=${!a}></ddl-pan-arrows>
      <div id='bottom' ?hidden=${!a}>
        <ddl-toolbox .tool=${this.tool} .canUndo=${this.canUndo}
            @change-tool=${this.Ha}
            @hover-tool=${this.Ma}>
        </ddl-toolbox>
      </div>
        `}};ot.j=V`
    :host {
      image-rendering: pixelated;
      display: flex;
      flex-direction: column;
      pointer-events: none;
      position: relative;
    }

    #bottom {
      pointer-events: all;
      display: flex;
      align-self: end;
      justify-content: center;
      background: ${tr(Kd)};
      width: ${ur(Kd)}px;
      height: ${X(Kd)}px;
    }

    #bottom[hidden] {
      display: none;
    }

    #top {
      pointer-events: all;
      background: ${tr(Md)};
      width: ${ur(Md)}px;
      height: ${X(Md)}px;
    }

    #keyContainer {
      width: ${960}px;
      display: flex;
      justify-content: flex-end;
    }

    #key {
      margin: 10px;
    }

    #counterContainer {
      width: ${960}px;
      height: 35px;
    }

    #counterTextContainer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      position: absolute;
      top: ${X(Md)}px;
      right: 12px;
    }

    #counter {
      position: absolute;
      right: 0;
      top: 5px;
    }

    #counterText {
      font-size: 30px;
      margin-right: 3px;
      color: rgb(255, 255, 255);
    }

    #playEditButton {
      position: absolute;
      left: 12px;
      top: 4px;
    }

    .topBarText {
      font-family: PixelMplus10, sans-serif;
      text-align: center;
      font-size: 32px;
      margin: 0px 24px;
      color: rgb(255, 237, 202);
      position: absolute;
      left: 102px;
      top: 10px;
      width: 600px;
    }

    .buttons {
      width: 224px;
      position: absolute;
      top: 4px;
      right: 8px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    .buttons > ddl-sprite-button {
      margin: 0 3px;
    }

    ddl-pan-arrows {
      width: ${960}px;
      height: ${fl-X(Kd)}px;
    }

    ddl-toolbox {
      position: absolute;
      left: 13.45%;
      bottom: 15px;
    }

    .mobile#top {
      background: ${tr(Ld)};
      width: ${ur(Ld)}px;
      height: ${X(Ld)}px;
    }

    .mobile .topBarText {
      width: 548px;
    }

    .mobile .buttons {
      justify-content: flex-start;
    }
  `;l([Z({type:String}),n("design:type",Object)],ot.prototype,"mode",void 0);l([Z({type:String}),n("design:type",Object)],ot.prototype,"tool",void 0);l([Z({type:Boolean}),n("design:type",Object)],ot.prototype,"isFromShare",void 0);l([Z({type:String}),n("design:type",Object)],ot.prototype,"winConditionText",void 0);l([Z({type:String}),n("design:type",Object)],ot.prototype,"hoveredToolText",void 0);l([Z({type:String}),n("design:type",Object)],ot.prototype,"errorText",void 0);
l([Z({type:Boolean}),n("design:type",Object)],ot.prototype,"canUndo",void 0);l([Z({type:String}),n("design:type",Object)],ot.prototype,"coinCountText",void 0);l([Z({type:String}),n("design:type",Object)],ot.prototype,"breakableCountText",void 0);l([Z({type:Boolean}),n("design:type",Object)],ot.prototype,"showKeyIcon",void 0);l([Z({type:Boolean}),n("design:type",Object)],ot.prototype,"disableEditButton",void 0);l([Cr(),n("design:type",Object)],ot.prototype,"isMobile",void 0);
l([Cr(),n("design:type",Object)],ot.prototype,"jf",void 0);ot=l([yr("ddl-control-panel")],ot);function pt(a,b,c=!1){c||a.dispatchEvent(new CustomEvent("show-modal",{detail:{La:b},bubbles:!0,composed:!0}))}function qt(a,b){a.j.j=b;er(a);Y(a,"change-cartridge")}function rt(a){return a.H<Math.floor(a.j.o.size/4)-1&&8<a.j.o.size+1}function st(a,b){"up"===b?0<a.H&&(a.Qc+=174,a.H--):rt(a)&&(a.Qc-=174,a.H++)}function tt(a){a=Xn(a.j);return 0===a.source||1===a.source}
var ut=class extends ir{constructor(){super(...arguments);this.H=0;this.j=Pn();this.Rb=!1;this.Qc=0;this.isMobile=rk();this.kf=En()}static get Sf(){return{hidden:{type:Boolean,Fe:"hidden"}}}oc(){this.isMobile?Y(this,"native-share"):pt(this,"share-modal")}Ha(a){a.currentTarget instanceof Jr&&"cartridge"===a.currentTarget.type&&(a=a.currentTarget.value,"new-game-cartridge"===a?(a=this.j,On(102),Vn(a,new gm),qt(this,this.j.j),this.Ma()):a===this.j.j?this.Wa():qt(this,a))}Wa(){Y(this,"change-mode-play")}Ma(){Y(this,
"change-mode-edit");Y(this,"snap-editor-camera")}ye(){var a=this.j,b=this.j.j;On(102);b=Wn(a,b).clone();b.source=2;Vn(a,b);qt(this,this.j.j)}Kc(){if(!this.Rb){var a=wr(this.eh,this.Qf);const b=wr(this.Sg,this.Ff);a=Math.min(a,b);this.Qf.style.fontSize=`${a}px`;this.Ff.style.fontSize=`${a}px`;this.Rb=0<a}}o(){const a=Xn(this.j),b={position:"relative",top:`${this.Qc}px`};var c=this.kf,d=c?te:pe,e=c?se:oe,f=c?qe:me;c=c?re:ne;return vq`
        <div>
          <ddl-sprite-button
            id='settings-button'
            @click=${()=>void pt(this,"settings-modal")}
            title=${W("button_settings")}
            .iconIdle=${He}
            .iconHover=${Ge}
            .iconActive=${Ee}
            .iconDisabled=${Fe}>
          </ddl-sprite-button>

          <div class='modify-game-row'>
            <ddl-sprite-button
              @click=${this.oc}
              title=${W("button_share_game")}
              .iconIdle=${d}
              .iconHover=${e}
              .iconActive=${f}
              .iconDisabled=${c}>
            </ddl-sprite-button>
            <ddl-sprite-button
              @click=${this.ye}
              title=${W("button_duplicate_game")}
              .iconIdle=${fe}
              .iconHover=${ee}
              .iconActive=${ce}
              .iconDisabled=${de}>
            </ddl-sprite-button>
            <ddl-sprite-button
              @click=${()=>{pt(this,"delete-modal",tt(this))}}
              ?disabled=${tt(this)}
              title=${W("button_delete_game")}
              .iconIdle=${be}
              .iconHover=${ae}
              .iconActive=${Zd}
              .iconDisabled=${$d}>
            </ddl-sprite-button>
          </div>

          <div class='selected-game'>
            <img class='selected-game-thumbnail'
              src=${em(a)}>
            </img>
          </div>

          <ddl-sprite-button type='edit'
            id='edit-button'
            @click=${this.Ma}
            title=${W("button_edit_game")}>
          <div id='edit-container'>
            <div id='edit-text-container'>
              ${W("button_edit_game")}
            </div>
          </div>
          </ddl-sprite-button>
          <ddl-sprite-button type='play'
            id='play-button'
            @click=${this.Wa}
            title=${W("button_play_game")}>
            <div id='play-container'>
              <div id='play-text-container'>
                ${W("button_play_game")}
              </div>
            </div>
          </ddl-sprite-button>
        </div>

        <div class='cartridges-title'>${W("select_a_game")}</div>

        <div class='cartridges'>
        ${[...this.j.o.keys()].map(g=>{if(g!==Yn(this.j)){var h=Wn(this.j,g),k=this.Ha,m=W("button_select_game"),p=g===this.j.j,q=Gr(b);h.v||(h.v=new dm(h));h=h.v.url();return vq`
            <ddl-sprite-button type='cartridge' .value=${g}
                @click=${k}
                title=${m}
                ?pressed=${p}
                style=${q}>
                <img class='thumbnail' .src=${h}></img>
            </ddl-sprite-button>`}})}
            <ddl-sprite-button type='cartridge' .value=${"new-game-cartridge"}
                title=${W("create_game")}
                style=${Gr(b)}
                @click=${this.Ha}
                .iconIdle=${Dg}
                .iconHover=${Dg}
                .iconActive=${Dg}
                .iconDisabled=${Dg}>
            </ddl-sprite-button>
        </div>
        <div class='scrollBar'>
          <ddl-sprite-button
            class='scrollUp'
            @click=${()=>{st(this,"up")}}
            title=${W("scroll_up")}
            ?disabled=${!(0<this.H)}
            .iconIdle=${Vd}
            .iconHover=${Ud}
            .iconActive=${Sd}
            .iconDisabled=${Td}>
          </ddl-sprite-button>
          <ddl-sprite-button
            class='scrollDown'
            @click=${()=>{st(this,"down")}}
            title=${W("scroll_down")}
            ?disabled=${!rt(this)}
            .iconIdle=${Rd}
            .iconHover=${Qd}
            .iconActive=${Od}
            .iconDisabled=${Pd}>
          </ddl-sprite-button>
        </div>
        `}};ut.j=V`
    :host {
      position: relative;
      display: inline-block;
      background: ${tr(Nd)};
      width: ${ur(Nd)}px;
      height: ${X(Nd)}px;
      z-index: 1;
    }

    #settings-button {
      position: absolute;
      top: 10px;
      left: 10px;
    }

    .cartridges {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      height: ${324}px;
      position: absolute;
      top: 116px;
      left: 375px;
      place-items: center;
      overflow: hidden;
      gap: ${24}px 3px;
    }

    .cartridges-title {
      position: absolute;
      top: 20px;
      left: 376px;
      width: 560px;
      font-family: 'PixelMplus10', sans-serif;
      font-size: 40px;
      text-align: center;
      color: #fff;
    }

    .modify-game-row {
      display: flex;
      position: absolute;
      left: 18.75%;
      top: 34px;
      width: 162px;
    }

    .modify-game-row > ddl-sprite-button {
      width: 54px;
    }

    .selected-game {
      background: ${tr(Ue)};
      width: ${ur(Ue)}px;
      height: ${X(Ue)}px;
      position: absolute;
      top: 105px;
      left: 78px;
    }

    .selected-game-thumbnail {
      position: absolute;
      top: 15px;
      left: 27px;
      width: 180px;
      height: 180px;
    }

    #edit-button,
    #play-button {
      position: absolute;
      left: 60px;
    }

    #edit-button {
      top: 458px;
    }

    #play-button {
      top: 395px;
    }

    #edit-container,
    #play-container {
      position: absolute;
      top: 20%;
      left: 20%;
      height: 60%;
      width: 75%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #edit-text-container,
    #play-text-container {
      width: fit-content;
      color: rgb(157, 0, 2);
      pointer-events: none;
      font-family: 'PixelMplus10', sans-serif;
      width: fit-content;
    }

    .scrollBar {
      position: absolute;
      top: 90px;
      right: 11px;
      height: ${324}px;
      display: flex;
      flex-flow: column;
      justify-content: center;
      gap: 5px;
    }
  `;l([Br("#edit-container"),n("design:type",HTMLElement)],ut.prototype,"Sg",void 0);l([Br("#edit-text-container"),n("design:type",HTMLElement)],ut.prototype,"Ff",void 0);l([Br("#play-container"),n("design:type",HTMLElement)],ut.prototype,"eh",void 0);l([Br("#play-text-container"),n("design:type",HTMLElement)],ut.prototype,"Qf",void 0);l([Cr(),n("design:type",Object)],ut.prototype,"Qc",void 0);l([Cr(),n("design:type",Object)],ut.prototype,"isMobile",void 0);
l([Cr(),n("design:type",Object)],ut.prototype,"kf",void 0);ut=l([yr("ddl-main-menu")],ut);var vt=class extends ir{constructor(){super(...arguments);this.isMobile=!0;this.screen="play"}o(){return vq`
      <div class="controlsModalContainer">
        <div class="controlsModal">
          <div class="title">${W("controls_title")}</div>
          <div class="moveContainer">
            <div class="moveAnimation"></div>
            <div class="${this.isMobile?"moveMobile":"moveDesktop"}"></div>
            <div class="textContainer">
              ${this.isMobile?W("controls_move_mobile"):W("controls_move_desktop")}
            </div>
          </div>
          <div class="jumpContainer">
            <div class="jumpAnimation"></div>
            <div class="${this.isMobile?"jumpMobile":"jumpDesktop"}" ></div>
            <div class="textContainer">
              ${this.isMobile?W("controls_jump_mobile"):W("controls_jump_desktop")}
            </div>
        </div>

          <ddl-sprite-button class='okButton'
              @click=${()=>{"main_menu"===this.screen?Y(this,"show-modal",{La:"settings-modal"}):Y(this,"show-modal",{La:"pause-modal"})}}
              title=${W("button_ok")}
              .iconIdle=${Xf}
              .iconHover=${Xf}
              .iconActive=${Xf}>
              <div class='textContainer'>${W("button_ok")}</div>
        </ddl-sprite-button>
        </div>
      </div>
      </div>`}};vt.j=V`
    .controlsModalContainer {
      position: relative;
      height: 100%;
      width: 100%;
    }

    .controlsModal {
      background: ${tr(Yf)};
      width: ${ur(Yf)}px;
      height: ${X(Yf)}px;
    }

    .title {
      width: 80%;
      text-align:center;
      margin: 0 auto;
      color: #9d0002;
      font-size: 32px;
      position: relative;
      top:14px;
    }

    .okButton {
      position: absolute;
      display: flex;
      justify-content: center;
      margin: 0 auto;
      bottom: 42px;
      width: 100%;
    }

    .okButton:hover * {
      color: white;
    }

    .textContainer {
      text-align: center;
      color: #9d0002;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'PixelMplus10', sans-serif;
    }

    .moveContainer > .textContainer,
    .jumpContainer > .textContainer{
      margin-top: 10px;
      font-size: 28px;
      height: 63px;
    }

    .okButton>.textContainer {
      position: absolute;
      top: 0;
      font-size: 32px;
      height: 100%;
    }

    .moveContainer,
    .jumpContainer {
      position: absolute;
      top: 80px;
      width: 210px;
      height: 215px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
    }

    .moveContainer {
      left: 92px;
    }

    .jumpContainer {
      right: 72px;
    }

    .moveAnimation {
      width: 66px;
      height: 48px;
      position: relative;
      background: ${vr(V`popup_howtoplay_playermove.gif`,66,48)};
    }

    .moveMobile {
      width: 42px;
      height: 42px;
      position: relative;
      background: ${vr(V`popup_howtoplay_mobilemove.gif`,42,42)};
      margin-top: 10px;
    }

    .moveDesktop {
      width: 87px;
      height: 33px;
      position: relative;
      background: ${vr(V`popup_howtoplay_desktopmove.gif`,87,33)};
    }


    .jumpAnimation {
      width: 42px;
      height: 102px;
      position: relative;
      background: ${vr(V`popup_howtoplay_playerjump.gif`,42,102)};
    }

    .jumpMobile {
      width: 24px;
      height: 30px;
      position: relative;
      background: ${vr(V`popup_howtoplay_mobilejump.gif`,24,30)};
  }

    .jumpDesktop {
      width: 84px;
      height: 30px;
      position: relative;
      background: ${vr(V`popup_howtoplay_desktopjump.gif`,84,30)};
    }
  `;l([Z({type:Boolean}),n("design:type",Object)],vt.prototype,"isMobile",void 0);l([Z({type:String}),n("design:type",Object)],vt.prototype,"screen",void 0);vt=l([yr("ddl-controls-modal")],vt);var wt=class extends ir{j(){Y(this,"delete-game")}cancel(){Y(this,"hide-modal")}o(){return vq`
      <div class="deleteModalContainer">
        <div class="deleteModalBg">
          <div class="title">${W("delete_modal_title")}</div>
          <div class="details">${W("delete_modal_details")}</div>

            <ddl-sprite-button class='deleteButtonContainer'
              @click=${this.j}
              title=${W("button_yes")}
              .iconIdle=${F}
              .iconHover=${F}
              .iconActive=${F}
              .iconDisabled=${F}>
              <div class='textContainer'>${W("button_yes")}</div>
            </ddl-sprite-button>

            <ddl-sprite-button class='cancelButtonContainer'
              @click=${this.cancel}
              title=${W("button_cancel")}
              .iconIdle=${F}
              .iconHover=${F}
              .iconActive=${F}
              .iconDisabled=${F}>
              <div class='textContainer'>${W("button_cancel")}</div>
            </ddl-sprite-button>
        </div>
      </div>
    `}};wt.j=V`
    .deleteModalContainer {
      height: 100%;
      width: 100%;
    }

    .deleteModalBg {
      background: ${tr(Of)};
      width: ${ur(Of)}px;
      height: ${X(Of)}px;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
    }

    .title {
      font-size: 32px;
      color: #9d0002;
    }

    .details {
      font-size: 20px;
      padding: 40px 40px 30px 40px;
      text-align: center;
      color: #9d0002;
    }

    ddl-sprite-button:hover * {
      color: white;
    }

    .deleteButtonContainer {
      margin-bottom: 8px;
    }

    .textContainer {
      position: absolute;
      font-size: 24px;
      color: #9d0002;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'PixelMplus10', sans-serif;
    }
  `;wt=l([yr("ddl-delete-modal")],wt);var xt=class extends ir{j(){Y(this,"change-mode-edit")}H(){Y(this,"change-mode-tutorial")}o(){return vq`
      <div class="editModalContainer">
        <div class="editModal">
          <div class="title">${W("edit_modal_title")}</div>
          <div class="description">${W("edit_modal_description")}</div>
          <div class="editPreview"></div>
            <ddl-sprite-button class='okButtonContainer'
              @click=${this.j}
              title=${W("button_ok")}
              .iconIdle=${Bg}
              .iconHover=${Bg}
              .iconActive=${Bg}
              .iconDisabled=${Bg}>
              <div class='textContainer'>${W("button_ok")}</div>
            </ddl-sprite-button>

            <ddl-sprite-button class='tutorialButtonContainer'
              @click=${this.H}
              title=${W("button_tutorial")}
              .iconIdle=${Bg}
              .iconHover=${Bg}
              .iconActive=${Bg}
              .iconDisabled=${Bg}>
              <div class='textContainer'>${W("button_tutorial")}</div>
            </ddl-sprite-button>
        </div>
      </div>
    `}};xt.j=V`
    .editModalContainer {
      position: relative;
      height: 100%;
      width: 100%;
    }

    .editModal {
      background: ${tr(Vf)};
      width: ${ur(Vf)}px;
      height: ${X(Vf)}px;
    }

    .title,
    .description {
      color: #9d0002;
      width: 80%;
      text-align:center;
      margin: 0 auto;
    }

    .title {
      font-size: 32px;
      position: relative;
      top: 32px;
    }

    .description {
      color: #9d0002;
      font-size: 20px;
      position: relative;
      top: 46px;
     }

    .okButtonContainer, .tutorialButtonContainer {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      bottom: 46px;
    }

    .editPreview {
      background: url('popup_editorexample.gif');
      width: 319px;
      height: 158px;
      position: relative;
      top: 93px;
      margin: 0px auto;
    }

    .okButtonContainer {
      right: 51%;
    }

    .tutorialButtonContainer {
      left: 51%;
    }

    .okButtonContainer:hover > *,
    .tutorialButtonContainer:hover > * {
      color: white;
    }

    .textContainer{
      position: absolute;
      text-align: center;
      font-size: 24px;
      color: #9d0002;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'PixelMplus10', sans-serif;
    }
  `;xt=l([yr("ddl-edit-modal")],xt);var yt=class extends ir{constructor(){super(...arguments);this.isMobile=rk();this.lf=En()}H(){Y(this,"restart-cartridge");Y(this,"hide-modal")}Ma(){this.isMobile?Y(this,"native-share"):Y(this,"show-modal",{La:"share-modal"})}Wa(){Y(this,"menu-button-click")}j(){Y(this,"change-mode-edit")}Ha(){On(3);Qk()}o(){var a=this.lf,b=a?bg:eg,c=a?dg:gg;a=a?cg:fg;return vq`
      <div id='gameOver'>
        <div id='background'>
          <div id='title'>
            ${W("you_win")}
          </div>
          <div id='gameOptContainer'>
            <div id='spriteButtonContainer'>
              <ddl-sprite-button @click=${this.j}
                title=${W("edit_this_game")}
                .iconIdle=${Pf}
                .iconHover=${Rf}
                .iconActive=${Qf}>
              </ddl-sprite-button>
              <div id='spriteButtonTextContainer'>
                <div id='spriteButtonText'>
                  ${W("edit_this_game")}
                </div>
              </div>
            </div>
            <div id='spriteButtonContainer'>
              <ddl-sprite-button @click=${this.Wa}
                title=${W("play_more_games")}
                .iconIdle=${Sf}
                .iconHover=${Uf}
                .iconActive=${Tf}>
              </ddl-sprite-button>
              <div id='spriteButtonTextContainer'>
                <div id='spriteButtonText'>
                  ${W("play_more_games")}
                </div>
              </div>
            </div>
          </div>
          <div id='shareContainer'>
             <div id='spriteButtonContainer'>
              <ddl-sprite-button @click=${this.H}
                title=${W("replay_this_game")}
                .iconIdle=${Zf}
                .iconHover=${ag}
                .iconActive=${$f}>
              </ddl-sprite-button>
              <div id='spriteButtonTextContainer'>
                <div id='smallSpriteButtonText'>
                  ${W("replay_this_game")}
                </div>
              </div>
            </div>
            <div id='spriteButtonContainer'>
              <ddl-sprite-button
                @click=${this.Ma}
                title=${W("button_share_game")}
                .iconIdle=${b}
                .iconHover=${c}
                .iconActive=${a}>
              </ddl-sprite-button>
              <div id='spriteButtonTextContainer'>
                <div id='smallSpriteButtonText'>
                  ${W("button_share_game")}
                </div>
              </div>
            </div>
            <div id='spriteButtonContainer'>
              <ddl-sprite-button @click=${this.Ha}
                title=${W("button_search")}
                .iconIdle=${hg}
                .iconHover=${ig}
                .iconActive=${jg}>
              </ddl-sprite-button>
              <div id='spriteButtonTextContainer'>
                <div id='smallSpriteButtonText'>
                  ${W("button_search")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `}};yt.j=V`
    #background {
      background: ${tr(Wf)};
      width: ${ur(Wf)}px;
      height: ${X(Wf)}px;
      display: grid;
      align-items: center;
      justify-items: center;
    }
    #modal {
      width: fit-content;
      background-color: #ccc;
      padding: 70px;
    }
    #gameOver {
      display: grid;
      align-items: center;
      justify-items: center;
      height: 100%;
    }
    #gameOptContainer, #shareContainer {
      display: flex;
      align-items: center;
    }
    #gameOptContainer {
      gap: 20px;
    }
    #shareContainer {
      height: 100%;
      align-items: start;
      gap: 10px;
      padding-left: 10px;
      padding-bottom: 15px;
    }
    #title{
      width: 80%;
      text-align:center;
      margin: 0 auto;
      color: #6c0069;
      font-size: 32px;
      position: relative;
      top: 12px;
    }
    #spriteButtonContainer {
      position: relative;
    }
    #spriteButtonTextContainer {
      position: absolute;
      top: 59%;
      left 0;
      height: 37%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      pointer-events: none;
    }
    #spriteButtonText {
      text-align: center;
      font-size: 28px;
      line-height: 28px;
      color: white;
    }
    #smallSpriteButtonText {
      text-align: center;
      font-size: 16px;
      line-height: 16px;
      color: white;
    }
  `;l([Cr(),n("design:type",Object)],yt.prototype,"isMobile",void 0);l([Cr(),n("design:type",Object)],yt.prototype,"lf",void 0);yt=l([yr("ddl-game-over-modal")],yt);const Qi=Si.mb();function zt(a){var b=At();b.muted=a;for(const c of b.j)c.isMuted=b.muted;a?(a=Si.mb(),a.o&&a.j&&a.o.gain.setValueAtTime(0,a.j.currentTime),a.ha=!0):(a=Si.mb(),a.o&&a.j&&a.o.gain.setValueAtTime(a.va,a.j.currentTime),a.ha=!1)}function Bt(){const a=!At().muted;zt(a)}var Ct=class{constructor(){const a=!Qi.H||Qi.isMuted()||At().muted;zt(a);a&&Pi(()=>{zt(!Qi.H||Qi.isMuted())})}isMuted(){return At().muted}};let Dt;function At(){Dt||(Dt=new Et);return Dt}
class Et{constructor(){this.muted=!1;this.j=[]}};var Ft=class extends ir{constructor(){super();this.H=new Ct;this.isMuted=this.H.isMuted();At().j.push(this)}j(){Y(this,"hide-modal")}Ha(){Y(this,"restart-cartridge");this.j()}o(){const a=this.isMuted?{idle:ng,hover:pg,active:og}:{idle:kg,hover:mg,active:lg};return vq`
      <div class="pauseModalContainer">
        <div class="pauseModal">
          <div class="title">${W("pause")}</div>

            <ddl-sprite-button class='buttonContainer'
                    @click=${this.j}
                    .title=${W("button_continue")}
                    .iconIdle=${F}
                    .iconHover=${F}
                    .iconActive=${F}>
              <div class='textContainer'>${W("button_continue")}</div>
            </ddl-sprite-button>

            <ddl-sprite-button class='buttonContainer'
                    @click=${this.Ha}
                    .title=${W("button_restart")}
                    .iconIdle=${F}
                    .iconHover=${F}
                    .iconActive=${F}>
              <div class='textContainer'>${W("button_restart")}</div>
            </ddl-sprite-button>

            <ddl-sprite-button class='buttonContainer'
                    @click=${()=>{Y(this,"show-modal",{La:"controls-modal"})}}
                    .title=${W("button_game_controls")}
                    .iconIdle=${F}
                    .iconHover=${F}
                    .iconActive=${F}>
              <div class='textContainer'>${W("button_game_controls")}</div>
            </ddl-sprite-button>

            <div id='soundContainer'>
              <div id='soundText'>${W("sound")}</div>
              <ddl-sprite-button id='muteButton'
                      @click=${()=>void Bt()}
                      .title=${this.isMuted?W("unmute_message"):W("mute_message")}
                      .iconIdle=${a.idle}
                      .iconHover=${a.hover}
                      .iconActive=${a.active}>
              </ddl-sprite-button>
            </div>
          </div>
        </div>
      </div>`}};Ft.j=V`
    .pauseModalContainer {
      position: relative;
      background: ${tr(Cg)};
      width: ${ur(Cg)}px;
      height: ${X(Cg)}px;
    }

    .pauseModal {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      width: fit-content;
      margin: 0 auto;
    }

    .title {
      font-size: 32px;
      color: rgb(157, 0, 2);
      padding-top: 12px;
      margin: 12px auto;
    }

    ddl-sprite-button:hover * {
      color: white;
    }

    .buttonContainer {
      margin: 4px auto;
    }

    .textContainer {
      position: absolute;
      font-size: 24px;
      color: #9d0002;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'PixelMplus10', sans-serif;
    }

    #soundContainer {
      width: 100%;
      height: 66px;
    }

    #soundText {
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'PixelMplus10', sans-serif;
      font-size: 24px;
      color: #9d0002;
      width: calc(100% - 66px);
      height: 66px;
      margin: 0;
      float: left;
    }

    #muteButton {
      width: 66px;
      height: 66px;
      float: right;
    }
  `;l([Z({type:Boolean}),n("design:type",Object)],Ft.prototype,"isMuted",void 0);Ft=l([yr("ddl-pause-modal"),n("design:paramtypes",[])],Ft);var Gt=class extends ir{constructor(){super();this.j=new Ct;this.isMuted=this.j.isMuted();At().j.push(this)}H(){Y(this,"hide-modal");Qk()}Ha(){Y(this,"hide-modal");Y(this,"start-tutorial")}o(){const a=this.isMuted?{idle:ng,hover:pg,active:og}:{idle:kg,hover:mg,active:lg};return vq`
      <div class="settingsModalContainer">
        <div class="settingsModal">
          <div class="title">${W("settings")}</div>
          <ddl-sprite-button class='buttonContainer'
                  @click=${this.Ha}
                  .title=${W("button_tutorial")}
                  .iconIdle=${F}
                  .iconHover=${F}
                  .iconActive=${F}>
            <div class='textContainer'>${W("button_tutorial")}</div>
          </ddl-sprite-button>

          <ddl-sprite-button class='buttonContainer'
                  @click=${()=>{Y(this,"show-modal",{La:"controls-modal"})}}
                  .title=${W("button_game_controls")}
                  .iconIdle=${F}
                  .iconHover=${F}
                  .iconActive=${F}>
            <div class='textContainer'>${W("button_game_controls")}</div>
          </ddl-sprite-button>

          <ddl-sprite-button class='buttonContainer'
                  @click=${this.H}
                  .title=${W("about_jerry")}
                  .iconIdle=${F}
                  .iconHover=${F}
                  .iconActive=${F}>
            <div class='textContainer'>${W("about_jerry")}</div>
          </ddl-sprite-button>

          <div id='soundContainer'>
              <div id='soundText'>${W("sound")}</div>
              <ddl-sprite-button id='muteButton'
                      @click=${()=>void Bt()}
                      .title=${this.isMuted?W("unmute_message"):W("mute_message")}
                      .iconIdle=${a.idle}
                      .iconHover=${a.hover}
                      .iconActive=${a.active}>
              </ddl-sprite-button>
            </div>
        </div>
      </div>
    `}};Gt.j=V`
    .settingsModalContainer {
      position: relative;
      background: ${tr(Cg)};
      width: ${ur(Cg)}px;
      height: ${X(Cg)}px;
    }

    .settingsModal {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      width: fit-content;
      margin: 0 auto;
    }

    .title {
      font-size: 32px;
      color: #9d0002;
      padding-top: 12px;
      margin: 12px auto;
    }

    ddl-sprite-button:hover * {
      color: white;
    }

    .buttonContainer {
      margin: 4px 0;
    }

    .textContainer {
      position: absolute;
      font-size: 24px;
      color: #9d0002;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'PixelMplus10', sans-serif;
    }

    #soundContainer {
      width: 100%;
      height: 66px;
    }

    #soundText {
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'PixelMplus10', sans-serif;
      font-size: 24px;
      color: #9d0002;
      width: calc(100% - 66px);
      height: 66px;
      margin: 0;
      float: left;
    }

    #muteButton {
      width: 66px;
      height: 66px;
      float: right;
    }
  `;l([Z({type:Boolean}),n("design:type",Object)],Gt.prototype,"isMuted",void 0);Gt=l([yr("ddl-settings-modal"),n("design:paramtypes",[])],Gt);var Kt=a=>ha(function*(){const b="string"===typeof a?a:a.value;var c;if(!(c=yield Ht(b)))if(Ek){"string"===typeof a?(It||(It=document.createElement("input"),It.readOnly=!0,Jk(It,"position","absolute","opacity",0,"left",0,"top",0,"pointerEvents","none"),document.body.appendChild(It)),It.value=a,c=It):c=a;c!==document.activeElement&&c.focus();const e=c.contentEditable,f=c.readOnly;c.contentEditable="true";c.readOnly=!1;const g=document.createRange();g.selectNodeContents(c);const h=window.getSelection();
h.removeAllRanges();h.addRange(g);try{c.select(),c.setSelectionRange(0,c.value.length)}catch(k){}c.contentEditable=e;c.readOnly=f;try{var d=Ek(document,"copy")}catch(k){d=!1}window.getSelection().removeAllRanges();c.blur();It&&(It.remove(),It=null);c=d}else c=!1;return c||(yield Jt())&&(yield Ht(b))?Promise.resolve():Promise.reject()});
const Ht=a=>ha(function*(){return navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(a).then(()=>!0,()=>!1):!1}),Lt=a=>ha(function*(){switch(a.state){case "granted":return!0;case "denied":return!1}return new Promise(b=>{a.onchange=()=>b(Lt(a))})}),Jt=()=>ha(function*(){return navigator.permissions&&navigator.permissions.query?Lt(yield navigator.permissions.query({name:"clipboard-write"})):!1});let It=null;function Mt(a){Wg.call(this);this.j=a;this.o={}}ra(Mt,Wg);var Nt=[];function Ot(a,b,c,d,e){Array.isArray(c)||(c&&(Nt[0]=c.toString()),c=Nt);for(var f=0;f<c.length;f++){var g=nh(b,c[f],d||a.handleEvent,e||!1,a.j||a);if(!g)break;a.o[g.key]=g}}Mt.prototype.handleEvent=function(){throw Error("ra");};Object.freeze([]);Object.create(null);var Pt=(a,b)=>{Uk()||(On(9),a=0==a.indexOf("//")?"https:"+a:a,window.location="http://www.google.com/doodles/_SHARE?description="+encodeURIComponent(b)+"&url="+encodeURIComponent(a))},Qt=()=>null!=window.agsa_ext&&null!=window.agsa_ext.share,Rt=(a,b)=>{!Uk()&&Qt()&&(On(15),window.agsa_ext.share(b+" "+a,null))},St=a=>{ha(function*(){if(Uk())return Promise.reject();On(16);return Kt(a)})};var Tt=class extends ir{constructor(){super(...arguments);this.j=Pn();this.linkCopied=!1;this.currentCartridgeId=this.j.j;this.shareLink=""}H(){this.shareLink!==W("creating_link")&&(this.linkCopied=!0,St(this.shareLink),On(16),setTimeout(()=>{this.linkCopied=!1},1500))}o(){const a=Wn(this.j,this.currentCartridgeId),b=W("share_message");return vq`
      <div id="shareModalContainer">
        <div id="shareModal">
          <div id="title">${W("share_alt_title")}</div>

          <div id='selected-game'>
            <img id='selected-game-thumbnail'
              src=${em(a)}>
            </img>
          </div>

          <div id="contentContainer">
            <div id="shareButtons">
              <ddl-sprite-button
                title=${W("share_facebook")}
                @click=${()=>{var c=this.shareLink;if(!Uk()){c=0==c.indexOf("//")?"https:"+c:c;var d={app_id:"738026486351791",href:c,hashtag:"#GoogleDoodle"};c=new Yj;for(var e in d)c.add(e,d[e]);e=new Tj("https://www.facebook.com/dialog/share");Wj(e,c);qi(e.toString());On(5)}On(5)}}
                .iconIdle=${rg}
                .iconHover=${tg}
                .iconActive=${sg}>
              </ddl-sprite-button>
              <ddl-sprite-button
                title=${W("share_twitter")}
                @click=${()=>{var c=this.shareLink;Uk()||(c=0==c.indexOf("//")?"https:"+c:c,c="text="+encodeURIComponent(b+"\n"+c),qi("http://twitter.com/intent/tweet?"+c),On(6));On(6)}}
                .iconIdle=${xg}
                .iconHover=${zg}
                .iconActive=${yg}>
              </ddl-sprite-button>
            </div>
            <div id="linkCopied" ?hidden=${!this.linkCopied}>
              ${W("link_copied")}
            </div>
            <div id='linkButton'
                 @click=${this.H}>
              <span id='copyLinkIcon'></span>
              <ddl-sprite-button
                title=${this.shareLink}
                .iconIdle=${ug}
                .iconHover=${wg}
                .iconActive=${vg}>
                <div id='linkTextContainer'>${this.shareLink}</div>
              </ddl-sprite-button>
            </div>
            <div id="disclaimer">
              ${W("share_modal_disclaimer")}
            </div>
          </div>
        </div>
      </div>
    `}};Tt.j=V`
    #shareModalContainer {
      position: relative;
      height: 100%;
      width: 100%;
    }

    #shareModal {
      background: ${tr(Ag)};
      width: ${ur(Ag)}px;
      height: ${X(Ag)}px;
    }

    #title{
      width: 80%;
      text-align:center;
      margin: 0 auto;
      color: #6c0069;
      font-size: 32px;
      position: relative;
      top: 32px;
    }

    #disclaimer,
    #linkCopied {
      color: #9d0002;
      font-size: 20px;
      width: 300px;
      margin: 0px auto;
    }

    #disclaimer {
      position: absolute;
      top: 224px;
      left: 6px;
      text-align: center;
    }

    #linkCopied {
      top: 155px;
      text-align: center;
    }

    #contentContainer {
      position: absolute;
      top: 80px;
      right: 45px;
      width: 312px;
      height: 300px;
    }

    #copyLinkIcon {
      z-index: 2;
      position: absolute;
      top: 20px;
      left: 30px;
      background: ${tr(qg)};
      width: ${ur(qg)}px;
      height: ${X(qg)}px;
    }

    #linkButton {
      position: absolute;
      top: 136px;
      z-index: 0;
      width: ${ur(ug)}px;
      height: ${X(ug)}px;
      border: none;
    }

    #selected-game {
      background: ${tr(Ue)};
      width: ${ur(Ue)}px;
      height: ${X(Ue)}px;
      position: absolute;
      top: 80px;
      left: 35px;
    }

    #selected-game-thumbnail {
      position: absolute;
      top: 15px;
      left: 27px;
      width: 180px;
      height: 180px;
    }

    #linkTextContainer {
      font-family: 'PixelMplus10', sans-serif;
      z-index: 2;
      pointer-events: none;
      height: 78px;
      line-height: 78px;
      width: 200px;
      position: absolute;
      top: 0;
      left: 78px;
      overflow: hidden;
      color: white;
      text-align: left;
      font-size: 24px;
    }

    #shareButtons {
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: space-around;
      margin-top: 25px;
      margin-bottom: 5px;
    }
  `;l([Z({type:Boolean}),n("design:type",Object)],Tt.prototype,"linkCopied",void 0);l([Z({type:String}),n("design:type",Object)],Tt.prototype,"currentCartridgeId",void 0);l([Z({type:String}),n("design:type",Object)],Tt.prototype,"shareLink",void 0);Tt=l([yr("ddl-share-modal")],Tt);var Ut=class extends ir{constructor(){super();this.j=new Ct;this.isMuted=this.j.isMuted();At().j.push(this)}Ha(){Bt()}H(){Y(this,"menu-button-click")}o(){var a=this.isMuted?Re:ue,b=this.isMuted?Te:we,c=this.isMuted?Se:ve;return vq`
        <div class='buttons'>
          <ddl-sprite-button @click=${this.Ha}
            title=${this.isMuted?W("unmute_message"):W("mute_message")}
            .iconIdle=${a}
            .iconHover=${b}
            .iconActive=${c}>
          </ddl-sprite-button>
          <ddl-sprite-button @click=${this.H}
              title=${W("button_skip")}
              .iconIdle=${Oe}
              .iconHover=${Qe}
              .iconActive=${Pe}>
          </ddl-sprite-button>
        </div>`}};Ut.j=V`
    .buttons {
      background-color: #C1F7CF;
      position: relative;
      display: flex;
      justify-content: space-between;
    }
  `;l([Z({type:Boolean}),n("design:type",Object)],Ut.prototype,"isMuted",void 0);Ut=l([yr("ddl-tutorial-panel"),n("design:paramtypes",[])],Ut);function bs(a){if(a.mf)return a.mf;throw Error("sa");}function Vs(a,b){if(Zn(a.j)&&"main_menu"===b){var c=a.j;c.j=[...c.o.keys()][1];Y(a,"change-cartridge")}a.screen=b;Y(a,"change-screen")}function ct(a,b){ha(function*(){"share-modal"===b?(a.Zd=!1,a.La=b,a.shareLink=W("creating_link"),a.shareLink=yield vn(Xn(a.j))):(a.Zd="game-over-modal"===b||"controls-modal"===b,a.La=b);er(a)})}
var Vt=class extends ir{constructor(){super(...arguments);this.j=Pn();this.screen=this.j.v?"tutorial":"play";this.tool="solid";this.gridOffsetY=this.gridOffsetX=0;this.gridZoom=48;this.isFromShare=!1;this.winConditionText="";this.canUndo=!1;this.breakableCountText=this.coinCountText="";this.disableEditButton=this.showKeyIcon=!1;this.shareLink="";this.isMobile=rk();this.La="hidden";this.Zd=!1}Wa(a){a.stopImmediatePropagation();this.H();Vs(this,"edit")}Fg(a){a.stopImmediatePropagation();Vs(this,"play")}Ha(a){a.target instanceof
ot&&(this.tool=a.target.tool)}ye(a){a.stopImmediatePropagation();Vs(this,"main_menu")}Gg(a){a.stopImmediatePropagation();a=Yn(this.j);this.j.j=a;this.H();Y(this,"start-tutorial")}oc(a){ct(this,a.detail.La)}Rb(){const a=this;return ha(function*(){a.shareLink=yield vn(Xn(a.j));const b=W("share_message");if(navigator.share)try{yield navigator.share({text:b,url:a.shareLink}).then(()=>{On(17)}),On(17)}catch(c){c instanceof DOMException&&"AbortError"===c.name||(qk()&&pk()&&!tk()?Pt(a.shareLink,b):Qt()&&
Rt(a.shareLink,b))}else qk()&&pk()&&!tk()?(Pt(a.shareLink,b),On(9)):Qt()&&(Rt(a.shareLink,b),On(15))})}H(){"pause-modal"===this.La&&Y(this,"restart-music");this.La="hidden";er(this)}Ma(){var a=this.Kf,b=a.j,c=a.j.j;b.o.delete(c);Un(b);b.j===c&&(b.j=[...b.o.keys()][1]);qt(a,a.j.j);Y(a,"hide-modal")}o(){var a=Xn(this.j);a="edit"===this.screen?zj(a.style):Aj(a.style);a=Gr({"background-position-x":`${this.gridOffsetX}px`,"background-position-y":`${this.gridOffsetY}px`,"background-size":`${this.gridZoom}px`,
"background-image":`url('${"edit"===this.screen?"grid_tile.png":"empty.png"}')`,"background-color":`${a}`});return vq`<div id='container'
        @menu-button-click=${this.ye}
        @change-mode-edit=${this.Wa}
        @change-mode-play=${this.Fg}
        @change-mode-tutorial=${this.Gg}
        @delete-game=${this.Ma}
        @hide-modal=${this.H}
        @show-modal=${this.oc}
        @native-share=${this.Rb}>
        <canvas ?hidden=${"play"!==this.screen&&"edit"!==this.screen&&"tutorial"!==this.screen}
                width=${960} height=${fl}
                style=${a}>
        </canvas>
        <ddl-tutorial-panel
             ?hidden=${"tutorial"!==this.screen}></ddl-tutorial-panel>
        <ddl-control-panel
            ?hidden=${"play"!==this.screen&&"edit"!==this.screen}
            .canUndo=${this.canUndo}
            .currentCartridgeId=${this.j.j}
            .mode=${"edit"===this.screen?"edit":"play"}
            .tool=${this.tool}
            .isFromShare=${this.isFromShare}
            .winConditionText=${this.winConditionText}
            .coinCountText=${this.coinCountText}
            .breakableCountText=${this.breakableCountText}
            .showKeyIcon=${this.showKeyIcon}
            .disableEditButton=${this.disableEditButton}
            @change-tool=${this.Ha}>
        </ddl-control-panel>
        <ddl-main-menu
            id="ddlMainMenu"
            ?hidden=${"main_menu"!==this.screen}>
        </ddl-main-menu>
        <ddl-modal
            ?hidden=${"hidden"===this.La}
            .hideCloseButton=${this.Zd}>
            <ddl-delete-modal
              ?hidden=${"delete-modal"!==this.La}>
            </ddl-delete-modal>
            <ddl-share-modal
              .currentCartridgeId=${this.j.j}
              .shareLink=${this.shareLink}
              ?hidden=${"share-modal"!==this.La}>
            </ddl-share-modal>
            <ddl-edit-modal ?hidden=${"edit-modal"!==this.La}>
            </ddl-edit-modal>
            <ddl-pause-modal ?hidden=${"pause-modal"!==this.La}>
            </ddl-pause-modal>
            <ddl-game-over-modal
              ?hidden=${"game-over-modal"!==this.La}>
            </ddl-game-over-modal>
            <ddl-settings-modal ?hidden=${"settings-modal"!==this.La}>
            </ddl-settings-modal>
            <ddl-controls-modal ?hidden=${"controls-modal"!==this.La} .isMobile=${this.isMobile} .screen=${this.screen}>
            </ddl-controls-modal>
        </ddl-modal>
      </div>
    `}};Vt.j=V`
    :host {
      position: relative;
      display: inline-block;
      image-rendering: pixelated;
      font-family: 'PixelMplus10', sans-serif;
    }

    #container {
      width: ${960}px;
      height: ${540}px;
    }

    canvas {
      position: absolute;
      left: 0;
      bottom: 0;
    }

    ddl-control-panel {
      position: absolute;
      top: 0;
    }

    ddl-main-menu[hidden],
    ddl-control-panel[hidden],
    ddl-game-over[hidden] {
      display: none;
    }
  `;l([Z({type:String}),n("design:type",Object)],Vt.prototype,"screen",void 0);l([Z({type:String}),n("design:type",Object)],Vt.prototype,"tool",void 0);l([Z({type:Number}),n("design:type",Object)],Vt.prototype,"gridOffsetX",void 0);l([Z({type:Number}),n("design:type",Object)],Vt.prototype,"gridOffsetY",void 0);l([Z({type:Number}),n("design:type",Object)],Vt.prototype,"gridZoom",void 0);l([Z({type:Boolean}),n("design:type",Object)],Vt.prototype,"isFromShare",void 0);
l([Z({type:String}),n("design:type",Object)],Vt.prototype,"winConditionText",void 0);l([Z({type:Boolean}),n("design:type",Object)],Vt.prototype,"canUndo",void 0);l([Z({type:String}),n("design:type",Object)],Vt.prototype,"coinCountText",void 0);l([Z({type:String}),n("design:type",Object)],Vt.prototype,"breakableCountText",void 0);l([Z({type:Boolean}),n("design:type",Object)],Vt.prototype,"showKeyIcon",void 0);l([Z({type:Boolean}),n("design:type",Object)],Vt.prototype,"disableEditButton",void 0);
l([Cr(),n("design:type",Object)],Vt.prototype,"shareLink",void 0);l([Cr(),n("design:type",Object)],Vt.prototype,"isMobile",void 0);l([Cr(),n("design:type",Object)],Vt.prototype,"La",void 0);l([Cr(),n("design:type",Object)],Vt.prototype,"Zd",void 0);l([Br("canvas"),n("design:type",Object)],Vt.prototype,"mf",void 0);l([Br("#ddlMainMenu"),n("design:type",Object)],Vt.prototype,"Kf",void 0);l([Br("ddl-control-panel"),n("design:type",Object)],Vt.prototype,"od",void 0);Vt=l([yr("ddl-ui-root")],Vt);function Wt(){const a=document.getElementById("hplogo"),b=document.getElementById("ddlDomRoot"),c=document.getElementById("ctaRoot"),d=document.getElementById("hpcanvas");if(null===a||null===b||null===c||null===d)throw Error("ta");return{scale:1,orientation:"landscape-primary",isFullscreen:!1,fe:!1,width:960,height:540,ka:a,Fa:b,wb:c,Sa:d}};var Yt=class{constructor(a){this.j=a;Xt(a)}};function Zt(a,b){a.Ga.style.display=b?"block":"none"}
var au=class{constructor(a,b){this.Ga=$t();this.Ga.style.top="10px";this.Ga.style.right="10px";this.Ga.style.width="52px";this.Ga.style.height="52px";this.Ga.style.cursor="pointer";this.Ga.style.position="absolute";this.Ga.style.pointerEvents="all";this.Ga.style.background="transparent";this.Ga.style.display="none";this.Ga.setAttribute("role","button");this.Ga.setAttribute("aria-label","Close");this.Ga.tabIndex=0;nh(this.Ga,"click",b);nh(this.Ga,"keydown",c=>{32!==c.keyCode&&13!==c.keyCode||b()});
a.appendChild(this.Ga)}};const $t=()=>{var a=52*(window.devicePixelRatio||1);const b=document.createElement("canvas");b.width=a;b.height=a;const c=b.getContext("2d");c.fillStyle="rgba(0,0,0,.3)";c.arc(a/2,a/2,a/2,0,2*Math.PI);c.fill();c.strokeStyle="#fff";c.lineWidth=a/52*3.5;const d=a/52*2;c.beginPath();c.moveTo(a/4+d,a/4+d);c.lineTo(3*a/4-d,3*a/4-d);c.stroke();c.beginPath();c.moveTo(3*a/4-d,a/4+d);c.lineTo(a/4+d,3*a/4-d);c.stroke();return b};function bu(a){a.j?a.j=!1:(requestAnimationFrame(()=>bu(a)),cu(a))}function cu(a){var b=Date.now(),c=b-a.v;0>c||(c=Math.min(c,50),a.v=b,a.H(c))}var du=class{constructor(a){this.H=a;this.v=0;this.j=this.o=!1;this.H=a}start(){this.v=Date.now();const a=!this.j&&!this.o;this.j=!1;this.o=!0;a&&bu(this)}pause(){this.o&&(this.o=!1,this.j=!0)}};function eu(a){Hn()?setTimeout(()=>{fu(a)},300):(gu(a),yk&&mk.includes("Safari")?nh(a.wb,"click",()=>{fu(a)},!0):oh(a.wb,"click",()=>{fu(a)},!0))}function fu(a){ha(function*(){a.ha&&(yield hu(a));a.W()})}function gu(a){(wk()?"1"===nk.j.get("scta"):document.getElementById("fkbx")||uk())||(a.U.start(),a.j&&a.v&&a.j.classList.add(a.v))}function hu(a){return ha(function*(){if(a.H)return a.H;a.wb.classList.remove(a.o.wf);a.H=iu();yield a.H;a.j&&a.j.remove();a.wb.remove()})}
function iu(){return new Promise(a=>{setTimeout(a,500)})}function ju(a){0!==a.Bc&&a.wb.classList.add(a.o.nf)}var ku=class{constructor(a,b,c,d,e,f=!0){this.j=b;this.v=c;this.V=d;this.W=e;this.ha=f;this.Bc=1;this.H=null;this.o={df:"ddl-hplogocta_",wf:"ddl-showCta_",nf:"ddl-ctaHideDuringLightbox_"};this.wb=a.wb;this.wb.classList.add(this.o.df);this.wb.classList.add(this.o.wf);b&&this.wb.appendChild(b);this.U=new du(g=>{this.V(g)});eu(this)}};const lu=pk()&&mk.includes("OS 12_");function mu(a,b,c){a.style.position="absolute";a.style.top="0";a.style.left="0";a.style.width="100%";a.style.height="100%";a.style.direction="ltr";a.dataset.width=b.toString();a.dataset.height=c.toString()}
function nu(a,b=!1){const c=a.j.parentElement?a.j.parentElement.offsetWidth:a.ka.offsetWidth,d=a.j.parentElement?a.j.parentElement.offsetHeight:a.ka.offsetHeight;a.v&&(0===window.scrollX&&0===window.scrollY||window.scrollTo(0,0));if(c!==a.U||d!==a.H||a.o.isFullscreen!==a.V||b){b=Number(a.j.dataset.width);var e=Number(a.j.dataset.height);if(wk())throw Error("ca");var f=!Gn()||!rk()||xk()||qk()&&pk()||ok()?!1:b<e!==c<d;var g=(a.o.fe=f)?Math.min(c/e,d/b):Math.min(c/b,d/e),h=g*b,k=g*e;a.o.scale=g;g=`scale(${g}, ${g})`;
var m=(h-b)/2;var p=(k-e)/2;var q=f?Math.abs(c-k)/2:Math.abs(c-h)/2,t=f?Math.abs(d-h)/2:Math.abs(d-k)/2;f?(f=(h-k)/2,h=m-f+q,p=p+f+t,g+="rotate(90deg)"):(h=q+m,p+=t);Mk(a.j,"TransformOrigin","center center");Mk(a.j,"Transform",g);Jk(a.j,"position","absolute","width",`${b}px`,"height",`${e}px`,"left",`${h}px`,"top",`${p}px`);lu&&a.v&&(b=document.documentElement,e=b.getBoundingClientRect(),e.width===c&&e.height===d||Jk(b,"width",`${c}px`,"height",`${d}px`));a.v&&!mk.includes("CriOS")&&0<c&&document.body.clientWidth!==
c&&(document.body.clientWidth<document.body.scrollWidth&&Jk(document.body,"width",`${Math.min(document.body.scrollWidth,c)}px`),document.body.clientWidth>c&&Jk(document.body,"width",`${c}px`));a.v&&Jk(a.ka,"height","100%","width","100%");a.U=c;a.H=d;a.V=a.o.isFullscreen}}
var ou=class{constructor(a){this.o=a;this.H=this.U=0;this.V=!1;this.ka=a.ka;this.j=document.querySelector("#uidsdoodle")?a.ka:a.Fa;mu(this.j,a.width,a.height);this.v=Gn();nu(this);window.addEventListener("resize",()=>{nu(this)})}setSize(a,b){this.j.dataset.width=a.toString();this.j.dataset.height=b.toString()}};var pu=class{o(){return!0}};var qu=class extends pu{j(){return!1}};function ru(a){var b=a.Sa.getBoundingClientRect();const c=a.H.fe?b.height:b.width;b=a.H.fe?b.width:b.height;const [d,e]=a.getSize();a.Da=d/c;a.W=e/b}
var su=class{constructor(a){this.H=a;this.v=[];this.j=this.o=null;this.ta=this.ha=0;this.va=this.U=!1;this.V=[];this.W=this.Da=1;this.Sa=this.H.Sa;this.Ka=[this.Sa];nh(window,"resize",()=>{ru(this)});a=()=>{oh(window,"resize",()=>{ru(this)})};window.hasOwnProperty("screen")&&window.screen.hasOwnProperty("orientation")&&!pk()?nh(screen.orientation,"change",a):nh(window,"orientationchange",a);ru(this)}handleEvent(a){ru(this);var b=a.o;var c=void 0;b=(b=b||window.event)?(c=c||b.targetTouches&&b.targetTouches[0]||
b.changedTouches&&b.changedTouches[0])&&void 0!==c.pageX?[c.pageX,c.pageY]:void 0!==b.clientX?[b.clientX+("rtl"==document.dir?-1:1)*(document.body.scrollLeft||document.documentElement.scrollLeft||0),b.clientY+(document.body.scrollTop||document.documentElement.scrollTop||0)]:void 0!==b.pageX?[b.pageX,b.pageY]:[0,0]:[0,0];c=this.Sa.getBoundingClientRect();if(this.H.fe){var d=c.right-b[0];b[0]=b[1]-c.top;b[1]=d}else b[0]-=c.left,b[1]-=c.top;b[0]*=this.Da;b[1]*=this.W;c=b[1];this.ha=b[0];this.ta=c;a=
a.type;if(!this.va||0!==a.indexOf("mouse")){b={touchstart:"mousedown",touchend:"mouseup",touchmove:"mousemove"};a in b&&(this.va=!0,a=b[a]);c=a;a=this.ha;b=this.ta;if(!this.U&&"mousedown"===c)for(this.U=!0,d=0;d<this.V.length;d++)this.V[d]();if("mousedown"===c){if(!this.o)for(c=0;c<this.v.length;c++)if(d=this.v[c],d.o.j()){this.j=this.o=d;d.j("mousedown",a,b);break}}else if("mouseup"===c)this.o?(this.o.j("mouseup",a,b),this.o=null):this.j&&this.j.j("mouseup",a,b);else if("mousemove"===c||"areamove"===
c){d=null;for(let e=0;e<this.v.length;e++){const f=this.v[e];if(f.o.j()){d=f;break}}this.j!==d&&(this.j&&this.j.j("mouseout",a,b),d&&d.j("mouseover",a,b),this.j=d);if("mousemove"===c)for(this.o&&this.o.j("mousemove",a,b),c=0;c<this.v.length;c++)d=this.v[c],d!==this.o&&d.o.j()&&d.j("mousemove",a,b)}else"mouseout"===c?(this.j&&this.j.j("mouseout",a,b),this.j=this.o=null):"contextmenu"===c&&this.j&&this.j.j("contextmenu",a,b);a=this.j&&this.j.o.o()?"pointer":"default";for(const e of this.Ka)Jk(e,"cursor",
a)}}getSize(){return this.Sa instanceof HTMLCanvasElement?[this.Sa.width,this.Sa.height]:[Number(this.Sa.dataset.width),Number(this.Sa.dataset.height)]}};(()=>{const a=new qu;a.j=()=>!0;a.o=()=>!1;return a})();function tu(a,b,c,d,e,f,g,h){this.j=a;this.W=b;this.v=c;this.U=d;this.H=e;this.V=f;this.o=g;this.ha=h}tu.prototype.clone=function(){return new tu(this.j,this.W,this.v,this.U,this.H,this.V,this.o,this.ha)};function uu(a,b){if(0==b)return a.j;if(1==b)return a.o;var c=si(a.j,a.v,b),d=si(a.v,a.H,b);a=si(a.H,a.o,b);c=si(c,d,b);d=si(d,a,b);return si(c,d,b)}
function vu(a,b){var c=(b-a.j)/(a.o-a.j);if(0>=c)return 0;if(1<=c)return 1;for(var d=0,e=1,f=0,g=0;8>g;g++){f=uu(a,c);var h=(uu(a,c+1E-6)-f)/1E-6;if(1E-6>Math.abs(f-b))return c;if(1E-6>Math.abs(h))break;else f<b?d=c:e=c,c-=(f-b)/h}for(g=0;1E-6<Math.abs(f-b)&&8>g;g++)f<b?(d=c,c=(c+e)/2):(e=c,c=(c+d)/2),f=uu(a,c);return c};var wu=((a,b,c,d)=>{const e=new tu(0,0,a,b,c,d,1,1);return f=>{f=vu(e,f);if(0==f)f=e.W;else if(1==f)f=e.ha;else{var g=si(e.W,e.U,f),h=si(e.U,e.V,f),k=si(e.V,e.ha,f);g=si(g,h,f);h=si(h,k,f);f=si(g,h,f)}return f}})(.25,.1,.25,1),xu=(a,b,c,d=wu)=>b+d(a)*(c-b);function yu(){return performance.now()}function zu(a){return null===a.j?0:a.v()-a.j}function Au(a){let b=Math.min(Math.max(zu(a)/a.duration,0),1);a.H&&(b=1-b);for(let c in a.o)a.U.hasOwnProperty(c)&&(a.V[c]=xu(b,a.o[c],a.U[c],a.W));return a.V}function Bu(a){return zu(a)>=a.duration}class Cu{constructor(a,b,c=wu,d=yu){this.o=a;this.U=b;this.V={};this.duration=400;this.W=c;this.v=d;this.j=null;this.H=!1}start(){this.j=this.v();this.H=!1}reset(){this.j=null}};function Du(a){return 3*a*a-2*a*a*a};function Eu(a,b,c,d=()=>{}){ha(function*(){yield Fu(a);window.parent.postMessage({cmd:"resizeDoodle",width:`${b}px`,height:`${c}px`,duration:"400ms",preserveAspectRatio:!0},"*");a.j=!0;let e=!1;const f=()=>{a.H&&a.ka.classList.remove("ddl-expanderHide_");e=!0;d()};a.v=setTimeout(f,500);window.addEventListener("message",g=>{"resizeComplete"===g.data.Bf&&(null!==a.v&&(clearTimeout(a.v),a.v=null),e||f())})})}
function Gu(a,b,c,d=()=>{}){if(a.ka&&Fn()&&!a.j){var e=a.ka;if(uk()||tk())Eu(a,b,c,d);else{document.getElementById("fkbx")&&Jk(e.parentElement,"width","100%");var f=Math.min(b,e.parentElement.clientWidth),g=self.performance.now(),h=new Cu({height:e.offsetHeight,width:e.offsetWidth},{height:f/(b/c),width:f},Du,()=>g);h.start();a.j=!0;var k=new du(m=>a.o(m));a.o=m=>{g=void 0!==m?g+m:self.performance.now();m=Au(h);Yk(e,Math.round(m.width),Math.round(m.height));a.U();return Bu(h)?(k.pause(),d(),a.ka.style.willChange=
"unset",a.o=()=>!1,!1):!0}}}}function Fu(a){if(!a.H)return Promise.resolve();a.ka.classList.add("ddl-expanderHide_");return new Promise(b=>{setTimeout(b,200)})}var Hu=class{constructor(a,b=()=>{}){this.U=b;this.j=!1;this.H="1"===nk.j.get("ntp");this.o=()=>!1;this.v=null;this.ka=a;Fn()&&(this.ka.style.willChange="width,height")}reset(){this.j&&(Jk(this.ka,"width","","height",""),Xk(0),this.ka.style.width="",this.ka.style.height="");this.j=!1}};const Iu=document[Ok(document,"exitFullscreen")],Ju=Ok(document,"fullscreenElement"),Ku=Ok(document,"fullscreenEnabled");function Lu(a){a.o&&window.screen.orientation&&window.screen.orientation.lock&&window.screen.orientation.lock(a.o).catch(()=>{})}function Mu(a,b){a.o=b;a.j.orientation=b;document[Ju]&&Lu(a)}
var Ou=class{constructor(a){this.j=a;this.o=null;this.ka=a.ka;a=Ok(this.ka,"requestFullscreen");this.H=this.ka[a];a=!(!document[Ku]||!Iu);if(wk())throw Error("ca");if(this.v=(pk()?!1:vk()&&!(qk()&&pk()||qk()&&!pk())||tk()&&rk())&&a)Jk(document.body,"margin","0"),Jk(this.ka,"overflow","visible","width","100%","height","100%"),document.body.scrollLeft=0,nh(window,"scroll",Nu,!0)}};const Nu=a=>{a.preventDefault();a.stopPropagation();return!1};function Pu(a){var b=window.agsa_ext;if(!a.ta&&!a.H&&b&&b.getPageVisibility)return"hidden"===b.getPageVisibility();b=document[a.H];return document[a.ta]||"hidden"===b}function Qu(a){a.W?Ru(a):qk()&&!pk()&&Su(a,()=>{Ru(a)})}function Tu(a){Ot(a.va,document,"mousedown mouseout touchstart mouseup mousemove touchend touchmove contextmenu keypress keydown keyup".split(" "),()=>{Uu(a)},!0)}
function Vu(a){a.timeout&&clearTimeout(a.timeout);a.timeout=setTimeout(()=>{a.timeout=void 0;a.o=Kk()-a.V>=a.ha;a.o||Vu(a);Wu(a)},Math.max(100,a.ha-(Kk()-a.V)))}function Uu(a){a.V=Kk();a.o=!1;Wu(a)}function Ru(a){a.U=()=>{a.j=Pu(a);a.j?Wu(a):Uu(a)};const b=window.agsa_ext;a.W?document.addEventListener(a.W,a.U,!1):b&&b.registerPageVisibilityListener&&(Tk(()=>{a.U&&a.U()}),b.registerPageVisibilityListener("google.doodle.pvc();"))}function Su(a,b){window.agsa_ext?b():setTimeout(()=>{Qu(a)},100)}
function Wu(a){const b=a.j||a.o;a.v&&!b?(a.v=!1,a.Ka(),Vu(a)):!a.v&&b&&(a.v=!0,a.Da())}var Xu=class{constructor(a,b,c){this.ha=a;this.Da=b;this.Ka=c;this.o=!1;this.U=()=>{};this.V=Kk();this.ta=Ok(document,"hidden");this.W=(this.H=Ok(document,"visibilityState"))?this.H.replace(/state$/i,"change").toLowerCase():null;this.v=this.j=Pu(this);this.va=new Mt;Qu(this);Tu(this);Vu(this)}};const Yu=a=>new Promise(b=>{setTimeout(b,a)});
function Zu(a,b){const c=document.createElement("div");c.classList.add("ddl-lightboxContainer_");c.classList.add("ddl-lightboxBackground_");a.ka.appendChild(c);const d=document.createElement("div");d.classList.add("ddl-lightboxContentContainer_");c.appendChild(d);b.classList.add("ddl-lightboxContent_");Jk(b,"position","relative","left","50%","top","50%");d.appendChild(b);b=new au(b,()=>{$u(a)});c.appendChild(b.Ga);window.addEventListener("resize",()=>{a.o()});return{Ga:b,Ic:c,He:d}}
function $u(a){ha(function*(){a.j&&(xh(a.v),a.ka.classList.remove("ddl-lightboxMode_"),a.Ic.classList.remove("ddl-lightboxBackground_"),a.Ic.classList.remove("ddl-lightboxEnabled_"),a.j=!1,a.U(),Zt(a.Ga,!1),rk()||!mk.includes("Safari")||mk.includes("Chrome")||(a.ka.style.display="none",a.ka.offsetWidth,a.ka.style.display="block"),yield Yu(0))})}
function av(a){return ha(function*(){a.j||(yield Yu(0),a.ka.classList.add("ddl-lightboxMode_"),a.Ic.classList.add("ddl-lightboxBackground_"),a.Ic.getBoundingClientRect(),a.Ic.classList.add("ddl-lightboxEnabled_"),a.j=!0,a.o(),a.v=nh(document,"keydown",b=>{27===b.keyCode&&$u(a)}),Zt(a.Ga,!0),yield Yu(500))})}
var bv=class{constructor(a,b,c,d,e=()=>{},f=()=>{}){this.ka=a;this.H=b;this.o=e;this.v=null;this.j=!1;this.o=e;this.U=f;const {Ga:g,Ic:h,He:k}=Zu(this,b);this.Ga=g;this.Ic=h;this.He=k;this.setSize(c,d)}setSize(a,b){Jk(this.He,"maxWidth",`${a}px`,"maxHeight",`${b}px`);Jk(this.H,"width",`${a}px`,"height",`${b}px`)}};var cv=a=>{if(pk()&&(vk()||tk()))for(const b of a)nh(b,"touchmove",c=>{1!==c.scale&&c.preventDefault()},{passive:!1})},dv=a=>{for(const b of a)nh(b,"contextmenu",c=>{c.preventDefault()},{passive:!1})};let ev=null;function Xt(a){Ot(a.ha,a.Fa,["mousedown","mouseout","touchstart"],b=>{a.V.handleEvent(b)});Ot(a.ha,document,["mouseup","mousemove","touchend","touchmove","contextmenu"],b=>{a.V.handleEvent(b)})}function fv(){var a=new URLSearchParams(window.location.search);const b=a.get("hl")||"en",c=a.get("gl")||"us";let d;switch(a.get("cta")){case "a":d=0;break;case "s":d=1;break;default:d=2}a="1"===a.get("se")?!0:!1;return{hl:b,gl:c,Ch:d,Kd:a}}
function gv(a){if(yk)dl(a.o.Ng);else{a.Ka.start();a.ab=!0;a.Ha=!0;if(document.querySelector("#uidsdoodle")){if(!a.Wa.Kd)return;window.parent.postMessage({Bf:"resizeDoodle",width:a.o.width,height:a.o.height,duration:150,preserveAspectRatio:!0},"*");const b=new Promise(d=>{window.addEventListener("message",e=>{"resizeComplete"===e.data.Bf&&d()})}),c=new Promise(d=>{setTimeout(d,1E3)});Promise.race([b,c]).then(()=>{On(0);ju(a.v);hv(a.ta);nu(a.U,!0);a.doodle.Tc.j.ka.focus();ru(a.V)})}else iv(a,()=>{On(0);
nu(a.U,!0);a.doodle.Tc.j.ka.focus()});a.ka.removeAttribute("title");jv(a.doodle)}}function kv(a){cv([document,a.ka,a.Fa,a.Sa]);dv([a.ka,a.Fa,a.Sa]);Ot(a.ha,a.ka,"touchend",()=>{var b=a.fullscreen;b.v&&!document[Ju]&&(b.H.call(b.ka),Lu(b),b.j.isFullscreen=!!document[Ju]);Uu(a.xc)})}function lv(a,b){a.H.remove();const c=b?-1:0,d=b?"true":"false";for(const e of a.ka.children)e instanceof HTMLElement&&(e.tabIndex=c,e.ariaHidden=d);b&&a.ka.prepend(a.H)}
function iv(a,b){a.W?mv(a,b):Fn()&&a.o.Kd?(a.va=new Hu(a.ka,()=>{}),Gu(a.va,a.o.width,a.o.height,b)):(b(),ru(a.V))}function mv(a,b){ha(function*(){a.Da=new bv(a.ka,a.Fa,a.o.width,a.o.height,()=>{nu(a.U,!0);ru(a.V)},()=>{a.Nf()});yield nv(a);b();a.Fa.addEventListener("click",()=>ov(a));a.H.addEventListener("click",()=>ov(a))})}function pv(a){ru(a.V);a.ab&&a.Ha?((document.getElementById("fkbx")||uk())&&ev&&(xh(ev),ev=null),a.Ka.start()):gu(a.v);a.doodle.Ve()}
function nv(a){return ha(function*(){ju(a.v);hv(a.ta);let b,c;null==(b=a.Ma)||null==(c=b.Lh)||c.call(b);lv(a,!1);yield av(a.Da)})}function ov(a){return ha(function*(){yield nv(a);pv(a)})}
var rv=class{constructor(a){this.o=a;this.Ha=this.ab=!1;this.doodle=this.Ma=null;this.H=document.createElement("button");this.Wa=fv();this.j=Wt();this.ka=this.j.ka;this.Va=this.ka.title;this.Sa=this.j.Sa;this.Fa=this.j.Fa;this.j.width=this.o.width;this.j.height=this.o.height;(this.W=In())&&!document.querySelector("#uidsdoodle")&&this.Fa.classList.add("ddl-domRootLightboxed_");let b;this.xc=new Xu(null!=(b=a.Dh)?b:6E4,()=>{this.pause()},()=>{this.Ve()});this.ha=new Mt(this);this.V=new su(this.j);this.fullscreen=
new Ou(this.j);let c;Mu(this.fullscreen,null!=(c=this.o.orientation)?c:"landscape-primary");this.U=new ou(this.j);this.Ga=new au(this.Fa,()=>{var d=this.fullscreen;Iu.call(document);d.j.isFullscreen=!!document[Ju]});this.Ga.Ga.classList.add("ddl-closeFullscreenBtn_");this.v=new ku(this.j,this.o.Ud.dh,this.o.Ud.Qg,()=>{},()=>{gv(this);var d=this.H;if(d)if(bh(d)){if(d.tc){var e=d.tc;d=0;for(var f in e.j){for(var g=e.j[f],h=0;h<g.length;h++)++d,eh(g[h]);delete e.j[f];e.o--}}}else if(f=sh(d))for(e in d=
0,f.j)for(g=f.j[e].concat(),h=0;h<g.length;++h)xh(g[h])&&++d},!1!==this.o.Ud.Qh&&!this.W&&!yk);this.ta=new qv(this.j.Fa,this.v.o.df,this.o.Ud.Bc);this.Ka=new du(d=>{this.va&&this.va.o(d);Zt(this.Ga,!!document[Ju]);let e;if(null!=(e=this.doodle.Dg)){var f=e.O;for(const g of f.j)g.enabled&&g.H(d);xa(e.O,...[ms])[0].enabled="edit"===e.oa.screen;"edit"===e.oa.screen&&(f=Ea(e.O.find(Ia)),d=f.get(P).position,f=f.get(P).scale,e.oa.gridOffsetX=-d.x,e.oa.gridOffsetY=-d.y,e.oa.gridZoom=16*f.x)}});kv(this);
nu(this.U);this.H.title=this.Va;this.H.classList.add("ddl-ctaStartButton_");this.H.tabIndex=0;this.H.ariaHidden="false";oh(this.H,"click",()=>{fu(this.v)});lv(this,!Hn())}setSize(a,b){this.j.width=a;this.j.height=b;this.U.setSize(a,b);let c;null==(c=this.Da)||c.setSize(a,b);nu(this.U,!0)}Ve(){let a;!this.W||(null==(a=this.Da)?0:a.j)?pv(this):gu(this.v)}pause(){this.Ka.pause();var a=this.v;a.j&&a.v&&a.j.classList.remove(a.v);a.U.pause();a=Si.mb();!a.V&&a.j&&a.j.suspend();a.V=!0}Kd(){return!this.W&&
Fn()}Nf(){this.pause();lv(this,!0);this.ka.setAttribute("title",this.Va);var a=this.v;0!==a.Bc&&(a.wb.classList.remove(a.o.nf),gu(a));a=this.ta;if(0!==a.Bc)for(const d of a.Fa.children)d.classList.contains(a.j)||d.classList.add("ddl-contentHide_");nu(this.U,!0);let b,c;null==(b=this.Ma)||null==(c=b.Nf)||c.call(b)}};function hv(a){if(0!==a.Bc)for(const b of a.Fa.children)b.classList.contains(a.j)||b.classList.remove("ddl-contentHide_")}class qv{constructor(a,b,c){this.Fa=a;this.j=b;this.Bc=c}};function sv(a){const b=new XMLHttpRequest;b.open("GET",a);return new Promise((c,d)=>{b.send();b.onreadystatechange=()=>{if(4==b.readyState)if(200==b.status&&b.responseText)a:{var e=b.responseText;e.startsWith(")]}'\n")&&(e=e.substring(5));let f={};try{f=JSON.parse(e)}catch(g){d(e);break a}f.hasOwnProperty("ddllog")&&(f=f.ddllog);f.hasOwnProperty("__err__")?d(f.__err__):c(f)}else d(b)}})}
function tv(a,b,c=()=>{},d=!1){d=d?"//www.google.com":"";d=new Tj("ddllog".startsWith("/")?`${d}${"ddllog"}`:`${d}/async/${"ddllog"}`);Wj(d,b);d=d.toString();a.j++;c(a.j);return sv(d).catch(e=>1>a.j?a.o(2E3*Math.pow(2,a.j-1)).then(()=>tv(a,b,c)):Promise.reject(e)).finally(()=>a.j=0)}class uv{constructor(a){this.j=0;this.o=a}};class vv extends uv{constructor(){super(a=>new Promise(b=>setTimeout(b,a)))}};var wv=class extends xc{constructor(a){super(a)}};var xv=()=>{if(cl()&&bl())return Promise.resolve();let a=`_fmt:jspb,doodle:${el},slot:0,`+"type:3,cta:1";(document.getElementById("fkbx")||uk())&&(a+=",ntp:1");cl()&&(a+=",impr:0");const b=new Yj;b.add("async",a);return tv(new vv,b,void 0,!1).then(c=>{c=new wv(c);!cl()&&ac(c,2)&&(Zk=(new Tj(ac(c,2))).j.get("ved",""));!bl()&&ac(c,3)&&(al=ac(c,3))}).catch(()=>Promise.resolve())};function jv(a){ha(function*(){a.Tc.setSize(960,540);const b=new Vt;a.Tc.j.Fa.appendChild(b);const c=[K.Ba.o(),K.Sb.o()];yield Promise.all(c);yield b.Hg.then(()=>a.Dg=new kt(b,a.Tc.j.Fa,a.Tc.j.ka));Ri();Cj()})}
class yv extends Yt{constructor(a){super(a);this.Tc=a;var b=a.j.ka;Mi(Si.mb(),b);b=a.j.ka;var c=b.appendChild;var d=Wa||(Wa=new ui);var e=zs;var f=zs("<style>\n#hplogo{-webkit-transition:opacity 200ms;-o-transition:opacity 200ms;transition:opacity 200ms}.ddl-expanderHide_{opacity:0}.ddl-closeFullscreenBtn_{z-index:3000}.ddl-ctaAnimated_ #lawson-cta-animated{display:block}@font-face{font-family:'PixelMplus10';src:url('https://www.gstatic.com/external_hosted/pixelmplus_font/PixelMplus10-Regular.ttf')}.ddl-jerrySpeak_,.ddl-editPromptText_{position:absolute;width:74%;margin-left:13%;text-align:center;font-family:\"PixelMplus10\",sans-serif;font-size:30pt;font-weight:600;pointer-events:none}.ddl-editPromptText_{top:40%}.ddl-editPromptText2_{top:15%}.ddl-jerrySpeak_{top:20%;color:#005724}.ddl-editPromptText_{color:white}.ddl-arrowPrompt_{-webkit-transform:scale(3.0);-ms-transform:scale(3.0);-o-transform:scale(3.0);transform:scale(3.0);position:absolute;image-rendering:pixelated;image-rendering:-moz-crisp-edges;image-rendering:crisp-edges;top:12%;left:3.25%;-webkit-animation-timing-function:ease-in-out;-o-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out;-webkit-animation-name:bob;-o-animation-name:bob;animation-name:bob;-webkit-animation-duration:1s;-o-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-iteration-count:infinite;-o-animation-iteration-count:infinite;animation-iteration-count:infinite}.ddl-arrowPrompt2_{-webkit-transform:rotate(180deg) scale(3.0);-ms-transform:rotate(180deg) scale(3.0);-o-transform:rotate(180deg) scale(3.0);transform:rotate(180deg) scale(3.0);position:absolute;image-rendering:pixelated;image-rendering:-moz-crisp-edges;image-rendering:crisp-edges;top:80%;left:23.7%;-webkit-animation-timing-function:ease-in-out;-o-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out;-webkit-animation-name:bob2;-o-animation-name:bob2;animation-name:bob2;-webkit-animation-duration:1s;-o-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-iteration-count:infinite;-o-animation-iteration-count:infinite;animation-iteration-count:infinite}.ddl-arrowPrompt3_{-webkit-transform:rotate(90deg) scale(3.0);-ms-transform:rotate(90deg) scale(3.0);-o-transform:rotate(90deg) scale(3.0);transform:rotate(90deg) scale(3.0);position:absolute;image-rendering:pixelated;image-rendering:-moz-crisp-edges;image-rendering:crisp-edges;top:45%;-webkit-animation-timing-function:ease-in-out;-o-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out;-webkit-animation-name:bob3;-o-animation-name:bob3;animation-name:bob3;-webkit-animation-duration:1s;-o-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-iteration-count:infinite;-o-animation-iteration-count:infinite;animation-iteration-count:infinite}@keyframes bob{0%,100%{top:8%}50%{top:12%}}@keyframes bob2{0%,100%{top:80%}50%{top:84%}}@keyframes bob3{0%,100%{left:18.75%}50%{left:21%}}#spotlight{position:absolute;top:0%;left:0%;opacity:0.5;fill:black;stroke-width:5;fill-rule:evenodd}#pointerContainer{overflow:hidden}ddl-ui-root{-webkit-touch-callout:none;pointer-events:all;position:absolute;left:0;top:0;font-family:'PixelMplus10',sans-serif;image-rendering:pixelated}.ddl-hplogocta_{width:100%;height:100%;-webkit-background-size:contain;-o-background-size:contain;background-size:contain;background-position:center;border:none;overflow:hidden;position:absolute;left:0;top:0;z-index:10;cursor:pointer;padding:0;-webkit-transition:opacity 500ms;-o-transition:opacity 500ms;transition:opacity 500ms;opacity:0;pointer-events:auto}.ddl-hplogocta_.ddl-showCta_{opacity:1}.ddl-hplogocta_.ddl-ctaHideDuringLightbox_{display:none}.ddl-closeFullscreenBtn_{pointer-events:all;cursor:pointer;position:absolute;top:5px;right:5px;z-index:3000}.ddl-domRootLightboxed_{left:0;top:0}.ddl-contentHide_{display:none}#ddlDomRoot{pointer-events:none}.ddl-ctaStartButton_{position:absolute;opacity:0;width:0;height:0;padding:0;margin:0;border-width:0}.ddl-lightboxMode_,#hplogo.ddl-lightboxMode_{position:absolute;top:0;left:0;height:100%;width:100%;z-index:1000;overflow:hidden}.ddl-lightboxContentContainer_{position:relative;height:100%;width:100%}.ddl-lightboxEnabled_ .ddl-lightboxContentContainer_{height:90%;width:90%}.ddl-lightboxContent_{-webkit-transform-origin:0 0;-ms-transform-origin:0 0;-o-transform-origin:0 0;transform-origin:0 0}.ddl-lightboxContainer_{position:absolute;display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;width:100%;height:100%}.ddl-lightboxBackground_{opacity:0;background-color:rgba(0,0,0,0.8)}.ddl-lightboxEnabled_{opacity:1;-webkit-transition:opacity 500ms;-o-transition:opacity 500ms;transition:opacity 500ms}\n</style>");e=
e(f);e=Ms(e);f=d.j;d=ti(f,"DIV");ib?(e=mi(ni,e),pi(d,e),d.removeChild(d.firstChild)):pi(d,e);if(1==d.childNodes.length)d=d.removeChild(d.firstChild);else{for(e=f.createDocumentFragment();d.firstChild;)e.appendChild(d.firstChild);d=e}c.call(b,d);a.setSize(931,350);(a=this.j.v.j)&&(wk()?"1"!==nk.j.get("scta"):!document.getElementById("fkbx")&&!uk())&&a.appendChild(Ks(Ns))}Ve(){var a=Si.mb();Promise.resolve();a.V&&a.j&&a.j.resume();a.V=!1}}
ha(function*(){Mn.d=el;!Ln&&Hn()&&(Ln=!0,On(10));var a=[xv(),qm(rr).load(Vk,Wk,bj,""),Ed()];try{yield Promise.all(a);var b=document.getElementById("lawson-cta-container");{a={width:960,height:540,Ng:el,Ud:{dh:b,Qg:"ddl-ctaAnimated_",Bc:1}};b=yv;var c=[];null!=a.Kd||(a.Kd=!0);const f=new rv(a),g=f.j.Sa;if(f.j.ka&&g){var d=new b(f,...c);var e=f.doodle=d}else console.error("Unable to render the Doodle. This is expected during unit tests but may be a cause for concern elsewhere."),
e=void 0}return e}catch(f){console.error("Failed to initialize Doodle. Error: ",f)}});}).call(this);
