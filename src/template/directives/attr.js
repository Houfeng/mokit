const Directive = require('../directive');

module.exports = class AttrDirective extends Directive {
  update(value) {
    this.node.setAttribute(this.decorates[0], value);
  }
}