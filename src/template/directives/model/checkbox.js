import Directive from '../../directive';
import Scope from '../../scope';
import { isNull, isArray } from 'ntils';

export default class CheckBoxModelDirective extends Directive {

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind() {
    this.backExpr = new this.Expression(`${this.attribute.value}=_value_`);
    this.node.emitter.addListener('change', () => {
      if (isNull(this.scope)) return;
      let value = this.expression.execute(this.scope);
      if (isArray(value) && this.node.checked) {
        value.push(this.node.value);
      } else if (isArray(value) && !this.node.checked) {
        let index = value.indexOf(this.node.value);
        value.splice(index, 1);
      } else {
        this.backExpr.execute(new Scope(this.scope, {
          _value_: this.node.checked
        }));
      }
    }, false);
  }

  unbind() {
    this.node.emitter.removeListener();
  }

  execute(scope) {
    this.scope = scope;
    let value = this.expression.execute(scope);
    if (isArray(value)) {
      this.node.checked = value.indexOf(this.node.value) > -1;
    } else {
      this.node.checked = value;
    }
  }

}