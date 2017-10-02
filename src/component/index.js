import Component from './component';
import components from './components';
import { directives } from '../template';

Component.components = components;
Component.meta.components = components;
Component.Component = Component;

Component.component = function (name, component) {
  if (!component) return components[name];
  components[name] = component;
};

Component.directive = function (name, directive) {
  if (!directive) return directives[name];
  directives[name] = directive;
};

export default Component;