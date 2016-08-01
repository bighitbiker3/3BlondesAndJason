app.factory('Cart', function ($http, AuthService, $rootScope, $state, $window) {
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
    return $http.put('/api/me/cart/' + item.product.id, {quantity: newNum})
    .then(res => res.data);
  }

  CartFactory.fetchNotLoggedInItems = function () {
    let toSend = [];
    for(let key in $window.sessionStorage){
      let obj = JSON.parse($window.sessionStorage[key]);
      toSend.push({
        id: key,
        quantity: obj[1],
        product: {
          name: obj[0].name,
          price: obj[0].price,
          inventory: obj[0].inventory
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

app.controller('CartCtrl', function ($scope, cartItems, Cart, AuthService, $rootScope, $window) {

  $scope.cartItems = cartItems;

  $scope.edit = false;

  $scope.removeItem = function (item) {
    AuthService.getLoggedInUser()
    .then(user => {
      if (!user) {
        $window.sessionStorage.remove(item.id)
        $scope.cartItems = Cart.fetchNotLoggedInItems();
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
    $scope.edit = false;
    if(newNum === 0) this.removeItem(item);
    else if (newNum <= item.product.inventory && newNum > 0) {
      AuthService.getLoggedInUser()
      .then(user => {
        if (!user) {
          let userSession = $window.sessionStorage;
          let thisArr = JSON.parse(userSession.getItem(item.id)); //[product, quantity]
					thisArr[1] = newNum;
					userSession.setItem([item.id], JSON.stringify([item.product, thisArr[1]]))
          $scope.cartItems = Cart.fetchNotLoggedInItems();
        }
        else {
          return Cart.updateQuantity(newNum, item)
        }
      })
      .then((...args) => {
        if (args[0]) {
          let idx = $scope.cartItems.indexOf(item)
          $scope.cartItems[idx].quantity = args[0].quantity;
        }
      })
    }

  }

  $scope.editView = function () {
    $scope.edit = true;
  }

});
