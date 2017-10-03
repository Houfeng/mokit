import mokit, { template } from 'mokit';

@template(require('./index.html'))
export default class List extends mokit.Component {
  list = [];

  edit(item, state) {
    item.editing = state;
    this.$emit('edit', item);
  }

  del(item) {
    this.$emit('del', item);
  }
}