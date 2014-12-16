angular.module('karose.services', [])
	.factory('getDataService', ['$http', '$q', '$rootScope', function($http, $q, $rootScope){

		return {

			query: function(params){

				var deferred = $q.defer();

				$http({method: 'get', url:  $rootScope.karose_path + 'mock/'+ params.name + '.json'})
					.success(function(data){
						deferred.resolve(data);
					})
					.error(function(data){
						deferred.reject(data);
					});

				return deferred.promise;
			}，

			delete: function(){
				
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

						cardData['contentData'] = ['status', 'description', 'deploymentState', 'libraries', 'appNode'];
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
	                {"property": "description", "propertyStyle": "textarea", "propertyName": 'Description', 'placeholder': 'Edit it'},
	                {"property": "appNode", "propertyStyle": "select", "propertyName": "AppNode"}
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
                  {"property": "name", "propertyStyle": "input", "propertyName": "Name"},
                  {"property": "status", "propertyStyle": "label", "propertyName": "Status"},
                  {"property": "description", "propertyStyle": "textarea", "propertyName": "Description"},
                  {"property": "deploymentState", "propertyStyle": "input", "propertyName": "Deployment State"},
                  {"property": "appNode", "propertyStyle": "select", "propertyName": "AppNode"}
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
	}]);