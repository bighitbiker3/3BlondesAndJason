'use strict';

var Sequelize = require('sequelize');
var db = require('../_db');
var OrderDetail = require('../models/orderDetail');

module.exports = db.define('order_summary', {
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },

  priceTotal: {
    type: Sequelize.INTEGER,
    allowNull: false

  },

  processed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },

  paid: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }

})
