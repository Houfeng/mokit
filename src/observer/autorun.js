module.exports = class AutoRun {

  constructor(handler, context, trigger, deep) {
    this.handler = handler;
    this.context = context || this;
    this.trigger = trigger || this.run;
    this.deep = true;
  }

  onGet = event => {
    if (!this.runing || !event || !this.dependencies) return;
    this.dependencies[event.path] = true;
  };

  isDependent = path => {
    return !this.dependencies || this.dependencies[path];
  }

  onChange = event => {
    if (this.runing || !event) return;
    if (this.deep || this.isDependent(event.path)) {
      this.trigger.call(this.context);
    }
  };

  run = (...args) => {
    this.dependencies = {};
    this.runing = true;
    let result = this.handler.call(this.context, ...args);
    this.runing = false;
    return result;
  };

};