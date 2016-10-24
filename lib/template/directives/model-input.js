const Directive = require('../directive');

module.exports = new Directive({
  name: 'model',
  type: Directive.TYPE_ATTRIBUTE,
  level: Directive.LEVEL_ATTRIBUTE,
  tag: /^(input|textarea)$/i,
  test: function (matchInfo) {
    var inputType = matchInfo.node.getAttribute('type');
    return inputType !== 'radio' && inputType !== 'checkbox';
  },

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.bindPath = this.attribute.value;
    this.node.addEventListener('input', function () {
      if (this.utils.isNull(this.scope)) return;
      this.utils.setByPath(this.scope, this.bindPath, this.node.value);
    }.bind(this), false);
  },

  update: function (newValue) {
    this.node.value = newValue;
  }

});