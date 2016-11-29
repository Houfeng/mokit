const Class = require('cify');
const Template = require('../template');
const Watcher = require('../watcher');
const utils = require('ntils');
const EventEmitter = require('events');
const Observer = require('../observer');
const ComponentDirective = require('./component-directive');

const RESERVED_WORDS = [
  '$compile', '$data', '$dispose', '$element', '$mount', '$properties',
  '$remove', '$watch', '_callHook', '_compiled', '_createData', '_createProperties',
  '_createWatches', '_extends', '_mounted', '_observer', '_onTemplateUpdate',
  '_removed', '_template', '_watchers', '$children', '$parent', '_directives',
  '_importComponents', '$nextTick'
];

/**
 * 组件类
 * 用于定义一个新的组件
 */
const Component = function (classOpts) {

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

    //通过 cify 定义为一个「类」，并指定「父类」或「原型」
    _extends: classOpts.extends,

    /**
     * 组件类构造函数
     * @returns {void} 无返回
     */
    constructor: function (instanceOpts) {
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
      mountNode._targetNode = this.$element;
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
     * 释放组件
     * @returns {void} 无返回
     */
    $dispose: function () {
      this.$remove();
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

};

//组件扩展方法，简单封装 extends
Component.extend = function (classOpts) {
  classOpts = classOpts || Object.create(null);
  return new Component(classOpts);
};

Component.prototype.__proto__ = EventEmitter.prototype;

module.exports = Component;