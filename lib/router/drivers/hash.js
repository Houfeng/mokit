const Class = require('cify');
const EventEmitter = require('../../events');

const SEPARATOR = '#!';
const ROOT_PATH = '/';

/**
 * 基于 has 的路由驱动
 */
const HashDriver = new Class({
  $name: 'HashDriver',
  $extends: EventEmitter,

  /**
   * 路由驱动构造函数
   * @param {Object} router 路径实例
   * @returns {void} 无返回
   */
  constructor: function (router) {
    this.$super();
    this.router = router;
    window.addEventListener('hashchange', function () {
      this._onChange();
    }.bind(this));
  },

  /**
   * 获取当前路径
   * @returns {string} 当前路径
   */
  get: function () {
    return location.hash.split(SEPARATOR)[1] || ROOT_PATH;
  },

  /**
   * 设置当前路径
   * @param {string} path 要转到的路径
   * @returns {void} 无返回
   */
  set: function (path) {
    path = path || ROOT_PATH;
    location.hash = SEPARATOR + this.router.resolveUri(path, this.get());
  },

  /**
   * 路由发生变化时的处理函数
   * @param {string} path 将要转到的路径
   * @returns {void} 无返回
   */
  _onChange: function (path) {
    path = path || this.get() || '';
    if (path[0] != ROOT_PATH) path = ROOT_PATH + path;
    this.emit('changed', path);
  }

});

module.exports = HashDriver;