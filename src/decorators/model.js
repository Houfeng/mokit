const meta = require('./meta');

module.exports = function (target, prop) {
  if (!prop) {
    return meta({ model: target });
  } else {
    return meta({
      model: function () {
        return this[prop]();
      }
    })(target.constructor);
  }
};