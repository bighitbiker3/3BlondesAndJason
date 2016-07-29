'use strict';
var router = require('express').Router();
var db = require('../../../db');
var Address = db.model('address');
var utility = require('../../configure/utility');
var ensureAdmin = utility.ensureAdmin;
var ensureAuthenticated = utility.ensureAuthenticated;
module.exports = router;

router.get('/:addressId', function(req, res, next){
  let addressId = req.params.addressId
  Address.findById(addressId)
  .then(address => {
    console.log(address);
    res.send(address)
  })
  .catch(next)
})
