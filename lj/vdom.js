const getTag = dom => {
	const result = {}
	dom = dom.replace(/^<[^<]*>/,function(match){
		result.end = /<\s*\//.test(match)?true:false
		result.tag = match
		return ''
	})
	result.dom = dom
	return result
}
const dom2node = (start,end ) => {
	const conten = start.replace(/^<\s*|\s*>$/g,'')
	const tag = conten.match(/^(\S*)/)[1]
	const reg = /(\S*)\s*=\s*(\S*)/g
	let attr = {}
	let on = {}
	let res = null
	do{
		res = reg.exec(conten)
		if(res){
			const key = res[1]
			console.log(key)
			if(/^on\-/.test(key)){
				const onkey = key.match(/^on-(\S*)/)[1]
				on[onkey] = eval(res[2])
			}else{
				attr[key] = eval(res[2])
			}
		}
	}while(res)
	return {tag,attr,on,children:[]}
}
const vnode = (dom,stack = [],tree = {children:[],tag:'root'},type="1") => {
	const result = getTag(dom)
	dom = result.dom
	if(result.end){
		const startTag = stack.pop()
		const vnode = dom2node(startTag,result.tag)
		if(type==1){
			tree.children.push(vnode)
		}else{
			vnode.children = tree.children
			tree = {tag:'root',children:[vnode]}
		}
		type = 2
	}else{
		stack.push(result.tag)
		type = 1
	}
	if(dom){
		return vnode(dom,stack,tree,type)
	}else{
		return tree
	}
}
console.log(JSON.stringify(vnode("<1 a='1' on-click='function(){alert(1)}'><2><3></3><3></3></2><2></2></1>"),null,4))

//匹配第一个标签压入栈顶并删除 =>匹配第二个标签是结束标签就把第一个弹出并解析成vnode并记录站长度
// //
// {
// 	tag:'1',
// 	children:[{
// 		tag:2,
// 		children:[{
// 			tag:3,
// 			children:[]
// 		},{
// 			tag:3,
// 			children:[]
// 		}]
// 	},{
// 		tag:2,
// 		children:[]
// 	}]
// }