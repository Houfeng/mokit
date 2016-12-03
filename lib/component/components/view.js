const Component = require('../component');
const utils = require('ntils');

/**
 * 内置视图组件
 * 可以加载并显示其它组件，并可以指定「转场效果」
 */
const View = new Component({

  template: '<div></div>',

  properties: {

    /**
     * 显示到视图中的组件
     */
    component: {
      test: function (value) {
        if (!value) return false;
        return value instanceof Component || utils.isString(value);
      },
      set: function (component) {
        //如果 value 是字符串则尝试从 $parent.components 中获取组件类 
        if (utils.isString(component)) {
          if (this.$parent && this.$parent.$components) {
            this.component = this.$parent.$components[component];
          } else {
            this.component = null;
          }
          return;
        }
        //声明新旧组件变量
        let newComponentInstance = null;
        let oldComponentInstance = this.componentInstance;
        //创建新组件实例
        if (utils.isFunction(component)) {
          newComponentInstance = new component({
            parent: this
          });
        } else {
          newComponentInstance = component;
        }
        //通过转场控制器进行转场准备
        this.transition.prep(newComponentInstance, oldComponentInstance);
        //挂载新组件实例
        newComponentInstance.$mount(this.$element, true);
        //通过转场控制器进行转场
        this.transition.go(newComponentInstance, oldComponentInstance, function () {
          //销毁旧组件实例
          if (oldComponentInstance) {
            oldComponentInstance.$dispose();
          }
        }.bind(this));
        //暂存当前组件实例
        this.componentInstance = newComponentInstance;
      },
      get: function () {
        return this._Component;
      }
    },

    /**
     * 视图的转场控制对象
     */
    transition: {
      get: function () {
        return this._transition || View.transition;
      },
      set: function (transition) {
        if (!transition || (
          utils.isFunction(transition.prep) &&
          utils.isFunction(transition.go)
        )) {
          if (this._transition && utils.isFunction(this._transition.clean)) {
            this._transition.clean();
          }
          if (transition && utils.isFunction(transition)) {
            transition.init(this);
          }
          this._transition = transition;
        } else {
          throw new Error('Invalid transition');
        }
      }
    }

  }

});

/**
 * 默认转场设置
 */
View.transition = {
  //init: function () { },
  //clean: function () { },

  /**
   * 转场开始前的准备
   * @param {Component} newComponent 新组件
   * @param {Component} oldComponent 旧组件
   * @returns {void} 无返回
   */
  prep: function (newComponent, oldComponent) {
    if (oldComponent) oldComponent.$element.style.display = 'none';
  },

  /**
   * 执行转场动画
   * @param {Component} newComponent 新组件
   * @param {Component} oldComponent 旧组件
   * @returns {void} 无返回
   */
  go: function (newComponent, oldComponent, done) {
    setTimeout(function () {
      done();
    }, 3000);
  }
};

module.exports = View;