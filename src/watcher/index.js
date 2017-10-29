const { isFunction, deepEqual, clone } = require('ntils');
const Error = require('../common/error');

class Watcher {

  constructor(calculator, handler, context) {
    if (!isFunction(calculator) || !isFunction(handler)) {
      throw new Error('Invalid parameters');
    }
    this.calculator = calculator;
    this.handler = handler;
    this.context = context || this;
  }

  calc = force => {
    let newValue = this.calculator.call(this.context);
    if (force || !deepEqual(newValue, this.value)) {
      this.handler.call(this.context, newValue, this.value);
    }
    this.value = clone(newValue);
  };

}

module.exports = Watcher;