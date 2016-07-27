app.config(function ($stateProvider) {
  $stateProvider.state('products', {
    url: '/products',
    templateUrl: 'js/products/products.html',
    controller: 'ProductListCtrl',
    resolve: {
      products: function (Product) {
        return Product.getAll();
      }
    }
  });
});
