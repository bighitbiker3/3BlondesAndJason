'use strict';

var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})
