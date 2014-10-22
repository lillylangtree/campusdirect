var appControllers = angular.module('myControllers', []);
appControllers.controller('mainController', ['$rootScope',function($rootScope) {
	$rootScope.hidenav = false;
}]);
appControllers.controller('splashController', ['$scope','$rootScope',function($scope,$rootScope) {
    $scope.message = "splash page";
	$rootScope.hidenav = true;
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
	$scope.$parent.pageClass = 'page-location';
	var location = aService.getLocations();
	$scope.campus = location[0].organization.name;
	$scope.nodes = location[0].nodes;
	$scope.mySelectedNode = location[0].nodes[0];
	
	$scope.findDirections = function(){
		var latlng = $scope.mySelectedNode.geo;
		$rootScope.latlng = latlng;
		$rootScope.positionlatlng = location[0].organization.geo;
		$location.url('/map' )
		}
}]);
appControllers.controller('mapController', ['$scope','$rootScope','$location','aService',function($scope,$rootScope,$location,aService) {
    $scope.message = "map page";
	$rootScope.hidenav = false;
	 var TILE_SIZE = 256;
	 
	function calcRoute(map,start,end) {
	  var directionsDisplay = new google.maps.DirectionsRenderer();
	  var image = new google.maps.MarkerImage('images/man.png',
                    new google.maps.Size(129, 42),
                    new google.maps.Point(0,0),
                    new google.maps.Point(18, 42)
                );
	  var directionsService = new google.maps.DirectionsService();
	  directionsDisplay.setMap(map);
	  var request = {
		  origin: start,
		  destination: end,
		  travelMode: google.maps.TravelMode.WALKING
	  };
	  directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
		  directionsDisplay.setDirections(response);
		  map.fitBounds(directionsDisplay.getDirections().routes[0].bounds);
		}
		  else { alert ("No Directions Found")
		}
	  });
	}
	$scope.$on('mapInitialized', function(event, map) {
      
		if ($rootScope.positionlatlng == undefined || $rootScope.positionlatlng == null) {
			var message='invalid route';
			return $location.path('/error/' + message)
			}
	  	var position = aService.getPosition().then(
			function(data) {
				$scope.position = data;
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
		);		
    });
}]);
appControllers.controller('errorController', ['$scope','$routeParams', function($scope,$routeParams) {

    //$scope.poll = myPollService.getPoll($routeParams.pin)
    $scope.error = $routeParams.errormessage

}]);