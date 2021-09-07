const fixtures = require('./User.fixtures.json');

function insertUserFixtures(db) {
	return db.models.User.bulkCreate(fixtures.results.map(person => ({
		firstName: person.name.first,
		lastName: person.name.last,
		emailAddress: person.email,
		phoneNumber: person.phone.replace(/\D/g, ''),
		avatarPath: person.picture.thumbnail
	})))
}

module.exports = insertUserFixtures;
