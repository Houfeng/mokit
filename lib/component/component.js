const Class = require('cify');
const Template = require('../template');
const Watcher = require('../watcher');
const utils = require('ntils');
const EventEmitter = require('../events');
const Observer = require('../observer');
const ComponentDirective = require('./component-directive');

/**
 * 组件类
 * 用于定义一个新的组件
 * @param {Object} classOpts 类选项
 * @returns {Component} 组件类
 */
function Component(classOpts) {

  //处理组件选项
  classOpts = classOpts || utils.create(null);

  //处理「继承」，目前的机制，只能用「合并类选项」
  let mixObjects = classOpts.mixs;
  delete classOpts.mixs;
  if (mixObjects && !utils.isArray(mixObjects)) {
    mixObjects = [mixObjects];
  } else {
    mixObjects = [];
  }
  let extendComponent = classOpts.extends || Component;
  delete classOpts.extends;
  mixObjects.push(extendComponent);
  mixObjects.push(classOpts);
  let mixedClassOpts = {};
  mixObjects.forEach(function (mixObject) {
    if (mixObject instanceof Component ||
      mixObject == Component) {
      mixObject = mixObject.$options || {};
    }
    utils.mix(mixedClassOpts, mixObject);
  });
  classOpts = mixedClassOpts;
  /**
   * 定义组件类
   * 可以通过 new ComponentClass() 创建组件实例
   */
  const ComponentClass = new Class({
    $name: classOpts.$name || 'Component',
    $extends: extendComponent,

    /**
     * 组件类构造函数
     * @param {object} instanceOpts 实例选项
     * @returns {void} 无返回
     */
    constructor: function (instanceOpts) {
      if (this == window) {
        return new this.$class(instanceOpts);
      }
      EventEmitter.call(this);
      utils.copy(instanceOpts || {}, this);
      this._onTemplateUpdate_ = this._onTemplateUpdate_.bind(this);
      this._createdData_(this.data);
      delete this.data;
      this._createProperties_(this.properties);
      delete this.properties;
      this._createWatches_(this.watches);
      delete this.watches;
      this.$directives = this.$directives || utils.create(null);
      this._importDirectives_(this.directives);
      this.$components = this.$components || utils.create(null);
      this._importComponents_(require('./components'));
      this._importComponents_({ 'self': ComponentClass });
      this._importComponents_(this.components);
      delete this.components;
      utils.defineFreezeProp(this, '$children', []);
      if (this.parent) this.$setParent(this.parent);
      this.$callHook('onInit');
      Observer.observe(this);
      if (this.element) {
        this.$mount();
      } else {
        this.$compile();
      }
    },

    /**
     * 设定父组件
     * @param {Object} parent 父组件
     * @returns {void} 无返回
     */
    $setParent: function (parent) {
      if (this.$parent === parent) return;
      if (this.$parent) {
        this.$parent.$removeChild(this);
      }
      if (parent) {
        parent.$addChild(this);
      }
    },

    /**
     * 添加子组件
     * @param {Object} child 子组件
     * @returns {void} 无返回
     */
    $addChild: function (child) {
      if (!(child instanceof Component)) return;
      this.$children.push(child);
      utils.defineFreezeProp(child, '$parent', this);
    },

    /**
     * 获取根组件
     */
    get $root() {
      if (this.$parent) {
        return this.$parent.$root;
      } else {
        return this;
      }
    },

    /**
     * 移除子组件
     * @param {Object} child 子组件
     * @returns {void} 无返回
     */
    $removeChild: function (child) {
      let index = this.$children.indexOf(child);
      this.$children.splice(index, 1);
      utils.defineFreezeProp(child, '$parent', null);
    },

    /**
     * 导入用到的子组件类
     * @param {Object} components 引入的组件
     * @returns {void} 无返回
     */
    _importComponents_: function (components) {
      utils.each(components, function (name, component) {
        this.$components[name] = component;
        this.$directives[name] = new ComponentDirective({
          name: name,
          component: component,
          parent: this
        });
      }, this);
    },

    /**
     * 导入一个用到的指令
     * @param {Object} directives 引入的指令
     * @returns {void} 无返回
     */
    _importDirectives_: function (directives) {
      utils.each(directives, function (name, directive) {
        this.$directives[name] = directive;
      }, this);
    },

    /**
     * 调用生命周期 hook
     * @param {string} name 调用的 hook 名称
     * @param {Array} args 调用 hook 的参数列表
     * @returns {void} 无反回
     */
    $callHook: function (name, args) {
      if (!utils.isFunction(this[name])) return;
      this[name].apply(this, args);
    },

    /**
     * 创建数据对象
     * @param {Object} data 组件数据对象
     * @returns {void} 无返回
     */
    _createdData_: function (data) {
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
    _createProperties_: function (properties) {
      this.$properties = {};
      utils.each(properties, function (name, descriptor) {
        if (utils.isFunction(descriptor)) {
          descriptor = { get: descriptor };
        } else if (!utils.isObject(descriptor)) {
          descriptor = { value: descriptor };
        } else {
          //不能直接用 descriptor，
          //因为为会导到多个组件实例间的影响
          descriptor = utils.copy(descriptor);
        }
        let hasGetterOrSetter = !!descriptor.get || !!descriptor.set;
        if (!hasGetterOrSetter) {
          descriptor.value = descriptor.value || null;
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
            if (this._observer_) {
              this._observer_.emitChange({ path: name, value: value });
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
    _createWatches_: function (watches) {
      this._watchers_ = this._watchers_ || [];
      utils.each(watches, function (name, handler) {
        this.$watch(name, handler);
      }, this);
    },

    /**
     * 在模板发生更新时
     * @returns {void} 无返回
     */
    _onTemplateUpdate_: function () {
      this._watchers_.forEach(function (watcher) {
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
        let path = calcer;
        calcer = function () {
          return utils.getByPath(this, path);
        };
      }
      this._watchers_.push(new Watcher(calcer.bind(this), handler.bind(this)));
    },

    /**
     * 创建元素
     * @returns {void} 无返回
     */
    _createElement_: function () {
      if (this._created_) return;
      this._created_ = true;
      this.$callHook('onCreate');
      utils.defineFreezeProp(this, '$element',
        this.element || ComponentClass.$template.cloneNode(true));
      if (!this.$element || this.$element.nodeName === '#text') {
        throw new Error('Invalid component template');
      }
      this.$callHook('onCreated');
    },

    /**
     * 编译自身模板并完成绑定
     * @returns {void} 无返回
     */
    $compile: function () {
      if (this._compiled_) return;
      this._compiled_ = true;
      this._createElement_();
      utils.defineFreezeProp(this, '_template_', new Template(this.$element, {
        directives: this.$directives,
        root: true
      }));
      this._template_.bind(this);
      this._template_.on('update', this._onTemplateUpdate_);
      this._template_.on('bind', function () {
        if (!this.deferReady) this.$callHook('onReady');
      }.bind(this));
    },

    /**
     * 向 DOM tree 中挂截组件
     * @param {HTMLNode} mountNode 挂载点元素
     * @param {append} append 是否 append 到挂载元素内
     * @returns {void} 无返回 
     */
    $mount: function (mountNode, append) {
      if (this._mounted_) return;
      this.$compile();
      this.$callHook('onMount');
      if (mountNode) {
        mountNode.$substitute = this.$element;
        this.$element._mountNode = mountNode;
        if (append) {
          mountNode.appendChild(this.$element);
        } else if (mountNode.parentNode) {
          mountNode.parentNode.insertBefore(this.$element, mountNode);
        }
      }
      this._mounted_ = true;
      this._removed_ = false;
      this.$callHook('onMounted');
    },

    /**
     * 将组件添加到指定容器元素内
     * @param {HTMLNode} node 容器元素
     * @returns {void} 无返回 
     */
    $appendTo: function (node) {
      this.$mount(node, true);
    },

    /**
     * 移除组件
     * @returns {void} 无返回
     */
    $remove: function () {
      if (this._removed_ || !this._mounted_) return;
      this.$callHook('onRemove');
      if (this.$element.parentNode) {
        this.$element.parentNode.removeChild(this.$element);
      }
      this._removed_ = true;
      this._mounted_ = false;
      this.$callHook('onRemoved');
    },

    /**
     * 触发自身的一个事件并向上冒泡
     * @param {string} name 事件名称
     * @param {object} data 传递的对象
     * @returns {void} 无返回
     */
    $dispatch: function (name, data) {
      let stopPropagation = this.$emit(name, data);
      if (!stopPropagation && this.$parent) {
        this.$parent.$dispatch(name, data);
      }
    },

    /**
     * 触发自身的一个事件并向下广播
     * @param {string} name 事件名称
     * @param {object} data 传递的对象
     * @returns {void} 无返回
     */
    $broadcast: function (name, data) {
      let stopPropagation = this.$emit(name, data);
      if (!stopPropagation && this.$children && this.$children.length > 0) {
        this.$children.forEach(function (child) {
          child.$broadcast(name, data);
        }, this);
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
        let index = this.$parent.$children.indexOf(this);
        this.$parent.$children.splice(index, 1);
      }
      this.$callHook('onDispose');
      if (this._compiled_) {
        this._template_.unbind();
      }
      this.$callHook('onDisposed');
      for (let key in this) {
        delete this[key];
      }
      ['_observer_', '$element', '$children', '$parent', '_template_']
        .forEach(function (key) {
          delete this[key];
        }, this);
      this.__proto__ = null;
    }

  });

  //保存类选项
  ComponentClass.$options = classOpts;
  ComponentClass.$template = utils.parseDom(classOpts.template)[0];
  if (ComponentClass.$template && ComponentClass.$template.normalize) {
    ComponentClass.$template.normalize();
  }

  //向 ComponentClass.prototype 上拷贝成员
  utils.copy(classOpts, ComponentClass.prototype);

  //使 ComponentClass instanceof Component === true
  ComponentClass.__proto__ = Component.prototype;

  return ComponentClass;

}

Component.prototype.__proto__ = EventEmitter.prototype;
utils.defineFreezeProp(Component, 'name', 'Component');

//组件扩展方法，简单封装 extends
Component.extend = function (classOpts) {
  return new Component(classOpts);
};

//定义扩展方法
Component.prototype.extend = function (classOpts) {
  classOpts = classOpts || utils.create(null);
  classOpts.extends = this;
  return new Component(classOpts);
};

//创建实例的方法
Component.prototype.create = function (instanceOpts) {
  return new this(instanceOpts);
};

//针对包括 element 组件类的启动方法
Component.prototype.start = function (instanceOpts) {
  if (!this.$options || !this.$options.element) {
    throw new Error('Start method cannot be called');
  }
  this.create(instanceOpts);
};

module.exports = Component;