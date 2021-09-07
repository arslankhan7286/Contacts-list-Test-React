const {getAllUsers, getSingleUser, createUser, updateUser, deleteUser} = require('../../db/models/user/User.dao'),
	{partial, pick} = require('lodash'),
	{model: UserModel} = require('../../db/models/user/User.model'),
	Joi = require('joi').extend(require('joi-phone-number'));

const userIDSchemaKeys = {
	userID: Joi.number()
};

const userDataSchemaKeys = {
	firstName: Joi.string().trim().min(1).max(UserModel.firstName.type._length).required(),
	lastName: Joi.string().trim().min(1).max(UserModel.lastName.type._length).required(),
	emailAddress: Joi.string().trim().email({
		minDomainSegments: 2
	}).max(UserModel.emailAddress.type._length).required(),
	phoneNumber: Joi.string().phoneNumber({defaultCountry: 'US'}),
	avatarPath: Joi.string().trim().uri().max(UserModel.avatarPath.type._length).required()
};

const userInsertValidationSchema = Joi.object().keys({
	...userDataSchemaKeys
});

const userLookupValidationSchema = Joi.object().keys({
	...userIDSchemaKeys
});

const joiValidatorCompiler = ({schema}) => {
	return data => schema.validate(data);
};

function onGetAllUsers(fastify, req, reply) {
	return getAllUsers(fastify.db);
}

async function onGetSingleUser(fastify, req, reply) {
	const {userID} = req.params;

	const user = await getSingleUser(fastify.db, userID);

	return user || reply.status(404).send({
		error: `User with ID ${userID} could not be found`
	});
}

async function onPutUser(fastify, req, reply) {
	const {userID} = req.params,
		userData = pick(req.body, Object.keys(UserModel));

	const existingUser = await getSingleUser(fastify.db, userID);

	if (!!existingUser) {
		return updateUser(fastify.db, userID, userData);
	} else {
		return reply.status(404).send({
			error: `User with ID ${userID} could not be found`
		});
	}
}

async function onPostUser(fastify, req, reply) {
	const userData = pick(req.body, Object.keys(UserModel));

	return createUser(fastify.db, userData);
}

async function onDeleteUser(fastify, req, reply) {
	const {userID} = req.params;

	const existingUser = await getSingleUser(fastify.db, userID);

	if (!!existingUser) {
		return deleteUser(fastify.db, userID)
			.then(() => reply.status(200).send()); //Empty response so we don't get a '1' back from SQLite
	} else {
		return reply.status(404).send({
			error: `User with ID ${userID} could not be found`
		});
	}
}

async function UserRoutes(fastify, options) {
	fastify.route({
		method: 'GET',
		path: '/user',
		handler: partial(onGetAllUsers, fastify)
	});

	fastify.route({
		method: 'GET',
		path: '/user/:userID',
		handler: partial(onGetSingleUser, fastify),
		schema: {
			params: userLookupValidationSchema
		},
		validatorCompiler: joiValidatorCompiler
	});

	fastify.route({
		method: 'PUT',
		path: '/user/:userID',
		handler: partial(onPutUser, fastify),
		schema: {
			body: userInsertValidationSchema,
			params: userLookupValidationSchema
		},
		validatorCompiler: joiValidatorCompiler
	});

	fastify.route({
		method: 'POST',
		path: '/user',
		handler: partial(onPostUser, fastify),
		schema: {
			body: userInsertValidationSchema
		},
		validatorCompiler: joiValidatorCompiler
	});

	fastify.route({
		method: 'DELETE',
		path: '/user/:userID',
		handler: partial(onDeleteUser, fastify),
		schema: {
			params: userLookupValidationSchema
		},
		validatorCompiler: joiValidatorCompiler
	});
}

module.exports = UserRoutes;
