const Component = require('../component');
const utils = require('ntils');

const Dynamic = new Component({

  template: '<div></div>',

  properties: {
    is: {
      test: function (value) {
        return utils.isFunction(value);
      },
      set: function (value) {
        if (this._component) {
          this._component.$dispose();
        }
        this._Component = value;
        this._component = new this._Component({
          parent: this
        });
        this._component.$mount(this.$element, true);
      },
      get: function () {
        return this._Component;
      }
    }
  }

});


module.exports = Dynamic;
window.Dynamic = Dynamic;