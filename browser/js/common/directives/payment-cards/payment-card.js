'use strict';

app.directive('paymentCard', function(){
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/payment-cards/payment-card.html',
    scope: {
      card: '=model'
    }
  }
});
