
angular.module('karose.directives', [])
	.directive('karoseCard', ['$rootScope', '$parse', 'cardConfigureService', function($rootScope, $parse, cardConfigureService){
		return {
      restrict: 'A',
      scope: {
      	"oneCardData": "="
       },
      templateUrl: './partials/card-template.html',
      link: function (scope, element, attrs) {

        // var defaults = $parse(attrs.karoseCard)(scope);

        var cardType = scope.oneCardData.type;

		    scope.itemGroup = cardConfigureService.getCardData(cardType)['contentData'];

		    scope.btns = cardConfigureService.getCardData(cardType)['btns'];
        
      }
    }
	}])
	
	.directive('showModal', ['$rootScope', '$timeout', '$parse', function ($rootScope, $timeout, $parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {

        var defaults = $parse(attrs.showModal)(scope);
        var initFuc = function () {

          $rootScope.karoseConfigureId = defaults.karoseConfigureId;

          $rootScope.formData = jQuery.extend({}, defaults.formData);

          var operationType = $rootScope.karoseConfigureId.replace(/^(\w)*_/, '');

          $rootScope.operationType = operationType;

          $rootScope.modalShown = true;
          // $rootScope.modalShownDelay = true;

          if ($rootScope.modalShown) {
            $timeout(function () {
              $rootScope.modalShownDelay = true;
            })
          }
        }

        element.on('click', function(){
          $rootScope.$apply(initFuc)
          event.preventDefault();
        });
      }
    }
  }])
  .directive('karoseDialog', ['$rootScope', 'modalDialogConfigureService', function($rootScope, modalDialogConfigureService){
		return {
      restrict: 'A',
      // scope: {
      // 	"cardData": "="
      // },
      templateUrl: './partials/dialog-template.html',
      link: function (scope, element, attrs) {

        // var defaults = $parse(attrs.karoseCard)(scope);

        // var cardType = scope.oneCardData.type;
        var init = function (operationType) {
          if (!operationType) {
            scope.pagesData = [];
            return;
          }
          scope.pagesData = modalDialogConfigureService.getModalInfoConfigure(operationType);

          scope.pagesData.forEach(function(page, index){
          	page.formData = $rootScope.formData;
          })
        }

        $rootScope.$watch('modalShown', function(newV){

        	if(!newV){
        		scope.pagesData = [];	
        	}else {
        		init($rootScope.operationType)
        	}

        })

        function hideModal() {
        	$rootScope.modalShown = false;
        	$rootScope.modalShownDelay = false;
        }

        function modalBtnClick(btn, pagesData){
        	if(btn.operation === 'create') {
        		hideModal();
        	}else if(btn.operation === 'delete'){
        		var id = pagesData[0].formData.id;

        		scope.cardData.forEach(function(card, index){
        			if(card.id === id){
        				scope.cardData.splice(index,1);
        			}
        		})
        		hideModal();
        	}else if(btn.operation === 'update'){
        		// console.log(pagesData);
        		var id = pagesData[0].formData.id;

        		scope.cardData.forEach(function(card, index){
        			if(card.id === id){
        				scope.cardData.splice(index, 1, pagesData[0].formData)
        			}
        		})
        		hideModal();
        	}else if(btn.operation === 'cancel'){
        		hideModal();
        	}
        }
		    scope.hideModal = hideModal;
		    scope.modalBtnClick = modalBtnClick;
        
      }
    }
	}])