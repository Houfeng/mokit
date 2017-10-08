import Directive from '../directive';
import { cname } from 'common';

export default class ClassNameDirective extends Directive {
  update(value) {
    this.node.setAttribute('class', cname(value));
  }
}