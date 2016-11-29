const info = require('./info.json');
const utils = require('ntils');
const Template = require('./template');
const Component = require('./component');

Component.version = info.version;
Component.Template = Template;

//持载模板相关对象
utils.copy(Template, Component);

//普通脚本引入
if (window) window[info.name] = Component;
//兼容 amd 模块
if (typeof define !== 'undefined' && define.amd) {
  define(info.name, [], function () {
    return Component;
  });
}

module.exports = Component;