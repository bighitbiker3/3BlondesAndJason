app.controller('ProductDetailCtrl', function ($scope, product, productReviews, ReviewFactory) {
  console.log(productReviews);
  $scope.viewReviews = false;
  $scope.addReview = false;
  $scope.product = product;
  $scope.productReviews = productReviews;

});

app.directive('addReview', function ($state, ReviewFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/product/detail/addReview.html',
        link: function (scope, elem, attrs) {
          scope.stars = [1, 2, 3, 4, 5];
          scope.submitReview = function (review, productId) {
            ReviewFactory.addReview(review, productId);
            $state.go('cart');
          }
        }
    }
});

app.directive('viewReviews', function ($state, ReviewFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/product/detail/viewReviews.html',
    }
});
