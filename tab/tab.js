define(function(require,exports,module)
{
	var api = require('./api');
	function tab(superEl,el)
	{
		var tabNavBar = document.querySelector(superEl);
		api.delegate(tabNavBar,'click',el,callback);
		function callback(tar)
		{
			var tabNavActive = document.querySelector('.tab-nav-active');
			tabNavActive.className = tabNavActive.className.replace(' tab-nav-active','');
			tabNavActive.className = tabNavActive.className.replace('tab-nav-active','');
			tar.className = tar.className+' tab-nav-active';

			var tabSectionActive = document.querySelector('.tab-section-active');
			var tabSectionParent = tabSectionActive.parentNode;
			tabSectionActive.className = tabSectionActive.className.replace(' tab-section-active','');
			tabSectionActive.className = tabSectionActive.className.replace('tab-section-active','');
			var childArr = tabSectionParent.children||tabSectionParent.childNodes;
			childArr[api.nodeIndex(tar)].className = childArr[api.nodeIndex(tar)].className+' tab-section-active';
		}
	}
exports.tab= tab;
})