const { db } = require('../firebase');
const getAllHamsters = async () => {
	return new Promise(async (res, rej) => {
		try {
			let hamstersArray = [];
			let snapshot = await db
				.collection('hamsters')
				.orderBy('id')
				.get();
			snapshot.forEach(doc => {
				hamstersArray = [ ...hamstersArray, doc.data() ];
			});
			res(hamstersArray);
		} catch (err) {
			rej(err);
		}
	});
};
exports.getAllHamsters = getAllHamsters;
