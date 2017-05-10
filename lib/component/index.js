/*istanbul ignore next*/'use strict';

var Component = require('./component');
var components = require('./components');
var directives = require('../template').directives;

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