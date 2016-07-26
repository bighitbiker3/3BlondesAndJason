'use strict';
var router = require('express').Router();
// var db = require('./server/db');
// var User = db.model('user');
module.exports = router;

router.get('/', function(req, res, next){
  User.findAll()
  .then(users => {
    console.log(users);
  })
})
