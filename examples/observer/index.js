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

window.ctx = observer.run(function () {
  console.log('run', scope.child.name, scope.name);
  scope.name = 'a';
  scope.index += 1;
});

window.demo = { scope, observer };