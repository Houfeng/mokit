const Directive = require('../directive');
const Expression = require('../expression');


module.exports = new Directive({
  name: '#text',
  type: Directive.TE,
  prefix: false,
  test: function (matchInfo) {
    return matchInfo.node.nodeValue.trim().length > 4;
  },

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.expr = new Expression(this.node.nodeValue, true);
    this.node.nodeValue = '';
  },

  execute: function (scope) {
    this.scope = scope;
    let newValue = this.expr.execute(scope);
    if (this.node.nodeValue !== newValue) {
      this.node.nodeValue = newValue;
    }
  }

});