const Directive = require('../directive');
const { meta } = require('decorators');

@meta({
  literal: true
})
class IdDirective extends Directive {
  update(id) {
    this.scope[id] = this.node.target;
  }
}

module.exports = IdDirective;