const VModule = require('vmodule-webpack-plugin');
const pkg = require('./package.json');

module.exports = function (webpackConf, webpack) {
  let info = { name: pkg.name, version: pkg.version };
  webpackConf.plugins.push(new VModule({
    name: '$info',
    type: 'js',
    content: `export default ${JSON.stringify(info)}`
  }));
  webpackConf.resolve = webpackConf.resolve || {};
  webpackConf.resolve.alias = webpackConf.resolve.alias || {};
  Object.assign(webpackConf.resolve.alias, {
    [pkg.name]: require.resolve('./src'),
    ntils: require.resolve('ntils/src/utils'),
    common: require.resolve('./src/common'),
    component: require.resolve('./src/component'),
    decorators: require.resolve('./src/decorators'),
    events: require.resolve('./src/events'),
    observer: require.resolve('./src/observer'),
    template: require.resolve('./src/template'),
    watcher: require.resolve('./src/watcher')
  });
  webpackConf.plugins.unshift(
    new webpack.optimize.ModuleConcatenationPlugin()
  );
};