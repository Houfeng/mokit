export default class AutoRun {

  deps = null;
  runing = false;
  ctx = null;

  constructor(exec, trigger, ctx) {
    this.exec = exec;
    this.trigger = trigger || this.run;
    this.ctx = ctx || this;
  }

  onGet = event => {
    if (!this.runing) return;
    this.deps[event.path] = true;
  };

  onChange = event => {
    if (!this.deps || this.deps[event.path]) {
      this.trigger.call(this.ctx);
    }
  };

  run = () => {
    this.deps = {};
    this.runing = true;
    let result = this.exec.call(this.ctx);
    this.runing = false;
    return result;
  };

}