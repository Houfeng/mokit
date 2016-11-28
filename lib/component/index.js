const Component = require('./component');
const Watcher = require('./watcher');
const components = require('./components');

Component.Watcher = Watcher;
Component.components = components;
Component.Component = Component;

Component.component = function (name, component) {
  if (!component) return components[name];
  components[name] = component;
};

module.exports = Component;