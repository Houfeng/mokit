const {
  isFunction, isBoolean, getByPath, deepEqual, clone
 } = require('ntils');
const Error = require('../common/error');

class Watcher {

  constructor(calculator, handler, context) {
    if (!isFunction(calculator) || !isFunction(handler)) {
      throw new Error('Invalid parameters');
    }
    this.context = context || this;
    this.calculator = isFunction(calculator) ? calculator : () => {
      return getByPath(this.context, calculator);
    };
    this.handler = handler;
  }

  //force: true 强制执行，false 强制不执行，无参数根据计算结果决定
  calc = force => {
    let newValue = this.calculator.call(this.context);
    let willExecute = isBoolean(force) ? force :
      !deepEqual(newValue, this.value);
    if (willExecute) {
      this.handler.call(this.context, newValue, this.value);
    }
    this.value = clone(newValue);
  };

}

module.exports = Watcher;