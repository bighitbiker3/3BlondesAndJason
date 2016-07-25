'use strict';

var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('address', {
  street1 : {
    type: Sequelize.STRING,
    validate: {
      notNull: true
    }
  },
  street2 : {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING,
    validate: {
      notNull: true
    }
  },
  state: {
    type: Sequelize.STRING,
    validate: {
      notNull: true
    }
  },
  zip: {
    type: Sequelize.INTEGER,
    validate: {
      notNull: true,
      len: [5, 5]
    }
  }
})
