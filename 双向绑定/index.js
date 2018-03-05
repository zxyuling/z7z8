'use strict'

window.data={
	a:1,
	c:2
}
class Observer{
	constructor(data){
		this.initData(data);
		this.dep = {}
	}
	initData(data){
		if(!data) return;
		Object.keys(data).forEach((key,index)=>{
			console.log(key)
			let item = data[key]
			if(typeof data[key]!=='object')
				Object.defineProperty(data,key,{
					enumerable: true,
		        	configurable: false,
		        	get:function(){
		        		console.log('get',key)
		        		return item
		        	},
		        	set:function(newVal){
		        		this.update(key,newVal)
		        		item = newVal
		        		if(typeof item==='object')
		        			this.initData(item)
		        	}
				})
			else
				this.initData(item)
		})
	}
	update(key,newVal){
		this.dep[key].forEach((item,index)=>{
			item(newVal)
		})
	}

}

class Compile{
	constructor(body){
		this.body = body
	}
}
const ob = new Observer(data)