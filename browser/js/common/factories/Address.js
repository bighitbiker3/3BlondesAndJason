'use strict';

app.factory('Address', function($http) {
    return {
        getMyAddresses: function() {
            return $http.get('/api/me/addresses')
                .then(res => res.data);
        },
        createNewAddress: function(information, user) {
            if (user) {
                return $http.post('/api/me/addresses', information)
                    .then(res => res.data);
            } else {
                return $http.post('/api/address', information)
                .then(res => res.data)
            }
        },
        getOneAddress: function(id) {
            return $http.get('/api/address/' + id)
                .then(res => res.data)
        },
        removeAddressFromUser: function(addressId, userId) {
            return $http.delete('/api/address/' + addressId + '/' + userId)
                .then(res => res.data)
        }
    }
});
