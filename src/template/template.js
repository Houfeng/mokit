import Observer from '../observer';
import EventEmitter from '../events';
import Compiler from './compiler';
import config from '$config';

/**
 * 模板类
 * 可能通过 element 作为参数，创建一个模板实例
 */
export default class Template extends EventEmitter {

  /**
   * 构建一个模板板实例
   * @param {HTMLNode} element HTML 元素
   * @param {Object} options 选项
   * @returns {void} 无返回
   */
  constructor(element, options) {
    super();
    options = options || {};
    this.options = options;
    this.element = element;
    this.compiler = options.compiler || new Compiler(options);
    this.render = this.compiler.compile(this.element);
    this.requestUpdate = this.requestUpdate.bind(this);
    this._updateTimer = 0;
  }

  /**
   * 更新当前模板 (会过滤不必要的更新)
   * @returns {void} 无返回
   */
  requestUpdate() {
    if (config.debug || this.sync) {
      return this.update();
    }
    if (this._updateTimer) {
      clearTimeout(this._updateTimer);
      this._updateTimer = 0;
    }
    this._updateTimer = setTimeout(() => {
      if (this._updateTimer) this.update();
    }, 0);
  }

  /**
   * 更新当前模板内部方法 
   * @returns {void} 无返回
   */
  update() {
    if (!this.observer || !this.observer.target) return;
    this.$emit('update', this);
    this.render(this.observer.target);
    this.$emit('updated', this);
  }

  /**
   * 将模板绑定到一个 scope
   * @param {Object} scope 绑定的上下文对象
   * @returns {void} 无返回
   */
  bind(scope) {
    if (!scope) return;
    this.unbind();
    this.$emit('bind', this);
    this.observer = new Observer(scope, {
      root: this.options.root
    });
    scope.$self = scope;
    this.observer.on('change', this.requestUpdate);
    this.update();
    this.$emit('bound', this);
  }

  /**
   * 解绑定
   * @returns {void} 无返回
   */
  unbind() {
    if (!this.observer) return;
    this.observer.removeListener('change', this.requestUpdate);
    this.observer.clearReference();
    this.observer = null;
    this.render.unbind();
    delete this.observer;
  }

}