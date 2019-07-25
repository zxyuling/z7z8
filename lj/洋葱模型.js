var yc = {
	count:0,
	components:[],
	use:function(component){
		this.components.push(component)
	},
	next:function(){
		this.count++
		return this.count<this.components.length
			?Promise.resolve().then(res=>this.components[this.count](this.next.bind(this)))
			: null
	},
	start(){
		this.components[this.count](this.next.bind(this))
	}
}

yc.use(async next=>{
	console.log(1)
	await next()
	console.log(1)
})
yc.use(async next=>{
	console.log(2)
	await next()
	console.log(2)
})
yc.start()