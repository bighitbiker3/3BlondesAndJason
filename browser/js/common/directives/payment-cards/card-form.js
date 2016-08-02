'use strict';

app.directive('cardForm', function(Card, $rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/payment-cards/card-form.html',
        scope: {
            userId: '='
        },
        link: function(scope, elem, attrs) {
            scope.submitCard = function(card) {
                if (scope.userId) {
                    Card.createNewCardForUser(card)
                    .then(card => $rootScope.cards.push(card))
                } else Card.createNewCardNoUser(card)
                    .then(card => $rootScope.cards.push(card))
            }
        }
    }
});
