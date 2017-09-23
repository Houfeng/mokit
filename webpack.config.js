const VModule = require('vmodule-webpack-plugin');
const pkg = require('./package.json');

module.exports = function (webpackConf) {
  webpackConf.plugins.push(new VModule({
    name: '$info',
    content: { version: pkg.version }
  }));
  webpackConf.resolve = webpackConf.resolve || {};
  webpackConf.resolve.alias = webpackConf.resolve.alias || {};
  webpackConf.resolve.alias.mokit = require.resolve('./src');
};