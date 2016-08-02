'use strict';

var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('card', {
  number: {
    type: Sequelize.STRING,
    allowNull: false
  },
  exp_month: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  exp_year: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  cvc: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING
  }
})
