'use strict';

app.directive('addressItem', function(Order){
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/address/address.html'
  }
});
