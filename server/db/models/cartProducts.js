'use strict';

var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('cart_products', {
  cartId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
})
