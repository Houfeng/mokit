const Class = require('cify');
const EventEmitter = require('../../events');
const utils = require('ntils');

const SEPARATOR = '#!';
const ROOT_PATH = '/';

const HashDriver = new Class({
  $name: 'HashDriver',
  $extends: EventEmitter,

  constructor: function () {
    this.$super();
    window.addEventListener('hashchange', function () {
      this._onChange();
    }.bind(this));
  },

  getCurrent: function () {
    return location.hash.split(SEPARATOR)[1] || ROOT_PATH;
  },

  go: function (path) {
    path = path || ROOT_PATH;
    location.hash = SEPARATOR + this._resolveUri(path, this.getCurrent());
  },

  _onChange: function (path) {
    path = path || this.getCurrent() || '';
    if (path[0] != ROOT_PATH) path = ROOT_PATH + path;
    this.emit('changed', path);
  },

  _resolveUri: function (toUri, fromUri) {
    toUri = toUri || ROOT_PATH;
    if (toUri[0] == ROOT_PATH) return toUri;
    fromUri = fromUri || ROOT_PATH;
    fromUri = fromUri.split('?')[0].split('#')[0];
    var baseDir = fromUri.substring(0, fromUri.lastIndexOf(ROOT_PATH));
    var uriParts = toUri.split('#')[0].split(ROOT_PATH);
    var uriHash = toUri.split('#')[1];
    var newUriParts = baseDir.length > 0 ? baseDir.split(ROOT_PATH) : [];
    uriParts.forEach(function (part) {
      if (part == '..') {
        newUriParts.pop();
      } else if (part && part != '.') {
        newUriParts.push(part);
      }
    }, this);
    return ROOT_PATH + newUriParts.join(ROOT_PATH) + (uriHash ? '#' + uriHash : '');
  }

});

module.exports = HashDriver;