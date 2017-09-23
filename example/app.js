import mokit from 'mokit';
import List from './list';

export default new mokit.Component({
  template: require('./app.html'),
  components: { List },
  data: function () {
    return {
      text: '',
      list: []
    };
  },
  onInit: function () {
    var list = localStorage.getItem('todo://list');
    if (list) this.list = JSON.parse(list);
    var type = localStorage.getItem('todo://type');
    if (type) this.type = type;
  },
  onReady: function () {
  },
  properties: {
    type: 'all',
    filteredList: function () {
      if (this.type == 'active')
        return this.list.filter(function (item) { return !item.done });
      else if (this.type == 'done')
        return this.list.filter(function (item) { return item.done });
      else
        return this.list;
    },
    doneCount: function () {
      return this.list.filter(function (item) { return item.done }).length;
    }
  },
  watches: {
    list: function (list) {
      localStorage.setItem('todo://list', JSON.stringify(list));
    },
    type: function (type) {
      localStorage.setItem('todo://type', type);
    }
  },
  del: function (item) {
    if (!confirm('Confirm delete?')) return;
    var index = this.list.indexOf(item);
    this.list.splice(index, 1);
  },
  add: function () {
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
});