const express = require('express');

const fileUpload = require('express-fileupload');

const app = express();

const db = require('./firebase');

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

// app.get('/', (req, res) => {
// 	res.send('Yep');
// });

app.listen(7000, () => {
	console.log('Server is running on port 7000');
});
