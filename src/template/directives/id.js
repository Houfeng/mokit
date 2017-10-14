import Directive from '../directive';
import { meta } from 'decorators';
import { Error } from 'common';

@meta({
  literal: true
})
export default class IdDirective extends Directive {
  update(id) {
    this.scope[id] = this.node.target;
  }
}