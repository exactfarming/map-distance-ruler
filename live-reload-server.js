// livereload = require('livereload');
// server = livereload.createServer({
//   originalPath: 'http://0.0.0.0:3000',
//   applyJSLive: true,
//   applyCSSLive: true
// });
// server.watch(__dirname + "/lib");


var connect  = require('connect');
var http = require('http');
// var compiler = require('connect-compiler');
var static = require('serve-static');
 
var app = connect();
 
// server.use(
//   compiler({
//       enabled : [ 'coffee', 'uglify' ],
//       src     : 'src',
//       dest    : 'public'
//   })
// );
 
app.use(static(__dirname + '/'));
 
// server.listen(3000);

// var app = connect().createServer().use(static(__dirname + '/lib'));

http.createServer(app).listen(3000);
 
livereload = require('livereload');
server = livereload.createServer({
	applyJSLive: true,
  applyCSSLive: true
});
server.watch(__dirname + "/");