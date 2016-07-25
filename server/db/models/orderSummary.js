'use strict';

var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('orderSummary', {
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },

  priceTotal: {
    type: Sequelize.DOUBLE,
    validate: {
      notNull: true
    }
  },

  processed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }

})
