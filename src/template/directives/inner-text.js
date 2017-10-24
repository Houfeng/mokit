const Directive = require('../directive');

module.exports = class InnerTextDirective extends Directive {
  update(newValue) {
    this.node.innerText = newValue;
  }
}