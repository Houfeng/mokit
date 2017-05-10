/*istanbul ignore next*/'use strict';

var Directive = require('../directive');
var EventEmitter = require('../../events');
var Scope = require('../scope');

module.exports = new Directive({
  literal: true,

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function /*istanbul ignore next*/bind() {
    var attrValue = this.attribute.value || '';
    if (attrValue.indexOf('(') < 0 && attrValue.indexOf(')') < 0) {
      attrValue += '($event)';
    }
    this.expr = new this.Expression(attrValue);
    var eventTarget = this.node.$target || this.node;
    this.emiter = new EventEmitter(eventTarget);
    this.emiter.addListener(this.decorates[0], function (event) {
      if (this.utils.isNull(this.scope)) return;
      this.expr.execute(new Scope(this.scope, {
        $event: event
      }));
    }.bind(this), false);
  },

  unbind: function /*istanbul ignore next*/unbind() {
    this.emiter.removeListener();
  },

  execute: function /*istanbul ignore next*/execute(scope) {
    this.scope = scope;
  }

});