const Component = require('./component');
const utils = require('ntils');

const Dynamic = new Component({

  template: '<iframe src="{{src}}"></iframe>',

  properties: {
    src: null
  }

});


module.exports = Dynamic;
window.Dynamic = Dynamic;