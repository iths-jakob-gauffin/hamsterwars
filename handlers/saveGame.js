const { db } = require('./../firebase');

const { getSpecificHamster } = require('./getSpecificHamster');
const { getAllGames } = require('./getAllGames');

const moment = require('moment');

const getNewIdNum = () => {
	return new Promise(async (res, rej) => {
		let highestNumber = 0;
		let snapshot = await db.collection('games').get();
		snapshot.forEach(doc => {
			if (doc.data().id > highestNumber) {
				highestNumber = doc.data().id;
			}
		});
		res(highestNumber + 1);
	});
};

// TODO: Kan va värt att fixa så vinnaren får plus och förloraren minus och bägge får en ny game
const saveGame = async reqBody => {
	return new Promise(async (res, rej) => {
		try {
			const { contestantOne, contestantTwo, winner } = reqBody;
			getSpecificHamster(
				contestantOne,
				contestantTwo,
				winner
			).then(async specificHamsters => {
				let [
					hamsterOne,
					hamsterTwo,
					winningHamster
				] = specificHamsters;

				let idNum = await getNewIdNum();

				let gameObj = {
					id: idNum,
					timeStamp: moment(new Date()).format('llll'),
					contestants: [
						{
							contestantOne: hamsterOne,
							constestantTwo: hamsterTwo
						}
					],
					winner: winningHamster
				};
				//TODO: kanske blir ett snapshot automatiskt och då anropar man db för mycket just nu med getAllGames varje gång
				await db.collection('games').doc().set(gameObj);
				let allGames = await getAllGames();
				res(allGames);
			});
		} catch (err) {
			rej(err);
		}
	});
};
// // TODO: Kan va värt att fixa så vinnaren får plus och förloraren minus och bägge får en ny game
// const saveGame = async reqBody => {
// 	return new Promise(async (res, rej) => {
// 		try {
// 			const { contestantOne, contestantTwo, winner } = reqBody;

// 			let hamsterOne = await getSpecificHamster(contestantOne);
// 			let hamsterTwo = await getSpecificHamster(contestantTwo);
// 			let winningHamster = await getSpecificHamster(winner);
// 			// let [
// 			// 	hamsterOne,
// 			// 	hamsterTwo,
// 			// 	winningHamster
// 			// ] = await getSpecificHamster(
// 			// 	contestantOne,
// 			// 	contestantTwo,
// 			// 	winner
// 			// );
// 			// let resp = await getSpecificHamster(
// 			// 	contestantOne,
// 			// 	contestantTwo,
// 			// 	winner
// 			// );
// 			// console.log('OUTPUT ÄR: resp', resp);
// 			console.log('OUTPUT ÄR: hamsterOne', hamsterOne);
// 			console.log('OUTPUT ÄR: hamsterTwo', hamsterTwo);
// 			console.log('OUTPUT ÄR: winningHamster', winningHamster);
// 			// if (err) throw err;

// 			let idNum = await getNewIdNum();

// 			let gameObj = {
// 				id: idNum,
// 				timeStamp: moment(new Date()).format('llll'),
// 				// timeStamp: Date(),
// 				contestants: [
// 					{
// 						contestantOne: hamsterOne,
// 						constestantTwo: hamsterTwo
// 					}
// 				],
// 				winner: winningHamster
// 			};
// 			//TODO: kanske blir ett snapshot automatiskt och då anropar man db för mycket just nu med getAllGames varje gång
// 			await db.collection('games').doc().set(gameObj);
// 			let allGames = await getAllGames();
// 			res(allGames);
// 			// let snapshot = db.collection('games').get();
// 			// snapshot.forEach(doc => {
// 			// 	console.log(doc.data());
// 			// 	res('game saved');
// 			// });
// 		} catch (err) {
// 			rej(err);
// 		}
// 	});
// };

module.exports = { saveGame };
