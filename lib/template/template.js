/*istanbul ignore next*/'use strict';

var Class = require('cify');
var Observer = require('../observer');
var EventEmitter = require('../events');
var Compiler = require('./compiler');

/**
 * 模板类
 * 可能通过 element 作为参数，创建一个模板实例
 */
var Template = new Class({

  $extends: EventEmitter,

  /**
   * 构建一个模板板实例
   * @param {HTMLNode} element HTML 元素
   * @param {Object} options 选项
   * @returns {void} 无返回
   */
  constructor: function /*istanbul ignore next*/constructor(element, options) {
    options = options || {};
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
  update: function /*istanbul ignore next*/update() {
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
  _update: function /*istanbul ignore next*/_update() {
    if (!this._updateTimer || !this.observer) return;
    this.emit('update', this);
    this.render(this.observer.target);
    this._onBind();
  },

  /**
   * 在绑定成功时
   * @returns {void} 无返回
   */
  _onBind: function /*istanbul ignore next*/_onBind() {
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
  bind: function /*istanbul ignore next*/bind(scope, disableFirst) {
    if (!scope) return;
    this.unbind();
    this.observer = new Observer(scope, {
      root: this.options.root
    });
    scope.$self = scope;
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
  unbind: function /*istanbul ignore next*/unbind() {
    if (!this.observer) return;
    this.observer.removeListener('change', this.update);
    this.observer.clearReference();
    this.observer = null;
  },

  /**
   * 释放
   * @returns {void} 无返回
   */
  dispose: function /*istanbul ignore next*/dispose() {
    this.unbind();
    this.render.dispose();
  }

});

module.exports = Template;