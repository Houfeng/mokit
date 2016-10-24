const Class = require('cify');
const utils = require('ntils');
const EventEmitter = require('events');

const OBSERVER_PROP_NAME = '__observer__';
const CHANGE_EVENT_NAME = 'change';

/**
 * 对象观察类，可以监控对象变化
 * 目前方案问题:
 *   对于父子关系和事件冒泡，目前方案如果用 delete 删除一个属性，无关真实删除关系，
 *   即便调用 clearReference 也无法再清除关系，子对象的 parents 中会一直有一个引用，当前方案最高效
 * 其它方法一:
 *   将「关系」放入全局数组中，然后将 ob.parents 变成一个「属性」从全局数组件中 filter 出来，
 *   基本和目前方法类似，但是关系在外部存领教，所以 clearReference 可清除。
 * 其它方案二: 
 *   构造时添加到全局数组，每一个 observer change 时都让放到全局的 observer 遍历自身的，
 *   检果事件源是不是自已的子对象，如果是则触发自身 change 事件，这样 ob 对象本身没有相关引用
 *   clearReference 时只从全局清除掉就行了，并且 delete 操作也不会影响，但效率稍差。
 * 其它方案三: 
 *   给构造函数添加一个 deep 属性，只有 deep 的 ob 对象，才放入到全局数组中，检查时逻辑同方案二
 *   但是因为要检查的对象会少很多，效率会更高一点。
 */
