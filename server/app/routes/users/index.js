'use strict';
var router = require('express').Router();
var db = require('../../../db');
var User = db.model('user');
module.exports = router;

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

//ROUTER PARAM FOR USERS - THIS SETS A REQ.USER OBJECT WITH THE USER WHEN AN ID PARAM IS PASSED IN THE REQUEST
router.param('id', function(req, res, next, id){
  User.findById(id)
  .then(user => {
    req.user = user
    next();
    return null
  })
  .catch(next)
})

//GET ALL USERS
router.get('/', ensureAuthenticated, function(req, res, next){

  User.findAll()
  .then(users => {
    res.send(users);
  })
});

//ADD USER
router.post('/', ensureAuthenticated, function(req, res, next){
  let newUser = req.body;
  User.create(newUser)
  .then(createdUser => {
    res.status(201).send(createdUser);
  })
  .catch(next)
});

//UPDATE USER
router.put('/:id', ensureAuthenticated, function(req, res, next){
  let userUpdateData = req.body;

  req.user.update(userUpdateData)
  .then(updatedUser => {
    res.status(201).send(updatedUser);
  })
  .catch(next)
});

//DELETE USER
router.delete('/:id', ensureAuthenticated, function(req, res, next){
  req.user.destroy()
  .then(() => {
    res.sendStatus(204);
  })
  .catch(next)
});

//GET SPECIFIC USER
router.get('/:id', ensureAuthenticated, function(req, res, next){
  res.send(req.user)
});
