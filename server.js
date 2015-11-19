var Path = require('path');
var Hapi = require('hapi');
var Inert = require('inert');

var server = new Hapi.Server();

server.register(Inert, function() {

	server.connection({
		host: '0.0.0.0',
		port: parseInt(process.env.PORT, 10) || 3000
	});

	server.route([{
		method: 'GET',
		path: '/{path*}',
		handler: {
			directory: {
				path: 'dist/index.html'
			}
		}
	}, {
		method: 'GET',
		path: '/css/{path*}',
		handler: {
			directory: {
				path: 'dist/css'
			}
		}
	}, {
		method: 'GET',
		path: '/js/{path*}',
		handler: {
			directory: {
				path: 'dist/js'
			}
		}
	}, {
		method: 'GET',
		path: '/img/{path*}',
		handler: {
			directory: {
				path: 'dist/img'
			}
		}
	}, {
		method: 'GET',
		path: '/font/{path*}',
		handler: {
			directory: {
				path: 'dist/font'
			}
		}
	}]);

});

server.start(function() {
	console.log('Hapi server started: ' + server.info.uri);
});