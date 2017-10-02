import Directive from '../../directive';
import EventEmitter from '../../../events';
import Scope from '../../scope';

export default class CheckBoxModelDirective extends Directive {

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind() {
    this.backExpr = new this.Expression(`${this.attribute.value}=_value_`);
    this.emiter = new EventEmitter(this.node);
    this.emiter.addListener('change', function () {
      if (this.utils.isNull(this.scope)) return;
      let value = this.expression.execute(this.scope);
      if (this.utils.isArray(value) && this.node.checked) {
        value.push(this.node.value);
      } else if (this.utils.isArray(value) && !this.node.checked) {
        let index = value.indexOf(this.node.value);
        value.splice(index, 1);
      } else {
        this.backExpr.execute(new Scope(this.scope, {
          _value_: this.node.checked
        }));
      }
    }.bind(this), false);
  }

  unbind() {
    this.emiter.removeListener();
  }

  execute(scope) {
    this.scope = scope;
    let value = this.expression.execute(scope);
    if (this.utils.isArray(value)) {
      this.node.checked = value.indexOf(this.node.value) > -1;
    } else {
      this.node.checked = value;
    }
  }

}