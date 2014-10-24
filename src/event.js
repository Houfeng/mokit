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
        var monitor = _target.$monitor = {
            $monitor: monitor,
            target: _target
        };

        //注册 native 事件
        monitor._addEvent = function(name, handler, useCapture) {
            if (!utils.isString(name) || !utils.isFunction(handler)) return;
            var target = monitor.target;
            //生成代理 hander
            handler.delegate = function(event) {
                var delegateEvent = {
                    originalEvent: event
                };
                delegateEvent = utils.copy(event, delegateEvent);
                arguments[0] = delegateEvent;
                var rs = handler.apply(target, arguments);
                if (rs === false) {
                    //阻止事件冒泡
                    if (event.cancelBubble) event.cancelBubble = true;
                    if (event.preventDefault) event.preventDefault();
                    if (event.stopPropagation) event.stopPropagation();
                }
            };
            if (target.addEventListener) {
                target.addEventListener(name, handler.delegate, useCapture);
            } else if (target.attachEvent) {
                target.attachEvent("on" + name, handler.delegate, useCapture);
            };
            return monitor;
        };

        //取消 native 事件
        monitor._removeEvent = function(name, handler, useCapture) {
            if (!utils.isString(name)) return;
            var target = monitor.target;
            var fn = handler && handler.delegate ? handler.delegate : handler;
            if (target.removeEventListener) {
                target.removeEventListener(name, fn, useCapture);
            } else if (target.detachEvent) {
                target.detachEvent("on" + name, fn, useCapture);
            };
            return monitor;
        };

        //触发 native 事件
        monitor._callEvent = function(name, data, canBubble, cancelable) {
            if (!utils.isString(name)) return;
            var target = monitor.target;
            if (target.dispatchEvent) {
                var event = document.createEvent('HTMLEvents');
                event.initEvent(name, canBubble, cancelable);
                utils.copy(data, event);
                event.target = target;
                target.dispatchEvent(event);
            } else if (target.fireEvent) {
                var event = document.createEventObject();
                utils.copy(data, event);
                event.target = target;
                target.fireEvent("on" + name, event);
            };
            return monitor;
        };

        //检查是否是原生事件
        monitor._isNativeSupport = function(_target) {
            if (utils.isNull(_target)) return false;
            return utils.isFunction(_target.addEventListener) || utils.isFunction(_target.attachEvent);
        };

        //注册事件
        monitor.on = function(name, handler) {
            if (!utils.isString(name) || !utils.isFunction(handler)) return;
            monitor.lists = monitor.lists || {};
            monitor.lists[name] = monitor.lists[name] || [];
            monitor.lists[name].push(handler);
            monitor._addEvent(name, handler, false);
            //如果存在自定义注册的触发器
            if (utils.isFunction($event.callers[name])) {
                $event.callers[name](monitor, handler, false);
            }
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
                    if (!utils.isNull(handler) && item !== handler) {
                        newList.push(item);
                    } else {
                        monitor._removeEvent(name, handler, false);
                    }
                });
                monitor.lists[name] = newList;
            }
            return monitor;
        };

        //触发事件
        monitor.call = function(name, data) {
            if (!utils.isString(name)) return;
            var target = monitor.target;
            if (monitor._isNativeSupport(target)) {
                monitor._callEvent(name, data);
                return monitor;
            }
            monitor.lists = monitor.lists || {};
            if (monitor.lists[name]) {
                var list = monitor.lists[name];
                utils.each(list, function(i, item) {
                    if (!utils.isFunction(item)) return;
                    item.apply(monitor.target, [data]);
                });
            }
            return monitor;
        };

        return monitor;
    };

    //在一个对象上启动事件系统
    $event.use = function(_target) {
        _target = _target || {};
        var monitor = $event(_target);
        _target.on = function() {
            monitor.on.apply(monitor, arguments);
            return _target;
        };
        _target.off = function() {
            monitor.off.apply(monitor, arguments);
            return _target;
        };
        _target.call = function() {
            monitor.call.apply(monitor, arguments);
            return _target;
        };
        return monitor;
    };

    //事件触发器表
    $event.callers = {};

    //注册一个新事件触发器
    $event.register = function(names, caller) {
        if (!names) return;
        names = names.split(',');
        utils.each(names, function(i, name) {
            $event.callers[name] = caller;
        });
    };

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