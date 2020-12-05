// prepare and launch socket.io server
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
var behavior = require('./behaviors');
var functions = require('./functions');
var output = {};
console.log(behavior,functions);


io.on('connection', function(socket) {
  
  socket.on('disconnect', function(reason) {
  });
  
  socket.on('console input', function(input) {
    let local = {};
    output.Concatenate = behavior.Concatenate(">","True",input);
    io.emit("console log",output["Concatenate"].Result);
    output.Modify_Dictionary = behavior.Modify_Dictionary({},"Set Key","content",output["Concatenate"].Result);
    output.HTTP_Request = behavior.HTTP_Request("https:\/\/discordapp.com\/api\/webhooks\/784681804983566347\/fES35mYau0ZN7_8hFGsw_ZApCb0EksItAcFYzg1SFSOND01SgaI7jGi70JwkCnFVD2A2",{},{},"Post","Raw",output["Modify_Dictionary"].Result);
    if (output["HTTP_Request"].Success == true) {
      io.emit("console log","Successfully sent.");
    }
    if (output["HTTP_Request"].Success == false) {
      io.emit("console log","Failed to send.");
    }
  });
});

http.listen(port, function() {
  console.log('listening on *:' + port);
});