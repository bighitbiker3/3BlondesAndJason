'use strict';

app.controller('CheckoutCtrl', function($scope, cartItems, AuthService, Card, Cart, Order, me, $rootScope, Address) {

    $scope.cartItems = cartItems;
    $scope.me = me;

    if ($scope.me) Card.getMyCards().then(cards => { $rootScope.cards = cards });
    else $rootScope.cards = [];

    if ($scope.me) Address.getMyAddresses().then(addresses => { $rootScope.addresses = addresses });
    else $rootScope.addresses = [];




    $scope.newOrder = {
        orderSummary: {
            priceTotal: cartItems.reduce(function(sum, item) {
                return sum + (item.product.price) * item.quantity;
            }, 0)
        },
        orderDetails: {
            items: $scope.cartItems
        }
    };

    $scope.createOrder = function(order) {
        Order.createOrderSummary(order.orderSummary)
            .then(orderSummary => {
                order.orderDetails.orderSummaryId = orderSummary.id;
                order.orderDetails.items.forEach(item => {
                    item.purchaseCost = item.product.price * item.quantity;
                });
                return Order.createOrderDetails(order.orderDetails);
            })
            .then(() => {
                var user = AuthService.getLoggedInUser();
                $scope.cartItems = {};
                if(user) { Cart.clearCartUser() 
                } else { Cart.clearCartVisitor() }
            })
    }
});
