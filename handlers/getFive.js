const { getAllHamsters } = require('./getAllHamsters');

const getRatio = async listOfHamsters => {
	return new Promise(async (res, rej) => {
		try {
			let hamstersWithRatio = await listOfHamsters.map(hamster => {
				hamster.ratio = hamster.wins - hamster.defeats;
				return hamster;
			});
			hamstersWithRatio.sort((a, b) => b.ratio - a.ratio);
			res(hamstersWithRatio);
		} catch (err) {
			console.error(err);
			rej(err);
		}
	});
};

const getFive = async chartTopOrBottom => {
	return new Promise(async (res, rej) => {
		try {
			let allHamstersArray = await getAllHamsters();
			let hamstersWithRatio = await getRatio(allHamstersArray);
			let five = null;
			if (chartTopOrBottom === 'top') {
				five = hamstersWithRatio.slice(0, 5);
			} else {
				five = hamstersWithRatio.slice(-5);
			}
			res(five);
		} catch (err) {
			console.error(err);
			rej(err);
		}
	});
};
exports.getFive = getFive;
