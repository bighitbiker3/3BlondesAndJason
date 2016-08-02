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
                return Math.round(sum + (item.product.price) * item.quantity);
            }, 0)
        },
        orderDetails: {
            items: $scope.cartItems
        }
    };

    function responseHandler(status, response) {
        if (response.error) {
            console.error(response.error.message);
        } else {
            var chargeDetails = {};
            chargeDetails.source = response.id;
            chargeDetails.stripeToken = response.id;
            chargeDetails.userId = $scope.user.id;
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
    }

    $scope.createOrder = function(order) {
        order.orderSummary.cardId = order.card.id;

        var $form = {
            'number': order.card.number,
            'exp_month': order.card.exp_month,
            'exp_year': order.card.exp_year,
            'cvc': order.card.cvc
        }

        AuthService.getLoggedInUser()
            .then(userLoggedIn => {
                $scope.user = userLoggedIn;
                return Stripe.card.createToken($form, responseHandler)
            })
            .catch(console.log);
    }
});
