const Class = require('cify');
const Template = require('../template');
const Watcher = require('../watcher');
const utils = Template.utils;
const EventEmitter = require('events');
const Observer = Template.Observer;

/**
 * 组件类
 * 用于定义一个新的组件
 */
const Component = function (options) {

  //参数检查
  if (!options || !options.template) {
    throw new Error('Invalid component options');
  }

  //处理继承
  options.extends = options.extends || Component;
  if (utils.isFunction(options.extends)) {
    options.extends = options.extends.prototype;
  }
  options.__proto__ = options.extends;

  /**
   * 定义组件类
   * 可以通过 new ComponentClass() 创建组件实例
   */
  var ComponentClass = new Class({

    //通过 cify 定义为一个「类」，将 _extends 指向 componentProto
    _extends: Object.create(options.extends),

    /**
     * 组件类构造函数
     * @returns {void} 无返回
     */
    constructor: function () {
      this._onTemplateUpdate = this._onTemplateUpdate.bind(this);
      this._onScopeUpdate = this._onScopeUpdate.bind(this);
      this._createData(options.data);
      this._createProperties(options.properties);
      this._createWatches(options.watches);
      this._callHook('onInit');
      this._observer = Observer.observe(this);
      this._observer.on('change', this._onScopeUpdate);
    },

    /**
     * 调用生命周期 hook
     * @param {string} name 调用的 hook 名称
     * @param {Array} args 调用 hook 的参数列表
     * @returns {void} 无反回
     */
    _callHook: function (name, args) {
      if (!utils.isFunction(options[name])) return;
      options[name].apply(this, args);
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
      var isArray = utils.isArray(properties);
      this.$properties = [];
      utils.each(properties, function (name, descriptor) {
        if (!utils.isObject(descriptor) && isArray) {
          descriptor = { name: descriptor, value: null };
        } else if (!utils.isObject(descriptor) && !isArray) {
          descriptor = { value: descriptor };
        }
        descriptor.name = isArray ? descriptor.name : name;
        descriptor.configurable = true;
        descriptor.enumerable = true;
        if ('value' in descriptor) {
          descriptor.writable = utils.isNull(descriptor.writable) ?
            true : descriptor.writable;
        } else if (descriptor.set) {
          var set = descriptor.set;
          descriptor.set = function (value) {
            if (this._disposed) return;
            this._onScopeUpdate({ path: name, value: value });
            set.call(this, value);
          };
        }
        Object.defineProperty(this, descriptor.name, descriptor);
        this.$properties.push(descriptor);
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
     * 在 scope 发生更新时
     * @param {Object} event 事件对象
     * @returns {void} 无返回
     */
    _onScopeUpdate: function (event) {
      if (!this.$properties) return;
      this.$properties.forEach(function (descriptor) {
        if (event.path !== descriptor.name) return;
        if (descriptor.test && descriptor.test(event.value) === false) {
          var err = new Error('Invalid value `' + event.value + '` for property `' + descriptor.name + '`');
          this.$dispose();
          throw err;
        }
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
      utils.defineFreezeProp(this, '$element', utils.parseDom(options.template)[0]);
      if (!this.$element || this.$element.nodeName === '#text') {
        throw new Error('Invalid component template');
      }
      this._callHook('onCreated');
      utils.defineFreezeProp(this, '_template', new Template(this.$element));
      this._template.bind(this);
      this._template.on('update', this._onTemplateUpdate);
      this._callHook('onReady');
    },

    /**
     * 向 DOM tree 中挂截组件
     * @param {HTMLNode} mountNode 挂载点元素
     * @returns 无返回 
     */
    $mount: function (mountNode) {
      this.$compile();
      if (this._mounted) return;
      this._callHook('onMount');
      mountNode.parentNode.insertBefore(this.$element, mountNode);
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
      this.$element.parentNode.removeChild(this.$element);
      this._removed = true;
      this._callHook('onRemoved');
    },

    /**
     * 释放组件
     * @returns {void} 无返回
     */
    $dispose: function () {
      this.$remove();
      this._callHook('onDispose');
      this._observer.removeListener('change', this._onScopeUpdate);
      if (this._compiled) {
        this._template.unbind();
      }
      this._callHook('onDisposed');
      for (name in this) {
        this[name] = null;
        delete this[name];
      }
      this._disposed = true;
    }

  });

  //使 ComponentClass instanceof Component === true
  ComponentClass.__proto__ = Component.prototype;
  return ComponentClass;

};

//组件扩展方法，简单封装 extends
Component.extend = function (options) {
  options.extends = this;
  return new Component(options);
};

module.exports = Component;