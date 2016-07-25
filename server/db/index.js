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
OrderSummary.belongsTo(Address);

OrderSummary.hasMany(OrderDetail, {as: 'OrderDetails'});

OrderDetail.belongsTo(Product);

Product.belongsTo(ProductCategory);
Product.hasMany(Review, {as: 'ProductReviews'});

User.hasMany(Review, {as: 'UserReviews'})
User.belongsToMany(Address, {through: 'UserAddress'});
User.hasMany(OrderSummary, {as: 'UserOrders'});

Address.belongsToMany(User, {through: 'UserAddress'});

Cart.belongsTo(User);
Product.hasMany(Cart);


// OrderDetail.belongsToMany(OrderSummary, {through: 'OrderRelation'});
// OrderSummary.belongsToMany(OrderDetail, {through: 'OrderRelation'});
