'use strict';

juke.factory('ProductDetailFactory', function ($http) {

  return {

    // adds convert and fetchAll methods to productFactory 
    convert: function (product) {
      product.Url = '/api/products/' + product.id;
      return product;
    },

    fetchAll: function () {
      return $http.get('/api/products')
      .then(res => res.data);
    }

  };

});
