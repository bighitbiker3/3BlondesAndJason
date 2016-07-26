'use strict';
var router = require('express').Router();
var db = require('../../../db');
var User = db.model('user');
module.exports = router;

router.get('/', function(req, res, next){
  console.log('hello');
  res.send('hello');
})
