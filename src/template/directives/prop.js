import Directive from '../directive';

export default class PropDirective extends Directive {
  update(value) {
    this.node.setProperty(this.decorates[0], value);
  }
}