const { Router } = require('express');

const { checkIfIdIsValid } = require('./../handlers/checkIfIdIsValid');

const { hamsterBucket } = require('./../googleStorage');

const router = new Router();

//// Servar hamsterbilden ifrån google cloud storage och därmed även firebase storage. Det är ju samma bucket mellan google cloud storage som i firebase storage. Jag har försökt lösa det med bara firebase men har inte lyckats läsa mig till hur man ska göra, däremot hittade jag hur man gör via google cloud. Så därför hänvisar jag till hamsterBucket via googleStorage.js. Detta gör jag även när man laddar upp filer. Men filerna dyker ju som sagt upp i firebase eftersom det är samma bucket.
//// Exempel på fetch: localhost:7000/assets/1
router.get('/:id', async (req, res) => {
	try {
		if (await checkIfIdIsValid(req.params.id)) {
			hamsterBucket
				.file(`hamster-${req.params.id * 1}.jpg`)
				.createReadStream()
				.on('error', err => {
					if (err) {
						console.error(err.message);
						res.status(400).send({
							msg:
								'Something went wrong trying to get the requested image',
							error: err.message.toString()
						});
					}
				})
				.on('response', streamResponse => {
					res.setHeader(
						'Content-Type',
						streamResponse.headers['content-type']
					);
				})
				.on('end', () => {
					res.end();
				})
				.pipe(res);
		}
	} catch (err) {
		console.error(err);
		res.status(err.status).send({ Error: err.msg });
	}
});
module.exports = router;
