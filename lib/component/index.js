const Class = require('cify');
const Template = require('../template');
const Watcher = require('../watcher');
const utils = Template.utils;

const Component = function (options) {

  if (!options || !options.template) {
    throw new Error('Invalid component options');
  }

  var componentProp = Object.create(Component.prototype);
  componentProp.$props = options.props;
  utils.copy(options.methods, componentProp);

  var ComponentClass = new Class({
    _extends: componentProp,
    constructor: function () {
      this._createProps(options.props);
      this._createData(options.data);
      this._createWatchers(options.watch);
      this._callHook('init');
    },

    _callHook: function (name, args) {
      if (!utils.isFunction(options[name])) return;
      options[name].apply(this, args);
    },

    _createProps: function (props) {
      utils.each(props, function (name, define) {
        this[name] = utils.isObject(define) ?
          define.default : define;
      }, this);
    },

    _createData: function (data) {
      if (utils.isFunction(options.data)) {
        this.$data = options.data.call(this);
      } else {
        this.$data = data;
      }
      utils.each(this.$data, function (name) {
        Object.defineProperty(this, name, {
          get: function () {
            return this.$data[name];
          },
          set: function (value) {
            this.$data[name] = value;
          }
        });
      }, this);
    },

    _createWatchers: function (watchers) {
      utils.each(watchers, function (name, handler) {
        this.$watch(name, handler);
      }, this);
    },

    $compile: function () {
      if (this._compiled) return;
      this._compiled = true;
      var element = utils.parseDom(options.template)[0];
      if (!element || element.nodeName === '#text') {
        throw new Error('Invalid component template');
      }
      this._callHook('create');
      var template = new Template(element);
      template.bind(this);
      this.$element = element;
      this._callHook('ready');
    },

    $mount: function (mount) {
      this.$compile();
      this._callHook('mount');
      mount.parentNode.insertBefore(this.$element, mount);
    },

    $remove: function (disHook) {
      if (!disHook && this.onRemove) this.onRemove();
      this.$template.unbind();
      this.$element.parentNode.removeChild(this.$element);
    },

    $watch: function (calcer, handler) {
      this._watchers = this._watchers || [];
      if (!utils.isFunction(handler)) return;
      if (!utils.isFunction(calcer)) {
        var path = calcer;
        calcer = function () {
          return utils.getByPath(this, path);
        };
      }
      this._watchers.push(new Watcher(calcer.bind(this), handler.bind(this)));
    }

  });

  ComponentClass.__proto__ = Component.prototype;
  return ComponentClass;

};

module.exports = Component;