const { Router } = require('express');

const { db } = require('./../firebase');

const router = new Router();

// Handlers, promises som anropas vid olika requests
const { getAllHamsters } = require('./../handlers/getAllHamsters');

const { getSpecificHamster } = require('./../handlers/getSpecificHamster');

// Get array of all hamsters
router.get('/', async (req, res) => {
	try {
		let hamstersArray = await getAllHamsters();
		res.status(200).send({
			length: hamstersArray.length,
			msg: hamstersArray
		});
	} catch (err) {
		res.status(500).send({ Error: err.toString() });
	}
});

router.get('/random', async (req, res) => {
	try {
		let hamstersArray = await getAllHamsters();
		let randomNumber =
			Math.floor(Math.random() * hamstersArray.length) + 1;
		let randomHamster = await getSpecificHamster(randomNumber);
		res.status(200).send({ randomHamster });
	} catch (err) {
		console.error(err);
		res.status(500).send({ Error: err.toString() });
	}
});

router.get('/:id', async (req, res) => {
	try {
		// let snapshot = await db
		// 	.collection('hamsters')
		// 	.where('id', '==', req.params.id * 1)
		// 	.get();

		// snapshot.forEach(doc => {
		// 	let specificHamster = doc.data();
		let specificHamster = await getSpecificHamster(req.params.id);
		res.status(200).send({ msg: specificHamster });
	} catch (err) {
		// TODO: error handling ifall man eftersöker id 41 eller nåt, mer än man har hamstrar dvs
		res.status(500).send({ Error: err.toString() });
	}
});

router.put('/:id/result', async (req, res) => {
	try {
		let hamsterToUpdate = await db
			.collection('hamsters')
			.where('id', '==', req.params.id * 1)
			.get();

		hamsterToUpdate.forEach(async doc => {
			// console.log(req.body);
			let { wins, games, defeats } = doc.data();
			let updateResultsObj = {
				wins: wins + req.body.wins,
				games: games + req.body.games,
				defeats: defeats + req.body.defeats
			};

			await db
				.collection('hamsters')
				.doc(doc.id)
				.update(updateResultsObj);

			// let updatedHamster = await db
			// 	.collection('hamsters')
			// 	.doc(doc.id)
			// 	.get();
			let resultHamster = await getSpecificHamster(req.params.id);
			res.status(200).send({
				msg: 'Result updated',
				hamster: resultHamster
				// hamster: updatedHamster.data()
			});
		});
	} catch (err) {
		console.error(err);
		res.status(500).send({ Err: err.toString() });
	}
});

// router.get('/random', async (req, res) => {
// 	console.log('HEJJJJJ');
// 	try {
// 		let snapshotForAllHamsters = await db
// 			.collection('hamsters')
// 			.doc()
// 			.get();
// 		snapshotForAllHamsters.forEach(doc => {
// 			console.log(doc.data());
// 			res.send('svaar');
// 		});
// 	} catch (err) {
// 		console.log(err);
// 		res.status(500).send({ Error: err.toString() });
// 	}
// });

module.exports = router;
