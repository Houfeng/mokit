import Observer from 'observer';

const scope = {
  name: 'parent',
  index: 0,
  list: [],
  child: {
    name: 'child',
    child: { name: 'child->child' }
  }
};

const observer = new Observer(scope);

window.auto1 = observer.run(function () {
  console.log('auto1:', scope.child.name, scope.name);
  scope.index += 1;
});

window.auto2 = observer.run(function () {
  console.log('auto2:', scope.child.child);
}, { deep: true });

window.watch1 = observer.watch(function () {
  return this.name;
}, function (newValue, oldValue) {
  console.log('watch1:', newValue, oldValue);
});

window.demo = { scope, observer };