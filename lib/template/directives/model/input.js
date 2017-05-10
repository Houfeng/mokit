/*istanbul ignore next*/'use strict';

var Directive = require('../../directive');
var EventEmitter = require('../../../events');
var Scope = require('../../scope');

module.exports = new Directive({

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function /*istanbul ignore next*/bind() {
    this.backExpr = new this.Expression( /*istanbul ignore next*/this.attribute.value + '=_value_');
    this.emiter = new EventEmitter(this.node);
    this.emiter.addListener('input', function () {
      if (this.utils.isNull(this.scope)) return;
      this.backExpr.execute(new Scope(this.scope, {
        _value_: this.node.value
      }));
    }.bind(this), false);
  },

  unbind: function /*istanbul ignore next*/unbind() {
    this.emiter.removeListener();
  },

  execute: function /*istanbul ignore next*/execute(scope) {
    var value = this.expression.execute(scope);
    if (this.node.value !== value) {
      this.node.value = value;
    }
  }

});