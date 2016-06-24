define(function(require,exports,module)
{
	var ready = require('./ready');
	var pubSub = require('./listen');
	var dialog = require('./dialog');
	var other = require('./other');
	ready.ready('/javascripts/dialog/base.css');
	var moveListen = new pubSub.pubSub();
	other.fun(moveListen);
	dialog.dialog(moveListen);

})