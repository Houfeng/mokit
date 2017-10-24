const meta = require('./meta');
const components = require('./components');
const directives = require('./directives');
const event = require('./event');
const model = require('./model');
const template = require('./template');
const watch = require('./watch');

const on = event;
const dependencies = components;

module.exports = {
  meta, event, on, model, watch,
  template, components, dependencies, directives
};