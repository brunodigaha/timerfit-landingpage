var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: 8000
});

server.route({
	method: 'GET',
	path: '/{param*}',
	handler: {
		directory: {
			path: 'public',
			listing: true
		}
	}
});

server.start();