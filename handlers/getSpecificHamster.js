const { db } = require('../firebase');

const getSpecificHamster = async id => {
	return new Promise(async (res, rej) => {
		try {
			let snapshot = await db
				.collection('hamsters')
				.where('id', '==', id * 1)
				.get();
			snapshot.forEach(doc => {
				let unOrderedSpecificHamster = doc.data();
				const specificHamster = {};
				//TODO: kolla på den här, du kanske inte måste lägga den i en ny utan det kanske går redan efter sort-
				Object.keys(unOrderedSpecificHamster)
					.sort()
					.forEach(function(key) {
						specificHamster[key] =
							unOrderedSpecificHamster[key];
					});
				res(specificHamster);
			});
		} catch (err) {
			rej(err);
		}
	});
};
exports.getSpecificHamster = getSpecificHamster;
