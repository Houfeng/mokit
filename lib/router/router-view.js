const Class = require('cify');
const View = require('../component').components.View;

const RouterView = View.extend({
  properties: {
    router: {
      get: function () {
        return 0;
      }
    }
  }
});

module.exports = RouterView;