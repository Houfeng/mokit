const Template = require('../template');
const Directive = Template.Directive;

/**
 * 创建一个组件指令
 * @param {object} options 选项
 * @returns {object} 组件指令
 */
function ComponentDirective(options) {

  let Component = options.component;
  let parent = options.parent;

  return new Directive({
    type: Directive.TE,
    literal: true,
    final: true,
    level: Directive.LE,

    bind: function () {
      this.component = new Component({
        deferReady: true,
        parent: options.parent || this.scope
      });
      this.node.$target = this.component;
      this.handler = this.compiler.compile(this.node, {
        element: false,
        children: false
      });
      this.handleAttrs();
      this.handleContents();
      this.component.$mount(this.node);
      if (this.node.parentNode) {
        this.node.parentNode.removeChild(this.node);
      }
    },

    handleId: function () {
      if (!parent) return;
      let idAttr = this.prefix + ':id';
      let id = this.node.getAttribute(idAttr);
      if (id in parent) throw new Error('Conflicting component id `' + id + '`');
      parent[id] = this.component;
      this.node.removeAttribute(idAttr);
    },

    handleAttrs: function () {
      this.propExprs = {};
      this.attrs = [].slice.call(this.node.attributes);
      let directiveRegexp = new RegExp('^' + this.prefix + ':', 'i');
      this.attrs.forEach(function (attr) {
        if (directiveRegexp.test(attr.name)) return;
        if (attr.name in this.component.$properties) {
          this.component[attr.name] = attr.value;
        } else {
          this.component.$element.setAttribute(attr.name, attr.value);
        }
      }, this);
    },

    handleContents: function () {
      this.placeHandlers = [];
      let places = [].slice.call(
        this.component.$element.querySelectorAll('[' + this.prefix + '\\:content]')
      );
      places.forEach(function (place) {
        //将内容插入到指定的「位置」
        let contents = null;
        let selector = place.getAttribute(this.prefix + ':content');
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
        let handler = this.compiler.compile(place);
        this.placeHandlers.push(handler);
      }, this);
    },

    execute: function (scope) {
      this.handler(scope);
      if (!this._ready) {
        this._ready = true;
        this.component.$callHook('onReady');
      }
      this.placeHandlers.forEach(function (handler) {
        handler(scope);
      }, this);
    }

  });
}

module.exports = ComponentDirective;