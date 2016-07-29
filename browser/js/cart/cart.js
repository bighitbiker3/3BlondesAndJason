app.factory('Cart', function ($http, AuthService, $rootScope, $state) {
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

  CartFactory.removeItem = function (id) {
    return $http.delete('/api/me/cart/' + id)
  }

  CartFactory.updateQuantity = function (newNum, id) {
    return $http.put('/api/me/cart' + id, {quantity: newNum})
      .then(res => res.data);
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

app.controller('CartCtrl', function ($scope, cartItems, Cart) {

  $scope.cartItems = cartItems;

  $scope.removeItem = function (item) {
    Cart.removeItem(item.product.id)
    .then(() => {
      let idx = $scope.cartItems.indexOf(item);
      $scope.cartItems.splice(idx, 1);
    })
  }

  $scope.editQuantity = function (newNum, id) {
    console.log(update.quantity);
  }

});
