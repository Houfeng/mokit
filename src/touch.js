define(function(require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    "use strict";

    var $event = require('mokit/event');
    var utils = require('mokit/utils');
    var self = exports;

    var support = ('ontouchstart' in document);
    var startEventName = support ? 'touchstart' : 'mousedown';
    var moveEventName = support ? 'touchmove' : 'mousemove';
    var endEventName = support ? 'touchend' : 'mouseup';

    //合局选项
    self.option = {
        swipeDurationThreshold: 1000,
        swipeHorizontalDistanceThreshold: 25,
        swipeVerticalDistanceThreshold: 45,
        holdDurationThreshold: 1000,
        dblDurationThreshold: 450,
        scrollSupressionThreshold: 25
    };

    //扩展对 tap、swipe 事件的支持
    var eventNames = "tap,taphold,dbltap,swipe,swipeup,swiperight,swipedown,swipeleft,pointdown,pointmove,pointup";
    $event.register(eventNames, {
        on: function(monitor, name, handler, useCapture) {
            if (!utils.isFunction(handler)) return;

            //处理 touchstart 事件
            handler.touchstart = handler.touchstart || function(event) {
                var point = event.changedTouches ? event.changedTouches[0] : event;
                handler.startPoint = handler.endPoint = {
                    "x": point.pageX,
                    "y": point.pageY,
                    "timeStamp": event.timeStamp,
                    "point": point
                };
                if (name == 'taphold') {
                    handler.createHoldHandler(event);
                }
                //模拟鼠标事件
                if (name == 'pointdown') {
                    utils.copy(handler.startPoint, event);
                    monitor.call('pointdown', event);
                    monitor.isPointDown = true;
                }
            };

            //创建 hold 处理器
            handler.createHoldHandler = handler.createHoldHandler || function(event) {
                // 处理 taphold 事件
                if (!handler.holdTimer && !handler.holdHandler) {
                    var option = self.option;
                    handler.holdHandler = function() {
                        event.taphold = true;
                        monitor.call('taphold', event);
                    };
                    handler.holdTimer = setTimeout(function() {
                        if (handler.holdHandler) handler.holdHandler();
                    }, option.holdDurationThreshold);
                }
            };

            //清除 hold 处理器
            handler.clearHoldHandler = handler.clearHoldHandler || function() {
                if (handler.holdTimer) {
                    clearTimeout(handler.holdTimer);
                    handler.holdTimer = null;
                    handler.holdHandler = null;
                }
            };

            //获取划动信息
            handler.getTouchInfo = function(event) {
                var point = event.changedTouches ? event.changedTouches[0] : event;
                handler.endPoint = {
                    "x": point.pageX,
                    "y": point.pageY,
                    "timeStamp": event.timeStamp,
                    "point": point
                };
                //
                var option = self.option;
                // 一些计算结果
                var info = {};
                info.timeStamp = handler.endPoint ? handler.endPoint.timeStamp : null;
                info.existStartAndStop = handler.endPoint && handler.startPoint;
                info.horizontalDistance = info.existStartAndStop ? handler.endPoint.x - handler.startPoint.x : 0;
                info.verticalDistance = info.existStartAndStop ? handler.endPoint.y - handler.startPoint.y : 0;
                info.horizontalDistanceValue = Math.abs(info.horizontalDistance);
                info.verticalDistanceVlaue = Math.abs(info.verticalDistance);
                info.isHorizontal = info.horizontalDistanceValue >= info.verticalDistanceVlaue;
                info.isVertical = !info.sHorizontal;
                info.isSwipeMove = info.horizontalDistanceValue >= option.swipeHorizontalDistanceThreshold || info.verticalDistanceVlaue >= option.swipeVerticalDistanceThreshold;
                info.isSwipeTime = info.existStartAndStop ? handler.endPoint.timeStamp - handler.startPoint.timeStamp <= option.swipeDurationThreshold : true;
                info.isHoldTime = info.existStartAndStop ? handler.endPoint.timeStamp - handler.startPoint.timeStamp >= option.holdDurationThreshold : false;
                //这里的 direction 仅是指划动方法，不代表 swipe 动作，swipe 动作还有时间或划动距离等因素
                if (info.isHorizontal && info.horizontalDistance > 0) {
                    info.direction = 'right';
                } else if (info.isHorizontal && info.horizontalDistance < 0) {
                    info.direction = 'left';
                } else if (info.isVertical && info.verticalDistance > 0) {
                    info.direction = 'down';
                } else if (info.isVertical && info.verticalDistance < 0) {
                    info.direction = 'up';
                }
                return info;
            };

            //处理 touchmove 事件
            handler.touchmove = handler.touchmove || function(event) {
                var info = handler.getTouchInfo(event);
                if (info.isSwipeMove) {
                    handler.clearHoldHandler();
                }
                var stopBubble = false;
                //模拟鼠标事件
                if (monitor.isPointDown && name == 'pointmove') {
                    utils.copy(handler.endPoint, event);
                    monitor.call('pointmove', event);
                    stopBubble = true;
                }
                //在绑定划动的方向上禁止滚动，因为 Android 4.x 不如此处理，touchend 事件将不触发
                if ((name == 'swipe') || (name == 'swipe' + info.direction)) {
                    stopBubble = true;
                }
                //如果需要阻止冒泡
                if (stopBubble) {
                    return false;
                }
            };

            //完成事件
            handler.done = handler.done || function(event) {
                handler.clearHoldHandler();
                var info = handler.getTouchInfo(event);
                //模拟鼠标事件
                if (name == 'pointup') {
                    utils.copy(handler.endPoint, event);
                    monitor.call('pointup', event);
                    monitor.isPointDown = false;
                }
                // 根据计算结果判断
                if (info.isSwipeTime && info.isSwipeMove) {
                    event.swipe = true;
                    event.direction = info.direction;
                    if (name == 'swipe') {
                        monitor.call('swipe', event);
                    }
                    if (name == 'swipe' + event.direction) {
                        monitor.call('swipe' + event.direction, event);
                    }
                } else if (info.isSwipeTime && !info.isSwipeMove && !info.isHoldTime) {
                    if (name == 'tap') {
                        monitor.call('tap', event);
                    }
                    if (name == 'dbltap') {
                        //处理 “双击”
                        var option = self.option;
                        event.dbltap = handler.PreTapTime && info.timeStamp - handler.PreTapTime <= option.dblDurationThreshold;
                        if (event.dbltap) {
                            monitor.call('dbltap', event);
                            handler.PreTapTime = null;
                        } else {
                            handler.PreTapTime = handler.endPoint.timeStamp;
                        }
                    }
                }
            };

            //绑定组合事件
            monitor.on(startEventName, handler.touchstart);
            monitor.on(moveEventName, handler.touchmove);
            monitor.on(endEventName, handler.done);

        },
        off: function(monitor, name, handler, useCapture) {
            //只有指定了 handler 才能取消构成组合事件的 “原事件”
            //否则会直接移除会将其他 touchstart 等事件也移除
            if (utils.isFunction(handler)) {
                if (utils.isFunction(handler.touchstart)) {
                    monitor.off(startEventName, handler.touchstart);
                }
                if (utils.isFunction(handler.touchmove)) {
                    monitor.off(moveEventName, handler.touchmove);
                }
                if (utils.isFunction(handler.done)) {
                    monitor.off(endEventName, handler.done);
                }
            }
        }
    });
});