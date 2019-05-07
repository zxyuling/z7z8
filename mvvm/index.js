class Mvvm{
	constructor(option){
		this.option = option
		this.$data = {}
	}
	observer(){
		const self = this
		for(let key in this.option.data){
			let ov = self.option.data[key]
			Object.defineProperty(this.$data,key,{
				numerable: true, // 可枚举
		        configurable: false, // 不能再define
				get(){
					console.log('get',ov)
					return ov
				},
				set(val){
					console.log('set',ov)
					ov = val
				}
			})
		}
	}
	watcher(){

	}
	compile(){

	}

}