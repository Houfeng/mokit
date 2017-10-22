import { copy, isFunction, toSplitCase } from 'ntils';
import info from '$info';
import bootstrap from './bootstrap';
import Template from './template';
import Component from './component';
import decorators from './decorators';
import config from '$config';
import Error from './common/error';

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

export * from './decorators';
export { Component, Directive, bootstrap, decorators, config }

window.mokit = bootstrap;
export default bootstrap;