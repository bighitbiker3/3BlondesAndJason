app.controller('usersAdminCtrl', function($scope, User){
  //Get all and add to scope
  User.getAll()
  .then(users => $scope.users = users)
  .catch(error => console.error(error));
})

app.controller('usersDetailAdminCtrl', function($scope, User, $stateParams){
  let userId = parseInt($stateParams.userId);

  console.log(userId);
  //Get all and add to scope
  User.getOne(userId)
  .then(user => {
    console.log(user);
    $scope.user = user;

    console.log($scope);

  })
  .catch(error => console.error(error));

  $scope.saveChanges = function(formData){
    User.editOne(userId, formData)
    .then(updatedUser => console.log(updatedUser))
    .catch(error => console.error(error))
  }
})
