define(function(require,exports,module)
{
	var api = require('./api');
	function move(tar,listen)
	{
		api.addEvent(tar,'mousedown',mouseDown,false);
		var bodyCss = window.getComputedStyle(document.body);
		var bodyWidth = document.body.offsetWidth+parseInt(bodyCss.marginLeft)+parseInt(bodyCss.marginRight);
		var bodyHeight = window.innerHeight>document.body.offsetHeight?window.innerHeight:document.body.offsetHeight;
		var firstMouseX = 0;
		var firstMouseY = 0;
		var firstTarX = 0;
		var firstTarY = 0;
			 console.log(bodyHeight)
		function mouseDown(event)
		{
			api.addEvent(document,'mousemove',mouseMove,false);
			api.addEvent(document,'mouseup',mouseUp,false);
			firstMouseX = event.pageX;
			firstMouseY = event.pageY;
			var tarCss = window.getComputedStyle(tar);
			firstTarX= tar.offsetLeft-parseInt(tarCss.marginLeft);
			firstTarY = tar.offsetTop-parseInt(tarCss.marginTop);
			console.log('down')
		}
		function mouseUp()
		{
			api.removeEvent(document,'mousemove',mouseMove,false);
			api.removeEvent(document,'mouseup',mouseUp,false);
			listen.emmit('up');
			console.log('up')
		}

		function mouseMove(event)
		{
			var mouseX = event.pageX;
			var mouseY = event.pageY;
			var offsetX = mouseX - firstMouseX;
			var offsetY = mouseY - firstMouseY;
			var tarCss = window.getComputedStyle(tar);		
			tar.style.left = (firstTarX+offsetX)+'px';
			tar.style.top = (firstTarY+offsetY)+'px';
			if(tar.offsetLeft<0)
				tar.style.left = parseInt(tar.style.left)-tar.offsetLeft+'px';
			if(tar.offsetLeft+tar.offsetWidth>bodyWidth)
				tar.style.left = bodyWidth-tar.offsetWidth+parseInt(tarCss.left)-tar.offsetLeft+'px';
			if(tar.offsetTop<0)
				tar.style.top = parseInt(tar.style.top)-tar.offsetTop+'px';
			if(tar.offsetTop+tar.offsetHeight>bodyHeight)
			 	tar.style.top = bodyHeight-tar.offsetHeight+parseInt(tarCss.top)-tar.offsetTop+'px';

		}
	} 
	exports.move = move;
})