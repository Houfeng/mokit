import Directive from '../../directive';
import EventEmitter from '../../../events';
import Scope from '../../scope';

export default class RadioModelDirective extends Directive {

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind() {
    this.backExpr = new this.Expression(`${this.attribute.value}=_value_`);
    this.emiter = new EventEmitter(this.node);
    this.emiter.addListener('change', function () {
      if (this.utils.isNull(this.scope)) return;
      this.backExpr.execute(new Scope(this.scope, {
        _value_: this.node.value
      }));
    }.bind(this), false);
  }

  unbind() {
    this.emiter.removeListener();
  }

  execute(scope) {
    this.scope = scope;
    let value = this.expression.execute(scope);
    this.node.checked = value == this.node.value;
  }

}