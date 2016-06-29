
define(function(require,exports,module)
{
	var ready = require('./ready');
	var tab = require('./tab');
	ready.ready('./base.css');
	tab.tab('.tab-nav-bar','LI');
	alert(document.currentScript.src)
})