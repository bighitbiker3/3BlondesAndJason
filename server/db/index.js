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
var CartProducts = require('./models/cartProducts');
var UserAddresses = require('./models/userAddresses');

//Associations
OrderSummary.belongsTo(Address, {as: 'Shipping'}); // add
OrderSummary.belongsTo(Address, {as: 'Billing'}); // add

OrderSummary.hasMany(OrderDetail, {as: 'Items'});

OrderDetail.belongsTo(Product);

//Product.belongsTo(Category);
Product.belongsToMany(Category, {through: 'ProductCategory'});
Category.belongsToMany(Product, {through: 'ProductCategory'});

Product.hasMany(Review);

User.hasMany(Review, {as: 'UserReviews'})
User.belongsToMany(Address, {through: UserAddresses});
User.hasMany(OrderSummary, {as: 'UserOrders'});

User.belongsTo(Cart);
Cart.belongsToMany(Product, {through: CartProducts});
Cart.hasMany(CartProducts, {as: 'items'});
CartProducts.belongsTo(Product);
