const { db } = require('../firebase');

const { orderHamsterObject } = require('./orderHamsterObject');

const getAllHamsters = async () => {
	return new Promise(async (res, rej) => {
		try {
			let hamstersArray = [];
			let snapshot = await db
				.collection('hamsters')
				.orderBy('id')
				.get();
			snapshot.forEach(doc => {
				let orderedHamsterObject = orderHamsterObject(doc.data());
				hamstersArray = [ ...hamstersArray, orderedHamsterObject ];
			});
			res(hamstersArray);
		} catch (err) {
			rej(err);
		}
	});
};
exports.getAllHamsters = getAllHamsters;
