/*csd*/define(function(require,exports,module){"use strict";exports.mokit={version:"2.0 Beta 35",author:"Houfeng"};var n=require("./style.css"),e=require("./console"),m=require("./route"),h=require("./event"),q=require("./utils"),j=require("./model"),r=require("./view"),f=require("./controller"),i=require("./language"),n=require("./style"),c=require("./ajax"),p=require("./transitions"),a=require("./jquery"),o=require("./task"),k=require("./navigation");exports.route=m;exports.language=i;exports.style=n;exports.console=e;exports.utils=q;exports.model=j;exports.view=r;exports.controller=f;exports.ajax=c;exports.onstart=h.create(exports,"onStart");var l=function(s){var t={"route":s};exports.onStart.trigger(t);return !t.cancel;};var g=null;var d=function(v,s,u){if(g){v.route.effect=v.route.effect||[0,0];var t=(u&&g)?g.route.effect[1]:v.route.effect[0];p.change(g.rootView,v.rootView,t,function(){g.rootView.remove();g.rootView=null;delete g.rootView;g=null;g=v;if(s){s();}},{container:r.rootContainer});}else{g=v;if(s){s();}}};var b=function(u,s){if(p.isAnimating()){return;}var t=m.getRoute(u);if(!t){return e.error(u+" not found");}if(!l(t)){return;}require(t.target,function(v){var w=new v();w.route=t;w.routeData=t.routeData;w.setView=function(z,x){var y=this;z.root=z;y.rootView=z;if(!y.rootView){return e.error(u+" rootView not found");}y.rootView.controller=y;y.rootView.render(null,function(){d(y,x,s);});};if(w.index){w.index({"routeData":w.routeData});}});};k.change(function(t,s){if(t){b(t,s);}});exports.start=function(s){if(s!=k.getUri()){k.setUri(s);}else{b(s);}};exports.back=k.back;exports.onReady=function(s){a(s);};exports.init=function(u){u=u||{};u.style=(u.style||n.currentName()||n.defaultName()||"default").toLowerCase();u.language=(u.language||i.currentName()||i.defaultName()||"en-us").toLowerCase();var t=k.getUri();window.navigation=k;if(t==null||t==u.splash){t=u.index;}var s=function(){i.setLanguage(u.language,function(){exports.start(t||u.index);});};var v=function(){if(u.preInit){u.preInit(s);}else{s();}};n.setStyle(u.style,function(){exports.onReady(function(){if(u.splash){exports.start(u.splash);q.async(v,500);}else{v();}});});};});