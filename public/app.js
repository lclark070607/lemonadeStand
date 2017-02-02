(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./controllers/ingredientList":2,"./controllers/newStand":3}],2:[function(require,module,exports){
module.exports = {
    name: 'IngredientListController',
    func: function ($scope, IdService) {
         
         $scope.stock = [

            { name: 'Lemons', count: 20, price: "$2.00/lemon" },
            { name: 'Sugar', count: 12, price: "$1.25/bag" },
            { name: 'Cups', count: 15, price: "$0.10/cup" },
            { name: 'Ice', count: 18, price: "$0.50/chunk" },
        ];

        $scope.buy = function (what) {
            console.log(`Buying ${what.name}`);
            if (what.count > 0) {
                what.count--;
            }
        };
    },
};
},{}],3:[function(require,module,exports){
function Stand(name) {
    this.stand_name = name;
    this.id = null;

    return this;
}

module.exports = {
    name: 'NewStandController',
    func: function ($scope, IdService) {
        //default values
        $scope.name = '';


        $scope.newStand = function () {

            const newStand = new Stand($scope.name);

            IdService.add(newStand);

            $scope.name = '';

        };
    }
}
},{}]},{},[1]);
