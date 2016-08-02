'use strict';

app.controller('CheckoutCtrl', function($scope, cartItems, Stripe, AuthService, Card, Cart, Order, me, $rootScope, Address) {

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

    var responseHandler = function(status, response) {
        if (response.error) {
            console.error(response.error.message);
        } else {
            $scope.stripeToken = response.id;
        }
    }

    $scope.createOrder = function(order) {
        order.orderSummary.cardId = order.card.id;
        var user = AuthService.getLoggedInUser();
        
        Stripe.card.createToken(order.card, responseHandler);

        var chargeDetails = {};

        chargeDetails.stripeToken = $scope.stripeToken;
        chargeDetails.userId = user.id;
        chargeDetails.amount = $scope.newOrder.orderSummary.priceTotal;
        
        Order.sendToStripe(chargeDetails)
            .then(() => Order.createOrderSummary(order.orderSummary))
            .then(orderSummary => {
                order.orderDetails.orderSummaryId = orderSummary.id;
                order.orderDetails.items.forEach(item => {
                    item.purchaseCost = item.product.price * item.quantity;
                });
                return Order.createOrderDetails(order.orderDetails);
            })
            .then(() => {
                
                $scope.cartItems = {};
                if (user) {
                    Cart.clearCartUser()
                } else { Cart.clearCartVisitor() }
            })
    }
});
