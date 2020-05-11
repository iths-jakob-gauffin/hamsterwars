const { db } = require('./../firebase');

const saveGame = reqBody => {
	return new Promise(async (res, rej) => {
		console.log(reqBody);
		const {
			contestantOne = 'inget1',
			constestantTwo = 'inget2',
			winner = 'vinnareInget'
		} = reqBody;
		let gameObj = {
			id: 1,
			timeStamp: Date.now(),
			constestants: [
				{
					c1: contestantOne,
					c2: constestantTwo
				}
			],
			winner: winner
		};
		await db.collection('games').doc().set(gameObj);
		let snapshot = db.collection('games').get();
		snapshot.forEach(doc => {
			console.log(doc.data());
			res.send('game saved');
		});
	});
};

module.exports = { saveGame };
