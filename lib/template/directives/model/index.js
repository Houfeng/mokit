const SelectDirective = require('./select');
const EditableDirective = require('./editable');
const InputDirective = require('./input');
const RadioDirective = require('./radio');
const CheckboxDirective = require('./checkbox');
const PropDirective = require('./prop');

const Directive = function (options) {
  let node = options.node;
  let tagName = node.tagName;
  if (options.decorates[0]) {
    return new PropDirective(options);
  } else if (tagName == 'INPUT') {
    let type = node.getAttribute('type');
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
    throw new Error(`Directive \`model\` cannot be used on \`${tagName}\``);
  }
};

//手动添加 classOptions
Directive.options = {
  level: Directive.LA
};

module.exports = Directive;