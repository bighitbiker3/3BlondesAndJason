app.controller('ProductListCtrl', function ($scope, products, Product, Utility) {
  $scope.products = products;
  $scope.filterObj = {};

  $scope.addToFilter = function(property, query){
  	$scope.filterObj[property] = query;
  	var superQuery = Utility.convertToQuery($scope.filterObj);
  	Product.getAll(superQuery)
  	.then(products => {
  		$scope.products = products;
  	})
  }

  $scope.removeFromFilter = function(property){
  	delete $scope.filterObj[property];
  	var superQuery = Utility.convertToQuery($scope.filterObj);
  	Product.getAll(superQuery)
  	.then(products => {
  		$scope.products = products;
  	})
  }

  $scope.changeFilter = function(property, query, theCheck){
  	if($scope[theCheck]){
  		$scope.addToFilter(property, query);
  	} else {
  		$scope.removeFromFilter(property);
  	}
  }

  // add product to the cart to store on server
  $scope.addProduct = function(quantity) {
  	return ProductListFactory.addProduct($scope.product.id, quantity)
    .then(addedProduct => {
      // adding a cart to the scope (to accomodate loading of drop-down cart on the page)
      $scope.cart.products.push(addedProduct);
      return addedProduct
      });
  };

});
