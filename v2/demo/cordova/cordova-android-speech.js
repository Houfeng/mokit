(function() {
	if (typeof cordova !== "undefined") {
		/**
		 * Constructor
		 */
		function Speech() {
			this._callback;
		}

		Speech.prototype.start = function(option) {
			option.text = option.text || "";
			option.lang = option.text || "zh-cn";
			cordova.exec(function(rs) {
				rs=(rs||"").split(',');
				if (option.callback)
					option.callback(rs);
			}, function(error) {
				if (option.error)
					option.error(error);
			}, 'Speech', "", new Array({
				'text' : option.text,
				'lang' : option.lang
			}));
		};

		// ****
		cordova.addConstructor(function() {
			if (!window.plugins) {
				window.plugins = {};
			}
			window.plugins.speech = new Speech();
		});
		// --
	}
})();
