import { bootstrap, Component, decorators } from 'mokit';

const { template, on, watch } = decorators;

@template(`
<div>{{name}}-{{demo}}</div>
`)
class App extends Component {

  demo = true;
  name = "test";

  @on('init') init() {
    this.age = 100;
    console.log('init');
  }

  @watch('name') printName() {
    console.log('printName', this.name);
  }

  set test(value) {
    this.name = value;
  }

  get test() {
    return this.name;
  }

}

window.app = bootstrap(App, document.body);