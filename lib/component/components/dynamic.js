const Component = require('../component');
const utils = require('ntils');

const Dynamic = new Component({

  template: '<iframe m:prop:src="src||\'about:blank\'"></iframe>',

  properties: {
    src: null
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