import mokit from 'mokit';
import App from './app';

import './assets/todo.less';

class MyApp extends App { }

window.todo = mokit(MyApp, document.body);