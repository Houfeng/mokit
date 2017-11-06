const Directive = require('../directive');

module.exports = class ShowDirective extends Directive {
  update(value) {
    this.node.style.display = value ? '' : 'none';
  }
};