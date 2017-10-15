import mokit from 'mokit';

const data = new Array(1000).fill('');

@mokit.template(`<ul>
  <li m:each="index in data">{{index}}</li>
  </ul>`)
class App extends mokit.Component {
  data = data;
}

console.time('mokit');
window.app = mokit(App, mountNode);
console.timeEnd('mokit');
console.log('count', document.querySelectorAll('li').length);