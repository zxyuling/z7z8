 define(function(require,exports,module)
 {
	function pubSub()
	{
		this.eventSort = new Array();

	}
	pubSub.prototype.on = function(event,callback)
	{

		if(this.eventSort[event])
			this.eventSort[event].push(callback);
		else
		{
			this.eventSort[event] = new Array();
			this.eventSort[event].push(callback);
		}
	};
	pubSub.prototype.emmit = function(event)
	{
		var i = 0;
		for(;i<this.eventSort[event].length;i++)
		{
			this.eventSort[event][i]();
		}
	}
	exports.pubSub = pubSub;
 })


