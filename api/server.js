//imports
const app = require("./app");
const debug = require("debug")("node-angular");
const http = require("http");

//check that port is valid
const normalizePort = val => {
	//conver to int base 10 if necessary
	var port = parseInt(val, 10);

	//check if port is NaN
	if (isNaN(port)) {
		//if NaN, return value from argument
		return val;
	}

	//if port num is greater than 0
	if (port >= 0) {
		// port number
		return port;
	}

	//if non applies, don't return anything
	return false;
};

//to handle server connection errors
const onError = error => {
	if (error.syscall !== "listen") {
		throw error;
	}
	const bind = typeof port === "string" ? "pipe " + port : "port " + port;
	switch (error.code) {
		case "EACCES":
			console.error(bind + " requires elevated privileges");
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(bind + " is already in use");
			process.exit(1);
			break;
		default:
			throw error;
	}
};

//function to indicate listening
const onListening = () => {
	const addr = server.address();
	const bind = typeof port === "string" ? "pipe " + port : "port " + port;
	debug("Listening on " + bind);
};

//define and set port 
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);