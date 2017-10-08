import Directive from '../../directive';
import Scope from '../../scope';
import { isNull } from 'ntils';

export default class RadioModelDirective extends Directive {

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind() {
    this.backExpr = new this.Expression(`${this.attribute.value}=_value_`);
    this.node.emitter.addListener('change', () => {
      if (isNull(this.scope)) return;
      this.backExpr.execute(new Scope(this.scope, {
        _value_: this.node.value
      }));
    }, false);
  }

  unbind() {
    this.node.emitter.removeListener();
  }

  execute(scope) {
    this.scope = scope;
    let value = this.expression.execute(scope);
    this.node.checked = value == this.node.value;
  }

}