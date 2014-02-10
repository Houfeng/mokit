define(function (require,exports,module) {
	var json = require('json');

	exports.load = function (name, req, onLoad, config) {
		var uri = req.toUrl(name);
		require('ems-text!'+ uri,function (rs) {
			onLoad(json.parse(rs));
		});
	};
});