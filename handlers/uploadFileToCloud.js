const fs = require('fs');
const path = require('path');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
	keyFilename: path.join(__dirname, './../serviceAccount.json'),
	projectId: 'hamster-wars-iths'
});

const hamsterBucket = storage.bucket('hamster-bilder');

const uploadFileToCloud = fileName => {
	return new Promise(async (res, rej) => {
		try {
			///// Ladda upp filen till google cloud storage och därmed firebase storage
			await hamsterBucket.upload(
				`./tempPathBeforeCloud/${fileName}`,
				{
					gzip: true,
					metadata: {
						cacheControl: 'public, max-age=31536000'
					}
				}
			);

			///// Radera filen ifrån tempPathBeforeCloud-mappen
			await fs.unlink(`./tempPathBeforeCloud/${fileName}`, err => {
				if (err) throw err;
				return;
			});
			res('Success');
		} catch (err) {
			console.error(err);
			rej(err);
		}
	});
};

module.exports = { uploadFileToCloud };

// async function uploadFile() {
// 	const bucketName = 'hamsterbilder';

// 	const storage = new Storage({
// 		keyFilename: path.join(__dirname, './serviceAccount.json'),
// 		projectId: 'hamster-wars-iths'
// 	});
// 	hamsterBucket = storage.bucket('hamster-bilder');
// 	const fileName = './hamsters/hamster-3.jpg';
// 	await hamsterBucket.upload(fileName, {
// 		gzip: true,
// 		metadata: {
// 			cacheControl: 'public, max-age=31536000'
// 		}
// 	});
// 	console.log(
// 		'https://console.cloud.google.com/storage/browser/_details/hamster-bilder/hamster-1.jpg?project=hamster-wars-iths'
// 	);
// 	console.log(
// 		'https://console.cloud.google.com/storage/browser/_details/hamster-bilder/hamster-2.jpg?project=hamster-wars-iths'
// 	);
// 		console.log('filen ska va uppladdad');
// }
