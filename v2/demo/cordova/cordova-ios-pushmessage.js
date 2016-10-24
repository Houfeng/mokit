(function(){
	if (typeof cordova !== "undefined") {
		/**
		 * Constructor
		 */
		function PushMessage() {
			this._callback;
		}

		/**
		 * show - true to show the ad, false to hide the ad
		 */
		PushMessage.prototype.getDeviceToken = function(callback) {
			if(typeof device != "undefined" && typeof Cordova == "object"){
		        var getToken = function(types, success, fail){
		            Cordova.exec(success, fail, "PushMessage", "getToken", types);
		        };
		        getToken(["getToken"], function(token){
		            device.token = token;
		            if(callback)callback(token);
		            return token;
		         }, function(e){
		        	 if(callback)callback(null);
		             console.log("cannot get device token: "+e);
		             return false;
		         });
		    }else{
		    	if(callback)callback(null);
		        // console.log("device not ready, or not a native app");
		        return false;
		    }
		};

		//****
		cordova.addConstructor(function() {
			if (!window.plugins) {
				window.plugins = {};
			}
			window.plugins.pushMessage = new PushMessage();
			window.plugins.pushMessage.getDeviceToken();
		});
		//--
	};
})();
