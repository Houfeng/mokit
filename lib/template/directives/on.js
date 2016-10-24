const Directive = require('../directive');

module.exports = new Directive({
  name: 'on',
  type: Directive.TYPE_ATTRIBUTE,

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.node.addEventListener(this.decorates[0], function (event) {
      if (this.utils.isNull(this.scope)) return;
      var scope = this.utils.copy(this.scope);
      scope.event = scope.$event = event;
      this.expression.execute(scope);
    }.bind(this), false);
  },

  execute: function (scope) {
    this.scope = scope;
  }

});