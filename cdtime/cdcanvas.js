define(function(require,exports,module){
	var beforestr='';
	var ball=[];
	var G = require('./jump');
	function cdcanvas(str,tar,padding,x,y,size,margin,color){//主函数，用于绘制计时的小球和弹跳的小球
		padding = padding?padding:200;
		x = x?x:10;
		y = y?y:10;
		size = size?size:10;
		margin = margin?margin:23;
		color = color?color:'rgb(0,0,136)';
		var canvas = document.querySelector(tar);
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0,0,1920,500);//每次绘制前清空画布
		var difflist = strDiff(beforestr,str);//比较本次较上一秒那些数字变动，存入数组
		for(var i=0;i<str.length;i++){
			pop(difflist[i],x,y,margin);//把每一个变动的字的每一个小球的位置存入ball,指定初始速度也存进去
			printStr(str[i],ctx,x,y,size,margin,color);//绘制数字
			x=x+padding;
		}
		beforestr = str;
		jump(ctx,size);//绘制跳到小球
	}
	function jump(ctx,size){
		for(var i =0;i<ball.length;i++){
			drawArc(ctx,ball[i].x,ball[i].y,size);
			if(ball[i].x<0||ball[i].x>1920||ball[i].y<0||ball[i].y>500){//小球超出边界就拿出数组
				ball.splice(i,1)
			}
			else{//不然就计算位移
				ball[i].y+=ball[i].my;
				ball[i].x+=ball[i].mx;
				ball[i].my = G.jump(ball[i].y,ball[i].my,500,0.6);//通过加速度函数，修改速度
			}
		}
		for(var i =0;i<ball.length;i++){
			drawArc(ctx,ball[i].x,ball[i].y,size,ballColor[ball[i].color]);//画圆
		}
	}
	function drawArc(ctx,x,y,size,color){
		ctx.beginPath();
		ctx.arc(x,y,size,0,360,false);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.closePath();
	}
	function pop(difflist,x,y,margin){
		var tx = x;
		var ty = y;
		if(+difflist!=10){
			var dot = reDot(difflist);
			for(var i = 0;i<dot.length;i++){
				for(var j=0;j<dot[i].length;j++){
					if(dot[i][j]==1){//将位置和速度存入ball
						tx=x+j*margin;
						ty=y+i*margin;
						my = Math.random()*10-5;
						mx = [-Math.random()*5-5,Math.random()*5+5][Math.ceil(Math.random()*2)-1];
						color = parseInt(Math.random()*9);
						ball.push({j:j,i:i,x:tx,y:ty,mx:mx,my:my,color:color});
					}
				}
			}
		}
	}
	function printStr(char,ctx,x,y,size,margin,color){//画数
		var dot = reDot(char);//返回数当前阵列

		for(var i = 0;i<dot.length;i++){
			for(var j=0;j<dot[i].length;j++){
				ctx.beginPath();
				ctx.arc(x+j*margin,y+i*margin,size,0,360,false);
				if(dot[i][j]==1)
					ctx.fillStyle = color
				else
					ctx.fillStyle = '#fff';
				ctx.fill();
				ctx.closePath();

			}
		}
	}
	function strDiff(strb,stra){//比较2个数组不同之处
		var list=[];
		for(var i=0;i<stra.length;i++){
			if(stra[i]!=strb[i])
				list.push(stra[i]);
			else
				list.push(10);
		}
		return list;
	}
	function reDot(char){//返回阵列

		if(char == ':')
			char = 10;
		return digit[parseInt(char)];
	}
var jumpBall = [];
var ballColor=["#33b5e5","#0099cc","#aa66cc","#9933cc","#9900cc","#669900","#ffbb33","#ff8800","#ff4444","#cc0000"];
var digit=[
	[//digit 0
	[0,1,1,1,1,1,0],
	[1,1,1,1,1,1,1],
	[1,1,0,0,0,1,1],
	[1,1,0,0,0,1,1],
	[1,1,0,0,0,1,1],
	[1,1,0,0,0,1,1],
	[1,1,0,0,0,1,1],
	[1,1,0,0,0,1,1],
	[1,1,1,1,1,1,1],
	[0,1,1,1,1,1,0]
	],

	[//digit 1
	[0,0,0,1,1,0,0],
	[0,0,1,1,1,0,0],
	[0,1,1,1,1,0,0],
	[0,0,0,1,1,0,0],
	[0,0,0,1,1,0,0],
	[0,0,0,1,1,0,0],
	[0,0,0,1,1,0,0],
	[0,0,0,1,1,0,0],
	[0,1,1,1,1,1,0],
	[0,1,1,1,1,1,0]
	],

	[//digit 2
	[0,0,1,1,1,0,0],
	[0,1,1,0,1,1,0],
	[1,1,0,0,0,1,1],
	[0,0,0,0,0,1,1],
	[0,0,0,0,1,1,0],
	[0,0,0,1,1,0,0],
	[0,0,1,1,0,0,0],
	[0,1,1,0,0,0,1],
	[1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1]
	],

	[//digit 3
	[0,0,1,1,1,0,0],
	[0,1,1,0,1,1,0],
	[1,1,0,0,0,1,1],
	[0,0,0,0,0,1,1],
	[0,0,0,1,1,1,0],
	[0,0,0,1,1,1,0],
	[0,0,0,0,0,1,1],
	[1,1,0,0,0,1,1],
	[0,1,1,0,1,1,0],
	[0,0,1,1,1,0,0]
	],

	[//digit 4
	[0,0,0,1,1,0,0],
	[0,0,0,1,1,0,0],
	[0,0,1,0,1,0,0],
	[0,1,1,0,1,0,0],
	[1,1,0,0,1,0,0],
	[1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1],
	[0,0,0,1,1,0,0],
	[0,0,0,1,1,0,0],
	[0,0,0,1,1,0,0]
	],

	[//digit 5
	[0,1,1,1,1,1,0],
	[0,1,1,1,1,1,0],
	[0,1,1,0,0,0,0],
	[0,1,1,1,1,0,0],
	[0,0,0,0,1,1,0],
	[0,0,0,0,0,1,1],
	[0,0,0,0,0,1,1],
	[0,0,0,0,1,1,0],
	[0,1,1,0,1,1,0],
	[0,1,1,1,1,0,0]
	],

	[//digit 6
	[0,0,1,1,1,0,0],
	[0,1,1,0,1,1,0],
	[0,1,1,0,0,0,0],
	[0,1,1,0,0,0,0],
	[0,1,1,1,1,1,0],
	[0,1,1,0,1,1,0],
	[0,1,1,0,0,1,1],
	[0,1,1,0,0,1,1],
	[0,1,1,0,1,1,0],
	[0,0,1,1,1,0,0]
	],

	[//digit 7
	[0,1,1,1,1,0,0],
	[1,1,1,1,1,1,0],
	[1,1,0,0,1,1,0],
	[1,1,0,0,1,1,0],
	[0,0,0,1,1,0,0],
	[0,0,0,1,1,0,0],
	[0,0,1,1,0,0,0],
	[0,0,1,1,0,0,0],
	[0,0,1,1,0,0,0],
	[0,0,1,1,0,0,0]
	],

	[//digit 8
	[0,0,1,1,1,0,0],
	[0,1,1,0,1,1,0],
	[1,1,0,0,0,1,1],
	[1,1,0,0,0,1,1],
	[0,1,1,1,1,1,0],
	[0,1,1,1,1,1,0],
	[1,1,0,0,0,1,1],
	[1,1,0,0,0,1,1],
	[0,1,1,0,1,1,0],
	[0,0,1,1,1,0,0]
	],

	[//digit 9
	[0,0,1,1,1,0,0],
	[0,1,1,0,1,1,0],
	[1,1,0,0,0,1,1],
	[1,1,0,0,0,1,1],
	[0,1,1,0,0,1,1],
	[0,0,1,1,1,1,1],
	[0,0,0,0,0,1,1],
	[1,1,0,0,0,1,1],
	[0,1,1,0,0,1,1],
	[0,0,1,1,1,1,0]
	],

	[//char :
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,1,1,0],
	[0,0,1,1,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,1,1,0],
	[0,0,1,1,0],
	[0,0,0,0,0],
	[0,0,0,0,0]
	]
];
	exports.cdcanvas = cdcanvas;
});