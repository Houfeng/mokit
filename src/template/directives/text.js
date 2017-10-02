import Directive from '../directive';
import Expression from '../expression';
import utils from 'ntils';
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
    let nodeValue = utils.trim(this.node.nodeValue);
    if (!nodeValue) return;
    this.node.nodeValue = '';
    this.expr = new Expression(nodeValue, true);
  }

  execute(scope) {
    if (!this.expr) return;
    this.scope = scope;
    let newValue = this.expr.execute(scope);
    if (this.node.nodeValue !== newValue) {
      this.node.nodeValue = newValue;
    }
  }

}