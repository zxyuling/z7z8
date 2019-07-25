function shortestSubarray(array,K,start=0,end=1,len = -1){
	let current = array[0]
	while(end<=array.length){
		let tmpstart = start
		let tempcurrent = current
		while(tmpstart<end){
			if(tempcurrent>=K){
				len = (len>end-tmpstart||len==-1)?end-tmpstart:len
				start = tmpstart
				current = tempcurrent
			}
			tempcurrent = tempcurrent-array[tmpstart]
			tmpstart+=1
		}
		if(len == -1){
			current+=array[end]
		}else{
			current+=array[end]
			current-=array[start]
			start+=1
		}
		end+=1
	}
	return len
}

module.exports  =  shortestSubarray