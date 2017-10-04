import meta from './meta';
import components from './components';
import directives from './directives';
import event from './event';
import model from './model';
import template from './template';
import watch from './watch';

const on = event;
const dependencies = components;

export default {
  meta, event, on, model, watch,
  template, components, dependencies, directives
};