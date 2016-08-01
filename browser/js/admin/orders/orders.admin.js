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
    console.log(orderSummary);
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

    //Now we check if all details are processed to change the master summary 'processed'
    let processed;
    OrderDetail.findAll({where:{orderSummaryId: this.id}})
    .then(details => {
      console.log(details.filter(detail => !detail.processed));
      details.filter(detail => !detail.processed).length > 0 ? processed = false : processed = true;
    })
    .then(() => {
      console.log(processed)
      return processed;
    })
  }
})
