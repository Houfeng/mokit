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
    //创建挂载点并插入到对应位置
    this.mountNode = this.Node.create();
    this.mountNode.insertBy(this.node);
    //虽然，bind 完成后，也会进行 attribute 的移除，
    //但 if 指令必须先移除，否再进行 item 编译时 if 还会生效
    this.node.removeAttribute(this.attribute.name);
    //把 item 的 node 移除掉，还在内存中待用
    this.node.remove();
  }

  get itemNode() {
    if (this.node.component) {
      return this.node.component.$node;
    } else {
      return this.node;
    }
  }

  execute(scope, force) {
    let newValue = this.expression(scope);
    if (newValue) {
      //如果新计算的结果为 true 才执行 
      this._handler = this._handler || this.compiler.compile(this.node);
      this._handler(scope, force);
      //通过 parentNode 判断有没有添加，未添加到 dom 中时才添加，避免重复添加
      if (!this.itemNode.parentNode) {
        this.itemNode.insertBy(this.mountNode);
      }
    } else {
      this.itemNode.remove({ destroy: true });
    }
  }

}