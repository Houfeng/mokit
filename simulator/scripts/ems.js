/**
 * EMS(IMP) v0.7.0
 * Easy Module System: 简洁、易用的模块系统
 * 作者：侯锋
 * 邮箱：admin@xhou.net
 * 网站：http://houfeng.net , http://houfeng.net/ems
 *
 * ***********************< EMS >************************
 *
 * ems 全称为 "Easy Module System" 他还有一个别名叫: "imp";
 * ems 作为 "EMD" 的实现标准范本; 完全符合 "EMD规范";
 *
 * *********************< EMD 规范 >**********************
 *
 * EMD 全称为 "Easy Module Definition"
 *
 * 规范定义:
 * define([deps...<require>,<exports>,<module>],function(... <require>,<exports>,<module>){
 *
 * 	    //动态导入依赖 (AMD)
 * 		require([deps...],function(...){
 *
 * 		});
 *
 * 		//标准导出 (AMD)
 * 		return {
 * 			say:function(){}
 * 		};
 *
 *      //类CommonJS导入 (CommonJS)
 *      var a=require('a');
 *
 *      //类CommonJS导出 (CommonJS)
 *      exports.say=function(){};
 * });
 *
 * ******************************************************
 */
(function(a){var A=function(H){return(H===null)||(typeof H==="undefined");};var u=function(H){return(H instanceof Array)||(H&&H.length&&H[0]);};var e=function(L,K){if(!L||!K){return;
}if(u(L)){var M=L.length;for(var J=0;J<M;J++){if(A(L[J])){continue;}var H=K.call(L[J],J,L[J]);if(!A(H)){return H;}}}else{for(var I in L){if(A(L[I])){continue;
}var H=K.call(L[I],I,L[I]);if(!A(H)){return H;}}}};var m=function(I,H){return I&&H&&I.indexOf(H)==0;};var p=function(I,H){return I&&H&&I.indexOf(H)>-1;
};var B=function(H){var I=document.createElement("script");I.src=H;I.async=true;I.defer=true;I.type="text/javascript";return I;};var d=function(I){var H=document.createElement("link");
H.href=I;H.type="text/css";H.rel="stylesheet";return H;};var h=function(){return document.getElementsByTagName("script");};var x=function(){var H=h();return e(H,function(){return this.getAttribute("data-main");
});};var D=function(){var H=h();return e(H,function(){if(this.readyState==="interactive"){return this;}});};var i=null;var t=function(H){if(!i){i=document.getElementsByTagName("head");
i=i&&i[0]?i[0]:document.body;i=i||i.parent;}i.appendChild(H);};var f=function(I,H,J){if(I.addEventListener){I.addEventListener(H,J);}else{if(I.attachEvent){I.attachEvent("on"+H,J);
}}};var o=function(H,J){if(!H||!J){return;}if((typeof HTMLLinkElement!=="undefined")&&(H instanceof HTMLLinkElement)){J.apply(H,[{}]);return;}var I=H.attachEvent?"readystatechange":"load";
f(H,I,function(){var K=H.readyState||"loaded";if(K=="loaded"||K=="interactive"||K=="complete"){J.apply(H,arguments||[]);}});};var n={require:{loaded:true,exports:"require"},exports:{loaded:true,exports:"exports"},module:{loaded:true,exports:"module"}};
var b=function(I,H){if(!n[I]){return;}n[I].loading=true;n[I].deps=H.moduleDeps;n[I].declare=H.moduleDeclare;n[I].declareDeps=H.declareDeps;H=null;n[I].require(n[I].deps,function(){var J=arguments;
setTimeout(function(){n[I].require(n[I].declareDeps,function(){setTimeout(function(){if(n[I].declare){var L=[];for(var M=0;M<J.length;M++){if(J[M]=="require"){J[M]=n[I].require;
}if(J[M]=="exports"){J[M]=n[I].exports;}if(J[M]=="module"){J[M]=n[I];}L.push(J[M]);}L.push(n[I].require);L.push(n[I].exports);L.push(n[I]);var K=n[I].declare.apply(n[I],L);
n[I].exports=K||n[I].exports;}e(n[I].loadCallbacks,function(){this(n[I].exports);});if(a.onLoad){a.onLoad(n[I]);}n[I].loaded=true;n[I].loadCallbacks=null;
},0);});},0);});};var G=function(H,I){if(n[H]==null){n[H]=new s(H);}if(n[H].loaded&&I){I(n[H].exports);return n[H].exports;}if(n[H].loadCallbacks!=null){n[H].loadCallbacks.push(I);
return;}n[H].loadCallbacks=[];n[H].loadCallbacks.push(I);n[H].element=p(H,".css")?d(H):B(H);o(n[H].element,function(){if(!n[H].loaded&&!n[H].loading){var J=r.shift()||{};
b(H,J);}});t(n[H].element);};a.load=function(L,M,K){var I=k(L,K);var J=[];var H=0;if(I&&I.length>0){e(I,function(N,O){G(O,function(){H+=1;if(H<I.length){return;
}J=F(I)||J;if(M){M.apply(J,J);}});});}else{if(M){M.apply(J,J);}}return J&&J.length==1?J[0]:J;};a.unload=function(J,I){var H=k(J,I);e(H,function(K,L){if(n[L]){n[L].element.parentNode.removeChild(n[L].element);
n[L].exports=null;n[L].loading=null;n[L].deps=null;n[L].declare=null;n[L].declareDeps=null;n[L].element=null;n[L]=null;}});};var F=function(H){var I=[];
e(H,function(J,K){if(n[K]){I.push(n[K].exports);}});return I;};var l=function(H){return(H=="require"||H=="exports"||H=="module");};var c=function(H){if(m(H,"http://")||m(H,"https://")||m(H,"file://")){return true;
}else{var I=/^\S+?:\/\//ig;return I.test(H);}};var g=function(H){return m(H,"/")||m(H,"\\");};var j=function(K,M){if(!K||!M||c(K)||g(K)||l(K)){return K;
}M=M.split("?")[0].split("#")[0];var J=M.substring(0,M.lastIndexOf("/"));var H=K.split("#")[0].split("/");var I=K.split("#")[1];var L=J.length>0?J.split("/"):[];
e(H,function(O,N){if(N==".."){L.pop();}else{if(N=="."){}else{L.push(N);}}});return L.join("/")+(I?"#"+I:"");};var y=function(H){if(l(H)){return H;}var I=H.substring(H.lastIndexOf("/"),H.length);
if(!p(I,"?")&&!p(I,"#")&&!p(I,".")){H+=(q||".js");}return H;};var C=function(H){if(H==null){return[];}if((typeof H)=="string"){H=[H];}return H;};var k=function(J,I){I=I||location.href;
J=C(J);var H=[];e(J,function(K,M){var L=v[M]||M;L=y(L);L=j(L,I);H.push(L);});return H;};var s=function(I){var H=this.uri=this.id=I||"/";this.resovleUri=function(J,K){return j(J,K||H);
};this.require=function(J,K){return a.load(J,K,I);};this.unrequire=function(J){return a.unload(J,I);};this.exports={};this.declare=null;this.deps=null;
this.loaded=false;};var r=[];var w=function(K,J,H){var I=null;if(J&&H){I={moduleDeps:J,moduleDeclare:H};}else{if(K&&J){I={moduleDeps:K,moduleDeclare:J};
}else{if(K&&H){I={moduleDeps:J,moduleDeclare:H};}else{if(K){I={moduleDeclare:K};}}}}return I;};var E=function(J){var H=[];var K=/require\s*\(\s*[\"|\'](.+?)[\"|\']\s*\)\s*[;|,|\n|\}|\{|\[|\]]/gm;
var I=null;while(I=K.exec(J)){if(I&&I[1]&&!p(I[1],'"')&&!p(I[1],"'")){H.push(I[1]);}}return H;};a.define=function(N,M,I){var K=w(N,M,I);if(K){if(typeof K.moduleDeclare!="function"){var O=K.moduleDeclare;
K.moduleDeclare=function(){return O;};}var J=E(K.moduleDeclare.toString());if(J&&J.length>0){K.declareDeps=J;}var H=D();if(H){var L=H.getAttribute("src");
b(L,K);}else{r.push(K);}}};a.config=function(H){H=H||{};H.alias=H.alias||{};e(H.alias,function(I,J){v[I]=J;});q=q||H.extension;};var v={};var q=".js";a.define.amd=a.define.emd=a.define.eamd={};
if(window){window.define=a.define;}var z=x();if(z&&z!=""){a.load(z);}})(this.ems=this.imp={});