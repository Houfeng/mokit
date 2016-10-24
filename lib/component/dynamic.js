const Component = require('./');

const Dynamic = new Component({

  template: '<div m:on:click="alert(name)">Hello {{user.name}}</div>',

  init: function () {

  },

  ready: function () {

  },

  dispose: function () {

  },

  data: function () {
    return {
      user: {
        name: 'houfeng'
      }
    };
  },

  props: {
    src: {
      type: String,
      default: 0
    },
    xxx: 5,
    yyy: null
  },

  methods: {
    alert: function (name) {
      alert(name);
    },

    say: function (name) {
      this.user.name = name;
    }
  }

});


module.exports = Dynamic;
window.Dynamic = Dynamic;