/*istanbul ignore next*/'use strict';

var Directive = require('../../directive');
var Scope = require('../../scope');

module.exports = new Directive({

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function /*istanbul ignore next*/bind() {
    /*istanbul ignore next*/var _this = this;

    this.target = this.node.$target;
    this.backExpr = new this.Expression( /*istanbul ignore next*/this.attribute.value + '=_value_');
    this.bindProp = this.decorates[0];
    if (!this.target) {
      throw new Error( /*istanbul ignore next*/'Directive `model:' + this.bindProp + '` cannot be used on `' + this.node.tagName + '`');
    }
    this.watcher = this.target.$watch(this.bindProp, function (value) {
      if ( /*istanbul ignore next*/_this.utils.isNull( /*istanbul ignore next*/_this.scope)) return;
      /*istanbul ignore next*/_this.backExpr.execute(new Scope( /*istanbul ignore next*/_this.scope, {
        _value_: value
      }));
    });
  },

  unbind: function /*istanbul ignore next*/unbind() {
    this.target.$unWatch(this.watcher);
  },

  update: function /*istanbul ignore next*/update(value) {
    this.target[this.bindProp] = value;
  }

});