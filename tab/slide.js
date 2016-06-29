define(function(require,exports,module)
{
	var api = require('./api');
	function slide()
	{
		var slideWidth = 0
		if(window.innerWidth>768)
		 slideWidth = document.body.clientWidth*0.4;
		else
		 slideWidth = document.body.clientWidth;
		var mediaAll = document.querySelector('.media-content-all');

		var mediaTab = document.querySelector('.media-tab');
		var slideContent = document.querySelector('.media-slide');
		slideContent.style.width = 3*slideWidth+'px';
		api.delegate(mediaTab,'mouseover','LI',callback);
		function callback(tar)
		{
			var mediaTabLi = document.querySelector('.media-tab-select');
			mediaTabLi.className = mediaTabLi.className.replace('media-tab-select','');
			tar.className = tar.className+' media-tab-select';
			var eleNum = mediaTab.children.length;
			var data = tar.getAttribute('data-media');
			var left = -(data-1)*slideWidth;
			slideContent.style.transition = 'all 0.5s ease-in-out';
			slideContent.style.left = left+'px';
		}

	}
	exports.slide = slide;

})