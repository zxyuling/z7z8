/**
 * @param {number[]} height
 * @return {number}
 */
var trim = function(array){
    const trimarray = array.join('-').match(/^(0-)*(.*?)(-0)*$/)
    const result = trimarray && trimarray[2]
    return result?result.split('-'):[]
}
var trap = function(height) {
    let num = 0
    while(height.length>1){
        height = trim(height)
        var 边缘 = Math.min(height[0],height[height.length-1])
        var 边缘 = 边缘== Infinity?0:边缘
        for(let i = 0;i<height.length;i++){
            let item = height[i]
            if(item<=边缘){
                num+=边缘-item
                height[i] = 0
            }else{
                height[i] = item-边缘
            }
        }
    }
    return num
};
a = [0,1,0,2,1,0,1,3,2,1,2,1]
console.log(trap(a))