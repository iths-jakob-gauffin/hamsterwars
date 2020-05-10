const { Router } = require('express');

const router = new Router();

router.get('/', (req, res) => {
	console.log('naskjndka');
	res.send('ahaapppp');
});
router.get('/apa', (req, res) => {
	console.log('appa');
	res.send('jamenapa');
});

module.exports = router;
