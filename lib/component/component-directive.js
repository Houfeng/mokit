const Class = require('cify');
const Template = require('../template');
const utils = Template.utils;
const Directive = Template.Directive;
const Expression = Template.Expression;

function ComponentDirective(options) {

  var Component = options.component;
  var parent = options.parent;

  return new Directive({
    name: options.name,
    type: Directive.TYPE_ELEMENT,
    literal: true,
    final: true,

    bind: function () {
      this.component = new Component({
        parent: options.parent
      });
      this.exprs = {};
      this.attrs = [].slice.call(this.node.attributes);
      this.attrs.forEach(function (attr) {
        if (attr.name in this.component.$properties) {
          this.exprs[attr.name] = new Expression(attr.value);
        } else {
          this.component.$element.setAttribute(attr.name, attr.value);
        }
      }, this);
      this.component.$mount(this.node);
      this.node.parentNode.removeChild(this.node);
    },
    execute: function (scope) {
      utils.each(this.exprs, function (name) {
        this.component[name] = this.exprs[name].execute(scope);
      }, this);
    }
  });
};

module.exports = ComponentDirective;