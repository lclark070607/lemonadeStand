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