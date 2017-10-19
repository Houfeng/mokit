import Directive from '../directive';
import { trim } from 'ntils';
import { meta } from 'decorators';

@meta({
  type: Directive.types.ELEMENT,
  prefix: false
})
export default class TextDirective extends Directive {

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind() {
    let nodeValue = trim(this.node.nodeValue);
    if (!nodeValue) return;
    this.node.nodeValue = '';
    this.contentExpr = this.parseExpr(nodeValue, true);
  }

  execute(scope) {
    if (!this.contentExpr) return;
    this.scope = scope;
    let newValue = this.contentExpr(scope);
    if (this.node.nodeValue !== newValue) {
      this.node.nodeValue = newValue;
    }
  }

}