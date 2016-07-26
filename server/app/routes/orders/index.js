'use strict';
var router = require('express').Router();
var db = require('../../../db');
var OrderDetail = db.model('order_detail');
var OrderSummary = db.model('order_summary');
module.exports = router;

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

var ensureAdmin = function (req, res, next) {
    if (req.user.isAdmin) {
        next();
    } else {
        res.status(401).end();
    }
};

// Binds orderSummary to req.orderSummary for later use
router.param('orderSummaryId', function(req, res, next, id){
  OrderSummary.findById(id)
  .then(orderSummary => {
    if(!orderSummary) throw new Error('not found!');
    req.orderSummary = orderSummary;
    next();
    return null;
  })
  .catch(next);
})

// Admin Level: Gets all orderSummarys
router.get('/', ensureAuthenticated, ensureAdmin, function(req, res, next){
  OrderSummary.findAll({
    where: req.query
  })
  .then(orderSummarys => {
    res.json(orderSummarys);
  })
});

// Produces a new orderSummary
router.post('/', function(req, res, next){
  OrderSummary.create(req.body)
  .then(orderSummary => {
    res.status(201).json(orderSummary);
  })
  .catch(next);
});

// Get a specific orderSummary
router.get('/:orderSummaryId', ensureAuthenticated, function(req, res, next){
  if(req.user.id !== req.orderSummary.userId && !(req.user.isAdmin)) res.status(401).end()
  else res.json(req.orderSummary);
});

// Updates a specific orderSummary
router.put('/:orderSummaryId', ensureAuthenticated, function(req, res, next){
  if(req.user.id !== req.orderSummary.userId && !(req.user.isAdmin)) res.status(401).end()
  else{
    req.orderSummary.update(req.body)
    .then(orderSummary => {
      res.status(201).json(orderSummary);
    })
    .catch(next);
  }

});

// Admin Level: Deletes a specific orderSummary
router.delete('/:id', ensureAuthenticated, function(req, res, next){
  if(req.user.id !== req.orderSummary.userId && !(req.user.isAdmin)) res.status(401).end()
  else{
    req.orderSummary.destroy()
    .then(() => {
      res.status(204).end();
    })
    .catch(next);
  }

});



// ==========================================================================

// Binds orderDetail to req.orderDetail for later use
router.param('orderDetailId', function(req, res, next, id){
  OrderDetail.findById(id)
  .then(orderDetail => {
    if(!orderDetail) throw new Error('not found!');
    req.orderDetail = orderDetail;
    return OrderSummary.findById(orderDetail.orderSummaryId);
  })
  .then(orderSummary => {
    req.orderSummary = orderSummary;
    next();
    return null;
  })
  .catch(next);
})

// Admin Level: Gets all orderDetails
router.get('/', ensureAuthenticated, ensureAdmin, function(req, res, next){
  OrderDetail.findAll({
    where: req.query
  })
  .then(orderDetails => {
    res.json(orderDetails);
  })
});

// Produces a new orderDetail
router.post('/', function(req, res, next){
  OrderDetail.create(req.body)
  .then(orderDetail => {
    res.status(201).json(orderDetail);
  })
  .catch(next);
});

// Get a specific orderDetail
router.get('/:orderDetailId', ensureAuthenticated, function(req, res, next){
  if(req.user.id !== req.orderSummary.userId && !(req.user.isAdmin)) res.status(401).end()
  else res.json(req.orderDetail);
});

// Updates a specific orderDetail
router.put('/:orderDetailId', ensureAuthenticated, function(req, res, next){
  if(req.user.id !== req.orderSummary.userId && !(req.user.isAdmin)) res.status(401).end()
  else{
    req.orderDetail.update(req.body)
    .then(orderDetail => {
      res.status(201).json(orderDetail);
    })
    .catch(next);
  }

});

// Admin Level: Deletes a specific orderDetail
router.delete('/:id', ensureAuthenticated, function(req, res, next){
  if(req.user.id !== req.orderSummary.userId && !(req.user.isAdmin)) res.status(401).end()
  req.orderDetail.destroy()
  .then(() => {
    res.status(204).end();
  })
  .catch(next);
});