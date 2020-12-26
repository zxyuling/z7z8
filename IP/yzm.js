const fs = require('fs')
const PNG = require('pngjs').PNG;

let position = []
const 卷积  = (img, item, std = 30,offsetX, offsetY,show = false) => {
	let newMap = JSON.parse(JSON.stringify(img))
	for(let y =0; y<img.length;y++){
		for(let x=0;x<img[y].length;x++){
			newMap[y][x] = E({img,x,y,item,std,offsetX, offsetY ,show})
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
	res = parseInt(res>option.std?255:0)
	if(!position.length && option.show && res == 255){
		position = [option.x, option.y]
	}
	return parseInt(res)
}



const 边缘检测 = (map) => {
	const avg = [
	[1,1,1],
	[1,1,1],
	[1,1,1],
	]
	const gs = [
	[0.3,0.6  ,0.3],
	[0.6  ,1  ,0.6],
	[0.3,0.6  ,0.3],
	]
	const point = [
	[1,1,1],
	[1,-8,1],
	[1,1,1],
	]
	const lineH = [
	[-1,-1,-1],
	[2,2,2],
	[-1,-1,-1],
	]
	const lineV = [
	[-1,2,-1],
	[-1,2,-1],
	[-1,2,-1],
	]
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
	// map = 卷积(map, lineH)
	// map = 卷积(map, lineV)
	map = 卷积(map, item)
	map = 卷积(map, item1 , 220,0,0, true)
	return map
}
const addRedBorder = (img) => {
	for(let i = 0;i<img.length;i++){
		const color = i%4
		const y = parseInt(parseInt(i/4)/360)
		const x = parseInt(i/4)%360
		const px = Math.abs(x-position[0])
		const py = Math.abs(y-position[1])
		if((px==10 && py<=10) || (py==10 && px<=10)){
			switch(color){
				case 3:
				case 0:img[i] = 255;break
				default: img[i] = 0
			}
		}
	}
	return img
}
fs.createReadStream('./in.png')
.pipe(new PNG({
    filterType: 4
}))
.on('parsed', function() {
	let buf = []
	let oldData = [...this.data]
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
	 buf =边缘检测(imgMap)
	 .reduce((a,b)=>a.concat(b),[])
	let data = []
	for(let i =0; i<buf.length;i++){
		data[i*4] = data[4*i+1] =data[4*i+2] = buf[i]
		data[4*i+3] = 255
	}
	this.data = data
	// console.log(toString.call(oldData))
	this.data = addRedBorder(oldData)
	

    this.pack().pipe(fs.createWriteStream('out.png'));
});
