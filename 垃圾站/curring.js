const curry = (fn) => {
	let args = []
	const length = fn.length
	return function(){
		args=[...args,...arguments]
		console.log(args.length,arguments.length,length)
		return length<=args.length?fn.apply(this,args):arguments.callee
	}
}

const c=(a,b,c=10)=>a+b+c
b=curry(function(data,path){
        return toString
            .call(path) == '[object Array]'?path:path
            .replace(/\[|\]/g,'.')
            .replace(/^\.|\.$/,'')
            .split(/\.+/)
            .reduce((item1,item2)=>item1?item1[item2]:item1,data)
    })
console.log(b.toString())