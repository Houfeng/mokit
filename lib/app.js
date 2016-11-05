const Class = require('cify');
const Template = require('./template');
const Compiler = Template.Compiler;
const utils = Template.utils;

const App = new Class({

  constructor: function (options) {
    options = options || Object.create(null);
    this.components = Object.create(null);
    this.element = options.element;
    this.prefix = options.prefix;
    utils.defineFreezeProp(this, 'compiler', new Compiler({
      prefix: this.prefix,
      directives: this.directives
    }));
  },

  directive: function (name, Directive) {
    if (!Directive) {
      Directive = name;
      name = null;
    }
    Directive.prototype.app = this;
    Directive.definition.name = name || Directive.definition.name;
    this.compiler.directives.push(Directive);
  },

  component: function (name, Component) {
    this.components[name] = Component;
  },

  start: function () {
    utils.defineFreezeProp(this, 'template', new Template(this.element, {
      compiler: this.compiler
    }));
    this.template.bind(this);
  }

});

module.exports = App;

