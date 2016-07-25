'use strict';

var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('order_detail', {
  processed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },

  purchaseCost: {
    type: Sequelize.DOUBLE,
    validate: {
      notNull: true
    }
  },

  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      notNull: true
    }
  }
})
