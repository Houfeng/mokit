import mokit, {
  Component, dependencies, template, on, watch
} from 'mokit';

@template(`<h5>{{content}}</h5>`)
class Text extends Component {
  content = '';
  @on('ready') onReady() {
    console.log('ready');
  }
  @on('destroy') onDestroy() {
    console.log('destroy');
  }
}

@template(`<div>
<m:text m:if="state" m:prop:content="'Hello world!'"/>
<m:text m:if="state" m:prop:content="'Hello world!'"/>
<button m:on:click="toggle()">toggle</button>
</div>`)
@dependencies({ Text })
class App extends Component {
  state = true;
  toggle() {
    this.state = !this.state;
    console.log(window.performance.memory);
  }
}

window.app = mokit(App, document.body);