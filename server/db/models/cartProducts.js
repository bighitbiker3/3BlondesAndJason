'use strict';

var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('cart_products', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
})
