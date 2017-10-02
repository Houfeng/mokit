import Directive from '../../directive';
import EventEmitter from '../../../events';
import Scope from '../../scope';
import { meta } from 'decorators';

@meta({
  final: true
})
export default class SelectModelDirective extends Directive {

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind() {
    this.backExpr = new this.Expression(`${this.attribute.value}=_value_`);
    this.node.removeAttribute(this.attribute.name);
    this._handler = this.compiler.compile(this.node);
    this.emiter = new EventEmitter(this.node);
    this.emiter.addListener('change', function () {
      if (this.utils.isNull(this.scope)) return;
      let selectedOptions = this.node.selectedOptions;
      let value = this.node.multiple
        ? [].slice.call(selectedOptions).map(function (option) {
          return option.value;
        }, this)
        : selectedOptions[0].value;
      this.backExpr.execute(new Scope(this.scope, {
        _value_: value
      }));
    }.bind(this), false);
  }

  unbind() {
    this.emiter.removeListener();
  }

  execute(scope) {
    this.scope = scope;
    this._handler(scope);
    let value = this.expression.execute(scope);
    if (!this.utils.isArray(value)) value = [value];
    [].slice.call(this.node.options).forEach(function (option) {
      option.selected = value.indexOf(option.value) > -1;
    }, this);
  }

}