const express = require('express')
const mongoose = require('mongoose');
const IngredientModel = require('./models/ingredient.model');
const DishModel = require('./models/dish.model');
const MealModel = require('./models/meals.model');
//const bodyParser = require('body-parser')
const app = express()
const port = 3000
//const urlencodedParser = bodyParser.urlencoded({extended: false})

app.set('view engine', 'pug')
app.use(express.static('public'))
//app.use(urlencodedParser)

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/nutrition';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
  //res.render('index', {superheroes: superheroes})
  //res.send('Hello');
  res.render('meals');

  /*//Create object to store values from ingredient page then save them
  var ingredient = new IngredientModel({name: 'Test6', per: 100.4, cals: 87.3, fat: 3.5, carbs: 44.7, protein: 22.3});
  ingredient.save(function (err) {
    if (err) console.log(err);
    // saved!
    IngredientModel.find({}).exec((err, ingredients) => {
      res.json(ingredients);
    });
  });*/

  /*//Use create method passing the values from ingredient page
  IngredientModel.create({name: 'Test2', per: 100, cals: 87, fat: 3, carbs: 44, protein: 22}, function (err, ingredient) {
    if (err) console.log(err);
    // saved!
    IngredientModel.find({}).exec((err, ingredients) => {
      res.json(ingredients);
    });
  });*/
})

app.get('/ingredient', (req, res) => {
  //res.send('Ingredient');
  res.render('ingredient');
})

app.get('/dish', (req, res) => {
  //res.send('Dish');
  /*IngredientModel.find({}).exec((err, ingredients) => {
    res.json(ingredients);
  });*/
  res.render('dish');
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})