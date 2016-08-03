var db = require('../../../server/db');
var expect = require('chai').expect;

var Product = db.model('product');
var Category = db.model('category');
var Review = db.model('review');

var product_category;

var name = 'Azur blue with white tones';
var price = 100;
var photoUrl = 'http://www.safe_for_work.com';
var productCategoryId = 1;
var inventory = 12;
var hexColor = "#80c2ff";
var description = "this paint runs like butter in a hot and saucy pan";




describe('Product model', function () {

    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });


    describe('Product methods', function() {

      var testProduct;
      var testCategory;
      beforeEach(function(done) {

        Product.create({
          name : name,
          price : price,
          photoUrl: photoUrl,
          color: hexColor,
          description: description,
          inventory: inventory,
          categories: [
            {id: 1, name: 'varnish'}
          ]
        }, {
          include: [Category]
        })
        .then((product) => {
          testProduct = product;
          return Review.create({description: 'Baller', stars: 5});
        })
        .then(review => {
          return testProduct.addUserReview(review);
        })
        .then(product => {
          testProduct = product;
          done();
        })
      });

      it('should have a getproductreviews method', function (done) {
          expect(testProduct.getUserReview).to.be.a('function');
          done();
      });

      it('should have an addProductReviews method', function(done) {
        expect(testProduct.addUserReview).to.be.a('function');
        done();
      });

      it('review should have 5 stars!', function(done) {
        return testProduct.getProductReviews()
          .then(reviews => {
            expect(reviews[0].stars).to.equal(5);
            done();
        });
      })

      it('should have category varnish', function (done) {
        return testProduct.getCategories()
          .then(categories => {
            expect(categories[0].name).to.equal('varnish');
            done();
          })
      })
  })
});


