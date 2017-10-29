import Observer from 'observer';

const scope = {
  name: 'parent',
  index: 0,
  list: [],
  child: {
    name: 'child'
  }
};

const observer = new Observer(scope);

window.auto = observer.run(function () {
  console.log('run:', scope.child.name, scope.name);
  scope.index += 1;
});

window.watcher = observer.watch(function () {
  return this.name;
}, function (newValue, oldValue) {
  console.log('watch:', newValue, oldValue);
})

window.demo = { scope, observer };