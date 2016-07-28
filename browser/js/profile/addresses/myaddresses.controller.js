app.controller('ProfileAddressCtrl', function($scope, addresses, Address){
  $scope.addresses = addresses;

  $scope.createAddress = function(address){
    console.log(address);
    Address.createNewAddress(address)
    .then(address => {
      $scope.addresses.push(address);
    })
  }
})
