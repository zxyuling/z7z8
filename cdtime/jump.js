define(function(require,exports,module){
	function jump(y,ay,height,thwarted){
		if(y>480&&ay>=0){
			if(ay<5)
				ay=0;
			ay = -ay*thwarted;
		}
		else{
			ay+=1;
		}
		return ay;
	}
	exports.jump = jump;
})