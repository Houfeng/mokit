const meta = require('./meta');

module.exports = function (name) {
  return function (target, handler) {
    meta()(target.constructor);
    target.meta.events = target.meta.events || {};
    target.meta.events[name] = target.meta.events[name] || [];
    target.meta.events[name].push(handler);
  };
}