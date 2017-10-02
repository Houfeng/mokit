import Directive from '../directive';

export default class ShowDirective extends Directive {
  update(value) {
    this.node.style.display = value ? '' : 'none';
  }
}