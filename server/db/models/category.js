'use strict';

var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('category', {
  categoryName: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})
