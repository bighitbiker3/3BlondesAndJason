'use strict';

var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('address', {
  street1 : {
    type: Sequelize.STRING,
    allowNull: false
  },
  street2 : {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zip: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      len: [5, 5]
    }
  }
})
