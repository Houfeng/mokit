import Directive from '../directive';
import EventEmitter from '../../events';
import Scope from '../scope';
import { meta } from 'decorators';
import { isNull } from 'ntils';

@meta({
  literal: true
})
export default class OnDirective extends Directive {

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind() {
    let attrValue = this.attribute.value || '';
    if (attrValue.indexOf('(') < 0 && attrValue.indexOf(')') < 0) {
      attrValue += '($event)';
    }
    this.expr = new this.Expression(attrValue);
    let eventTarget = this.node.$target || this.node;
    this.emiter = new EventEmitter(eventTarget);
    this.emiter.addListener(this.decorates[0], function (event) {
      if (isNull(this.scope)) return;
      this.expr.execute(new Scope(this.scope, {
        $event: event
      }));
    }.bind(this), false);
  }

  unbind() {
    this.emiter.removeListener();
  }

  execute(scope) {
    this.scope = scope;
  }

}