app.factory('Cart', function ($http, AuthService, $rootScope) {
  var CartFactory = {};

  var cartUrl = '/api/me/cart'

  CartFactory.fetchCartItems = function () {
    return AuthService.getLoggedInUser()
    .then(user => {
      if (user) {
        return $http.get(cartUrl)
        .then(res => res.data);
      }
    })

  }

  return CartFactory;
});

app.config(function ($stateProvider) {
  $stateProvider.state('cart', {
    url: '/cart',
    templateUrl: 'js/cart/cart.html',
    controller: 'CartCtrl',
    resolve: {
      cartItems: function (Cart) {
        return Cart.fetchCartItems();
      }
    }
  })
})

app.controller('CartCtrl', function ($scope, cartItems) {

  $scope.cartItems = cartItems;

});
