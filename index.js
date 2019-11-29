const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const IngredientModel = require('./models/ingredient.model');
const DishModel = require('./models/dish.model');
const MealModel = require('./models/meals.model');

const app = express();
const port = 3000;
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(urlencodedParser);

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/nutrition';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
  MealModel.find({}).exec((err, meals) => {
    res.render('meals', {meals: meals});
  });

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
  res.render('ingredient');
})

app.post('/ingredient', urlencodedParser, (req, res) => {
  const ingredientJSON = {
    name: req.body.name,
    per: req.body.amount,
    cals: req.body.cals,
    fat: req.body.fat,
    carbs: req.body.carbs,
    protein: req.body.protein
  };
  const newIngredient = new IngredientModel(ingredientJSON);
  newIngredient.save(function (err) {
    if (err) console.log(err);
  });

  res.redirect('/ingredient');
})

app.get('/dish', (req, res) => {
  IngredientModel.find({}).exec((err, ingredients) => {
    res.render('dish', {ingredients: ingredients});
  });
})

app.post('/dish', urlencodedParser, (req, res) => {
  /*** If saving multiple ingredients to one dish name:
  let bodyArray = Object.values(req.body);
  let dishName = bodyArray.shift();

  for(i=0;i<bodyArray.length;i+=6) {
    const dishJSON = {
      name: dishName,
      ingredient_name: bodyArray[i],
      amount: bodyArray[i+1],
      cals: bodyArray[i+2],
      fat: bodyArray[i+3],
      carbs: bodyArray[i+4],
      protein: bodyArray[i+5]
    }
    console.log(dishJSON)
  }
  res.redirect('/dish');
  ***/

  const dishJSON = {
    name: req.body.name,
    cals: req.body.calsTotal,
    fat: req.body.fatTotal,
    carbs: req.body.carbsTotal,
    protein: req.body.proteinTotal
  };
  const newDish = new DishModel(dishJSON);
  newDish.save(function (err) {
    if (err) console.log(err);
  });

  res.redirect('/dish');
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})