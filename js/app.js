var app= angular.module('myApp', ['ngRoute', 'ngTouch','ngMap',
	'myControllers','myServices','myDirectives'
]);
app.run(function($rootScope) {
  $rootScope.name = "Campus Direct";
});
//Define Routing for app
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
        .when('/', {
          templateUrl: 'templates/splash.htm',
          controller: 'splashController'
		})
		.when('/map', {
          templateUrl: 'templates/map.htm',
          controller: 'mapController'
		})
		.when('/location', {
          templateUrl: 'templates/location.htm',
          controller: 'locationController'
		})
		.when('/about', {
          templateUrl: 'templates/about.htm',
          controller: 'aboutController'
		})
		.when('/error/:errormessage', {
          templateUrl: 'templates/error.htm',
          controller: 'errorController'
		})
		
}]);











