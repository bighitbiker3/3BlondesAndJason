'use strict';

app.factory('User', function ($http) {
  return {
    signup: function(signupData){
      return $http.post('/api/users', signupData)
      .then(res => res.data);
    },

    getAll: function(){
      return $http.get('/api/users')
      .then(res => res.data);
    },

    getOne: function(id){
      return $http.get('/api/users/'+id)
      .then(res => res.data);
    },

    editOne: function(id, data){
      return $http.put('/api/users/' + id, data)
      .then(res => res.data)
    }
  }
})
