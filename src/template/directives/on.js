import Directive from '../directive';
import Scope from '../scope';
import { meta } from 'decorators';
import { isNull } from 'ntils';

@meta({
  literal: true
})
export default class OnDirective extends Directive {

  eventHandler = (event) => {
    if (isNull(this.scope)) return;
    this.eventExpr(new Scope(this.scope, {
      $event: event
    }));
  };

  bindEvent = () => {
    this.node.emitter.addListener(
      this.eventName, this.eventHandler, false
    );
  };

  unindEvent = () => {
    this.node.emitter.removeListener(
      this.eventName, this.eventHandler
    );
  };

  compileExpr() {
    let attrValue = this.attribute.value || '';
    if (attrValue.indexOf('(') < 0 && attrValue.indexOf(')') < 0) {
      attrValue += '($event)';
    }
    return this.parseExpr(attrValue);
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