const { Router } = require('express');

const { db } = require('./../firebase');

const router = new Router();

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

// Get array of all hamsters
router.get('/', async (req, res) => {
	try {
		let hamstersArray = await getAllHamsters();
		// if (err) throw err;
		res.status(200).send({
			length: hamstersArray.length,
			msg: hamstersArray
		});
	} catch (err) {
		res.status(500).send({ Error: err.toString() });
	}
});

router.get('/random', async (req, res) => {
	// let randomNumber = '';
	let hamstersArray = await getAllHamsters();
	let randomNumber =
		Math.floor(Math.random() * hamstersArray.length) + 1;
	let randomHamster = '';
	res.send('hej');
});

router.get('/:id', async (req, res) => {
	try {
		let snapshot = await db
			.collection('hamsters')
			.where('id', '==', req.params.id * 1)
			.get();

		snapshot.forEach(doc => {
			let specificHamster = doc.data();

			res.status(200).send({ msg: specificHamster });
		});
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
			let { wins, games } = doc.data();
			let updateResultsObj = { wins: wins + 1, games: games + 1 };

			await db
				.collection('hamsters')
				.doc(doc.id)
				.update(updateResultsObj);

			let updatedHamsterResult = await db
				.collection('hamsters')
				.doc(doc.id)
				.get();
			res.status(200).send({
				msg: 'Result updated',
				hamster: updatedHamsterResult.data()
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
