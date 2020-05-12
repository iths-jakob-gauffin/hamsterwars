const express = require('express');

const fileUpload = require('express-fileupload');

const app = express();

const { db } = require('./firebase');

const data = require('./data.json');

const { getDataIntoFirestore } = require('./uploadDataToFirestore');
// getDataIntoFirestore(data);

//Routes
const hamstersRoutes = require('./routes/hamstersRoute');
const chartsRoutes = require('./routes/chartsRoute');
const gamesRoutes = require('./routes/gamesRoute');
const statsRoutes = require('./routes/statsRoute');
const filesRoutes = require('./routes/filesRoute');

const apiKey = require('./apiKey');

// const chartsRoutes = require('./routes/chartsRoutes');

//Middleware
app.use(express.json());
app.use(fileUpload());
app.use(express.static('hamsters'));
app.use(express.static('public'));

// app.use((req, res, next) => {
// 	if (req.headers['authorization'] === apiKey) {
// 		next();
// 	} else {
// 		res.status(500).send({
// 			Error: `API-nyckeln stämmer inte. Nyckeln finns i roten i modulen "apiKey.js".`
// 		});
// 	}
// });

app.use('/hamsters', hamstersRoutes);
app.use('/charts', chartsRoutes);
app.use('/games', gamesRoutes);
app.use('/stats', statsRoutes);
app.use('/files', filesRoutes);

// const path = require('path');
// const fs = require('fs');
// fs.createWriteStream
// FILE UPLOAD
// async function uploadFile(file, folder) {
// 	const bucketName = 'hamsterbilder';

// 	const storage = new Storage({
// 		keyFilename: path.join(__dirname, './serviceAccount.json'),
// 		projectId: 'hamster-wars-iths'
// 	});
// 	hamsterBucket = storage.bucket('hamster-bilder');
// 	const fileToUpload = folder + '/' + file.name;
// 	let fileUploadish = hamsterBucket.file(fileToUpload);

// 	const blobStream = fileUploadish.createWriteStream({
// 		metadata: { contentType: file.mimetype }
// 	});

// 	blobStream.on('error', error => {
// 		console.log('Wrong', error);
// 	});
// 	blobStream.on('finish', () => {
// 		console.log('FINISHED');
// 	});
// 	blobStream.end(file.buffer);
// }
// 	await hamsterBucket.upload(fileName, {
// 		gzip: true,
// 		metadata: {
// 			cacheControl: 'public, max-age=31536000'
// 		}
// 	});
// 	app.use('/');
// 	console.log(
// 		'https://console.cloud.google.com/storage/browser/_details/hamster-bilder/hamster-1.jpg?project=hamster-wars-iths'
// 	);
// 	console.log(
// 		'https://console.cloud.google.com/storage/browser/_details/hamster-bilder/hamster-2.jpg?project=hamster-wars-iths'
// 	);
// 	// .createWriteStream({
// 	// 	resumable: false,
// 	// 	gzip: true
// 	// });
// 	// await storage
// 	// 	.bucket('hamster-wars-iths.appspot.com')
// 	// 	.upload('./hamsters/hamster-1.jpg', {
// 	// 		gzip: true,
// 	// 		metadata: {
// 	// 			cacheControl: 'public, max-age=31536000'
// 	// 		}
// 	// 	});
// 	console.log('filen ska va uppladdad');
// }

///////////////////////////FUNKADE
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
// 	// app.use('/');
// 	console.log(
// 		'https://console.cloud.google.com/storage/browser/_details/hamster-bilder/hamster-1.jpg?project=hamster-wars-iths'
// 	);
// 	console.log(
// 		'https://console.cloud.google.com/storage/browser/_details/hamster-bilder/hamster-2.jpg?project=hamster-wars-iths'
// 	);
// 	// .createWriteStream({
// 	// 	resumable: false,
// 	// 	gzip: true
// 	// });
// 	// await storage
// 	// 	.bucket('hamster-wars-iths.appspot.com')
// 	// 	.upload('./hamsters/hamster-1.jpg', {
// 	// 		gzip: true,
// 	// 		metadata: {
// 	// 			cacheControl: 'public, max-age=31536000'
// 	// 		}
// 	// 	});
// 	console.log('filen ska va uppladdad');
// }
// /////////////////////////// HIT

// uploadFile().catch(console.error);

// app.get('/', (req, res) => {
// 	res.send('Yep');
// });

app.listen(7000, () => {
	console.log('Server is running on port 7000');
});
