app.config(function($stateProvider){
	$stateProvider.state('checkout', {
		url: '/checkout',
		templateUrl: 'js/checkout/checkout.html',
		controller: 'CheckoutCtrl',
		resolve : {
			fetchCartItems : function(Cart){
				return Cart.fetchCartItems();
			}
		}
	})
})