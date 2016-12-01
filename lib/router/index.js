const utils = require('ntils');
const Class = require('cify');
const RouterBase = require('./router');
const HashDirver = require('./drivers/hash');
const RouterView = require('./router-view');
const LinkDirective = require('./link-directive');
const Component = require('../component');

const Router = new Class({
  $name: 'Router',
  $extends: RouterBase,

  constructor: function (options) {
    this.$super();
    options = options || utils.create(null);
    if (options.view) this.view = options.view;
    this.dirvier = options.dirvier || new HashDirver();
    this.dirvier.on('changed', this.onChanged.bind(this));
  },

  get view() {
    return this._view;
  },

  set view(view) {
    if (!(view instanceof RouterView)) {
      throw new Error('Invalid RouterView');
    }
    this._view = view;
    this._view._router = this;
    this.onChanged(this.dirvier.getCurrent());
  },

  onChanged: function (path) {
    path = path || '/';
    var routes = this.get(path);
    if (!routes || routes.length < 1) return;
    this.route = routes[0];
    if (this.view) {
      this.view.component = this.route.component;
    }
  },

  go: function (path) {
    this.dirvier.go(path);
  },

  map: function (map) {
    utils.each(map, function (pattern, item) {
      if (utils.isString(item)) {
        item = map[item];
      }
      if (item instanceof Component) {
        item = { component: item };
      }
      if (!item) throw new Error('Invalid route `' + pattern + '`');
      item.pattern = pattern;
      this.addOne(item);
    }, this);
  }

});

Router.HashDirver = HashDirver;

/**
 * 路由插件安装方法
 * @parent {Component} owner 组件类
 */
Router.install = function (owner) {

  //为组件实例扩展 $router 属性
  Object.defineProperty(owner.prototype, '$router', {
    get: function () {
      if (this instanceof RouterView) {
        return this._router;
      }
      if (this.$parent) {
        return this.$parent.$router ||
          this.$parent._router ||
          this.$parent.router;
      } else {
        return this._router || this.router;
      }
    }
  });

  //为组件实例扩展 $route 属性
  Object.defineProperty(owner.prototype, '$route', {
    get: function () {
      return this.$router && this.$router.route;
    }
  });

  //添加全局组件 RouterView
  owner.component('RouterView', RouterView);

  //添加 link 指令
  owner.directives.push(LinkDirective);

};

module.exports = Router;