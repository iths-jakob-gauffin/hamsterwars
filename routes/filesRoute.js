const { Router } = require('express');

const router = new Router();

const path = require('path');
const { uploadFileToCloud } = require('./../handlers/uploadFileToCloud');
const { getAllHamsters } = require('./../handlers/getAllHamsters');
const { createNewHamster } = require('./../handlers/createNewHamster.js');

// router.post('/', async (req, res) => {
// 	let storageRef = bucket.ref(`hamster_pics/${req.files.photo.name}`);
// 	// storageRef.put()
// 	res('hittills');
// });
router.post('/cloud', async (req, res) => {
	let fileExtension = path.extname(req.files.photo.name);
	let allHamsters = await getAllHamsters();
	let fileNameWithExtension = `hamster-${allHamsters.length * 1 +
		1}${fileExtension}`;
	req.files.photo.mv(
		path.join(
			__dirname,
			'./../tempPathBeforeCloud',
			fileNameWithExtension
		),
		err => {
			if (err) {
				res
					.status(500)
					.send(
						'Something with the upload to google cloud went wrong'
					);
				return;
			}
		}
	);
	console.log(req.files.photo.name);
	console.log(path.extname(req.files.photo.name));
	await uploadFileToCloud(fileNameWithExtension);

	// Put the new hamster into db
	let newHamsterId = allHamsters.length + 1;
	await createNewHamster(newHamsterId, fileNameWithExtension);

	res.status(200).send({
		msg: `File uploaded to cloud and new hamster created in Firestore`,
		urlToImage: `https://storage.cloud.google.com/hamster-bilder/${fileNameWithExtension}`
	});
	return;
});
// Uploada till egen mapp, "uploads"-mappen i public
router.post('/', async (req, res) => {
	req.files.photo.mv(`./public/uploads/${req.files.photo.name}`, err => {
		if (err) {
			res.status(500).send('Damn it something wnt wrong' + err);
			return;
		}
		res.send({ msg: 'File saved' });
		return;
	});
});

// var myHeaders = new Headers();
// myHeaders.append("Authorization", "abc123");

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   redirect: 'follow'
// };

module.exports = router;
