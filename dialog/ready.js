 define(function(require,exports,module)
 {
	function ready(href)
	{
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = href;
		document.querySelector('head').appendChild(link);
	}
	exports.ready = ready;
 })

