const utils = require('ntils');
const Class = require('cify');
const RouterBase = require('./router');
const HashDirver = require('./drivers/hash');
const RouterView = require('./router-view');

const Router = new Class({
  $name: 'Router',
  $extends: RouterBase,

  constructor: function (options) {
    options = options || utils.create(null);
    options.dirvier = new HashDirver();
    this.dirvier = options.dirvier;
    if (options.view) this.view = options.view;
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
  },

  go: function (path) {
    var route = this.route = this.get(path);
    var Component = route.target;
    var component = new Component({
      parent: this.view
    });

  },

  map: function (map) {

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
        return this.$parent.$router;
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

};

module.exports = Router;