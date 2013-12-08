/**
 * Phonegap DatePicker Plugin Copyright (c) Greg Allen 2011 MIT Licensed
 * Reused and ported to Android plugin by Daniel van 't Oever
 */

(function(){
	if (typeof cordova !== "undefined") {
		/**
		 * Constructor
		 */
		function DatePicker() {
			this._callback;
		}

		/**
		 * show - true to show the ad, false to hide the ad
		 */
		DatePicker.prototype._show = function(options, cb) {
			if (options.date) {
				options.date = (options.date.getMonth() + 1) + "/" + (options.date.getDate()) + "/" + (options.date.getFullYear()) + "/"
						+ (options.date.getHours()) + "/" + (options.date.getMinutes());
			}
			var defaults = {
				mode : '',
				date : '',
				allowOldDates : true
			};

			for ( var key in defaults) {
				if (typeof options[key] !== "undefined")
					defaults[key] = options[key];
			}
			this._callback = cb;

			return cordova.exec(cb, failureCallback, 'DateTimePicker', defaults.mode, new Array(defaults));
		};

		DatePicker.prototype._dateSelected = function(date) {
			var d = new Date(parseFloat(date) * 1000);
			if (this._callback)
				this._callback(d);
		};

		function failureCallback(err) {
			console.log("datePickerPlugin.js failed: " + err);
		}
		
		//****
		var _parseDate=function(dt){
			try{
	    		if(typeof(dt)=='number'){
	    			dt=new Date(dt);
	    		}
	    		else if(typeof(dt)=='string'){
	    			dt=new Date(dt.replace(new RegExp('-', "gm"), '/')
	    						  .replace(new RegExp('上', "gm"), '')
	    						  .replace(new RegExp('下', "gm"), '')
	    						  .replace(new RegExp('午', "gm"), ''));
	    		}
			}catch(ex){
				dt=new Date();
			}
			return dt;
	    };
	    //--
		var _formatDate=function(dateObj, fmtStr, cap){
			if(/^\d+$/.test(dateObj)){
				dateObj = new Date(dateObj);
			}else if(/\/|\-/.test(dateObj)){
				dateObj = new Date(dateObj.replace(/\-/g,"/"));
			}
			var y = dateObj.getFullYear().toString();
			var m = dateObj.getMonth()+1;
			var d = dateObj.getDate();
			var h = dateObj.getHours();
			var i = dateObj.getMinutes();
			var s = dateObj.getSeconds();
			var w = dateObj.getDay();
			var f = function(n){
				return function(s){
					return s.length>1&&n<10?"0"+n:n;
				};
			};
			var attr = cap ? "" : "i";
			return fmtStr.replace(new RegExp("Y+",attr),function(s){return y.slice(-s.length);})
				.replace(new RegExp("M+",attr),f(m))
				.replace(new RegExp("D+",attr),f(d))
				.replace(new RegExp("H+",attr),f(h))
				.replace(new RegExp("I+",attr),f(i))
				.replace(new RegExp("S+",attr),f(s))
				.replace(/w/i,function(s){return s=="w"?w:w;});
		};
		//--
		DatePicker.prototype.show=function(_currentField){
			var currentField = $(_currentField);
			currentField.attr('readonly','readonly');
			//
	        var currentMode=currentField.attr('type') || 'datetime';
	        var currentFormat=currentField.attr('date-format');
	        var _value=null;
	        if(currentMode=='datetime' && !currentFormat){
	        	currentFormat= 'yyyy-mm-dd hh:ii';
	        	_value=_parseDate(currentField.val());
	        }
	        if(currentMode=='date' && !currentFormat){
	        	currentFormat= 'yyyy-mm-dd';
	        	_value=_parseDate(currentField.val());
	        }
	        if(currentMode=='time' && !currentFormat){
	        	currentFormat= 'hh:ii';
	        	_value=_parseDate('2000/01/01 '+currentField.val());
	        }
	        var currentDate = _parseDate(currentField.attr('date-value')) || _value || new Date();
	        this._show({
	            date : currentDate,
	            mode : currentMode, 
	            allowOldDates : true
	        }, function(returnDate) {
	        	currentField.attr('date-value',returnDate);
	            var theDate = _parseDate(returnDate) || new Date();
	            currentField.val(_formatDate(theDate,currentFormat));
	            currentField.change().blur();
	        });
	        currentField.change().blur();
		};
		//****
		cordova.addConstructor(function() {
			if (!window.plugins) {
				window.plugins = {};
			}
			window.plugins.datePicker = new DatePicker();
			//
		});
		//--
	};
})();



