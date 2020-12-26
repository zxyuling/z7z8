var next = {RG:'B',RB:'G',RR:'R',GR:'B',GB:'R',GG:'G',BR:'G',BG:'R',BB:'B'}
var triangle = (initString) => {
	let nextString = initString
	while(nextString.length>1){
		let newRow = ''
		for(let i=0;i<nextString.length-1;i++){
			newRow+=next[nextString[i]+nextString[i+1]]
		}
		nextString = newRow
	}
	return nextString
}
