const Component = require('../component');
const { isString, isFunction } = require('ntils');
const { template } = require('decorators');
const { Error } = require('common');

/**
 * 内置视图组件
 * 可以加载并显示其它组件，并可以指定「转场效果」
 */
@template('<div></div>')
class View extends Component {

  static transition = {
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
     * @param {Function} done 完成后的回调
     * @returns {void} 无返回
     */
    go: function (newComponent, oldComponent, done) {
      done();
    }
  };

  set component(component) {
    if (this._transitioning) return;
    this._transitioning = true;
    //如果 value 是字符串则尝试从 $parent.components 中获取组件类 
    if (isString(component)) {
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
    if (isFunction(component)) {
      newComponentInstance = new component({
        parent: this
      });
    } else {
      component.$setParent(this);
      newComponentInstance = component;
    }
    //通过转场控制器进行转场准备
    this.transition.prep(newComponentInstance, oldComponentInstance);
    //挂载新组件实例
    newComponentInstance.$appendTo(this.$element);
    //通过转场控制器进行转场
    this.transition.go(newComponentInstance, oldComponentInstance, function () {
      //触发相关事件
      this.$emit('enter', newComponentInstance);
      this.$emit('leave', oldComponentInstance);
      //销毁旧组件实例
      if (oldComponentInstance) {
        oldComponentInstance.$destroy();
      }
      this._transitioning = false;
    }.bind(this));
    //暂存当前组件实例
    this.componentInstance = newComponentInstance;
  }

  get component() {
    return this._Component;
  }

  get transition() {
    return this._transition || View.transition;
  }

  set transition(transition) {
    if (this._transitioning) return;
    if (!transition || (
      isFunction(transition.prep) &&
      isFunction(transition.go)
    )) {
      if (this._transition && isFunction(this._transition.clean)) {
        this._transition.clean(this);
      }
      if (transition && isFunction(transition.init)) {
        transition.init(this);
      }
      this._transition = transition;
    } else {
      throw new Error('Invalid transition');
    }
  }

  /**
   * 切换到指定的组件
   * @param {Component} component 组件
   * @param {transition} transition 转场控制组件
   * @returns {void} 无返回
   */
  switchTo(component, transition) {
    if (transition) {
      this.transition = transition;
    }
    this.component = component;
  }

}

module.exports = View;