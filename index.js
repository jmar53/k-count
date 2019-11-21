const express = require('express')
//const bodyParser = require('body-parser')
const app = express()
const port = 3000
//const urlencodedParser = bodyParser.urlencoded({extended: false})

app.set('view engine', 'pug')
app.use(express.static('public'))
//app.use(urlencodedParser)

app.get('/', (req, res) => {
  //res.render('index', {superheroes: superheroes})
  //res.send('Hello');
  res.render('index');
})

app.get('/ingredient', (req, res) => {
  //res.send('Ingredient');
  res.render('ingredient');
})

app.get('/dish', (req, res) => {
  res.send('Dish');
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})