define(function(require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    "use strict";

    var $event = require('mokit/event');
    var utils = require('mokit/utils');
    var self = exports;

    //合局选项
    self.option = {
        //通过 event.timeStamp 检查
        swipe: {
            durationThreshold: 1000,
            horizontalDistanceThreshold: 25,
            verticalDistanceThreshold: 45
        },
        tap: {
            holdDurationThreshold: 1000,
            durationThreshold: 450
        }
    };

    //扩展对 tap、swipe 事件的支持
    var eventNames = "tap,taphold,dbltap,swipe,swipeup,swiperight,swipedown,swipeleft";
    $event.register(eventNames, function(monitor, name, handler, useCapture) {
        //处理 touchstart 事件
        monitor.on('touchstart', function(event) {
            var point = event.changedTouches[0] || {};
            monitor.startPoint = monitor.endPoint = {
                x: point.pageX,
                y: point.pageY,
                timeStamp: event.timeStamp
            };
            if (name == 'taphold') {
                monitor.createHoldHandler(event);
            }
            return false;
        });

        //创建 hold 处理器
        monitor.createHoldHandler = function(event) {
            // 处理 taphold 事件
            if (!monitor.holdTimer && !monitor.holdHandler) {
                var holdDurationThreshold = self.option.tap.holdDurationThreshold;
                monitor.holdHandler = function() {
                    event.taphold = true;
                    monitor.call('taphold', event);
                };
                monitor.holdTimer = setTimeout(function() {
                    if (monitor.holdHandler) monitor.holdHandler();
                }, holdDurationThreshold);
            }
        };

        //清除 hold 处理器
        monitor.clearHoldHandler = function() {
            if (monitor.holdTimer) {
                clearTimeout(monitor.holdTimer);
                monitor.holdTimer = null;
                monitor.holdHandler = null;
            }
        };

        //处理 touchmove 事件
        monitor.on('touchmove', function() {
            if (name == 'taphold') {
                var point = event.changedTouches[0] || {};
                monitor.endPoint = {
                    x: point.pageX,
                    y: point.pageY,
                    timeStamp: event.timeStamp
                };
                var horizontalDistanceThreshold = self.option.swipe.horizontalDistanceThreshold;
                var verticalDistanceThreshold = self.option.swipe.horizontalDistanceThreshold;
                var horizontalDistance = monitor.endPoint.x - monitor.startPoint.x;
                var verticalDistance = monitor.endPoint.y - monitor.startPoint.y;
                var horizontalDistanceValue = Math.abs(horizontalDistance);
                var verticalDistanceVlaue = Math.abs(verticalDistance);
                var isSwipeMove = horizontalDistanceValue >= horizontalDistanceThreshold || verticalDistanceVlaue >= verticalDistanceThreshold;
                if (isSwipeMove) {
                    monitor.clearHoldHandler();
                }
            }
            return false;
        });

        //处理 scroll 事件，阻止这个事件会更灵敏
        monitor.on('scroll', function() {
            return false;
        });

        //处理 contextmenu 事件，阻止这个事件会 taphold 会更好
        monitor.on('contextmenu', function() {
            return false;
        });

        //完成事件
        var done = function(event) {
            monitor.clearHoldHandler();
            var point = event.changedTouches[0] || {};
            monitor.endPoint = {
                x: point.pageX,
                y: point.pageY,
                timeStamp: event.timeStamp
            };
            // 一些计算结果
            var horizontalDistanceThreshold = self.option.swipe.horizontalDistanceThreshold;
            var verticalDistanceThreshold = self.option.swipe.horizontalDistanceThreshold;
            var horizontalDistance = monitor.endPoint.x - monitor.startPoint.x;
            var verticalDistance = monitor.endPoint.y - monitor.startPoint.y;
            var horizontalDistanceValue = Math.abs(horizontalDistance);
            var verticalDistanceVlaue = Math.abs(verticalDistance);
            var isHorizontal = horizontalDistanceValue >= verticalDistanceVlaue;
            var isVertical = !isHorizontal;
            var isSwipeMove = horizontalDistanceValue >= horizontalDistanceThreshold || verticalDistanceVlaue >= verticalDistanceThreshold;
            var isSwipeTime = monitor.endPoint.timeStamp - monitor.startPoint.timeStamp <= self.option.swipe.durationThreshold;
            var isHoldTime = monitor.endPoint.timeStamp - monitor.startPoint.timeStamp >= self.option.tap.holdDurationThreshold;
            // 根据计算结果判断
            if (isSwipeTime && isSwipeMove) {
                event.swipe = true;
                if (isHorizontal && horizontalDistance > 0) {
                    event.direction = 'right';
                } else if (isHorizontal && horizontalDistance < 0) {
                    event.direction = 'left';
                } else if (isVertical && verticalDistance > 0) {
                    event.direction = 'down';
                } else if (isVertical && verticalDistance < 0) {
                    event.direction = 'up';
                }
                if (name == 'swipe') {
                    monitor.call('swipe', event);
                }
                if (name == 'swipe' + event.direction) {
                    monitor.call('swipe' + event.direction, event);
                }
            } else if (isSwipeTime && !isSwipeMove && !isHoldTime) {
                if (name == 'tap') {
                    monitor.call('tap', event);
                }
                if (name == 'dbltap') {
                    //处理 “双击”
                    event.dbltap = monitor.PreTapTime && monitor.endPoint.timeStamp - monitor.PreTapTime <= self.option.tap.durationThreshold;
                    if (event.dbltap) {
                        monitor.call('dbltap', event);
                        monitor.PreTapTime = null;
                    } else {
                        monitor.PreTapTime = monitor.endPoint.timeStamp;
                    }
                }
            }
        };

        //在 touchend 或 touchcanel 时执行 done 函数
        monitor.on('touchend', done);
        monitor.on('touchcancel', done);

    });
});