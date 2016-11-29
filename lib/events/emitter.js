const utils = require('ntils');
const Class = require('cify');

const EventEmitter = new Class({

  constructor: function (target) {
    target = target || this;
    var emitter = this.__emitter__;
    if (emitter) return emitter;
    utils.defineFreezeProp(this, 'target', target);
    utils.defineFreezeProp(target, '__emitter__', this);
    this.handlers = this.handlers || {};
    this.on = this.addListener;
    this.off = this.removeListener;
  },

  addListener: function (name, handler, capture) {
    this.handlers[name] = this.handlers[name] || [];
    this.handlers[name].push(handler);
  },

  removeListener: function (name, handler) {
    if (name && handler) {
      if (!this.handlers[name]) return;
      var index = this.handlers[name].indexOf(handler);
      this.handlers[name].splice(index, 1)
    } else if (name) {
      delete this.handlers[name];
    } else {
      this.handlers = {};
    }
  },

  emit: function (name, data) {
    if (!this.handlers[name]) return;
    this.handlers[name].forEach(function (handler) {
      handler.call(this.target, data);
    }, this);
  }

});

EventEmitter.events = [];

module.exports = EventEmitter;

// //注册 native 事件
// monitor._addEvent = function (name, handler, useCapture) {
//   if (!utils.isString(name) || !utils.isFunction(handler)) return;
//   var target = monitor.target;
//   //生成代理 hander 
//   //(2015.5.28 发现将 $delegate 放在 handler 身上在一个 handler 绑定到多个对象上时可能有问题)
//   //将 delegat 和 handler 放到一个对象中，再放到一个通过 name 识别的数组中，off 事件是从数组中查找再 off 应可行
//   //或者 handler.$deletegate 定义为数组，将所有代理方法放数组，off 时遍历
//   handler.$delegate = handler.$delegate || function (event) {
//     //这个地方因为有些时候，我们需要向 event 上添加新的属性或
//     //方法，但是原生 event 对象，有些方法或属性是不能添加的
//     //比如 mokit 就需要添加一个 view 属性
//     var delegateEvent = {
//       originalEvent: event,
//       original: event
//     };
//     utils.each(event, function (name, item) {
//       if (utils.isFunction(item)) {
//         delegateEvent[name] = function () {
//           item.apply(event, arguments);
//         };
//       } else {
//         delegateEvent[name] = item;
//       }
//     });
//     arguments[0] = delegateEvent;
//     var rs = handler.apply(target, arguments);
//     if (rs === false) {
//       //阻止事件冒泡
//       if (event.cancelBubble) event.cancelBubble = true;
//       if (event.preventDefault) event.preventDefault();
//       if (event.stopPropagation) event.stopPropagation();
//     }
//   };
//   if (target.addEventListener) {
//     target.addEventListener(name, handler.$delegate, useCapture);
//   } else if (target.attachEvent) {
//     target.attachEvent("on" + name, handler.$delegate, useCapture);
//   };
//   return monitor;
// };

// //取消 native 事件
// monitor._removeEvent = function (name, handler, useCapture) {
//   if (!utils.isString(name)) return;
//   var target = monitor.target;
//   var fn = handler && handler.$delegate ? handler.$delegate : handler;
//   if (target.removeEventListener) {
//     target.removeEventListener(name, fn, useCapture);
//   } else if (target.detachEvent) {
//     target.detachEvent("on" + name, fn, useCapture);
//   };
//   return monitor;
// };

// //触发 native 事件
// monitor._callEvent = function (name, data, canBubble, cancelAble) {
//   if (!utils.isString(name)) return;
//   var target = monitor.target;
//   if (target.dispatchEvent) {
//     var event = document.createEvent('HTMLEvents');
//     event.initEvent(name, canBubble, cancelAble);
//     utils.copy(data, event);
//     if (!utils.isNull(event.target)) {
//       event.target = target;
//     }
//     target.dispatchEvent(event);
//   } else if (target.fireEvent) {
//     var event = document.createEventObject();
//     utils.copy(data, event);
//     if (!utils.isNull(event.target)) {
//       event.target = target;
//     }
//     target.fireEvent("on" + name, event);
//   };
//   return monitor;
// };

// //注册事件
// monitor.on = function (name, handler) {
//   if (!utils.isString(name) || !utils.isFunction(handler)) return;
//   monitor.lists = monitor.lists || {};
//   monitor.lists[name] = monitor.lists[name] || [];
//   monitor.lists[name].push(handler);
//   monitor._addEvent(name, handler, false);
//   //如果存在已注册的自定义 “组合事件”
//   var caller = EventEmitter.callers[name];
//   if (!utils.isNull(caller) && utils.isFunction(caller.on)) {
//     caller.on(monitor, name, handler, false);
//   }
//   return monitor;
// };

// //取消事件
// monitor.off = function (name, handler) {
//   monitor.lists = monitor.lists || {};
//   //如不指定名称，移除所有事件处理
//   if (utils.isNull(name)) {
//     utils.each(monitor.lists, function (name, item) {
//       monitor.off(name, handler);
//     });
//     return monitor;
//   }
//   //移除指定名称的事件处理
//   if (!utils.isString(name)) return;
//   monitor._removeEvent(name, handler, false);
//   var list = monitor.lists[name];
//   if (!utils.isNull(list)) {
//     var newList = [];
//     utils.each(list, function (i, item) {
//       if (!utils.isNull(handler) && item !== handler) {
//         newList.push(item);
//       } else {
//         monitor._removeEvent(name, item, false);
//       }
//     });
//     monitor.lists[name] = newList;
//   }
//   //如果存在已注册的自定义 “组合事件”
//   var caller = EventEmitter.callers[name];
//   if (!utils.isNull(caller) && utils.isFunction(caller.off)) {
//     caller.off(monitor, name, handler, false);
//   }
//   return monitor;
// };

// //触发事件
// monitor.call = function (name, data) {
//   if (!utils.isString(name)) return;
//   data = data || {};
//   var target = monitor.target;
//   if (monitor._isNativeSupport(target)) {
//     monitor._callEvent(name, data);
//     return monitor;
//   }
//   monitor.lists = monitor.lists || {};
//   if (monitor.lists[name]) {
//     data.target = target;
//     var list = monitor.lists[name];
//     utils.each(list, function (i, item) {
//       if (!utils.isFunction(item)) return;
//       item.apply(target, [data]);
//     });
//   }
//   return monitor;
// };

// return monitor;
// };

// //在一个对象上启用事件系统
// EventEmitter.use = function (_target) {
//   _target = _target || {};
//   _target.on = function () {
//     var monitor = EventEmitter(this);
//     monitor.on.apply(monitor, arguments);
//     return this;
//   };
//   _target.off = function () {
//     var monitor = EventEmitter(this);
//     monitor.off.apply(monitor, arguments);
//     return this;
//   };
//   _target.call = function () {
//     var monitor = EventEmitter(this);
//     monitor.call.apply(monitor, arguments);
//     return this;
//   };
//   return _target;
// };

// //清理对象上的一切和 $event 有关的内容
// EventEmitter.clear = function (_target) {
//   if (_target && _target.$monitor) {
//     _target.$monitor.off();
//     _target.$monitor.target = null;
//     _target.$monitor = null;
//   }
//   return _target;
// };

// //事件触发器表
// EventEmitter.callers = {};

// //注册一个新事件触发器
// EventEmitter.register = function (names, caller) {
//   if (!names) return;
//   names = names.split(',');
//   utils.each(names, function (i, name) {
//     EventEmitter.callers[name] = caller;
//   });
//   return EventEmitter;
// };