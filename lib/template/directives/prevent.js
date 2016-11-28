const Directive = require('../directive');

module.exports = new Directive({
  name: 'prevent',
  type: Directive.TYPE_ATTRIBUTE,
  level: Directive.LEVEL_PREVENT,
  final: true
});