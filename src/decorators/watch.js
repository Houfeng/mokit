const meta = require('./meta');

module.exports = function (calcer) {
  return function (target, handler) {
    meta()(target.constructor);
    target.meta.watches = target.meta.watches || [];
    target.meta.watches.push({ calcer, handler });
  };
}