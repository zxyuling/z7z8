const 倍投  = (本金,次数 , 投入 = 1, 系数 = 2) => {
	const 输赢 = Math.random()>0.5
	if(输赢){
		本金 += 投入*2
		投入 = 1
		return 本金
	}else{
		本金-=投入
		投入 *= 系数
	}
	if(本金>0){
		return 倍投(本金,次数--,投入, 系数)
	}else{
		return 本金
	}
}

const 概率计算 = (fun,call,count=10000) => {
	let res = 0
	for(let i = 0;i<count;i++){
		//console.log(fun())
		res+=call(fun())
	}
	return res/count
}

console.log(概率计算(function(){
	return 倍投(100,100)
},res=>{
return 	res
}))