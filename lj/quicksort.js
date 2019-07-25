const sort = (arr,c=(a,b)=>a>b) => {
	let arr1 = [],arr2 = []
	if(arr.length>1){
		const center = arr.shift()
		for(let i = 0;i<arr.length;i++){
			if(c(arr[i],center)){
				arr1.push(arr[i])
			}else{
				arr2.push(arr[i])
			}
		}
		return [...sort(arr1,c),center,...sort(arr2,c)]
	}else{
		return arr
	}
}
// console.log(sort(new Array(20).fill(0).map(item=>{
// 	return Math.ceil(Math.random()*100)
// }),(a,b)=>a<b))	
console.log(sort([NaN,1,3,2,NaN],(a,b)=>{
	if(b!==b||a!==a){
		return 1 
	}
	if(typeof a == typeof b){
		return a<b
	}else{
		return typeof a !== 'string'
	}
}))