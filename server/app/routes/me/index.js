'use strict';
var router = require('express').Router();
var db = require('../../../db');
var User = db.model('user');
var CartProducts = db.model('cart_products');
var Product = db.model('product');
var Card = db.model('card');
var UserAddresses = db.model('user_addresses');
var utility = require('../../configure/utility');
var ensureAdmin = utility.ensureAdmin;
var ensureAuthenticated = utility.ensureAuthenticated;
module.exports = router;

//MIDDLEWARE FUNCTION TO GET A USER INSTANCE
router.use('/', ensureAuthenticated, function(req, res, next){
  User.findById(req.user.id)
  .then(user => {
    req.dbUser = user;
    next()
  })
  .catch(next)
})

//GET JUST THE USER DATA
router.get('/', ensureAuthenticated, function(req, res, next) {
  //Remake user object to remove password etc...
  var userToSend = req.dbUser.sanitize();
  res.send(userToSend)
});

//GET ALL THE ORDER SUMMARIES
router.get('/orders', ensureAuthenticated, function(req, res, next) {
  req.dbUser.getUserOrders()
  .then(orders => {
    res.send(orders)
  })
  .catch(next)
})

//GET THE ORDER DETAILS OF A SPECIFIC ORDER SUMMARY
router.get('/orders/:id', ensureAuthenticated, function(req, res, next) {
  let orderId = req.params.id
  req.dbUser.getUserOrders({
    where: {
      id: orderId
    }
  })
  .then(order => {
    if(order.length === 0) throw new Error('no order summary found')
    return order[0].getItems()
  })
  .then(orderDetails => {
    res.send(orderDetails)
  })
  .catch(next)
})

// GET CARDS FOR USER
router.get('/cards', ensureAuthenticated, function(req,res, next){
  req.dbUser.getCards()
  .then(cards => res.send(cards))
  .catch(next);
})

//POST CARD FOR USER
router.post('/cards', ensureAuthenticated, function(req, res, next){
  req.dbUser.createCard(req.body)
  .then(card => {
    if(!card) throw new Error('card not created!')
    res.status(201).json(card);
  })
  .catch(next);
})


//GET ADDRESSES FOR USER
router.get('/addresses', ensureAuthenticated, function(req, res, next) {
  req.dbUser.getAddresses()
  .then(addresses => {
    res.send(addresses);
  })
  .catch(next)
})

//POST ADDRESS FOR USER
router.post('/addresses', ensureAuthenticated, function(req, res, next) {
  req.dbUser.createAddress(req.body.newAddress)
  .then(address => {
    if(!address) throw new Error('address not created!');
    return UserAddresses.findOne({
      where: {
        addressId: address.id,
        userId: req.dbUser.id
      }
    })
  })
  .then(rowInstance => {
    console.log(rowInstance);
    if(req.body.options) return rowInstance.update(req.body.options);
    else return;
  })
  .then(() => {
    res.status(201).send(req.body.newAddress);
  })
  .catch(next);
})

//GET CART
router.get('/cart', function(req, res, next){
  req.dbUser.getCart()
  .then(cart => {
    return cart.getItems({include: [Product]});
  })
  .then(items => res.send(items))
  .catch(next);
})

//ADD PRODUCT TO CART
router.post('/cart/:productId', ensureAuthenticated, function(req, res, next){
  let productIdToAdd = req.params.productId;
  let quantity = parseInt(req.body.quantity);

  req.dbUser.getCart()
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
          return record.update({quantity: newQuantity});
        } else {
          return record
        }
      })
      .then(record => {
        res.send(record)
      })
      .catch(next)
  });
})

//UPDATE CART ITEM QUANTITY
router.put('/cart/:productId', ensureAuthenticated, function(req, res, next){
  let productIdToUpdate = req.params.productId;
  let quantity = parseInt(req.body.quantity);

  Product.findById(productIdToUpdate)
  .then(product => {
    if (product.inventory < quantity) throw new Error('inventory exceeded');
    else return req.dbUser.getCart()
  })
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

  let id2Remove = req.params.productId;

  req.dbUser.getCart()
  .then(cart => {
    return CartProducts.destroy({where: {
      $and: {
        productId: id2Remove,
        cartId: cart.id
      }
    }})
  })
  .then(() => {
    res.sendStatus(204)
  })
  .catch(next)
})
