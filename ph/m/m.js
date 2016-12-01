function 物质()
{

}
物质.prototype.质量 = function(m)
{
	return m;
}

物质.prototype.速度 = function(a0,g,t)
{
	return a0+g*t;
}
物质.prototype.位移 = function(a0,g,t)
{
	return a0*t+g*t*t/2;
}

function 力场()
{
	this.G = 6.67*0.00000000001;
}
力场.prototype.引力场 = function(m,len)
{
	return (this.G*m)/(len*len)
}
var  时间=
{
	动作:[],
	t:'',
	开始:function()
	{
		var self = this;
		window.宙=0;
		this.t = setInterval((function(self){return function()
			{
				window.宙++;
				for(var i=0;i<self.动作.length;i++)
				{
					self.动作[i]();
				}
			}})(self),1);
	},
	暂停:function()
	{
		clearInterval(this.t);
	},
	加入:function(action)
	{
		this.动作.push(action);
	}
}