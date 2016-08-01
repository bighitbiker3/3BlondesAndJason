app.controller('CheckoutCtrl', function($scope, $uibModal, $state, cart) {

    $scope.setCurrentShipping = function(address) {
        $scope.shipping = address;
    }

    $scope.setCurrentBilling = function(address) {
        $scope.billing = address;
    }

    $scope.totalPrice = function() {
    	return cart.reduce(function(sum, item) {
    	return sum + item.quantity * item.product.price;
    	}, 0)
	}

})
