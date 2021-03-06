export default  {
    array(num){
    	let arr = []
    	for(let i=0;i<num;i++){
    		arr.push(0)
    	}
    	return arr
    },
    testTime(fn,arg=null,o=1000){
    	const start = +new Date()
    	for(let i=0;i<o;i++){
    		fn(arg)
    	}
    	return (+new Date()-start)/o
    },
    curry(fn){
        let args = []
        const length = fn.length
        return function(){
            args=[...args,...arguments]
            return length==args.length?fn.apply(this,args):arguments.callee
        }
    },
    sleep(time){
        for(let i = +new Date();i+time>+new Date();){}
    },
    copy(obj,hash = new Map){
        const isObj = (obj) => typeof obj === 'object' && obj != null
        if(!isObj(obj)) return obj
        if(hash.has(obj)) return hash.get(obj)
        const newObj = Array.isArray(obj)?[]:{}
        hash.set(obj,newObj)
        for(let i in obj){
            const item = obj[i]
            if(isObj(item)){
                newObj[i] = this.copy(item,hash)
            }else{
                newObj[i] = item
            }
        }
    }
}

