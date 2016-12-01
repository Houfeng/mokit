const Component = require('../component');
const utils = require('ntils');

const View = new Component({

  template: '<div></div>',

  properties: {
    component: {
      test: function (value) {
        if (!value) return false;
        return value instanceof Component || utils.isString(value);
      },
      set: function (component) {
        //如果 value 是字符串则尝试从 $parent.components 中获取组件类 
        if (utils.isString(component)) {
          if (this.$parent && this.$parent.$components) {
            this.component = this.$parent.$components[component]
          } else {
            this.component = null;
          }
          return;
        }
        //销毁旧组件实例
        if (this.componentInstance) {
          this.componentInstance.$dispose();
        }
        //创建新组件实例
        if (utils.isFunction(component)) {
          this.componentInstance = new component({
            parent: this
          });
        } else {
          this.componentInstance = component;
        }
        //挂载新组件实例
        this.componentInstance.$mount(this.$element, true);
      },
      get: function () {
        return this._Component;
      }
    }
  }

});

module.exports = View;