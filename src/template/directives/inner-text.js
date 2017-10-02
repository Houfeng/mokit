import Directive from '../directive';

export default class InnerTextDirective extends Directive {
  update(newValue) {
    this.node.innerText = newValue;
  }
}