module.exports = {
    name: 'StatsListController',
    func: function ($scope, IngredientService, IdService) {

        $scope.stats = IngredientService.getStats();
    }
};
