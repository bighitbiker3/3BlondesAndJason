app.controller('CheckoutCtrl', function($scope, $uibModal, $state, AuthService, cart) {
    $scope.newOrder = {
        purchasedItems: cart
    };

    $scope.setCurrentShipping = function(address){
        $scope.shipping = address;
    }

    $scope.setCurrentBilling = function(address){
        $scope.billing = address;
    }

})