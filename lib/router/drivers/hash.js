const Class = require('cify');
const EventEmitter = require('../../events');

const HashDriver = new Class({
  $name: 'HashDriver',
  $extends: EventEmitter,

  constructor: function () {
    this.$super();
  }

});

module.exports = HashDriver;