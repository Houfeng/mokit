(function() {
	if (typeof cordova !== "undefined") {
		/**
		 * Constructor
		 */
		function PushMessage() {
			this._callback;
		}

		PushMessage.prototype._getDeviceToken = function(callback) {
			var token = cordova.exec(null, null, 'PushMessage',
					"getDeviceToken", new Array({}));
			if (device)
				device.token = token;
			if (callback)
				callback(token);
			return token;
		};
		PushMessage.prototype.getDeviceCode=function(callback){
			var me=this;
			me._getDeviceToken(function(_token){
				if(callback && _token){
					callback(_token);
				}
				else{
					me.getDeviceCode(callback);
				}
			});
		};

		PushMessage.prototype.setLang = function(lang) {
			cordova.exec(null, null, 'PushMessage', "setLang", new Array(lang));
		};

		// ****
		cordova.addConstructor(function() {
			if (!window.plugins) {
				window.plugins = {};
			}
			window.plugins.pushMessage = new PushMessage();
			window.plugins.pushMessage.getDeviceToken();
		});
		// --
	}
	;
})();
