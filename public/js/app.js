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
    })
    .state('login', {
      url: "/login",
      templateUrl: "partials/login.html"
    })
    .state('signup', {
      url: "/signup",
      templateUrl: "partials/signup.html"
    })
    .state('/', {
      url: "/",
      templateUrl: "partials/login.html"
    })
    $urlRouterProvider.otherwise('/');
})
