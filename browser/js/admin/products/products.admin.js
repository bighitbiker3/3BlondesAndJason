'use strict';

app.controller('adminProductsCtrl', function($scope, Product){
  Product.getAll()
  .then(products => {
    $scope.products = products
    console.log('helloooo');
  })
  .catch(error => {
    console.log(error)
  })

  $scope.edit = function(){
    console.log(this)
  }
})


app.controller('adminProductDetailCtrl', function($scope, Product, $stateParams){
  let productId = $stateParams.productId;

  Product.getOne(productId)
  .then(product => $scope.product = product)
  .catch(error => console.error(error))

  $scope.saveChanges = function(formData){
    console.log(formData);
  }
})
