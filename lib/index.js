const info = require('./info.json');
const utils = require('ntils');
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
Component.utils = utils;
Component.Router = Router;

//定义安装插件的方法
Component.use = function (plugin) {
  if (utils.isNull(plugin) || !utils.isFunction(plugin.install)) {
    throw new Error('Invalid Plugin');
  }
  plugin.install(this);
};

//安装内置的路由插件
Component.use(Router);

/* eslint-disable */

//兼容 amd 模块
if (typeof define !== 'undefined' && define.amd) {
  define(info.name, [], function () {
    return Component;
  });
}

//普通脚本引入
if (typeof window !== 'undefined') {
  window[info.name] = Component;
}

/* eslint-enable */

module.exports = Component;