var Hapi = require('hapi');
var Inert = require('inert');

var server = new Hapi.Server();

server.register(Inert, function() {
	server.connection({
		host: '0.0.0.0',
		port: parseInt(process.env.PORT, 10) || 3000
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
});

server.start(function() {
	console.log('Hapi server started: ' + server.info.uri);
});