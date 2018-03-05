/**
 * 验证使用filter+map的直接使用单个循环的时间差距
 */
const testTime = require('./utils.js').testTime
const array  = new Array(10000).fill(1)
const twoLoop = arr =>arr.filter(item=>item%2).map(item=>item+0.5)
const oneLoop = arr =>{
	let a = []
	arr.forEach(item=>{
		if(item%2){
			a.push(item+0.5)
		}
	})
	return a
}
const compareArray = (a,b) =>a.join('')==b.join('')
const oa = oneLoop(array)
const ta = twoLoop(array)
console.log(compareArray(oa,ta),
	testTime(oneLoop,array),
	testTime(twoLoop,array),
	testTime((arr)=>arr.filter(item=>item%2),array),
	testTime((arr)=>arr.map(item=>item%2),array),
	testTime((arr)=>arr.forEach(item=>item%2),array)
	)
/**
 * 输出：true 1.214 16.886
 * 结论，大数组的操作尽量少用多个循环，需要在可读写和性能上面取得平衡
 */