'use strict';

app.controller('CheckoutCtrl', function($scope, cartItems, Card, Order, me, $rootScope, Address) {

    $scope.cartItems = cartItems;
    $scope.me = me;

    if($scope.me.id) Card.getMyCards().then(cards => {$rootScope.cards = cards});
    else $rootScope.cards = [];

    if($scope.me.id) Address.getMyAddresses().then(addresses => {$rootScope.addresses = addresses});
    else $rootScope.addresses = [];




    $scope.newOrder = {
        orderSummary: {
            priceTotal: cartItems.reduce(function(sum, item){
                return sum + (item.product.price) * item.quantity;
            }, 0)
        },
        orderDetails: {
            items: $scope.cartItems
        }
    };

    $scope.createOrder = function(order){
        Order.createOrderSummary(order.orderSummary)
        .then(orderSummary => {
            return Order.createOrderDetails(orderSummary.id, order.orderDetails);
        })
        .then($state.go('home'))
    }

});
