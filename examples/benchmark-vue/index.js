import Vue from 'vue/dist/vue';

const data = new Array(1000).fill('');

const App = Vue.extend({
  template: `<ul>
  <li v-for="item in data" >{{item+'x'}}</li>
  </ul>`,
  data() {
    return { data };
  }
});

console.time('vue');
const app = new App();
app.$mount(mountNode);
window.app = app;
console.timeEnd('vue');
console.log('count', document.querySelectorAll('li').length);