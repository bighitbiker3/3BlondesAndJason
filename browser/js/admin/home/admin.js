app.config(function ($stateProvider) {
    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'js/admin/home/admin.html',
        controller: 'adminCtrl'
    });
});

app.controller('adminCtrl', function($scope){
  $scope.products = {}
})
