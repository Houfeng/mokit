import mokit from 'mokit';
import App from './app';
import './assets/todo.less';

console.time('用时');
window.todo = mokit(App, mountNode);
console.timeEnd('用时');
console.log('数量', document.querySelectorAll('li').length);