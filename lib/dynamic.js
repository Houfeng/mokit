const Component = require('./component');
const utils = require('ntils');

const Dynamic = new Component({

  template: '<iframe src="{{src}}"></iframe>',

  properties: {
    src: {
      value: null,
      test: function (value) {
        return value && value.length > 5;
      }
    }
  },

  refresh: function () {
    if (!this.src) return;
    this.src = this.src.split('?')[0] + '?=' + Date.now();
  },

  onReady: function () {

  },

  watches: {

  }


});


module.exports = Dynamic;
window.Dynamic = Dynamic;