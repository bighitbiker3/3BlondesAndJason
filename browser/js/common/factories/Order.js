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
      return $http.get('/api/me/orders/' + orderSummaryId)
      .then(res => res.data);
    },
    getOneOrderSummary: function(orderSummaryId){
      return $http.get('/api/orders/' + orderSummaryId)
      .then(res => res.data);
    },
    updateOneOrderSummary: function(orderSummaryId, data){
      return $http.put('/api/orders/' + orderSummaryId, data)
      .then(res => res.data);
    },
    updateOrderDetails: function(orderDetailsId, data){
      return $http.put('/api/orders/details/' + orderDetailsId, data)
      .then( res => res.data)
    },
    getAllOrderDetails: function(orderSummaryId){
      return $http.get('/api/orders/' + orderSummaryId + '/details')
      .then(res => res.data);
    },

    createOrderSummary: function(orderData) {
      orderData.priceTotal *= 100;
      return $http.post('/api/orders', orderData)
      .then(res => res.data);
    },

    createOrderDetails: function(orderDetails){
      return $http.post('/api/orders/details', orderDetails)
      .then(res => res.data);
    }
  }
})
