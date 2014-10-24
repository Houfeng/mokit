/*csd*/define(function(require,exports,module){"use strict";var h=require("./utils");var g=require("./store");var a=require("./event");var c=require("./console");var f=exports;f.events=a.use(f);var e=g.dataCache["$language"]=f.languages={};var d=null;h.defineProperty(f,"currentName",{get:function(){d=d||g.local.get("mokit://language/current-name");return d;},set:function(i){d=i;return d;}},true);var b=null;h.defineProperty(exports,"current",{get:function(){return b;},set:function(i){return b=i;}},true);h.defineProperty(f,"defaultName",{get:function(){var i=(navigator.language||"").toLowerCase();if(e[i]){return i;}else{return Object.getOwnPropertyNames(e)[0];}}},true);f.addLanguage=function(i,j){h.each(i,function(k){e[k]=(j&&j.resovleUri)?j.resovleUri(this):this;});};f.setLanguage=function(k,i){if(!h.isString(k)){return;}var j=e[k];if(j){require(j,function(l){f.current(l);f.currentName(k);f.events.call("change",{name:k,lang:l});if(i){i(k,l);}});}else{c.error('language "'+k+'" not found.');}};f.save=function(){return g.local.set("mokit://language/current-name",d);};f.clear=function(){return g.local.set("mokit://language/current-name","");};});