app.config(function ($stateProvider) {
    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'js/admin/home/admin.html',
        controller: 'adminCtrl'
    })
    .state('admin.products', {
        url: '/products',
        templateUrl: 'js/admin/products/products.admin.html',
        controller: 'adminProductsCtrl'
    })
    .state('admin.productDetail', {
      url: '/:productId',
      templateUrl: 'js/admin/products/product.detail.admin.html',
      controller: 'adminProductDetailCtrl'
    });
})
