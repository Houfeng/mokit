const Directive = require('../directive');

module.exports = class PropDirective extends Directive {
  update(value) {
    this.node.setProperty(this.decorates[0], value);
  }
}