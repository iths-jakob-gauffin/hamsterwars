const { orderHamsterObject } = require('./orderHamsterObject');

const { db } = require('../firebase');

const getSpecificHamster = async id => {
	return new Promise(async (res, rej) => {
		// console.log('OUTPUT ÄR: getSpecificHamster -> ids', ids);
		// let specificHamstersArray = [];
		try {
			// let resultArr = ids.map(async id => {
			let snapshot = await db
				.collection('hamsters')
				.where('id', '==', id * 1)
				.get();
			await snapshot.forEach(async doc => {
				// console.log('DATAN: ', doc.data());
				let unOrderedSpecificHamster = doc.data();
				let specificHamster = await orderHamsterObject(
					unOrderedSpecificHamster
				);
				res(specificHamster);
			});
			// });

			// console.log(
			// 	'OUTPUT ÄR: getSpecificHamster -> specificHamstersArray',
			// 	specificHamstersArray
			// );
			// res(specificHamstersArray);
			// console.log(
			// 	'OUTPUT ÄR: getSpecificHamster -> resultArr',
			// 	resultArr
			// );
			// res(resultArr);
		} catch (err) {
			rej(err);
		}
	});
};

exports.getSpecificHamster = getSpecificHamster;
