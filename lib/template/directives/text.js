const Directive = require('../directive');
const Expression = require('../expression');

const CLOAK_CLASS_NAME = 'cloak';

module.exports = new Directive({
  name: '#text',
  type: Directive.TYPE_ELEMENT,
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
    if (this.node.parentNode) {
      this.node.parentNode.removeAttribute(CLOAK_CLASS_NAME);
    }
  },

  execute: function (scope) {
    this.scope = scope;
    var newValue = this.expr.execute(scope);
    if (this.node.nodeValue !== newValue) {
      this.node.nodeValue = newValue;
    }
  }

});