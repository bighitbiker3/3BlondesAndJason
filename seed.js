/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Product = db.model('product');
var Address = db.model('address');
var Review = db.model('review');
var OrderSummary = db.model('order_summary');
var OrderDetail = db.model('order_detail');

var Promise = require('sequelize').Promise;
var chance = new require('chance')();


var postValidationUsers;
var postValidationProducts;
var postValidationReviews;
var postValidationOrderSummaries;
var postValidationAddresses;
var postValidationOrderDetails;

//SEED USERS
var seedUsers = function () {
  var newUsers = [];

  for (var i = 0; i < 100; i++) {
    var newUser = {
      email: chance.email(),
      firstName: chance.first(),
      lastName: chance.last(),
      password: chance.word()
    }
    newUsers.push(newUser)
  }
  var creatingUsers = newUsers.map(function (userObj) {
      return User.create(userObj);
  });

  return Promise.all(creatingUsers);

};

//SEED ADDRESSES
var seedAddresses = function(){
  var newAddresses =[];

  for (var i = 0; i < 100; i++) {
    var newAddress = {
      street1: chance.address(),
      city: chance.city(),
      state: chance.state(),
      zip: chance.zip()
    }
    newAddresses.push(newAddress)
  }

  var creatingAddresses = newAddresses.map(function (newAddObj) {
      return Address.create(newAddObj);
  });

  return Promise.all(creatingAddresses)
};

//SEED PRODUCTS
var seedProducts = function(){
  var newProducts = [];

  for (var i = 0; i < 100; i++) {
    var newProduct = {
      name: chance.word(),
      price: chance.floating({fixed: 2, min: 0, max: 1000}),
      color: chance.color({format: 'hex'}),
      inventory: chance.integer({min: 0, max: 1000}),
      description: chance.paragraph()
    }
    newProducts.push(newProduct)
  }

  var creatingProducts = newProducts.map(function(product){
    return Product.create(product)
  });

  return Promise.all(creatingProducts)
};

//SEED REVIEWS
var seedReviews = function(){
  var newReviews = [];

  for (var i = 0; i < 400; i++) {
    var newReview = {
      description: chance.paragraph(),
      stars: chance.integer({min: 0, max: 5})
    }
    newReviews.push(newReview)
  }

  var creatingReviews = newReviews.map(function(review){
    return Review.create(review);
  });

  return Promise.all(creatingReviews);
};

var seedOrderSummaries = function(){
  var newOrderSummaries = [];

  for (var i = 0; i < 400; i++) {
    var newOrderSummary = {
      priceTotal: chance.floating({fixed: 2, max: 100000, min: 0})
    }
    newOrderSummaries.push(newOrderSummary)
  }

  var creatingOrderSummaries = newOrderSummaries.map(function(orderSummary){
    return OrderSummary.create(orderSummary);
  });

  return Promise.all(creatingOrderSummaries);
};

var seedOrderDetails = function(){
  var newOrderDetails = [];

  for (var i = 0; i < 800; i++) {
    var newOrderDetail = {
      purchaseCost: chance.floating({fixed: 2, max: 6000, min: 0}),
      quantity: chance.integer({min: 1, max: 10})
    }
    newOrderDetails.push(newOrderDetail)
  }

  var creatingOrderDetails = newOrderDetails.map(function(orderDetail){
    return OrderDetail.create(orderDetail);
  });

  return Promise.all(creatingOrderDetails);
};

db.sync({ force: true })
    .then(function () {
        return seedUsers();
    })
    .then(users => {
      postValidationUsers = users.slice();
      return seedAddresses()
    })
    .then(addresses => {
      postValidationAddresses = addresses.slice();

      var userAddressArr = postValidationUsers.map(user => {
        return user.addAddress(chance.pickone(addresses))
      })
      return Promise.all(userAddressArr)
    })
    .then(() => {
      return seedProducts()
    })
    .then(products => {
      postValidationProducts = products.slice();
      return seedReviews();
    })
    .then(reviews => {
      postValidationReviews = reviews.slice();
      var reviewCopy = reviews.slice();
      var addingUsersToReviews = [];
      reviews.forEach((review, i) => {
        addingUsersToReviews.push(chance.pickone(postValidationUsers).addUserReviews(reviewCopy.pop()));
      });
      return Promise.all(addingUsersToReviews);
    })
    .then(() => {
      var reviewCopy = postValidationReviews.slice();
      var addingProductsToReviews = [];
      postValidationReviews.forEach((review, i) => {
        addingProductsToReviews.push(chance.pickone(postValidationProducts).addProductReviews(reviewCopy.pop()));
      });
      return Promise.all(addingProductsToReviews);
    })
    .then(() => {
      return seedOrderSummaries();
    })
    .then(orderSummaries => {
      postValidationOrderSummaries = orderSummaries.slice();
      var orderSummariesCopy = orderSummaries.slice();

      var addingUsersToOrderSummaries = [];

      postValidationOrderSummaries.forEach(orderSummary => {
        addingUsersToOrderSummaries.push(chance.pickone(postValidationUsers).addUserOrders(orderSummariesCopy.pop()))
      })

      return Promise.all(addingUsersToOrderSummaries);

    })
    .then(() => {
      var addAddressesToOrderSummaries = [];

      postValidationOrderSummaries.forEach(orderSummary => {
        addAddressesToOrderSummaries.push(orderSummary.setAddress(chance.pickone(postValidationAddresses)));
      })

      return Promise.all(addAddressesToOrderSummaries);
    })
    .then(() => {
      return seedOrderDetails();
    })
    .then(orderDetails => {
      var orderDetailsCopy = orderDetails.slice();
      postValidationOrderDetails = orderDetails.slice();

      var addOrderDetailsToOrderSummaries = [];

      orderDetails.forEach(orderDetail => {
        addOrderDetailsToOrderSummaries.push(chance.pickone(postValidationOrderSummaries).addOrderDetailsFromSummary(orderDetailsCopy.pop()))
      })

      return Promise.all(addOrderDetailsToOrderSummaries);
    })
    .then(() => {
      var addProductsToOrderDetails = [];

      postValidationOrderDetails.forEach(orderDetail => {
        addProductsToOrderDetails.push(orderDetail.setProduct(chance.pickone(postValidationProducts)));
      })

      return Promise.all(addProductsToOrderDetails);
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
