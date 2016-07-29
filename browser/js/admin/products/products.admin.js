'use strict';

app.controller('adminProductsCtrl', function($scope, Product){
  Product.getAll()
  .then(products => {
    $scope.products = products
  })
  .catch(error => {
    console.log(error)
  })
})


app.controller('adminProductDetailCtrl', function($scope, $state, Product, $stateParams){
  let productId = $stateParams.productId;

  Product.getOne(productId)
  .then(product => $scope.product = product)
  .catch(error => console.error(error))

  $scope.saveChanges = function(formData){
    Product.editOne(productId, formData)
    .then(updatedProduct => $state.go('admin.products'))
  }
})
