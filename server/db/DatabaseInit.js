const path = require('path'),
	{register: registerUserModel} = require('./models/user/User.model'),
	Sequelize = require('sequelize');

function connectDatabase(fastify) {
	return new Promise((resolve, reject) => {
		const sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: path.resolve(__dirname, 'db.sqlite')
		});

		sequelize
			.authenticate()
			.then(() => {
				fastify.log.info('Database connected successfully.')

				fastify.decorate('db', sequelize);

				resolve();
			})
			.catch(err => {
				fastify.log.error('Unable to connect to the database:', err);
				reject(err);
			});
	});
}

function registerModels(db) {
	return registerUserModel(db);
}

function syncDatabaseModels(db) {
	return db.sync();
}

async function initDatabase(fastify) {
	await connectDatabase(fastify);
	await registerModels(fastify.db);
	await syncDatabaseModels(fastify.db);
}

module.exports = initDatabase;
