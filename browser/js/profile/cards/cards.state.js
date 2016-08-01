app.config(function ($stateProvider) {
  $stateProvider.state('profile.cards', {
    url: '/cards',
    templateUrl: 'js/profile/cards/cards.html',
    controller: 'ProfileCardsCtrl',
    resolve: {
      cards: function(Card) {
        return Card.getMyCards()
      }
    }
  });
});
