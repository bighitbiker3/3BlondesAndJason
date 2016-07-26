'use strict';
var router = require('express').Router();
var db = require('../../../db');
var User = db.model('user');
var userInstance;
module.exports = router;

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

//MIDDLEWARE FUNCTION TO GET A USER INSTANCE 
router.use('/', ensureAuthenticated, function(req, res, next){
  User.findById(req.user.id)
  .then(user => {
    userInstance = user;
    next()
  })
  .catch(next)
})

//GET JUST THE USER DATA
router.get('/', ensureAuthenticated, function(req, res, next) {
  //Remake user object to remove password etc...
  var userToSend = {
    id: req.user.id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName
  };
  res.send(userToSend)
});

//GET ALL THE ORDER SUMMARIES
router.get('/orders', ensureAuthenticated, function(req, res, next) {
  userInstance.getUserOrders()
  .then(orders => {
    res.send(orders)
  })
  .catch(next)
})

//GET THE ORDER DETAILS OF A SPECIFIC ORDER SUMMARY
router.get('/orders/:id', ensureAuthenticated, function(req, res, next) {
  let orderId = req.params.id
  userInstance.getUserOrders({
    where: {
      id: orderId
    }
  })
  .then(order => {
    if(order.length === 0) throw new Error('no order summary found')
    return order[0].getOrderDetailsFromSummary()
  })
  .then(orderDetails => {
    res.send(orderDetails)
  })
  .catch(next)
})

//GET ADDRESSES FOR USER
router.get('/addresses', ensureAuthenticated, function(req, res, next) {
  userInstance.getAddresses()
  .then(addresses => {
    res.send(addresses);
  })
  .catch(next)
})
