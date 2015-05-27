define(function(require, exports, module) {
    //引入样式表
    require('./main.css');
    require('./icon.css');
    //
    var device=require('../device');
    alert(device.android());
});