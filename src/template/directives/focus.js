const Directive = require('../directive');

module.exports = new Directive({
  execute: function (scope) {
    let state = this.expression.execute(scope);
    setTimeout(() => {
      if (state) this.node.focus();
      else this.node.blur();
    }, 0);
  }
});