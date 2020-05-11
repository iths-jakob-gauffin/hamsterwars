const { db } = require('../firebase');

const getSpecificHamster = async id => {
	return new Promise(async (res, rej) => {
		try {
			let snapshot = await db
				.collection('hamsters')
				.where('id', '==', id * 1)
				.get();
			snapshot.forEach(async doc => {
				let unOrderedSpecificHamster = doc.data();
				let specificHamster = await orderHamsterObject(
					unOrderedSpecificHamster
				);
				res(specificHamster);
			});
		} catch (err) {
			rej(err);
		}
	});
};

const orderHamsterObject = hamsterObject => {
	const specificHamster = {};
	//TODO: kolla på den här, du kanske inte måste lägga den i en ny utan det kanske går redan efter sort-
	Object.keys(hamsterObject).sort().forEach(function(key) {
		specificHamster[key] = hamsterObject[key];
	});
	return specificHamster;
};

exports.getSpecificHamster = getSpecificHamster;
