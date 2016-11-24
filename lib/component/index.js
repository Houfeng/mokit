const Component = require('./component');
const Watcher = require('./watcher');
const components = require('./components');

Component.Watcher = Watcher;
Component.components = components;
Component.Component = Component;

module.exports = Component;