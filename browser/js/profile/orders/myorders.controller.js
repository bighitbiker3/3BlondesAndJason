app.controller('ProfileOrdersCtrl', function($scope, orderSummaries, Order){
  $scope.orderSummaries = orderSummaries;
  $scope.details = {};
  $scope.show = {};

  $scope.getOrderDetails = function(id){
    if($scope.details[id]) $scope.show[id] = true;
    else {
      Order.getMyOrderDetails(id)
      .then(details => {
        $scope.show[id] = true;
        $scope.details[id] = details;
      })
    }

  }

  $scope.hideOrderDetails = function(id){
    $scope.show[id] = false;
  }

  $scope.toggle = function(id){
    if($scope.show[id]) $scope.show[id] = false;
    else $scope.getOrderDetails(id);
  }
})
