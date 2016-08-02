'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('review', {
  description: {
    type: Sequelize.TEXT
  },

  stars: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },

  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }


});
