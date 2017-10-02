import Template from '../template';
import { meta } from 'decorators';

const Directive = Template.Directive;

export default function (options) {

  /**
   * 创建一个组件指令
   * @param {object} options 选项
   * @returns {object} 组件指令
   */
  @meta({
    ...options,
    type: Directive.types.ELEMENT,
    literal: true,
    final: true,
    level: Directive.levels.ELEMENT
  })
  class ComponentDirective extends Directive {

    constructor(options) {
      super(options);
      let meta = this.meta;
      this.component = meta.component({
        deferReady: true,
        parent: meta.parent || meta.scope
      });
    }

    bind() {
      this.handleAttrs();
      this.node.$target = this.component;
      this.handler = this.compiler.compile(this.node, {
        element: false,
        children: false
      });
      this.handleContents();
      this.component.$mount(this.node);
      if (this.node.parentNode) {
        this.node.parentNode.removeChild(this.node);
      }
    }

    handleAttrs() {
      this.attrs = [].slice.call(this.node.attributes);
      let directiveRegexp = new RegExp('^' + this.prefix + ':', 'i');
      this.attrs.forEach(function (attr) {
        if (directiveRegexp.test(attr.name)) return;
        if (attr.name in this.component.$properties) return;
        this.component.$element.setAttribute(attr.name, attr.value);
        this.node.removeAttribute(attr.name);
      }, this);
    }

    handleContents() {
      this.placeHandlers = [];
      let places = [].slice.call(
        this.component.$element.querySelectorAll('[' + this.prefix + '\\:content]')
      );
      places.forEach(function (place) {
        //将内容插入到指定的「位置」
        let contents = null;
        let selector = place.getAttribute(this.prefix + ':content');
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
        let handler = this.compiler.compile(place);
        this.placeHandlers.push(handler);
      }, this);
    }

    execute(scope) {
      this.handler(scope);
      if (!this._ready_) {
        this._ready_ = true;
        this.component.$emit('ready');
      }
      this.placeHandlers.forEach(function (handler) {
        handler(scope);
      }, this);
    }

  }
  return ComponentDirective;
}