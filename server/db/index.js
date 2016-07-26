'use strict';
var db = require('./_db');
module.exports = db;

//Import
var User = require('./models/user');
var Product = require('./models/product');
var OrderSummary = require('./models/orderSummary');
var OrderDetail = require('./models/orderDetail');
var Category = require('./models/category');
var Address = require('./models/address');
var Review = require('./models/review');
var Cart = require('./models/cart');

//Associations
OrderSummary.belongsTo(Address);

OrderSummary.hasMany(OrderDetail, {as: 'OrderDetailsFromSummary'});

OrderDetail.belongsTo(Product);

//Product.belongsTo(Category);
Product.belongsToMany(Category, {through: 'ProductCategory'});
Category.belongsToMany(Product, {through: 'ProductCategory'});

Product.hasMany(Review, {as: 'ProductReviews'});

User.hasMany(Review, {as: 'UserReviews'})
User.belongsToMany(Address, {through: 'UserAddress'});
User.hasMany(OrderSummary, {as: 'UserOrders'});

Address.belongsToMany(User, {through: 'UserAddress'});

User.belongsTo(Cart);
Cart.belongsToMany(Product, {through: 'CartProducts'});

// OrderDetail.belongsToMany(OrderSummary, {through: 'OrderRelation'});
// OrderSummary.belongsToMany(OrderDetail, {through: 'OrderRelation'});
