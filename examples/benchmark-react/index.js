import React from 'react';
import ReactDOM from 'react-dom';
import Stats from 'stats.js';

const data = new Array(1000).fill(0);

class App extends React.Component {
  state = { data: data };
  render() {
    return <ul>
      {this.state.data.map((item, index) => <li key={index}>{item}</li>)}
    </ul>;
  }
}

console.time('react');
window.app = ReactDOM.render(<App />, mountNode);
console.timeEnd('react');
console.log('count', document.querySelectorAll('li').length);

//-------------------------------------------------------
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);
let index = 0;
function animate() {
  stats.begin();
  data.fill(index++);
  app.setState({ data: data });
  stats.end();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);