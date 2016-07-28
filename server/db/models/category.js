'use strict';

var Sequelize = require('sequelize');
var db = require('../_db');

// OB/BG: you might just do away with this model (wherever you need to use it just embed an array of strings)
module.exports = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    // OB/BG: unique validator
  }
})
