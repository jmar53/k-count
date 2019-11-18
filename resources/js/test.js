window.onload = function () {
    //var json = require('./meals.json');
    const apiURL = './meals.json'; //'https://api.tvmaze.com/search/shows?q=batman';

    fetch(apiURL)
        .then(function (response) {
            return response.json(); // we get a Response object back with the TV data
        })
        .then(function (data) {
            /*const show = data[0];
 
            console.log(show.show.name); // Batman
            console.log(show.show.premiered); // 1966-01-12
            console.log(show.show.image.original);*/

            const meal = data[0];
            console.log(meal);
            //console.log(meal.meal.name);
            //console.log(meal.meal.cals);
            //console.log(meal.meal.fat);
        });
}