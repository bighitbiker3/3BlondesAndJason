'use strict';

app.config(function ($stateProvider) {
    $stateProvider.state('adminProducts', {
        url: '/admin/products',
        template: '<product-list-admin ng-repeat="product in products" model="product"></product-list-admin>',
        controller: 'adminProductsCtrl'
    })
    .state('adminProducts.detail', {
      url: '/:productId',
      template: 'js/admin/products/product.detail.admin.html',
      controller: 'adminProductDetailCtrl'
    });
});



app.controller('adminProductsCtrl', function($scope, Product){
  Product.getAll()
  .then(products => {
    $scope.products = products
  })
  .catch(error => {
    console.log(error)
  })

  $scope.edit = function(){
    console.log(this)
  }
})

app.controller('adminProductDetailCtrl', function($scope, Product, $stateParams){
  console.log($stateParams);
})
