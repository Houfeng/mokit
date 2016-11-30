const utils = require('ntils');
const Class = require('cify');

/**
 * 事件触发器基类
 */
const EventEmitter = new Class({
  $name: 'EventEmitter',

  /**
   * 构建一个一个事修的触发器对象
   * @param {object} target 将代理的目标对象可以省略
   * @returns {void} 无返回
   */
  constructor: function (target) {
    target = target || this;
    var emitter = target.__emitter__;
    if (emitter) return emitter;
    utils.defineFreezeProp(this, 'target', target);
    utils.defineFreezeProp(target, '__emitter__', this);
    this.isElement = utils.isElement(this.target);
    this.listeners = this.listeners || {};
    this.on = this.addListener;
    this.off = this.removeListener;
  },

  /**
   * 添加一个事件监听函数
   * @param {string} name 事件名称
   * @param {function} listener 事件处理函数
   * @param {capture} capture 是否是捕获阶段事件(只在代理 dom 对象时有效)
   * @returns {void} 无返回
   */
  addListener: function (name, listener, capture) {
    if (this.isElement) {
      this._addElementEventListener(name, listener, capture);
    }
    this.listeners[name] = this.listeners[name] || [];
    this.listeners[name].push(listener);
    if (this.listeners[name].length > EventEmitter._maxListeners) {
      throw new Error('The `' + name + '` event listener is not more than 10');
    }
  },

  /**
   * 移除「一个/一组/所有」事件监听函数
   * @param {string} name 事件名称
   * @param {function} listener 事件处理函数
   * @param {capture} capture 是否是捕获阶段事件(只在代理 dom 对象时有效)
   * @returns {void} 无返回
   */
  removeListener: function (name, listener, capture) {
    if (name && listener) {
      if (this.isElement) {
        this._removeElementEventListener(name, listener, capture);
      }
      if (!this.listeners[name]) return;
      var index = this.listeners[name].indexOf(listener);
      this.listeners[name].splice(index, 1);
    } else if (name) {
      if (this.isElement && this.listeners[name]) {
        this.listeners[name].forEach(function (_listener) {
          this.removeListener(name, _listener, capture);
        }, this);
      }
      delete this.listeners[name];
    } else {
      utils.each(this.listeners, function (name) {
        this.removeListener(name, null, capture);
      }, this);
      this.listeners = {};
    }
  },

  /**
   * 触发自身的一个事件
   * @param {string} name 事件名称
   * @param {object} data 传递的对象
   * @param {string} canBubble 能否冒泡(只在代理 dom 对象时有效)
   * @param {object} cancelAble 能否取消(只在代理 dom 对象时有效)
   * @returns {void} 无返回
   */
  emit: function (name, data, canBubble, cancelAble) {
    if (this.isElement) {
      return this._emitElementEvent(name, data, canBubble, cancelAble);
    }
    if (!this.listeners[name]) return;
    var stopBubble = false;
    this.listeners[name].forEach(function (handler) {
      var rs = handler.call(this.target, data);
      if (rs === false) stopBubble = true;
    }, this);
    return stopBubble;
  },

  /**
   * 添加 DOM 元素事件
   * @param {string} name 事件名称
   * @param {function} listener 事件处理函数
   * @param {capture} capture 是否是捕获阶段事件
   * @returns {void} 无返回
   */
  _addElementEventListener: function (name, listener, capture) {
    this.target.addEventListener(name, listener, capture);
    //如果存在已注册的自定义 “组合事件”
    var descriptor = EventEmitter._events[name];
    if (descriptor) {
      descriptor.addListener = descriptor.addListener || descriptor.on;
      descriptor.addListener(this, name, listener, capture);
    }
  },

  /**
   * 移除 DOM 元素事件
   * @param {string} name 事件名称
   * @param {function} listener 事件处理函数
   * @param {capture} capture 是否是捕获阶段事件
   * @returns {void} 无返回
   */
  _removeElementEventListener: function (name, listener, capture) {
    this.target.removeEventListener(name, listener, capture);
    //如果存在已注册的自定义 “组合事件”
    var descriptor = EventEmitter._events[name];
    if (descriptor) {
      descriptor.removeListener = descriptor.removeListener || descriptor.off;
      descriptor.removeListener(this, name, listener, capture);
    }
  },

  /**
   * 触发 DOM 元素事件
   * @param {string} name 事件名称
   * @param {object} data 传递的对象
   * @param {string} canBubble 能否冒泡
   * @param {object} cancelAble 能否取消
   * @returns {void} 无返回
   */
  _emitElementEvent: function (name, data, canBubble, cancelAble) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(name, canBubble, cancelAble);
    utils.copy(data, event, ['data']);
    event.data = data;
    return this.target.dispatchEvent(event);
  }

});

//最多添加多少个 listener
EventEmitter._maxListeners = 10;

//所有自定义事件
EventEmitter._events = [];

/**
 * 注册自定义事件(只在代理 dom 对象时有效)
 * @param {object} descriptor 事件定义
 * @returns {void} 无返回
 */
EventEmitter.register = function (descriptor) {
  var names = descriptor.name;
  if (!names) return;
  if (!utils.isArray(names)) names = names.split(',');
  names.forEach(function (name) {
    this._events[name] = descriptor;
  }, this);
};

module.exports = EventEmitter;