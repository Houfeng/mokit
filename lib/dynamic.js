const Component = require('./component');
const utils = require('ntils');

const Dynamic = new Component({

  template: '<div>fullName: {{fullName}}, firstName: {{firstName}}, lastName: {{lastName}}</div>',

  data: function () {
    return {
      firstName: 'Hou',
      lastName: 'Feng'
    };
  },

  properties: {
    fullName: {
      get: function () {
        return this.firstName + ' ' + this.lastName;
      }
    }
  },

  watches: {
    lastName() {
      this.firstName = '#' + this.lastName;
      console.log('aaa');
    }
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