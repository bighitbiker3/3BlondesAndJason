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


















//   function Product (props) {
//     angular.extend(this, props);
//   }

//   Product.url = '/api/products/';

//   Product.prototype.getUrl = function () {
//     return Product.url + this.id;
//   };

//   Product.prototype.isNew = function () {
//     return !this.id
//   };

//   Product.prototype.fetch = function () {
//     return $http.get(this.getUrl())
//     .then(function (res) {
//       return new Product(res.data);
//     });
//   };

//   Product.fetchAll = function () {
//     return $http.get(Product.url)
//     .then(function (res) {
//       return res.data.map(function (obj) {
//         return new Product(obj);
//       });
//     });
//   };

//   Product.prototype.save = function () {
//     var verb;
//     var url;
//     if (this.isNew()) {
//       verb = 'post';
//       url = Product.url;
//     } else {
//       verb = 'put';
//       url = this.getUrl();
//     }
//     return $http[verb](url, this)
//     .then(function (res) {
//       return new Product(res.data);
//     });
//   };

//   Product.prototype.destroy = function () {
//     return $http.delete(this.getUrl());
//   };

//   return Product;
// });
