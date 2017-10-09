import Component from './component';
import { isNull, isFunction } from 'ntils';
import { Error } from 'common';

export default function bootstrap(component, mountNode, options) {
  if (!component || !component.meta) {
    throw new Error('Involid Component');
  }
  options = options || {};
  if (isNull(options.append)) options.append = true;
  if (isFunction(component)) {
    component = new component();
  }
  component.$mount(mountNode, options.append);
  return component;
};