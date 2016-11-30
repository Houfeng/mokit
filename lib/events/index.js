const EventEmitter = require('./emitter');
const touch = require('./touch');

EventEmitter.touch = touch;
EventEmitter.register(touch);

module.exports = EventEmitter;