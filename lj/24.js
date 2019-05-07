const utils = require('./utils.js')
function equalTo(a){
	let ar=[...a]
	if(ar.length==1){
		const result = 24-eval(ar[0])
		if(result>=0&&result<0.1e-10){
			return ar
		}else{
			return false
		}
	}else{
		let res = false
		for(let index = 0;index<ar.length;index++){
			const item = ar[index]
			let n=[...ar]
			n.splice(index,1)
			for(let index2 = 0;index2<n.length;index2++){
				const item2 = n[index2]
				let arr = []
				op = ['*','-','+','/']
				for(let i in op){
					arr = [...n]
					arr[index2]='('+item+op[i]+item2+')' 
					res = res||equalTo(arr)
				}
			}
		}
		return res
	}
} 
console.log(equalTo([3,3,8,8]))
