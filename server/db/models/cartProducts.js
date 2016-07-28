'use strict';

var Sequelize = require('sequelize');
var db = require('../_db');

// OB/BG: consider more validations
module.exports = db.define('cart_products', {
  cartId: { // OB/BG: this should be an assocation presumably (can delete this)
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  productId: { // OB/BG: ditto
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
})
