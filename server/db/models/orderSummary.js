'use strict';

var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('order_summary', {
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },

  priceTotal: {
    type: Sequelize.DOUBLE,
    allowNull: false

  },

  processed: { // OB/BG: maybe this could be a getter instead?
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },

  paid: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }

})
