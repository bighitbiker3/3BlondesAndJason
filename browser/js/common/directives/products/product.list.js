'use strict';

app.directive('productList', function(){
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/products/product.list.html',
    scope: {
      product: '=model'
    }
  }
});
