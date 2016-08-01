'use strict';

app.directive('addressForm', function($rootScope, Address){
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/address/address.html',
    link: function(scope, elem, attrs){
      scope.createAddress = function(information){
        Address.createNewAddress(information)
        .then(address => {
          $rootScope.addresses.push(address);
          scope.information = {};
          scope.addAddress.$setPristine()
        })
      }

      scope.deleteAddress = function(addressId, userId){
        Address.removeAddressFromUser(addressId, userId)
        .then(() => {
          $rootScope.addresses.forEach((address, i) => {
            if(address.id === addressId){
              $rootScope.addresses.splice(i, 1)
            }
          })
        })
        .catch(error => console.error(error))
      }
    }
  }
});
