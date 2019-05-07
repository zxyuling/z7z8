const axios = require('./axios')
// axios.get('http://zj.flashdata2.jrj.com.cn/flowhistory/share/002011.js').then(res=>{
// 	 console.log(eval(res)) 
// })
// const gplist = (page,num=80) => {
// 	return `http://vip.stock.finance.sina.com.cn/quotes_service/api/json_v2.php/Market_Center.getHQNodeData?page=${page}&num=${num}&sort=symbol&asc=1&node=hgt_sh&symbol=&_s_r_a=init`
// }
// const getTotalCount = () => 'http://vip.stock.finance.sina.com.cn/quotes_service/api/json_v2.php/Market_Center.getHQNodeStockCount?node=hgt_sh'

// const getGPmsg = async (all,res=[]) => {
// 	allPage = all-1
// 	const currentPage = (await axios.get('http://vip.stock.finance.sina.com.cn/quotes_service/api/json_v2.php/Market_Center.getHQNodeData?page=1&num=40&sort=symbol&asc=1&node=hgt_sh&symbol=&_s_r_a=init')).data
// 	console.log(gplist(all-allPage))
// 	res = [...res,...currentPage]
// 	if(allPage){
// 		return await getGPmsg(res)
// 	}else{
// 		return res
// 	}
// }
const getGPMsg = async () => {
	axios.get('http://zj.flashdata2.jrj.com.cn/flowhistory/share/002011.js').then(res=>{
	const stock_flow = JSON.parse(res.split('=')[1])
})
}
const start = async () => {
 	getGPMsg()
}
start()