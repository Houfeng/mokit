const Directive = require('../directive');
const { meta } = require('decorators');
const { Error } = require('common');

@meta({
  literal: true
})
class IdDirective extends Directive {
  update(id) {
    this.scope[id] = this.node.target;
  }
}

module.exports = IdDirective;