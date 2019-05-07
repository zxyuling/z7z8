function triangle(row) {
	if(row.length == 1){
		return row[0]
	}
	const map = {"R":0,"G":1,"B":2}
	const mapresult = ["R","G","B"]
	const array = row.split('').map(item=>map[item])
	const getNum = (length) => {
		var n = new Array(Math.ceil(length/2)).fill(0).map((item,index) => index)
		if( !(length % 2)) {
			return [...n,...n.reverse()]
		} else {
			var max = n.pop()
			return [...n,max,...n.reverse()]
		}
	}
	const num = getNum(array.length)
	console.log(array)
	const result = array.reduce((a,b,index) => {
		console.log(b,2*num[index] + 1,b*(2*num[index] + 1))
		return a + b * num[index]
	},0) 
	console.log(result)
	const r = row%2?(3-result%3)%3:result%3
	return mapresult[r]
}
console.log(triangle('BBB'))