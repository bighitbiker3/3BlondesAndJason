'use strict';
var router = require('express').Router();
var db = require('../../../db');
var User = db.model('user');
var Card = db.model('card');
var Product = db.model('product');
var UserCards = db.model('UserCards');
var utility = require('../../configure/utility');
var app = require('../../');

var ensureAdmin = utility.ensureAdmin;
var ensureAuthenticated = utility.ensureAuthenticated;

var stripe = require('stripe')('sk_test_2vR5taxRBxTKNW2eKFOtGehd');

module.exports = router;

router.post('/', function(req, res, next) {
    Card.create(req.body)
        .then(card => res.json(card));
})

router.delete('/:cardId/:userId', ensureAuthenticated, function(req, res, next) {
    UserCards.findOne({
            where: {
                cardId: req.params.cardId,
                userId: req.params.userId
            }
        })
        .then(cardRow => {
            if (cardRow) return cardRow.destroy();
            else throw new Error('deleting non-existent card from user');
        })
        .then(() => res.sendStatus(204))
        .catch(next);
})


router.post('/stripe', ensureAuthenticated, function(req, res, next) {
    // Obtain StripeToken
    var stripeToken = req.body.stripeToken;
    var userID = req.body.userId;
    // Simple validation

    // Create Charge
    var charge = {
        amount: req.body.amount,
        currency: 'usd',
        source: stripeToken
    };

    stripe.charges.create(charge, function(err, charge) {
        if (err) {
            return next(err);
        } else {
            res.redirect('/');
        }
    });
});
