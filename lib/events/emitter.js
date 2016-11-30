const utils = require('ntils');
const Class = require('cify');

const EventEmitter = new Class({
  $name: 'EventEmitter',

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

  emit: function (name, data) {
    if (!this.listeners[name]) return;
    var stopBubble = false;
    this.listeners[name].forEach(function (handler) {
      var rs = handler.call(this.target, data);
      if (rs === false) stopBubble = true;
    }, this);
    return stopBubble;
  },

  _addElementEventListener: function (name, listener, capture) {
    this.target.addEventListener(name, listener, capture);
    //如果存在已注册的自定义 “组合事件”
    var descriptor = EventEmitter._events[name];
    if (descriptor) {
      descriptor.addListener = descriptor.addListener || descriptor.on;
      descriptor.addListener(this, name, listener, capture);
    }
  },

  _removeElementEventListener: function (name, listener, capture) {
    this.target.removeEventListener(name, listener, capture);
    //如果存在已注册的自定义 “组合事件”
    var descriptor = EventEmitter._events[name];
    if (descriptor) {
      descriptor.removeListener = descriptor.removeListener || descriptor.off;
      descriptor.removeListener(this, name, listener, capture);
    }
  },

  _emitElementEvent: function (name, data, canBubble, cancelAble) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(name, canBubble, cancelAble);
    utils.copy(data, event, ['data']);
    event.data = data;
    return this.target.dispatchEvent(event);
  }

});

EventEmitter._maxListeners = 10;
EventEmitter._events = [];
EventEmitter.register = function (descriptor) {
  var names = descriptor.name;
  if (!names) return;
  if (!utils.isArray(names)) names = names.split(',');
  names.forEach(function (name) {
    this._events[name] = descriptor;
  }, this);
};

module.exports = EventEmitter;