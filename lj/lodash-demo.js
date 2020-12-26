const _ = require('lodash')
 const object = { 'a': [{ 'b': { 'c': 3 } }, 4] }
 
  console.log(_.at(object, ['a[0].b.c', 'a[1]']))