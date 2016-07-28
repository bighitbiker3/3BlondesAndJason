'use strict';

var Sequelize = require('sequelize');
var db = require('../_db');

// OB/BG: consider validations
module.exports = db.define('order_detail', {
  processed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },

  purchaseCost: {
    type: Sequelize.DOUBLE, // OB/BG: recommend INTEGER instead, measure in cents
    allowNull: false,
  },

  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
})
