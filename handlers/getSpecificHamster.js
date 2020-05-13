const { orderHamsterObject } = require('./orderHamsterObject');

const { db } = require('../firebase');

const getSpecificHamster = async (...ids) => {
	return new Promise(async (res, rej) => {
		try {
			let arr = [];
			for (let id of ids) {
				let snapshot = await db
					.collection('hamsters')
					.where('id', '==', id * 1)
					.get();
				await snapshot.forEach(async doc => {
					let unOrderedSpecificHamster = doc.data();
					let specificHamster = await orderHamsterObject(
						unOrderedSpecificHamster
					);
					arr = [ ...arr, specificHamster ];
				});
			}
			console.log('OUTPUT ÄR: newstuff -> arr', arr);

			res(arr);
		} catch (err) {
			rej(err);
		}
	});
};

// const getSpecificHamster = async (...ids) => {
// 	return new Promise(async (res, rej) => {
// 		// console.log('OUTPUT ÄR: getSpecificHamster -> ids', ids);
// 		// let specificHamstersArray = [];
// 		try {
// 			let arr = [];
// 			// let resultArr = ids.map(async id => {
// 			for (let id of ids){
// 				let snapshot = await db
// 					.collection('hamsters')
// 					.where('id', '==', id * 1)
// 					.get();
// 				await snapshot.forEach(async doc => {
// 					let unOrderedSpecificHamster = doc.data();
// 					let specificHamster = await orderHamsterObject(
// 						unOrderedSpecificHamster
// 					);
// 					arr = [...arr, specificHamster]
// 			} }
// 				res(arr);
// 			});

// 		} catch (err) {
// 			rej(err);
// 		}
// 	});
// };

////////////////////// FUNKADE
// const getSpecificHamster = async id => {
// 	return new Promise(async (res, rej) => {
// 		// console.log('OUTPUT ÄR: getSpecificHamster -> ids', ids);
// 		// let specificHamstersArray = [];
// 		try {
// 			// let resultArr = ids.map(async id => {
// 			let snapshot = await db
// 				.collection('hamsters')
// 				.where('id', '==', id * 1)
// 				.get();
// 			await snapshot.forEach(async doc => {
// 				// console.log('DATAN: ', doc.data());
// 				let unOrderedSpecificHamster = doc.data();
// 				let specificHamster = await orderHamsterObject(
// 					unOrderedSpecificHamster
// 				);
// 				res(specificHamster);
// 			});
// 			// });

// 			// console.log(
// 			// 	'OUTPUT ÄR: getSpecificHamster -> specificHamstersArray',
// 			// 	specificHamstersArray
// 			// );
// 			// res(specificHamstersArray);
// 			// console.log(
// 			// 	'OUTPUT ÄR: getSpecificHamster -> resultArr',
// 			// 	resultArr
// 			// );
// 			// res(resultArr);
// 		} catch (err) {
// 			rej(err);
// 		}
// 	});
// };

exports.getSpecificHamster = getSpecificHamster;
