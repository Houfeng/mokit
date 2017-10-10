import EventEmitter from 'events';
import { Error } from 'common';
import { isNull, parseHTML } from 'ntils';

function toDOMNode(node) {
  if (!node) {
    throw new Error('Invalid node');
  }
  let domNode = node.domNode || node;
  if (!(domNode instanceof window.Node)) {
    throw new Error('Invalid DOM node');
  }
  return domNode;
}

export default class Node extends EventEmitter {

  static create(name) {
    let node = name ? document.createElement(name) :
      document.createTextNode('');
    return new Node(node);
  }

  static createFragment() {
    let fragment = document.createDocumentFragment();
    return new Node(fragment);
  }

  static parse(str) {
    let nodeItems = parseHTML(str);
    if (nodeItems.length != 1) {
      throw new Error([
        'Must be a single root element', str
      ].join('\r\n'));
    }
    return nodeItems[0];
  }

  constructor(node) {
    super();
    this.domNode = toDOMNode(node);
  }

  insertTo(mountNode) {
    mountNode = toDOMNode(mountNode);
    if (mountNode.parentNode) {
      mountNode.parentNode.insertBefore(this.domNode, mountNode);
    }
  }

  appendTo(mountNode) {
    mountNode = toDOMNode(mountNode);
    mountNode.appendChild(this.domNode);
  }

  appendChild(childNode) {
    childNode = toDOMNode(childNode);
    this.domNode.appendChild(childNode);
  }

  remove() {
    if (this.domNode.parentNode) {
      this.domNode.parentNode.removeChild(this.domNode);
    }
  }

  cloneNode(deep) {
    let node = this.domNode.cloneNode(deep);
    return new Node(node);
  }

  find(selector) {
    let items = [].slice.call(this.domNode.querySelectorAll(selector));
    return items.map(item => new Node(item));
  }

  focus() {
    this.domNode.focus();
  }

  blur() {
    this.domNode.blur();
  }

  setAttribute(name, value) {
    this.domNode.setAttribute(name, value);
  }

  getAttribute(name) {
    return this.domNode.getAttribute(name);
  }

  removeAttribute(name) {
    this.domNode.removeAttribute(name);
  }

  setProperty(name, value) {
    this.domNode[name] = value;
    if (this.component) this.component[name] = value;
  }

  getProperty(name, value) {
    if (this.component) return this.component[name];
    return this.domNode[name];
  }

  removeProperty(name) {
    delete this.domNode[name];
    if (this.component) delete this.component[name];
  }

  get compiled() {
    return !!this.domNode._compiled_;
  }

  set compiled(value) {
    this.domNode._compiled_ = value;
  }

  get component() {
    return this.domNode.component;
  }

  set component(value) {
    this.domNode.component = value;
  }

  get nodeName() {
    return this.domNode.nodeName;
  }

  get tagName() {
    return this.domNode.tagName;
  }

  get nodeValue() {
    return this.domNode.nodeValue;
  }

  set nodeValue(value) {
    if (this.domNode.nodeValue === value) return;
    this.domNode.nodeValue = value;
  }

  get childNodes() {
    let items = [].slice.call(this.domNode.childNodes);
    return items.map(item => new Node(item));
  }

  get attributes() {
    return this.domNode.attributes;
  }

  get innerHTML() {
    return this.domNode.innerHTML;
  }

  set innerHTML(value) {
    if (this.domNode.innerHTML === value) return;
    this.domNode.innerHTML = value;
  }

  get innerText() {
    return this.domNode.innerHTML;
  }

  set innerText(value) {
    if (this.domNode.innerText === value) return;
    this.domNode.innerText = value;
  }

  get options() {
    let items = [].slice.call(this.domNode.options);
    return items.map(item => new Node(item));
  }

  get classList() {
    return this.domNode.classList;
  }

  get value() {
    return this.domNode.value;
  }

  set value(val) {
    this.domNode.value = val;
  }

  get checked() {
    return this.domNode.checked;
  }

  set checked(value) {
    if (this.domNode.checked === value) return;
    this.domNode.checked = value;
  }

  get selected() {
    return this.domNode.selected;
  }

  set selected(value) {
    if (this.domNode.selected === value) return;
    this.domNode.selected = value;
  }

  get parentNode() {
    return this.domNode.parentNode;
  }

  get target() {
    return this.component || this.domNode;
  }

  get emitter() {
    if (!this._emitter) this._emitter = new EventEmitter(this.target);
    return this._emitter;
  }

}