import Directive from '../directive';
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
    this.node.emitter.addListener(this.decorates[0], event => {
      if (isNull(this.scope)) return;
      this.expr.execute(new Scope(this.scope, {
        $event: event
      }));
    }, false);
  }

  unbind() {
    this.node.emitter.removeListener();
  }

  execute(scope) {
    this.scope = scope;
  }

}