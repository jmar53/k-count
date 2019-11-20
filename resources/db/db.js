const express = require('express');
const dbController = require('./db2');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const url = 'mongodb://localhost:27017';

app.get('/', (req, res) => {
	//let str = dbController.getIngredients();
	//console.log(str);
	//res.send(dbController.getIngredients());
	MongoClient.connect(url, function (err, client) {
		const db = client.db('nutrition');
		const collection = db.collection('ingredients');

		collection.find({}).toArray((error, documents) => {
			client.close();
			res.send(documents[0].name);
			//	res.render('index', { documents: documents });
		});
	});
});

app.get('/ingredient.html', (req, res) => {
	MongoClient.connect(url, function (err, client) {
		const db = client.db('nutrition');
		const collection = db.collection('ingredients');

		collection.find({}).toArray((error, documents) => {
			client.close();
			res.send(documents[0].name);
		});
	});
});

app.listen(3000, function () {
	console.log('k-count listening on port 3000!');
});