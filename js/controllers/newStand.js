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