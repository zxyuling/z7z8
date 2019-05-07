const merge = (arr1,arr2,c,res=[]) => {
	[arr1,arr2] = arr1.length>arr2.length?[arr1,arr2]:[arr2,arr1]
	if(arr2.length){
		res.push(c(arr1[0],arr2[0])?arr1.shift():arr2.shift())
	}else{
		return [...res,...arr1]
	}
	return merge(arr1,arr2,c,res)
}
const sort = (arr,c=(a,b)=>a<b) => {
	const arr1 = arr.slice(0,Math.ceil(arr.length/2))
	const arr2 = arr.slice(Math.ceil(arr.length/2),arr.length)
	if(arr.length>2){
		return merge(sort(arr1,c),sort(arr2,c),c)
	}else{
		return merge(arr1,arr2,c) 
	}
}

console.log(sort(['--',1,3,2,'--'],(a,b)=>{
	if(typeof a == typeof b){
		return a<b
	}else{
		return typeof a !== 'string'
	}
}))