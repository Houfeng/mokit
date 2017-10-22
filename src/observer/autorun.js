export default class AutoRun {
  deps = null;
  runing = false;
  ctx = null;

  onGet = event => {
    if (!this.runing) return;
    this.deps[event.path] = true;
  };

  onChange = event => {
    if (!this.deps || this.deps[event.path]) {
      this.trigger.call(this.ctx);
    }
  };

  run = (ctx) => {
    this.ctx = ctx || this;
    this.deps = {};
    this.runing = true;
    let result = this.func.call(this.ctx);
    this.runing = false;
    return result;
  };

  constructor(func, trigger, ctx) {
    this.func = func;
    this.trigger = trigger || this.run;
    this.ctx = ctx || this;
  }

}