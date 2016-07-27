app.config(function ($stateProvider) {
  $stateProvider.state('product', {
    url: '/products/:id',
    templateUrl: 'js/product/detail/product.detail.html',
    controller: 'ProductDetailCtrl',
    resolve: {
      product: function (Product, $stateParams) {
        return Product.getOne($stateParams.id);
      }
    }
  });
});
