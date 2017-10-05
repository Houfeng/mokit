import info from '$info';
import { copy, isFunction } from 'ntils';
import bootstrap from './bootstrap';
import Watcher from './watcher';
import Observer from './observer';
import Template from './template';
import Component from './component';
import EventEmitter from './events';
import decorators from './decorators';
import common from 'common';

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

bootstrap.registerComponent = function (name, component) {
  if (!component) return Component.components[name];
  Component.components[name] = isFunction(component) ?
    component : this.component(component);
};

bootstrap.registerDirective = function (name, directive) {
  if (!directive) return Template.directives[name];
  Directive.directives[name] = isFunction(directive) ?
    directive : this.directive(directive);
};

bootstrap.component = function (...args) {
  return Component.extend(...args);
};

bootstrap.directive = function (...args) {
  return Directive.extend(...args);
};

export * from './decorators';
export * from './common';

export {
  Template, Component, Directive, Watcher, Observer, EventEmitter,
  bootstrap, common
}
window.mokit = bootstrap;
export default bootstrap;