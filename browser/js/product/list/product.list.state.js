app.config(function ($stateProvider) {
  $stateProvider.state('products', {
    url: '/products',
    templateUrl: 'js/product/list/product.list.html',
    controller: 'ProductListCtrl',
    resolve: {
      products: function (Product) {
        return Product.getAll();
      }
    }
  });
});
