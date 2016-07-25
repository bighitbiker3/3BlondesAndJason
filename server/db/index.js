'use strict';
var db = require('./_db');
module.exports = db;

//Import
var User = require('./models/user');
var Product = require('./models/product');
var OrderSummary = require('./models/orderSummary');
var OrderDetail = require('./models/orderDetail');
var ProductCategory = require('./models/productCategory');
var Address = require('./models/address');
var Review = require('./models/review');
var Cart = require('./models/cart');

//Associations
OrderSummary.belongsTo(User);
OrderSummary.belongsTo(Address);

OrderDetail.belongsTo(Product);

Product.belongsTo(ProductCategory);

Review.belongsTo(User);

Product.hasMany(Review, {as: 'ProductReviews'});

Address.belongsToMany(User, {through: 'UserAddress'});
User.belongsToMany(Address, {through: 'UserAddress'});

Cart.belongsTo(User);
Product.hasMany(Cart);

OrderSummary.hasMany(OrderDetail, {as: 'OrderDetails'});

// OrderDetail.belongsToMany(OrderSummary, {through: 'OrderRelation'});
// OrderSummary.belongsToMany(OrderDetail, {through: 'OrderRelation'});


