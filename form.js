/**
 * create by zhouxuan@zbj.com 2016/11/28
 * 表单处理
 * ###使用方法
 * ##### 参数列表
 * 1. dataDel:对象,包含DataList和ajax
 * 		* dataList:对象数组，包含数据所在html节点，值为data-require的值，如果不存在将尝试把此值当作选择器,数组中每一个对象都是一个独立的请求
 * 		* ajax:jq的ajax对象，data部分将会由上面的字段进行填充，如果在次设置了data属性，将会把上面的字段进行合并
 * 2. requireReg:对象，data-require的值，这个属性的值是用于验证这个字段的正则
 * 3. requireDel:对象，包含requireSuccess和requireFail函数
 * 		* requireSuccess:函数，接受data-require的值作为参数，用于验证成功的操作
 * 		* requireFail:函数，接受data-require的值作为参数，用于验证失败的操作
 * 4. submitTarget:提交按钮选择器
 * ##### 用法
 * 1. 在需要验证字段加上data-require属性，规则自定
 * 2. js中添加
 * var opt = {}//参数
 * new FormDeal(opt);
 * 
 */

function FormDeal(opt){
	this.rq = null;
	this.opt = this._optMerge(opt);//合并格式化参数
	this._init();
}

FormDeal.prototype = {
	/**
	 * [_init 初始化表单]
	 * @return {[type]} [description]
	 */
	_init:function(){
		this.rq = this._require();//表单验证
		this._addListenner();//添加监听事件
	},
	/**
	 * [_require 表单验证]
	 * @return {[type]} [返回表单验证函数用于提交时验证]
	 */
	_require:function(){
		var self = this;
		$('[data-require]').on('blur propertychange',function(){
			var tag = $(this).data('require');
			if(!rq(tag)){
				$(this).on('keyup DOMNodeInserted',function(){
					rq(tag);
				});
			}else{
				$(this).unbind('keyup DOMNodeInserted');
			}
		});
		function rq(tag){
			var requireReg = {
				tel:/^1[34578]\d{9}$/,
				email:/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
			};
			var $tag = $('[data-require="'+tag+'"]');
			requireReg = $.extend(requireReg,self.opt.requireReg);
			var value = $tag.val() || $tag.html();
			if((!requireReg[tag]||new RegExp(requireReg[tag]).test(value))&&!!value){//验证通过
				self.opt.requireDel.requireSuccess(tag);
				return true;
			}else{
				self.opt.requireDel.requireFail(tag);
				return false;
			}
		}
		return rq;//返回验证函数供提交时验证
	},
	/**
	 * [_collectData 收集数据]
	 * @return {[type]} [返回数据数组]
	 */
	_collectData:function(){
		var data = [];
		for(var i=0;i<this.opt.dataDel.length;i++){
			var value = {};
			for(var j=0;j<this.opt.dataDel[i]['dataList'].length;j++){
				var tag = $('[data-require="'+this.opt.dataDel[i]['dataList'][j]+'"]');
				if(!tag[0]){
					tag = $(this.opt.dataDel[i]['dataList'][j])
					this.opt.dataDel[i]['dataList'][j] = this.opt.dataDel[i]['dataList'][j].replace(/^\.|#/,'');
				}
				value[this.opt.dataDel[i]['dataList'][j]] = tag.val()||tag.html();
			}
			data.push(value);
		}
		return data;
	},
	/**
	 * [_addListenner 提交按钮监听]
	 */
	_addListenner:function(){
		var self = this;
		$(self.opt.submitTarget).on('click',function(){
			var data = self._collectData();
			self._submitData(data,self.rq);
		})
	},
	/**
	 * [_submitData 提交数据]
	 * @return {[type]} [description]
	 */
	_submitData:function(data,rq){
		var isRequire = true;
		var tagArray = $('[data-require]');
		for(var i=0;i<tagArray.length;i++){
			var  tagRequire = rq(tagArray[i].getAttribute('data-require'));
			isRequire = isRequire&&tagRequire;
		}
		if(isRequire){
			for(var i=0;i<this.opt.dataDel.length;i++){
				this.opt.dataDel[i].ajax.data = $.extend({},data[i],this.opt.dataDel[i].ajax.data);
				$.ajax(this.opt.dataDel[i].ajax);
			}
		}
	},
	/**
	 * [_optMerge 用户参数和默认参数合并]
	 * @return {[type]} [description]
	 */
	_optMerge:function(opt){
		var defaultOptDeal = {
			dataList:this._reAllData(),//默认所有需要验证的节点都是参数
			ajax:{data:''}
		};
		var defaultOpt = {
			requireDel:{
				requireSuccess:function(){},
				requireFail:function(){}
			}
		}
		var i=0;
		
		for(i = 0;i<opt.dataDel.length;i++){
			opt.dataDel[i] = $.extend({},defaultOptDeal,opt.dataDel[i]);
		}
		opt = $.extend(defaultOpt,opt);
		return opt;
	},
	/**
	 * [_reAllData 默认获取参数的节点]
	 * @return {[type]} [description]
	 */
	_reAllData:function(){
		var datalist = [];
		var dataNode = $('[data-require]');
		var i = 0;
		for(i=0;i<dataNode.length;i++){
			datalist.push(dataNode[i].getAttribute('data-require'));
		}
		return datalist;
	}
}