'use strict';
var router = require('express').Router();
var db = require('../../../db');
var User = db.model('user');
var Card = db.model('card');
var UserCards = db.model('UserCards');
var utility = require('../../configure/utility');
var ensureAdmin = utility.ensureAdmin;
var ensureAuthenticated = utility.ensureAuthenticated;
module.exports = router;

router.post('/', function(req, res, next){
  Card.create(req.body)
  .then(card => res.json(card));
})

router.delete('/:cardId/:userId', ensureAuthenticated, function(req, res, next){
  UserCards.findOne({
    where: {
      cardId: req.params.cardId,
      userId: req.params.userId
    }
  })
  .then(cardRow => {
    if(cardRow) return cardRow.destroy();
    else throw new Error('deleting non-existent card from user');
  })
  .then(() => res.sendStatus(204))
  .catch(next);
})
