const Directive = require('../directive');

module.exports = new Directive({
  name: 'prevent',
  type: Directive.TA,
  level: Directive.LP,
  final: true
});