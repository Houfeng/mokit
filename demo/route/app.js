(function () {

  var Component1 = new mokit.Component({
    template: `<span>Component1</span>`
  });

  var Component2 = new mokit.Component({
    template: `<span>Component2</span>`
  });

  var router = new mokit.Router();
  router.map({
    '/': '/test1',
    '/test1': Component1,
    '/test2': Component2
  });

  mokit({
    element: document.getElementById('app'),
    router: router
  }).start();

})();