'use strict';

app.config(function($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: 'CheckoutCtrl',
        resolve: {
            cartItems: function(Cart, AuthService) {
                return AuthService.getLoggedInUser()
                    .then(user => {
                        if (user) return Cart.fetchCartItems()
                        else return Cart.fetchNotLoggedInItems()
                    })
                    .then(cartItems => {
                        return cartItems.map(function(cartItem) {
                            cartItem.product.price = cartItem.product.price / 100;
                            return cartItem;
                        })
                    });
            },
            me: function(AuthService) {
                return AuthService.getLoggedInUser();
            }
        }
    })
});
