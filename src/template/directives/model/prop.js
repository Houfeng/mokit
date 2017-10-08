import Directive from '../../directive';
import Scope from '../../scope';
import { Error } from 'common';
import { isNull } from 'ntils';

export default class PropModelDirective extends Directive {

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind() {
    this.component = this.node.component;
    this.backExpr = new this.Expression(`${this.attribute.value}=_value_`);
    this.bindProp = this.decorates[0];
    if (!this.component) {
      throw new Error(
        `Directive \`model:${this.bindProp}\` cannot be used on \`${this.node.tagName}\``
      );
    }
    this.watcher = this.component.$watch(this.bindProp, (value) => {
      if (isNull(this.scope)) return;
      this.backExpr.execute(new Scope(this.scope, {
        _value_: value
      }));
    });
  }

  unbind() {
    this.component.$unWatch(this.watcher);
  }

  update(value) {
    this.component[this.bindProp] = value;
  }

}