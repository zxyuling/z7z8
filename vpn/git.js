var http = require('http')
var child_process = require('child_process');
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/github', secret: '123456' })
var exec = child_process.exec;
http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(8082)

handler.on('error', function (err) {
  console.error('Error:', err)
})

handler.on('push', function (event) {
  var filename = '/root/website/'+event.payload.repository.name;

  var git  = exec('cd '+filename+'&&git fetch --all&&git reset --hard origin/master&&git pull origin master >>build.log',function(err,sto,ste){
     if(err !== null) console.log('pull error',err);
     console.log('msg',err,sto,ste);
     exec('cd '+filename+'&& sh ./ci.sh >>build.log',function(err1,sto1,ste1){
       if(err1 !== null) console.log(err1);
        console.log('msg1',sto1,ste1);
     })
  });
  console.log('-------------------------------------------1-----------------------------------------------',filename)
})

handler.on('issues', function (event) {
  console.log('Received an issue event for %s action=%s: #%d %s',
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title)
})