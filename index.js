const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const IngredientModel = require('./models/ingredient.model');
const DishModel = require('./models/dish.model');
const MealModel = require('./models/meals.model');

const app = express();
const port = 3003;
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(urlencodedParser);

var mongoDB = 'mongodb://127.0.0.1/nutrition';
//const dbUser = process.env.DBUSER;
//const dbPword = process.env.DBPWORD;
//let mongoDB = `mongodb+srv://${dbUser}:${dbPword}@cluster0-stxlu.mongodb.net/nutrition?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let date = new Date();
date.setHours(0);
date.setMinutes(0);
date.setSeconds(0);
date.setMilliseconds(0);

app.get('/', (req, res) => {
  MealModel.find({}).where('date').equals(date).exec((err, meals) => {
    res.render('meals', { date: date.toDateString(), meals: meals });
  });
})

app.post('/', urlencodedParser, (req, res) => {
  // Build the JSON of added meals
  let newMeals = [];

  const time = '12:20';

  if (req.body.name !== undefined) {
    if (typeof (req.body.name) === 'string') {
      newMeals[0] = { date: date, time: time, name: req.body.name, cals: req.body.cals, fat: req.body.fat, carbs: req.body.carbs, protein: req.body.protein };
    } else {
      for (i = 0; i < req.body.name.length; i++) {
        newMeals[i] = { date: date, time: time, name: req.body.name[i], cals: req.body.cals[i], fat: req.body.fat[i], carbs: req.body.carbs[i], protein: req.body.protein[i] };
      }
    }

    MealModel.insertMany(newMeals, function (err) {
      //res.redirect('/');
    });
  }
  res.redirect('/');
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
    res.render('dish', { ingredients: ingredients });
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