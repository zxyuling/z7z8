module.exports = function(content){
	console.log(content)
	const callback  = this.async()
	content = content.replace(/console.log/,'((1)=>{})')
	callback(null,content)
}
// module.exports.pitch = function(remainingRequest, precedingRequest, data) {
// 	console.log(123)
//   if (someCondition()) {
//     return 'module.exports = require(' + JSON.stringify('-!' + remainingRequest) + ');';
//   }
// };