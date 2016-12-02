//(function () {

var Component1 = new mokit.Component({
  template: `<span m:on:click="clickMe">{{name}}</span>`,
  properties: { name: 'Component1' },
  clickMe: function () {
    alert('My name is' + this.name);
  }
});

var Component2 = Component1.extend({
  properties: { name: 'Component2' },
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

//})();