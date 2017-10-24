const Directive = require('../directive');
const { meta } = require('decorators');

@meta({
  level: Directive.levels.PREVENT,
  final: true
})
class PreventDirective extends Directive {
}

module.exports = PreventDirective;