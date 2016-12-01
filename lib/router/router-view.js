const Class = require('cify');
const View = require('../component').components.View;

const RouterView = View.extend({
  properties: {
    router: {
      test: function (router) {
        return !!router;
      },
      get: function () {
        return this._router
      },
      set: function (router) {
        this._router = router;
        this._router._view = this;
      }
    }
  }
});

module.exports = RouterView;