define(function(define, exports, module) {

    var Class = require("mokit/class");

    var Tap = Class.create({
        element: null,
        initialize: function(element) {
            var self = this;
            self.element = element;
        },
        
    });

    return tap;

});