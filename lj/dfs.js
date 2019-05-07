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

const area1 = [
[0,0,0,0,1,0,0,1,0],//1
[1,0,0,1,1,0,0,0,0],//2
[0,1,0,0,0,0,0,0,0],//3
[0,0,0,0,1,0,0,0,0],//4
[0,0,0,0,0,1,0,0,1],//5
[0,0,0,0,0,0,1,0,0],//6
[0,0,0,0,0,0,0,0,0],//7
[1,0,0,0,0,0,1,0,0],//8
[0,0,0,0,0,0,0,1,0]]//9
const root = 0
let point = [root]
let res = [root]
const near = (root) => {
	let i = 0
	for(;i<9;i++){
		if(area1[root][i] == 1 && res.findIndex(it=>it==i) ==-1){
			point.push(i)
			res.push(i)
			return near(i)
		}
	}
	if(i==9){
		return res
	}
	const pref = point.pop()
	if(pref !== undefined){
		return near(pref)
	}else{
		return res
	}
}
console.log(near(root).map(item=>item+1))