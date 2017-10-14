import Directive from '../../directive';
import EventEmitter from '../../../events';
import Scope from '../../scope';
import { meta } from 'decorators';
import { isArray, isNull } from 'ntils';

@meta({
  final: true
})
export default class SelectModelDirective extends Directive {

  changeHandler = () => {
    if (isNull(this.scope)) return;
    let selectedOptions = this.node.selectedOptions;
    let value = this.node.multiple
      ? [].slice.call(selectedOptions).map(function (option) {
        return option.value;
      }, this)
      : selectedOptions[0].value;
    this.backExpr.execute(new Scope(this.scope, {
      _value_: value
    }));
  };

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind() {
    this.changeHandler = this.changeHandler.bind(this);
    this.backExpr = new this.Expression(`${this.attribute.value}=_value_`);
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
    let value = this.expression.execute(scope);
    if (!isArray(value)) value = [value];
    [].slice.call(this.node.options).forEach(function (option) {
      option.selected = value.indexOf(option.value) > -1;
    }, this);
  }

}