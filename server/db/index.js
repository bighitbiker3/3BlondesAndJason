'use strict';
var db = require('./_db');
module.exports = db;

//Import
var User = require('./models/user');
var Product = require('./models/product');
var OrderSummary = require('./models/orderSummary');
var OrderDetail = require('./models/orderDetail');

//Associations
OrderSummary.belongsTo(User);
OrderDetail.belongsTo(Product);
OrderDetail.belongsToMany(OrderSummary, {through: 'OrderRelation'});
OrderSummary.belongsToMany(OrderDetail, {through: 'OrderRelation'});


