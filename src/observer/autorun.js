module.exports = class AutoRun {

  constructor(handler, context, trigger) {
    this.handler = handler;
    this.context = context || this;
    this.trigger = trigger || this.run;
  }

  onGet = event => {
    if (!this.runing || !event || !this.dependencies) return;
    this.dependencies[event.path] = true;
  };

  onChange = event => {
    if (this.runing || !event) return;
    if (this.dependencies && !this.dependencies[event.path]) return;
    this.trigger.call(this.context);
  };

  run = (...args) => {
    this.dependencies = {};
    this.runing = true;
    let result = this.handler.call(this.context, ...args);
    this.runing = false;
    return result;
  };

};