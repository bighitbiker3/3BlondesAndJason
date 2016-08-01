'use strict';

app.config(function($stateProvider){
	$stateProvider.state('checkout', {
		url: '/checkout',
		templateUrl: 'js/checkout/checkout.html',
		controller: 'CheckoutCtrl',
		resolve : {
			cartItems: function(Cart){
				return Cart.fetchCartItems()
        .then(cartItems => {
          return cartItems.map(function(cartItem){
            cartItem.product.price = cartItem.product.price / 100;
            return cartItem;
          })
        });
			},
      me: function(AuthService){
        return AuthService.getLoggedInUser();
      }
		}
	})
});
