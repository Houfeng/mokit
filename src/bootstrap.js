const Component = require('./component');
const { isNull, isFunction } = require('ntils');
const Error = require('./common/error');

module.exports = function (component, mountNode, options) {
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