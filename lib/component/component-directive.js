const Class = require('cify');
const Template = require('../template');
const utils = Template.utils;
const Directive = Template.Directive;
const Expression = Template.Expression;

/**
 * 创建一个组件指令
 * @param {object} options 选项
 */
function ComponentDirective(options) {

  var Component = options.component;
  var parent = options.parent;

  return new Directive({
    name: options.name,
    type: Directive.TYPE_ELEMENT,
    literal: true,
    final: true,
    level: Directive.LEVEL_ELEMENT,

    bind: function () {
      this.component = new Component({
        parent: options.parent
      });
      this.handleAttrs();
      this.handleContents();
      this.component.$mount(this.node);
      if (this.node.parentNode) {
        this.node.parentNode.removeChild(this.node);
      }
    },

    handleAttrs: function () {
      this.propExprs = {};
      this.attrs = [].slice.call(this.node.attributes);
      this.attrs.forEach(function (attr) {
        if (attr.name in this.component.$properties) {
          this.propExprs[attr.name] = new Expression(attr.value);
        } else {
          this.component.$element.setAttribute(attr.name, attr.value);
        }
      }, this);
    },

    handleContents: function () {
      this.placeHandlers = [];
      var places = [].slice.call(
        this.component.$element.querySelectorAll('[' + this.prefix + '\\:content]')
      );
      places.forEach(function (place) {
        //将内容插入到指定的「位置」
        var contents = null;
        var selector = place.getAttribute(this.prefix + ':content');
        if (!selector) {
          contents = [].slice.call(this.node.childNodes);
        } else {
          contents = [].slice.call(this.node.querySelectorAll(selector));
        }
        if (!contents || contents.length < 1) return;
        place.innerHTML = '';
        contents.forEach(function (content) {
          place.appendChild(content.cloneNode(true));
        }, this);
        //编译插入后的子「内容模板」
        var handler = this.compiler.compile(place);
        this.placeHandlers.push(handler);
      }, this);
    },

    execute: function (scope) {
      utils.each(this.propExprs, function (name) {
        this.component[name] = this.propExprs[name].execute(scope);
      }, this);
      this.placeHandlers.forEach(function (handler) {
        handler(scope);
      }, this);
    }
  });
};

module.exports = ComponentDirective;