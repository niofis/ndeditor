
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var fs = require('fs');
var path = require('path');

var crypto = require('crypto');

var ECT = require('ect');
var ectRenderer = ECT({ watch: true, root: __dirname + '/' });


var app = express();

app.engine('html', ectRenderer.render);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

var server = http.createServer(app);
var io = require('socket.io').listen(server, { log: false });

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    //console.log(data);
  });
});

function listFiles(dir){
	var stats = fs.statSync(path);
	var file = {
		path:path.normalize(dir),
		name:path.basename(dir),
	}
	if(stats.isDirectory()){

	}
}

function processArgs(){
	process.argv.splice(2).forEach(function(arg){
		console.log(arg);
	})
}

processArgs();
//console.log(crypto.createHash('md5').update('coso¡').digest("hex"));