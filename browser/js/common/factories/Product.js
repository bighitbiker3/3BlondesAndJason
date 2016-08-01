'use strict';

app.factory('Product', function ($http) {

	var ProductFactory = {};

	// JA and BG: why attach to ProductFactory -- normal variable
    // actively think about public interface to anything using factory
	ProductFactory.url = '/api/products'

	ProductFactory.getAll = function(query) {
		if(!query) query = '';
		return $http.get(ProductFactory.url + query)
		.then(res => res.data);
	}

	ProductFactory.getOne = function(id) {
		return $http.get(ProductFactory.url + '/' + id)
		.then(res => res.data)
	}

	ProductFactory.editOne = function(id, data){
		return $http.put(ProductFactory.url + '/' + id, data)
		.then(res => res.data)
	}

	return ProductFactory;
})
