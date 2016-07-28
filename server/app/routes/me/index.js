'use strict';
var router = require('express').Router();
var db = require('../../../db');
var User = db.model('user');
var CartProducts = db.model('cart_products');
var userInstance; // OB/BG: watch out for async stuff
module.exports = router;

// OB/BG: reused code, move to utility internal module
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
    userInstance = user; // OB/BG: req.targetUser = user;
    next()
  })
  .catch(next)
})

//GET JUST THE USER DATA
router.get('/', ensureAuthenticated, function(req, res, next) {
  //Remake user object to remove password etc...
  var userToSend = { // OB/BG: check out .sanitize method
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
// OB/BG: could probably remove this (and use the /api/orders/:id route instead from the client)
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

//POST ADDRESS FOR USER
// OB/BG: could just `include` this data for the /api/me request
router.post('/addresses', ensureAuthenticated, function(req, res, next) {
  userInstance.createAddress(req.body)
  .then(address => {
    console.log(address); // OB/BG: dead code
    if(!address) throw new Error('not created!');
    res.status(201).send(address)
  })
  .catch(next);
})

//GET CART
router.get('/cart', ensureAuthenticated, function(req, res, next){
  console.log('route hit');
  userInstance.getCart()
  .then(cart => cart.getProducts()) // OB/BG: edited one-liner
  .then(products => {
    res.send(products)
  })
  .catch(next)
})

//ADD PRODUCT TO CART
// OB/BG: MAYBE POST /api/me/cart
router.post('/cart/:productId', ensureAuthenticated, function(req, res, next){
  let productIdToAdd = req.params.productId;
  let quantity = parseInt(req.body.quantity);

  // OB/BG: shift this logic to some model method
  userInstance.getCart()
  .then(cart => {
    CartProducts.findOrCreate({
        where: {
          productId: productIdToAdd,
          cartId: cart.id
        },
        defaults: {
          quantity: quantity
        }
      })
      .spread((record, created) => {
        if(!created){
          let newQuantity = record.quantity + quantity;
          record.update({quantity: newQuantity})
          .then(record => res.send(record)) // OB/BG: watch out for nested .thensf
        } else {
          res.send(record)
        }
      })
      .catch(next)
  });
})

//UPDATE CART ITEM QUANTITY
router.put('/cart/:productId', ensureAuthenticated, function(req, res, next){
  let productIdToUpdate = req.params.productId;
  let quantity = parseInt(req.body.quantity);

  // OB/BG: create a model method for this stuff
  userInstance.getCart()
  .then(cart => {
    return CartProducts.findOne({
      where: {
        productId: productIdToUpdate,
        cartId: cart.id
      }
    })
  })
  .then(product => {
    return product.update({quantity: quantity})
  })
  .then(updatedProduct => {
    res.send(updatedProduct)
  })
  .catch(next)
})


//DELETE ITEM IN CART
router.delete('/cart/:productId', ensureAuthenticated, function(req, res, next){
  let productIdToAdd = req.params.productId; // OB/BG: "bad verbage" -elliot

  userInstance.getCart()
  .then(cart => {
    return cart.removeProduct(productIdToAdd)
  })
  .then(() => {
    res.sendStatus(204)
  })
  .catch(next)
})
