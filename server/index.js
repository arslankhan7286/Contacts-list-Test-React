const fastify = require('fastify')({
		logger: true
	}),
	Cors = require('fastify-cors'),
	Autoload = require('fastify-autoload'),
	initDatabase = require('./db/DatabaseInit'),
	path = require('path');

async function bootstrap() {
	fastify.register(Cors, {
		origin: '*'
	});

	// Then, we'll load all of our routes.
	fastify.register(Autoload, {
		dir: path.join(__dirname, 'routes'),
		dirNameRoutePrefix: false
	});

	await initDatabase(fastify);

	await fastify.listen(80, '0.0.0.0');
}

bootstrap();
