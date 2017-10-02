import Directive from '../directive';

export default class PropDirective extends Directive {
  update(value) {
    let target = this.node.$target || this.node;
    target[this.decorates[0]] = value;
  }
  // execute (scope) {
  //   this.scope = scope;
  //   let newValue = this.expression.execute(scope);
  //   let target = this.node.$target || this.node;
  //   target[this.decorates[0]] = newValue;
  // }
}