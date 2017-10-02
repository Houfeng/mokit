const VModule = require('vmodule-webpack-plugin');
const pkg = require('./package.json');

module.exports = function (webpackConf) {
  webpackConf.plugins.push(new VModule({
    name: '$info',
    content: { version: pkg.version }
  }));
  webpackConf.resolve = webpackConf.resolve || {};
  webpackConf.resolve.alias = webpackConf.resolve.alias || {};
  Object.assign(webpackConf.resolve.alias, {
    [pkg.name]: require.resolve('./src'),
    component: require.resolve('./src/component'),
    decorators: require.resolve('./src/decorators'),
    events: require.resolve('./src/events'),
    observer: require.resolve('./src/observer'),
    template: require.resolve('./src/template'),
    watcher: require.resolve('./src/watcher')
  });
};