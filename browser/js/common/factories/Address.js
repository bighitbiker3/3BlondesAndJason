'use strict';

app.factory('Address', function ($http) {
  return {
    getMyAddresses: function(){
      return $http.get('/api/me/addresses')
      .then(res => res.data);
    },
    createNewAddress: function(information){
      return $http.post('/api/me/addresses', information)
      .then(res => res.data);
    },
    getOneAddress: function(id){
      return $http.get('/api/address/' + id)
      .then(res => res.data)
    }
  }
});
