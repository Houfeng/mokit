const utils = require('ntils');

const Scope = function (parent, props) {
  let scope = utils.create(parent);
  utils.copy(props, scope);
  return scope;
};

module.exports = Scope;