app.factory('Cart', function ($http, AuthService, $rootScope, $state, $window) {
  var CartFactory = {};

  var cartUrl = '/api/me/cart'

    // JA and BG: maybe this function should determine logged in user
    // and retrieve cart items with fetchnotloggedin or $http
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
      // JA and BG: Maybe lodash or using ES6 for..of loop would be better
      // Even better a third-party library.
      // LOCALSTORAGE is likely what you want here, luckily has an identical API
      // ngLocalStorage
    for(let key in $window.sessionStorage){
      let obj = JSON.parse($window.sessionStorage[key]);
      toSend.push({
        id: key,
        quantity: obj[1],
        product: { // JA and BG: make this equal to obj[0]
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
        $window.sessionStorage.removeItem(item.id)
        $scope.cartItems = Cart.fetchNotLoggedInItems();
      }
      else return Cart.removeItem(item.product.id)
    })
    .then((...args) => { // JA and BG: why use rest if only using first arg?
      if (args[0]) {
        let idx = $scope.cartItems.indexOf(item);
        $scope.cartItems.splice(idx, 1); // JA and BG: this is a mutable operation
      }
    })
  }

  $scope.editQuantity = function (newNum, item) {
    $scope.edit = false;
    if(newNum === 0) this.removeItem(item); // JA and BG: what if this goes wrong?
    else if (newNum <= item.product.inventory && newNum > 0) {
      AuthService.getLoggedInUser() // JA and BG: another example of checking user
      .then(user => {
        if (!user) {
          let userSession = $window.sessionStorage;
          let thisArr = JSON.parse(userSession.getItem(item.id)); //[product, quantity]
            thisArr[1] = newNum;
            userSession.setItem([item.id], JSON.stringify([item.product, thisArr[1]]))
          $scope.cartItems = Cart.fetchNotLoggedInItems(); // JA and BG: $q.when()
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
