const { getAllGames } = require('./../handlers/getAllGames');

const { Router } = require('express');

const router = new Router();

router.get('/total', async (req, res) => {
	let allGames = await getAllGames();
	res.status(200).send({
		totalGames: allGames.length,
		msg: `There has been ${allGames.length} games so far.`
	});
});

module.exports = router;
