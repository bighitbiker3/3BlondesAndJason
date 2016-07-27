app.config(function ($stateProvider) {
  $stateProvider.state('profile', {
    url: '/profile',
    templateUrl: 'js/profile/profile.html',
    controller: 'ProfileCtrl',
    resolve: {
      me: function(User, AuthService){
        return AuthService.getLoggedInUser();
      }
    }
  });
});
