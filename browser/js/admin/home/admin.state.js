app.config(function ($stateProvider) {
    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'js/admin/home/admin.html',
        controller: 'adminCtrl'
    })
    .state('admin.products', {
        url: '/admin/products',
        template: '<product-list-admin ng-repeat="product in products" model="product"></product-list-admin>',
        controller: 'adminProductsCtrl'
    })
    .state('admin.products.detail', {
      url: '/:productId',
      template: 'js/admin/products/product.detail.admin.html',
      controller: 'adminProductDetailCtrl'
    });
})
