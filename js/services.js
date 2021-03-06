var appServices = angular.module('myServices', ['ngResource']);


appServices.factory("aService", function($rootScope,$q) {
	return {
		getPosition: function() {
			console.log("getting position");
			var deferred = $q.defer();
			if (navigator.geolocation) {
				console.log("got geo");
				var options = { timeout: 31000, enableHighAccuracy: true, maximumAge: 90000 };
				navigator.geolocation.getCurrentPosition(success, error, options);
			} else {
				console.log("geo location not present or timed out");
				alert('geo location not supported');
			}
			function success(position) {
				console.log("success geo");
				deferred.resolve(position.coords);
			};
			function error(msg) {
			  //var s = document.querySelector('#status');
			  //s.innerHTML = typeof msg == 'string' ? msg : "failed";
			  //s.className = 'fail';
			  console.log("failed geo");
			  deferred.reject({message: "failed to find position"});
			}
			return deferred.promise;
		},
		getLocations: function() {
		
			return [
			  {
				  organization: {
					  name: 'UCD Campus',
					  address: 'Belfield, Dublin 4, Ireland',
					  geo: { lat: 53.307029, lng:-6.221084 }
					  },
				  
					  nodes: [
						  {name: "Arts Cafe",
						  geo: { lat:53.3059865 ,lng: -6.2228996 }
						  },
						  {name: "Veterinary Sciences",
						  geo: { lat: 53.309186,lng: -6.223639}
						  },
						  {name: "Earth Institute",
						  geo: { lat: 53.30857,lng: -6.22337 }
						  },
						   {name: "Science Hub",
						  geo: { lat: 53.308243 ,lng: -6.22442 }
						  },
						   {name: "School of Computing",
						  geo: { lat: 53.309159,lng: -6.224268}
						  },
						   {name: "School of Nursing, Midwifery & Health",
						  geo: { lat: 53.3094405,lng: -6.2263024}
						  }
						]
				  }			  
			];
		}
	}
});

appServices.factory("myApiResource", function($window, $rootScope) {
  var urlBase = 'http://desolate-sands-9638.herokuapp.com/';
  return $resource(urlBase + "/users/jsonuserlist");
});

appServices.service('myApiService', ['$http', function ($http) {
  
	var urlBase = 'http://desolate-sands-9638.herokuapp.com/';

        this.getUsers = function () {
            return $http.get(urlBase + "/users/jsonuserlist");
        };

        this.getUsersNonCors = function (id) {
            return $http.get(urlBase + "/users/jsonuserlistnoncors");
        };
}]);


