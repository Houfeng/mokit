import Directive from '../../directive';
import EventEmitter from '../../../events';
import Scope from '../../scope';
import { isNull } from 'ntils';

export default class InputModelDirective extends Directive {

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind() {
    this.backExpr = new this.Expression(`${this.attribute.value}=_value_`);
    this.emiter = new EventEmitter(this.node);
    this.emiter.addListener('input', function () {
      if (isNull(this.scope)) return;
      this.backExpr.execute(new Scope(this.scope, {
        _value_: this.node.value
      }));
    }.bind(this), false);
  }

  unbind() {
    this.emiter.removeListener();
  }

  execute(scope) {
    let value = this.expression.execute(scope);
    if (this.node.value !== value) {
      this.node.value = value;
    }
  }

}