import mokit from 'mokit';

const data = new Array(10000).fill('');

@mokit.template(`<ul>
  <li m:each="index in data">{{index}}</li>
  </ul>`)
class App extends mokit.Component {
  data = data;
}

console.time('mokit');
window.todo = mokit(App, mountNode);
console.timeEnd('mokit');
console.log('count', document.querySelectorAll('li').length);