const { db } = require('./firebase');

async function getDataIntoFirestore(data) {
	// let snapshot = await db.collection('hamsters').get();
	// snapshot.forEach(doc => {
	// 	console.log('hej');
	// 	console.log(doc);
	// });
	// if (!db.collection('hamsters').get()) {
	data.map(async hamsterObj => {
		await db.collection('hamsters').doc().set(hamsterObj);
	});
	// } else {
	// 	console.log('hamsters already initialized');
	// }
}

module.exports = { getDataIntoFirestore };
