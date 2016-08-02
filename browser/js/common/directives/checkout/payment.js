app.directive('payment', function($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/checkout/payment.html',
        link: function(scope) {
            scope.submitPayment = function(checkout) {
                //we must add createPayment to the order factory
                order.createPayment($scope.newOrder)
                    .then(function() {
                        // show confirmation modal
                        $uibModal.open({
                            templateUrl: '/js/checkout/confirmation.html',
                            controller: ['$scope', '$uibModalInstance', '$state', function($scope, $uibModalInstance, $state) {
                                $scope.ok = function() {
                                    $uibModalInstance.close();
                                }
                            }]
                        });
                        $state.go('products');
                    })
                    .catch(error => console.error(error));
            }
        }
    }

})
