'use strict';

var Sequelize = require('sequelize');
var db = require('../_db');

// OB/BG: what's the plan for this model? why not just user the order model?
module.exports = db.define('cart');