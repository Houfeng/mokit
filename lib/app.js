const Class = require('cify');

const App = new Class({

  constructor: function (options) {
    options = options || {};
    this.element = options.element;
    this.prefix = options.prefix;
  },

  component: function (name, component) {

  },

  start: function () {
    this.template = new Template(this.element, {
      prefix: this.prefix
    });
    this.template.bind(this);
  }

});

App.Dynamic = require('./component/dynamic');

module.exports = App;