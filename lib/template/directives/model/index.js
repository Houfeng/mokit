/*istanbul ignore next*/'use strict';

var SelectDirective = require('./select');
var EditableDirective = require('./editable');
var InputDirective = require('./input');
var RadioDirective = require('./radio');
var CheckboxDirective = require('./checkbox');
var PropDirective = require('./prop');

var Directive = function Directive(options) {
  var node = options.node;
  var tagName = node.tagName;
  if (options.decorates[0]) {
    return new PropDirective(options);
  } else if (tagName == 'INPUT') {
    var type = node.getAttribute('type');
    if (type == 'radio') {
      return new RadioDirective(options);
    } else if (type == 'checkbox') {
      return new CheckboxDirective(options);
    } else {
      return new InputDirective(options);
    }
  } else if (tagName == 'TEXTAREA') {
    return new InputDirective(options);
  } else if (tagName == 'SELECT') {
    return new SelectDirective(options);
  } else if (node.isContentEditable) {
    return new EditableDirective(options);
  } else {
    throw new Error( /*istanbul ignore next*/'Directive `model` cannot be used on `' + tagName + '`');
  }
};

//手动添加 classOptions
Directive.options = {
  level: Directive.LA
};

module.exports = Directive;