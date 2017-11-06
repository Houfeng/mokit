const Directive = require('../directive');

module.exports = class FocusDirective extends Directive {
  execute(scope) {
    let state = this.expression(scope);
    setTimeout(() => {
      if (state) this.node.focus();
      else this.node.blur();
    }, 0);
  }
};