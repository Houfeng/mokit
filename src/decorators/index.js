import meta from './meta';
import components from './components';
import directives from './directives';
import event from './event';
import model from './model';
import template from './template';
import watch from './watch';

export default {
  meta, event, on: event, model, watch,
  template, components, directives
};