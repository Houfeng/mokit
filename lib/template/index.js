const Compiler = require('./compiler');
const Directive = require('./directive');
const Expression = require('./expression');
const Template = require('./template');
const directives = require('./directives/');

Template.Template = Template;
Template.Compiler = Compiler;
Template.Directive = Directive;
Template.directives = directives;
Template.Expression = Expression;

module.exports = Template;