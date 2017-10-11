import mokit from 'mokit';
import App from './app';
import './assets/todo.less';

console.profile('app');
window.todo = mokit(App, document.body);
console.log(document.querySelectorAll('li').length);
console.profileEnd();