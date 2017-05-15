var http = require("http"); // import http core modules
var url = require("url"); // import url core modules

var mysql = require('mysql');

//mysql database connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database:'team73',
});


function startServer(route, handle){
	http.createServer( function (request, response) {
		/*connection.connect(function(err){
			if(!err) {
				console.log("Database is connected ... ");    
			} else {
				console.log("Error connecting database ... ");    
			}
		});*/
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		route(pathname, handle, response, request, connection);

	}).listen(4000);
	console.log("Database server has started.");
}
exports.startServer = startServer;
