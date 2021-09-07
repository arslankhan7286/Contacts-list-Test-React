const {DataTypes} = require('sequelize');

const UserModel = {
	firstName: {
		type: DataTypes.STRING(50),
		allowNull: false
	},
	lastName: {
		type: DataTypes.STRING(50),
		allowNull: false
	},
	emailAddress: {
		type: DataTypes.STRING(50),
		allowNull: false
	},
	phoneNumber: {
		type: DataTypes.STRING(10),
		allowNull: false
	},
	avatarPath: {
		type: DataTypes.STRING(100),
		allowNull: false
	}
};

function registerUserModel(db) {
	db.define('User', UserModel);
}

module.exports = {
	register: registerUserModel,
	model: UserModel
};
