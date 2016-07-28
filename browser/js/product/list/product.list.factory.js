app.factory('ProductListFactory', function($http){

	var ProductListFactory = {};

	ProductListFactory.addProduct = function(id, quantity) {
		return $http.post('/api/me/cart/' + id, {quantity: quantity})
		.then(res => res.data)
		.then(ProductDetailFactory.convert);
	}

	return ProductListFactory;

})