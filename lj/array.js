/**
 * 验证带洞数组和不带洞数组的性能差距
 */
const utils = require('./utils.js')
const holy = new Array(10000).fill(0)
const pack = utils.array(10000)
console.log(pack.length==holy.length)
console.log(utils.testTime(()=>{
	holy.forEach(item=>item%3)
}))
console.log(utils.testTime(()=>{
	pack.forEach(item=>item % 3)
}))
/**
 * 输出：
 * true
 * 1.087
 * 0.22
 * 结论：带洞不好，最好别带洞
 */
