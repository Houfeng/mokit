/*istanbul ignore next*/'use strict';

var info = require('../info.json');
var utils = require('ntils');
var Class = require('cify');
var Watcher = require('./watcher');
var Observer = require('./observer');
var Template = require('./template');
var Component = require('./component');
var EventEmitter = require('./events');

//持载模板相关对象
utils.copy(Template, Component);

Component.version = info.version;
Component.Template = Template;
Component.Watcher = Watcher;
Component.Observer = Observer;
Component.EventEmitter = EventEmitter;
Component.utils = utils;
Component.Class = Class;

//定义安装插件的方法
Component.use = function (plugin) {
  var install = plugin.install || plugin;
  if (!utils.isFunction(install)) {
    throw new Error('Invalid Plugin');
  }
  return install.call(plugin, this);
};

//安装内置的路由插件
//Component.use(Router);

module.exports = Component;