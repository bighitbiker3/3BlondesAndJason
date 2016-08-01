'use strict';

app.config(function($stateProvider){
	$stateProvider.state('checkout', {
		url: '/checkout',
		templateUrl: 'js/checkout/checkout.html',
		controller: 'CheckoutCtrl',
		resolve : {
			cartItems: function(Cart){
				return Cart.fetchCartItems();
			}
		}
	})
})