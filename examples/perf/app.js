(function () {

  'use strict';

  var Item = new mokit.Component({
    template: '<div>item</div>'
  });

  console.time('render');
  
  window.Perf = mokit({
    element: document.getElementById('app'),
    components: { Item: Item }
  }).start();

  console.timeEnd('render');

})();