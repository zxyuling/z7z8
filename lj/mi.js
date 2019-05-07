const mi = (a,k) => {
	if(k>0){
		if(k%2){
			return a*mi(a,k-1)
		}else{
			const res =  mi(a,k/2)
			return res*res
		}
	}else{
		return 1
	}
}

export default mi