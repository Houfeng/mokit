const Template = require('../template');
const Watcher = require('../watcher');
const {
  isFunction, isString, each, final, getByPath
} = require('ntils');
const { Error, Entity, Node } = require('common');
const createDirective = require('./directive');
const { template } = require('decorators');

/**
 * 组件类
 * 用于定义一个新的组件
 * @param {Object} classOpts 类选项
 * @returns {Component} 组件类
 */
@template('<span>Error: Invaild template</span>')
class Component extends Entity {

  /**
   * 组件类构造函数
   * @param {object} options 实例选项
   * @returns {void} 无返回
   */
  constructor(options) {
    super();
    options = options || {};
    this._processMeta_();
    let meta = this.meta;
    this.$setModel(meta.model);
    this._bindWatches_(meta.watches);
    this._bindDirectives_(meta.directives);
    this._bindComponents_({
      ...Component.components,
      ...meta.components,
      'self': this.constructor
    });
    this._bindEvents_(meta.events);
    final(this, '$children', []);
    if (options.parent) {
      this.$setParent(options.parent);
    }
    this.$emit('beforeInit');
  }

  /**
   * 设定父组件
   * @param {Object} parent 父组件
   * @returns {void} 无返回
   */
  $setParent(parent) {
    if (this.$parent === parent) return;
    if (this.$parent) {
      this.$parent.$removeChild(this);
    }
    if (parent) {
      parent.$addChild(this);
    }
  }

  /**
   * 添加子组件
   * @param {Object} child 子组件
   * @returns {void} 无返回
   */
  $addChild(child) {
    if (!(child instanceof Component)) return;
    this.$children.push(child);
    child.$parent = this;
  }

  /**
   * 移除子组件
   * @param {Object} child 子组件
   * @returns {void} 无返回
   */
  $removeChild(child) {
    let index = this.$children.indexOf(child);
    this.$children.splice(index, 1);
    child.$parent = null;
  }

  /**
   * 获取根组件, 为了能通过 polyfill 处理 IE8 暂不用这种方式
   */
  get $root() {
    if (this.$parent) {
      return this.$parent.$root;
    } else {
      return this;
    }
  }

  /**
   * 导入用到的子组件类
   * @param {Object} components 引入的组件
   * @returns {void} 无返回
   */
  _bindComponents_(components) {
    if (!components) return;
    this.$components = this.$components || {};
    this.$directives = this.$directives || {};
    each(components, (name, component) => {
      if (!component) return;
      this.$components[name] = component;
      this.$directives[name] = createDirective({
        component: component,
        parent: this
      });
    });
  }

  /**
   * 导入一个用到的指令
   * @param {Object} directives 引入的指令
   * @returns {void} 无返回
   */
  _bindDirectives_(directives) {
    if (!directives) return;
    this.$directives = this.$directives || {};
    each(directives, (name, directive) => {
      if (!directive) return;
      this.$directives[name] = directive;
    });
  }

  /**
   * 调用生命周期 hook
   * @param {Array} events 调用 hook 的参数列表
   * @returns {void} 无反回
   */
  _bindEvents_(events) {
    each(events, (name, handlers) => {
      handlers.forEach(handler => {
        handler = isFunction(handler) ?
          handler : this[handler];
        this.$on(name, handler.bind(this));
      });
    });
  }

  /**
   * 创建数据对象
   * @param {Object} model 组件数据对象
   * @returns {void} 无返回
   */
  $setModel(model) {
    if (isFunction(model)) {
      this.$model = model.call(this);
    } else {
      this.$model = model || {};
    }
    each(this.$model, function (name) {
      Object.defineProperty(this, name, {
        configurable: true,
        enumerable: true,
        get() {
          if (!this.$model) return;
          return this.$model[name];
        },
        set(value) {
          if (!this.$model) return;
          this.$model[name] = value;
        }
      });
    }, this);
  }

  /**
   * 创建监控
   * @param {Object} watches 监控定义对象
   * @returns {void} 无返回
   */
  _bindWatches_(watches) {
    if (!watches) return;
    watches.forEach(item => {
      this.$watch(item.calcer, item.handler);
    });
  }

  /**
   * 在模板发生更新时计算所有 watcher
   * @returns {void} 无返回
   */
  _calcWatchers_() {
    if (!this.$watchers) return;
    this.$watchers.forEach(watcher => {
      watcher.calc();
    });
  }

