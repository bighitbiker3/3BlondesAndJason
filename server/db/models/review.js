'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('review', {
  description: {
    type: Sequelize.STRING
  },

  stars: {
    type: Sequelize.INTEGER,
    validate: {
      notNull: true,
      len: [0,5]
    }
  },

  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }


});
