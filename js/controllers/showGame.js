module.exports = {
    name: 'ShowGameController',
    func: function ($scope, IdService, IngredientService) {
        $scope.myStand = IdService.stand.stand_name;
        $scope.ingredients = IngredientService.getIngredients();
        $scope.stats = IngredientService.getStats();
    }
};
