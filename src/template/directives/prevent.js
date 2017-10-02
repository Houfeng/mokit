import Directive from '../directive';
import { meta } from 'decorators';

@meta({
  level: Directive.levels.PREVENT,
  final: true
})
export default class PreventDirective extends Directive {
}