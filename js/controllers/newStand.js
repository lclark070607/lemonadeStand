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