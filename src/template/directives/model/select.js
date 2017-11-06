const Directive = require('../../directive');
const Scope = require('../../scope');
const { meta } = require('decorators');
const { isArray, isNull } = require('ntils');

@meta({
  final: true
})
class SelectModelDirective extends Directive {

  changeHandler = () => {
    if (isNull(this.scope)) return;
    let selectedOptions = this.node.selectedOptions;
    let value = this.node.multiple
      ? [].slice.call(selectedOptions).map(function (option) {
        return option.value;
      }, this)
      : selectedOptions[0].value;
    this.backExpr(new Scope(this.scope, {
      $value: value
    }));
  };

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind() {
    this.changeHandler = this.changeHandler.bind(this);
    this.backExpr = this.parseExpr(`$scope.${this.attribute.value}=$value`);
    this.node.removeAttribute(this.attribute.name);
    this._handler = this.compiler.compile(this.node);
    this.node.emitter.addListener('change', this.changeHandler, false);
  }

  unbind() {
    this.node.emitter.removeListener('change', this.changeHandler);
  }

  execute(scope) {
    this.scope = scope;
    this._handler(scope);
    let value = this.expression(scope);
    if (!isArray(value)) value = [value];
    [].slice.call(this.node.options).forEach(function (option) {
      option.selected = value.indexOf(option.value) > -1;
    }, this);
  }

}

module.exports = SelectModelDirective;