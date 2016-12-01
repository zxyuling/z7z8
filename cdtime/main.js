define(function(require,exports,module){
	var cdtime = require('./cdtime');
	var cdcanvas = require('./cdcanvas');
	var time = '';
	var option = {
		format:'hhmmss',
		total:'7200',
		before:function(){console.log('start')},
		after:function(){console.log('stop')},
		todo:function(t){
			time = t.toString().replace(/,/g,':');
			//cdcanvas.cdcanvas(time,'#cdtime');
		}
	}
	var timer = new cdtime.CdTime(option);
	timer.start()
	function render(){
		cdcanvas.cdcanvas(time,'#cdtime');
		requestAnimationFrame(render)
	}
	requestAnimationFrame(render);
	
});