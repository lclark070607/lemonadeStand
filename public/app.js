(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./controllers/buyButton":2,"./controllers/ingredientList":3,"./controllers/newStand":4,"./controllers/startGame":5,"./controllers/statsList":6}],2:[function(require,module,exports){
module.exports = {
    name: 'BuyButtonController',
    func: function ($scope) {

    },
};
},{}],3:[function(require,module,exports){
module.exports = {
    name: 'IngredientListController',
    func: function ($scope, IngredientService) {

        $scope.ingredients = IngredientService.getIngredients();

    }
};
},{}],4:[function(require,module,exports){
function Stand(name) {
    this.stand_name = name;
    this.id = null;

    return this;
}

module.exports = {
    name: 'NewStandController',
    func: function ($scope, $state, IdService) {
        //default values
        $scope.name = '';


        $scope.newStand = function () {

            const newStand = new Stand($scope.name);

            IdService.add(newStand);

            $scope.name = '';
            // Re-route to the 'show-game' state.
            $state.go('show-game');
            
        };
    }
}
},{}],5:[function(require,module,exports){
// module.exports = {
//     name: 'startGameController',
//     func: function ($scope) {

//     },
// };
},{}],6:[function(require,module,exports){
module.exports = {
    name: 'StatsListController',
    func: function ($scope, IngredientService, IdService) {

        $scope.stats = IngredientService.getStats();
    }
};

},{}]},{},[1]);
