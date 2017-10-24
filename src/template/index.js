const Directive = require('./directive');
const Template = require('./template');
const directives = require('./directives/');

Directive.directives = directives;

Template.Directive = Directive;
Template.directives = directives;

module.exports = Template;