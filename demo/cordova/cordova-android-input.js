(function() {
	if (typeof cordova !== "undefined") {
		/**
		 * Constructor
		 */
		function Input() {
			this._callback;
		}

		Input.prototype.show = function(args,call) {
				cordova.exec(function(editContent) {
					if(call)call(editContent);
				}, function(error) {
					alert("error:"+error);
				}, 'Input', "", new Array(args));
		};

		// ****
		cordova.addConstructor(function() {
			if (!window.plugins) {
				window.plugins = {};
			}
			window.plugins.input = new Input();
		});
		// --
	}
})();
