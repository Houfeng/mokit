(function () {

  var List = new mokit.Component({
    template: `<ul>
      <li m:each="item of list" class="{{item.editing&&!item.done?'editing':''}}">
        <input type="checkbox" m:model="item.done"/>
        <span m:if="!item.editing||item.done" m:on:click="edit(item,true,$event)" class="{{item.done?'done':''}}">
          {{item.text}}
        </span>
        <input m:on:change="edit(item,false,$event)" m:on:blur="edit(item,false,$event)" type="text" m:if="item.editing&&!item.done" m:model="item.text"/>
        <a m:on:click="del(item)">DEL</a>
      </li>
    </ul>`,
    properties: {
      list: null
    },
    edit: function (item, state, event) {
      var itemEl = event.target.parentNode;
      item.editing = state;
      setTimeout(function () {
        var box = itemEl.querySelector('input[type="text"]');
        box && box.focus();
      }, 10);
    },
    del: function (item) {
      var index = this.list.indexOf(item);
      this.list.splice(index, 1);
    }
  });

  window.todo = new mokit({
    element: document.getElementById('app'),
    components: { list: List },
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
    add: function () {
      if (!this.text) return;
      this.list.push({
        text: this.text,
        done: false,
        editing: false
      });
      this.text = ''
    }
  }).create();

})();