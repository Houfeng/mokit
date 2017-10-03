import Directive from '../directive';

export default class FocusDirective extends Directive {
  execute(scope) {
    let state = this.expression.execute(scope);
    setTimeout(() => {
      if (state) this.node.focus();
      else this.node.blur();
    }, 0);
  }
}