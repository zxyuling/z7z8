const area = [
[0,1,0,0,1,0,0,1,0],
[1,0,1,1,1,0,0,0,0],
[0,1,0,0,0,0,0,0,0],
[0,1,0,0,1,0,0,0,0],
[1,1,0,1,0,1,0,0,1],
[0,0,0,0,1,0,1,0,0],
[0,0,0,0,0,1,0,1,0],
[1,0,0,0,0,0,1,0,1],
[0,0,0,0,1,0,0,1,0]]
const root = 0
let res = [{id:root,parent:null}]
let point = []
const near = (root) => {
	for(let i = 0;i<9;i++){
		if(area[root][i] == 1 && res.findIndex(item => item.id == i) == -1){
			res.push({id:i,parent:root})
			point.push(i)
		}
	}
	const next = point.shift()
	if(next!=undefined){
		return near(next)
	}else{
		return res
	}
}
console.log(near(root).sort((a,b)=>a.id>b.id).reduce((res,item,index,array)=>{
	const curent = array[res[res.length-1]].parent
	if(curent!=null){
		res.push(array[res[res.length-1]].parent)
	}
	return res
},[6]))
console.log(res)
