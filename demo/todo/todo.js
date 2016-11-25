(function () {

  var List = new mokit.Component({
    template: `<ul>
      <li m:each="item,index of list">
        <input type="checkbox" m:model="item.done"/>
        <span class="{{item.done?'done':''}}">{{item.text}}</span>
        <a m:on:click="del(index)">删除</a>
      </li>
    </ul>`,
    properties: {
      list: null
    },
    del: function (index) {
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
    add: function () {
      if (!this.text) return;
      this.list.push({
        text: this.text,
        done: false
      });
      this.text = ''
    }
  }).create();

})();