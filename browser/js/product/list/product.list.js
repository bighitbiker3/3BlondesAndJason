app.controller('ProductListCtrl', function ($scope, products, Product) {
  $scope.products = products;
  $scope.filterObj = {};

  $scope.addToFilter = function(property, query){
  	$scope.filterObj[property] = query;
  	var superQuery = [];
  	for (var key in $scope.filterObj) {
  		if($scope.filterObj.hasOwnProperty(key)){
  			superQuery.push($scope.filterObj[key]);
  		}
  	}
  	superQuery = '?' + superQuery.join('&');

  	Product.getAll(superQuery)
  	.then(products => {
  		$scope.products = products;
  	})
  }

  $scope.removeFromFilter = function(property){
  	delete $scope.filterObj[property];
  	var superQuery = [];
  	for (var key in $scope.filterObj) {
  		if($scope.filterObj.hasOwnProperty(key)){
  			superQuery.push($scope.filterObj[key]);
  		}
  	}
  	superQuery = '?' + superQuery.join('&');

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

  //add product using the productlistfactory, passing in the selected product on the $scope
  $scope.addProduct = function(product) {
  	// return ProductListFactory.addProduct($scope.)
  }




});
