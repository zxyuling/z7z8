
module.exports = function(content){
	const callback  = this.async()
	content = content.replace(/\$t/,'(()=>{})')
	console.log('content='+content)
	callback(null,content)
}