import Directive from '../directive';

export default class AttrDirective extends Directive {
  update(value) {
    let target = this.node.$target || this.node;
    if (target.setAttribute) {
      target.setAttribute(this.decorates[0], value);
    } else {
      target[this.decorates[0]] = value;
    }
  }
}