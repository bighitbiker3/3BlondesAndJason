'use strict';

var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
    // OB/BG: maybe unique?
  },

  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },

  photoUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://i.vimeocdn.com/portrait/1274237_300x300'
    // OB/BG: check out sequelize docs for url validator
  },

  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  description: {
    type: Sequelize.TEXT
  },

  color: {
    type: Sequelize.STRING
    // OB/BG: check for hex validation
  }


});
