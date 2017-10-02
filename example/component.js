import { Component, decorators } from 'mokit';

const { element, event, model, watch } = decorators;

@element(document.body)
class App extends Component {

  @event('init')
  init() {
    this.age = 100;
    console.log('init');
  }

  @model
  data() {
    return {
      name: 'test'
    };
  }

  @watch('name')
  printName() {
    console.log('printName', this.name);
  }

  set test(value) {
    this.name = value;
  }

  get test() {
    return this.name;
  }

}

window.app = new App();
window.mokit = Component;