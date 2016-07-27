'use strict';

app.factory('Product', function ($http) {

	var ProductFactory = {};

	ProductFactory.url = '/api/products'

	ProductFactory.getAll = function(query) {
		if(!query) query = '';
		return $http.get(ProductFactory.url + query)
		.then(res => {
      return res.data
    });
	}

	ProductFactory.getOne = function(id) {
		return $http.get(ProductFactory.url + '/' + id)
		.then(res => {

      return res.data;
    })
	}

	return ProductFactory;
})
