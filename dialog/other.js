define(function(require,exports,module)
{
	function fun(listen)
	{
		listen.on('up',function(){console.log('鼠标up')})
	}
	exports.fun = fun;
})