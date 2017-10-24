import Observer from 'observer';

const scope = {
  name: 'parent',
  list: [],
  child: {
    name: 'child'
  }
};

const observer = new Observer(scope);

window.ctx = observer.run(function () {
  console.log('run', scope.child.name, scope.name);
});

window.demo = { scope, observer };