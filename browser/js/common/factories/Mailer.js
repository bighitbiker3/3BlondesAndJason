app.factory('Mailer', function($http){
  return {
    sendWelcomeMessage: function(data){
      return $http.post('/api/mailer/welcomeMessage', data)
      .then(res => res.data)
    }
  }
})
