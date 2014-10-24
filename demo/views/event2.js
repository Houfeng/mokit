/**
 * 事件模块
 * @class Event
 * @module mokit
 */
(function(owner) {
    "require:nomunge,exports:nomunge,module:nomunge";
    "use strict";

    var utils = null;

    var $event = function(_target) {
        _target = _target || {};
        if (_target.$monitor) return _target.$monitor;

        //创建事件对象
        var monitor = target.$monitor = {
            target: _target
        };

        //注册系统事件
        monitor.addEventListener = function(name, handler, useCapture) {
            if (!utils.isString(name) || !utils.isFunction(handler)) return;
            var target = monitor.target;
            handler.original = function(event) {
                var rs = handler.apply(target, arguments);
                if (rs === false) { //阻止事件冒泡
                    if (event.cancelBubble) event.cancelBubble = true;
                    if (event.preventDefault) event.preventDefault();
                    if (event.stopPropagation) event.stopPropagation();
                }
            };
            if (target.addEventListener) {
                target.addEventListener(name, handler.original, useCapture);
            } else if (target.attachEvent) {
                target.attachEvent("on" + name, handler.original, useCapture);
            };
            return monitor;
        };

        //取消系统事件
        monitor.removeEventListener = function(name, handler, useCapture) {
            if (!utils.isString(name)) return;
            var target = monitor.target;
            var fn = handler && handler.original ? handler.original : handler;
            if (target.removeEventListener) {
                target.removeEventListener(name, fn, useCapture);
            } else if (target.detachEvent) {
                target.detachEvent("on" + name, fn, useCapture);
            };
            return monitor;
        };

        //注册事件
        monitor.on = function(name, handler) {
            if (!utils.isString(name) || !utils.isFunction(handler)) return;
            monitor.lists = monitor.lists || {};
            monitor.lists[name] = monitor.lists[name] || [];
            monitor.lists[name].push(handler);
            monitor.addEventListener(name, handler, false);
            return monitor;
        };

        //取消事件
        monitor.off = function(name, handler) {
            if (!utils.isString(name)) return;
            monitor.lists = monitor.lists || {};
            if (monitor.lists[name]) {
                var newList = [];
                var list = monitor.lists[name];
                utils.each(list, function(i, item) {
                    if (!utils.isNull(handler) && item === handler) {
                        newList.push(item);
                    } else {
                        monitor.removeEventListener(name, handler, false);
                    }
                });
                monitor.lists[name] = newList;
            }
            return monitor;
        };

        //触发事件
        monitor.fire = function(name) {
            if (!utils.isString(name)) return;
            var args = arguments;
            monitor.lists = monitor.lists || {};
            if (monitor.lists[name]) {
                var list = monitor.lists[name];
                utils.each(list, function(i, item) {
                    if (!utils.isFunction(item)) return;
                    item.apply(monitor.target, args);
                });
            }
            return monitor;
        };

        return monitor;

    };

    //原生事件列表
    $event.native = ["click", "dblclick"];

    //兼容AMD模块
    if (typeof define === 'function' && define.amd) {
        define('$event', ['utils'], function(_utils) {
            utils = _utils;
            return $event;
        });
    } else {
        utils = owner.$utils;
        owner.$event = $event;
    }

})((typeof exports === 'undefined') ? this : exports);
//