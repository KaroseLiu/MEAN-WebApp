angular.module('karose', ['ui.router', 'karose.directives', 'karose.controllers'])
.config(function($stateProvider, $urlRouterProvider) {
     
    $stateProvider
     
    .state('cardView', {
      url: "/cardView",
      templateUrl: "partials/cardView.html"
    })
    .state('gridView', {
      url: "/gridView",
      templateUrl: "partials/gridView.html"
    });
    $urlRouterProvider.otherwise('/cardView');
})