const array = [65, 57, 96, 75, 76, 80, 83, 91, 10, 42, 48, 87, 60, 55, 51, 3, 54, 22, 8, 44]
class Tree23 {
	constructor(array){
	}
	addNode(tree,node,parent){
		if(!tree){
			return {k1:node,parent}
		}else{
			if(tree.k2){
				if(node>tree.k2){
					const k0 = tree.k2
					tree.k2 = node
					this.addNode(tree.parent,k0,tree.parent.parent)
				}else if(node<tree.k1){
					const k0 = tree.k2
					tree.k2 = node
					this.addNode(tree.parent,k0,tree.parent.parent)
				}else{
					tree.middle = this.addNode(tree.middle,node,tree)
				}
			}else{
				if()
			}
		}
	}
}