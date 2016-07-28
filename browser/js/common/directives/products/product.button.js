'use strict';

app.directive('productButton', function(){
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/products/product.button.html',
    scope: {
      quantity: '=',
      productId:'='
    }
  }
});
