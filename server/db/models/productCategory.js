'use strict';

var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('product_category', {
  categoryName: {
    type: Sequelize.STRING,
    validate: {
      notNull: true
    }
  }
})
