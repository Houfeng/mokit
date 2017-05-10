/*istanbul ignore next*/'use strict';

var Directive = require('../directive');
var Expression = require('../expression');

module.exports = new Directive({
  type: Directive.TE,
  prefix: false,

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function /*istanbul ignore next*/bind() {
    this.expr = new Expression(this.node.nodeValue, true);
    this.node.nodeValue = '';
  },

  execute: function /*istanbul ignore next*/execute(scope) {
    this.scope = scope;
    var newValue = this.expr.execute(scope);
    if (this.node.nodeValue !== newValue) {
      this.node.nodeValue = newValue;
    }
  }

});