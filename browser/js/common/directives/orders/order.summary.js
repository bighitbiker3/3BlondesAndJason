'use strict';

app.directive('orderSummary', function(Order){
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
          Order.getMyOrderDetails(id)
          .then(details => {
            scope.show[id] = true;
            scope.details[id] = details;
          })
        }
      }

      scope.toggle = function(id){
        if(scope.show[id]) scope.show[id] = false;
        else getOrderDetails(id);
      }
    }
  }
});
