const info = require('./info.json');
const utils = require('ntils');
const Watcher = require('./watcher');
const Observer = require('./observer');
const Template = require('./template');
const Component = require('./component');

Component.version = info.version;
Component.Template = Template;
Component.Watcher = Watcher;
Component.Observer = Observer;

//持载模板相关对象
utils.copy(Template, Component);

//安装插件的方法
Component.use = function (plugin) {
  if (utils.isNull(plugin) || !utils.isFunction(plugin.install)) {
    throw new Error('Invalid Plugin');
  }
  plugin.install(this);
};

//普通脚本引入
if (window) window[info.name] = Component;
//兼容 amd 模块
if (typeof define !== 'undefined' && define.amd) {
  define(info.name, [], function () {
    return Component;
  });
}

module.exports = Component;