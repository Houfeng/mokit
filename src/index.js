import info from '$info';
import { copy } from 'ntils';
import bootstrap from './bootstrap';
import Watcher from './watcher';
import Observer from './observer';
import Template from './template';
import Component from './component';
import EventEmitter from './events';
import decorators from './decorators';
import common from 'common';

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

bootstrap.component = function (name, component) {
  if (!component) return Component.components[name];
  Component.components[name] = component;
};

bootstrap.directive = function (name, directive) {
  if (!directive) return Template.directives[name];
  Template.directives[name] = directive;
};

export default bootstrap;