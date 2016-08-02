app.config(function ($stateProvider) {

    $stateProvider.state('passwordreset', {
        url: '/reset/:hashId' ,
        templateUrl: 'js/passwordReset/reset.html',
        controller: 'resetCtrl'
    })

    $stateProvider.state('forgotPassword', {
          url: '/forgotpassword',
          templateUrl: 'js/passwordReset/forgotPassword.html',
          controller: 'forgotPasswordCtrl'
    });
});



app.factory('ResetPassword', function($http){
  return {
    checkHashRoute: function(hash){
      return $http.get('/api/password/resetPassword/?uw=' + hash)
      .then(res => res.data)
    },
    resetUserPassword: function(data){
      return $http.put('/api/password/resetPassword', data)
      .then(res => res.data)
    },
    sendForgotEmail: function(email){
      return $http.post('/api/mailer/resetPassword', {email: email})
      .then(res => res.data)
    }
  }
})

app.controller('resetCtrl', function($scope, $stateParams, ResetPassword, User){
  let hashId = $stateParams.hashId;
  let password = $scope.password;
  $scope.passwordResetComplete = false;
  $scope.error = null;

  $scope.resetPassword = function(password){
    ResetPassword.checkHashRoute(hashId)
    .then(email => {
      if(email){
        let reqBody = {email: email, password: password};
        return ResetPassword.resetUserPassword(reqBody)
      } else {
        console.error('no email found');
      }
    })
    .then(updatedUser => {
      $scope.passwordResetComplete = true;
    })
    .catch(error => {
      $scope.error = 'For your security, we\'ve timed out the password reset request.  Please click Forgot Password again and come back :)'

    })
  }
})

app.controller('forgotPasswordCtrl', function($scope, ResetPassword){
  let emailAddress = $scope.email;
  $scope.emailSent = false;
  $scope.sendForgotEmail = function(emailAddress){
    ResetPassword.sendForgotEmail(emailAddress)
    .then(data => {
      $scope.emailSent = true;
    })
  }
})
