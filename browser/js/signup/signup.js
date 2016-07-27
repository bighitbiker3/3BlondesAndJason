app.config(function ($stateProvider) {
    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'signUpCtrl'
    });
});

app.controller('signUpCtrl', function($scope, signupFactory, AuthService, $state){
  $scope.error = null;

  $scope.sendSignup = function (signupInfo) {
    //Error handling in controller to keep HTML
    //easy to deal with instead of having a bunch
    //of hidden divs and spans
    if($scope.signupForm.$error.email) $scope.error = 'Please enter a valid email';
    else if($scope.signupForm.$error.minlength) $scope.error = 'Password must be at least 8 characters';
    else if($scope.signupForm.$error.maxlength) $scope.error = 'Password must be less than 32 characters';
    else if($scope.signupForm.$error.required) $scope.error = 'All fields are required';
    else {
      signupFactory.signup(signupInfo)
      .then(function(user){
        //log user in if the signup was successful
        AuthService.login({email: signupInfo.email, password: signupInfo.password});
        //redirect to home
        $state.go('home');
      })
      .catch(function(err) {
        $scope.error = 'There was an error. Error 432052. Please contact Payton';
      });
    };
  };

})

app.factory('signupFactory', function($http){
  return {
    signup: function(signupData){
      return $http.post('/api/users', signupData)
      .then(newUser => {
        return newUser
      })
    }
  }
})