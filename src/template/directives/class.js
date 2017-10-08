import Directive from '../directive';
import { cname } from 'common';

export default class ClassNameDirective extends Directive {
  update(value) {
    let names = cname(value);
    if (names) {
      this.node.setAttribute('class', names);
    } else {
      this.node.removeAttribute('class');
    }
  }
}