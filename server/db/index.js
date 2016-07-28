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

//Associations
OrderSummary.belongsTo(Address); // OB/BG: maybe shipping AND billing

OrderSummary.hasMany(OrderDetail, {as: 'OrderDetailsFromSummary'}); // OB/BG: maybe rename 'orderSummary' => 'order', 'orderDetails' => 'items'

OrderDetail.belongsTo(Product);

//Product.belongsTo(Category); // OB/BG: bury dead code
Product.belongsToMany(Category, {through: 'ProductCategory'});
Category.belongsToMany(Product, {through: 'ProductCategory'});

Product.hasMany(Review, {as: 'ProductReviews'}); // OB/BG: drop the alias

User.hasMany(Review, {as: 'UserReviews'}) // OB/BG: drop the alias
// OB/BG: add reverse relationship for Review => User
User.belongsToMany(Address, {through: 'UserAddress'}); // OB/BG: drop the alias
User.hasMany(OrderSummary, {as: 'UserOrders'}); // OB/BG: drop the alias

Address.belongsToMany(User, {through: 'UserAddress'}); // OB/BG: drop the alias

User.belongsTo(Cart);
Cart.belongsToMany(Product, {through: CartProducts}); // OB/BG: hasMany
