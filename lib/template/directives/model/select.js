/*istanbul ignore next*/'use strict';

var Directive = require('../../directive');
var EventEmitter = require('../../../events');
var Scope = require('../../scope');

module.exports = new Directive({
  final: true,

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function /*istanbul ignore next*/bind() {
    this.backExpr = new this.Expression( /*istanbul ignore next*/this.attribute.value + '=_value_');
    this.node.removeAttribute(this.attribute.name);
    this._handler = this.compiler.compile(this.node);
    this.emiter = new EventEmitter(this.node);
    this.emiter.addListener('change', function () {
      if (this.utils.isNull(this.scope)) return;
      var selectedOptions = this.node.selectedOptions;
      var value = this.node.multiple ? [].slice.call(selectedOptions).map(function (option) {
        return option.value;
      }, this) : selectedOptions[0].value;
      this.backExpr.execute(new Scope(this.scope, {
        _value_: value
      }));
    }.bind(this), false);
  },

  unbind: function /*istanbul ignore next*/unbind() {
    this.emiter.removeListener();
  },

  execute: function /*istanbul ignore next*/execute(scope) {
    this.scope = scope;
    this._handler(scope);
    var value = this.expression.execute(scope);
    if (!this.utils.isArray(value)) value = [value];
    [].slice.call(this.node.options).forEach(function (option) {
      option.selected = value.indexOf(option.value) > -1;
    }, this);
  }

});