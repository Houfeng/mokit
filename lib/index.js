const info = require('./info.json');
const utils = require('ntils');
const Class = require('cify');
const Watcher = require('./watcher');
const Observer = require('./observer');
const Template = require('./template');
const Component = require('./component');
const EventEmitter = require('./events');
const Router = require('./router');

//持载模板相关对象
utils.copy(Template, Component);

Component.version = info.version;
Component.Template = Template;
Component.Watcher = Watcher;
Component.Observer = Observer;
Component.EventEmitter = EventEmitter;
Component.Router = Router;
Component.utils = utils;
Component.Class = Class;

//定义安装插件的方法
Component.use = function (plugin) {
  if (utils.isNull(plugin) || !utils.isFunction(plugin.install)) {
    throw new Error('Invalid Plugin');
  }
  plugin.install(this);
};

//安装内置的路由插件
Component.use(Router);

module.exports = Component;