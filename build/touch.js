/*csd*/define(function(require,exports,module){"use strict";var a=require("mokit/event");var d=require("mokit/utils");var c=exports;c.option={swipeDurationThreshold:1000,swipeHorizontalDistanceThreshold:25,swipeVerticalDistanceThreshold:45,holdDurationThreshold:1000,dblDurationThreshold:450,scrollSupressionThreshold:25};var b="tap,taphold,dbltap,swipe,swipeup,swiperight,swipedown,swipeleft";a.register(b,{on:function(f,g,e,h){if(!d.isFunction(e)){return;}e.touchstart=e.touchstart||function(i){var j=i.changedTouches[0]||{};e.startPoint=e.endPoint={x:j.pageX,y:j.pageY,timeStamp:i.timeStamp};if(g=="taphold"){e.createHoldHandler(i);}};e.createHoldHandler=e.createHoldHandler||function(i){if(!e.holdTimer&&!e.holdHandler){var j=c.option;e.holdHandler=function(){i.taphold=true;f.call("taphold",i);};e.holdTimer=setTimeout(function(){if(e.holdHandler){e.holdHandler();}},j.holdDurationThreshold);}};e.clearHoldHandler=e.clearHoldHandler||function(){if(e.holdTimer){clearTimeout(e.holdTimer);e.holdTimer=null;e.holdHandler=null;}};e.getTouchInfo=function(i){var l=i.changedTouches[0]||{};e.endPoint={x:l.pageX,y:l.pageY,timeStamp:i.timeStamp};var k=c.option;var j={};j.timeStamp=e.endPoint?e.endPoint.timeStamp:null;j.existStartAndStop=e.endPoint&&e.startPoint;j.horizontalDistance=j.existStartAndStop?e.endPoint.x-e.startPoint.x:0;j.verticalDistance=j.existStartAndStop?e.endPoint.y-e.startPoint.y:0;j.horizontalDistanceValue=Math.abs(j.horizontalDistance);j.verticalDistanceVlaue=Math.abs(j.verticalDistance);j.isHorizontal=j.horizontalDistanceValue>=j.verticalDistanceVlaue;j.isVertical=!j.sHorizontal;j.isSwipeMove=j.horizontalDistanceValue>=k.swipeHorizontalDistanceThreshold||j.verticalDistanceVlaue>=k.swipeVerticalDistanceThreshold;j.isSwipeTime=j.existStartAndStop?e.endPoint.timeStamp-e.startPoint.timeStamp<=k.swipeDurationThreshold:true;j.isHoldTime=j.existStartAndStop?e.endPoint.timeStamp-e.startPoint.timeStamp>=k.holdDurationThreshold:false;if(j.isHorizontal&&j.horizontalDistance>0){j.direction="right";}else{if(j.isHorizontal&&j.horizontalDistance<0){j.direction="left";}else{if(j.isVertical&&j.verticalDistance>0){j.direction="down";}else{if(j.isVertical&&j.verticalDistance<0){j.direction="up";}}}}return j;};e.touchmove=e.touchmove||function(){var i=e.getTouchInfo(event);if(i.isSwipeMove){e.clearHoldHandler();}if((g=="swipe")||(g=="swipe"+i.direction)){return false;}};e.done=e.done||function(i){e.clearHoldHandler();var j=e.getTouchInfo(i);if(j.isSwipeTime&&j.isSwipeMove){i.swipe=true;i.direction=j.direction;if(g=="swipe"){f.call("swipe",i);}if(g=="swipe"+i.direction){f.call("swipe"+i.direction,i);}}else{if(j.isSwipeTime&&!j.isSwipeMove&&!j.isHoldTime){if(g=="tap"){f.call("tap",i);}if(g=="dbltap"){var k=c.option;i.dbltap=e.PreTapTime&&j.timeStamp-e.PreTapTime<=k.dblDurationThreshold;if(i.dbltap){f.call("dbltap",i);e.PreTapTime=null;}else{e.PreTapTime=e.endPoint.timeStamp;}}}}};f.on("touchstart",e.touchstart);f.on("touchmove",e.touchmove);f.on("touchend",e.done);},off:function(f,g,e,h){if(d.isFunction(e)){if(d.isFunction(e.touchstart)){f.on("touchstart",e.touchstart);}if(d.isFunction(e.touchmove)){f.on("touchmove",e.touchmove);}if(d.isFunction(e.done)){f.on("touchend",e.done);}}}});});