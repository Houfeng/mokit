/**
 * DockLayout
 * varstion 1.0.0
 * by Houfeng
 * Houfeng@DCloud.io
 */

(function($, window, document) {

	var styleContainer = (document.head || document.body);
	var styleElement = document.createElement('style');
	styleContainer.appendChild(styleElement);
	styleElement.innerHTML = '[data-layout="dock"]{position:relative !important;box-sizing:border-box !important;}\r\n[data-layout="dock"] [data-dock]{position:absolute !important;box-sizing:border-box !important;}';

	/**
	 * 定义 DockLayout 类型
	 **/
	var DockLayout = $.DockLayout = function(container, options) {
		var self = this;
		self.container = container;
		self.options = options || {};
		self.init();
		self.findItems();
		self.calc();
		self.bindEvents();
	};

	/**
	 * 初始化
	 **/
	DockLayout.prototype.init = function() {
		var self = this;
		self.container.setAttribute('data-layout', 'dock');
	};

	/**
	 * 为元素添加事件
	 **/
	DockLayout.prototype.addEvent = function(element, eventName, eventHandler) {
		var mark = '__' + eventName + '__edded';
		if (element[mark]) return;
		element[mark] = true;
		element.addEventListener(eventName, eventHandler, false);
	};

	/**
	 * 绑定事件
	 **/
	DockLayout.prototype.bindEvents = function() {
		var self = this;
		self.calecHandler = self.calecHandler || function(event, domChanged) {
			if (event.target == window ||
				event.target == self.container ||
				self.items.indexOf(event.target) > -1) {
				setTimeout(function() {
					self.calc(domChanged);
				}, 0);
			}
			event.stopPropagation();
			return false;
		};
		self.calecHandlerForDomChanged = self.calecHandlerForDomChanged || function(event) {
			return self.calecHandler(event, true);
		};
		self.addEvent(window, 'resize', self.calecHandler);
		self.addEvent(self.container, 'resize', self.calecHandler);
		self.items.forEach(function(item) {
			self.addEvent(item, 'resize', self.calecHandler);
		});
		self.addEvent(self.container, 'DOMNodeInserted', self.calecHandlerForDomChanged);
		self.addEvent(self.container, 'DOMAttrModified', self.calecHandlerForDomChanged);
		self.addEvent(self.container, 'DOMNodeRemoved', self.calecHandlerForDomChanged);
	};

	/**
	 * 查找所有项
	 **/
	DockLayout.prototype.findItems = function() {
		var self = this;
		self.items = [].slice.call(self.container.querySelectorAll('[data-dock]')).map(function(item) {
			if (item.parentNode == self.container) {
				return item;
			}
		});
	};

	/**
	 * 计算一个布局元素
	 **/
	DockLayout.prototype.calcItem = function(item, dock) {
		var self = this;
		switch (dock) {
			case 'top':
				item.style.bottom = 'auto';
				item.style.top = self.padding.top + 'px';
				item.style.left = self.padding.left + 'px';
				item.style.right = self.padding.right + 'px';
				item.style.width = (self.width - self.padding.left - self.padding.right) + 'px';
				self.padding.top += item.offsetHeight;
				break;
			case 'right':
				item.style.left = 'auto';
				item.style.right = self.padding.right + 'px';
				item.style.top = self.padding.top + 'px';
				item.style.bottom = self.padding.bottom + 'px';
				item.style.height = (self.height - self.padding.top - self.padding.bottom) + 'px';
				self.padding.right += item.offsetWidth;
				break;
			case 'bottom':
				item.style.top = 'auto';
				item.style.bottom = self.padding.bottom + 'px';
				item.style.left = self.padding.left + 'px';
				item.style.right = self.padding.right + 'px';
				item.style.width = (self.width - self.padding.left - self.padding.right) + 'px';
				self.padding.bottom += item.offsetHeight;
				break;
			case 'left':
				item.style.right = 'auto';
				item.style.left = self.padding.left + 'px';
				item.style.top = self.padding.top + 'px';
				item.style.bottom = self.padding.bottom + 'px';
				item.style.height = (self.height - self.padding.top - self.padding.bottom) + 'px';
				self.padding.left += item.offsetWidth;
				break;
			case 'fill':
				item.style.left = self.padding.left + 'px';
				item.style.right = self.padding.right + 'px';
				item.style.top = self.padding.top + 'px';
				item.style.bottom = self.padding.bottom + 'px';
				item.style.height = (self.height - self.padding.top - self.padding.bottom) + 'px';
				item.style.width = (self.width - self.padding.left - self.padding.right) + 'px';
				self.padding.top += item.offsetHeight;
				self.padding.right += item.offsetWidth;
				self.padding.bottom += item.offsetHeight;
				self.padding.left += item.offsetWidth;
				break;
		};
	};

	/**
	 * 计算布局
	 **/
	DockLayout.prototype.calc = function(domChanged) {
		var self = this;
		self.padding = {
			top: parseInt(self.container.style.paddingTop || 0),
			right: parseInt(self.container.style.paddingRight || 0),
			bottom: parseInt(self.container.style.paddingBottom || 0),
			left: parseInt(self.container.style.paddingLeft || 0)
		};
		self.width = self.container.offsetWidth - self.padding.left - self.padding.right;
		self.height = self.container.offsetHeight - self.padding.top - self.padding.bottom;
		if (domChanged) {
			self.findItems();
		}
		self.items.forEach(function(item) {
			var dock = item.getAttribute('data-dock');
			if (dock) {
				self.calcItem(item, dock);
			}
		});
		if (domChanged) {
			self.bindEvents();
		}
	};

	/**
	 * mui 扩展方法
	 **/
	$.fn.dock = function(options) {
		this.each(function(i, item) {
			item.dockLayout = new DockLayout(item, options);
		});
		return this;
	};

})(mui, window, document);