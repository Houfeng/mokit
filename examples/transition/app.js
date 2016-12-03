(function () {

  var Transition = mokit.Transition;

  var random = function (min, max) {
    return parseInt(Math.random() * (max - min + 1) + min);
  };

  var Page = new mokit.Component({
    template: '<div class="page" style="background-color:{{color}}"></div>',
    properties: { color: '#000' },
    onInit: function () {
      this.color = `rgb(${random(50, 255)},${random(50, 255)},${random(50, 255)})`;
    }
  });

  mokit({
    element: document.getElementById('app'),
    change: function () {
      this.view.transition = new Transition(random(1, 68));
      this.view.component = new Page();
    },
    onReady: function () {
      this.view.component = new Page();
    }
  }).start();

})(mokit);