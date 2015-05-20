angular.module('karose.services', ['ngResource'])
	.factory('getDataService', ['$http', '$q', '$rootScope', '$resource', function($http, $q, $rootScope,$resource){

		return {

			query: function(params){

				var deferred = $q.defer();

				$http.get('/main/cards')
					.success(function(data){
						deferred.resolve(data);
					})
					.error(function(data){
						deferred.reject(data);
					});

				return deferred.promise;
			},

			save: function(params, callback){
				var deferred = $q.defer();

				$http.post('/main/cards',params)
					.success(function(data){
						deferred.resolve(data);
						callback();
					})
					.error(function(data){
						deferred.reject(data);
					});

				return deferred.promise;
			},

			remove: function(params, callback){
				$resource('/main/cards/:id', paramDefaults, actions)
			}

		}
	}])
	.factory('getUserService', ['$resource', '$http', '$q', function($resource, $http, $q){
		return {

			save: function(params,callback) {

				var deferred = $q.defer();

				$http.post('/user/signup', params)
					.success(function(data){
						deferred.resolve(data);
						callback && callback();
					})
					.error(function(data){
						deferred.reject(data);
					});

				return deferred.promise;
			},

			login: function(params, callback) {
				var deferred = $q.defer();

				$http.post('/user/login', params)
					.success(function(data){
						deferred.resolve(data);
						callback && callback();
					})
					.error(function(data){
						deferred.reject(data);
					});

				return deferred.promise;
			}
		}

	}])
	.factory('cardConfigureService', ['$rootScope', function($rootScope){
		var toReturn = {

			getCardData: function(cardType){

				var objType = cardType;

				var cardData = {};

				switch(objType) {
					case 'All':

						cardData['contentData'] = ['status', 'deploymentState', 'libraries', 'appNode', 'description'];
						cardData['btns'] = [
							{
								'name': 'Add',
								'operation': 'create',
								'type': 'primary'
							},
							{
								'name': 'Edit',
								'operation': 'update',
								'type': 'success'
							},
							{
								'name': 'Delete',
								'operation': 'delete',
								'type': 'warning'
							}
						];
						break;

					case 'Large':

						cardData['contentData'] = ['status', 'description', 'deploymentState'];
						cardData['btns'] = [
							{
								'name': 'Add',
								'operation': 'create',
								'type': 'primary'
							},
							{
								'name': 'Edit',
								'operation': 'update',
								'type': 'success'
							}
						];
						break;

					case 'Small':

						cardData['contentData'] = ['status', 'description'];
						cardData['btns'] = [
							{
								'name': 'Edit',
								'operation': 'update',
								'type': 'success'
							}
						];
						break;

					default:

						console.log("No Data");
						break;

				}

				return cardData;
			}

		}
		return toReturn;
	}])
	.factory('modalDialogConfigureService', ['$rootScope', function($rootScope){
		return {
			getModalInfoConfigure: function(karoseConfigureId){

				var modalPage = [];
				switch(karoseConfigureId) {
					case "create":
						{
							modalPage[0] = {
	              "formInfo": [
	                {"property": "name", "propertyStyle": "input", "propertyName": 'Name', 'placeholder': 'Karose'},
	                {"property": "appNode", "propertyStyle": "input", "propertyName": "AppNode"},
	                {"property": "type", "propertyStyle": "input", "propertyName": "Type"},
	                {"property": "deploymentState", "propertyStyle": "input", "propertyName": "Deployment State"},
	                {"property": "libraries", "propertyStyle": "input", "propertyName": "Libraries"},
	                {"property": "status", "propertyStyle": "input", "propertyName": "Status"},
	                {"property": "description", "propertyStyle": "textarea", "propertyName": 'Description', 'placeholder': 'Edit it'},
	              ],
	              'buttons': [
									{
										'name': 'Create',
										'operation': 'create',
										'type': 'primary'
									},
									{
										'name': 'Cancel',
										'operation': 'cancel',
										'type': 'warning'
									}
								],
	              'modalType': 'create'
	            }

	            // modalPage.provideTemplateUrl = ($rootScope.karose_path || '') + 'partials/modal/form_create.html'
						}
						break;
					case 'update':
						{
							modalPage[0] = {
                "formInfo": [
                  {"property": "name", "propertyStyle": "input", "propertyName": 'Name', 'placeholder': 'Karose'},
	                {"property": "appNode", "propertyStyle": "input", "propertyName": "AppNode"},
	                {"property": "type", "propertyStyle": "input", "propertyName": "Type"},
	                {"property": "deploymentState", "propertyStyle": "input", "propertyName": "Deployment State"},
	                {"property": "libraries", "propertyStyle": "input", "propertyName": "Libraries"},
	                {"property": "status", "propertyStyle": "input", "propertyName": "Status"},
	                {"property": "description", "propertyStyle": "textarea", "propertyName": 'Description', 'placeholder': 'Edit it'}

                ],
                'buttons': [
                	{
										'name': 'Upate',
										'operation': 'update',
										'type': 'primary'
									},
									{
										'name': 'Cancel',
										'operation': 'cancel',
										'type': 'warning'
									}
								],
                'modalType': 'updae',
              }

              modalPage.provideTemplateUrl = ($rootScope.karose_path || '') + 'partials/modal/form_update.html'
						}
						break;
					case "delete":
						{
							modalPage[0] =  {
								"formInfo": [],
                'buttons': [
                	{
										'name': 'Delete',
										'operation': 'delete',
										'type': 'primary'
									},
									{
										'name': 'Cancel',
										'operation': 'cancel',
										'type': 'warning'
									}
                ],
								'modalType': 'delete'
              }
							// modalPage.provideTemplateUrl = ($rootScope.karose_path || '') + 'partials/modal/form_delete.html'
						}
						break;
					default:
						console.log('No Data in the Dialog');
						break;
				}
				return modalPage;
			}
		}
	}])
	.factory('KaroseCard', ['$resource', function($resource){
		return $resource('/main/cards/:id', {id: '@_id'}, {
			deleteCard: {
				method: 'DELETE'
			},
			updateCard: {
				method: 'POST',
				params: {}
			}
		});
	}])
