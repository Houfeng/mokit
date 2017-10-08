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
      this.component = new meta.component({
        deferReady: true,
        parent: meta.parent || meta.scope
      });
    }

    bind() {
      this.handleAttrs();
      this.node.component = this.component;
      this.handler = this.compiler.compile(this.node, {
        element: false,
        children: false
      });
      this.component.$mount(this.node);
      this.handleContents();
      this.node.remove();
    }

    handleAttrs() {
      this.attrs = [].slice.call(this.node.attributes);
      let directiveRegexp = new RegExp('^' + this.prefix + ':', 'i');
      this.attrs.forEach(function (attr) {
        if (directiveRegexp.test(attr.name)) return;
        if (attr.name in this.component) return;
        this.component.$element.setAttribute(attr.name, attr.value);
        this.node.removeAttribute(attr.name);
      }, this);
    }

    handleContents() {
      this.placeHandlers = [];
      let placeNodes = this.component.$node
        .find('[' + this.prefix + '\\:content]');
      placeNodes.forEach(function (placeNode) {
        //将内容插入到指定的「位置」
        let contents = null;
        let selector = placeNode.getAttribute(this.prefix + ':content');
        contents = selector ? this.node.find(selector) : this.node.childNodes;
        if (!contents || contents.length < 1) return;
        placeNode.innerHTML = '';
        contents.forEach(function (content) {
          placeNode.appendChild(content.cloneNode(true));
        }, this);
        //编译插入后的子「内容模板」
        let handler = this.compiler.compile(placeNode);
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