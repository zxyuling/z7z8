process.nextTick(()=>console.log("hola datevid"))
// setTimeout(()=>{
// 	console.log("1");
// 	process.nextTick(()=>console.log("3"))
// })
// setTimeout(()=>{
// 	console.log("2");
// })
setImmediate(()=>{
	console.log("1");
process.nextTick(()=>console.log("hola datevid"))
})
setImmediate(()=>{
	console.log("5");
})