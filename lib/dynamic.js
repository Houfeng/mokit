const Component = require('./component');
const utils = require('ntils');

const Dynamic = new Component({

  template: '<iframe src="{{src}}"></iframe>',

  properties: {
    src: null
  },

  refresh: function () {
    if (!this.src) return;
    this.src = this.src.split('?')[0] + '?=' + Date.now();
  }

});


module.exports = Dynamic;
window.Dynamic = Dynamic;