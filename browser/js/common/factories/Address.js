'use strict';

app.factory('Address', function ($http) {
  return {
    getMyAddresses: function(){
      return $http.get('/api/me/addresses')
      .then(res => res.data);
    },
    createNewAddress: function(address){
      return $http.post('/api/me/addresses', address)
      .then(res => res.data);
    }
  }
});
