import Directive from '../directive';

export default class AttrDirective extends Directive {
  update(value) {
    this.node.setAttribute(this.decorates[0], value);
  }
}