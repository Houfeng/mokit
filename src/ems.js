/*csd*//**
 * EMS(IMP) v0.9.2
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
 *      //动态导入依赖 (AMD)
 *      require([deps...],function(...){
 *
 *      });
 *
 *      //标准导出 (AMD)
 *      return {
 *          say:function(){}
 *      };
 *
 *      //类CommonJS导入 (CommonJS)
 *      var a=require('a');
 *
 *      //类CommonJS导出 (CommonJS)
 *      exports.say=function(){};
 * });
 *
 * ******************************************************/
(function(B){function u(J){return(J===null)||(typeof J==="undefined");}function t(J){return(J instanceof Array)||(J&&J.length&&J[0]);}function k(M,J){if(!M||!J){return;}if(t(M)){var N=M.length;for(var K=0;K<N;K++){if(u(M[K])){continue;}var O=J.call(M[K],K,M[K]);if(!u(O)){return O;}}}else{for(var L in M){if(u(M[L])){continue;}var O=J.call(M[L],L,M[L]);if(!u(O)){return O;}}}}function F(J,K){return J&&K&&J.indexOf(K)==0;}function e(J,K){return J&&K&&J.indexOf(K)>-1;}function g(K){var J=document.createElement("script");J.src=K;J.async=true;J.defer=true;J.type="text/javascript";return J;}function h(K){var J=document.createElement("link");J.href=K;J.type="text/css";J.rel="stylesheet";return J;}function q(){return document.getElementsByTagName("script");}function o(){var J=q();return k(J,function(){return this.getAttribute("data-main");});}function n(){var J=q();return k(J,function(){if(this.readyState==="interactive"){return this;}});}var l=null;function b(J){if(!l){l=document.getElementsByTagName("head");l=l&&l[0]?l[0]:document.body;l=l||l.parent;}l.appendChild(J);}function c(J,L,K){if(J.addEventListener){J.addEventListener(L,K);}else{if(J.attachEvent){J.attachEvent("on"+L,K);}}}function d(J,K){if(!J||!K){return;}if((typeof HTMLLinkElement!=="undefined")&&(J instanceof HTMLLinkElement)){K.apply(J,[{}]);return;}var L=J.attachEvent?"readystatechange":"load";c(J,L,function(){var M=J.readyState||"loaded";if(M=="loaded"||M=="interactive"||M=="complete"){K.apply(J,arguments||[]);}});}var A={"require":{loaded:true,exports:"require"},"exports":{loaded:true,exports:"exports"},"module":{loaded:true,exports:"module"}};function E(K,J){if(!A[K]){return;}A[K].loading=true;A[K].deps=J.moduleDeps;A[K].declare=J.moduleDeclare;A[K].declareDeps=J.declareDeps;J=null;A[K].require(A[K].deps,function(){var L=arguments;setTimeout(function(){A[K].require(A[K].declareDeps,function(){setTimeout(function(){if(A[K].declare){var M=[];for(var N=0;N<L.length;N++){if(L[N]=="require"){L[N]=A[K].require;}if(L[N]=="exports"){L[N]=A[K].exports;}if(L[N]=="module"){L[N]=A[K];}M.push(L[N]);}M.push(A[K].require);M.push(A[K].exports);M.push(A[K]);var O=A[K].declare.apply(A[K],M);A[K].exports=O||A[K].exports;}k(A[K].loadCallbacks,function(){this(A[K].exports);});if(B.onLoad){B.onLoad(A[K]);}A[K].loaded=true;A[K].loadCallbacks=null;},0);});},0);});}function w(K,J){if(A[K]==null){A[K]=new z(K);}if(A[K].loaded&&J){J(A[K].exports);return A[K].exports;}if(A[K].loadCallbacks!=null){A[K].loadCallbacks.push(J);return;}A[K].loadCallbacks=[];A[K].loadCallbacks.push(J);A[K].element=e(K,".css")?h(K):g(K);d(A[K].element,function(){if(!A[K].loaded&&!A[K].loading){var L=i.shift()||{};E(K,L);}});b(A[K].element);}B.load=function(L,K,J){var O=j(L,J);var M=[];var N=0;if(O&&O.length>0){k(O,function(P,Q){w(Q,function(){N+=1;if(N<O.length){return;}M=p(O)||M;if(K){K.apply(M,M);}});});}else{if(K){K.apply(M,M);}}return M&&M.length==1?M[0]:M;};B.unload=function(K,J){var L=j(K,J);k(L,function(M,N){if(A[N]){A[N].element.parentNode.removeChild(A[N].element);A[N].exports=null;A[N].loading=null;A[N].deps=null;A[N].declare=null;A[N].declareDeps=null;A[N].element=null;A[N]=null;}});};function p(K){var J=[];k(K,function(L,M){if(A[M]){J.push(A[M].exports);}});return J;}function v(J){return(J=="require"||J=="exports"||J=="module");}function H(K){if(F(K,"http://")||F(K,"https://")||F(K,"file://")){return true;}else{var J=/^\S+?:\/\//ig;return J.test(K);}}function G(J){return F(J,"/")||F(J,"\\");}function D(M,K){if(!M||!K||H(M)||G(M)||v(M)){return M;}K=K.split("?")[0].split("#")[0];var J=K.substring(0,K.lastIndexOf("/"));var O=M.split("#")[0].split("/");var N=M.split("#")[1];var L=J.length>0?J.split("/"):[];k(O,function(P,Q){if(Q==".."){L.pop();}else{if(Q=="."){}else{L.push(Q);}}});return L.join("/")+(N?"#"+N:"");}function r(K){if(v(K)){return K;}var J=K.substring(K.lastIndexOf("/"),K.length);if(!e(J,"?")&&!e(J,"#")&&!e(J,".")){K+=(m||".js");}return K;}function s(M){var J=M.indexOf("/");if(J<0){J=M.length;}var K=M.substr(0,J);var L=M.substr(J+1,M.length);k(C,function(N,O){if(K==O.name){K=O.location||K;L=L||O.main||"";M=K+"/"+L;}});return M;}function I(J){if(J==null){return[];}if((typeof J)=="string"){J=[J];}return J;}function j(L,K){K=K||location.href;L=I(L);var J=[];k(L,function(N,M){var O=a[M]||M;O=s(O);O=r(O);O=D(O,K);J.push(O);});return J;}function z(K){var J=this.uri=this.id=K||"/";this.resovleUri=function(L,M){return D(L,M||J);};this.require=function(M,L){return B.load(M,L,K);};this.unrequire=function(L){return B.unload(L,K);};this.exports={};this.declare=null;this.deps=null;this.loaded=false;}var i=[];function f(L,K,J){var M=null;if(K&&J){M={moduleDeps:K,moduleDeclare:J};}else{if(L&&K){M={moduleDeps:L,moduleDeclare:K};}else{if(L&&J){M={moduleDeps:K,moduleDeclare:J};}else{if(L){M={moduleDeclare:L};}}}}return M;}function y(M){var L=[];var K=/require\s*\(\s*[\"|\'](.+?)[\"|\']\s*\)\s*[;|,|\n|\}|\{|\[|\]|\.]/gm;var J=null;while(J=K.exec(M)){if(J&&J[1]&&!e(J[1],'"')&&!e(J[1],"'")){L.push(J[1]);}}return L;}B.define=function(L,K,J){var M=f(L,K,J);if(M){if(typeof M.moduleDeclare!="function"){var P=M.moduleDeclare;M.moduleDeclare=function(){return P;};}var N=y(M.moduleDeclare.toString());if(N&&N.length>0){M.declareDeps=N;}var O=n();if(O){var Q=O.getAttribute("src");E(Q,M);}else{i.push(M);}}};B.config=function(J){J=J||{};J.alias=J.alias||J.paths||{};k(J.alias,function(K,L){a[K]=L;});J.packages=J.packages||[];k(J.packages,function(K,L){L.name=L.name||K;C[L.name]=L;});m=m||J.extension;};var a={};var m=".js";var C={};B.resovleUri=function(J){return D(J,location.href);};B.alias=a;B.packages=C;B.modules=A;B.define.amd=B.define.emd=B.define.eamd={};if(window){window.define=B.define;}var x=o();if(x&&x!=""){B.load(x);}})(this.ems=this.imp={});