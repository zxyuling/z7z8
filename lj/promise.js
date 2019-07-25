// class Promise{
// 	constructor(fun=()=>{}){
// 		this.status = 'pendding'
// 		this.result = undefined
// 		this.callback = {}
// 		this.next = null
// 		fun(this.resolve.bind(this), this.reject.bind(this))
// 	}
// 	static slv(result){
// 		return new Promise(function(res,rej){
// 			res(result)
// 		})
// 	}
// 	then(res=()=>{},rej=()=>{}){
// 		this.callback = {res,rej}
// 		this.next =  new Promise()
// 		return this.next
// 	}
// 	resolve(res){		
// 		setTimeout(()=>{
// 			if(!this.next) return
// 			this.status = 'resolve'
// 			res = this.callback.res(res)			
// 			if(res instanceof Promise){
// 				res.then(res=>{
// 					this.next.resolve(res)
// 				})
// 			}else{
// 				this.next.resolve(res)
// 			}
// 		})
// 	}
// 	reject(){
// 		this.status = 'reject'
// 		this.result = res
// 	}
// }
// 
class Promise{
	constructor(fun = () => {}){
		//初始化状态
		this._status = 'pendding'
		//执行结果
		this._value = null
		//then里面注册的回调函数数组
		this._deferreds  = []
		//立即执行promise包裹的函数
		try{
			fun(value => this._reslove(this, value), value => this._reject(this, value))
		}catch(e){
			this._reject(this,e)
		}
	}
	/**
	 * then方法 
	 * @return {[type]} [description]
	 */
	then(resolve => {},reject => {}){
		const deferred  = {resolve,reject}
		if(this._status == 'pendding'){
			this._deferreds.push({resolve,reject})
		}else{
			this._handleResolved(deferred)
		}
		return new Promise
	}
	_resolve(promise, value){
		if(promise._status ! == 'pendding') return 
		for(let deferred of this._deferreds){
			this._handleResolved(deferred)
		}
		this._deferreds = []
		this._status = 'resolve'
		this._value = value
	}
	_handleResolved(deferred){
		setTimeout(()=>{
			if(this._status == 'resolve'){
				deferred.resolve(this._value)
			}else{
				deferred.reject(this._value)
			}
		})
	}
}
console.log('start')
a = new Promise(function(res,rej){
			console.log('p')
		setTimeout(()=>{
			res(123)
		},1000)
}).then(res=>console.log(123))
// Promise.slv(12355).then(res=>console.log(res))
.then(res=>{console.log(res,'ddd');return 44123})
c = a.then(res=>'b')
c.then(res=>4444)
.then(res=>{
	console.log(res)
	return new Promise(function(res,rej){res(5)}).then(res=> res)
}).then(res=>console.log(res))
console.log('end')
