const TIMER_DELAY = 4;

module.exports = class AutoRun {

  constructor(handler, context, trigger, deep) {
    this.handler = handler;
    this.context = context || this;
    this.trigger = trigger || this.run;
    this.deep = deep || false;
  }

  isSync() {
    return false;
  }

  onGet = event => {
    if (!this.runing || !event || !this.dependencies) return;
    this.dependencies[event.path] = true;
  };

  isDependent = path => {
    if (!path) return false;
    if (!this.dependencies || this.dependencies[path]) return true;
    if (!this.deep) return false;
    let paths = path.split('.');
    paths.pop();
    return this.isDependent(paths.join('.'));
  };

  onChange = event => {
    if (this.runing || !event || !this.isDependent(event.path)) return;
    if (this.isSync()) {
      return this.trigger.call(this.context);
    }
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.timer = setTimeout(() => {
      if (!this.timer) return;
      this.trigger.call(this.context);
    }, TIMER_DELAY);
  };

  run = (...args) => {
    this.dependencies = {};
    this.runing = true;
    let result = this.handler.call(this.context, ...args);
    this.runing = false;
    return result;
  };

};