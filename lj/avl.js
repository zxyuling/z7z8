const array = [65, 57, 96, 75, 76, 80, 83, 91, 10, 42, 48, 87, 60, 55, 51, 3, 54, 22, 8, 44]


const addTree = (tree,node,count=1) =>{
	if(node > tree.root){
		if(tree.right){
			addTree(tree.right,node,count+1)
		}else{
			tree.right = {root:node,height:count+1}
		}
	}else{
		if(tree.left){
			addTree(tree.left,node,count+1)
		}else{
			tree.left = {root:node,height:count+1} 

		}
	}
	return tree
}
const avl = (array) => {
	array.shift()
	return array.reduce((res,item)=>{
		return trans(addTree(res,item))
	},{root: 65,height:1})
}
const treeHeight = (tree) => {
	if(!tree){
		return 0
	}
	if(tree.left || tree.right){
		const h =  Math.max(treeHeight(tree.left),treeHeight(tree.right))+1
		tree.h = h
		console.log(h)
		return h
	}else{
		tree&&(tree.h = 1)
		return 1
	}
}
const isAv = (tree) =>!tree?true:Math.abs(treeHeight(tree.left)-treeHeight(tree.right))<2
const trans = (tree) => {
	if(tree && (tree.left || tree.right)){
		if(!isAv(tree.left)){
			tree.left = trans(tree.left)
		}
		if(!isAv(tree.right)){
			tree.right = trans(tree.right)
		}
		if(!isAv(tree)){
			const typeObj = {'left':'right','right':'left'}
			const av = treeHeight(tree.left)-treeHeight(tree.right)
			const type = av>0?'left':'right'
			const query = (treeHeight(tree[type].left)-treeHeight(tree[type].right))*av>0
			let current = null
			if(query){
				current = tree[type]
				tree[type] = current[typeObj[type]]
				current[typeObj[type]] = tree
			}else{
				const parent = tree[type]
				current = parent[typeObj[type]]
				parent[typeObj[type]] = current[type]
				tree[type] = current[typeObj[type]]
				current[type] = parent
				current[typeObj[type]] = tree
			}
			tree = current
		}
		return tree
	}else{
		return tree
	}
}
const t = (tree) => {
	if(isAv(tree)){
		return tree
	}else{
		return t(trans(tree))
	}
}
const tree = (avl(array))
console.log(treeHeight(tree))
console.log(tree,null,4)