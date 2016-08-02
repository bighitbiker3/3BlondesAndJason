'use strict';

app.directive('addressForm', function($rootScope, Address){
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/address/address-form.html',
    link: function(scope, elem, attrs){
      scope.createAddress = function(information, user){
        Address.createNewAddress(information, user)
        .then(address => {
          $rootScope.addresses.push(address);
          scope.information = {};
          scope.addAddress.$setPristine()
        })
      }
    }
  }
});
