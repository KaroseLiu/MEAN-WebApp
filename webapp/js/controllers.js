angular.module('karose.controllers', ['karose.services'])
	.controller('karose.controllers.index', ['$scope', '$rootScope', function($scope, $rootScope){
		$scope.karose_path = './';
		$rootScope.karose_path = './'
	}])
  .controller('karose.component.card_view', ['$scope', 'getDataService', '$rootScope', function($scope, getDataService, $rootScope){


  	var promise = getDataService.query({name: 'card'});


  	promise.then(function(data){
  		$rootScope.cardData = data;
  	},function(data){
  		console.log("Not successful load the data", data);
  	})
  		

  }])

