define(function(require,exports,moudle)
{

	var move = require('./move');
	var popwin = require('./popwin');
	function dialog(listen)
	{

		var div = document.createElement('div');
		div.setAttribute('class','dialog');	
		var dialogM = new popwin.pop('#a','.dialog','click',div,1,'rgba(155,155,155,0.8)',1,listen);
		dialogM.addEvent();

		move.move(div,listen);

	}

	exports.dialog = dialog;

})
