app.factory('ProductListFactory', function($window, $http, AuthService, $rootScope, $q){

	var ProductListFactory = {};

	ProductListFactory.addProduct = function(product, quantity) {
    console.log('----------Here--------', product);
    $rootScope.cart = $rootScope.cart || {};
    return AuthService.getLoggedInUser()
    .then(user => {
      if (!user) {
				let userSession = $window.sessionStorage;
				if(userSession.getItem(product.id)) {
					let thisArr = JSON.parse(userSession.getItem(product.id)); //[product, quantity]
					thisArr[1] += quantity;
					userSession.setItem([product.id], JSON.stringify([product, thisArr[1]]))
				} else{
					userSession.setItem([product.id], JSON.stringify([product, quantity]))
				}
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
