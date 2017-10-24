const each = require('./each');
const ifDirective = require('./if');
const prop = require('./prop');
const attr = require('./attr');
const on = require('./on');
const html = require('./inner-html');
const text = require('./inner-text');
const prevent = require('./prevent');
const id = require('./id');
const show = require('./show');
const model = require('./model');
const focus = require('./focus');
const anyAttribute = require('./attribute'); //处理所有未知 attr
const anyText = require('./text'); //处理所有 text 
const className = require('./class'); //处理 className

module.exports = {
  '#text': anyText,
  '*': anyAttribute,
  'if': ifDirective,
  'class': className,
  each, prop, attr, on, html, text,
  prevent, id, show, model, focus
};