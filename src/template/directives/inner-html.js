const Directive = require('../directive');

module.exports = class InnerHtmlDirective extends Directive {
  update(newValue) {
    this.node.innerHTML = newValue;
  }
};