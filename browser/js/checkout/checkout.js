app.controller('CheckoutCtrl', function($scope, cartItems) {

    $scope.setCurrentShipping = function(address) {
        $scope.shipping = address;
    }

    $scope.setCurrentBilling = function(address) {
        $scope.billing = address;
    }

    $scope.cartItems = cartItems;

    $scope.charge = function(){

    }

    $scope.totalPrice = cartItems.reduce(function(sum, item){
    	return sum + item.price * item.quantity;
    }, 0)

})
