const Directive = require('../../directive');
const Scope = require('../../scope');
const { isNull } = require('ntils');

module.exports = class RadioModelDirective extends Directive {

  changeHandler = () => {
    if (isNull(this.scope)) return;
    this.backExpr(new Scope(this.scope, {
      $value: this.node.value
    }));
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
    this.node.checked = value == this.node.value;
  }

}