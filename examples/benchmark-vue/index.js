import Vue from 'vue/dist/vue';
import Stats from 'stats.js';

const data = new Array(1000).fill(0);

const App = Vue.extend({
  template: `<ul>
  <li v-for="item in data" >{{item}}</li>
  </ul>`,
  data() {
    return { data: data };
  }
});

console.time('vue');
const app = new App();
app.$mount(mountNode);
window.app = app;
console.timeEnd('vue');
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