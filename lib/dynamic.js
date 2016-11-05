const Component = require('./component');

const Dynamic = new Component({

  template: '<div m:on:click="alert(name)">Hello {{user.name}}</div>',

  data: function () {
    return {
      user: {
        name: 'houfeng'
      }
    };
  },

  properties: {
    src: {
      test: function (value) {
        return value < 100;
      },
      set: function (value) {
        console.log(value);
      }
    }
  },

  watches: {

  },

  alert: function (name) {
    alert(name);
  },

  say: function (name) {
    this.user.name = name;
  }

});


module.exports = Dynamic;
window.Dynamic = Dynamic;