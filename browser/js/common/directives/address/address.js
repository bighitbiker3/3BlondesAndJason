'use strict';

app.directive('address', function($rootScope, Address){
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/address/address.html',
    scope: {
      address: '=model'
    },
    link: function(scope, elem, attrs){
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
