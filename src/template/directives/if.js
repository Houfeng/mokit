import Directive from '../directive';
import { meta } from '../../decorators';

@meta({
  level: Directive.levels.STATEMENT,
  final: true,
})
export default class IfDirective extends Directive {

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind() {
    this.mountNode = document.createTextNode('');
    this.node.parentNode.insertBefore(this.mountNode, this.node);
    //虽然，bind 完成后，也会进行 attribute 的移除，
    //但 if 指令必须先移除，否再进行 item 编译时 if 还会生效
    this.node.removeAttribute(this.attribute.name);
    this.node.parentNode.removeChild(this.node);
  }

  execute(scope) {
    let newValue = this.expression.execute(scope);
    if (newValue) {
      //如果新计算的结果为 true 才执行 
      this._handler = this._handler || this.compiler.compile(this.node);
      this._handler(scope);
      let node = this.node.$substitute || this.node;
      if (!node.parentNode) {
        this.mountNode.parentNode.insertBefore(node, this.mountNode);
      }
    } else {
      let node = this.node.$substitute || this.node;
      if (node.parentNode) node.parentNode.removeChild(node);
    }
  }

}