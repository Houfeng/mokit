# A minimal mvvm framework

> 一个 MVC 框架以 MVVM 之「魂」复活了！  

Mokit 最初编写于 2012 年，是一个面向移动应用的前端 mvc 框架，v3 版本进行了大量的重构或重写，并尽可能的保持了和之前版本类似的 API，
v3 是一个「极轻量」的 MVVM 框架，相较目前主流的类似的框架(react/vue/angular)，mokit v3 更为「轻量」，希望为开发人员提供多一种的选择。

<!--more-->

## 特性
- 面向移动设备，内置支持常用「手势事件」并可以轻松添加自定义事件。  
- 极其轻量仅 **9.8k** (uglify+gzip)  
- 提供类似 WebCompoents 的支持，并支持「组件继承」 
- 支持 Chrome/firefox/safari/opera/IE9+ 等主流浏览器

  
# Hello 世界  
HTML:

```HTML
<div id="app">
  <input type="text" m:model="name" />
  <button m:on:tap="say(name)">click me</button>
</div>
```

JavaScript:

```js
//启动应用
mokit({
  element: document.getElementById('app'),
  data:function(){
    return {
      name: '世界'
    };
  },
  say: function (name) {
    alert('hello '+ name);
  }
}).start();
```

# 定义组件

编写组件:

```js
//定义一个 hello 组件
var Hello = new mokit.Component({
  template: '<button m:on:click="say(name)" m:content></button>',
  properties: { name: null},
  say: function (name) {
    alert('hello '+ name);
  }
});
```

HTML:

```HTML
<div id="app">
  <m:hello m:prop:name="name">click me</m:hello>
</div>
```

JavaScript:

```js
//启动应用
mokit({
  element: document.getElementById('app'),
  components:{ Hello: Hello }
  data:function(){
    return {
      name: '世界'
    };
  }
}).start();
```

# 插件列表
- [路由](https://github.com/Houfeng/mokit-router/)
- [转场动画](https://github.com/Houfeng/mokit-transition/)
- [Touch API](https://github.com/Houfeng/mokit-touch/)

# 在线示例
- [Todo](http://houfeng.net/mokit/examples/todo/)
- [Transition](http://houfeng.net/mokit-transition/examples/)
- [Route](http://houfeng.net/mokit-router/examples/)
- [Touch](http://houfeng.net/mokit-touch/examples/)

# 规划
- CLI 工具
- 支持服务端渲染

## 相较 v2 主要变化
- MVC -> MVVM
- 原来的 View 类改为 Component，同时取消了 Controller 类
- options 选项改为 properties，并支持计算属性
- onRender 生命周期函数改为 onReady
- 新增支持 data 选项
- 新增支持 watches 选项
- 分拆 template 选项功能，不再自动检查是否为 Element，同时新增 element 选项
- 指令默认前缀由 **data-** 改为 **m:**，同时支持自定义指令