/*csd*/((function(a){a.mokit=a.mokit||{name:"mokit",version:"2.0 Beta 54",author:"Houfeng"};a.mokitAppName=a.mokitAppName||a.mokit.name;})(this));define(function(require,exports,module){"use strict";var n=require("./style.css");var f=require("./console");var m=require("./route");var b=require("./event");var q=require("./utils");var j=require("./model");var r=require("./view");var g=require("./controller");var i=require("./language");var n=require("./style");var d=require("./ajax");var p=require("./transitions");var a=require("./jquery");var o=require("./task");var k=require("./navigation");exports.route=m;exports.language=i;exports.style=n;exports.console=f;exports.utils=q;exports.model=j;exports.view=r;exports.controller=g;exports.ajax=d;r.app=exports;exports.events=b.use(exports);var l=function(s){var t={"route":s};exports.events.call("onStart",t);return !t.cancel;};var h=null;var e=function(w,t,v,s){if(h){w.route.effect=w.route.effect||[0,0];var u=s;if(q.isNull(u)){u=(v&&h)?h.route.effect[1]:w.route.effect[0];}p.change(h.rootView,w.rootView,u,function(){h.rootView.remove();h.rootView=null;delete h.rootView;h=null;h=w;if(t){t();}},{container:r.rootContainer});}else{h=w;if(t){t();}}};var c=function(v,t,s){if(p.isAnimating()){return;}var u=m.getRoute(v);if(!u){return f.error('route "'+v+'" not found');}if(!l(u)){return;}require(u.target,function(w){var x=new w();x.route=u;x.routeData=u.routeData;x.isBack=t;x.setView=function(A,y){var z=this;A.root=A;z.rootView=A;if(!z.rootView){return f.error(v+" rootView not found");}z.rootView.controller=z;z.rootView.render(null,function(){e(z,y,t,s);});};if(h){if(h.onDispose){h.onDispose(h.context);}}x.context={"routeData":x.routeData};if(x.onCreate){x.onCreate(x.context);}if(x.index){x.index(x.context);}});};k.events.on("change",function(s){if(s.uri){c(s.uri,s.isBack,k.effect);}k.effect=null;});exports.start=function(t,s){if(t!=k.getUri()){k.effect=s;k.setUri(t);}else{c(t,false,s);}};exports.back=k.back;exports.onReady=function(s){a(s);};exports.init=function(u){u=u||{};r.rootContainer=r.rootContainer||u.container;u.style=(u.style||n.currentName()||n.defaultName()||"default").toLowerCase();u.language=(u.language||i.currentName()||i.defaultName()||"en-us").toLowerCase();var t=k.getUri();window.navigation=k;if(t==null||t==u.splash){t=u.index;}var s=function(){i.setLanguage(u.language,function(){exports.start(t||u.index);});};var v=function(){if(u.preInit){u.preInit(s);}else{s();}};n.setStyle(u.style,function(){exports.onReady(function(){if(u.splash){exports.start(u.splash);q.async(v,500);}else{v();}});});};});