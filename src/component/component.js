import Template from '../template';
import Watcher from '../watcher';
import utils from 'ntils';
import EventEmitter from '../events';
import createDirective from './directive';
import { meta } from 'decorators';

const { directives } = Template;

/**
 * 组件类
 * 用于定义一个新的组件
 * @param {Object} classOpts 类选项
 * @returns {Component} 组件类
 */
@meta()
export default class Component extends EventEmitter {

  /**
   * 组件类构造函数
   * @param {object} options 实例选项
   * @returns {void} 无返回
   */
  constructor(options) {
    super();
    options = options || utils.create(null);
    utils.copy(options, this);
    this._processMeta_();
    let meta = this.meta;
    this.$setModel(meta.model);
    this._bindWatches_(meta.watches);
    this._bindDirectives_(meta.directives);
    this._bindComponents_(meta.components);
    this._bindComponents_({ 'self': this.constructor });
    this._bindEvents_(meta.events);
    utils.defineFreezeProp(this, '$children', []);
    if (options.parent) this.$setParent(options.parent);
    this.$emit('init');
    meta.element ? this.$mount() : this.$compile();
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
    utils.defineFreezeProp(child, '$parent', this);
    utils.defineFreezeProp(child, '$root', this.$root || this);
  }

  /**
   * 移除子组件
   * @param {Object} child 子组件
   * @returns {void} 无返回
   */
  $removeChild(child) {
    let index = this.$children.indexOf(child);
    this.$children.splice(index, 1);
    utils.defineFreezeProp(child, '$parent', null);
    //utils.defineFreezeProp(child, '$root', null);
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
    this.$components = this.$components || {};
    utils.each(components, (name, component) => {
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
    this.$directives = this.$directives || {};
    utils.each(directives, (name, directive) => {
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
    utils.each(events, (name, handlers) => {
      handlers.forEach(handler => {
        handler = utils.isFunction(handler) ?
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
    if (utils.isFunction(model)) {
      this.$model = model.call(this);
    } else {
      this.$model = model || {};
    }
    utils.each(this.$model, function (name) {
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
   * 为什么用 watches 而不是 watchers 或其它？
   * 因为，这里仅是「监控配置」并且是「复数」
   * @param {Object} watches 监控定义对象
   * @returns {void} 无返回
   */
  _bindWatches_(watches) {
    watches.forEach(item => {
      this.$watch(item.calcer, item.handler);
    });
  }

  /**
   * 在模板发生更新时
   * @returns {void} 无返回
   */
  _onTemplateUpdate_() {
    if (!this.$watchers) return;
    this.$watchers.forEach(watcher => {
      watcher.calc();
    });
  }

  /**
   * 添加一个监控
   * @param {string|function} calcer 计算函数或路径
   * @param {function} handler 处理函数
   * @returns {void} 无返回
   */
  $watch(calcer, handler) {
    this.$watchers = this.$watchers || [];
    let calcerFunc = utils.isFunction(calcer) ? calcer : () => {
      return utils.getByPath(this, calcer);
    };
    let handlerFunc = utils.isFunction(handler) ? handler :
      utils.getByPath(this, handler);
    let watcher = new Watcher(calcerFunc, handlerFunc.bind(this));
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
    if (!meta.element && utils.isString(meta.template)) {
      meta.template = utils.parseDom(meta.template);
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
    let element = meta.element || meta.template.cloneNode(true);
    utils.defineFreezeProp(this, '$element', element);
    if (!this.$element || this.$element.nodeName === '#text') {
      throw new Error('Invalid component template');
    }
    this.$emit('created');
  }

  /**
   * 编译自身模板并完成绑定
   * @returns {void} 无返回
   */
  $compile() {
    if (this._compiled_) return;
    this._compiled_ = true;
    this._createElement_();
    let template = new Template(this.$element, {
      directives: this.$directives,
      root: true
    });
    utils.defineFreezeProp(this, '$template', template);
    this.$template.bind(this);
    this.$template.on('update', this._onTemplateUpdate_.bind(this));
    this.$template.on('bind', () => {
      if (!this.deferReady) this.$emit('ready');
    });
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
    if (this.$element.parentNode) {
      this.$element.parentNode.removeChild(this.$element);
    }
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
    if (!stopPropagation && this.$children && this.$children.length > 0) {
      this.$children.forEach(function (child) {
        child.$broadcast(name, data);
      }, this);
    }
  }

  /**
   * 释放组件
   * @returns {void} 无返回
   */
  $dispose() {
    this.$remove();
    this._emitter_.off();
    this.$children.forEach(function (child) {
      child.$dispose();
    }, this);
    if (this.$parent) {
      let index = this.$parent.$children.indexOf(this);
      this.$parent.$children.splice(index, 1);
    }
    this.$emit('dispose');
    if (this._compiled_) {
      this.$template.unbind();
    }
    this.$emit('disposed');
    for (let key in this) {
      delete this[key];
    }
    ['_observer_', '$element', '$children', '$parent', '$template']
      .forEach(function (key) {
        delete this[key];
      }, this);
    utils.setPrototypeOf(this, null);
  }

}