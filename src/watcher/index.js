const { isFunction, deepEqual, clone } = require('ntils');
const { Error } = require('common');

/**
 * Watcher 类
 * 通过「计算函数」、「执行函数」可以创建一个 Watcher 实例
 */
class Watcher {

  /**
   * 通过「计算函数」、「执行函数」构建一个 Watcher 实例
   * @param {function} calcor 计算函数
   * @param {function} handler 处理函数
   * @param {boolean} first 是否自动执行第一次
   * @returns {void} 无返回
   */
  constructor(calcor, handler, first) {
    if (!isFunction(calcor) || !isFunction(handler)) {
      throw new Error('Invalid parameters');
    }
    this.calcor = calcor;
    this.handler = handler;
    if (first) this.calc(true);
  }

  /**
   * 执行计算
   * @param {boolean} force 是否强制触发「计算函数」
   * @returns {Object} 计算后的值
   */
  calc(force) {
    let newValue = this.calcor();
    if (force || !deepEqual(newValue, this.value)) {
      this.handler(newValue, this.value);
    }
    this.value = clone(newValue);
  }

}

module.exports = Watcher;