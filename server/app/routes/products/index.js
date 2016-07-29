'use strict';
var router = require('express').Router();
var db = require('../../../db');
var Product = db.model('product');
var utility = require('../../configure/utility');
var ensureAdmin = utility.ensureAdmin;
var ensureAuthenticated = utility.ensureAuthenticated;
module.exports = router;


// Binds product to req.product for later use
router.param('productId', function(req, res, next, id){
  Product.findById(id)
  .then(product => {
    if(!product) throw new Error('not found!');
    req.product = product;
    next();
    return null;
  })
  .catch(next);
})

// Gets all products
router.get('/', function(req, res, next){
  Product.findAll({
    where: req.query
  })
  .then(products => {
    res.json(products);
  })
});

// Admin Level: Posts a new product
router.post('/', ensureAdmin, function(req, res, next){
  Product.create(req.body)
  .then(product => {
    res.status(201).json(product);
  })
  .catch(next);
});

// Get a specific product
router.get('/:productId', function(req, res, next){
  res.json(req.product);
});

// Admin Level: Update a specific product
router.put('/:productId', ensureAdmin, function(req, res, next){
  req.product.update(req.body)
  .then(product => {
    res.status(201).json(product);
  })
  .catch(next);
});

// Admin Level: Delete a specific product
router.delete('/:id', ensureAdmin, function(req, res, next){
  req.product.destroy()
  .then(() => {
    res.status(204).end();
  })
  .catch(next);
});



router.get('/:productId/test', function(req, res, next){
  res.send(req.product.centsToDollars())
})
