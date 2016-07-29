app.controller('ProfileAddressCtrl', function($scope, addresses, Address){
  $scope.addresses = addresses;

  $scope.createAddress = function(information){
    Address.createNewAddress(information)
    .then(address => {
      $scope.addresses.push(address);
      $scope.information = {};
      $scope.addAddress.$setPristine()
    })
  }
})
