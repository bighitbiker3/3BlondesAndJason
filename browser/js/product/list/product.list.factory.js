app.factory('ProductListFactory', function($http, AuthService, $rootScope){

	var ProductListFactory = {};

	ProductListFactory.addProduct = function(product, quantity) {
    $rootScope.cart = $rootScope.cart || {};
    AuthService.getLoggedInUser()
    .then(user => {
      if (!user) {
        $rootScope.cart[product.id] = [product, quantity];
      }
      else {
        return $http.post('/api/me/cart/' + product.id, {quantity: quantity})
      }
    })
		.then((...args) => {
      if (args[0]) return args[0].data;
    })
	}

	return ProductListFactory;

})
