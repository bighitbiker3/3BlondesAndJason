app.factory('ReviewFactory', function ($http) {
  return {
    addReview: function (review, productId) {
      return $http.post('/api/reviews/' + productId, {stars: review.stars, description: review.description})
    },
    getReviews: function (productId) {
      return $http.get('/api/reviews/' + productId)
      .then(res => res.data);
    }
  }
});
