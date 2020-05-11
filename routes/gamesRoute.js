const { Router } = require('express');

const router = new Router();

const { saveGame } = require('./../handlers/saveGame');

router.get('/', (req, res) => {
	res.send('gamesget');
});
router.post('/', async (req, res) => {
	let confirmation = await saveGame(req.body);
	// TODO: snygga till confirmation, vet inte vad det ska stå men typ matchen som är sparad hade ju varit trevlig
	res.status(200).send({ msg: 'Game saved', data: confirmation });
});

module.exports = router;
