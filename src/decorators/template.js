const meta = require('./meta');
const Error = require('../common/error');

module.exports = function (template) {
  if (!template) {
    throw new Error('Invalid template');
  }
  return meta({ template });
}