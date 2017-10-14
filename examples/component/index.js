import mokit, {
  Component, dependencies, template, on, watch
} from 'mokit';

@template(`<h5 m:on:click="click()">Text: {{content}}</h5>`)
class Text extends Component {
  content = '';
  @on('ready') onReady() {
    console.log('ready');
  }
  @on('destroyed') onDestroy() {
    console.log('destroyed');
  }
  click() {
    this.emit('xxxx');
  }
}

@template(`<div>
  <div m:if="state">
    <m:text m:on:xxxx="toggle()" data-id="a" m:prop:content="'1）Hello world!'"/>
    <m:text data-id="b" m:prop:content="'2）Hello world!'"/>
  </div>
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