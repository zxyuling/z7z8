
const merge = (left,right,near1,near2) => {
	const len12 = near1[0]**2+near1[1]**2
	const len22 = near2[0]**2+near2[1]**2
	const len = Math.sqrt(len12<len22?len12:len22)
	const arrayLeft = left.filter()
}

const near = (array) => {
	const left = array.slice(0,Math.ceil(array.length/2))
	const right = array.slice(Math.ceil(array.length/2),array.length)
	if(array.length>2){
		return merge(left,right,near(left),near(right))
	}else{
		return array
	}
}