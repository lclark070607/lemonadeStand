const app = angular.module('LemonadeApp', ['ui.router']);

let newStand = require('./controllers/newStand');
let ingredientList = require('./controllers/ingredientList');

app.controller(newStand.name, newStand.func);
app.controller(ingredientList.name, ingredientList.func);

app.factory('IdService', function ($http) {
   let myStand = null;

    return {
       
        add(stand) {
           myStand = stand;

            $http.post('https://blooming-hamlet-70507.herokuapp.com/stand', {
                stand_name: stand.stand_name,
            });
        },
    };
});