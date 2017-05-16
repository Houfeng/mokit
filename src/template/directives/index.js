module.exports = {
  '#text': require('./text'),
  'each': require('./each'),
  'if': require('./if'),
  'prop': require('./prop'),
  'attr': require('./attr'),
  'on': require('./on'),
  'html': require('./inner-html'),
  'text': require('./inner-text'),
  'prevent': require('./prevent'),
  'id': require('./id'),
  'cloak': require('./cloak'),
  'show': require('./show'),
  'model': require('./model'),
  'focus': require('./focus'),
  '*': require('./attribute') //处理所有未知 attr
};