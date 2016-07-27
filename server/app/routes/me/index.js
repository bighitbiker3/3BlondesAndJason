'use strict';
var router = require('express').Router();
var db = require('../../../db');
var User = db.model('user');
var CartProducts = db.model('cart_products');
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

//GET CART
router.get('/cart', ensureAuthenticated, function(req, res, next){
  console.log('route hit');
  userInstance.getCart()
  .then(cart => {
    return cart.getProducts()
  })
  .then(products => {
    res.send(products)
  })
  .catch(next)
})

//ADD PRODUCT TO CART
router.post('/cart/:productId', ensureAuthenticated, function(req, res, next){
  let productIdToAdd = req.params.productId;
  let quantity = parseInt(req.body.quantity);

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
          .then(record => res.send(record))
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
  let productIdToAdd = req.params.productId;

  userInstance.getCart()
  .then(cart => {
    return cart.removeProduct(productIdToAdd)
  })
  .then(() => {
    res.sendStatus(204)
  })
  .catch(next)
})
