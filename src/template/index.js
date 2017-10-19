import Compiler from './compiler';
import Directive from './directive';
import expression from './expression';
import Template from './template';
import directives from './directives/';

Directive.directives = directives;

Template.Template = Template;
Template.Compiler = Compiler;
Template.Directive = Directive;
Template.directives = directives;
Template.expression = expression;

export default Template;