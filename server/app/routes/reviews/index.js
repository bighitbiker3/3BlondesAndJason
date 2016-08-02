var router = require('express').Router();
var db = require('../../../db');
var Product = db.model('product');
var User = db.model('user');
var utility = require('../../configure/utility');
var ensureAdmin = utility.ensureAdmin;
var ensureAuthenticated = utility.ensureAuthenticated;

router.use('/', ensureAuthenticated, function(req, res, next){
  User.findById(req.user.id)
  .then(user => {
    req.dbUser = user;
    next()
  })
  .catch(next)
})

router.get('/:productId', function (req, res, next) {
  Product.findById(req.params.productId)
  .then(product => {
    return product.getReviews();
  })
  .then(reviews => {
    res.json(reviews);
  })
  .catch(next);
});

router.post('/:productId', ensureAuthenticated, function (req, res, next) {
  Product.findById(req.params.productId)
  .then(product => product.createReview(req.body))
  .then(review => {
    return req.dbUser.addUserReview(review);
  })
  .then(() => {
    res.status(201).end();
  })
  .catch(next);
});

module.exports = router;
