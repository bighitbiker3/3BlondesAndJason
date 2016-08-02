'use strict';

app.directive('orderSummary', function(Order, AuthService, $rootScope){
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/orders/order.summary.html',
    scope: {
      orderSummary: '=model'
    },
    link: function (scope, elem, attrs) {
      scope.details = {};
      scope.show = {};
      scope.orderSummary.priceTotal = scope.orderSummary.priceTotal / 100;

      function getOrderDetails(id){
        if(scope.details[id]) scope.show[id] = true;
        else {
          if($rootScope.isAdmin) {
            Order.getAllOrderDetails(id)
            .then(details => {
              scope.show[id] = true;
              scope.details[id] = details;
            })
          } else {
            Order.getMyOrderDetails(id)
            .then(details => {
              scope.show[id] = true;
              scope.details[id] = details;
            })
          }

        }
      }

      scope.toggle = function(id){
        if(scope.show[id]) scope.show[id] = false;
        else getOrderDetails(id);
      }
    }
  }
});
