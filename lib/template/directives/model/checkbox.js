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
    this.emiter.addListener('change', function () {
      if (this.utils.isNull(this.scope)) return;
      var value = this.expression.execute(this.scope);
      if (this.utils.isArray(value) && this.node.checked) {
        value.push(this.node.value);
      } else if (this.utils.isArray(value) && !this.node.checked) {
        var index = value.indexOf(this.node.value);
        value.splice(index, 1);
      } else {
        this.backExpr.execute(new Scope(this.scope, {
          _value_: this.node.checked
        }));
      }
    }.bind(this), false);
  },

  unbind: function /*istanbul ignore next*/unbind() {
    this.emiter.removeListener();
  },

  execute: function /*istanbul ignore next*/execute(scope) {
    this.scope = scope;
    var value = this.expression.execute(scope);
    if (this.utils.isArray(value)) {
      this.node.checked = value.indexOf(this.node.value) > -1;
    } else {
      this.node.checked = value;
    }
  }

});