define(function(require, exports, module) {

    var ajax = require("mokit/ajax");
    var serviceUrl = "http://192.168.0.80:250/service.ashx";

    return {
        login: function(loginInfo, callback) {
            ajax.post({
                url: serviceUrl,
                data: {
                    loginInfo: loginInfo,
                    method: "login",
                    callback: callback
                }
            });
        }
    };
});