  /**
   * 添加一个监控
   * @param {string|function} calculator 计算函数或路径
   * @param {function} handler 处理函数
   * @returns {void} 无返回
   */
  $watch(calculator, handler) {
    this.$watchers = this.$watchers || [];
    let calculatorFunc = isFunction(calculator) ? calculator : () => {
      return getByPath(this, calculator);
    };
    let handlerFunc = isFunction(handler) ? handler :
      getByPath(this, handler);
    let watcher = new Watcher(calculatorFunc, handlerFunc, this);
    this.$watchers.push(watcher);
    return watcher;
  }

  /**
   * 取消一个 watcher 对象
   * @param {object} watcher 监控对象实例
   * @returns {void} 无返回
   */
  $unWatch(watcher) {
    let index = this.$watchers.findIndex(w => w === watcher);
    this.$watchers.splice(index, 1);
  }

  _processMeta_() {
    let meta = this.meta;
    if (isString(meta.template)) {
      meta.template = Node.parse(meta.template);
    }
  }

  /**
   * 创建元素
   * @returns {void} 无返回
   */
  _createElement_() {
    if (this._created_) return;
    this._created_ = true;
    let meta = this.meta;
    this.$emit('create');
    let element = meta.template.cloneNode(true);
    if (!element || element.nodeName === '#text') {
      throw new Error('Invalid component template');
    }
    this.$element = element;
    final(this, '$node', new Node(element));
    this.$emit('created');
  }

  /**
   * 编译自身模板并完成绑定
   * @returns {void} 无返回
   */
  $compile() {
    if (this._compiled_) return;
    this._compiled_ = true;
    this.$emit('init');
    this._createElement_();
    let template = new Template(this.$element, {
      directives: this.$directives,
      root: true
    });
    template.on('update', () => {
      if (this._calcWatchers_) this._calcWatchers_();
    });
    template.on('bound', () => {
      this.$emit('ready');
    });
    template.bind(this);
    this.$template = template;
  }

  /**
   * 向 DOM tree 中挂截组件
   * @param {HTMLNode} mountNode 挂载点元素
   * @param {append} append 是否 append 到挂载元素内
   * @returns {void} 无返回 
   */
  $mount(mountNode, append) {
    if (this._mounted_) return;
    this.$compile();
    this.$emit('mount');
    if (append) {
      this.$node.appendTo(mountNode);
    } else {
      this.$node.insertBy(mountNode);
    }
    this._mounted_ = true;
    this._removed_ = false;
    this.$emit('mounted');
  }

  /**
   * 将组件添加到指定容器元素内
   * @param {HTMLNode} node 容器元素
   * @returns {void} 无返回 
   */
  $appendTo(node) {
    this.$mount(node, true);
  }

  /**
   * 移除组件
   * @returns {void} 无返回
   */
  $remove() {
    if (this._removed_ || !this._mounted_) return;
    this.$emit('remove');
    this.$node.remove();
    this._removed_ = true;
    this._mounted_ = false;
    this.$emit('removed');
  }

  /**
   * 触发自身的一个事件并向上冒泡
   * @param {string} name 事件名称
   * @param {object} data 传递的对象
   * @returns {void} 无返回
   */
  $dispatch(name, data) {
    let stopPropagation = this.$emit(name, data);
    if (!stopPropagation && this.$parent) {
      this.$parent.$dispatch(name, data);
    }
  }

  /**
   * 触发自身的一个事件并向下广播
   * @param {string} name 事件名称
   * @param {object} data 传递的对象
   * @returns {void} 无返回
   */
  $broadcast(name, data) {
    let stopPropagation = this.$emit(name, data);
    if (!stopPropagation && this.$children) {
      this.$children.forEach(function (child) {
        child.$broadcast(name, data);
      }, this);
    }
  }

  /**
   * 释放组件
   * @returns {void} 无返回
   */
  $destroy() {
    this.$emit('destroy');
    this.$remove();
    this.$children.forEach(function (child) {
      child.$destroy();
    }, this);
    if (this.$parent) {
      let index = this.$parent.$children.indexOf(this);
      this.$parent.$children.splice(index, 1);
    }
    if (this._compiled_) {
      this.$template.unbind();
    }
    this.$emit('destroyed');
    this._emitter_.off();
    for (let key in this) this[key] = null;
    this.$children.splice(0, this.$children.length);
    this.$parent = null;
    this.$template = null;
    this.$element = null;
  }

}

module.exports = Component;