var appControllers = angular.module('myControllers', [ ]);
appControllers.controller('mainController', ['$rootScope',function($rootScope) {
	$rootScope.hidenav = false;
}]);
appControllers.controller('splashController', ['$scope','$rootScope',function($scope,$rootScope) {
    $scope.message = "splash page";
	$rootScope.hidenav = true;
	console.log("splash controller");
	$scope.$parent.pageClass = 'page-splash';
	
}]);

appControllers.controller('aboutController', ['$scope','$rootScope',function($scope,$rootScope) {
    $scope.message = "about page";
	$rootScope.hidenav = false;
	$scope.$parent.pageClass = 'page-about';
}]);
appControllers.controller('locationController', ['$scope','$rootScope','$location','aService',function($scope,$rootScope,$location,aService) {
    $scope.message = "location page";
	$rootScope.hidenav = false;
	$scope.local=false;
	console.log("in location");
	try {
		var hostname = window.location.host;
		console.log(window.location.host);
		if (hostname.indexOf('localhost') !== -1 )
			$scope.local=true;
		}
	catch(ex) {
		console.log(ex.message);
		}
	$scope.$parent.pageClass = 'page-location';
	var location = aService.getLocations();
	$scope.campus = location[0].organization.name;
	$scope.nodes = location[0].nodes;
	$scope.mySelectedNode = location[0].nodes[0];
	
	$scope.findDirections = function(){
		var latlng = $scope.mySelectedNode.geo;
		$rootScope.latlng = latlng;
		$rootScope.positionlatlng = location[0].organization.geo;
		console.log($rootScope.positionlatlng.lat + " " + $rootScope.positionlatlng.lng);
		$location.url('/map' )
		}
}]);
appControllers.controller('mapController', ['$scope','$rootScope','$location','aService','$q',function($scope,$rootScope,$location,aService,$q) {
    $scope.message = "map page";
	$rootScope.hidenav = false;
	var TILE_SIZE = 256;
	var deferred = $q.defer();
	var map; 
	$scope.$on('mapInitialized', function(evt, evtMap) { 	
		console.log("map initializing");
		map = evtMap; 
		deferred.resolve(); // proceed once have map
	});
	 
	function calcRoute(map,start,end) {
	  console.log("calcing route");
	  var directionsDisplay = new google.maps.DirectionsRenderer();
	
	  var directionsService = new google.maps.DirectionsService();
	  directionsDisplay.setMap(map);
	  var request = {
		  origin: start,
		  destination: end,
		  travelMode: google.maps.TravelMode.WALKING
	  };
	  directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
		  console.log("setting directions");
		  directionsDisplay.setDirections(response);
		  map.fitBounds(directionsDisplay.getDirections().routes[0].bounds);		  
		}
		  else { alert("No Directions Found");
		}
	  });
	}	
	deferred.promise.then(function() { // delay until map initialized
		console.log('got map');
		aService.getPosition().then(
			function(data) {
				console.log("got position");
				$scope.position = data; // data contains geo position
				var start = new google.maps.LatLng($rootScope.positionlatlng.lat,$rootScope.positionlatlng.lng);
				var end = new google.maps.LatLng($rootScope.latlng.lat,$rootScope.latlng.lng);
				map.setCenter(start);
				//map.setCenter(new google.maps.LatLng(53.307029,-6.221084));
				$scope.dublin = map.getCenter();				
				calcRoute(map,start,end);
			},
			function(data) {
			  $scope.position = "Failed: " + data.message;
			}
		)});		

}]);
appControllers.controller('errorController', ['$scope','$routeParams', function($scope,$routeParams) {

    //$scope.poll = myPollService.getPoll($routeParams.pin)
    $scope.error = $routeParams.errormessage

}]);