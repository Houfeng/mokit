const VModule = require('vmodule-webpack-plugin');
const pkg = require('./package.json');
const alias = require('./alias');

module.exports = function (webpackConf, webpack) {
  let info = JSON.stringify({ name: pkg.name, version: pkg.version });
  webpackConf.plugins.push(new VModule({
    name: '$info',
    content: info
  }));
  webpackConf.resolve = webpackConf.resolve || {};
  webpackConf.resolve.alias = webpackConf.resolve.alias || {};
  Object.assign(webpackConf.resolve.alias, alias);
};