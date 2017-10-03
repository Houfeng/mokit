import Directive from '../directive';
import { meta } from 'decorators';
import Error from 'common/error';

@meta({
  literal: true
})
export default class IdDirective extends Directive {
  update(id) {
    if (id in this.scope) {
      throw new Error('Conflicting component id `' + id + '`');
    }
    this.scope[id] = this.node.$target || this.node;
  }
}