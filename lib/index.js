const info = require('../.tmp/info.json');
const utils = require('ntils');
const Template = require('./template');
const Component = require('./component');
const Watcher = require('./watcher');
const App = require('./app');

App.version = info.version;
App.Component = Component;
App.Watcher = Watcher;
App.Template = Template;

//持载模板相关对象
utils.copy(Template, App);

//普通脚本引入
if (window) window[info.name] = App;
//amd 模块
if (typeof define !== 'undefined' && define.amd) {
  define(info.name, [], function () {
    return App;
  });
}
//commonjs 模块
module.exports = App;