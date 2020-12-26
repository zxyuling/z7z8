const fs = require('fs')
const PNG = require('pngjs').PNG;
// const puppeteer = require('puppeteer');



const 卷积  = (img, item, std = 30,offsetX, offsetY) => {
	let newMap = JSON.parse(JSON.stringify(img))
	for(let y =0; y<img.length;y++){
		for(let x=0;x<img[y].length;x++){
			newMap[y][x] = E({img,x,y,item,std,offsetX, offsetY })
		}
	}
	return newMap
} 

const E = option => {
	const offsetX = option.offsetX||1
	const offsetY = option.offsetY||1
	let res = 0
	for(let y =0; y<option.item.length;y++){
		for(let x=0;x<option.item[y].length;x++){
			try{
			res = res+option.item[y][x]*option.img[option.y-offsetY+y][option.x-offsetX+x]||0
			}catch(e){

			}
		}
	}
	let q = eval(option.item.join(',').replace(/,/g,'+'))
	q = q>0?q:1
	res = res/q
	return parseInt(res>option.std?255:0)
}

// const img = [
// [0,0,0],
// [0,1,0],
// [0,0,0],
// ]
// const item = [
// [1,0,-1],
// [1,0,-1],
// [1,0,-1],
// ]

const 边界计算 = (map) => {
	const item = [
	[-2,1,-2],
	[1,4,1],
	[-2,1,-2],
	]
	const item1 = [
	[1,1,1,1,1,1,1],
	[1],
	[1],
	[1],
	[1],
	[1],
	[1],
	[1],
	[1],
	[1],
	[1],
	[1],
	[1],
	[0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[0],
	[1],
	[1],
	[1],
	[1],
	[1],
	[1],
	[1],
	[1],
	[1],
	[1],
	[1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],

	]
	map = 卷积(map, item)
	// map = 卷积(map, item1 , 240,0,0)
	return map
}

// const 边界特征过滤 = (边界) => {
// 	边界 = 边界.sort((a,b)=>a>b?1:-1)
// 	竖边界 = 边界.reduce((res,item,index,array)=>{
// 		if(item == array[index-1]){
// 			res[res.length-1].push(item)
// 		}else{
// 			res.push([item])
// 		}
// 		return res
// 	},[])
// 	竖边界 = 竖边界.filter(item=>item.length>30 && item.length<50)
// 	竖边界.forEach(item=>console.log(item[0]))
// 	console.log(竖边界.length,44);
// 	return 竖边界[0][0]
// }
fs.createReadStream('./b.png')
.pipe(new PNG({
    filterType: 4
}))
.on('parsed', function() {
	let buf = []
	for(let i = 0;i<this.data.length;i+=4){
		const r = this.data[i]
        const g = this.data[i+1]
        const b = this.data[i+2]
        const grey = 0.299*r+0.578*g+0.114*b
        this.data[i] = this.data[i+1] =  this.data[i+2] = parseInt(grey)
        buf.push(parseInt(grey))
	}

	const imgMap = []
	for(;buf.length;){
		imgMap.push(buf.splice(0, 360))
	}
	// 边界特征过滤(边界计算(imgMap))
	 buf =边界计算(imgMap).reduce((a,b)=>a.concat(b),[])
	// console.log(b.length,766);
	let bb = []
	for(let i =0; i<buf.length;i++){
		bb[i*4] = bb[4*i+1] =bb[4*i+2] = buf[i]
		bb[4*i+3] = 255
	}

	this.data = bb

    this.pack().pipe(fs.createWriteStream('out.png'));
});

// const 二值化 = (data) => {
// 	// console.log(data.length);
// 	// const Buff = Buffer.from(Uint8ClampedArray.from(data))
// 	// console.log(Buff)
// 	// const png = new PNG({ filterType:4 })
// 	// png.data = Buff
// 	// png.pack().pipe(fs.createWriteStream('out.png'))
// 	const buf = []
// 	const imgMap = []
// 	for(let i = 0;i<data.length;i+=4){
// 		const r = data[i]
//         const g = data[i+1]
//         const b = data[i+2]
//         const grey = (0.299*r+0.578*g+0.114*b>98)?0:255
//         data[i] = data[i+1] =  data[i+2] = grey
//         buf.push(grey)
// 	}
// 	const png = new PNG({
//   		width: 250,
//   		height:160
//   	})
//   	png.data = data
//   	png.pack().pipe(fs.createWriteStream('colortype6.png'));
// 	for(;buf.length;){
// 		imgMap.push(buf.splice(0, 250))
// 	}
// 	return imgMap
// }
// const move = (left, top) => {
// 	return new Array(10).fill(0).map(item=>{
// 		return {
// 			left:Math.random()*left,
// 			top:(Math.random()-0.5)*10+top,
// 		}
// 	}).sort((a,b)=>a.left>b.left?1:-1)
// }

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://passport.bilibili.com/login?spm_id_from=333.851.b_696e7465726e6174696f6e616c486561646572.11');
//   await page.setViewport({width:1920, height:1080});
//   await page.mouse.click(1050,282)

//   await page.keyboard.type('1',{delay: 178})
//   await page.mouse.click(1050,350)
//   await page.keyboard.type('2',{delay: 159})
//   await page.mouse.click(1100,456)
//   setTimeout(async ()=>{
//   	const image = await page.evaluate(() => {
//   		const canvas = document.querySelector('.geetest_canvas_bg')
//   		return Array.from(canvas.getContext('2d').getImageData(0,0,250,160).data)
//   	})
//   	const 位置 = 边界特征过滤(边界计算(二值化(image)))
//   	console.log(位置)

//   	await page.mouse.move(1106,450)
//   	await page.mouse.down()
//   	const positions = move(位置, 450)
//   	for(let i=0;i<positions.length;i++){
//   		await page.mouse.move(1100+positions[i].left,positions[i].top,{steps:10})
//   		await	page.waitFor(1000*Math.random())
//   	}
//   	await page.mouse.move(1100+位置,450,{steps:10})
//   	await page.mouse.up()
// 	await page.screenshot({path: './example.png'});
//   	await browser.close();
//   },3000)
// })();
// 
// 
// 
// 
// 
