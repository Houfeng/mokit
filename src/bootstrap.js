import Component from './component';
import utils from 'ntils';
import Error from './common/error';

export default function bootstrap(component, mountNode, options) {
  if (!component || !component.meta) {
    throw new Error('Involid Component');
  }
  options = options || utils.create(null);
  if (utils.isNull(options.append)) options.append = true;
  if (utils.isFunction(component)) {
    component = new component();
  }
  component.$mount(mountNode, options.append);
  return component;
};