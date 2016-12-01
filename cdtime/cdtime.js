/*
 * create by zhouxuan;
 * 2016/8/10
 */
define(function(require,exports,module){
	class CdTime{
		/**
		 * [constructor description]初始化函数
		 * @param  {[type]} option [description] format:格式化，默认日时分秒都是2位不足2位补0;accuracy:倒计时速度，默认1s;todo：每秒的回调
		 * before·：倒计时前的回调;after倒计时结束的回调;total总的需要倒计时多少;endTime:到某个未来时间点的倒计时
		 * @return {[type]}        [description]
		 */
		constructor(option){
			this.config = {
				format 	 : option.format || 'ddhhmmss',
				accuracy : option.accuracy || 1000,
				todo	 : option.todo || function(){},
				before	 : option.before || function(){},
				after	 : option.after || function(){},
				total	 : option.total || 60,
				endTime  : option.endTime
			};
			this.timer = null;
			this.count = null;
		}
		/**
		 * [start description]外部调用开始计时
		 * @return {[type]} [description]
		 */
		start(){
			this._start();
		}
		/**
		 * [stop description]外部调用停止计时
		 * @return {[type]} [description]
		 */
		stop(){
			this._stop();	
		}
		/**
		 * [_start description]开始倒计时
		 * @return {[type]} [description]
		 */
		_start(){
			let self = this;
			self.config.before();
			if(typeof self.config.endTime!='undefined'){//如果存在endTime,有限以这个作为倒计时

				self.count = parseInt((self._endtimedel(self.config.endTime)-new Date().getTime())/1000);
				self._cooldown(self.count,self.config.accuracy);
			}
			else{
				self.count = self.config.total
				self._cooldown(self.count,self.config.accuracy);
			}
		}
		/**
		 * [_stop description]停止计时
		 * @return {[type]} [description]
		 */
		_stop(){
			let self = this
			clearInterval(self.timer);
			self.config.after();
		}
		/**
		 * [_cooldown description]倒计时
		 * @param  {[type]} count    [description]倒计时秒数
		 * @param  {[type]} accuracy [description]倒计时精度
		 * @return {[type]}          [description]
		 */
		_cooldown(count,accuracy){
			let self = this;
			self._doSth(count);
			this.timer = setInterval(function(){;
				count--;
				self._doSth(count);
				if(count<=0){
					self._stop();
				}
			},accuracy)
		}
		/**
		 * [_doSth description]每次倒计时执行的函数
		 * @param  {[type]} count [description]
		 * @return {[type]}       [description]
		 */
		_doSth(count){
			let self = this;
			self.config.todo(self._format(count));
		}
		/**
		 * [_endtimedel description]endTime 处理成时间戳
		 * @param  {[type]} time [description]
		 * @return {[type]}      [description]
		 */
		_endtimedel(time){
			let timeArray = time.split('-');
			for(let i = timeArray.length;i<7;i++)
				timeArray.push('0');
			let timeNode = new Date(timeArray[0],timeArray[1],timeArray[2],timeArray[3],timeArray[4],timeArray[5],timeArray[6]).getTime();
			return timeNode;
		}
		/**
		 * [_format description]格式化输出时间
		 * @param  {[type]} count [description]
		 * @return {[type]}       [description]
		 */
		_format(count){
			let time=[];
			time.push(this._rdate(count,86400));
			time.push(this._rdate(count,3600));
			time.push(this._rdate(count,60));
			time.push(this._rdate(count,1));
			let val = /(d*)(h*)(m*)(s*)/.exec(this.config.format);
			let newTime = [];
			for(let i=1;i<val.length;i++){
				let valLen = val[i].length;
				if(!val[i].length){
					continue;
				}
				let tmp = del(val,time,i);
				tmp = tmp.substr(-valLen,valLen);
				let left = new Array(valLen-tmp.length+1).join('0');
				newTime.push(left+tmp);
			}
			return newTime;
			/**
			 * [del description]处理每位时间
			 * @param  {[type]} val  [description]格式化位数
			 * @param  {[type]} time [description]需要格式的时间
			 * @param  {[type]} i    [description]当前位数
			 * @return {[type]}      [description]
			 */
			function del(val,time,i){
				if(i==2&&val[1].length)
					return (time[1]-time[0]*24).toString();
				else if(i==3&&val[2].length)
					return (time[2]-time[1]*60).toString();
				else if(i==4&&val[3].length)
					return (time[3]-time[2]*60).toString();
				else 
					return time[i-1].toString();
			}
		}
		/**
		 * [_rdate description]返回换算为日时分秒的时间
		 * @param  {[type]} count    [description]时间总秒数
		 * @param  {[type]} accuracy [description]精度
		 * @return {[type]}          [description]
		 */
		_rdate(count,accuracy){
			return parseInt(count/accuracy);
		}
	}
exports.CdTime = CdTime;
})