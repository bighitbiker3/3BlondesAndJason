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
      else {
        return $rootScope.cart;
      }
    })
  }

  CartFactory.removeItem = function (id) {
    return $http.delete('/api/me/cart/' + id)
  }

  CartFactory.updateQuantity = function (newNum, item) {
    AuthService.getLoggedInUser()
    .then(user => {
      if (!user) {
        $rootScope.cart[item.id][1] = newNum;
        return {
          id: item.id,
          cartObj[]
        }
      }
      else return $http.put('/api/me/cart/' + item.product.id, {quantity: newNum})
    })
    .then(res => res.data);
  }

  CartFactory.fetchNotLoggedInItems = function (cartObj) {
    console.log(cartObj);
    let toSend = [];
    for (let productId in cartObj) {
      toSend.push({
        id: productId,
        quantity: cartObj[productId][1],
        product: {
          name: cartObj[productId][0].name,
          price: cartObj[productId][0].price
        }
      })
    }
    return toSend;
  }

  return CartFactory;
});

app.config(function ($stateProvider) {
  $stateProvider.state('cart', {
    url: '/cart',
    templateUrl: 'js/cart/cart.html',
    controller: 'CartCtrl',
    resolve: {
      cartItems: function (Cart, AuthService, $rootScope) {
        return AuthService.getLoggedInUser()
        .then(user => {
          if (!user) return Cart.fetchNotLoggedInItems($rootScope.cart);
          else return Cart.fetchCartItems();
        })
      }
    }
  })
})

app.controller('CartCtrl', function ($scope, cartItems, Cart, AuthService, $rootScope) {

  $scope.cartItems = cartItems;

  $scope.removeItem = function (item) {
    AuthService.getLoggedInUser()
    .then(user => {
      if (!user) {
        delete $rootScope.cart[item.id];
        $scope.cartItems = Cart.fetchNotLoggedInItems($rootScope.cart);
      }
      else return Cart.removeItem(item.product.id)
    })
    .then((...args) => {
      if (args[0]) {
        let idx = $scope.cartItems.indexOf(item);
        $scope.cartItems.splice(idx, 1);
      }
    })
  }

  $scope.editQuantity = function (newNum, item) {
    if (newNum <= item.product.inventory && newNum > 0) {
      Cart.updateQuantity(newNum, item)
      .then(newItem => {
        let idx = $scope.cartItems.indexOf(item)
        $scope.cartItems[idx].quantity = newItem.quantity;
      })
    }
    else {
      alert('That quantity exceeds our inventory, please choose a lower number');
    }
  }

});
