const path = require('path');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
	keyFilename: path.join(__dirname, './serviceAccount.json'),
	projectId: 'hamster-wars-iths'
});

const hamsterBucket = storage.bucket('hamster-bilder');

module.exports = { hamsterBucket };
