const express = require('express');

const app = express();

const db = require('./firebase');

const data = require('./data.json');

const { getDataIntoFirestore } = require('./uploadDataToFirestore');
// getDataIntoFirestore(data);

//Routes
const hamstersRoutes = require('./routes/hamstersRoute');

const testRoute = require('./routes/testRoute');

//Middleware
app.use(express.json());
app.use('/hamsters', hamstersRoutes);
app.use('/test', testRoute);

app.get('/', (req, res) => {
	res.send('Yep');
});

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
