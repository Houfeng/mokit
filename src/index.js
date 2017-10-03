import info from '$info';
import utils from 'ntils';
import bootstrap from './bootstrap';
import Watcher from './watcher';
import Observer from './observer';
import Template from './template';
import Component from './component';
import EventEmitter from './events';
import decorators from './decorators';
import common from 'common';

//持载模板相关对象
utils.copy(Template, bootstrap);
utils.copy(Component, bootstrap);
utils.copy(common, bootstrap);
utils.copy(decorators, bootstrap);
utils.copy(info, bootstrap);

bootstrap.Template = Template;
bootstrap.Component = Component;
bootstrap.Watcher = Watcher;
bootstrap.Observer = Observer;
bootstrap.EventEmitter = EventEmitter;
bootstrap.decorators = decorators;
bootstrap.utils = utils;
bootstrap.bootstrap = bootstrap;
bootstrap.common = common;

bootstrap.component = function (name, component) {
  if (!component) return this.components[name];
  this.components[name] = component;
};

bootstrap.directive = function (name, directive) {
  if (!directive) return this.directives[name];
  this.directives[name] = directive;
};

export default bootstrap;