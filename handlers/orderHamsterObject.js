const orderHamsterObject = hamsterObject => {
	const specificHamster = {};
	//TODO: kolla på den här, du kanske inte måste lägga den i en ny utan det kanske går redan efter sort-
	Object.keys(hamsterObject).sort().forEach(function(key) {
		specificHamster[key] = hamsterObject[key];
	});
	return specificHamster;
};
exports.orderHamsterObject = orderHamsterObject;
