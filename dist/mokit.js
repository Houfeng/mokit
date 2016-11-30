(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const Class = require('cify');
const Template = require('../template');
const utils = require('ntils');
const Directive = Template.Directive;
const Expression = Template.Expression;

/**
 * 创建一个组件指令
 * @param {object} options 选项
 */
function ComponentDirective(options) {

  var Component = options.component;
  var parent = options.parent;

  return new Directive({
    name: options.name,
    type: Directive.TYPE_ELEMENT,
    literal: true,
    final: true,
    level: Directive.LEVEL_ELEMENT,

    bind: function () {
      this.component = new Component({
        parent: options.parent || this.scope
      });
      this.node.$target = this.component;
      this.handler = this.compiler.compile(this.node, {
        element: false,
        children: false
      });
      //this.handleId();
      this.handleAttrs();
      this.handleContents();
      this.component.$mount(this.node);
      if (this.node.parentNode) {
        this.node.parentNode.removeChild(this.node);
      }
    },

    handleId: function () {
      if (!parent) return;
      var idAttr = this.prefix + ':id';
      var id = this.node.getAttribute(idAttr);
      if (id in parent) throw new Error('Conflicting component id `' + id + '`');
      parent[id] = this.component;
      this.node.removeAttribute(idAttr);
    },

    handleAttrs: function () {
      this.propExprs = {};
      this.attrs = [].slice.call(this.node.attributes);
      var directiveRegexp = new RegExp('^' + this.prefix + ':', 'i');
      this.attrs.forEach(function (attr) {
        if (directiveRegexp.test(attr.name)) return;
        if (attr.name in this.component.$properties) {
          this.propExprs[attr.name] = new Expression(attr.value);
        } else {
          this.component.$element.setAttribute(attr.name, attr.value);
        }
      }, this);
    },

    handleContents: function () {
      this.placeHandlers = [];
      var places = [].slice.call(
        this.component.$element.querySelectorAll('[' + this.prefix + '\\:content]')
      );
      places.forEach(function (place) {
        //将内容插入到指定的「位置」
        var contents = null;
        var selector = place.getAttribute(this.prefix + ':content');
        if (!selector) {
          contents = [].slice.call(this.node.childNodes);
        } else {
          contents = [].slice.call(this.node.querySelectorAll(selector));
        }
        if (!contents || contents.length < 1) return;
        place.innerHTML = '';
        contents.forEach(function (content) {
          place.appendChild(content.cloneNode(true));
        }, this);
        //编译插入后的子「内容模板」
        var handler = this.compiler.compile(place);
        this.placeHandlers.push(handler);
      }, this);
    },

    execute: function (scope) {
      this.handler(scope);
      utils.each(this.propExprs, function (name) {
        var value = this.propExprs[name].execute(scope);
        this.propExprs[name]._oldValue = value;
        this.component[name] = value;
      }, this);
      this.placeHandlers.forEach(function (handler) {
        handler(scope);
      }, this);
    }

  });
};

module.exports = ComponentDirective;
},{"../template":31,"cify":34,"ntils":36}],2:[function(require,module,exports){
const Class = require('cify');
const Template = require('../template');
const Watcher = require('../watcher');
const utils = require('ntils');
const EventEmitter = require('../events');
const Observer = require('../observer');
const ComponentDirective = require('./component-directive');

const RESERVED_WORDS = [
  '$compile', '$data', '$dispose', '$element', '$mount', '$properties',
  '$remove', '$watch', '_callHook', '_compiled', '_createData', '_createProperties',
  '_createWatches', '$extends', '_mounted', '_observer', '_onTemplateUpdate',
  '_removed', '_template', '_watchers', '$children', '$parent', '_directives',
  '_importComponents', '$nextTick'
];

/**
 * 组件类
 * 用于定义一个新的组件
 */
function Component(classOpts) {

  //处理组件选项
  classOpts = classOpts || Object.create(null);

  //处理「继承」
  if (utils.isFunction(classOpts.extends)) {
    classOpts.extends = classOpts.extends.prototype;
  }
  if (!classOpts.extends) {
    classOpts.extends = Component.prototype;
  }

  /**
   * 定义组件类
   * 可以通过 new ComponentClass() 创建组件实例
   */
  var ComponentClass = new Class({
    $name: 'Component',
    //通过 cify 定义为一个「类」，并指定「父类」或「原型」
    $extends: classOpts.extends,

    /**
     * 组件类构造函数
     * @returns {void} 无返回
     */
    constructor: function (instanceOpts) {
      EventEmitter.call(this);
      instanceOpts = instanceOpts || {};
      utils.each(instanceOpts, function (name, value) {
        if (!(name in this)) this[name] = value;
      });
      this._onTemplateUpdate = this._onTemplateUpdate.bind(this);
      this._createData(this.data);
      this._createProperties(this.properties);
      this._createWatches(this.watches);
      this._importComponents(require('./components'));
      this._importComponents(this.components);
      this._callHook('onInit');
      this._observer = Observer.observe(this);
      utils.defineFreezeProp(this, '$children', []);
      utils.defineFreezeProp(this, '$parent', instanceOpts.parent);
      if (this.$parent) this.$parent.$children.push(this);
      this.$compile();
      this._mounted = !!this.element;
    },

    /**
     * 导入用到的子组件类
     * @param {Object} components 引入的组件
     * @returns 无返回
     */
    _importComponents: function (components) {
      utils.each(components, this._importComponent, this);
    },

    /**
     * 导入一个用到的子组件类
     * @param {Object} components 引入的组件
     * @returns 无返回
     */
    _importComponent: function (name, component) {
      this._directives = this._directives || [];
      this._directives.push(new ComponentDirective({
        name: name,
        component: component,
        parent: this
      }));
    },

    /**
     * 调用生命周期 hook
     * @param {string} name 调用的 hook 名称
     * @param {Array} args 调用 hook 的参数列表
     * @returns {void} 无反回
     */
    _callHook: function (name, args) {
      if (!utils.isFunction(this[name])) return;
      this[name].apply(this, args);
    },

    /**
     * 创建数据对象
     * @param {Object} data 组件数据对象
     * @returns {void} 无返回
     */
    _createData: function (data) {
      if (utils.isFunction(data)) {
        this.$data = data.call(this);
      } else {
        this.$data = data || {};
      }
      utils.each(this.$data, function (name) {
        Object.defineProperty(this, name, {
          configurable: true,
          enumerable: true,
          get: function () {
            if (!this.$data) return;
            return this.$data[name];
          },
          set: function (value) {
            if (!this.$data) return;
            this.$data[name] = value;
          }
        });
      }, this);
    },

    /**
     * 创建组件属性
     * @param {Object} properties 属性定义对象
     * @returns {void} 无返回
     */
    _createProperties: function (properties) {
      this.$properties = {};
      var isArray = utils.isArray(properties);
      utils.each(properties, function (name, descriptor) {
        if (utils.isFunction(descriptor)) {
          descriptor = { get: descriptor };
        }
        if (!utils.isObject(descriptor)) {
          descriptor = { value: descriptor };
        }
        var hasGetterOrSetter = descriptor.get || descriptor.set;
        var hasValue = ('value' in descriptor);
        if (hasGetterOrSetter && hasValue) {
          throw new Error('Cannot specify both value and setter/getter' + '` for property `' + name + '`');
        }
        if (!hasGetterOrSetter) {
          if (!hasValue) descriptor.value = null;
          descriptor.get = function () {
            return descriptor.value;
          };
          descriptor.set = function (value) {
            descriptor.value = value;
          };
        }
        Object.defineProperty(this, name, {
          configurable: true,
          enumerable: true,
          get: function () {
            if (!descriptor.get) {
              throw new Error('Property `' + name + '` cannot be read');
            }
            return descriptor.get.call(this);
          },
          set: function (value) {
            if (!descriptor.set) {
              throw new Error('Property `' + name + '` cannot be written');
            }
            if (descriptor.test && !descriptor.test(value)) {
              throw new Error('Invalid value `' + value + '` for property `' + name + '`');
            }
            descriptor.set.call(this, value);
            if (this.__observer__) {
              this.__observer__.emitChange({ path: name, value: value });
            }
          }
        });
        this.$properties[name] = descriptor;
      }, this);
    },

    /**
     * 创建监控
     * 为什么用 watches 而不是 watchers 或其它？
     * 因为，这里仅是「监控配置」并且是「复数」
     * @param {Object} watches 监控定义对象
     * @returns {void} 无返回
     */
    _createWatches: function (watches) {
      this._watchers = this._watchers || [];
      utils.each(watches, function (name, handler) {
        this.$watch(name, handler);
      }, this);
    },

    /**
     * 在模板发生更新时
     * @returns {void} 无返回
     */
    _onTemplateUpdate: function () {
      this._watchers.forEach(function (watcher) {
        watcher.calc();
      }, this);
    },

    /**
     * 添加一个监控
     * @param {string|function} calcer 计算函数或路径
     * @param {function} handler 处理函数
     * @returns {void} 无返回
     */
    $watch: function (calcer, handler) {
      if (!utils.isFunction(handler)) return;
      if (!utils.isFunction(calcer)) {
        var path = calcer;
        calcer = function () {
          return utils.getByPath(this, path);
        };
      }
      this._watchers.push(new Watcher(calcer.bind(this), handler.bind(this)));
    },

    /**
     * 编译自身模板并完成绑定
     * @returns {void} 无返回
     */
    $compile: function () {
      if (this._compiled) return;
      this._compiled = true;
      this._callHook('onCreate');
      utils.defineFreezeProp(this, '$element', this.element || utils.parseDom(this.template)[0]);
      if (!this.$element || this.$element.nodeName === '#text') {
        throw new Error('Invalid component template');
      }
      this._callHook('onCreated');
      utils.defineFreezeProp(this, '_template', new Template(this.$element, {
        directives: this._directives,
        root: true
      }));
      this._template.bind(this);
      this._template.on('update', this._onTemplateUpdate);
      this._template.on('bind', function () {
        this._callHook('onReady');
      }.bind(this));
    },

    /**
     * 向 DOM tree 中挂截组件
     * @param {HTMLNode} mountNode 挂载点元素
     * @returns 无返回 
     */
    $mount: function (mountNode, append) {
      if (!mountNode || this._mounted) return;
      this._callHook('onMount');
      mountNode.$substitute = this.$element;
      this.$element._mountNode = mountNode;
      if (append) {
        mountNode.appendChild(this.$element);
      } else if (mountNode.parentNode) {
        mountNode.parentNode.insertBefore(this.$element, mountNode);
      }
      this._mounted = true;
      this._removed = false;
      this._callHook('onMounted');
    },

    /**
     * 移除组件
     * @returns {void} 无返回
     */
    $remove: function () {
      if (this._removed || !this._mounted) return;
      this._callHook('onRemove');
      if (this.$element.parentNode) {
        this.$element.parentNode.removeChild(this.$element);
      }
      this._removed = true;
      this._mounted = false;
      this._callHook('onRemoved');
    },

    /**
     * 添加一个事件监听
     * @param {string} name 事件名称
     * @param {function} listener 事件处理函数
     * @returns {void} 无返回
     */
    $on: function (name, listener) {
      this.__emitter__.on(name, listener);
    },

    /**
     * 移除「一个/指定名称的一组/所有」事件监听
     * @param {string} name 事件名称
     * @param {function} listener 事件处理函数
     * @returns {void} 无返回
     */
    $off: function (name, listener) {
      this.__emitter__.off(name, listener);
    },

    /**
     * 触发自身的一个事件
     * @param {string} name 事件名称
     * @param {object} data 传递的对象
     * @returns {void} 无返回
     */
    $emit: function (name, data) {
      return this.__emitter__.emit(name, data);
    },

    /**
     * 触发自身的一个事件并向上冒泡
     * @param {string} name 事件名称
     * @param {object} data 传递的对象
     * @returns {void} 无返回
     */
    $dispatch: function (name, data) {
      var stopBubble = this.$emit(name, data);
      if (this.$parent && !stopBubble) {
        this.$parent.$dispatch(name, data);
      }
    },

    /**
     * 释放组件
     * @returns {void} 无返回
     */
    $dispose: function () {
      this.$remove();
      this.__emitter__.off();
      this.$children.forEach(function (child) {
        child.$dispose();
      }, this);
      if (this.$parent) {
        var index = this.$parent.$children.indexOf(this);
        this.$parent.$children.splice(index, 1);
      }
      this._callHook('onDispose');
      if (this._compiled) {
        this._template.unbind();
      }
      this._callHook('onDisposed');
      for (name in this) {
        delete this[name];
      }
      ['__observer__', '$element', '$children', '$parent', '_template']
        .forEach(function (name) {
          delete this[name];
        }, this);
      this.__proto__ = null;
    }

  });

  //向 ComponentClass.prototype 上拷贝成员
  utils.each(classOpts, function (name, value) {
    if (RESERVED_WORDS.indexOf(name) > -1) {
      throw new Error('Name `' + name + '` is reserved')
    }
    ComponentClass.prototype[name] = value;
  }, this);

  //使 ComponentClass instanceof Component === true
  ComponentClass.__proto__ = Component.prototype;

  //定义扩展方法
  ComponentClass.extend = function (classOpts) {
    classOpts = classOpts || Object.create(null);
    classOpts.extends = this;
    return new Component(classOpts);
  };

  //创建实例的方法
  ComponentClass.create = function (instanceOpts) {
    return new ComponentClass(instanceOpts);
  };

  return ComponentClass;

}

//组件扩展方法，简单封装 extends
Component.extend = function (classOpts) {
  classOpts = classOpts || Object.create(null);
  return new Component(classOpts);
};

Component.prototype.__proto__ = EventEmitter.prototype;

utils.defineFreezeProp(Component, 'name', 'Component');

module.exports = Component;
},{"../events":7,"../observer":11,"../template":31,"../watcher":33,"./component-directive":1,"./components":3,"cify":34,"ntils":36}],3:[function(require,module,exports){
module.exports = {
  View: require('./view')
};
},{"./view":4}],4:[function(require,module,exports){
const Component = require('../component');
const utils = require('ntils');

const View = new Component({

  template: '<div></div>',

  properties: {
    is: {
      test: function (value) {
        return utils.isFunction(value) || utils.isString(value);
      },
      set: function (value) {
        if (utils.isString(value)) {
          this.is = this.$parent && this.$parent.components ?
            this.$parent.components[value] : null;
          return;
        }
        if (this._component) {
          this._component.$dispose();
        }
        this._Component = value;
        this._component = new this._Component({
          parent: this
        });
        this._component.$mount(this.$element, true);
      },
      get: function () {
        return this._Component;
      }
    }
  }

});

module.exports = View;
},{"../component":2,"ntils":36}],5:[function(require,module,exports){
const Component = require('./component');
const components = require('./components');

Component.components = components;
Component.Component = Component;

Component.component = function (name, component) {
  if (!component) return components[name];
  components[name] = component;
};

module.exports = Component;
},{"./component":2,"./components":3}],6:[function(require,module,exports){
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
},{"cify":34,"ntils":36}],7:[function(require,module,exports){
const EventEmitter = require('./emitter');
const touch = require('./touch');

EventEmitter.touch = touch;
EventEmitter.register(touch);

module.exports = EventEmitter;
},{"./emitter":6,"./touch":8}],8:[function(require,module,exports){
var EventEmitter = require('./emitter');
var utils = require('ntils');

var SUPPORT_TOUCH = ('ontouchstart' in document);
var START_EVENT_NAME = SUPPORT_TOUCH ? 'touchstart' : 'mousedown';
var MOVE_EVENT_NAME = SUPPORT_TOUCH ? 'touchmove' : 'mousemove';
var END_EVENT_NAME = SUPPORT_TOUCH ? 'touchend' : 'mouseup';
var CUSTOM_EVENT_NAMES = "tap,taphold,dbltap,swipe,swipeup,swiperight,swipedown,swipeleft,pointdown,pointmove,pointup";

module.exports = {
  name: CUSTOM_EVENT_NAMES,

  option: {
    swipeDurationThreshold: 1000,
    swipeHorizontalDistanceThreshold: 25,
    swipeVerticalDistanceThreshold: 45,
    holdDurationThreshold: 1000,
    dblDurationThreshold: 450,
    scrollSupressionThreshold: 25
  },

  addListener: function (emitter, name, listener, capture) {
    if (!utils.isFunction(listener)) return;

    var self = this;

    //处理 touchstart 事件
    listener.touchstart = listener.touchstart || function (event) {
      var point = event.changedTouches ? event.changedTouches[0] : event;
      listener.startPoint = listener.endPoint = {
        "x": point.pageX,
        "y": point.pageY,
        "timeStamp": event.timeStamp,
        "point": point
      };
      if (name == 'taphold') {
        listener.createHoldHandler(event);
      }
      //模拟鼠标事件
      if (name == 'pointdown') {
        utils.copy(listener.startPoint, event);
        emitter.emit('pointdown', event);
        emitter.isPointDown = true;
      }
    };

    //创建 hold 处理器
    listener.createHoldHandler = listener.createHoldHandler || function (event) {
      // 处理 taphold 事件
      if (!listener.holdTimer && !listener.holdHandler) {
        var option = self.option;
        listener.holdHandler = function () {
          event.taphold = true;
          emitter.emit('taphold', event);
        };
        listener.holdTimer = setTimeout(function () {
          if (listener.holdHandler) listener.holdHandler();
        }, option.holdDurationThreshold);
      }
    };

    //清除 hold 处理器
    listener.clearHoldHandler = listener.clearHoldHandler || function () {
      if (listener.holdTimer) {
        clearTimeout(listener.holdTimer);
        listener.holdTimer = null;
        listener.holdHandler = null;
      }
    };

    //获取划动信息
    listener.getTouchInfo = function (event) {
      var point = event.changedTouches ? event.changedTouches[0] : event;
      listener.endPoint = {
        "x": point.pageX,
        "y": point.pageY,
        "timeStamp": event.timeStamp,
        "point": point
      };
      //
      var option = self.option;
      // 一些计算结果
      var info = {};
      info.timeStamp = listener.endPoint ? listener.endPoint.timeStamp : null;
      info.existStartAndStop = listener.endPoint && listener.startPoint;
      info.horizontalDistance = info.existStartAndStop ? listener.endPoint.x - listener.startPoint.x : 0;
      info.verticalDistance = info.existStartAndStop ? listener.endPoint.y - listener.startPoint.y : 0;
      info.horizontalDistanceValue = Math.abs(info.horizontalDistance);
      info.verticalDistanceVlaue = Math.abs(info.verticalDistance);
      info.isHorizontal = info.horizontalDistanceValue >= info.verticalDistanceVlaue;
      info.isVertical = !info.sHorizontal;
      info.isSwipeMove = info.horizontalDistanceValue >= option.swipeHorizontalDistanceThreshold || info.verticalDistanceVlaue >= option.swipeVerticalDistanceThreshold;
      info.isSwipeTime = info.existStartAndStop ? listener.endPoint.timeStamp - listener.startPoint.timeStamp <= option.swipeDurationThreshold : true;
      info.isHoldTime = info.existStartAndStop ? listener.endPoint.timeStamp - listener.startPoint.timeStamp >= option.holdDurationThreshold : false;
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
    listener.touchmove = listener.touchmove || function (event) {
      var info = listener.getTouchInfo(event);
      if (info.isSwipeMove) {
        listener.clearHoldHandler();
      }
      var stopBubble = false;
      //模拟鼠标事件
      if (emitter.isPointDown && name == 'pointmove') {
        utils.copy(listener.endPoint, event);
        emitter.emit('pointmove', event);
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
    listener.done = listener.done || function (event) {
      listener.clearHoldHandler();
      var info = listener.getTouchInfo(event);
      //模拟鼠标事件
      if (name == 'pointup') {
        utils.copy(listener.endPoint, event);
        emitter.emit('pointup', event);
        emitter.isPointDown = false;
      }
      // 根据计算结果判断
      if (info.isSwipeTime && info.isSwipeMove) {
        event.swipe = true;
        event.direction = info.direction;
        if (name == 'swipe') {
          emitter.emit('swipe', event);
        }
        if (name == 'swipe' + event.direction) {
          emitter.emit('swipe' + event.direction, event);
        }
      } else if (info.isSwipeTime && !info.isSwipeMove && !info.isHoldTime) {
        if (name == 'tap') {
          emitter.emit('tap', event);
        }
        if (name == 'dbltap') {
          //处理 “双击”
          var option = self.option;
          event.dbltap = listener.PreTapTime && info.timeStamp - listener.PreTapTime <= option.dblDurationThreshold;
          if (event.dbltap) {
            emitter.emit('dbltap', event);
            listener.PreTapTime = null;
          } else {
            listener.PreTapTime = listener.endPoint.timeStamp;
          }
        }
      }
    };

    //绑定组合事件
    emitter.on(START_EVENT_NAME, listener.touchstart);
    emitter.on(MOVE_EVENT_NAME, listener.touchmove);
    emitter.on(END_EVENT_NAME, listener.done);

  },

  removeListener: function (emitter, name, listener, useCapture) {
    //只有指定了 handler 才能取消构成组合事件的 “原事件”
    //否则会直接移除会将其他 touchstart 等事件也移除
    if (utils.isFunction(listener)) {
      if (utils.isFunction(listener.touchstart)) {
        emitter.off(START_EVENT_NAME, listener.touchstart);
      }
      if (utils.isFunction(listener.touchmove)) {
        emitter.off(MOVE_EVENT_NAME, listener.touchmove);
      }
      if (utils.isFunction(listener.done)) {
        emitter.off(END_EVENT_NAME, listener.done);
      }
    }
  }

};
},{"./emitter":6,"ntils":36}],9:[function(require,module,exports){
const info = require('./info.json');
const utils = require('ntils');
const Watcher = require('./watcher');
const Observer = require('./observer');
const Template = require('./template');
const Component = require('./component');
const EventEmitter = require('./events');

//持载模板相关对象
utils.copy(Template, Component);

Component.version = info.version;
Component.Template = Template;
Component.Watcher = Watcher;
Component.Observer = Observer;
Component.EventEmitter = EventEmitter;
Component.utils = utils;

//安装插件的方法
Component.use = function (plugin) {
  if (utils.isNull(plugin) || !utils.isFunction(plugin.install)) {
    throw new Error('Invalid Plugin');
  }
  plugin.install(this);
};

//普通脚本引入
if (window) window[info.name] = Component;
//兼容 amd 模块
if (typeof define !== 'undefined' && define.amd) {
  define(info.name, [], function () {
    return Component;
  });
}

module.exports = Component;
},{"./component":5,"./events":7,"./info.json":10,"./observer":11,"./template":31,"./watcher":33,"ntils":36}],10:[function(require,module,exports){
module.exports={"name":"mokit","version":"3.0.0-rc5"}
},{}],11:[function(require,module,exports){
const Class = require('cify');
const utils = require('ntils');
const EventEmitter = require('../events');

const OBSERVER_PROP_NAME = '__observer__';
const CHANGE_EVENT_NAME = 'change';
const EVENT_MAX_DISPATCH_LAYER = 20;

/**
 * 对象观察类，可以监控对象变化
 * 目前方案问题:
 *   对于父子关系和事件冒泡，目前方案如果用 delete 删除一个属性，无关真实删除关系，
 *   即便调用 clearReference 也无法再清除关系，子对象的 parents 中会一直有一个引用，当前方案最高效
 * 其它方法一:
 *   将「关系」放入全局数组中，然后将 ob.parents 变成一个「属性」从全局数组件中 filter 出来，
 *   基本和目前方法类似，但是关系在外部存领教，所以 clearReference 可清除。
 * 其它方案二: 
 *   构造时添加到全局数组，每一个 observer change 时都让放到全局的 observer 遍历自身的，
 *   检果事件源是不是自已的子对象，如果是则触发自身 change 事件，这样 ob 对象本身没有相关引用
 *   clearReference 时只从全局清除掉就行了，并且 delete 操作也不会影响，但效率稍差。
 * 其它方案三: 
 *   给构造函数添加一个 deep 属性，只有 deep 的 ob 对象，才放入到全局数组中，检查时逻辑同方案二
 *   但是因为要检查的对象会少很多，效率会更高一点。
 */
const Observer = new Class({
  $name: 'Observer',
  $extends: EventEmitter,

  /**
   * 通过目标对象构造一个观察对象
   * @param {Object} target 目标对象
   * @returns {void} 无返回
   */
  constructor: function (target, options) {
    if (utils.isNull(target)) {
      throw new Error('Invalid target');
    }
    options = options || Object.create(null);
    var observer = target[OBSERVER_PROP_NAME];
    if (observer) {
      utils.copy(options, observer.options);
      if (observer.options.root) {
        observer.parents.length = 0;
      }
      observer.apply();
      return observer;
    }
    EventEmitter.call(this);
    utils.defineFreezeProp(this, 'options', options);
    utils.defineFreezeProp(this, 'shadow', Object.create(null));
    utils.defineFreezeProp(this, 'target', target);
    utils.defineFreezeProp(this, 'parents', []);
    utils.defineFreezeProp(target, OBSERVER_PROP_NAME, this);
    this.apply();
  },

  /**
   * 添加一个属性，动态添中的属性，无法被观察，
   * 但是通过 set 方法添加的属性可能被观察。
   */
  set: function (name, value) {
    if (utils.isFunction(value)) return;
    Object.defineProperty(this.target, name, {
      get: function () {
        return this[OBSERVER_PROP_NAME].shadow[name];
      },
      set: function (value) {
        var observer = this[OBSERVER_PROP_NAME];
        var oldValue = observer.shadow[name];
        if (oldValue === value) return;
        if (utils.isObject(value)) {
          var childObserver = new Observer(value);
          observer.addChild(childObserver, name);
        }
        //移除旧值的父引用
        //如果用 delete 删除属性将无法移除父子引用
        if (oldValue && oldValue[OBSERVER_PROP_NAME]) {
          observer.removeChild(oldValue[OBSERVER_PROP_NAME], name);
        }
        observer.shadow[name] = value;
        observer.emitChange({ path: name, value: value });
      },
      configurable: true,
      enumerable: true
    });
    this.target[name] = value;
  },

  /**
   * 自动应用所有动态添加的属性
   * @returns {void} 无返回
   */
  apply: function () {
    if (utils.isArray(this.target)) {
      this._wrapArray(this.target);
    }
    var names = this._getPropertyNames(this.target);
    names.forEach(function (name) {
      var desc = Object.getOwnPropertyDescriptor(this.target, name);
      if (!('value' in desc)) return;
      this.set(name, this.target[name]);
    }, this);
  },

  /**
   * 清除所有父子引用
   * @returns {void} 无返回
   */
  clearReference: function () {
    utils.each(this.target, function (name, value) {
      if (utils.isNull(value)) return;
      var child = value[OBSERVER_PROP_NAME];
      if (child) this.removeChild(child);
    }, this);
  },

  /**
   * 派发一个事件，事件会向父级对象冒泡
   * @param {string} eventName 事件名称
   * @param {Object} event 事件对象
   * @returns {void} 无返回
   */
  dispatch: function (eventName, event) {
    event.__layer__ = event.__layer__ || 0;
    event.__layer__++;
    if (event.__layer__ >= EVENT_MAX_DISPATCH_LAYER) return;
    this.emit(eventName, event);
    if (!this.parents || this.parents.length < 1) return;
    this.parents.forEach(function (item) {
      if (!(item.name in item.parent.target)) {
        return item.parent.removeChild(this);
      }
      var parentEvent = utils.copy(event);
      parentEvent.path = item.name + '.' + event.path;
      item.parent.dispatch(eventName, parentEvent);
    }, this);
  },

  /**
   * 添子观察者对象
   * @param {Object} child 父对象
   * @param {String} name 属性名
   * @returns {void} 无返回
   */
  addChild: function (child, name) {
    if (utils.isNull(child) || utils.isNull(name)) {
      throw new Error('Invalid paramaters');
    }
    if (child.options.root) return;
    child.parents.push({ parent: this, name: name });
  },

  /**
   * 移除子对象
   * @param {Object} child 父对象
   * @param {String} name 属性名
   * @returns {void} 无返回
   */
  removeChild: function (child, name) {
    if (utils.isNull(child)) {
      throw new Error('Invalid paramaters');
    }
    var foundIndex = -1;
    child.parents.forEach(function (item, index) {
      if (item.parent === this && item.name === name) {
        foundIndex = index;
      }
    }, this);
    if (foundIndex > -1) {
      child.parents.splice(foundIndex, 1);
    }
  },

  /**
   * 触发 change 事件
   * @param {Object} event 事件对象
   * @returns {void} 无返回
   */
  emitChange: function (event) {
    this.dispatch(CHANGE_EVENT_NAME, event);
  },

  /**
   * 获取所有成员名称列表
   * @returns {Array} 所有成员名称列表
   */
  _getPropertyNames: function () {
    var names = utils.isArray(this.target) ?
      this.target.map(function (item, index) {
        return index;
      }) : Object.keys(this.target);
    return names.filter(function (name) {
      return name !== OBSERVER_PROP_NAME;
    });
  },

  /**
   * 包裹数组
   * @param {array} array 源数组
   * @returns {array} 处理后的数组
   */
  _wrapArray: function (array) {
    utils.defineFreezeProp(array, 'push', function () {
      var items = [].slice.call(arguments);
      items.forEach(function (item) {
        //这里也会触发对应 index 的 change 事件
        this[OBSERVER_PROP_NAME].set(array.length, item);
      }, this);
      this[OBSERVER_PROP_NAME].emitChange({ path: 'length', value: this.length });
    });
    utils.defineFreezeProp(array, 'pop', function () {
      var item = [].pop.apply(this, arguments);
      this[OBSERVER_PROP_NAME].emitChange({ path: this.length, value: item });
      this[OBSERVER_PROP_NAME].emitChange({ path: 'length', value: this.length });
      return item;
    });
    utils.defineFreezeProp(array, 'unshift', function () {
      var items = [].slice.call(arguments);
      items.forEach(function (item) {
        //这里也会触发对应 index 的 change 事件
        this[OBSERVER_PROP_NAME].set(0, item);
      }, this);
      this[OBSERVER_PROP_NAME].emitChange({ path: 'length', value: this.length });
    });
    utils.defineFreezeProp(array, 'shift', function () {
      var item = [].shift.apply(this, arguments);
      this[OBSERVER_PROP_NAME].emitChange({ path: 0, value: item });
      this[OBSERVER_PROP_NAME].emitChange({ path: 'length', value: this.length });
      return item;
    });
    utils.defineFreezeProp(array, 'splice', function () {
      var startIndex = arguments[0];
      var endIndex = utils.isNull(arguments[1])
        ? startIndex + arguments[1]
        : this.length - 1;
      var items = [].splice.apply(this, arguments);
      for (var i = startIndex; i <= endIndex; i++) {
        this[OBSERVER_PROP_NAME].emitChange({ path: i, value: items[i - startIndex] });
      };
      this[OBSERVER_PROP_NAME].emitChange({ path: 'length', value: this.length });
      return items;
    });
    utils.defineFreezeProp(array, 'set', function (index, value) {
      if (index >= this.length) {
        this[OBSERVER_PROP_NAME].emitChange({ path: 'length', value: this.length });
      }
      this[OBSERVER_PROP_NAME].set(index, value);
    });
  }

});

/**
 * 观察一个对象
 * @param {Object} target 目标对象
 * @return {Observer} 观察者对象
 */
Observer.observe = function (target) {
  return new Observer(target);
};

module.exports = Observer;
},{"../events":7,"cify":34,"ntils":36}],12:[function(require,module,exports){
const Class = require('cify');
const Directive = require('./directive');
const utils = require('ntils');
const Expression = require('./expression');
const directives = require('./directives');

const DEFAULT_PREFIX = 'm';

/**
 * 模板编译器
 * 可以通过指定「前缀」或「指令集」构建实例
 */
const Compiler = new Class({
  $name: 'Compiler',

  /**
   * 构造一个编译器
   * @param {Object} options 选项
   * @returns {void} 无返回
   */
  constructor: function (options) {
    options = options || Object.create(null);
    options.directives = options.directives || [];
    this.prefix = options.prefix || DEFAULT_PREFIX;
    this.directives = directives.concat(options.directives);
  },

  /**
   * 解析要匹配的名称
   * @param {string} name 要解析的名称字符串
   * @param {HTMLNode} node 当前 HTML 元素结点
   * @returns {Object} 解析后的对象
   */
  _parseMatchInfo: function (name, type, node) {
    var parts = name.toLowerCase().split(':');
    var info = {
      type: type,
      compiler: this,
      node: node
    };
    if (parts.length > 1) {
      info.prefix = parts[0];
      info.name = parts[1];
      info.decorates = parts.slice(2);
    } else {
      info.prefix = null;
      info.name = parts[0];
      info.decorates = [];
    }
    return info;
  },

  /**
   * 查找所有匹配的指令
   * @param {Object} matchInfo 匹配信息
   * @returns {Array} 指令列表
   */
  _findDirectives: function (matchInfo) {
    return this.directives.filter(function (Directive) {
      return Directive.definition.test(matchInfo);
    }, this);
  },

  /**
   * 创建一个指令实例
   * @param {Directive} Directive 指令类
   * @param {Object} options 指令构建选项
   * @returns {Directive} 指令实例
   */
  _createDirectiveInstance: function (Directive, options) {
    options.compiler = this;
    options.prefix = this.prefix;
    return new Directive(options);
  },

  /**
   * 初始化一个编译完成的 handler
   * @param {function} handler 编译后的的模板函数
   * @returns {void} 无返回
   */
  _bindHandler: function (handler) {
    //排序 directives
    handler.directives = handler.directives.sort(function (a, b) {
      return b.level - a.level;
    });
    //初始化 directives
    var boundDirectives = [];
    utils.each(handler.directives, function (index, directive) {
      directive.index = index;
      directive.bind();
      boundDirectives.push(directive);
      //移除完成绑定的指令对应的 attribute
      if (directive.remove !== false && directive.attribute) {
        directive.node.removeAttribute(directive.attribute.name);
      }
      //如果遇到一个「终态」指令，停止向下初始化
      //如果 each、if 等为「终态指令」
      if (directive.final) {
        return handler.final = true;
      }
    }, this);
    handler.directives = boundDirectives;
  },

  /**
   * 编译一个元素本身
   * @param {function} handler 当前模板函数
   * @param {HTMLNode} node 当前 HTML 结点
   * @returns {void} 无返回
   */
  _compileElement: function (handler, node) {
    var matchInfo = this._parseMatchInfo(node.nodeName, Directive.TYPE_ELEMENT, node);
    var elementDirectives = this._findDirectives(matchInfo);
    elementDirectives.forEach(function (Directive) {
      handler.directives.push(this._createDirectiveInstance(Directive, {
        handler: handler,
        node: node,
        decorates: matchInfo.decorates
      }));
    }, this);
  },

  /**
   * 编译一个元素所有 attributes 
   * @param {function} handler 当前模板函数
   * @param {HTMLNode} node 当前 HTML 结点
   * @returns {void} 无返回
   */
  _compileAttributes: function (handler, node) {
    utils.toArray(node.attributes).forEach(function (attribute) {
      var matchInfo = this._parseMatchInfo(attribute.name, Directive.TYPE_ATTRIBUTE, node);
      var attributeDirectives = this._findDirectives(matchInfo);
      attributeDirectives.forEach(function (Directive) {
        var definition = Directive.definition;
        handler.directives.push(this._createDirectiveInstance(Directive, {
          handler: handler,
          node: node,
          attribute: attribute,
          expression: definition.literal ?
            attribute.value : new Expression(attribute.value),
          decorates: matchInfo.decorates
        }));
      }, this);
    }, this);
  },

  /**
   * 编译所有子结点
   * @param {function} handler 当前模板函数
   * @param {HTMLNode} node 当前 HTML 结点
   * @returns {void} 无返回
   */
  _compileChildren: function (handler, node) {
    if (handler.final) return;
    utils.toArray(node.childNodes).forEach(function (childNode) {
      var childHandler = this.compile(childNode);
      childHandler.parent = this;
      handler.children.push(childHandler);
    }, this);
  },

  /**
   * 编译一个模板
   * @param {HTMLNode} node 模板根元素
   * @param {Object} options 选项
   * @returns {function} 模板函数
   */
  compile: function (node, options) {
    if (!node) {
      throw new Error('Invalid node for compile');
    }
    options = options || utils.create(null);
    //定义编译结果函数
    var handler = function (scope) {
      if (utils.isNull(scope)) scope = Object.create(null);
      //执行指令
      handler.directives.forEach(function (directive) {
        directive.scope = scope;
        directive.execute(scope);
      }, this);
      //执行子元素编译函数
      handler.children.forEach(function (childHandler) {
        childHandler(scope);
      }, this);
    };
    handler.dispose = function () {
      //执行指令
      handler.directives.forEach(function (directive) {
        directive.unbind();
      }, this);
      //执行子元素编译函数
      handler.children.forEach(function (childHandler) {
        childHandler.dispose();
      }, this);
    };
    handler.node = node;
    //定义 children & directives 
    handler.directives = [];
    handler.children = [];
    //编译相关指令
    if (options.element !== false) this._compileElement(handler, node);
    if (options.attribute !== false) this._compileAttributes(handler, node);
    this._bindHandler(handler);
    if (options.children !== false) this._compileChildren(handler, node);
    //返回编译后函数
    return handler.bind(null);
  }

});

module.exports = Compiler;
},{"./directive":13,"./directives":18,"./expression":30,"cify":34,"ntils":36}],13:[function(require,module,exports){
const Class = require('cify');
const utils = require('ntils');
const Expression = require('./expression');

/**
 * 指令定义信息类
 * 可以通过每一个「指令类」的的「静态成员」访问
 * 也可通过「指令实例」的「实例成员」访问
 */
const DirectiveDefinition = new Class({
  $name: 'DirectiveDefinition',

  $extends: Directive.prototype,

  /**
   * 构造一个指令定义信息对象
   * @param {Object} options 选项
   * @returns {void} 无返回
   */
  constructor: function (options) {
    if (!options ||
      !utils.isString(options.name) ||
      options.name.length < 1) {
      throw new Error('Invalid directive options');
    }
    //拷贝所有成员到当前 definition 实例
    this.customTest = options.test;
    delete options.test;
    utils.copy(this._faultHanlde(options), this);
  },

  /**
   * 针对「选项」做容错处理
   * @param {Object} options 原姓选项
   * @returns {Object} 处理后的选项
   */
  _faultHanlde: function (options) {
    options.type = options.type || Directive.TYPE_ATTRIBUTE;
    options.level = options.level || Directive.LEVEL_GENERAL;
    options.match = options.match || options.name;
    if (!(options.match instanceof RegExp)) {
      options.match = new RegExp('^' + options.match + '$', 'i');
    }
    if (options.tag && !(options.tag instanceof RegExp)) {
      options.tag = new RegExp('^' + options.tag + '$', 'i');
    }
    return options;
  },

  /**
   * 检查指令是否匹配
   * @returns {boolean} 测试结果
   */
  test: function (matchInfo) {
    return (this.type === matchInfo.type) &&
      (!this.tag || matchInfo.node && this.tag.test(matchInfo.node.nodeName)) &&
      (this.prefix === false || matchInfo.prefix === matchInfo.compiler.prefix) &&
      (this.match.test(matchInfo.name)) &&
      (!this.customTest || this.customTest(matchInfo));
  }

});

/**
 * 指定定义工场函数
 * @param {Object} defineOpts 选项
 * @returns {Directive} 指令类
 */
function Directive(options) {
  //创建 definition 实例
  const definition = new DirectiveDefinition(options);
  //生成指令类
  const DirectiveClass = new Class({
    $name: 'Directive',

    $extends: definition,
    //指令构建函数
    constructor: function (instanceOptions) {
      utils.copy(instanceOptions, this);
    },
    //挂载实例上的 definition
    definition: definition,
    //挂载实例核心方法
    bind: options.bind || utils.noop,
    execute: options.execute || function (scope) {
      this.scope = scope;
      if (this.definition.type === Directive.TYPE_ELEMENT) {
        return this.update();
      }
      var newValue = this.definition.literal ?
        this.attribute.value : this.expression.execute(scope);
      if (!utils.deepEqual(this.__value__, newValue)) {
        this.update(newValue, this.__value__);
        this.__value__ = newValue;
      }
    },
    update: options.update || utils.noop,
    unbind: options.unbind || utils.noop,
    //挂载指令常用的类型
    utils: utils,
    Expression: Expression
  });
  //向指令类添加「指令定义信息」
  DirectiveClass.definition = definition;
  DirectiveClass.__proto__ = definition;
  return DirectiveClass;
};

//挂载指令定义信息类
Directive.Definition = DirectiveDefinition;

//指令类型
Directive.TYPE_ATTRIBUTE = 'attribute';
Directive.TYPE_ELEMENT = 'element';

//指令级别
Directive.LEVEL_PREVENT = 3000;
Directive.LEVEL_STATEMENT = 2000;
Directive.LEVEL_ELEMENT = 1000;
Directive.LEVEL_GENERAL = 0;
Directive.LEVEL_ATTRIBUTE = -1000;
Directive.LEVEL_CLOAK = -2000;

utils.defineFreezeProp(Directive, 'name', 'Directive');

module.exports = Directive;
},{"./expression":30,"cify":34,"ntils":36}],14:[function(require,module,exports){
const Directive = require('../directive');

/**
 * 通用的 attribute 指令
 * 用于所有 attribute 的处理
 * 例如:
 *  <div attr1="{{expr1}}" {{expr2}} {{attr3}}="{{expr3}}">
 *  </div>
 */
module.exports = new Directive({
  name: 'attr',
  type: Directive.TYPE_ATTRIBUTE,
  level: Directive.LEVEL_ATTRIBUTE,
  prefix: false,
  literal: true,
  remove: false,
  match: /[\s\S]/i,

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.computedName = this.attribute.name;
    this.computedValue = this.attribute.value;
    this.nameExpr = new this.Expression(this.attribute.name, true);
    this.valueExpr = new this.Expression(this.attribute.value, true);
  },

  execute: function (scope) {
    var newComputedName = this.nameExpr.execute(scope);
    if (this.computedName !== newComputedName) {
      this.node.removeAttribute(this.computedName);
      this.computedName = newComputedName;
      if (!this.utils.isNull(this.computedName) && this.computedName.length > 0) {
        this.node.setAttribute(this.computedName, '');
      }
    }
    var newComputeValue = this.valueExpr.execute(scope);
    newComputeValue = this.utils.isNull(newComputeValue) ? '' : newComputeValue;
    if (this.computedValue !== newComputeValue) {
      this.computedValue = newComputeValue;
      this.node.setAttribute(
        this.computedName,
        this.computedValue
      );
    }
  }

});
},{"../directive":13}],15:[function(require,module,exports){
const Directive = require('../directive');

module.exports = new Directive({
  name: 'each',
  type: Directive.TYPE_ATTRIBUTE,
  level: Directive.LEVEL_STATEMENT,
  final: true,
  literal: true,

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.mountNode = document.createTextNode('');
    this.node.parentNode.insertBefore(this.mountNode, this.node);
    //虽然，bind 完成后，也会进行 attribute 的移除，
    //但 each 指令必须先移除，否再进行 item 编译时 each 还会生效
    this.node.removeAttribute(this.attribute.name);
    this.node.parentNode.removeChild(this.node);
    this.parseExpr();
    this.eachItems = [];
  },

  parseExpr: function () {
    this.eachType = this.attribute.value.indexOf(' in ') > -1 ? 'in' : 'of';
    var tokens = this.attribute.value.split(' ' + this.eachType + ' ');
    var fnText = 'with(scope){utils.each(' + tokens[1] + ',fn,this)}';
    this.each = new Function('utils', 'scope', 'fn', fnText).bind(null, this.utils);
    var names = tokens[0].split(',').map(function (name) {
      return name.trim();
    });
    if (this.eachType == 'in') {
      this.keyName = names[0];
      this.valueName = names[1];
    } else {
      this.keyName = names[1];
      this.valueName = names[0];
    }
  },

  execute: function (scope) {
    var eachCount = 0;
    var itemsFragment = document.createDocumentFragment();
    this.each(scope, function (key, value) {
      //创建新 scope
      var newScope = { __proto__: scope };
      if (this.keyName) newScope[this.keyName] = key;
      if (this.valueName) newScope[this.valueName] = value;
      var oldItem = this.eachItems[key];
      if (oldItem) {
        if (!oldItem.handler) console.log('a', this.eachItems, oldItem);
        oldItem.handler(newScope);
      } else {
        var newItem = Object.create(null);
        //创建新元素
        newItem.node = this.node.cloneNode(true);
        itemsFragment.appendChild(newItem.node);
        newItem.handler = this.compiler.compile(newItem.node);
        newItem.handler(newScope);
        this.eachItems[key] = newItem;
      }
      eachCount++;
    }.bind(this));
    this.eachItems.splice(eachCount).forEach(function (item) {
      item.node.parentNode.removeChild(item.node);
    });
    if (itemsFragment.childNodes.length > 0) {
      this.mountNode.parentNode.insertBefore(itemsFragment, this.mountNode);
    }
  }

});
},{"../directive":13}],16:[function(require,module,exports){
const Directive = require('../directive');

module.exports = new Directive({
  name: 'id',
  type: Directive.TYPE_ATTRIBUTE,
  literal: true,

  update: function (id) {
    if (id in this.scope) {
      throw new Error('Conflicting component id `' + id + '`');
    }
    this.scope[id] = this.node.$target || this.node;
  }

});
},{"../directive":13}],17:[function(require,module,exports){
const Directive = require('../directive');

module.exports = new Directive({
  name: 'if',
  type: Directive.TYPE_ATTRIBUTE,
  level: Directive.LEVEL_STATEMENT,
  final: true,

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.mountNode = document.createTextNode('');
    this.node.parentNode.insertBefore(this.mountNode, this.node);
    //虽然，bind 完成后，也会进行 attribute 的移除，
    //但 if 指令必须先移除，否再进行 item 编译时 if 还会生效
    this.node.removeAttribute(this.attribute.name);
    this.node.parentNode.removeChild(this.node);
    this._oldValue = false;
    this._handler = this.compiler.compile(this.node);
  },

  execute: function (scope) {
    var newValue = this.expression.execute(scope);
    var node = this.node.$substitute || this.node;
    if (newValue) {
      //如果新计算的结果为 true 才执行 
      this._handler(scope);
      if (!this._oldValue) {
        this.mountNode.parentNode.insertBefore(node, this.mountNode);
      }
    } else if (this._oldValue && node.parentNode) {
      node.parentNode.removeChild(node);
    }
    this._oldValue = newValue;
  }

});
},{"../directive":13}],18:[function(require,module,exports){
module.exports = [
  require('./text'),
  require('./attr'),
  require('./each'),
  require('./if'),
  require('./prop'),
  require('./on'),
  require('./inner-html'),
  require('./inner-text'),
  require('./prevent'),
  require('./id'),
  require('./model-input'),
  require('./model-select'),
  require('./model-radio'),
  require('./model-checkbox'),
  require('./model-editable')
];
},{"./attr":14,"./each":15,"./id":16,"./if":17,"./inner-html":19,"./inner-text":20,"./model-checkbox":21,"./model-editable":22,"./model-input":23,"./model-radio":24,"./model-select":25,"./on":26,"./prevent":27,"./prop":28,"./text":29}],19:[function(require,module,exports){
const Directive = require('../directive');

module.exports = new Directive({
  name: 'html',
  type: Directive.TYPE_ATTRIBUTE,

  update: function (newValue) {
    this.node.innerHTML = newValue;
  }

});
},{"../directive":13}],20:[function(require,module,exports){
const Directive = require('../directive');

module.exports = new Directive({
  name: 'text',
  type: Directive.TYPE_ATTRIBUTE,

  update: function (newValue) {
    this.node.innerText = newValue;
  }

});
},{"../directive":13}],21:[function(require,module,exports){
const Directive = require('../directive');
const EventEmitter = require('../../events');

module.exports = new Directive({
  name: 'model',
  type: Directive.TYPE_ATTRIBUTE,
  level: Directive.LEVEL_ATTRIBUTE,
  tag: 'input',

  test: function (matchInfo) {
    var inputType = matchInfo.node.getAttribute('type');
    return inputType === 'checkbox';
  },

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.bindPath = this.attribute.value;
    this.emiter = new EventEmitter(this.node);
    this.emiter.addListener('change', function () {
      if (this.utils.isNull(this.scope)) return;
      var value = this.utils.getByPath(this.scope, this.bindPath);
      if (this.utils.isArray(value) && this.node.checked) {
        value.push(this.node.value);
      } else if (this.utils.isArray(value) && !this.node.checked) {
        var index = value.indexOf(this.node.value);
        value.splice(index, 1);
      } else {
        this.utils.setByPath(this.scope, this.bindPath, this.node.checked);
      }
    }.bind(this), false);
  },

  unbind: function () {
    this.emiter.removeListener();
  },

  execute: function (scope) {
    this.scope = scope;
    var value = this.expression.execute(scope);
    if (this.utils.isArray(value)) {
      this.node.checked = value.indexOf(this.node.value) > -1;
    } else {
      this.node.checked = value;
    }
  }

});
},{"../../events":7,"../directive":13}],22:[function(require,module,exports){
const Directive = require('../directive');
const EventEmitter = require('../../events');

module.exports = new Directive({
  name: 'model',
  type: Directive.TYPE_ATTRIBUTE,
  level: Directive.LEVEL_ATTRIBUTE,
  test: function (matchInfo) {
    return matchInfo.node.isContentEditable;
  },

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.bindPath = this.attribute.value;
    this.emiter = new EventEmitter(this.node);
    this.emiter.addListener('input', function () {
      if (this.utils.isNull(this.scope)) return;
      this.utils.setByPath(this.scope, this.bindPath, this.node.innerHTML);
    }.bind(this), false);
  },

  unbind: function () {
    this.emiter.removeListener();
  },

  execute: function (scope) {
    var value = this.expression.execute(scope);
    if (this.node.innerHTML !== value) {
      this.node.innerHTML = value;
    }
  }

});
},{"../../events":7,"../directive":13}],23:[function(require,module,exports){
const Directive = require('../directive');
const EventEmitter = require('../../events');

module.exports = new Directive({
  name: 'model',
  type: Directive.TYPE_ATTRIBUTE,
  level: Directive.LEVEL_ATTRIBUTE,
  tag: /^(input|textarea)$/i,
  test: function (matchInfo) {
    var inputType = matchInfo.node.getAttribute('type');
    return inputType !== 'radio' && inputType !== 'checkbox';
  },

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.bindPath = this.attribute.value;
    this.emiter = new EventEmitter(this.node);
    this.emiter.addListener('input', function () {
      if (this.utils.isNull(this.scope)) return;
      this.utils.setByPath(this.scope, this.bindPath, this.node.value);
    }.bind(this), false);
  },

  unbind: function () {
    this.emiter.removeListener();
  },

  execute: function (scope) {
    var value = this.expression.execute(scope);
    if (this.node.value !== value) {
      this.node.value = value;
    }
  }

});
},{"../../events":7,"../directive":13}],24:[function(require,module,exports){
const Directive = require('../directive');
const EventEmitter = require('../../events');

module.exports = new Directive({
  name: 'model',
  type: Directive.TYPE_ATTRIBUTE,
  level: Directive.LEVEL_ATTRIBUTE,
  tag: 'input',
  test: function (matchInfo) {
    var inputType = matchInfo.node.getAttribute('type');
    return inputType === 'radio';
  },

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.bindPath = this.attribute.value;
    this.emiter = new EventEmitter(this.node);
    this.emiter.addListener('change', function () {
      if (this.utils.isNull(this.scope)) return;
      this.utils.setByPath(this.scope, this.bindPath, this.node.value);
    }.bind(this), false);
  },

  unbind: function () {
    this.emiter.removeListener();
  },

  execute: function (scope) {
    this.scope = scope;
    var value = this.expression.execute(scope);
    this.node.checked = value == this.node.value;
  }

});
},{"../../events":7,"../directive":13}],25:[function(require,module,exports){
const Directive = require('../directive');
const EventEmitter = require('../../events');

module.exports = new Directive({
  name: 'model',
  type: Directive.TYPE_ATTRIBUTE,
  level: Directive.LEVEL_ATTRIBUTE,
  final: true,
  tag: 'select',

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.bindPath = this.attribute.value;
    this.node.removeAttribute(this.attribute.name);
    this._handler = this.compiler.compile(this.node);
    this.emiter = new EventEmitter(this.node);
    this.emiter.addListener('change', function () {
      if (this.utils.isNull(this.scope)) return;
      var selectedOptions = this.node.selectedOptions;
      var value = this.node.multiple
        ? [].slice.call(selectedOptions).map(function (option) {
          return option.value;
        }, this)
        : selectedOptions[0].value;
      this.utils.setByPath(this.scope, this.bindPath, value);
    }.bind(this), false);
  },

  unbind: function () {
    this.emiter.removeListener();
  },

  execute: function (scope) {
    this.scope = scope;
    this._handler(scope);
    var value = this.expression.execute(scope);
    if (!this.utils.isArray(value)) value = [value];
    [].slice.call(this.node.options).forEach(function (option) {
      option.selected = value.indexOf(option.value) > -1;
    }, this);
  }

});
},{"../../events":7,"../directive":13}],26:[function(require,module,exports){
const Directive = require('../directive');
const EventEmitter = require('../../events');

module.exports = new Directive({
  name: 'on',
  type: Directive.TYPE_ATTRIBUTE,
  literal: true,

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    var attrValue = this.attribute.value || '';
    if (attrValue.indexOf('(') < 0 && attrValue.indexOf(')') < 0) {
      attrValue += '($event)';
    }
    this.expr = new this.Expression(attrValue);
    var eventTarget = this.node.$target || this.node;
    this.emiter = new EventEmitter(eventTarget);
    this.emiter.addListener(this.decorates[0], function (event) {
      if (this.utils.isNull(this.scope)) return;
      var scope = { __proto__: this.scope };
      scope.event = scope.$event = event;
      this.expr.execute(scope);
    }.bind(this), false);
  },

  unbind: function () {
    this.emiter.removeListener();
  },

  execute: function (scope) {
    this.scope = scope;
  }

});
},{"../../events":7,"../directive":13}],27:[function(require,module,exports){
const Directive = require('../directive');

module.exports = new Directive({
  name: 'prevent',
  type: Directive.TYPE_ATTRIBUTE,
  level: Directive.LEVEL_PREVENT,
  final: true
});
},{"../directive":13}],28:[function(require,module,exports){
const Directive = require('../directive');

module.exports = new Directive({
  name: 'prop',
  type: Directive.TYPE_ATTRIBUTE,

  update: function (value) {
    var target = this.node.$target || this.node;
    target[this.decorates[0]] = value;
  }

});
},{"../directive":13}],29:[function(require,module,exports){
const Directive = require('../directive');
const Expression = require('../expression');

const CLOAK_CLASS_NAME = 'cloak';

module.exports = new Directive({
  name: '#text',
  type: Directive.TYPE_ELEMENT,
  prefix: false,
  test: function (matchInfo) {
    return matchInfo.node.nodeValue.trim().length > 4;
  },

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.expr = new Expression(this.node.nodeValue, true);
    this.node.nodeValue = '';
    if (this.node.parentNode) {
      this.node.parentNode.removeAttribute(CLOAK_CLASS_NAME);
    }
  },

  execute: function (scope) {
    this.scope = scope;
    var newValue = this.expr.execute(scope);
    if (this.node.nodeValue !== newValue) {
      this.node.nodeValue = newValue;
    }
  }

});
},{"../directive":13,"../expression":30}],30:[function(require,module,exports){
const Class = require('cify');
const utils = require('ntils');

/**
 * 表达式类型，将字符串构析为可执行表达式实例
 */
const Expression = new Class({
  $name: 'Expression',

  /**
   * 通过字符串构造一个表达式实例
   * @param {string} code 代码字符串
   * @param {boolean} mix 是否是混合代码
   * @returns {void} 无返回
   */
  constructor: function (code, mix) {
    this.func = mix ?
      this._compileMixedCode(code) :
      this._compileCode(code);
  },

  /**
   * 编译普通表达式代码
   * @param {string} code 代码字符串
   * @returns {function} 编辑后的函数
   */
  _compileCode: function (code) {
    code = this._escapeEOL(this._wrapCode(code));
    return this._createFunction(code);
  },

  /**
   * 编辑混合的表达式代码
   * @param {string} code 代码字符串
   * @returns {function} 编辑后的函数
   */
  _compileMixedCode: function (code) {
    var statements = this._parseMixedCode(code);
    code = this._escapeEOL(statements.join('+'));
    return this._createFunction(code);
  },

  /**
   * 通过符串代码创建一个可执行函数
   * @param {string} code 代码字符串
   * @returns {function} 创建的函数
   */
  _createFunction: function (code) {
    var func = new Function('utils', 'scope', 'with(scope){return ' + code + '}');
    return func.bind(null, utils);
  },

  /**
   * 解析混合代码字符串
   * @param {string} code 混合代码字符串
   * @returns {Array} 解析后的「token」列表
   */
  _parseMixedCode: function (code) {
    var index = 0, length = code.length;
    var token = '', isExpr = false, tokens = [];
    while (index <= length) {
      var char = code[index++];
      var nextChar = code[index];
      if (utils.isNull(char)) {
        if (token.length > 0) {
          tokens.push('"' + this._escapeCode(token) + '"');
        }
        token = '';
        isExpr = false;
      } else if (!isExpr && char + nextChar == '{{') {
        if (token.length > 0) {
          tokens.push('"' + this._escapeCode(token) + '"');
        }
        token = '';
        isExpr = true;
        index++;
      } else if (isExpr && char + nextChar == '}}') {
        if (token.length > 0) {
          tokens.push(this._wrapCode(token));
        }
        token = '';
        isExpr = false;
        index++;
      } else {
        token += char;
      }
    }
    return tokens;
  },

  /**
   * 转义处理代码字符串
   * @param {string} str 源字符串
   * @returns {string} 处理后的字符串
   */
  _escapeCode: function (str) {
    return str.replace(/"/, '\\"').replace('\r\n', '\\r\\n').replace('\n', '\\n');
  },

  /**
   * 转义换行符
   * @param {string} str 源字符串
   * @returns {string} 处理后的字符串
   */
  _escapeEOL: function (code) {
    return code.replace(/\n/gm, '\\\n');
  },

  /**
   * 通过闭包和 try/cache 包裹代码
   * 将模板中错误的代码直接显示在「模板中用到的位置」，更易于定位错误。
   * @param {string} str 源字符串
   * @returns {string} 处理后的字符串
   */
  _wrapCode: function (code) {
    return '((function(){try{return (' + code + ')}catch(err){console.error(err);return err;}})())';
  },

  /**
   * 通过 scope 对象执行表达式
   * @param {Object} scope 上下文对象
   * @returns {Object} 执行结果
   */
  execute: function (scope) {
    if (utils.isNull(scope)) {
      scope = Object.create(null);
    }
    return this.func.call(scope, scope);
  }

});

module.exports = Expression;
},{"cify":34,"ntils":36}],31:[function(require,module,exports){
const Compiler = require('./compiler');
const Directive = require('./directive');
const Expression = require('./expression');
const Template = require('./template');
const directives = require('./directives/');

Template.Template = Template;
Template.Compiler = Compiler;
Template.Directive = Directive;
Template.directives = directives;
Template.Expression = Expression;

module.exports = Template;
},{"./compiler":12,"./directive":13,"./directives/":18,"./expression":30,"./template":32}],32:[function(require,module,exports){
const Class = require('cify');
const Observer = require('../observer');
const EventEmitter = require('../events');
const Compiler = require('./compiler');

/**
 * 模板类
 * 可能通过 element 作为参数，创建一个模板实例
 */
const Template = new Class({
  $name: 'Template',

  $extends: EventEmitter,

  /**
   * 构建一个模板板实例
   * @param {HTMLNode} element HTML 元素
   * @param {Object} options 选项
   * @returns void 无返回
   */
  constructor: function (element, options) {
    options = options || Object.create(null);
    EventEmitter.call(this);
    this.options = options;
    this.element = element;
    this.compiler = options.compiler || new Compiler(options);
    this.render = this.compiler.compile(this.element);
    this.update = this.update.bind(this);
    this._update = this._update.bind(this);
    this._updateTimer = 0;
  },

  /**
   * 更新当前模板 (会过滤不必要的更新)
   * @returns {void} 无返回
   */
  update: function () {
    if (this._updateTimer) {
      clearTimeout(this._updateTimer);
      this._updateTimer = null;
    }
    this._updateTimer = setTimeout(this._update, 0);
  },

  /**
   * 更新当前模板内部方法 
   * @returns {void} 无返回
   */
  _update: function () {
    if (!this._updateTimer || !this.observer) return;
    this.emit('update', this);
    this.render(this.observer.target);
    this._onBind();
  },

  /**
   * 在绑定成功时
   * @returns {void} 无返回
   */
  _onBind: function () {
    if (this._bound) return;
    this._bound = true;
    this.emit('bind', this);
  },

  /**
   * 将模板绑定到一个 scope
   * @param {Object} scope 绑定的上下文对象
   * @param {boolean} disableFirst 是否禁用第一次的自动渲染
   * @returns {void} 无返回
   */
  bind: function (scope, disableFirst) {
    this.unbind();
    this.observer = new Observer(scope, {
      root: this.options.root
    });
    this.observer.on('change', this.update);
    if (disableFirst) {
      this._onBind();
    } else {
      this.update();
    }
  },

  /**
   * 解绑定
   * @returns {void} 无返回
   */
  unbind: function () {
    if (!this.observer) return;
    this.observer.removeListener('change', this.update);
    this.observer.clearReference();
    this.observer = null;
  },

  /**
   * 释放
   * @returns {void} 无返回
   */
  dispose: function () {
    this.unbind();
    this.render.dispose();
  }

});

module.exports = Template;
},{"../events":7,"../observer":11,"./compiler":12,"cify":34}],33:[function(require,module,exports){
const Class = require('cify');
const utils = require('ntils');

/**
 * Watcher 类
 * 通过「计算函数」、「执行函数」可以创建一个 Watcher 实例
 */
const Watcher = new Class({
  $name: 'Watcher',

  /**
   * 通过「计算函数」、「执行函数」构建一个 Watcher 实例
   * @param {function} calcor 计算函数
   * @param {function} handler 处理函数
   * @param {boolean} first 是否自动执行第一次
   * @param {void} 无返回
   */
  constructor: function (calcor, handler, first) {
    if (!utils.isFunction(calcor) || !utils.isFunction(handler)) {
      throw new Error('Invalid parameters');
    }
    this.calcor = calcor;
    this.handler = handler;
    if (first) this.calc(true);
  },

  /**
   * 执行计算
   * @param {boolean} force 是否强制触发「计算函数」
   * @returns {Object} 计算后的值
   */
  calc: function (force) {
    var newValue = this.calcor();
    if (force || !utils.deepEqual(newValue, this.value)) {
      this.handler(newValue, this.value);
    }
    this.value = utils.clone(newValue);
  }

});

module.exports = Watcher;
},{"cify":34,"ntils":36}],34:[function(require,module,exports){
const utils = require('ntils');

const RESERVED = ['$extends', '$name', '$class', '$super'];

function Class(options) {
  //处理 options
  options = options || utils.create(null);
  options.$name = options.$name || 'Class';
  options.$extends = options.$extends || Class;
  options.$static = options.$static || utils.create(null);
  //处理父类 prototype
  var superPrototype = utils.isFunction(options.$extends) ?
    options.$extends.prototype : options.$extends;
  //定义新类
  var NewClass = function () {
    //处理 super
    if (!this.$super) {
      utils.defineFreezeProp(this, '$super', function () {
        if (utils.isFunction(options.$extends)) {
          return this.__proto__.__proto__ = options.$extends.apply(this, arguments);
        } else if (options.$extends.constructor) {
          return this.__proto__.__proto__ = options.$extends.constructor.apply(this, arguments);
        } else {
          return options.$extends;
        }
      });
      utils.each(superPrototype, function (name, value) {
        if (utils.isFunction(value)) {
          this.$super[name] = value.bind(this);
        } else {
          this.$super[name] = value;
        }
      }, this);
    }
    //调用构造
    if (utils.isFunction(options.constructor)) {
      return options.constructor.apply(this, arguments);
    }
  };
  //处理 prototype
  NewClass.prototype.__proto__ = superPrototype;
  utils.copy(options, NewClass.prototype, RESERVED);
  utils.defineFreezeProp(NewClass.prototype, '$class', NewClass);
  //处理静态成员
  utils.copy(options.$static, NewClass);
  if (utils.isFunction(options.$extends)) {
    NewClass.__proto__ = options.$extends;
  }
  if (!options.$extends.$extend) {
    utils.copy(Class, NewClass);
  }
  utils.defineFreezeProp(NewClass, 'name', options.$name);
  //--
  return NewClass;
}

//定义扩展方法
Class.$extend = function (options) {
  options.$extends = this;
  return new Class(options);
};

Class.Class = Class;
module.exports = Class;
},{"ntils":35}],35:[function(require,module,exports){
(function (owner) {
  "use strict";

  /**
   * 空函数
   */
  owner.noop = function () { };

  /**
   * 验证一个对象是否为NULL
   * @method isNull
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  owner.isNull = function (obj) {
    return obj === null || typeof obj === "undefined";
  };

  /**
   * 除去字符串两端的空格
   * @method trim
   * @param  {String} str 源字符串
   * @return {String}     结果字符串
   * @static
   */
  owner.trim = function (str) {
    if (this.isNull(str)) return str;
    if (str.trim) {
      return str.trim();
    } else {
      return str.replace(/(^[\\s]*)|([\\s]*$)/g, "");
    }
  };

  /**
   * 替换所有
   * @method replace
   * @param {String} str 源字符串
   * @param {String} str1 要替换的字符串
   * @param {String} str2 替换为的字符串
   * @static
   */
  owner.replace = function (str, str1, str2) {
    if (this.isNull(str)) return str;
    return str.replace(new RegExp(str1, 'g'), str2);
  };

  /**
   * 从字符串开头匹配
   * @method startWith
   * @param {String} str1 源字符串
   * @param {String} str2 要匹配的字符串
   * @return {Boolean} 匹配结果
   * @static
   */
  owner.startWith = function (str1, str2) {
    if (this.isNull(str1) || this.isNull(str2)) return false;
    return str1.indexOf(str2) === 0;
  };

  /**
   * 是否包含
   * @method contains
   * @param {String} str1 源字符串
   * @param {String} str2 检查包括字符串
   * @return {Boolean} 结果
   * @static
   */
  owner.contains = function (str1, str2) {
    var self = this;
    if (this.isNull(str1) || this.isNull(str2)) return false;
    return str1.indexOf(str2) > -1;
  };

  /**
   * 从字符串结束匹配
   * @method endWidth
   * @param {String} str1 源字符串
   * @param {String} str2 匹配字符串
   * @return {Boolean} 匹配结果
   * @static
   */
  owner.endWith = function (str1, str2) {
    if (this.isNull(str1) || this.isNull(str2)) return false;
    return str1.indexOf(str2) === (str1.length - str2.length);
  };

  /**
   * 是否包含属性
   * @method hasProperty
   * @param  {Object}  obj  对象
   * @param  {String}  name 属性名
   * @return {Boolean}      结果
   * @static
   */
  owner.has = owner.hasProperty = function (obj, name) {
    if (this.isNull(obj) || this.isNull(name)) return false;
    return (name in obj) || (obj.hasOwnProperty(name));
  };

  /**
   * 验证一个对象是否为Function
   * @method isFunction
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  owner.isFunction = function (obj) {
    if (this.isNull(obj)) return false;
    return typeof obj === "function";
  };

  /**
   * 验证一个对象是否为String
   * @method isString
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  owner.isString = function (obj) {
    if (this.isNull(obj)) return false;
    return typeof obj === 'string' || obj instanceof String;
  };

  /**
   * 验证一个对象是否为Number
   * @method isNumber
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  owner.isNumber = function (obj) {
    if (this.isNull(obj)) return false;
    return typeof obj === 'number' || obj instanceof Number;
  };

  /**
   * 验证一个对象是否为Boolean
   * @method isBoolean
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  owner.isBoolean = function (obj) {
    if (this.isNull(obj)) return false;
    return typeof obj === 'boolean' || obj instanceof Boolean;
  };

  /**
   * 验证一个对象是否为HTML Element
   * @method isElement
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  owner.isElement = function (obj) {
    if (this.isNull(obj)) return false;
    if (window.Element) return obj instanceof Element;
    else return (obj.tagName && obj.nodeType && obj.nodeName && obj.attributes && obj.ownerDocument);
  };

  /**
   * 验证一个对象是否为HTML Text Element
   * @method isText
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  owner.isText = function (obj) {
    if (this.isNull(obj)) return false;
    return obj instanceof Text;
  };

  /**
   * 验证一个对象是否为Object
   * @method isObject
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  owner.isObject = function (obj) {
    if (this.isNull(obj)) return false;
    return typeof obj === "object";
  };

  /**
   * 验证一个对象是否为Array或伪Array
   * @method isArray
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  owner.isArray = function (obj) {
    if (this.isNull(obj)) return false;
    var v1 = Object.prototype.toString.call(obj) === '[object Array]';
    var v2 = obj instanceof Array;
    var v3 = !this.isString(obj) && this.isNumber(obj.length) && this.isFunction(obj.splice);
    var v4 = !this.isString(obj) && this.isNumber(obj.length) && obj[0];
    return v1 || v2 || v3 || v4;
  };

  /**
   * 验证是不是一个日期对象
   * @method isDate
   * @param {Object} val   要检查的对象
   * @return {Boolean}           结果
   * @static
   */
  owner.isDate = function (val) {
    if (this.isNull(val)) return false;
    return val instanceof Date;
  };

  /**
   * 转换为数组
   * @method toArray
   * @param {Array|Object} array 伪数组
   * @return {Array} 转换结果数组
   * @static
   */
  owner.toArray = function (array) {
    if (this.isNull(array)) return [];
    return Array.prototype.slice.call(array);
  };

  /**
   * 转为日期格式
   * @method toDate
   * @param {Number|String} val 日期字符串或整型数值
   * @return {Date} 日期对象
   * @static
   */
  owner.toDate = function (val) {
    var self = this;
    if (self.isNumber(val))
      return new Date(val);
    else if (self.isString(val))
      return new Date(self.replace(self.replace(val, '-', '/'), 'T', ' '));
    else if (self.isDate(val))
      return val;
    else
      return null;
  };

  /**
   * 遍历一个对像或数组
   * @method each
   * @param  {Object or Array}   obj  要遍历的数组或对象
   * @param  {Function} fn            处理函数
   * @return {void}                   无返回值
   * @static
   */
  owner.each = function (list, handler, scope) {
    if (this.isNull(list) || this.isNull(handler)) return;
    if (this.isArray(list)) {
      var listLength = list.length;
      for (var i = 0; i < listLength; i++) {
        var rs = handler.call(scope || list[i], i, list[i]);
        if (!this.isNull(rs)) return rs;
      }
    } else {
      for (var key in list) {
        var rs = handler.call(scope || list[key], key, list[key]);
        if (!this.isNull(rs)) return rs;
      }
    }
  };

  /**
   * 格式化日期
   * @method formatDate
   * @param {Date|String|Number} date 日期
   * @param {String} format 格式化字符串
   * @param {object} dict 反译字典
   * @return {String} 格式化结果
   * @static
   */
  owner.formatDate = function (date, format, dict) {
    if (this.isNull(format) || this.isNull(date)) return date;
    date = this.toDate(date);
    dict = dict || {};
    var placeholder = {
      "M+": date.getMonth() + 1, //month
      "d+": date.getDate(), //day
      "h+": date.getHours(), //hour
      "m+": date.getMinutes(), //minute
      "s+": date.getSeconds(), //second
      "w+": date.getDay(), //week
      "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
      "S": date.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var key in placeholder) {
      if (new RegExp("(" + key + ")").test(format)) {
        var value = placeholder[key];
        value = dict[value] || value;
        format = format.replace(RegExp.$1, RegExp.$1.length == 1
          ? value : ("00" + value).substr(("" + value).length));
      }
    }
    return format;
  };

  /**
   * 深度克隆对象
   * @method clone
   * @param {Object} obj 源对象
   * @return {Object} 新对象
   * @static
   */
  owner.clone = function (obj, igonreArray) {
    if (this.isNull(obj) || this.isString(obj) || this.isNumber(obj) || this.isBoolean(obj) || this.isDate(obj)) {
      return obj;
    }
    var objClone = obj;
    try {
      objClone = new obj.constructor();
    } catch (ex) { }
    for (var key in obj) {
      if (objClone[key] != obj[key] && !this.contains(igonreArray, key)) {
        if (typeof (obj[key]) === 'object') {
          objClone[key] = this.clone(obj[key], igonreArray);
        } else {
          objClone[key] = obj[key];
        }
      }
    }
    this.each(['toString', 'valueOf'], function (i, name) {
      if (this.contains(igonreArray, key)) return;
      objClone[name] = obj[name];
    }, this);
    return objClone;
  };

  /**
   * 拷贝对象
   * @method copy
   * @param {Object} obj1 源对象
   * @param {Object} obj2 目标对象
   * @static
   */
  owner.copy = function (obj1, obj2, igonreArray) {
    obj2 = obj2 || {};
    this.each(obj1, function (name) {
      if (igonreArray && igonreArray.indexOf(name) > -1) {
        return;
      }
      try {
        obj2[name] = obj1[name];
      } catch (ex) { }
    })
    return obj2;
  };

  /**
   * 定义不可遍历的属性
   **/
  owner.defineFreezeProp = function (obj, name, value) {
    Object.defineProperty(obj, name, {
      value: value,
      enumerable: false,
      configurable: true, //能不能重写定义
      writable: false //能不能用「赋值」运算更改
    });
  };

  /**
   * 获取所有 key 
   */
  owner.keys = function (obj) {
    if (Object.keys) return Object.keys(obj);
    var keys = [];
    this.each(obj, function (key) {
      keys.push(key);
    });
    return keys;
  };

  /**
   * 创建一个对象
   */
  owner.create = function (proto) {
    if (Object.create) return Object.create(proto);
    return { __proto__: proto };
  };

  /**
   * 设置 proto
   */
  owner.setProto = function (obj, prototype) {
    if (obj.__proto__) {
      return owner.setPrototype(obj.__proto__);
    } else {
      obj.__proto__ = prototype;
    }
  };

  /**
   * 是否深度相等
   */
  owner.deepEqual = function (a, b) {
    if (a === b) return true;
    if (!this.isObject(a) || !this.isObject(b)) return false;
    var aKeys = this.keys(a);
    var bKeys = this.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    var allKeys = aKeys.concat(bKeys);
    var checkedMap = this.create(null);
    var result = true;
    this.each(allKeys, function (i, key) {
      if (checkedMap[key]) return;
      if (!this.deepEqual(a[key], b[key])) result = false;
      checkedMap[key] = true;
    }, this);
    return result;
  };

  /**
   * 从一个数值循环到别一个数
   * @param {number} fromNum 开始数值
   * @param {Number} toNum 结束数值
   * @param {Number} step 步长值
   * @param {function} handler 执行函数
   * @returns {void} 无返回
   */
  owner.fromTo = function (fromNum, toNum, step, handler) {
    if (!handler) handler = [step, step = handler][0];
    step = Math.abs(step || 1);
    if (fromNum < toNum) {
      for (var i = fromNum; i <= toNum; i += step) handler(i);
    } else {
      for (var i = fromNum; i >= toNum; i -= step) handler(i);
    }
  };

  /**
   * 生成一个Guid
   * @method newGuid
   * @return {String} GUID字符串
   * @static
   */
  owner.newGuid = function () {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  };

  /**
   * 对象变换
   **/
  owner.map = function (list, fn) {
    var buffer = this.isArray(list) ? [] : {};
    this.each(list, function (name, value) {
      buffer[name] = fn(name, value);
    });
    return buffer;
  };

  /**
   * 通过路径设置属性值
   */
  owner.setByPath = function (obj, path, value) {
    if (this.isNull(obj) || this.isNull(path) || path === '') {
      return;
    }
    if (!this.isArray(path)) {
      path = path.replace(/\[/, '.').replace(/\]/, '.').split('.');
    }
    this.each(path, function (index, name) {
      if (this.isNull(name) || name.length < 1) return;
      if (index === path.length - 1) {
        obj[name] = value;
      } else {
        obj[name] = obj[name] || {};
        obj = obj[name];
      }
    }, this);
  };

  /**
   * 通过路径获取属性值
   */
  owner.getByPath = function (obj, path) {
    if (this.isNull(obj) || this.isNull(path) || path === '') {
      return obj;
    }
    if (!this.isArray(path)) {
      path = path.replace(/\[/, '.').replace(/\]/, '.').split('.');
    }
    this.each(path, function (index, name) {
      if (this.isNull(name) || name.length < 1) return;
      if (!this.isNull(obj)) obj = obj[name];
    }, this);
    return obj;
  };

  /**
   * 数组去重
   **/
  owner.unique = function (array) {
    if (this.isNull(array)) return array;
    var newArray = [];
    this.each(array, function (i, value) {
      if (newArray.indexOf(value) > -1) return;
      newArray.push(value);
    });
    return newArray;
  };

  /**
   * 解析 function 的参数列表
   **/
  owner.getFunctionArgumentNames = function (fn) {
    if (!fn) return [];
    var src = fn.toString();
    var parts = src.split(')')[0].split('=>')[0].split('(');
    return (parts[1] || parts[0]).split(',').map(function (name) {
      return name.trim();
    }).filter(function (name) {
      return name != 'function';
    });
  };

  /**
   * 合并对象
   * @method mix
   * @return 合并后的对象
   * @param {Object} r 目标对象
   * @param {Object} s 源对象
   * @param {Boolean} ov 是否覆盖
   * @param {Object} wl 白名单
   * @param {Number} mode 模式
   * @param {Boolean} merge 深度合并
   */
  owner.mix = function (r, s, ov, wl, mode, merge) {
    if (!s || !r) {
      return r || owner;
    }
    //根据模式来判断，默认是Obj to Obj的  
    if (mode) {
      switch (mode) {
        case 1: // proto to proto  
          return owner.mix(r.prototype, s.prototype, ov, wl, 0, merge);
        case 2: // object to object and proto to proto  
          owner.mix(r.prototype, s.prototype, ov, wl, 0, merge);
          break; // pass through  
        case 3: // proto to static  
          return owner.mix(r, s.prototype, ov, wl, 0, merge);
        case 4: // static to proto  
          return owner.mix(r.prototype, s, ov, wl, 0, merge);
        default: // object to object is what happens below  
      }
    }
    // Maybe don't even need this wl && wl.length check anymore??  
    var i, l, p, type;
    //白名单如果有值，就对白名单里面的属性进行合并，如果有ov，那么就  
    if (wl && wl.length) {
      for (i = 0, l = wl.length; i < l; ++i) {
        p = wl[i];
        isObject = owner.isObject(r[p]); //看具体的属性是什么类型的  
        if (s.hasOwnProperty(p)) { //如果这个属性是p自己的  
          if (merge && isObject) { //如果设定了merge并且属性是一个对象，那么就调用mix本身，把s[p]的属性加到r[p]上面  
            owner.mix(r[p], s[p]);
          } else if (ov || !(p in r)) { //如果允许ov或者r里面没有p，那么就在r里面加上p这个属性  
            r[p] = s[p];
          }
        }
      }
    } else { //如果没有wl  
      for (i in s) { //遍历s里面的属性  
        if (s.hasOwnProperty(i)) { //如果i是s本身的属性，就按规则合并属性  
          if (merge && owner.isObject(r[i], true)) {
            owner.mix(r[i], s[i], ov, wl, 0, true); // recursive  
          } else if (ov || !(i in r)) {
            r[i] = s[i];
          }
        }
      }
    }
    return r;
  };

  /**
   * 缩短字符串
   */
  owner.short = function (str, maxLength) {
    if (!str) return str;
    maxLength = maxLength || 40;
    var strLength = str.length;
    var trimLength = maxLength / 2;
    return strLength > maxLength ? str.substr(0, trimLength) + '...' + str.substr(strLength - trimLength) : str;
  };

  /**
   * 首字母大写
   */
  owner.firstUpper = function (str) {
    if (this.isNull(str)) return;
    str[0] = str[0].toLowerCase();
    return str;
  };

  /**
   * 解析字符串为 dom 
   * @param {string} str 字符串
   * @returns {HTMLNode} 解析后的 DOM 
   */
  owner.parseDom = function (str) {
    this._PARSER_DOM_DIV = this._PARSER_DOM_DIV || document.createElement('dev');
    this._PARSER_DOM_DIV.innerHTML = str;
    var domNodes = this.toArray(this._PARSER_DOM_DIV.childNodes);
    this._PARSER_DOM_DIV.innerHTML = '';
    return domNodes;
  };

  //----

  //兼容AMD模块
  if (typeof define === 'function' && define.amd) {
    define('ntils', [], function () {
      return owner;
    });
  }

})((typeof exports === 'undefined') ? (window.ntils = {}) : exports);
//-
},{}],36:[function(require,module,exports){
(function (owner) {
  "use strict";

  /**
   * 空函数
   */
  owner.noop = function () { };

  /**
   * 验证一个对象是否为NULL
   * @method isNull
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  owner.isNull = function (obj) {
    return obj === null || typeof obj === "undefined";
  };

  /**
   * 除去字符串两端的空格
   * @method trim
   * @param  {String} str 源字符串
   * @return {String}     结果字符串
   * @static
   */
  owner.trim = function (str) {
    if (this.isNull(str)) return str;
    if (str.trim) {
      return str.trim();
    } else {
      return str.replace(/(^[\\s]*)|([\\s]*$)/g, "");
    }
  };

  /**
   * 替换所有
   * @method replace
   * @param {String} str 源字符串
   * @param {String} str1 要替换的字符串
   * @param {String} str2 替换为的字符串
   * @static
   */
  owner.replace = function (str, str1, str2) {
    if (this.isNull(str)) return str;
    return str.replace(new RegExp(str1, 'g'), str2);
  };

  /**
   * 从字符串开头匹配
   * @method startWith
   * @param {String} str1 源字符串
   * @param {String} str2 要匹配的字符串
   * @return {Boolean} 匹配结果
   * @static
   */
  owner.startWith = function (str1, str2) {
    if (this.isNull(str1) || this.isNull(str2)) return false;
    return str1.indexOf(str2) === 0;
  };

  /**
   * 是否包含
   * @method contains
   * @param {String} str1 源字符串
   * @param {String} str2 检查包括字符串
   * @return {Boolean} 结果
   * @static
   */
  owner.contains = function (str1, str2) {
    var self = this;
    if (this.isNull(str1) || this.isNull(str2)) return false;
    return str1.indexOf(str2) > -1;
  };

  /**
   * 从字符串结束匹配
   * @method endWidth
   * @param {String} str1 源字符串
   * @param {String} str2 匹配字符串
   * @return {Boolean} 匹配结果
   * @static
   */
  owner.endWith = function (str1, str2) {
    if (this.isNull(str1) || this.isNull(str2)) return false;
    return str1.indexOf(str2) === (str1.length - str2.length);
  };

  /**
   * 是否包含属性
   * @method hasProperty
   * @param  {Object}  obj  对象
   * @param  {String}  name 属性名
   * @return {Boolean}      结果
   * @static
   */
  owner.has = owner.hasProperty = function (obj, name) {
    if (this.isNull(obj) || this.isNull(name)) return false;
    return (name in obj) || (obj.hasOwnProperty(name));
  };

  /**
   * 验证一个对象是否为Function
   * @method isFunction
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  owner.isFunction = function (obj) {
    if (this.isNull(obj)) return false;
    return typeof obj === "function";
  };

  /**
   * 验证一个对象是否为String
   * @method isString
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  owner.isString = function (obj) {
    if (this.isNull(obj)) return false;
    return typeof obj === 'string' || obj instanceof String;
  };

  /**
   * 验证一个对象是否为Number
   * @method isNumber
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  owner.isNumber = function (obj) {
    if (this.isNull(obj)) return false;
    return typeof obj === 'number' || obj instanceof Number;
  };

  /**
   * 验证一个对象是否为Boolean
   * @method isBoolean
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  owner.isBoolean = function (obj) {
    if (this.isNull(obj)) return false;
    return typeof obj === 'boolean' || obj instanceof Boolean;
  };

  /**
   * 验证一个对象是否为HTML Element
   * @method isElement
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  owner.isElement = function (obj) {
    if (this.isNull(obj)) return false;
    if (window.Element) return obj instanceof Element;
    else return (obj.tagName && obj.nodeType && obj.nodeName && obj.attributes && obj.ownerDocument);
  };

  /**
   * 验证一个对象是否为HTML Text Element
   * @method isText
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  owner.isText = function (obj) {
    if (this.isNull(obj)) return false;
    return obj instanceof Text;
  };

  /**
   * 验证一个对象是否为Object
   * @method isObject
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  owner.isObject = function (obj) {
    if (this.isNull(obj)) return false;
    return typeof obj === "object";
  };

  /**
   * 验证一个对象是否为Array或伪Array
   * @method isArray
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  owner.isArray = function (obj) {
    if (this.isNull(obj)) return false;
    var v1 = Object.prototype.toString.call(obj) === '[object Array]';
    var v2 = obj instanceof Array;
    var v3 = !this.isString(obj) && this.isNumber(obj.length) && this.isFunction(obj.splice);
    var v4 = !this.isString(obj) && this.isNumber(obj.length) && obj[0];
    return v1 || v2 || v3 || v4;
  };

  /**
   * 验证是不是一个日期对象
   * @method isDate
   * @param {Object} val   要检查的对象
   * @return {Boolean}           结果
   * @static
   */
  owner.isDate = function (val) {
    if (this.isNull(val)) return false;
    return val instanceof Date;
  };

  /**
   * 转换为数组
   * @method toArray
   * @param {Array|Object} array 伪数组
   * @return {Array} 转换结果数组
   * @static
   */
  owner.toArray = function (array) {
    if (this.isNull(array)) return [];
    return Array.prototype.slice.call(array);
  };

  /**
   * 转为日期格式
   * @method toDate
   * @param {Number|String} val 日期字符串或整型数值
   * @return {Date} 日期对象
   * @static
   */
  owner.toDate = function (val) {
    var self = this;
    if (self.isNumber(val))
      return new Date(val);
    else if (self.isString(val))
      return new Date(self.replace(self.replace(val, '-', '/'), 'T', ' '));
    else if (self.isDate(val))
      return val;
    else
      return null;
  };

  /**
   * 遍历一个对像或数组
   * @method each
   * @param  {Object or Array}   obj  要遍历的数组或对象
   * @param  {Function} fn            处理函数
   * @return {void}                   无返回值
   * @static
   */
  owner.each = function (list, handler, scope) {
    if (this.isNull(list) || this.isNull(handler)) return;
    if (this.isArray(list)) {
      var listLength = list.length;
      for (var i = 0; i < listLength; i++) {
        var rs = handler.call(scope || list[i], i, list[i]);
        if (!this.isNull(rs)) return rs;
      }
    } else {
      for (var key in list) {
        var rs = handler.call(scope || list[key], key, list[key]);
        if (!this.isNull(rs)) return rs;
      }
    }
  };

  /**
   * 格式化日期
   * @method formatDate
   * @param {Date|String|Number} date 日期
   * @param {String} format 格式化字符串
   * @param {object} dict 反译字典
   * @return {String} 格式化结果
   * @static
   */
  owner.formatDate = function (date, format, dict) {
    if (this.isNull(format) || this.isNull(date)) return date;
    date = this.toDate(date);
    dict = dict || {};
    var placeholder = {
      "M+": date.getMonth() + 1, //month
      "d+": date.getDate(), //day
      "h+": date.getHours(), //hour
      "m+": date.getMinutes(), //minute
      "s+": date.getSeconds(), //second
      "w+": date.getDay(), //week
      "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
      "S": date.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var key in placeholder) {
      if (new RegExp("(" + key + ")").test(format)) {
        var value = placeholder[key];
        value = dict[value] || value;
        format = format.replace(RegExp.$1, RegExp.$1.length == 1
          ? value : ("00" + value).substr(("" + value).length));
      }
    }
    return format;
  };

  /**
   * 深度克隆对象
   * @method clone
   * @param {Object} obj 源对象
   * @return {Object} 新对象
   * @static
   */
  owner.clone = function (obj, igonreArray) {
    if (this.isNull(obj) || this.isString(obj) || this.isNumber(obj) || this.isBoolean(obj) || this.isDate(obj)) {
      return obj;
    }
    var objClone = obj;
    try {
      objClone = new obj.constructor();
    } catch (ex) { }
    for (var key in obj) {
      if (objClone[key] != obj[key] && !this.contains(igonreArray, key)) {
        if (typeof (obj[key]) === 'object') {
          objClone[key] = this.clone(obj[key], igonreArray);
        } else {
          objClone[key] = obj[key];
        }
      }
    }
    this.each(['toString', 'valueOf'], function (i, name) {
      if (this.contains(igonreArray, key)) return;
      objClone[name] = obj[name];
    }, this);
    return objClone;
  };

  /**
   * 拷贝对象
   * @method copy
   * @param {Object} obj1 源对象
   * @param {Object} obj2 目标对象
   * @static
   */
  owner.copy = function (obj1, obj2) {
    obj2 = obj2 || {};
    this.each(obj1, function (name) {
      try {
        obj2[name] = obj1[name];
      } catch (ex) { }
    })
    return obj2;
  };

  /**
   * 定义不可遍历的属性
   **/
  owner.defineFreezeProp = function (obj, name, value) {
    Object.defineProperty(obj, name, {
      value: value,
      enumerable: false,
      configurable: true, //能不能重写定义
      writable: false //能不能用「赋值」运算更改
    });
  };

  /**
   * 获取所有 key 
   */
  owner.keys = function (obj) {
    if (Object.keys) return Object.keys(obj);
    var keys = [];
    this.each(obj, function (key) {
      keys.push(key);
    });
    return keys;
  };

  /**
   * 创建一个对象
   */
  owner.create = function (proto) {
    if (Object.create) return Object.create(proto);
    return { __proto__: proto };
  };

  /**
   * 是否深度相等
   */
  owner.deepEqual = function (a, b) {
    if (a === b) return true;
    if (!this.isObject(a) || !this.isObject(b)) return false;
    var aKeys = this.keys(a);
    var bKeys = this.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    var allKeys = aKeys.concat(bKeys);
    var checkedMap = this.create(null);
    var result = true;
    this.each(allKeys, function (i, key) {
      if (checkedMap[key]) return;
      if (!this.deepEqual(a[key], b[key])) result = false;
      checkedMap[key] = true;
    }, this);
    return result;
  };

  /**
   * 从一个数值循环到别一个数
   * @param {number} fromNum 开始数值
   * @param {Number} toNum 结束数值
   * @param {Number} step 步长值
   * @param {function} handler 执行函数
   * @returns {void} 无返回
   */
  owner.fromTo = function (fromNum, toNum, step, handler) {
    if (!handler) handler = [step, step = handler][0];
    step = Math.abs(step || 1);
    if (fromNum < toNum) {
      for (var i = fromNum; i <= toNum; i += step) handler(i);
    } else {
      for (var i = fromNum; i >= toNum; i -= step) handler(i);
    }
  };

  /**
   * 生成一个Guid
   * @method newGuid
   * @return {String} GUID字符串
   * @static
   */
  owner.newGuid = function () {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  };

  /**
   * 对象变换
   **/
  owner.map = function (list, fn) {
    var buffer = this.isArray(list) ? [] : {};
    this.each(list, function (name, value) {
      buffer[name] = fn(name, value);
    });
    return buffer;
  };

  /**
   * 通过路径设置属性值
   */
  owner.setByPath = function (obj, path, value) {
    if (this.isNull(obj) || this.isNull(path) || path === '') {
      return;
    }
    if (!this.isArray(path)) {
      path = path.replace(/\[/, '.').replace(/\]/, '.').split('.');
    }
    this.each(path, function (index, name) {
      if (this.isNull(name) || name.length < 1) return;
      if (index === path.length - 1) {
        obj[name] = value;
      } else {
        obj[name] = obj[name] || {};
        obj = obj[name];
      }
    }, this);
  };

  /**
   * 通过路径获取属性值
   */
  owner.getByPath = function (obj, path) {
    if (this.isNull(obj) || this.isNull(path) || path === '') {
      return obj;
    }
    if (!this.isArray(path)) {
      path = path.replace(/\[/, '.').replace(/\]/, '.').split('.');
    }
    this.each(path, function (index, name) {
      if (this.isNull(name) || name.length < 1) return;
      if (!this.isNull(obj)) obj = obj[name];
    }, this);
    return obj;
  };

  /**
   * 数组去重
   **/
  owner.unique = function (array) {
    if (this.isNull(array)) return array;
    var newArray = [];
    this.each(array, function (i, value) {
      if (newArray.indexOf(value) > -1) return;
      newArray.push(value);
    });
    return newArray;
  };

  /**
   * 解析 function 的参数列表
   **/
  owner.getFunctionArgumentNames = function (fn) {
    if (!fn) return [];
    var src = fn.toString();
    var parts = src.split(')')[0].split('=>')[0].split('(');
    return (parts[1] || parts[0]).split(',').map(function (name) {
      return name.trim();
    }).filter(function (name) {
      return name != 'function';
    });
  };

  /**
   * 合并对象
   * @method mix
   * @return 合并后的对象
   * @param {Object} r 目标对象
   * @param {Object} s 源对象
   * @param {Boolean} ov 是否覆盖
   * @param {Object} wl 白名单
   * @param {Number} mode 模式
   * @param {Boolean} merge 深度合并
   */
  owner.mix = function (r, s, ov, wl, mode, merge) {
    if (!s || !r) {
      return r || owner;
    }
    //根据模式来判断，默认是Obj to Obj的  
    if (mode) {
      switch (mode) {
        case 1: // proto to proto  
          return owner.mix(r.prototype, s.prototype, ov, wl, 0, merge);
        case 2: // object to object and proto to proto  
          owner.mix(r.prototype, s.prototype, ov, wl, 0, merge);
          break; // pass through  
        case 3: // proto to static  
          return owner.mix(r, s.prototype, ov, wl, 0, merge);
        case 4: // static to proto  
          return owner.mix(r.prototype, s, ov, wl, 0, merge);
        default: // object to object is what happens below  
      }
    }
    // Maybe don't even need this wl && wl.length check anymore??  
    var i, l, p, type;
    //白名单如果有值，就对白名单里面的属性进行合并，如果有ov，那么就  
    if (wl && wl.length) {
      for (i = 0, l = wl.length; i < l; ++i) {
        p = wl[i];
        isObject = owner.isObject(r[p]); //看具体的属性是什么类型的  
        if (s.hasOwnProperty(p)) { //如果这个属性是p自己的  
          if (merge && isObject) { //如果设定了merge并且属性是一个对象，那么就调用mix本身，把s[p]的属性加到r[p]上面  
            owner.mix(r[p], s[p]);
          } else if (ov || !(p in r)) { //如果允许ov或者r里面没有p，那么就在r里面加上p这个属性  
            r[p] = s[p];
          }
        }
      }
    } else { //如果没有wl  
      for (i in s) { //遍历s里面的属性  
        if (s.hasOwnProperty(i)) { //如果i是s本身的属性，就按规则合并属性  
          if (merge && owner.isObject(r[i], true)) {
            owner.mix(r[i], s[i], ov, wl, 0, true); // recursive  
          } else if (ov || !(i in r)) {
            r[i] = s[i];
          }
        }
      }
    }
    return r;
  };

  /**
   * 缩短字符串
   */
  owner.short = function (str, maxLength) {
    if (!str) return str;
    maxLength = maxLength || 40;
    var strLength = str.length;
    var trimLength = maxLength / 2;
    return strLength > maxLength ? str.substr(0, trimLength) + '...' + str.substr(strLength - trimLength) : str;
  };

  /**
   * 首字母大写
   */
  owner.firstUpper = function (str) {
    if (this.isNull(str)) return;
    str[0] = str[0].toLowerCase();
    return str;
  };

  /**
   * ���析字符串为 dom 
   * @param {string} str 字符串
   * @returns {HTMLNode} 解析后的 DOM 
   */
  owner.parseDom = function (str) {
    this._PARSER_DOM_DIV = this._PARSER_DOM_DIV || document.createElement('dev');
    this._PARSER_DOM_DIV.innerHTML = str;
    var domNodes = this.toArray(this._PARSER_DOM_DIV.childNodes);
    this._PARSER_DOM_DIV.innerHTML = '';
    return domNodes;
  };

  //----

  //兼容AMD模块
  if (typeof define === 'function' && define.amd) {
    define('ntils', [], function () {
      return owner;
    });
  }

})((typeof exports === 'undefined') ? (window.ntils = {}) : exports);
//-
},{}]},{},[9])
//# sourceMappingURL=mokit.js.map
