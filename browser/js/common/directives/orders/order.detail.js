'use strict';

app.directive('orderDetail', function(Order){
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/orders/order.detail.html',
    scope: {
      orderDetail: '=model'
    }
  }
});
