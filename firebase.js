var admin = require('firebase-admin');

// var firebaseConfig = {
// 	apiKey: 'AIzaSyBYam693sYIZCkVZ7CDyJmPxe08kbymWV4',
// 	authDomain: 'hamster-wars-iths.firebaseapp.com',
// 	databaseURL: 'https://hamster-wars-iths.firebaseio.com',
// 	projectId: 'hamster-wars-iths',
// 	storageBucket: 'hamster-wars-iths.appspot.com',
// 	messagingSenderId: '699757983921',
// 	appId: '1:699757983921:web:c27e6aeed2b4de0bc88a90'
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// const firebase = require('firebase');

var serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://hamster-wars-iths.firebaseio.com',
	storageBucket: 'hamster-wars-iths.appspot.com/'
});
// admin.

const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { db, bucket };
