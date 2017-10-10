import mokit, {
  Component, dependencies, template, on, watch
} from 'mokit';

@template(`<h1>{{content}}</h1>`)
class Text extends Component {
  content = '';
  @on('destroy') onDestroy() {
    console.log('destroy');
  }
}

@template(`
<div>
<m:text m:if="!state" m:prop:content="'你好中国'"/>
<button m:on:click="hide()">hide</button>
<button>test</button>
</div>
`)
@dependencies({ Text })
class App extends Component {
  state = false;
  hide() {
    this.state = true;
  }
}

window.app = mokit(App, document.body);