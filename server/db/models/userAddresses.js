'use strict';

var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('user_addresses', {
  isBilling: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isShipping: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})
