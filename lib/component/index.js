const Component = require('./component');
const components = require('./components');

Component.components = components;
Component.Component = Component;

Component.component = function (name, component) {
  if (!component) return components[name];
  components[name] = component;
};

module.exports = Component;