import Directive from '../directive';

export default class InnerHtmlDirective extends Directive {
  update(newValue) {
    this.node.innerHTML = newValue;
  }
}