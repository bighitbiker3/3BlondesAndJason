'use strict';

var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('product', {
  name: {
    type: Sequelize.STRING,
    validate: {
      notNull: true
    }
  },

  productCategoryId: {
    type: Sequelize.INTEGER,
    validate: {
      notNull: true
    }
  },

  price: {
    type: Sequelize.DOUBLE,
    validate: {
      notNull: true
    }
  },

  photoUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://i.vimeocdn.com/portrait/1274237_300x300'
  },

  productBrandId: {
    type: Sequelize.INTEGER,
    validate: {
      notNull: true
    }
  },

  inventory: {
    type: Sequelize.INTEGER,
    validate: {
      notNull: true
    }
  },

  description: {
    type: Sequelize.TEXT
  }




});
