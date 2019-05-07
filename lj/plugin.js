class myplugin{
	constructor(option){
		console.log(option)
	}
	apply(compiler){
		compiler.hooks.emit.tap('myplugin',function(compilation){
			console.log(compilation.chunks)
		})
	}
}
module.exports = myplugin