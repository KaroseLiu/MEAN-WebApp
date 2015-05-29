angular.module('karose', ['ui.router', 'karose.directives', 'karose.controllers'])
.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

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

    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // });
    $httpProvider.interceptors.push('authInterceptor');
})
.factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
  return {
    // Add authorization token to headers
    request: function (config) {
      config.headers = config.headers || {};
      if ($cookieStore.get('token')) {
        config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
      }
      return config;
    },

    // Intercept 401s and redirect you to login
    responseError: function(response) {
      if(response.status === 401) {
        $location.path('/');
        // remove any stale tokens
        $cookieStore.remove('token');
        return $q.reject(response);
      }
      else {
        return $q.reject(response);
      }
    }
  };
})
  .run(function($rootScope, $location, $cookieStore){
    $rootScope.$on('$stateChangeStart', function (event, next) {

      if(!$cookieStore.get('token')) {
        $location.path('/');
      }
    });
  })
