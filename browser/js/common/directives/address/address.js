'use strict';

app.directive('address', function(Order){
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/address/address.html'
  }
});
