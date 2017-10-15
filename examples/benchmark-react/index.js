import React from 'react';
import ReactDOM from 'react-dom';

const data = new Array(1000).fill('');

class App extends React.Component {
  state = { data };
  render() {
    return <ul>
      {data.map((item, index) => <li key={index}>{index}</li>)}
    </ul>;
  }
}

console.time('react');
window.app = ReactDOM.render(<App />, mountNode);
console.timeEnd('react');
console.log('count', document.querySelectorAll('li').length);