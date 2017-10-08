import each from './each';
import ifDirective from './if';
import prop from './prop';
import attr from './attr';
import on from './on';
import html from './inner-html';
import text from './inner-text';
import prevent from './prevent';
import id from './id';
import show from './show';
import model from './model';
import focus from './focus';
import anyAttribute from './attribute'; //处理所有未知 attr
import anyText from './text'; //处理所有 text 
import className from './class'; //处理 className

export default {
  '#text': anyText,
  '*': anyAttribute,
  'if': ifDirective,
  'class': className,
  each, prop, attr, on, html, text,
  prevent, id, show, model, focus
};