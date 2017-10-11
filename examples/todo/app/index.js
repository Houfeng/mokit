import mokit from 'mokit';
import List from '../list';

const { on, watch, template, dependencies } = mokit;

@template(require('./index.html'))
@dependencies({ List })
export default class App extends mokit.Component {

  type = 'all';
  text = '';
  list = [];

  @on('init') onInit() {
    var list = localStorage.getItem('todo://list');
    if (list) this.list = JSON.parse(list);
    var type = localStorage.getItem('todo://type');
    if (type) this.type = type;
  }

  get filteredList() {
    if (this.type == 'active')
      return this.list.filter(function (item) { return !item.done });
    else if (this.type == 'done')
      return this.list.filter(function (item) { return item.done });
    else
      return this.list;
  }

  get doneCount() {
    return this.list.filter(function (item) { return item.done }).length;
  }

  @watch('list')
  saveList(list) {
    localStorage.setItem('todo://list', JSON.stringify(list));
  }

  @watch('type')
  saveType(type) {
    localStorage.setItem('todo://type', type);
  }

  del(item) {
    if (!confirm('Confirm delete?')) return;
    var index = this.list.indexOf(item);
    this.list.splice(index, 1);
  }

  add() {
    if (!this.text) return;
    this.list.push({
      text: this.text,
      done: false,
      editing: false
    });
    this.text = '';
    if (this.type == 'done') {
      this.type = 'all';
    }
  }
}