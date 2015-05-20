angular.module('karose.controllers', ['karose.services'])
	.controller('karose.controllers.index', ['$scope', '$rootScope', function($scope, $rootScope){


		$scope.karose_path = './';
		$rootScope.karose_path = './';


	}])
	.controller('karose.component.user.signup', ['$scope', '$rootScope', '$resource', 'getUserService', '$timeout', '$location', function($scope, $rootScope, $resource, getUserService, $timeout, $location) {

		var form = {};

		$scope.submitUser = function() {

			form['email'] = $scope.email;
			form['fName'] = $scope.firstName;
			form['lName'] = $scope.lastName;
			form['password'] = $scope.password;

			if(!form.email || !form.password) return;

			var promise = getUserService.save(form);

			promise.then(function(data){

				$scope.userMessage = "The user has been created, you can sign in with it.";

				$timeout(function() {
					$location.path('/');
				}, 5000)

			}, function(error){
				console.log("Not successful load the data", error);
			})

		}


	}])
	.controller('karose.component.user.login', ['$scope', 'getUserService', '$location', function($scope, getUserService, $location) {

		var form = {};

		$scope.loginWithLocal = function() {
			form['email'] = $scope.userName;
			form['password'] = $scope.password;

			if(!form.email || !form.password) return;

			var promise = getUserService.login(form);

			promise.then(function(data) {

				$location.path('/cardView');

			}, function(error) {
				$scope.errorMessage = error && error.error;
			})

		}

	}])
  .controller('karose.component.card_view', ['$scope', 'getDataService', '$rootScope', function($scope, getDataService, $rootScope){



    function getDataFromServer(){
      var promise = getDataService.query();


      promise.then(function(data){
        $scope.cardData = data;
      },function(data){
        console.log("Not successful load the data", data);
      })
    };

    getDataFromServer();

  	$rootScope.$on('dataChangeSuccessful', function(){
      getDataFromServer();
    })


  }]);
