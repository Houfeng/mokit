import info from '$info';
import { copy, isFunction, toSplitCase } from 'ntils';
import bootstrap from './bootstrap';
import Watcher from './watcher';
import Observer from './observer';
import Template from './template';
import Component from './component';
import EventEmitter from './events';
import decorators from './decorators';
import common from 'common';
import config from '$config';

const Directive = Template.Directive;

//持载模板相关对象
copy(Template, bootstrap);
copy(Component, bootstrap);
copy(common, bootstrap);
copy(decorators, bootstrap);
copy(info, bootstrap);

bootstrap.Template = Template;
bootstrap.Component = Component;
bootstrap.Watcher = Watcher;
bootstrap.Observer = Observer;
bootstrap.EventEmitter = EventEmitter;
bootstrap.decorators = decorators;
bootstrap.bootstrap = bootstrap;
bootstrap.common = common;
bootstrap.config = config;

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
  if (!directive) return Template.directives[name];
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
export * from './common';

export {
  Template, Component, Directive, Watcher, Observer, EventEmitter,
  bootstrap, common, config
}
window.mokit = bootstrap;
export default bootstrap;