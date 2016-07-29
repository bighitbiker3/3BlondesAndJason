app.directive('adminNav', function(AuthService){
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'js/admin/directives/html/nav.admin.html',
    link: function(scope){
      var setUser = function () {
          AuthService.getLoggedInUser().then(function (user) {
              scope.user = user;
          });
      };
      setUser()
    }
  }
});
