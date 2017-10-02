import Template from '../src/template';

let template = new Template(document.body);
let data = {
  name: 'bob',
  show(name) {
    alert(name)
  }
};

template.on('update', function (event) {
  console.log('update', event);
});

template.bind(data);

window.data = data;