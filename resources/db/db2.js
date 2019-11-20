const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

module.exports.getIngredients = function() {
    var ing = 'None';
    MongoClient.connect(url, function(err, client) {
		const db = client.db('nutrition');
		const collection = db.collection('ingredients');

		collection.find({}).toArray((error, documents) => {
            client.close();
            console.log('Cont: ' + documents[0].name);
            ing = documents[0].name;
            console.log('ing: ' + ing);
        });
    });
    console.log('ing2: ' + ing);
    return ing;
}

module.exports.getIngredients2 = function() {
    return 'WHAT!';
}