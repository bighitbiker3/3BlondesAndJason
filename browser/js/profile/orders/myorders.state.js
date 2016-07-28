app.config(function ($stateProvider) {
  $stateProvider.state('profile.orders', {
    url: '/orders',
    templateUrl: 'js/profile/orders/myorders.html',
    controller: 'ProfileOrdersCtrl',
    resolve: {
      orderSummaries: function(Order) {
        return Order.getMyOrderSummaries();
      }
    }
  });
});
