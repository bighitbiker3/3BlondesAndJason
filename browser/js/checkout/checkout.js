app.controller('CheckoutCtrl', function($scope, $uibModal, $state, AuthService, cart) {
    $scope.newOrder = {
        purchasedItems: cart
    };

    // add error handling
    AuthService.getLoggedInUser()
        .then(function(user) {
            if (user) {
            	$scope.newOrder.user = user; 
            	$scope.newOrder.shippingEmail = user.email;
                $scope.newOrder.streetAddress = user.streetAddress;           
                $scope.newOrder.city = user.city;
                $scope.newOrder.state = user.state;
                $scope.newOrder.zipCode = user.zipCode;
            }
        });

        $scope.checkout = function() {

            // create order 
            Order.createOrder($scope.newOrder)
            .then(function() {
                $uibModal.open({
                    templateUrl: 'js/checkout/confirmation.html', 
                    controller: ['$scope', '$uibModalInstance', '$state', function($scope, $uibModalInstance, $state){
                        $scope.ok = function() {
                            $uibModalInstance.close();
                        }
                    }]
                })
            })
        }
})