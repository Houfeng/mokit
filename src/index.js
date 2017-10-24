const { copy, isFunction, toSplitCase } = require('ntils');
const info = require('$info');
const bootstrap = require('./bootstrap');
const Template = require('./template');
const Component = require('./component');
const decorators = require('./decorators');
const config = require('$config');
const Error = require('./common/error');

const Directive = Template.Directive;

Error.prefix = info.name;

bootstrap.Component = Component;
bootstrap.Directive = Directive;
bootstrap.decorators = decorators;
bootstrap.bootstrap = bootstrap;
bootstrap.config = config;

//持载模板相关对象
copy(decorators, bootstrap);
copy(info, bootstrap);

bootstrap.component = function (name, component) {
  name = toSplitCase(name);
  if (!component) return Component.components[name];
  component = isFunction(component) ?
    component : this.component(component);
  Component.components[name] = component;
  return component;
};

bootstrap.directive = function (name, directive) {
  name = toSplitCase(name);
  if (!directive) return Directive.directives[name];
  directive = isFunction(directive) ?
    directive : this.directive(directive);
  Directive.directives[name] = directive;
  return directive;
};

bootstrap.defineComponent = function (...args) {
  return Component.extend(...args);
};

bootstrap.defineDirective = function (...args) {
  return Directive.extend(...args);
};

module.exports = bootstrap;