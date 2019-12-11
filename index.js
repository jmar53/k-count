const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
require('dotenv').config();
const IngredientModel = require('./models/ingredient.model');
const DishModel = require('./models/dish.model');
const MealModel = require('./models/meals.model');

const app = express();
const port = process.env.PORT || 3000;
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(urlencodedParser);

let mongoDB = process.env.DB_STRING;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/ingredient', (req, res) => {
  res.render('ingredient');
})

app.get('/dish', async (req, res, next) => {
  try {
    await IngredientModel.find({}).exec((err, ingredients) => {
      ingredients = ingredients.sort(function (a, b) {
        let name1 = a.name.toLowerCase();
        let name2 = b.name.toLowerCase();
        if (name1 < name2)
          return -1
        if (name1 > name2)
          return 1
        return 0
      });
      res.render('dish', { ingredients: ingredients });
    });
  } catch (error) {
    return next(error);
  }
})

app.get('/:date', async (req, res, next) => {
  try {
    let date = new Date(req.params.date);
    let dateEnd = new Date(req.params.date);
    dateEnd.setDate(date.getDate() + 1);

    let dishesArr = [];
    await DishModel.find({}).exec((err, dishes) => {
      dishesArr = dishes.sort(function (a, b) {
        let name1 = a.name.toLowerCase();
        let name2 = b.name.toLowerCase();
        if (name1 < name2)
          return -1
        if (name1 > name2)
          return 1
        return 0
      });
    });

    await MealModel.find({ "date": { "$gte": date, "$lt": dateEnd } }).exec((err, meals) => {
      meals = meals.sort(function (a, b) {
        let name1 = a.time;
        let name2 = b.time;
        if (name1 < name2)
          return -1
        if (name1 > name2)
          return 1
        return 0
      });
      res.render('meals', { date: req.params.date, dishes: dishesArr, meals: meals });
    });
  } catch (error) {
    return next(error);
  }
});

app.post('/', urlencodedParser, async (req, res, next) => {
  try {
    // Build the JSON of added meals
    let newMeals = [];

    if (req.body.name !== undefined) {
      if (typeof (req.body.name) === 'string') {
        newMeals[0] = { date: req.body.date, time: req.body.time, name: req.body.name, cals: req.body.cals, fat: req.body.fat, carbs: req.body.carbs, protein: req.body.protein };
      } else {
        for (i = 0; i < req.body.name.length; i++) {
          newMeals[i] = { date: req.body.date, time: req.body.time[i], name: req.body.name[i], cals: req.body.cals[i], fat: req.body.fat[i], carbs: req.body.carbs[i], protein: req.body.protein[i] };
        }
      }

      await MealModel.insertMany(newMeals, function (err) {
      });
    }
    res.redirect(`/${req.body.date}`);
  } catch (error) {
    return next(error);
  }
})

app.post('/ingredient', urlencodedParser, async (req, res, next) => {
  try {
    const ingredientJSON = {
      name: req.body.name,
      per: req.body.amount,
      cals: req.body.cals,
      fat: req.body.fat,
      carbs: req.body.carbs,
      protein: req.body.protein
    };
    const newIngredient = new IngredientModel(ingredientJSON);
    await newIngredient.save(function (err) {
      if (err) console.log(err);
    });
    res.redirect('/ingredient');
  } catch (error) {
    return next(error);
  }
})

app.post('/dish', urlencodedParser, async (req, res) => {
  try {
    const dishJSON = {
      name: req.body.name,
      cals: req.body.calsTotal,
      fat: req.body.fatTotal,
      carbs: req.body.carbsTotal,
      protein: req.body.proteinTotal
    };
    const newDish = new DishModel(dishJSON);
    await newDish.save(function (err) {
      if (err) console.log(err);
    });
    res.redirect('/dish');
  } catch (error) {
    return next(error);
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})