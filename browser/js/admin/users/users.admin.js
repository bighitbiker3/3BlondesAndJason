app.controller('usersAdminCtrl', function($scope, User){
  //Get all and add to scope
  User.getAll()
  .then(users => $scope.users = users)
  .catch(error => console.error(error));
})

app.controller('usersDetailAdminCtrl', function($scope, User, $stateParams, $state){
  let userId = parseInt($stateParams.userId);

  //Get all and add to scope
  User.getOne(userId)
  .then(user => {
    $scope.user = user;
  })
  .catch(error => console.error(error));

  $scope.saveChanges = function(formData){
    User.editOne(userId, formData)
    .then(() => $state.go('admin.users'))
    .catch(error => console.error(error))
  }

})
