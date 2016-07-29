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

// RAND photoUrl, description and product name

var randPhoto = function(i){
  var pictureUrls = [
    'http://i.imgur.com/slRBKiu.jpg',
    'http://i.imgur.com/J4naKJE.jpg',
    'http://i.imgur.com/BoTnCz4.jpg',
    'http://i.imgur.com/dgpKnd7.jpg',
    'http://i.imgur.com/MMGEFuf.jpg',
    'http://i.imgur.com/ajdtUaL.jpg',
    'http://i.imgur.com/ad3ibgE.jpg',
    'http://i.imgur.com/3pt8pu7.jpg',
    'http://i.imgur.com/u0HQOMQ.jpg',
    'http://i.imgur.com/AJKBnJi.jpg'
  ]
  return pictureUrls[i];
}

var randDescription = function(i){
  var descriptions = [
    'Interlux Brightside Polyurethane is the most technically advanced one-part polyurethane available. It contains unique additives that make cleaning easier and help reduce stains and abrasion.', 
    'Perfection is the ultimate performing, 2-part polyurethane gloss finish. It provides the longest lasting, ultra high-gloss finish that has superb color retention, together with excellent chemical, impact & abrasion resistance.', 
    'Interlux PreKote primer is used above the waterline prior to painting topsides with Brightside polyurethane, Toplac, yacht enamels, or any one part topside finish on wood, fiberglass, and previously painted surfaces.', 
    'Interlux Fiberglass Surface Prep is the first step in a 2 step system for removing mold release agents (wax) from gelcoat prior to application of antifouling boat bottom paint. ',
    'Golspar Satin is a dull gloss varnish ideal for anywhere a low-lustre, dull gloss effect is desired, such as cabinets tables counters etc.',
    'Interlux Clear Wood Sealer is a fast drying urethane used for priming wood prior to application of single part varnishes or two component urethane finishes.',
    'This dual biocide antifouling paint combines Biolux slime blocker and Econea, a metal-free antifouling agent that blocks the growth of shell fouling barnacles, zebra mussels and other aquatic organisms.',
    'Perfection is the ultimate performing, 2-part polyurethane gloss finish. It provides the longest lasting, ultra high-gloss finish that has superb color retention, together with excellent chemical, impact & abrasion resistance.',
    'Interlux Interstain is both a wood filler and stain to serve two purposes: it fills the grain of the wood, and stains the wood to enhance its natural beauty.',
    'Inter-Prime Wood Sealer is clear and eliminates high or low spots before the application of varnish or paint. Interlux 1026 is recommended to seal plywood. Not for use with two-part polyurethanes or epoxy paint.'

  ]

  return descriptions[i];
}

var randProductName = function(i) {
  var names = [
    'Interlux Brightside Polyurethane',
    'Interlux Brushing Liquid 333',
    'Interlux Perfection Two Part Polyurethane',
    'Interlux InterProtect 2000E Epoxy Primer',
    'Interlux Pre-Kote Primer for One-Part Finishes',
    'Interlux Schooner Varnish',
    'Interlux Seam Compound',
    'Interlux Micron CSC Antifouling Bottom Paint',
    'Interlux Fiberglass Surface Prep (YMA601)',
    'Interlux Epiglass Epoxy Resin',
    'Interlux Interstrip 299E Fiberglass Paint Remover'
  ]
  return names[i];
}


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
      zip: chance.zip(),
      isShipping: chance.bool(),
      isBilling: chance.bool()
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

  for (var i = 0; i < 10; i++) {
    var newProduct = {
      name: randProductName(i),
      photoUrl: randPhoto(i),
      price: chance.floating({fixed: 1, min: 3000, max: 5000}),
      color: chance.color({format: 'hex'}),
      inventory: chance.integer({min: 0, max: 100}),
      description: randDescription(i)
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
        addingProductsToReviews.push(chance.pickone(postValidationProducts).addReviews(reviewCopy.pop()));
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
        addAddressesToOrderSummaries.push(orderSummary.setShipping(chance.pickone(postValidationAddresses)));
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
        addOrderDetailsToOrderSummaries.push(chance.pickone(postValidationOrderSummaries).addItems(orderDetailsCopy.pop()))
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
