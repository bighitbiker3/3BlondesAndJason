'use strict';

app.factory('Card', function ($http) {
  return {
    getMyCards: function(){
      return $http.get('/api/me/cards')
      .then(res => res.data);
    },
    createNewCardForUser: function(card){
      return $http.post('/api/me/cards', card)
      .then(res => res.data);
    },
    createNewCardNoUser: function(card){
      return $http.post('/api/card', card)
      .then(res => res.data);
    },
    removeCardFromUser: function(cardId, userId){
      return $http.delete('/api/card/' + cardId + '/' + userId)
      .then(res => res.data)
    }
  }
});
