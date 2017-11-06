const Error = require('../common/error');

module.exports = function (options) {
  return function (target) {
    if (!target || !target.setMeta) {
      throw new Error('Invaild Entity');
    }
    target.setMeta(options);
  };
};