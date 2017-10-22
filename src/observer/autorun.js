export default class AutoRun {
  deps = null;
  runing = false;

  onGet = event => {
    if (!this.runing) return;
    this.deps[event.path] = true;
  };

  onChange = event => {
    if (!this.deps || this.deps[event.path]) {
      this.trigger(this);
    }
  };

  run = () => {
    this.deps = {};
    this.runing = true;
    let result = this.func();
    this.runing = false;
    return result;
  };

  constructor(func, trigger) {
    this.func = func;
    this.trigger = trigger || this.run;
  }

}