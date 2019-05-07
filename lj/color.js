String.prototype.splitByNum = function(num){
	return this.split('').reduce((a,b)=>{
		const alen = a[a.length-1]
		alen.length%2==0&&alen.length!=0?a.push(b):a[a.length-1] = alen+b+''
		return a
	},[''])
}
class Color{
	constructor(start,end,deg){
		this.start = this._colorTrans(start)
		this.end = this._colorTrans(end)
		this.deg = deg
	}
	_colorTrans(color){
		if(!this._colorTest(color)){
			return 
		}
		if(/^#([0-9a-fA-F]{3}){1,2}$/.test(color)){
			let colorBrniyArray = color.split('')
			colorBrniyArray.shift()
			return (colorBrniyArray.length==3?colorBrniyArray.map(item=>item.repeat(2)):colorBrniyArray)
								.join('')
								.splitByNum(2)
								.map(item=>parseInt(item, 16))
		}
	}
	getColorByPositionPercent(position){
		return this.start.map((item,index)=>item+(this.end[index]-item)*position)
	}
	_colorTest(color){
		return /^#([0-9a-fA-F]{3}){1,2}$/.test(color)
	}
}
s = new Color('#fff','#00f',1)
console.log(s.getColorByPositionPercent(1))