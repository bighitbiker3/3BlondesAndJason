'use strict';

app.factory('Order', function ($http) {
  return {
    getAllOrderSummaries: function(){
      return $http.get('/api/orders')
      .then(res => res.data);
    },
    getMyOrderSummaries: function(){
      return $http.get('/api/me/orders')
      .then(res => res.data);
    },
    getMyOrderDetails: function(orderSummaryId){
      return $http.get('/api/orders/' + orderSummaryId)
      .then(res => res.data);
    }
  }
})
