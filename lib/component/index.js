const Component = require('./component');
const components = require('./components');
const directives = require('../template').directives;

Component.components = components;
Component.Component = Component;

Component.component = function (name, component) {
  if (!component) return components[name];
  components[name] = component;
};

Component.directive = function (name, directive) {
  if (!directive) return directives[name];
  directives[name] = directive;
};

module.exports = Component;