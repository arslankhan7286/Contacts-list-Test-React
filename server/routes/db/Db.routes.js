const {partial} = require('lodash'),
	insertUserFixtures = require('../../db/models/user/User.fixtures')

async function onDbReset(fastify) {
	await fastify.db.drop();
	await fastify.db.sync();

	return 'Database reset!';
}

async function onDbResetWithFixtures(fastify) {
	await fastify.db.drop();
	await fastify.db.sync();

	await insertUserFixtures(fastify.db);

	return 'Database reset and fixtures created!';
}

async function DbRoutes(fastify) {
	fastify.route({
		method: 'POST',
		path: '/db/reset',
		handler: partial(onDbReset, fastify)
	});

	fastify.route({
		method: 'POST',
		path: '/db/resetWithFixtures',
		handler: partial(onDbResetWithFixtures, fastify)
	});
}

module.exports = DbRoutes;
