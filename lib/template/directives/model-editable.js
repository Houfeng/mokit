const Directive = require('../directive');

module.exports = new Directive({
  name: 'model',
  type: Directive.TYPE_ATTRIBUTE,
  level: Directive.LEVEL_ATTRIBUTE,
  test: function (matchInfo) {
    return matchInfo.node.isContentEditable;
  },

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.bindPath = this.attribute.value;
    this.node.addEventListener('input', function () {
      if (this.utils.isNull(this.scope)) return;
      this.utils.setByPath(this.scope, this.bindPath, this.node.innerHTML);
    }.bind(this), false);
  },

  execute: function (scope) {
    var value = this.expression.execute(scope);
    if (this.node.innerHTML !== value) {
      this.node.innerHTML = value;
    }
  }

});