(function () {

  var List = new mokit.Component({
    template: '<ul><li m:each="item,index of list">{{item.text}} <button m:on:click="del(index)">删除</button></li></ul>',
    properties: {
      list: null
    },
    del: function (index) {
      this.list.splice(index, 1);
    }
  });

  var app = new mokit({
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
        text: this.text
      });
      this.text = ''
    }
  }).create();

})();