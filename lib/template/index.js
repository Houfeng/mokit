const Compiler = require('./compiler');
const Directive = require('./directive');
const Expression = require('./expression');
const Observer = require('./observer');
const Template = require('./template');
const directives = require('./directives/');
const utils = require('ntils');

Template.Template = Template;
Template.Compiler = Compiler;
Template.Directive = Directive;
Template.directives = directives;
Template.Expression = Expression;
Template.Observer = Observer;
Template.utils = utils;

module.exports = Template;