var admin = require('firebase-admin');

var serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://hamster-wars-iths.firebaseio.com',
	storageBucket: 'hamster-bilder/'
	// storageBucket: 'hamster-wars-iths.appspot.com/'
});

const db = admin.firestore();

// FICK INTE DENNA BUCKET ATT FUNKA, HAR DÄRFÖR ANVÄNT GOOGLE CLOUD STORAGE, SEDAN HAR JAG ADDAT SAMMA BUCKET I FIREBASE STORAGE(MANUELLT I FIREBASE-CONSOLEN). ALLT SOM FINNS I GOOGLE CLOUD STORAGE FINNS ALLTSÅ OCKSÅ I FIREBASE STORAGE.
// const bucket = admin.storage().bucket('hamster-bilder');

module.exports = { db };
