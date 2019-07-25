const expect = require('chai').expect
const shortestSubarray=require('./short')


describe('first',()=>{
	it('1',()=>{
		array = [1]
		expect(shortestSubarray(array,1)).to.be.equal(1)
	})
	it('2',()=>{
		array = [1,1,-1,1,3,-2,3]
		expect(shortestSubarray([1,1,-1,1,3,-2,3],4)).to.be.equal(2)
	})
	it('3',()=>{
		array = [1,1,-1,1,3,-2,3]
		expect(shortestSubarray(array,9)).to.be.equal(-1)
	})
})