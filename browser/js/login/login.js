app.factory('Login', function ($http, $rootScope, $q) {
    let loginFactory = {};

    loginFactory.persistPseudoCart = function (cartObj) {
        let promiseArr = [];
        for (let productId in cartObj) {
            promiseArr.push($http.post('/api/me/cart/' + productId, {quantity: cartObj[productId][1]}));
        }
        delete $rootScope.cart;
        return $q.all(promiseArr);
    }

    return loginFactory;
});


app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state, $rootScope, Login) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo)
        .then(() => {
            if ($rootScope.cart) {
                return Login.persistPseudoCart($rootScope.cart)
            }
        })
        .then(function () {
            $state.go('home');
        })
        .catch(function () {
            $scope.error = 'Invalid login credentials.';
        });


    };

});
