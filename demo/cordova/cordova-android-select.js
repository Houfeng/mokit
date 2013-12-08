(function() {
	if (typeof cordova !== "undefined") {
		/**
		 * Constructor
		 */
		function Select() {
			this._callback;
		}

		Select.prototype.show = function(_element,_change) {
			_element = $(_element);
			var _title=_element.attr('title') || '';
			var _mode = _element.attr('multiple') || 'single';
			var _items= _element.find('option');
			var _selected=0;
			var _itemData=[];
			_items.each(function(){
				if($(this).attr('selected')){
					_selected=_items.index(this);
				}
				_itemData.push($(this).text());
			});
			cordova.exec(function(_selected) {
				_items.removeAttr('selected');
				$(_items[_selected]).attr('selected','selected');
				_element.change();
				if(_change)_change(_selected);
			}, function(error) {
				alert("error:"+error);
			}, 'Select', "", new Array({
				mode : _mode,
				data : _itemData,
				title: _title,
				selected:_selected
			}));
		};

		// ****
		cordova.addConstructor(function() {
			if (!window.plugins) {
				window.plugins = {};
			}
			window.plugins.select = new Select();
		});
		// --
	}
})();
