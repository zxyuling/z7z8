
module.exports = function(content){
	const callback  = this.async()
	content = content.replace(/console.log/,'(()=>{})')
	console.log('content='+content)
	callback(null,content)
}
// module.exports.pitch = function(a,b,c){
// 	return 'a'
// }