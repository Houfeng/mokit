import mokit from 'mokit';
import Stats from 'stats.js';

const data = new Array(1000).fill(0);

@mokit.template(`<ul>
  <li m:each="item of data">{{item}}</li>
  </ul>`)
class App extends mokit.Component {
  data = data;
}

console.time('mokit');
window.app = mokit(App, mountNode);
console.timeEnd('mokit');
console.log('count', document.querySelectorAll('li').length);

//-------------------------------------------------------
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);
let index = 0;
function animate() {
  stats.begin();
  data.fill(index++);
  app.data = data;
  stats.end();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);