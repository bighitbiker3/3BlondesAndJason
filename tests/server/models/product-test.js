var db = require('../../../server/db');
var expect = require('chai').expect;

var Product = db.model('product');
var Category = db.model('category');
var product_category;

var name = 'Azur blue with white tones';
var price = 100;
var photoUrl = 'http://www.safe_for_work.com';
var productCategoryId = 1;
var inventory = 12;
var description = "this paint runs like butter in a hot and saucy pan";




describe('Product model', function () {

    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });


    describe('Product methods', function() {
      var product;
        before(function(done) {
          return Category.create({
            categoryName: "paints"
          }).then(function(res) {
            product_category = res;
            done();
          })
        });

        it('should have a getproductreviews method', function (done) {
            Product.create({
              name : name,
              price : price,
              photoUrl: photoUrl,
              description: description,
              inventory: inventory
            })
            .then((product) => {
              return product.createCategory({categoryName: 'paints'})

            })
            .then((product) => {
              expect(product.getProductReviews).to.be.a('function');
              done()
            })
        });
    })

});


