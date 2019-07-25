// 'use strict';

// const fs = require('fs-promise');
// const co = require('co');
// const path = require('path');

// co(function* () {
//     let filep = path.join(__dirname, 'tmpFile.txt')
//     let txt = yield fs.readFile('./t.txt');
//     txt = txt.toString()
//     console.log(txt.length) // 44732

//     co(function* () {
//         for (let i = 0; i < 100; i++) {
//             yield fs.writeFile(filep, txt)
//         }
//     }).catch(e => {
//         console.log('e:', e)
//     })

//     for (let i = 0; i < 100; i++) {
//         let txt1 = yield fs.readFile('./tmpFile.txt');
//         txt1 = txt1.toString()
//         // 50873 is right
//         // all result length is 4 times
//         console.log(`${txt1.length}   ${txt1.length % 4}`)
//     }
// }).catch(e => {
//     console.log('e:', e)
// })
// 

function co(fun){
    const res = fun()
    function a (value){
        return value.then(r=>{
            value = res.next(r)
            if(value.done){
                return r
            }else{
                return a(value.value)
            }
        })
    }
    return a(Promise.resolve())
}