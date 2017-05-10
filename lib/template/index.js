/*istanbul ignore next*/'use strict';

var Compiler = require('./compiler');
var Directive = require('./directive');
var Expression = require('./expression');
var Template = require('./template');
var directives = require('./directives/');

Template.Template = Template;
Template.Compiler = Compiler;
Template.Directive = Directive;
Template.directives = directives;
Template.Expression = Expression;

module.exports = Template;