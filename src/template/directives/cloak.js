import Directive from '../directive';
import { meta } from 'decorators';

@meta({
  level: Directive.levels.CLOAK,
  literal: true,
  prefix: false,
})
export default class CloakDirective extends Directive {
  bind() {
    this.node.removeAttribute(this.attribute.name);
  }
}