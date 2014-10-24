/*csd*/define(function(require,exports,module){"use strict";var a=require("./jquery");var t=require("./touch");var b=require("./class");var u=require("./tp");var v=require("./utils");var e=require("./ajax");var i=require("./json");var d=require("./model");var p=require("./store");var q=require("./task");var g=require("./console");var j=require("./language");var c=require("./event");var n=exports.rootContainer=a(document.body);exports.showMask=false;u.extend(v);var s=exports.templateType={uri:"uri",element:"element",content:"content"};var r=p.dataCache;var k=function(z,y,x){if(!v.isFunction(x)){return;}if(v.isNull(y)){g.error("编译模板错误");}z=z||s.uri;if(z==s.element){x(a(y).html());}else{if(z==s.uri){e.get({url:y,callback:x,dataType:"text",noMask:!exports.showMask});}else{x(y);}}};var f=function(A,z,y){if(!v.isFunction(y)){return;}if(v.isNull(z)){g.error("编译模板错误");}var x=z.split("?")[0].split("#")[0];if(r[x]){if(y){y(r[x]);}}else{k(A,z,function(B){r[x]=u.compile(B);if(y){y(r[x]);}});}};var h=function(z,y){if(!z||!y){return null;}var x=y.split(".");v.each(x,function(A,B){z=(B&&z[B])?z[B]:null;});return z;};var o=function(z,y,A){if(z===null||y===null||A===null){return;}var x=y.split(".");v.each(x,function(B,C){if(B<x.length-1){if(C&&!z[C]){z[C]=new d.Model();}z=z[C];}else{z[C]=A;}});};var m=function(y){var A={};var x=y.split(">");A.eventName=(x[0]||"");var z=(x[1]||"").split(":");A.methodName=(z[0]||"");A.methodArgs=(z[1]||"").split(",");if(v.contains(A.methodName,"!")){A.isViewMethod=true;A.methodName=A.methodName.toString().replace("!","");}return A;};var l=function(z){var A={};var y=z.split("<");A.filedName=(y[1]||"");var x=(y[0]||"").split(":");A.attrName=(x[0]||"");A.attrArg=(x[1]||"");return A;};var w=b.create(function(){this.templateType="";this.template="";this.model=null;this.controller=null;this.ui=null;this.el=null;this.name="";this.container=null;this.initialize=function(x){var y=this;x=x||{};y.id=x.id||v.newGuid();y.model=x.model||y.model||{};y.controller=x.controller||y.controller||{};y.template=x.template||y.template||"";y.templateType=x.templateType||y.templateType||s.uri;y.options=x.options||y.options||{};y.elMap=y.el;if(y.model.registerView){y.model.registerView(y);}};this.setModel=function(x){var y=this;y.model=x;};this.bindEvent=function(x,z,y){x.each(function(B,A){c(A).on(z,y);});};this.handleEvent=function(){var y=this;var x=y.ui.find("[data-event]");if(y.ui.attr("data-event")){x.splice(0,0,y.ui[0]);}x.each(function(){var z=a(this);z.view=y;var A=z.attr("data-event");if(!A){return;}A=A.split(";");v.each(A,function(F,E){var D=m(E);var C=D.isViewMethod?y:y.controller;var B=C[D.methodName];if(B){y.bindEvent(z,D.eventName,function(G){var H=m(E);G.$element=z;G.element=z[0];G.view=z.view;G.routeData=z.view.controller.route.routeData;H.methodArgs.reverse();H.methodArgs.push(G);H.methodArgs.reverse();var I=B.apply(C,H.methodArgs);H=null;return I;});}else{g.error((D.isViewMethod?"method":"action")+' "'+D.methodName+'" not found');}D=null;});});};this.handleBind=function(){var y=this;var x=y.ui.find("[data-bind]");if(y.ui.attr("data-bind")){x.splice(0,0,y.ui[0]);}x.each(function(){var A=a(this);var z=A.attr("data-bind");if(!z){return;}z=z.split(";");v.each(z,function(D,B){B=l(B);if(A[B.attrName]){var C=h(y.model,B.filedName);if(B.attrName&&B.attrArg){A[B.attrName](B.attrArg,C);}else{A[B.attrName](C);}}});});};this.updateModel=function(){var y=this;if(!y||!y.ui){return;}var x=y.ui.find("[data-bind]");if(y.ui.attr("[data-bind]")){x.splice(0,0,y.ui[0]);}x.each(function(){var A=a(this);var z=A.attr("data-bind");if(!z){return;}z=z.split(";");v.each(z,function(C,B){B=l(B);if(A[B.attrName]){if(B.attrName&&B.attrArg){o(y.model,B.filedName,A[B.attrName](B.attrArg));}else{o(y.model,B.filedName,A[B.attrName]());}}});});return y.model;};this.handleChildView=function(){var A=this;A.children=A.children||{};var y=A.ui.find("[data-view]");var x={"view":A};if(y.length<1){if(A.onChildRender){A.onChildRender(x);}return;}var z=q.create();y.each(function(){var B=a(this);z.add(function(I){var H=B.attr("data-view");if(!H){return I();}var C=B.attr("id");if(v.isNull(C)){C=v.newGuid();B.attr("id",C);}var E=B.attr("data-model")||"";var D=h(A.model,E)||A.model;var G=B.attr("data-options")||"{}";var F=i.parse(G);if(A.children[C]){A.children[C].container=B;A.children[C].render(B,I);return;}H=module.resovleUri(H,A.templateType==s.uri?A.template:location.href);require(H,function(J){A[C]=A.children[C]=new J({id:C,model:D,controller:A.controller,options:F});A.children[C].parent=A;A.children[C].root=A.root||A;A.children[C].container=B;A.children[C].render(B,I);});});});z.end(function(){if(A.onChildRender){A.onChildRender(x);}});};this.setPageTitle=function(){var y=this;if(!y||!y.ui){return;}if(y.ui.attr("data-role")!="page"){return;}var x=y.ui.attr("data-title");if(x){document.title=x;}};this.mapElements=function(){var x=this;if(!x||!x.ui||!x.elMap){return;}x.el={};v.each(x.elMap,function(y){x.el[y]=x.ui.find(x.elMap[y]);});};this.render=function(y,x){var z=this;if(z.onPreInit){z.onPreInit({view:z});}f(z.templateType,z.template,function(C){var B=z.ui;z.ui=a(a.trim(C(z.model,{lang:j.current(),self:z,model:z.model,options:z.options})));if(!z.ui||z.ui.length<1){return g.error('"'+z.name+'" 发现异常');}z.root=z.root||z;var A={"view":z};z.mapElements(z);z.handleBind(z);z.handleEvent(z);z.handleChildView(z);z.setPageTitle(z);if(z.onInit){z.onInit(A);}if(B){B.remove();}z.container=y||z.container||n;z.container=v.isString(y)?a(z.container):z.container;if(!z.container){g.error("container error.");}if(z.container[0].tagName!=="LINK"){z.container.append(z.ui);}else{z.container.after(z.ui);}if(z.onRender){z.onRender(A);}if(x){x(z.ui);}});};this.remove=function(){var x=this;if(x.ui){x.ui.remove();}if(x.onRemove){x.onRemove({view:x});}if(x.model.removeView){x.model.removeView(x);}x.model=null;x.controller=null;x.ui=null;x.el=null;x.name=null;x.container=null;};this.hide=function(){var x=this;if(x.ui){x.ui.hide();}if(x.onHide){x.onHide({view:x});}};this.show=function(){var x=this;if(x.ui){x.ui.show();}if(x.onShow){x.onShow({view:x});}};});exports.create=function(x,y){if(!y){y=x;x=w;}return b.create(x,y);};});