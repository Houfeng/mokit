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
            horizontalDistanceThreshold: 30,
            verticalDistanceThreshold: 45
        }
    };

    //扩展对 tap、swipe 事件的支持
    $event.register("tap,swipe,swipeup,swiperight,swipedown,swipeleft",
        function(monitor, handler, useCapture) {
            monitor.on('touchstart', function(event) {
                var point = event.changedTouches[0] || {};
                monitor.startPoint = monitor.endPoint = {
                    x: point.pageX,
                    y: point.pageY,
                    timeStamp: event.timeStamp
                };
                monitor.moved = false;
            });
            monitor.on('touchmove', function(event) {
                monitor.moved = true;
            });
            monitor.on('scroll', function() {
                return false;
            });
            var done = function(event) {
                var point = event.changedTouches[0] || {};
                monitor.endPoint = {
                    x: point.pageX,
                    y: point.pageY,
                    timeStamp: event.timeStamp
                };
                if (!monitor.startPoint || !monitor.endPoint || !monitor.moved || (monitor.endPoint.timeStamp - monitor.startPoint.timeStamp > self.option.swipe.durationThreshold)) {
                    monitor.call("tap", event);
                } else {
                    var horizontalDistance = monitor.endPoint.x - monitor.startPoint.x;
                    var verticalDistance = monitor.endPoint.y - monitor.startPoint.y;
                    var isHorizontal = Math.abs(horizontalDistance) >= Math.abs(verticalDistance);
                    var isVertical = !isHorizontal;
                    if (isHorizontal && horizontalDistance > self.option.swipe.horizontalDistanceThreshold) {
                        event.direction = 'right';
                        monitor.call('swipe', event);
                        monitor.call('swiperight', event);
                    } else if (isHorizontal && horizontalDistance < -self.option.swipe.horizontalDistanceThreshold) {
                        event.direction = 'left';
                        monitor.call('swipe', event);
                        monitor.call('swipeleft', event);
                    } else if (isVertical && verticalDistance > self.option.swipe.verticalDistanceThreshold) {
                        event.direction = 'down';
                        monitor.call('swipe', event);
                        monitor.call('swipedown', event);
                    } else if (isVertical && verticalDistance < -self.option.swipe.verticalDistanceThreshold) {
                        event.direction = 'up';
                        monitor.call('swipe', event);
                        monitor.call('swipeup', event);
                    } else {
                        monitor.call("tap", event);
                    }
                }
                monitor.startPoint = monitor.endPoint = null;
                monitor.moved = false;
            };

            monitor.on('touchend', done);
            monitor.on('touchcancel', done);

        });
});