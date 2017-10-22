import Directive from './directive';
import Template from './template';
import directives from './directives/';

Directive.directives = directives;

Template.Directive = Directive;
Template.directives = directives;

export default Template;