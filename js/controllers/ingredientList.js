module.exports = {
    name: 'IngredientListController',
    func: function ($scope, IngredientService) {

        $scope.ingredients = IngredientService.getIngredients();

    }
};