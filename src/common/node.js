import EventEmitter from 'events';
import { Error } from 'common';
import { isNull, parseHTML, final } from 'ntils';

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

//托管的 dom，所有 dom 操作都需要基于这个 class 完成
//除 removed 事件外，暂不需求其它事件，考虑到性能就暂不 emit 其它事件
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
    if (node instanceof Node) return node;
    let domNode = toDOMNode(node);
    if (domNode._node_) return domNode._node_;
    final(this, 'domNode', domNode);
    final(domNode, '_node_', this);
  }

  _wrapEvent(opts) {
    opts = opts || {};
    opts.target = opts.target || this;
    return opts;
  }

  broadcast(name, opts) {
    opts = this._wrapEvent(opts);
    this.emit(name, opts);
    let childNodes = this.childNodes;
    if (!childNodes) return;
    childNodes.forEach(childNode => childNode.broadcast(name, opts));
  }

  dispatch(name, opts) {
    opts = this._wrapEvent(opts);
    this.emit(name, opts);
    let parentNode = this.parentNode;
    if (!parentNode) return;
    parentNode.dispatch(name, opts);
  }

  insertBy(mountNode, opts) {
    mountNode = toDOMNode(mountNode);
    if (mountNode.parentNode) {
      //this.broadcast('mount', opts);
      mountNode.parentNode.insertBefore(this.domNode, mountNode);
      //this.broadcast('mounted', opts);
    }
  }

  appendTo(mountNode, opts) {
    mountNode = toDOMNode(mountNode);
    //this.broadcast('mount', opts);
    mountNode.appendChild(this.domNode);
    //this.broadcast('mounted', opts);
  }

  appendChild(childNode, opts) {
    let node = new Node(childNode);
    node.appendTo(this, opts);
  }

  remove(opts) {
    if (this.domNode.parentNode) {
      //this.broadcast('remove', opts);
      this.domNode.parentNode.removeChild(this.domNode);
      this.broadcast('removed', opts);
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
    let parentNode = this.domNode.parentNode;
    if (!parentNode) return null;
    return new Node(this.domNode.parentNode);
  }

  get target() {
    return this.component || this.domNode;
  }

  get emitter() {
    return new EventEmitter(this.target);
  }

}