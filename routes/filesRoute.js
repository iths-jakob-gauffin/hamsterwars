const { Router } = require('express');

const router = new Router();

const { bucket } = require('./../firebase');

router.post('/', async (req, res) => {
	console.log('FILER ', req.files);
	let storageRef = bucket.ref(`hamster_pics/${req.files.photo.name}`);
	// storageRef.put()
	res('hittills');
});

// DENNA NEDAN FUNKAR
// router.post('/', async (req, res) => {
// 	console.log('FILER ', req.files);
// 	req.files.photo.mv(`./public/uploads/${req.files.photo.name}`, err => {
// 		if (err) {
// 			res.status(500).send('Damn it something wnt wrong' + err);
// 			return;
// 		}
// 		res.send({ msg: 'File saved' });
// 		return;
// 	});
// });

module.exports = router;
