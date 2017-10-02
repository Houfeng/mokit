import info from '$info';
import utils from 'ntils';
import Watcher from './watcher';
import Observer from './observer';
import Template from './template';
import Component from './component';
import EventEmitter from './events';
import decorators from './decorators';

//持载模板相关对象
utils.copy(Template, Component);

Component.version = info.version;
Component.Template = Template;
Component.Watcher = Watcher;
Component.Observer = Observer;
Component.EventEmitter = EventEmitter;
Component.decorators = decorators;
Component.utils = utils;

module.exports = Component;