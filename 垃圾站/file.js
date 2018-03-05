
var http = require('http');
var fs = require('fs');
var server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() === 'get') {
        var alldata = '';
        res.writeHead(200,{"Content-Type":"text/html;charset=UTF8"})
        res.end('<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script></script>'+
            '<form enctype="multipart/form-data" method="post" name="fileinfo"><input type="file" name="a"></form><button>sss</button>'+
            '<script>var f =new FormData();f.append("file",$("input")[0].files[0]);f.append("name","123") ;$("button").on("click",()=>{$.ajax({type:"post",url:"/",'+
                'enctype: "multipart/form-data",data: new FormData($("form")[0]),processData:false,})})</script>'
            );
    };
    if(req.method.toLowerCase() === 'post'){
        var c = []
        req.on('data', function (chunk) {
            c.push(chunk)
            // fs.writeFile('a.jpg',chunk,()=>{
            //     console.log('ok')
            // })
            res.end('success');
        });

        req.on('end', function () {
            var bufferconcat = Buffer.concat(c)
            var len = c.join('').split('\n').length
            var t=c.join('')
            var newArray = []
            for(var a = 0;a<bufferconcat.length;a++){
                    if(bufferconcat[a].toString() == 13 && bufferconcat[a+1].toString() == 10){
                    
                        newArray.push(a);
                    }
                    
            }
            console.log(newArray)
            var data = bufferconcat.slice(newArray[3]+2,newArray[newArray.length-2]);
            fs.writeFile('a.png',bufferconcat,()=>{
            })
            res.end('success');
        });
    }
});
server.listen(3000, "127.0.0.1", function () {
    console.log("server is started listen port 3000");
});