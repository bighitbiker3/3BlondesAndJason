'use strict';

app.directive('addToCart', function(ProductListFactory, $state) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/products/product.add-to-cart.html',
        scope: {
            product: '=model'
        },
        link: function(scope, elem, attrs) {
            scope.added = false;
            // JA and BG: _.range from lodash
            scope.quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            scope.quantity = scope.quantities[0];
            scope.addToCart = function(product) {
                scope.added = true;
                ProductListFactory.addProduct(product, scope.quantity)
                .then(() => {
                    $state.go('cart');
                })
            }
        }
    }
});
