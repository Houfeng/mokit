import mokit from 'mokit';

export default new mokit.Component({
  template: require('./list.html'),
  properties: {
    list: null
  },
  edit: function (item, state) {
    item.editing = state;
    this.$emit('edit', item);
  },
  del: function (item) {
    this.$emit('del', item);
  },
  onReady: function () {
  }
});