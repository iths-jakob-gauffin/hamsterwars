const express = require('express');

const fileUpload = require('express-fileupload');

const helmet = require('helmet');

const app = express();

///// Få in hamsterdatan (data.json) i firestore, anropar därför denna funktion endast en gång. Jag skickar med den trots funktionen inte anropas.
const data = require('./data.json');
const { getDataIntoFirestore } = require('./uploadDataToFirestore');
///// Initera databasen
// getDataIntoFirestore(data);

///// Läs in API-nyckel
const apiKey = require('./apiKey');

//Middleware
app.use(express.json());
app.use(fileUpload());
app.use(helmet());
app.use(express.static('hamsters'));
app.use(express.static('public'));

///// Kontrollera om API-nyckeln stämmer (api-nyckeln är "abc123").
app.use((req, res, next) => {
	if (req.headers['authorization'] === apiKey) {
		next();
	} else {
		res.status(401).send({
			Error: `API-nyckeln stämmer inte. Nyckeln finns i roten i modulen 'apiKey.js'.`
		});
	}
});

//Routes
const hamstersRoutes = require('./routes/hamstersRoute');
const chartsRoutes = require('./routes/chartsRoute');
const gamesRoutes = require('./routes/gamesRoute');
const statsRoutes = require('./routes/statsRoute');
const filesRoutes = require('./routes/filesRoute');

app.use('/hamsters', hamstersRoutes);
app.use('/charts', chartsRoutes);
app.use('/games', gamesRoutes);
app.use('/stats', statsRoutes);
app.use('/files', filesRoutes);

///// Om en felaktig resurs anges i req.url ges ett felmeddelande och en 404. Detta kodstycke har jag copypejstat in från stackoverflow.
app.all('*', function(req, res) {
	throw new Error('Bad request');
});

app.use(function(e, req, res, next) {
	if (e.message === 'Bad request') {
		res
			.status(404)
			.json({ error: { msg: e.message, stack: e.stack } });
	}
});
///////////////////////

app.listen(7000, () => {
	console.log('Server is running on port 3000');
});
