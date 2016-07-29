app.controller('adminOrdersCtrl', function($scope, Order){
  Order.getAllOrderSummaries()
  .then(orders => {
    $scope.orders = orders
  })
  .catch(error => console.error(error))
})

app.controller('adminOrderDetailCtrl', function($scope, Order, $stateParams, Address, $state){
  let orderId = $stateParams.orderId;
  $scope.order = {};
  Order.getOneOrderSummary(orderId)
  .then(orderSummary => {
    $scope.order.orderSummary = orderSummary
    return Address.getOneAddress(orderSummary.shippingId)
  })
  .then(address => {
    $scope.order.orderAddress = address;
    return Order.getAllOrderDetails(orderId)
  })
  .then(orderDetails => $scope.order.orderDetails = orderDetails)
  .catch(error => console.error(error))

  $scope.saveChanges = function(order){
    let orderSummary = order.orderSummary; //THIS AN OBJ
    let orderDetails = order.orderDetails; //THIS IS AN ARRAY

    Order.updateOneOrderSummary(orderSummary.id, orderSummary)
    .then(() => {
      return Promise.all(orderDetails.map(orderDetail => Order.updateOrderDetails(orderDetail.id, orderDetail)))
    })
    .then(() => $state.go('admin.orders'))
    .catch(error => console.error(error))

  }
})
