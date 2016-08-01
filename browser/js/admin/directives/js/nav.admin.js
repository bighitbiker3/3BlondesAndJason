app.directive('adminNav', function(AuthService, $rootScope){
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
      scope.search = {
        adminSearch: ''
      }

      scope.searching = function(){
        $rootScope.$broadcast('searching', scope.search)
      }
      setUser()
    }
  }
});
