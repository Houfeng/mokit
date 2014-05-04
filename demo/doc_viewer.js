define(function(require, exports, module) {
    var self = exports;

    var Hammer = require('../src/hammer');
    var $ = require('../src/jquery');

    var setStyle = function(frm, styles) {
        window.setTimeout(function() {
            var win = frm[0].contentWindow;
            var head = win.document.head || win.document.getElementsByTagName('head')[0];
            head.innerHTML += ("<style>" + styles + "</style>");
            frm.show();
        },0);
    };

    var setTouch = function(frm) {
        window.setTimeout(function() {
            var win = frm[0].contentWindow;
            var body = win.document.body || win.document.getElementsByTagName('body')[0];
            //body.setAttribute('style','');
            Hammer(body).on("tap",function() {
                //alert('you doubletapped me!');
                return false;
            });
        },1000);
    };

    self.use = function(frm) {
        frm.hide();
        frm.on('load',function() {
            setStyle(frm, ".s1{width:auto !important;}");
            setTouch(frm);
        });
    };
});