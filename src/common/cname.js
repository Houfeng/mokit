import { isString, isArray, isObject, startWith } from 'ntils';

export default function className(name, prefix) {
  if (!name) {
    return '';
  } else if (isString(name) && name.indexOf(' ') > -1) {
    return className(name.split(' '), prefix);
  } else if (isString(name) && name.indexOf(',') > -1) {
    return className(name.split(','), prefix);
  } else if (isArray(name)) {
    return name.map(item => className(item, prefix)).join(' ').trim();
  } else if (isObject(name)) {
    return className(Object.keys(name).filter(key => name[key]), prefix);
  } else if (startWith(name, prefix)) {
    return name;
  } else {
    let trimedName = name
      .trim()
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase();
    if (!trimedName) return '';
    return prefix ? `${prefix}-${trimedName}` : trimedName;
  }
}