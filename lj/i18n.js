const glob = require('glob')
const fs = require('fs')
const path = require('path');
const zh = require('./i18nzh.js')
const i18n = require('vue-i18n')
class vue{}
vue.version = '2.5.17'
i18n.install(vue)
new vm = vue
glob('./**/*.vue',function(err,files){
	files.forEach(item=>{
		fs.readFile(item,function(err,data){
			let content = data.toString()
			content = content.replace(/(this\.)?\$t\(([^\(|^\)]*)\)/g,function(match,p1,p2){
				this = vm
				const $t = this.$t
				const $tc = this.$tc
				const $te = this.$te
				return eval(match)
			})
			fs.writeFile(item,content,()=>{})
		})
	})
})

