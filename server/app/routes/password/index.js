'use strict';
var router = require('express').Router();
var db = require('../../../db');
var User = db.model('user');
var utility = require('../../configure/utility');
var ensureAdmin = utility.ensureAdmin;
var ensureAuthenticated = utility.ensureAuthenticated;
var hashMethods = require('./hasher');
module.exports = router;

router.post('/resetPassword', function(req, res, next){
  let email = req.body.email;
  hashMethods.addUserHash(email);
  console.log(hashMethods.store())
  res.end()
})

router.get('/resetPassword', function(req, res, next){
  let hashInUri = req.query.uw;
  let email = hashMethods.findUserHashWithHash(hashInUri);
  if(email){
    res.send(email)
    console.log(email);
  } else {
    res.sendStatus(404)
  }
})

router.put('/resetPassword', function(req, res, next){
  let email = req.body.email;
  let password = req.body.password;
  User.findOne({where:{email: email}})
  .then(user => {
    console.log(user);
    return user.update({password: password})
  })
  .then(updatedUser => {
    console.log(updatedUser);
    res.send(updatedUser)
  })
  .catch(next)

})
