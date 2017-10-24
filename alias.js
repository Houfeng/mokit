const pkg = require('./package.json');

module.exports = {
  [pkg.name]: require.resolve('./src'),
  common: require.resolve('./src/common'),
  component: require.resolve('./src/component'),
  decorators: require.resolve('./src/decorators'),
  events: require.resolve('./src/events'),
  observer: require.resolve('./src/observer'),
  template: require.resolve('./src/template'),
  watcher: require.resolve('./src/watcher')
};