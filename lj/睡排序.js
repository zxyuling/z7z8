let result = []
const sort = (array,数量级,offset) => {
	let newArray = []
	for(let i=0;i<array.length;i++){

		let num = array[i]
		setTimeout(()=>{
			newArray.push(num)
			result[数量级] = newArray
			console.log(result.filter(item=>item).reduce((a,b)=>[...a,...b]))
		},(num+offset)/数量级)
	}
}
const offset = (array)=>{
	
	let offset = array.reduce((a,b)=>a<b?a:b)
	return offset<0?-offset:0
}
const 分组 = (array,offset) =>{
	let obj = []
	for(let i=0;i<array.length;i++){
		let num = array[i]+offset
		obj[(''+num).length]=obj[(''+num).length]?obj[(''+num).length]:[]
		obj[(''+num).length].push(num)
	}
	return obj
}

const array =[99999999999999,99999999999998,99999999999997]
const o = offset(array)
分组(array,o).forEach((item,index)=>{
	sort(item,index+1,o)
})
console.log(result)
