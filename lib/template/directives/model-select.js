const Directive = require('../directive');
const EventEmitter = require('../../events');

module.exports = new Directive({
  name: 'model',
  type: Directive.TYPE_ATTRIBUTE,
  level: Directive.LEVEL_ATTRIBUTE,
  final: true,
  tag: 'select',

  /**
   * 初始化指令
   * @returns {void} 无返回
   */
  bind: function () {
    this.bindPath = this.attribute.value;
    this.node.removeAttribute(this.attribute.name);
    this._handler = this.compiler.compile(this.node);
    this.emiter = new EventEmitter(this.node);
    this.emiter.addListener('change', function () {
      if (this.utils.isNull(this.scope)) return;
      var selectedOptions = this.node.selectedOptions;
      var value = this.node.multiple
        ? [].slice.call(selectedOptions).map(function (option) {
          return option.value;
        }, this)
        : selectedOptions[0].value;
      this.utils.setByPath(this.scope, this.bindPath, value);
    }.bind(this), false);
  },

  unbind: function () {
    this.emiter.removeListener();
  },

  execute: function (scope) {
    this.scope = scope;
    this._handler(scope);
    var value = this.expression.execute(scope);
    if (!this.utils.isArray(value)) value = [value];
    [].slice.call(this.node.options).forEach(function (option) {
      option.selected = value.indexOf(option.value) > -1;
    }, this);
  }

});