const { getFive } = require('../handlers/getFive');

const { Router } = require('express');

const router = new Router();

const { db } = require('./../firebase');

router.get('/top', async (req, res) => {
	try {
		const topFive = await getFive('top');
		res.status(200).send({ length: topFive.length, topFive: topFive });
	} catch (err) {
		console.error(err);
		res.status(500).send({ Error: err.toString });
	}
});

router.get('/bottom', async (req, res) => {
	try {
		const bottomFive = await getFive('bottom');
		res
			.status(200)
			.send({ length: bottomFive.length, bottomFive: bottomFive });
	} catch (err) {
		console.error(err);
		res.status(500).send({ Error: err.toString() });
	}
});

module.exports = router;
