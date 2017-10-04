# A minimal mvvm framework

> 一个 MVC 框架以 MVVM 之「魂」复活了！  

<!--more-->

## 特性
- 面向移动设备，内置支持常用「手势事件」并可以轻松添加自定义事件。  
- 极其轻量仅 **16k** (uglify+gzip)  
- 提供类似 WebCompoents 的支持，并支持「组件继承」 
- 支持 Chrome/firefox/safari/opera/IE9+ 等主流浏览器

  
# Hello 世界  

```js
import { bootstrap, on, watch, template, dependencies } from 'mokit';

@template('<div>{{message}}</div>')
@dependencies({ Other })
class App extends mokit.Component {

  _message = '';

  get message() {
    return this._message;
  }

  set message(value) {
    this._message = value;
  }

  @on('init') onReady() {
    this.message = 'Hello Mokit!';
  }

  @watch('message') printMesage(value) {
    console.log('message:', value);
  }

}

bootstrap(App, document.body);
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

# 历史

Mokit 最初编写于 2011 年，是一个面向移动应用的前端 MVC 框架，在 v3 之后重构为 MVVM 框架。

### v4 
重构为  class-component，可以用 es6 的 class 创建 directive 和 component  

### v3
v3 版本进行了大量的重构或重写，并尽可能的保持了和之前版本类似的 API，
v3 是一个「极轻量」的 MVVM 框架，相较目前主流的类似的框架(react/vue/angular)，mokit v3 更为「轻量」，希望为开发人员提供多一种的选择。

### v2

在 12 年在 v1 的基于上，新增组件机制，并增加模块化机制，内置 AMD Loader (ems)

### v1

类 backbone 的 MVC 框架