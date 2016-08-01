'use strict';

app.directive('productList', function(){
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/products/product.list.html',
    scope: {
      product: '=model'
    },
    link: function(scope, elem, attrs) {
      scope.product.description = scope.product.description.substring(0, 100);
    }
  }
});
