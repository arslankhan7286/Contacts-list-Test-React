function getAllUsers(db) {
	return db.models.User.findAll();
}

function getSingleUser(db, userID) {
	return db.models.User.findOne({
		where: {
			id: userID
		}
	});
}

function createUser(db, userData) {
	return db.models.User.create(userData);
}

async function updateUser(db, userID, userData) {
	await db.models.User.update(userData, {
		where: {
			id: userID
		}
	});

	return db.models.User.findOne({
		where: {
			id: userID
		}
	});
}

function deleteUser(db, userID) {
	return db.models.User.destroy({
		where: {
			id: userID
		}
	});
}

module.exports = {
	getAllUsers,
	getSingleUser,
	createUser,
	updateUser,
	deleteUser
}
