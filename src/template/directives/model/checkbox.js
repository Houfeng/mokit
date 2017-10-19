import Directive from '../../directive';
import Scope from '../../scope';
import { isNull, isArray } from 'ntils';

export default class CheckBoxModelDirective extends Directive {

  changeHandler = () => {
    if (isNull(this.scope)) return;
    let value = this.expression(this.scope);
    if (isArray(value) && this.node.checked) {
      value.push(this.node.value);
    } else if (isArray(value) && !this.node.checked) {
      let index = value.indexOf(this.node.value);
      value.splice(index, 1);
    } else {
      this.backExpr(new Scope(this.scope, {
        $value: this.node.checked
      }));
    }
  };

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind() {
    this.backExpr = this.parseExpr(`$scope.${this.attribute.value}=$value`);
    this.node.emitter.addListener('change', this.changeHandler, false);
  }

  unbind() {
    this.node.emitter.removeListener('change', this.changeHandler);
  }

  execute(scope) {
    this.scope = scope;
    let value = this.expression(scope);
    if (isArray(value)) {
      this.node.checked = value.indexOf(this.node.value) > -1;
    } else {
      this.node.checked = value;
    }
  }

}