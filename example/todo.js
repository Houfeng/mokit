import mokit from 'mokit';
import App from './app';

import './assets/index.less';

mokit({
  element: document.body,
  components: { App },
}).start();