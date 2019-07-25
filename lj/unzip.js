const path = require('path')
const AdmZip = require('adm-zip')
const filepath = path.dirname(__dirname) + '/lj/zip/'
const zipfile = path.dirname(__dirname) + '/lj/a.zip'
const unzip = new AdmZip(zipfile);
unzip.extractAllTo(filepath, /*overwrite*/true);
console.log("success-sipImagesUnzip!")