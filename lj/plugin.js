const fs = require('fs')
class myplugin{
	constructor(option){
		this.option = option
	}
	apply(compiler){
		compiler.hooks.emit.tap('i18n',function(compilation){
			for(let item of compilation.modules){
				console.log(item.context,item.resource,'\n111111111111111111111111\n')
				if()
				fs.readFile(item.resource,function(err,data){
					console.log(data.toString())
				})
			}
		})
	}
}
module.exports = myplugin