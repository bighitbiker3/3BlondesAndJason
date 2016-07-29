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

      function getOrderDetails(id){
        if(scope.details[id]) scope.show[id] = true;
        else {
          if($rootScope.isAdmin) {
            console.log('is admin on root');
            Order.getAllOrderDetails(id)
            .then(details => {
              scope.show[id] = true;
              scope.details[id] = details;
            })
          } else {
            console.log('no is admin on root');
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
