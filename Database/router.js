// create route function with pathname as parameter
function route(pathname, handle, response, request, connection) {
	console.log("Routing a request for " + pathname);
	// note access via associative array notation
	// if the path points to a function i.e. a request handler
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response, request, connection); // call the appropriate function
	} else {
		console.log("No request handler found for: " + pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("Resource not found!");
		response.end();
	}
}
// export route function
exports.route = route;