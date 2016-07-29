'use strict';

app.directive('addToCart', function(ProductListFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/products/product.add-to-cart.html',
        scope: {
            productId: '=model'
        },
        link: function(scope, elem, attrs) {
            scope.quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            scope.quantity = scope.quantities[0];
            scope.addToCart = function(id) {
                return ProductListFactory.addProduct(id, scope.quantity)
            }
        }
    }
});