const Observer = new Class({
  _extends: EventEmitter,

  /**
   * 通过目标对象构造一个观察对象
   * @param {Object} target 目标对象
   * @returns {void} 无返回
   */
  constructor: function (target) {
    if (utils.isNull(target)) {
      throw new Error('Invalid target');
    }
    utils.defineFreezeProp(this, 'shadow', Object.create(null));
    utils.defineFreezeProp(this, 'target', target);
    utils.defineFreezeProp(this, 'parents', []);
    utils.defineFreezeProp(target, OBSERVER_PROP_NAME, this);
    this.apply();
  },

  /**
   * 添加一个属性，动态添中的属性，无法被观察，
   * 但是通过 set 方法添加的属性可能被观察。
   */
  set: function (name, value) {
    if (utils.isFunction(value)) return;
    Object.defineProperty(this.target, name, {
      get: function () {
        return this[OBSERVER_PROP_NAME].shadow[name];
      },
      set: function (value) {
        var observer = this[OBSERVER_PROP_NAME];
        var oldValue = observer.shadow[name];
        if (oldValue === value) return;
        if (utils.isObject(value)) {
          var childObserver = new Observer(value, name);
          observer.addChild(childObserver, name);
        }
        //移除旧值的父引用
        //如果用 delete 删除属性将无法移除父子引用
        if (oldValue && oldValue[OBSERVER_PROP_NAME]) {
          observer.removeChild(oldValue[OBSERVER_PROP_NAME], name);
        }
        observer.shadow[name] = value;
        observer._emitChange({ path: name });
      },
      configurable: true,
      enumerable: true
    });
    this.target[name] = value;
  },

  /**
   * 自动应用所有动态添加的属性
   * @returns {void} 无返回
   */
  apply: function () {
    if (utils.isArray(this.target)) {
      this._wrapArray(this.target);
    }
    var names = this._getPropertyNames(this.target);
    names.forEach(function (name) {
      var desc = Object.getOwnPropertyDescriptor(this.target, name);
      if (!('value' in desc)) return;
      this.set(name, this.target[name]);
    }, this);
  },

  /**
   * 清除所有父子引用
   * @returns {void} 无返回
   */
  clearReference: function () {
    utils.each(this.target, function (name, value) {
      var child = value[OBSERVER_PROP_NAME];
      if (child) this.removeChild(child);
    }, this);
  },

  /**
   * 派发一个事件，事件会向父级对象冒泡
   * @param {string} eventName 事件名称
   * @param {Object} event 事件对象
   * @returns {void} 无返回
   */
  dispatch: function (eventName, event) {
    this.emit(eventName, event);
    if (!this.parents || this.parents.length < 1) return;
    this.parents.forEach(function (item) {
      if (!(item.name in item.parent.target)) {
        return item.parent.removeChild(this);
      }
      var parentEvent = utils.copy(event);
      parentEvent.path = item.name + '.' + event.path;
      item.parent.dispatch(eventName, parentEvent);
    }, this);
  },

  /**
   * 添子观察者对象
   * @param {Object} child 父对象
   * @param {String} name 属性名
   * @returns {void} 无返回
   */
  addChild: function (child, name) {
    if (utils.isNull(child) || utils.isNull(name)) {
      throw new Error('Invalid paramaters');
    }
    child.parents.push({ parent: this, name: name });
  },

  /**
   * 移除子对象
   * @param {Object} child 父对象
   * @param {String} name 属性名
   * @returns {void} 无返回
   */
  removeChild: function (child, name) {
    if (utils.isNull(child)) {
      throw new Error('Invalid paramaters');
    }
    var foundIndex = -1;
    child.parents.forEach(function (item, index) {
      if (item.parent === this && item.name === name) {
        foundIndex = index;
      }
    }, this);
    if (foundIndex > -1) {
      child.parents.splice(foundIndex, 1);
    }
  },

  /**
   * 触发 change 事件
   * @param {Object} event 事件对象
   * @returns {void} 无返回
   */
  _emitChange: function (event) {
    this.dispatch(CHANGE_EVENT_NAME, event);
  },

  /**
   * 获取所有成员名称列表
   * @returns {Array} 所有成员名称列表
   */
  _getPropertyNames: function () {
    var names = utils.isArray(this.target) ?
      this.target.map(function (item, index) {
        return index;
      }) : Object.keys(this.target);
    return names.filter(function (name) {
      return name !== OBSERVER_PROP_NAME;
    });
  },

  /**
   * 包裹数组
   * @param {array} array 源数组
   * @returns {array} 处理后的数组
   */
  _wrapArray: function (array) {
    utils.defineFreezeProp(array, 'push', function () {
      var items = [].slice.call(arguments);
      items.forEach(function (item) {
        this[OBSERVER_PROP_NAME].set(array.length, item);
      }, this);
      this[OBSERVER_PROP_NAME]._emitChange({ path: 'length' });
    });
    utils.defineFreezeProp(array, 'pop', function () {
      var item = [].pop.apply(this, arguments);
      this[OBSERVER_PROP_NAME]._emitChange({ path: this.length });
      this[OBSERVER_PROP_NAME]._emitChange({ path: 'length' });
      return item;
    });
    utils.defineFreezeProp(array, 'unshift', function () {
      var items = [].slice.call(arguments);
      items.forEach(function (item) {
        this[OBSERVER_PROP_NAME].set(0, item);
      }, this);
      this[OBSERVER_PROP_NAME]._emitChange({ path: 'length' });
    });
    utils.defineFreezeProp(array, 'shift', function () {
      var item = [].shift.apply(this, arguments);
      this[OBSERVER_PROP_NAME]._emitChange({ path: 0 });
      this[OBSERVER_PROP_NAME]._emitChange({ path: 'length' });
      return item;
    });
    utils.defineFreezeProp(array, 'splice', function () {
      var startIndex = arguments[0];
      var endIndex = utils.isNull(arguments[1])
        ? startIndex + arguments[1]
        : this.length - 1;
      var items = [].splice.apply(this, arguments);
      for (var i = startIndex; i <= endIndex; i++) {
        this[OBSERVER_PROP_NAME]._emitChange({ path: i });
      };
      this[OBSERVER_PROP_NAME]._emitChange({ path: 'length' });
      return items;
    });
    utils.defineFreezeProp(array, 'set', function (index, value) {
      if (index >= this.length) {
        this[OBSERVER_PROP_NAME]._emitChange({ path: 'length' });
      }
      this[OBSERVER_PROP_NAME].set(index, value);
    });
  }

});

/**
 * 观察一个对象
 * @param {Object} target 目标对象
 * @return {Observer} 观察者对象
 */
Observer.observe = function (target) {
  return new Observer(target);
};

module.exports = Observer;