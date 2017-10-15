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
    remove: false,
    level: Directive.levels.ELEMENT
  })
  class ComponentDirective extends Directive {

    constructor(options) {
      super(options);
    }

    /**
     * 初始化指令
     * @returns {void} 无返回
     */
    bind() {
      //创建挂载点并插入到对应位置
      this.mountNode = this.Node.create();
      this.mountNode.insertBy(this.node);
      //缓存 attributes
      this.attributes = [].slice.call(this.node.attributes);
      this.node.remove();
    }

    createComponent() {
      if (this.component) return false;
      let meta = this.meta;
      this.component = new meta.component({
        parent: meta.parent || meta.scope
      });
      this.node.component = this.component;
      this.attributeHandler = this.compiler.compile(this.node, {
        element: false,
        children: false,
        remove: false
      });
      this.component.$mount(this.mountNode);
      this.component.$template.sync = true;
      this.copyAttrbutes();
      this.compileContents();
      this.component.$node.on('removed', (event) => {
        if (!event || !event.destroy) return;
        this.component.$destroy();
        this.component = null;
        this.node.component = null;
      });
      return true;
    }

    copyAttrbutes() {
      let directiveRegExp = new RegExp('^' + this.prefix + ':', 'i');
      this.attributes.forEach(attr => {
        if (directiveRegExp.test(attr.name)) return;
        if (attr.name in this.component) return;
        this.component.$node.setAttribute(attr.name, attr.value);
      });
    }

    compileContents() {
      this.contentHandlers = [];
      let placeNodes = this.component.$node
        .find('[' + this.prefix + '\\:content]');
      placeNodes.forEach(function (placeNode) {
        //将内容插入到指定的「位置」
        let contentSelector = placeNode
          .getAttribute(this.prefix + ':content');
        let contentNodes = contentSelector ?
          this.node.find(contentSelector) : this.node.childNodes;
        if (!contentNodes || contentNodes.length < 1) return;
        placeNode.childNodes.forEach(
          childNode => childNode.remove()
        );
        contentNodes.forEach(
          contentNode => placeNode.appendChild(contentNode)
        );
        //编译插入后的子「内容模板」
        let contentHandler = this.compiler.compile(placeNode);
        this.contentHandlers.push(contentHandler);
      }, this);
    }

    execute(scope) {
      let isNew = this.createComponent();
      this.attributeHandler(scope, isNew);
      this.contentHandlers.forEach(contentHandler => contentHandler(scope));
      this.component.$template.sync = false;
    }

  }
  return ComponentDirective;
}