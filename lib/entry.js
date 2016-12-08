const info = require('./info.json');
const entry = require('./index');

/* eslint-disable */
//兼容 amd 模块
if (typeof define !== 'undefined' && define.amd) {
  define(info.name, [], function () {
    return entry;
  });
}
//普通脚本引入
if (typeof window !== 'undefined') {
  window[info.name] = entry;
}
/* eslint-enable */