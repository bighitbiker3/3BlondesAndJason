'use strict';
var router = require('express').Router();
var db = require('../../../db');
var Address = db.model('address');
var UserAddresses = db.model('user_addresses');
var utility = require('../../configure/utility');
var ensureAdmin = utility.ensureAdmin;
var ensureAuthenticated = utility.ensureAuthenticated;
module.exports = router;

router.get('/:addressId', function(req, res, next){
  let addressId = req.params.addressId
  Address.findById(addressId)
  .then(address => res.send(address))
  .catch(next)
})

router.delete('/:addressId/:userId', function(req, res, next){
  let addressId = req.params.addressId;
  let userId = req.params.userId;

  UserAddresses.findOne({
    where: {
      addressId: addressId,
      userId: userId
    }
  })
  .then(addressRow => addressRow.destroy())
  .then(() => res.sendStatus(204))
  .catch(next)
})
