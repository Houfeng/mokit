import Directive from '../directive';
import Scope from '../scope';
import { meta } from 'decorators';
import { isNull } from 'ntils';

@meta({
  literal: true
})
export default class OnDirective extends Directive {

  eventHandler = () => {
    if (isNull(this.scope)) return;
    this.eventExpr.execute(new Scope(this.scope, {
      $event: event
    }));
  };

  bindEvent = (event) => {
    this.node.emitter.addListener(
      this.eventName, this.eventHandler, false
    );
  };

  unindEvent = (event) => {
    this.node.emitter.removeListener(
      this.eventName, this.eventHandler
    );
  };

  compileExpr() {
    let attrValue = this.attribute.value || '';
    if (attrValue.indexOf('(') < 0 && attrValue.indexOf(')') < 0) {
      attrValue += '($event)';
    }
    return new this.Expression(attrValue);
  }

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind() {
    this.eventExpr = this.compileExpr();
    this.eventName = this.decorates[0];
    this.bindEvent();
  }

  unbind() {
    this.unindEvent();
  }

  execute(scope) {
    this.scope = scope;
  }

}