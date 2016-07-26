'use strict';
var router = require('express').Router();
var db = require('../../../db');
var User = db.model('user');
module.exports = router;

var ensureAdmin = function (req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin) {
        next();
    } else {
        res.status(401).end();
    }
};

//ROUTER PARAM FOR USERS - THIS SETS A REQ.FOUNDUSER OBJECT WITH THE USER WHEN AN ID PARAM IS PASSED IN THE REQUEST
router.param('id', function(req, res, next, id){
  User.findById(id)
  .then(foundUser => {
    req.foundUser = foundUser
    next();
    return null
  })
  .catch(next)
})

//GET ALL USERS
router.get('/', ensureAdmin, function(req, res, next){
  User.findAll()
  .then(users => {
    res.send(users);
  })
});

//ADD USER
router.post('/', ensureAdmin, function(req, res, next){
  let newUser = req.body;
  User.create(newUser)
  .then(createdUser => {
    res.status(201).send(createdUser);
  })
  .catch(next)
});

//UPDATE USER
router.put('/:id', ensureAdmin, function(req, res, next){
  let userUpdateData = req.body;

  req.user.update(userUpdateData)
  .then(updatedUser => {
    res.status(201).send(updatedUser);
  })
  .catch(next)
});

//DELETE USER
router.delete('/:id', ensureAdmin, function(req, res, next){
  req.user.destroy()
  .then(() => {
    res.sendStatus(204);
  })
  .catch(next)
});

//GET SPECIFIC USER
router.get('/:id', ensureAdmin, function(req, res, next){
  res.send(req.user)
});
