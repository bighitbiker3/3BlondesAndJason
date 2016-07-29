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

  $scope.deleteAddress = function(addressId, userId){
    Address.removeAddressFromUser(addressId, userId)
    .then(() => {
      $scope.addresses.forEach((address, i) => {
        if(address.id === addressId){
          $scope.addresses.splice(i, 1)
        }
      })
    })
    .catch(error => console.error(error))
  }
})
