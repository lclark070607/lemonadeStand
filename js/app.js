const app = angular.module('LemonadeApp', ['ui.router']);

let newStand = require('./controllers/newStand');
let ingredientList = require('./controllers/ingredientList');
let statsList = require('./controllers/statsList')
let buyButton = require('./controllers/buyButton');
let startGame = require('./controllers/startGame');

const controllers = [
    newStand,
    ingredientList,
    statsList,
    buyButton,
    startGame,
];

for (let i = 0; i < controllers.length; i++) {
    app.controller(controllers[i].name, controllers[i].func);
}

//VIEWS
app.config(function ($stateProvider) {
    // MAIN STAND DISPLAY

    $stateProvider.state({
        name: 'start-game',
        url: '/startGame',
        component: 'startGame',
    });

    $stateProvider.state({
        name: 'show-game',
        url: '/showGame',
        component: 'showGame',
    });
    // SCORES DISPLAY
});




/* Defining a component */

// app.component('startGame', {
//     templateUrl: 'templates/startGame.html'
// });

app.component('showGame', {
    templateUrl: 'templates/showGame.html'
});

app.component('statsList', {
    controller: 'StatsListController',
    templateUrl: 'templates/stats.html',
});

app.component('ingredientsList', {
    controller: 'IngredientListController',
    templateUrl: 'templates/ingredients.html',
    bindings: {
        subtract: '<',
        clickedOn: '&',
    },
});

app.component('buyButton', {
    controller: 'BuyButtonController',
    templateUrl: 'templates/buyButton.html',
    bindings: {
        subtract: '<',
        clickedOn: '&',
    },
});

//SERVICES

app.factory('IdService', function ($http) {
    let myStand = null;

    return {

        add(stand) {
            myStand = stand;

            $http.post('https://blooming-hamlet-70507.herokuapp.com/stand', {
                stand_name: myStand
            }).then(function (response) {
                myStand = response.data.stand_id;
            });

        },

        getMyStandId() {
            return myStand;
        }
    };
});

app.factory('IngredientService', function ($http, IdService) {
    const ingredients = [
        { id: 0, name: 'Sugar', count: 1, price: 1.25, placeholder: "$1.25/ bag" },
        { id: 1, name: 'Lemons', count: 1, price: 2, placeholder: "$2.00/ lemon" },
        { id: 2, name: 'Ice', count: 1, price: 0.50, placeholder: "$0.50/ chunk" },
        { id: 3, name: 'Cups', count: 1, price: 0.10, placeholder: "$0.10/ cup" },
    ];

    const stats = [
        { name: 'Day', count: 1 },
        { name: 'Money', count: 20 },
        { name: 'Visitors', count: 0 },
        { name: 'Customers', count: 0 },
    ];


    return {
        getIngredients() {
            return ingredients;
        },

        getStats() {
            $http.get('https://blooming-hamlet-70507.herokuapp.com/stand/' + IdService.getMyStandId())
                .then(function (response) {

                    angular.copy(response.data.stats, stats);
                    return stats;
                });

        }
    };
});



  //     getIngredient(id) { // id is a number like 0, 1, 2
    //         for (let i = 0; i < ingredients.length; i++) {
    //             if (ingredients[i].id === id) {
    //                 return ingredients[i];
    //             }
    //         }
    //     },
    // };